---
title: "AGENTS.md: How to Write One Coding Agents Actually Follow"
description: "An AGENTS.md is plain Markdown with the commands and rules a coding agent should follow. This guide shows what to put in the file, and a free generator that writes one in the browser."
date: "2026-11-10"
updated: "2026-11-10"
category: guide
topics:
  - how-agents-work
  - harnesses
audience:
  - builders
companies:
  - openai
  - cursor
  - github
  - google
byline: "AI Agents Info Editorial"
absoluteTitle: true
takeaways:
  - "The AGENTS.md homepage, read November 10, 2026, says the file is standard Markdown with no required fields. The closest file to the one you are editing wins a conflict, and a chat instruction overrides the file."
  - "Put the repo's real install, test, and lint commands in the file. A package with different commands gets its own nested AGENTS.md."
  - "The free generator at /tools/agents-md-generator runs in the browser. It does not send the form to this site."
sources:
  - title: "AGENTS.md homepage (read November 10, 2026)"
    url: "https://agents.md/"
  - title: "agentsmd/agents.md (read November 10, 2026)"
    url: "https://github.com/agentsmd/agents.md"
  - title: "OpenAI Codex, Custom instructions with AGENTS.md (read November 10, 2026)"
    url: "https://learn.chatgpt.com/docs/agent-configuration/agents-md.md"
  - title: "Cursor, Rules (read November 10, 2026)"
    url: "https://cursor.com/docs/rules"
  - title: "GitHub Changelog, Copilot coding agent now supports AGENTS.md (August 28, 2025; read November 10, 2026)"
    url: "https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/"
  - title: "Aider, Specifying coding conventions (read November 10, 2026)"
    url: "https://aider.chat/docs/usage/conventions.html"
  - title: "Jules docs (read November 10, 2026)"
    url: "https://jules.google/docs/"
  - title: "OpenAI, Harness engineering (February 11, 2026)"
    url: "https://openai.com/index/harness-engineering/"
faq:
  - question: "What is an AGENTS.md?"
    answer: "The AGENTS.md homepage, read November 10, 2026, calls it a README for agents. It is standard Markdown. There are no required fields."
  - question: "What should an AGENTS.md contain?"
    answer: "The homepage's list is a project overview, build and test commands, code style, testing instructions, and security notes, plus anything you would tell a new teammate. The commands have to be the ones the repo actually runs."
  - question: "Where does AGENTS.md go in a monorepo?"
    answer: "A shared file at the root, and another AGENTS.md inside a package whose commands differ. The homepage says the closest file wins. Codex concatenates from the root down and stops at 32 KiB by default."
  - question: "Does the free generator use an AI model?"
    answer: "No. It builds the file in the browser from your answers and from fixed text for each stack. It does not send the form to AI Agents Info."
---

A coding agent follows a file it can execute. The [AGENTS.md homepage](https://agents.md/), read November 10, 2026, calls the file a README for agents: plain Markdown, no required fields, holding the build steps and conventions that would clutter a README written for people. A draft that says "write clean code" and never names a command does not give the agent anything to run.

The free [AGENTS.md generator](/tools/agents-md-generator) turns a stack, a package manager, and your commands into that file in the browser. You can copy it or download `AGENTS.md`. The form is not sent to this site. This note is the reasoning behind the fields.

## What is an AGENTS.md?

A plain Markdown file of instructions for coding agents, with no required fields and no special syntax.

The homepage says the agent parses the text you provide. Headings are yours. The [spec repository](https://github.com/agentsmd/agents.md) shows the same shape in its sample: a dev-environment section, testing instructions, and a short pull-request section, each one a list of commands. The format is stewarded, on that homepage, by the Agentic AI Foundation under the Linux Foundation. The page also says the format came out of work across Codex, Amp, Jules, Cursor, and Factory.

A [harness](/glossary/harness) is the software around the model. An AGENTS.md file is one input that harness can read before it edits the repo. It is not the harness. How many popular repositories had a root file on a named day is [How many repos use AGENTS.md?](/research/how-many-repos-use-agents-md). The live filename search is the [AGENTS.md adoption tracker](/trackers/agents-md). Those pages count files. They do not measure whether an agent followed one.

## What should the file contain?

The commands this repo actually runs, the layout, the style rules you enforce, and the things an agent must not do.

The homepage's own list of useful sections is a project overview, build and test commands, code style, testing instructions, and security considerations, plus commit rules, pull-request rules, and deployment steps you would tell a new teammate. The sample in the spec repo does not explain what pnpm is. It names `pnpm install`, `pnpm test`, and the lint command to run before a commit.

OpenAI's [February 11, 2026 harness-engineering post](https://openai.com/index/harness-engineering/) is the caution against the opposite file. This site's [harness guide](/blog/what-is-an-ai-agent-harness) quotes the claim: a single giant instruction file failed, because a file that marks everything as important guides nothing, and the replacement was a short AGENTS.md of about 100 lines used as a map, with `docs/` as the system of record. That "about 100 lines" is the post's figure, as reported on that guide. It is not a limit measured here. Cursor's [rules page](https://cursor.com/docs/rules), read November 10, 2026, makes a related point: keep rules under 500 lines, point at a file instead of pasting it, and skip the commands an agent already knows. The resolution is practical. Write the commands that are specific to this repo. Leave the git tutorial out.

## Where do you put it in a monorepo?

At the repository root, and again inside a package whose commands are different.

The homepage says agents read the nearest AGENTS.md in the directory tree, so the closest file wins and each package can carry its own instructions. Codex's [docs](https://learn.chatgpt.com/docs/agent-configuration/agents-md.md), read the same day, describe the mechanism in more detail. Codex walks from the repo root down to the working directory, keeps at most one file per directory, prefers `AGENTS.override.md` over `AGENTS.md`, concatenates what it finds, and stops once the chain reaches `project_doc_max_bytes`, 32 KiB by default. Closer files come later, which is how they override. A root file that tries to hold every package's scripts can crowd that cap. Put the exception next to the package.

Cursor's rules page says nested AGENTS.md files combine with parents and the more specific file wins. The Copilot coding agent's [August 28, 2025 changelog](https://github.blog/changelog/2025-08-28-copilot-coding-agent-now-supports-agents-md-custom-instructions/) says the same shape: one file at the root, nested files for parts of the project, and the existing `.github/copilot-instructions.md` still applies. Jules' [docs](https://jules.google/docs/) say Jules looks for AGENTS.md at the repository root. This note does not claim Jules reads a nested file.

## Which coding agents read AGENTS.md?

Codex, Cursor, the Copilot coding agent, and Jules read it. Aider reads it only if you point at the file. This page does not claim a current Claude Code default.

Checked November 10, 2026:

- Codex reads `AGENTS.md` before it works, including the 32 KiB combined cap above.
- Cursor reads `AGENTS.md` at the root and in subdirectories, as a plain-Markdown alternative to `.cursor/rules`. A plain `.md` file inside `.cursor/rules` is ignored.
- The Copilot coding agent reads root and nested `AGENTS.md` files. That changelog is about the coding agent, not every Copilot chat in the editor.
- Jules looks for `AGENTS.md` at the repository root.
- Aider's [conventions doc](https://aider.chat/docs/usage/conventions.html) tells you to list the file under `read` in `.aider.conf.yml`. The name alone does not load it. The generator writes that snippet when you select Aider.

The homepage lists a longer set of products. This note only states the behavior a doc above actually describes. Claude Code's own file is `CLAUDE.md`. The [census note](/research/how-many-repos-use-agents-md) records that a paper dates Claude Code's AGENTS.md support to changelog 2.1.277 on September 18, 2026, and that this desk did not re-read the changelog. Do not delete `CLAUDE.md` because an AGENTS.md now exists.

## Why do agents ignore a file that looks finished?

The file marks everything as important, the commands are not the ones in the repo, or the chat said something else.

The homepage is explicit that a direct chat prompt overrides the file. OpenAI's harness post, via the guide linked above, says a file that treats every rule as critical guides nothing. Cursor says vague guidance and a copy of a style guide are what to avoid, because the linter already encodes the style. A useful file names `uv run pytest` or `go test ./...` or `pnpm --filter web test`, says which directory those commands expect, and lists the few things the agent must not do: do not commit a secret, do not delete a test to get a green run, do not push unless asked.

The homepage also says an agent will try to run the testing commands you list and fix failures before it finishes. That is the homepage's claim about agents that follow the format. It is not a result from a benchmark on this site.

## How do you check the draft before you commit it?

Run the commands you wrote. Then read a checklist that only looks at the file, not at a live agent.

The [AGENTS.md generator](/tools/agents-md-generator) scores the draft it just wrote: a project name, an install command, a test command, lint or format, a security section, a never-do section, no credential-shaped string, commands that mention the package manager you picked, a nested-file section when you said monorepo, and a length under Codex's default 32 KiB. A warning means the draft is thin or this page cannot see your `package.json`. A pass does not mean an agent obeyed the file. Regenerate produces another wording of the same commands and the same rules you typed. The label on a rules draft is "Your generated AGENTS.md." If your browser offers a built-in Prompt API, an optional polish step stays on the device and is labeled separately. This site does not send the form to a model.

For builders, the neighboring pages are the [harness guide](/blog/what-is-an-ai-agent-harness), the [harness evaluation checklist](/tools/ai-agent-harness-evaluation-checklist), and the [prompt checker](/agent-prompt-checker) if the thing you are editing is a tool schema rather than a repo instruction file. To put a product in the directory, use [Submit](/submit).
