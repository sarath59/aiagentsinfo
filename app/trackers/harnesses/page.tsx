import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Harness comparison table",
  "A comparison of agent harnesses and frameworks. Cells are published only when each one is sourced.",
  "/trackers/harnesses",
);

export default function HarnessesTrackerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Harness comparison", path: "/trackers/harnesses" },
        ]}
      />
      <PageHeader
        kicker="Living tracker"
        title="Harness comparison"
        summary="A comparison appears when each cell has a source. No feature matrix is guessed."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <EmptyState
          title="Harness comparisons coming soon"
          body="Frameworks already in the directory stay listed there. This table waits until the cells are checked."
          href="/directory/category/agent-frameworks"
          cta="Browse frameworks"
        />
      </div>
    </>
  );
}
