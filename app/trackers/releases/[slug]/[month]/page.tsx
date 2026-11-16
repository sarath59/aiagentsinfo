import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/ArticleTemplate";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EntityLinks } from "@/components/trackers/EntityLinks";
import { PlainTable } from "@/components/trackers/PlainTable";
import { TrackerNav } from "@/components/trackers/TrackerNav";
import { JsonLd, datasetJsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { TRACKER_PATHS, githubReleasesHtmlUrl } from "@/lib/trackers/catalog";
import {
  ENTITY_PAGES_PUBLISHED,
  crossLinks,
  releasePagePath,
  starPagePath,
} from "@/lib/trackers/entities";
import { integer } from "@/lib/trackers/http";
import { getReleaseMonth, monthLabel, releaseClickDescription, releaseStaticParams } from "@/lib/trackers/releases";
import { formatDate } from "@/lib/utils";

export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return releaseStaticParams();
}

function pageTitle(name: string, month: string) {
  return `${name} releases in ${monthLabel(month)}`;
}

function clipSentence(text: string, max: number) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const slice = clean.slice(0, max - 1);
  const space = slice.lastIndexOf(" ");
  const cut = (space >= 40 ? slice.slice(0, space) : slice).replace(/[\s,;:.]+$/g, "");
  return `${cut}…`;
}

function releaseSnippet(data: {
  slug: string;
  name: string;
  month: string;
  repo: string;
  rows: { tag: string; note: string | null; change: string | null; prerelease: boolean }[];
}) {
  const count = integer(data.rows.length);
  const label = monthLabel(data.month);
  if (data.slug === "codex" && data.month === "2026-11") {
    const description = `Codex release notes for November 2026: the Codex CLI changelog lists ${count} GitHub releases for openai/codex. Tags and dates are copied from the releases API.`;
    if (description.length < 140 || description.length > 160) {
      throw new Error(`Codex November 2026 meta description is ${description.length} characters`);
    }
    const intro = `Codex release notes for November 2026. The Codex CLI changelog lists ${count} GitHub releases for openai/codex. Tags, dates, and the first line of each note are copied from the GitHub releases API.`;
    return { description, intro };
  }
  const newest = data.rows.find((row) => !row.prerelease) ?? data.rows[0];
  const lead = newest?.change ?? newest?.note ?? null;
  const description = releaseClickDescription({
    name: data.name,
    label,
    tag: newest?.tag,
    lead,
    count,
    repo: data.repo,
  });
  const intro = newest && lead
    ? `The newest ${data.name} release in ${label} is ${newest.tag}: ${clipSentence(lead, 180)} GitHub lists ${count} releases for ${data.repo} with published_at in ${label}.`
    : `GitHub lists ${count} releases for ${data.repo} with published_at in ${label}.`;
  return { description, intro };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; month: string }> }) {
  const { slug, month } = await params;
  const data = await getReleaseMonth(slug, month);
  if (!data) return {};
  const title = pageTitle(data.name, data.month);
  const { description } = releaseSnippet(data);
  return defaultMetadata(title, description, releasePagePath(data.slug, data.month), { absoluteTitle: true });
}

export default async function ReleaseMonthPage({
  params,
}: {
  params: Promise<{ slug: string; month: string }>;
}) {
  const { slug, month } = await params;
  const data = await getReleaseMonth(slug, month);
  if (!data) notFound();
  const title = pageTitle(data.name, data.month);
  const label = monthLabel(data.month);
  const { description, intro } = releaseSnippet(data);
  const lead = intro;
  const path = releasePagePath(data.slug, data.month);
  const releasesUrl = githubReleasesHtmlUrl(data.repo);
  const truncated = data.truncated
    ? " This read returned 100 releases and the oldest is still in this month, so earlier releases from the month are not in the table."
    : data.capped
      ? " The API page used here returns 100 releases. This month’s rows are the ones inside that page."
      : "";
  const links = crossLinks({
    repo: data.repo,
    currentPath: path,
    releaseSlug: null,
    releaseMonth: null,
  });

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
          description: `${lead} Read ${data.retrievedAt} UTC.`,
          path,
          datePublished: ENTITY_PAGES_PUBLISHED,
          dateModified: data.retrievedAt.slice(0, 10),
          isBasedOn: data.sourceUrl,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Trackers", path: TRACKER_PATHS.index },
          { name: data.name, path: starPagePath(data.slug) },
          { name: label, path },
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
            <a className="text-[var(--link)] underline" href={releasesUrl}>
              GitHub releases
            </a>
            .
          </p>
        }
        takeaways={[lead, "Each note is the first line of that release’s own text. Drafts are omitted."]}
        toc={[{ id: "releases", text: `What changed in ${data.name} releases in ${label}?`, level: 2 }]}
        related={[
          {
            href: starPagePath(data.slug),
            title: `${data.name} GitHub stars`,
            description: `stargazers_count for ${data.repo}.`,
            kicker: "Tracker",
          },
          ...(data.slug === "codex" && data.month === "2026-11"
            ? [
                {
                  href: "/directory/codex",
                  title: "Codex",
                  description: "The directory page for the Codex CLI whose November 2026 releases are listed here.",
                  kicker: "Directory",
                },
                {
                  href: "/trackers/releases/claude-code/2026-11",
                  title: "Claude Code release notes for November 2026",
                  description: "The November 2026 GitHub changelog for anthropics/claude-code, from the same releases tracker.",
                  kicker: "Tracker",
                },
              ]
            : []),
          {
            href: "/reports/ai-agent-framework-github-stats-november-2026",
            title: "AI agent framework release November 2026",
            description: "The November 5 snapshot of the latest tag on 19 repositories.",
            kicker: "Report",
            date: "2026-11-05",
          },
        ]}
      >
        <TrackerNav current="" />
        <section>
          <h2 id="releases" className="text-2xl font-semibold tracking-tight">
            What changed in {data.name} releases in {label}?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {lead}
            {truncated} The date is <code>published_at</code>. The note is the first line of the release text after
            section labels such as “What’s Changed.”{" "}
            <a className="text-[var(--link)] underline" href={releasesUrl}>
              All releases for {data.repo}
            </a>
            .
          </p>
          {data.slug === "codex" && data.month === "2026-11" ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              The product page is{" "}
              <Link className="text-[var(--link)] underline" href="/directory/codex">
                Codex
              </Link>
              .{" "}
              <Link className="text-[var(--link)] underline" href="/trackers/releases/claude-code/2026-11">
                Claude Code release notes for November 2026
              </Link>{" "}
              are that month’s changelog for anthropics/claude-code, from the same releases tracker.
            </p>
          ) : null}
          {data.slug === "langgraph" && data.month === "2026-11" ? (
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              How often these frameworks publish a GitHub release is{" "}
              <Link
                className="text-[var(--link)] underline"
                href="/research/ai-agent-framework-release-cadence-october-november-2026"
              >
                3,165 GitHub releases in 30 days, or 407 days of silence
              </Link>
              .
            </p>
          ) : null}
          <PlainTable
            caption={`${data.name} releases in ${label}`}
            columns={["Version", "Published", "Note"]}
            rows={data.rows.map((release) => ({
              key: `${release.tag}-${release.publishedAt}`,
              cells: [
                <>
                  <a className="text-[var(--link)] underline" href={release.htmlUrl}>
                    {release.tag}
                  </a>
                  {release.prerelease ? " (pre-release)" : ""}
                </>,
                formatDate(release.publishedAt),
                release.note ?? "—",
              ],
            }))}
          />
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Last verified <time dateTime={data.retrievedAt}>{data.retrievedAt}</time> UTC from{" "}
            <a className="text-[var(--link)] underline" href={data.sourceUrl}>
              {data.sourceUrl}
            </a>
            .
          </p>
          <EntityLinks links={links} />
          {data.otherMonths.length ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
              Other months:{" "}
              {data.otherMonths.map((entry, index) => (
                <span key={entry}>
                  {index > 0 ? ", " : null}
                  <Link className="text-[var(--link)] underline" href={releasePagePath(data.slug, entry)}>
                    {monthLabel(entry)}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : null}
        </section>
      </ArticleTemplate>
    </>
  );
}
