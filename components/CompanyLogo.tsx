"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { LogoTile } from "@/lib/companies";

const PRESETS = { xs: 18, sm: 28, md: 44, lg: 56 } as const;

export type LogoSize = keyof typeof PRESETS | number;

const BADGE_COLORS = [
  { bg: "#071421", fg: "#3ee1c8" },
  { bg: "#0b1e32", fg: "#e8b84a" },
  { bg: "#2f9dff", fg: "#071421" },
  { bg: "#3ee1c8", fg: "#071421" },
  { bg: "#e8b84a", fg: "#071421" },
] as const;

function resolveSize(size: LogoSize) {
  return typeof size === "number" ? size : PRESETS[size];
}

function badgeColor(name: string) {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return BADGE_COLORS[hash % BADGE_COLORS.length];
}

function frameStyle(size: number, background: string): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: Math.max(6, Math.round(size * 0.22)),
    background,
    boxSizing: "border-box",
    border: "1px solid var(--stroke)",
    display: "inline-grid",
    placeItems: "center",
    overflow: "hidden",
    flexShrink: 0,
    verticalAlign: "middle",
  };
}

function InitialBadge({ name, size }: { name: string; size: number }) {
  const color = badgeColor(name);
  const letter = name.trim()[0]?.toUpperCase() ?? "?";
  return (
    <span
      role="img"
      aria-label={`${name} logo`}
      style={{
        ...frameStyle(size, color.bg),
        color: color.fg,
        fontSize: Math.max(11, Math.round(size * 0.46)),
        fontWeight: 600,
        lineHeight: 1,
      }}
    >
      {letter}
    </span>
  );
}

export function CompanyLogo({
  name,
  src,
  size = "md",
  tile = "light",
  loading = "lazy",
}: {
  name: string;
  src?: string;
  size?: LogoSize;
  tile?: LogoTile;
  /** Eager for a logo that is actually in the intro. Everything else stays lazy. */
  loading?: "eager" | "lazy";
}) {
  const px = resolveSize(size);
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const failed = Boolean(src) && failedSrc === src;
  const eager = loading === "eager";

  const remote = /^https?:\/\//i.test(src ?? "");
  const local = Boolean(src?.startsWith("/"));
  // Maker thumbnails are already resized. Serve the file directly so the page does not
  // ask the image optimizer for a larger variant of a small logo.
  const direct = remote || Boolean(src?.startsWith("/logos/makers/"));
  if (!src || failed || (!remote && !local)) return <InitialBadge name={name} size={px} />;

  const background = tile === "dark" ? "#071421" : "#eef4f9";
  const alt = `${name} logo`;

  return (
    <span style={frameStyle(px, background)}>
      {direct ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={px}
          height={px}
          loading={eager ? "eager" : "lazy"}
          decoding={eager ? "auto" : "async"}
          referrerPolicy={remote ? "no-referrer" : undefined}
          onError={() => setFailedSrc(src)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={px}
          height={px}
          sizes={`${px}px`}
          loading={eager ? "eager" : "lazy"}
          unoptimized={src.endsWith(".svg")}
          onError={() => setFailedSrc(src)}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      )}
    </span>
  );
}
