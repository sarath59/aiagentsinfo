import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { CostCalculator } from "@/components/CostCalculator";
import { FaqList } from "@/components/FaqList";
import { JsonLd, defaultMetadata, webPageJsonLd } from "@/lib/seo";
import {
  ANTHROPIC_PRICING_URL,
  GOOGLE_PRICING_URL,
  OPENAI_PRICING_URL,
  PRICE_READ_ON,
  XAI_PRICING_URL,
  modelPrices,
} from "@/lib/model-prices";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const path = "/agent-cost-calculator";
const title = "Free AI agent cost calculator";
const description =
  "Estimate a 30-day model bill from official per-token prices. Pick a model, then enter tokens per task and tasks per day. No login is required.";

export const metadata = defaultMetadata(title, description, path);

const sources = [
  { name: "OpenAI API pricing", url: OPENAI_PRICING_URL },
  { name: "Anthropic Claude API pricing", url: ANTHROPIC_PRICING_URL },
  { name: "Gemini API pricing", url: GOOGLE_PRICING_URL },
  { name: "xAI model pricing", url: XAI_PRICING_URL },
];

export default function CostCalculatorPage() {
  const updatedLabel = formatDate(PRICE_READ_ON);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Prices read ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description} Prices read ${updatedLabel}.</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          title,
          description,
          path,
          datePublished: PRICE_READ_ON,
          dateModified: PRICE_READ_ON,
        })}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Reports", path: "/reports" }, { name: title, path }]} />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Calculator</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Pick a model, enter the input tokens and output tokens for one task, and how many of those tasks you run
          in a day. The page multiplies by the provider&apos;s standard price and by 30. It runs in the browser. There
          is no account and no request is sent with your numbers. If you have a system prompt and tool JSON, the{" "}
          <Link className="text-[var(--link)] underline" href="/agent-prompt-checker">
            prompt and tool checker
          </Link>{" "}
          counts that text on the server and checks the schema.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          Prices read <time dateTime={PRICE_READ_ON}>{updatedLabel}</time>.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <CostCalculator />

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Models in the list</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            {modelPrices.length} models. The price is the standard per-million-token price on the provider page, not a
            reseller quote. Cached input, batch, flex, fast, and regional uplifts are left out on purpose, so a real
            invoice can be lower or higher.
          </p>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {modelPrices.map((model) => (
              <li key={model.id}>
                <a className="text-[var(--link)] underline" href={model.sourceUrl}>
                  {model.provider}: {model.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Sources</h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {sources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
                <span className="text-[var(--muted)]">, read {updatedLabel}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Left out</h2>
          <ul className="mt-3 grid gap-2 text-sm leading-relaxed text-[var(--muted)]">
            <li>OpenAI models that are on the pricing page but not in the dropdown, including gpt-4o, o3, and the pro variants.</li>
            <li>Anthropic models marked limited availability or retired, and every cache-write price.</li>
            <li>
              Google models other than Gemini 4 Argon and Gemini 3.8 Flash. The pricing page has more tiers, and the
              ones whose standard price was not clearly separated from batch and flex were not added.
            </li>
            <li>
              xAI models other than grok-4.7 and grok-build-0.1. Cached-input prices on the xAI page are not used.
              DeepSeek and other providers are still left out, because their pricing pages were not copied into this
              tool on November 5, 2026.
            </li>
            <li>
              Tool-call fees, search grounding, image tokens billed apart from the text price, tax, and seat licenses such as Claude Code or Codex plans. The{" "}
              <Link className="text-[var(--link)] underline" href="/agent-prompt-checker">
                prompt and tool checker
              </Link>{" "}
              can validate tool JSON and count pasted text. It still does not add a tool-call fee, because these price pages do not publish one.
            </li>
          </ul>
        </section>

        <section className="mt-10 text-sm">
          <p>
            Related: <Link className="text-[var(--link)] underline" href="/agent-prompt-checker">prompt and tool checker</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/ai-agents-next-12-months">AI agents, Nov 2026 to Nov 2027</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/ai-agents-next-6-months">AI agents, Nov 2026 to May 2027</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports/agent-harness-benchmark-november-2026">November harness benchmark</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/directory/category/coding-agents">coding agents</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/verified-revenue">verified revenue</Link>
            {" · "}
            <Link className="text-[var(--link)] underline" href="/reports">all reports</Link>
          </p>
        </section>

        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>

        <FaqList
          items={[
            {
              question: "Is the 30-day figure a calendar month?",
              answer: <p>No. It is the daily cost times 30. A 31-day month would be one day more, and February would be less.</p>,
            },
            {
              question: "Do thinking tokens count?",
              answer: (
                <p>
                  For the two Google models, the provider says the output price includes thinking tokens. Add them to
                  the output box. The OpenAI, Anthropic, and xAI rows on this page use the listed output price and do
                  not add a separate thinking line, because those pricing tables do not show one for these standard
                  rows.
                </p>
              ),
            },
            {
              question: "Why is my provider missing?",
              answer: (
                <p>
                  Only prices copied from the provider pages above are included. A model that is not in the dropdown
                  was left out rather than guessed. On November 5, 2026 that list gained gpt-6.1-terra, gpt-6-luna,
                  grok-4.7, and grok-build-0.1. The prices already in the list matched the same pages.
                </p>
              ),
            },
            {
              question: "Do I need an account?",
              answer: <p>No. The calculation stays in the browser. The numbers you type are not submitted.</p>,
            },
          ]}
        />
      </div>
    </>
  );
}
