import { badgeNotFound, badgeSvgResponse, parseBadgeSlugFile, renderBadge } from "@/lib/badge";
import { badgeStaticIds, resolveBadgeName } from "@/lib/badge-names";

export const dynamic = "force-static";
export const dynamicParams = false;
export const runtime = "nodejs";

export async function generateStaticParams() {
  const ids = await badgeStaticIds();
  return ids.map((id) => ({ slug: `${id}.svg` }));
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const id = parseBadgeSlugFile(slug);
  if (!id) return badgeNotFound();
  const resolved = await resolveBadgeName(id);
  if (!resolved.ok) return badgeNotFound();
  const art = renderBadge({ name: resolved.name, variant: "light" });
  return badgeSvgResponse(art.svg);
}
