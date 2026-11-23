import { badgeNotFound, badgeSvgResponse, parseBadgeSlugFile, renderBadge } from "@/lib/badge";
import { resolveBadgeName } from "@/lib/badge-names";

export const dynamic = "force-static";
/** Built on first request (and cached). Prebuilding every listing badge doubled deploy time. */
export const dynamicParams = true;
export const runtime = "nodejs";

export function generateStaticParams() {
  return [{ slug: "listed.svg" }];
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
