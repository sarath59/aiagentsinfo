import type { AgentsMdInput } from "@/lib/agents-md/types";
import { defaultCommands } from "@/lib/agents-md/defaults";

export type WorkedExample = {
  id: string;
  label: string;
  blurb: string;
  input: AgentsMdInput;
};

export const workedExamples: WorkedExample[] = [
  {
    id: "next-monorepo",
    label: "Next.js + pnpm monorepo",
    blurb: "A storefront split into a web app and a shared UI package.",
    input: {
      projectName: "Northwind",
      description: "A TypeScript Next.js storefront split into a web app and a shared UI package.",
      stack: "next",
      packageManager: "pnpm",
      monorepo: true,
      focusPackage: "web",
      commands: {
        ...defaultCommands("next", "pnpm"),
        test: "pnpm test",
        lint: "pnpm lint",
      },
      layout:
        "apps/web is the Next.js app. packages/ui holds shared components. pnpm-workspace.yaml lists both.",
      style:
        "TypeScript strict. Server Components by default. Client components only when the file needs state or a browser API.",
      testing:
        "Add or update a test for every behavior change. The integration test under apps/web/tests hits the route, not a mock of the route.",
      commits: "Conventional Commits. Run lint and test before opening the pull request.",
      security: "Secrets live in the host environment. .env.local is gitignored. Do not put a secret in a NEXT_PUBLIC_ variable.",
      never:
        "Do not edit .next or node_modules. Do not disable a lint rule to make a check pass. Do not commit a lockfile change you did not cause.",
      extra: "",
      agents: ["codex", "cursor"],
    },
  },
  {
    id: "fastapi-uv",
    label: "FastAPI + uv",
    blurb: "A Python service with routers, pytest, and ruff.",
    input: {
      projectName: "Harbor API",
      description: "A Python FastAPI service that stores shipment status.",
      stack: "fastapi",
      packageManager: "uv",
      monorepo: false,
      focusPackage: "",
      commands: defaultCommands("fastapi", "uv"),
      layout: "app/main.py creates the app. app/routes/ holds routers. tests/ mirrors app/.",
      style: "Type hints on public functions. Pydantic models for request bodies. No business logic in route functions.",
      testing: "pytest. One test file per router. Use the TestClient fixture in tests/conftest.py.",
      commits: "Imperative subject, under 72 characters. Name the test command you ran.",
      security: "Read the database URL from the environment. Do not log request headers.",
      never: "Do not run the app with reload in a command you describe as production. Do not catch Exception and ignore it.",
      extra: "",
      agents: ["codex", "copilot"],
    },
  },
  {
    id: "go-cli",
    label: "Go CLI",
    blurb: "A small command-line tool with cmd/ and internal/.",
    input: {
      projectName: "shipctl",
      description: "A Go command-line tool that prints the latest release notes for a module.",
      stack: "go",
      packageManager: "go",
      monorepo: false,
      focusPackage: "",
      commands: {
        ...defaultCommands("go", "go"),
        dev: "go run ./cmd/shipctl",
        build: "go build -o bin/shipctl ./cmd/shipctl",
      },
      layout: "cmd/shipctl/main.go is the binary. internal/notes parses the feed. go.mod is the module file.",
      style: "Handle every error. Doc comments on exported functions.",
      testing: "Table tests in the package under test. go test ./... from the module root.",
      commits: "The subject says what the change does.",
      security: "Do not embed a token in the binary. Read a token from the environment only when the command needs it.",
      never: "Do not add a dependency for a function the standard library already has. Do not ignore err.",
      extra: "",
      agents: ["cursor", "jules"],
    },
  },
  {
    id: "rust-library",
    label: "Rust library",
    blurb: "A library crate with integration tests and clippy.",
    input: {
      projectName: "quay",
      description: "A Rust library crate for parsing compact identifiers.",
      stack: "rust",
      packageManager: "cargo",
      monorepo: false,
      focusPackage: "",
      commands: defaultCommands("rust", "cargo"),
      layout: "src/lib.rs is the crate root. src/parse.rs holds the parser. tests/ has integration tests.",
      style: "Public functions return Result. No unwrap on a path a caller can trigger.",
      testing: "cargo test covers unit and integration tests. Add a test for each new error variant.",
      commits: "The subject names the behavior, not the file list.",
      security: "Do not use unsafe unless the SAFETY comment is in the same block. Do not log identifier inputs in full.",
      never: "Do not bump the version in Cargo.toml unless asked. Do not add a build.rs that downloads code.",
      extra: "",
      agents: ["aider", "generic"],
    },
  },
];

export function blankInput(): AgentsMdInput {
  return {
    projectName: "",
    description: "",
    stack: "next",
    packageManager: "pnpm",
    monorepo: false,
    focusPackage: "",
    commands: defaultCommands("next", "pnpm"),
    layout: "",
    style: "",
    testing: "",
    commits: "",
    security: "",
    never: "",
    extra: "",
    agents: ["codex", "cursor"],
  };
}
