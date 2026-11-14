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
  { id: "osworld", text: "What does OSWorld 2.0 actually say about these agents?", level: 2 as const },
  { id: "open-source", text: "Which open source computer use agents can you run in 2026?", level: 2 as const },
  { id: "windows", text: "Which computer use agent actually works on Windows?", level: 2 as const },
  { id: "buyers", text: "What does this mean if you are buying one?", level: 2 as const },
  { id: "comparison-table", text: computerUseComparison.tableHeading, level: 2 as const },
  { id: "best-for", text: computerUseComparison.bestForHeading, level: 2 as const },
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
            agent looks at a screen and clicks, types, or scrolls. On November 14, 2026,{" "}
            <Link href="/directory/claude">Claude</Link> Cowork and{" "}
            <Link href="/directory/claude-code">Claude Code</Link> can do that on a Mac or Windows desktop in research
            preview, and the <Link href="/directory/chatgpt">ChatGPT</Link> desktop app can do it on Mac or Windows
            for ChatGPT Work and Codex. Anthropic, OpenAI, and <Link href="/directory/gemini">Gemini</Link> document
            APIs where your code runs each action. <Link href="/directory/browser-use">Browser Use</Link> 1.0.5, tagged
            the same day, drives a browser. MagenticLite remains the MIT sandbox for macOS or Windows with WSL.
          </p>
          <p>
            The product walkthrough is{" "}
            <Link href="/blog/can-an-ai-agent-use-your-computer">Can an AI agent use your computer?</Link> Scoring
            that loop, with a task, a clean screen, and a grader on the resulting state, is{" "}
            <Link href="/blog/how-to-build-an-eval-harness-for-ai-agents">
              How to build an eval harness for AI agents
            </Link>
            . A model that can operate a computer, such as Tencent Hy4, is a model release, and the note is{" "}
            <Link href="/blog/tencent-releases-hy4-with-computer-use">Tencent releases Hy4 with computer use</Link>.
            Work that stays on a web page is <Link href="/glossary/browser-use">browser use</Link>. The shelf for this
            table is <Link href={COMPARISON_HUB.href}>{COMPARISON_HUB.title}</Link>.
          </p>
        </section>
        <section id="osworld" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What does OSWorld 2.0 actually say about these agents?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The seven vendor pages above do not print an OSWorld score. The{" "}
            <a className="text-[var(--link)] underline" href="https://osworld-v2.xlang.ai/">
              OSWorld 2.0 project page
            </a>
            , read November 14, 2026, still leads with its own benchmark. Under the binary-completion metric at 500
            steps, Claude Opus 4.8 with maximum thinking and batched tool calls completes 20.6% of the 108 tasks, at a
            54.8% partial score. GPT-5.5 plateaus near 14% binary reward. A later bullet on the same page puts Opus
            4.8 at 20.6% with 244K output tokens, and GPT-5.5 at about 14% with 39K output tokens.
          </p>
          <div className="table-scroll mt-4">
            <table>
              <caption className="sr-only">
                OSWorld 2.0 figures copied from the project page on November 14, 2026
              </caption>
              <thead>
                <tr>
                  <th>Setup on the project page</th>
                  <th>Binary completion</th>
                  <th>Partial score</th>
                  <th>Output tokens</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Claude Opus 4.8, maximum thinking, batched tool calls, 500 steps</td>
                  <td>20.6%</td>
                  <td>54.8%</td>
                  <td>244K</td>
                </tr>
                <tr>
                  <td>GPT-5.5, same page</td>
                  <td>Near 14%</td>
                  <td>Not stated in that sentence</td>
                  <td>About 39K</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Those rows name a model and a tool-call setup. They do not name Claude Cowork, the ChatGPT desktop app, or
            Browser Use. Pasting 20.6% onto a desktop product would mix a benchmark harness with a product you install.
            Human time on the same page is a median of about 1.6 hours per task. If you need a grader for your own
            screen tasks, build it as an eval harness and score the screen state, not the model’s closing sentence.
          </p>
        </section>
        <section id="open-source" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which open source computer use agents can you run in 2026?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Browser Use is MIT. GitHub published release 1.0.5 on November 14, 2026. PyPI’s latest upload at the same
            check was still 1.0.4, uploaded November 13, 2026, so pin the index you install from. The pricing page is
            pay as you go: $0.06 per cloud browser hour, billed by the minute, with a one-minute minimum. MagenticLite,
            in microsoft/magentic-ui, is MIT. Its README, read the same day, says macOS or Windows (WSL), names
            MagenticBrain and Fara, and runs browser sessions in a Quicksand VM. The latest GitHub release is v0.2.1,
            published May 21, 2026.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            <a className="text-[var(--link)] underline" href="https://www.browseros.com/">
              BrowserOS neo
            </a>{" "}
            is also live. The site says it is free, local, and AGPL-3.0, and that you bring your own model key. GitHub
            release browserclaw/v0.52.0 was published October 31, 2026, with maintenance build 0.52.1.1. The repository
            had commits on November 14, 2026. It is a browser your agent drives. It is not one of the seven table rows,
            which stay on desktop products, APIs, Browser Use, and MagenticLite.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            UI-TARS Desktop is out. The GitHub API for bytedance/UI-TARS-desktop returned archived on November 14,
            2026. The last release, v0.3.1, was published October 8, 2026. An archived repository is not a current
            pick. Anthropic, OpenAI, and Gemini computer-use APIs are API features. You still write the loop that
            takes a screenshot, runs the action, and sends the new screen back. That loop is the{" "}
            <Link href="/glossary/harness">harness</Link>. The comparison of those workshops is{" "}
            <Link href="/best/ai-agent-harnesses">Best AI agent harness</Link>.
          </p>
        </section>
        <section id="windows" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">Which computer use agent actually works on Windows?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Native Windows GUI control is documented for Claude Cowork and Claude Code, and for ChatGPT Computer Use.
            MagenticLite’s Windows path is WSL. Claude’s product article names macOS and Windows, limits the research
            preview to Pro, Max, and Ultra, and says the desktop app has to stay awake. ChatGPT Computer Use on Windows
            runs on the active desktop in the foreground. It cannot operate in the background of the same Windows
            session. Locked use, which lets a task continue after the screen locks, is documented for macOS.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            MagenticLite’s install notes say macOS or Windows (WSL). That is a Linux environment on Windows. Gemini
            Computer Use can target ENVIRONMENT_DESKTOP, and you implement the client that executes the coordinates.
            This page has not run a side-by-side Windows task, so it does not name a winner on reliability.
          </p>
        </section>
        <section id="buyers" className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What does this mean if you are buying one?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Match the product to the surface. If the work is already on your Mac or Windows desktop, Claude’s research
            preview or ChatGPT Computer Use is the product that drives that screen, and you stay for payments and
            passwords. If the work is a browser workflow you can meter, Browser Use publishes an hour rate. If you are
            building the loop, Anthropic, OpenAI, and Gemini each return an action and expect your code to run it.
            Treat 20.6% on OSWorld 2.0 as the state of a long desktop benchmark, then grade your own tasks before you
            let an agent click through them unattended.
          </p>
        </section>
      </ComparisonGuide>
    </>
  );
}
