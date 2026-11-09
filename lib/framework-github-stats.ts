import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import snapshot from "@/data/framework-github-stats/2026-11.json";
import type { SortableColumn, SortableRow } from "@/lib/sortable";
import { formatDate } from "@/lib/utils";

/** Windows named in the November 2026 report. Day counts use UTC calendar dates. */
const RECENT_RELEASE_DAYS = 30;
const QUIET_RELEASE_DAYS = 90;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] as const;

const LICENCE_ORDER = ["MIT", "Apache-2.0", "CC-BY-4.0", "NOASSERTION"] as const;

const UNDETECTED = "Not detected by GitHub";

/** Directory slugs for repositories that have a listing under content/directory. */
const directorySlugByRepo: Record<string, string> = {
  "langchain-ai/langchain": "langchain",
  "crewAIInc/crewAI": "crewai",
  "openai/openai-agents-python": "openai-agents-sdk",
  "google/adk-python": "google-adk",
  "anthropics/claude-agent-sdk-python": "claude-agent-sdk",
  "huggingface/smolagents": "smolagents",
  "pydantic/pydantic-ai": "pydantic-ai",
  "microsoft/agent-framework": "microsoft-agent-framework",
};

type SnapshotRepo = (typeof snapshot.repos)[number];

export type FrameworkRepo = SnapshotRepo & {
  daysSinceRelease: number;
  licenceLabel: string;
  languageLabel: string;
};

const repos: FrameworkRepo[] = snapshot.repos.map((repo) => ({
  ...repo,
  daysSinceRelease: calendarDays(repo.latest_release_at, snapshot.retrieved_at),
  licenceLabel: licenceLabel(repo.license),
  languageLabel: repo.language ?? UNDETECTED,
}));

export const path = "/reports/ai-agent-framework-github-stats-november-2026";
export const title = "AI agent framework GitHub stats, November 2026";
export const retrievedAt = snapshot.retrieved_at;
export const source = snapshot.source;
export const retrievedDay = isoDay(retrievedAt);
export const retrievedLabel = longDate(retrievedAt);
export const citationDate = shortDate(retrievedAt);
/** Citation URL requested for this report. The site canonical host redirects this apex host. */
export const citationUrl = `https://aiagentsinfo.com${path}`;
export const csvPath = `${path}/csv?table=frameworks`;
export const pdfPath = `${path}/pdf`;

export const description = `Stars, forks, open issues, licences, primary languages, and latest releases for ${integer(repos.length)} open-source agent frameworks and SDKs, copied from the public GitHub REST API on ${retrievedLabel}.`;

export const citation = `AI Agents Info, "${title}", ${citationDate}, ${citationUrl}`;

export const embedHtml = `<a href="${citationUrl}">AI agent framework GitHub stats (Nov 2026) - AI Agents Info</a>`;

export function leadParagraph() {
  return `Data pulled from GitHub on ${retrievedLabel}. This page lists public GitHub figures for ${integer(repos.length)} open-source agent frameworks and SDKs. Stars, forks, open issues, the detected licence, the primary language, the creation date, and the latest release are copied from that snapshot. Nothing on this page is estimated.`;
}

export function takeaways() {
  const top = mostStarred();
  const fresh = newestRepo();
  const recent = recentRepos();
  const quiet = quietRepos();
  return [
    `Data pulled from GitHub on ${retrievedLabel}. The snapshot has ${integer(repos.length)} repositories.`,
    `${top.repo} has the most stars in this snapshot, at ${integer(top.stars)}.`,
    `${fresh.repo} is the newest repository by creation date (${formatDate(fresh.created_at)}).`,
    `${integer(recent.length)} ${plural(recent.length, "repository has", "repositories have")} a latest GitHub release within ${integer(RECENT_RELEASE_DAYS)} days of that pull. ${integer(quiet.length)} ${plural(quiet.length, "repository has", "repositories have")} a latest release ${integer(QUIET_RELEASE_DAYS)} or more days earlier.`,
  ];
}

export type KeyFigure = {
  id: string;
  label: string;
  value: string;
  note: string;
  kind: "count" | "name";
};

export function keyFigures(): KeyFigure[] {
  const top = mostStarred();
  const fresh = newestRepo();
  const figures: KeyFigure[] = [
    {
      id: "stars",
      label: "Total stars",
      value: integer(totalStars()),
      note: `Sum of the star counts GitHub returned for these ${integer(repos.length)} repositories.`,
      kind: "count",
    },
    {
      id: "most-starred",
      label: "Most-starred repository",
      value: top.repo,
      note: `${integer(top.stars)} stars.`,
      kind: "name",
    },
    {
      id: "newest",
      label: "Newest repository",
      value: fresh.repo,
      note: `Created ${formatDate(fresh.created_at)}.`,
      kind: "name",
    },
    {
      id: "recent-releases",
      label: `Release in the last ${integer(RECENT_RELEASE_DAYS)} days`,
      value: integer(recentRepos().length),
      note: `Latest release dated ${integer(RECENT_RELEASE_DAYS)} days or fewer before ${retrievedLabel}.`,
      kind: "count",
    },
  ];
  for (const item of licenceBreakdown()) {
    figures.push({
      id: `licence-${item.key}`,
      label: item.label,
      value: integer(item.count),
      note:
        item.key === "NOASSERTION"
          ? "GitHub returned NOASSERTION for the licence field."
          : `Repositories whose GitHub licence field is ${item.key}.`,
      kind: "count",
    });
  }
  return figures;
}

export const frameworkColumns: SortableColumn[] = [
  { key: "repo", label: "Framework" },
  { key: "stars", label: "Stars", numeric: true },
  { key: "forks", label: "Forks", numeric: true },
  { key: "openIssues", label: "Open issues + PRs", numeric: true },
  { key: "licence", label: "Licence" },
  { key: "language", label: "Primary language" },
  { key: "created", label: "Created" },
  { key: "release", label: "Latest release" },
  { key: "releaseDate", label: "Latest release date" },
];

export function frameworkRows(): SortableRow[] {
  return repos.map((repo) => ({
    id: repo.repo,
    sort: {
      repo: repo.repo,
      stars: repo.stars,
      forks: repo.forks,
      openIssues: repo.open_issues,
      licence: repo.licenceLabel,
      language: repo.languageLabel,
      created: repo.created_at,
      release: repo.latest_release,
      releaseDate: repo.latest_release_at,
    },
    display: {
      repo: repo.repo,
      stars: integer(repo.stars),
      forks: integer(repo.forks),
      openIssues: integer(repo.open_issues),
      licence: repo.licenceLabel,
      language: repo.languageLabel,
      created: formatDate(repo.created_at),
      release: repo.latest_release,
      releaseDate: formatDate(repo.latest_release_at),
    },
    href: { repo: repo.html_url },
  }));
}

export function frameworkCsv() {
  return {
    filename: "ai-agent-framework-github-stats-november-2026.csv",
    headers: frameworkColumns.map((column) => column.label),
    rows: frameworkRows().map((row) => frameworkColumns.map((column) => row.display[column.key] || "")),
  };
}

export function licenceBreakdown() {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    counts.set(repo.license, (counts.get(repo.license) ?? 0) + 1);
  }
  const keys = [
    ...LICENCE_ORDER.filter((key) => counts.has(key)),
    ...[...counts.keys()].filter((key) => !LICENCE_ORDER.includes(key as (typeof LICENCE_ORDER)[number])),
  ];
  return keys.map((key) => ({
    key,
    label: licenceLabel(key),
    count: counts.get(key) ?? 0,
  }));
}

export function licenceSentence() {
  const parts = licenceBreakdown().map(
    (item) => `${item.label}: ${integer(item.count)} ${plural(item.count, "repository", "repositories")}`,
  );
  return `GitHub's licence field splits this snapshot as follows: ${parts.join("; ")}. "Not detected by GitHub" means the API returned NOASSERTION. This page does not guess a licence for those repositories.`;
}

export const recencyColumns: SortableColumn[] = [
  { key: "repo", label: "Framework" },
  { key: "release", label: "Latest release" },
  { key: "releaseDate", label: "Latest release date" },
  { key: "days", label: "Days since release", numeric: true },
  { key: "within30", label: `Within ${RECENT_RELEASE_DAYS} days` },
  { key: "quiet", label: `${QUIET_RELEASE_DAYS} days or more` },
];

export function recencyRows(): SortableRow[] {
  return repos.map((repo) => {
    const within = repo.daysSinceRelease <= RECENT_RELEASE_DAYS;
    const quiet = repo.daysSinceRelease >= QUIET_RELEASE_DAYS;
    return {
      id: repo.repo,
      sort: {
        repo: repo.repo,
        release: repo.latest_release,
        releaseDate: repo.latest_release_at,
        days: repo.daysSinceRelease,
        within30: within ? 1 : 0,
        quiet: quiet ? 1 : 0,
      },
      display: {
        repo: repo.repo,
        release: repo.latest_release,
        releaseDate: formatDate(repo.latest_release_at),
        days: integer(repo.daysSinceRelease),
        within30: within ? "Yes" : "No",
        quiet: quiet ? "Yes" : "No",
      },
      href: { repo: repo.html_url },
    };
  });
}

export function quietReleaseSentence() {
  const quiet = [...quietRepos()].sort(
    (a, b) => b.daysSinceRelease - a.daysSinceRelease || a.repo.localeCompare(b.repo),
  );
  if (!quiet.length) {
    return `No repository in this snapshot has a latest release ${integer(QUIET_RELEASE_DAYS)} or more days before ${retrievedLabel}.`;
  }
  const details = quiet.map(
    (repo) =>
      `${repo.repo} (latest release ${repo.latest_release} on ${formatDate(repo.latest_release_at)}, ${integer(repo.daysSinceRelease)} days)`,
  );
  return `As of ${retrievedLabel}, ${integer(quiet.length)} ${plural(quiet.length, "repository has", "repositories have")} a latest release ${integer(QUIET_RELEASE_DAYS)} or more days earlier: ${details.join("; ")}. These are the dates on the tags GitHub returned. They do not say anything else about the project.`;
}

export function recentReleaseSentence() {
  const recent = recentRepos();
  return `${integer(recent.length)} ${plural(recent.length, "repository has", "repositories have")} a latest release dated ${integer(RECENT_RELEASE_DAYS)} days or fewer before ${retrievedLabel}. The table lists the day count for every repository in the snapshot.`;
}

export function packageReleaseNote() {
  const tagged = repos.filter((repo) => isPackageTag(repo.latest_release));
  if (!tagged.length) return "";
  const names = joinList(tagged.map((repo) => repo.repo));
  const tags = joinList(tagged.map((repo) => repo.latest_release));
  return `For ${names}, the latest release tag names a package (${tags}). On a repository that publishes more than one package, the latest release GitHub returns is whichever package was tagged last.`;
}

export function methodologyFacts() {
  return [
    `The figures come from the public GitHub REST API. The snapshot records its source as: ${source}. The calls were GET https://api.github.com/repos/{owner}/{repo} and GET https://api.github.com/repos/{owner}/{repo}/releases/latest.`,
    `The snapshot time is ${retrievedAt} UTC (${retrievedLabel}).`,
    "Stars are a popularity signal. They are not a measure of quality.",
    "The open-issues field is GitHub's open_issues_count. That count includes open pull requests, so this page labels the column open issues + PRs.",
    packageReleaseNote(),
    "Release tag text differs by repository. This page copies the tag GitHub returned and does not convert tags into one version scheme.",
    'The licence cell is the SPDX identifier GitHub returned. NOASSERTION is shown as "Not detected by GitHub" and is not replaced with a guess.',
    'A primary language left empty by GitHub is shown as "Not detected by GitHub".',
    "strands-agents is not in this snapshot. The GitHub API returned a redirect for that repository, so it was left out.",
    "The set is widely used open-source agent frameworks and SDKs.",
  ].filter((line) => line.length > 0);
}

export type DirectoryMatch = {
  repo: string;
  slug: string;
  name: string;
  href: string;
};

export function directoryMatches(): DirectoryMatch[] {
  return repos.flatMap((repo) => {
    const slug = directorySlugByRepo[repo.repo];
    if (!slug) return [];
    const file = join(process.cwd(), "content", "directory", `${slug}.md`);
    if (!existsSync(file)) return [];
    const text = readFileSync(file, "utf8");
    const matched = text.match(/^name:\s*(.+)\s*$/m);
    const name = matched?.[1]?.trim().replace(/^["']|["']$/g, "") || slug;
    return [{ repo: repo.repo, slug, name, href: `/directory/${slug}` }];
  });
}

export function directorySentence(toAbsolute: (href: string) => string) {
  const matches = directoryMatches();
  if (!matches.length) return "";
  const list = matches.map((match) => `${match.name} (${toAbsolute(match.href)})`).join("; ");
  return `Several of these repositories have a listing in this site's directory: ${list}.`;
}

export function relatedSentence(toAbsolute: (href: string) => string) {
  const links = [
    ["Agent harness benchmark, November 2026", "/reports/agent-harness-benchmark-november-2026"],
    ["Agent frameworks", "/directory/category/agent-frameworks"],
    ["Harness comparison", "/trackers/harnesses"],
    ["Directory stats", "/directory/stats"],
  ] as const;
  return `Related pages on this site: ${links.map(([label, href]) => `${label} (${toAbsolute(href)})`).join("; ")}.`;
}

export function tableCaption() {
  return `GitHub figures for ${integer(repos.length)} agent frameworks, pulled ${retrievedLabel}`;
}

function totalStars() {
  return repos.reduce((sum, repo) => sum + repo.stars, 0);
}

function mostStarred() {
  const top = [...repos].sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo))[0];
  if (!top) throw new Error("Framework GitHub snapshot has no repositories");
  return top;
}

function newestRepo() {
  const fresh = [...repos].sort((a, b) => b.created_at.localeCompare(a.created_at) || a.repo.localeCompare(b.repo))[0];
  if (!fresh) throw new Error("Framework GitHub snapshot has no repositories");
  return fresh;
}

function recentRepos() {
  return repos.filter((repo) => repo.daysSinceRelease <= RECENT_RELEASE_DAYS);
}

function quietRepos() {
  return repos.filter((repo) => repo.daysSinceRelease >= QUIET_RELEASE_DAYS);
}

function licenceLabel(license: string) {
  return license === "NOASSERTION" ? UNDETECTED : license;
}

function isPackageTag(tag: string) {
  return tag.startsWith("@") || tag.includes("==");
}

function calendarDays(earlierIso: string, laterIso: string) {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((utcMidnight(laterIso) - utcMidnight(earlierIso)) / msPerDay);
}

function utcMidnight(iso: string) {
  const date = new Date(iso);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function isoDay(iso: string) {
  const date = new Date(iso);
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-${day}`;
}

function longDate(iso: string) {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function shortDate(iso: string) {
  const date = new Date(iso);
  return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

function integer(value: number) {
  return value.toLocaleString("en-US");
}

function plural(count: number, singular: string, pluralLabel: string) {
  return count === 1 ? singular : pluralLabel;
}

function joinList(items: string[]) {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}
