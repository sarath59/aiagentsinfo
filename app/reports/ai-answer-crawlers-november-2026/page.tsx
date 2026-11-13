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
} from "@/lib/ai-answer-crawlers-november-2026";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function AiAnswerCrawlersPage() {
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
          isBasedOn: "https://datafa.st/docs/api/website/bot-traffic",
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
            Checked November 11, 2026. Bot window: 4–10 November 2026, Asia/Calcutta, seven full days
            (2026-11-03T18:30:00.000Z through 2026-11-10T18:29:59.999Z). Human referrers: 4–11 November 2026 IST,
            seven full days plus 11 November so far. That referrer export was generated at 6:46 a.m. IST on 11
            November 2026.
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
            note="Nothing here is estimated. Request counts are copied from the DataFast export. Shares and the 40-to-1 ratio are computed from those counts and are labeled as computed on the page."
          />
        }
        related={[
          {
            href: "/reports/ai-agent-vendor-robots-txt-november-2026",
            title:
              "Do AI agent companies let AI agents read their sites? robots.txt and llms.txt of 52 websites, November 2026",
            description:
              "Their robots.txt, not ours. 52 vendor sites fetched November 13, 2026. 45 of 47 parsed files allow / for GPTBot.",
            kicker: "Daily brief",
            date: "2026-11-13",
          },
          {
            href: "/tools/ai-crawler-robots-txt-checker",
            title: "robots.txt checker for AI crawlers: who can fetch /",
            description: "The same tokens, checked against a live robots.txt. Nothing you enter is stored.",
            kicker: "Tool",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents, Nov 2026 to Nov 2027",
            description: "The 12-month outlook. ChatGPT-User fetched it twice in this week.",
            kicker: "Report",
            date: "2026-11-07",
          },
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "AI agent framework release November 2026",
            description: "GoogleAgent put 14 of its 16 answer fetches on this table.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/ai-shopping-agents-next-6-months",
            title: "AI shopping agents next 6 months: 6 companies (Nov 2026–May 2027)",
            description: "Claude-User fetched this outlook 5 times, and ChatGPT-User fetched it twice.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/agent-harness-benchmark-november-2026",
            title: "Agent harness benchmark, November 2026",
            description: "ChatGPT-User fetched this benchmark 5 times in the seven-day window.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/ai-coding-agents-next-30-days",
            title: "AI coding agents, 8 Nov to 8 Dec 2026",
            description: "The report article ChatGPT-User fetched most often in this week, 8 times.",
            kicker: "Report",
            date: "2026-11-08",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
