import {
  badgeNotFound,
  badgeSvgResponse,
  isBadgeSlug,
  parseBadgeVariantFile,
  renderBadge,
} from "@/lib/badge";
import { resolveBadgeName } from "@/lib/badge-names";

export const dynamic = "force-static";
/** Built on first request (and cached). Same SVG as before; not prebuilt for every listing. */
export const dynamicParams = true;
export const runtime = "nodejs";

export function generateStaticParams() {
  return [
    { slug: "listed", variant: "dark.svg" },
    { slug: "listed", variant: "compact.svg" },
  ];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; variant: string }> },
) {
  const { slug, variant: variantFile } = await context.params;
  const variant = parseBadgeVariantFile(variantFile);
  if (!variant || !isBadgeSlug(slug)) return badgeNotFound();
  const resolved = await resolveBadgeName(slug);
  if (!resolved.ok) return badgeNotFound();
  const art = renderBadge({ name: resolved.name, variant });
  return badgeSvgResponse(art.svg);
}
