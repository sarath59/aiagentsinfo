import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { COMPARISON_HUB, harnessComparison } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  harnessComparison.metaTitle,
  harnessComparison.metaDescription,
  harnessComparison.path,
  { absoluteTitle: true },
);

const toc = [
  { id: "direct-answer", text: harnessComparison.question, level: 2 as const },
  { id: "comparison-table", text: harnessComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: harnessComparison.bestForHeading, level: 2 as const },
  { id: "coding", text: "What is the best coding agent harness in 2026?", level: 2 as const },
  { id: "open-source", text: "What is the best open source AI agent harness in 2026?", level: 2 as const },
  { id: "local", text: "Can you run an AI agent harness locally in 2026?", level: 2 as const },
  { id: "how-this-was-checked", text: harnessComparison.methodHeading, level: 2 as const },
  { id: "faq", text: harnessComparison.faqHeading, level: 2 as const },
];

export default function BestAiAgentHarnessPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: harnessComparison.title, path: harnessComparison.path },
        ]}
      />
      <ComparisonGuide page={harnessComparison} toc={toc}>
        <section id="direct-answer" className="article-prose">
          <h2>{harnessComparison.question}</h2>
          <p>
            There is no single best AI agent harness. A{" "}
            <Link href="/glossary/harness">harness</Link> is the loop, tools, memory, permissions, and stop rules
            around a model. Use <Link href="/directory/claude-code">Claude Code</Link> or{" "}
            <Link href="/directory/codex">Codex</Link> when you want a shipping coding product. Use the{" "}
            <Link href="/directory/claude-agent-sdk">Claude Agent SDK</Link> or the{" "}
            <Link href="/directory/openai-agents-sdk">OpenAI Agents SDK</Link> when you want that loop inside your
            own app. Use <Link href="/directory/pydantic-ai">Pydantic AI</Link>,{" "}
            <Link href="/directory/google-adk">Google ADK</Link>,{" "}
            <Link href="/directory/microsoft-agent-framework">Microsoft Agent Framework</Link>,{" "}
            <Link href="/directory/smolagents">smolagents</Link>, or DeepSeek Harness when you want an open-source
            runtime you can run yourself.
          </p>
          <p>
            The longer definition is <Link href="/blog/what-is-an-ai-agent-harness">What is an AI agent harness?</Link>{" "}
            Public board scores stay on the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November 2026 harness benchmark</Link>. How to
            test a change without trusting a composite score is{" "}
            <Link href="/blog/how-do-you-evaluate-an-ai-agent-harness">How to evaluate an AI agent harness</Link>{" "}
            The shelf for this table is <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>.
          </p>
        </section>
        <section id="coding" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What is the best coding agent harness in 2026?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Claude Code and Codex are the two finished coding products on this page, and this comparison does not rank
            them by a score. A coding harness is a runtime that can read a repository, edit files, run commands, and
            stop. Both products sit in the{" "}
            <Link href="/directory/category/coding-agents">coding agents</Link> category. The Claude Agent SDK is the
            same loop as Claude Code, packaged for Python or TypeScript. Pydantic AI’s Coder agent documents file and
            shell tools on a LocalWorkspace. Microsoft’s overview describes a Harness Agent for long, multi-step work.
            Those are different delivery shapes. A Terminal-Bench score that names one of them is not a ranking of the
            others. Public scores with their source dates are in the{" "}
            <Link href="/reports/agent-harness-benchmark-november-2026">November 2026 agent harness benchmark</Link>.{" "}
            <Link href="/research/terminal-bench-2-1-benchmark-repairs">Terminal-Bench 2.1</Link> is a separate note.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            List prices for Claude Code and Codex, rechecked in early November 2026, are compared in{" "}
            <Link href="/blog/claude-code-vs-codex-pricing">Claude Code vs Codex pricing</Link>. That page is about
            plan ladders, not about which harness writes better code.
          </p>
        </section>
        <section id="open-source" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What is the best open source AI agent harness in 2026?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            There is no single best open source AI agent harness in this table. MIT or Apache 2.0 runtimes include the
            OpenAI Agents SDK, Pydantic AI, Google ADK, Microsoft Agent Framework, smolagents, DeepSeek Harness, and
            CrewAI’s framework. Open source here means a public licence on the runtime, not a free hosted product. The
            Claude Agent SDK’s Python package is MIT; Anthropic still says use of the SDK is under its Commercial Terms
            unless a component says otherwise. LangChain’s libraries are open source; LangSmith is a platform with
            seats and traces.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            DeepSeek Harness is still in developer preview. Its README says compatibility-breaking changes are
            expected. Treat it as a plugin runtime you can read, not as a substitute for a shipping IDE agent. The{" "}
            <Link href="/directory/category/agent-frameworks">frameworks directory</Link> is the listing shelf.
          </p>
        </section>
        <section id="local" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Can you run an AI agent harness locally in 2026?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Yes: Pydantic AI’s LocalWorkspace and DeepSeek Harness run the harness process on your machine, and
            smolagents separately documents loading a local model with Transformers or Ollama. Local can mean the
            harness process, the model weights, or both. Pydantic AI’s LocalWorkspace is not a sandbox unless you
            swap one in. DeepSeek Harness’s documented start command, <code>npx @deepseek-ai/dsh web</code>, opens a
            web interface on the machine where you run it. smolagents is the row that documents Transformers or
            Ollama besides hosted APIs.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Google ADK and Microsoft Agent Framework can run on your servers. That is self-hosted, which is not the
            same as a laptop-only Ollama setup. If privacy of the weights is the requirement, start with smolagents’
            local model docs and confirm the model you actually load. The{" "}
            <Link href="/topics/harnesses">harnesses topic</Link> collects the related guides.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
