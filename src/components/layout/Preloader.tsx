"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LogoMark } from "@/components/ui/Logo";
import { prefersReducedMotion } from "@/lib/useReducedMotion";
import { markReady } from "@/lib/ready";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.display = "none";
      markReady();
      return;
    }
    const counter = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo(
      mark.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: "power3.out" },
      0,
    )
      .to(
        counter,
        {
          v: 100,
          duration: 1.05,
          ease: "power2.inOut",
          onUpdate: () => {
            if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        },
        0,
      )
      .add(markReady, 1.05)
      .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut" }, 1.05)
      .set(el, { display: "none" });
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0 0)" }}
      role="status"
      aria-label="Loading"
    >
      <div ref={mark}>
        <LogoMark size={72} />
      </div>
      <p className="label mt-8 tabular-nums">
        <span ref={count}>000</span> / 100
      </p>
    </div>
  );
}
