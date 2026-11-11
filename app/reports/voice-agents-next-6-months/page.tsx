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
} from "@/lib/voice-agents-outlook";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export const metadata = defaultMetadata(title, description, path);

export default function VoiceAgentsOutlookPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${thesis}</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info, ${updatedLabel}.</footer>
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
          isBasedOn: "https://ai.google.dev/gemini-api/docs/deprecations#live-api-preview-models",
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: "Voice agents, Nov 2026 to May 2027", path },
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
        sources={<SourceList sources={[...sources]} />}
        citation={<CiteOrEmbed citation={citation} embed={embed} />}
        related={[
          {
            href: "/blog/voice-ai-agent-cost-per-call-november-2026",
            title: "1,000 three-minute calls, priced",
            description: "The invoice arithmetic for ElevenLabs, Vapi, Retell, and Bland. This page is the calendar and the meter.",
            kicker: "Guide",
            date: "2026-11-11",
          },
          {
            href: "/research/livekit-agents-vs-pipecat-installs-november-2026",
            title: "LiveKit Agents had 4,583,195 downloads. Pipecat had more stars.",
            description: "PyPI downloads for October 10 through November 8, and the star counts from the morning of November 10.",
            kicker: "Research",
            date: "2026-11-10",
          },
          {
            href: "/blog/what-is-elevenagents-campaign-manager",
            title: "What is ElevenAgents Campaign Manager?",
            description: "The outbound runner ElevenLabs published on November 9, 2026. The docs page did not add a fee.",
            kicker: "Guide",
            date: "2026-11-10",
          },
          {
            href: "/directory/elevenlabs",
            title: "ElevenLabs in the directory",
            description: "The product under the $0.08 minute, with Campaign Manager and the voice category.",
            kicker: "Directory",
          },
          {
            href: "/directory/category/voice",
            title: "Audio and voice listings",
            description: "The directory category for speech, voice, and other audio products.",
            kicker: "Directory",
          },
          {
            href: "/reports/ai-shopping-agents-next-6-months",
            title: "AI shopping agents, Nov 2026 to May 2027",
            description: "The six-company shopping calendar for the same six months.",
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
