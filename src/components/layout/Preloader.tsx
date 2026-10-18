"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { markReady } from "@/lib/ready";

const DURATION = 750;
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * Non-blocking first-visit indicator (corner, never covers content). Skipped entirely for
 * reduced-motion users and repeat visits in the same session — the inline script in layout.tsx
 * decides that before paint, so nothing flashes. Plain rAF: no animation library on the critical path.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const skip = document.documentElement.dataset.preload === "skip" || prefersReducedMotion();
    try {
      sessionStorage.setItem("twinpix-seen", "1");
    } catch {}
    if (skip) {
      el.style.display = "none";
      markReady();
      return;
    }
    el.style.opacity = "1";
    let raf = 0;
    let hide: ReturnType<typeof setTimeout>;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      const v = easeInOut(p) * 100;
      if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${v / 100})`;
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        markReady();
        el.style.opacity = "0";
        hide = setTimeout(() => (el.style.display = "none"), 300);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div
      ref={root}
      className="preloader pointer-events-none fixed bottom-6 right-[var(--gutter)] z-[100] flex items-center gap-4 opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      <LogoMark size={28} />
      <div>
        <p className="label tabular-nums">
          <span ref={count}>000</span> / 100
        </p>
        <span className="mt-2 block h-px w-28 bg-line">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-flame" />
        </span>
      </div>
    </div>
  );
}
