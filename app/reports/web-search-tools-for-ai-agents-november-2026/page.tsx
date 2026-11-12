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
} from "@/lib/web-search-tools-november-2026";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function WebSearchToolsNovember2026Page() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

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
          isBasedOn: "https://platform.claude.com/docs/en/about-claude/pricing",
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <ReportLayout
        category="Daily brief"
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
            Checked November 12, 2026. Prices, free allowances, and rate limits were read that day from each
            vendor’s own pricing or docs page. GitHub stars and commit times were read from the repository API
            the same day. Nothing here is estimated.
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
        citation={
          <CiteOrEmbed
            citation={citation}
            embed={embed}
            title="Cite or embed"
            note="Nothing here is estimated. Printed prices are copied from the vendor page. A figure this page multiplies or divides is labeled computed."
          />
        }
        related={[
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents, Nov 2026 to Nov 2027",
            description: "The 12-month outlook for agents. This brief is the search-call price card, not that calendar.",
            kicker: "Report",
            date: "2026-11-07",
          },
          {
            href: "/best/ai-agents-for-web-search",
            title: "Best AI agent for web search: 4 in 2026",
            description: "The buyer’s list of chat products. This brief is the API price and limit dataset behind a harness call.",
            kicker: "Comparison",
            date: "2026-11-11",
          },
          {
            href: "/reports/mcp-next-6-months",
            title: "MCP, Nov 2026 to May 2027",
            description: "The protocol outlook. The MCP table on this page is stars and last commit for search servers only.",
            kicker: "Report",
            date: "2026-11-10",
          },
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "AI agent framework release November 2026",
            description: "Framework release tags. The GitHub read here is search MCP repositories, not those frameworks.",
            kicker: "Report",
            date: "2026-11-05",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
