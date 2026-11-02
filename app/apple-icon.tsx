import { ImageResponse } from "next/og";

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
          background: "#071421",
          borderRadius: 40,
        }}
      >
        <svg width="128" height="128" viewBox="0 0 48 48" fill="none">
          <path d="M24 13.2 L11.15 37.1" stroke="#3EE1C8" strokeWidth="3.7" strokeLinecap="butt" />
          <path d="M24 13.2 L36.85 37.1" stroke="#2F9DFF" strokeWidth="3.7" strokeLinecap="butt" />
          <rect x="16.9" y="25.35" width="14.2" height="2.45" rx="0.7" fill="#E8B84A" />
          <rect x="21.15" y="5.15" width="5.7" height="5.7" rx="0.85" fill="#F0C65C" />
          <rect x="7.35" y="36.05" width="5.15" height="5.15" rx="0.8" fill="#3EE1C8" />
          <rect x="35.5" y="36.05" width="5.15" height="5.15" rx="0.8" fill="#3EE1C8" />
        </svg>
      </div>
    ),
    size,
  );
}
