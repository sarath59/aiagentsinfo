import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/ai-shopping-agents-next-30-days";
export const title =
  "AI shopping agents, 12 Nov to 12 Dec 2026: Black Friday is dated. A new checkout day is not.";
export const thesis =
  "Three holiday days are on Adobe’s calendar. No checkout page re-read for this brief names a launch between November 12 and December 12.";
export const description =
  "What merchants, shoppers, and builders should watch from November 12 to December 12, 2026: Adobe’s two Thanksgiving forecasts, Amazon’s undated text rollout, and the checkout pages that still have no day. Checked November 12, 2026.";
export const readOn = "2026-11-12";

export const keyNumbers = [
  {
    value: "159% vs 141%",
    label: "Adobe’s two Thanksgiving forecasts",
    note: "October 29 report versus the holiday page. Both are AI traffic, defined as a click, not a completed agent checkout.",
  },
  {
    value: "Nov 27",
    label: "Black Friday 2026",
    note: "Cyber Monday is November 30. Thanksgiving is November 26. Adobe names the growth rates. It does not name a checkout product.",
  },
  {
    value: "0",
    label: "new checkout days in this window",
    note: "Count of launch days on the pages re-read November 12. Amazon’s wider text rollout is “the coming weeks,” with no day.",
  },
  {
    value: "400 million",
    label: "Alexa for Shopping customers",
    note: "Amazon’s November 6 post: used in the last 12 months. Agentic-feature customers “grown more than eight times” since the start of the year.",
  },
];

export const findings = [
  "Adobe’s October 29 report forecasts AI traffic to U.S. retail sites up 159% on Thanksgiving, 95% on Black Friday, and 88% on Cyber Monday. The holiday page, read the same morning as this brief, says August grew 127% and Thanksgiving is projected at 141%. Both pages are Adobe. They do not match.",
  "Adobe defines that traffic as users clicking a link. It is not an agent finishing checkout. September conversion was 90% better than other traffic, and revenue per visit was 83% higher, on a base of more than 1 trillion visits to U.S. retail sites.",
  "Amazon’s November 6 post started texting Alexa for Shopping for an invited subset of U.S. customers and said the option would reach millions more “in the coming weeks.” No second date is on the post. Those weeks overlap this brief. They are not a day.",
  "OpenAI’s merchant page, fetched November 12, still says purchases finish on the merchant’s website or app, shopping is live in the United States, and a self-serve portal is “later this year.” December 12 is not the last day of 2026, so the sentence can miss this brief and still be true.",
];

export const executiveSummary = [
  "The next 30 days are a traffic test, not a protocol launch. Thanksgiving is November 26, Black Friday is November 27, and Cyber Monday is November 30. Adobe has put growth rates on those days. Google, OpenAI, Amazon, and Shopify have not put a new checkout button on any of them. [[1]][[2]][[3]][[4]]",
  "Read Adobe as two documents. The October 29 report says September AI traffic grew 71% year over year, and it forecasts 159% on Thanksgiving, 95% on Black Friday, and 88% on Cyber Monday. The holiday forecast page says August grew 127%, the season is projected at 130%, and Thanksgiving at 141%. AI traffic, on the October 29 page, means a person clicked a link. It does not mean an assistant paid. [[1]][[2]]",
  "The checkout facts that did move are narrower. Amazon invited some U.S. customers to text Alexa for Shopping on November 6 and left the wider rollout undated. OpenAI’s merchant page, re-read November 12, still sends the purchase to the store and still says the self-serve portal is later this year. Shopify’s Shop Pay docs describe a one-time credential after the buyer approves, including off Shopify, and they do not name a holiday date. The six-month calendar and the readiness checker are the places for the longer record and the store worksheet. [[3]][[4]][[5]]",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "adobe-holiday-days",
    title: "Adobe’s October 29 forecast for AI-referred retail traffic",
    caption:
      "Year-over-year growth Adobe forecast on October 29, 2026, for AI traffic to U.S. retail sites. AI traffic means a user clicked a link. The holiday page’s Thanksgiving figure is 141%, not 159%, and is not on this chart.",
    unit: "percent, year over year",
    source:
      "Adobe, Vivek Pandya, October 29, 2026. [AI traffic and the holiday season](https://business.adobe.com/blog/ai-traffic-higher-revenue-per-visit-retail-holiday). [[1]]",
    series: ["Forecast growth"],
    categories: [
      { label: "Thanksgiving", values: [159], displays: ["159%"] },
      { label: "Black Friday", values: [95], displays: ["95%"] },
      { label: "Cyber Monday", values: [88], displays: ["88%"] },
    ],
  },
];

export const chapters: ReportChapter[] = [
  {
    id: "what-this-month-is",
    title: "The month is a traffic test",
    blocks: [
      {
        kind: "p",
        text: "From November 12 through December 12, the public record this brief could re-read splits in two. Adobe has named growth rates for the three peak days. The companies that actually take payment have not named a new checkout day inside the same stretch. If you are waiting for a Black Friday protocol announcement, it is not on the pages below.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Merchants: treat the holiday as a referral surge from assistants, and fix the page an assistant can quote. Shoppers: an assistant that can pay today is a specific product with a confirmation rule, not a seasonal mode. Builders: do not schedule a launch against a day no vendor has published. The [six-month shopping calendar](/reports/ai-shopping-agents-next-6-months) keeps the longer dates. The [readiness checker](/tools/shopping-agent-readiness-checker) is the 18-check worksheet, scored in the browser, with nothing stored.",
      },
    ],
  },
  {
    id: "who-can-buy",
    title: "Who can pay on November 12",
    blocks: [
      {
        kind: "p",
        text: "This brief re-opened two checkout pages and one wallet doc. It did not re-try a purchase. “Can pay” means the company’s own page says a purchase can be completed, and it says who confirms.",
      },
      {
        kind: "table",
        caption: "Checkout language re-read on November 12, 2026. Google, Microsoft Copilot, and Perplexity were not re-opened; the November 11 comparison still holds those rows.",
        headers: ["Surface", "What the page says about paying", "Confirmation", "Date on the page"],
        rows: [
          [
            "ChatGPT shopping",
            "Discover in chat. Purchase on the merchant’s website or app. No fees on purchases that start in ChatGPT.",
            "The store’s checkout, not a ChatGPT button.",
            "Fetched November 12. Portal is “later this year.” U.S. only.",
          ],
          [
            "Alexa for Shopping, including text",
            "Can add to cart and complete the purchase. Auto-buy when the price is right is already a feature on the same post.",
            "Text checkout is live for an invited U.S. subset. The post also says the assistant buys with approval on a reorder example.",
            "Published November 6. Wider rollout: “coming weeks,” no day.",
          ],
          [
            "Shop Pay for agents",
            "Shop MCP: the buyer connects Shop once, approves each purchase, and the agent receives a one-time credential. Works outside Shopify.",
            "Buyer approval on every purchase. The agent does not keep the card.",
            "Docs fetched November 12. No holiday date.",
          ],
        ],
      },
      {
        kind: "p",
        text: "The November 11 head-to-head, which this page does not reopen, found Google, Amazon, Copilot, and Perplexity able to complete a purchase, and ChatGPT’s merchant page pointing at the store. Use that [comparison](/blog/ai-shopping-agents-compared-november-2026) for the protocol name and the published fee. Use this page for what is allowed to change before December 12. [[4]][[3]][[5]]",
      },
      {
        kind: "callout",
        title: "Unattended spend is still the exception",
        text: "Shop Pay’s doc requires an approval on each purchase. OpenAI’s merchant page does not render a checkout. Amazon’s November 6 post is the one that names auto-buy when a price is right, and it does not print a cap, a category ban, or a holiday exception.",
      },
    ],
  },
  {
    id: "adobe-two-numbers",
    title: "Adobe published two Thanksgiving rates",
    blocks: [
      {
        kind: "p",
        text: "The October 29 report is the one with a method you can quote. It is based on direct online transactions, more than 1 trillion visits to U.S. retail sites, 100 million SKUs, and 18 product categories. A companion survey of more than 5,000 U.S. respondents was fielded in September 2026. This brief uses the transaction figures, not an unnamed survey percentage. [[1]]",
      },
      {
        kind: "chart",
        id: "adobe-holiday-days",
      },
      {
        kind: "p",
        text: "September, on that report, is the measured month. AI traffic grew 71% year over year. It converted 90% better than non-AI traffic, produced 83% higher revenue per visit, and the visitors spent 73% more time, viewed 25% more pages, and added to cart at a 53% higher rate. Adobe forecasts the revenue-per-visit advantage to double in the holiday season. “Double” is Adobe’s verb. It is not a computed dollar. [[1]]",
      },
      {
        kind: "table",
        caption: "The Thanksgiving conflict. Same company, two pages, read November 12, 2026.",
        headers: ["Page", "What it measures", "Figure", "Day or span"],
        rows: [
          [
            "October 29 report",
            "AI traffic, a clicked link",
            "159% year over year, forecast",
            "Thanksgiving",
          ],
          [
            "October 29 report",
            "AI traffic, a clicked link",
            "95% and 88%, forecast",
            "Black Friday and Cyber Monday",
          ],
          [
            "Holiday forecast page",
            "AI-driven traffic",
            "141% year over year, projected",
            "Thanksgiving",
          ],
          [
            "Holiday forecast page",
            "AI-driven traffic",
            "127% in August, 130% projected for the season",
            "August, then November–December",
          ],
        ],
      },
      {
        kind: "p",
        text: "A journalist who needs one Thanksgiving number does not have one. Cite the page. The October 29 definition is the stricter one, because it says the visit is a click. The holiday page does not, in the text fetched November 12, repeat that sentence next to the 141%. [[1]][[2]]",
      },
      {
        kind: "h3",
        text: "The homepage score is the merchant number",
      },
      {
        kind: "p",
        text: "Adobe’s Citation Readability Score, on the October 29 report, put the average U.S. retail homepage at 63% in September. Electronics scored 79%. Grocery scored 55%. General-merchandise homepages scored 40%. More than a third of the average homepage, on Adobe’s scale, is not visible to the systems sending the traffic. That is a content problem. It is not evidence that an agent can check out. [[1]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "If you sell in the United States, the holiday upside Adobe measured arrives as a click. Put price, stock, and the return rule in HTML the assistant can quote, then decide whether any channel is allowed to pay. The [readiness checker](/tools/shopping-agent-readiness-checker) separates find, read, and pay. A high Adobe score does not check the pay box.",
      },
    ],
  },
  {
    id: "amazon-text",
    title: "Amazon’s text agent has a start and no second date",
    blocks: [
      {
        kind: "p",
        text: "On November 6 Amazon published texting for Alexa for Shopping. An invited subset of U.S. customers can text the assistant. The post says it can search, compare, build a cart, and complete the purchase, and that the wider option reaches millions more customers in the coming weeks. Customers who have not been invited can sign up to be told when more invites go out. The post does not say which week. [[3]]",
      },
      {
        kind: "quote",
        text: "Message it what you need, and Alexa goes to work on your behalf—searching, comparing, and buying so you can get on with your day.",
        cite: "Rajiv Mehta, vice president of Conversational Shopping at Amazon, November 6, 2026. [[3]]",
      },
      {
        kind: "p",
        text: "The same post says more than 400 million customers used Alexa for Shopping in the last 12 months, and that the number of customers using its agentic features has grown more than eight times since the start of the year. “More than eight times” is Amazon’s phrase. This page does not convert it into a percent. The post also says auto-buy can complete a purchase when the price is right, and that Shop Direct can surface products from stores across the web. It does not name a fee, a merchant list for the text channel, or a Black Friday switch. [[3]]",
      },
      {
        kind: "p",
        text: "“The coming weeks,” counted from November 6, runs through this brief and past it. A rollout on November 20 would fit the sentence. A rollout on December 20 would also fit. Likely, on this page, means the sentence points at the window and does not pick a day. It does not mean the wider rollout has been observed.",
      },
    ],
  },
  {
    id: "protocols",
    title: "Protocols did not grow a holiday date",
    blocks: [
      {
        kind: "p",
        text: "OpenAI’s merchant page, fetched November 12, says the Agentic Commerce Protocol supports product discovery today and will expand to the rest of the journey over time. Shopping is live for ChatGPT users in the United States. Shopify and Etsy catalogs are already integrated. Everyone else applies, and applicants who already applied are on a waitlist. The self-serve portal is “later this year.” There is no fee, on that page, for a purchase that starts in ChatGPT, because the purchase is not ChatGPT’s. [[4]]",
      },
      {
        kind: "p",
        text: "Shopify’s Shop Pay doc, fetched the same day, lists four integrations. The one that matters for a personal agent is Shop MCP: one Shop connection, an approval on every purchase, a one-time credential, and checkout even when the merchant is not on Shopify. The doc says the wallet has 400 million or more buyers. It does not name Visa, Mastercard, a token program, or a date in November or December. This brief did not open a card-network page that places a holiday deadline, so a network launch is not in the announced column. [[5]]",
      },
      {
        kind: "callout",
        title: "Left off this page on purpose",
        text: "Secondary write-ups this week describe Shop Pay tokens built with Visa, Mastercard, American Express, and Discover. Those sentences are not on the Shop Pay doc fetched November 12. Until a network or Shopify page states them with a date, they stay out of the calendar. The [readiness checker](/tools/shopping-agent-readiness-checker) says the same thing in the pay group: Visa, Mastercard, and AP2 are not a theme setting.",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Implement the channel that has already named you. A U.S. ChatGPT feed is a discovery feed, and the purchase still hits your checkout. A Shop MCP credential is a one-time payment handle after a human approval. Neither one is a reason to block every bot, and neither one is a reason to open guest checkout to an unattended script. Score the store with the [checker](/tools/shopping-agent-readiness-checker) before you add a flag.",
      },
    ],
  },
  {
    id: "announced-likely-watch",
    title: "Announced, likely, and watch for",
    blocks: [
      {
        kind: "p",
        text: "Announced means a linked page names a day inside November 12 through December 12, or names a fact that is already true on November 12. Likely means a linked page points at this window and refuses a day. Watch for means the page disagreed with itself, or a promised follow-up was not on a page this brief opened.",
      },
      {
        kind: "table",
        caption: "November 12 to December 12, 2026. Empty cells stay empty.",
        headers: ["Claim", "Label", "Why"],
        rows: [
          [
            "Thanksgiving, Black Friday, and Cyber Monday growth rates",
            "Announced forecasts",
            "Adobe named the days. The two Adobe pages do not share one Thanksgiving rate.",
          ],
          [
            "A new ChatGPT, Google, Copilot, or Shop Pay checkout button",
            "Not announced",
            "No page re-read for this brief names a day.",
          ],
          [
            "Alexa for Shopping text, wider than the invited subset",
            "Likely",
            "November 6 says “the coming weeks” and “millions more.” No day.",
          ],
          [
            "OpenAI self-serve merchant portal",
            "Watch",
            "“Later this year” can fall after December 12. The merchant page still has no day.",
          ],
          [
            "Card-network agent tokens inside Shop Pay",
            "Watch",
            "Not on the Shop Pay doc fetched November 12. No holiday date was opened.",
          ],
          [
            "Google loyalty rewards and the Canada Merchant Center hub",
            "Outside this brief",
            "Those phrases live on the [six-month calendar](/reports/ai-shopping-agents-next-6-months). This page did not re-date them.",
          ],
        ],
      },
    ],
  },
  {
    id: "before-cyber-monday",
    title: "What to do before Cyber Monday",
    blocks: [
      {
        kind: "p",
        text: "Cyber Monday is November 30. The work that matches the evidence is unglamorous. Make the price and the stock readable, decide which assistant may pay, and do not treat Adobe’s click as a completed order. A store that blocks every agent also blocks the click Adobe is counting, if the block is on the crawler rather than on checkout.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "By November 26, know which of your SKUs an assistant can quote and which checkout, if any, you have enabled. The [readiness checker](/tools/shopping-agent-readiness-checker) is the list. The [six-month report](/reports/ai-shopping-agents-next-6-months) is what stays true in January, when the holiday rates are no longer the story. Re-read Adobe’s two Thanksgiving numbers before you put either one in a deck.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [
      { kind: "h3", text: "Can an AI shopping agent buy for you on Black Friday 2026?" },
      {
        kind: "p",
        text: "On some surfaces, yes, and the confirmation rule differs. Amazon’s November 6 post says Alexa for Shopping can complete a purchase, including over text for an invited set of U.S. customers. OpenAI’s merchant page, fetched November 12, says the purchase finishes on the store’s site or app. Shopify’s Shop Pay doc requires the buyer to approve each agent purchase. No page re-read for this brief turns Black Friday into a new checkout launch.",
      },
      { kind: "h3", text: "What did Adobe actually forecast for AI shopping traffic?" },
      {
        kind: "p",
        text: "The October 29 report forecasts AI traffic, defined as a clicked link, up 159% on Thanksgiving, 95% on Black Friday, and 88% on Cyber Monday. The holiday page projects Thanksgiving at 141% and the season at 130%. Cite the page you mean.",
      },
      { kind: "h3", text: "Will ChatGPT check out inside the chat before December 12?" },
      {
        kind: "p",
        text: "Not on the merchant page fetched November 12. That page says OpenAI is moving away from standalone Instant Checkout. Purchases complete on merchant sites or apps. A self-serve portal is described as later this year, with no day.",
      },
      { kind: "h3", text: "Is Amazon’s text shopping agent available to everyone?" },
      {
        kind: "p",
        text: "No. The November 6 post limits the start to an invited subset of U.S. customers and says millions more will get it in the coming weeks. It does not name the week.",
      },
      { kind: "h3", text: "What should a merchant do this month?" },
      {
        kind: "p",
        text: "Make price and stock readable, then decide which channel may pay. Adobe’s holiday value is a click, not an agent order. The readiness checker scores find, read, and pay. It does not place an order.",
      },
    ],
  },
];

export const methodology = [
  "Pages were fetched on November 12, 2026: Adobe’s October 29 report, Adobe’s holiday forecast page, Amazon’s November 6 Alexa for Shopping post, OpenAI’s merchant page, and Shopify’s Shop Pay agent docs. Figures are copied from those pages. “More than eight times” is not rewritten as a percent. “Double,” in Adobe’s revenue-per-visit sentence, is Adobe’s word.",
  "The zero in the key-numbers strip is this brief’s count of new checkout launch days on the pages it re-read. It is not a census of every retailer. Google’s Canada rollout, Copilot Checkout, and Perplexity Instant Buy were not re-opened; the November 11 comparison and the six-month report still hold them.",
  "Likely means a source points at November 12 through December 12 and does not name a day. Watch means the source refused a date, two sources disagree, or a claim was only in a secondary article. Card-network token programs were left out because they were not on the Shop Pay doc fetched today.",
  "This page did not place an order, did not run a shopper survey, and did not use Adobe’s companion survey percentages. The survey’s existence, size, and month are named so a reader can see what was not used.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Adobe, AI traffic and holiday revenue per visit",
    url: "https://business.adobe.com/blog/ai-traffic-higher-revenue-per-visit-retail-holiday",
    detail:
      "Vivek Pandya, October 29, 2026. Fetched November 12, 2026. AI traffic is users clicking a link. September: +71% year over year, conversion +90%, revenue per visit +83%, time +73%, pages +25%, add-to-cart +53%. Forecasts: Thanksgiving +159%, Black Friday +95%, Cyber Monday +88%. Method: more than 1 trillion U.S. retail visits, 100 million SKUs, 18 categories. Companion survey: more than 5,000 U.S. respondents, September 2026. Homepage readability 63% in September.",
  },
  {
    n: 2,
    title: "Adobe, 2026 holiday shopping forecast",
    url: "https://business.adobe.com/resources/holiday-shopping-report.html",
    detail:
      "Fetched November 12, 2026. AI-driven traffic +127% year over year in August 2026, projected +130% for the holiday season and +141% on Thanksgiving. This page does not use the page’s other holiday totals, which are not agent checkout.",
  },
  {
    n: 3,
    title: "Amazon, Alexa for Shopping by text",
    url: "https://www.aboutamazon.com/news/retail/alexa-for-shopping-text-to-shop",
    detail:
      "Jacquelyn Smith, published November 6, 2026. Fetched November 12, 2026. Invited U.S. subset, millions more “in the coming weeks.” More than 400 million customers in the last 12 months. Agentic-feature customers grown more than eight times since the start of the year. Quote from Rajiv Mehta.",
  },
  {
    n: 4,
    title: "OpenAI, product discovery in ChatGPT",
    url: "https://openai.com/chatgpt/search-product-discovery/",
    detail:
      "Fetched November 12, 2026. Purchases complete on merchant websites or apps. No fees on purchases that start in ChatGPT. Live in the United States. Self-serve portal later this year. ACP supports discovery today.",
  },
  {
    n: 5,
    title: "Shopify, Shop Pay for agents",
    url: "https://shopify.dev/docs/agents/carts-and-checkout/shop-pay",
    detail:
      "Fetched November 12, 2026. Shop MCP: one Shop connection, buyer approval on each purchase, one-time credential, including merchants not on Shopify. Network size on the page: 400 million or more buyers. No holiday date and no card-network name in the text fetched.",
  },
];

export const faq = [
  {
    question: "Can an AI shopping agent buy for you on Black Friday 2026?",
    answer:
      "On some surfaces, yes. Amazon’s November 6, 2026 post says Alexa for Shopping can complete a purchase, including by text for an invited set of U.S. customers. OpenAI’s merchant page, fetched November 12, says the purchase finishes on the store. Shopify’s Shop Pay doc requires the buyer to approve each agent purchase. None of those pages names Black Friday as a new checkout launch.",
  },
  {
    question: "What did Adobe forecast for AI shopping traffic this holiday?",
    answer:
      "Adobe’s October 29, 2026 report forecasts AI traffic, defined as a clicked link, up 159% on Thanksgiving, 95% on Black Friday, and 88% on Cyber Monday. Adobe’s holiday page projects Thanksgiving at 141% and the season at 130%. The two pages disagree, and both are primary.",
  },
  {
    question: "Will ChatGPT check out inside the chat before December 12?",
    answer:
      "The merchant page fetched November 12, 2026 says no. Purchases complete on the merchant’s website or app. A self-serve merchant portal is described as later this year, with no day, so it can miss December 12 and still fit the sentence.",
  },
  {
    question: "Is Amazon’s text shopping agent available to everyone?",
    answer:
      "No. The November 6 post starts with an invited subset of U.S. customers and says millions more will get it in the coming weeks. It does not name the week.",
  },
  {
    question: "What should a merchant do before Cyber Monday?",
    answer:
      "Make price and stock readable, and decide which assistant may pay. Adobe’s measured holiday value is a click, not an agent order. The shopping-agent readiness checker scores find, read, and pay. It does not place an order.",
  },
];

function blockWords(block: ReportChapter["blocks"][number]) {
  if (block.kind === "p" || block.kind === "h3") return block.text;
  if (block.kind === "quote") return `${block.text} ${block.cite}`;
  if (block.kind === "callout") return `${block.title} ${block.text}`;
  if (block.kind === "means") return `${block.audience} ${block.text}`;
  if (block.kind === "table") return [block.caption, ...block.headers, ...block.rows.flat()].join(" ");
  return "";
}

function bodyCopy() {
  return [
    title,
    thesis,
    description,
    ...keyNumbers.flatMap((item) => [item.value, item.label, item.note ?? ""]),
    ...executiveSummary,
    ...findings,
    ...chapters.flatMap((chapter) => [chapter.title, ...chapter.blocks.map(blockWords)]),
    ...reportCharts.flatMap((chart) => [chart.title, chart.caption, chart.source]),
    ...methodology,
  ].join("\n");
}

export const readingMinutes = readingTime(bodyCopy());
export const bodyWordCount = bodyCopy().trim().split(/\s+/).filter(Boolean).length;
