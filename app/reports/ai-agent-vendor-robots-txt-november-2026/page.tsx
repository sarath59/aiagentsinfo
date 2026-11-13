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
} from "@/lib/vendor-robots-november-2026";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function VendorRobotsNovemberPage() {
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
          isBasedOn: "https://www.rfc-editor.org/rfc/rfc9309",
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
            Checked November 13, 2026. robots.txt and llms.txt were fetched at 2026-11-13T03:21:43.733Z. Each
            homepage status is one GET from 54.147.134.223.
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
            note="The citation names this page and the date above. Every count on the page is computed from the robots.txt and llms.txt responses fetched that hour."
          />
        }
        related={[
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents in the next 12 months: $70.7 billion is dated (Nov 2026 to Nov 2027)",
            description: "The flagship calendar of dated filings, token-price steps, and regulation clocks.",
            kicker: "Report",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-answer-crawlers-november-2026",
            title: "AI answer crawlers, November 2026: 196 fetches in 7 days, 160 from ChatGPT-User",
            description: "Which answer engines fetched this site. This brief is the other direction: their own robots.txt.",
            kicker: "Daily brief",
            date: "2026-11-11",
          },
          {
            href: "/tools/ai-crawler-robots-txt-checker",
            title: "robots.txt checker for AI crawlers: who can fetch /",
            description: "The same tokens, checked against one live robots.txt. Nothing you enter is stored.",
            kicker: "Tool",
            date: "2026-11-12",
          },
          {
            href: "/blog/which-ai-crawlers-can-fetch-your-homepage",
            title: "Which AI crawlers can fetch your homepage",
            description: "How to read a robots.txt group. This brief is the census of 52 vendor files.",
            kicker: "Guide",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "AI agent framework release November 2026",
            description: "Latest GitHub release for 19 frameworks, pulled 5 November 2026.",
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
