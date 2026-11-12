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
} from "@/lib/shopping-agents-30-day";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function ShoppingAgents30DayPage() {
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
          { name: "Shopping agents, next 30 days", path },
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
            Checked November 12, 2026. Adobe’s two holiday pages, Amazon’s November 6 post, OpenAI’s merchant page,
            and Shopify’s Shop Pay docs were fetched that day. A figure without one of those pages is not in the
            tables.
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
            href: "/reports/ai-shopping-agents-next-6-months",
            title: "AI shopping agents, Nov 2026 to May 2027",
            description: "The six-company calendar. This 30-day brief does not replace it.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/tools/shopping-agent-readiness-checker",
            title: "Shopping-agent readiness checker",
            description: "Eighteen checks for find, read, and checkout. The score stays in the browser.",
            kicker: "Tool",
            date: "2026-11-12",
          },
          {
            href: "/blog/ai-shopping-agents-compared-november-2026",
            title: "Who can finish checkout, as of November 11",
            description: "Google, Amazon, Copilot, Perplexity, and ChatGPT. This brief did not reopen that table.",
            kicker: "Guide",
            date: "2026-11-11",
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents in the next 12 months",
            description: "The flagship calendar. Shopping checkout stays on the shopping briefs.",
            kicker: "Flagship",
            date: "2026-11-12",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
