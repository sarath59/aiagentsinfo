import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
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
        <EmptyState
          title="Sourced scores publishing soon"
          body="The leaderboard stays empty until each number has a source and a date."
        />
      </div>
    </>
  );
}
