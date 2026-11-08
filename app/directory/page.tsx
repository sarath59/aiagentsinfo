import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { BestOfLinks } from "@/components/BestOfLinks";
import { ListingCard } from "@/components/ListingCard";
import { SubmitToolButton } from "@/components/SubmitToolButton";
import {
  allTags,
  allUseCases,
  directoryCategories,
  filterDirectory,
  getDirectoryListings,
  pricingModels,
} from "@/lib/directory";
import { defaultMetadata } from "@/lib/seo";
import { audiences } from "@/lib/site";
import { normalizeQuery } from "@/lib/utils";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = directoryFilters(params);
  const filtered = Object.values(filters).some(Boolean);
  const onlyCategory =
    Boolean(filters.category) &&
    directoryCategories.some((category) => category.slug === filters.category) &&
    !filters.q &&
    !filters.pricing &&
    !filters.useCase &&
    !filters.audience &&
    !filters.tag;
  return defaultMetadata(
    "Tools, apps, SaaS, and agents",
    "A directory of AI SaaS, tools, apps, and agents. Each listing names a real product and its official site.",
    "/directory",
    {
      index: !filtered,
      canonicalPath: onlyCategory ? `/directory/category/${filters.category}` : "/directory",
    },
  );
}

function directoryFilters(params: Record<string, string | string[] | undefined>) {
  return {
    q: normalizeQuery(params.q),
    category: normalizeQuery(params.category),
    pricing: normalizeQuery(params.pricing),
    useCase: normalizeQuery(params.useCase),
    audience: normalizeQuery(params.audience),
    tag: normalizeQuery(params.tag),
  };
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = directoryFilters(params);
  const listings = await getDirectoryListings();
  const filtered = filterDirectory(listings, filters);
  const tags = allTags(listings);
  const useCases = allUseCases(listings);
  const select = "focus-ring rounded-full border border-[var(--stroke)] bg-transparent px-3 py-2 text-sm";

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Directory", path: "/directory" }]} />
      <header className="mx-auto max-w-6xl px-4 pb-6 pt-10">
        <p className="kicker kicker-lead">AI directory</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Tools, apps, SaaS, and agents</h1>
        <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
            Real products with a working official site. No ratings, user counts, or invented rankings. Editorial
            listings are written by this desk. Community submitted listings are the maker&apos;s text.{" "}
            <Link href="/editorial-policy#directory">How submissions are published and indexed</Link>.
          </p>
          <SubmitToolButton />
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <BestOfLinks intro="Directory listings that appear in a sourced comparison keep the same product name and official site." />

        <div className="flex flex-wrap gap-2">
          <Link href="/directory/new" className="chip">
            New this week
          </Link>
          <Link href="/directory/trending" className="chip">
            Trending
          </Link>
          <Link href="/directory/editors-picks" className="chip">
            Editor&apos;s picks
          </Link>
          <Link href="/directory/stats" className="chip">
            Stats
          </Link>
        </div>

        <form className="glass mt-6 grid gap-3 rounded-3xl p-4 md:grid-cols-5" action="/directory" method="get">
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search listings"
            className="focus-ring rounded-full border border-[var(--stroke)] bg-transparent px-4 py-2 md:col-span-2"
          />
          <select name="category" defaultValue={filters.category} className={select}>
            <option value="">All categories</option>
            {directoryCategories.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <select name="pricing" defaultValue={filters.pricing} className={select}>
            <option value="">Any pricing</option>
            {pricingModels.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <button className="btn-primary px-5 py-2 text-sm" type="submit">
            Filter
          </button>
          <select name="useCase" defaultValue={filters.useCase} className={select}>
            <option value="">Any use case</option>
            {useCases.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select name="audience" defaultValue={filters.audience} className={select}>
            <option value="">Any audience</option>
            {audiences.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <select name="tag" defaultValue={filters.tag} className={`${select} md:col-span-2`}>
            <option value="">Any tag</option>
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </form>

        <p className="mt-6 text-sm text-[var(--muted)]">
          {filtered.length} listing{filtered.length === 1 ? "" : "s"}
        </p>
        {filtered.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {filtered.map((listing, index) => (
              <span key={listing.slug} className="contents">
                {index === submitBannerAt(filtered.length) ? <SubmitBanner /> : null}
                <ListingCard listing={listing} logoLoading={index < 2 ? "eager" : "lazy"} />
              </span>
            ))}
            {submitBannerAt(filtered.length) >= filtered.length ? <SubmitBanner /> : null}
          </div>
        ) : (
          <div className="mt-4">
            <EmptyState
              title={listings.length === 0 ? "Listings coming soon — submit a tool" : "No listings match these filters"}
              body={
                listings.length === 0
                  ? "The directory will list real products with a working official site. Submit one if you want it considered."
                  : "Clear the filters or submit a tool. Products are not invented to fill the grid."
              }
              href={listings.length === 0 ? "/submit" : "/directory"}
              cta={listings.length === 0 ? "Submit a tool" : "Reset directory"}
            />
          </div>
        )}
      </div>
    </>
  );
}

function submitBannerAt(count: number) {
  if (count < 2) return count;
  return Math.floor(count / 2);
}

function SubmitBanner() {
  return (
    <aside className="glass flex flex-col items-start justify-between gap-4 rounded-3xl p-6 sm:flex-row sm:items-center md:col-span-2">
      <p className="max-w-xl text-sm leading-relaxed text-[var(--muted)]">
        Built a product that belongs in this list? Send it from the form. No account and no payment.
      </p>
      <SubmitToolButton />
    </aside>
  );
}
