import assert from "node:assert/strict";
import {
  columnReadFraction,
  columnShorterThanViewport,
  pageSlug,
  relatedClickMetadata,
  reportSlugFromPath,
  shouldEmitRelatedClick,
} from "../lib/report-reading";

assert.equal(reportSlugFromPath("/reports/ai-coding-agents-next-6-months"), "ai-coding-agents-next-6-months");
assert.equal(reportSlugFromPath("/reports/ai-agents-next-6-months/"), "ai-agents-next-6-months");
assert.equal(reportSlugFromPath("/reports/agent-harness-benchmark-november-2026?x=1"), "agent-harness-benchmark-november-2026");
assert.equal(reportSlugFromPath("/reports"), null);
assert.equal(reportSlugFromPath("/blog/claude-code-vs-codex-pricing"), null);

assert.equal(pageSlug("/reports/ai-coding-agents-next-6-months"), "reports/ai-coding-agents-next-6-months");
assert.equal(columnReadFraction(0, 2000, 1000), 0.5);
assert.equal(columnReadFraction(800, 2000, 1000), 0.1);
assert.equal(columnReadFraction(-100, 2000, 1000), 0.55);
assert.equal(columnReadFraction(1200, 2000, 1000), 0);
assert.equal(columnShorterThanViewport(900, 1000), true);
assert.equal(columnShorterThanViewport(2400, 1000), false);

const meta = relatedClickMetadata("/reports/ai-coding-agents-next-6-months", "/reports/ai-coding-agents-next-30-days");
assert.equal(meta.report_slug, "ai-coding-agents-next-6-months");
assert.equal(meta.from_slug, "reports/ai-coding-agents-next-6-months");
assert.equal(meta.to_slug, "reports/ai-coding-agents-next-30-days");
assert.equal(relatedClickMetadata("/blog/claude-code-vs-codex-pricing", "/reports/ai-coding-agents-next-6-months").report_slug, undefined);

const first = shouldEmitRelatedClick({ key: "", at: 0 }, "reports/a", "reports/b", 1_000);
assert.equal(first.emit, true);
const dup = shouldEmitRelatedClick(first.state, "reports/a", "reports/b", 1_200);
assert.equal(dup.emit, false);
const later = shouldEmitRelatedClick(dup.state, "reports/a", "reports/b", 2_000);
assert.equal(later.emit, true);
assert.equal(shouldEmitRelatedClick(later.state, "reports/a", "reports/a", 3_000).emit, false);

console.log("report-reading selftest ok");
