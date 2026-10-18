import { ImageResponse } from "next/og";
import { site } from "@/content";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a12",
          color: "#f2f0ea",
          padding: 72,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 96, height: 96 }}>
          <div style={{ position: "absolute", left: 0, top: 0, width: 62, height: 62, background: "#5b5bff" }} />
          <div style={{ position: "absolute", left: 34, top: 34, width: 62, height: 62, background: "#ff6a3d" }} />
          <div style={{ position: "absolute", left: 34, top: 34, width: 28, height: 28, background: "#ffe9df" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>Made by two.</span>
          <span style={{ color: "#ff6a3d" }}>Seen by everyone.</span>
        </div>
        <div style={{ fontSize: 30, color: "#a2a2b5", letterSpacing: 4 }}>TWINPIX STUDIO</div>
      </div>
    ),
    size,
  );
}
