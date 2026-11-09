export const TRACKER_REVALIDATE_SECONDS = 86_400;
export const TRACKER_USER_AGENT =
  "AIAgentsInfo/1.0 (+https://www.aiagentsinfo.com; hello@aiagentsinfo.com)";

export type FetchOk<T> = {
  ok: true;
  data: T;
  retrievedAt: string;
  url: string;
  status: number;
};

export type FetchErr = {
  ok: false;
  error: string;
  url: string;
  status?: number;
};

export type FetchResult<T> = FetchOk<T> | FetchErr;

function nowIso() {
  return new Date().toISOString();
}

export async function fetchJson<T>(
  url: string,
  options?: {
    headers?: Record<string, string>;
    timeoutMs?: number;
    revalidate?: number | false;
  },
): Promise<FetchResult<T>> {
  const retrievedAt = nowIso();
  try {
    const init: RequestInit & { next?: { revalidate: number } } = {
      headers: {
        Accept: "application/json",
        "User-Agent": TRACKER_USER_AGENT,
        ...options?.headers,
      },
      signal: AbortSignal.timeout(options?.timeoutMs ?? 8_000),
    };
    if (options?.revalidate !== false) {
      init.cache = "force-cache";
      init.next = { revalidate: options?.revalidate ?? TRACKER_REVALIDATE_SECONDS };
    }
    const response = await fetch(url, init);
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}`, url, status: response.status };
    }
    return {
      ok: true,
      data: (await response.json()) as T,
      retrievedAt,
      url,
      status: response.status,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "network error",
      url,
    };
  }
}

export async function fetchText(
  url: string,
  options?: { headers?: Record<string, string>; timeoutMs?: number },
): Promise<FetchResult<string>> {
  const retrievedAt = nowIso();
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": TRACKER_USER_AGENT,
        ...options?.headers,
      },
      signal: AbortSignal.timeout(options?.timeoutMs ?? 8_000),
      cache: "force-cache",
      next: { revalidate: TRACKER_REVALIDATE_SECONDS },
    });
    if (!response.ok) {
      return { ok: false, error: `HTTP ${response.status}`, url, status: response.status };
    }
    return {
      ok: true,
      data: await response.text(),
      retrievedAt,
      url,
      status: response.status,
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "network error",
      url,
    };
  }
}

export function githubToken() {
  return (
    process.env.GITHUB_TOKEN?.trim() ||
    process.env.GH_TOKEN?.trim() ||
    process.env.GITHUB_SUBMISSIONS_TOKEN?.trim() ||
    ""
  );
}

export function githubAuthHeaders(): Record<string, string> {
  const token = githubToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export function isoDay(value: string | Date = new Date()) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-${day}`;
}

export function integer(value: number) {
  return value.toLocaleString("en-US");
}

export function shortDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value.slice(0, 10);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
