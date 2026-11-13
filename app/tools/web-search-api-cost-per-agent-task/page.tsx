import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqList } from "@/components/FaqList";
import { WebSearchCostCalculator } from "@/components/WebSearchCostCalculator";
import {
  DAYS,
  SEARCH_PRICE_CHECKED,
  formatCount,
  formatUsd,
  guideLinks,
  priceSearchApi,
  searchApiById,
  searchToolPath,
} from "@/lib/tools/web-search-cost";
import { JsonLd, defaultMetadata, faqPageJsonLd, softwareApplicationJsonLd, webPageJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

const path = searchToolPath;
const title = "Web search API cost per agent task: price the window too";
const description =
  "Price Tavily, Exa, Brave, Perplexity, SerpAPI, Gemini grounding, and the OpenAI and Anthropic web search tools per task and per 30 days. Call fees are the vendor pages read November 13, 2026. Result tokens are a number you enter.";
const published = "2026-11-13";

const exampleInputs = {
  searchesPerTask: 2,
  resultsPerSearch: 5,
  tokensPerResult: 400,
  tasksPerDay: 20,
  outputTokensPerTask: 0,
  modelId: "gpt-5",
  applyAllowance: false,
};

const faqs = [
  {
    question: "What does one web search cost an agent per task?",
    answer:
      "The call fee plus the tokens that stay in the context window. On the pages read November 13, 2026, OpenAI web_search and Anthropic web search are each $10 per 1,000 successful searches. Tavily basic pay as you go is $0.008 a request. Exa lite is $4 per 1,000 for up to 10 results. The tokens are a separate line, priced on the model you pick.",
  },
  {
    question: "Which part is the tool definition, and which part is the results?",
    answer:
      "The tool definition is the JSON that stays loaded so the model can call search. OpenAI’s one-element tools array is 8 tokens and Anthropic’s web_search_20260318 array is 17, recounted November 13, 2026 with tiktoken o200k_base. Brave’s search tool was 1,400 tokens, Tavily’s search tool 862, and Exa’s search-only list 348, measured November 11 and not remeasured. Result tokens are whatever you type. This page does not invent a snippet length.",
  },
  {
    question: "Does Gemini grounding bill the pages it retrieves?",
    answer:
      "Google’s Gemini pricing page, read November 13, 2026, says Search Grounding retrieved tokens are excluded. This calculator adds the $14 per 1,000 query fee for Gemini 3 and newer, and it does not add result tokens on that row. The grounding guide says Gemini 3 bills each query the model runs. Gemini 2.5 is a different row, $35 per 1,000 grounded prompts.",
  },
  {
    question: "Why can a cheaper API cost more per task?",
    answer:
      "A $1-per-1,000 result list still has to be read by a model. Two searches that return five 400-token snippets are 4,000 input tokens before the tool definition. On gpt-5’s standard rate that text is the larger line once the call itself is only a fraction of a cent. The hosted $0.01 call can be cheaper than a cheap API plus a long page.",
  },
  {
    question: "How is the month calculated?",
    answer:
      "Thirty days times tasks per day. That is the same window as the AI agent cost calculator. It is not a calendar month. SerpAPI is a subscription: if the month’s searches fit in the plan, you pay the plan price, not the divided rate. Searches past the plan are not priced, because SerpAPI’s page does not print an overage.",
  },
  {
    question: "Is what I type stored?",
    answer:
      "No. The calculation stays in the browser. The share link puts the inputs in the address bar. This site does not receive the form, and there is no email field.",
  },
];

export const metadata = defaultMetadata(title, description, path, { absoluteTitle: true });

export default function WebSearchApiCostPage() {
  const openai = priceSearchApi(searchApiById("openai-web-search"), "web_search", exampleInputs);
  const tavily = priceSearchApi(searchApiById("tavily"), "basic-payg", exampleInputs);
  const checked = formatDate(SEARCH_PRICE_CHECKED);

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title,
            description,
            path,
            datePublished: published,
            dateModified: published,
          }),
          faqPageJsonLd(faqs),
          softwareApplicationJsonLd({
            name: "Web search API cost per agent task",
            url: path,
            description,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            offers: { price: 0, priceCurrency: "USD" },
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
          { name: "Web search API cost per agent task", path },
        ]}
      />
      <header className="mx-auto max-w-6xl px-4 pb-4 pt-8">
        <p className="kicker kicker-lead">Free tool</p>
        <h1 className="display mt-2 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[var(--muted)]">
          Pick the search APIs the agent calls. Enter searches, results, and the model. The page returns the call fee
          and the token cost of the tool definition plus the results you said it keeps.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Call prices were read {checked} from each vendor’s pricing page. A price this page could not re-read is not
          in the table. The worked comparison of list prices, limits, and MCP servers is{" "}
          <Link className="text-[var(--link)] underline" href="/reports/web-search-tools-for-ai-agents-november-2026">
            Best web search tool for Claude and OpenAI agents, November 2026
          </Link>
          .
        </p>
      </header>
      <div className="mx-auto max-w-6xl px-4 pb-20">
        <WebSearchCostCalculator />

        <section className="mt-14" aria-labelledby="what-one-search-costs">
          <h2 id="what-one-search-costs" className="text-2xl font-semibold tracking-tight">
            What does one web search cost per agent task?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Two numbers, added. The vendor’s fee for the search, then the model’s price for the tool JSON and for the
            text that comes back.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            At the starter inputs, gpt-5, 2 searches, 5 results, 400 tokens a result, 0 output tokens, and no free
            allowance, OpenAI web_search is {openai ? formatUsd(openai.perTask) : "unavailable"} a task and{" "}
            {openai ? formatUsd(openai.month) : "unavailable"} over {DAYS} days at 20 tasks a day. Tavily basic pay as
            you go, on the same inputs, is {tavily ? formatUsd(tavily.perTask) : "unavailable"} a task. The gap is the
            $0.01 OpenAI call against Tavily’s $0.008, plus Tavily’s 862-token search schema against OpenAI’s 8-token
            declaration. Change 400 and the gap moves.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="call-versus-window">
          <h2 id="call-versus-window" className="text-2xl font-semibold tracking-tight">
            Which dollars are the call, and which are the context window?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The call is the published price per search. The window is input tokens times the model’s input rate, once
            per task.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Input tokens are the tool definition, counted once, plus searches times results times the token count you
            enter. Output tokens start at 0 because this page does not guess an answer length. A loop that resends the
            tools array on every model call pays the definition again. This page does not guess how many model calls
            sit inside the task. The November 11 measurement of those definitions is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/web-search-tool-definition-tokens">
              Brave&apos;s MCP tool list is 25,495 tokens. Web search alone is 1,400.
            </Link>
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-[var(--muted)]">
            <li>
              OpenAI, read {checked}: $10.00 per 1,000 calls, plus search-content tokens at model rates. The{" "}
              <a className="text-[var(--link)] underline" href={guideLinks.openaiGuide}>
                web search guide
              </a>{" "}
              still tells new integrations to send <code>{`{"type":"web_search"}`}</code>. Preview on non-reasoning
              models is $25.00 per 1,000 and the content tokens are free, so that mode zeroes the result tokens.
            </li>
            <li>
              Anthropic, read {checked}: $10 USD per 1,000 searches, plus tokens for search-generated content. A failed
              search is not billed. Citation fields do not count. The{" "}
              <a className="text-[var(--link)] underline" href={guideLinks.anthropicTool}>
                tool page
              </a>{" "}
              examples use <code>web_search_20260318</code>.
            </li>
            <li>
              Tavily: basic is 1 credit, advanced is 2, pay as you go is $0.008 a credit. The credit count does not
              grow with the result count.
            </li>
            <li>
              Exa lite is $4 per 1,000 for the first 10 results. Each result past 10 is $1 per 1,000 results. Auto and
              fast are $7 per 1,000 on the same shape.
            </li>
            <li>Brave Search is $5 per 1,000 requests. The result count does not change that request price.</li>
            <li>
              Perplexity’s Search API is $5 or $1 per 1,000 requests and adds no model tokens of its own. Agent API{" "}
              <code>web_search</code> is $2.50 or $1 per 1,000 invocations, and this page prices that row’s result text
              at perplexity/sonar.
            </li>
            <li>
              SerpAPI is a monthly plan. Starter is $25 for 1,000 searches. The page does not print a price for search
              1,001.
            </li>
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="more-results">
          <h2 id="more-results" className="text-2xl font-semibold tracking-tight">
            What changes when the task fetches more results?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            On Exa, result 11 starts a second meter. On the other APIs in this table, more results change the token
            line, not the call fee.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            OpenAI, Anthropic, Tavily, Brave, Perplexity, and SerpAPI price the request. Extra URLs still land in the
            window if you keep them, at the tokens-per-result figure you entered. Exa’s page is the exception: the
            base price stops at 10 results. Gemini 3 is the other exception, and it runs the other way. The{" "}
            <a className="text-[var(--link)] underline" href={guideLinks.geminiSearch}>
              grounding guide
            </a>{" "}
            bills each query, and the pricing page excludes the retrieved tokens. A wider result list does not move
            that row. A second query does. Queries past 1,500 a day are outside the published cap and are left
            unpriced.
          </p>
        </section>

        <section className="mt-14" aria-labelledby="left-out">
          <h2 id="left-out" className="text-2xl font-semibold tracking-tight">
            Which vendors are missing, and why?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Parallel, Firecrawl, Linkup, You.com, Jina, and Serper are not in the calculator. Their November 12 prices
            were not re-read on November 13, so they are left out.
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            The November 12 dataset that does include them is the{" "}
            <Link className="text-[var(--link)] underline" href="/reports/web-search-tools-for-ai-agents-november-2026">
              web search tools report
            </Link>
            . The rate card from November 11, including Serper’s $1 pack, is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/web-search-api-prices-for-ai-agents-november-2026">
              Claude and OpenAI web search both cost $10 per 1,000
            </Link>
            . Chat products, as opposed to these APIs, are{" "}
            <Link className="text-[var(--link)] underline" href="/best/ai-agents-for-web-search">
              Best AI agent for web search
            </Link>
            . Which tool belongs in a harness is{" "}
            <Link className="text-[var(--link)] underline" href="/blog/best-web-search-tool-for-ai-agents">
              What is the best web search tool for an AI agent harness?
            </Link>{" "}
            and{" "}
            <Link className="text-[var(--link)] underline" href="/blog/best-web-search-tool-for-claude-and-openai-agents">
              the 8-token and 17-token declarations
            </Link>
            .
          </p>
        </section>

        <section className="mt-14" id="next-steps" aria-labelledby="next-steps-heading">
          <h2 id="next-steps-heading" className="text-2xl font-semibold tracking-tight">
            What should you open next?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--muted)]">
            Price the rest of the task, then pick the framework that will hold the tool.
          </p>
          <ul className="mt-3 grid gap-2 text-sm">
            <li>
              <Link className="text-[var(--link)] underline" href="/agent-cost-calculator">
                AI agent cost calculator
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                for a 30-day token bill that is not a search fee. Model rates on this page are that calculator’s
                standard rates. On November 13 the OpenAI page still listed gpt-5.6-sol at $4 input and $20 output, and
                Anthropic still listed Claude Fable 5.2 standard at $8 and $40. Fast, batch, and cache rates are not
                used.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/tools/ai-agent-roi-calculator">
                AI agent ROI calculator
              </Link>
              <span className="text-[var(--muted)]"> if you want payback months from a cost per task you already have.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/research/ai-agent-framework-mcp-a2a-support-november-2026">
                Which frameworks document MCP and A2A
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                if the next question is which library can call the API, or expose itself as the tool.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/trackers/downloads">
                Framework downloads tracker
              </Link>
              <span className="text-[var(--muted)]">
                {" "}
                for PyPI and npm file requests. A download is not a search bill. The{" "}
                <Link className="text-[var(--link)] underline" href="/trackers">
                  tracker desk
                </Link>{" "}
                holds the rest.
              </span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/submit">
                Submit or claim a listing
              </Link>
              <span className="text-[var(--muted)]"> if you ship a search agent and want it in the directory.</span>
            </li>
            <li>
              <Link className="text-[var(--link)] underline" href="/tools">
                All free tools
              </Link>
              <span className="text-[var(--muted)]"> on one page.</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-[var(--muted)]">
            The starter example uses {formatCount(exampleInputs.searchesPerTask)} searches and{" "}
            {formatCount(exampleInputs.tokensPerResult)} tokens a result. Canonical URL:{" "}
            <a className="text-[var(--link)] underline" href={absoluteUrl(path)}>
              {absoluteUrl(path)}
            </a>
          </p>
        </section>

        <FaqList
          heading="What do buyers ask before they attach web search?"
          lead="The answers are the vendor pages read November 13, 2026, plus token counts this site measured. They are not your invoice."
          items={faqs.map((item) => ({ question: item.question, answer: <p>{item.answer}</p> }))}
        />
      </div>
    </>
  );
}
