import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { PageHeader } from "@/components/PageHeader";
import { getDirectoryStats } from "@/lib/directory-stats";
import { path as frameworkGithubPath, retrievedDay as frameworkGithubDay } from "@/lib/framework-github-stats";
import { PRICE_READ_ON } from "@/lib/model-prices";
import { defaultMetadata } from "@/lib/seo";
import { dataAssets } from "@/lib/site";
import { verifiedRevenueChecked } from "@/lib/verified-revenue";

export const metadata = defaultMetadata(
  "Reports",
  "Dated pages with a source and a citation: six-month outlooks, harness benchmarks, framework GitHub stats, verified revenue, directory stats, a token-cost calculator, and a prompt and tool checker.",
  "/reports",
);

const pdfByHref: Record<string, string> = {
  "/reports/ai-agents-next-6-months": "/reports/ai-agents-next-6-months/pdf",
  "/reports/ai-shopping-agents-next-6-months": "/reports/ai-shopping-agents-next-6-months/pdf",
  "/reports/agent-harness-benchmark-november-2026": "/reports/agent-harness-benchmark-november-2026/pdf",
  [frameworkGithubPath]: `${frameworkGithubPath}/pdf`,
};

export default async function ReportsPage() {
  const stats = await getDirectoryStats();
  const dateByHref: Record<string, string> = {
    "/reports/ai-agents-next-6-months": "2026-11-05",
    "/reports/ai-shopping-agents-next-6-months": "2026-11-05",
    "/reports/agent-harness-benchmark-november-2026": "2026-11-05",
    [frameworkGithubPath]: frameworkGithubDay,
    "/verified-revenue": verifiedRevenueChecked,
    "/directory/stats": stats.updated,
    "/agent-cost-calculator": PRICE_READ_ON,
    "/agent-prompt-checker": "2026-11-06",
  };
  const kickerByHref: Record<string, string> = {
    "/reports/ai-agents-next-6-months": "Report",
    "/reports/ai-shopping-agents-next-6-months": "Report",
    "/reports/agent-harness-benchmark-november-2026": "Report",
    [frameworkGithubPath]: "Report",
    "/verified-revenue": "Data",
    "/directory/stats": "Data",
    "/agent-cost-calculator": "Data",
    "/agent-prompt-checker": "Data",
  };

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
      <PageHeader
        kicker="Reports"
        title="Figures with a date and a source"
        summary="Each page says when it was updated, how to cite it, and what was left out. A number without a public source does not go up."
      />
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <ContentDeskNav current="/reports" />
        <div className="content-grid">
          {dataAssets.map((item) => (
            <ContentCard
              key={item.href}
              href={item.href}
              kicker={kickerByHref[item.href] ?? "Report"}
              title={item.title}
              description={item.summary}
              date={dateByHref[item.href]}
              downloadHref={pdfByHref[item.href]}
            />
          ))}
        </div>
      </div>
    </>
  );
}
