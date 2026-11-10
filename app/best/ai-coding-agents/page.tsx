import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { COMPARISON_HUB } from "@/lib/comparisons";
import { codingAgentsComparison } from "@/lib/coding-agents-comparison";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  codingAgentsComparison.metaTitle,
  codingAgentsComparison.metaDescription,
  codingAgentsComparison.path,
  { absoluteTitle: true },
);

const toc = [
  { id: "direct-answer", text: codingAgentsComparison.question, level: 2 as const },
  { id: "job-capabilities", text: "What can each AI coding agent do?", level: 2 as const },
  { id: "comparison-table", text: codingAgentsComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: codingAgentsComparison.bestForHeading, level: 2 as const },
  { id: "free", text: "Which AI coding agents are free?", level: 2 as const },
  { id: "how-this-was-checked", text: codingAgentsComparison.methodHeading, level: 2 as const },
  { id: "faq", text: codingAgentsComparison.faqHeading, level: 2 as const },
];

export default function BestAiCodingAgentsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: codingAgentsComparison.title, path: codingAgentsComparison.path },
        ]}
      />
      <ComparisonGuide page={codingAgentsComparison} toc={toc}>
        <section id="direct-answer" className="article-prose">
          <h2>{codingAgentsComparison.question}</h2>
          <p>
            There is no single best AI coding agent. On November 9, 2026, this page compares list prices for Claude
            Code, Codex, Cursor, and GitHub Copilot. Free and paid plans are both included.
          </p>
          <p>
            A plan price is not a count of how much code the agent will write. Token bills, separate from these seat
            prices, are the <Link href="/agent-cost-calculator">AI agent cost calculator</Link>. Cursor, Claude Code,
            and Codex seat prices sit beside that calculator on the{" "}
            <Link href="/tools/cursor-vs-claude-code-vs-codex-pricing">
              Cursor vs Claude Code vs Codex pricing calculator
            </Link>
            . The libraries those
            products sit beside are <Link href="/best/ai-agent-frameworks">Best AI agent frameworks</Link>. The loop
            around the model is <Link href="/topics/harnesses">Agent harnesses</Link>.
          </p>
        </section>
        <section id="job-capabilities" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What can each AI coding agent do?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Documented capabilities from vendor pages, not scores. Limitations are also from vendor docs.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[var(--stroke)]">
                  <th className="py-2 pr-4 text-left font-semibold">Job</th>
                  <th className="py-2 pr-4 text-left font-semibold">Product</th>
                  <th className="py-2 pr-4 text-left font-semibold">Documented capability</th>
                  <th className="py-2 pr-4 text-left font-semibold">Limitation</th>
                  <th className="py-2 text-left font-semibold">Primary source (date)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Multi-file editing inside an IDE</td>
                  <td className="py-2 pr-4">Cursor</td>
                  <td className="py-2 pr-4">Composer multi-file edits in VS Code fork</td>
                  <td className="py-2 pr-4">Third-party models require paid plan</td>
                  <td className="py-2">
                    <a href="https://cursor.com/features" className="text-[var(--link)] underline">cursor.com/features</a> (Nov 9, 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Multi-file editing inside an IDE</td>
                  <td className="py-2 pr-4">GitHub Copilot</td>
                  <td className="py-2 pr-4">Agent mode in VS Code, JetBrains, Xcode, Neovim</td>
                  <td className="py-2 pr-4">Credit-based after allowance</td>
                  <td className="py-2">
                    <a href="https://github.com/features/copilot" className="text-[var(--link)] underline">github.com/features/copilot</a> (Nov 9, 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Terminal coding with tests</td>
                  <td className="py-2 pr-4">Claude Code</td>
                  <td className="py-2 pr-4">Terminal agent: edit, run tests, open PRs</td>
                  <td className="py-2 pr-4">Usage shared with Claude chat</td>
                  <td className="py-2">
                    <a href="https://claude.com/product/claude-code" className="text-[var(--link)] underline">claude.com/product/claude-code</a> (Nov 9, 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Terminal coding with tests</td>
                  <td className="py-2 pr-4">Codex</td>
                  <td className="py-2 pr-4">CLI, IDE, cloud tasks with code review</td>
                  <td className="py-2 pr-4">Cloud tasks not on Free or Go</td>
                  <td className="py-2">
                    <a href="https://chatgpt.com/codex/pricing/" className="text-[var(--link)] underline">chatgpt.com/codex/pricing</a> (Nov 9, 2026)
                  </td>
                </tr>
                <tr className="border-b border-[var(--stroke)]">
                  <td className="py-2 pr-4">Code review on pull requests</td>
                  <td className="py-2 pr-4">GitHub Copilot</td>
                  <td className="py-2 pr-4">Code reviews on PRs</td>
                  <td className="py-2 pr-4">Review credits count against allowance</td>
                  <td className="py-2">
                    <a href="https://docs.github.com/en/copilot" className="text-[var(--link)] underline">docs.github.com/en/copilot</a> (Nov 9, 2026)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Code review on pull requests</td>
                  <td className="py-2 pr-4">Codex</td>
                  <td className="py-2 pr-4">Automatic code review via Codex Cloud</td>
                  <td className="py-2 pr-4">Cloud features require Plus or higher</td>
                  <td className="py-2">
                    <a href="https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan" className="text-[var(--link)] underline">help.openai.com</a> (Nov 9, 2026)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section id="free" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which AI coding agents are free?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Cursor Free, GitHub Copilot Free, and Codex on ChatGPT Free are $0 plans with limits. Claude’s Free card
            is $0, and the pricing page read on November 9, 2026 did not list Claude Code on it. Claude Code appears
            on the Pro card, at $20 a month or $17 a month when $200 is paid up front.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            GitHub Copilot Free includes 2,000 code completions a month and limited chat and agent use. Cursor Plus,
            the first paid Cursor plan, is $8 a month and does not include third-party models. The earlier side-by-side
            of Claude Code and Codex plan ladders is{" "}
            <Link href="/blog/claude-code-vs-codex-pricing">Claude Code vs Codex pricing</Link>.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
