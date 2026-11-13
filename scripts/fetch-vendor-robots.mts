/**
 * One-shot read of agent-vendor robots.txt and llms.txt.
 * Run: node --experimental-strip-types scripts/fetch-vendor-robots.mts
 *
 * The host list is fixed in this file before the requests run.
 * A reserve replaces a primary only when that primary cannot be connected to.
 */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { decidePath, parseRobotsTxt, productToken, type ParsedRobots } from "../lib/robots/parse";

const CHECKED = "2026-11-13";
const STUDY_UA =
  "aiagentsinfo-vendor-robots-study/1.0 (+https://www.aiagentsinfo.com/reports/ai-agent-vendor-robots-txt-november-2026)";
const CHATGPT_USER_UA =
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot";
/** Anthropic's help page names the token and does not print a longer Mozilla string. */
const CLAUDE_USER_UA = "Claude-User";

const TOKENS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Googlebot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
] as const;

type Host = { vendor: string; host: string; why: string };

/** Primary sample. One customer-facing host per row. Chosen before any robots.txt was read. */
const PRIMARY: Host[] = [
  { vendor: "AG2", host: "ag2.ai", why: "Directory listing, agent-frameworks." },
  { vendor: "Aidelly", host: "www.aidelly.ai", why: "Directory listing, ai-agents." },
  { vendor: "Aider", host: "aider.chat", why: "Directory listing, coding-agents." },
  { vendor: "Amazon", host: "www.amazon.com", why: "Directory listing, shopping-agents (Alexa for Shopping)." },
  { vendor: "Augment Code", host: "www.augmentcode.com", why: "Directory listing, coding-agents." },
  { vendor: "Browser Use", host: "browser-use.com", why: "Directory listing, agent-frameworks." },
  { vendor: "Anthropic", host: "claude.com", why: "Directory listing for Claude Code. Named in the brief." },
  { vendor: "Cline", host: "cline.bot", why: "Directory listing, coding-agents." },
  { vendor: "CNVS", host: "cnvs.dev", why: "Directory listing, coding-agents." },
  { vendor: "OpenAI", host: "openai.com", why: "Directory listing for Codex. Named in the brief." },
  { vendor: "CrewAI", host: "crewai.com", why: "Directory listing, agent-frameworks. Named in the brief." },
  { vendor: "Cursor", host: "cursor.com", why: "Directory listing, coding-agents. Named in the brief." },
  { vendor: "Cognition", host: "devin.ai", why: "Directory listing for Devin. Named in the brief." },
  { vendor: "Google ADK", host: "adk.dev", why: "Directory listing, agent-frameworks. Own host, separate from Gemini." },
  { vendor: "LangChain", host: "www.langchain.com", why: "Directory listing, agent-frameworks. Named in the brief." },
  { vendor: "Marblism", host: "www.marblism.com", why: "Directory listing, ai-agents." },
  { vendor: "NoMac", host: "nomac.app", why: "Directory listing, coding-agents." },
  { vendor: "Onton", host: "onton.com", why: "Directory listing, shopping-agents." },
  { vendor: "Perplexity", host: "www.perplexity.ai", why: "Directory listing. Named in the brief." },
  { vendor: "Pydantic", host: "pydantic.dev", why: "Directory listing for Pydantic AI, agent-frameworks." },
  { vendor: "Sintra", host: "sintra.ai", why: "Directory listing, ai-agents." },
  { vendor: "A2UI", host: "a2ui.org", why: "Directory listing, agent-frameworks." },
  { vendor: "SiteGPT", host: "sitegpt.ai", why: "Directory listing, customer-support." },
  { vendor: "Hugging Face", host: "huggingface.co", why: "Directory listing for smolagents. The file is the platform's." },
  { vendor: "Cartesia", host: "www.cartesia.ai", why: "Directory listing, voice agents." },
  { vendor: "ElevenLabs", host: "elevenlabs.io", why: "Directory listing, voice." },
  { vendor: "1ClickWebsite", host: "www.1clickwebsite.ai", why: "Directory listing, no-code site agent." },
  { vendor: "Google", host: "gemini.google.com", why: "Named in the brief. Gemini is the agent product host." },
  { vendor: "Microsoft", host: "www.microsoft.com", why: "Named in the brief. Copilot Studio is sold on this host." },
  { vendor: "Replit", host: "replit.com", why: "Named in the brief." },
  { vendor: "Lovable", host: "lovable.dev", why: "Named in the brief." },
  { vendor: "Salesforce", host: "www.salesforce.com", why: "Named in the brief. Agentforce is sold on this host." },
  { vendor: "GitHub", host: "github.com", why: "Directory listing for GitHub Copilot. Subsidiary of Microsoft, own file." },
  { vendor: "AWS", host: "aws.amazon.com", why: "Bedrock AgentCore host. Separate file from amazon.com." },
  { vendor: "Mistral", host: "mistral.ai", why: "Peer lab that ships agents. Same class as the named labs." },
  { vendor: "Cohere", host: "cohere.com", why: "Peer lab that documents its own crawlers and ships agents." },
  { vendor: "xAI", host: "x.ai", why: "Peer lab. Same class as the named labs." },
  { vendor: "Meta", host: "ai.meta.com", why: "Peer lab. meta-externalagent is one of the tokens under test." },
  { vendor: "Manus", host: "manus.im", why: "Peer computer-use agent, own domain." },
  { vendor: "Vercel", host: "v0.dev", why: "Peer coding agent (v0), own host." },
  { vendor: "StackBlitz", host: "bolt.new", why: "Peer coding agent (Bolt), own host." },
  { vendor: "Continue", host: "continue.dev", why: "Peer coding agent, own domain." },
  { vendor: "Sourcegraph", host: "ampcode.com", why: "Peer coding agent (Amp), own host." },
  { vendor: "Factory", host: "factory.ai", why: "Peer coding agent, own domain." },
  { vendor: "Warp", host: "warp.dev", why: "Peer agentic terminal, own domain." },
  { vendor: "Browserbase", host: "www.browserbase.com", why: "Named in the November browser-agent report on this site." },
  { vendor: "Sierra", host: "sierra.ai", why: "Peer customer-facing agent company, own domain." },
  { vendor: "Glean", host: "www.glean.com", why: "Peer enterprise agent company, own domain." },
  { vendor: "ServiceNow", host: "www.servicenow.com", why: "Named in the November enterprise-platforms report on this site." },
  { vendor: "Workday", host: "www.workday.com", why: "Named in the November enterprise-platforms report on this site." },
  { vendor: "LlamaIndex", host: "www.llamaindex.ai", why: "Peer agent framework, own domain." },
  { vendor: "Mastra", host: "mastra.ai", why: "Peer agent framework, own domain." },
];

/** Used only when a primary cannot be connected to. Order is fixed. */
const RESERVES: Host[] = [
  { vendor: "Letta", host: "www.letta.com", why: "Reserve. Peer agent framework." },
  { vendor: "Dify", host: "dify.ai", why: "Reserve. Peer agent platform." },
  { vendor: "n8n", host: "n8n.io", why: "Reserve. Peer agent workflow host." },
  { vendor: "Dust", host: "dust.tt", why: "Reserve. Peer enterprise agent host." },
  { vendor: "You.com", host: "you.com", why: "Reserve. Peer answer engine." },
  { vendor: "Skyvern", host: "www.skyvern.com", why: "Reserve. Peer browser agent." },
  { vendor: "LiveKit", host: "livekit.com", why: "Reserve. Peer voice-agent framework." },
  { vendor: "DeepSeek", host: "www.deepseek.com", why: "Reserve. Peer lab." },
  { vendor: "Kiro", host: "kiro.dev", why: "Reserve. Peer coding agent." },
  { vendor: "Decagon", host: "decagon.ai", why: "Reserve. Peer support agent." },
  { vendor: "Relevance AI", host: "relevanceai.com", why: "Reserve. Peer agent platform." },
  { vendor: "Shopify", host: "www.shopify.com", why: "Reserve. Named in the shopping-agent reports on this site." },
];

/** Second hosts. Not rows. Recorded only to see whether the same company publishes two policies. */
const ALTERNATES: Host[] = [
  { vendor: "OpenAI", host: "chatgpt.com", why: "Alternate product host." },
  { vendor: "Anthropic", host: "www.anthropic.com", why: "Alternate company host." },
  { vendor: "Anthropic", host: "claude.ai", why: "Alternate app host." },
  { vendor: "Google", host: "www.google.com", why: "Alternate host if Gemini does not publish its own file." },
  { vendor: "Cognition", host: "cognition.ai", why: "Alternate company host." },
  { vendor: "Microsoft", host: "copilot.microsoft.com", why: "Alternate product host." },
];

type FetchResult = {
  requestedUrl: string;
  finalUrl: string | null;
  status: number | null;
  contentType: string | null;
  bytes: number;
  truncated: boolean;
  body: string;
  error: string | null;
};

function looksHtml(body: string, contentType: string | null) {
  const ct = (contentType ?? "").toLowerCase();
  if (ct.includes("text/html") || ct.includes("application/xhtml")) return true;
  const head = body.slice(0, 400).trim().toLowerCase();
  return head.startsWith("<!doctype html") || head.startsWith("<html") || head.startsWith("<head");
}

function selectGroup(parsed: ParsedRobots, product: string) {
  const needle = productToken(product).toLowerCase();
  let bestLength = 0;
  const winners: ParsedRobots["groups"] = [];
  for (const group of parsed.groups) {
    let groupBest = "";
    for (const agent of group.agents) {
      if (agent === "*") continue;
      const value = agent.toLowerCase();
      if (needle.startsWith(value) && value.length > groupBest.length) groupBest = value;
    }
    if (!groupBest) continue;
    if (groupBest.length > bestLength) {
      bestLength = groupBest.length;
      winners.length = 0;
      winners.push(group);
    } else if (groupBest.length === bestLength) winners.push(group);
  }
  if (winners.length) {
    return { source: "specific" as const, rules: winners.flatMap((group) => group.rules) };
  }
  const stars = parsed.groups.filter((group) => group.agents.some((agent) => agent === "*"));
  if (stars.length) return { source: "wildcard" as const, rules: stars.flatMap((group) => group.rules) };
  return { source: "none" as const, rules: [] };
}

function probePath(pattern: string) {
  const stripped = pattern.replaceAll("*", "x").replace(/\$/g, "");
  if (!stripped.startsWith("/")) return null;
  return stripped.slice(0, 200);
}

function classifyToken(parsed: ParsedRobots, token: string) {
  const group = selectGroup(parsed, token);
  const home = decidePath(parsed, token, "/");
  const disallows = group.rules.filter((rule) => rule.type === "disallow" && rule.pattern);
  const allows = group.rules.filter((rule) => rule.type === "allow" && rule.pattern);
  let blocksAProbe = false;
  const blockedProbes: string[] = [];
  for (const rule of disallows) {
    const probe = probePath(rule.pattern);
    if (!probe) {
      blocksAProbe = true;
      blockedProbes.push(rule.pattern);
      continue;
    }
    if (decidePath(parsed, token, probe).access === "disallowed") {
      blocksAProbe = true;
      blockedProbes.push(probe);
    }
  }
  const allowedExceptions = ["/docs", "/blog", "/pricing", "/api", "/about", "/llms.txt"].filter(
    (path) => home.access === "disallowed" && decidePath(parsed, token, path).access === "allowed",
  );
  let bucket: "full-block" | "partial" | "allowed" | "not-mentioned";
  if (group.source === "none") bucket = "not-mentioned";
  else if (home.access === "disallowed") bucket = "full-block";
  else if (blocksAProbe) bucket = "partial";
  else bucket = "allowed";
  return {
    bucket,
    via: group.source,
    home: home.access,
    winningRule: home.rule ? `${home.rule.type}: ${home.rule.pattern || "(empty)"}` : null,
    disallowPatterns: disallows.slice(0, 12).map((rule) => rule.pattern),
    allowPatterns: allows.slice(0, 8).map((rule) => rule.pattern),
    blockedProbes: blockedProbes.slice(0, 8),
    allowedExceptions,
  };
}

async function request(url: string, ua: string, maxBytes: number): Promise<FetchResult> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20_000);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": ua, accept: "text/plain, text/markdown, text/html;q=0.5, */*;q=0.1" },
    });
    const reader = res.body?.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;
    let truncated = false;
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        received += value.byteLength;
        if (received > maxBytes) {
          truncated = true;
          chunks.push(value.slice(0, Math.max(0, value.byteLength - (received - maxBytes))));
          await reader.cancel();
          received = maxBytes;
          break;
        }
        chunks.push(value);
      }
    }
    const body = Buffer.concat(chunks).toString("utf8").replace(/^\uFEFF/, "");
    return {
      requestedUrl: url,
      finalUrl: res.url,
      status: res.status,
      contentType: res.headers.get("content-type"),
      bytes: received,
      truncated,
      body,
      error: null,
    };
  } catch (error) {
    const message = error instanceof Error ? error.name + ": " + error.message : String(error);
    return {
      requestedUrl: url,
      finalUrl: null,
      status: null,
      contentType: null,
      bytes: 0,
      truncated: false,
      body: "",
      error: message,
    };
  } finally {
    clearTimeout(timer);
  }
}

function sha256(text: string) {
  return createHash("sha256").update(text).digest("hex");
}

function fileState(result: FetchResult) {
  if (result.error) return "error";
  if (result.status === null) return "error";
  if (result.status >= 500) return "unreachable";
  if (result.status === 404 || result.status === 410) return "missing";
  if (result.status === 401 || result.status === 403) return "refused";
  if (result.status < 200 || result.status >= 300) return "other";
  if (looksHtml(result.body, result.contentType)) return "html";
  return "ok";
}

function challengeNote(body: string, status: number | null) {
  const head = body.slice(0, 2500).toLowerCase();
  const markers = ["just a moment", "cf-browser-verification", "cf-challenge", "attention required", "captcha", "access denied", "enable javascript"];
  const hit = markers.find((marker) => head.includes(marker));
  return { status, challengeMarker: hit ?? null };
}

async function readHost(entry: Host, withHomepage: boolean) {
  const origin = `https://${entry.host}`;
  const robots = await request(`${origin}/robots.txt`, STUDY_UA, 500 * 1024);
  const llms = await request(`${origin}/llms.txt`, STUDY_UA, 64 * 1024);
  const robotsState = fileState(robots);
  let tokens: Record<string, ReturnType<typeof classifyToken>> | null = null;
  let groupAgents: string[] = [];
  let parseNote: string | null = null;
  if (robotsState === "ok") {
    const parsed = parseRobotsTxt(robots.body);
    tokens = Object.fromEntries(TOKENS.map((token) => [token, classifyToken(parsed, token)]));
    groupAgents = [...new Set(parsed.groups.flatMap((group) => group.agents))].slice(0, 80);
    if (robots.truncated) parseNote = "Body truncated at 500 KB before parsing.";
  } else if (robotsState === "missing") {
    parseNote = "No robots.txt (HTTP 404 or 410). RFC 9309 treats that as allow-all. Every token is not mentioned.";
    tokens = Object.fromEntries(
      TOKENS.map((token) => [
        token,
        {
          bucket: "not-mentioned" as const,
          via: "none" as const,
          home: "allowed" as const,
          winningRule: null,
          disallowPatterns: [],
          allowPatterns: [],
          blockedProbes: [],
          allowedExceptions: [],
        },
      ]),
    );
  } else {
    parseNote = `robots.txt was not parsed. State: ${robotsState}.`;
  }

  const llmsState = fileState(llms);
  const llmsText = llmsState === "ok";
  const firstLine = llmsText
    ? (llms.body.split(/\r?\n/).map((line) => line.trim()).find(Boolean) ?? "").slice(0, 180)
    : "";

  let homepages: Record<string, ReturnType<typeof challengeNote> & { error: string | null; finalUrl: string | null }> | null =
    null;
  if (withHomepage) {
    const chatgpt = await request(`${origin}/`, CHATGPT_USER_UA, 32 * 1024);
    const claude = await request(`${origin}/`, CLAUDE_USER_UA, 32 * 1024);
    homepages = {
      "ChatGPT-User": { ...challengeNote(chatgpt.body, chatgpt.status), error: chatgpt.error, finalUrl: chatgpt.finalUrl },
      "Claude-User": { ...challengeNote(claude.body, claude.status), error: claude.error, finalUrl: claude.finalUrl },
    };
  }

  return {
    vendor: entry.vendor,
    host: entry.host,
    why: entry.why,
    checked: CHECKED,
    robots: {
      requestedUrl: robots.requestedUrl,
      finalUrl: robots.finalUrl,
      status: robots.status,
      contentType: robots.contentType,
      bytes: robots.bytes,
      truncated: robots.truncated,
      sha256: robots.body ? sha256(robots.body) : null,
      state: robotsState,
      error: robots.error,
      groupAgents,
      parseNote,
      tokens,
      body: robotsState === "ok" ? robots.body : robots.body.slice(0, 400),
    },
    llms: {
      requestedUrl: llms.requestedUrl,
      finalUrl: llms.finalUrl,
      status: llms.status,
      contentType: llms.contentType,
      bytes: llms.bytes,
      state: llmsState,
      text: llmsText,
      firstLine,
      error: llms.error,
    },
    homepages,
  };
}

async function mapPool<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>) {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await fn(items[index], index);
      console.error(`done ${index + 1}/${items.length}`);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return results;
}

async function main() {
  const ip = await request("https://api.ipify.org", STUDY_UA, 200);
  const rows = await mapPool(PRIMARY, 6, (entry) => readHost(entry, true));
  const failed = rows.filter((row) => row.robots.state === "error");
  const reserves: typeof rows = [];
  let reserveIndex = 0;
  for (let i = 0; i < failed.length; i += 1) {
    if (reserveIndex >= RESERVES.length) break;
    const reserve = RESERVES[reserveIndex];
    reserveIndex += 1;
    console.error(`reserve ${reserve.host} for a failed primary`);
    reserves.push(await readHost(reserve, true));
  }
  const alternates = await mapPool(ALTERNATES, 4, (entry) => readHost(entry, false));
  const out = {
    checked: CHECKED,
    fetchedAt: new Date().toISOString(),
    egressIp: ip.body.trim(),
    studyUa: STUDY_UA,
    chatgptUserUa: CHATGPT_USER_UA,
    claudeUserUa: CLAUDE_USER_UA,
    claudeUserUaNote:
      "On 13 November 2026 the Anthropic help page named the token Claude-User and did not print a Mozilla user-agent string. The homepage test sent the token alone.",
    tokens: TOKENS,
    selection:
      "Primary hosts were fixed before the fetch. A reserve is added only when a primary robots.txt request errors (DNS, timeout, or connection). Alternates are second hosts of companies already in the primary list and are not extra vendors.",
    primary: rows,
    reserves,
    alternates,
  };
  mkdirSync("data/vendor-robots", { recursive: true });
  writeFileSync("data/vendor-robots/2026-11-13.json", JSON.stringify(out));
  console.error(
    `wrote data/vendor-robots/2026-11-13.json ip=${out.egressIp} primary=${rows.length} reserves=${reserves.length} bytes=${Buffer.byteLength(JSON.stringify(out))}`,
  );
}

await main();
