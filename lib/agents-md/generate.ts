import { commandLabels } from "@/lib/agents-md/defaults";
import {
  applyLines,
  closingLines,
  doneLines,
  layoutMonorepo,
  monorepoLines,
  sharedNever,
  sharedPr,
  sharedSecurity,
  stackCopy,
} from "@/lib/agents-md/library";
import type {
  AgentId,
  AgentsMdInput,
  AgentsMdResult,
  CheckStatus,
  CommandKey,
  Commands,
  PackageManagerId,
  QualityCheck,
  StackId,
} from "@/lib/agents-md/types";
import { commandKeys } from "@/lib/agents-md/types";

const SECRET_PATTERNS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g,
  /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{8,}\b/g,
  /\bsk-[A-Za-z0-9_-]{16,}\b/g,
  /\bAKIA[0-9A-Z]{16}\b/g,
  /\bgithub_pat_[A-Za-z0-9_]{20,}\b/g,
  /\bgh[pousr]_[A-Za-z0-9]{20,}\b/g,
  /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/g,
  /\b(?:api[_-]?key|secret|token|password)\s*[:=]\s*['"]?[A-Za-z0-9_\-/+]{12,}/gi,
];

const FIELD_LIMIT = 2000;

function mix(seed: number, salt: string) {
  let hash = (seed >>> 0) + 2166136261;
  const text = `${salt}:${seed}`;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(seed: number, salt: string, items: readonly T[]): T {
  return items[mix(seed, salt) % items.length] as T;
}

function pickSome<T>(seed: number, salt: string, items: readonly T[], count: number): T[] {
  const pool = [...items];
  const chosen: T[] = [];
  let cursor = mix(seed, salt);
  while (chosen.length < count && pool.length > 0) {
    const index = cursor % pool.length;
    const [item] = pool.splice(index, 1);
    if (item !== undefined) chosen.push(item);
    cursor = Math.imul(cursor ^ 0x9e3779b9, 16777619) >>> 0;
  }
  return chosen;
}

function scrub(value: string): { text: string; redacted: boolean } {
  let text = value.replaceAll("```", "'''");
  let redacted = false;
  for (const pattern of SECRET_PATTERNS) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) redacted = true;
    pattern.lastIndex = 0;
    text = text.replace(pattern, "[redacted]");
  }
  return { text, redacted };
}

function clampField(value: string): { text: string; redacted: boolean; trimmed: boolean } {
  const cleaned = scrub(value.replaceAll("\r\n", "\n"));
  const trimmed = cleaned.text.length > FIELD_LIMIT;
  return {
    text: trimmed ? `${cleaned.text.slice(0, FIELD_LIMIT).trimEnd()}…` : cleaned.text,
    redacted: cleaned.redacted,
    trimmed,
  };
}

function oneLine(value: string, max: number) {
  const collapsed = value.replace(/\s+/g, " ").trim();
  return collapsed.length > max ? `${collapsed.slice(0, max).trimEnd()}…` : collapsed;
}

function packageToken(value: string) {
  const token = value.trim();
  if (!token || !/^[A-Za-z0-9@/_.-]+$/.test(token)) return "";
  return token;
}

function bullets(items: string[]) {
  return items
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join("\n");
}

function renderProse(value: string) {
  const lines = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  const asList = lines.length > 1 && lines.every((line) => line.length < 180);
  if (!asList) return lines.join("\n\n");
  return bullets(lines.map((line) => line.replace(/^[-*]\s+/, "")));
}

function section(title: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return "";
  return `## ${title}\n\n${trimmed}`;
}

function labelFor(key: CommandKey, stack: StackId) {
  if (key === "dev" && (stack === "go" || stack === "rust")) return "Run";
  return commandLabels[key];
}

function commandBlock(commands: Commands, stack: StackId) {
  const lines: string[] = [];
  for (const key of commandKeys) {
    const value = commands[key].trim();
    if (!value) continue;
    lines.push(`- ${labelFor(key, stack)}: \`${value}\``);
  }
  return lines.join("\n");
}

function managerPattern(manager: PackageManagerId) {
  if (manager === "npm") return /(^|[\s;&|])npm(\s|$)/;
  if (manager === "pip") return /\bpip\b|\.venv\b/;
  if (manager === "go") return /(^|[\s;&|])go(\s|$)/;
  return new RegExp(`\\b${manager}\\b`);
}

function focusInvocation(test: string) {
  const command = test.trim();
  if (!command) return "";
  if (/vitest/i.test(command)) return `${command} -t "name"`;
  if (/pytest/i.test(command)) return `${command} -k name`;
  if (/manage\.py test/.test(command)) return `${command} app.tests.Module.TestCase`;
  if (/\bgo test\b/.test(command)) return "go test ./path -run Name";
  if (/\bcargo test\b/.test(command)) return "cargo test name";
  return "";
}

function workspaceFilter(manager: PackageManagerId, packageName: string, script: "test" | "lint") {
  if (manager === "pnpm") return `pnpm --filter ${packageName} ${script}`;
  if (manager === "npm") return `npm run ${script} -w ${packageName}`;
  if (manager === "yarn") return `yarn workspace ${packageName} ${script}`;
  if (manager === "bun") return `bun run --filter ${packageName} ${script}`;
  return "";
}

function mentions(input: { description: string; layout: string; projectName: string }, pattern: RegExp) {
  return pattern.test(`${input.projectName}\n${input.description}\n${input.layout}`);
}

function goLayout(input: { description: string; layout: string; projectName: string }, fallback: string) {
  if (input.layout.trim()) return "";
  if (mentions(input, /\b(cli|command-line|command line|binary)\b/i)) {
    return "A command lives in cmd/<name>/main.go or in main.go, whichever this repo already uses. internal/ stays unimported from outside the module. Keep flag parsing and the work it calls in separate functions so the tests do not need to exec the binary.";
  }
  return fallback;
}

function rustLayout(input: { description: string; layout: string; projectName: string }, fallback: string) {
  if (input.layout.trim()) return "";
  if (mentions(input, /\b(cli|command-line|command line|binary)\b/i) && !mentions(input, /\b(library|crate|lib)\b/i)) {
    return "src/main.rs is the binary. Library modules it uses are declared from that crate. Do not add src/lib.rs unless Cargo.toml already has a library target.";
  }
  return fallback;
}

function agentSections(selected: AgentId[], seed: number) {
  const blocks: string[] = [];
  if (selected.includes("codex")) {
    blocks.push(
      pick(seed, "codex", [
        "Codex reads AGENTS.md before it works. It walks from the repository root down to the working directory, keeps one file per directory (AGENTS.override.md ahead of AGENTS.md), and concatenates them. Closer files come later, so they win a conflict. The combined text stops at project_doc_max_bytes, which is 32 KiB unless that setting was changed. Keep this file short, and put package-only commands in a nested file.",
        "For Codex, this file is part of a chain from the repo root to the current directory. AGENTS.override.md in a directory replaces AGENTS.md there. Codex stops adding files once the chain reaches 32 KiB by default. Do not grow this file past the point where the root rules would be cut off.",
      ]),
    );
  }
  if (selected.includes("cursor")) {
    blocks.push(
      pick(seed, "cursor", [
        "Cursor reads AGENTS.md at the project root and in subdirectories. Nested files combine with parent files, and the more specific file wins. This file is plain Markdown. Do not put it in .cursor/rules: a plain .md file in that folder is ignored. Cursor's rules guidance says to keep rules under 500 lines and to point at a file instead of pasting a long guide.",
        "Cursor treats AGENTS.md as the plain-Markdown alternative to .cursor/rules. Root and nested files both apply; the nested file wins when they conflict. Leave .cursor/rules for .mdc files with frontmatter. Prefer a pointer to a doc over a copy of that doc.",
      ]),
    );
  }
  if (selected.includes("claude")) {
    blocks.push(
      "Claude Code's own project file is CLAUDE.md. Do not delete a CLAUDE.md that is already here. This generator did not re-read the Claude Code changelog. If this checkout's Claude Code loads AGENTS.md, the Markdown above is valid for that path. If it does not, copy the rules you need into CLAUDE.md.",
    );
  }
  if (selected.includes("copilot")) {
    blocks.push(
      pick(seed, "copilot", [
        "GitHub's Copilot coding agent reads a root AGENTS.md and nested AGENTS.md files for the part of the repo they sit in. It also still reads .github/copilot-instructions.md and .github/instructions. Do not delete those files. This note is about the coding agent, not every Copilot surface in the editor.",
        "For the Copilot coding agent, keep this AGENTS.md and keep any .github/copilot-instructions.md that already exists. Nested AGENTS.md files cover the directory they are in. Do not assume editor chat uses the same file.",
      ]),
    );
  }
  if (selected.includes("jules")) {
    blocks.push(
      "Jules looks for AGENTS.md at the repository root. Keep that root file current. This note does not claim Jules reads a nested file.",
    );
  }
  if (selected.includes("aider")) {
    blocks.push(
      [
        "Aider does not treat the name AGENTS.md as special. Add it to .aider.conf.yml so it is loaded read-only:",
        "",
        "```yaml",
        "read: AGENTS.md",
        "```",
        "",
        "A file that is not listed there is not in the chat.",
      ].join("\n"),
    );
  }
  if (selected.includes("generic") || selected.length === 0) {
    blocks.push(
      "Any other agent should treat this as plain Markdown instructions. Do not expect a hidden schema, a frontmatter block, or a required heading.",
    );
  }
  return blocks.join("\n\n");
}

type CleanInput = {
  projectName: string;
  description: string;
  stack: StackId;
  packageManager: PackageManagerId;
  monorepo: boolean;
  focusPackage: string;
  commands: Commands;
  layout: string;
  style: string;
  testing: string;
  commits: string;
  security: string;
  never: string;
  extra: string;
  agents: AgentId[];
  redacted: boolean;
  trimmed: boolean;
  droppedPackage: boolean;
};

function cleanInput(input: AgentsMdInput): CleanInput {
  const fields = [
    input.projectName,
    input.description,
    input.focusPackage,
    input.layout,
    input.style,
    input.testing,
    input.commits,
    input.security,
    input.never,
    input.extra,
    ...commandKeys.map((key) => input.commands[key]),
  ];
  let redacted = false;
  let trimmed = false;
  const cleaned = fields.map((field) => {
    const result = clampField(field);
    redacted = redacted || result.redacted;
    trimmed = trimmed || result.trimmed;
    return result.text;
  });
  const commands = {} as Commands;
  commandKeys.forEach((key, index) => {
    commands[key] = oneLine(cleaned[10 + index] ?? "", 300);
  });
  const focus = packageToken(cleaned[2] ?? "");
  return {
    projectName: oneLine(cleaned[0] ?? "", 80),
    description: oneLine(cleaned[1] ?? "", 500),
    stack: input.stack,
    packageManager: input.packageManager,
    monorepo: input.monorepo,
    focusPackage: focus,
    commands,
    layout: (cleaned[3] ?? "").trim(),
    style: (cleaned[4] ?? "").trim(),
    testing: (cleaned[5] ?? "").trim(),
    commits: (cleaned[6] ?? "").trim(),
    security: (cleaned[7] ?? "").trim(),
    never: (cleaned[8] ?? "").trim(),
    extra: (cleaned[9] ?? "").trim(),
    agents: [...new Set(input.agents)],
    redacted,
    trimmed,
    droppedPackage: Boolean(input.focusPackage.trim()) && !focus,
  };
}

function buildMarkdown(input: CleanInput, seed: number) {
  const copy = stackCopy[input.stack];
  const name = input.projectName || "This repository";
  const lead = input.description
    ? pick(seed, "named", [`${name} — ${input.description}`, `${name}. ${input.description}`, `Project: ${name}. ${input.description}`])
    : pick(seed, "unnamed", [
        `${name} is a ${copy.label} project.`,
        `Work in ${name} follows the ${copy.label} commands in this file.`,
        `${name} (${copy.label}). Use the commands below and do not invent new ones.`,
      ]);
  const setupHeading = pick(seed, "setup-h", ["Setup commands", "Dev environment", "Commands"]);
  const styleHeading = pick(seed, "style-h", ["Code style", "Style and patterns", "Conventions"]);
  const testHeading = pick(seed, "test-h", ["Testing", "Testing instructions", "How to verify a change"]);
  const prHeading = pick(seed, "pr-h", ["Pull requests and commits", "PR instructions", "Before you open a pull request"]);
  const securityHeading = pick(seed, "sec-h", ["Security", "Secrets and security", "Security considerations"]);
  const neverHeading = pick(seed, "never-h", ["Do not", "Out of bounds", "Never do these"]);

  const commandLines = commandBlock(input.commands, input.stack);
  const focus = focusInvocation(input.commands.test);
  const filter = input.monorepo && input.focusPackage ? workspaceFilter(input.packageManager, input.focusPackage, "test") : "";
  const lintFilter = input.monorepo && input.focusPackage ? workspaceFilter(input.packageManager, input.focusPackage, "lint") : "";

  const setupParts = [
    pick(seed, "setup-lead", [
      "Run these from the repository root unless a line says otherwise. Do not swap in a different package manager.",
      "Use these commands as written. A tool that is not listed here is not part of the workflow.",
      "These are the runnable checks. Do not replace them with a command you happen to prefer.",
    ]),
    commandLines || "No commands were provided. Do not invent an install, test, or lint command. Ask for the exact script.",
    filter ? `Package \`${input.focusPackage}\` from the root: \`${filter}\`${lintFilter ? `. Lint that package with \`${lintFilter}\`.` : ""}` : "",
    pick(seed, "done", doneLines),
    ...pickSome(seed, "tips", copy.tips, Math.min(2, copy.tips.length)),
  ];

  const layoutFallback =
    input.stack === "go"
      ? goLayout(input, pick(seed, "layout", copy.layout))
      : input.stack === "rust"
        ? rustLayout(input, pick(seed, "layout", copy.layout))
        : pick(seed, "layout", copy.layout);
  const layoutParts = [
    renderProse(input.layout),
    input.layout.trim() ? "" : layoutFallback,
    input.monorepo ? pick(seed, "layout-mono", layoutMonorepo) : "",
  ];

  const styleItems = input.style.trim()
    ? []
    : pickSome(seed, "style", copy.style, Math.min(4, copy.style.length));
  const styleBody = [
    input.style.trim()
      ? renderProse(input.style)
      : pick(seed, "style-lead", [
          "Where this file is silent, match the file you are editing.",
          "House style below is the default. A linter failure beats a preference.",
          "Follow these unless the file you are editing consistently does otherwise.",
        ]),
    styleItems.length ? bullets(styleItems) : "",
    input.style.trim() ? "If any of that conflicts with the linter named above, the linter wins." : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const testExtras = input.testing.trim() ? [] : pickSome(seed, "testing", copy.testing, Math.min(2, copy.testing.length));
  const testBody = [
    input.testing.trim() ? renderProse(input.testing) : "Test the behavior you change. Do not add a second test runner.",
    testExtras.length ? bullets(testExtras) : "",
    focus ? `To focus one test while you iterate: \`${focus}\`. The full test command still has to pass before you finish.` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  const prBody = [
    input.commits.trim() ? renderProse(input.commits) : bullets(pickSome(seed, "pr", [...sharedPr, ...copy.pr], 3)),
    input.commits.trim() ? "" : "Open the pull request against the default branch unless the task names another base.",
  ]
    .filter(Boolean)
    .join("\n\n");

  const securityItems = [
    ...(input.security.trim() ? [] : pickSome(seed, "sec-shared", sharedSecurity, 3)),
    ...(input.security.trim() ? [] : pickSome(seed, "sec-stack", copy.security, Math.min(2, copy.security.length))),
  ];
  const securityBody = input.security.trim()
    ? `${renderProse(input.security)}\n\nDo not copy a secret into this file to \"clarify\" a rule.`
    : bullets(securityItems);

  const neverItems = input.never.trim()
    ? []
    : [...pickSome(seed, "never-shared", sharedNever, 3), ...pickSome(seed, "never-stack", copy.never, Math.min(2, copy.never.length))];
  const neverBody = input.never.trim() ? renderProse(input.never) : bullets(neverItems);

  const nested = input.monorepo
    ? [
        pick(seed, "mono", monorepoLines),
        input.focusPackage
          ? `The package in view is \`${input.focusPackage}\`. Commands that apply only there belong in that package's AGENTS.md, not in a longer copy of this file.`
          : "This draft has no package name. From the package directory, run the test script that package already defines. Do not guess a workspace filter.",
        "The AGENTS.md homepage says the closest file to the edited file wins. Codex, separately, concatenates files from the root down and lets the closer file come last. Either way, put the exception next to the package and keep the root file short.",
      ].join("\n\n")
    : "";

  const parts = [
    "# AGENTS.md",
    section("Project", [lead, pick(seed, "stack-sentence", copy.sentences), pick(seed, "apply", applyLines)].join("\n\n")),
    section(setupHeading, setupParts.filter(Boolean).join("\n\n")),
    section("Directory layout", layoutParts.filter(Boolean).join("\n\n")),
    section(styleHeading, styleBody),
    section(testHeading, testBody),
    section(prHeading, prBody),
    section(securityHeading, securityBody),
    section(neverHeading, neverBody),
    nested ? section("Nested AGENTS.md files", nested) : "",
    section("Agents that read this file", agentSections(input.agents, seed)),
    input.extra.trim() ? section("Also", renderProse(input.extra)) : "",
    pick(seed, "closing", closingLines),
  ];
  return `${parts.filter(Boolean).join("\n\n")}\n`;
}

function check(id: string, label: string, status: CheckStatus, detail: string): QualityCheck {
  return { id, label, status, detail };
}

function looksLikeCommand(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 300 || /[\n\r]/.test(trimmed)) return false;
  if (/^https?:\/\//i.test(trimmed)) return false;
  return /^[A-Za-z0-9./_]/.test(trimmed);
}

function outputHasSecret(markdown: string) {
  return SECRET_PATTERNS.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(markdown);
  });
}

function score(input: CleanInput, markdown: string): QualityCheck[] {
  const bytes = new TextEncoder().encode(markdown).byteLength;
  const lines = markdown.split("\n").length;
  const install = input.commands.install.trim();
  const test = input.commands.test.trim();
  const lint = input.commands.lint.trim();
  const format = input.commands.format.trim();
  const joined = commandKeys.map((key) => input.commands[key]).join("\n");
  const managerOk = !install || managerPattern(input.packageManager).test(joined);
  const checks: QualityCheck[] = [
    check(
      "name",
      "Project name",
      input.projectName ? "pass" : "fail",
      input.projectName
        ? `The draft names ${input.projectName}.`
        : "The project name is blank, so the draft says \"This repository.\" Add the name before you commit the file.",
    ),
    check(
      "description",
      "Short description",
      input.description ? "pass" : "warn",
      input.description
        ? "The opening section includes the description you wrote."
        : "No description was given. The draft still has commands and rules, but an agent will not know what the project is for.",
    ),
    check(
      "install",
      "Install command",
      install && looksLikeCommand(install) ? "pass" : "fail",
      install
        ? `\`${install}\` is written as a command an agent can run from the root.`
        : "The install line is empty. An agent will not know how to install dependencies.",
    ),
    check(
      "test",
      "Test command",
      test && looksLikeCommand(test) ? "pass" : "fail",
      test
        ? `\`${test}\` is in the draft, with an instruction to run it before finishing.`
        : "There is no test command. The homepage lists testing instructions as one of the sections that help an agent.",
    ),
    check(
      "lint",
      "Lint or format command",
      (lint && looksLikeCommand(lint)) || (format && looksLikeCommand(format)) ? "pass" : "warn",
      lint || format
        ? `Lint is ${lint ? `\`${lint}\`` : "blank"} and format is ${format ? `\`${format}\`` : "blank"}.`
        : "Neither lint nor format is set. Add the command the repo actually uses, or leave a note that this repo has none.",
    ),
    check(
      "style",
      "Code style",
      markdown.includes("## Code style") || markdown.includes("## Style and patterns") || markdown.includes("## Conventions")
        ? "pass"
        : "fail",
      input.style.trim()
        ? "Your style notes are in the draft. A line was added that the named linter wins if they conflict."
        : "Style bullets come from the stack defaults because that box was empty. Delete any that this repo does not follow.",
    ),
    check(
      "testing-notes",
      "Testing instructions",
      /## (Testing|Testing instructions|How to verify a change)/.test(markdown) && (input.testing.trim().length > 0 || Boolean(test))
        ? "pass"
        : "warn",
      input.testing.trim()
        ? "Your testing notes are included above the focus-one-test line, when that line applies."
        : "Testing notes fell back to a short stack default plus the test command. Replace them if this repo tests differently.",
    ),
    check(
      "security",
      "Secrets and security",
      /## (Security|Secrets and security|Security considerations)/.test(markdown) ? "pass" : "fail",
      input.security.trim()
        ? "Your security notes are in the draft, plus a line that says not to paste a secret into the file."
        : "Security bullets are the stack defaults: no secrets in the repo, no pasted credentials, no weakened auth.",
    ),
    check(
      "never",
      "Things the agent must not do",
      /## (Do not|Out of bounds|Never do these)/.test(markdown) ? "pass" : "fail",
      input.never.trim()
        ? "Your never-do notes are a section of their own."
        : "The never-do section is the default list: do not delete tests, do not commit build output, do not push unless asked.",
    ),
    check(
      "secrets",
      "No secrets in the draft",
      outputHasSecret(markdown) ? "fail" : "pass",
      outputHasSecret(markdown)
        ? "A credential-shaped string is still in the draft. Remove it before you commit."
        : input.redacted
          ? "A credential-shaped string in the form was replaced with [redacted]. It was not written into the file."
          : "The draft has no string that matches a private key, a common API-key prefix, or a token assignment.",
    ),
    check(
      "manager",
      "Commands match the package manager",
      managerOk ? "pass" : "warn",
      managerOk
        ? `The commands mention ${input.packageManager}.`
        : `You selected ${input.packageManager}, but the commands do not mention it. An agent may install with the wrong tool.`,
    ),
    check(
      "monorepo",
      "Monorepo / nested files",
      input.monorepo ? (markdown.includes("## Nested AGENTS.md files") ? "pass" : "fail") : "pass",
      input.monorepo
        ? input.focusPackage
          ? `Nested-file guidance is included, with a filter command for ${input.focusPackage}.`
          : "Nested-file guidance is included. No package name was given, so the draft tells the agent not to guess a filter."
        : "Monorepo is off, so the draft does not add a nested-file section.",
    ),
    check(
      "length",
      "Length",
      bytes > 32768 ? "fail" : lines > 220 || bytes < 700 ? "warn" : "pass",
      bytes > 32768
        ? `The draft is ${bytes.toLocaleString("en-US")} bytes. Codex stops adding instruction files at 32 KiB by default, so this file alone can crowd the chain out.`
        : lines > 220
          ? `The draft is ${lines} lines and ${bytes.toLocaleString("en-US")} bytes. Cursor's rules page says to keep rules under 500 lines; a shorter map is easier to follow. Cut the notes that belong in docs/.`
          : bytes < 700
            ? `The draft is only ${bytes.toLocaleString("en-US")} bytes. Add the test command and one rule you actually enforce.`
            : `The draft is ${lines} lines and ${bytes.toLocaleString("en-US")} bytes. That fits under Codex's default 32 KiB combined cap with room for a nested file.`,
    ),
  ];
  if (input.trimmed) {
    checks.push(
      check(
        "trimmed",
        "Pasted text was shortened",
        "warn",
        `A field was longer than ${FIELD_LIMIT.toLocaleString("en-US")} characters and the extra was left out of the file.`,
      ),
    );
  }
  if (input.droppedPackage) {
    checks.push(
      check(
        "package-name",
        "Package name",
        "warn",
        "The package name had characters this draft will not put in a command. Use letters, numbers, and @/_.- only.",
      ),
    );
  }
  return checks;
}

/**
 * Builds an AGENTS.md from the form. Pure function: it does not read the network,
 * write a file, or log the input. Callers in the browser must keep it that way.
 */
export function generateAgentsMd(input: AgentsMdInput, seed: number): AgentsMdResult {
  const cleaned = cleanInput(input);
  const markdown = buildMarkdown(cleaned, seed);
  const checks = score(cleaned, markdown);
  return {
    markdown,
    checks,
    passed: checks.filter((item) => item.status === "pass").length,
    warnings: checks.filter((item) => item.status === "warn").length,
    failed: checks.filter((item) => item.status === "fail").length,
    bytes: new TextEncoder().encode(markdown).byteLength,
    lines: markdown.split("\n").length,
    redacted: cleaned.redacted,
  };
}
