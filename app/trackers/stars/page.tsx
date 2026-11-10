import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, datasetJsonLd, datasetLicenseUrl, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";
import { integer, shortDate } from "@/lib/trackers/http";
import {
  getStarsReport,
  starColumns,
  starRows,
  starsClickDescription,
  starsClickTitle,
  starsFaq,
  starsTakeaways,
  topStarred,
} from "@/lib/trackers/stars";

export const revalidate = 86400;

const path = TRACKER_PATHS.stars;
const datasetTitle = "AI agent framework GitHub stars tracker (updated daily)";

export async function generateMetadata() {
  const report = await getStarsReport();
  return defaultMetadata(starsClickTitle(report), starsClickDescription(report), path, { absoluteTitle: true });
}

export default async function StarsTrackerPage() {
  const report = await getStarsReport();
  const title = starsClickTitle(report);
  const metaDescription = starsClickDescription(report);
  const faq = starsFaq(report);
  const top = topStarred(report.rows);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info, "${title}", ${shortDate(report.retrievedAt)}, ${pageUrl}`;
  const embed = `<blockquote cite="${pageUrl}"><p>${
    top ? `${top.repo} has ${integer(top.stars)} GitHub stars in this set.` : "GitHub stars for AI agent frameworks."
  }</p><footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer></blockquote>`;
  const lead = top
    ? `${top.repo}, with ${integer(top.stars)} stars on this pass.`
    : "The table is empty on this pass because GitHub did not return stargazers_count.";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description: metaDescription,
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          title: datasetTitle,
          description: "stargazers_count, forks, and open_issues_count for named AI agent framework repositories.",
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
          isBasedOn: "https://api.github.com/repos/langchain-ai/langchain",
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: TRACKER_PATHS.index },
          { name: "GitHub stars", path },
        ]}
      />
      <ArticleTemplate
        category="Live tracker"
        title={title}
        description="stargazers_count for the repositories behind the download tracker. Updated daily. Stars are not installs."
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
        takeaways={starsTakeaways(report)}
        toc={[
          { id: "table", text: "Which AI agent framework has the most GitHub stars?", level: 2 },
          { id: "downloads", text: "Do GitHub stars measure installs?", level: 2 },
          { id: "methodology", text: "Where do the star counts come from?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite this data", level: 2 },
        ]}
        citation={
          <CiteOrEmbed
            title="Cite this data"
            citation={citation}
            embed={embed}
            note="Keep the retrieval date. The embed is optional HTML, not a required badge."
          />
        }
        related={[
          {
            href: TRACKER_PATHS.downloads,
            title: "AI agent framework downloads tracker (updated daily)",
            description: "PyPI and npm file requests for the same frameworks.",
            kicker: "Tracker",
          },
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "AI agent framework release November 2026",
            description: "The November 5 snapshot of latest GitHub releases for 19 repositories.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/blog/which-ai-agent-framework-do-people-install",
            title: "Which AI agent framework do people install?",
            description: "CrewAI’s star lead next to LangGraph’s download lead, dated November 9, 2026.",
            kicker: "Blog",
            date: "2026-11-09",
          },
        ]}
      >
        <TrackerNav current={path} />
        <section>
          <h2 id="table" className="text-2xl font-semibold tracking-tight">
            Which AI agent framework has the most GitHub stars?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{lead}</p>
          {report.rows.length ? (
            <div className="mt-5">
              <SortableTable
                caption="GitHub stars for AI agent framework repositories"
                columns={starColumns()}
                rows={starRows(report.rows)}
                defaultSort="stars"
                filters={["stars"]}
                source={{ title, updated: report.retrievedAt, path }}
              />
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--muted)]">No star rows on this pass.</p>
          )}
          {report.rows.some((row) => row.note) ? (
            <ul className="mt-4 max-w-3xl list-disc pl-5 text-sm leading-relaxed text-[var(--muted)]">
              {report.rows
                .filter((row) => row.note)
                .map((row) => (
                  <li key={row.repo}>
                    <span className="font-medium text-[var(--fg)]">{row.repo}</span>: {row.note}
                  </li>
                ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-12">
          <h2 id="downloads" className="text-2xl font-semibold tracking-tight">
            Do GitHub stars measure installs?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            No. Stars bookmark a repository. Downloads count file requests on one registry. Use the{" "}
            <Link className="text-[var(--link)] underline" href={TRACKER_PATHS.downloads}>
              downloads tracker
            </Link>{" "}
            for pip and npm, and this table for GitHub bookmarks.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="methodology" className="text-2xl font-semibold tracking-tight">
            Where do the star counts come from?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Each row is <code>stargazers_count</code> from{" "}
            <a className="text-[var(--link)] underline" href="https://api.github.com/repos/langchain-ai/langchain">
              api.github.com/repos/{"{owner}"}/{"{repo}"}
            </a>
            . Forks are <code>forks_count</code>. The open-issues column is GitHub’s <code>open_issues_count</code>, which
            includes open pull requests. The page revalidates about once a day. If GitHub is down, the last successful
            snapshot stays up.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            A dated release table for 19 repositories, pulled November 5, 2026, remains the{" "}
            <Link className="text-[var(--link)] underline" href="/reports/ai-agent-framework-github-stats-november-2026">
              November 2026 framework GitHub stats report
            </Link>
            .
          </p>
          {report.failures.length ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Missing on this pass: {report.failures.map((item) => `${item.repo} (${item.error})`).join("; ")}.
            </p>
          ) : null}
        </section>

        <FaqList items={faq.map((item) => ({ question: item.question, answer: item.answer }))} />
      </ArticleTemplate>
    </>
  );
}
