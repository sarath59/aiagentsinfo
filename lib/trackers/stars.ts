import snapshot from "@/data/trackers/stars-snapshot.json";
import { STAR_REPOS, githubRepoApiUrl } from "@/lib/trackers/catalog";
import { fetchJson, githubAuthHeaders, integer, isoDay } from "@/lib/trackers/http";
import type { SortableColumn, SortableRow } from "@/lib/sortable";

type GithubRepo = {
  full_name?: string;
  html_url?: string;
  stargazers_count?: number;
  forks_count?: number;
  open_issues_count?: number;
  pushed_at?: string;
  archived?: boolean;
  description?: string | null;
};

export type StarRow = {
  id: string;
  name: string;
  repo: string;
  directory?: string;
  note?: string;
  stars: number;
  forks: number | null;
  openIssues: number | null;
  pushedAt: string | null;
  archived: boolean | null;
  sourceUrl: string;
};

export type StarsReport = {
  live: boolean;
  retrievedAt: string;
  retrievedDay: string;
  rows: StarRow[];
  failures: { repo: string; error: string }[];
  source: string;
};

function snapshotAsReport(): StarsReport {
  return {
    live: false,
    retrievedAt: snapshot.retrievedAt,
    retrievedDay: snapshot.retrievedDay,
    rows: snapshot.rows as StarRow[],
    failures: [],
    source: snapshot.source,
  };
}

export async function getStarsReport(): Promise<StarsReport> {
  const fallback = snapshotAsReport();
  try {
    const results = await Promise.all(
      STAR_REPOS.map(async (item) => {
        const url = githubRepoApiUrl(item.repo);
        const response = await fetchJson<GithubRepo>(url, {
          headers: {
            Accept: "application/vnd.github+json",
            ...githubAuthHeaders(),
          },
          timeoutMs: 8_000,
        });
        if (!response.ok) return { item, error: response.error };
        const stars = response.data.stargazers_count;
        if (typeof stars !== "number") return { item, error: "missing stargazers_count" };
        const row: StarRow = {
          id: item.id,
          name: item.name,
          repo: item.repo,
          directory: item.directory,
          note: item.note,
          stars,
          forks: typeof response.data.forks_count === "number" ? response.data.forks_count : null,
          openIssues: typeof response.data.open_issues_count === "number" ? response.data.open_issues_count : null,
          pushedAt: response.data.pushed_at ?? null,
          archived: typeof response.data.archived === "boolean" ? response.data.archived : null,
          sourceUrl: url,
        };
        return { item, row, retrievedAt: response.retrievedAt };
      }),
    );

    const rows: StarRow[] = [];
    const failures: StarsReport["failures"] = [];
    const retrieved: string[] = [];
    for (const result of results) {
      if ("row" in result && result.row) {
        rows.push(result.row);
        retrieved.push(result.retrievedAt);
      } else if ("error" in result) {
        failures.push({ repo: result.item.repo, error: result.error });
      }
    }
    if (!rows.length) return fallback;
    const retrievedAt = retrieved.sort().at(-1) ?? new Date().toISOString();
    return {
      live: true,
      retrievedAt,
      retrievedDay: isoDay(retrievedAt),
      rows: rows.sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo)),
      failures,
      source: "GitHub REST API https://api.github.com/repos/{owner}/{repo}",
    };
  } catch {
    return fallback;
  }
}

export function starColumns(): SortableColumn[] {
  return [
    { key: "name", label: "Framework" },
    { key: "repo", label: "Repository" },
    { key: "stars", label: "Stars", numeric: true },
    { key: "forks", label: "Forks", numeric: true },
    { key: "issues", label: "Open issues + PRs", numeric: true },
    { key: "pushed", label: "Last push" },
  ];
}

export function starRows(rows: StarRow[]): SortableRow[] {
  return rows.map((row) => ({
    id: row.repo,
    sort: {
      name: row.name,
      repo: row.repo,
      stars: row.stars,
      forks: row.forks,
      issues: row.openIssues,
      pushed: row.pushedAt,
    },
    display: {
      name: row.name,
      repo: row.repo,
      stars: integer(row.stars),
      forks: row.forks == null ? "—" : integer(row.forks),
      issues: row.openIssues == null ? "—" : integer(row.openIssues),
      pushed: row.pushedAt ? row.pushedAt.slice(0, 10) : "—",
    },
    href: {
      name: row.directory ? `/directory/${row.directory}` : `https://github.com/${row.repo}`,
      repo: `https://github.com/${row.repo}`,
    },
    facets: { stars: row.stars },
  }));
}

export function topStarred(rows: StarRow[]) {
  return [...rows].sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo))[0];
}

export function starsFaq(report: StarsReport) {
  const top = topStarred(report.rows);
  const lead = top
    ? `${top.repo} has the most stars in this set, at ${integer(top.stars)}.`
    : "The star table is empty on this pass because GitHub did not return stargazers_count for these repositories.";
  return [
    {
      question: "Which AI agent framework has the most GitHub stars?",
      answer: `${lead} Stars are an account’s bookmark on a repository, not a download count and not a quality score.`,
    },
    {
      question: "Do GitHub stars measure installs?",
      answer:
        "No. Stars and downloads answer different questions. Compare them on the downloads tracker. A repository can lead stars and trail file requests, or the reverse.",
    },
    {
      question: "Where do the star counts come from?",
      answer: `Each row is stargazers_count from GET https://api.github.com/repos/{owner}/{repo}. ${
        report.live
          ? `This pass is ${report.retrievedAt} UTC.`
          : `Live fetch missed; the table is the snapshot from ${report.retrievedAt} UTC.`
      } Open issues include open pull requests, which is how GitHub ships that field.`,
    },
  ];
}

export function starsTakeaways(report: StarsReport) {
  const top = topStarred(report.rows);
  const lines: string[] = [];
  if (!report.live) {
    lines.push(`Live GitHub fetch missed. Figures below are the last successful snapshot, dated ${report.retrievedDay}.`);
  } else {
    lines.push(`Copied from GitHub’s repository API on ${report.retrievedDay}.`);
  }
  if (top) lines.push(`${top.repo} has the most stars in this set, at ${integer(top.stars)}.`);
  lines.push("Stars are not downloads. The install table is the downloads tracker.");
  return lines;
}
