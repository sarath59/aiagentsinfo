import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SampleBanner } from "@/components/SampleBanner";
import {
  categoryTitle,
  directoryCategories,
  getDirectoryListings,
} from "@/lib/directory";
import { defaultMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return directoryCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = categoryTitle(slug);
  return defaultMetadata(title, `AI directory: ${title}.`, `/directory/category/${slug}`);
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
          { name: category.title, path: `/directory/category/${slug}` },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-12">
        <p className="kicker">Category</p>
        <h1 className="display mt-3 text-5xl">{category.title}</h1>
        <p className="mt-4 text-[var(--muted)]">{listings.length} sample listing{listings.length === 1 ? "" : "s"} in v1.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {listings.map((listing) => (
            <article key={listing.slug} className="glass rounded-3xl p-6">
              {listing.sample ? <SampleBanner /> : null}
              <h2 className="font-serif text-2xl">
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
