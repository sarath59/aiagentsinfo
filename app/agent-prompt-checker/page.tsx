import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { FaqList } from "@/components/FaqList";
import { PromptChecker } from "@/components/PromptChecker";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import {
  ANTHROPIC_PRICING_URL,
  GOOGLE_PRICING_URL,
  OPENAI_PRICING_URL,
  PRICE_READ_ON,
  XAI_PRICING_URL,
} from "@/lib/model-prices";
import { absoluteUrl } from "@/lib/site";
import {
  ANTHROPIC_DEFINE_TOOLS_URL,
  ANTHROPIC_STRICT_TOOLS_URL,
  ANTHROPIC_TOOL_USE_URL,
  MCP_TOOLS_URL,
  OPENAI_FUNCTION_CALLING_URL,
  SCHEMA_READ_ON,
} from "@/lib/tool-definitions";
import { formatDate } from "@/lib/utils";

const path = "/agent-prompt-checker";
const title = "Free agent prompt and tool checker";
const description =
  "Paste a system prompt and optional tool JSON. The server checks the schema, counts tokens, and estimates a 30-day bill from official model prices. The prompt is not stored.";

export const metadata = defaultMetadata(title, description, path);

const TIKTOKEN_URL = "https://github.com/openai/tiktoken";

const sources = [
  { name: "OpenAI function calling", url: OPENAI_FUNCTION_CALLING_URL, read: SCHEMA_READ_ON },
  { name: "Anthropic, define tools", url: ANTHROPIC_DEFINE_TOOLS_URL, read: SCHEMA_READ_ON },
  { name: "Anthropic, tool use overview", url: ANTHROPIC_TOOL_USE_URL, read: SCHEMA_READ_ON },
  { name: "Anthropic, strict tool use", url: ANTHROPIC_STRICT_TOOLS_URL, read: SCHEMA_READ_ON },
  { name: "MCP tools specification, 2025-06-18", url: MCP_TOOLS_URL, read: SCHEMA_READ_ON },
  { name: "tiktoken", url: TIKTOKEN_URL, read: SCHEMA_READ_ON },
  { name: "OpenAI API pricing", url: OPENAI_PRICING_URL, read: PRICE_READ_ON },
  { name: "Anthropic Claude API pricing", url: ANTHROPIC_PRICING_URL, read: PRICE_READ_ON },
  { name: "Gemini API pricing", url: GOOGLE_PRICING_URL, read: PRICE_READ_ON },
  { name: "xAI model pricing", url: XAI_PRICING_URL, read: PRICE_READ_ON },
];

export default function PromptCheckerPage() {
  const updatedLabel = formatDate(SCHEMA_READ_ON);
  const pricesLabel = formatDate(PRICE_READ_ON);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Schema notes read ${updatedLabel}. Prices read ${pricesLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description} Schema notes read ${updatedLabel}. Prices read ${pricesLabel}.</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: SCHEMA_READ_ON,
          dateModified: SCHEMA_READ_ON,
        })}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }, { name: title, path }]} />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Checker</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Paste a system prompt and, if you have them, the tool definitions. The server checks the JSON, counts the
          tokens, and prices one turn and 30 days. It uses the same official model prices as the{" "}
          <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
            cost calculator
          </Link>
          . If you already know the token counts, that calculator is the shorter tool.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Schema notes read <time dateTime={SCHEMA_READ_ON}>{updatedLabel}</time>. Prices read{" "}
          <time dateTime={PRICE_READ_ON}>{pricesLabel}</time>.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <section className="mb-8 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
          <h2 className="text-2xl font-semibold tracking-tight">What the server does</h2>
          <ul className="mt-3 grid gap-2">
            <li>It checks the tool JSON against the published OpenAI, Anthropic, and MCP shapes, including names, required fields, and the argument schema.</li>
            <li>It counts the pasted prompt and tool text with tiktoken. When that library has the model, the count is that encoding&apos;s count of the pasted text. Other models are labeled as estimates. Message framing is not included.</li>
            <li>It adds the tool text to the input tokens, then multiplies by the price table. For Claude models with a published tool-use system prompt, that count is added too.</li>
            <li>It does not write the prompt or the tools to a file, a database, or a log. There is no account.</li>
          </ul>
        </section>

        <PromptChecker />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {sources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
                <span className="text-[var(--muted)]">, read {formatDate(source.read)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 text-sm">
          <p>
            Related:{" "}
            <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
              agent cost calculator
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/blog/what-is-an-ai-agent-harness">
              what is an agent harness
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/blog/claude-code-vs-codex-pricing">
              Claude Code and Codex pricing
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">
              November harness benchmark
            </Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports">
              all reports
            </Link>
          </p>
        </section>

        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

        <FaqList
          items={[
            {
              question: "Is the prompt stored?",
              answer: (
                <p>
                  No. The server reads it to count tokens and check the JSON, then drops it. Nothing is written to a
                  database, a file, or a log. Do not paste secrets you would not put in a request you are debugging.
                </p>
              ),
            },
            {
              question: "Is the token count exact?",
              answer: (
                <p>
                  For gpt-5, gpt-5-mini, and gpt-5-nano, tiktoken has an encoding and the result says so. Newer OpenAI
                  ids in the price list, and every Claude, Gemini, and Grok id, are estimates made with tiktoken&apos;s
                  o200k_base encoding. Those providers do not bill with that encoding. Output tokens are the number you
                  type, because this page does not have the reply.
                </p>
              ),
            },
            {
              question: "Why is there no tool-call fee?",
              answer: (
                <p>
                  The price table does not publish a single per-call fee for these models, so none is added. Anthropic
                  does publish a tool-use system prompt length for several Claude models, and that length is added when
                  the row exists. Computer use, code execution, and search grounding stay out when the copied pages do
                  not give a rate.
                </p>
              ),
            },
            {
              question: "How is this different from the cost calculator?",
              answer: (
                <p>
                  The{" "}
                  <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                    cost calculator
                  </Link>{" "}
                  stays in the browser. You type token counts, and it multiplies them by the official prices. It does
                  not read a prompt or validate tool JSON. This page sends the text to the server and does both.
                </p>
              ),
            },
            {
              question: "Which tool JSON does it accept?",
              answer: (
                <p>
                  OpenAI function tools, either the Responses shape or the older Chat Completions shape. Anthropic
                  user-defined tools, with name, description, and input_schema. MCP tools, with name and inputSchema.
                  Built-in tools such as web search are reported and left unchecked.
                </p>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
