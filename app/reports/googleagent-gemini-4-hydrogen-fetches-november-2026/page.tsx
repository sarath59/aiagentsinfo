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
} from "@/lib/googleagent-gemini-4-hydrogen-november-2026";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";
import { JsonLd, datasetJsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import {
  description as crawlerDescription,
  path as crawlerPath,
  readingMinutes as crawlerMinutes,
  title as crawlerTitle,
} from "@/lib/ai-answer-crawlers-november-2026";
import {
  description as yearDescription,
  path as yearPath,
  readingMinutes as yearMinutes,
  title as yearTitle,
  updatedOn as yearUpdated,
} from "@/lib/agents-12-month-outlook";
import {
  description as frameworkDescription,
  path as frameworkPath,
  readingMinutes as frameworkMinutes,
  retrievedDay as frameworkDay,
  title as frameworkTitle,
} from "@/lib/framework-github-stats";

const baseMetadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export const metadata = {
  ...baseMetadata,
  openGraph: { ...baseMetadata.openGraph, title },
  twitter: { ...baseMetadata.twitter, title },
};

export default function GoogleAgentHydrogenPage() {
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
            Checked November 14, 2026. Pull time about 8:50 a.m. Asia/Calcutta. Days are calendar days in that
            zone. 14 November is partial, from 00:00 to about 08:50 IST, and is not in the 2.8x or the 5.75x.
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
            note="Request counts are copied from the DataFast export. Daily rates, ratios, and the 23:37 IST conversion are computed from those counts and from the Pacific time on Google’s status page."
          />
        }
        related={[
          {
            href: crawlerPath,
            title: crawlerTitle,
            description: crawlerDescription,
            kicker: "Daily brief",
            date: "2026-11-11",
            readingMinutes: crawlerMinutes,
          },
          {
            href: frameworkPath,
            title: frameworkTitle,
            description: frameworkDescription,
            kicker: "Report",
            date: frameworkDay,
            readingMinutes: frameworkMinutes,
          },
          {
            href: yearPath,
            title: yearTitle,
            description: yearDescription,
            kicker: "Flagship",
            date: yearUpdated,
            readingMinutes: yearMinutes,
          },
          {
            href: TRACKER_PATHS.stars,
            title: "AI agent framework GitHub stars",
            description: "Live stargazers_count. GoogleAgent requested this index and eight per-framework URLs under it.",
            kicker: "Tracker",
            date: "2026-11-09",
          },
        ]}
      >
        <ReportChapters chapters={chapters} charts={reportCharts} />
      </ReportLayout>
    </>
  );
}
