import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Harness comparison table",
  "Stub comparison of agent harnesses and frameworks. Empty cells on purpose — no invented feature matrices.",
  "/trackers/harnesses",
);

const columns = ["Loop style", "Tools", "Memory", "Evals", "License"];
const rows = [
  { name: "LangChain (sample pointer)", href: "/directory/langchain" },
  { name: "CrewAI (sample pointer)", href: "/directory/crewai" },
  { name: "Your harness here", href: "/directory/submit" },
];

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
        summary="A table that will grow. Cells are unlabeled placeholders so we never ship a fake feature matrix. Link listings instead of guessing."
        sample
      />
      <div className="mx-auto max-w-6xl overflow-x-auto px-4 pb-20">
        <table className="min-w-full border-collapse text-left text-sm">
          <caption className="sr-only">Sample harness comparison with empty cells</caption>
          <thead>
            <tr>
              <th className="border-b border-[var(--stroke)] p-3">Harness</th>
              {columns.map((column) => (
                <th key={column} className="border-b border-[var(--stroke)] p-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th className="border-b border-[var(--stroke)] p-3 font-medium">
                  <Link href={row.href}>{row.name}</Link>
                </th>
                {columns.map((column) => (
                  <td key={column} className="border-b border-[var(--stroke)] p-3 text-[var(--muted)]">
                    TBD
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
