import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { ReportChapters, ReportProse, SourceList } from "@/components/ReportDocument";
import { ReportLayout } from "@/components/ReportLayout";
import {
  chapters,
  description,
  executiveSummary,
  findings,
  keyNumbers,
  path,
  productionCsv,
  readOn,
  readingMinutes,
  reportCharts,
  sources,
  thesis,
  title,
} from "@/lib/agents-in-production-2026";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default function ProductionAgentsReportPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, ${updatedLabel}.</footer>
</blockquote>`;
  const csv = productionCsv();

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <JsonLd
        data={datasetJsonLd({
          title,
          description,
          path,
          datePublished: readOn,
          dateModified: readOn,
          distributionPath: `${path}/csv`,
          isBasedOn: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "Agents in production, 2026", path },
        ]}
      />
      <ReportLayout
        category="Report"
        title={title}
        thesis={thesis}
        description={description}
        published={readOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        keyNumbers={keyNumbers.map((item) => ({ value: item.value, label: item.label, note: item.note }))}
        executiveSummary={
          <>
            {executiveSummary.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 48)} text={paragraph} />
            ))}
          </>
        }
        takeaways={[...findings]}
        toc={chapters.map((chapter) => ({ id: chapter.id, text: chapter.title, level: 2 as const }))}
        actions={
          <>
            <a className="btn-primary px-4 py-2 text-sm" href={`${path}/pdf`}>
              Download PDF
            </a>
            <a className="btn-ghost px-4 py-2 text-sm" href={`${path}/csv`}>
              Download CSV
            </a>
          </>
        }
        sources={<SourceList sources={[...sources]} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={[
          {
            href: "/reports/ai-agents-in-2027",
            title: "AI agents in 2027: task cost will not fall like token cost",
            description: "The forecast that starts from this cross-section, with the observations that would retire it.",
            kicker: "Report",
            date: readOn,
            readingMinutes: 16,
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents, Nov 2026 to Nov 2027",
            description: "The filing calendar. Dated company and government marks, not a forecast.",
            kicker: "Report",
            date: "2026-11-07",
          },
          {
            href: "/reports/agent-harness-benchmark-november-2026",
            title: "Agent harness benchmark, November 2026",
            description: "The full SWE-bench and Terminal-Bench tables this report charts.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "Framework releases, November 2026",
            description: "The 19-repository release pull behind the recency count.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/trackers/downloads",
            title: "Framework downloads",
            description: "The PyPI and npm snapshot, refreshed from the public registries.",
            kicker: "Tracker",
          },
          {
            href: "/best/ai-coding-agents",
            title: "Best AI coding agents",
            description: "List prices for Claude Code, Codex, Cursor, and GitHub Copilot.",
            kicker: "Comparison",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
        <p className="report-chart-source">
          CSV columns: {csv.headers.join(", ")}. {csv.rows.length} data rows.
        </p>
      </ReportLayout>
    </>
  );
}
