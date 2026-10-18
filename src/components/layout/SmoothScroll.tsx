"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "@/lib/scrollState";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Lenis smooth scroll wired into the GSAP ticker; also tracks velocity + pointer. */
export function SmoothScroll() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    let lenis: Lenis | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      scrollState.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
    }

    let lastY = window.scrollY;
    const tick = (time: number) => {
      lenis?.raf(time * 1000);
      const y = window.scrollY;
      scrollState.y = y;
      scrollState.velocity += (y - lastY - scrollState.velocity) * 0.12;
      lastY = y;
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onMove = (e: PointerEvent) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onMove);
      lenis?.destroy();
      scrollState.lenis = null;
    };
  }, []);

  return null;
}
