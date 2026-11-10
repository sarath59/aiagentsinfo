import assert from "node:assert/strict";
import { workedExamples } from "../lib/agents-md/examples";
import { generateAgentsMd } from "../lib/agents-md/generate";
import type { AgentsMdInput } from "../lib/agents-md/types";

function byId(id: string) {
  const example = workedExamples.find((item) => item.id === id);
  assert.ok(example, id);
  return example.input;
}

function mustInclude(markdown: string, needle: string, label: string) {
  assert.ok(markdown.includes(needle), `${label} missing ${needle}`);
}

function mustExclude(markdown: string, needle: string, label: string) {
  assert.equal(markdown.includes(needle), false, `${label} unexpectedly includes ${needle}`);
}

const next = generateAgentsMd(byId("next-monorepo"), 1);
mustInclude(next.markdown, "Northwind", "next");
mustInclude(next.markdown, "pnpm install", "next");
mustInclude(next.markdown, "pnpm --filter web test", "next");
mustInclude(next.markdown, "apps/web", "next");
mustInclude(next.markdown, "Nested AGENTS.md", "next");
mustInclude(next.markdown, "32 KiB", "next");
mustInclude(next.markdown, ".cursor/rules", "next");
mustExclude(next.markdown, "uv run pytest", "next");
mustExclude(next.markdown, "cargo test", "next");
assert.equal(next.failed, 0, `next failed checks: ${next.checks.filter((item) => item.status === "fail").map((item) => item.id).join(",")}`);

const api = generateAgentsMd(byId("fastapi-uv"), 1);
mustInclude(api.markdown, "Harbor API", "fastapi");
mustInclude(api.markdown, "uv sync", "fastapi");
mustInclude(api.markdown, "uv run pytest", "fastapi");
mustInclude(api.markdown, "uv run ruff check .", "fastapi");
mustInclude(api.markdown, "tests/conftest.py", "fastapi");
mustInclude(api.markdown, "Copilot coding agent", "fastapi");
mustExclude(api.markdown, "pnpm", "fastapi");
mustExclude(api.markdown, "## Nested AGENTS.md", "fastapi");
assert.equal(api.failed, 0, "fastapi should not fail");

const go = generateAgentsMd(byId("go-cli"), 1);
mustInclude(go.markdown, "shipctl", "go");
mustInclude(go.markdown, "go test ./...", "go");
mustInclude(go.markdown, "go run ./cmd/shipctl", "go");
mustInclude(go.markdown, "cmd/shipctl/main.go", "go");
mustInclude(go.markdown, "gofmt -w .", "go");
mustInclude(go.markdown, "Jules looks for AGENTS.md", "go");
mustExclude(go.markdown, "pnpm", "go");
mustExclude(go.markdown, "pytest", "go");
assert.equal(go.failed, 0, "go should not fail");

const rust = generateAgentsMd(byId("rust-library"), 1);
mustInclude(rust.markdown, "quay", "rust");
mustInclude(rust.markdown, "cargo test", "rust");
mustInclude(rust.markdown, "cargo fmt", "rust");
mustInclude(rust.markdown, "cargo clippy --all-targets -- -D warnings", "rust");
mustInclude(rust.markdown, "src/lib.rs", "rust");
mustInclude(rust.markdown, "read: AGENTS.md", "rust");
mustExclude(rust.markdown, "go test ./", "rust");
mustExclude(rust.markdown, "pnpm", "rust");
assert.equal(rust.failed, 0, "rust should not fail");

const regenerated = generateAgentsMd(byId("next-monorepo"), 2);
assert.notEqual(next.markdown, regenerated.markdown, "regenerate should change the wording");
mustInclude(regenerated.markdown, "pnpm --filter web test", "regenerated next");
mustInclude(regenerated.markdown, "Northwind", "regenerated next");
mustInclude(regenerated.markdown, "apps/web", "regenerated next");

const leaked: AgentsMdInput = {
  ...byId("fastapi-uv"),
  description: "Stores shipment status. Admin key sk-abcdefghijklmnopqrstuvwxyz123456.",
  security: "The token is sk-ant-api03-abcdefghijklmnopqrstuvwxyz.",
};
const redacted = generateAgentsMd(leaked, 1);
mustExclude(redacted.markdown, "sk-abcdefghijklmnopqrstuvwxyz123456", "redaction");
mustExclude(redacted.markdown, "sk-ant-api03-abcdefghijklmnopqrstuvwxyz", "redaction");
mustInclude(redacted.markdown, "[redacted]", "redaction");
assert.equal(redacted.redacted, true);
assert.equal(
  redacted.checks.find((item) => item.id === "secrets")?.status,
  "pass",
  "redacted output should not still contain a secret",
);

const thin = generateAgentsMd(
  {
    ...byId("go-cli"),
    commands: { ...byId("go-cli").commands, install: "", test: "" },
  },
  1,
);
assert.equal(thin.checks.find((item) => item.id === "test")?.status, "fail");
assert.equal(thin.checks.find((item) => item.id === "install")?.status, "fail");
mustExclude(thin.markdown, "- Test:", "thin");
mustExclude(thin.markdown, "- Install:", "thin");

const texts = [next.markdown, api.markdown, go.markdown, rust.markdown];
for (let index = 0; index < texts.length; index += 1) {
  for (let other = index + 1; other < texts.length; other += 1) {
    assert.notEqual(texts[index], texts[other], "examples should not collapse to one draft");
  }
}

console.log("agents-md-selftest: ok");
console.log(
  ["next", "fastapi", "go", "rust"]
    .map((label, index) => {
      const result = [next, api, go, rust][index];
      return `${label}: ${result?.lines} lines, ${result?.bytes} bytes, ${result?.passed} pass, ${result?.warnings} warn, ${result?.failed} fail`;
    })
    .join("\n"),
);
