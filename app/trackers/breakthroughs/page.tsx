import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SampleBanner } from "@/components/SampleBanner";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  "Agent breakthroughs timeline",
  "Living timeline stub for notable public agent research and product moments — no invented dates or firsts.",
  "/trackers/breakthroughs",
);

const rows = [
  {
    year: "2017",
    title: "Transformers become the default sequence model",
    note: "Placeholder row. Point at Vaswani et al. when this tracker is filled. Sample only.",
  },
  {
    year: "2022",
    title: "ReAct-style thought/action traces popularize tool loops",
    note: "Placeholder row. See the sample paper page on this site. Sample only.",
  },
  {
    year: "TBD",
    title: "Add the next public, sourced moment",
    note: "Do not add rumors. Date + primary source required.",
  },
];

export default function BreakthroughsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Breakthroughs timeline", path: "/trackers/breakthroughs" },
        ]}
      />
      <PageHeader
        kicker="Living tracker"
        title="Agent breakthroughs timeline"
        summary="Structure only in v1. Each future row needs a year, a one-line claim, and a primary source. No 'industry firsts' without a citation."
        sample
      />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <ol className="grid gap-4">
          {rows.map((row) => (
            <li key={row.title} className="glass rounded-3xl p-6">
              <SampleBanner />
              <p className="kicker">{row.year}</p>
              <h2 className="mt-2 font-serif text-2xl">{row.title}</h2>
              <p className="mt-2 text-[var(--muted)]">{row.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
