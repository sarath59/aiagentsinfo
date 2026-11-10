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
  mcpOutlookCsv,
  path,
  readOn,
  readingMinutes,
  reportCharts,
  sources,
  thesis,
  title,
} from "@/lib/mcp-outlook";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default function McpOutlookPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, ${updatedLabel}.</footer>
</blockquote>`;
  const csv = mcpOutlookCsv();

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
          isBasedOn: "https://modelcontextprotocol.io/specification/2026-07-28/changelog",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "MCP, Nov 2026 to May 2027", path },
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
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents, Nov 2026 to Nov 2027",
            description: "The filing calendar that carries the July 28, 2027 MCP removal-eligibility date.",
            kicker: "Report",
            date: "2026-11-07",
          },
          {
            href: "/reports/ai-agents-next-6-months",
            title: "AI agents, Nov 2026 to May 2027",
            description: "Company and government dates for the same six months. This page is the protocol.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/glossary/model-context-protocol",
            title: "What is an MCP server?",
            description: "The glossary entry for the protocol, with the revision the spec named on November 8.",
            kicker: "Glossary",
          },
          {
            href: "/blog/how-many-official-mcp-servers-are-there",
            title: "How many official MCP servers are there?",
            description: "The November 8 registry walk, including the namespace that held 2,366 records.",
            kicker: "Blog",
            date: "2026-11-08",
          },
          {
            href: "/research/mcphallu-mcp-agent-hallucinations",
            title: "MCPHallu: when the agent says the tool worked",
            description: "A paper note on agents claiming success when the MCP tools cannot finish the task.",
            kicker: "Research",
          },
          {
            href: "/mcp",
            title: "This site's MCP server",
            description: "A public read-only Streamable HTTP endpoint. The November 10 registry search returned no row for this site.",
            kicker: "API",
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
