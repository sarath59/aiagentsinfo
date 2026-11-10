import type { StackId } from "@/lib/agents-md/types";

export const applyLines = [
  "This file is plain Markdown. There are no required fields. When two AGENTS.md files disagree, follow the one closest to the file you are editing. A direct instruction in the chat overrides this file.",
  "AGENTS.md is ordinary Markdown, not a schema. Prefer the copy nearest the file you change. If the person in the chat contradicts this file, follow the chat.",
  "Read this before you edit. Headings are for people and agents; nothing here is a required key. The closest AGENTS.md wins a conflict with another AGENTS.md, and an explicit chat instruction wins over the file.",
];

export const doneLines = [
  "A change is not done until the test command above has passed, or you have reported the failure you could not fix.",
  "Run the test command after the edit. Fix failures before you stop. Do not report success for a command you did not run.",
  "Finish the listed test command before you consider the task done. If the repo has no test script under that name, say so instead of inventing a runner.",
];

export const closingLines = [
  "If a command above is wrong for this checkout, fix this file before you rely on it.",
  "Update this file when a command changes. A stale command wastes the run.",
  "Treat this file as living notes. Delete a rule that no longer matches the repo.",
];

export const sharedSecurity = [
  "Do not read secrets aloud in the reply, print them in logs, or commit them. .env files stay out of git.",
  "If a task needs a credential, say which environment variable to set. Do not paste the value into source, tests, fixtures, or this file.",
  "Do not weaken authentication, CORS, or TLS to make a request succeed.",
  "Do not send the repository to a service this file does not name.",
];

export const sharedNever = [
  "Do not revert or rewrite changes you did not make.",
  "Do not delete or skip a test to make a suite pass.",
  "Do not commit generated output, a lockfile change you did not cause, or files under a build directory.",
  "Do not claim a command passed if you did not run it.",
  "Do not push, force-push, or tag a release unless the task says so.",
];

export const sharedPr = [
  "The subject says what changed, in the imperative, and stays under 72 characters.",
  "The body says why, and names the commands you ran.",
  "Do not add an AI-attribution trailer unless the commits section above asks for one.",
];

type StackCopy = {
  label: string;
  sentences: string[];
  layout: string[];
  style: string[];
  testing: string[];
  security: string[];
  never: string[];
  tips: string[];
  pr: string[];
};

export const stackCopy: Record<StackId, StackCopy> = {
  next: {
    label: "TypeScript / Next.js",
    sentences: [
      "This is a TypeScript Next.js app. Match the App Router files that are already here.",
      "The stack is TypeScript and Next.js. Keep route files thin and shared UI in components.",
      "You are in a TypeScript Next.js repo. Do not introduce the Pages Router beside the App Router unless a task names that file.",
    ],
    layout: [
      "app/ holds routes. components/ holds UI. lib/ holds shared code. public/ is static. Do not put server-only code in a file that starts with \"use client\".",
      "Routes live in app/. Shared UI lives in components/. Helpers live in lib/. A client component is the exception, and the file says why.",
    ],
    style: [
      "TypeScript strict. Do not use any, or a ts-ignore comment, to silence a check.",
      "Server Components by default. Add \"use client\" only when the file needs state, effects, or a browser API.",
      "Keep data fetches in Server Components. Do not move a server fetch into a client component to make the types easier.",
      "Validate input that crosses the network at the boundary the repo already uses.",
      "Match the import style of the file you touch. Do not reformat unrelated files.",
      "A browser-exposed environment variable must already be a NEXT_PUBLIC_ name this repo uses. Do not invent one for a secret.",
    ],
    testing: [
      "Add or update a test for the behavior you change, in the test runner this file names.",
      "Do not mock the module you are trying to prove. Mock the edge the existing tests already mock.",
      "A UI change still needs the check the repo uses, even when that check is a typecheck plus lint.",
    ],
    security: [
      "Do not put a secret in NEXT_PUBLIC_ or in a client component.",
      "Do not disable a security header or an auth check to unblock a page.",
    ],
    never: [
      "Do not edit .next, node_modules, or another generated directory.",
      "Do not turn off an ESLint rule to force a green lint.",
      "Do not add a new data library when the repo already has one for that job.",
    ],
    tips: [
      "Read package.json before you run a script. If the test script is missing, say so. Do not invent vitest, jest, or playwright.",
      "After a route or import move, run the lint command so the Next.js and TypeScript rules still pass.",
      "Server Actions and route handlers stay on the server. Do not import a server-only module into a client file.",
      "Prefer the existing loading and error files in a route segment over a new wrapper.",
      "Images and fonts go through the helpers the app already uses.",
      "Do not bump Next.js or React unless the task is a dependency upgrade.",
    ],
    pr: [
      "Screenshots are useful for a visible UI change and noise for a type-only change. Skip them when nothing visual changed.",
    ],
  },
  node: {
    label: "TypeScript / Node",
    sentences: [
      "This is a TypeScript Node project. Match the module system already set in package.json.",
      "The stack is TypeScript on Node. Validate input at the process or request boundary.",
      "You are in a TypeScript Node repo. Do not add a second runtime or a second test runner.",
    ],
    layout: [
      "src/ holds the code that ships. tests/ or the colocated *.test.ts files hold the checks. Do not put runnable source in dist/.",
      "Entry point is the one package.json already names. Library code stays importable without starting the server.",
    ],
    style: [
      "Match \"type\" in package.json. Do not mix ESM and CommonJS in one package.",
      "TypeScript strict. Do not silence a check with any.",
      "Handle errors from the filesystem and the network. Do not catch and ignore them.",
      "Public functions that cross a module boundary have parameter and return types.",
      "Match the formatter the format command names. Do not hand-format a file and skip that command.",
    ],
    testing: [
      "Use the test script in this file. Do not add Jest beside Vitest, or the reverse.",
      "A bug fix needs a test that failed before the fix when the repo already tests that layer.",
    ],
    security: [
      "Do not log request headers, cookies, or connection strings.",
      "Bind a debug server to localhost unless the task says otherwise.",
    ],
    never: [
      "Do not commit dist/, coverage/, or node_modules.",
      "Do not add a dependency for a function the standard library already has.",
    ],
    tips: [
      "Read the scripts in package.json and run those names. A script that is not listed does not exist.",
      "If the typecheck command is tsc, a red typecheck is a failed task even when the tests are green.",
      "Keep side effects out of imported modules. Start servers from the entry file.",
    ],
    pr: ["Name the script you ran, not a vague \"tests pass\"."],
  },
  fastapi: {
    label: "Python / FastAPI",
    sentences: [
      "This is a Python FastAPI service. Routes stay thin; the work they call is what the tests import.",
      "The stack is FastAPI on Python. Request and response bodies are Pydantic models.",
      "You are in a FastAPI repo. Do not add a second web framework.",
    ],
    layout: [
      "app/main.py builds the application. Routers live under app/. tests/ mirrors the modules it covers. A route change updates the router and the test.",
      "The app factory is the one the dev command imports. Do not create a second FastAPI() in a router module.",
    ],
    style: [
      "Type hints on functions that cross a module boundary.",
      "Request and response bodies are Pydantic models. Do not accept a raw dict in a route.",
      "Route functions stay thin. Put the work in a function a test can call without HTTP.",
      "Use the existing dependency for the database session. Do not open a new engine per request.",
      "Raise the HTTP error the route already uses, or the domain error the app maps. Do not return 200 with an error string.",
      "Ruff is the lint and format step when the commands above say ruff. Do not add a second formatter.",
    ],
    testing: [
      "Use the TestClient or httpx fixture the suite already has. Do not invent a new client per file.",
      "One test module per router is the default when tests/ is laid out that way.",
      "A schema change needs a test for the rejected body, not only the happy path.",
    ],
    security: [
      "Do not log Authorization headers, cookies, or full request bodies.",
      "Do not enable debug reload in a command you describe as production.",
      "Read the database URL from the environment. Do not hard-code it.",
    ],
    never: [
      "Do not commit .venv, __pycache__, or .env.",
      "Do not catch a bare Exception and continue as if the call worked.",
      "Do not add Flask or Django beside FastAPI.",
    ],
    tips: [
      "The app import path in the dev command is the one to keep. Do not guess a new module path.",
      "If mypy is in the typecheck command and this repo has no mypy config, say so and skip that line rather than adding a config you were not asked for.",
      "Dependency pins live in the lockfile the install command uses. Do not pip install a package into a uv project.",
      "Async routes await their I/O. Do not call a blocking client inside an async route.",
    ],
    pr: ["Mention a migration or a schema change in the pull-request body when the API shape changes."],
  },
  django: {
    label: "Python / Django",
    sentences: [
      "This is a Django project. Models, migrations, and tests stay in the app that owns them.",
      "The stack is Django. Use the ORM and the settings module the repo already starts.",
      "You are in a Django repo. manage.py is the entry the commands above use.",
    ],
    layout: [
      "Each Django app owns its models, views, and tests. Project settings stay in the settings package. Do not put app code in the project package.",
      "Templates and static files live where that app already puts them. Do not start a second template tree.",
    ],
    style: [
      "Use the ORM. Do not build SQL by formatting strings.",
      "A model change ships as a new migration. Do not edit a migration that has already been applied on a shared database.",
      "Views and forms validate input. Do not trust request data.",
      "Settings secrets come from the environment. Do not commit a local settings file that holds a password.",
    ],
    testing: [
      "Use the test command in this file. Django's test runner and pytest are not interchangeable; do not switch them.",
      "A model change needs a test that loads the constraint you added.",
    ],
    security: [
      "Do not set DEBUG to True in a command you describe as production.",
      "Do not disable CSRF because a client forgot the token.",
    ],
    never: [
      "Do not run migrate against a database you were not told to use.",
      "Do not commit .venv, local settings, or media uploads.",
    ],
    tips: [
      "makemigrations is a deliberate step. Run it only when a model changed, and read the migration before you commit it.",
      "The settings module is the one manage.py already uses. Do not add a third settings file for a one-line change.",
    ],
    pr: ["List new migrations by filename in the pull-request body."],
  },
  go: {
    label: "Go",
    sentences: [
      "This is a Go module. Run tests from the module root with the command in this file.",
      "The stack is Go. The standard library comes first. A new dependency needs a reason.",
      "You are in a Go repo. gofmt is the format, and a returned error is part of the result.",
    ],
    layout: [
      "Library packages sit at the module root or under internal/. A command belongs in cmd/ or in main.go, whichever this repo already uses. Do not add a second main package.",
      "internal/ is not importable from outside this module. Put shared helpers there when they must not be a public API.",
    ],
    style: [
      "Return errors. Do not assign an error to _ unless the previous line says why that call cannot fail.",
      "Context is the first parameter when the surrounding package already takes a context.",
      "gofmt is the format. Do not hand-align a block and skip gofmt.",
      "Exported names have a doc comment when the package already documents exports.",
      "Keep the handler, the parser, and the CLI flag code in the package that already owns them.",
    ],
    testing: [
      "Table-driven tests for parsers, flags, and error strings.",
      "go test ./... from the module root is the full check. A focused -run is extra, not a replacement, unless you are iterating.",
      "Do not hide a race. If the package uses goroutines, the race detector is appropriate when you touch that code.",
    ],
    security: [
      "Do not embed a token in a string literal or in a default flag value.",
      "Read a credential from the environment only when the command needs it, and do not log it.",
    ],
    never: [
      "Do not add a dependency for a function the standard library already has.",
      "Do not ignore err.",
      "Do not run go get in a way that upgrades unrelated modules.",
    ],
    tips: [
      "A CLI entry is main.go in the package the dev command runs. Do not move it and leave the command stale.",
      "go vet failures are failures. Fix them or report them.",
      "Module path changes are rare. Do not edit the module line in go.mod unless the task is a rename.",
      "Build tags and cgo stay as they are unless the task mentions them.",
    ],
    pr: ["Name the packages you ran tests in if you did not run ./..."],
  },
  rust: {
    label: "Rust",
    sentences: [
      "This is a Rust crate. Public library paths return Result. Tests and binaries may unwrap when the message states the invariant.",
      "The stack is Rust, built with cargo. fmt and clippy are part of done when the commands above list them.",
      "You are in a Rust repo. Do not add a second build system beside cargo.",
    ],
    layout: [
      "src/lib.rs is the crate root for a library. Public modules are declared there. tests/ holds integration tests that use the crate the way an external caller would.",
      "A binary crate uses src/main.rs. Do not add a library root and a binary root in the same crate unless Cargo.toml already defines both.",
    ],
    style: [
      "Public functions on a library path return Result. Do not unwrap on an error a caller can trigger.",
      "cargo fmt before you finish. Clippy warnings that the lint command denies are failures.",
      "A public item gets a rustdoc line when the crate already documents public items.",
      "Do not add unsafe without a SAFETY comment in the same block.",
      "Match the error type the crate already uses. Do not introduce a new error crate for one function.",
      "Keep traits and their tests next to the code they describe.",
    ],
    testing: [
      "cargo test runs unit tests and tests/ together. Add a test for each new error variant.",
      "A parser change needs a fixture in the tests the crate already keeps, not a println.",
      "Do not #[ignore] a test to get a green run.",
    ],
    security: [
      "Do not log raw identifier or credential input in full.",
      "Unsafe stays exceptional. A safe standard-library function is the default.",
    ],
    never: [
      "Do not publish, and do not bump the version in Cargo.toml, unless the task asked for a release.",
      "Do not add a build.rs that downloads code.",
      "Do not silence a clippy lint for the whole crate to clear one line.",
    ],
    tips: [
      "Read Cargo.toml for the crate name and the targets before you add a file.",
      "cargo check is the typecheck. A red check is a failed task.",
      "Features and optional dependencies stay off unless the task names the feature.",
      "Integration tests cannot see private items. Do not make an item public only so a test can reach it; test private behavior in the module.",
    ],
    pr: ["Say whether you ran cargo test, cargo fmt, and cargo clippy."],
  },
  other: {
    label: "this stack",
    sentences: [
      "Follow the commands in this file. Do not assume a language toolchain that is not listed.",
      "The commands below are the contract. A tool that is not named here is not part of the workflow.",
      "Use the layout notes and the commands. Where they are silent, match the file you are editing.",
    ],
    layout: [
      "Follow the directory notes in this file. Do not create a new top-level folder for a change that fits an existing one.",
    ],
    style: [
      "Match the style of the file you are editing.",
      "Do not add a formatter, a linter, or a test runner that this file does not name.",
      "A public function keeps the error style the surrounding code uses.",
    ],
    testing: [
      "Run the test command as written. A focused invocation is fine while you iterate; the full command still has to pass.",
    ],
    security: [
      "Do not invent a place to store secrets. Use the environment, and keep the value out of the diff.",
    ],
    never: [
      "Do not add a dependency, a framework, or a code generator the task did not ask for.",
    ],
    tips: [
      "If a command is blank, do not guess it. Say which command is missing.",
      "Read the nearest build file before you edit it.",
    ],
    pr: ["List the commands you actually ran."],
  },
};

export const monorepoLines = [
  "This repository is a monorepo. This file is the shared map. A package whose commands differ gets its own AGENTS.md in that package, and that closer file wins when the two disagree.",
  "Monorepo: keep cross-cutting rules here. Put package-specific install, test, and lint commands in an AGENTS.md next to that package. The closest file to the file you edit is the one to follow.",
  "Several packages share this repo. Do not copy every package's scripts into this file. Add a nested AGENTS.md beside a package that is different, and leave this file as the map.",
];

export const layoutMonorepo = [
  "Check the name field inside the package you are editing before you pass it to a workspace filter. Skip the root package name.",
  "The workspace file lists the members. A filter command uses the package name, not the folder name, when those two differ.",
];
