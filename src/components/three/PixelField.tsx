"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/scrollState";
import { buildColors, buildFormations, buildRandoms, STAGE_COUNT } from "./formations";
import { fragmentShader, vertexShader } from "./shaders";

// Desktop layout per formation: horizontal offset as a fraction of half the viewport width.
const OFFSET_X = [0.46, -0.46, 0, 0.5, 0];
const SCALE = [1, 0.9, 1, 0.92, 1];
const MOBILE_Y = [1.15, 1.0, 0.7, 0.5, 1.0];
const ALPHA = [1, 0.9, 0.9, 0.85, 0.45];

/** Seconds a route-change morph takes. */
const ROUTE_MORPH = 1.3;

function sample(arr: number[], s: number) {
  const i = Math.min(Math.floor(s), STAGE_COUNT - 2);
  return arr[i] + (arr[i + 1] - arr[i]) * (s - i);
}

/** A page section that declares which formation it wants: <section data-stage="2" data-scene="dim">. */
type StageNode = { top: number; stage: number; dim: number };

function measureNodes(): StageNode[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"))
    .map((el) => ({
      top: el.getBoundingClientRect().top + window.scrollY,
      stage: Number(el.dataset.stage) || 0,
      dim: el.dataset.scene === "dim" ? 1 : 0,
    }))
    .sort((a, b) => a.top - b.top);
}

/** Scroll position -> continuous formation index (0..4) and dim amount. Holds mid-section, blends across boundaries. */
function targetAt(nodes: StageNode[], scrollY: number, vh: number) {
  if (!nodes.length) return { stage: 0, dim: 0 };
  const y = scrollY + vh / 2;
  const w = vh * 0.4;
  let stage = nodes[0].stage;
  let dim = nodes[0].dim;
  for (let i = 1; i < nodes.length; i++) {
    const ds = nodes[i].stage - nodes[i - 1].stage;
    const dd = nodes[i].dim - nodes[i - 1].dim;
    if (!ds && !dd) continue;
    const k = Math.min(1, Math.max(0, (y - (nodes[i].top - w)) / (2 * w)));
    stage += ds * k;
    dim += dd * k;
  }
  return { stage, dim };
}

type Props = { count: number; mobile: boolean; reduced: boolean; routeKey: string; light: boolean };

export function PixelField({ count, mobile, reduced, routeKey, light }: Props) {
  const points = useRef<THREE.Points>(null);
  const stage = useRef(0);
  const dim = useRef(0);
  const nodes = useRef<StageNode[]>([]);
  const rot = useRef({ x: 0, y: 0 });
  const lastKey = useRef(routeKey);
  /** Active route-change morph: jumps straight between two formations instead of scrubbing through the ones in between. */
  const morph = useRef<{ from: number; to: number; p: number } | null>(null);

  const geometry = useMemo(() => {
    const f = buildFormations(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(f[0], 3));
    g.setAttribute("aP1", new THREE.BufferAttribute(f[1], 3));
    g.setAttribute("aP2", new THREE.BufferAttribute(f[2], 3));
    g.setAttribute("aP3", new THREE.BufferAttribute(f[3], 3));
    g.setAttribute("aP4", new THREE.BufferAttribute(f[4], 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(buildRandoms(count), 4));
    g.setAttribute("aColor", new THREE.BufferAttribute(buildColors(count), 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 20);
    return g;
  }, [count]);

  const matRef = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uFrom: { value: 0 },
      uTo: { value: 1 },
      uT: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: mobile ? 2.6 : 2.3 },
      uPx: { value: 1 },
      uWave: { value: 0 },
      uDrift: { value: reduced ? 0 : 1 },
      uBurst: { value: 0.9 },
      uAlpha: { value: 0.8 },
      // Deeper, more saturated twins for the light theme (normal blending needs ink-strength colour)
      uUltra: { value: new THREE.Color(0.357, 0.357, 1.0) },
      uFlame: { value: new THREE.Color(1.0, 0.416, 0.239) },
    }),
    [mobile, reduced],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Re-measure the page's [data-stage] sections after route changes, resizes and late layout shifts.
  useEffect(() => {
    const measure = () => {
      nodes.current = measureNodes();
    };
    measure();
    const t1 = setTimeout(measure, 200);
    const t2 = setTimeout(measure, 900);
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [routeKey]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const vh = window.innerHeight;

    // New route: start a morph from wherever we are to the new page's opening formation.
    if (lastKey.current !== routeKey) {
      lastKey.current = routeKey;
      nodes.current = measureNodes();
      const next = targetAt(nodes.current, window.scrollY, vh).stage;
      const from = Math.round(stage.current);
      const to = Math.round(next);
      if (!reduced && from !== to) morph.current = { from, to, p: 0 };
      else stage.current = next;
    }

    const target = targetAt(nodes.current, window.scrollY, vh);
    dim.current = reduced ? target.dim : THREE.MathUtils.damp(dim.current, target.dim, 3, dt);

    const u = matRef.current?.uniforms;
    if (!u) return;

    // Resolve the formation pair + blend for this frame.
    let from: number;
    let to: number;
    let t: number;
    let blend: (arr: number[]) => number;
    let wave: number;
    const m = morph.current;
    if (m) {
      m.p = Math.min(1, m.p + dt / ROUTE_MORPH);
      const e = m.p * m.p * (3 - 2 * m.p);
      from = m.from;
      to = m.to;
      t = m.p;
      blend = (arr) => arr[m.from] + (arr[m.to] - arr[m.from]) * e;
      wave = Math.max(0, 1 - Math.abs(m.from + (m.to - m.from) * e - 1));
      if (m.p >= 1) {
        stage.current = m.to;
        morph.current = null;
      }
    } else {
      stage.current = reduced
        ? Math.round(target.stage)
        : THREE.MathUtils.damp(stage.current, target.stage, 3.2, dt);
      const cur = Math.min(Math.max(stage.current, 0), STAGE_COUNT - 1);
      from = Math.min(Math.floor(cur), STAGE_COUNT - 2);
      to = from + 1;
      t = cur - from;
      blend = (arr) => sample(arr, cur);
      wave = Math.max(0, 1 - Math.abs(cur - 1));
    }

    u.uFrom.value = from;
    u.uTo.value = to;
    u.uT.value = t;
    u.uTime.value = state.clock.elapsedTime;
    u.uPx.value = state.gl.getPixelRatio();
    u.uWave.value = wave;
    // setRGB: raw values, no colour-space conversion (the shader outputs them as-is)
    if (light) u.uUltra.value.setRGB(0.141, 0.141, 0.847);
    else u.uUltra.value.setRGB(0.357, 0.357, 1.0);
    if (light) u.uFlame.value.setRGB(0.878, 0.235, 0.031);
    else u.uFlame.value.setRGB(1.0, 0.416, 0.239);
    u.uAlpha.value = blend(ALPHA) * (1 - (mobile ? 0.72 : 0.55) * dim.current) * (mobile ? 0.62 : 0.85) * (light ? 1.15 : 1);

    const p = points.current;
    if (!p) return;
    const halfW = state.viewport.width / 2;
    const fit = mobile ? Math.min(1, halfW / 2.1) : Math.min(1, halfW / 4.2);
    p.scale.setScalar(blend(SCALE) * fit);
    p.position.x = mobile ? 0 : blend(OFFSET_X) * halfW;
    p.position.y = mobile ? blend(MOBILE_Y) : 0;

    // mouse parallax + idle sway
    const tx = reduced ? 0 : -scrollState.pointer.y * 0.14 + Math.sin(state.clock.elapsedTime * 0.25) * 0.05;
    const ty = reduced ? 0 : scrollState.pointer.x * 0.22 + Math.sin(state.clock.elapsedTime * 0.18) * 0.22;
    rot.current.x = THREE.MathUtils.damp(rot.current.x, tx, 3, dt);
    rot.current.y = THREE.MathUtils.damp(rot.current.y, ty, 3, dt);
    p.rotation.set(rot.current.x, rot.current.y, 0);
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={light ? THREE.NormalBlending : THREE.AdditiveBlending}
      />
    </points>
  );
}
