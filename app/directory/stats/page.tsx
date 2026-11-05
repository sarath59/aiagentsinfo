import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { getDirectoryStats, pricingOverlapNote } from "@/lib/directory-stats";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import type { SortableRow } from "@/lib/sortable";
import { formatDate } from "@/lib/utils";

const path = "/directory/stats";
const title = "AI tools directory stats";
const description =
  "Counts from this site's own directory: category, pricing, indie or startup or YC origin, additions, and community submissions. Generated when the site is built.";

export const metadata = defaultMetadata(title, description, path);

export default async function DirectoryStatsPage() {
  const stats = await getDirectoryStats();
  const updatedLabel = formatDate(stats.updated);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;
  const categoryRows: SortableRow[] = stats.byCategory.map((row) => ({
    id: row.slug,
    sort: { category: row.title, count: row.count },
    display: { category: row.title, count: String(row.count) },
    href: { category: `/directory/category/${row.slug}` },
  }));
  const pricingRows: SortableRow[] = stats.byPricing.map((row) => ({
    id: row.slug,
    sort: { pricing: row.title, count: row.count },
    display: { pricing: row.title, count: String(row.count) },
    href: { pricing: `/directory?pricing=${row.slug}` },
  }));
  const originRows: SortableRow[] = stats.origin.map((row) => ({
    id: row.key,
    sort: { origin: row.title, count: row.count },
    display: { origin: row.title, count: String(row.count) },
  }));
  const additionMax = Math.max(...stats.additions.map((item) => item.count), 1);
  const verifiedMax = Math.max(...stats.verifiedByMonth.map((item) => item.count), 1);

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: stats.updated,
          dateModified: stats.updated,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Directory", path: "/directory" },
          { name: "Stats", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Directory</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          These counts are calculated from the listings and submission files when the site is built. There is no
          separate hand tally. The directory currently has {stats.total} published listings. Origin is recorded only
          when someone used the submit form and chose indie hacker, startup, or YC company. Listings written by the
          desk have no origin, and this page does not guess one.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Last updated <time dateTime={stats.updated}>{updatedLabel}</time>. That date is the newest last-verified
          date or submission date in the files.
        </p>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">By category</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Each listing has one category. The counts add up to {stats.total}. A category with no listing is omitted.
            Click a name to open that category.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Directory listings by category"
              columns={[
                { key: "category", label: "Category" },
                { key: "count", label: "Listings", numeric: true },
              ]}
              rows={categoryRows}
              defaultSort="count"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">By pricing model</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{pricingOverlapNote()}</p>
          <div className="mt-5">
            <SortableTable
              caption="Directory listings by pricing label"
              columns={[
                { key: "pricing", label: "Pricing" },
                { key: "count", label: "Listings", numeric: true },
              ]}
              rows={pricingRows}
              defaultSort="count"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Indie, startup, or YC</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The submit form asks for one of those three. A zero means no published listing currently carries that
            answer. &quot;Not recorded&quot; means the listing was not filed through that form.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="Directory listings by recorded origin"
              columns={[
                { key: "origin", label: "Origin" },
                { key: "count", label: "Listings", numeric: true },
              ]}
              rows={originRows}
              defaultSort="count"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Additions over time</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The directory does not store the day a desk listing was first added. The bars below count community
            submissions by the day the form was sent. A desk listing is not plotted as an addition.
          </p>
          <ul className="mt-5 grid gap-3">
            {stats.additions.map((item) => (
              <li key={item.date}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                  <span className="tabular-nums">{item.count}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--stroke)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-electric)]"
                    style={{ width: `${(item.count / additionMax) * 100}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  {item.items.map((entry, index) => (
                    <span key={entry.slug}>
                      {index > 0 ? ", " : null}
                      {entry.live ? (
                        <Link className="text-[var(--link)] underline" href={`/directory/${entry.slug}`}>
                          {entry.name}
                        </Link>
                      ) : (
                        entry.name
                      )}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">When listings were last checked</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            This is the last-verified month stored on each listing. It is not the month the product launched.
          </p>
          <ul className="mt-5 grid gap-3">
            {stats.verifiedByMonth.map((item) => (
              <li key={item.month}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{item.month}</span>
                  <span className="tabular-nums">{item.count}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[var(--stroke)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-cyan)]"
                    style={{ width: `${(item.count / verifiedMax) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Community submissions</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {stats.submissions.length} submission files. {stats.approved} approved and {stats.pending} pending.
            Approved tools that are live are linked. Pending tools are not in the category counts above.
          </p>
          <ul className="mt-5 grid gap-3">
            {stats.submissions.map((submission) => (
              <li key={submission.slug} className="rounded-2xl border border-[var(--stroke)] bg-white/70 px-4 py-3">
                <p className="font-medium">
                  {submission.live ? (
                    <Link className="text-[var(--link)] underline" href={`/directory/${submission.slug}`}>
                      {submission.name}
                    </Link>
                  ) : (
                    submission.name
                  )}
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {submission.status} · {submission.makerTitle}
                  {submission.makerType === "yc" && submission.ycBatch ? ` ${submission.ycBatch}` : ""} · submitted{" "}
                  <time dateTime={submission.submittedOn}>{formatDate(submission.submittedOn)}</time>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 text-sm">
          <p>
            Related: <Link className="text-[var(--link)] underline" href="/directory">browse the directory</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/submit">submit a tool</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/verified-revenue">verified revenue</Link>
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
              question: "Why is almost every origin marked not recorded?",
              answer: (
                <p>
                  The desk listings do not have an indie, startup, or YC field. Only the public submit form asks for
                  it. Filling that in from a company&apos;s reputation would be a guess, so it is not done.
                </p>
              ),
            },
            {
              question: "Do the pricing rows add up to the number of tools?",
              answer: <p>{pricingOverlapNote()} The category rows do add up, because each listing has one category.</p>,
            },
            {
              question: "What counts as an addition?",
              answer: (
                <p>
                  A community submission, dated from the timestamp stored with the form. Desk listings are included in
                  the category, pricing, and last-checked counts, and they are not given an invented add date.
                </p>
              ),
            },
            {
              question: "Will this page change by itself?",
              answer: (
                <p>
                  The next build reads the directory and submission files again. Adding a listing or approving a
                  submission changes the counts on the next deploy. The page does not poll a live database.
                </p>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
