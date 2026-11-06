import { ImageResponse } from "next/og";
import { markSvg } from "@/components/Logo";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.tagline}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F3F6FA",
          color: "#0B1F33",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(47,157,255,0.18)",
            top: -180,
            left: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "rgba(20,184,166,0.16)",
            bottom: -160,
            left: 220,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 280,
            height: 280,
            borderRadius: 999,
            background: "rgba(224,176,74,0.2)",
            top: -40,
            left: 460,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 680,
            padding: "68px 28px 68px 72px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            {markSvg("og", { size: 72 })}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -0.6 }}>AI Agents</div>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 6, color: "#7A560C", marginTop: 8 }}>
                INFO
              </div>
            </div>
          </div>
          <div style={{ fontSize: 46, lineHeight: 1.14, letterSpacing: -1.1, maxWidth: 560 }}>{site.tagline}</div>
          <div style={{ fontSize: 22, color: "#0F5F78", letterSpacing: 2.4 }}>Directory · Research · Learning</div>
        </div>
        <div
          style={{
            display: "flex",
            width: 460,
            margin: 36,
            borderRadius: 36,
            background: "linear-gradient(165deg, #123456 0%, #0B1F33 58%, #0E3A4A 100%)",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: 999,
              background: "rgba(47,157,255,0.28)",
              top: 40,
              left: 90,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: 999,
              background: "rgba(62,225,200,0.2)",
              bottom: 50,
              right: 36,
            }}
          />
          {markSvg("ogpanel", { size: 188, variant: "reversed" })}
        </div>
      </div>
    ),
    size,
  );
}
