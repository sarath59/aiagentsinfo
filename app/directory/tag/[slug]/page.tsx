import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { companyForName } from "@/lib/companies";
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
            <article key={listing.slug} className="glass lift click-card rounded-3xl p-6">
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
                    <Link className="card-stretch" href={`/directory/${listing.slug}`}>
                      {listing.name}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{listing.summary}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
