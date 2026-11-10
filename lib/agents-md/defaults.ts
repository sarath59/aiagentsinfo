import type { CommandKey, Commands, PackageManagerId, StackId } from "@/lib/agents-md/types";

const jsManagers: PackageManagerId[] = ["pnpm", "npm", "yarn", "bun"];
const pyManagers: PackageManagerId[] = ["uv", "pip", "poetry"];

export function packageManagersFor(stack: StackId): PackageManagerId[] {
  if (stack === "go") return ["go"];
  if (stack === "rust") return ["cargo"];
  if (stack === "fastapi" || stack === "django") return pyManagers;
  if (stack === "other") return [...jsManagers, ...pyManagers, "cargo", "go"];
  return jsManagers;
}

export function defaultPackageManager(stack: StackId): PackageManagerId {
  if (stack === "go") return "go";
  if (stack === "rust") return "cargo";
  if (stack === "fastapi" || stack === "django") return "uv";
  return "pnpm";
}

function js(pm: PackageManagerId, script: string): string {
  if (pm === "pnpm") return `pnpm ${script}`;
  if (pm === "npm") return script === "install" ? "npm install" : `npm run ${script}`;
  if (pm === "yarn") return script === "install" ? "yarn install" : `yarn ${script}`;
  if (pm === "bun") return script === "install" ? "bun install" : `bun run ${script}`;
  return `${pm} ${script}`;
}

function py(pm: PackageManagerId, command: string): string {
  if (pm === "uv") return `uv run ${command}`;
  if (pm === "poetry") return `poetry run ${command}`;
  return `./.venv/bin/${command}`;
}

export function defaultCommands(stack: StackId, pm: PackageManagerId): Commands {
  if (stack === "go" || pm === "go") {
    return {
      install: "go mod download",
      dev: "go run .",
      build: "go build .",
      test: "go test ./...",
      lint: "go vet ./...",
      format: "gofmt -w .",
      typecheck: "",
    };
  }
  if (stack === "rust" || pm === "cargo") {
    return {
      install: "cargo fetch",
      dev: "",
      build: "cargo build",
      test: "cargo test",
      lint: "cargo clippy --all-targets -- -D warnings",
      format: "cargo fmt",
      typecheck: "cargo check",
    };
  }
  if (stack === "fastapi") {
    const uvicorn =
      pm === "pip" ? "./.venv/bin/uvicorn app.main:app --reload" : py(pm, "uvicorn app.main:app --reload");
    return {
      install: pm === "uv" ? "uv sync" : pm === "poetry" ? "poetry install" : "python -m venv .venv && ./.venv/bin/pip install -e \".[dev]\"",
      dev: uvicorn,
      build: "",
      test: py(pm, "pytest"),
      lint: py(pm, "ruff check ."),
      format: py(pm, "ruff format ."),
      typecheck: py(pm, "mypy ."),
    };
  }
  if (stack === "django") {
    const manage = (args: string) => (pm === "pip" ? `./.venv/bin/python manage.py ${args}` : py(pm, `python manage.py ${args}`));
    return {
      install: pm === "uv" ? "uv sync" : pm === "poetry" ? "poetry install" : "python -m venv .venv && ./.venv/bin/pip install -e \".[dev]\"",
      dev: manage("runserver"),
      build: "",
      test: manage("test"),
      lint: py(pm, "ruff check ."),
      format: py(pm, "ruff format ."),
      typecheck: py(pm, "mypy ."),
    };
  }
  const runner = jsManagers.includes(pm) ? pm : "pnpm";
  const typecheck =
    runner === "pnpm"
      ? "pnpm exec tsc --noEmit"
      : runner === "npm"
        ? "npx tsc --noEmit"
        : runner === "yarn"
          ? "yarn tsc --noEmit"
          : "bunx tsc --noEmit";
  const format =
    runner === "pnpm"
      ? "pnpm exec prettier --write ."
      : runner === "npm"
        ? "npx prettier --write ."
        : runner === "yarn"
          ? "yarn prettier --write ."
          : "bunx prettier --write .";
  return {
    install: js(runner, "install"),
    dev: js(runner, "dev"),
    build: js(runner, "build"),
    test: js(runner, "test"),
    lint: js(runner, "lint"),
    format,
    typecheck,
  };
}

export const commandLabels: Record<CommandKey, string> = {
  install: "Install",
  dev: "Dev server",
  build: "Build",
  test: "Test",
  lint: "Lint",
  format: "Format",
  typecheck: "Typecheck",
};
