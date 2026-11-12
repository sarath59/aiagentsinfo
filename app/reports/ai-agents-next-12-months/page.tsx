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
  updatedOn,
} from "@/lib/agents-12-month-outlook";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function AgentsTwelveMonthOutlookPage() {
  const updatedLabel = formatDate(updatedOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Last updated ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, last updated ${updatedLabel}.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({ title, description, path, datePublished: readOn, dateModified: updatedOn })}
      />
      <JsonLd
        data={datasetJsonLd({
          title,
          description,
          path,
          datePublished: readOn,
          dateModified: updatedOn,
          isBasedOn: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026072484/anthropicpbc-sx1ax2.htm",
        })}
      />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "AI agents, next 12 months", path },
        ]}
      />
      <ReportLayout
        category="Flagship"
        title={title}
        thesis={thesis}
        description={description}
        published={readOn}
        updated={updatedOn}
        readingMinutes={readingMinutes}
        byline={site.bylines.research}
        wide
        details={
          <p>
            Published November 7, 2026. Updated November 12, 2026, after the November 10 Anthropic amendment and a
            fresh read of the Gemini and OpenAI price pages. Regulation dates carried from November 7 are labeled.
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
            href: "/reports/ai-agents-in-production-2026",
            title: "AI agents in production, 2026",
            description: "What is already running. This calendar does not restate those surveys.",
            kicker: "Report",
            date: "2026-11-10",
          },
          {
            href: "/reports/ai-agents-in-2027",
            title: "AI agents in 2027",
            description: "The labeled forecast, and what would falsify it. This page does not make those calls.",
            kicker: "Report",
            date: "2026-11-10",
          },
          {
            href: "/reports/ai-shopping-agents-next-30-days",
            title: "Shopping agents, the next 30 days",
            description: "Black Friday and Cyber Monday. Checkout days and Adobe’s two Thanksgiving rates.",
            kicker: "Report",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agent-frameworks-next-6-months",
            title: "Frameworks and harnesses, next 6 months",
            description: "Tags and stars read November 12. No release day is published through May 2027.",
            kicker: "Report",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agents-next-6-months",
            title: "AI agents, Nov 2026 to May 2027",
            description: "The shorter outlook. It stops before the August sandbox date.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/research/ai-agents-next-12-months-scorecard-november-2026",
            title: "The $69.8 billion line became $70.7 billion",
            description: "The November 11 note that caught the amendment. This page now uses the later figure.",
            kicker: "Research",
            date: "2026-11-11",
          },
          {
            href: "/agent-cost-calculator",
            title: "AI agent cost calculator",
            description: "Official per-token prices, re-read November 12. A token price is not a cost per task.",
            kicker: "Tool",
            date: "2026-11-12",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
