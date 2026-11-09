import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CostCalculator } from "@/components/CostCalculator";
import { PageHeader } from "@/components/PageHeader";
import { UpdatedLine } from "@/components/UpdatedLine";
import { codingAgentsComparison } from "@/lib/coding-agents-comparison";
import { PRICE_READ_ON } from "@/lib/model-prices";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const path = "/tools/cursor-vs-claude-code-vs-codex-pricing";
const title = "Cursor vs Claude Code vs Codex pricing calculator";
const description =
  "Cursor, Claude Code, and Codex seat prices read November 9, 2026, plus a token calculator for official API prices read November 5, 2026. The calculator is not a seat-price quote.";
const verifiedOn = codingAgentsComparison.verifiedOn ?? "2026-11-09";

const ids = new Set(["cursor", "claude-code", "codex"]);
const rows = codingAgentsComparison.rows.filter((row) => ids.has(row.id));

const faqs = [
  {
    question: "Is this a seat price or a token bill?",
    answer:
      "Both are on the page, and they are different. The three cards are list prices read on November 9, 2026. The calculator multiplies official API token prices, read November 5, 2026. It does not price a Cursor, Claude, or ChatGPT seat.",
  },
  {
    question: "How much does Cursor cost?",
    answer:
      "On November 9, 2026, cursor.com/pricing listed Free at $0, Plus at $8 a month, Premium at $30, Super at $100, and Ultra at $200. Third-party models are extra. Prices exclude tax.",
  },
  {
    question: "Does Claude Free include Claude Code?",
    answer:
      "No. The pricing page read on November 9, 2026 did not list Claude Code on the Free card. Claude Code appears on the Pro card, at $20 a month, or $17 a month when $200 is paid up front. Max is $100 a month with 5× Pro usage.",
  },
  {
    question: "How much does Codex cost?",
    answer:
      "The Codex pricing page read on November 9, 2026 says Codex is included on Free, Go, Plus, Pro, Business, or Enterprise. A feature note names $100 and $200 Pro plans. Dollar amounts for Free, Go, and Plus were not on the cards that fetch read.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function PricingCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: verifiedOn,
            dateModified: verifiedOn,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Cursor vs Claude Code vs Codex pricing", path },
        ]}
      />
      <PageHeader kicker="Pricing" title={title} summary={description} />
      <div className="mx-auto max-w-3xl px-4 pb-20">
        <UpdatedLine date={verifiedOn} />
        <p className="mt-4 text-sm leading-relaxed">
          Seat prices below were read {formatDate(verifiedOn)}. The token calculator uses prices read{" "}
          {formatDate(PRICE_READ_ON)}. A plan price is not a count of how much code the agent will write.
        </p>
        <h2 className="mt-10 text-2xl font-semibold tracking-tight">What do the three seat prices say?</h2>
        <ul className="mt-4 grid gap-4">
          {rows.map((row) => (
            <li key={row.id} className="rounded-3xl border border-[var(--stroke)] bg-white p-5">
              <h3 className="text-lg font-semibold">
                {row.listingSlug ? (
                  <Link href={`/directory/${row.listingSlug}`} className="text-[var(--link)] underline">
                    {row.name}
                  </Link>
                ) : (
                  row.name
                )}
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{row.pricing}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          The full four-product table, including GitHub Copilot, is{" "}
          <Link href="/best/ai-coding-agents" className="text-[var(--link)] underline">
            Best AI coding agents
          </Link>
          . The token-only page is the{" "}
          <Link href="/agent-cost-calculator" className="text-[var(--link)] underline">
            AI agent cost calculator
          </Link>
          .
        </p>
        <h2 className="mt-12 text-2xl font-semibold tracking-tight">What does the token calculator cover?</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Official per-token prices for the models in the dropdown, read {formatDate(PRICE_READ_ON)}. Enter your own
          tokens and tasks. The starting numbers are an example, not a measured workload.
        </p>
        <div className="mt-5">
          <CostCalculator />
        </div>
        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">What else do people ask?</h2>
          {faqs.map((item) => (
            <div key={item.question} className="mt-6">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item.answer}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
