import Link from "next/link";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText } from "@/components/CompanyMarks";
import { companyForName } from "@/lib/companies";
import {
  billingPeriodTitle,
  categoryTitle,
  pricingTitle,
  type DirectoryListing,
} from "@/lib/directory";
import { firstSentence, textAfterSentence } from "@/lib/listing-scan";

export function CommunityBadge() {
  return (
    <span className="chip border-[color-mix(in_oklab,var(--gold-bright)_55%,var(--stroke))] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--gold)]">
      Community submitted
    </span>
  );
}

export function EditorialBadge() {
  return (
    <span className="chip border-[color-mix(in_oklab,var(--color-cyan)_45%,var(--stroke))] text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-cyan)]">
      Editorial
    </span>
  );
}

export function ListingStatus({ listing }: { listing: DirectoryListing }) {
  return listing.communitySubmitted ? <CommunityBadge /> : <EditorialBadge />;
}

export function ListingCard({
  listing,
  logoLoading = "lazy",
}: {
  listing: DirectoryListing;
  logoLoading?: "eager" | "lazy";
}) {
  const brand = companyForName(listing.name);
  const job = firstSentence(listing.summary);
  const rest = textAfterSentence(listing.summary, job);
  const jobId = `listing-${listing.slug}-job`;

  return (
    <article className="glass lift click-card rounded-3xl p-5 sm:p-6">
      {listing.sponsored ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">Sponsored</p>
      ) : null}
      <div className="flex items-start gap-3.5">
        <CompanyLogo
          name={listing.name}
          src={listing.logo || undefined}
          tile={brand?.tile}
          size="md"
          loading={logoLoading}
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold tracking-tight text-xl">
              <Link className="card-stretch focus-ring rounded-sm" href={`/directory/${listing.slug}`} aria-describedby={jobId}>
                {listing.name}
              </Link>
            </h2>
            <ListingStatus listing={listing} />
          </div>
          {listing.vendor && listing.vendor !== listing.name ? (
            <p className="mt-1 text-xs text-[var(--muted)]">
              <InlineCompanyText text={listing.vendor} />
            </p>
          ) : null}
        </div>
      </div>
      {job ? (
        <p id={jobId} className="mt-3 text-sm font-medium leading-relaxed text-[var(--fg)]">
          {job}
        </p>
      ) : null}
      {rest ? <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{rest}</p> : null}
      <div className="mt-4 flex flex-wrap gap-1.5">
        <span className="chip text-[11px]">{categoryTitle(listing.category)}</span>
        {listing.pricing.map((item) => (
          <span key={item} className="chip text-[11px]">
            {pricingTitle(item)}
          </span>
        ))}
        {listing.startingPrice ? <span className="chip text-[11px]">{listing.startingPrice}</span> : null}
        {listing.billingPeriod ? (
          <span className="chip text-[11px]">{billingPeriodTitle(listing.billingPeriod)}</span>
        ) : null}
      </div>
    </article>
  );
}

export function ListingRow({ listing }: { listing: DirectoryListing }) {
  const brand = companyForName(listing.name);
  return (
    <Link
      href={`/directory/${listing.slug}`}
      className="focus-ring flex items-center gap-3 rounded-2xl px-1 py-1.5 transition-colors hover:bg-[color-mix(in_oklab,var(--color-electric)_8%,transparent)]"
    >
      <CompanyLogo
        name={listing.name}
        src={listing.logo || undefined}
        tile={brand?.tile}
        size="sm"
        loading="lazy"
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
