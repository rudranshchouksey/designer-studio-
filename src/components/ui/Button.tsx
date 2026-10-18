"use client";

import type { ReactNode } from "react";
import { SiteLink } from "./SiteLink";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  /** Open in a new tab (external links such as the booking page). */
  external?: boolean;
};

/** Arrow button for internal routes / hashes (smooth-scrolling) and external links. */
export function Button({ href, children, variant = "solid", className = "", external }: Props) {
  const base =
    "group relative inline-flex items-center gap-3 px-6 py-3.5 font-mono text-[0.78rem] uppercase tracking-[0.14em] transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-paper text-ink hover:bg-flame"
      : "border border-line text-paper hover:border-ultra hover:bg-ultra/15";
  const arrow = (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
    >
      →
    </span>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={`${base} ${styles} ${className}`}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <SiteLink href={href} className={`${base} ${styles} ${className}`}>
      {children}
      {arrow}
    </SiteLink>
  );
}
