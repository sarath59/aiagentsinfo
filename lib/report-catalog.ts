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
import { dataAssets } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";

export const FLAGSHIP_HREF = "/reports/ai-agents-next-12-months";

export type ReportEntry = {
  href: string;
  title: string;
  summary: string;
  kicker: string;
  date?: string;
  readingMinutes?: number;
};

/** "/directory/stats" is dated at request time by the reports page from live directory stats. */
const dateByHref: Record<string, string> = {
  [FLAGSHIP_HREF]: yearUpdated,
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
  "/agent-cost-calculator": PRICE_READ_ON,
  "/tools/ai-agent-roi-calculator": "2026-11-11",
  "/agent-prompt-checker": "2026-11-06",
  "/tools/agents-md-generator": "2026-11-10",
  "/tools/ai-crawler-robots-txt-checker": "2026-11-12",
};

const minutesByHref: Record<string, number> = {
  [FLAGSHIP_HREF]: yearMinutes,
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
  [FLAGSHIP_HREF]: "Flagship",
  "/reports/googleagent-gemini-4-hydrogen-fetches-november-2026": "Daily brief",
  "/reports/ai-agent-vendor-robots-txt-november-2026": "Daily brief",
  "/reports/web-search-tools-for-ai-agents-november-2026": "Daily brief",
  "/reports/ai-answer-crawlers-november-2026": "Daily brief",
  "/verified-revenue": "Data",
  "/directory/stats": "Data",
  "/agent-cost-calculator": "Data",
  "/agent-prompt-checker": "Data",
  "/tools/ai-agent-roi-calculator": "Tool",
  "/tools/agents-md-generator": "Tool",
  "/tools/ai-crawler-robots-txt-checker": "Tool",
  "/tools/mcp-config-generator": "Tool",
};

function entry(asset: (typeof dataAssets)[number]): ReportEntry {
  return {
    href: asset.href,
    title: asset.title,
    summary: asset.summary,
    kicker: kickerByHref[asset.href] ?? "Report",
    date: dateByHref[asset.href],
    readingMinutes: minutesByHref[asset.href],
  };
}

/** Every dated asset in `dataAssets` order: the flagship first, then reports, then data and tools. */
export const reportCatalog: ReportEntry[] = dataAssets.map(entry);

/** Written reports and briefs under /reports, newest first, flagship excluded. */
export const publishedReports: ReportEntry[] = reportCatalog
  .filter((item) => item.href.startsWith("/reports/") && item.href !== FLAGSHIP_HREF)
  .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

export const flagshipReport: ReportEntry | undefined = reportCatalog.find((item) => item.href === FLAGSHIP_HREF);

/** Datasets and browser tools that sit beside the reports. */
export const labInstruments: ReportEntry[] = reportCatalog.filter((item) => !item.href.startsWith("/reports/"));
