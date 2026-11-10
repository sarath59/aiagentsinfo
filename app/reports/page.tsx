import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { PageHeader } from "@/components/PageHeader";
import { ToolHub } from "@/components/ToolHub";
import { WeeklySignup } from "@/components/WeeklySignup";
import { getDirectoryStats } from "@/lib/directory-stats";
import { path as frameworkGithubPath, retrievedDay as frameworkGithubDay } from "@/lib/framework-github-stats";
import { PRICE_READ_ON } from "@/lib/model-prices";
import { defaultMetadata } from "@/lib/seo";
import { dataAssets } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";

export const metadata = defaultMetadata(
  "Reports",
  "Dated pages with a source and a citation: the 2026 production report, the 2027 agents forecast, an MCP six-month brief, a browser and computer-use brief, a 30-day coding-agents brief, the 12-month outlook, six-month outlooks, harness benchmarks, and framework GitHub stats.",
  "/reports",
);

export default async function ReportsPage() {
  const stats = await getDirectoryStats();
  const dateByHref: Record<string, string> = {
    "/reports/ai-agents-in-production-2026": "2026-11-10",
    "/reports/ai-agents-in-2027": "2026-11-10",
    "/reports/mcp-next-6-months": "2026-11-10",
    "/reports/browser-and-computer-use-agents-next-6-months": "2026-11-09",
    "/reports/ai-coding-agents-next-30-days": "2026-11-08",
    "/reports/ai-agents-next-12-months": "2026-11-07",
    "/reports/ai-agents-next-6-months": "2026-11-05",
    "/reports/ai-shopping-agents-next-6-months": "2026-11-05",
    "/reports/agent-harness-benchmark-november-2026": "2026-11-05",
    [frameworkGithubPath]: frameworkGithubDay,
    "/verified-revenue": verifiedRevenueChecked,
    "/directory/stats": stats.updated,
    "/agent-cost-calculator": PRICE_READ_ON,
    "/agent-prompt-checker": "2026-11-06",
    "/tools/agents-md-generator": "2026-11-10",
  };
  const kickerByHref: Record<string, string> = {
    "/reports/ai-agents-in-production-2026": "Report",
    "/reports/ai-agents-in-2027": "Report",
    "/reports/mcp-next-6-months": "Report",
    "/reports/browser-and-computer-use-agents-next-6-months": "Report",
    "/reports/ai-coding-agents-next-30-days": "Report",
    "/reports/ai-agents-next-12-months": "Report",
    "/reports/ai-agents-next-6-months": "Report",
    "/reports/ai-shopping-agents-next-6-months": "Report",
    "/reports/agent-harness-benchmark-november-2026": "Report",
    [frameworkGithubPath]: "Report",
    "/verified-revenue": "Data",
    "/directory/stats": "Data",
    "/agent-cost-calculator": "Data",
    "/agent-prompt-checker": "Data",
    "/tools/agents-md-generator": "Tool",
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
      <PageHeader
        kicker="Reports"
        title="Figures with a date and a source"
        summary="Each page says when it was updated, how to cite it, and what was left out. A number without a public source does not go up. Daily download, AGENTS.md, and star counts live on the trackers."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <ContentDeskNav current="/reports" />
        <ToolHub />
        <WeeklySignup />
        <div className="content-grid">
          {dataAssets.map((item) => (
            <ContentCard
              key={item.href}
              href={item.href}
              kicker={kickerByHref[item.href] ?? "Report"}
              title={item.title}
              description={item.summary}
              date={dateByHref[item.href]}
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
