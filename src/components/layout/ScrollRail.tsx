"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Item = { top: number; label: string };

/** Slim progress rail on the right edge + name of the current section ([data-section] on the page). */
export function ScrollRail() {
  const fill = useRef<HTMLSpanElement>(null);
  const items = useRef<Item[]>([]);
  const pathname = usePathname();
  const [active, setActive] = useState({ i: 0, n: 0, label: "" });

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      items.current = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"))
        .map((el) => ({ top: el.getBoundingClientRect().top + window.scrollY, label: el.dataset.section ?? "" }))
        .sort((a, b) => a.top - b.top);
    };
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      const probe = window.scrollY + window.innerHeight * 0.4;
      let idx = 0;
      items.current.forEach((s, i) => {
        if (s.top <= probe) idx = i;
      });
      const n = items.current.length;
      const label = items.current[idx]?.label ?? "";
      setActive((a) => (a.i === idx && a.n === n && a.label === label ? a : { i: idx, n, label }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const remeasure = () => {
      measure();
      onScroll();
    };
    remeasure();
    const t = setTimeout(remeasure, 300);
    const ro = new ResizeObserver(remeasure);
    ro.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-1/2 z-[70] flex -translate-y-1/2 items-center gap-3 pr-3 md:pr-6"
    >
      {active.label && (
        <span className="label hidden text-paper/70 md:block" style={{ writingMode: "vertical-rl" }}>
          {String(active.i + 1).padStart(2, "0")} — {active.label}
        </span>
      )}
      <span className="relative block h-[34vh] w-px bg-line">
        <span
          ref={fill}
          className="absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-ultra to-flame"
        />
      </span>
    </div>
  );
}
