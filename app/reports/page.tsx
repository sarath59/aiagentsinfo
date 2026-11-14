import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { PageHeader } from "@/components/PageHeader";
import { ToolHub } from "@/components/ToolHub";
import { getDirectoryStats } from "@/lib/directory-stats";
import { readingMinutes as crawlerMinutes } from "@/lib/ai-answer-crawlers-november-2026";
import { readingMinutes as hydrogenMinutes } from "@/lib/googleagent-gemini-4-hydrogen-november-2026";
import { readingMinutes as vendorRobotsMinutes } from "@/lib/vendor-robots-november-2026";
import { readingMinutes as searchToolsMinutes } from "@/lib/web-search-tools-november-2026";
import { readingMinutes as yearMinutes, updatedOn as yearUpdated } from "@/lib/agents-12-month-outlook";
import { readingMinutes as shop30Minutes } from "@/lib/shopping-agents-30-day";
import { readingMinutes as frameworksMinutes } from "@/lib/frameworks-6-month";
import { readingMinutes as enterpriseMinutes } from "@/lib/enterprise-platforms-6-month";
import { readingMinutes as forecastMinutes } from "@/lib/agents-2027";
import { readingMinutes as productionMinutes } from "@/lib/agents-in-production-2026";
import { readingMinutes as outlookMinutes } from "@/lib/agents-outlook";
import { readingMinutes as benchmarkMinutes } from "@/lib/benchmark-report";
import { readingMinutes as browserMinutes } from "@/lib/browser-computer-report";
import { readingMinutes as codingMinutes } from "@/lib/coding-agents-30-day";
import { readingMinutes as codingSixMinutes } from "@/lib/coding-agents-6-month";
import { path as frameworkGithubPath, readingMinutes as frameworkMinutes, retrievedDay as frameworkGithubDay } from "@/lib/framework-github-stats";
import { readingMinutes as mcpMinutes } from "@/lib/mcp-outlook";
import { readingMinutes as shoppingMinutes } from "@/lib/shopping-report";
import { readingMinutes as voiceMinutes } from "@/lib/voice-agents-outlook";
import { PRICE_READ_ON } from "@/lib/model-prices";
import { defaultMetadata } from "@/lib/seo";
import { dataAssets } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";

export const metadata = defaultMetadata(
  "Reports",
  "The 12-month flagship, the 14 November GoogleAgent brief, a six-month coding-agents outlook read November 13, 2026, a vendor robots.txt brief, a six-month enterprise-platforms brief, a 30-day shopping brief through Cyber Monday, and a six-month frameworks brief, plus dated pages on production, voice, MCP, computer use, coding agents, harness benchmarks, and framework GitHub stats.",
  "/reports",
);

export default async function ReportsPage() {
  const stats = await getDirectoryStats();
  const dateByHref: Record<string, string> = {
    "/reports/ai-agents-next-12-months": yearUpdated,
    "/reports/googleagent-gemini-4-hydrogen-fetches-november-2026": "2026-11-14",
    "/reports/ai-agent-vendor-robots-txt-november-2026": "2026-11-13",
    "/reports/enterprise-agent-platforms-next-6-months": "2026-11-12",
    "/reports/ai-shopping-agents-next-30-days": "2026-11-12",
    "/reports/ai-agent-frameworks-next-6-months": "2026-11-12",
    "/reports/web-search-tools-for-ai-agents-november-2026": "2026-11-12",
    "/reports/ai-answer-crawlers-november-2026": "2026-11-11",
    "/reports/voice-agents-next-6-months": "2026-11-11",
    "/reports/ai-agents-in-production-2026": "2026-11-10",
    "/reports/ai-agents-in-2027": "2026-11-10",
    "/reports/mcp-next-6-months": "2026-11-10",
    "/reports/browser-and-computer-use-agents-next-6-months": "2026-11-09",
    "/reports/ai-coding-agents-next-6-months": "2026-11-13",
    "/reports/ai-coding-agents-next-30-days": "2026-11-08",
    "/reports/ai-agents-next-6-months": "2026-11-05",
    "/reports/ai-shopping-agents-next-6-months": "2026-11-05",
    "/reports/agent-harness-benchmark-november-2026": "2026-11-05",
    [frameworkGithubPath]: frameworkGithubDay,
    "/verified-revenue": verifiedRevenueChecked,
    "/directory/stats": stats.updated,
    "/agent-cost-calculator": PRICE_READ_ON,
    "/tools/ai-agent-roi-calculator": "2026-11-11",
    "/agent-prompt-checker": "2026-11-06",
    "/tools/agents-md-generator": "2026-11-10",
    "/tools/ai-crawler-robots-txt-checker": "2026-11-12",
  };
  const minutesByHref: Record<string, number> = {
    "/reports/ai-agents-next-12-months": yearMinutes,
    "/reports/googleagent-gemini-4-hydrogen-fetches-november-2026": hydrogenMinutes,
    "/reports/ai-agent-vendor-robots-txt-november-2026": vendorRobotsMinutes,
    "/reports/enterprise-agent-platforms-next-6-months": enterpriseMinutes,
    "/reports/ai-shopping-agents-next-30-days": shop30Minutes,
    "/reports/ai-agent-frameworks-next-6-months": frameworksMinutes,
    "/reports/web-search-tools-for-ai-agents-november-2026": searchToolsMinutes,
    "/reports/ai-answer-crawlers-november-2026": crawlerMinutes,
    "/reports/voice-agents-next-6-months": voiceMinutes,
    "/reports/ai-agents-in-production-2026": productionMinutes,
    "/reports/ai-agents-in-2027": forecastMinutes,
    "/reports/mcp-next-6-months": mcpMinutes,
    "/reports/browser-and-computer-use-agents-next-6-months": browserMinutes,
    "/reports/ai-coding-agents-next-6-months": codingSixMinutes,
    "/reports/ai-coding-agents-next-30-days": codingMinutes,
    "/reports/ai-agents-next-6-months": outlookMinutes,
    "/reports/ai-shopping-agents-next-6-months": shoppingMinutes,
    "/reports/agent-harness-benchmark-november-2026": benchmarkMinutes,
    [frameworkGithubPath]: frameworkMinutes,
  };
  const kickerByHref: Record<string, string> = {
    "/reports/ai-agents-next-12-months": "Flagship",
    "/reports/googleagent-gemini-4-hydrogen-fetches-november-2026": "Daily brief",
    "/reports/ai-agent-vendor-robots-txt-november-2026": "Daily brief",
    "/reports/enterprise-agent-platforms-next-6-months": "Report",
    "/reports/ai-shopping-agents-next-30-days": "Report",
    "/reports/ai-agent-frameworks-next-6-months": "Report",
    "/reports/web-search-tools-for-ai-agents-november-2026": "Daily brief",
    "/reports/ai-answer-crawlers-november-2026": "Daily brief",
    "/reports/voice-agents-next-6-months": "Report",
    "/reports/ai-agents-in-production-2026": "Report",
    "/reports/ai-agents-in-2027": "Report",
    "/reports/mcp-next-6-months": "Report",
    "/reports/browser-and-computer-use-agents-next-6-months": "Report",
    "/reports/ai-coding-agents-next-6-months": "Report",
    "/reports/ai-coding-agents-next-30-days": "Report",
    "/reports/ai-agents-next-6-months": "Report",
    "/reports/ai-shopping-agents-next-6-months": "Report",
    "/reports/agent-harness-benchmark-november-2026": "Report",
    [frameworkGithubPath]: "Report",
    "/verified-revenue": "Data",
    "/directory/stats": "Data",
    "/agent-cost-calculator": "Data",
    "/tools/ai-agent-roi-calculator": "Tool",
    "/agent-prompt-checker": "Data",
    "/tools/agents-md-generator": "Tool",
    "/tools/ai-crawler-robots-txt-checker": "Tool",
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
      <PageHeader
        kicker="Reports"
        title="Figures with a date and a source"
        summary="The flagship is the next 12 months. New on 14 November: GoogleAgent’s answer fetches before and after Gemini 4 Hydrogen. Also coding agents through May 2027, with Terminal-Bench 4.1 re-read November 13, and robots.txt and llms.txt of 52 agent websites, checked the same day. A number without a public source does not go up."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <ContentDeskNav current="/reports" />
        <ToolHub />
        {dataAssets
          .filter((item) => item.href === "/reports/ai-agents-next-12-months")
          .map((item) => (
            <div key={item.href} className="mb-4">
              <ContentCard
                href={item.href}
                kicker="Flagship"
                title={item.title}
                description={item.summary}
                date={dateByHref[item.href]}
                readingMinutes={minutesByHref[item.href]}
              />
            </div>
          ))}
        <div className="content-grid">
          {dataAssets.filter((item) => item.href !== "/reports/ai-agents-next-12-months").map((item) => (
            <ContentCard
              key={item.href}
              href={item.href}
              kicker={kickerByHref[item.href] ?? "Report"}
              title={item.title}
              description={item.summary}
              date={dateByHref[item.href]}
              readingMinutes={minutesByHref[item.href]}
            />
          ))}
        </div>
        <DataSourceLine
          title="Reports"
          updated={Object.values(dateByHref).sort().at(-1)}
          path="/reports"
          showCite
        />
      </div>
    </>
  );
}
