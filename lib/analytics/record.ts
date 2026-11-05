import { aiReferralSource, classifyAgent, isAiKind, parseUserAgent } from "@/lib/analytics/classify";
import {
  cityLabel,
  cleanDepth,
  cleanId,
  cleanLanguage,
  cleanMs,
  cleanPath,
  cleanPublicUrl,
  cleanScreen,
  cleanSection,
  cleanUtm,
  clientIp,
  dailyIpHash,
  privacyOptOut,
  readGeo,
  referrerHost,
  utcDay,
  utmMember,
  type UtmParams,
} from "@/lib/analytics/sanitize";
import { LIVE_WINDOW_MS, analyticsConfigured, dayKey, redisPipeline, withTtl, type RedisCommand } from "@/lib/analytics/store";

const ASSET = /\.(?:avif|bmp|css|gif|ico|jpeg|jpg|js|map|mp3|mp4|ogg|png|svg|ttf|webm|webmanifest|webp|woff|woff2)$/i;

const hits = new Map<string, { n: number; reset: number }>();

export class BadEvent extends Error {}

type ClientEvent = {
  t: "pageview" | "engage" | "scroll" | "leave" | "outbound" | "newsletter" | "download";
  vid: string;
  sid: string;
  path: string;
  referrer?: string;
  referrerSent: boolean;
  utm: UtmParams | null;
  screen: string;
  language: string;
  ms: number;
  depth: number | null;
  section: string;
  href: string;
};

export async function recordClientEvent(request: Request, body: unknown) {
  if (privacyOptOut(request.headers)) return { stored: false };
  const event = parseClientEvent(body);
  if (!event) throw new BadEvent("invalid event");
  if (!analyticsConfigured()) return { stored: false };
  if (!allowBurst(event.vid)) return { stored: false };

  const headers = request.headers;
  const parsed = parseUserAgent(headers.get("user-agent"));
  const geo = readGeo(headers);
  const ipHash = await dailyIpHash(clientIp(headers));
  const day = utcDay();
  const commands: RedisCommand[] = [];
  const seen = new Set<string>();
  const z = (part: string, member: string, by = 1) => {
    if (!member) return;
    const key = dayKey(day, part);
    commands.push(["ZINCRBY", key, by, member]);
    withTtl(commands, key, seen);
  };
  const h = (part: string, field: string, by: number) => {
    if (!field || !by) return;
    const key = dayKey(day, part);
    commands.push(["HINCRBY", key, field, by]);
    withTtl(commands, key, seen);
  };

  if (event.t === "pageview") {
    const pv = dayKey(day, "pv");
    commands.push(["INCR", pv]);
    withTtl(commands, pv, seen);
    const vis = dayKey(day, "vis");
    commands.push(["PFADD", vis, event.vid]);
    withTtl(commands, vis, seen);
    const ses = dayKey(day, "ses");
    commands.push(["PFADD", ses, event.sid]);
    withTtl(commands, ses, seen);
    if (ipHash) {
      const ip = dayKey(day, "ip");
      commands.push(["PFADD", ip, ipHash]);
      withTtl(commands, ip, seen);
    }
    z("pages", event.path);
    z("country", geo.country || "Unknown");
    z("city", cityLabel(geo) || "Unknown");
    z("device", parsed.device);
    z("browser", parsed.browser);
    z("os", parsed.os);
    z("screen", event.screen);
    z("lang", event.language);
    if (event.referrerSent) z("ref", event.referrer || "(direct)");
    if (event.utm) z("utm", utmMember(event.utm));

    const now = Date.now();
    commands.push(["ZADD", "aai:live", now, event.vid]);
    commands.push(["ZREMRANGEBYSCORE", "aai:live", "-inf", now - LIVE_WINDOW_MS]);
    withTtl(commands, "aai:live", seen);
    const meta = JSON.stringify({
      path: event.path,
      country: geo.country,
      city: cityLabel(geo),
      device: parsed.device,
      browser: parsed.browser,
    });
    commands.push(["HSET", "aai:live:meta", event.vid, meta]);
    commands.push(["EXPIRE", "aai:live:meta", 1800]);
  } else if (event.t === "engage") {
    h("engage", event.path, event.ms);
  } else if (event.t === "scroll" && event.depth) {
    z("funnel", String(event.depth));
  } else if (event.t === "leave") {
    if (event.ms) h("engage", event.path, event.ms);
    if (event.depth !== null) {
      h("scsum", event.path, event.depth);
      h("scn", event.path, 1);
    }
    z("exits", `${event.path}\t${event.section || "(no heading in view)"}`);
  } else if (event.t === "outbound" && event.href) {
    z("out", event.href);
  } else if (event.t === "newsletter") {
    const key = dayKey(day, "news");
    commands.push(["INCR", key]);
    withTtl(commands, key, seen);
  } else if (event.t === "download" && event.href) {
    z("pdf", event.href);
  }

  if (commands.length) await redisPipeline(commands);
  return { stored: commands.length > 0 };
}

/**
 * Document requests that never need JavaScript: crawlers, agents, and humans.
 * Scheduled with waitUntil so the response is not held for storage.
 */
export async function recordServerHit(request: Request) {
  if (!analyticsConfigured()) return;
  if (request.method !== "GET" && request.method !== "HEAD") return;
  const url = new URL(request.url);
  if (skipServerLog(url.pathname, request.headers)) return;

  const ua = request.headers.get("user-agent");
  const agent = classifyAgent(ua);
  if (agent.kind === "human" && privacyOptOut(request.headers)) return;

  const day = utcDay();
  const commands: RedisCommand[] = [];
  const seen = new Set<string>();
  const z = (part: string, member: string) => {
    const key = dayKey(day, part);
    commands.push(["ZINCRBY", key, 1, member]);
    withTtl(commands, key, seen);
  };

  const classKey = dayKey(day, "class");
  commands.push(["HINCRBY", classKey, agent.kind, 1]);
  withTtl(commands, classKey, seen);

  if (agent.kind !== "human" && agent.name) {
    z("bots", `${agent.kind}\t${agent.name}`);
    if (isAiKind(agent.kind)) z("aiurl", `${agent.kind}\t${agent.name}\t${url.pathname}`);
  }

  const referral = aiReferralSource(request.headers.get("referer"));
  if (referral) {
    z("airef", referral);
    z("airefpath", `${referral}\t${url.pathname}`);
  }

  if (agent.kind !== "human") {
    const ipHash = await dailyIpHash(clientIp(request.headers));
    if (ipHash) {
      const key = dayKey(day, "ipbot");
      commands.push(["PFADD", key, ipHash]);
      withTtl(commands, key, seen);
    }
  }

  if (commands.length) await redisPipeline(commands);
}

function skipServerLog(pathname: string, headers: Headers) {
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.startsWith("/admin")) return true;
  if (ASSET.test(pathname)) return true;
  const dest = headers.get("sec-fetch-dest");
  if (dest && dest !== "document") return true;
  if (headers.get("next-router-prefetch") === "1") return true;
  if (headers.get("purpose") === "prefetch" || headers.get("sec-purpose") === "prefetch") return true;
  if (headers.get("rsc") === "1") return true;
  return false;
}

function parseClientEvent(body: unknown): ClientEvent | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const raw = body as Record<string, unknown>;
  const t = raw.t;
  if (t !== "pageview" && t !== "engage" && t !== "scroll" && t !== "leave" && t !== "outbound" && t !== "newsletter" && t !== "download") {
    return null;
  }
  const vid = cleanId(raw.vid);
  const sid = cleanId(raw.sid);
  const path = cleanPath(raw.p);
  if (!vid || !sid || !path) return null;
  const depth = cleanDepth(raw.d);
  if ((t === "scroll" || t === "leave") && depth === null) return null;
  if (t === "scroll" && depth === 0) return null;
  const href = t === "outbound" || t === "download" ? cleanPublicUrl(raw.href) : "";
  if ((t === "outbound" || t === "download") && !href) return null;
  return {
    t,
    vid,
    sid,
    path,
    referrer: referrerHost(raw.r),
    referrerSent: Object.prototype.hasOwnProperty.call(raw, "r"),
    utm: cleanUtm(raw.u),
    screen: cleanScreen(raw.w, raw.h),
    language: cleanLanguage(raw.l),
    ms: cleanMs(raw.ms),
    depth,
    section: cleanSection(raw.s),
    href: href || "",
  };
}

function allowBurst(id: string) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, bucket] of hits) {
      if (bucket.reset < now) hits.delete(key);
    }
  }
  const bucket = hits.get(id);
  if (!bucket || bucket.reset < now) {
    hits.set(id, { n: 1, reset: now + 60_000 });
    return true;
  }
  bucket.n += 1;
  return bucket.n <= 180;
}
