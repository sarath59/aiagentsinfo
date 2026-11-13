import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { ReportChapters, ReportProse, SourceList } from "@/components/ReportDocument";
import { ReportLayout } from "@/components/ReportLayout";
import {
  chapters,
  description,
  executiveSummary,
  faq,
  findings,
  keyNumbers,
  methodology,
  path,
  readOn,
  readingMinutes,
  reportCharts,
  sources,
  thesis,
  title,
} from "@/lib/coding-agents-6-month";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function CodingAgentsSixMonthPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `Source: aiagentsinfo.com, "${title}" Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer>Source: aiagentsinfo.com, <a href="${pageUrl}">${title}</a>, last updated ${updatedLabel}.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <JsonLd data={datasetJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "Coding agents, next 6 months", path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis={thesis}
        description={description}
        published={readOn}
        updated={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        details={
          <p>
            Vendor pricing pages, changelogs, the SWE-bench Verified file, and the Terminal-Bench 4.1 file, read
            November 13, 2026. A dollar per success is the board&apos;s total divided by its successes. A page that
            withheld a dollar does not get one here.
          </p>
        }
        keyNumbers={keyNumbers}
        executiveSummary={
          <>
            {executiveSummary.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 64)} text={paragraph} />
            ))}
          </>
        }
        takeaways={[...findings]}
        toc={chapters.map((chapter) => ({ id: chapter.id, text: chapter.title, level: 2 as const }))}
        methodology={
          <>
            {methodology.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 64)} text={paragraph} />
            ))}
          </>
        }
        sources={<SourceList sources={sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={[
          {
            href: "/reports/ai-coding-agents-next-30-days",
            title: "AI coding agents, 8 Nov to 8 Dec 2026",
            description:
              "The November 8 sticker sheet and the three dates that brief already named. This page does not paste that matrix.",
            kicker: "Report",
            date: "2026-11-08",
          },
          {
            href: "/reports/agent-harness-benchmark-november-2026",
            title: "Agent harness benchmark, November 2026",
            description:
              "The November 5 copy of Terminal-Bench 4.0 and the SWE-bench rows saved that day. This page uses 4.1.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/blog/claude-code-vs-codex-pricing",
            title: "Claude Code vs Codex pricing",
            description:
              "The longer seat comparison, re-checked November 9. Where a sticker could drift, this page is the November 13 read.",
            kicker: "Guide",
            date: "2026-11-10",
          },
          {
            href: "/research/harnessflow-mcts-harness-optimization",
            title: "HarnessFlow MCTS harness optimization",
            description:
              "A paper about searching for a harness program. It is not a row on SWE-bench or Terminal-Bench.",
            kicker: "Research",
            date: "2026-11-09",
          },
          {
            href: "/reports/mcp-next-6-months",
            title: "MCP, Nov 2026 to May 2027",
            description:
              "The protocol brief. This page only records what each coding-agent vendor prints about MCP on its own plan.",
            kicker: "Report",
            date: "2026-11-10",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
