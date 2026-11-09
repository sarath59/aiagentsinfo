import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ListYourAgent } from "@/components/ListYourAgent";
import { ListingCard } from "@/components/ListingCard";
import { allTags, getDirectoryListings } from "@/lib/directory";
import { defaultMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const listings = await getDirectoryListings();
  return allTags(listings).map((tag) => ({ slug: tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = slug.replace(/-/g, " ");
  return defaultMetadata(`Directory tag: ${label}`, `Directory listings tagged “${label}”. This filtered view is not a separate article.`, `/directory/tag/${slug}`, {
    index: false,
  });
}

export default async function DirectoryTagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = (await getDirectoryListings()).filter((listing) => listing.tags.includes(slug));
  if (!listings.length) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: slug, path: `/directory/tag/${slug}` },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12">
        <p className="kicker">Tag</p>
        <h1 className="display mt-3 text-5xl">{slug}</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {listings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} logoLoading="lazy" />
          ))}
        </div>
        <ListYourAgent />
      </div>
    </>
  );
}
