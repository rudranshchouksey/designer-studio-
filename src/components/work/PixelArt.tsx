"use client";

import { useEffect, useRef } from "react";

type Props = {
  hue: number;
  seed: number;
  /** "grid" = abstract field, "portrait" = pixel head-and-shoulders silhouette */
  variant?: "grid" | "portrait";
  cell?: number;
  className?: string;
};

function hash(x: number, y: number, s: number) {
  let h = Math.imul(x * 374761393 + y * 668265263 + s * 2147483647, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1103515245);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

/** Brand-adjacent partner hue: ultramarine-ish hues pair with flame and vice versa. */
const partner = (hue: number) => (hue > 120 && hue < 330 ? 14 : 232);

function paint(canvas: HTMLCanvasElement, { hue, seed, variant, cell = 14 }: Props) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = "#0d0d18";
  ctx.fillRect(0, 0, w, h);

  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const h2 = partner(hue);
  const ax = 0.28 + hash(1, 1, seed) * 0.2;
  const ay = 0.3 + hash(2, 2, seed) * 0.4;
  const bx = 0.62 + hash(3, 3, seed) * 0.2;
  const by = 0.35 + hash(4, 4, seed) * 0.4;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / cols;
      const v = r / rows;
      const n = hash(c, r, seed);
      let a: number;
      let b: number;
      if (variant === "portrait") {
        const head = ((u - 0.5) / 0.2) ** 2 + ((v - 0.38) / 0.24) ** 2;
        const body = ((u - 0.5) / 0.42) ** 2 + ((v - 1.02) / 0.4) ** 2;
        const inside = Math.min(head, body);
        a = Math.max(0, 1 - inside) * (1.1 - u * 0.5);
        b = Math.max(0, 1 - inside) * (0.4 + u * 0.7);
        if (inside > 1) {
          // sparse background pixels
          a = n > 0.93 ? 0.35 : 0;
          b = 0;
        }
      } else {
        const da = Math.hypot((u - ax) * (w / h), v - ay);
        const db = Math.hypot((u - bx) * (w / h), v - by);
        a = Math.max(0, 1 - da * 1.7);
        b = Math.max(0, 1 - db * 1.7);
      }
      const m = a + b;
      const level = m * (0.55 + n * 0.6) - 0.08;
      if (level <= 0.05) continue;
      const q = Math.min(1, Math.round(level * 5) / 5);
      const overlap = Math.min(a, b) / (Math.max(a, b) || 1);
      ctx.fillStyle =
        variant !== "portrait" && overlap > 0.55 && q > 0.5
          ? `hsl(18 100% ${62 + q * 28}%)`
          : `hsl(${a >= b ? hue : h2} 92% ${22 + q * 44}%)`;
      const pad = q > 0.7 ? 1 : 2;
      ctx.fillRect(c * cell + pad, r * cell + pad, cell - pad * 2, cell - pad * 2);
    }
  }
}

export function PixelArt(props: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { hue, seed, variant, cell } = props;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const draw = () => paint(canvas, { hue, seed, variant, cell });
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [hue, seed, variant, cell]);

  return <canvas ref={ref} className={`block h-full w-full ${props.className ?? ""}`} aria-hidden="true" />;
}
