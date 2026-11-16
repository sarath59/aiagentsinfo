import { getDirectoryListings } from "@/lib/directory";
import { GENERIC_BADGE_SLUG, isBadgeSlug } from "@/lib/badge";

let pending: Promise<Map<string, string>> | null = null;

export function listingNames() {
  if (process.env.NODE_ENV === "production" && pending) return pending;
  const next = getDirectoryListings()
    .then((listings) => new Map(listings.map((listing) => [listing.slug, listing.name])))
    .catch((error) => {
      pending = null;
      throw error;
    });
  if (process.env.NODE_ENV === "production") pending = next;
  return next;
}

export async function badgeStaticIds() {
  const names = await listingNames();
  return [...new Set([GENERIC_BADGE_SLUG, ...names.keys()])];
}

/** `listed` is the generic badge. Any other slug must be a published listing. */
export async function resolveBadgeName(slug: string): Promise<{ ok: true; name?: string } | { ok: false }> {
  if (!isBadgeSlug(slug)) return { ok: false };
  if (slug === GENERIC_BADGE_SLUG) return { ok: true };
  const name = (await listingNames()).get(slug);
  if (!name) return { ok: false };
  return { ok: true, name };
}
