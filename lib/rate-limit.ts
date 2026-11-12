type Bucket = { timestamps: number[] };

const submitBuckets = new Map<string, Bucket>();
const promptBuckets = new Map<string, Bucket>();
const mcpBuckets = new Map<string, Bucket>();
const robotsBuckets = new Map<string, Bucket>();

const SUBMIT_WINDOW_MS = 15 * 60 * 1000;
const SUBMIT_MAX_HITS = 5;
const PROMPT_WINDOW_MS = 10 * 60 * 1000;
const PROMPT_MAX_HITS = 30;
const MCP_WINDOW_MS = 5 * 60 * 1000;
const MCP_MAX_HITS = 90;

function takeBucket(buckets: Map<string, Bucket>, key: string, now: number, windowMs: number, maxHits: number) {
  if (buckets.size > 5000) {
    for (const [id, bucket] of buckets) {
      bucket.timestamps = bucket.timestamps.filter((stamp) => now - stamp < windowMs);
      if (!bucket.timestamps.length) buckets.delete(id);
    }
  }

  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((stamp) => now - stamp < windowMs);
  if (bucket.timestamps.length >= maxHits) {
    buckets.set(key, bucket);
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - bucket.timestamps[0])) / 1000));
    return { ok: false as const, retryAfterSec };
  }
  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return { ok: true as const };
}

export function takeRateLimit(key: string, now = Date.now()) {
  return takeBucket(submitBuckets, key, now, SUBMIT_WINDOW_MS, SUBMIT_MAX_HITS);
}

export function takePromptCheckLimit(key: string, now = Date.now()) {
  return takeBucket(promptBuckets, key, now, PROMPT_WINDOW_MS, PROMPT_MAX_HITS);
}

export function takeMcpLimit(key: string, now = Date.now()) {
  return takeBucket(mcpBuckets, key, now, MCP_WINDOW_MS, MCP_MAX_HITS);
}

export function takeRobotsCheckLimit(key: string, now = Date.now()) {
  return takeBucket(robotsBuckets, key, now, PROMPT_WINDOW_MS, PROMPT_MAX_HITS);
}

export function clearRateLimits() {
  submitBuckets.clear();
  promptBuckets.clear();
  mcpBuckets.clear();
  robotsBuckets.clear();
}
