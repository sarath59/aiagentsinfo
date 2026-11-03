import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { EmptyState } from "@/components/EmptyState";
import {
  categoryTitle,
  directoryCategories,
  getDirectoryListings,
} from "@/lib/directory";
import { companyForName } from "@/lib/companies";
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
        {listings.length ? (
          <>
            <p className="mt-4 text-[var(--muted)]">
              {listings.length} listing{listings.length === 1 ? "" : "s"}
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {listings.map((listing) => (
                <article key={listing.slug} className="glass rounded-3xl p-6">
                  <div className="flex items-start gap-4">
                    <CompanyLogo
                      name={listing.name}
                      src={listing.logo || undefined}
                      tile={companyForName(listing.name)?.tile}
                      size="md"
                    />
                    <div className="min-w-0">
                      {listing.communitySubmitted ? (
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
                          Community submitted
                        </p>
                      ) : null}
                      <h2 className="font-semibold tracking-tight text-2xl">
                        <Link href={`/directory/${listing.slug}`}>{listing.name}</Link>
                      </h2>
                      <p className="mt-2 text-sm text-[var(--muted)]">{listing.summary}</p>
                    </div>
                  </div>
                </article>
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
