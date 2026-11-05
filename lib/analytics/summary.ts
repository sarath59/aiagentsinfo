import type { AgentKind } from "@/lib/analytics/classify";
import { recentDays, utcDay } from "@/lib/analytics/sanitize";
import { LIVE_WINDOW_MS, VISIT_GOAL, analyticsConfigured, dayKey, redisPipeline } from "@/lib/analytics/store";

export type Rank = { label: string; count: number };

export type AnalyticsSummary = {
  ok: true;
  generatedAt: string;
  timezone: "UTC";
  storage: "upstash" | "unconfigured";
  visitGoal: number;
  windowDays: number;
  env: {
    storage: boolean;
    adminKey: boolean;
    ipSalt: boolean;
    storageVars: string[];
    notes: string[];
  };
  today: {
    day: string;
    visitors: number;
    pageviews: number;
    sessions: number;
    visits: number;
    visitProgress: number;
    newsletter: number;
    networks: number;
  };
  days: { day: string; visitors: number; pageviews: number; sessions: number }[];
  topPages: {
    path: string;
    pageviews: number;
    avgEngagedMs: number;
    avgScrollDepth: number;
    scrollSamples: number;
  }[];
  exits: { path: string; section: string; count: number }[];
  countries: { code: string; name: string; count: number }[];
  cities: Rank[];
  devices: Rank[];
  browsers: Rank[];
  operatingSystems: Rank[];
  screens: Rank[];
  languages: Rank[];
  referrers: Rank[];
  utm: { source: string; medium: string; campaign: string; term: string; content: string; count: number }[];
  botHuman: Record<AgentKind, number> & { total: number };
  bots: { kind: AgentKind; name: string; count: number }[];
  aiByUrl: { kind: AgentKind; bot: string; path: string; count: number }[];
  aiReferrals: Rank[];
  aiReferralUrls: { source: string; path: string; count: number }[];
  outbound: Rank[];
  downloads: Rank[];
  scrollMilestones: { depth: number; count: number }[];
  live: {
    windowMinutes: number;
    visitors: number;
    rows: { path: string; country: string; city: string; device: string; browser: string; seenAgoSec: number }[];
  };
};

const STRIDE = 27;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

export async function loadSummary(requestedDays = 14, now = new Date()): Promise<AnalyticsSummary> {
  const windowDays = Math.min(30, Math.max(1, Math.round(requestedDays) || 14));
  const days = recentDays(windowDays, now);
  const base = emptySummary(days, now);
  if (dayCommands("2000-01-01").length !== STRIDE) throw new Error("analytics day stride drifted");
  if (!analyticsConfigured()) return base;

  const commands = days.flatMap((day) => dayCommands(day));
  const cutoff = now.getTime() - LIVE_WINDOW_MS;
  commands.push(["ZRANGEBYSCORE", "aai:live", String(cutoff), "+inf", "WITHSCORES"]);
  commands.push(["HGETALL", "aai:live:meta"]);
  const results = await redisPipeline(commands);

  const pages = new Map<string, number>();
  const engage = new Map<string, number>();
  const scsum = new Map<string, number>();
  const scn = new Map<string, number>();
  const exits = new Map<string, number>();
  const countries = new Map<string, number>();
  const cities = new Map<string, number>();
  const devices = new Map<string, number>();
  const browsers = new Map<string, number>();
  const os = new Map<string, number>();
  const screens = new Map<string, number>();
  const languages = new Map<string, number>();
  const referrers = new Map<string, number>();
  const utm = new Map<string, number>();
  const bots = new Map<string, number>();
  const aiByUrl = new Map<string, number>();
  const aiReferrals = new Map<string, number>();
  const aiReferralUrls = new Map<string, number>();
  const outbound = new Map<string, number>();
  const downloads = new Map<string, number>();
  const funnel = new Map<string, number>();
  const classes: Record<AgentKind, number> = {
    human: 0,
    search: 0,
    ai_training: 0,
    ai_search: 0,
    ai_user: 0,
    bot: 0,
  };

  days.forEach((day, index) => {
    const at = index * STRIDE;
    const pageviews = num(results[at]);
    const visitors = num(results[at + 1]);
    const sessions = num(results[at + 2]);
    base.days[index] = { day, visitors, pageviews, sessions };
    if (index === 0) {
      base.today = {
        day,
        visitors,
        pageviews,
        sessions,
        visits: sessions,
        visitProgress: Math.min(1, sessions / VISIT_GOAL),
        newsletter: num(results[at + 4]),
        networks: num(results[at + 3]),
      };
    }
    addHash(classesFrom(results[at + 5]), classes);
    addPairs(pages, pairs(results[at + 6]));
    addHashMap(engage, hashMap(results[at + 7]));
    addHashMap(scsum, hashMap(results[at + 8]));
    addHashMap(scn, hashMap(results[at + 9]));
    addPairs(exits, pairs(results[at + 10]));
    addPairs(countries, pairs(results[at + 11]));
    addPairs(cities, pairs(results[at + 12]));
    addPairs(devices, pairs(results[at + 13]));
    addPairs(browsers, pairs(results[at + 14]));
    addPairs(os, pairs(results[at + 15]));
    addPairs(screens, pairs(results[at + 16]));
    addPairs(languages, pairs(results[at + 17]));
    addPairs(referrers, pairs(results[at + 18]));
    addPairs(utm, pairs(results[at + 19]));
    addPairs(bots, pairs(results[at + 20]));
    addPairs(aiByUrl, pairs(results[at + 21]));
    addPairs(aiReferrals, pairs(results[at + 22]));
    addPairs(aiReferralUrls, pairs(results[at + 23]));
    addPairs(outbound, pairs(results[at + 24]));
    addPairs(downloads, pairs(results[at + 25]));
    addPairs(funnel, pairs(results[at + 26]));
  });

  base.storage = "upstash";
  base.topPages = top(pages, 20).map(([path, pageviews]) => {
    const samples = scn.get(path) || 0;
    return {
      path,
      pageviews,
      avgEngagedMs: pageviews ? Math.round((engage.get(path) || 0) / pageviews) : 0,
      avgScrollDepth: samples ? Math.round((scsum.get(path) || 0) / samples) : 0,
      scrollSamples: samples,
    };
  });
  base.exits = top(exits, 20).map(([member, count]) => {
    const [path, section] = split2(member);
    return { path, section: section || "(no heading in view)", count };
  });
  base.countries = top(countries, 20).map(([code, count]) => ({
    code,
    name: countryName(code),
    count,
  }));
  base.cities = ranks(cities, 20);
  base.devices = ranks(devices, 8);
  base.browsers = ranks(browsers, 10);
  base.operatingSystems = ranks(os, 10);
  base.screens = ranks(screens, 8);
  base.languages = ranks(languages, 8);
  base.referrers = ranks(referrers, 20);
  base.utm = top(utm, 20).map(([member, count]) => {
    const [source, medium, campaign, term, content] = member.split("\t");
    return {
      source: blank(source),
      medium: blank(medium),
      campaign: blank(campaign),
      term: blank(term),
      content: blank(content),
      count,
    };
  });
  const total = Object.values(classes).reduce((sum, value) => sum + value, 0);
  base.botHuman = { ...classes, total };
  base.bots = top(bots, 30).map(([member, count]) => {
    const [kind, name] = split2(member);
    return { kind: asKind(kind), name, count };
  });
  base.aiByUrl = top(aiByUrl, 30).map(([member, count]) => {
    const [kind, bot, path] = split3(member);
    return { kind: asKind(kind), bot, path, count };
  });
  base.aiReferrals = ranks(aiReferrals, 8);
  base.aiReferralUrls = top(aiReferralUrls, 20).map(([member, count]) => {
    const [source, path] = split2(member);
    return { source, path, count };
  });
  base.outbound = ranks(outbound, 15);
  base.downloads = ranks(downloads, 15);
  base.scrollMilestones = [25, 50, 75, 100].map((depth) => ({
    depth,
    count: funnel.get(String(depth)) || 0,
  }));

  const liveAt = days.length * STRIDE;
  const livePairs = pairs(results[liveAt]).filter(([, seen]) => seen >= cutoff);
  const meta = hashStrings(results[liveAt + 1]);
  const rows = livePairs
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .map(([vid, seen]) => {
      const row = parseLive(meta[vid]);
      return {
        path: row.path || "/",
        country: row.country || "",
        city: row.city || "",
        device: row.device || "",
        browser: row.browser || "",
        seenAgoSec: Math.max(0, Math.round((now.getTime() - seen) / 1000)),
      };
    });
  base.live = { windowMinutes: 30, visitors: livePairs.length, rows };
  return base;
}

function dayCommands(day: string) {
  const k = (part: string) => dayKey(day, part);
  return [
    ["GET", k("pv")],
    ["PFCOUNT", k("vis")],
    ["PFCOUNT", k("ses")],
    ["PFCOUNT", k("ip")],
    ["GET", k("news")],
    ["HGETALL", k("class")],
    ["ZREVRANGE", k("pages"), "0", "40", "WITHSCORES"],
    ["HGETALL", k("engage")],
    ["HGETALL", k("scsum")],
    ["HGETALL", k("scn")],
    ["ZREVRANGE", k("exits"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("country"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("city"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("device"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("browser"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("os"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("screen"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("lang"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("ref"), "0", "24", "WITHSCORES"],
    ["ZREVRANGE", k("utm"), "0", "24", "WITHSCORES"],
    ["ZREVRANGE", k("bots"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("aiurl"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("airef"), "0", "12", "WITHSCORES"],
    ["ZREVRANGE", k("airefpath"), "0", "40", "WITHSCORES"],
    ["ZREVRANGE", k("out"), "0", "24", "WITHSCORES"],
    ["ZREVRANGE", k("pdf"), "0", "24", "WITHSCORES"],
    ["ZREVRANGE", k("funnel"), "0", "4", "WITHSCORES"],
  ];
}

function emptySummary(days: string[], now: Date): AnalyticsSummary {
  const storage = analyticsConfigured();
  const adminKey = Boolean(process.env.ANALYTICS_ADMIN_KEY?.trim());
  const ipSalt = Boolean(process.env.ANALYTICS_IP_SALT?.trim());
  const notes: string[] = [];
  if (!storage) {
    notes.push("Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. Vercel KV's KV_REST_API_URL and KV_REST_API_TOKEN are read as well.");
  }
  if (!ipSalt) notes.push("Set ANALYTICS_IP_SALT so unique networks can be counted. Raw IP addresses are never stored.");
  if (!adminKey) notes.push("Set ANALYTICS_ADMIN_KEY to open this dashboard and the summary endpoint.");
  return {
    ok: true,
    generatedAt: now.toISOString(),
    timezone: "UTC",
    storage: storage ? "upstash" : "unconfigured",
    visitGoal: VISIT_GOAL,
    windowDays: days.length,
    env: {
      storage,
      adminKey,
      ipSalt,
      storageVars: ["UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN"],
      notes,
    },
    today: {
      day: days[0] || utcDay(now),
      visitors: 0,
      pageviews: 0,
      sessions: 0,
      visits: 0,
      visitProgress: 0,
      newsletter: 0,
      networks: 0,
    },
    days: days.map((day) => ({ day, visitors: 0, pageviews: 0, sessions: 0 })),
    topPages: [],
    exits: [],
    countries: [],
    cities: [],
    devices: [],
    browsers: [],
    operatingSystems: [],
    screens: [],
    languages: [],
    referrers: [],
    utm: [],
    botHuman: { human: 0, search: 0, ai_training: 0, ai_search: 0, ai_user: 0, bot: 0, total: 0 },
    bots: [],
    aiByUrl: [],
    aiReferrals: [],
    aiReferralUrls: [],
    outbound: [],
    downloads: [],
    scrollMilestones: [25, 50, 75, 100].map((depth) => ({ depth, count: 0 })),
    live: { windowMinutes: 30, visitors: 0, rows: [] },
  };
}

function pairs(value: unknown): [string, number][] {
  if (!Array.isArray(value)) return [];
  const out: [string, number][] = [];
  for (let i = 0; i < value.length - 1; i += 2) {
    const member = value[i];
    const score = num(value[i + 1]);
    if (typeof member === "string") out.push([member, score]);
  }
  return out;
}

function hashMap(value: unknown) {
  const out: Record<string, number> = {};
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length - 1; i += 2) {
      if (typeof value[i] === "string") out[value[i]] = num(value[i + 1]);
    }
    return out;
  }
  if (!value || typeof value !== "object") return out;
  for (const [key, raw] of Object.entries(value)) out[key] = num(raw);
  return out;
}

function hashStrings(value: unknown) {
  const out: Record<string, string> = {};
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length - 1; i += 2) {
      if (typeof value[i] === "string" && typeof value[i + 1] === "string") out[value[i]] = value[i + 1];
    }
    return out;
  }
  if (!value || typeof value !== "object") return out;
  for (const [key, raw] of Object.entries(value)) if (typeof raw === "string") out[key] = raw;
  return out;
}

function classesFrom(value: unknown) {
  const raw = hashMap(value);
  return {
    human: raw.human || 0,
    search: raw.search || 0,
    ai_training: raw.ai_training || 0,
    ai_search: raw.ai_search || 0,
    ai_user: raw.ai_user || 0,
    bot: raw.bot || 0,
  };
}

function addHash(source: Record<AgentKind, number>, target: Record<AgentKind, number>) {
  (Object.keys(target) as AgentKind[]).forEach((key) => {
    target[key] += source[key] || 0;
  });
}

function addPairs(map: Map<string, number>, rows: [string, number][]) {
  for (const [member, score] of rows) map.set(member, (map.get(member) || 0) + score);
}

function addHashMap(map: Map<string, number>, rows: Record<string, number>) {
  for (const [member, score] of Object.entries(rows)) map.set(member, (map.get(member) || 0) + score);
}

function top(map: Map<string, number>, limit: number) {
  return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
}

function ranks(map: Map<string, number>, limit: number): Rank[] {
  return top(map, limit).map(([label, count]) => ({ label, count }));
}

function num(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function split2(member: string) {
  const index = member.indexOf("\t");
  if (index === -1) return [member, ""];
  return [member.slice(0, index), member.slice(index + 1)];
}

function split3(member: string) {
  const parts = member.split("\t");
  return [parts[0] || "", parts[1] || "", parts.slice(2).join("\t") || "/"];
}

function blank(value: string | undefined) {
  return !value || value === "-" ? "—" : value;
}

function asKind(value: string): AgentKind {
  if (value === "search" || value === "ai_training" || value === "ai_search" || value === "ai_user" || value === "bot" || value === "human") {
    return value;
  }
  return "bot";
}

function countryName(code: string) {
  if (!code || code === "Unknown") return "Unknown";
  try {
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

function parseLive(value: string | undefined) {
  if (!value) return {} as { path?: string; country?: string; city?: string; device?: string; browser?: string };
  try {
    const parsed = JSON.parse(value) as { path?: string; country?: string; city?: string; device?: string; browser?: string };
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
