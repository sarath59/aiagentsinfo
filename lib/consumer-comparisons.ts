import type { ComparisonPage } from "@/lib/comparisons";
import type { SortableColumn } from "@/lib/sortable";

export const consumerColumns: SortableColumn[] = [
  { key: "name", label: "Tool" },
  { key: "vendor", label: "Maker" },
  { key: "bestFor", label: "Best for" },
  { key: "license", label: "Licence" },
  { key: "pricing", label: "Pricing" },
  { key: "platform", label: "Platform" },
  { key: "sources", label: "Sources" },
];

const HUB = { href: "/best", title: "Best AI agents" } as const;

function hubCard() {
  return {
    href: HUB.href,
    title: HUB.title,
    description: "The hub for every sourced best-of table on this site.",
    kicker: "Hub",
  };
}

export const shoppingComparison: ComparisonPage = {
  slug: "ai-agents-for-shopping",
  path: "/best/ai-agents-for-shopping",
  title: "Best AI agent for shopping",
  heading: "Best AI agent for shopping in 2026",
  metaTitle: "Best AI agent for shopping: 4 compared (2026)",
  metaDescription:
    "There is no single best AI agent for shopping. We compared 4 products on checkout, who is the seller, and list price (Nov 2026). No invented scores.",
  description:
    "There is no single best AI agent for shopping. Alexa for Shopping can auto-buy on Amazon or use Buy for Me on eligible other-store items. Google AI Mode and Gemini can hold a Universal Cart in the US and, for eligible Canadian retailers, check out with Google Pay. ChatGPT helps you compare products and sends the purchase to the merchant’s site. Perplexity Instant Buy, launched with PayPal on November 25, 2025, is a separate in-chat pay path whose help article did not load on November 7, 2026.",
  summary:
    "Sourced comparison of shopping agents on checkout, seller, and list price. Last verified November 2026. No invented scores.",
  question: "Which AI agent is best for shopping in 2026?",
  tableHeading: "How do shopping agents compare on checkout and price?",
  tableLead:
    "The table lists 4 shopping agents with a Best for label, whether checkout happens in the product, list price, and platform from official pages, last verified November 2026.",
  tableCaption: "Best AI agent for shopping comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each shopping job?",
  bestForLead:
    "Alexa for Shopping fits Amazon auto-buy; Gemini and AI Mode fit a Google Pay cart; ChatGPT fits product discovery that finishes on the store site.",
  methodHeading: "How was this shopping-agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI shopping agents?",
  faqLead: "These short answers cover checkout, who is the seller, Instant Checkout, and why this page has no star ratings.",
  applicationCategory: "ShoppingApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["shopping", "tools-saas", "how-agents-work"],
  categories: ["shopping-agents", "ecommerce"],
  takeaways: [
    "A shopping agent can search and compare. It can pay only when the product has a checkout path, a saved payment method, and a rule for who must agree.",
    "On the Google, OpenAI, and Perplexity pages checked for this table, the merchant remains the seller.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality or invent a score.",
  ],
  picks: [
    {
      title: "Best for buying on Amazon",
      body: "Amazon’s October 29, 2026 guide says Alexa for Shopping is included for U.S. customers. It can add items to a cart you still check out, auto-buy at a price you set, or use Buy for Me on eligible products from other stores.",
      href: "/directory/amazon-rufus",
    },
    {
      title: "Best for a Google Pay cart",
      body: "Google launched Universal Cart in the U.S. on October 15, 2026, and on November 4, 2026 began rolling out direct checkout for eligible Canadian retailers in AI Mode and the Gemini app. The merchant remains the seller.",
      href: "/directory/gemini",
    },
    {
      title: "Best for comparing before you leave chat",
      body: "OpenAI’s March 24, 2026 product-discovery post, and the merchant page re-read November 7, 2026, say people find products in ChatGPT and complete the purchase on the merchant’s website or app.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for PayPal Instant Buy (when the page loads)",
      body: "PayPal and Perplexity announced Instant Buy on November 25, 2025. Perplexity’s Instant Buy help article retrieved November 4, 2026 did not load on November 7, 2026. This row does not invent a current checkout rule.",
      href: "/directory/perplexity",
    },
  ],
  rows: [
    {
      id: "alexa-shopping",
      name: "Alexa for Shopping",
      vendor: "Amazon",
      listingSlug: "amazon-rufus",
      website: "https://www.amazon.com/gp/help/customer/display.html?nodeId=Tvh55TTsQ5XQSFc7Pr",
      license: "Proprietary product",
      pricing: "Included for U.S. Amazon customers; no separate subscription on Amazon’s Oct 29, 2026 guide",
      platform: "Amazon Shopping app and Amazon.com (U.S.)",
      bestFor: "Amazon auto-buy and Buy for Me",
      job: "Amazon shopping assistant that can cart, auto-buy at a set price, or Buy for Me on eligible other-store items.",
      sourceIds: [1, 2, 3],
    },
    {
      id: "gemini-shopping",
      name: "Gemini / Google AI Mode",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://blog.google/products-and-platforms/products/shopping/universal-cart-launch/",
      license: "Proprietary product",
      pricing: "Gemini app free; Google AI Plus $4.99/mo, Pro $19.99/mo (listing, 3 Nov 2026)",
      platform: "Google Search AI Mode and Gemini app (U.S. cart; Canada checkout rolling out)",
      bestFor: "Google Pay Universal Cart",
      job: "Shopping in AI Mode and Gemini with Universal Cart in the U.S. and direct checkout for eligible Canadian retailers.",
      sourceIds: [4, 5, 11],
    },
    {
      id: "chatgpt-shopping",
      name: "ChatGPT product discovery",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://openai.com/index/powering-product-discovery-in-chatgpt/",
      license: "Proprietary product",
      pricing: "Free $0; Go $8/mo; Plus $20/mo; Pro from $100/mo (Codex listing, 6 Nov 2026)",
      platform: "ChatGPT web, desktop, and mobile; purchase finishes on the merchant site",
      bestFor: "Compare, then buy on the store site",
      job: "Product discovery in ChatGPT. Purchases complete on the merchant’s website or app after Instant Checkout was stepped back on March 24, 2026.",
      sourceIds: [6, 7, 10],
    },
    {
      id: "perplexity-shopping",
      name: "Perplexity Instant Buy",
      vendor: "Perplexity AI",
      listingSlug: "perplexity",
      website: "https://newsroom.paypal-corp.com/2025-11-PayPal-and-Perplexity-Launch-Instant-Buy",
      license: "Proprietary product",
      pricing: "Free $0; $17/mo and $167/mo billed annually (listing, 7 Nov 2026)",
      platform: "Perplexity; Instant Buy announced with PayPal on 25 Nov 2025",
      bestFor: "Cited answers with a PayPal buy path",
      job: "Answer engine with Instant Buy announced with PayPal. The Instant Buy help article did not load on November 7, 2026.",
      sourceIds: [8, 9, 12],
    },
  ],
  sources: [
    { title: "Rajiv Mehta, Amazon, How to use Alexa for Shopping (updated October 29, 2026)", url: "https://www.aboutamazon.com/news/retail/how-to-use-amazon-shopping-ai-assistant" },
    { title: "Amazon Customer Service, About Alexa for Shopping", url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=Tvh55TTsQ5XQSFc7Pr" },
    { title: "Amazon Staff, Buy for Me", url: "https://www.aboutamazon.com/news/retail/amazon-shopping-app-buy-for-me-brands" },
    { title: "Suresh Ganapathy, Google, An intelligent new shopping cart (October 15, 2026)", url: "https://blog.google/products-and-platforms/products/shopping/universal-cart-launch/" },
    { title: "Sabrina Geremia, Google Canada, A new way to shop (November 4, 2026)", url: "https://blog.google/intl/en-ca/products/explore-get-answers/a-new-way-to-shop-introducing-a-more-intuitive-agentic-shopping-experience-for-consumers-and-retailers-in-canada/" },
    { title: "OpenAI, Powering product discovery in ChatGPT (March 24, 2026)", url: "https://openai.com/index/powering-product-discovery-in-chatgpt/" },
    { title: "OpenAI, Power product discovery in ChatGPT (merchant page)", url: "https://openai.com/chatgpt/search-product-discovery/" },
    { title: "PayPal newsroom, PayPal and Perplexity launch Instant Buy (November 25, 2025)", url: "https://newsroom.paypal-corp.com/2025-11-PayPal-and-Perplexity-Launch-Instant-Buy" },
    { title: "Perplexity Help Center, What is Instant Buy? (retrieved November 4, 2026; did not load November 7)", url: "https://www.perplexity.ai/help-center/en/articles/10352906-what-is-instant-buy" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "AI Agents Info, Gemini listing (Google AI plan dollars, checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
    { title: "AI Agents Info, Perplexity listing (checked November 7, 2026)", url: "https://www.aiagentsinfo.com/directory/perplexity" },
  ],
  faq: [
    {
      question: "Can ChatGPT buy things for me?",
      answer:
        "No. On the merchant page re-read November 7, 2026, people discover and compare products in ChatGPT, and the purchase finishes on the merchant’s website or app. Instant Checkout, launched September 29, 2025, is the earlier in-chat path OpenAI stepped back from on March 24, 2026.",
    },
    {
      question: "Can an AI shopping agent check out for you?",
      answer:
        "Sometimes, and only inside a product that has a payment path. Google is rolling out direct checkout for eligible Canadian retailers after Universal Cart in the U.S. Amazon’s Alexa for Shopping can auto-buy at a price you set, or use Buy for Me on eligible products from other stores.",
    },
    {
      question: "Who is the seller when an assistant pays?",
      answer:
        "On the Google, OpenAI, and Perplexity pages checked for this table, the merchant remains the seller. The assistant passes along the cart and the payment instruction.",
    },
    {
      question: "Why are there no star ratings?",
      answer:
        "This page copies licence, list price, and platform from official pages. It does not invent a quality score or a ranking.",
    },
  ],
  related: [
    hubCard(),
    { href: "/glossary/shopping-agent", title: "Shopping agent", description: "A model plus the tools to search, compare, and sometimes buy.", kicker: "Glossary" },
    { href: "/blog/can-an-ai-shopping-agent-check-out-for-you", title: "Can an AI shopping agent check out for you?", description: "The longer checkout guide this table is built from.", kicker: "Guide", date: "2026-11-04" },
    { href: "/blog/ucp-vs-acp-spec-versions-november-2026", title: "OpenAI’s checkout example is still API version 2025-09-12", description: "ACP’s GitHub snapshot is 2026-04-17. UCP’s latest release tag is v2026-08-25.", kicker: "Guide", date: "2026-11-10" },
    { href: "/directory/amazon-rufus", title: "Alexa for Shopping", description: "Amazon’s store assistant.", kicker: "Directory" },
    { href: "/best/ai-agents-for-travel-booking", title: "Best AI agent for travel booking", description: "Flights and hotels with a named booking path.", kicker: "Comparison" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for shopping in 2026?",
      paragraphs: [
        "There is no single best AI agent for shopping. [Alexa for Shopping](/directory/amazon-rufus) can auto-buy on Amazon or use Buy for Me on eligible other-store items. [Gemini](/directory/gemini) and Google AI Mode can hold a Universal Cart in the US and, for eligible Canadian retailers, check out with Google Pay. [ChatGPT](/directory/chatgpt) helps you compare products and sends the purchase to the merchant’s site. [Perplexity](/directory/perplexity) Instant Buy, launched with PayPal on November 25, 2025, is a separate in-chat pay path whose help article did not load on November 7, 2026.",
        "The longer checkout guide is [Can an AI shopping agent check out for you?](/blog/can-an-ai-shopping-agent-check-out-for-you). The word this table uses is [shopping agent](/glossary/shopping-agent). The shelf for this table is [Best AI agents](/best).",
      ],
    },
    {
      id: "who-is-the-seller",
      heading: "Who is the seller when an AI shopping agent pays?",
      paragraphs: [
        "The merchant remains the seller on the Google, OpenAI, and Perplexity pages checked for this table. Google’s Universal Cart and Canada checkout posts say the store charges the payment method. OpenAI’s merchant page says the purchase finishes on the merchant’s website or app. Amazon’s Buy for Me article says the brand sends the confirmation and handles delivery, returns, and customer service.",
        "A [product feed](/glossary/product-feed) is the catalog file. [Agentic checkout](/glossary/agentic-checkout) is the payment step. They are not the same thing.",
      ],
    },
  ],
};

export const webSearchComparison: ComparisonPage = {
  slug: "ai-agents-for-web-search",
  path: "/best/ai-agents-for-web-search",
  title: "Best AI agent for web search",
  heading: "Best AI agent for web search in 2026",
  metaTitle: "Best AI agent for web search: 4 in 2026",
  metaDescription:
    "For Claude and OpenAI agents: Claude web search cites sources on every plan, and ChatGPT search is on every plan, including unsigned-in use (Nov 2026).",
  description:
    "There is no single best AI agent for web search. For Claude and OpenAI agents, the tools on this page are Claude web search and ChatGPT search. ChatGPT search is on Free, Go, Plus, Pro, Business, Enterprise, and Edu, and for people who are not signed in. Claude web search is on every Claude plan globally, with citations, and usage counts toward plan limits. Gemini and Google AI Mode sit in Search. Perplexity is an answer engine that cites retrieved pages.",
  summary:
    "Sourced comparison of web-search agents on plans, citations, and list price. Last verified November 2026.",
  question: "Which AI agent is best for web search in 2026?",
  tableHeading: "How do web-search agents compare on plans and citations?",
  tableLead:
    "The table lists 4 web-search products with a Best for label, licence, list price, and where search runs, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for web search comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each search job?",
  bestForLead:
    "ChatGPT search fits every ChatGPT plan including unsigned-in use; Claude fits cited answers on Free; Perplexity fits an answer engine built around citations.",
  methodHeading: "How was this web-search comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI web search?",
  faqLead: "These short answers cover Claude and OpenAI web search, Free plans, citations, and why this page has no star ratings.",
  applicationCategory: "ReferenceApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["tools-saas", "how-agents-work", "research"],
  categories: ["research", "productivity"],
  takeaways: [
    "Web search is a tool a chat product can call. It is not the same as a dedicated answer engine.",
    "ChatGPT search and Claude web search both say they cite sources. Open a cited page before you rely on it.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality.",
  ],
  picks: [
    {
      title: "Best for search inside ChatGPT",
      body: "OpenAI’s help article says web search is available on Free, Go, Plus, Pro, Business, Enterprise, and Edu, and for people who are not signed in. Searches count toward plan limits.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for cited answers on Claude Free",
      body: "Anthropic’s May 27, 2025 update says web search is available globally on all Claude plans. The help article updated October 7, 2026 says every search response includes citations, and that search counts toward usage limits.",
      href: "/directory/claude",
    },
    {
      title: "Best for an answer engine with citations",
      body: "Perplexity’s listing describes an answer engine that retrieves web sources and cites them. Free is $0; the pricing page lists $17 and $167 a month when billed annually (checked November 7, 2026).",
      href: "/directory/perplexity",
    },
  ],
  rows: [
    {
      id: "chatgpt-search",
      name: "ChatGPT search",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://help.openai.com/en/articles/9237897-chatgpt-search",
      license: "Proprietary product",
      pricing: "Free $0; Go $8/mo; Plus $20/mo; Pro from $100/mo (Codex listing, 6 Nov 2026)",
      platform: "chatgpt.com, desktop, and mobile; also unsigned-in",
      bestFor: "Search on every ChatGPT plan",
      job: "ChatGPT web search with citations, available on Free through Edu and to people who are not signed in.",
      sourceIds: [1, 5],
    },
    {
      id: "claude-search",
      name: "Claude web search",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://support.claude.com/en/articles/10684626-enable-and-use-web-search",
      license: "Proprietary product",
      pricing: "Free $0; Pro $20/mo or $17/mo annual; Max $100/mo; Ultra $200/mo (listing, 3 Nov 2026)",
      platform: "Claude web, desktop, and mobile; all plans globally",
      bestFor: "Cited answers on Claude Free",
      job: "Claude web search with citations on every plan. Search and fetch count toward usage limits.",
      sourceIds: [2, 3, 6],
    },
    {
      id: "gemini-search",
      name: "Gemini / Google AI Mode",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://gemini.google.com",
      license: "Proprietary product",
      pricing: "Gemini app free; Plus $4.99/mo, Pro $19.99/mo, Ultra 5x $99.99/mo, Ultra 20x $199.99/mo (listing, 11 Nov 2026)",
      platform: "Google Search AI Mode and Gemini app",
      bestFor: "Search that stays in Google",
      job: "Gemini and AI Mode in Google Search. Consumer AI plan prices are on this site’s Gemini listing.",
      sourceIds: [7],
    },
    {
      id: "perplexity-search",
      name: "Perplexity",
      vendor: "Perplexity AI",
      listingSlug: "perplexity",
      website: "https://www.perplexity.ai",
      license: "Proprietary product",
      pricing: "Free $0; $17/mo and $167/mo billed annually (listing, 7 Nov 2026)",
      platform: "Perplexity web and apps",
      bestFor: "Cited answer engine",
      job: "Answer engine that retrieves web sources and cites them in responses.",
      sourceIds: [8],
    },
  ],
  sources: [
    { title: "OpenAI Help Center, Searching the web with ChatGPT", url: "https://help.openai.com/en/articles/9237897-chatgpt-search" },
    { title: "Anthropic, Claude web search now available globally on all plans (updated May 27, 2025)", url: "https://claude.com/resources/articles/web-search" },
    { title: "Claude Help Center, Enable and use web search (October 7, 2026)", url: "https://support.claude.com/en/articles/10684626-enable-and-use-web-search" },
    { title: "Anthropic, Plans & pricing (web search on Free through Ultra)", url: "https://claude.com/pricing" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "AI Agents Info, Claude listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/claude" },
    { title: "AI Agents Info, Gemini listing (checked November 11, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
    { title: "AI Agents Info, Perplexity listing (checked November 7, 2026)", url: "https://www.aiagentsinfo.com/directory/perplexity" },
  ],
  faq: [
    {
      question: "Which web search tools work with Claude and OpenAI agents?",
      answer:
        "On this page, Claude web search is the Claude tool: it is on every Claude plan globally, every response includes citations, and search counts toward usage limits. ChatGPT search is the OpenAI tool: web search with citations on Free, Go, Plus, Pro, Business, Enterprise, and Edu, and for people who are not signed in. Gemini and Perplexity are the other two listings. They are not Claude or OpenAI products.",
    },
    {
      question: "Is ChatGPT search free?",
      answer:
        "Yes, on the Free plan, and OpenAI’s help article also says people who are not signed in can use web search. Searches are subject to plan usage limits.",
    },
    {
      question: "Can Claude search the web on the Free plan?",
      answer:
        "Yes. Anthropic’s May 27, 2025 update says web search is available globally on all Claude plans, and the October 7, 2026 help article says search and fetch count toward usage limits.",
    },
    {
      question: "Do these products cite sources?",
      answer:
        "ChatGPT search may include citations you can open. Claude’s help article says every web-search response includes citations. Perplexity is built around cited links. Open the cited page before you rely on it.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  verifiedOn: "2026-11-11",
  methodNote:
    "On November 11, 2026 the Gemini plan dollars were updated from this site’s Gemini listing, last verified that day: Plus $4.99, Pro $19.99, Ultra 5x $99.99, and Ultra 20x $199.99 a month. The ChatGPT, Claude, and Perplexity cells were not re-fetched from those vendors that day. They keep the source dates already in the table and in the source list.",
  related: [
    hubCard(),
    {
      href: "/blog/best-web-search-tool-for-ai-agents",
      title: "What is the best web search tool for an AI agent harness?",
      description: "Gemini grounding is $14 per 1,000 searches and 1,500 a day. Claude and OpenAI list $10. A snippet API is the one a harness can cap. Read November 11, 2026.",
      kicker: "Guide",
      date: "2026-11-11",
    },
    {
      href: "/blog/web-search-api-prices-for-ai-agents-november-2026",
      title: "Claude and OpenAI web search both cost $10 per 1,000. Serper’s entry pack is $1.",
      description: "API prices for Tavily, Exa, Brave, Perplexity, SerpAPI, Serper, Firecrawl, and the native Claude and OpenAI tools. Read November 11, 2026.",
      kicker: "Guide",
      date: "2026-11-11",
    },
    {
      href: "/reports/web-search-tools-for-ai-agents-november-2026",
      title: "Best web search tool for Claude and OpenAI agents, November 2026: prices and limits of 13 APIs checked",
      description: "The November 12 price and limit dataset: 13 APIs, free tiers, rate limits, and official MCP servers. Nothing on that page is estimated.",
      kicker: "Daily brief",
      date: "2026-11-12",
    },
    {
      href: "/blog/web-search-tool-definition-tokens",
      title: "Brave's MCP tool list is 25,495 tokens. Web search alone is 1,400.",
      description: "Measured tool-definition tokens for Tavily, Exa, Brave, Firecrawl, and the OpenAI and Claude web search declarations.",
      kicker: "Guide",
      date: "2026-11-11",
    },
    { href: "/glossary/tool-use", title: "Tool use", description: "How a model calls search as a tool.", kicker: "Glossary" },
    { href: "/best/ai-agents-for-research", title: "Best AI agent for research", description: "Deep research reports and notebooks.", kicker: "Comparison" },
    { href: "/directory/perplexity", title: "Perplexity", description: "Answer engine with citations.", kicker: "Directory" },
    { href: "/best/ai-agent-evaluation-tools", title: "Best AI agent evaluation tools", description: "How to check a search agent’s tool calls.", kicker: "Comparison" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for web search in 2026?",
      paragraphs: [
        "There is no single best AI agent for web search. For Claude and OpenAI agents, the tools on this page are [Claude](/directory/claude) web search and [ChatGPT](/directory/chatgpt) search. ChatGPT search is on Free, Go, Plus, Pro, Business, Enterprise, and Edu, and for people who are not signed in. Claude web search is on every Claude plan globally, with citations, and usage counts toward plan limits. [Gemini](/directory/gemini) and Google AI Mode sit in Search. [Perplexity](/directory/perplexity) is an answer engine that cites retrieved pages.",
        "Search is [tool use](/glossary/tool-use), not a mind. The shelf for this table is [Best AI agents](/best). What the search APIs charge per 1,000 calls, checked November 11, 2026, is [Claude and OpenAI web search both cost $10 per 1,000. Serper’s entry pack is $1.](/blog/web-search-api-prices-for-ai-agents-november-2026). How to wire one of those tools into a harness, including Gemini grounding at $14 per 1,000 and a 1,500-request daily cap, is [What is the best web search tool for an AI agent harness?](/blog/best-web-search-tool-for-ai-agents). The measured tool-definition cost, the tokens a search tool adds before it searches, is [Brave's MCP tool list is 25,495 tokens. Web search alone is 1,400.](/blog/web-search-tool-definition-tokens).",
      ],
    },
    {
      id: "citations",
      heading: "Do AI web-search agents cite their sources?",
      paragraphs: [
        "ChatGPT’s help article says responses that use web search may include citations, and that you should open a cited source to check it. Claude’s October 7, 2026 help article says every web-search response includes citations. Perplexity’s listing describes cited links as the product. Citations are only as good as the retrieved pages.",
      ],
    },
  ],
};

export const travelComparison: ComparisonPage = {
  slug: "ai-agents-for-travel-booking",
  path: "/best/ai-agents-for-travel-booking",
  title: "Best AI agent for travel booking",
  heading: "Best AI agent for travel booking in 2026",
  metaTitle: "Best AI agent for travel booking: 3 (2026)",
  metaDescription:
    "There is no single best AI agent for travel booking. We compared 3 products on who takes the payment and list price (Nov 2026). No invented scores.",
  description:
    "There is no single best AI agent for travel booking. Google AI Mode can track flights in 180-plus countries and, in U.S. English, book eligible hotels with Google Pay while the hotel or booking platform remains merchant of record. Expedia in ChatGPT shows live flights and hotels in chat; you click Book on Expedia to finish. KAYAK Ask AI updates live flight, hotel, and car results beside the chat and points at bookable partner options. A fourth dedicated travel agent with a sourced checkout path was not found, so this table stops at three.",
  summary:
    "Sourced comparison of travel-booking agents on who takes payment and list price. Last verified November 2026.",
  question: "Which AI agent is best for travel booking in 2026?",
  tableHeading: "How do travel-booking agents compare on checkout and price?",
  tableLead:
    "The table lists 3 travel products with a Best for label, who completes the booking, list price, and platform from official pages, last verified November 2026.",
  tableCaption: "Best AI agent for travel booking comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each travel job?",
  bestForLead:
    "Google AI Mode fits U.S. hotel checkout with Google Pay; Expedia in ChatGPT fits finishing on Expedia; KAYAK Ask AI fits live results beside a chat.",
  methodHeading: "How was this travel-booking comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a newsroom post, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI travel booking?",
  faqLead: "These short answers cover who is the merchant, flights versus hotels, and why this table has three rows.",
  applicationCategory: "TravelApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["tools-saas", "shopping", "task-performance"],
  categories: ["productivity", "ecommerce"],
  takeaways: [
    "Hotel checkout in Google AI Mode still names the hotel or booking platform as merchant of record.",
    "Expedia in ChatGPT shows live prices in chat and sends you to Expedia to finish the booking.",
    "This table has three sourced rows. A fourth dedicated travel agent with a verifiable checkout path was not found.",
  ],
  picks: [
    {
      title: "Best for hotel checkout in Search",
      body: "Google’s August 27, 2026 post says U.S. English users can select Continue on Google, pick a room, and pay with Google Pay. Partners named there include Booking.com, Expedia, Hilton, Marriott, IHG, Choice, Wyndham, Hotels.com, Priceline, and Trip.com.",
    },
    {
      title: "Best for finishing on Expedia",
      body: "Expedia’s product page says you browse live flights and lodging in ChatGPT, then click Book on Expedia. The October 6, 2025 newsroom post says the app is for logged-in ChatGPT users outside the EU on Free, Go, Plus, and Pro.",
    },
    {
      title: "Best for live results beside a chat",
      body: "KAYAK’s May 14, 2026 Ask AI post says flight, hotel, and rental-car results update live beside the conversation, with bookable options from hundreds of travel partners. That page does not list a separate Ask AI subscription price.",
    },
  ],
  rows: [
    {
      id: "google-ai-mode-travel",
      name: "Google AI Mode travel",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://blog.google/products-and-platforms/products/search/book-travel-ai-mode/",
      license: "Proprietary product",
      pricing: "AI Mode in Search; Gemini app free; Google AI Plus $4.99/mo (listing, 3 Nov 2026)",
      platform: "Google Search AI Mode; hotel booking U.S. English; flight tracking 180+ countries",
      bestFor: "U.S. hotel checkout with Google Pay",
      job: "AI Mode travel: flight price tracking, points and miles rates, and hotel booking with Google Pay while the hotel or platform remains merchant of record.",
      sourceIds: [1, 4],
    },
    {
      id: "expedia-chatgpt",
      name: "Expedia in ChatGPT",
      vendor: "Expedia Group",
      website: "https://www.expedia.com/product/expedia-in-chatgpt/",
      license: "Proprietary product",
      pricing: "Needs a ChatGPT account; booking finishes on Expedia. ChatGPT Free $0 (Codex listing, 6 Nov 2026)",
      platform: "ChatGPT app (logged-in, outside the EU, Free/Go/Plus/Pro per Expedia newsroom)",
      bestFor: "Live Expedia inventory, book on Expedia",
      job: "Expedia app in ChatGPT shows live flights and hotels. Book on Expedia completes the reservation on Expedia.",
      sourceIds: [2, 3, 5],
    },
    {
      id: "kayak-ask-ai",
      name: "KAYAK Ask AI",
      vendor: "KAYAK",
      website: "https://www.kayak.com/news/ask-ai/",
      license: "Proprietary product",
      pricing: "No separate Ask AI price on KAYAK’s May 14, 2026 news page",
      platform: "KAYAK; live flight, hotel, and car results beside chat",
      bestFor: "Chat plus a live results page",
      job: "Conversational travel search with live flight, hotel, and rental-car results and bookable partner options.",
      sourceIds: [6],
    },
  ],
  sources: [
    { title: "Google, How to book travel with AI Mode in Google Search (August 27, 2026)", url: "https://blog.google/products-and-platforms/products/search/book-travel-ai-mode/" },
    { title: "Expedia, Expedia in ChatGPT", url: "https://www.expedia.com/product/expedia-in-chatgpt/" },
    { title: "Expedia newsroom, Smart trip planning: new Expedia app in ChatGPT (October 6, 2025)", url: "https://www.expedia.com/newsroom/smart-trip-planning-new-expedia-app-in-chatgpt-to-plan-your-trip/" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "KAYAK, KAYAK launches Ask AI to simplify travel planning (May 14, 2026)", url: "https://www.kayak.com/news/ask-ai/" },
  ],
  faq: [
    {
      question: "Can Google AI Mode book a hotel?",
      answer:
        "Google’s August 27, 2026 post says hotel booking in AI Mode started rolling out in the U.S. in English. You select Continue on Google, pick a room, review cancellation terms, and pay with Google Pay. The hotel or booking platform is the merchant of record.",
    },
    {
      question: "Does Expedia in ChatGPT complete the booking in chat?",
      answer:
        "No. Expedia’s product page says you click Book on Expedia and finish the reservation on Expedia. The newsroom post limits the ChatGPT app to logged-in users outside the EU on Free, Go, Plus, and Pro.",
    },
    {
      question: "Why are there only three rows?",
      answer:
        "This table only includes products with an official page that names a booking path. A fourth dedicated travel agent with that documentation was not found, so the table was not padded.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/best/ai-agents-for-shopping", title: "Best AI agent for shopping", description: "Who is the seller when an assistant pays.", kicker: "Comparison" },
    { href: "/glossary/agentic-checkout", title: "Agentic checkout", description: "The payment step, separate from a catalog feed.", kicker: "Glossary" },
    { href: "/directory/chatgpt", title: "ChatGPT", description: "Host for the Expedia app.", kicker: "Directory" },
    { href: "/best/ai-agents-for-personal-assistant-tasks", title: "Best AI agent for personal assistant tasks", description: "Scheduled tasks and workplace agents.", kicker: "Comparison" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for travel booking in 2026?",
      paragraphs: [
        "There is no single best AI agent for travel booking. Google AI Mode can track flights in 180-plus countries and, in U.S. English, book eligible hotels with Google Pay while the hotel or booking platform remains merchant of record. Expedia in [ChatGPT](/directory/chatgpt) shows live flights and hotels in chat; you click Book on Expedia to finish. KAYAK Ask AI updates live flight, hotel, and car results beside the chat. A fourth dedicated travel agent with a sourced checkout path was not found, so this table stops at three.",
        "The shelf for this table is [Best AI agents](/best). Shopping checkout, which is a different job, is [Best AI agent for shopping](/best/ai-agents-for-shopping).",
      ],
    },
    {
      id: "merchant",
      heading: "Who takes the payment when an AI books travel?",
      paragraphs: [
        "Google’s August 27, 2026 post says the hotel or booking platform is the merchant of record and handles customer service. Expedia’s product page sends you to Expedia to finish. KAYAK’s Ask AI post points at bookable options from travel partners. None of those pages say the chat product is the seller.",
      ],
    },
  ],
};

export const emailComparison: ComparisonPage = {
  slug: "ai-agents-for-email",
  path: "/best/ai-agents-for-email",
  title: "Best AI agent for email",
  heading: "Best AI agent for email in 2026",
  metaTitle: "Best AI agent for email: 3 compared (2026)",
  metaDescription:
    "There is no single best AI agent for email. We compared 3 inbox products on where they run and list price from official pages (Nov 2026).",
  description:
    "There is no single best AI agent for email. Gemini in Gmail can draft with Help me write — on personal Gmail in the U.S., and globally on eligible Workspace or Google AI plans. Copilot in Outlook comes with Microsoft 365 Personal at $9.99 a month. Superhuman Email Assistant works inside Gmail or Outlook at $12 a month billed annually, or $15 billed monthly, and does not send without permission.",
  summary:
    "Sourced comparison of email agents on inbox, plans, and list price. Last verified November 2026.",
  question: "Which AI agent is best for email in 2026?",
  tableHeading: "How do email agents compare on inbox and price?",
  tableLead:
    "The table lists 3 email products with a Best for label, licence, list price, and which inbox they run in, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for email comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each inbox job?",
  bestForLead:
    "Gemini in Gmail fits Help me write on a Google account; Copilot fits Outlook on Microsoft 365 Personal; Superhuman Email Assistant fits background labelling in Gmail or Outlook.",
  methodHeading: "How was this email-agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI email agents?",
  faqLead: "These short answers cover Gmail Free, Outlook, sending without permission, and ratings.",
  applicationCategory: "CommunicationApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["task-performance", "tools-saas"],
  categories: ["productivity"],
  takeaways: [
    "Help me write on personal Gmail is U.S.-only on Google’s help page. Workspace and Google AI plans are listed as global for that feature.",
    "Superhuman’s Email Assistant page says it never deletes mail and does not send without permission.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality.",
  ],
  picks: [
    {
      title: "Best for Gmail drafts",
      body: "Google’s Help me write article says personal Gmail is U.S.-only; eligible Workspace or Google AI plans are global. Proofread and AI Inbox need a Google AI plan or eligible Workspace edition.",
      href: "/directory/gemini",
    },
    {
      title: "Best for Outlook on a personal Microsoft 365 plan",
      body: "Microsoft’s Copilot individual pricing page lists Microsoft 365 Personal at $9.99 a month, including Outlook desktop with Copilot.",
    },
    {
      title: "Best for background work in Gmail or Outlook",
      body: "Superhuman Email Assistant is $12 a month billed annually or $15 billed monthly. It labels, drafts, archives noise, and reminds you to follow up inside the inbox you already have.",
    },
  ],
  rows: [
    {
      id: "gmail-gemini",
      name: "Gemini in Gmail",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/mail/answer/16831098?hl=en",
      license: "Proprietary product",
      pricing: "Help me write on U.S. personal Gmail; Google AI Plus $4.99/mo for Proofread and AI Inbox (listing, 3 Nov 2026)",
      platform: "Gmail web, iOS, and Android",
      bestFor: "Help me write in Gmail",
      job: "Gemini features in Gmail including Help me write, Proofread, and AI Inbox, with plan and country limits on Google’s help page.",
      sourceIds: [1, 2, 6],
    },
    {
      id: "outlook-copilot",
      name: "Copilot in Outlook",
      vendor: "Microsoft",
      website: "https://www.microsoft.com/en-us/copilot/pricing/individuals",
      license: "Proprietary product",
      pricing: "Microsoft 365 Personal $9.99/mo includes Copilot in Outlook (Microsoft Copilot pricing, 8 Nov 2026)",
      platform: "Outlook desktop, web, and mobile on eligible Microsoft 365 plans",
      bestFor: "Outlook on Microsoft 365 Personal",
      job: "Copilot in Outlook for drafting, summarizing, and writing assistance on Microsoft 365 Personal, Family, Premium, and Pro.",
      sourceIds: [3, 4],
    },
    {
      id: "superhuman-email-assistant",
      name: "Superhuman Email Assistant",
      vendor: "Superhuman",
      website: "https://superhuman.com/agents/email-assistant",
      license: "Proprietary product",
      pricing: "$12/mo billed annually, or $15/mo billed monthly (product page, 8 Nov 2026)",
      platform: "Existing Gmail or Outlook inbox; no new email app required",
      bestFor: "Background labelling in Gmail or Outlook",
      job: "Email Assistant that labels, drafts in your voice, archives noise, and reminds you to follow up inside Gmail or Outlook.",
      sourceIds: [5],
    },
  ],
  sources: [
    { title: "Gmail Help, Learn about Gemini features in Gmail", url: "https://support.google.com/mail/answer/16831098?hl=en" },
    { title: "Gmail Help, Draft emails with Gemini in Gmail", url: "https://support.google.com/mail/answer/13955415?hl=en" },
    { title: "Microsoft, Copilot pricing plans for individuals", url: "https://www.microsoft.com/en-us/copilot/pricing/individuals" },
    { title: "Microsoft Support, Copilot in Microsoft 365 Personal, Family, Premium, and Pro", url: "https://support.microsoft.com/en-us/microsoft-365-copilot/copilot-in-microsoft-365-personal-family-and-premium" },
    { title: "Superhuman, AI email assistant for Gmail and Outlook", url: "https://superhuman.com/agents/email-assistant" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
  ],
  faq: [
    {
      question: "Is Gemini in Gmail free?",
      answer:
        "Help me write is available on personal Gmail in the U.S. in supported languages. Proofread and AI Inbox need a Google AI Plus, Pro, or Ultra plan, or an eligible Workspace plan. AI Inbox is U.S. English only on that help page.",
    },
    {
      question: "Does Superhuman Email Assistant send mail on its own?",
      answer:
        "Superhuman’s product page says it does not send email without your permission, and that it never deletes anything.",
    },
    {
      question: "Do I need to leave Gmail or Outlook?",
      answer:
        "No. Gemini runs in Gmail. Copilot runs in Outlook on eligible Microsoft 365 plans. Superhuman Email Assistant connects to the Gmail or Outlook account you already use.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/best/ai-agents-for-writing", title: "Best AI agent for writing", description: "Drafts in chat, Docs, and Word.", kicker: "Comparison" },
    { href: "/best/ai-agents-for-scheduling", title: "Best AI agent for scheduling", description: "Help me schedule and calendar agents.", kicker: "Comparison" },
    { href: "/directory/gemini", title: "Gemini", description: "Gemini in Gmail and Google AI plans.", kicker: "Directory" },
    { href: "/glossary/tool-use", title: "Tool use", description: "How an inbox assistant calls tools.", kicker: "Glossary" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for email in 2026?",
      paragraphs: [
        "There is no single best AI agent for email. Gemini in Gmail can draft with Help me write — on personal Gmail in the U.S., and globally on eligible Workspace or Google AI plans. Copilot in Outlook comes with Microsoft 365 Personal at $9.99 a month. Superhuman Email Assistant works inside Gmail or Outlook at $12 a month billed annually, or $15 billed monthly, and does not send without permission.",
        "The shelf for this table is [Best AI agents](/best). Drafting outside an inbox is [Best AI agent for writing](/best/ai-agents-for-writing).",
      ],
    },
    {
      id: "send-without-asking",
      heading: "Will an AI email agent send a message without asking?",
      paragraphs: [
        "Superhuman’s Email Assistant page says it does not send without permission and never deletes mail. Gemini’s Help me write flow creates or refines a draft you still send. Microsoft’s Copilot-in-Outlook support page describes drafting, summarizing, and rewriting — not unattended send. Treat an unattended send as a wider grant than any of those pages describe.",
      ],
    },
  ],
};

export const personalAssistantComparison: ComparisonPage = {
  slug: "ai-agents-for-personal-assistant-tasks",
  path: "/best/ai-agents-for-personal-assistant-tasks",
  title: "Best AI agent for personal assistant tasks",
  heading: "Best AI agent for personal assistant tasks in 2026",
  metaTitle: "Best AI agent for personal assistant tasks (2026)",
  metaDescription:
    "There is no single best AI agent for personal assistant tasks. We compared 4 products on scheduled work and list price (Nov 2026). No invented scores.",
  description:
    "There is no single best AI agent for personal assistant tasks. ChatGPT can run scheduled tasks (the help center lists Free through Edu; the pricing table marks Scheduled tasks as No on Free and Yes on Go and Plus). Claude Cowork is Anthropic’s workplace agent on Pro, Max, Ultra, and Team, with Enterprise opt-in. Gemini can create calendar events and, on Google AI Plus, includes Daily Brief. Microsoft 365 Personal at $9.99 a month includes Copilot in Outlook, Word, Excel, and PowerPoint.",
  summary:
    "Sourced comparison of personal-assistant agents on scheduled work and list price. Last verified November 2026.",
  question: "Which AI agent is best for personal assistant tasks in 2026?",
  tableHeading: "How do personal-assistant agents compare on schedule and price?",
  tableLead:
    "The table lists 4 assistant products with a Best for label, licence, list price, and where scheduled work runs, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for personal assistant tasks comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each assistant job?",
  bestForLead:
    "ChatGPT fits scheduled tasks and Work; Claude Cowork fits a workplace agent on Pro and up; Gemini fits Calendar and Daily Brief; Copilot fits Microsoft 365 apps.",
  methodHeading: "How was this personal-assistant comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI personal assistants?",
  faqLead: "These short answers cover Free plans, Cowork, Daily Brief, and ratings.",
  applicationCategory: "LifestyleApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["task-performance", "tools-saas", "how-agents-work"],
  categories: ["productivity", "ai-agents"],
  takeaways: [
    "Scheduled work is not the same as a chat reply. ChatGPT’s help center and pricing table disagree on Free; this page cites both.",
    "Claude Cowork and ChatGPT Work are workplace products. They are not legal employees.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality.",
  ],
  picks: [
    {
      title: "Best for scheduled ChatGPT tasks",
      body: "OpenAI’s scheduled-tasks article lists Free, Go, Plus, Pro, Business, Enterprise, and Edu, with 3 active tasks on Free and Go. The ChatGPT pricing comparison table lists Scheduled tasks as No on Free and Yes on Go and Plus. Event-triggered Gmail, Slack, or GitHub tasks need Plus or above.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for a workplace agent on Claude",
      body: "Anthropic’s workplace product is Claude Cowork. This site’s November 7, 2026 workplace guide, citing the Cowork product page, says tasks assigned from a phone keep running in the cloud on Pro, Max, Ultra, and Team, with Enterprise opt-in.",
      href: "/directory/claude",
    },
    {
      title: "Best for Google Calendar from chat",
      body: "Gemini Apps can create, find, and edit Google Calendar events when Workspace is connected and Keep Activity is on. Google AI Plus includes Daily Brief on Google’s subscriptions page.",
      href: "/directory/gemini",
    },
  ],
  rows: [
    {
      id: "chatgpt-assistant",
      name: "ChatGPT",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt",
      license: "Proprietary product",
      pricing: "Free $0; Go $8/mo; Plus $20/mo; Pro from $100/mo (Codex listing, 6 Nov 2026)",
      platform: "ChatGPT web, desktop, and mobile; Scheduled hub; ChatGPT Work",
      bestFor: "Scheduled tasks and ChatGPT Work",
      job: "Consumer ChatGPT with scheduled tasks, ChatGPT Work, and Dot on Pro. Help center and pricing table disagree on Free scheduled tasks; both are cited.",
      sourceIds: [1, 2, 6],
    },
    {
      id: "claude-cowork",
      name: "Claude Cowork",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://claude.com/product/cowork",
      license: "Proprietary product",
      pricing: "Pro $20/mo or $17/mo annual; Max $100/mo; Ultra $200/mo (listing, 3 Nov 2026)",
      platform: "Claude Cowork; Pro, Max, Ultra, Team; Enterprise can opt in",
      bestFor: "Workplace agent on Claude Pro and up",
      job: "Anthropic’s workplace agent. Phone-assigned tasks can keep running in the cloud after the laptop closes, on the plans named in this site’s November 7, 2026 guide.",
      sourceIds: [3, 7],
    },
    {
      id: "gemini-assistant",
      name: "Gemini",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/gemini/answer/15305236?hl=en",
      license: "Proprietary product",
      pricing: "Gemini app free; Google AI Plus $4.99/mo includes Daily Brief (subscriptions page, 8 Nov 2026)",
      platform: "Gemini app with Google Calendar, Tasks, and Keep when Workspace is connected",
      bestFor: "Calendar events and Daily Brief",
      job: "Gemini Apps can create and edit Calendar events. Google AI Plus adds Daily Brief and higher usage on Google’s subscriptions page.",
      sourceIds: [4, 5, 8],
    },
    {
      id: "copilot-personal",
      name: "Microsoft Copilot",
      vendor: "Microsoft",
      website: "https://www.microsoft.com/en-us/copilot/pricing/individuals",
      license: "Proprietary product",
      pricing: "Limited free Copilot; Microsoft 365 Personal $9.99/mo includes Copilot in Outlook, Word, Excel, PowerPoint",
      platform: "Copilot app plus Microsoft 365 desktop apps on Personal and up",
      bestFor: "Copilot inside Microsoft 365 apps",
      job: "Microsoft Copilot with a limited free tier and Copilot in Microsoft 365 Personal apps at $9.99 a month.",
      sourceIds: [9],
    },
  ],
  sources: [
    { title: "OpenAI Help Center, Scheduled tasks in ChatGPT", url: "https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt" },
    { title: "ChatGPT, Plans and pricing", url: "https://chatgpt.com/pricing/" },
    { title: "Anthropic, Claude Cowork", url: "https://claude.com/product/cowork" },
    { title: "Gemini Apps Help, Create and manage your calendar events with Gemini Apps", url: "https://support.google.com/gemini/answer/15305236?hl=en" },
    { title: "Google, Gemini subscriptions (Daily Brief on Google AI Plus)", url: "https://gemini.google/subscriptions/" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "AI Agents Info, What is an AI employee? (Cowork plans, November 7, 2026)", url: "https://www.aiagentsinfo.com/blog/what-is-an-ai-employee" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
    { title: "Microsoft, Copilot pricing plans for individuals", url: "https://www.microsoft.com/en-us/copilot/pricing/individuals" },
  ],
  faq: [
    {
      question: "Can ChatGPT run a task while I am away?",
      answer:
        "OpenAI’s scheduled-tasks article says ChatGPT can run one-time or recurring tasks, and that Free and Go accounts can keep 3 active tasks. The ChatGPT pricing comparison table lists Scheduled tasks as No on Free and Yes on Go and Plus. Event-triggered tasks for Gmail, Slack, or GitHub need Plus, Pro, Business, Enterprise, or Edu.",
    },
    {
      question: "Is Claude Cowork on the Free plan?",
      answer:
        "This site’s November 7, 2026 workplace guide, citing the Cowork product page, places Cowork on Pro, Max, Ultra, and Team, with Enterprise opt-in. It does not list Free.",
    },
    {
      question: "Is an AI personal assistant a digital worker?",
      answer:
        "On this site a digital worker is workplace software given a recurring job. ChatGPT Work and Claude Cowork match that label. A chat reply is still chat.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/glossary/digital-worker", title: "Digital worker", description: "Workplace software given a recurring job.", kicker: "Glossary" },
    { href: "/blog/what-is-an-ai-employee", title: "What is an AI employee?", description: "Cowork, ChatGPT Work, and who is accountable.", kicker: "Guide", date: "2026-11-08" },
    { href: "/best/ai-agents-for-scheduling", title: "Best AI agent for scheduling", description: "Calendar blocking and Help me schedule.", kicker: "Comparison" },
    { href: "/best/ai-agents-for-small-business", title: "Best AI agent for small business", description: "Business seats and website assistants.", kicker: "Comparison" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for personal assistant tasks in 2026?",
      paragraphs: [
        "There is no single best AI agent for personal assistant tasks. [ChatGPT](/directory/chatgpt) can run scheduled tasks — the help center lists Free through Edu; the pricing table marks Scheduled tasks as No on Free and Yes on Go and Plus. [Claude](/directory/claude) Cowork is Anthropic’s workplace agent on Pro, Max, Ultra, and Team. [Gemini](/directory/gemini) can create calendar events and, on Google AI Plus, includes Daily Brief. Microsoft 365 Personal at $9.99 a month includes Copilot in Outlook, Word, Excel, and PowerPoint.",
        "A workplace agent is a [digital worker](/glossary/digital-worker), not a legal employee. The longer guide is [What is an AI employee?](/blog/what-is-an-ai-employee). The shelf is [Best AI agents](/best).",
      ],
    },
    {
      id: "always-on",
      heading: "Can an AI personal assistant keep working after you close the chat?",
      paragraphs: [
        "On the pages checked November 7–8, 2026, yes, inside named products. ChatGPT scheduled tasks run in the background. Claude Cowork can keep a phone-assigned task running in the cloud after the laptop closes, on Pro, Max, Ultra, and Team. Gemini Daily Brief is listed on Google AI Plus. None of those pages make the software a staff member.",
      ],
    },
  ],
};

export const researchComparison: ComparisonPage = {
  slug: "ai-agents-for-research",
  path: "/best/ai-agents-for-research",
  title: "Best AI agent for research",
  heading: "Best AI agent for research in 2026",
  metaTitle: "Best AI agent for research: 4 in 2026",
  metaDescription:
    "There is no single best AI agent for research. We compared 4 products on reports, notebooks, and list price. Licence and platform only (Nov 2026).",
  description:
    "There is no single best AI agent for research. ChatGPT Deep Research writes a cited report; OpenAI does not publish a per-plan task count. Gemini Deep Research is in the Gemini app for people 18 and over, with higher limits on Pro and Ultra. Gemini Notebook (formerly NotebookLM) has a free Standard tier at 100 notebooks and 50 sources. Perplexity cites retrieved pages, and Teammates are a Max-only research preview on the web.",
  summary:
    "Sourced comparison of research agents on reports, notebooks, and list price. Last verified November 2026.",
  question: "Which AI agent is best for research in 2026?",
  tableHeading: "How do research agents compare on reports and price?",
  tableLead:
    "The table lists 4 research products with a Best for label, licence, list price, and whether you get a report or a notebook, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for research comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each research job?",
  bestForLead:
    "ChatGPT Deep Research fits a cited report in ChatGPT; Gemini Deep Research fits a Gemini report; Gemini Notebook fits a source-capped notebook; Perplexity fits cited answers and Max Teammates.",
  methodHeading: "How was this research-agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI research agents?",
  faqLead: "These short answers cover Free limits, NotebookLM, Teammates, and ratings.",
  applicationCategory: "ReferenceApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["research", "tools-saas", "how-agents-work"],
  categories: ["research", "productivity"],
  takeaways: [
    "A deep-research report is not the same as a notebook of sources. Gemini ships both, under different names.",
    "OpenAI does not publish Deep Research task counts; the in-product counter is the figure it tells you to use.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality.",
  ],
  picks: [
    {
      title: "Best for a cited ChatGPT report",
      body: "OpenAI’s Deep Research help article says you describe the outcome, review a plan, and get a structured report with citations. The pricing page labels Deep Research Limited on Free and Go, and included on Plus and Pro, without a published task count.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for a free notebook of sources",
      body: "Google’s Gemini Notebook plans page lists Standard at 100 notebooks and 50 sources per notebook, free with a Gmail account. Plus, Pro, and Ultra raise those caps through Google AI plans.",
      href: "/directory/gemini",
    },
    {
      title: "Best for ongoing Perplexity work",
      body: "Perplexity Teammates are a research preview for individual Max subscribers on the web. Enterprise Pro and Enterprise Max are not included by default.",
      href: "/directory/perplexity",
    },
  ],
  rows: [
    {
      id: "chatgpt-deep-research",
      name: "ChatGPT Deep Research",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt",
      license: "Proprietary product",
      pricing: "Limited on Free and Go; expanded on Plus $20/mo; maximum on Pro from $100/mo. No published task count.",
      platform: "ChatGPT; download reports as Markdown, Word, or PDF",
      bestFor: "A cited report in ChatGPT",
      job: "Deep Research plans, searches, and writes a cited report. Usage is shown in-product; OpenAI does not publish a per-plan task count.",
      sourceIds: [1, 2, 6],
    },
    {
      id: "gemini-deep-research",
      name: "Gemini Deep Research",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/gemini/answer/15719111?hl=en",
      license: "Proprietary product",
      pricing: "In the Gemini app (18+); higher daily limits on Google AI Pro and Ultra. Plus is $4.99/mo (listing, 3 Nov 2026)",
      platform: "Gemini app; optional Gmail, Drive, uploads, and Notebook sources",
      bestFor: "A Gemini research report",
      job: "Deep Research in Gemini Apps for people 18 and over, with daily and concurrent limits. Pro and Ultra get higher report limits.",
      sourceIds: [3, 7],
    },
    {
      id: "gemini-notebook",
      name: "Gemini Notebook",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/gemininotebook/answer/16213268?hl=en",
      license: "Proprietary product",
      pricing: "Standard free: 100 notebooks, 50 sources. Plus/Pro/Ultra via Google AI plans",
      platform: "Gemini Notebook (formerly NotebookLM) in the browser",
      bestFor: "A notebook capped by sources",
      job: "Source-grounded notebooks. Standard is free at 100 notebooks and 50 sources. Paid Google AI plans raise both caps.",
      sourceIds: [4],
    },
    {
      id: "perplexity-research",
      name: "Perplexity",
      vendor: "Perplexity AI",
      listingSlug: "perplexity",
      website: "https://www.perplexity.ai",
      license: "Proprietary product",
      pricing: "Free $0; $17/mo and $167/mo billed annually. Teammates: individual Max, web preview (listing, 7 Nov 2026)",
      platform: "Perplexity web; Teammates research preview on web",
      bestFor: "Cited answers and Max Teammates",
      job: "Cited answer engine, plus Teammates that own ongoing work for individual Max subscribers on the web.",
      sourceIds: [5],
    },
  ],
  sources: [
    { title: "OpenAI Help Center, Deep research in ChatGPT", url: "https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt" },
    { title: "ChatGPT, Plans and pricing", url: "https://chatgpt.com/pricing/" },
    { title: "Gemini Apps Help, Use Deep Research in Gemini Apps", url: "https://support.google.com/gemini/answer/15719111?hl=en" },
    { title: "Gemini Notebook Help, Learn about Gemini Notebook’s plans", url: "https://support.google.com/gemininotebook/answer/16213268?hl=en" },
    { title: "AI Agents Info, Perplexity listing (Teammates, checked November 7, 2026)", url: "https://www.aiagentsinfo.com/directory/perplexity" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
  ],
  faq: [
    {
      question: "How many ChatGPT Deep Research tasks do I get?",
      answer:
        "OpenAI does not publish a number. The help article says your in-product counter shows remaining tasks, and that a fixed monthly allowance resets every 30 days from first use. The pricing page labels Deep Research Limited on Free and Go.",
    },
    {
      question: "Is NotebookLM still a separate product?",
      answer:
        "Google’s plans page now calls it Gemini Notebook. Standard is free at 100 notebooks and 50 sources. Plus, Pro, and Ultra are Google AI plans, not a standalone NotebookLM subscription.",
    },
    {
      question: "Who can use Perplexity Teammates?",
      answer:
        "Perplexity’s help article, read November 7, 2026, says the research preview requires an individual Max subscription and is on the web. Enterprise Pro and Enterprise Max are not included by default.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/glossary/rag", title: "RAG", description: "Fetching sources into the context window.", kicker: "Glossary" },
    { href: "/best/ai-agents-for-web-search", title: "Best AI agent for web search", description: "Cited search without a long report.", kicker: "Comparison" },
    { href: "/directory/perplexity", title: "Perplexity", description: "Answer engine and Teammates preview.", kicker: "Directory" },
    { href: "/research", title: "Research", description: "Paper breakdowns on this site.", kicker: "Desk" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for research in 2026?",
      paragraphs: [
        "There is no single best AI agent for research. [ChatGPT](/directory/chatgpt) Deep Research writes a cited report; OpenAI does not publish a per-plan task count. [Gemini](/directory/gemini) Deep Research is in the Gemini app for people 18 and over. Gemini Notebook (formerly NotebookLM) has a free Standard tier at 100 notebooks and 50 sources. [Perplexity](/directory/perplexity) cites retrieved pages, and Teammates are a Max-only research preview on the web.",
        "Fetching sources into the prompt is [RAG](/glossary/rag). The shelf is [Best AI agents](/best).",
      ],
    },
    {
      id: "report-vs-notebook",
      heading: "What is the difference between a deep-research report and a notebook?",
      paragraphs: [
        "A Deep Research run in ChatGPT or Gemini starts from a question, proposes a plan, and returns a cited report. A Gemini Notebook holds a capped set of sources you chose, then you chat over that set. They are different jobs. This table lists both because Google ships both.",
      ],
    },
  ],
};

export const schedulingComparison: ComparisonPage = {
  slug: "ai-agents-for-scheduling",
  path: "/best/ai-agents-for-scheduling",
  title: "Best AI agent for scheduling",
  heading: "Best AI agent for scheduling in 2026",
  metaTitle: "Best AI agent for scheduling: 3 compared (2026)",
  metaDescription:
    "There is no single best AI agent for scheduling. We compared 3 calendar products on who writes the event and list price (Nov 2026). No invented scores.",
  description:
    "There is no single best AI agent for scheduling. Gemini Help me schedule proposes times in Gmail on eligible Workspace and Google AI Pro or Ultra plans. Gemini Apps can create and edit Google Calendar events when Workspace is connected. Reclaim.ai Lite is free for one user with 5 AI Agents; Starter is $10 a seat a month billed annually or $12 monthly. ChatGPT scheduled tasks run a prompt on a cadence; they do not replace a calendar manager.",
  summary:
    "Sourced comparison of scheduling agents on who writes the event and list price. Last verified November 2026.",
  question: "Which AI agent is best for scheduling and calendar in 2026?",
  tableHeading: "How do scheduling agents compare on calendar access and price?",
  tableLead:
    "The table lists 3 scheduling products with a Best for label, licence, list price, and which calendar they write, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for scheduling comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each calendar job?",
  bestForLead:
    "Gemini Help me schedule fits proposing times in Gmail; Gemini Apps fit creating Calendar events from chat; Reclaim fits automatic time blocking with a free Lite plan.",
  methodHeading: "How was this scheduling comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI scheduling agents?",
  faqLead: "These short answers cover Gmail, Reclaim Lite, ChatGPT tasks, and ratings.",
  applicationCategory: "BusinessApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["task-performance", "tools-saas"],
  categories: ["productivity", "automation"],
  takeaways: [
    "Help me schedule in Gmail needs an eligible Workspace plan or Google AI Pro or Ultra — not the free Gemini app alone.",
    "Reclaim Lite is free forever for one user with 5 AI Agents, a one-week scheduling range, and one calendar sync.",
    "This table has three sourced calendar products. ChatGPT scheduled tasks are a related job, not a fourth calendar vendor.",
  ],
  picks: [
    {
      title: "Best for proposing times in Gmail",
      body: "Google’s Help me schedule help page says Gemini in Gmail generates times from guest availability. Personal accounts need Google AI Pro or Ultra. Workspace needs Business Standard or Plus, or named Enterprise editions.",
      href: "/directory/gemini",
    },
    {
      title: "Best for creating events from Gemini chat",
      body: "Gemini Apps can create, find, and edit Google Calendar events when you are signed in, Keep Activity is on, and Google Workspace is connected.",
      href: "/directory/gemini",
    },
    {
      title: "Best for automatic time blocking",
      body: "Reclaim’s pricing page lists Lite as free forever for one user with 5 AI Agents. Starter is $10 a seat a month billed annually, or $12 monthly, for up to 10 seats.",
    },
  ],
  rows: [
    {
      id: "gemini-help-me-schedule",
      name: "Gemini Help me schedule",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/calendar/answer/16865189?hl=en",
      license: "Proprietary product",
      pricing: "Google AI Pro $19.99/mo or Ultra; or eligible Workspace editions (listing, 3 Nov 2026)",
      platform: "Gmail (insert times) and Google Calendar suggested times",
      bestFor: "Propose meeting times in Gmail",
      job: "Gemini in Gmail proposes available times and can insert them in a message. Personal accounts need Google AI Pro or Ultra.",
      sourceIds: [1, 2, 5],
    },
    {
      id: "gemini-calendar-apps",
      name: "Gemini Apps + Calendar",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/gemini/answer/15305236?hl=en",
      license: "Proprietary product",
      pricing: "Gemini app free; Keep Activity must be on; Workspace connection required for Google Calendar",
      platform: "Gemini app connected to Google Calendar",
      bestFor: "Create Calendar events from chat",
      job: "Gemini Apps create, find, and edit Google Calendar events, including secondary and shared calendars you can edit.",
      sourceIds: [3, 5],
    },
    {
      id: "reclaim",
      name: "Reclaim.ai",
      vendor: "Reclaim.ai",
      website: "https://reclaim.ai/pricing",
      license: "Proprietary product",
      pricing: "Lite free (1 user, 5 AI Agents). Starter $10/seat/mo annual or $12 monthly (pricing page, 8 Nov 2026)",
      platform: "Google Calendar or Microsoft 365 calendar via Reclaim",
      bestFor: "Automatic time blocking",
      job: "Calendar assistant with Focus Time, Habits, buffers, and Smart Meetings. Lite is free forever for one user.",
      sourceIds: [4],
    },
  ],
  sources: [
    { title: "Google Calendar Help, Suggest times to meet with Gemini in Gmail", url: "https://support.google.com/calendar/answer/16865189?hl=en" },
    { title: "Google Calendar Help, Learn how to schedule events in Gmail", url: "https://support.google.com/calendar/answer/16865706?hl=en" },
    { title: "Gemini Apps Help, Create and manage your calendar events with Gemini Apps", url: "https://support.google.com/gemini/answer/15305236?hl=en" },
    { title: "Reclaim.ai, Pricing", url: "https://reclaim.ai/pricing" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
  ],
  faq: [
    {
      question: "Is Help me schedule on free Gmail?",
      answer:
        "Google’s feature table lists Help me schedule for eligible Workspace editions and for Google AI Pro and Ultra, not for a personal Gmail account without a Google AI Pro or Ultra plan.",
    },
    {
      question: "Is Reclaim.ai free?",
      answer:
        "Lite is free forever for one user, with 5 AI Agents, a one-week scheduling range, one calendar sync, and one scheduling link, on Reclaim’s pricing page read November 8, 2026.",
    },
    {
      question: "Are ChatGPT scheduled tasks a calendar agent?",
      answer:
        "No. They run a ChatGPT prompt on a cadence or from a Gmail, Slack, or GitHub event. They are compared on the personal-assistant page, not as a fourth calendar vendor here.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/best/ai-agents-for-personal-assistant-tasks", title: "Best AI agent for personal assistant tasks", description: "Scheduled tasks, Cowork, and Daily Brief.", kicker: "Comparison" },
    { href: "/best/ai-agents-for-email", title: "Best AI agent for email", description: "Help me schedule starts in Gmail.", kicker: "Comparison" },
    { href: "/directory/gemini", title: "Gemini", description: "Calendar and Gmail Gemini features.", kicker: "Directory" },
    { href: "/glossary/tool-use", title: "Tool use", description: "Calendar is a tool the model is allowed to call.", kicker: "Glossary" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for scheduling and calendar in 2026?",
      paragraphs: [
        "There is no single best AI agent for scheduling. Gemini Help me schedule proposes times in Gmail on eligible Workspace and Google AI Pro or Ultra plans. [Gemini](/directory/gemini) Apps can create and edit Google Calendar events when Workspace is connected. Reclaim.ai Lite is free for one user with 5 AI Agents; Starter is $10 a seat a month billed annually. [ChatGPT](/directory/chatgpt) scheduled tasks run a prompt on a cadence; they are not a fourth calendar vendor in this table.",
        "The shelf is [Best AI agents](/best). Broader assistant jobs sit on [Best AI agent for personal assistant tasks](/best/ai-agents-for-personal-assistant-tasks).",
      ],
    },
    {
      id: "writes-the-event",
      heading: "Does the AI write the calendar event, or only suggest a time?",
      paragraphs: [
        "Gemini Apps can create and edit events in Google Calendar. Help me schedule in Gmail inserts suggested times in a message; Google’s Gmail scheduling table says the Calendar invite is added when the recipient picks a time. Reclaim’s agents block Focus Time, Habits, and buffers on a connected calendar. Those are different write paths.",
      ],
    },
  ],
};

export const writingComparison: ComparisonPage = {
  slug: "ai-agents-for-writing",
  path: "/best/ai-agents-for-writing",
  title: "Best AI agent for writing",
  heading: "Best AI agent for writing in 2026",
  metaTitle: "Best AI agent for writing: 4 in 2026",
  metaDescription:
    "There is no single best AI agent for writing. We compared 4 products on where the draft lives and list price. Licence and platform only (Nov 2026).",
  description:
    "There is no single best AI agent for writing. ChatGPT and Claude are general chat products that draft in the thread. Gemini in Google apps, including Docs, comes with Google AI Plus at $4.99 a month. Copilot in Word is included with Microsoft 365 Personal at $9.99 a month. None of these pages publish a writing-quality score, so this table does not invent one.",
  summary:
    "Sourced comparison of writing agents on where the draft lives and list price. Last verified November 2026.",
  question: "Which AI agent is best for writing in 2026?",
  tableHeading: "How do writing agents compare on app and price?",
  tableLead:
    "The table lists 4 writing products with a Best for label, licence, list price, and where the draft lives, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for writing comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each writing job?",
  bestForLead:
    "ChatGPT and Claude fit a draft in chat; Gemini fits Docs and Gmail on a Google AI plan; Copilot fits Word on Microsoft 365 Personal.",
  methodHeading: "How was this writing-agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI writing agents?",
  faqLead: "These short answers cover Free plans, Docs versus chat, and ratings.",
  applicationCategory: "LifestyleApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["task-performance", "tools-saas", "how-agents-work"],
  categories: ["writing", "productivity"],
  takeaways: [
    "A draft in chat is not the same as a draft inside Docs or Word. This table keeps those jobs apart.",
    "Google AI Plus lists Gemini in Gmail, Vids, and other Google apps at $4.99 a month. A Docs-only price is not listed.",
    "The table lists licence, list price, and platform from official pages. It does not rank prose quality.",
  ],
  picks: [
    {
      title: "Best for a draft in chat",
      body: "ChatGPT Free is $0; Go is $8 a month on the Codex listing checked November 6, 2026. Claude Free is $0; Pro is $20 a month, or $17 a month billed annually, on the Claude listing checked November 3, 2026.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for Google Docs and Gmail",
      body: "Google’s AI plans page lists Gemini in Gmail, Vids, and other Google apps on Google AI Plus at $4.99 a month. Help me write in Gmail is also on U.S. personal Gmail without that plan.",
      href: "/directory/gemini",
    },
    {
      title: "Best for Word on Microsoft 365",
      body: "Microsoft 365 Personal at $9.99 a month includes Copilot in Word, Excel, PowerPoint, and Outlook. Microsoft’s support page describes drafting, tone, and rewrite in Word.",
    },
  ],
  rows: [
    {
      id: "chatgpt-writing",
      name: "ChatGPT",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://chatgpt.com",
      license: "Proprietary product",
      pricing: "Free $0; Go $8/mo; Plus $20/mo; Pro from $100/mo (Codex listing, 6 Nov 2026)",
      platform: "ChatGPT web, desktop, and mobile",
      bestFor: "A draft in ChatGPT",
      job: "General ChatGPT drafts. Study mode is listed on Free through Pro on the pricing page. This is not a Docs or Word add-in.",
      sourceIds: [1, 5],
    },
    {
      id: "claude-writing",
      name: "Claude",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://claude.ai",
      license: "Proprietary product",
      pricing: "Free $0; Pro $20/mo or $17/mo annual; Max $100/mo; Ultra $200/mo (listing, 3 Nov 2026)",
      platform: "Claude web, desktop, and mobile; Artifacts, Docs, and Slides on the pricing page",
      bestFor: "A draft in Claude, including Artifacts",
      job: "Claude chat with Artifacts, Claude Docs, and Claude Slides listed on Free through Ultra. Research is listed from Pro up.",
      sourceIds: [2, 6],
    },
    {
      id: "gemini-docs",
      name: "Gemini in Google apps",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://one.google.com/about/google-ai-plans/",
      license: "Proprietary product",
      pricing: "Google AI Plus $4.99/mo includes Gemini in Gmail, Vids, and other Google apps (listing, 3 Nov 2026)",
      platform: "Gmail, Docs, and other Google apps on a Google AI or eligible Workspace plan",
      bestFor: "A draft inside Google Docs or Gmail",
      job: "Gemini in Google apps, including Help me write in Gmail and Gemini in Docs on Google AI plans.",
      sourceIds: [3, 7],
    },
    {
      id: "copilot-word",
      name: "Copilot in Word",
      vendor: "Microsoft",
      website: "https://www.microsoft.com/en-us/copilot/pricing/individuals",
      license: "Proprietary product",
      pricing: "Microsoft 365 Personal $9.99/mo includes Copilot in Word (8 Nov 2026)",
      platform: "Word desktop, web, and mobile on eligible Microsoft 365 plans",
      bestFor: "A draft inside Microsoft Word",
      job: "Copilot in Word for drafting, tone, and rewrites on Microsoft 365 Personal, Family, Premium, and Pro.",
      sourceIds: [4],
    },
  ],
  sources: [
    { title: "ChatGPT, Plans and pricing", url: "https://chatgpt.com/pricing/" },
    { title: "Anthropic, Plans & pricing", url: "https://claude.com/pricing" },
    { title: "Google One, Google AI plans with Cloud Storage", url: "https://one.google.com/about/google-ai-plans/" },
    { title: "Microsoft, Copilot pricing plans for individuals", url: "https://www.microsoft.com/en-us/copilot/pricing/individuals" },
    { title: "AI Agents Info, Codex listing (ChatGPT plan dollars, checked November 6, 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "AI Agents Info, Claude listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/claude" },
    { title: "AI Agents Info, Gemini listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
  ],
  faq: [
    {
      question: "Can I write with ChatGPT or Claude for free?",
      answer:
        "Yes. Both list a Free plan at $0. Paid plans raise usage and add tools. This page does not claim the Free draft is as capable as a paid plan.",
    },
    {
      question: "Does Gemini write inside Google Docs?",
      answer:
        "Google’s AI plans page lists Gemini in Gmail, Vids, and other Google apps on Google AI Plus. Help me write in Gmail is documented separately. This page does not invent a Docs-only price.",
    },
    {
      question: "Is Copilot in Word a separate subscription?",
      answer:
        "Microsoft’s individual Copilot pricing page includes Copilot in Word with Microsoft 365 Personal at $9.99 a month. It is not a Word-only add-on on that page.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a writing-quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/glossary/prompt", title: "Prompt", description: "The instructions that start a draft.", kicker: "Glossary" },
    { href: "/best/ai-agents-for-email", title: "Best AI agent for email", description: "Help me write inside Gmail and Outlook.", kicker: "Comparison" },
    { href: "/best/ai-agents-for-students", title: "Best AI agent for students", description: "Study mode, tutors, and school-account rules.", kicker: "Comparison" },
    { href: "/directory/chatgpt", title: "ChatGPT", description: "Consumer chat drafts.", kicker: "Directory" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for writing in 2026?",
      paragraphs: [
        "There is no single best AI agent for writing. [ChatGPT](/directory/chatgpt) and [Claude](/directory/claude) draft in the thread. [Gemini](/directory/gemini) in Google apps, including Docs, comes with Google AI Plus at $4.99 a month. Copilot in Word is included with Microsoft 365 Personal at $9.99 a month. None of these pages publish a writing-quality score.",
        "The instructions you give the model are a [prompt](/glossary/prompt). The shelf is [Best AI agents](/best).",
      ],
    },
    {
      id: "chat-vs-doc",
      heading: "Should the draft live in chat or in a document?",
      paragraphs: [
        "ChatGPT and Claude return the draft in the thread, with Claude listing Artifacts, Docs, and Slides on its pricing page. Gemini in Google apps and Copilot in Word edit the file you already have. That is a platform choice, not a quality ranking.",
      ],
    },
  ],
};

export const studentsComparison: ComparisonPage = {
  slug: "ai-agents-for-students",
  path: "/best/ai-agents-for-students",
  title: "Best AI agent for students",
  heading: "Best AI agent for students in 2026",
  metaTitle: "Best AI agent for students: 4 in 2026",
  metaDescription:
    "There is no single best AI agent for students. We compared 4 products on school rules, tutors, and list price. Licence and platform only (Nov 2026).",
  description:
    "There is no single best AI agent for students. Khanmigo is $4 a month or $44 a year for parents and learners, and free for teachers. ChatGPT lists Study mode on Free through Pro; ChatGPT for Teachers is free for verified U.S. K–12 educators through June 2028 and is not a student plan. Google will turn Gemini and Search off for K–12 student accounts until a school opts in. Eligible college students can claim a 12-month Google AI Pro trial on a personal account, not a school-issued login.",
  summary:
    "Sourced comparison of student-facing agents on school rules, tutors, and list price. Last verified November 2026.",
  question: "Which AI agent is best for students in 2026?",
  tableHeading: "How do student AI agents compare on school rules and price?",
  tableLead:
    "The table lists 4 student-facing products with a Best for label, licence, list price, and whether a school account is involved, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for students comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each student job?",
  bestForLead:
    "Khanmigo fits a tutor on Khan Academy; ChatGPT Study mode fits a consumer study chat; Gemini fits a college personal-account trial; Claude fits a general consumer assistant, not a school product.",
  methodHeading: "How was this student-agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI agents for students?",
  faqLead: "These short answers cover Khanmigo, ChatGPT for Teachers, K–12 Gemini, and the college trial.",
  applicationCategory: "EducationalApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["education", "tools-saas"],
  categories: ["education", "productivity"],
  takeaways: [
    "ChatGPT for Teachers is for verified U.S. K–12 educators through June 2028. OpenAI says the plan is not for students.",
    "Google’s November 3, 2026 K–12 policy turns Gemini and Search off on school accounts until an administrator opts in. That is not a home-account switch.",
    "The Google AI Pro student trial is for a personal Google Account verified with SheerID. It is not available on school-issued accounts.",
  ],
  picks: [
    {
      title: "Best for a Khan Academy tutor",
      body: "Khan Academy’s pricing page, checked November 3, 2026, says Khanmigo is free for teachers and $4 a month or $44 a year for parents and learners.",
      href: "/directory/khanmigo",
    },
    {
      title: "Best for Study mode in ChatGPT",
      body: "The ChatGPT pricing page lists Study mode on Free, Go, Plus, and Pro. ChatGPT for Teachers is a separate educator workspace, free through June 2028, and is not a student plan.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for a college personal-account trial",
      body: "Google’s student-offer help page says eligible U.S. higher-education students can claim 12 months of Google AI Pro at no cost on a personal account, verified with SheerID, redeemable until December 31, 2026.",
      href: "/directory/gemini",
    },
  ],
  rows: [
    {
      id: "khanmigo",
      name: "Khanmigo",
      vendor: "Khan Academy",
      listingSlug: "khanmigo",
      website: "https://www.khanmigo.ai",
      license: "Proprietary product",
      pricing: "Free for teachers; $4/mo or $44/year for parents and learners (listing, 3 Nov 2026)",
      platform: "khanmigo.ai; learner, teacher, and district offerings",
      bestFor: "A tutor on Khan Academy",
      job: "Khan Academy’s AI tutor and teaching assistant. This listing does not evaluate classroom supervision policy.",
      sourceIds: [1],
    },
    {
      id: "chatgpt-students",
      name: "ChatGPT Study mode",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://chatgpt.com/pricing/",
      license: "Proprietary product",
      pricing: "Study mode on Free $0 through Pro. ChatGPT for Teachers is free for verified U.S. K–12 educators through June 2028 — not a student plan",
      platform: "ChatGPT consumer app; separate Teachers and Edu workspaces",
      bestFor: "Study mode on a consumer ChatGPT plan",
      job: "Study mode on Free through Pro. ChatGPT for Teachers is an educator workspace. ChatGPT Edu is a university plan, not this consumer row’s price.",
      sourceIds: [2, 3, 4],
    },
    {
      id: "gemini-students",
      name: "Gemini for school and college",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://support.google.com/googleone/answer/17422238?hl=en",
      license: "Proprietary product",
      pricing: "School accounts follow the Nov 3, 2026 opt-in policy. Eligible U.S. college students: 12-month Google AI Pro trial on a personal account",
      platform: "School Google accounts vs personal Gmail (SheerID); not school-issued logins for the trial",
      bestFor: "College trial on a personal Google account",
      job: "K–12 school accounts: Gemini and Search off until an admin opts in. College: 12-month Google AI Pro trial on a personal account, redeem by December 31, 2026.",
      sourceIds: [5, 6, 7],
    },
    {
      id: "claude-students",
      name: "Claude",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://claude.com/pricing",
      license: "Proprietary product",
      pricing: "Free $0; Pro $20/mo or $17/mo annual (listing, 3 Nov 2026). Not a school product on that page",
      platform: "Claude consumer app",
      bestFor: "A general consumer assistant, not a school SKU",
      job: "Claude’s public pricing page is a consumer and team ladder. It is not a K–12 or university SKU in the sources for this table.",
      sourceIds: [8],
    },
  ],
  sources: [
    { title: "AI Agents Info, Khanmigo listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/khanmigo" },
    { title: "ChatGPT, Plans and pricing (Study mode)", url: "https://chatgpt.com/pricing/" },
    { title: "OpenAI Help Center, ChatGPT for Teachers", url: "https://help.openai.com/en/articles/12844995-chatgpt-for-teachers" },
    { title: "OpenAI, A free version of ChatGPT built for teachers (through June 2028)", url: "https://openai.com/index/chatgpt-for-teachers/" },
    { title: "Chris Phillips, Google, Designing responsible AI for learning (November 3, 2026)", url: "https://blog.google/products-and-platforms/products/education/ai-learning-era-updates-2026/" },
    { title: "Google One Help, Claim a Google One student offer", url: "https://support.google.com/googleone/answer/17422238?hl=en" },
    { title: "AI Agents Info, Google will turn off Gemini and Search for K-12 students unless schools opt in", url: "https://www.aiagentsinfo.com/blog/google-k12-gemini-and-search-off-until-schools-opt-in" },
    { title: "AI Agents Info, Claude listing (checked November 3, 2026)", url: "https://www.aiagentsinfo.com/directory/claude" },
  ],
  faq: [
    {
      question: "Is ChatGPT for Teachers a student plan?",
      answer:
        "No. OpenAI’s help article says ChatGPT for Teachers is for verified U.S. K–12 educators and staff, free through June 2028, and that the plan is not for students.",
    },
    {
      question: "Will Google turn off Search for K–12 student accounts?",
      answer:
        "Google’s November 3, 2026 blog says access to Gemini, Gemini Notebook, Gemini in Classroom, and Google Search will be off for K–12 student accounts until a school administrator turns them on. Re-read November 6, 2026, that page still places the switch in the coming months.",
    },
    {
      question: "Can a college student get Google AI Pro for free?",
      answer:
        "Eligible U.S. higher-education students can claim a 12-month Google AI Pro trial on a personal Google Account, verified with SheerID, with a qualifying payment method, redeemable until December 31, 2026. It is not available on school-issued accounts.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a tutoring-quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/topics/education", title: "Agents in education", description: "Tutors, classroom tools, and school-account policy.", kicker: "Topic" },
    { href: "/blog/google-k12-gemini-and-search-off-until-schools-opt-in", title: "Google K–12 Gemini and Search opt-in", description: "The November 3, 2026 school-account policy.", kicker: "News", date: "2026-11-04" },
    { href: "/directory/khanmigo", title: "Khanmigo", description: "Khan Academy’s tutor.", kicker: "Directory" },
    { href: "/best/ai-agents-for-writing", title: "Best AI agent for writing", description: "Drafts for homework still need a human check.", kicker: "Comparison" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for students in 2026?",
      paragraphs: [
        "There is no single best AI agent for students. [Khanmigo](/directory/khanmigo) is $4 a month or $44 a year for parents and learners, and free for teachers. [ChatGPT](/directory/chatgpt) lists Study mode on Free through Pro; ChatGPT for Teachers is free for verified U.S. K–12 educators through June 2028 and is not a student plan. [Gemini](/directory/gemini) on K–12 school accounts stays off until a school opts in. Eligible college students can claim a 12-month Google AI Pro trial on a personal account, not a school-issued login.",
        "School-account policy is [Google will turn off Gemini and Search for K-12 students unless schools opt in](/blog/google-k12-gemini-and-search-off-until-schools-opt-in). The shelf is [Best AI agents](/best).",
      ],
    },
    {
      id: "school-vs-home",
      heading: "Is a school Google login the same as a home ChatGPT account?",
      paragraphs: [
        "No. Google’s November 3, 2026 change is about K–12 student school accounts. ChatGPT for Teachers is an educator workspace, not a student login. The Google AI Pro student trial requires a personal Google Account. A university ChatGPT Edu rollout is a separate adult workspace, described in [What is an AI employee?](/blog/what-is-an-ai-employee).",
      ],
    },
  ],
};

export const smallBusinessComparison: ComparisonPage = {
  slug: "ai-agents-for-small-business",
  path: "/best/ai-agents-for-small-business",
  title: "Best AI agent for small business",
  heading: "Best AI agent for small business in 2026",
  metaTitle: "Best AI agent for small business: 4 in 2026",
  metaDescription:
    "There is no single best AI agent for small business. We compared 4 products on seats, inboxes, and list price. Licence and platform only (Nov 2026).",
  description:
    "There is no single best AI agent for small business. ChatGPT Business Standard seats are $20 per user per month billed annually, or $25 monthly, usually with a two-seat minimum. Claude Team standard seats are $20 per member per month billed annually. Microsoft 365 Business Standard with Copilot is $23.50 per user per month paid yearly. ReplyCurrent Growth is $29 a month for a website assistant that cites the page it used.",
  summary:
    "Sourced comparison of small-business agents on seats, inboxes, and list price. Last verified November 2026.",
  question: "Which AI agent is best for small business in 2026?",
  tableHeading: "How do small-business AI agents compare on seats and price?",
  tableLead:
    "The table lists 4 small-business products with a Best for label, licence, list price, and whether you get a shared workspace or a website embed, from official pages last verified November 2026.",
  tableCaption: "Best AI agent for small business comparison — Best for, licence, pricing, and platform",
  bestForHeading: "Which AI agent is best for each small-business job?",
  bestForLead:
    "ChatGPT Business fits a shared ChatGPT workspace; Claude Team fits Anthropic’s $20 annual seat; Microsoft 365 Business Standard with Copilot fits Outlook and Word; ReplyCurrent fits a cited website assistant.",
  methodHeading: "How was this small-business comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a help article, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI agents for small business?",
  faqLead: "These short answers cover two-seat minimums, Copilot, website assistants, and ratings.",
  applicationCategory: "BusinessApplication",
  kind: "consumer",
  columns: consumerColumns,
  topics: ["tools-saas", "task-performance"],
  categories: ["productivity", "customer-support"],
  takeaways: [
    "ChatGPT Business usually needs at least two paid seats. Some new workspaces can start with one seat at checkout; OpenAI says that option is not broadly available.",
    "Microsoft 365 Business Standard with Copilot is $23.50 per user per month paid yearly. Some advanced Copilot features are usage-based on that page.",
    "ReplyCurrent is a website assistant, not a shared inbox. Growth is $29 a month on the listing checked November 7, 2026.",
  ],
  picks: [
    {
      title: "Best for a shared ChatGPT workspace",
      body: "ChatGPT Business Standard seats are $20 per user per month billed annually, or $25 monthly. Premium seats are $100 annually or $125 monthly. A workspace usually needs two paid seats, up to 200.",
      href: "/directory/chatgpt",
    },
    {
      title: "Best for Claude on a team seat",
      body: "Claude Team standard seats are $20 per member per month billed annually, or $25 monthly, with a two-person minimum, on this site’s Claude Code vs Codex pricing guide.",
      href: "/directory/claude",
    },
    {
      title: "Best for Copilot in Outlook and Word at work",
      body: "Microsoft 365 Business Standard with Copilot is $23.50 per user per month paid yearly, including Copilot in Word, Excel, PowerPoint, Outlook, and Teams, for up to 300 users.",
    },
    {
      title: "Best for a cited website assistant",
      body: "ReplyCurrent Growth is $29 a month for one assistant that answers from the site, docs, and files and shows the source. Pro is $49; Agency is $99.",
      href: "/directory/replycurrent",
    },
  ],
  rows: [
    {
      id: "chatgpt-business",
      name: "ChatGPT Business",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq",
      license: "Proprietary product",
      pricing: "Standard $20/user/mo annual or $25 monthly; usually 2-seat minimum, max 200 (help center, 8 Nov 2026)",
      platform: "ChatGPT Business workspace with ChatGPT Work and Codex",
      bestFor: "A shared ChatGPT workspace",
      job: "Self-serve team workspace with Standard and Premium seats, admin controls, ChatGPT Work, and Codex.",
      sourceIds: [1, 2],
    },
    {
      id: "claude-team",
      name: "Claude Team",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://claude.com/pricing",
      license: "Proprietary product",
      pricing: "Team standard $20/member/mo annual or $25 monthly; two-person minimum (Claude Code vs Codex pricing, Nov 2026)",
      platform: "Claude Team workspace; Cowork on Team",
      bestFor: "Claude seats for a small team",
      job: "Claude Team standard seats at $20 annually per member. Cowork is available on Team per this site’s workplace guide.",
      sourceIds: [3, 4],
    },
    {
      id: "m365-copilot-business",
      name: "Microsoft 365 Business Standard with Copilot",
      vendor: "Microsoft",
      website: "https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-standard-with-copilot",
      license: "Proprietary product",
      pricing: "$23.50/user/mo paid yearly; usage-based billing for some advanced AI features (8 Nov 2026)",
      platform: "Word, Excel, PowerPoint, Outlook, and Teams with Copilot; up to 300 users",
      bestFor: "Copilot in the Microsoft 365 apps a shop already runs",
      job: "Business Standard with Copilot built into desktop, web, and mobile apps, custom business email, and Teams.",
      sourceIds: [5],
    },
    {
      id: "replycurrent",
      name: "ReplyCurrent",
      vendor: "ReplyCurrent",
      listingSlug: "replycurrent",
      website: "https://www.replycurrent.com",
      license: "Proprietary product",
      pricing: "Growth $29/mo; Pro $49/mo; Agency $99/mo, billed monthly in USD (listing, 7 Nov 2026)",
      platform: "Website embed; answers from the site, docs, and files with sources",
      bestFor: "A cited assistant on the company website",
      job: "Website assistant that answers visitor questions from the site, help center, docs, and PDFs, and shows the source.",
      sourceIds: [6],
    },
  ],
  sources: [
    { title: "OpenAI Help Center, ChatGPT Business: General FAQ", url: "https://help.openai.com/en/articles/8542115-chatgpt-business-general-faq" },
    { title: "OpenAI Help Center, Sign up for ChatGPT Business", url: "https://help.openai.com/en/articles/8980713-sign-up-for-chatgpt-business" },
    { title: "AI Agents Info, Claude Code vs Codex pricing", url: "https://www.aiagentsinfo.com/blog/claude-code-vs-codex-pricing" },
    { title: "AI Agents Info, What is an AI employee? (Cowork on Team)", url: "https://www.aiagentsinfo.com/blog/what-is-an-ai-employee" },
    { title: "Microsoft, Microsoft 365 Business Standard with Copilot", url: "https://www.microsoft.com/en-us/microsoft-365/business/microsoft-365-business-standard-with-copilot" },
    { title: "AI Agents Info, ReplyCurrent listing (checked November 7, 2026)", url: "https://www.aiagentsinfo.com/directory/replycurrent" },
  ],
  faq: [
    {
      question: "Does ChatGPT Business require two seats?",
      answer:
        "Usually yes. The Business FAQ says a workspace requires at least two paid seats, which can mix Standard and Premium. A separate help article says some new workspaces can start with one paid seat at checkout, and that the option is not broadly available.",
    },
    {
      question: "Is Microsoft 365 Copilot $23.50 a month?",
      answer:
        "Microsoft 365 Business Standard with Copilot is $23.50 per user per month paid yearly on Microsoft’s product page read November 8, 2026. That page also says some advanced AI features are usage-based.",
    },
    {
      question: "Is ReplyCurrent a replacement for ChatGPT Business?",
      answer:
        "No. ReplyCurrent is a website assistant that answers visitors from your site and files. ChatGPT Business is a shared workspace for people inside the company.",
    },
    {
      question: "Why are there no star ratings?",
      answer: "This page copies licence, list price, and platform from official pages. It does not invent a quality score.",
    },
  ],
  related: [
    hubCard(),
    { href: "/best/ai-agents-for-personal-assistant-tasks", title: "Best AI agent for personal assistant tasks", description: "Cowork and ChatGPT Work for recurring jobs.", kicker: "Comparison" },
    { href: "/best/ai-agents-for-email", title: "Best AI agent for email", description: "Inbox drafts for a small team.", kicker: "Comparison" },
    { href: "/directory/replycurrent", title: "ReplyCurrent", description: "Cited website assistant.", kicker: "Directory" },
    { href: "/blog/how-much-does-an-ai-employee-cost", title: "How much does an AI employee cost for a small business?", description: "Seat, credit, hour, and resolution prices read November 11, 2026.", kicker: "Guide" },
    { href: "/glossary/digital-worker", title: "Digital worker", description: "Workplace software given a recurring job.", kicker: "Glossary" },
  ],
  sections: [
    {
      id: "direct-answer",
      heading: "Which AI agent is best for small business in 2026?",
      paragraphs: [
        "There is no single best AI agent for small business. [ChatGPT](/directory/chatgpt) Business Standard seats are $20 per user per month billed annually, or $25 monthly, usually with a two-seat minimum. [Claude](/directory/claude) Team standard seats are $20 per member per month billed annually. Microsoft 365 Business Standard with Copilot is $23.50 per user per month paid yearly. [ReplyCurrent](/directory/replycurrent) Growth is $29 a month for a website assistant that cites the page it used.",
        "A workplace agent is a [digital worker](/glossary/digital-worker). The longer guide is [What is an AI employee?](/blog/what-is-an-ai-employee). List prices for products sold as named AI employees, per seat, per metered hour, and per resolution, are [How much does an AI employee cost for a small business?](/blog/how-much-does-an-ai-employee-cost). The shelf is [Best AI agents](/best).",
      ],
    },
    {
      id: "workspace-vs-website",
      heading: "Do you need a shared workspace or a website assistant?",
      paragraphs: [
        "ChatGPT Business, Claude Team, and Microsoft 365 Copilot are for people inside the company. ReplyCurrent is for visitors on the public site. They are different jobs. This table lists both because a small business often needs one of each, not a single winner.",
      ],
    },
  ],
};

export const consumerComparisons: ComparisonPage[] = [
  shoppingComparison,
  webSearchComparison,
  travelComparison,
  emailComparison,
  personalAssistantComparison,
  researchComparison,
  schedulingComparison,
  writingComparison,
  studentsComparison,
  smallBusinessComparison,
];



