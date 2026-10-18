"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/useReducedMotion";

const INTERACTIVE = "a, button, label, input, textarea, [data-cursor]";

/** Twin-square cursor: two offset squares chase the pointer; both grow over interactive elements. */
export function Cursor() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const ax = gsap.quickTo(a.current, "x", { duration: 0.25, ease: "power3" });
    const ay = gsap.quickTo(a.current, "y", { duration: 0.25, ease: "power3" });
    const bx = gsap.quickTo(b.current, "x", { duration: 0.55, ease: "power3" });
    const by = gsap.quickTo(b.current, "y", { duration: 0.55, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      ax(e.clientX - 7);
      ay(e.clientY - 7);
      bx(e.clientX - 3);
      by(e.clientY - 3);
      if (a.current) a.current.style.opacity = "1";
      if (b.current) b.current.style.opacity = "1";
      const big = String(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
      a.current?.setAttribute("data-big", big);
      b.current?.setAttribute("data-big", big);
    };
    const onLeave = () => {
      if (a.current) a.current.style.opacity = "0";
      if (b.current) b.current.style.opacity = "0";
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={a} className="cursor-sq text-ultra" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={b} className="cursor-sq text-flame" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
