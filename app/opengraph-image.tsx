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
          background: "linear-gradient(135deg, #07060d 0%, #161326 50%, #0b1c24 100%)",
          color: "#f4efe6",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#b7b0c6" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.05, maxWidth: 900 }}>{site.tagline}</div>
        <div style={{ fontSize: 22, color: "#8b6cff" }}>Directory · Research · Learning</div>
      </div>
    ),
    size,
  );
}
