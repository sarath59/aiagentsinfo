import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";

if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, "crypto", { value: webcrypto, configurable: true });
}

import { parseAccept } from "../lib/bot-tracking/accept";
import { authorizeBotTracking } from "../lib/bot-tracking/auth";
import { matchOrder, trackedBots } from "../lib/bot-tracking/catalog";
import { detectBot } from "../lib/bot-tracking/detect";
import { hitKind, normalizePath, shouldIgnorePath } from "../lib/bot-tracking/kind";
import { operatorsWithIpRanges, verifyIp } from "../lib/bot-tracking/ip";
import { buildHit } from "../lib/bot-tracking/record";
import { sessionId, sessionWindowMs } from "../lib/bot-tracking/session";

assert.equal(detectBot("Mozilla/5.0"), null);
assert.equal(detectBot(null), null);
assert.equal(
  detectBot("Mozilla/5.0 (compatible; GPTBot/1.2; +https://openai.com/gptbot)")?.token,
  "GPTBot",
);
assert.equal(
  detectBot("Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ChatGPT-User/1.0)")?.token,
  "ChatGPT-User",
);
assert.equal(detectBot("aiagentsinfo-robots-checker/1.0"), null);
assert.equal(detectBot("aiagentsinfo-indexnow"), null);
assert.equal(detectBot("ClaudeBot/1.0")?.token, "ClaudeBot");
assert.equal(detectBot("Claude-User/1.0")?.token, "Claude-User");
assert.equal(detectBot("Mozilla/5.0 (compatible; GoogleAgent)")?.token, "GoogleAgent");
assert.equal(detectBot("Google-Agent")?.token, "Google-Agent");
assert.equal(detectBot("Applebot-Extended/1.0")?.token, "Applebot-Extended");
assert.equal(detectBot("Mozilla/5.0 (compatible; Applebot/0.1)")?.token, "Applebot");
assert.equal(detectBot("meta-externalagent")?.token, "Meta-ExternalAgent");
assert.equal(detectBot("PerplexityBot/1.0")?.token, "PerplexityBot");
assert.equal(detectBot("python-requests/2.31.0")?.token, "unknown-bot");
assert.equal(detectBot("curl/8.0")?.token, "unknown-bot");
assert.equal(
  detectBot(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  ),
  null,
);

assert.equal(hitKind("GET", "/reports/foo"), "view");
assert.equal(hitKind("GET", "/robots.txt"), "discover");
assert.equal(hitKind("GET", "/llms.txt"), "discover");
assert.equal(hitKind("GET", "/api/submit-tool"), "interact");
assert.equal(hitKind("POST", "/directory"), "interact");
assert.equal(shouldIgnorePath("/api/bot-tracking"), true);
assert.equal(shouldIgnorePath("/api/bot-tracking/hit"), true);
assert.equal(normalizePath("/reports/foo/"), "/reports/foo");
assert.equal(shouldIgnorePath("/_next/static/chunk.js"), true);
assert.equal(shouldIgnorePath("/robots.txt"), false);

const accept = parseAccept("text/markdown, application/json;q=0.9, text/html;q=0.8");
assert.equal(accept.accept_markdown, true);
assert.equal(accept.accept_json, true);
assert.equal(accept.accept_html, true);

assert.ok(operatorsWithIpRanges().includes("OpenAI"));
assert.ok(operatorsWithIpRanges().includes("Google"));
assert.equal(verifyIp("20.171.206.10", "OpenAI"), "verified");
assert.equal(verifyIp("1.2.3.4", "OpenAI"), "unverified");
assert.equal(verifyIp("1.2.3.4", "Anthropic"), "unknown");

process.env.BOT_TRACKING_API_KEY = "test-key-please-change";
assert.equal(
  authorizeBotTracking(
    new Request("https://example.com", { headers: { authorization: "Bearer test-key-please-change" } }),
  ).ok,
  true,
);
assert.equal(
  authorizeBotTracking(new Request("https://example.com", { headers: { "x-bot-tracking-key": "wrong" } })).ok,
  false,
);

const needles = matchOrder.map((row) => row.needle);
for (let i = 1; i < needles.length; i += 1) {
  assert.ok(needles[i - 1].length >= needles[i].length, `needle order at ${i}`);
}
assert.ok(trackedBots.length >= 40);

async function main() {
  const a = await sessionId("GPTBot", "abc");
  const b = await sessionId("GPTBot", "abc");
  assert.equal(a, b);
  assert.equal(a.length, 24);
  assert.ok(sessionWindowMs() > 0);

  const hit = await buildHit(
    new Request("https://www.aiagentsinfo.com/reports/ai-answer-crawlers-november-2026?utm_source=x&ref=1", {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; ChatGPT-User/1.0)",
        accept: "text/html",
        referer: "https://chatgpt.com/",
        "x-forwarded-for": "20.171.206.10",
      },
    }),
  );
  assert.ok(hit);
  assert.equal(hit.bot_token, "ChatGPT-User");
  assert.equal(hit.path, "/reports/ai-answer-crawlers-november-2026");
  assert.equal(hit.kind, "view");
  assert.equal(hit.referer_host, "chatgpt.com");
  assert.equal(hit.query_keys, "ref,utm_source");
  assert.equal(hit.ip_verified, "verified");
  assert.equal(hit.accept_html, true);
  assert.ok(hit.session_id);
  assert.equal(hit.status, 0);

  assert.equal(
    await buildHit(new Request("https://www.aiagentsinfo.com/", { headers: { "user-agent": "Mozilla/5.0" } })),
    null,
  );

  console.log("bot-tracking-selftest: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
