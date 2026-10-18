"use client";

import { scrollToTop } from "@/lib/scrollState";

export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="label inline-flex items-center gap-2 transition-colors hover:text-flame"
    >
      {label} <span aria-hidden="true">↑</span>
    </button>
  );
}
