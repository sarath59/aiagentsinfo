import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompanyLogo } from "@/components/CompanyLogo";
import { JsonLd, defaultMetadata } from "@/lib/seo";
import {
  omittedRevenueEntries,
  verifiedRevenueChecked,
  verifiedRevenueEntries,
  verifiedRevenueJsonLd,
} from "@/lib/verified-revenue";

export const metadata = defaultMetadata(
  "Verified revenue",
  "AI tools with payment-processor-verified revenue and a live public price. Each figure has a source link and the date it was checked.",
  "/verified-revenue",
);

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className="text-[var(--link)] underline" rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

export default function VerifiedRevenuePage() {
  return (
    <>
      <JsonLd data={verifiedRevenueJsonLd()} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Verified revenue", path: "/verified-revenue" },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Stripe-checked</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Verified revenue</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          {verifiedRevenueEntries.length} tools with a public revenue figure read from a payment-processor
          connection, plus a price read from the product&apos;s own site. Checked{" "}
          <time dateTime={verifiedRevenueChecked}>{verifiedRevenueChecked}</time>.
          Nothing here is a founder screenshot or an estimated ARR.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="glass rounded-3xl p-6 sm:p-8">
          <p className="kicker">How a number gets on this page</p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)] md:grid-cols-3">
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              Revenue comes from a TrustMRR profile that says the figure is verified with a Stripe API key, and
              that names an MRR.
            </li>
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              The price is copied from the product site on the same day. A price that exists only on TrustMRR is
              not used.
            </li>
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              Expired processor keys, hidden product names, and pages that did not show a price are left off.
              Those are listed at the bottom.
            </li>
          </ul>
        </section>

        <ol className="mt-8 grid gap-5">
          {verifiedRevenueEntries.map((entry) => (
            <li key={entry.revenue.sourceUrl}>
              <article className="glass rounded-3xl p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <CompanyLogo name={entry.name} size="lg" />
                    <div>
                      <p className="kicker">{entry.maker ?? "Maker not named on the source"}</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                        <ExternalLink href={entry.url}>{entry.name}</ExternalLink>
                      </h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)]">{entry.summary}</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="kicker">MRR</p>
                    <p className="mt-1 text-3xl font-semibold tracking-tight text-[var(--color-electric)]">
                      {entry.mrr.display}
                    </p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {entry.activeSubscriptions.toLocaleString("en-US")} active subscriptions
                    </p>
                  </div>
                </div>

                <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-[var(--stroke)] bg-white/70 px-4 py-3">
                    <dt className="kicker">Last 30 days</dt>
                    <dd className="mt-1 text-lg font-semibold">{entry.revenue30d?.display ?? "Not stated"}</dd>
                  </div>
                  <div className="rounded-2xl border border-[var(--stroke)] bg-white/70 px-4 py-3">
                    <dt className="kicker">All-time</dt>
                    <dd className="mt-1 text-lg font-semibold">{entry.allTime.display}</dd>
                  </div>
                  <div className="rounded-2xl border border-[var(--stroke)] bg-white/70 px-4 py-3">
                    <dt className="kicker">Source updated</dt>
                    <dd className="mt-1 text-lg font-semibold">{entry.revenue.sourceUpdated}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
                  <span className="font-medium text-[var(--fg)]">Live price. </span>
                  {entry.pricing.summary}
                </p>

                <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <ExternalLink href={entry.revenue.sourceUrl}>
                    {`${entry.revenue.sourceName}: ${entry.revenue.verification.replace(/\.$/, "")}`}
                  </ExternalLink>
                  <ExternalLink href={entry.pricing.url}>Pricing page</ExternalLink>
                  <span className="text-[var(--muted)]">Checked {entry.revenue.checked}</span>
                </p>
              </article>
            </li>
          ))}
        </ol>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Left off</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            These were checked the same day and are not in the list above. No revenue figure is published for them
            here.
          </p>
          <ul className="mt-5 grid gap-3">
            {omittedRevenueEntries.map((item) => (
              <li key={item.sourceUrl} className="rounded-2xl border border-[var(--stroke)] bg-white/60 px-4 py-3">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.reason}</p>
                <p className="mt-2 text-sm">
                  <ExternalLink href={item.sourceUrl}>Source</ExternalLink>
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
