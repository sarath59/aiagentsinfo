import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { takeReportLeadLimit } from "@/lib/rate-limit";
import { reportCsvHref, reportPdfHref } from "@/lib/report-download-links";
import { REPORT_DOWNLOAD_TTL_MS, reportDownloadSecret, signReportDownload } from "@/lib/report-download-token";
import {
  mergeUtm,
  reportLeadHoneypotTripped,
  utmFromUrl,
  validateReportLead,
  type ReportLead,
} from "@/lib/report-lead-fields";
import { reportSlugFromPath } from "@/lib/report-lead-options";
import { leadStore } from "@/lib/report-lead-store";
import { isDownloadableReport, reportCsvMenu } from "@/lib/report-downloads";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const MAX_BODY = 20_000;
const unavailable = () =>
  `We can't issue this download right now. The report stays on this page. Email ${site.email} if you need the file sent to you.`;

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return json({ ok: false, message: "Use the form on the report page." }, 403);
  }

  const declared = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declared) && declared > MAX_BODY) {
    return json({ ok: false, message: "That form is too large." }, 413);
  }
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return json({ ok: false, message: "Send the form as JSON." }, 415);
  }

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ ok: false, message: "That form is too large." }, 413);

  let payload: unknown;
  try {
    payload = JSON.parse(text);
  } catch {
    return json({ ok: false, message: "The form could not be read.", errors: { fullName: "The form could not be read." } }, 400);
  }

  const limit = await limited(clientIp(request));
  if (!limit.ok) {
    return json(
      { ok: false, message: "Too many download requests from this network. Wait a few minutes and try again." },
      429,
      { "Retry-After": String(limit.retryAfterSec) },
    );
  }

  if (reportLeadHoneypotTripped(payload)) {
    return json({ ok: true, leadId: "", expiresInMinutes: REPORT_DOWNLOAD_TTL_MS / 60_000, downloads: [] }, 200);
  }

  const validated = validateReportLead(payload);
  if (!validated.ok) {
    return json({ ok: false, message: "Check the highlighted fields.", errors: validated.errors }, 400);
  }

  const pageUrl = sameSiteUrl(isRecord(payload) ? payload.pageUrl : "", request);
  const refererUrl = sameSiteUrl(request.headers.get("referer") || "", request);
  const pageSlug = reportSlugFromPath(pageUrl?.pathname) || reportSlugFromPath(refererUrl?.pathname);
  if (!pageSlug || pageSlug !== validated.value.reportSlug || !isDownloadableReport(pageSlug)) {
    return json(
      { ok: false, message: "Open the report and use the form on that page.", errors: { reportSlug: "Open the report and use the form on that page." } },
      400,
    );
  }

  const store = leadStore();
  if (!store || !reportDownloadSecret()) {
    return json({ ok: false, message: unavailable() }, 503);
  }

  const utm = mergeUtm(utmFromUrl(refererUrl?.toString() || ""), utmFromUrl(pageUrl?.toString() || ""));
  const lead: ReportLead = {
    ...validated.value,
    id: randomUUID(),
    submittedAt: new Date().toISOString(),
    referrer: clip(refererUrl?.toString() || pageUrl?.toString() || "", 500),
    ...utm,
    userAgent: clip(request.headers.get("user-agent") || "", 400),
    countryHeader: countryHeader(request),
  };

  try {
    await store.save(lead);
  } catch (error) {
    console.error("[report-lead] save failed", error instanceof Error ? error.name : "error");
    return json({ ok: false, message: unavailable() }, 503);
  }

  const token = signReportDownload(lead.reportSlug, lead.id);
  if (!token) return json({ ok: false, message: unavailable() }, 503);

  const downloads = [
    { label: "Download PDF", href: reportPdfHref(lead.reportSlug, token) },
    ...reportCsvMenu(lead.reportSlug).map((item) => ({
      label: item.label,
      href: reportCsvHref(lead.reportSlug, token, item.table),
    })),
  ];

  return json(
    {
      ok: true,
      leadId: lead.id,
      expiresInMinutes: REPORT_DOWNLOAD_TTL_MS / 60_000,
      downloads,
    },
    200,
  );
}

async function limited(ip: string) {
  const memory = takeReportLeadLimit(`report-lead:${ip}`);
  if (!memory.ok) return memory;
  const remote = await redisLimit(ip);
  if (remote && !remote.ok) return remote;
  return { ok: true as const };
}

async function redisLimit(ip: string) {
  const url = process.env.KV_REST_API_URL?.trim() || process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.KV_REST_API_TOKEN?.trim() || process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  const key = `aai:report-lead-rl:${createHash("sha256").update(ip).digest("hex").slice(0, 24)}`;
  try {
    const count = await redisCommand(url, token, ["INCR", key]);
    const hits = typeof count === "number" ? count : Number(count);
    if (hits === 1) await redisCommand(url, token, ["EXPIRE", key, 15 * 60]);
    if (!Number.isFinite(hits) || hits <= 8) return { ok: true as const };
    const ttl = await redisCommand(url, token, ["TTL", key]);
    const retryAfterSec = Math.max(1, typeof ttl === "number" && ttl > 0 ? ttl : 60);
    return { ok: false as const, retryAfterSec };
  } catch {
    return null;
  }
}

async function redisCommand(url: string, token: string, command: (string | number)[]) {
  const response = await fetch(url.replace(/\/$/, ""), {
    method: "POST",
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(4000),
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error("rate limit store");
  const data = (await response.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error("rate limit store");
  return data.result;
}

function json(body: unknown, status: number, extra?: Record<string, string>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "private, no-store", ...extra },
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
  return Boolean(sameSiteUrl(source, request));
}

function sameSiteUrl(value: unknown, request: Request) {
  if (typeof value !== "string" || !value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const requestHost = (request.headers.get("x-forwarded-host") || request.headers.get("host") || "")
    .split(",")[0]
    .trim()
    .toLowerCase();
  const allowed = new Set([requestHost, "www.aiagentsinfo.com", "aiagentsinfo.com", "localhost:3000", "127.0.0.1:3000"]);
  if (!allowed.has(url.host.toLowerCase())) return null;
  return url;
}

function countryHeader(request: Request) {
  const value = (request.headers.get("x-vercel-ip-country") || "").trim().toUpperCase();
  return /^[A-Z]{2}$/.test(value) ? value : "";
}

function clip(value: string, max: number) {
  return value.trim().slice(0, max);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
