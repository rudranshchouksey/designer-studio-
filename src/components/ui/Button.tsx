"use client";

import type { ReactNode } from "react";
import { scrollToId } from "@/lib/scrollState";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  onClick?: () => void;
};

/** Anchor button with smooth in-page scrolling for "#hash" links. */
export function Button({ href, children, variant = "solid", className = "", onClick }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 px-6 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.14em] transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-paper text-ink hover:bg-flame"
      : "border border-line text-paper hover:border-ultra hover:bg-ultra/15";
  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      onClick={(e) => {
        onClick?.();
        if (href.startsWith("#")) {
          e.preventDefault();
          scrollToId(href.slice(1));
        }
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
