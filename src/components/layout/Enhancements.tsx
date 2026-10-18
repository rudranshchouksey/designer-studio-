"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// GSAP, ScrollTrigger and Lenis live in this lazily loaded chunk so they never compete with first paint.
const Inner = dynamic(() => import("./EnhancementsInner"), { ssr: false });

/** Mounts smooth scroll, scroll reveals and the custom cursor once the browser is idle. */
export function Enhancements() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    let id: number | undefined;
    const start = () => setGo(true);
    if ("requestIdleCallback" in window) id = window.requestIdleCallback(start, { timeout: 1200 });
    else t = setTimeout(start, 300);
    return () => {
      if (id !== undefined) window.cancelIdleCallback(id);
      clearTimeout(t);
    };
  }, []);
  return go ? <Inner /> : null;
}
