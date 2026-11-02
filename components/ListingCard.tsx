import Link from "next/link";
import { SampleBanner } from "@/components/SampleBanner";
import { categoryTitle, pricingModels, type DirectoryListing } from "@/lib/directory";

function pricingTitle(slug: string) {
  return pricingModels.find((item) => item.slug === slug)?.title ?? slug;
}

export function ListingCard({ listing }: { listing: DirectoryListing }) {
  const letter = listing.name[0]?.toUpperCase() ?? "A";

  return (
    <article className="glass lift rounded-3xl p-6">
      {listing.sample ? <SampleBanner /> : null}
      {listing.sponsored ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Sponsored</p>
      ) : null}
      <div className="flex items-start gap-4">
        <span className="mark-tile h-11 w-11 shrink-0 text-[15px] font-semibold" aria-hidden>
          {letter}
        </span>
        <div className="min-w-0">
          <p className="kicker">
            {categoryTitle(listing.category)} · {listing.vendor}
          </p>
          <h2 className="mt-1.5 font-semibold tracking-tight text-2xl">
            <Link href={`/directory/${listing.slug}`}>{listing.name}</Link>
          </h2>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{listing.summary}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {listing.pricing.map((item) => (
          <span key={item} className="chip text-[11px]">
            {pricingTitle(item)}
          </span>
        ))}
      </div>
    </article>
  );
}

export function ListingRow({ listing }: { listing: DirectoryListing }) {
  const letter = listing.name[0]?.toUpperCase() ?? "A";
  return (
    <Link
      href={`/directory/${listing.slug}`}
      className="flex items-center gap-3 rounded-2xl px-1 py-1.5 transition-colors hover:bg-[color-mix(in_oklab,var(--color-electric)_8%,transparent)]"
    >
      <span className="mark-tile h-9 w-9 shrink-0 text-[13px] font-semibold" aria-hidden>
        {letter}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium">{listing.name}</span>
      <span className="hidden text-sm text-[var(--muted)] sm:inline">{listing.vendor}</span>
    </Link>
  );
}
