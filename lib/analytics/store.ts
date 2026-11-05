export const VISIT_GOAL = 5000;
export const LIVE_WINDOW_MS = 30 * 60 * 1000;
const RETENTION_SECONDS = 60 * 60 * 24 * 120;

export type RedisCommand = (string | number)[];

type RedisConfig = {
  url: string;
  token: string;
};

/**
 * Upstash Redis REST, including the Vercel KV REST variables.
 * No TCP client, so the same code runs in the edge collect route and in proxy.
 */
export function redisConfig(): RedisConfig | null {
  const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "").trim();
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "").trim();
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

export function analyticsConfigured() {
  return redisConfig() !== null;
}

export function dayKey(day: string, part: string) {
  return `aai:d:${day}:${part}`;
}

export function withTtl(commands: RedisCommand[], key: string, seen: Set<string>) {
  if (seen.has(key)) return;
  seen.add(key);
  commands.push(["EXPIRE", key, RETENTION_SECONDS]);
}

export async function redisPipeline(commands: RedisCommand[]) {
  const config = redisConfig();
  if (!config || commands.length === 0) return [];
  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands.map((command) => command.map((part) => String(part)))),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`analytics store responded ${response.status}`);
  }
  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) throw new Error("analytics store returned an unexpected payload");
  return data.map((row) => {
    if (row && typeof row === "object" && "error" in row && row.error) {
      throw new Error("analytics store command failed");
    }
    if (row && typeof row === "object" && "result" in row) return row.result;
    return row;
  });
}
