import { useId } from "react";

/** Orthogonal constructed "A": two agent-nodes, a gold lintel, a gold apex. Not a ring. */
export function BrandMark({
  className,
  title = "AI Agents Info",
  variant = "auto",
}: {
  className?: string;
  title?: string;
  variant?: "auto" | "dark" | "light";
}) {
  const uid = useId().replace(/:/g, "");
  const light = variant === "light";
  const gradientId = `${uid}-leg`;
  const start = light ? "#1AA7A0" : "#3EE1C8";
  const mid = light ? "#1570C9" : "#2F9DFF";
  const end = light ? "#2F9DFF" : "#7EC8FF";
  const gold = light ? "#C4921A" : "#E8B84A";
  const apex = light ? "#D4A017" : "#F0C65C";
  const node = light ? "#1AA7A0" : "#3EE1C8";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="9" y1="40" x2="36" y2="8" gradientUnits="userSpaceOnUse">
          <stop stopColor={start} />
          <stop offset="0.52" stopColor={mid} />
          <stop offset="1" stopColor={end} />
        </linearGradient>
      </defs>
      <path
        d="M24 13.2 L11.15 37.1"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.7"
        strokeLinecap="butt"
      />
      <path
        d="M24 13.2 L36.85 37.1"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.7"
        strokeLinecap="butt"
      />
      <rect x="16.9" y="25.35" width="14.2" height="2.45" rx="0.7" fill={gold} />
      <rect x="21.15" y="5.15" width="5.7" height="5.7" rx="0.85" fill={apex} />
      <rect x="7.35" y="36.05" width="5.15" height="5.15" rx="0.8" fill={node} />
      <rect x="35.5" y="36.05" width="5.15" height="5.15" rx="0.8" fill={node} />
    </svg>
  );
}

export function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={`flex flex-col justify-center leading-none ${className ?? ""}`}>
      <span className="font-sans text-[12.5px] font-semibold tracking-[0.22em] text-[var(--fg)] sm:text-[13.5px]">
        AI AGENTS
      </span>
      <span className="mt-[7px] font-sans text-[9px] font-semibold tracking-[0.5em] text-[var(--gold)]">
        INFO
      </span>
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className ?? ""}`}>
      <BrandMark className="h-8 w-8 shrink-0 drop-shadow-[0_0_14px_rgba(62,225,200,0.28)] sm:h-[34px] sm:w-[34px]" />
      <BrandWordmark />
    </span>
  );
}
