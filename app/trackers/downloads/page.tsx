import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import { HistoryChart } from "@/components/trackers/HistoryChart";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, datasetJsonLd, datasetLicenseUrl, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import {
  chartSeries,
  downloadsColumns,
  downloadsFaq,
  downloadsRows,
  downloadsTakeaways,
  getDownloadsReport,
  topPackage,
  windowLabel,
} from "@/lib/trackers/downloads";
import { integer, shortDate } from "@/lib/trackers/http";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";

export const revalidate = 86400;

const path = TRACKER_PATHS.downloads;
const title = "AI agent framework downloads tracker (updated daily)";

export async function generateMetadata() {
  const report = await getDownloadsReport();
  const top = topPackage(report.pypi);
  const window = windowLabel(report.pypi);
  const description =
    top && window
      ? `${top.package} leads this PyPI set with ${integer(top.windowDownloads)} downloads from ${window.start} through ${window.end}, without mirrors. npm is a separate registry. Updated daily.`
      : "Daily PyPI and npm download counts for major AI agent frameworks. A download is a file request, not a user. Updated daily from pypistats and npm.";
  return defaultMetadata(title, description, path, { absoluteTitle: true });
}

export default async function DownloadsTrackerPage() {
  const report = await getDownloadsReport();
  const faq = downloadsFaq(report);
  const pypiTop = topPackage(report.pypi);
  const npmTop = topPackage(report.npm);
  const window = windowLabel([...report.pypi, ...report.npm]);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info, "${title}", ${shortDate(report.retrievedAt)}, ${pageUrl}`;
  const embed = `<blockquote cite="${pageUrl}"><p>${
    pypiTop && window
      ? `${pypiTop.package} had ${integer(pypiTop.windowDownloads)} PyPI downloads from ${window.start} through ${window.end}, without mirrors.`
      : "AI agent framework downloads from PyPI and npm."
  }</p><footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer></blockquote>`;
  const pypiLead =
    pypiTop && window
      ? `${pypiTop.package}, with ${integer(pypiTop.windowDownloads)} downloads from ${window.startLabel} through ${window.endLabel} in the without_mirrors series.`
      : "The PyPI table is empty on this pass. The method is unchanged.";
  const npmLead =
    npmTop
      ? `${npmTop.package}, with ${integer(npmTop.windowDownloads)} downloads over the same complete days. Do not add that figure to a PyPI total.`
      : "The npm table is empty on this pass.";
  const historyLead =
    window
      ? `Daily without_mirrors and npm rows from ${window.startLabel} through ${window.endLabel} are on this page. Trailing zeros are dropped so an incomplete today is not treated as a real day.`
      : "History is shown only when a registry returns daily rows.";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description:
            "Daily PyPI and npm download counts for major AI agent frameworks, revalidated about once a day.",
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          title,
          description:
            "30-day sums of pypistats without_mirrors daily rows and npm download-range rows for named AI agent framework packages.",
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
          isBasedOn: "https://pypistats.org/api/packages/langchain/overall?mirrors=false",
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: TRACKER_PATHS.index },
          { name: "Downloads", path },
        ]}
      />
      <ArticleTemplate
        category="Live tracker"
        title={title}
        description="PyPI and npm file-request counts for the agent frameworks people actually install. Updated daily. A download is not a user."
        published="2026-11-09"
        updated={report.retrievedDay}
        byline={site.bylines.research}
        wide
        details={
          <>
            <p>
              {report.live ? "Live fetch" : "Snapshot (live fetch missed)"}{" "}
              <time dateTime={report.retrievedAt}>{report.retrievedAt}</time> UTC.
            </p>
            <p className="mt-2">
              Data licensed{" "}
              <a className="text-[var(--link)] underline" href={datasetLicenseUrl}>
                CC BY 4.0
              </a>
              , please credit{" "}
              <a className="text-[var(--link)] underline" href={absoluteUrl("/")}>
                {site.name}
              </a>
              .
            </p>
          </>
        }
        takeaways={downloadsTakeaways(report)}
        toc={[
          { id: "pypi", text: "Which AI agent framework has the most downloads?", level: 2 },
          { id: "npm", text: "What do the npm packages show?", level: 2 },
          { id: "history", text: "How have downloads changed over time?", level: 2 },
          { id: "methodology", text: "Where do these numbers come from?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite this data", level: 2 },
        ]}
        citation={
          <CiteOrEmbed
            title="Cite this data"
            citation={citation}
            embed={embed}
            note="Copy the citation or the HTML. Neither is required to use the figures. Please keep the date and the source."
          />
        }
        related={[
          {
            href: "/blog/which-ai-agent-framework-do-people-install",
            title: "Which AI agent framework do people install?",
            description: "The November 9, 2026 30-day census this tracker keeps current.",
            kicker: "Blog",
            date: "2026-11-09",
          },
          {
            href: TRACKER_PATHS.stars,
            title: "AI agent framework GitHub stars tracker (updated daily)",
            description: "Live stargazers_count for the same repositories.",
            kicker: "Tracker",
          },
          {
            href: "/best/ai-agent-frameworks",
            title: "Best AI agent frameworks",
            description: "Licence and latest GitHub release, not an install ranking.",
            kicker: "Comparison",
          },
        ]}
      >
        <TrackerNav current={path} />
        <section>
          <h2 id="pypi" className="text-2xl font-semibold tracking-tight">
            Which AI agent framework has the most downloads?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{pypiLead}</p>
          {window ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              The 30-day column sums the last {integer(30)} complete daily rows, {window.start} through {window.end}. The
              related write-up is{" "}
              <Link className="text-[var(--link)] underline" href="/blog/which-ai-agent-framework-do-people-install">
                Which AI agent framework do people install?
              </Link>
              , which used this same window on November 9, 2026.
            </p>
          ) : null}
          {report.pypi.length ? (
            <div className="mt-5">
              <SortableTable
                caption="PyPI downloads for AI agent frameworks, last 30 complete days, without mirrors"
                columns={downloadsColumns()}
                rows={downloadsRows(report.pypi)}
                defaultSort="window"
                source={{ title, updated: report.retrievedAt, path }}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--muted)]">No PyPI rows on this pass.</p>
          )}
          {report.pypi.some((row) => row.note) ? (
            <ul className="mt-4 max-w-3xl list-disc pl-5 text-sm leading-relaxed text-[var(--muted)]">
              {report.pypi
                .filter((row) => row.note)
                .map((row) => (
                  <li key={row.package}>
                    <span className="font-medium text-[var(--fg)]">{row.package}</span>: {row.note}
                  </li>
                ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-12">
          <h2 id="npm" className="text-2xl font-semibold tracking-tight">
            What do the npm packages show?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{npmLead}</p>
          {report.npm.length ? (
            <div className="mt-5">
              <SortableTable
                caption="npm downloads for AI agent frameworks, last 30 complete days"
                columns={downloadsColumns()}
                rows={downloadsRows(report.npm)}
                defaultSort="window"
                source={{ title, updated: report.retrievedAt, path }}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--muted)]">No npm rows on this pass.</p>
          )}
          {report.npm.some((row) => row.note) ? (
            <ul className="mt-4 max-w-3xl list-disc pl-5 text-sm leading-relaxed text-[var(--muted)]">
              {report.npm
                .filter((row) => row.note)
                .map((row) => (
                  <li key={row.package}>
                    <span className="font-medium text-[var(--fg)]">{row.package}</span>: {row.note}
                  </li>
                ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-12">
          <h2 id="history" className="text-2xl font-semibold tracking-tight">
            How have downloads changed over time?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{historyLead}</p>
          {report.pypi.length ? (
            <HistoryChart
              caption="Daily PyPI without_mirrors downloads for the five largest packages in this set"
              series={chartSeries(report.pypi)}
              source={{ title, updated: report.retrievedAt, path }}
            />
          ) : null}
          {report.npm.length ? (
            <HistoryChart
              caption="Daily npm downloads for the packages in this set"
              series={chartSeries(report.npm)}
              source={{ title, updated: report.retrievedAt, path }}
            />
          ) : null}
        </section>

        <section className="mt-12">
          <h2 id="methodology" className="text-2xl font-semibold tracking-tight">
            Where do these numbers come from?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Python totals are the sum of daily <code>without_mirrors</code> rows from{" "}
            <a className="text-[var(--link)] underline" href="https://pypistats.org/api/packages/langchain/overall?mirrors=false">
              pypistats.org/api/packages/{"{name}"}/overall?mirrors=false
            </a>
            . The 7-day and last-day columns prefer pypistats’ recent endpoint when it returns. JavaScript totals use{" "}
            <a className="text-[var(--link)] underline" href="https://api.npmjs.org/downloads/range/last-month/@mastra/core">
              api.npmjs.org/downloads/range
            </a>
            . The page revalidates about once a day. If a registry is down, the last successful snapshot stays up and the
            timestamp says so.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Package names are the distributions people install, not a quality ranking.{" "}
            <Link className="text-[var(--link)] underline" href="/best/ai-agent-frameworks">
              Best AI agent frameworks
            </Link>{" "}
            is the licence and release table. GitHub stars for the paired repositories are the{" "}
            <Link className="text-[var(--link)] underline" href={TRACKER_PATHS.stars}>
              stars tracker
            </Link>
            .
          </p>
          {report.failures.length ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Missing on this pass:{" "}
              {report.failures.map((item) => `${item.package} (${item.registry}: ${item.error})`).join("; ")}.
            </p>
          ) : null}
        </section>

        <FaqList items={faq.map((item) => ({ question: item.question, answer: item.answer }))} />
        <div className="mt-14">
          <NewsletterSignup id="tracker-downloads" />
        </div>
      </ArticleTemplate>
    </>
  );
}
