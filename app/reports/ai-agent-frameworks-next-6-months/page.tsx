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
} from "@/lib/frameworks-6-month";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function FrameworksSixMonthPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
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
          { name: "Frameworks, next 6 months", path },
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
        wide
        details={
          <p>
            GitHub repository and releases API, November 12, 2026, about 06:55 GMT. Star deltas use the November 5
            snapshot on this site. Nothing here is a benchmark score.
          </p>
        }
        keyNumbers={keyNumbers}
        executiveSummary={
          <>
            {executiveSummary.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 48)} text={paragraph} />
            ))}
          </>
        }
        takeaways={[...findings]}
        toc={chapters.map((chapter) => ({ id: chapter.id, text: chapter.title, level: 2 as const }))}
        methodology={
          <>
            {methodology.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 48)} text={paragraph} />
            ))}
          </>
        }
        sources={<SourceList sources={sources} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={[
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "Framework GitHub stats, November 5",
            description: "Nineteen repositories. This page re-reads eight of them a week later and does not replace the census.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/agent-harness-benchmark-november-2026",
            title: "Harness benchmark, November 2026",
            description: "SWE-bench and Terminal-Bench with the harness named. Stars are not a score.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/mcp-next-6-months",
            title: "MCP, Nov 2026 to May 2027",
            description: "The protocol brief. July 28, 2027 sits on the twelve-month page, after this window.",
            kicker: "Report",
            date: "2026-11-10",
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents in the next 12 months",
            description: "The flagship. Framework tags through May are this page.",
            kicker: "Flagship",
            date: "2026-11-12",
          },
          {
            href: "/best/ai-agent-frameworks",
            title: "AI agent frameworks, compared",
            description: "Licence and latest tag for a wider set, read November 11. Not a quality ranking.",
            kicker: "Comparison",
            date: "2026-11-11",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
