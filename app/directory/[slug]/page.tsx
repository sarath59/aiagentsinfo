import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ListingCard } from "@/components/ListingCard";
import { MarkdownBody } from "@/components/MarkdownBody";
import { SampleBanner } from "@/components/SampleBanner";
import {
  categoryTitle,
  collectionBySlug,
  directoryCollections,
  getDirectoryListing,
  getDirectoryListings,
  listingsForCollection,
  relatedListings,
} from "@/lib/directory";
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
            Editorial flags on listing files. Sample-only in v1. Not a popularity contest and not paid unless a listing is explicitly marked sponsored.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {items.map((listing) => (
              <ListingCard key={listing.slug} listing={listing} />
            ))}
          </div>
        </div>
      </>
    );
  }

  const listing = all.find((item) => item.slug === slug);
  if (!listing) notFound();
  const related = relatedListings(listing, all);

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
        {listing.sample ? <SampleBanner /> : null}
        {listing.sponsored ? <p className="kicker text-[var(--gold)]">Sponsored listing</p> : null}
        <p className="kicker mt-2">
          {categoryTitle(listing.category)} · {listing.vendor}
        </p>
        <h1 className="display mt-3 text-5xl">{listing.name}</h1>
        <p className="mt-4 text-lg text-[var(--muted)]">{listing.summary}</p>
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
        <section className="mt-10">
          <h2 className="font-serif text-2xl">Features</h2>
          <ul className="mt-3 list-disc pl-5">
            {listing.features.map((feature) => (
              <li key={feature} className="mt-2">
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Pricing summary</h2>
          <p className="mt-3 text-[var(--muted)]">{listing.pricingSummary}</p>
          <p className="mt-2 text-sm">{listing.pricing.join(" · ")}</p>
        </section>
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Screenshots</h2>
          <div className="mt-3 grid min-h-40 place-items-center rounded-3xl border border-dashed border-[var(--stroke-strong)] text-sm text-[var(--muted)]">
            Screenshot slot — add images later. Empty on purpose in this sample.
          </div>
        </section>
        <div className="mt-8">
          <MarkdownBody html={listing.html} />
        </div>
        <section className="mt-8">
          <h2 className="font-serif text-2xl">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.tags.map((tag) => (
              <Link key={tag} href={`/directory/tag/${tag}`} className="chip">
                {tag}
              </Link>
            ))}
          </div>
        </section>
        {related.length ? (
          <section className="mt-10">
            <h2 className="font-serif text-2xl">Related tools</h2>
            <ul className="mt-3 grid gap-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/directory/${item.slug}`}>{item.name}</Link>
                  <span className="text-[var(--muted)]"> — {item.vendor}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}
