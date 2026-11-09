import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComparisonGuide } from "@/components/ComparisonGuide";
import { COMPARISON_HUB, computerUseComparison } from "@/lib/comparisons";
import { defaultMetadata } from "@/lib/seo";

export const metadata = defaultMetadata(
  computerUseComparison.metaTitle,
  computerUseComparison.metaDescription,
  computerUseComparison.path,
  { absoluteTitle: true },
);

const toc = [
  { id: "direct-answer", text: computerUseComparison.question, level: 2 as const },
  { id: "comparison-table", text: computerUseComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: computerUseComparison.bestForHeading, level: 2 as const },
  { id: "open-source", text: "Which open source computer use agents can you run in 2026?", level: 2 as const },
  { id: "windows", text: "Which computer use agent actually works on Windows?", level: 2 as const },
  { id: "how-this-was-checked", text: computerUseComparison.methodHeading, level: 2 as const },
  { id: "faq", text: computerUseComparison.faqHeading, level: 2 as const },
];

export default function BestComputerUseAgentsPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: COMPARISON_HUB.title, path: COMPARISON_HUB.href },
          { name: computerUseComparison.title, path: computerUseComparison.path },
        ]}
      />
      <ComparisonGuide page={computerUseComparison} toc={toc}>
        <section id="direct-answer" className="article-prose">
          <h2>{computerUseComparison.question}</h2>
          <p>
            There is no single best computer use agent. A <Link href="/glossary/computer-use">computer use</Link>{" "}
            agent looks at a screen and clicks, types, or scrolls. In November 2026,{" "}
            <Link href="/directory/claude">Claude</Link> Cowork and{" "}
            <Link href="/directory/claude-code">Claude Code</Link> can do that on a Mac or Windows desktop in research
            preview, and the <Link href="/directory/chatgpt">ChatGPT</Link> desktop app can do it on Mac or Windows
            for ChatGPT Work and Codex. Anthropic, OpenAI, and <Link href="/directory/gemini">Gemini</Link> also
            document APIs where your own code runs each action. Open-source options include UI-TARS Desktop (Apache
            2.0, Windows and macOS) and MagenticLite (MIT, macOS or Windows with WSL).
          </p>
          <p>
            The product walkthrough is{" "}
            <Link href="/blog/can-an-ai-agent-use-your-computer">Can an AI agent use your computer?</Link> A model
            that can operate a computer, such as Tencent Hy4, is not by itself a complete desktop agent; that note is{" "}
            <Link href="/blog/tencent-releases-hy4-with-computer-use">Tencent releases Hy4 with computer use</Link>.
            Work that stays on a web page is <Link href="/glossary/browser-use">browser use</Link>. What is dated from
            November 9, 2026 through May 9, 2027, including browser agents, is{" "}
            <Link href="/reports/browser-and-computer-use-agents-next-6-months">
              Browser and computer-use agents next 6 months
            </Link>
            . The shelf for this table is <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>.
          </p>
        </section>
        <section id="open-source" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which open source computer use agents can you run in 2026?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            UI-TARS Desktop (Apache 2.0, Windows and macOS) and MagenticLite (MIT, macOS or Windows with WSL) are the
            two public repositories in the table. UI-TARS Desktop’s README lists Windows, macOS, and browser
            operators, plus local and remote computer operators. MagenticLite, in microsoft/magentic-ui, documents
            browser work plus local files and a Quicksand VM sandbox. MagenticLite is not documented as a native
            Windows GUI operator.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Anthropic, OpenAI, and Gemini computer-use APIs are not open-source agents. They are API features. You
            still write the loop that takes a screenshot, runs the action, and sends the new screen back. That loop
            is part of the <Link href="/glossary/harness">harness</Link>. The comparison of those workshops is{" "}
            <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>.
          </p>
        </section>
        <section id="windows" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which computer use agent actually works on Windows?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Native Windows GUI control is documented for Claude Cowork and Claude Code, ChatGPT Computer Use, and
            UI-TARS Desktop; MagenticLite’s Windows path is WSL, not Win32. Claude Cowork and Claude Code computer use is a
            research preview on Pro, Max, and Ultra; Anthropic’s article names macOS and Windows and says the desktop
            app has to stay awake. ChatGPT Computer Use on Windows runs on the active desktop in the foreground. It
            cannot operate in the background of the same Windows session. UI-TARS Desktop’s README lists Windows
            among its operators.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            MagenticLite’s install notes say macOS or Windows (WSL). That is a Linux environment on Windows, not the
            same as clicking through native Win32 windows. Gemini Computer Use can target a desktop environment, but
            you implement the client that executes coordinates. This page has not run a side-by-side Windows task, so
            it does not name a winner on reliability.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
