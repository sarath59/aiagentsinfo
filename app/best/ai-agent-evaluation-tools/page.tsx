import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { COMPARISON_HUB, evaluationComparison } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  evaluationComparison.metaTitle,
  evaluationComparison.metaDescription,
  evaluationComparison.path,
  { absoluteTitle: true },
);

const toc = [
  { id: "direct-answer", text: evaluationComparison.question, level: 2 as const },
  { id: "comparison-table", text: evaluationComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: evaluationComparison.bestForHeading, level: 2 as const },
  { id: "open-source", text: "Which open source AI agent evaluation tools can you run in CI?", level: 2 as const },
  { id: "how-this-was-checked", text: evaluationComparison.methodHeading, level: 2 as const },
  { id: "faq", text: evaluationComparison.faqHeading, level: 2 as const },
];

export default function BestAiAgentEvaluationToolsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: evaluationComparison.title, path: evaluationComparison.path },
        ]}
      />
      <ComparisonGuide page={evaluationComparison} toc={toc}>
        <section id="direct-answer" className="article-prose">
          <h2>{evaluationComparison.question}</h2>
          <p>
            There is no single best among AI agent evaluation tools. Pick a tool for the check you need to keep
            running. Promptfoo, DeepEval, Inspect, and{" "}
            <Link href="/directory/pydantic-ai">Pydantic Evals</Link> are libraries you run locally or in CI.{" "}
            <Link href="/directory/langchain">LangSmith</Link>, Langfuse, Braintrust, and Confident AI add hosted
            tracing and online evals. Phoenix is source-available under Elastic License 2.0 for self-hosting. This
            page does not invent a ranking.
          </p>
          <p>
            A <Link href="/glossary/behavioral-evaluation">behavioral evaluation</Link> checks one action you can
            point at in a run. An end-to-end <Link href="/glossary/benchmark">benchmark</Link> still answers whether
            the job finished. The working guide is{" "}
            <Link href="/blog/how-do-you-evaluate-an-ai-agent-harness">How do you evaluate an AI agent harness?</Link>{" "}
            How to stand up the tasks and sandboxes is{" "}
            <Link href="/blog/how-to-build-an-eval-harness-for-ai-agents">How to build an eval harness for AI agents</Link>
            . Official SWE-bench and Terminal-Bench rows stay on the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November 2026 harness benchmark</Link>. The
            shelf for this table is <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>.
          </p>
        </section>
        <section id="open-source" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which open source AI agent evaluation tools can you run in CI?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Promptfoo, Inspect, and Pydantic Evals are MIT; DeepEval is Apache licensed on PyPI; Langfuse’s core is
            MIT except ee/ folders. Self-hosting Langfuse’s core is free on its pricing page. Phoenix uses Elastic
            License 2.0: you may run it yourself, and you may not offer it to third parties as a hosted or managed
            service.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Inspect is the row that documents sandboxed agent evals and the ability to drive Claude Code, Codex CLI,
            or Gemini CLI as an external agent. DeepEval documents trajectory-based evaluation and agent metrics such
            as tool correctness. Pydantic Evals documents grading the sequence and arguments of tool calls, including
            against a sample of live traffic. Promptfoo documents local evaluation and CI, with a 10,000-probe monthly
            cap on Community red teaming.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            LangSmith, Braintrust, and Confident AI are hosted platforms. They belong on this page because teams
            often compare them with the libraries above. They are not OSI-licensed runtimes. The harnesses those
            tests wrap are compared in <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
