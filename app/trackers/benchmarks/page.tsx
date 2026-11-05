import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
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
          source and a date. This tracker does not add a second set of numbers.
        </p>
      </div>
    </>
  );
}
