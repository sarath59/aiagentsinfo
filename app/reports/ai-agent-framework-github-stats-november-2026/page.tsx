import Link from "next/link";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { ToolCtas } from "@/components/ToolCtas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { NewsletterSignup } from "@/components/newsletter/NewsletterSignup";
import { SortableTable } from "@/components/SortableTable";
import { description as benchmarkDescription, path as benchmarkPath, title as benchmarkTitle } from "@/lib/benchmark-report";
import { categorySummaries } from "@/lib/directory-meta";
import { getDirectoryStats } from "@/lib/directory-stats";
import {
  citation,
  csvPath,
  description,
  directoryMatches,
  embedHtml,
  frameworkFaq,
  keyFigures,
  leadParagraph,
  licenceSentence,
  methodologyFacts,
  packageReleaseNote,
  path,
  pdfPath,
  quietReleaseSentence,
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
          distributionPath: `${path}/csv`,
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
      <ArticleTemplate
        category="Report"
        title={title}
        description={description}
        published={retrievedDay}
        updated={retrievedDay}
        byline={site.bylines.research}
        wide
        details={
          <>
            <p>
              Data pulled from GitHub on {retrievedLabel}. Snapshot{" "}
              <time dateTime={retrievedAt}>{retrievedAt}</time> UTC.
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
          { id: "release-recency", text: "Which frameworks released recently?", level: 2 },
          { id: "methodology", text: "Where do the numbers come from?", level: 2 },
          { id: "faq", text: "FAQ", level: 2 },
          { id: "citation", text: "Cite or embed", level: 2 },
        ]}
        actions={
          <>
            <a className="btn-primary px-4 py-2 text-sm" href={pdfPath}>
              Download PDF
            </a>
            <a className="btn-ghost px-4 py-2 text-sm" href={csvPath}>
              Download CSV
            </a>
          </>
        }
        citation={
          <CiteOrEmbed
            citation={citation}
            embed={embedHtml}
            note="The citation names this page and the date above. The embed is an HTML link back here."
          />
        }
        related={[
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
              downloadHref={csvPath}
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
            Which AI agent frameworks released recently?
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{recentReleaseSentence()}</p>
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
            <Link className="text-[var(--link)] underline" href={benchmarkPath}>
              {benchmarkTitle}
            </Link>
            ,{" "}
            <Link className="text-[var(--link)] underline" href="/best/ai-agent-frameworks">
              AI agent framework comparison table
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
        <div className="mt-14">
          <NewsletterSignup id="report-framework-github" />
        </div>
      </ArticleTemplate>
    </>
  );
}
