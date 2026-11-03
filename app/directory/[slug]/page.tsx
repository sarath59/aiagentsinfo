import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText } from "@/components/CompanyMarks";
import { EmptyState } from "@/components/EmptyState";
import { ListingCard, ListingRow } from "@/components/ListingCard";
import { MarkdownBody } from "@/components/MarkdownBody";
import {
  categoryTitle,
  collectionBySlug,
  directoryCollections,
  getDirectoryListing,
  getDirectoryListings,
  listingsForCollection,
  relatedListings,
} from "@/lib/directory";
import { companyForName } from "@/lib/companies";
import { JsonLd, defaultMetadata, softwareJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const listings = await getDirectoryListings();
  const listingParams = listings.map((listing) => ({ slug: listing.slug }));
  const collectionParams = directoryCollections.map((collection) => ({ slug: collection.slug }));
  return [...listingParams, ...collectionParams];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = collectionBySlug(slug);
  if (collection) {
    return defaultMetadata(collection.title, `${collection.title} in the AI Agents Info directory.`, `/directory/${slug}`);
  }
  const listing = await getDirectoryListing(slug);
  if (!listing) return {};
  return defaultMetadata(listing.name, listing.summary, `/directory/${listing.slug}`);
}

export default async function DirectorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = await getDirectoryListings();
  const collection = collectionBySlug(slug);
  if (collection) {
    const items = listingsForCollection(all, slug);
    return (
      <>
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Directory", path: "/directory" },
            { name: collection.title, path: `/directory/${slug}` },
          ]}
        />
        <div className="mx-auto max-w-6xl px-4 pb-20 pt-12">
          <p className="kicker">Collection</p>
          <h1 className="display mt-3 text-5xl">{collection.title}</h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            A product appears here only when its listing carries this editorial flag. This is not a popularity ranking.
          </p>
          {items.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {items.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="Nothing in this collection yet"
                body="Listings show up here only after a real entry is filed. Nothing is ranked to fill the page."
                href="/directory"
                cta="Browse the directory"
              />
            </div>
          )}
        </div>
      </>
    );
  }

  const listing = all.find((item) => item.slug === slug);
  if (!listing) notFound();
  const related = relatedListings(listing, all);
  const brand = companyForName(listing.name);

  return (
    <>
      <JsonLd
        data={softwareJsonLd({
          name: listing.name,
          description: listing.summary,
          path: `/directory/${listing.slug}`,
          website: listing.website,
          category: listing.category,
          pricingSummary: listing.pricingSummary,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: listing.name, path: `/directory/${listing.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
        {listing.sponsored ? <p className="kicker text-[var(--gold)]">Sponsored listing</p> : null}
        {listing.communitySubmitted ? (
          <p className="mt-3">
            <span className="chip border-[color-mix(in_oklab,var(--gold-bright)_55%,var(--stroke))] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
              Community submitted
            </span>
          </p>
        ) : null}
        <div className="mt-3 flex items-start gap-4">
          <CompanyLogo name={listing.name} src={listing.logo || undefined} tile={brand?.tile} size="lg" />
          <div className="min-w-0">
            <p className="kicker">
              {categoryTitle(listing.category)} · <InlineCompanyText text={listing.vendor} />
            </p>
            <h1 className="display mt-3 text-5xl">{listing.name}</h1>
          </div>
        </div>
        <p className="mt-4 text-lg text-[var(--muted)]">
          <InlineCompanyText text={listing.summary} />
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          Last verified: <time dateTime={listing.lastVerified}>{formatDate(listing.lastVerified)}</time>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn-primary px-4 py-2 text-sm" href={listing.website} rel="noreferrer">
            Website
          </a>
          <Link className="btn-ghost px-4 py-2 text-sm" href={`/directory/category/${listing.category}`}>
            {categoryTitle(listing.category)}
          </Link>
        </div>
        {listing.features.length ? (
          <section className="mt-10">
            <h2 className="font-semibold tracking-tight text-2xl">Features</h2>
            <ul className="mt-3 list-disc pl-5">
              {listing.features.map((feature) => (
                <li key={feature} className="mt-2">
                  <InlineCompanyText text={feature} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl">Pricing summary</h2>
          <p className="mt-3 text-[var(--muted)]">
            <InlineCompanyText text={listing.pricingSummary} />
          </p>
          <p className="mt-2 text-sm">{listing.pricing.join(" · ")}</p>
        </section>
        <div className="mt-8">
          <MarkdownBody html={listing.html} />
        </div>
        {listing.tags.length ? (
          <section className="mt-8">
            <h2 className="font-semibold tracking-tight text-2xl">Tags</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {listing.tags.map((tag) => (
                <Link key={tag} href={`/directory/tag/${tag}`} className="chip">
                  {tag}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        {related.length ? (
          <section className="mt-10">
            <h2 className="font-semibold tracking-tight text-2xl">Related tools</h2>
            <ul className="mt-3 grid gap-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <ListingRow listing={item} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
