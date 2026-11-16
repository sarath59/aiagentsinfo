import {
  badgeNotFound,
  badgeSvgResponse,
  isBadgeSlug,
  parseBadgeVariantFile,
  renderBadge,
} from "@/lib/badge";
import { badgeStaticIds, resolveBadgeName } from "@/lib/badge-names";

export const dynamic = "force-static";
export const dynamicParams = false;
export const runtime = "nodejs";

export async function generateStaticParams() {
  const ids = await badgeStaticIds();
  return ids.flatMap((id) => [
    { slug: id, variant: "dark.svg" },
    { slug: id, variant: "compact.svg" },
  ]);
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
