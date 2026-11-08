import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { ListingCard } from "@/components/ListingCard";
import {
  categoryPageTitle,
  categorySummaries,
  directoryCategories,
  getDirectoryListings,
} from "@/lib/directory";
import { BestOfLinks } from "@/components/BestOfLinks";
import { comparisonsForCategory } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return directoryCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = directoryCategories.find((item) => item.slug === slug);
  if (!category) return {};
  const listings = (await getDirectoryListings()).filter((listing) => listing.category === slug);
  return defaultMetadata(categoryPageTitle(slug), categorySummaries[category.slug], `/directory/category/${slug}`, {
    index: listings.length > 0,
  });
}

export default async function DirectoryCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = directoryCategories.find((item) => item.slug === slug);
  if (!category) notFound();
  const listings = (await getDirectoryListings()).filter((listing) => listing.category === slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: categoryPageTitle(slug), path: `/directory/category/${slug}` },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12">
        <p className="kicker">Category</p>
        <h1 className="display mt-3 text-5xl">{categoryPageTitle(slug)}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">{categorySummaries[category.slug]}</p>
        {comparisonsForCategory(slug).length ? (
          <BestOfLinks
            pages={comparisonsForCategory(slug)}
            intro="Sourced comparison for this category. Last verified November 2026."
          />
        ) : null}
        {listings.length ? (
          <>
            <p className="mt-4 text-[var(--muted)]">
              {listings.length} listing{listings.length === 1 ? "" : "s"}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {listings.map((listing) => (
                <ListingCard key={listing.slug} listing={listing} logoLoading="lazy" />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8">
            <EmptyState
              title="Listings coming soon — submit a tool"
              body={`No ${category.title.toLowerCase()} are listed yet. A product is added only when its official site checks out.`}
              href="/submit"
              cta="Submit a tool"
            />
          </div>
        )}
      </div>
    </>
  );
}
