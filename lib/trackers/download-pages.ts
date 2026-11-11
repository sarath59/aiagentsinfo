import { cache } from "react";
import cliSnapshot from "@/data/trackers/cli-downloads-snapshot.json";
import downloadsSnapshot from "@/data/trackers/downloads-snapshot.json";
import type { TrackedPackage } from "@/lib/trackers/catalog";
import {
  CLI_NPM_PACKAGES,
  crossLinks,
  downloadPagePackages,
  downloadPagePath,
  isCliPackage,
  registryPageUrl,
  starPageRepos,
  type EntityLink,
} from "@/lib/trackers/entities";
import {
  fetchTrackedPackage,
  getDownloadsReport,
  weeklyBlocks,
  type PackageDownloads,
} from "@/lib/trackers/downloads";
import { latestReleaseMonth } from "@/lib/trackers/releases";

export type WeekBlock = { start: string; end: string; downloads: number };

export type DownloadPageData = {
  item: TrackedPackage;
  row: PackageDownloads;
  week: WeekBlock;
  weeks: WeekBlock[];
  rank: { rank: number; total: number };
  rankSet: "pypi" | "npm" | "cli";
  live: boolean;
  retrievedAt: string;
  registryUrl: string;
  links: EntityLink[];
};

function snapshotPackages(registry: "pypi" | "npm") {
  const rows = registry === "pypi" ? downloadsSnapshot.pypi : downloadsSnapshot.npm;
  return rows as PackageDownloads[];
}

function withWeeks(rows: PackageDownloads[]) {
  return rows.flatMap((row) => {
    const weeks = weeklyBlocks(row.daily);
    const week = weeks.at(-1);
    if (!week) return [];
    return [{ row, weeks, week }];
  });
}

export function indexableDownloadPackages() {
  const frameworkIds = new Set(
    withWeeks([...snapshotPackages("pypi"), ...snapshotPackages("npm")]).map((item) => item.row.id),
  );
  const cliIds = new Set(withWeeks(cliSnapshot.packages as PackageDownloads[]).map((item) => item.row.id));
  return downloadPagePackages().filter((item) =>
    isCliPackage(item.id) ? cliIds.has(item.id) : frameworkIds.has(item.id),
  );
}

function ranked(rows: PackageDownloads[], id: string) {
  const packed = withWeeks(rows);
  const sorted = [...packed].sort(
    (a, b) => b.week.downloads - a.week.downloads || a.row.package.localeCompare(b.row.package),
  );
  const index = sorted.findIndex((item) => item.row.id === id);
  if (index < 0) return null;
  return { rank: index + 1, total: sorted.length, entry: sorted[index] };
}

async function cliBundle() {
  const results = await Promise.all(CLI_NPM_PACKAGES.map((item) => fetchTrackedPackage(item)));
  const rows: PackageDownloads[] = [];
  const times: string[] = [];
  for (const result of results) {
    if ("packed" in result && result.packed) {
      rows.push(result.packed);
      times.push(result.retrievedAt);
    }
  }
  if (rows.length === CLI_NPM_PACKAGES.length) {
    return { rows, live: true, retrievedAt: times.sort().at(-1) ?? cliSnapshot.retrievedAt };
  }
  return {
    rows: cliSnapshot.packages as PackageDownloads[],
    live: false,
    retrievedAt: cliSnapshot.retrievedAt,
  };
}

export const getDownloadPage = cache(async (slug: string): Promise<DownloadPageData | null> => {
  const item = downloadPagePackages().find((entry) => entry.id === slug);
  if (!item) return null;

  let rows: PackageDownloads[] = [];
  let live = false;
  let retrievedAt = downloadsSnapshot.retrievedAt;
  let rankSet: DownloadPageData["rankSet"] = item.registry;

  if (isCliPackage(item.id)) {
    const bundle = await cliBundle();
    rows = bundle.rows;
    live = bundle.live;
    retrievedAt = bundle.retrievedAt;
    rankSet = "cli";
  } else {
    const report = await getDownloadsReport();
    const liveRows = item.registry === "pypi" ? report.pypi : report.npm;
    if (report.live && liveRows.some((row) => row.id === item.id)) {
      rows = liveRows;
      live = true;
      retrievedAt = report.retrievedAt;
    } else {
      rows = snapshotPackages(item.registry);
      live = false;
      retrievedAt = downloadsSnapshot.retrievedAt;
    }
  }

  const place = ranked(rows, item.id);
  if (!place) return null;
  const star = starPageRepos().find((entry) => entry.repo === item.repo);
  return {
    item,
    row: place.entry.row,
    week: place.entry.week,
    weeks: place.entry.weeks,
    rank: { rank: place.rank, total: place.total },
    rankSet,
    live,
    retrievedAt,
    registryUrl: registryPageUrl(item),
    links: crossLinks({
      repo: item.repo,
      currentPath: downloadPagePath(item.id),
      releaseSlug: star?.id,
      releaseMonth: star ? latestReleaseMonth(star.id) : null,
    }),
  };
});
