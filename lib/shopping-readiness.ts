/**
 * Editorial weights for a merchant worksheet. They are not a Google score,
 * an OpenAI score, or a completed order. The points sum to 100.
 * Sources were read November 12, 2026 unless a line names an earlier reading
 * on this site.
 */

export const path = "/tools/shopping-agent-readiness-checker";
export const title =
  "Is your store ready for AI shopping agents? 18 checks for find, read, and checkout";
export const description =
  "Score whether an AI shopping agent can find a product, read the price and stock, and check out. 18 weighted checks, a gap list, and a fix for each. Nothing is stored.";
export const readOn = "2026-11-12";

export type ReadinessAnswer = "yes" | "partial" | "no";

export type ReadinessGroupId = "find" | "read" | "pay";

export type ReadinessCheck = {
  id: string;
  group: ReadinessGroupId;
  weight: number;
  prompt: string;
  partialMeans: string;
  fix: string;
  sourceName: string;
  sourceUrl: string;
};

export const readinessGroups: {
  id: ReadinessGroupId;
  heading: string;
  answer: string;
}[] = [
  {
    id: "find",
    heading: "Can an agent find a product row?",
    answer:
      "A homepage sentence cannot. The agent needs a feed row, or HTML it can quote, and a crawler you did not block.",
  },
  {
    id: "read",
    heading: "Can an agent read the price and the stock?",
    answer:
      "The price and the stock have to be in the HTML response, on a stable URL, in the same shape the feed uses.",
  },
  {
    id: "pay",
    heading: "Can an agent check out?",
    answer:
      "Guest checkout is a store choice. UCP and ACP are channel integrations. Visa, Mastercard, and AP2 are not a theme setting.",
  },
];

export const readinessChecks: ReadinessCheck[] = [
  {
    id: "openai-feed",
    group: "find",
    weight: 8,
    prompt: "An OpenAI product feed is live, with the nine discovery fields on every row.",
    partialMeans: "A feed exists, and at least one required field is missing, placeholder text, or stale.",
    fix: "Publish one row per variant with an item id, title, description, product URL, brand, seller name, image URL, availability, and price. Price is a positive amount, a space, and an ISO currency code, as in 79.99 USD. Omit unknown optional fields. Do not send null, n/a, or a fake unknown except where unknown is an allowed availability value.",
    sourceName: "OpenAI product feed spec, read on this site November 10, 2026",
    sourceUrl: "https://developers.openai.com/commerce/specs/file-upload/products",
  },
  {
    id: "merchant-center",
    group: "find",
    weight: 8,
    prompt: "Products are approved for free listings in Google Merchant Center.",
    partialMeans: "The account exists, and some products are still disapproved or missing a return policy.",
    fix: "Get the Merchant Center account in good standing and the products approved for free listings before you touch a checkout flag. Google’s UCP guide, last updated 2026-10-29 UTC and read on this site November 10, also asks for a return policy with cost, window, and a policy link, plus at least one customer-support contact.",
    sourceName: "Google, Prepare your Merchant Center account for UCP",
    sourceUrl: "https://developers.google.com/merchant/ucp/guides/merchant-center",
  },
  {
    id: "json-ld",
    group: "find",
    weight: 6,
    prompt: "The product URL’s HTML includes Product structured data whose price and availability match the visible page.",
    partialMeans: "A Product node is present, and the price, currency, or availability disagrees with the HTML a person sees.",
    fix: "Put the same price and availability the page shows into the structured data on that URL. Google’s AI features page, last updated December 10, 2025 and read on this site November 9, says structured data should match the visible words, and that extra schema is not an extra requirement for AI Overviews. Matching markup still gives an agent a quote it can check against the feed.",
    sourceName: "Google Search Central, AI features and your website",
    sourceUrl: "https://developers.google.com/search/docs/appearance/ai-features",
  },
  {
    id: "oai-searchbot",
    group: "find",
    weight: 4,
    prompt: "robots.txt allows OAI-SearchBot.",
    partialMeans: "The token is allowed on some paths and disallowed on product URLs.",
    fix: "Allow OAI-SearchBot on the product URLs. OpenAI’s crawler docs, read November 12, 2026, say it surfaces sites in ChatGPT search. Sites that opt out are not shown in ChatGPT search answers, though they can still appear as navigational links. A robots.txt change can take about 24 hours to apply for search. GPTBot is the training crawler. The two settings are independent.",
    sourceName: "OpenAI, Overview of OpenAI crawlers, read November 12, 2026",
    sourceUrl: "https://developers.openai.com/api/docs/bots",
  },
  {
    id: "chatgpt-user",
    group: "find",
    weight: 4,
    prompt: "robots.txt does not disallow ChatGPT-User on product URLs.",
    partialMeans: "ChatGPT-User is blocked on some product paths and allowed on others.",
    fix: "Leave ChatGPT-User allowed if you want user-triggered fetches. The same OpenAI page says ChatGPT-User visits when a person asks, robots.txt rules may not apply, and it is not the switch for appearing in Search. Use OAI-SearchBot for that.",
    sourceName: "OpenAI, Overview of OpenAI crawlers, ChatGPT-User section, read November 12, 2026",
    sourceUrl: "https://developers.openai.com/api/docs/bots",
  },
  {
    id: "perplexitybot",
    group: "find",
    weight: 4,
    prompt: "robots.txt allows PerplexityBot.",
    partialMeans: "PerplexityBot is allowed on the homepage and disallowed on product URLs.",
    fix: "Allow PerplexityBot on the pages you want cited. Perplexity’s crawler page, read November 12, 2026, says PerplexityBot surfaces and links websites in Perplexity search and is not the crawler used for foundation-model training. Perplexity-User is the separate agent that visits a page when a person asks a question.",
    sourceName: "Perplexity crawlers, read November 12, 2026",
    sourceUrl: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers",
  },
  {
    id: "googlebot",
    group: "find",
    weight: 4,
    prompt: "robots.txt allows Googlebot to crawl product URLs.",
    partialMeans: "Googlebot can crawl the homepage and is blocked from product URLs.",
    fix: "Allow Googlebot on the product URLs. Google’s AI features page says Googlebot remains the crawler for Search, including AI Overviews and AI Mode. A Merchant Center feed does not replace that crawl for the ordinary page.",
    sourceName: "Google Search Central, AI features and your website",
    sourceUrl: "https://developers.google.com/search/docs/appearance/ai-features",
  },
  {
    id: "google-extended",
    group: "find",
    weight: 2,
    prompt: "The robots.txt choice for Google-Extended is written down, allow or disallow.",
    partialMeans: "Google-Extended is set, and nobody on the team can say why.",
    fix: "Record the choice. Google’s AI features page points at Google-Extended for limiting AI training and grounding in some of Google’s other systems. It is not the switch for AI Overviews, and allowing it is not a ranking boost. Googlebot is the Search crawler.",
    sourceName: "Google Search Central, AI features and your website",
    sourceUrl: "https://developers.google.com/search/docs/appearance/ai-features",
  },
  {
    id: "llms-txt",
    group: "find",
    weight: 2,
    prompt: "The site publishes /llms.txt, and every link in it is a real page.",
    partialMeans: "The file exists and lists pages that 404, or it claims a rank or a user count you cannot show.",
    fix: "Publish a Markdown file at /llms.txt that names the site and links to pages an agent can fetch. llmstxt.org describes that file. v2 is dated August 2026 and was read on this site November 9. Google’s AI features page does not list it as a requirement for AI Overviews. A file that invents a rating is still a claim on your domain.",
    sourceName: "llmstxt.org, the /llms.txt file",
    sourceUrl: "https://llmstxt.org/",
  },
  {
    id: "price-html",
    group: "read",
    weight: 10,
    prompt: "The selling price is in the HTML response, not only after JavaScript runs.",
    partialMeans: "A price is in the HTML, and the number the shopper sees after hydration is different.",
    fix: "Render the price in the first HTML response. An agent that does not execute the bundle cannot see a price that appears only after hydration. OpenAI’s feed price and this HTML price have to be the same number. When they disagree, the product page is what the store charges.",
    sourceName: "OpenAI product feed spec, price rule, read on this site November 10, 2026",
    sourceUrl: "https://developers.openai.com/commerce/specs/file-upload/products",
  },
  {
    id: "stock-html",
    group: "read",
    weight: 8,
    prompt: "Availability is in the HTML, using a value the feed also accepts.",
    partialMeans: "The page shows stock, and the feed says something else, or the HTML says unknown.",
    fix: "Use in_stock, out_of_stock, pre_order, backorder, or unknown, and use the same value in the feed. OpenAI’s spec says an omitted or unrecognized value rejects the row. unknown means the stock status was not supplied. It does not mean in stock.",
    sourceName: "OpenAI product feed spec, availability, read on this site November 10, 2026",
    sourceUrl: "https://developers.openai.com/commerce/specs/file-upload/products",
  },
  {
    id: "variant-url",
    group: "read",
    weight: 6,
    prompt: "Each purchasable variant has its own stable public HTTPS URL.",
    partialMeans: "Variants share one URL, or the URL changes when the sale price changes.",
    fix: "Give each variant its own item id and its own absolute HTTPS URL. OpenAI’s spec wants one row per variant, the same group id, listing_has_variations true, and a variant_dict of the selected options. A color picker that never changes the URL gives the agent one row for every color.",
    sourceName: "OpenAI product feed spec, variants, read on this site November 10, 2026",
    sourceUrl: "https://developers.openai.com/commerce/specs/file-upload/products",
  },
  {
    id: "guest-checkout",
    group: "pay",
    weight: 8,
    prompt: "A shopper can pay without creating an account.",
    partialMeans: "Guest checkout exists, and the payment step still forces a login, a captcha the agent cannot pass, or an app install.",
    fix: "Let the order finish without an account. A harness that cannot create a login cannot pass a wall. Guest checkout is your own checkout. It does not turn on ACP, UCP, Visa Intelligent Commerce, or Mastercard Agent Pay.",
    sourceName: "OpenAI merchant page, purchases finish on the merchant site, read on this site November 10, 2026",
    sourceUrl: "https://openai.com/chatgpt/search-product-discovery/",
  },
  {
    id: "ucp",
    group: "pay",
    weight: 8,
    prompt: "Eligible SKUs have native_commerce checkout eligibility set to true, and ineligible SKUs do not.",
    partialMeans: "The flag is true on a SKU Google’s guide lists as ineligible, or it is missing on an ordinary in-stock product.",
    fix: "Set native_commerce checkout eligibility to true only after the Merchant Center requirements are met, and only on eligible products. The guide says the flag defaults to false. Leave it empty or false for subscriptions, installments, personalized goods, refurbished, used, and final-sale items, pre-orders, bundled services, special shipping, gifting, in-store activation, age-restricted goods, prohibited content, services, rentals, virtual items, and goods that require software to be installed first. UCP’s latest GitHub release, in this site’s November 11 census, is still v2026-08-25.",
    sourceName: "Google UCP Merchant Center guide, and the November 11 protocol census",
    sourceUrl: "https://www.aiagentsinfo.com/research/agentic-commerce-protocol-adoption-november-2026",
  },
  {
    id: "acp",
    group: "pay",
    weight: 6,
    prompt: "OpenAI checkout is enabled for the merchant, not only the feed flag.",
    partialMeans: "is_eligible_checkout is true on rows, and the checkout integration is not enabled.",
    fix: "Enable the checkout integration before you set is_eligible_checkout. OpenAI’s spec says the flag does nothing until that integration is on, and it also asks for a public privacy URL and a public terms URL. The merchant page read November 10 says shopping is live for ChatGPT users in the United States and the purchase finishes on the merchant’s website or app. The protocol repo, maintained by OpenAI and Stripe, had no npm package in the November 11 census. The newest dated spec folder then was spec/2026-04-17.",
    sourceName: "OpenAI product feed spec, and the November 11 ACP census",
    sourceUrl: "https://developers.openai.com/commerce/specs/file-upload/products",
  },
  {
    id: "ap2",
    group: "pay",
    weight: 4,
    prompt: "If you implement Google’s Agent Payments Protocol, you install the git spec, not the unrelated PyPI name.",
    partialMeans: "A dependency named ap2 is installed, and it is not google-agentic-commerce/AP2.",
    fix: "Do not treat stars as a checkout button. On November 11, 2026, google-agentic-commerce/AP2 had 3,270 stars, the README still said a PyPI package comes later, and the install line was a git URL. The latest release was v0.2.0, published April 28, 2026. The PyPI project named ap2 points at github.com/whillhill/ap2. Mark yes only when the integration you run is the Google repository, pinned to a release, and you can say which payment it covers.",
    sourceName: "AP2 README, cited in the November 11 protocol census",
    sourceUrl: "https://github.com/google-agentic-commerce/AP2/blob/main/README.md",
  },
  {
    id: "visa",
    group: "pay",
    weight: 4,
    prompt: "Visa Intelligent Commerce is a signed integration, past sandbox, not a mention in a slide.",
    partialMeans: "You have a sandbox key, and production certification is not done.",
    fix: "Walk Visa’s path: sandbox, then certification, then production. The production-readiness page, read November 12, 2026, says production requires certification and that the agent provider is an approved ecosystem participant, with onboarding to the Trusted Agent Protocol, Visa Token Service, and Visa Payment Passkeys as the integration requires. A theme toggle is not that. Visa’s June 10, 2026 Payments Forum post describes Agent Score and an Agentic Directory. Those are Visa products. They are not a robots.txt line.",
    sourceName: "Visa Developer, Intelligent Commerce production readiness, read November 12, 2026",
    sourceUrl: "https://developer.visa.com/docs/visa-intelligent-commerce/production-readiness",
  },
  {
    id: "mastercard",
    group: "pay",
    weight: 4,
    prompt: "Mastercard Agent Pay is a documented integration for this store, and you know which product it is.",
    partialMeans: "A vendor mentioned Agent Pay, and you cannot point at a token, a registration, or a test transaction.",
    fix: "Separate the two products. Agent Pay, announced April 29, 2025, is tokenized payment for registered agents at merchants. Agent Pay for Machines, which Mastercard opened to early access on October 20, 2026, lets an agent pay for digital services such as models and APIs on top of x402, inside a budget a business set. A product checkout and a machine paying for an API are different integrations. Mark yes only for the one you have actually built.",
    sourceName: "Mastercard, Agent Pay for Machines, October 20, 2026, read November 12, 2026",
    sourceUrl:
      "https://www.mastercard.com/global/en/news-and-trends/press/2026/october/Mastercard-Agent-Pay-for-Machines-in-action.html",
  },
];

const weightTotal = readinessChecks.reduce((sum, check) => sum + check.weight, 0);
if (weightTotal !== 100) {
  throw new Error(`Shopping readiness weights sum to ${weightTotal}, not 100.`);
}
if (readinessChecks.length !== 18) {
  throw new Error(`Shopping readiness checklist has ${readinessChecks.length} rows, not 18.`);
}

export const readinessSources = [
  { name: "OpenAI, product feed specification", url: "https://developers.openai.com/commerce/specs/file-upload/products" },
  { name: "OpenAI, product discovery for merchants", url: "https://openai.com/chatgpt/search-product-discovery/" },
  { name: "OpenAI crawlers, read November 12, 2026", url: "https://developers.openai.com/api/docs/bots" },
  { name: "Perplexity crawlers, read November 12, 2026", url: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers" },
  { name: "Google Search Central, AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features" },
  { name: "Google, UCP Merchant Center guide", url: "https://developers.google.com/merchant/ucp/guides/merchant-center" },
  { name: "llmstxt.org", url: "https://llmstxt.org/" },
  { name: "Visa Intelligent Commerce, production readiness, read November 12, 2026", url: "https://developer.visa.com/docs/visa-intelligent-commerce/production-readiness" },
  { name: "Visa, Payments Forum, June 10, 2026", url: "https://corporate.visa.com/en/sites/visa-perspectives/company-news/visa-payments-forum-showcases-intelligent-programmable-commerce.html" },
  { name: "Mastercard Agent Pay announcement, April 29, 2025", url: "https://www.mastercard.com/us/en/news-and-trends/press/2025/april/mastercard-unveils-agent-pay-pioneering-agentic-payments-technology-to-power-commerce-in-the-age-of-ai.html" },
  { name: "Mastercard Agent Pay for Machines, October 20, 2026", url: "https://www.mastercard.com/global/en/news-and-trends/press/2026/october/Mastercard-Agent-Pay-for-Machines-in-action.html" },
  { name: "This site’s November 11 protocol census", url: "https://www.aiagentsinfo.com/research/agentic-commerce-protocol-adoption-november-2026" },
];

export function pointsFor(answer: ReadinessAnswer, weight: number) {
  if (answer === "yes") return weight;
  if (answer === "partial") return weight / 2;
  return 0;
}

export function readinessScore(answers: Record<string, ReadinessAnswer | undefined>) {
  let earned = 0;
  let answeredWeight = 0;
  let openWeight = 0;
  const gaps: (ReadinessCheck & { missing: number; answer: ReadinessAnswer })[] = [];
  for (const check of readinessChecks) {
    const answer = answers[check.id];
    if (!answer) {
      openWeight += check.weight;
      continue;
    }
    answeredWeight += check.weight;
    const got = pointsFor(answer, check.weight);
    earned += got;
    if (answer !== "yes") {
      gaps.push({ ...check, answer, missing: check.weight - got });
    }
  }
  gaps.sort((a, b) => b.missing - a.missing || b.weight - a.weight);
  const answeredCount = readinessChecks.filter((check) => answers[check.id]).length;
  return {
    earned,
    answeredWeight,
    openWeight,
    unanswered: readinessChecks.length - answeredCount,
    gaps,
  };
}

export function bandLabel(earned: number, openWeight: number) {
  if (openWeight > 0) {
    return `${openWeight} points are still blank. The number above counts only the rows you marked.`;
  }
  if (earned >= 90) return "The worksheet is full. It is still not a completed order.";
  if (earned >= 70) return "A harness can quote a row. Payment still depends on the channel you marked.";
  if (earned >= 40) return "Something on the site can be read. Checkout is still a handoff.";
  return "An agent can miss the product.";
}
