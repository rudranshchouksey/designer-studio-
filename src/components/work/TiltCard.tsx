"use client";

import { useRef, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/useReducedMotion";

/** Subtle 3D tilt toward the pointer (plain CSS transform). Disabled on touch and for reduced motion. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent) => {
    if (!el.current || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.current.style.transition = "transform 0.12s ease-out";
    el.current.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
  };
  const leave = () => {
    if (!el.current) return;
    el.current.style.transition = "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    el.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div ref={el} onPointerMove={move} onPointerLeave={leave} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
