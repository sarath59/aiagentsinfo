import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { DataSourceLine } from "@/components/DataSourceLine";
import { FaqList } from "@/components/FaqList";
import { HarnessChecklist } from "@/components/HarnessChecklist";
import { NextRead } from "@/components/NextRead";
import {
  checklistSources,
  description,
  path,
  readOn,
  title,
} from "@/lib/harness-checklist";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const faqs = [
  {
    question: "What is an AI agent harness evaluation checklist?",
    answer:
      "Twelve yes-or-no checks for the software around a model. Each check quotes a public post or an official board: Google’s September 9, 2026 harness post, NVIDIA’s November 4, 2026 NeMo walkthrough, Anthropic’s January 9, 2026 evals post, and the SWE-bench and Terminal-Bench fields copied on this site’s November 2026 harness benchmark.",
  },
  {
    question: "Does the checklist produce a benchmark score?",
    answer:
      "No. It counts how many checks you marked yes. That count is a worksheet. It is not a percent resolved on SWE-bench and it is not an accuracy on Terminal-Bench.",
  },
  {
    question: "Is the worksheet saved?",
    answer: "No. The answers stay in the browser until you leave or clear them. There is no account.",
  },
  {
    question: "How is this different from the harness benchmark?",
    answer:
      "The November 2026 harness benchmark copies public SWE-bench and Terminal-Bench rows, each with the harness and the date on the source. This page is the list of questions to ask before you treat one of those rows as a reason to change your own harness.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function HarnessChecklistPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Sources read ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description} Sources read ${updatedLabel}.</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: readOn,
            dateModified: readOn,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Reports", path: "/reports" },
          { name: title, path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Checklist</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Twelve checks a team can answer about its own agent harness. Each one is tied to a sentence a company
          published, or to a field on an official board. Mark yes only when you can point at the test, the trace, or
          the row.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Sources read <time dateTime={readOn}>{updatedLabel}</time>. The Google, NVIDIA, and Anthropic posts were
          re-read that day. The SWE-bench and Terminal-Bench fields are the ones stored on the{" "}
          <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
            November 2026 harness benchmark
          </Link>
          , read November 8, 2026.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <NextRead
          reads={[
            {
              href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
              title: "How to evaluate an AI agent harness",
              note: "One observable action, then whether the whole job still finishes.",
            },
            {
              href: "/reports/agent-harness-benchmark-november-2026",
              title: "November 2026 harness benchmark",
              note: "Official SWE-bench and Terminal-Bench rows, each with a date.",
            },
            {
              href: "/research/harnessflow-mcts-harness-optimization",
              title: "HarnessFlow",
              note: "A paper that searches for a better harness program.",
            },
            {
              href: "/research/evolver-agent-exploration-evolving-capabilities",
              title: "Evolver",
              note: "A paper that reuses experience inside Claude Code and Codex.",
            },
          ]}
          tool={{
            href: "/agent-prompt-checker",
            title: "prompt and tool checker",
            note: "tool JSON is part of the harness these checks wrap",
          }}
        />
        <div className="mt-10">
          <HarnessChecklist />
        </div>
        <section className="mt-10 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--fg)]">
            Which pages sit next to this checklist?
          </h2>
          <p className="mt-3">
            The long guide is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/how-do-you-evaluate-an-ai-agent-harness">
              How to evaluate an AI agent harness
            </Link>
            . How to stand up the tasks is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/how-to-build-an-eval-harness-for-ai-agents">
              How to build an eval harness for AI agents
            </Link>
            . Public rows are the{" "}
            <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
              November 2026 harness benchmark
            </Link>
            . The paper shelf those notes live on is{" "}
            <Link className="text-[var(--link)] underline" href="/papers">
              AI agent papers
            </Link>
            . A revenue table, which is a different question, is{" "}
            <Link className="text-[var(--link)] underline" href="/verified-revenue">
              verified revenue
            </Link>
            . Install counts are{" "}
            <Link className="text-[var(--link)] underline" href="/blog/which-ai-agent-framework-do-people-install">
              which AI agent framework people install
            </Link>
            . Live counts are the <Link className="text-[var(--link)] underline" href="/trackers">trackers</Link>.
            A store an agent can quote is{" "}
            <Link
              className="text-[var(--link)] underline"
              href="/blog/how-to-make-your-store-readable-by-ai-shopping-agents"
            >
              how to make your store readable by AI shopping agents
            </Link>
            , next to the{" "}
            <Link className="text-[var(--link)] underline" href="/reports/ai-shopping-agents-next-6-months">
              six-month shopping report
            </Link>
            .
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {checklistSources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <DataSourceLine title={title} updated={readOn} path={path} />
        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>
        <FaqList
          heading="What else do people ask about this checklist?"
          lead="It is a worksheet of twelve sourced checks. It does not save answers and it does not publish a score."
          items={faqs}
        />
      </div>
    </>
  );
}
