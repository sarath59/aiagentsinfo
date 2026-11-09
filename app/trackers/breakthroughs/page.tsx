import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DataSourceLine } from "@/components/DataSourceLine";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Agent breakthroughs timeline",
  "A timeline of public agent research and product moments. Rows are added only with a date and a primary source.",
  "/trackers/breakthroughs",
);

export default function BreakthroughsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: "/trackers" },
          { name: "Breakthroughs timeline", path: "/trackers/breakthroughs" },
        ]}
      />
      <PageHeader
        kicker="Living tracker"
        title="Agent breakthroughs timeline"
        summary="Each row needs a year, a one-line claim, and a primary source. No dates are filled in ahead of that."
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <EmptyState
          title="Timeline entries publishing soon"
          body="Moments will appear here when each one has a date and a source. Nothing is listed early."
        />
        <DataSourceLine title="Agent breakthroughs timeline" path="/trackers/breakthroughs" showCite />
      </div>
    </>
  );
}
