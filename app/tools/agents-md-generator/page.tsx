import Link from "next/link";
import { AgentsMdGenerator } from "@/components/AgentsMdGenerator";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { AGENTS_MD_READ_ON, agentsMdSources } from "@/lib/agents-md/sources";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const path = "/tools/agents-md-generator";
const title = "AGENTS.md Generator: Free, Instant, for Codex, Cursor, and Copilot";
const description =
  "Write an AGENTS.md in the browser from your stack, commands, and rules. Copy or download the Markdown. Nothing you type is stored.";

const faqs = [
  {
    question: "What is an AGENTS.md file?",
    answer:
      "The AGENTS.md homepage, read November 10, 2026, calls it a README for agents: standard Markdown, with no required fields. You choose the headings. The file holds the build steps, tests, and conventions that would clutter a README written for people.",
  },
  {
    question: "Does this generator call an AI model?",
    answer:
      "No. The draft is built in your browser from the fields you fill and from fixed text for each stack. Regenerate changes the wording of that draft. It does not call a model hosted by AI Agents Info. If Chrome offers its built-in Prompt API, Polish on this device can tighten the wording on this device. A rules draft is labeled “Your generated AGENTS.md” and is not attributed to a named model.",
  },
  {
    question: "Is what I type stored?",
    answer:
      "No. The form is not sent to this site and it is not written to a log. Do not put secrets in the form anyway. A string that looks like a private key or a common API token is replaced with [redacted] before it is written into the draft.",
  },
  {
    question: "Are there required fields in AGENTS.md?",
    answer:
      "No. The homepage says an agent parses the Markdown you provide. This generator uses headings for commands, style, testing, and security because that page lists those as the sections that help an agent.",
  },
  {
    question: "How should a monorepo use AGENTS.md?",
    answer:
      "Put a shared file at the repository root and another AGENTS.md inside a package whose commands differ. The homepage says the closest file to the edited file wins, and that a chat instruction overrides the file. Codex’s docs, read November 10, 2026, describe a different mechanism with the same practical result: it concatenates files from the root down to the working directory, the closer file comes last, and the chain stops at project_doc_max_bytes, 32 KiB by default.",
  },
  {
    question: "Will Codex, Cursor, or Copilot follow every line?",
    answer:
      "Those products can read the file. That is not a promise they will follow every line. The homepage says an agent will try to run testing commands you list, and that a direct chat instruction overrides the file. The checklist on this page scores the draft you are about to commit. It does not score a live agent run.",
  },
  {
    question: "Can I use the file with Claude Code?",
    answer:
      "Claude Code’s own project file is CLAUDE.md. This page does not claim your build loads AGENTS.md. A research note on this site records that a paper dates Claude Code support to changelog 2.1.277 on September 18, 2026, and that this desk did not re-read that changelog. If the rules need to apply in Claude Code, copy them into CLAUDE.md.",
  },
  {
    question: "How is this different from the prompt checker?",
    answer:
      "The prompt checker sends a prompt and tool JSON to this site so the server can check the schema and count tokens. That text is not stored. This generator never sends the form. It writes an AGENTS.md file you can copy or download.",
  },
];

const steps = [
  {
    title: "Name the repo and pick the stack",
    body: "The command fields fill with the usual install, test, lint, and format lines for that stack and package manager. Edit any line this repo does not actually run.",
  },
  {
    title: "Add the rules you would tell a new teammate",
    body: "Layout, style, tests, pull requests, secrets, and the things an agent must not do. Leave a box blank and the draft uses a short default for that stack. Delete a default that does not match the repo.",
  },
  {
    title: "Choose who the notes are for",
    body: "Codex, Cursor, the Copilot coding agent, Jules, and Aider notes follow public docs read November 10, 2026. Claude Code gets a caution instead of a claim this page did not re-check.",
  },
  {
    title: "Copy or download, then read the checklist",
    body: "The checklist looks for a runnable install and test command, a security section, a never-do section, and a length that fits Codex’s default 32 KiB cap. Regenerate writes a different wording of the same facts. Confirm every command against the repo before you commit the file.",
  },
];

const siblings = [
  { href: "/agent-prompt-checker", title: "Prompt and tool checker", body: "Schema and token check for a prompt and its tools." },
  { href: "/tools/ai-agent-harness-evaluation-checklist", title: "Harness evaluation checklist", body: "Twelve sourced yes-or-no checks. Nothing is saved." },
  { href: "/tools/agent-picker", title: "Which AI agent fits me?", body: "Four questions and three directory links." },
  { href: "/agent-cost-calculator", title: "AI agent cost calculator", body: "A 30-day token bill from official prices." },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function AgentsMdGeneratorPage() {
  const updatedLabel = formatDate(AGENTS_MD_READ_ON);
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: AGENTS_MD_READ_ON,
            dateModified: AGENTS_MD_READ_ON,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "AGENTS.md Generator",
            url: path,
            description,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: { price: 0, priceCurrency: "USD" },
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "AGENTS.md generator", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          It writes an AGENTS.md from your stack and commands, in the browser, with Copy and Download. No account.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Format notes from{" "}
          <a className="text-[var(--link)] underline" href="https://agents.md/">
            agents.md
          </a>{" "}
          and{" "}
          <a className="text-[var(--link)] underline" href="https://github.com/agentsmd/agents.md">
            agentsmd/agents.md
          </a>
          , read <time dateTime={AGENTS_MD_READ_ON}>{updatedLabel}</time>. The guide is{" "}
          <Link className="text-[var(--link)] underline" href="/blog/how-to-write-an-agents-md-coding-agents-follow">
            AGENTS.md: How to Write One Coding Agents Actually Follow
          </Link>
          .
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <AgentsMdGenerator />

        <section className="mt-14" aria-labelledby="how-to">
          <h2 id="how-to" className="text-2xl font-semibold tracking-tight">
            How do you use the generator?
          </h2>
          <ol className="mt-4 grid gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="glass rounded-3xl p-5">
                <p className="kicker">Step {index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">What did the format page actually say?</h2>
          <div className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <p>
              On {updatedLabel} the{" "}
              <a className="text-[var(--link)] underline" href="https://agents.md/">
                AGENTS.md homepage
              </a>{" "}
              described the file as a simple, open format for guiding coding agents, a README for agents, kept separate
              so a human README can stay short. It said there are no required fields. It said the closest AGENTS.md to
              the edited file wins when instructions conflict, and that an explicit user chat prompt overrides the file.
              It said an agent will try to run testing commands you list. It recommended a nested file inside each
              package of a large monorepo. The{" "}
              <a className="text-[var(--link)] underline" href="https://github.com/agentsmd/agents.md">
                spec repository
              </a>{" "}
              shows the same idea in a sample: dev commands, testing instructions, and a pull-request section.
            </p>
            <p className="mt-3">
              Product behavior is narrower than the homepage’s compatibility list, so this tool only adds a product note
              when a public doc was read that day. Codex concatenates files and stops at 32 KiB by default (
              <a
                className="text-[var(--link)] underline"
                href="https://learn.chatgpt.com/docs/agent-configuration/agents-md.md"
              >
                OpenAI’s Codex docs
              </a>
              ). Cursor reads root and nested AGENTS.md files and tells you to keep rules under 500 lines (
              <a className="text-[var(--link)] underline" href="https://cursor.com/docs/rules">
                Cursor’s rules page
              </a>
              ). The Copilot coding agent’s August 28, 2025 changelog says it reads root and nested AGENTS.md files and
              still reads <code>.github/copilot-instructions.md</code>. Jules’ docs say it looks for AGENTS.md at the
              repository root. Aider loads the file only if <code>.aider.conf.yml</code> lists it under <code>read</code>.
            </p>
            <p className="mt-3">
              Counts of how many repositories have the file are a different page. The live filename search is the{" "}
              <Link className="text-[var(--link)] underline" href="/trackers/agents-md">
                AGENTS.md adoption tracker
              </Link>
              . The October 16, 2026 census is{" "}
              <Link className="text-[var(--link)] underline" href="/research/how-many-repos-use-agents-md">
                How many repos use AGENTS.md?
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Other free tools</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {siblings.map((tool) => (
              <li key={tool.href} className="glass rounded-3xl p-5">
                <h3 className="font-semibold">
                  <Link href={tool.href}>{tool.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{tool.body}</p>
                <Link href={tool.href} className="mt-3 inline-block text-sm text-[var(--link)] underline">
                  Use tool
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Next steps</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="text-[var(--link)] underline" href="/blog/how-to-write-an-agents-md-coding-agents-follow">
                Read the short guide
              </Link>
              <span className="text-[var(--muted)]"> on what to put in the file, and what to leave out.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/trackers/agents-md">
                AGENTS.md adoption tracker
              </Link>
              <span className="text-[var(--muted)]"> for the live filename count, next to the October census.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/for/builders">
                For builders
              </Link>
              <span className="text-[var(--muted)]"> collects the harness, eval, and cost pages.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/tools">
                All free tools
              </Link>
              <span className="text-[var(--muted)]"> on one page.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/submit">
                Submit or claim a listing
              </Link>
              <span className="text-[var(--muted)]"> if you ship an agent and want it in the directory.</span>
            </li>
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Read <time dateTime={AGENTS_MD_READ_ON}>{updatedLabel}</time>. A claim that is not on one of these pages is
            not in the generator.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {agentsMdSources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
                <span className="text-[var(--muted)]"> — {source.note}</span>
              </li>
            ))}
            <li>
              <Link className="text-[var(--link)] underline" href="/research/how-many-repos-use-agents-md">
                How many repos use AGENTS.md?
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                — the October 16, 2026 census, including the note that this desk did not re-read the Claude Code
                changelog.
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Canonical URL:{" "}
            <a className="text-[var(--link)] underline" href={absoluteUrl(path)}>
              {absoluteUrl(path)}
            </a>
          </p>
        </section>

        <FaqList
          heading="Questions people ask before they commit an AGENTS.md"
          lead="The answers cite the format page or a product doc read November 10, 2026. They do not promise that an agent will obey the file."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
