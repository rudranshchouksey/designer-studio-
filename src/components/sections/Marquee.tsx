"use client";

import { useEffect, useRef } from "react";
import { marquee } from "@/content";
import { scrollState } from "@/lib/scrollState";
import { useReducedMotion } from "@/lib/useReducedMotion";

const COPIES = 3;

function Set({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marquee.map((item, i) => (
        <li key={item} className="flex items-center">
          <span
            className={`display whitespace-nowrap px-[3vw] text-[clamp(2.4rem,7vw,6.5rem)] ${
              i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-paper)]" : ""
            }`}
          >
            {item}
          </span>
          <span aria-hidden="true" className="relative inline-block h-5 w-5 shrink-0">
            <span className="absolute left-0 top-0 h-3.5 w-3.5 bg-ultra" />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-flame mix-blend-screen" />
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Services strip; drifts sideways and speeds up (and flips) with scroll velocity. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = track.current;
    if (!el || reduced) return;
    let x = 0;
    let dir = -1;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const dtMs = Math.min(now - last, 64);
      last = now;
      const loop = el.scrollWidth / COPIES;
      const v = scrollState.velocity;
      if (Math.abs(v) > 0.6) dir += ((v > 0 ? -1 : 1) - dir) * 0.08;
      else dir += (-1 - dir) * 0.02;
      const speed = 70 + Math.min(Math.abs(v), 90) * 22;
      x += dir * speed * (dtMs / 1000);
      if (x <= -loop) x += loop;
      if (x > 0) x -= loop;
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      aria-label="Services"
      className="relative z-10 overflow-hidden border-y border-line bg-ink/40 py-5 backdrop-blur-[2px]"
    >
      {reduced ? (
        <ul className="wrap flex flex-wrap justify-center gap-x-8 gap-y-2">
          {marquee.map((m) => (
            <li key={m} className="display text-2xl">
              {m}
            </li>
          ))}
        </ul>
      ) : (
        <div ref={track} className="flex w-max will-change-transform">
          {Array.from({ length: COPIES }, (_, i) => (
            <Set key={i} hidden={i > 0} />
          ))}
        </div>
      )}
    </section>
  );
}
