/**
 * First-party analytics (replaces DataFast).
 * Pageviews: SiteTracker → POST /api/analytics/collect
 * Goals: trackGoal / trackTool → same endpoint
 * Server goals: trackServerGoal → insertVisitorEvent
 * This site has no newsletter. Do not add a newsletter_signup goal.
 */

import { readVisitorIds } from "@/lib/analytics/ids";
import { aiReferrerFrom, referrerHostFromUrl } from "@/lib/analytics/ai-referrer";

const GOAL_NAME = /^[a-z0-9_:-]{1,64}$/;
const META_KEY = /^[a-z0-9_-]{1,32}$/;
const TOOL_SLUG = /^[a-z0-9_-]{1,64}$/;

export type ToolGoalName = "tool_view" | "tool_run" | "tool_output_used";
export type ToolOutputAction = "copy_result" | "copy_link" | "download";

/** tool_view on load, tool_run after a successful check, tool_output_used on copy or download. */
export function trackTool(name: ToolGoalName, toolSlug: string, action?: ToolOutputAction) {
  if (!TOOL_SLUG.test(toolSlug)) return;
  if (name === "tool_output_used") {
    if (action !== "copy_result" && action !== "copy_link" && action !== "download") return;
    trackGoal(name, { tool_slug: toolSlug, action });
    return;
  }
  trackGoal(name, { tool_slug: toolSlug });
}

function goalMetadata(metadata?: Record<string, string>) {
  if (!metadata) return undefined;
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(metadata)) {
    if (!META_KEY.test(key) || typeof value !== "string") continue;
    const clean = value.replace(/[<>'"&]/g, "").trim().slice(0, 255);
    if (!clean || clean.includes("@")) continue;
    params[key] = clean;
    if (Object.keys(params).length >= 10) break;
  }
  return Object.keys(params).length ? params : undefined;
}

export function trackGoal(name: string, metadata?: Record<string, string>) {
  if (typeof window === "undefined" || !GOAL_NAME.test(name)) return;
  if (shouldSkipClient()) return;
  const params = goalMetadata(metadata);
  void send({
    event_type: "goal",
    name,
    path: window.location.pathname,
    metadata: params,
  });
}

export function trackPageview(pathname?: string) {
  if (typeof window === "undefined") return;
  if (shouldSkipClient()) return;
  const path = pathname || window.location.pathname;
  const url = new URL(window.location.href);
  void send({
    event_type: "pageview",
    path,
    name: path,
    referrer: document.referrer || undefined,
    utm_source: url.searchParams.get("utm_source") || undefined,
    utm_medium: url.searchParams.get("utm_medium") || undefined,
    utm_campaign: url.searchParams.get("utm_campaign") || undefined,
  });
}

export function trackClick(name: string, metadata?: Record<string, string>) {
  if (typeof window === "undefined" || !GOAL_NAME.test(name)) return;
  if (shouldSkipClient()) return;
  void send({
    event_type: "click",
    name,
    path: window.location.pathname,
    metadata: goalMetadata(metadata),
  });
}

function shouldSkipClient() {
  if (typeof navigator === "undefined") return true;
  if (navigator.webdriver) return true;
  const ua = navigator.userAgent || "";
  if (/headless|playwright|puppeteer/i.test(ua)) return true;
  if (/^localhost$|^127\.0\.0\.1$/.test(window.location.hostname)) return true;
  return false;
}

async function send(partial: {
  event_type: "pageview" | "goal" | "click";
  name?: string;
  path?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  metadata?: Record<string, string>;
}) {
  const { visitorId, sessionId } = readVisitorIds();
  if (!visitorId || !sessionId) return;

  const referrer_host = referrerHostFromUrl(partial.referrer || document.referrer || null);
  const body = JSON.stringify({
    ...partial,
    visitor_id: visitorId,
    session_id: sessionId,
    referrer_host,
    ai_referrer: aiReferrerFrom({
      referrerHost: referrer_host,
      utmSource: partial.utm_source,
    }),
    ua: navigator.userAgent.slice(0, 180),
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      const ok = navigator.sendBeacon("/api/analytics/collect", new Blob([body], { type: "application/json" }));
      if (ok) return;
    }
    await fetch("/api/analytics/collect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "same-origin",
    });
  } catch {
    // Analytics must never break the page.
  }
}
