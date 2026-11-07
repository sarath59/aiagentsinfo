import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { getDirectoryListings } from "@/lib/directory";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { SortableRow } from "@/lib/sortable";
import { formatDate } from "@/lib/utils";
import {
  omittedRevenueEntries,
  verifiedRevenueChecked,
  verifiedRevenueEntries,
  verifiedRevenueJsonLd,
} from "@/lib/verified-revenue";

const path = "/verified-revenue";
const title = "Verified AI revenue";
const description =
  "AI tools with payment-processor-verified revenue and a public price. Sort the table. Each figure has a source link and the date it was checked.";

export const metadata = defaultMetadata(title, description, path);

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default async function VerifiedRevenuePage() {
  const listings = await getDirectoryListings();
  const updatedLabel = formatDate(verifiedRevenueChecked);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${verifiedRevenueEntries.length} AI tools with payment-processor-verified revenue and a public price. Checked ${updatedLabel}.</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

  const revenueRows: SortableRow[] = verifiedRevenueEntries.map((entry) => {
    const listing = listings.find((item) => host(item.website) === host(entry.url));
    return {
      id: entry.revenue.sourceUrl,
      sort: {
        name: entry.name,
        mrr: entry.mrr.amount,
        revenue30d: entry.revenue30d?.amount ?? null,
        allTime: entry.allTime.amount,
        subscriptions: entry.activeSubscriptions,
        updated: entry.revenue.sourceUpdated,
        checked: entry.revenue.checked,
      },
      display: {
        name: entry.name,
        mrr: entry.mrr.display,
        revenue30d: entry.revenue30d?.display ?? "Not stated",
        allTime: entry.allTime.display,
        subscriptions: entry.activeSubscriptions.toLocaleString("en-US"),
        updated: entry.revenue.sourceUpdated,
        checked: entry.revenue.checked,
        source: "TrustMRR",
        directory: listing ? "Directory" : "Not listed",
      },
      href: {
        name: entry.url,
        source: entry.revenue.sourceUrl,
        ...(listing ? { directory: `/directory/${listing.slug}` } : {}),
      },
    };
  });

  const priceRows: SortableRow[] = verifiedRevenueEntries.map((entry) => ({
    id: `${entry.revenue.sourceUrl}-price`,
    sort: { name: entry.name, price: entry.pricing.summary, checked: entry.pricing.checked },
    display: {
      name: entry.name,
      price: entry.pricing.summary,
      checked: entry.pricing.checked,
      page: "Pricing page",
    },
    href: { name: entry.url, page: entry.pricing.url },
  }));

  return (
    <>
      <JsonLd data={verifiedRevenueJsonLd()} />
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: verifiedRevenueChecked,
          dateModified: verifiedRevenueChecked,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "Verified revenue", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Stripe-checked</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Verified revenue</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          {verifiedRevenueEntries.length} tools with a public revenue figure read from a payment-processor connection,
          plus a price read from the product&apos;s own site. Whole-dollar amounts are the TrustMRR page data rounded
          to the nearest dollar. Nothing here is a founder screenshot or an estimated ARR.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Last updated <time dateTime={verifiedRevenueChecked}>{updatedLabel}</time>.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="glass rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">How a number gets on this page</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)] md:grid-cols-3">
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              Revenue comes from a TrustMRR profile that says the figure is verified with a Stripe API key, and that
              names an MRR.
            </li>
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              The price is copied from the product site. A price that exists only on TrustMRR is not used. Those
              prices were last read on the date in the price table, which can be a day before the revenue check.
            </li>
            <li className="rounded-2xl border border-[var(--stroke)] bg-white/70 p-4">
              Expired processor keys, hidden product names, and pages that did not show a price are left off. Those
              are listed at the bottom.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Revenue</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Click a column to sort. MRR and the last-30-days figure are both shown when TrustMRR prints both. They
            are not the same measurement. Based Labs has no last-30-days total on the visible page, so that cell says
            &quot;Not stated&quot; even though the page data contains a zero.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Verified AI tool revenue"
              columns={[
                { key: "name", label: "Tool" },
                { key: "mrr", label: "MRR", numeric: true },
                { key: "revenue30d", label: "Last 30 days", numeric: true },
                { key: "allTime", label: "All-time", numeric: true },
                { key: "subscriptions", label: "Subscriptions", numeric: true },
                { key: "updated", label: "Source updated" },
                { key: "checked", label: "Checked" },
                { key: "source", label: "Source" },
                { key: "directory", label: "Directory" },
              ]}
              rows={revenueRows}
              defaultSort="mrr"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Public prices</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The price text was copied from the product site on the checked date. It was not re-read on November 5.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Public prices for tools with verified revenue"
              columns={[
                { key: "name", label: "Tool" },
                { key: "price", label: "Price" },
                { key: "checked", label: "Price checked" },
                { key: "page", label: "Source" },
              ]}
              rows={priceRows}
              defaultSort="name"
              defaultDirection="asc"
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Left off</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            These were checked earlier and are not in the tables. No revenue figure is published for them here.
          </p>
          <ul className="mt-5 grid gap-3">
            {omittedRevenueEntries.map((item) => (
              <li key={item.sourceUrl} className="rounded-2xl border border-[var(--stroke)] bg-white/60 px-4 py-3">
                <p className="font-medium">{item.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.reason}</p>
                <p className="mt-2 text-sm">
                  <a className="text-[var(--link)] underline" href={item.sourceUrl} rel="noopener noreferrer" target="_blank">
                    Source
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 text-sm">
          <p>
            Related: <Link className="text-[var(--link)] underline" href="/reports/ai-agents-next-12-months">AI agents, Nov 2026 to Nov 2027</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/ai-agents-next-6-months">AI agents, Nov 2026 to May 2027</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/directory/stats">directory stats</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">agent cost calculator</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
              November harness benchmark
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports">all reports</Link>
          </p>
        </section>

        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

        <FaqList
          items={[
            {
              question: "What does verified mean here?",
              answer: (
                <p>
                  TrustMRR says the revenue is verified with a Stripe API key, and the profile was read on the checked
                  date. It does not mean this site audited the Stripe account.
                </p>
              ),
            },
            {
              question: "Why can MRR and the last 30 days disagree?",
              answer: (
                <p>
                  TrustMRR prints them as separate figures. Speel is the clear case: the last-30-days total is much
                  smaller than the MRR on the same page. Both are shown with their labels. Neither is converted into
                  the other.
                </p>
              ),
            },
            {
              question: "Why are the prices a day older than the revenue?",
              answer: (
                <p>
                  Revenue was re-read from TrustMRR on November 5, 2026. The product prices were copied on November 3
                  or 4 and were not opened again, so they keep those dates.
                </p>
              ),
            },
            {
              question: "Can I sort this?",
              answer: <p>Yes. Use the column buttons. The default order is MRR, highest first.</p>,
            },
          ]}
        />
      </div>
    </>
  );
}
