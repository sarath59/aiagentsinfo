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
  listingSocialLinks,
  listingsForCollection,
  pricingTitle,
  relatedListings,
} from "@/lib/directory";
import { companyForName } from "@/lib/companies";
import { communityListingIsIndexable } from "@/lib/indexing";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
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
    const listings = await getDirectoryListings();
    const filled = listingsForCollection(listings, slug).length > 0;
    return defaultMetadata(collection.title, collection.summary, `/directory/${slug}`, { index: filled });
  }
  const listing = await getDirectoryListing(slug);
  if (!listing) return {};
  return defaultMetadata(listing.name, listing.summary, `/directory/${listing.slug}`, {
    index: communityListingIsIndexable(listing),
  });
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
          <p className="mt-4 max-w-2xl text-[var(--muted)]">{collection.summary}</p>
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
        data={webPageJsonLd({
          title: listing.name,
          description: listing.summary,
          path: `/directory/${listing.slug}`,
          dateModified: listing.lastVerified,
          datePublished: listing.communitySubmitted ? listing.lastVerified : undefined,
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
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted)]">
            <span className="chip mr-2 border-[color-mix(in_oklab,var(--gold-bright)_55%,var(--stroke))] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
              Community submitted
            </span>
            The description is the maker&apos;s text. This desk has not written an independent review.{" "}
            <Link href="/editorial-policy">How listings are published</Link>.
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
          {listing.communitySubmitted ? (
            <>
              Submitted: <time dateTime={listing.lastVerified}>{formatDate(listing.lastVerified)}</time>
              {" · "}
            </>
          ) : null}
          Last verified: <time dateTime={listing.lastVerified}>{formatDate(listing.lastVerified)}</time>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn-primary px-4 py-2 text-sm" href={listing.website} rel="noreferrer">
            Visit {listing.name}
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
          <p className="mt-2 text-sm">{listing.pricing.map((item) => pricingTitle(item)).join(" · ")}</p>
          {listing.pricingPageUrl ? (
            <p className="mt-3">
              <a className="text-sm text-[var(--color-electric)]" href={listing.pricingPageUrl} rel="noreferrer">
                Pricing page
              </a>
            </p>
          ) : null}
          {listing.revenueSourceUrl ? (
            <p className="mt-2">
              <a className="text-sm text-[var(--color-electric)]" href={listing.revenueSourceUrl} rel="noreferrer">
                Public revenue source
              </a>
            </p>
          ) : null}
        </section>
        {listingSocialLinks(listing).length ? (
          <section className="mt-8">
            <h2 className="font-semibold tracking-tight text-2xl">Social</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {listingSocialLinks(listing).map((link) => (
                <a key={link.title} className="chip" href={link.href} rel="noreferrer">
                  {link.title}
                </a>
              ))}
            </div>
          </section>
        ) : null}
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
