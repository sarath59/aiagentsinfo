import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Harness comparison table",
  "Sourced comparison of agent harnesses. Licence, list price, and platform from official pages. Last verified November 2026.",
  "/trackers/harnesses",
);

export default function HarnessesTrackerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: "/trackers" },
          { name: "Harness comparison", path: "/trackers/harnesses" },
        ]}
      />
      <PageHeader
        kicker="Living tracker"
        title="Harness comparison"
        summary="The sourced table lives on the comparison page. Cells are licence, list price, and platform from official pages. Nothing is scored."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[var(--muted)]">
          The November 2026 comparison is{" "}
          <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>, listed on{" "}
          <Link href="/best">Best AI agents</Link>. It covers coding, open-source, and
          local variants. Official SWE-bench and Terminal-Bench scores stay on the{" "}
          <Link href="/reports/agent-harness-benchmark-november-2026">agent harness benchmark for November 2026</Link>.
          Release tags for 19 libraries are on{" "}
          <Link href="/best/ai-agent-frameworks">Best AI agent frameworks</Link>. The definition is{" "}
          <Link href="/blog/what-is-an-ai-agent-harness">What is an AI agent harness?</Link>, and how to test one is{" "}
          <Link href="/blog/how-do-you-evaluate-an-ai-agent-harness">How to evaluate an AI agent harness</Link>. All of
          those pages are collected on the <Link href="/topics/harnesses">agent harnesses hub</Link>. Frameworks already
          in the directory remain at <Link href="/directory/category/agent-frameworks">agent frameworks</Link>.
        </p>
      </div>
    </>
  );
}
