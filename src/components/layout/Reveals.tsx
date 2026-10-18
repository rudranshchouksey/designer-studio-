"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/**
 * Global scroll-reveal wiring, driven by data attributes (re-run on every route change):
 *  [data-lines]     headline: child [data-line] slides up (skipped for [data-eager], the LCP headline)
 *  [data-fade]      fades/moves up (optional data-delay)
 *  [data-stagger]   children with [data-stagger-item] reveal in sequence
 */
export function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heads = gsap.utils.toArray<HTMLElement>("[data-lines]:not([data-eager])");
      const fades = gsap.utils.toArray<HTMLElement>("[data-fade]");
      const groups = gsap.utils.toArray<HTMLElement>("[data-stagger]");

      heads.forEach((h) => gsap.set(h.querySelectorAll("[data-line]"), { yPercent: 115 }));
      gsap.set(fades, { autoAlpha: 0, y: 28 });
      groups.forEach((g) =>
        gsap.set(g.querySelectorAll("[data-stagger-item]"), { autoAlpha: 0, y: 36 }),
      );

      heads.forEach((h) =>
        gsap.to(h.querySelectorAll("[data-line]"), {
          yPercent: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: h, start: "top 88%", once: true },
        }),
      );
      fades.forEach((f) =>
        gsap.to(f, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: Number(f.dataset.delay ?? 0),
          scrollTrigger: { trigger: f, start: "top 90%", once: true },
        }),
      );
      groups.forEach((g) =>
        gsap.to(g.querySelectorAll("[data-stagger-item]"), {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: g, start: "top 82%", once: true },
        }),
      );
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
