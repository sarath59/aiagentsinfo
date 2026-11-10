export const stacks = [
  { id: "next", label: "TypeScript / Next.js" },
  { id: "node", label: "TypeScript / Node" },
  { id: "fastapi", label: "Python / FastAPI" },
  { id: "django", label: "Python / Django" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "other", label: "Other" },
] as const;

export type StackId = (typeof stacks)[number]["id"];

export const packageManagers = [
  { id: "pnpm", label: "pnpm" },
  { id: "npm", label: "npm" },
  { id: "yarn", label: "yarn" },
  { id: "bun", label: "bun" },
  { id: "uv", label: "uv" },
  { id: "pip", label: "pip" },
  { id: "poetry", label: "poetry" },
  { id: "cargo", label: "cargo" },
  { id: "go", label: "go" },
] as const;

export type PackageManagerId = (typeof packageManagers)[number]["id"];

export const commandKeys = ["install", "dev", "build", "test", "lint", "format", "typecheck"] as const;

export type CommandKey = (typeof commandKeys)[number];

export type Commands = Record<CommandKey, string>;

export const agents = [
  { id: "codex", label: "Codex" },
  { id: "cursor", label: "Cursor" },
  { id: "claude", label: "Claude Code" },
  { id: "copilot", label: "Copilot coding agent" },
  { id: "jules", label: "Jules" },
  { id: "aider", label: "Aider" },
  { id: "generic", label: "Generic" },
] as const;

export type AgentId = (typeof agents)[number]["id"];

export type AgentsMdInput = {
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
};

export type CheckStatus = "pass" | "warn" | "fail";

export type QualityCheck = {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
};

export type AgentsMdResult = {
  markdown: string;
  checks: QualityCheck[];
  passed: number;
  warnings: number;
  failed: number;
  bytes: number;
  lines: number;
  redacted: boolean;
};
