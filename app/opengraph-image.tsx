import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.tagline;

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
          background: "linear-gradient(145deg, #071421 0%, #0b2a4a 48%, #083044 100%)",
          color: "#f1f6fb",
          padding: 72,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(47,157,255,0.22)",
            top: -160,
            left: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "rgba(62,225,200,0.16)",
            top: -40,
            right: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 360,
            height: 360,
            borderRadius: 999,
            background: "rgba(232,184,74,0.12)",
            bottom: -120,
            right: 180,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <svg width="72" height="72" viewBox="0 0 48 48" fill="none">
            <path d="M24 13.2 L11.15 37.1" stroke="#3EE1C8" strokeWidth="3.7" strokeLinecap="butt" />
            <path d="M24 13.2 L36.85 37.1" stroke="#2F9DFF" strokeWidth="3.7" strokeLinecap="butt" />
            <rect x="16.9" y="25.35" width="14.2" height="2.45" rx="0.7" fill="#E8B84A" />
            <rect x="21.15" y="5.15" width="5.7" height="5.7" rx="0.85" fill="#F0C65C" />
            <rect x="7.35" y="36.05" width="5.15" height="5.15" rx="0.8" fill="#3EE1C8" />
            <rect x="35.5" y="36.05" width="5.15" height="5.15" rx="0.8" fill="#3EE1C8" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, letterSpacing: 6, fontWeight: 650 }}>AI AGENTS</div>
            <div style={{ fontSize: 16, letterSpacing: 10, color: "#E8B84A", marginTop: 8 }}>INFO</div>
          </div>
        </div>
        <div style={{ fontSize: 58, lineHeight: 1.08, maxWidth: 920, letterSpacing: -1.5 }}>
          {site.tagline}
        </div>
        <div style={{ fontSize: 22, color: "#3EE1C8", letterSpacing: 3 }}>
          Directory · Research · Learning
        </div>
      </div>
    ),
    size,
  );
}
