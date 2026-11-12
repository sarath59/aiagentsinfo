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
} from "@/lib/enterprise-platforms-6-month";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function EnterprisePlatformsSixMonthPage() {
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
          { name: "Enterprise platforms, next 6 months", path },
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
            Vendor pricing pages, rate cards, docs, and two Salesforce investor releases, read November 12, 2026.
            Dollar figures next to a credit count are arithmetic on the published credit price. A page that withheld a
            dollar does not get one here.
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
            href: "/blog/agentforce-vs-copilot-studio-pricing-november-2026",
            title: "Agentforce vs Copilot Studio pricing, November 10",
            description: "The credit worksheet for those two meters. This outlook re-read the pages on November 12 and does not edit that one.",
            kicker: "Guide",
            date: "2026-11-10",
          },
          {
            href: "/blog/what-is-an-ai-employee",
            title: "What is an AI employee?",
            description: "The label. The software is not a legal employee, and the platforms on this page do not bill one by headcount.",
            kicker: "Guide",
            date: "2026-11-12",
          },
          {
            href: "/blog/how-much-does-an-ai-employee-cost",
            title: "What a small-business AI employee card costs",
            description: "Sintra, Marblism, Intercom, and the other public cards. A different invoice from the enterprise meters.",
            kicker: "Guide",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agents-next-12-months",
            title: "AI agents in the next 12 months",
            description: "The flagship calendar. Enterprise meters through May are this page.",
            kicker: "Flagship",
            date: "2026-11-12",
          },
          {
            href: "/reports/ai-agents-next-6-months",
            title: "AI agents, Nov 2026 to May 2027",
            description: "The general six-month outlook. Filings and other product dates, not these platform meters.",
            kicker: "Report",
            date: "2026-11-05",
          },
          {
            href: "/reports/mcp-next-6-months",
            title: "MCP, Nov 2026 to May 2027",
            description: "The protocol brief. This page only records what each vendor prints about MCP on its own product.",
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
