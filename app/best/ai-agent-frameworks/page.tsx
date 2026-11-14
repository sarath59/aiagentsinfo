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
            SDKs. The latest GitHub release tag was read on November 11, 2026. AutoGen’s tag is still python-v0.7.5,
            published September 30, 2025.
          </p>
          <p>
            The code is free to use under the licence in the table. A hosted model the framework calls is a separate
            bill. Install counts are a different measurement from this comparison. PyPI and npm file requests are in{" "}
            <Link href="/blog/which-ai-agent-framework-do-people-install">
              Which AI agent framework do people install?
            </Link>{" "}
            Downloads per star, from October 15 through November 13, 2026, are in{" "}
            <Link href="/research/ai-agent-framework-downloads-vs-github-stars-november-2026">
              AI agent framework downloads vs GitHub stars
            </Link>
            . AutoGen is 6.9 per star in that note. LangGraph is 1,308.0.{" "}
            The workshop around a model, as opposed to the library, is{" "}
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
            Open source here means the repository’s code licence, not a free hosted agent. Star counts in the table
            are the November 5, 2026 snapshot, the same pull as the{" "}
            <Link href="/reports/ai-agent-framework-github-stats-november-2026">framework release report</Link>.
            LangGraph is 44,482 stars on that pull. This page re-read release tags on November 11 and did not replace
            those star counts. The <Link href="/trackers/stars">stars tracker</Link> is a later file and a different
            list of repositories.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            AutoGen’s README on main, re-read November 11, 2026, says the project is archived and that Microsoft is
            not providing bug fixes, security fixes, new features, or support. GitHub’s archived field on the
            repository endpoint was still false. The successor named in that README is Microsoft Agent Framework. The
            maintenance reading from November 9 is{" "}
            <Link href="/blog/is-autogen-deprecated">Is AutoGen deprecated?</Link>
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Which of these libraries document an MCP client, an MCP server, or A2A, on the versions read November 13,
            2026, is{" "}
            <Link href="/research/ai-agent-framework-mcp-a2a-support-november-2026">
              AI agent framework MCP and A2A support
            </Link>
            . That note is the protocol matrix. This page is the licence and the release tag.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
