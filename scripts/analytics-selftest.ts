import assert from "node:assert/strict";
import { aiReferrerFrom } from "../lib/analytics/ai-referrer";
import { normalizeVisitorEvent } from "../lib/analytics/collect";

assert.equal(aiReferrerFrom({ referrerHost: "chatgpt.com" }), "chatgpt");
assert.equal(aiReferrerFrom({ referrerHost: "www.perplexity.ai" }), "perplexity");
assert.equal(aiReferrerFrom({ referrerHost: "claude.ai" }), "claude");
assert.equal(aiReferrerFrom({ utmSource: "chatgpt.com" }), "chatgpt");
assert.equal(aiReferrerFrom({ referrerHost: "google.com" }), "");

const row = normalizeVisitorEvent({
  event_type: "pageview",
  path: "/reports/foo",
  visitor_id: "11111111-1111-4111-8111-111111111111",
  session_id: "22222222-2222-4222-8222-222222222222",
  referrer_host: "chatgpt.com",
  utm_source: "",
});
assert.ok(row);
assert.equal(row.ai_referrer, "chatgpt");
assert.equal(row.path, "/reports/foo");

assert.equal(
  normalizeVisitorEvent({
    event_type: "goal",
    name: "report_view",
    path: "/reports/foo",
    visitor_id: "11111111-1111-4111-8111-111111111111",
    session_id: "22222222-2222-4222-8222-222222222222",
  })?.name,
  "report_view",
);

assert.equal(
  normalizeVisitorEvent({
    event_type: "goal",
    name: "bad name",
    visitor_id: "11111111-1111-4111-8111-111111111111",
    session_id: "22222222-2222-4222-8222-222222222222",
  }),
  null,
);

console.log("analytics-selftest: ok");
