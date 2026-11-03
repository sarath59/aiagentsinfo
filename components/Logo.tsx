import { useId, type ReactNode, type SVGProps } from "react";

type MarkProps = {
  className?: string;
  title?: string;
  size?: number;
};

/**
 * Lattice mark: a harness diamond, four agent nodes, and a gold core.
 * Square nodes and straight braces — not a ring, not a letter.
 */
export function BrandMark({ className, title, size }: MarkProps) {
  const prefix = useId().replace(/:/g, "");
  return markSvg(prefix, { className, title, size });
}

export function markSvg(
  prefix: string,
  { className, title, size }: MarkProps = {},
): ReactNode {
  const id = prefix.replace(/:/g, "");
  const diamond = `${id}-diamond`;
  const node = `${id}-node`;
  const gold = `${id}-gold`;
  const cage = `${id}-cage`;
  const svgProps: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 64 64",
    fill: "none",
    className,
    width: size,
    height: size,
    role: title ? "img" : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
  };

  return (
    <svg {...svgProps}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={diamond} x1="19" y1="19" x2="45" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1A5A9E" />
          <stop offset="0.48" stopColor="#1570C9" />
          <stop offset="1" stopColor="#2ED3C6" />
        </linearGradient>
        <linearGradient id={node} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2F9DFF" />
          <stop offset="1" stopColor="#14B8A6" />
        </linearGradient>
        <linearGradient id={gold} x1="26" y1="26" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F6D56A" />
          <stop offset="1" stopColor="#C4921A" />
        </linearGradient>
        <linearGradient id={cage} x1="11" y1="11" x2="53" y2="53" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1A8CFF" />
          <stop offset="1" stopColor="#0E9B8E" />
        </linearGradient>
      </defs>
      <path
        d="M32 11 L53 32 L32 53 L11 32 Z"
        stroke={`url(#${cage})`}
        strokeWidth="3.2"
        strokeLinejoin="miter"
      />
      <path d="M32 19 L45 32 L32 45 L19 32 Z" fill={`url(#${diamond})`} />
      <path
        d="M32 21.5 V42.5 M21.5 32 H42.5"
        stroke="#E7F7FF"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
      <path d="M32 26.2 L37.8 32 L32 37.8 L26.2 32 Z" fill={`url(#${gold})`} />
      <rect x="26.5" y="5.5" width="11" height="11" rx="2.2" fill={`url(#${node})`} />
      <rect x="47.5" y="26.5" width="11" height="11" rx="2.2" fill={`url(#${node})`} />
      <rect x="26.5" y="47.5" width="11" height="11" rx="2.2" fill={`url(#${node})`} />
      <rect x="5.5" y="26.5" width="11" height="11" rx="2.2" fill={`url(#${node})`} />
    </svg>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={`flex flex-col justify-center leading-none ${className ?? ""}`}>
      <span className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-[var(--fg)]">
        AI Agents
      </span>
      <span className="mt-[5px] font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-[var(--gold)]">
        Info
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}>
      <BrandMark className="h-9 w-9 shrink-0 drop-shadow-[0_8px_14px_rgba(12,92,173,0.18)]" />
      <BrandWordmark />
    </span>
  );
}
