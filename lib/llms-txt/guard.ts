import { takeRobotsCheckLimit } from "@/lib/rate-limit";

const WINDOW_NOTE = "Too many checks from this network. Wait a few minutes and try again.";

export function toolJson(body: unknown, status = 200, extra?: Record<string, string>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function sameOrigin(request: Request) {
  const source = request.headers.get("origin") || request.headers.get("referer");
  if (!source) return true;
  let host: string;
  try {
    host = new URL(source).host.toLowerCase();
  } catch {
    return false;
  }
  const requestHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  return host === requestHost || host === "www.aiagentsinfo.com" || host === "aiagentsinfo.com";
}

/** Reads a JSON POST. Does not log the body. */
export async function readToolPost(request: Request, maxBody: number) {
  if (!sameOrigin(request)) return { ok: false as const, response: toolJson({ error: "Open this page on the site and try again." }, 403) };
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return { ok: false as const, response: toolJson({ error: "Send the form as JSON." }, 415) };
  }
  const limit = takeRobotsCheckLimit(`llms-check:${clientIp(request)}`);
  if (!limit.ok) {
    return {
      ok: false as const,
      response: toolJson({ error: WINDOW_NOTE }, 429, { "Retry-After": String(limit.retryAfterSec) }),
    };
  }
  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return { ok: false as const, response: toolJson({ error: "The request could not be read." }, 400) };
  }
  if (raw.length > maxBody) return { ok: false as const, response: toolJson({ error: "That request is too long." }, 413) };
  try {
    const body = JSON.parse(raw) as unknown;
    if (!body || typeof body !== "object") {
      return { ok: false as const, response: toolJson({ error: "The request was not valid JSON." }, 400) };
    }
    return { ok: true as const, body };
  } catch {
    return { ok: false as const, response: toolJson({ error: "The request was not valid JSON." }, 400) };
  }
}
