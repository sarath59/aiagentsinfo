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
  readOn,
  readingMinutes,
  reportCharts,
  sources,
  thesis,
  title,
} from "@/lib/agents-2027";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default function Agents2027ReportPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, ${updatedLabel}. Forecasts are labeled in the text.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: readOn })} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "AI agents in 2027", path },
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
        keyNumbers={[...keyNumbers]}
        executiveSummary={
          <>
            {executiveSummary.map((paragraph) => (
              <ReportProse key={paragraph.slice(0, 48)} text={paragraph} />
            ))}
          </>
        }
        takeaways={[...findings]}
        toc={chapters.map((chapter) => ({ id: chapter.id, text: chapter.title, level: 2 as const }))}
        sources={<SourceList sources={[...sources]} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={[
          {
            href: "/reports/ai-agents-in-production-2026",
            title: "AI agents in production, 2026",
            description: "The cross-section this forecast starts from: surveys, spend, boards, and installs.",
            kicker: "Report",
            date: readOn,
            readingMinutes: 22,
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents, Nov 2026 to Nov 2027",
            description: "Dated filings and legal marks. This forecast does not refill the blank months.",
            kicker: "Report",
            date: "2026-11-07",
          },
          {
            href: "/reports/ai-agents-next-6-months",
            title: "AI agents, Nov 2026 to May 2027",
            description: "The shorter window of the same filing record.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/browser-and-computer-use-agents-next-6-months",
            title: "Browser and computer-use agents",
            description: "Ten live products and the OSWorld 2.0 rows the computer-use call uses.",
            kicker: "Report",
            date: "2026-11-09",
          },
          {
            href: "/glossary/harness",
            title: "Harness",
            description: "The loop, tools, and checks around a model.",
            kicker: "Glossary",
          },
          {
            href: "/glossary/model-context-protocol",
            title: "Model Context Protocol",
            description: "The tool socket. The July 2027 date is eligibility, not deletion.",
            kicker: "Glossary",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
