/** Pure helpers for report scroll depth and related-click goals. */

export const REPORT_PATH = /^\/reports\/([a-z0-9_-]+)\/?$/;
export const RESEARCH_PATH = /^\/research\/([a-z0-9_-]+)\/?$/;

export function reportSlugFromPath(pathname: string): string | null {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "";
  const match = path.match(REPORT_PATH);
  return match?.[1] ?? null;
}

export function researchSlugFromPath(pathname: string): string | null {
  const path = pathname.split("?")[0]?.split("#")[0] ?? "";
  const match = path.match(RESEARCH_PATH);
  return match?.[1] ?? null;
}

export function contentSlugFromPath(pathname: string): string | null {
  return reportSlugFromPath(pathname) ?? researchSlugFromPath(pathname);
}

export function pageSlug(pathname: string) {
  return pathname.split("?")[0]?.split("#")[0]?.replace(/^\/+|\/+$/g, "") ?? "";
}

/**
 * Fraction of a column that has crossed into the viewport, measured from the
 * top of the column. 0.5 means the halfway point is at or above the bottom
 * edge of the viewport.
 */
export function columnReadFraction(top: number, height: number, viewport: number) {
  if (height <= 0 || viewport <= 0) return 0;
  const seen = Math.min(height, Math.max(0, viewport - top));
  return seen / height;
}

export function columnShorterThanViewport(height: number, viewport: number) {
  return height <= viewport + 1;
}

export type ClickDedupe = { key: string; at: number };

/** One related_click per from/to pair inside a short window, so two listeners do not double-count. */
export function shouldEmitRelatedClick(previous: ClickDedupe, fromSlug: string, toSlug: string, now: number) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return { emit: false, state: previous };
  const key = `${fromSlug}|${toSlug}`;
  if (key === previous.key && now - previous.at < 800) return { emit: false, state: previous };
  return { emit: true, state: { key, at: now } };
}

export function relatedClickMetadata(fromPath: string, toPath: string) {
  const from = pageSlug(fromPath);
  const to = pageSlug(toPath);
  const reportSlug = reportSlugFromPath(fromPath.startsWith("/") ? fromPath : `/${from}`);
  const metadata: Record<string, string> = { from_slug: from, to_slug: to };
  if (reportSlug) metadata.report_slug = reportSlug;
  return metadata;
}
