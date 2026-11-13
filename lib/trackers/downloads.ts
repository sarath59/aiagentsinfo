import { cache } from "react";
import snapshot from "@/data/trackers/downloads-snapshot.json";

export const downloadsSnapshotDay = snapshot.retrievedDay;
import {
  NPM_PACKAGES,
  PYPI_PACKAGES,
  npmRangeUrl,
  pypiRecentUrl,
  pypiStatsUrl,
  type TrackedPackage,
} from "@/lib/trackers/catalog";
import { fetchJson, integer, isoDay, shortDate } from "@/lib/trackers/http";
import type { SortableColumn, SortableRow } from "@/lib/sortable";

const WINDOW_DAYS = 30;
const HISTORY_DAYS = 180;

type DailyRow = { date: string; downloads: number };
type MonthRow = { month: string; downloads: number };

type PypiOverall = {
  data?: { category?: string; date?: string; downloads?: number }[];
  package?: string;
};

type PypiRecent = {
  data?: { last_day?: number; last_week?: number; last_month?: number };
  package?: string;
};

type NpmRange = {
  package?: string;
  start?: string;
  end?: string;
  downloads?: { day?: string; downloads?: number }[];
};

export type PackageDownloads = {
  id: string;
  name: string;
  package: string;
  registry: "pypi" | "npm";
  repo: string;
  directory?: string;
  note?: string;
  windowStart: string;
  windowEnd: string;
  windowDownloads: number;
  lastDay: number | null;
  lastWeek: number | null;
  lastMonth: number | null;
  daily: DailyRow[];
  monthly: MonthRow[];
  sourceUrl: string;
};

export type DownloadsReport = {
  live: boolean;
  retrievedAt: string;
  retrievedDay: string;
  pypi: PackageDownloads[];
  npm: PackageDownloads[];
  failures: { package: string; registry: string; error: string }[];
  sources: { title: string; url: string }[];
};

function addUtcDays(isoDayValue: string, days: number) {
  const date = new Date(`${isoDayValue}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return isoDay(date);
}

function dailyFromPypi(payload: PypiOverall): DailyRow[] {
  const rows = (payload.data ?? [])
    .filter((row) => row.category === "without_mirrors")
    .map((row) => ({
      date: String(row.date ?? ""),
      downloads: Number(row.downloads),
    }))
    .filter((row) => row.date && Number.isFinite(row.downloads) && row.downloads >= 0)
    .sort((a, b) => a.date.localeCompare(b.date));
  return rows;
}

function dailyFromNpm(payload: NpmRange): DailyRow[] {
  return (payload.downloads ?? [])
    .map((row) => ({
      date: String(row.day ?? ""),
      downloads: Number(row.downloads),
    }))
    .filter((row) => row.date && Number.isFinite(row.downloads) && row.downloads >= 0)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function completeDaily(daily: DailyRow[]) {
  const rows = [...daily];
  while (rows.length && rows[rows.length - 1].downloads === 0) rows.pop();
  return rows;
}

function windowSum(daily: DailyRow[]) {
  const slice = completeDaily(daily).slice(-WINDOW_DAYS);
  if (!slice.length) return null;
  return {
    start: slice[0].date,
    end: slice[slice.length - 1].date,
    downloads: slice.reduce((sum, row) => sum + row.downloads, 0),
    daily: slice,
  };
}

function monthlyFromDaily(daily: DailyRow[]): MonthRow[] {
  const months = new Map<string, number>();
  for (const row of daily) {
    const month = row.date.slice(0, 7);
    months.set(month, (months.get(month) ?? 0) + row.downloads);
  }
  return [...months.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, downloads]) => ({ month, downloads }));
}

function historyStart() {
  return addUtcDays(isoDay(), -HISTORY_DAYS);
}

function toPackage(
  item: TrackedPackage,
  daily: DailyRow[],
  extra: { lastDay?: number | null; lastWeek?: number | null; lastMonth?: number | null; sourceUrl: string },
): PackageDownloads | null {
  const window = windowSum(daily);
  if (!window) return null;
  return {
    id: item.id,
    name: item.name,
    package: item.package,
    registry: item.registry,
    repo: item.repo,
    directory: item.directory,
    note: item.note,
    windowStart: window.start,
    windowEnd: window.end,
    windowDownloads: window.downloads,
    lastDay: extra.lastDay ?? window.daily.at(-1)?.downloads ?? null,
    lastWeek: extra.lastWeek ?? null,
    lastMonth: extra.lastMonth ?? null,
    daily: daily.slice(-90),
    monthly: monthlyFromDaily(daily),
    sourceUrl: extra.sourceUrl,
  };
}

async function loadPypi(item: TrackedPackage) {
  const overallUrl = pypiStatsUrl(item.package);
  const [overall, recent] = await Promise.all([
    fetchJson<PypiOverall>(overallUrl, { timeoutMs: 12_000 }),
    fetchJson<PypiRecent>(pypiRecentUrl(item.package), { timeoutMs: 8_000 }),
  ]);
  if (!overall.ok) {
    return { error: overall.error, item };
  }
  const daily = dailyFromPypi(overall.data);
  const packed = toPackage(item, daily, {
    lastDay: recent.ok ? (recent.data.data?.last_day ?? null) : null,
    lastWeek: recent.ok ? (recent.data.data?.last_week ?? null) : null,
    lastMonth: recent.ok ? (recent.data.data?.last_month ?? null) : null,
    sourceUrl: overallUrl,
  });
  if (!packed) return { error: "no without_mirrors rows", item };
  return { packed, retrievedAt: overall.retrievedAt };
}

async function loadNpm(item: TrackedPackage) {
  const end = isoDay();
  const start = historyStart();
  const url = npmRangeUrl(item.package, start, end);
  const range = await fetchJson<NpmRange>(url, { timeoutMs: 10_000 });
  if (!range.ok) return { error: range.error, item };
  const daily = dailyFromNpm(range.data);
  const packed = toPackage(item, daily, { sourceUrl: url });
  if (!packed) return { error: "no npm daily rows", item };
  const week = daily.slice(-7).reduce((sum, row) => sum + row.downloads, 0);
  packed.lastWeek = week;
  packed.lastMonth = packed.windowDownloads;
  return { packed, retrievedAt: range.retrievedAt };
}

function snapshotAsReport(): DownloadsReport {
  return {
    live: false,
    retrievedAt: snapshot.retrievedAt,
    retrievedDay: snapshot.retrievedDay,
    pypi: snapshot.pypi as PackageDownloads[],
    npm: snapshot.npm as PackageDownloads[],
    failures: [],
    sources: snapshot.sources,
  };
}

export function weeklyBlocks(daily: { date: string; downloads: number }[]) {
  const rows = [...daily]
    .filter((row) => row.date && Number.isFinite(row.downloads) && row.downloads >= 0)
    .sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map<string, number>();
  for (const row of rows) byDate.set(row.date, row.downloads);
  const dates = [...byDate.keys()].sort();
  while (dates.length && byDate.get(dates[dates.length - 1]) === 0) dates.pop();
  const complete = dates.map((date) => ({ date, downloads: byDate.get(date) ?? 0 }));
  const blocks: { start: string; end: string; downloads: number }[] = [];
  for (let end = complete.length; end >= 7; end -= 7) {
    const slice = complete.slice(end - 7, end);
    blocks.push({
      start: slice[0].date,
      end: slice[slice.length - 1].date,
      downloads: slice.reduce((sum, row) => sum + row.downloads, 0),
    });
  }
  blocks.reverse();
  return blocks;
}

export function fetchTrackedPackage(item: TrackedPackage) {
  return item.registry === "pypi" ? loadPypi(item) : loadNpm(item);
}

async function loadDownloadsReport(): Promise<DownloadsReport> {
  const fallback = snapshotAsReport();
  try {
    const [pypiResults, npmResults] = await Promise.all([
      Promise.all(PYPI_PACKAGES.map((item) => loadPypi(item))),
      Promise.all(NPM_PACKAGES.map((item) => loadNpm(item))),
    ]);
    const pypi: PackageDownloads[] = [];
    const npm: PackageDownloads[] = [];
    const failures: DownloadsReport["failures"] = [];
    const retrieved: string[] = [];

    for (const result of pypiResults) {
      if ("packed" in result && result.packed) {
        pypi.push(result.packed);
        retrieved.push(result.retrievedAt);
      } else if ("error" in result) {
        failures.push({ package: result.item.package, registry: "pypi", error: result.error });
      }
    }
    for (const result of npmResults) {
      if ("packed" in result && result.packed) {
        npm.push(result.packed);
        retrieved.push(result.retrievedAt);
      } else if ("error" in result) {
        failures.push({ package: result.item.package, registry: "npm", error: result.error });
      }
    }

    if (!pypi.length && !npm.length) return fallback;

    const retrievedAt = retrieved.sort().at(-1) ?? new Date().toISOString();
    return {
      live: true,
      retrievedAt,
      retrievedDay: isoDay(retrievedAt),
      pypi: pypi.sort((a, b) => b.windowDownloads - a.windowDownloads || a.package.localeCompare(b.package)),
      npm: npm.sort((a, b) => b.windowDownloads - a.windowDownloads || a.package.localeCompare(b.package)),
      failures,
      sources: [
        { title: "pypistats overall, without_mirrors", url: "https://pypistats.org/api/packages/langchain/overall?mirrors=false" },
        { title: "pypistats recent", url: "https://pypistats.org/api/packages/langchain/recent" },
        { title: "npm download counts", url: "https://api.npmjs.org/downloads/range/last-month/@mastra/core" },
        { title: "npm download-counts documentation", url: "https://github.com/npm/registry/blob/master/docs/download-counts.md" },
      ],
    };
  } catch {
    return fallback;
  }
}

export const getDownloadsReport = cache(loadDownloadsReport);

export function downloadsColumns(): SortableColumn[] {
  return [
    { key: "name", label: "Framework" },
    { key: "package", label: "Package" },
    { key: "window", label: "30-day downloads", numeric: true },
    { key: "week", label: "7-day", numeric: true },
    { key: "day", label: "Last day", numeric: true },
    { key: "repo", label: "Repository" },
  ];
}

export function downloadsRows(rows: PackageDownloads[]): SortableRow[] {
  return rows.map((row) => ({
    id: `${row.registry}:${row.package}`,
    sort: {
      name: row.name,
      package: row.package,
      window: row.windowDownloads,
      week: row.lastWeek,
      day: row.lastDay,
      repo: row.repo,
    },
    display: {
      name: row.name,
      package: row.package,
      window: integer(row.windowDownloads),
      week: row.lastWeek == null ? "—" : integer(row.lastWeek),
      day: row.lastDay == null ? "—" : integer(row.lastDay),
      repo: row.repo,
    },
    href: {
      name: row.directory ? `/directory/${row.directory}` : `https://github.com/${row.repo}`,
      package: row.sourceUrl,
      repo: `https://github.com/${row.repo}`,
    },
  }));
}

export function topPackage(rows: PackageDownloads[]) {
  return [...rows].sort((a, b) => b.windowDownloads - a.windowDownloads || a.package.localeCompare(b.package))[0];
}

export function windowLabel(rows: PackageDownloads[]) {
  const start = rows.map((row) => row.windowStart).sort()[0];
  const end = rows.map((row) => row.windowEnd).sort().at(-1);
  if (!start || !end) return null;
  return { start, end, startLabel: shortDate(start), endLabel: shortDate(end) };
}

export function downloadsFaq(report: DownloadsReport) {
  const pypiTop = topPackage(report.pypi);
  const npmTop = topPackage(report.npm);
  const window = windowLabel(report.pypi);
  const liveNote = report.live
    ? `Fetched ${shortDate(report.retrievedAt)}.`
    : `Live fetch missed; this page is showing the snapshot from ${shortDate(report.retrievedAt)}.`;
  const pypiLead =
    pypiTop && window
      ? `${pypiTop.package} is the most downloaded package in this PyPI set: ${integer(pypiTop.windowDownloads)} downloads from ${window.startLabel} through ${window.endLabel}, without mirrors.`
      : "The PyPI table is empty on this pass because the registry did not return usable rows.";
  const npmLead =
    npmTop && window
      ? `On npm, ${npmTop.package} has ${integer(npmTop.windowDownloads)} downloads over the same complete days. That is a separate registry.`
      : "The npm table is empty on this pass because the registry did not return usable rows.";
  return [
    {
      question: "Which AI agent framework is most downloaded?",
      answer: `${pypiLead} npm is a separate registry and is not added to that count. ${liveNote} A download is a file request, including CI and dependency installs.`,
    },
    {
      question: "What do the npm packages show?",
      answer: npmLead,
    },
    {
      question: "Is a download a user?",
      answer:
        "No. PyPI’s without_mirrors series and npm’s download counts count package-file requests. CI, mirrors the filter still misses, and one project installing a dependency all land in the same number. Do not add a PyPI total to an npm total.",
    },
    {
      question: "Where do the AI agent framework download numbers come from?",
      answer:
        "Python rows sum daily without_mirrors counts from pypistats.org/api/packages/{name}/overall?mirrors=false. JavaScript rows use api.npmjs.org/downloads/range. Trailing days that still read zero are dropped before the 30-day window. Nothing in the table is estimated.",
    },
    {
      question: "How often is the downloads tracker updated?",
      answer:
        "The page revalidates about once a day. pypistats and npm often lag by one calendar day, so the latest complete day is the last non-zero row, not necessarily today.",
    },
  ];
}

export function downloadsTakeaways(report: DownloadsReport) {
  const pypiTop = topPackage(report.pypi);
  const npmTop = topPackage(report.npm);
  const window = windowLabel([...report.pypi, ...report.npm]);
  const lines: string[] = [];
  if (!report.live) {
    lines.push(`Live registry fetch missed. Figures below are the last successful snapshot, dated ${shortDate(report.retrievedAt)}.`);
  } else {
    lines.push(`Fetched from pypistats and npm on ${shortDate(report.retrievedAt)}.`);
  }
  if (pypiTop && window) {
    lines.push(
      `${pypiTop.package} leads this PyPI set with ${integer(pypiTop.windowDownloads)} downloads from ${window.start} through ${window.end}.`,
    );
  }
  if (npmTop) {
    lines.push(`${npmTop.package} leads this npm set with ${integer(npmTop.windowDownloads)} downloads in the same complete window.`);
  }
  lines.push("A download is a file request. These two registries are not one ranking.");
  return lines;
}

export function chartSeries(rows: PackageDownloads[], limit = 5) {
  return [...rows]
    .sort((a, b) => b.windowDownloads - a.windowDownloads)
    .slice(0, limit)
    .map((row) => ({
      id: row.package,
      label: row.package,
      points: row.daily.map((point) => ({ date: point.date, value: point.downloads })),
    }));
}
