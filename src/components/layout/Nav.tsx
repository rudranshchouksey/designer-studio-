"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav } from "@/content";
import { Logo } from "@/components/ui/Logo";
import { scrollState, scrollToId, scrollToTop } from "@/lib/scrollState";

export function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Lock scroll + trap Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    scrollState.lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const f = [
          toggleRef.current,
          ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a")),
        ].filter(Boolean) as HTMLElement[];
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      scrollState.lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    // let the scroll lock release before scrolling
    requestAnimationFrame(() => scrollToId(href.slice(1)));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="wrap flex h-20 items-center justify-between">
        <a
          href="#hero"
          aria-label="Twinpix Studio — back to top"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            scrollToTop();
          }}
        >
          <Logo />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={go(l.href)}
              className="group relative font-mono text-[0.74rem] uppercase tracking-[0.14em] text-paper/80 transition-colors hover:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-flame transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href={nav.cta.href}
            onClick={go(nav.cta.href)}
            className="bg-paper px-5 py-2.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-flame"
          >
            {nav.cta.label}
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="relative z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[6px] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 bg-paper transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 z-[85] flex flex-col justify-between bg-ink/95 px-[var(--gutter)] pb-10 pt-28 backdrop-blur-md md:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {[...nav.links, nav.cta].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={go(l.href)}
                  className="display block py-2 text-[clamp(2.4rem,12vw,4rem)] transition-colors hover:text-flame"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="label">Made by two. Seen by everyone.</p>
      </div>
    </header>
  );
}
