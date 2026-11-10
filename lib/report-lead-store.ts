import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ReportLead } from "@/lib/report-lead-fields";

const FILE_DIR = "/tmp/aiagentsinfo-report-leads";
const REDIS_INDEX = "aai:report-leads";
const LIST_CAP = 5000;

export type LeadStoreKind = "redis" | "webhook" | "file";

type LeadStore = {
  kind: LeadStoreKind;
  save(lead: ReportLead): Promise<void>;
  list: (() => Promise<ReportLead[]>) | null;
  delete: ((id: string) => Promise<boolean>) | null;
};

export function leadStore(): LeadStore | null {
  const redis = redisConfig();
  if (redis) return redisStore(redis);
  const webhook = webhookConfig();
  if (webhook) return webhookStore(webhook);
  if (process.env.LEADS_STORE === "file" && process.env.NODE_ENV !== "production") {
    return fileLeadStore(FILE_DIR);
  }
  return null;
}

export function leadStoreEnvHint() {
  return [
    "Set a private store before downloads can be issued:",
    "KV_REST_API_URL and KV_REST_API_TOKEN (Vercel KV / Upstash Redis REST), or",
    "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN, or",
    "LEADS_WEBHOOK_URL (https) with optional LEADS_WEBHOOK_BEARER.",
    "Also set REPORT_DOWNLOAD_SECRET (16+ characters) so download links can be signed.",
    "Set ADMIN_TOKEN (16+ characters) to export leads from GET /api/admin/report-leads.",
    "A webhook store can save leads but cannot list or delete them from this site.",
  ].join(" ");
}

export function fileLeadStore(dir: string): LeadStore {
  const file = path.join(dir, "leads.json");
  return {
    kind: "file",
    async save(lead) {
      const leads = await readFileLeads(file);
      leads.unshift(lead);
      await writeFileLeads(file, leads.slice(0, LIST_CAP));
    },
    async list() {
      return readFileLeads(file);
    },
    async delete(id) {
      const leads = await readFileLeads(file);
      const next = leads.filter((lead) => lead.id !== id);
      if (next.length === leads.length) return false;
      await writeFileLeads(file, next);
      return true;
    },
  };
}

export async function removeFileLeadDir(dir: string) {
  await rm(dir, { recursive: true, force: true });
}

function redisConfig() {
  const url = firstEnv("KV_REST_API_URL", "UPSTASH_REDIS_REST_URL");
  const token = firstEnv("KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_TOKEN");
  if (!url || !token) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:") return null;
  return { url: parsed.origin + parsed.pathname.replace(/\/$/, ""), token };
}

function webhookConfig() {
  const raw = process.env.LEADS_WEBHOOK_URL?.trim();
  if (!raw) return null;
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  const local = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && local)) return null;
  const bearer = process.env.LEADS_WEBHOOK_BEARER?.trim() || "";
  return { url: parsed.toString(), bearer };
}

function redisStore(config: { url: string; token: string }): LeadStore {
  return {
    kind: "redis",
    async save(lead) {
      await redisCall(config, ["SET", leadKey(lead.id), JSON.stringify(lead)]);
      await redisCall(config, ["LPUSH", REDIS_INDEX, lead.id]);
      await redisCall(config, ["LTRIM", REDIS_INDEX, 0, LIST_CAP - 1]);
    },
    async list() {
      const ids = await redisCall(config, ["LRANGE", REDIS_INDEX, 0, LIST_CAP - 1]);
      if (!Array.isArray(ids) || !ids.length) return [];
      const leads: ReportLead[] = [];
      for (let index = 0; index < ids.length; index += 100) {
        const chunk = ids.slice(index, index + 100).filter((id): id is string => typeof id === "string");
        const rows = await redisPipeline(
          config,
          chunk.map((id) => ["GET", leadKey(id)]),
        );
        rows.forEach((row) => {
          if (typeof row !== "string" || !row) return;
          try {
            leads.push(JSON.parse(row) as ReportLead);
          } catch {
            // Skip a corrupt row. The export should still return the rest.
          }
        });
      }
      return leads;
    },
    async delete(id) {
      if (!/^[0-9a-f-]{36}$/i.test(id)) return false;
      const removed = await redisCall(config, ["DEL", leadKey(id)]);
      await redisCall(config, ["LREM", REDIS_INDEX, 0, id]);
      return removed === 1 || removed === "1";
    },
  };
}

function webhookStore(config: { url: string; bearer: string }): LeadStore {
  return {
    kind: "webhook",
    async save(lead) {
      const response = await fetch(config.url, {
        method: "POST",
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
        headers: {
          "Content-Type": "application/json",
          ...(config.bearer ? { Authorization: `Bearer ${config.bearer}` } : {}),
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`Lead webhook returned ${response.status}.`);
      await response.body?.cancel().catch(() => undefined);
    },
    list: null,
    delete: null,
  };
}

async function redisCall(config: { url: string; token: string }, command: (string | number)[]) {
  const response = await fetch(config.url, {
    method: "POST",
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });
  if (!response.ok) throw new Error(`Lead store request failed (${response.status}).`);
  const data = (await response.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error("Lead store request failed.");
  return data.result;
}

async function redisPipeline(config: { url: string; token: string }, commands: (string | number)[][]) {
  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    redirect: "error",
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Lead store request failed (${response.status}).`);
  const data = (await response.json()) as { result?: unknown; error?: string }[];
  if (!Array.isArray(data)) throw new Error("Lead store request failed.");
  return data.map((row) => row.result);
}

function leadKey(id: string) {
  return `aai:report-lead:${id}`;
}

async function readFileLeads(file: string) {
  try {
    const parsed = JSON.parse(await readFile(file, "utf8")) as { leads?: ReportLead[] };
    return Array.isArray(parsed.leads) ? parsed.leads : [];
  } catch {
    return [];
  }
}

async function writeFileLeads(file: string, leads: ReportLead[]) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${process.pid}.tmp`;
  await writeFile(temporary, JSON.stringify({ leads }), { encoding: "utf8", mode: 0o600 });
  await rename(temporary, file);
}

function firstEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return "";
}
