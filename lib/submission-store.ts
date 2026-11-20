import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { redactSupabase, supabaseConfig, supabaseHeaders } from "@/lib/supabase";
import { suggestSlug, validateSubmission, websiteDomain, type ToolSubmission } from "@/lib/submissions";

/**
 * Directory submissions stored in the Supabase table `directory_submissions`.
 * Saving a row does not commit to git, so it does not trigger a deploy.
 */
const TABLE = "directory_submissions";

/** Every cached read carries this tag. */
export const STORED_SUBMISSIONS_TAG = "directory-submissions";

export function storedSubmissionTag(slug: string) {
  return `directory-submission:${slug}`;
}

/**
 * A saved submission expires the cached reads right away (see refreshAfterInsert). This interval
 * only picks up rows edited in the Supabase dashboard, which do not pass through the form.
 */
export const STORED_LIST_REVALIDATE_SECONDS = 21600;

/** Each cached page has to stay under the 2 MB cache entry limit. A row is at most about 8 KB. */
const PAGE_SIZE = 200;
const MAX_PAGES = 250;

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The email column is never selected for pages. */
const PUBLIC_COLUMNS = [
  "slug",
  "status",
  "submitted_at",
  "name",
  "website",
  "tagline",
  "description",
  "category",
  "type",
  "pricing",
  "starting_price",
  "billing_period",
  "pricing_page_url",
  "logo_url",
  "maker_name",
  "maker_x",
  "maker_type",
  "yc_batch",
  "launch_year",
  "revenue_source_url",
  "linkedin_url",
  "github_url",
  "youtube_url",
  "discord_url",
  "instagram_url",
  "product_hunt_url",
].join(",");

type StoredRow = {
  slug: string;
  status: string;
  submitted_at: string;
  name: string;
  website: string;
  tagline: string;
  description: string;
  category: string;
  type: string | null;
  pricing: string;
  starting_price: string | null;
  billing_period: string | null;
  pricing_page_url: string | null;
  logo_url: string | null;
  maker_name: string | null;
  maker_x: string | null;
  maker_type: string | null;
  yc_batch: string | null;
  launch_year: number | null;
  revenue_source_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  youtube_url: string | null;
  discord_url: string | null;
  instagram_url: string | null;
  product_hunt_url: string | null;
};

async function requestRows(query: string): Promise<StoredRow[]> {
  const config = supabaseConfig();
  if (!config) return [];
  const response = await fetch(`${config.restUrl}/${TABLE}?${query}`, {
    headers: supabaseHeaders(config),
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Supabase read failed (HTTP ${response.status}): ${redactSupabase(body, config)}`);
  }
  const rows: unknown = await response.json();
  if (!Array.isArray(rows)) throw new Error("Supabase read did not return a list.");
  return rows as StoredRow[];
}

const readPage = unstable_cache(
  async (offset: number) =>
    requestRows(
      `select=${PUBLIC_COLUMNS}&status=eq.approved&order=submitted_at.asc,slug.asc&limit=${PAGE_SIZE}&offset=${offset}`,
    ),
  ["directory-submissions-page-v1"],
  { tags: [STORED_SUBMISSIONS_TAG], revalidate: STORED_LIST_REVALIDATE_SECONDS },
);

/**
 * Approved rows, oldest first. Returns [] when Supabase is not configured.
 * Throws when it is configured and the read fails, so a regeneration keeps the last good page
 * instead of dropping listings.
 */
export async function storedSubmissions(): Promise<ToolSubmission[]> {
  if (!supabaseConfig()) return [];
  const rows: StoredRow[] = [];
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const batch = await readPage(page * PAGE_SIZE);
    rows.push(...batch);
    if (batch.length < PAGE_SIZE) break;
  }
  const seen = new Set<string>();
  const submissions: ToolSubmission[] = [];
  for (const row of rows) {
    if (seen.has(row.slug)) continue;
    seen.add(row.slug);
    const submission = rowToSubmission(row);
    if (submission) submissions.push(submission);
  }
  return submissions;
}

/** One approved row by slug, for a listing saved after the list was last read. */
export async function storedSubmission(slug: string): Promise<ToolSubmission | null> {
  if (!supabaseConfig() || slug.length > 64 || !SLUG_RE.test(slug)) return null;
  const row = await unstable_cache(
    async () => {
      const rows = await requestRows(`select=${PUBLIC_COLUMNS}&slug=eq.${slug}&status=eq.approved&limit=1`);
      return rows[0] ?? null;
    },
    ["directory-submission-v1", slug],
    {
      tags: [STORED_SUBMISSIONS_TAG, storedSubmissionTag(slug)],
      revalidate: STORED_LIST_REVALIDATE_SECONDS,
    },
  )();
  return row ? rowToSubmission(row) : null;
}

/**
 * Call from the route handler after a successful insert. Every page that read the table carries
 * STORED_SUBMISSIONS_TAG, so the directory, categories, sitemap, and llms.txt pick up the row on
 * their next request. The slug path covers a listing page that was never prerendered.
 */
export function refreshAfterInsert(slug: string) {
  revalidateTag(STORED_SUBMISSIONS_TAG, { expire: 0 });
  revalidateTag(storedSubmissionTag(slug), { expire: 0 });
  revalidatePath(`/directory/${slug}`);
}

export type StoreResult =
  | { ok: true; slug: string }
  | { ok: false; reason: "duplicate" | "store"; status: number };

/**
 * Inserts an approved row. The table's unique keys reject a second row for the same slug or
 * website domain. A slug clash retries with the next free slug. A domain clash is a duplicate.
 */
export async function insertSubmission(submission: ToolSubmission, takenSlugs: Iterable<string>): Promise<StoreResult> {
  const config = supabaseConfig();
  if (!config) return { ok: false, reason: "store", status: 503 };

  const taken = new Set(takenSlugs);
  let slug = submission.slug;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    let response: Response;
    try {
      response = await fetch(`${config.restUrl}/${TABLE}`, {
        method: "POST",
        headers: supabaseHeaders(config, { "Content-Type": "application/json", Prefer: "return=minimal" }),
        body: JSON.stringify(submissionToRow({ ...submission, slug })),
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
    } catch (error) {
      console.error("[submission-store] insert network", error instanceof Error ? error.message : "error");
      return { ok: false, reason: "store", status: 502 };
    }
    if (response.ok) {
      await response.body?.cancel().catch(() => undefined);
      return { ok: true, slug };
    }
    const body = await response.text().catch(() => "");
    if (response.status === 409) {
      if (body.includes("website_domain")) return { ok: false, reason: "duplicate", status: 409 };
      taken.add(slug);
      const next = suggestSlug(submission.name, taken);
      if (next === slug) return { ok: false, reason: "duplicate", status: 409 };
      slug = next;
      continue;
    }
    console.error("[submission-store] insert", response.status, redactSupabase(body, config));
    return { ok: false, reason: "store", status: 502 };
  }
  return { ok: false, reason: "duplicate", status: 409 };
}

function rowToSubmission(row: StoredRow): ToolSubmission | null {
  const result = validateSubmission(
    {
      name: row.name,
      website: row.website,
      tagline: row.tagline,
      description: row.description,
      category: row.category,
      type: row.type,
      pricing: row.pricing,
      startingPrice: row.starting_price,
      billingPeriod: row.billing_period,
      pricingPageUrl: row.pricing_page_url,
      logoUrl: row.logo_url,
      makerName: row.maker_name,
      makerX: row.maker_x,
      makerType: row.maker_type,
      ycBatch: row.yc_batch,
      launchYear: row.launch_year,
      revenueSourceUrl: row.revenue_source_url,
      linkedinUrl: row.linkedin_url,
      githubUrl: row.github_url,
      youtubeUrl: row.youtube_url,
      discordUrl: row.discord_url,
      instagramUrl: row.instagram_url,
      productHuntUrl: row.product_hunt_url,
      status: row.status,
      submittedAt: row.submitted_at,
      slug: row.slug,
    },
    { mode: "file", slug: row.slug },
  );
  if (!result.ok) {
    console.error("[submission-store] skipped row", row.slug, Object.keys(result.errors).join(","));
    return null;
  }
  return result.value;
}

function submissionToRow(submission: ToolSubmission) {
  return {
    slug: submission.slug,
    website_domain: websiteDomain(submission.website) || submission.website,
    status: "approved",
    submitted_at: submission.submittedAt,
    name: submission.name,
    website: submission.website,
    tagline: submission.tagline,
    description: submission.description,
    category: submission.category,
    type: submission.type,
    pricing: submission.pricing,
    starting_price: submission.startingPrice,
    billing_period: submission.billingPeriod,
    pricing_page_url: submission.pricingPageUrl,
    logo_url: submission.logoUrl,
    maker_name: submission.makerName,
    maker_x: submission.makerX,
    maker_type: submission.makerType,
    yc_batch: submission.ycBatch,
    launch_year: submission.launchYear,
    revenue_source_url: submission.revenueSourceUrl,
    linkedin_url: submission.linkedinUrl,
    github_url: submission.githubUrl,
    youtube_url: submission.youtubeUrl,
    discord_url: submission.discordUrl,
    instagram_url: submission.instagramUrl,
    product_hunt_url: submission.productHuntUrl,
    email: submission.email,
  };
}
