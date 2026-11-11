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
import { ENTITY_PAGES_PUBLISHED, starPagePath } from "@/lib/trackers/entities";
import { integer } from "@/lib/trackers/http";
import { STAR_HISTORY_TARGET_DAYS } from "@/lib/trackers/star-history";
import { getStarPage, indexableStarPages } from "@/lib/trackers/star-pages";
import { formatDate } from "@/lib/utils";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return indexableStarPages().map((item) => ({ slug: item.id }));
}

function pageTitle(name: string, stars: number, retrievedAt: string) {
  return `${name} GitHub stars: ${integer(stars)} (as of ${formatDate(retrievedAt)})`;
}

function opening(repo: string, stars: number, retrievedAt: string) {
  return `${repo} had ${integer(stars)} GitHub stars on ${formatDate(retrievedAt)}.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getStarPage(slug);
  if (!data) return {};
  const title = pageTitle(data.item.name, data.row.stars, data.retrievedAt);
  const description = `${opening(data.row.repo, data.row.stars, data.retrievedAt)} The figure is stargazers_count from the GitHub repository API.`;
  return defaultMetadata(title, description, starPagePath(data.item.id), { absoluteTitle: true });
}

export default async function StarEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getStarPage(slug);
  if (!data) notFound();
  const title = pageTitle(data.item.name, data.row.stars, data.retrievedAt);
  const lead = opening(data.row.repo, data.row.stars, data.retrievedAt);
  const description = `${lead} The figure is stargazers_count from the GitHub repository API.`;
  const path = starPagePath(data.item.id);
  const when = formatDate(data.retrievedAt);
  const history =
    data.points.length >= STAR_HISTORY_TARGET_DAYS
      ? `${data.shown.length} stored reads, from ${formatDate(data.shown[0].date)} through ${formatDate(data.shown[data.shown.length - 1].date)}. Days with no read are omitted.`
      : data.points.length > 1
        ? `${integer(data.points.length)} stored reads, from ${formatDate(data.points[0].date)} through ${formatDate(data.points[data.points.length - 1].date)}. A 30-day table starts once ${integer(STAR_HISTORY_TARGET_DAYS)} reads are stored. Days with no read are omitted.`
        : `One stored read${data.points[0] ? `: ${integer(data.points[0].stars)} stars on ${formatDate(data.points[0].date)}` : ""}. A 30-day table starts once ${integer(STAR_HISTORY_TARGET_DAYS)} reads are stored.`;
  const rank = data.rank
    ? `Rank ${integer(data.rank.rank)} of ${integer(data.rank.total)} repositories on the stars tracker, by stargazers_count.`
    : "This repository is a coding CLI, read from the same GitHub repository endpoint as the stars tracker.";

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
          description: `${lead} Source: stargazers_count. Read ${data.retrievedAt} UTC.`,
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
          { name: "GitHub stars", path: TRACKER_PATHS.stars },
          { name: data.item.name, path },
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
              GitHub repository API
            </a>
            .
          </p>
        }
        takeaways={[lead, rank, history]}
        toc={[
          { id: "count", text: "Star count", level: 2 },
          { id: "history", text: "Stored reads", level: 2 },
        ]}
        related={[
          {
            href: TRACKER_PATHS.stars,
            title: "AI agent framework GitHub stars tracker (updated daily)",
            description: "stargazers_count for the framework repositories on one table.",
            kicker: "Tracker",
          },
          {
            href: TRACKER_PATHS.downloads,
            title: "AI agent framework downloads tracker (updated daily)",
            description: "PyPI and npm file requests for the framework packages.",
            kicker: "Tracker",
          },
        ]}
      >
        <TrackerNav current={TRACKER_PATHS.stars} />
        <section>
          <h2 id="count" className="text-2xl font-semibold tracking-tight">
            Star count
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {lead} The field is <code>stargazers_count</code>, read {when}. {rank}{" "}
            <a className="text-[var(--link)] underline" href={data.repoUrl}>
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
          {data.item.note ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{data.item.note}</p>
          ) : null}
          <EntityLinks links={data.links} />
        </section>
        <section className="mt-12">
          <h2 id="history" className="text-2xl font-semibold tracking-tight">
            Stored reads
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">{history}</p>
          {data.shown.length >= 2 ? (
            <HistoryChart
              caption={`${data.item.name} GitHub stars, stored reads`}
              series={[
                {
                  id: data.item.id,
                  label: data.item.name,
                  points: data.shown.map((point) => ({ date: point.date, value: point.stars })),
                },
              ]}
            />
          ) : null}
          {data.shown.length ? (
            <PlainTable
              caption={`${data.item.name} stored GitHub star counts`}
              columns={["Date", "Stars", "Read at"]}
              rows={[...data.shown].reverse().map((point) => ({
                key: point.date,
                cells: [formatDate(point.date), integer(point.stars), point.retrievedAt],
              }))}
            />
          ) : null}
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
