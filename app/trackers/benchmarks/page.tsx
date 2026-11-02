import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Benchmark leaderboard",
  "Stub leaderboard for public agent benchmarks. No scores until a sourced, dated cell exists.",
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
        summary="Empty on purpose. Read the sample methods note before anyone pastes a screenshot of scores. Every future cell needs a source, a date, and the harness identity."
        sample
      />
      <div className="mx-auto max-w-4xl px-4 pb-20">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="border-b border-[var(--stroke)] p-3">Suite</th>
                <th className="border-b border-[var(--stroke)] p-3">What it measures</th>
                <th className="border-b border-[var(--stroke)] p-3">Score (sourced)</th>
                <th className="border-b border-[var(--stroke)] p-3">Retrieved</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SWE-bench", "Software engineering tasks", "—", "—"],
                ["GAIA", "Assistant-style tool questions", "—", "—"],
                ["Add a suite", "Must match the job you care about", "—", "—"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="border-b border-[var(--stroke)] p-3 text-[var(--muted)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm">
          Methods: <Link href="/research/reading-agent-benchmarks">How to read an agent benchmark</Link> (sample).
        </p>
      </div>
    </>
  );
}
