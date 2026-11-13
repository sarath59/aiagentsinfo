import { generate, scrubDraft } from "@/lib/mcp-config/generate";
import { maskDeep } from "@/lib/mcp-config/mask";
import { isClientId, isOsId, isSecretStyle, isTransportId, type GenerateInput, type ServerDraft } from "@/lib/mcp-config/types";
import { validateConfig } from "@/lib/mcp-config/validate";
import { takeMcpConfigLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BODY = 120_000;

function json(body: unknown, status = 200, extra?: Record<string, string>) {
  return Response.json(maskDeep(body), {
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

function asRecord(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function stringList(value: unknown, max: number, length: number) {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.slice(0, length))
    .slice(0, max);
}

function readDraft(value: unknown): ServerDraft | null {
  const row = asRecord(value);
  if (!row) return null;
  const transport = typeof row.transport === "string" ? row.transport : "";
  if (!isTransportId(transport)) return null;
  return scrubDraft({
    name: typeof row.name === "string" ? row.name.slice(0, 80) : "",
    transport,
    command: typeof row.command === "string" ? row.command.slice(0, 200) : "",
    args: stringList(row.args, 40, 500),
    envNames: stringList(row.envNames, 20, 80),
    url: typeof row.url === "string" ? row.url.slice(0, 2000) : "",
    headerNames: stringList(row.headerNames, 20, 80),
  });
}

function readGenerate(value: unknown): GenerateInput | { error: string } {
  const row = asRecord(value);
  if (!row) return { error: "Send the generator fields as an object." };
  const client = typeof row.client === "string" ? row.client : "";
  const os = typeof row.os === "string" ? row.os : "";
  const secretStyle = typeof row.secretStyle === "string" ? row.secretStyle : "";
  if (!isClientId(client) || !isOsId(os) || !isSecretStyle(secretStyle)) {
    return { error: "Choose a client, an operating system, and a secret style." };
  }
  if (!Array.isArray(row.servers)) return { error: "Add the servers as a list." };
  const servers = row.servers.slice(0, 20).map(readDraft).filter((server): server is ServerDraft => Boolean(server));
  return { client, os, secretStyle, servers };
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Open this page on the site and try again." }, 403);
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return json({ error: "Send the form as JSON." }, 415);

  const limit = takeMcpConfigLimit(`mcp-config:${clientIp(request)}`);
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
  const row = asRecord(body);
  if (!row) return json({ error: "The request was not valid JSON." }, 400);
  const action = row.action;

  if (action === "generate") {
    const input = readGenerate(row.input);
    if ("error" in input) return json({ error: input.error }, 400);
    return json({ result: generate(input) });
  }

  if (action === "validate") {
    const client = typeof row.client === "string" ? row.client : "";
    const os = typeof row.os === "string" ? row.os : "";
    const config = typeof row.config === "string" ? row.config : "";
    if (!isClientId(client) || !isOsId(os)) return json({ error: "Choose the client and the operating system." }, 400);
    if (!config.trim()) return json({ error: "Paste a config first." }, 400);
    if (config.length > 100_000) return json({ error: "That paste is too long to check." }, 413);
    return json({ result: validateConfig(config, client, os) });
  }

  return json({ error: "Choose generate or validate." }, 400);
}
