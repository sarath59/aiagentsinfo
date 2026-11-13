import Link from "next/link";
import { ReportLayout } from "@/components/ReportLayout";
import { ToolCtas } from "@/components/ToolCtas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { SortableTable } from "@/components/SortableTable";
import { description as benchmarkDescription, path as benchmarkPath, title as benchmarkTitle } from "@/lib/benchmark-report";
import { categorySummaries } from "@/lib/directory-meta";
import { getDirectoryStats } from "@/lib/directory-stats";
import {
  citation,
  description,
  directoryMatches,
  embedHtml,
  frameworkFaq,
  keyFigures,
  leadParagraph,
  licenceSentence,
  methodologyFacts,
  novemberUpdateAnswer,
  packageReleaseNote,
  path,
  quietReleaseSentence,
  readingMinutes,
  recentReleaseSentence,
  recencyColumns,
  recencyRows,
  retrievedAt,
  retrievedDay,
  retrievedLabel,
  source,
  tableCaption,
  takeaways,
  title,
  frameworkColumns,
  frameworkRows,
} from "@/lib/framework-github-stats";
import { BENCHMARK_READ_ON } from "@/lib/harness-benchmark";
import { JsonLd, datasetJsonLd, datasetLicenseUrl, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default async function FrameworkGithubStatsPage() {
  const stats = await getDirectoryStats();
  const matches = directoryMatches();
  const packageNote = packageReleaseNote();
  const faq = frameworkFaq();

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: retrievedDay,
          dateModified: retrievedDay,
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          title,
          description,
          path,
          datePublished: retrievedDay,
          dateModified: retrievedDay,
          isBasedOn: source,
        })}
      />
      <JsonLd
        data={faqPageJsonLd(faq.map((item) => ({ question: item.question, answer: `${item.lead} ${item.detail}` })))}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis="Nineteen open-source agent repositories, copied from GitHub on November 5, 2026. Nothing on this page is estimated."
        description={description}
        published={retrievedDay}
        updated={retrievedDay}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        details={
          <>
            <p>
              Data pulled from GitHub on {retrievedLabel}. Snapshot{" "}
              <time dateTime={retrievedAt}>{retrievedAt}</time> UTC.
            </p>
            <p className="mt-2">
              The tool JSON behind these repositories is a separate check. On November 13, 2026, 0 of 6 official
              examples passed a second API. The runs are in{" "}
              <Link className="text-[var(--link)] underline" href="/blog/can-one-tool-json-serve-openai-claude-and-mcp">
                Can one tool JSON serve OpenAI, Claude, and MCP?
              </Link>
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
        takeaways={takeaways()}
        toc={[
          { id: "key-figures", text: "Which figures does this snapshot report?", level: 2 },
          { id: "repositories", text: "Which frameworks are in the table?", level: 2 },
          { id: "licences", text: "What licences does GitHub report?", level: 2 },
          { id: "release-recency", text: "Which AI agent frameworks released updates in November 2026?", level: 2 },
          { id: "methodology", text: "Where do the numbers come from?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        citation={
          <CiteOrEmbed
            citation={citation}
            embed={embedHtml}
            note="The citation names this page and the date above. The embed is an HTML link back here."
          />
        }
        related={[
          {
            href: "/blog/can-one-tool-json-serve-openai-claude-and-mcp",
            title: "Can one tool JSON serve OpenAI, Claude, and MCP?",
            description:
              "Six official tool examples, posted to the prompt checker on November 13, 2026. 0 passed a second API. The Agents SDK schema the docs print also fails OpenAI strict mode.",
            kicker: "Guide",
            date: "2026-11-13",
          },
          {
            href: "/research/ai-agent-framework-mcp-a2a-support-november-2026",
            title: "13 MCP clients, 5 MCP servers, 6 A2A",
            description:
              "Protocol cells for these frameworks from docs read November 13, 2026. This snapshot is stars and one tag.",
            kicker: "Research",
            date: "2026-11-13",
          },
          {
            href: "/reports/ai-agent-vendor-robots-txt-november-2026",
            title:
              "Do AI agent companies let AI agents read their sites? robots.txt and llms.txt of 52 websites, November 2026",
            description:
              "robots.txt and llms.txt for 52 agent websites, fetched November 13, 2026. 45 of 47 parsed files allow / for GPTBot.",
            kicker: "Daily brief",
            date: "2026-11-13",
          },
          {
            href: "/research/top-mcp-server-repos-november-2026",
            title: "5 of 44 top MCP server repos are archived",
            description:
              "GitHub search for mcp-server in the name, 03:44 UTC on November 13, 2026. Five archived repos still hold 9,827 stars. Six descriptions say official.",
            kicker: "Research",
            date: "2026-11-13",
          },
          {
            href: "/blog/ai-staff-for-small-business-seat-prices-november-2026",
            title: "AI staff for a small business: $7, $18, and $20 a seat",
            description:
              "Workspace Starter, Microsoft 365 Copilot Business, and Claude Team, read November 13, 2026. The seat is not the phone, the outbound sequence, or the books.",
            kicker: "Explainer",
            date: "2026-11-13",
          },
          {
            href: "/blog/a2ui-1-0-agent-framework-release-november-2026",
            title: "A2UI 1.0 agent framework release November 2026: Gemini still renders 0.9.1",
            description:
              "Google’s stable generative UI protocol, announced November 11, 2026. a2ui-project/a2ui is outside this snapshot.",
            kicker: "News",
            date: "2026-11-12",
          },
          {
            href: "/research/ai-agent-framework-issue-health-november-2026",
            title: "59 LangChain issues closed in under a minute. The bug-labeled median was 3.3 days.",
            description:
              "Open issues, open pull requests, and median time-to-close for these 19 repositories, pulled 13:46 UTC on November 11, 2026.",
            kicker: "Research",
            date: "2026-11-11",
          },
          {
            href: "/blog/ai-agent-framework-release-november-2026",
            title: "AI agent framework release November 2026: browser-use 1.0.2 will not install next to Pydantic AI 2.67",
            description:
              "What the November 9–11 releases change in a harness. browser-use 1.0.2 pins pydantic-ai-slim 2.66.0. pydantic-ai 2.67.0 requires 2.67.0.",
            kicker: "News",
            date: "2026-11-11",
          },
          {
            href: "/reports/web-search-tools-for-ai-agents-november-2026",
            title:
              "Best web search tool for Claude and OpenAI agents, November 2026: prices and limits of 13 APIs checked",
            description:
              "A separate GitHub read: stars and newest commit on 10 official search MCP servers, plus list prices. Checked November 12, 2026.",
            kicker: "Daily brief",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-answer-crawlers-november-2026",
            title: "AI answer crawlers, November 2026: 196 fetches in 7 days, 160 from ChatGPT-User",
            description:
              "Which answer engines fetched this site from 4 to 10 November 2026. GoogleAgent put 14 of 16 answer fetches on this page.",
            kicker: "Daily brief",
            date: "2026-11-11",
          },
          {
            href: "/research/ai-agent-framework-release-cadence-october-november-2026",
            title: "3,165 GitHub releases in 30 days, or 407 days of silence",
            description:
              "How many GitHub releases each framework published in the 30 and 60 days before November 11, 2026. This page’s latest-tag column is a different count.",
            kicker: "Research",
            date: "2026-11-11",
          },
          {
            href: "/research/livekit-agents-vs-pipecat-installs-november-2026",
            title: "LiveKit Agents had 4,583,195 downloads. Pipecat had 2,007 more stars.",
            description: "Voice frameworks were outside this snapshot. October 10 through November 8, 2026, PyPI without mirrors.",
            kicker: "Research",
            date: "2026-11-10",
          },
          {
            href: "/trackers/downloads",
            title: "AI agent framework downloads tracker (updated daily)",
            description: "PyPI and npm file requests for these libraries, refreshed from public APIs.",
            kicker: "Tracker",
          },
          {
            href: "/trackers/stars",
            title: "AI agent framework GitHub stars tracker (updated daily)",
            description: "Live stargazers_count for the same repositories.",
            kicker: "Tracker",
          },
          {
            href: benchmarkPath,
            title: benchmarkTitle,
            description: benchmarkDescription,
            kicker: "Report",
            date: BENCHMARK_READ_ON,
          },
          {
            href: "/directory/category/agent-frameworks",
            title: "Agent frameworks and harnesses",
            description: categorySummaries["agent-frameworks"],
            kicker: "Directory",
          },
          {
            href: "/trackers/harnesses",
            title: "Harness comparison",
            description: "A comparison of agent harnesses and frameworks. Cells are published only when each one is sourced.",
            kicker: "Tracker",
          },
          {
            href: "/directory/stats",
            title: "Directory stats",
            description:
              "Counts from this site's own directory: category, pricing, indie or startup or YC origin, additions, and community submissions. Generated when the site is built.",
            kicker: "Data",
            date: stats.updated,
          },
        ]}
      >
        <div className="article-prose">
          <p>{leadParagraph()}</p>
        </div>

        <section className="mt-10" aria-labelledby="key-figures">
          <h2 id="key-figures" className="text-2xl font-semibold tracking-tight">
            Which figures does this November 2026 snapshot report?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed">
            {takeaways()[0]}
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Each card is calculated from the snapshot of {retrievedAt}.
          </p>
          <ul className="mt-5 grid list-none gap-4 p-0 sm:grid-cols-2 xl:grid-cols-4">
            {keyFigures().map((figure) => (
              <li key={figure.id} className="glass rounded-3xl p-5">
                <p className="kicker">{figure.label}</p>
                <p
                  className={
                    figure.kind === "name"
                      ? "mt-3 text-lg font-semibold tracking-tight"
                      : "mt-3 text-3xl font-semibold tracking-tight tabular-nums"
                  }
                >
                  {figure.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{figure.note}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 id="repositories" className="text-2xl font-semibold tracking-tight">
            Which AI agent frameworks are in the sortable table?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed">
            The table lists every repository in the snapshot and sorts by stars. Filter by a minimum star count or by whether GitHub detected an open-source licence.
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The framework name links to the GitHub repository. Open issues + PRs is GitHub&apos;s open_issues_count,
            which includes open pull requests. {packageNote}
          </p>
          <div className="mt-5">
            <SortableTable
              caption={tableCaption()}
              columns={frameworkColumns}
              rows={frameworkRows()}
              defaultSort="stars"
              filters={["stars", "free", "openSource"]}
              source={{ title, updated: retrievedDay, path }}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="licences" className="text-2xl font-semibold tracking-tight">
            What licences does GitHub report?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{licenceSentence()}</p>
        </section>

        <section className="mt-12">
          <h2 id="release-recency" className="text-2xl font-semibold tracking-tight">
            Which AI agent frameworks released updates in November 2026?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{novemberUpdateAnswer().lead}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{novemberUpdateAnswer().detail}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Google&apos;s A2UI 1.0, announced November 11, 2026 as the first stable version of its generative UI protocol, is outside this snapshot.{" "}
            <Link className="text-[var(--link)] underline" href="/blog/a2ui-1-0-agent-framework-release-november-2026">
              A2UI 1.0 agent framework release November 2026
            </Link>{" "}
            records the package clocks and the hosts that still render 0.9.1.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The sourced comparison is{" "}
            <Link className="text-[var(--link)] underline" href="/best/ai-agent-frameworks">
              Best AI agent frameworks
            </Link>
            . Live star counts for these repositories are on the{" "}
            <Link className="text-[var(--link)] underline" href="/trackers/stars">
              GitHub stars tracker
            </Link>
            .
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{recentReleaseSentence()}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{quietReleaseSentence()}</p>
          <div className="mt-5">
            <SortableTable
              caption={`Days from each latest release to ${retrievedLabel}`}
              columns={recencyColumns}
              rows={recencyRows()}
              defaultSort="days"
              source={{ title, updated: retrievedDay, path }}
            />
          </div>
        </section>

        <section className="mt-12">
          <h2 id="methodology" className="text-2xl font-semibold tracking-tight">
            Where do the November 2026 numbers come from?
          </h2>
          {methodologyFacts().map((fact) => (
            <p key={fact} className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              {fact}
            </p>
          ))}
          {matches.length ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Several of these repositories have a listing in this site&apos;s directory:{" "}
              {matches.map((match, index) => (
                <span key={match.slug}>
                  {index > 0 ? "; " : null}
                  <Link className="text-[var(--link)] underline" href={match.href}>
                    {match.name}
                  </Link>{" "}
                  ({match.repo})
                </span>
              ))}
              .
            </p>
          ) : null}
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Related pages:{" "}
            <Link className="text-[var(--link)] underline" href="/research/top-mcp-server-repos-november-2026">
              5 of 44 top MCP server repos are archived
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/blog/ai-staff-for-small-business-seat-prices-november-2026">
              AI staff for a small business: $7, $18, and $20 a seat
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/research/ai-agent-framework-issue-health-november-2026">
              59 LangChain issues closed in under a minute
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href={benchmarkPath}>
              {benchmarkTitle}
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/best/ai-agent-frameworks">
              AI agent framework comparison table
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/trackers/stars">
              GitHub stars tracker
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/directory/category/agent-frameworks">
              agent frameworks
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/trackers/harnesses">
              harness comparison
            </Link>
            , and{" "}
            <Link className="text-[var(--link)] underline" href="/directory/stats">
              directory stats
            </Link>
            .
          </p>
        </section>

        <ToolCtas tools={["picker", "calculator"]} />
        <FaqList
          items={faq.map((item) => ({
            question: item.question,
            answer: (
              <>
                <p>{item.lead}</p>
                <p>{item.detail}</p>
              </>
            ),
          }))}
        />
      </ReportLayout>
    </>
  );
}
