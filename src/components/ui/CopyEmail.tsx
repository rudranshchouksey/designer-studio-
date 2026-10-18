"use client";

import { useRef, useState } from "react";
import { contact, site } from "@/content";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
    } catch {
      // Fallback for insecure contexts / older browsers
      const ta = document.createElement("textarea");
      ta.value = site.email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${site.email}`}
        className="display text-[clamp(1.4rem,3vw,2.2rem)] underline decoration-flame decoration-2 underline-offset-8 transition-colors hover:text-flame"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="label border border-line px-3 py-2 text-paper transition-colors hover:border-ultra hover:bg-ultra/15"
      >
        {copied ? contact.copiedLabel : contact.copyLabel}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
