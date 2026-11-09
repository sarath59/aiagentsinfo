import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { PageHeader } from "@/components/PageHeader";
import { BENCHMARK_READ_ON } from "@/lib/harness-benchmark";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Benchmark leaderboard",
  "A leaderboard for public agent benchmarks. A score is published only with a source, a date, and the harness that produced it.",
  "/trackers/benchmarks",
);

export default function BenchmarksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: "/trackers" },
          { name: "Benchmark leaderboard", path: "/trackers/benchmarks" },
        ]}
      />
      <PageHeader
        kicker="Living tracker"
        title="Benchmark leaderboard"
        summary="Every cell needs a source, a retrieval date, and the harness that was measured. Scores are not copied from screenshots."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[var(--muted)]">
          The November 2026 reading of the official SWE-bench and Terminal-Bench boards is the{" "}
          <Link href="/reports/agent-harness-benchmark-november-2026">harness benchmark</Link>. Each score there has a
          source and a date. This tracker does not add a second set of numbers. Licence and list-price comparisons
          for the runtimes around those scores are in <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>
          {" "}and           <Link href="/best/ai-agent-evaluation-tools">Best AI agent evaluation tools</Link>.
        </p>
        <DataSourceLine
          title="Benchmark leaderboard"
          updated={BENCHMARK_READ_ON}
          path="/trackers/benchmarks"
          showCite
        />
      </div>
    </>
  );
}
