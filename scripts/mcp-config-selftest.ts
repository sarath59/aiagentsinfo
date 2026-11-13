import assert from "node:assert/strict";
import { workedExamples, brokenConfigExample } from "../lib/mcp-config/examples";
import { generate } from "../lib/mcp-config/generate";
import { validateConfig } from "../lib/mcp-config/validate";

const desktop = generate(workedExamples[0].input);
assert.equal(desktop.client, "claude-desktop");
assert.match(desktop.body, /"mcpServers"/);
assert.match(desktop.body, /"command": "cmd"/);
assert.match(desktop.body, /"\/c"/);
assert.match(desktop.body, /"npx"/);
assert.match(desktop.body, /"-y"/);
assert.match(desktop.body, /"@modelcontextprotocol\/server-filesystem"/);
assert.match(desktop.body, /C:\\\\Users\\\\username\\\\Desktop/);
assert.equal(desktop.paths.find((path) => path.os === "windows")?.path, "%APPDATA%\\Claude\\claude_desktop_config.json");
assert.doesNotMatch(desktop.body, /ghp_|sk-|AKIA/);
assert.equal(desktop.commands.length, 0);

const vscode = generate(workedExamples[1].input);
const vscodeJson = JSON.parse(vscode.body) as {
  inputs: { type: string; id: string; password: boolean }[];
  servers: { github: { type: string; url: string; headers: { Authorization: string } } };
};
assert.equal(vscodeJson.inputs[0]?.type, "promptString");
assert.equal(vscodeJson.inputs[0]?.password, true);
assert.equal(vscodeJson.inputs[0]?.id, "github-personal-access-token");
assert.equal(vscodeJson.servers.github.type, "http");
assert.equal(vscodeJson.servers.github.url, "https://api.githubcopilot.com/mcp/");
assert.equal(
  vscodeJson.servers.github.headers.Authorization,
  "Bearer ${input:github-personal-access-token}",
);
assert.equal("mcpServers" in vscodeJson, false);
assert.doesNotMatch(vscode.body, /ghp_|REPLACE_ON_THIS_MACHINE/);
assert.match(vscode.commands[0] ?? "", /^code --add-mcp /);

const cursor = generate(workedExamples[2].input);
const cursorJson = JSON.parse(cursor.body) as { mcpServers: Record<string, { type: string; command: string }> };
assert.ok(cursorJson.mcpServers.filesystem);
assert.ok(cursorJson.mcpServers.memory);
assert.equal(cursorJson.mcpServers.filesystem.type, "stdio");
assert.equal(cursorJson.mcpServers.memory.type, "stdio");
assert.equal(cursorJson.mcpServers.filesystem.command, "npx");
assert.ok(cursor.paths.some((path) => path.path.includes(".cursor/mcp.json")));
assert.match(cursor.folderNote, /~\/\.cursor\/mcp\.json/);
assert.equal(cursor.commands.length, 0);

const checked = validateConfig(brokenConfigExample, "vscode", "windows");
assert.equal(checked.parsed, true);
assert.ok(checked.score < 70, `score ${checked.score}`);
assert.ok(checked.findings.some((finding) => finding.code === "wrong-key"));
assert.ok(checked.findings.some((finding) => finding.code === "hardcoded-secret"));
assert.ok(checked.findings.some((finding) => finding.code === "npx-yes"));
assert.ok(checked.findings.some((finding) => finding.code === "windows-npx"));
assert.ok(checked.findings.some((finding) => finding.code === "relative-path"));
assert.ok(checked.findings.some((finding) => finding.code === "missing-type"));
const rendered = JSON.stringify(checked);
assert.doesNotMatch(rendered, /ghp_EXAMPLE/);
assert.ok(checked.fixed);
const fixed = JSON.parse(checked.fixed) as {
  servers: Record<string, { type?: string; command?: string; args?: string[] }>;
  inputs?: { id: string }[];
};
assert.equal("mcpServers" in (JSON.parse(checked.fixed) as object), false);
const server = Object.values(fixed.servers)[0];
assert.equal(server?.type, "stdio");
assert.equal(server?.command, "cmd");
assert.ok(server?.args?.includes("-y"));
assert.ok(server?.args?.includes("/c"));
assert.doesNotMatch(checked.fixed, /ghp_/);

const syntax = validateConfig("{", "cursor", "macos");
assert.equal(syntax.parsed, false);
assert.equal(syntax.score, 0);
assert.equal(syntax.fixed, null);
assert.equal(syntax.findings[0]?.line, 1);
assert.equal(syntax.findings[0]?.column, 2);

const claudeUrl = validateConfig(
  JSON.stringify({ mcpServers: { docs: { url: "https://example.com/mcp" } } }),
  "claude-code",
  "linux",
);
assert.ok(claudeUrl.findings.some((finding) => finding.code === "claude-url-type"));

const dupes = validateConfig(
  `{
  "mcpServers": {
    "github": { "command": "npx", "args": ["-y", "one"] },
    "github": { "command": "npx", "args": ["-y", "two"] }
  }
}`,
  "cursor",
  "macos",
);
assert.ok(dupes.findings.some((finding) => finding.code === "duplicate-key"));

const wind = generate({
  client: "windsurf",
  os: "linux",
  secretStyle: "env",
  servers: [
    {
      name: "github",
      transport: "http",
      command: "",
      args: [],
      envNames: ["GITHUB_PERSONAL_ACCESS_TOKEN"],
      url: "https://api.githubcopilot.com/mcp/",
      headerNames: ["Authorization"],
    },
  ],
});
const windJson = JSON.parse(wind.body) as {
  mcpServers: { github: { serverUrl: string; headers: { Authorization: string } } };
};
assert.equal(windJson.mcpServers.github.serverUrl, "https://api.githubcopilot.com/mcp/");
assert.equal(windJson.mcpServers.github.headers.Authorization, "Bearer ${env:GITHUB_PERSONAL_ACCESS_TOKEN}");
assert.equal(wind.paths.find((path) => path.os === "windows")?.path, "%AppData%\\devin\\mcp_config.json");

const code = generate({ ...workedExamples[0].input, client: "claude-code" });
assert.match(code.commands[0] ?? "", /claude mcp add --scope project --transport stdio filesystem -- cmd \/c npx -y/);
assert.match(code.body, /"type": "stdio"/);

console.log("mcp-config selftest ok");
