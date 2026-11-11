import { cache } from "react";
import starsSnapshot from "@/data/trackers/stars-snapshot.json";
import { STAR_REPOS, githubRepoApiUrl, githubRepoHtmlUrl, type TrackedRepo } from "@/lib/trackers/catalog";
import {
  crossLinks,
  isFrameworkStarPage,
  starPagePath,
  starPageRepos,
  type EntityLink,
} from "@/lib/trackers/entities";
import { isoDay } from "@/lib/trackers/http";
import { latestReleaseMonth } from "@/lib/trackers/releases";
import {
  recentStarPoints,
  storedStarPoints,
  withLiveStarPoint,
  type StarPoint,
} from "@/lib/trackers/star-history";
import { fetchStarRow, getStarsReport, type StarRow } from "@/lib/trackers/stars";

export type StarPageData = {
  item: TrackedRepo;
  row: StarRow;
  points: StarPoint[];
  shown: StarPoint[];
  rank: { rank: number; total: number } | null;
  live: boolean;
  retrievedAt: string;
  framework: boolean;
  repoUrl: string;
  links: EntityLink[];
};

export function indexableStarPages() {
  return starPageRepos().filter(
    (item) => storedStarPoints(item.id).length > 0 || starsSnapshot.rows.some((row) => row.id === item.id),
  );
}

function historyStars(id: string, floor: string) {
  const last = storedStarPoints(id).at(-1);
  if (!last || last.retrievedAt < floor) return null;
  return last;
}

export const getStarPage = cache(async (slug: string): Promise<StarPageData | null> => {
  const item = starPageRepos().find((entry) => entry.id === slug);
  if (!item) return null;
  const framework = isFrameworkStarPage(slug);
  const stored = storedStarPoints(slug);
  let row: StarRow | null = null;
  let retrievedAt = "";
  let live = false;
  let rank: { rank: number; total: number } | null = null;

  if (framework) {
    const report = await getStarsReport();
    const found = report.rows.find((entry) => entry.id === slug);
    if (found && report.live) {
      row = found;
      retrievedAt = report.retrievedAt;
      live = true;
      const sorted = [...report.rows].sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo));
      const index = sorted.findIndex((entry) => entry.id === slug);
      if (index >= 0) rank = { rank: index + 1, total: sorted.length };
    } else {
      const ranked = STAR_REPOS.flatMap((repo) => {
        const point = storedStarPoints(repo.id).at(-1);
        return point ? [{ id: repo.id, repo: repo.repo, stars: point.stars, retrievedAt: point.retrievedAt }] : [];
      });
      const self = ranked.find((entry) => entry.id === slug);
      if (self) {
        const sorted = [...ranked].sort((a, b) => b.stars - a.stars || a.repo.localeCompare(b.repo));
        const index = sorted.findIndex((entry) => entry.id === slug);
        rank = { rank: index + 1, total: sorted.length };
        row = {
          id: item.id,
          name: item.name,
          repo: item.repo,
          directory: item.directory,
          note: item.note,
          stars: self.stars,
          forks: found?.forks ?? null,
          openIssues: found?.openIssues ?? null,
          pushedAt: found?.pushedAt ?? null,
          archived: found?.archived ?? null,
          sourceUrl: githubRepoApiUrl(item.repo),
        };
        retrievedAt = self.retrievedAt;
      }
    }
  } else {
    const today = stored.find((point) => point.date === isoDay());
    const fetched = today ? null : await fetchStarRow(item);
    if (fetched && "row" in fetched) {
      row = fetched.row;
      retrievedAt = fetched.retrievedAt;
      live = true;
    } else {
      const point = today ?? historyStars(slug, "");
      if (point) {
        row = {
          id: item.id,
          name: item.name,
          repo: item.repo,
          directory: item.directory,
          note: item.note,
          stars: point.stars,
          forks: null,
          openIssues: null,
          pushedAt: null,
          archived: null,
          sourceUrl: githubRepoApiUrl(item.repo),
        };
        retrievedAt = point.retrievedAt;
      }
    }
  }

  if (!row || !retrievedAt) return null;
  const points = withLiveStarPoint(stored, {
    date: isoDay(retrievedAt),
    stars: row.stars,
    retrievedAt,
  });
  return {
    item,
    row,
    points,
    shown: recentStarPoints(points),
    rank,
    live,
    retrievedAt,
    framework,
    repoUrl: githubRepoHtmlUrl(item.repo),
    links: crossLinks({
      repo: item.repo,
      currentPath: starPagePath(item.id),
      releaseSlug: item.id,
      releaseMonth: latestReleaseMonth(item.id),
    }),
  };
});
