import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07060d",
          color: "#f4efe6",
          fontSize: 11,
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        AI
      </div>
    ),
    size,
  );
}
