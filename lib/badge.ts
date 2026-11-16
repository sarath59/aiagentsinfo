import { MARK_HEIGHT, MARK_WIDTH, brandMarkPaths } from "@/components/Logo";

/** Public origin. Embeds always point here, including when a local build uses localhost. */
export const BADGE_ORIGIN = "https://www.aiagentsinfo.com";

export const BADGE_ALT = "Listed on AI Agents Info";

/** Generic badge. Not a directory listing slug. */
export const GENERIC_BADGE_SLUG = "listed";

export const BADGE_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400";

const BRAND_LINE = "Listed on AI Agents Info";
const NAME_LIMIT = 28;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FONT =
  "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Advance widths as a fraction of the font size, close to Inter. Unknown letters use a wide fallback. */
const ADVANCE: Record<string, number> = {
  " ": 0.28,
  "·": 0.4,
  "…": 0.95,
  "!": 0.35,
  '"': 0.42,
  "#": 0.68,
  $: 0.62,
  "%": 0.86,
  "&": 0.72,
  "'": 0.22,
  "(": 0.38,
  ")": 0.38,
  "*": 0.46,
  "+": 0.62,
  ",": 0.26,
  "-": 0.4,
  ".": 0.28,
  "/": 0.42,
  ":": 0.3,
  ";": 0.3,
  "?": 0.54,
  "@": 0.92,
  "0": 0.62,
  "1": 0.46,
  "2": 0.58,
  "3": 0.6,
  "4": 0.62,
  "5": 0.58,
  "6": 0.62,
  "7": 0.56,
  "8": 0.62,
  "9": 0.62,
  A: 0.7,
  B: 0.66,
  C: 0.72,
  D: 0.74,
  E: 0.62,
  F: 0.58,
  G: 0.76,
  H: 0.76,
  I: 0.3,
  J: 0.5,
  K: 0.68,
  L: 0.56,
  M: 0.9,
  N: 0.76,
  O: 0.78,
  P: 0.64,
  Q: 0.78,
  R: 0.68,
  S: 0.62,
  T: 0.6,
  U: 0.74,
  V: 0.68,
  W: 0.98,
  X: 0.68,
  Y: 0.66,
  Z: 0.64,
  a: 0.58,
  b: 0.62,
  c: 0.54,
  d: 0.62,
  e: 0.58,
  f: 0.38,
  g: 0.62,
  h: 0.6,
  i: 0.28,
  j: 0.28,
  k: 0.56,
  l: 0.28,
  m: 0.9,
  n: 0.6,
  o: 0.6,
  p: 0.62,
  q: 0.62,
  r: 0.4,
  s: 0.52,
  t: 0.38,
  u: 0.6,
  v: 0.54,
  w: 0.8,
  x: 0.54,
  y: 0.54,
  z: 0.52,
};

export type BadgeVariant = "light" | "dark" | "compact";

export type BadgeEmbed = {
  href: string;
  src: string;
  path: string;
  html: string;
  markdown: string;
  width: number;
  height: number;
  darkPath: string;
  compactPath: string;
};

type LineRole = "name" | "sub";

type Line = {
  text: string;
  x: number;
  y: number;
  size: number;
  weight: 400 | 600;
  role: LineRole;
};

type Metrics = {
  width: number;
  height: number;
  rx: number;
  markX: number;
  markY: number;
  markH: number;
  lines: Line[];
  title: string;
};

const COLORS = {
  light: {
    bg: "#FFFFFF",
    stroke: "#D5DEE8",
    name: "#0B1F33",
    sub: "#3A5168",
    reversed: false,
  },
  dark: {
    bg: "#0B1F33",
    stroke: "#2A5A78",
    name: "#F4F8FB",
    sub: "#C5D5E4",
    reversed: true,
  },
} as const;

export function isBadgeSlug(slug: string) {
  return SLUG_RE.test(slug);
}

export function parseBadgeSlugFile(file: string) {
  const match = /^([a-z0-9]+(?:-[a-z0-9]+)*)\.svg$/.exec(file);
  return match ? match[1] : null;
}

export function parseBadgeVariantFile(file: string): "dark" | "compact" | null {
  if (file === "dark.svg") return "dark";
  if (file === "compact.svg") return "compact";
  return null;
}

export function cleanBadgeName(name: string) {
  const one = name.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
  const chars = [...one];
  if (chars.length <= NAME_LIMIT) return one;
  return `${chars.slice(0, NAME_LIMIT - 1).join("").trimEnd()}…`;
}

export function renderBadge(options: { name?: string; variant?: BadgeVariant } = {}) {
  const variant = options.variant ?? "light";
  const box = metrics(options.name, variant);
  const colors = variant === "dark" ? COLORS.dark : COLORS.light;
  const markW = Math.ceil((box.markH * MARK_WIDTH) / MARK_HEIGHT);
  const lines = box.lines
    .map((line) => {
      const fill = line.role === "sub" ? colors.sub : colors.name;
      return `<text x="${line.x}" y="${line.y}" fill="${fill}" font-family="${FONT}" font-size="${line.size}" font-weight="${line.weight}">${escapeXml(line.text)}</text>`;
    })
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${box.width}" height="${box.height}" viewBox="0 0 ${box.width} ${box.height}" role="img">
<title>${escapeXml(box.title)}</title>
<rect x="0.5" y="0.5" width="${box.width - 1}" height="${box.height - 1}" rx="${box.rx}" fill="${colors.bg}" stroke="${colors.stroke}"/>
<svg x="${box.markX}" y="${box.markY}" width="${markW}" height="${box.markH}" viewBox="0 0 ${MARK_WIDTH} ${MARK_HEIGHT}">
<defs>${markGradients(colors.reversed)}</defs>
<path fill="url(#badge-a)" d="${brandMarkPaths.body}"/>
<path fill="url(#badge-a)" d="${brandMarkPaths.rightFoot}"/>
<path fill="url(#badge-star)" d="${brandMarkPaths.star}"/>
</svg>
${lines}
</svg>
`;
  return { variant, width: box.width, height: box.height, svg };
}

export function listingBadgeEmbed(slug: string, name: string): BadgeEmbed {
  if (!isBadgeSlug(slug) || slug === GENERIC_BADGE_SLUG) {
    throw new Error(`Cannot build a listing badge for slug "${slug}".`);
  }
  return embed({
    href: `${BADGE_ORIGIN}/directory/${slug}`,
    slug,
    name,
  });
}

export function genericBadgeEmbed(): BadgeEmbed {
  return embed({
    href: `${BADGE_ORIGIN}/directory`,
    slug: GENERIC_BADGE_SLUG,
  });
}

export function badgeSvgResponse(svg: string) {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": BADGE_CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export function badgeNotFound() {
  return new Response("Not found\n", {
    status: 404,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function embed(input: { href: string; slug: string; name?: string }): BadgeEmbed {
  const art = renderBadge({ name: input.name, variant: "light" });
  const path = `/badge/${input.slug}.svg`;
  const src = `${BADGE_ORIGIN}${path}`;
  const html = `<a href="${input.href}"><img src="${src}" alt="${BADGE_ALT}" width="${art.width}" height="${art.height}"></a>`;
  const markdown = `[![${BADGE_ALT}](${src})](${input.href})`;
  return {
    href: input.href,
    src,
    path,
    html,
    markdown,
    width: art.width,
    height: art.height,
    darkPath: `/badge/${input.slug}/dark.svg`,
    compactPath: `/badge/${input.slug}/compact.svg`,
  };
}

function metrics(rawName: string | undefined, variant: BadgeVariant): Metrics {
  const label = cleanBadgeName(rawName ?? "");
  const showName = label.length > 0 && variant !== "compact";
  const title = label ? `${label} is listed on AI Agents Info` : BRAND_LINE;
  if (variant === "compact") {
    return singleLine({
      text: BRAND_LINE,
      title,
      markH: 16,
      padX: 8,
      gap: 6,
      size: 12,
      height: 28,
      baseline: 18,
      rx: 7,
      weight: 600,
    });
  }
  if (!showName) {
    return singleLine({
      text: BRAND_LINE,
      title,
      markH: 22,
      padX: 10,
      gap: 8,
      size: 13,
      height: 36,
      baseline: 23,
      rx: 8,
      weight: 600,
    });
  }
  const markH = 28;
  const padX = 12;
  const gap = 10;
  const nameSize = 13;
  const subSize = 11;
  const markW = markWidth(markH);
  const textX = padX + markW + gap;
  const textW = Math.max(textWidth(label, nameSize, true), textWidth(BRAND_LINE, subSize, false));
  return {
    width: textX + textW + padX,
    height: 48,
    rx: 10,
    markX: padX,
    markY: Math.round((48 - markH) / 2),
    markH,
    title,
    lines: [
      { text: label, x: textX, y: 20, size: nameSize, weight: 600, role: "name" },
      { text: BRAND_LINE, x: textX, y: 36, size: subSize, weight: 400, role: "sub" },
    ],
  };
}

function singleLine(input: {
  text: string;
  title: string;
  markH: number;
  padX: number;
  gap: number;
  size: number;
  height: number;
  baseline: number;
  rx: number;
  weight: 400 | 600;
}): Metrics {
  const markW = markWidth(input.markH);
  const textX = input.padX + markW + input.gap;
  const textW = textWidth(input.text, input.size, input.weight === 600);
  return {
    width: textX + textW + input.padX,
    height: input.height,
    rx: input.rx,
    markX: input.padX,
    markY: Math.round((input.height - input.markH) / 2),
    markH: input.markH,
    title: input.title,
    lines: [
      {
        text: input.text,
        x: textX,
        y: input.baseline,
        size: input.size,
        weight: input.weight,
        role: "name",
      },
    ],
  };
}

function markWidth(height: number) {
  return Math.ceil((height * MARK_WIDTH) / MARK_HEIGHT);
}

function textWidth(text: string, fontSize: number, semibold: boolean) {
  let em = 0;
  for (const char of text) {
    const code = char.codePointAt(0) ?? 0;
    const known = ADVANCE[char];
    const base = known ?? (code > 0x2e80 ? 1.05 : 0.64);
    em += base;
  }
  const weight = semibold ? 1.06 : 1;
  return Math.ceil(em * fontSize * weight) + 2;
}

function markGradients(reversed: boolean) {
  const shape = reversed
    ? `<linearGradient id="badge-a" x1="18" y1="0" x2="576" y2="340" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.58" stop-color="#F7FBFC"/><stop offset="1" stop-color="#E4F6F5"/></linearGradient>`
    : `<linearGradient id="badge-a" x1="18" y1="0" x2="576" y2="340" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0B1F33"/><stop offset="0.46" stop-color="#102A46"/><stop offset="0.68" stop-color="#0C5CAD"/><stop offset="1" stop-color="#14B8A6"/></linearGradient>`;
  const star = `<linearGradient id="badge-star" x1="296" y1="150" x2="296" y2="318" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#F8E7A2"/><stop offset="0.48" stop-color="#E0B04A"/><stop offset="1" stop-color="#C4921A"/></linearGradient>`;
  return shape + star;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
