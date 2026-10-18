"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

export const THEME_KEY = "twinpix-theme";
const THEME_COLOR: Record<Theme, string> = { dark: "#0a0a12", light: "#f4f1ea" };

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

/** Apply + persist a theme. The initial value is set before paint by the inline script in layout.tsx. */
export function setTheme(theme: Theme, { animate = true } = {}) {
  const root = document.documentElement;
  if (animate) {
    root.classList.add("theme-anim");
    window.setTimeout(() => root.classList.remove("theme-anim"), 450);
  }
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** Current theme, reactive to toggles. Server/hydration snapshot is "dark" (the default). */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}
