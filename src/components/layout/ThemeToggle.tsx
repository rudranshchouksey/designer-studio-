"use client";

import { useEffect } from "react";
import { nav } from "@/content";
import { getTheme, setTheme, useTheme } from "@/lib/theme";

/** Light/dark switch. Shows the theme you'd switch *to*; the choice is saved in localStorage. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const light = theme === "light";

  // Keep <meta name="theme-color"> in step with a theme restored by the inline script.
  useEffect(() => {
    setTheme(getTheme(), { animate: false });
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(light ? "dark" : "light")}
      aria-label={light ? nav.themeLabel.toDark : nav.themeLabel.toLight}
      title={light ? nav.themeLabel.toDark : nav.themeLabel.toLight}
      className={`group flex h-11 w-11 items-center justify-center border border-line text-paper transition-colors hover:border-ultra hover:bg-ultra/15 ${className}`}
    >
      {/* Square "sun/moon": a pixel disc with half of it filled */}
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" focusable="false">
        <rect x="1" y="1" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {light ? (
          <rect x="1" y="1" width="8" height="16" fill="currentColor" />
        ) : (
          <rect x="9" y="1" width="8" height="16" fill="currentColor" />
        )}
      </svg>
    </button>
  );
}
