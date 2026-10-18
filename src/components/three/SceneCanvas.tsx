"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PixelField } from "./PixelField";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Loaded with next/dynamic (ssr: false) from Scene.tsx. */
export default function SceneCanvas() {
  const [cfg] = useState(() => {
    const mobile = window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
    return { mobile, count: mobile ? 10000 : 20000, reduced: prefersReducedMotion() };
  });

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, cfg.mobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    >
      <PixelField count={cfg.count} mobile={cfg.mobile} reduced={cfg.reduced} />
    </Canvas>
  );
}
