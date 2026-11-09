import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, datasetJsonLd, datasetLicenseUrl, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import {
  agentsMdFaq,
  agentsMdTakeaways,
  getAgentsMdReport,
  githubAgentsCount,
  paperRate,
  paperSentence,
} from "@/lib/trackers/agents-md";
import { integer, shortDate } from "@/lib/trackers/http";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";
import type { SortableRow } from "@/lib/sortable";

export const revalidate = 86400;

const path = TRACKER_PATHS.agentsMd;
const title = "AGENTS.md adoption tracker (updated daily)";

export async function generateMetadata() {
  const report = await getAgentsMdReport();
  const github = githubAgentsCount(report);
  const description = github
    ? `GitHub code search currently returns ${integer(github.count)} files named AGENTS.md. The October 16, 2026 census found ${integer(report.paper.eitherRoot)} of ${integer(report.paper.frame)} popular repos. Updated daily.`
    : `${paperSentence()} Live GitHub code search is attempted daily.`;
  return defaultMetadata(title, description, path, { absoluteTitle: true });
}

export default async function AgentsMdTrackerPage() {
  const report = await getAgentsMdReport();
  const faq = agentsMdFaq(report);
  const github = githubAgentsCount(report);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info, "${title}", ${shortDate(report.retrievedAt)}, ${pageUrl}`;
  const embed = `<blockquote cite="${pageUrl}"><p>${
    github
      ? `GitHub code search returned ${integer(github.count)} files named AGENTS.md on ${shortDate(github.retrievedAt)}.`
      : paperSentence()
  } The October 2026 census is a different frame: ${integer(report.paper.eitherRoot)} of ${integer(report.paper.frame)}.</p><footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer></blockquote>`;

  const liveLead = github
    ? `GitHub code search returned ${integer(github.count)} files named AGENTS.md on ${shortDate(github.retrievedAt)}${github.incomplete ? ", and marked the result incomplete" : ""}.`
    : "GitHub’s code search API did not return a total on this pass, so this page does not print a live file count as if it had one.";

  const rows: SortableRow[] = [
    {
      id: "census",
      sort: { series: "Zarzycki census", date: report.paper.date, count: report.paper.eitherRoot },
      display: {
        series: "Root AGENTS.md or CLAUDE.md, popular active repos",
        date: report.paper.date,
        count: integer(report.paper.eitherRoot),
        frame: integer(report.paper.frame),
        source: "arXiv:2610.31715v2",
      },
      href: { source: report.paper.url },
    },
    {
      id: "census-agents",
      sort: { series: "Census root AGENTS.md", date: report.paper.date, count: report.paper.rootAgentsMd },
      display: {
        series: "Root AGENTS.md only (census)",
        date: report.paper.date,
        count: integer(report.paper.rootAgentsMd),
        frame: integer(report.paper.frame),
        source: "arXiv:2610.31715v2",
      },
      href: { source: report.paper.url },
    },
    ...report.github.map((item) => ({
      id: item.query,
      sort: { series: item.label, date: item.retrievedAt.slice(0, 10), count: item.count },
      display: {
        series: item.label,
        date: item.retrievedAt.slice(0, 10),
        count: `${integer(item.count)}${item.incomplete ? " (incomplete)" : ""}`,
        frame: "GitHub’s public code index",
        source: item.source,
      },
      href: { source: item.sourceUrl },
    })),
    {
      id: "sourcegraph-agents",
      sort: {
        series: "Sourcegraph root AGENTS.md",
        date: report.snapshot.sourcegraphRetrievedAt.slice(0, 10),
        count: report.snapshot.sourcegraphRootAgentsMd,
      },
      display: {
        series: "Root AGENTS.md files, Sourcegraph GitHub index",
        date: report.snapshot.sourcegraphRetrievedAt.slice(0, 10),
        count: integer(report.snapshot.sourcegraphRootAgentsMd),
        frame: "Non-fork, non-archive, Sourcegraph index",
        source: "Sourcegraph code search",
      },
      href: { source: "https://sourcegraph.com/search?q=context:global+file:%5EAGENTS.md%24+count:all&patternType=keyword" },
    },
  ];

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description:
            "Live GitHub search for AGENTS.md files, next to the October 2026 census of popular repositories.",
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          title,
          description:
            "AGENTS.md file counts from GitHub code search, plus the Zarzycki October 16, 2026 census of 6,006 of 22,854 popular repositories.",
          path,
          datePublished: "2026-11-09",
          dateModified: report.retrievedDay,
          isBasedOn: report.paper.url,
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: TRACKER_PATHS.index },
          { name: "AGENTS.md", path },
        ]}
      />
      <ArticleTemplate
        category="Live tracker"
        title={title}
        description="How many public repositories contain an AGENTS.md file, with the method on the same page as the number. Updated daily when GitHub search answers."
        published="2026-11-09"
        updated={report.retrievedDay}
        byline={site.bylines.research}
        wide
        details={
          <>
            <p>
              {report.live ? "Live GitHub code search" : "No live GitHub code-search total"}{" "}
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
              . The census remains the paper’s.
            </p>
          </>
        }
        takeaways={agentsMdTakeaways(report)}
        toc={[
          { id: "live", text: "How many public GitHub repos contain an AGENTS.md file?", level: 2 },
          { id: "census", text: "How many popular repositories used AGENTS.md in October 2026?", level: 2 },
          { id: "compare", text: "Why don't these counts match?", level: 2 },
          { id: "methodology", text: "Where do the live numbers come from?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite this data", level: 2 },
        ]}
        citation={
          <CiteOrEmbed
            title="Cite this data"
            citation={citation}
            embed={embed}
            note="Name the series you are quoting. The census and GitHub code search are not interchangeable. The embed is optional."
          />
        }
        related={[
          {
            href: "/research/how-many-repos-use-agents-md",
            title: "How many repos use AGENTS.md?",
            description: "The October 16, 2026 census of 6,006 of 22,854 popular, active repositories.",
            kicker: "Research",
            date: "2026-11-09",
          },
          {
            href: "/blog/which-ai-agent-framework-do-people-install",
            title: "Which AI agent framework do people install?",
            description: "A different November 9 count: what pip and npm actually fetched.",
            kicker: "Blog",
            date: "2026-11-09",
          },
          {
            href: "/blog/what-is-an-ai-agent-harness",
            title: "What is an AI agent harness?",
            description: "The loop that reads a file like AGENTS.md before it edits a repository.",
            kicker: "Guide",
          },
        ]}
      >
        <TrackerNav current={path} />
        <section>
          <h2 id="live" className="text-2xl font-semibold tracking-tight">
            How many public GitHub repos contain an AGENTS.md file?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{liveLead}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            GitHub’s code search <code>total_count</code> is a file count in the public index it searches. Nested{" "}
            <code>AGENTS.md</code> files, forks GitHub still includes, and generated copies all increment it. It is the live
            number this page can refresh. It is not a count of popular, active repositories with a root file.
          </p>
          <div className="mt-5">
            <SortableTable
              caption="AGENTS.md measurements with their method and date"
              columns={[
                { key: "series", label: "What was counted" },
                { key: "date", label: "Date" },
                { key: "count", label: "Count", numeric: true },
                { key: "frame", label: "Frame" },
                { key: "source", label: "Source" },
              ]}
              rows={rows}
              defaultSort="date"
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="census" className="text-2xl font-semibold tracking-tight">
            How many popular repositories used AGENTS.md in October 2026?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{paperSentence()}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Pawel Zarzycki’s census is arXiv:2610.31715, version 2. The split is {integer(report.paper.onlyAgentsMd)} with
            only AGENTS.md, {integer(report.paper.onlyClaudeMd)} with only CLAUDE.md, and {integer(report.paper.both)} with
            both. This tracker does not re-query those {integer(report.paper.frame)} repositories. The full note, including
            the star-tier table and what the files contain, is{" "}
            <Link className="text-[var(--link)] underline" href="/research/how-many-repos-use-agents-md">
              How many repos use AGENTS.md?
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 id="compare" className="text-2xl font-semibold tracking-tight">
            Why don&apos;t these counts match?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            They are not the same measurement. {paperRate()}% of a defined popular set is not GitHub’s file-search total, and
            neither is the homepage’s round number.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The homepage, read {report.homepageRetrievedAt ? shortDate(report.homepageRetrievedAt) : "when this page last fetched it"},
            {report.homepageClaim ? ` says the format is used by ${report.homepageClaim}.` : " did not yield the 60k sentence on this pass."}{" "}
            The spec repository <code>agentsmd/agents.md</code>
            {report.specStars != null
              ? ` had ${integer(report.specStars)} stars${report.specStarsRetrievedAt ? ` on ${shortDate(report.specStarsRetrievedAt)}` : ""}.`
              : " did not return a star field on this pass."}{" "}
            Stars on the spec repository are not the adoption count.
          </p>
        </section>

        <section className="mt-12">
          <h2 id="methodology" className="text-2xl font-semibold tracking-tight">
            Where do the live numbers come from?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            This page calls <code>GET https://api.github.com/search/code?q=filename:AGENTS.md</code> when a GitHub token is
            present. Unauthenticated code search returns 401, so a missed live total is left blank rather than guessed. Spec
            stars use the public repository endpoint. The homepage claim is scraped from{" "}
            <a className="text-[var(--link)] underline" href="https://agents.md/">
              agents.md
            </a>
            . A dated Sourcegraph path search of root <code>AGENTS.md</code> files is kept as a public-index snapshot; that
            pass warned that some backends were unavailable, so the figure is a lower bound.
          </p>
          {report.snapshot.sourcegraphWarnings.map((warning) => (
            <p key={warning} className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              {warning}
            </p>
          ))}
          {report.failures.length ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              This pass: {report.failures.join(" ")}
            </p>
          ) : null}
        </section>

        <FaqList items={faq.map((item) => ({ question: item.question, answer: item.answer }))} />
        <div className="mt-14">
          <NewsletterSignup id="tracker-agents-md" />
        </div>
      </ArticleTemplate>
    </>
  );
}
