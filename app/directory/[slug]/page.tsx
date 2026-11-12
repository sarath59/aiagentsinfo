import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { ListYourAgent } from "@/components/ListYourAgent";
import { ListingCard } from "@/components/ListingCard";
import { ListingProfile } from "@/components/ListingProfile";
import {
  collectionBySlug,
  directoryCollections,
  getDirectoryListing,
  getDirectoryListings,
  listingsForCollection,
} from "@/lib/directory";
import { communityListingIsIndexable } from "@/lib/indexing";
import { listingFaqText, listingSupplement } from "@/lib/listing-supplements";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";

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
  const headline = listing.title?.trim() || listing.name;
  return defaultMetadata(headline, listing.summary, `/directory/${listing.slug}`, {
    index: communityListingIsIndexable(listing),
    absoluteTitle: listing.absoluteTitle === true,
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
                <ListingCard key={listing.slug} listing={listing} logoLoading="lazy" />
              ))}
            </div>
          ) : null}
          <ListYourAgent />
          {items.length ? null : (
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
  const supplement = listingSupplement(listing.slug);
  const modified = supplement?.checkedOn ?? listing.lastVerified;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: listing.title?.trim() || listing.name,
            description: listing.summary,
            path: `/directory/${listing.slug}`,
            dateModified: modified,
            datePublished: listing.communitySubmitted ? listing.lastVerified : undefined,
          }),
          ...(supplement?.faq.length
            ? [
                faqPageJsonLd(
                  supplement.faq.map((item) => ({
                    question: item.question,
                    answer: listingFaqText(item),
                  })),
                ),
              ]
            : []),
          softwareApplicationJsonLd({
            name: listing.name,
            url: `/directory/${listing.slug}`,
            sameAs: listing.website,
            description: listing.summary,
            applicationCategory:
              listing.category === "coding-agents" ||
              listing.category === "agent-frameworks" ||
              listing.category === "developer-tools"
                ? "DeveloperApplication"
                : listing.category === "productivity" || listing.category === "automation"
                  ? "BusinessApplication"
                  : undefined,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: listing.name, path: `/directory/${listing.slug}` },
        ]}
      />
      <ListingProfile listing={listing} listings={all} />
    </>
  );
}
