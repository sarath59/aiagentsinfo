import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { COMPARISON_HUB } from "@/lib/comparisons";
import { frameworkComparison } from "@/lib/framework-comparison";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  frameworkComparison.metaTitle,
  frameworkComparison.metaDescription,
  frameworkComparison.path,
  { absoluteTitle: true },
);

const toc = [
  { id: "direct-answer", text: frameworkComparison.question, level: 2 as const },
  { id: "comparison-table", text: frameworkComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: frameworkComparison.bestForHeading, level: 2 as const },
  { id: "free", text: "Which AI agent frameworks are free and open source?", level: 2 as const },
  { id: "how-this-was-checked", text: frameworkComparison.methodHeading, level: 2 as const },
  { id: "faq", text: frameworkComparison.faqHeading, level: 2 as const },
];

export default function BestAiAgentFrameworksPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: frameworkComparison.title, path: frameworkComparison.path },
        ]}
      />
      <ComparisonGuide page={frameworkComparison} toc={toc}>
        <section id="direct-answer" className="article-prose">
          <h2>{frameworkComparison.question}</h2>
          <p>
            There is no single best AI agent framework. This page compares 19 free and open-source frameworks and
            SDKs. The licence and the latest GitHub release were read on November 9, 2026.
          </p>
          <p>
            The code is free to use under the licence in the table. A hosted model the framework calls is a separate
            bill. The workshop around a model, as opposed to the library, is{" "}
            <Link href="/blog/what-is-an-ai-agent-harness">What is an AI agent harness?</Link> The priced coding
            products are <Link href="/best/ai-coding-agents">Best AI coding agents</Link>. The shelf for every table
            is <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>. The harness guides sit on{" "}
            <Link href="/topics/harnesses">Agent harnesses</Link>.
          </p>
        </section>
        <section id="free" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which AI agent frameworks are free and open source?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            All 19 are free and open source under the licence GitHub or the licence file named. MIT covers LangChain,
            LangGraph, CrewAI, Microsoft Agent Framework, Semantic Kernel, the OpenAI Agents SDK, the Claude Agent
            SDK’s Python package, LlamaIndex, Pydantic AI, and DSPy. Apache-2.0 covers Google ADK, smolagents, Agno,
            CAMEL, Letta, Haystack, and the Vercel AI SDK. AutoGen is CC-BY-4.0. Mastra is Apache-2.0 outside an{" "}
            <code>ee/</code> tree that the licence file licenses separately.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Open source here means the repository’s code licence, not a free hosted agent. The November 5 snapshot of
            the same repositories is the{" "}
            <Link href="/reports/ai-agent-framework-github-stats-november-2026">framework release report</Link>. This
            page re-read the tags on November 9 and does not copy that day’s star counts.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
