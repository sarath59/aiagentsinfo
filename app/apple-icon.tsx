import { ImageResponse } from "next/og";
import { markSvg } from "@/components/Logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F33",
          borderRadius: 40,
        }}
      >
        {markSvg("apple", { size: 132 })}
      </div>
    ),
    size,
  );
}
