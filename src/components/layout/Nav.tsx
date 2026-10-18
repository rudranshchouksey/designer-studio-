"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/content";
import { Logo } from "@/components/ui/Logo";
import { SiteLink } from "@/components/ui/SiteLink";
import { ThemeToggle } from "./ThemeToggle";
import { scrollState } from "@/lib/scrollState";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock scroll + trap focus/Escape while the mobile menu is open.
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

  const isCurrent = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div className="wrap flex h-20 items-center justify-between">
        <SiteLink href="/" aria-label="Twinpix Studio — home" onClick={() => setOpen(false)}>
          <Logo />
        </SiteLink>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {nav.links.map((l) => (
            <SiteLink
              key={l.href}
              href={l.href}
              aria-current={isCurrent(l.href) ? "page" : undefined}
              className="group relative font-mono text-[0.74rem] uppercase tracking-[0.14em] text-paper/80 transition-colors hover:text-paper aria-[current=page]:text-paper"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-flame transition-transform duration-300 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
            </SiteLink>
          ))}
          <ThemeToggle />
          <SiteLink
            href={nav.cta.href}
            className="bg-paper px-5 py-2.5 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-flame"
          >
            {nav.cta.label}
          </SiteLink>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          ref={toggleRef}
          type="button"
          className="relative z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
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
              <li key={l.href + l.label}>
                <SiteLink
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-2 text-[clamp(2.4rem,12vw,4rem)] transition-colors hover:text-flame"
                >
                  {l.label}
                </SiteLink>
              </li>
            ))}
          </ul>
        </nav>
        <p className="label">Made by two. Seen by everyone.</p>
      </div>
    </header>
  );
}
