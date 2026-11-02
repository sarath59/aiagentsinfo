import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SampleBanner } from "@/components/SampleBanner";
import { allTags, getDirectoryListings } from "@/lib/directory";
import { defaultMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const listings = await getDirectoryListings();
  return allTags(listings).map((tag) => ({ slug: tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return defaultMetadata(`Tag: ${slug}`, `Directory listings tagged ${slug}.`, `/directory/tag/${slug}`);
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
            <article key={listing.slug} className="glass rounded-3xl p-6">
              {listing.sample ? <SampleBanner /> : null}
              <h2 className="font-semibold tracking-tight text-2xl">
                <Link href={`/directory/${listing.slug}`}>{listing.name}</Link>
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{listing.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
