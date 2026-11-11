import history from "@/data/trackers/stars-history.json";

export type StarPoint = {
  date: string;
  stars: number;
  retrievedAt: string;
};

type Series = {
  id: string;
  name: string;
  repo: string;
  points: StarPoint[];
};

const file = history as {
  source: string;
  series: Series[];
};

export const starHistorySource = file.source;

export const STAR_HISTORY_TARGET_DAYS = 30;

export function storedStarPoints(id: string): StarPoint[] {
  const series = file.series.find((item) => item.id === id);
  if (!series) return [];
  return series.points
    .filter((point) => /^\d{4}-\d{2}-\d{2}$/.test(point.date) && Number.isFinite(point.stars) && point.stars >= 0)
    .map((point) => ({
      date: point.date,
      stars: point.stars,
      retrievedAt: point.retrievedAt,
    }))
    .sort((a, b) => a.date.localeCompare(b.date) || a.retrievedAt.localeCompare(b.retrievedAt));
}

/** One point per UTC day. A same-day live read replaces the stored point. Missing days stay missing. */
export function withLiveStarPoint(points: StarPoint[], live: StarPoint | null): StarPoint[] {
  if (!live || !/^\d{4}-\d{2}-\d{2}$/.test(live.date) || !Number.isFinite(live.stars)) return points;
  const rest = points.filter((point) => point.date !== live.date);
  return [...rest, live].sort((a, b) => a.date.localeCompare(b.date));
}

export function recentStarPoints(points: StarPoint[]) {
  if (points.length <= STAR_HISTORY_TARGET_DAYS) return points;
  return points.slice(-STAR_HISTORY_TARGET_DAYS);
}
