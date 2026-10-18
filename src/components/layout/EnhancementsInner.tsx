"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { scrollState } from "@/lib/scrollState";
import { SmoothScroll } from "./SmoothScroll";
import { Reveals } from "./Reveals";
import { Cursor } from "./Cursor";

/** After client-side navigation: reset Lenis to the top, or to the #hash target. */
function RouteEffects() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const id = setTimeout(() => {
      const hash = window.location.hash.slice(1);
      const el = hash ? document.getElementById(hash) : null;
      const lenis = scrollState.lenis;
      if (lenis) lenis.scrollTo(el ?? 0, { immediate: true, force: true });
      else if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 60);
    return () => clearTimeout(id);
  }, [pathname]);
  return null;
}

export default function EnhancementsInner() {
  return (
    <>
      <SmoothScroll />
      <Reveals />
      <RouteEffects />
      <Cursor />
    </>
  );
}
