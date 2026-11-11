import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EntityLinks } from "@/components/trackers/EntityLinks";
import { HistoryChart } from "@/components/trackers/HistoryChart";
import { PlainTable } from "@/components/trackers/PlainTable";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { TRACKER_PATHS } from "@/lib/trackers/catalog";
import { getDownloadPage, indexableDownloadPackages } from "@/lib/trackers/download-pages";
import { ENTITY_PAGES_PUBLISHED, downloadPagePath } from "@/lib/trackers/entities";
import { integer } from "@/lib/trackers/http";
import { formatDate } from "@/lib/utils";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return indexableDownloadPackages().map((item) => ({ slug: item.id }));
}

function registryLabel(registry: "npm" | "pypi") {
  return registry === "npm" ? "npm" : "PyPI";
}

function pageTitle(packageName: string, registry: "npm" | "pypi", downloads: number, weekStart: string) {
  return `${packageName} ${registryLabel(registry)} weekly downloads: ${integer(downloads)} (week of ${formatDate(weekStart)})`;
}

function opening(packageName: string, registry: "npm" | "pypi", downloads: number, start: string, end: string) {
  return `${packageName} recorded ${integer(downloads)} ${registryLabel(registry)} downloads from ${formatDate(start)} through ${formatDate(end)}.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDownloadPage(slug);
  if (!data) return {};
  const title = pageTitle(data.row.package, data.row.registry, data.week.downloads, data.week.start);
  const description = `${opening(data.row.package, data.row.registry, data.week.downloads, data.week.start, data.week.end)} The figure sums seven daily rows. A download is a file request.`;
  return defaultMetadata(title, description, downloadPagePath(data.item.id), { absoluteTitle: true });
}

export default async function DownloadEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getDownloadPage(slug);
  if (!data) notFound();
  const title = pageTitle(data.row.package, data.row.registry, data.week.downloads, data.week.start);
  const lead = opening(data.row.package, data.row.registry, data.week.downloads, data.week.start, data.week.end);
  const description = `${lead} The figure sums seven daily rows. A download is a file request.`;
  const path = downloadPagePath(data.item.id);
  const registry = registryLabel(data.row.registry);
  const rankLabel =
    data.rankSet === "cli"
      ? `Rank ${integer(data.rank.rank)} of ${integer(data.rank.total)} coding CLI packages on these pages, by this seven-day sum.`
      : `Rank ${integer(data.rank.rank)} of ${integer(data.rank.total)} ${registry} packages on the downloads tracker, by this seven-day sum.`;
  const method =
    data.row.registry === "pypi"
      ? "Each day is a pypistats without_mirrors row. Trailing zero days are dropped, then the rows are split into blocks of seven."
      : "Each day is an npm downloads-range row. Trailing zero days are dropped, then the rows are split into blocks of seven.";

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: ENTITY_PAGES_PUBLISHED,
          dateModified: data.retrievedAt.slice(0, 10),
        })}
      />
      <JsonLd
        data={datasetJsonLd({
          title,
          description: `${lead} ${rankLabel}`,
          path,
          datePublished: ENTITY_PAGES_PUBLISHED,
          dateModified: data.retrievedAt.slice(0, 10),
          isBasedOn: data.row.sourceUrl,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: TRACKER_PATHS.index },
          { name: "Downloads", path: TRACKER_PATHS.downloads },
          { name: data.row.package, path },
        ]}
      />
      <ArticleTemplate
        category="Live tracker"
        title={title}
        description={lead}
        published={ENTITY_PAGES_PUBLISHED}
        updated={data.retrievedAt.slice(0, 10)}
        byline={site.bylines.research}
        wide
        details={
          <p>
            Last verified <time dateTime={data.retrievedAt}>{data.retrievedAt}</time> UTC
            {data.live ? "" : ", from the stored read"}.{" "}
            <a className="text-[var(--link)] underline" href={data.row.sourceUrl}>
              {registry} downloads API
            </a>
            .
          </p>
        }
        takeaways={[lead, rankLabel, "A download is a file request, including CI and dependency installs."]}
        toc={[
          { id: "week", text: "Weekly downloads", level: 2 },
          { id: "trend", text: "Earlier weeks", level: 2 },
        ]}
        related={[
          {
            href: TRACKER_PATHS.downloads,
            title: "AI agent framework downloads tracker (updated daily)",
            description: "The framework table these package pages are drawn from.",
            kicker: "Tracker",
          },
          {
            href: TRACKER_PATHS.stars,
            title: "AI agent framework GitHub stars tracker (updated daily)",
            description: "stargazers_count for the framework repositories.",
            kicker: "Tracker",
          },
        ]}
      >
        <TrackerNav current={TRACKER_PATHS.downloads} />
        <section>
          <h2 id="week" className="text-2xl font-semibold tracking-tight">
            Weekly downloads
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {lead} {method} {rankLabel} Registry page:{" "}
            <a className="text-[var(--link)] underline" href={data.registryUrl}>
              {data.row.package}
            </a>
            . Repository:{" "}
            <a className="text-[var(--link)] underline" href={`https://github.com/${data.row.repo}`}>
              {data.row.repo}
            </a>
            .
            {data.item.directory ? (
              <>
                {" "}
                Directory listing:{" "}
                <Link className="text-[var(--link)] underline" href={`/directory/${data.item.directory}`}>
                  {data.item.name}
                </Link>
                .
              </>
            ) : null}
          </p>
          {data.row.note ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{data.row.note}</p>
          ) : null}
          <EntityLinks links={data.links} />
        </section>
        <section className="mt-12">
          <h2 id="trend" className="text-2xl font-semibold tracking-tight">
            Earlier weeks
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {integer(data.weeks.length)} complete seven-day blocks are in the daily rows held for this package, from{" "}
            {formatDate(data.weeks[0].start)} through {formatDate(data.weeks[data.weeks.length - 1].end)}.
          </p>
          {data.weeks.length >= 2 ? (
            <HistoryChart
              caption={`${data.row.package} downloads by seven-day block`}
              series={[
                {
                  id: data.item.id,
                  label: data.row.package,
                  points: data.weeks.map((week) => ({ date: week.start, value: week.downloads })),
                },
              ]}
            />
          ) : null}
          <PlainTable
            caption={`${data.row.package} weekly downloads`}
            columns={["Week of", "Through", "Downloads"]}
            rows={[...data.weeks].reverse().map((week) => ({
              key: week.start,
              cells: [formatDate(week.start), formatDate(week.end), integer(week.downloads)],
            }))}
          />
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Last verified <time dateTime={data.retrievedAt}>{data.retrievedAt}</time> UTC from{" "}
            <a className="text-[var(--link)] underline" href={data.row.sourceUrl}>
              {data.row.sourceUrl}
            </a>
            .
          </p>
        </section>
      </ArticleTemplate>
    </>
  );
}
