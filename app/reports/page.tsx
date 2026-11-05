import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { defaultMetadata } from "@/lib/seo";
import { dataAssets } from "@/lib/site";

export const metadata = defaultMetadata(
  "Reports",
  "Dated pages of public figures: harness benchmarks, verified revenue, directory stats, and a token-cost calculator.",
  "/reports",
);

export default function ReportsPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }]} />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Reports</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">Figures with a date and a source</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Each page says when it was updated, how to cite it, and what was left out. A number without a public source
          does not go up.
        </p>
      </header>
      <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-20 md:grid-cols-2">
        {dataAssets.map((item) => (
          <article key={item.href} className="glass lift click-card rounded-3xl p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              <Link className="card-stretch" href={item.href}>
                {item.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.summary}</p>
          </article>
        ))}
      </div>
    </>
  );
}
