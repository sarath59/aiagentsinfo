import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CiteOrEmbed } from "@/components/CiteOrEmbed";
import { DataSourceLine } from "@/components/DataSourceLine";
import { FaqList } from "@/components/FaqList";
import { NextRead } from "@/components/NextRead";
import { ShoppingReadinessChecker } from "@/components/ShoppingReadinessChecker";
import { JsonLd, defaultMetadata, faqPageJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import {
  description,
  path,
  readOn,
  readinessSources,
  title,
} from "@/lib/shopping-readiness";
import { formatDate } from "@/lib/utils";

const faqs = [
  {
    question: "What is an AI shopping agent readiness checker?",
    answer:
      "Eighteen yes, partly, or no checks a merchant answers about its own store. The score is a weighted worksheet for whether an agent can find a product row, read the price and stock in the HTML, and check out through a channel that has actually been turned on. It does not crawl the store.",
  },
  {
    question: "Does a high score mean an agent can buy from the store?",
    answer:
      "No. Ninety points with every row answered means the worksheet is full. OpenAI’s merchant page, read on this site November 10, 2026, still sends the ChatGPT purchase to the merchant’s site or app. Google’s checkout flag defaults to false. Visa Intelligent Commerce and Mastercard Agent Pay are participant programs, not a theme setting.",
  },
  {
    question: "Are the weights an official score?",
    answer:
      "No. The 18 weights sum to 100 and were set by this desk. A feed row and a price in the HTML are weighted above llms.txt and Google-Extended, because those two files are not how ChatGPT or Google Search decide to show a product. Partly scores half the row.",
  },
  {
    question: "Is the worksheet saved?",
    answer:
      "No. The answers stay in the browser until you leave or clear them. There is no account, no email field, and no file download. Copy puts the gap list on your clipboard.",
  },
  {
    question: "Which checkout protocol should a store turn on first?",
    answer:
      "The one the channel you already sell on will certify. UCP is the Google Merchant Center flag, and it stays false until you set it on an eligible SKU. ACP’s feed flag does nothing until OpenAI checkout is enabled for that merchant. AP2, as of the November 11 census, is a git install with no official registry package. Visa and Mastercard require their own onboarding.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function ShoppingReadinessPage() {
  const updatedLabel = formatDate(readOn);
  const pageUrl = absoluteUrl(path);
  const citation = `AI Agents Info. "${title}." Sources read ${updatedLabel}. ${pageUrl}.`;
  const embed = `<blockquote cite="${pageUrl}">
<p>${description} Sources read ${updatedLabel}.</p>
<footer><a href="${pageUrl}">${title}</a>, AI Agents Info.</footer>
</blockquote>`;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: readOn,
            dateModified: readOn,
          }),
          faqPageJsonLd(faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Shopping agent readiness", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-8 pt-12">
        <p className="kicker kicker-lead">Checklist</p>
        <h1 className="display mt-3 text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Eighteen checks for a store an agent has to find, read, and pay. Mark a row only when you can point at the
          feed, the HTML, or the contract. The score is a worksheet. It is not a crawl, and it is not an order.
        </p>
        <p className="mt-3 text-sm text-[var(--muted)]">
          OpenAI’s crawler page and Perplexity’s crawler page were read{" "}
          <time dateTime={readOn}>{updatedLabel}</time>. Visa’s production-readiness page and Mastercard’s October 20,
          2026 Agent Pay for Machines post were read the same day. The feed fields and the UCP flag are the ones in the{" "}
          <Link className="text-[var(--link)] underline" href="/blog/how-to-make-your-store-readable-by-ai-shopping-agents">
            store-readable guide
          </Link>
          , read November 10, 2026. Protocol install counts are the{" "}
          <Link
            className="text-[var(--link)] underline"
            href="/research/agentic-commerce-protocol-adoption-november-2026"
          >
            November 11 census
          </Link>
          . This page did not re-count stars.
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <NextRead
          reads={[
            {
              href: "/reports/ai-shopping-agents-next-6-months",
              title: "AI shopping agents, the next 6 months",
              note: "What six companies have dated. This worksheet does not move that calendar.",
            },
            {
              href: "/blog/how-to-make-your-store-readable-by-ai-shopping-agents",
              title: "How to make your store readable by AI shopping agents",
              note: "The nine OpenAI fields and Google’s checkout flag, in full.",
            },
            {
              href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
              title: "Can an AI shopping agent check out for you?",
              note: "Who can pay today, product by product.",
            },
            {
              href: "/best/ai-agents-for-shopping",
              title: "Best AI agent for shopping",
              note: "Licence, list price, and checkout path for the shopper products.",
            },
          ]}
          tool={{
            href: "/agent-cost-calculator",
            title: "agent cost calculator",
            note: "a token bill. This score is not a price",
          }}
        />
        <div className="mt-10">
          <ShoppingReadinessChecker />
        </div>
        <div className="article-prose mt-14 max-w-3xl">
          <h2>What does the score count?</h2>
          <p>
            It counts the rows you marked, using weights that sum to 100. A feed, a Merchant Center approval, and a
            price in the HTML are worth more than a crawler token or an llms.txt file.
          </p>
          <p>
            Yes takes the full weight. Partly takes half. No takes zero. Blank rows stay out of the gap list so an
            unfinished worksheet does not look like eighteen failures. The weights are editorial. Google and OpenAI
            do not publish this score.
          </p>
          <h2>Can an agent find a product without a feed?</h2>
          <p>
            ChatGPT’s merchant path reads a product feed. A crawl of the homepage is optional.
          </p>
          <p>
            <a href="https://developers.openai.com/commerce/specs/file-upload/products">OpenAI’s feed spec</a>, read
            on this site November 10, 2026, names nine discovery fields: item id, title, description, product URL,
            brand, seller name, image URL, availability, and price. Search eligibility defaults to on. Checkout
            defaults to off.{" "}
            <a href="https://openai.com/chatgpt/search-product-discovery/">The merchant page</a> says shopping is live
            for ChatGPT users in the United States, Shopify and Etsy catalogs are already integrated, and the purchase
            finishes on the merchant’s website or app. The longer field rules are{" "}
            <Link href="/blog/how-to-make-your-store-readable-by-ai-shopping-agents">
              how to make your store readable by AI shopping agents
            </Link>
            .
          </p>
          <h2>Which crawler puts a store in ChatGPT search?</h2>
          <p>
            OAI-SearchBot. Sites that opt out are not shown in ChatGPT search answers.
          </p>
          <p>
            <a href="https://developers.openai.com/api/docs/bots">OpenAI’s crawler overview</a>, read November 12,
            2026, says OAI-SearchBot surfaces websites in ChatGPT search, a robots.txt change can take about 24 hours
            to apply, and GPTBot is a separate training crawler. ChatGPT-User fetches when a person asks. Robots.txt
            rules may not apply to it, and it does not decide Search. PerplexityBot, on{" "}
            <a href="https://docs.perplexity.ai/docs/resources/perplexity-crawlers">Perplexity’s crawler page</a> read
            the same day, surfaces and links sites in Perplexity search. Perplexity-User is the user-triggered visit.
            Googlebot remains the crawler for Google Search. Google-Extended is the control for training and grounding
            in some of Google’s other systems, not the switch for AI Overviews, on{" "}
            <a href="https://developers.google.com/search/docs/appearance/ai-features">
              Google’s AI features page
            </a>{" "}
            as read on this site November 9.
          </p>
          <h2>Does llms.txt or JSON-LD turn on checkout?</h2>
          <p>
            Neither one authorizes a payment. Both can still make a price easier to quote.
          </p>
          <p>
            Google’s AI features page says you do not need a new machine-readable file or extra schema.org markup for
            AI Overviews or AI Mode, and that structured data should match the visible words.{" "}
            <a href="https://llmstxt.org/">llmstxt.org</a> is a separate proposal for a Markdown index at /llms.txt.
            This site publishes <Link href="/llms.txt">its own copy</Link>. A Product node that repeats the HTML price
            gives an agent a second copy of a number it can check against the feed. It does not set Google’s
            native_commerce flag.
          </p>
          <h2>Which checkout protocol can a store turn on today?</h2>
          <p>
            The one the channel you sell on will certify. Stars do not pick it.
          </p>
          <p>
            Google’s UCP guide says checkout eligibility defaults to false until the feed sets native_commerce to true
            on an eligible SKU. OpenAI’s is_eligible_checkout does nothing until checkout is enabled for that
            integration. The{" "}
            <Link href="/research/agentic-commerce-protocol-adoption-november-2026">November 11 census</Link> found no
            official npm or PyPI package for ACP or for Google’s Agent Payments Protocol. AP2’s README still pointed
            at a git install, and the PyPI name ap2 belonged to a different repository. UCP’s latest GitHub release
            in that census was v2026-08-25. ACP’s newest dated spec folder was spec/2026-04-17.
          </p>
          <p>
            Visa Intelligent Commerce, on the{" "}
            <a href="https://developer.visa.com/docs/visa-intelligent-commerce/production-readiness">
              production-readiness page
            </a>{" "}
            read November 12, 2026, is sandbox, then certification, then production for an approved participant.
            Mastercard Agent Pay, announced April 29, 2025, is tokenized payment for registered agents. Agent Pay for
            Machines, opened to early access October 20, 2026, is a different product: an agent paying for digital
            services on x402, inside a budget. Who can pay on the shopper products already shipping is{" "}
            <Link href="/blog/can-an-ai-shopping-agent-check-out-for-you">
              can an AI shopping agent check out for you
            </Link>
            . The dated company calendar is{" "}
            <Link href="/reports/ai-shopping-agents-next-6-months">AI shopping agents, the next 6 months</Link>. The
            shopper table is <Link href="/best/ai-agents-for-shopping">Best AI agent for shopping</Link>.
          </p>
          <h2>What should you do with the gap list?</h2>
          <p>
            Fix the largest missing weight first, then re-mark the row. Start with the feed and the HTML price.
          </p>
          <p>
            A missing OpenAI row or a price that exists only after JavaScript costs more points than a missing
            llms.txt, because those two are what a harness quotes. After the row and the price agree, set the checkout
            flag only on SKUs the channel’s guide allows. Then write the eval: did the charged amount match the
            approved amount, did the item id match the feed, and did the run stop when the only path was a handoff.
            That eval is a <Link href="/glossary/harness">harness</Link> question. The worksheet for the software
            around the model is the{" "}
            <Link href="/tools/ai-agent-harness-evaluation-checklist">harness evaluation checklist</Link>. Live counts
            of a different package set are the <Link href="/trackers">trackers</Link>. To list an agent product,{" "}
            <Link href="/submit">submit a tool</Link> or claim a page in the <Link href="/directory">directory</Link>.
            More worksheets are on <Link href="/tools">the tools index</Link>.
          </p>
        </div>
        <section className="mt-10">
          <h2 className="text-2xl font-semibold tracking-tight">Which pages were read for these 18 checks?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The crawler pages, Visa’s production path, and Mastercard’s October 20 post were read November 12, 2026.
            Feed fields and the UCP flag are the November 10 reading. Install counts are the November 11 census.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            {readinessSources.map((source) => (
              <li key={source.url}>
                <a className="text-[var(--link)] underline" href={source.url}>
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
        <DataSourceLine title={title} updated={readOn} path={path} />
        <div className="mt-10">
          <CiteOrEmbed citation={citation} embed={embed} />
        </div>
        <FaqList
          heading="What else do merchants ask before an agent can quote the store?"
          lead="The score is a worksheet of eighteen sourced checks. It does not save answers and it does not place an order."
          items={faqs}
        />
      </div>
    </>
  );
}
