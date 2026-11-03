type Bucket = { timestamps: number[] };

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;

export function takeRateLimit(key: string, now = Date.now()) {
  if (buckets.size > 5000) {
    for (const [id, bucket] of buckets) {
      bucket.timestamps = bucket.timestamps.filter((stamp) => now - stamp < WINDOW_MS);
      if (!bucket.timestamps.length) buckets.delete(id);
    }
  }

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((stamp) => now - stamp < WINDOW_MS);
  if (bucket.timestamps.length >= MAX_HITS) {
    buckets.set(key, bucket);
    const retryAfterSec = Math.max(1, Math.ceil((WINDOW_MS - (now - bucket.timestamps[0])) / 1000));
    return { ok: false as const, retryAfterSec };
  }
  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { ok: true as const };
}

export function clearRateLimits() {
  buckets.clear();
}
