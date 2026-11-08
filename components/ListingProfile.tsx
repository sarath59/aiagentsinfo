import Link from "next/link";
import { BestOfLinks } from "@/components/BestOfLinks";
import { CompanyLogo } from "@/components/CompanyLogo";
import { InlineCompanyText } from "@/components/CompanyMarks";
import { ListingRow, ListingStatus } from "@/components/ListingCard";
import { MarkdownBody } from "@/components/MarkdownBody";
import { companyForName } from "@/lib/companies";
import {
  billingPeriodTitle,
  categoryTitle,
  listingSocialLinks,
  pricingTitle,
  type DirectoryListing,
} from "@/lib/directory";
import { comparisonsForListing } from "@/lib/comparisons";
import { listingReading } from "@/lib/listing-reading";
import {
  bestFitSummary,
  conciseText,
  listingAlternatives,
  listingIsSubstantial,
  profileSections,
} from "@/lib/listing-scan";
import { websiteDomain } from "@/lib/submissions";
import { formatDate } from "@/lib/utils";

export async function ListingProfile({
  listing,
  listings,
}: {
  listing: DirectoryListing;
  listings: DirectoryListing[];
}) {
  const brand = companyForName(listing.name);
  const substantial = listingIsSubstantial(listing);
  const alternatives = listingAlternatives(listing, listings);
  const reading = await listingReading(listing);
  const relatedComparisons = comparisonsForListing(listing.slug);
  const sections = profileSections({
    substantial,
    hasFeatures: listing.features.length > 0,
    hasPricing: Boolean(listing.pricingSummary.trim()),
    hasAlternatives: alternatives.length > 0,
    hasResearch: reading.length > 0,
  });
  const checked = formatDate(listing.lastVerified);
  const domain = websiteDomain(listing.website);
  const cta = listing.name.length > 48 ? "Visit website" : `Visit ${listing.name}`;
  const pricingNote = conciseText(listing.pricingSummary, 280);
  const facts = quickFacts(listing, checked);

  return (
    <article className="mx-auto max-w-3xl px-4 pb-20 pt-10">
      {listing.sponsored ? <p className="kicker text-[var(--gold)]">Sponsored listing</p> : null}
      {listing.communitySubmitted ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          <span className="mr-2 inline-flex align-middle">
            <ListingStatus listing={listing} />
          </span>
          The description is the maker&apos;s text. This desk has not written an independent review.{" "}
          <Link href="/editorial-policy#directory">How listings are published</Link>.
        </p>
      ) : null}
      <header id="overview" className="listing-section mt-4">
        <div className="flex items-start gap-4">
          <CompanyLogo
            name={listing.name}
            src={listing.logo || undefined}
            tile={brand?.tile}
            size="lg"
            loading="eager"
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="kicker">
                {categoryTitle(listing.category)}
                {listing.vendor ? (
                  <>
                    {" "}
                    · <InlineCompanyText text={listing.vendor} />
                  </>
                ) : null}
              </p>
              {listing.communitySubmitted ? null : <ListingStatus listing={listing} />}
            </div>
            <h1 className="display mt-3 text-4xl sm:text-5xl">{listing.name}</h1>
          </div>
        </div>
        <p className="mt-4 text-lg text-[var(--muted)]">
          <InlineCompanyText text={listing.summary} />
        </p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {listing.communitySubmitted ? (
            <>
              Submitted: <time dateTime={listing.lastVerified}>{checked}</time>
              {" · "}
            </>
          ) : null}
          Last verified: <time dateTime={listing.lastVerified}>{checked}</time>
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a className="btn-primary focus-ring px-4 py-2 text-sm" href={listing.website} rel="noreferrer">
            {cta}
          </a>
          {domain ? <span className="text-sm text-[var(--muted)]">{domain}</span> : null}
          <Link className="btn-ghost focus-ring px-4 py-2 text-sm" href={`/directory/category/${listing.category}`}>
            {categoryTitle(listing.category)}
          </Link>
        </div>
        <div className="listing-fit">
          {pricingNote ? (
            <div>
              <p className="kicker">Pricing</p>
              <p className="mt-2 text-sm leading-relaxed">
                <InlineCompanyText text={pricingNote} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                {listing.communitySubmitted
                  ? `Maker-submitted pricing, filed ${checked}. This desk has not rechecked it.`
                  : `Vendor pricing checked ${checked}.`}
              </p>
              {listing.pricingPageUrl ? (
                <p className="mt-2">
                  <a className="text-sm text-[var(--link)]" href={listing.pricingPageUrl} rel="noreferrer">
                    Pricing source
                  </a>
                </p>
              ) : null}
            </div>
          ) : null}
          <div>
            <p className="kicker">Best fit</p>
            <p className="mt-2 text-sm leading-relaxed">
              {listing.communitySubmitted ? "Category the maker selected. " : null}
              {bestFitSummary(listing)}
            </p>
          </div>
        </div>
      </header>

      {sections.length ? (
        <nav className="listing-jump" aria-label="On this page">
          {sections.map((section) => (
            <a key={section.id} className="focus-ring" href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
      ) : null}

      {substantial && facts.length ? (
        <section className="quick-facts" aria-labelledby="quick-facts-heading">
          <h2 id="quick-facts-heading">Quick facts</h2>
          <dl>
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {listing.features.length ? (
        <section id="features" className="listing-section mt-10">
          <h2 className="font-semibold tracking-tight text-2xl">Features</h2>
          <ul className="mt-3 list-disc pl-5">
            {listing.features.map((feature) => (
              <li key={feature} className="mt-2">
                <InlineCompanyText text={feature} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {listing.pricingSummary.trim() ? (
        <section id="pricing" className="listing-section mt-8">
          <h2 className="font-semibold tracking-tight text-2xl">Pricing</h2>
          <p className="mt-3 text-[var(--muted)]">
            <InlineCompanyText text={listing.pricingSummary} />
          </p>
          <p className="mt-2 text-sm">{listing.pricing.map((item) => pricingTitle(item)).join(" · ")}</p>
          {listing.pricingPageUrl ? (
            <p className="mt-3">
              <a className="text-sm text-[var(--link)]" href={listing.pricingPageUrl} rel="noreferrer">
                Pricing page
              </a>
            </p>
          ) : null}
          {listing.revenueSourceUrl ? (
            <p className="mt-2">
              <a className="text-sm text-[var(--link)]" href={listing.revenueSourceUrl} rel="noreferrer">
                Public revenue source
              </a>
            </p>
          ) : null}
        </section>
      ) : null}

      {listingSocialLinks(listing).length ? (
        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl">Social</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {listingSocialLinks(listing).map((link) => (
              <a key={link.title} className="chip" href={link.href} rel="noreferrer">
                {link.title}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {listing.html.trim() ? (
        <div className="mt-8">
          <MarkdownBody html={listing.html} />
        </div>
      ) : null}

      {listing.tags.length ? (
        <section className="mt-8">
          <h2 className="font-semibold tracking-tight text-2xl">Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {listing.tags.map((tag) => (
              <Link key={tag} href={`/directory/tag/${tag}`} className="chip">
                {tag}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {alternatives.length ? (
        <section id="alternatives" className="listing-section mt-10">
          <h2 className="font-semibold tracking-tight text-2xl">Alternatives</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Other listings that share a category, use, or tag. Not a ranking.
          </p>
          <ul className="mt-4 grid gap-3">
            {alternatives.map((item) => (
              <li key={item.listing.slug} className="rounded-2xl border border-[var(--stroke)] bg-white px-3 py-3">
                <ListingRow listing={item.listing} />
                <p className="mt-1 px-1 text-sm leading-relaxed text-[var(--muted)]">{item.reason}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {relatedComparisons.length ? (
        <BestOfLinks
          pages={relatedComparisons}
          intro={`${listing.name} appears in a sourced comparison. Last verified November 2026.`}
        />
      ) : null}

      {reading.length ? (
        <section id="reports" className="listing-section mt-10">
          <h2 className="font-semibold tracking-tight text-2xl">From our reports</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Original reports, benchmarks, and notes on this site that discuss this product or its category.
          </p>
          <ul className="mt-4 grid gap-3">
            {reading.map((item) => (
              <li key={item.href} className="rounded-2xl border border-[var(--stroke)] bg-white px-4 py-4">
                <p className="kicker">{item.kind}</p>
                <Link href={item.href} className="mt-1 inline-block font-semibold text-[var(--fg)]">
                  {item.title}
                </Link>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.reason}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}

function quickFacts(listing: DirectoryListing, checked: string) {
  const rows: { term: string; detail: string }[] = [
    { term: "Category", detail: categoryTitle(listing.category) },
    { term: "Pricing", detail: listing.pricing.map((item) => pricingTitle(item)).join(", ") },
    { term: "Status", detail: listing.communitySubmitted ? "Community submitted" : "Editorial" },
  ];
  if (listing.sponsored) rows.push({ term: "Placement", detail: "Sponsored" });
  if (listing.startingPrice) rows.push({ term: "Starting price", detail: listing.startingPrice });
  if (listing.billingPeriod) rows.push({ term: "Billing", detail: billingPeriodTitle(listing.billingPeriod) });
  if (listing.vendor) rows.push({ term: "Vendor", detail: listing.vendor });
  if (checked) {
    rows.push({
      term: listing.communitySubmitted ? "Submitted" : "Last verified",
      detail: checked,
    });
  }
  if (listing.useCases.length) rows.push({ term: "Use", detail: listing.useCases.join(", ") });
  return rows.filter((row) => row.detail.trim());
}
