import Link from "next/link";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText } from "@/components/CompanyMarks";
import { companyForName } from "@/lib/companies";
import { categoryTitle, pricingModels, type DirectoryListing } from "@/lib/directory";

function pricingTitle(slug: string) {
  return pricingModels.find((item) => item.slug === slug)?.title ?? slug;
}

export function CommunityBadge() {
  return (
    <span className="chip border-[color-mix(in_oklab,var(--gold-bright)_55%,var(--stroke))] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
      Community submitted
    </span>
  );
}

export function ListingCard({ listing }: { listing: DirectoryListing }) {
  const brand = companyForName(listing.name);

  return (
    <article className="glass lift rounded-3xl p-6">
      {listing.sponsored ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Sponsored</p>
      ) : null}
      {listing.communitySubmitted ? (
        <p className="mb-3">
          <CommunityBadge />
        </p>
      ) : null}
      <div className="flex items-start gap-4">
        <CompanyLogo
          name={listing.name}
          src={listing.logo || undefined}
          tile={brand?.tile}
          size="md"
        />
        <div className="min-w-0">
          <p className="kicker">
            {categoryTitle(listing.category)} · <InlineCompanyText text={listing.vendor} />
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
  const brand = companyForName(listing.name);
  return (
    <Link
      href={`/directory/${listing.slug}`}
      className="flex items-center gap-3 rounded-2xl px-1 py-1.5 transition-colors hover:bg-[color-mix(in_oklab,var(--color-electric)_8%,transparent)]"
    >
      <CompanyLogo
        name={listing.name}
        src={listing.logo || undefined}
        tile={brand?.tile}
        size="sm"
      />
      <span className="min-w-0 flex-1 truncate font-medium">{listing.name}</span>
      {listing.communitySubmitted ? (
        <span className="hidden sm:inline-flex">
          <CommunityBadge />
        </span>
      ) : null}
      <span className="hidden text-sm text-[var(--muted)] sm:inline">{listing.vendor}</span>
    </Link>
  );
}
