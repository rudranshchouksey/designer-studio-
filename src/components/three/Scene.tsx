"use client";

import { Component, useEffect, useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { webglAvailable } from "./webgl";

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
  const ok = useSyncExternalStore(subscribe, supported, () => false);

  useEffect(() => {
    if (!ok) return;
    document.documentElement.dataset.gl = "on";
    return () => document.documentElement.removeAttribute("data-gl");
  }, [ok]);

  return ok ? (
    <Boundary>
      <SceneCanvas />
    </Boundary>
  ) : null;
}
