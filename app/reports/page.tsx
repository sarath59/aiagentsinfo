import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { ContentDeskNav } from "@/components/ContentDeskNav";
import { FlagshipCover, ReportCover } from "@/components/ReportCover";
import { ToolHub } from "@/components/ToolHub";
import { getDirectoryStats } from "@/lib/directory-stats";
import { flagshipReport, labInstruments, publishedReports, type ReportEntry } from "@/lib/report-catalog";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Reports",
  "The 12-month flagship, the 14 November GoogleAgent brief, a six-month coding-agents outlook read November 13, 2026, a vendor robots.txt brief, a six-month enterprise-platforms brief, a 30-day shopping brief through Cyber Monday, and a six-month frameworks brief, plus dated pages on production, voice, MCP, computer use, coding agents, harness benchmarks, and framework GitHub stats.",
  "/reports",
);

export default async function ReportsPage() {
  const stats = await getDirectoryStats();
  const instruments: ReportEntry[] = labInstruments.map((item) =>
    item.href === "/directory/stats" ? { ...item, date: stats.updated } : item,
  );
  const briefs = publishedReports.filter((item) => item.kicker === "Daily brief");
  const reports = publishedReports.filter((item) => item.kicker !== "Daily brief");
  const issueByHref = new Map(publishedReports.map((item, index) => [item.href, publishedReports.length - index]));
  const latest = [flagshipReport, ...publishedReports, ...instruments]
    .map((item) => item?.date ?? "")
    .sort()
    .at(-1);

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
      <header className="library-hero">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker kicker-lead">Research library</p>
          <h1 className="library-hero-title">
            Figures with a date <em>and a source</em>
          </h1>
          <p className="library-hero-summary">
            The flagship is the next 12 months. New on 14 November: GoogleAgent’s answer fetches before and after Gemini
            4 Hydrogen. Also coding agents through May 2027, with Terminal-Bench 4.1 re-read November 13, and robots.txt
            and llms.txt of 52 agent websites, checked the same day. A number without a public source does not go up.
          </p>
          <ul className="library-facts" aria-label="Library at a glance">
            <li>
              <strong>{reports.length + (flagshipReport ? 1 : 0)}</strong>reports
            </li>
            <li>
              <strong>{briefs.length}</strong>daily briefs
            </li>
            <li>
              <strong>{instruments.length}</strong>datasets and tools
            </li>
          </ul>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <ContentDeskNav current="/reports" />

        {flagshipReport ? (
          <section className="library-section" aria-label="Flagship report">
            <FlagshipCover entry={flagshipReport} headingLevel={2} />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              What moved in that flagship, checked November 16, 2026, is the{" "}
              <Link className="text-[var(--link)] underline" href="/research/ai-agents-next-12-months-scorecard-november-2026">
                12-month scorecard
              </Link>
              . The dollar line is still the November 10 filing. The scorecard is a research note, not a second report.
            </p>
          </section>
        ) : null}

        <LibrarySection id="library-reports" title="Reports" items={reports} issueByHref={issueByHref} />
        <LibrarySection id="library-briefs" title="Daily briefs" items={briefs} issueByHref={issueByHref} />

        <section className="library-section" aria-labelledby="library-instruments">
          <div className="library-section-head">
            <h2 id="library-instruments" className="library-section-title">
              Datasets and tools
            </h2>
            <span className="library-section-count">{instruments.length} instruments</span>
          </div>
          <div className="report-cover-grid">
            {instruments.map((item, index) => (
              <ReportCover key={item.href} entry={item} issue={index + 1} showSummary />
            ))}
          </div>
        </section>

        <div className="mt-12">
          <ToolHub />
        </div>
        <DataSourceLine title="Reports" updated={latest} path="/reports" showCite />
      </div>
    </>
  );
}

function LibrarySection({
  id,
  title,
  items,
  issueByHref,
}: {
  id: string;
  title: string;
  items: ReportEntry[];
  issueByHref: Map<string, number>;
}) {
  if (!items.length) return null;
  return (
    <section className="library-section" aria-labelledby={id}>
      <div className="library-section-head">
        <h2 id={id} className="library-section-title">
          {title}
        </h2>
        <span className="library-section-count">
          {items.length} {items.length === 1 ? "issue" : "issues"}
        </span>
      </div>
      <div className="report-cover-grid">
        {items.map((item) => (
          <ReportCover key={item.href} entry={item} issue={issueByHref.get(item.href) ?? 0} showSummary />
        ))}
      </div>
    </section>
  );
}
