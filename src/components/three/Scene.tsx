"use client";

import { Component, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { webglAvailable } from "./webgl";
import { onReady } from "@/lib/ready";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    document.documentElement.removeAttribute("data-gl");
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

let cached: boolean | null = null;
const supported = () => (cached ??= webglAvailable());
const subscribe = () => () => {};

/** Fixed full-screen WebGL layer. Without WebGL the CSS .backdrop gradient stays as the fallback. */
export function Scene() {
  const supportedGl = useSyncExternalStore(subscribe, supported, () => false);
  const [armed, setArmed] = useState(false);

  // Keep the page's first paint light: start WebGL once the preloader is done.
  useEffect(() => {
    if (!supportedGl) return;
    let t: ReturnType<typeof setTimeout>;
    let cancel = () => {};
    const off = onReady(() => {
      const start = () => setArmed(true);
      if ("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(start, { timeout: 1500 });
        cancel = () => window.cancelIdleCallback(id);
      } else {
        t = setTimeout(start, 200);
      }
    });
    return () => {
      off();
      cancel();
      clearTimeout(t);
    };
  }, [supportedGl]);

  useEffect(() => {
    if (!armed) return;
    document.documentElement.dataset.gl = "on";
    return () => document.documentElement.removeAttribute("data-gl");
  }, [armed]);

  return armed ? (
    <Boundary>
      <SceneCanvas />
    </Boundary>
  ) : null;
}
