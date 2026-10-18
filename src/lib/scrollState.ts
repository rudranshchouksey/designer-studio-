import type Lenis from "lenis";

/** Mutable, non-reactive state shared between the DOM layer and the 3D scene. */
export const scrollState = {
  y: 0,
  /** Smoothed scroll velocity in px per frame (signed). */
  velocity: 0,
  /** Pointer in -1..1 (y up). */
  pointer: { x: 0, y: 0 },
  lenis: null as Lenis | null,
};

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (scrollState.lenis) {
    scrollState.lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "auto", block: "start" });
  }
}

export function scrollToTop() {
  if (scrollState.lenis) scrollState.lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo(0, 0);
}
