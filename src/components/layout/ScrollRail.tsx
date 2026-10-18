"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/content";

/** Slim progress rail on the right edge + name of the current section. */
export function ScrollRail() {
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const probe = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-1/2 z-[70] flex -translate-y-1/2 items-center gap-3 pr-3 md:pr-6"
    >
      <span
        className="label hidden text-paper/70 md:block"
        style={{ writingMode: "vertical-rl" }}
      >
        {String(active + 1).padStart(2, "0")} — {sections[active].label}
      </span>
      <span className="relative block h-[34vh] w-px bg-line">
        <span
          ref={fill}
          className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-ultra to-flame"
        />
      </span>
    </div>
  );
}
