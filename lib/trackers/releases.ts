import { cache } from "react";
import snapshot from "@/data/trackers/releases-snapshot.json";
import { githubReleasesApiUrl } from "@/lib/trackers/catalog";
import { releasePageRepos } from "@/lib/trackers/entities";
import { fetchJson, githubAuthHeaders, isoDay } from "@/lib/trackers/http";

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

const BOILERPLATE = new Set([
  "what's changed",
  "whats changed",
  "what's new",
  "whats new",
  "changelog",
  "changes",
  "highlights",
  "features",
  "feature",
  "bug fixes",
  "bug fix",
  "fixes",
  "fix",
  "documentation",
  "docs",
  "contributors",
  "full changelog",
  "breaking changes",
  "other changes",
  "miscellaneous",
  "chore",
  "chores",
  "new contributors",
]);

type StoredRelease = {
  tag: string;
  name: string | null;
  body: string | null;
  publishedAt: string;
  htmlUrl: string;
  prerelease: boolean;
};

type StoredRepo = {
  id: string;
  name: string;
  repo: string;
  retrievedAt: string;
  capped: boolean;
  releases: StoredRelease[];
};

type GithubRelease = {
  tag_name?: string;
  name?: string | null;
  body?: string | null;
  published_at?: string | null;
  html_url?: string;
  draft?: boolean;
  prerelease?: boolean;
};

export type ReleaseRow = {
  tag: string;
  name: string | null;
  publishedAt: string;
  publishedDay: string;
  htmlUrl: string;
  prerelease: boolean;
  note: string | null;
};

const file = snapshot as {
  retrievedAt: string;
  retrievedDay: string;
  source: string;
  repos: StoredRepo[];
};

export const releasesSnapshotDay = file.retrievedDay;
export const releasesSnapshotSource = file.source;

export function monthLabel(month: string) {
  const match = /^(\d{4})-(\d{2})$/.exec(month);
  if (!match) return month;
  const index = Number(match[2]) - 1;
  if (index < 0 || index > 11) return month;
  return `${MONTHS[index]} ${match[1]}`;
}

export function releaseNote(tag: string, name: string | null, body: string | null): string | null {
  const lines = (body ?? "").split(/\r?\n/);
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("<!--")) continue;
    let line = trimmed.replace(/^#{1,6}\s+/, "").replace(/^>\s+/, "").replace(/^[-*+]\s+/, "").trim();
    line = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\s+/g, " ").trim();
    if (!line || line.startsWith("http://") || line.startsWith("https://")) continue;
    const key = line.toLowerCase().replace(/[:.]+$/g, "");
    const heading = /^#{1,6}\s+/.test(trimmed);
    if (BOILERPLATE.has(key) && (heading || line.length < 40)) continue;
    if (isVersionLine(line, tag, name)) continue;
    if (/^changes since\b/i.test(line)) continue;
    if (/^full changelog\b/i.test(line)) continue;
    if (/^release\([^)]+\):\s*\S+$/i.test(line)) continue;
    if (line.length >= 400) return `${line.slice(0, 399).trimEnd()}…`;
    return line;
  }
  const title = name?.trim() ?? "";
  if (title && !sameVersion(title, tag)) {
    if (title.length >= 400) return `${title.slice(0, 399).trimEnd()}…`;
    return title;
  }
  return null;
}

function sameVersion(line: string, tag: string) {
  const compact = (value: string) => value.toLowerCase().replace(/[\s._-]+/g, "");
  const left = compact(line);
  const right = compact(tag.replace(/^v/i, ""));
  return left === right || left === `v${right}` || left.startsWith(`${right}(`) || left.startsWith(`v${right}(`);
}

function isVersionLine(line: string, tag: string, name: string | null) {
  const stripped = line.replace(/\s*\([^)]*\)\s*$/, "").trim();
  return (
    sameVersion(line, tag) ||
    sameVersion(stripped, tag) ||
    (name ? sameVersion(line, name) || sameVersion(stripped, name) : false) ||
    /^v?\d+\.\d+[\w.+-]*$/.test(stripped)
  );
}

function toRow(raw: StoredRelease): ReleaseRow | null {
  if (!raw.tag || !raw.publishedAt) return null;
  const publishedDay = isoDay(raw.publishedAt);
  if (!publishedDay) return null;
  return {
    tag: raw.tag,
    name: raw.name,
    publishedAt: raw.publishedAt,
    publishedDay,
    htmlUrl: raw.htmlUrl,
    prerelease: raw.prerelease === true,
    note: releaseNote(raw.tag, raw.name, raw.body),
  };
}

function storedRepo(slug: string) {
  return file.repos.find((repo) => repo.id === slug) ?? null;
}

export function releaseMonths(slug: string) {
  const repo = storedRepo(slug);
  if (!repo) return [];
  return [...new Set(repo.releases.map((release) => release.publishedAt.slice(0, 7)))]
    .filter((month) => /^\d{4}-\d{2}$/.test(month))
    .sort((a, b) => b.localeCompare(a));
}

export function latestReleaseMonth(slug: string) {
  return releaseMonths(slug)[0] ?? null;
}

export function releaseStaticParams() {
  const params: { slug: string; month: string }[] = [];
  for (const item of releasePageRepos()) {
    for (const month of releaseMonths(item.id)) {
      params.push({ slug: item.id, month });
    }
  }
  return params;
}

function windowTruncatesMonth(rows: ReleaseRow[], month: string, capped: boolean) {
  if (!capped || !rows.length) return false;
  const oldest = [...rows].sort((a, b) => a.publishedDay.localeCompare(b.publishedDay))[0];
  return oldest.publishedDay.startsWith(month);
}

async function fetchLiveReleases(repoName: string) {
  const url = githubReleasesApiUrl(repoName);
  const response = await fetchJson<GithubRelease[]>(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...githubAuthHeaders(),
    },
    timeoutMs: 12_000,
  });
  if (!response.ok || !Array.isArray(response.data)) return null;
  const rows: ReleaseRow[] = [];
  for (const item of response.data) {
    if (item.draft || !item.tag_name || !item.published_at) continue;
    const row = toRow({
      tag: item.tag_name,
      name: typeof item.name === "string" ? item.name : null,
      body: typeof item.body === "string" ? item.body : null,
      publishedAt: item.published_at,
      htmlUrl: item.html_url || `https://github.com/${repoName}/releases/tag/${item.tag_name}`,
      prerelease: item.prerelease === true,
    });
    if (row) rows.push(row);
  }
  return {
    rows,
    retrievedAt: response.retrievedAt,
    capped: response.data.length >= 100,
    sourceUrl: url,
  };
}

export type ReleaseMonthData = {
  slug: string;
  name: string;
  repo: string;
  month: string;
  rows: ReleaseRow[];
  live: boolean;
  retrievedAt: string;
  capped: boolean;
  truncated: boolean;
  sourceUrl: string;
  otherMonths: string[];
};

export const getReleaseMonth = cache(async (slug: string, month: string): Promise<ReleaseMonthData | null> => {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return null;
  const item = releasePageRepos().find((entry) => entry.id === slug);
  const stored = storedRepo(slug);
  if (!item || !stored) return null;
  const storedRows = stored.releases.map((release) => toRow(release)).filter((row): row is ReleaseRow => Boolean(row));
  const storedMonth = storedRows.filter((row) => row.publishedDay.startsWith(month));
  if (!storedMonth.length) return null;

  let rows = storedMonth;
  let pool = storedRows;
  let live = false;
  let retrievedAt = stored.retrievedAt;
  let capped = stored.capped;
  let sourceUrl = githubReleasesApiUrl(item.repo);

  if (isoDay(stored.retrievedAt) !== isoDay()) {
    const fresh = await fetchLiveReleases(item.repo);
    if (fresh) {
      const liveMonth = fresh.rows.filter((row) => row.publishedDay.startsWith(month));
      const oldest = [...fresh.rows].sort((a, b) => a.publishedDay.localeCompare(b.publishedDay))[0];
      const fellOut = fresh.capped && oldest && oldest.publishedDay.slice(0, 7) > month;
      if (liveMonth.length && !fellOut) {
        rows = liveMonth;
        pool = fresh.rows;
        live = true;
        retrievedAt = fresh.retrievedAt;
        capped = fresh.capped;
        sourceUrl = fresh.sourceUrl;
      }
    }
  }

  rows.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.tag.localeCompare(b.tag));
  return {
    slug: item.id,
    name: item.name,
    repo: item.repo,
    month,
    rows,
    live,
    retrievedAt,
    capped,
    truncated: windowTruncatesMonth(pool, month, capped),
    sourceUrl,
    otherMonths: releaseMonths(slug).filter((entry) => entry !== month),
  };
});
