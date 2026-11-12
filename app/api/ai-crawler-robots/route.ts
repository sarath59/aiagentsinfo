import { evaluateRobots, type FileKind } from "@/lib/robots/evaluate";
import { FetchError, fetchLlms, fetchPublicText, robotsUrlFromInput } from "@/lib/robots/fetch-robots";
import { normalizeCheckedPath } from "@/lib/robots/parse";
import { takeRobotsCheckLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 20_000;
const PREVIEW_CHARS = 12_000;

function json(body: unknown, status = 200, extra?: Record<string, string>) {
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

function kindFor(status: number, html: boolean): FileKind {
  if (status === 404 || status === 410) return "missing";
  if (status >= 400 && status < 500) return "refused";
  if (status >= 500) return "unreachable";
  if (status >= 200 && status < 300) return html ? "not-robots" : "parsed";
  return "unreachable";
}

function llmsState(status: number | null): "present" | "missing" | "error" {
  if (status === null) return "error";
  if (status >= 200 && status < 300) return "present";
  if (status === 404 || status === 410) return "missing";
  return "error";
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Open this page on the site and try again." }, 403);
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return json({ error: "Send the form as JSON." }, 415);

  const limit = takeRobotsCheckLimit(`robots-check:${clientIp(request)}`);
  if (!limit.ok) {
    return json(
      { error: "Too many checks from this network. Wait a few minutes and try again." },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return json({ error: "The request could not be read." }, 400);
  }
  if (raw.length > MAX_BODY) return json({ error: "That request is too long." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "The request was not valid JSON." }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "The request was not valid JSON." }, 400);
  const target = "target" in body ? body.target : "";
  const pathValue = "path" in body ? body.path : "";
  if (typeof target !== "string" || typeof pathValue !== "string") {
    return json({ error: "Enter a domain, and a path if you want one." }, 400);
  }

  const path = normalizeCheckedPath(pathValue || "/");
  if (!path) return json({ error: "Enter a path that starts with /, or leave it blank to check the homepage." }, 400);
  const paths = path === "/" ? ["/"] : ["/", path];

  let robotsUrl: URL;
  try {
    robotsUrl = robotsUrlFromInput(target);
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "That URL could not be checked.";
    return json({ error: message }, 400);
  }

  try {
    const llmsUrl = new URL("/llms.txt", robotsUrl);
    const [robots, llms] = await Promise.all([fetchPublicText(robotsUrl, "GET"), fetchLlms(llmsUrl)]);
    const kind = kindFor(robots.status, robots.html);
    const text = kind === "parsed" ? robots.body : "";
    const evaluation = evaluateRobots(text, paths, kind);
    const preview = robots.body.slice(0, PREVIEW_CHARS);
    return json({
      evaluation,
      fetch: {
        requestedUrl: robotsUrl.toString(),
        finalUrl: robots.finalUrl,
        status: robots.status,
        redirects: robots.redirects,
        truncated: robots.truncated,
        contentType: robots.contentType,
        preview,
        previewTrimmed: robots.body.length > preview.length,
        llms: {
          status: llms?.status ?? null,
          state: llmsState(llms?.status ?? null),
          finalUrl: llms?.finalUrl ?? llmsUrl.toString(),
        },
      },
    });
  } catch (error) {
    const message = error instanceof FetchError ? error.message : "The site could not be checked.";
    return json({ error: message }, 400);
  }
}
