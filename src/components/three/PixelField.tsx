"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { scrollState } from "@/lib/scrollState";
import { sections } from "@/content";
import { buildColors, buildFormations, buildRandoms, STAGE_COUNT } from "./formations";
import { fragmentShader, vertexShader } from "./shaders";

/** Which formation each page section shows (process + team share the helix). */
const STAGE_OF_SECTION = [0, 1, 2, 3, 3, 4];

// Desktop layout per formation: horizontal offset as a fraction of half the viewport width.
const OFFSET_X = [0.46, -0.46, 0, 0.5, 0];
const SCALE = [1, 1, 1, 0.92, 1];
const ALPHA = [1, 0.9, 0.9, 0.85, 0.6];

function sample(arr: number[], s: number) {
  const i = Math.min(Math.floor(s), STAGE_COUNT - 2);
  return arr[i] + (arr[i + 1] - arr[i]) * (s - i);
}

type Props = { count: number; mobile: boolean; reduced: boolean };

export function PixelField({ count, mobile, reduced }: Props) {
  const points = useRef<THREE.Points>(null);
  const stage = useRef(0);
  const tops = useRef<number[]>([]);
  const rot = useRef({ x: 0, y: 0 });

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
    }),
    [mobile, reduced],
  );

  useEffect(() => () => geometry.dispose(), [geometry]);

  // Cache where each section starts so the frame loop never touches layout.
  useEffect(() => {
    const measure = () => {
      tops.current = sections.map((s) => {
        const el = document.getElementById(s.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const vh = window.innerHeight;
    const y = window.scrollY + vh / 2;
    const w = vh * 0.4;

    // Scroll position -> continuous formation index (0..4). Holds mid-section, blends across boundaries.
    let target = STAGE_OF_SECTION[0];
    const t = tops.current;
    for (let i = 1; i < STAGE_OF_SECTION.length; i++) {
      const d = STAGE_OF_SECTION[i] - STAGE_OF_SECTION[i - 1];
      if (!d || t[i] === undefined) continue;
      const k = Math.min(1, Math.max(0, (y - (t[i] - w)) / (2 * w)));
      target += d * k;
    }

    stage.current = reduced
      ? Math.round(target)
      : THREE.MathUtils.damp(stage.current, target, 3.2, dt);

    const cur = Math.min(Math.max(stage.current, 0), STAGE_COUNT - 1);
    const from = Math.min(Math.floor(cur), STAGE_COUNT - 2);
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uFrom.value = from;
    u.uTo.value = from + 1;
    u.uT.value = cur - from;
    u.uTime.value = state.clock.elapsedTime;
    u.uPx.value = state.gl.getPixelRatio();
    u.uWave.value = Math.max(0, 1 - Math.abs(cur - 1));
    u.uAlpha.value = sample(ALPHA, cur) * (mobile ? 0.62 : 0.85);

    const p = points.current;
    if (!p) return;
    const halfW = state.viewport.width / 2;
    const fit = mobile ? Math.min(1, halfW / 2.1) : Math.min(1, halfW / 4.2);
    const s = sample(SCALE, cur) * fit;
    p.scale.setScalar(s);
    p.position.x = mobile ? 0 : sample(OFFSET_X, cur) * halfW;
    p.position.y = mobile ? 0.4 : 0;

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
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
