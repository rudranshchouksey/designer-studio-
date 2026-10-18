"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/useReducedMotion";

/** Subtle 3D tilt toward the pointer. Disabled on touch and for reduced motion. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (!el.current || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.current, {
      rotateY: px * 9,
      rotateX: -py * 9,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 900,
      overwrite: "auto",
    });
  };
  const leave = () => {
    if (el.current)
      gsap.to(el.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
  };

  return (
    <div ref={el} onPointerMove={move} onPointerLeave={leave} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
