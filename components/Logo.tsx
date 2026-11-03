import { useId, type ReactNode, type SVGProps } from "react";

export const MARK_WIDTH = 594;
export const MARK_HEIGHT = 340;

const BODY =
  "M284.10 1.50 C268.30 5.90 262.10 11.00 242.20 36.10 C233.40 47.30 218.30 66.20 208.80 78.10 C199.30 90.00 183.90 109.30 174.50 121.10 C165.20 132.90 151.70 149.90 144.50 159.00 C137.30 168.10 120.80 189.00 107.80 205.50 C94.90 222.00 76.00 245.70 65.90 258.10 C46.20 282.40 10.80 326.10 4.00 334.70 L-0.20 340.00 L54.20 340.00 C115.20 340.00 116.90 339.80 130.50 333.10 C141.00 327.90 147.10 322.20 161.50 304.40 C168.10 296.20 182.00 279.20 192.30 266.50 L211.20 243.50 L163.10 243.20 C136.60 243.10 115.00 242.70 115.00 242.40 C115.00 242.10 129.90 224.00 148.20 202.20 C166.50 180.40 189.50 152.80 199.40 141.00 C225.40 109.90 227.60 107.50 235.70 101.00 C244.50 93.90 253.10 89.00 262.50 85.90 C268.00 84.00 271.60 83.50 279.50 83.60 C292.60 83.60 300.40 86.50 306.70 93.70 C310.90 98.40 362.40 163.70 389.20 198.10 C403.60 216.50 410.80 223.30 421.30 228.40 C432.00 233.60 435.60 234.00 473.90 234.00 C509.40 234.00 509.40 234.00 506.90 231.20 C505.50 229.70 496.10 217.90 486.00 205.00 C475.90 192.10 465.30 178.60 462.50 175.00 C459.70 171.40 448.00 156.60 436.50 142.00 C416.50 116.50 363.20 49.90 343.80 26.00 C333.60 13.40 324.10 6.00 314.00 2.60 C306.60 0.10 291.20 -0.50 284.10 1.50 Z";

const RIGHT_FOOT =
  "M378.00 244.60 C378.00 246.20 384.90 254.20 404.40 275.50 C450.00 325.20 453.50 328.50 465.90 334.20 C477.90 339.80 480.50 340.00 539.90 340.00 C602.10 340.00 596.70 342.50 579.50 321.40 C574.60 315.30 560.50 297.90 548.20 282.70 L526.00 255.20 L475.20 254.70 C429.10 254.30 423.40 254.10 412.00 252.10 C401.20 250.20 384.40 246.20 379.50 244.40 C378.70 244.00 378.00 244.20 378.00 244.60 Z";

const STAR =
  "M296.70 153.00 C296.30 154.40 294.90 160.40 293.50 166.30 C288.20 189.20 281.30 204.70 272.90 212.50 C267.30 217.70 256.00 223.50 237.80 230.30 L226.00 234.60 L238.80 238.90 C261.80 246.40 274.50 254.30 280.50 264.40 C286.10 274.00 292.20 292.50 296.10 311.50 C297.30 317.50 297.30 317.50 299.10 308.50 C303.00 288.50 309.40 270.20 315.60 261.70 C321.90 253.00 332.10 247.10 354.00 239.30 C360.80 236.90 366.60 234.70 366.80 234.60 C366.90 234.40 362.50 232.60 356.80 230.50 C340.90 224.70 327.00 217.70 321.20 212.50 C312.50 204.70 305.10 187.10 299.60 161.30 C297.90 153.50 297.10 151.20 296.70 153.00 Z";

type MarkVariant = "default" | "reversed";

type MarkProps = {
  className?: string;
  title?: string;
  /** Height in pixels. Width follows the mark's aspect ratio. */
  size?: number;
  variant?: MarkVariant;
};

/** Geometric A with an inner arch and a four-point star. */
export function BrandMark({ className, title, size, variant }: MarkProps) {
  const prefix = useId().replace(/:/g, "");
  return markSvg(prefix, { className, title, size, variant });
}

export function markSvg(
  prefix: string,
  { className, title, size, variant = "default" }: MarkProps = {},
): ReactNode {
  const id = prefix.replace(/:/g, "");
  const shape = `${id}-a`;
  const star = `${id}-star`;
  const reversed = variant === "reversed";
  const width = size ? Math.round((size * MARK_WIDTH) / MARK_HEIGHT) : MARK_WIDTH;
  const height = size ?? MARK_HEIGHT;
  const svgProps: SVGProps<SVGSVGElement> = {
    viewBox: `0 0 ${MARK_WIDTH} ${MARK_HEIGHT}`,
    fill: "none",
    className,
    width,
    height,
    role: title ? "img" : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
  };

  const shapeGradient = reversed ? (
    <linearGradient id={shape} x1="18" y1="0" x2="576" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#FFFFFF" />
      <stop offset="0.58" stopColor="#F7FBFC" />
      <stop offset="1" stopColor="#E4F6F5" />
    </linearGradient>
  ) : (
    <linearGradient id={shape} x1="18" y1="0" x2="576" y2="340" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#0B1F33" />
      <stop offset="0.46" stopColor="#102A46" />
      <stop offset="0.68" stopColor="#0C5CAD" />
      <stop offset="1" stopColor="#14B8A6" />
    </linearGradient>
  );

  return (
    <svg {...svgProps}>
      {title ? <title>{title}</title> : null}
      <defs>
        {shapeGradient}
        <linearGradient id={star} x1="296" y1="150" x2="296" y2="318" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F8E7A2" />
          <stop offset="0.48" stopColor="#E0B04A" />
          <stop offset="1" stopColor="#C4921A" />
        </linearGradient>
      </defs>
      <path fill={`url(#${shape})`} d={BODY} />
      <path fill={`url(#${shape})`} d={RIGHT_FOOT} />
      <path fill={`url(#${star})`} d={STAR} />
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
      <BrandMark className="h-9 w-auto shrink-0 drop-shadow-[0_8px_14px_rgba(12,92,173,0.18)]" />
      <BrandWordmark />
    </span>
  );
}
