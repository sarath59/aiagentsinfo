/** AI crawler product tokens read on the operator's own page on 12 November 2026.
 *  A token that was not on that page is not in this list.
 */

export const BOTS_CHECKED = "2026-11-12";
export const BOTS_CHECKED_LABEL = "12 November 2026";

export type BotPurpose = "training" | "search" | "answer" | "ads" | "agent" | "corpus";

/** Whether the operator page says this token reads robots.txt. */
export type HonorsRobots = "yes" | "may-ignore" | "unstated";

export type AiBot = {
  token: string;
  operator: string;
  purpose: BotPurpose;
  /** One sentence from the operator page. Not a paraphrase that adds a claim. */
  summary: string;
  docTitle: string;
  docUrl: string;
  honorsRobots: HonorsRobots;
  /** False when the token is a robots.txt control and the operator says it does not fetch on its own. */
  fetches: boolean;
  caveat?: string;
};

export const purposeLabel: Record<BotPurpose, string> = {
  answer: "Answer fetch",
  search: "Search and indexing",
  training: "Training",
  corpus: "Open crawl corpus",
  agent: "Agent crawl",
  ads: "Ads review",
};

export const purposeOrder: BotPurpose[] = ["answer", "search", "training", "corpus", "agent", "ads"];

const OPENAI = "https://developers.openai.com/api/docs/bots";
const ANTHROPIC =
  "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler";
const GOOGLE_COMMON = "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers";
const GOOGLE_USER = "https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers";
const PERPLEXITY = "https://docs.perplexity.ai/docs/resources/perplexity-crawlers";
const APPLE = "https://support.apple.com/en-us/119829";
const META = "https://developers.facebook.com/docs/sharing/webmasters/web-crawlers";
const AMAZON = "https://developer.amazon.com/amazonbot";
const CC = "https://commoncrawl.org/ccbot";
const DUCK = "https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot";
const BYTEDANCE = "https://zhanzhang.toutiao.com/docs/intro/26899";
const AI2 = "https://allenai.org/crawler";
const YOU = "https://you.com/docs/youbot";
const DIFFBOT = "https://www.diffbot.com/docs/crawl/faq/robots-txt";
const COHERE = "https://docs.cohere.com/docs/cohere-web-crawlers";

export const aiBots: AiBot[] = [
  {
    token: "ChatGPT-User",
    operator: "OpenAI",
    purpose: "answer",
    summary:
      "Used when a person asks ChatGPT or a Custom GPT a question, or when a GPT Action runs. Not used to decide Search inclusion.",
    docTitle: "OpenAI, Overview of OpenAI Crawlers",
    docUrl: OPENAI,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "OpenAI says robots.txt rules may not apply, because a person started the fetch.",
  },
  {
    token: "Claude-User",
    operator: "Anthropic",
    purpose: "answer",
    summary: "Fetches a page when a person asks Claude a question. Anthropic says a block stops that retrieval.",
    docTitle: "Anthropic, Does Anthropic crawl data from the web?",
    docUrl: ANTHROPIC,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Anthropic says its bots honor robots.txt. A Disallow for Claude-User stops retrieval for a user question.",
  },
  {
    token: "Perplexity-User",
    operator: "Perplexity",
    purpose: "answer",
    summary: "Visits a page when a person asks Perplexity a question, so the answer can cite it. Not used to train foundation models.",
    docTitle: "Perplexity, Perplexity Crawlers",
    docUrl: PERPLEXITY,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "Perplexity says this fetcher generally ignores robots.txt, because a person requested the fetch.",
  },
  {
    token: "DuckAssistBot",
    operator: "DuckDuckGo",
    purpose: "answer",
    summary: "Crawls pages in real time for DuckDuckGo's AI-assisted answers, which cite sources. Not used to train models.",
    docTitle: "DuckDuckGo, DuckAssistBot",
    docUrl: DUCK,
    honorsRobots: "yes",
    fetches: true,
    caveat: "DuckDuckGo says a Disallow takes effect after 72 hours and does not change organic search rankings.",
  },
  {
    token: "Amzn-User",
    operator: "Amazon",
    purpose: "answer",
    summary: "Fetches live pages for user actions such as an Alexa question that needs current information. Not used to train generative models.",
    docTitle: "Amazon, Amazon Web Search crawlers",
    docUrl: AMAZON,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "Amazon says Amzn-User may not follow all robots.txt directives, because a person can start the fetch.",
  },
  {
    token: "Meta-ExternalFetcher",
    operator: "Meta",
    purpose: "answer",
    summary:
      "Fetches a link a person requested, including fetches that help Meta AI complete a task on a site. Meta says it may bypass robots.txt.",
    docTitle: "Meta, Web Crawlers",
    docUrl: META,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "Meta says Meta-ExternalFetcher may bypass robots.txt because a person requested the fetch.",
  },
  {
    token: "Google-GeminiNotebook",
    operator: "Google",
    purpose: "answer",
    summary: "Fetches a URL a person added as a source in Gemini Notebook. The former token Google-NotebookLM was supported until August 2026.",
    docTitle: "Google, User-triggered fetchers",
    docUrl: GOOGLE_USER,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "Google says user-triggered fetchers generally ignore robots.txt.",
  },
  {
    token: "Diffbot-User",
    operator: "Diffbot",
    purpose: "answer",
    summary: "Sent when a person browses a URL through Diffbot software. Diffbot says its crawler is not used to train generative models.",
    docTitle: "Diffbot, Does Diffbot respect robots.txt?",
    docUrl: DIFFBOT,
    honorsRobots: "unstated",
    fetches: true,
    caveat: "The page names Diffbot-User. It says Diffbot's web crawls honor disallow and crawl-delay. It does not say that about Diffbot-User.",
  },
  {
    token: "OAI-SearchBot",
    operator: "OpenAI",
    purpose: "search",
    summary: "Indexes pages for ChatGPT search. OpenAI says a site that opts out is not shown in ChatGPT search answers.",
    docTitle: "OpenAI, Overview of OpenAI Crawlers",
    docUrl: OPENAI,
    honorsRobots: "yes",
    fetches: true,
    caveat: "OpenAI says a robots.txt change can take about 24 hours to apply for search. The setting is independent of GPTBot.",
  },
  {
    token: "Claude-SearchBot",
    operator: "Anthropic",
    purpose: "search",
    summary: "Indexes pages to improve Claude search results. Anthropic says a block can reduce visibility in those results.",
    docTitle: "Anthropic, Does Anthropic crawl data from the web?",
    docUrl: ANTHROPIC,
    honorsRobots: "yes",
    fetches: true,
  },
  {
    token: "PerplexityBot",
    operator: "Perplexity",
    purpose: "search",
    summary: "Surfaces and links sites in Perplexity search. Perplexity says it is not used to train foundation models.",
    docTitle: "Perplexity, Perplexity Crawlers",
    docUrl: PERPLEXITY,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Perplexity says a robots.txt change can take up to 24 hours.",
  },
  {
    token: "Applebot",
    operator: "Apple",
    purpose: "search",
    summary:
      "Crawls for Spotlight, Siri, and Safari search. Apple says the same data may also train Apple foundation models, which Applebot-Extended controls.",
    docTitle: "Apple, About Applebot",
    docUrl: APPLE,
    honorsRobots: "yes",
    fetches: true,
    caveat:
      "If the file does not mention Applebot but mentions Googlebot, Apple says Applebot follows the Googlebot group. This checker shows that separately from the RFC 9309 match. Applebot does not follow crawl-delay.",
  },
  {
    token: "Amzn-SearchBot",
    operator: "Amazon",
    purpose: "search",
    summary: "Crawls for search in Amazon products, including Alexa. Amazon says it does not crawl for generative-model training.",
    docTitle: "Amazon, Amazon Web Search crawlers",
    docUrl: AMAZON,
    honorsRobots: "yes",
    fetches: true,
    caveat:
      "Amazon says that if the file does not mention Amzn-SearchBot but allows other search bots, Amzn-SearchBot follows those directives. This checker reports the Amzn-SearchBot group, or * if there is none.",
  },
  {
    token: "Meta-WebIndexer",
    operator: "Meta",
    purpose: "search",
    summary: "Crawls to improve Meta AI search. Meta says allowing the token helps Meta AI cite and link to the page.",
    docTitle: "Meta, Web Crawlers",
    docUrl: META,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Meta says a robots.txt change can take up to 24 hours.",
  },
  {
    token: "YouBot",
    operator: "You.com",
    purpose: "search",
    summary: "Indexes pages for You.com search. You.com says it respects robots.txt, including crawl-delay, and caches the file for 30 minutes.",
    docTitle: "You.com, YouBot",
    docUrl: YOU,
    honorsRobots: "yes",
    fetches: true,
  },
  {
    token: "Bytespider",
    operator: "ByteDance",
    purpose: "search",
    summary: "Toutiao Search's crawler. The webmaster page names the token Bytespider and describes it fetching pages for that index.",
    docTitle: "ByteDance, About Bytespider (Toutiao webmaster docs)",
    docUrl: BYTEDANCE,
    honorsRobots: "unstated",
    fetches: true,
    caveat: "The About Bytespider page does not say whether the crawler obeys robots.txt. The line in a file is a request.",
  },
  {
    token: "Diffbot",
    operator: "Diffbot",
    purpose: "search",
    summary:
      "Crawls for the Diffbot Knowledge Graph and web search. Diffbot says it is not used to train generative models, and that default crawls honor disallow and crawl-delay.",
    docTitle: "Diffbot, Does Diffbot respect robots.txt?",
    docUrl: DIFFBOT,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Diffbot says a partnership crawl can override robots.txt. The default crawl honors disallow and crawl-delay.",
  },
  {
    token: "GPTBot",
    operator: "OpenAI",
    purpose: "training",
    summary: "Crawls pages that may train OpenAI's generative foundation models. Independent of OAI-SearchBot.",
    docTitle: "OpenAI, Overview of OpenAI Crawlers",
    docUrl: OPENAI,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Disallowing GPTBot does not opt the site out of ChatGPT search. That switch is OAI-SearchBot.",
  },
  {
    token: "ClaudeBot",
    operator: "Anthropic",
    purpose: "training",
    summary: "Collects pages that may train Claude. Anthropic says a robots.txt rule that names ClaudeBot is more specific than a general no-training signal.",
    docTitle: "Anthropic, Does Anthropic crawl data from the web?",
    docUrl: ANTHROPIC,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Anthropic dates the training-preference note to 30 October 2026. A named ClaudeBot rule wins over that general signal.",
  },
  {
    token: "Google-Extended",
    operator: "Google",
    purpose: "training",
    summary:
      "Robots.txt token for using Google's crawl in future Gemini training and in grounding. Google says it has no separate HTTP user agent and does not affect Google Search.",
    docTitle: "Google, Common crawlers",
    docUrl: GOOGLE_COMMON,
    honorsRobots: "yes",
    fetches: false,
    caveat: "Not a fetcher. Blocking Google-Extended does not remove the site from Google Search, and it is not a ranking signal.",
  },
  {
    token: "Applebot-Extended",
    operator: "Apple",
    purpose: "training",
    summary: "Control token for using Applebot's crawl to train Apple foundation models. Apple says Applebot-Extended does not itself crawl.",
    docTitle: "Apple, About Applebot",
    docUrl: APPLE,
    honorsRobots: "yes",
    fetches: false,
    caveat: "Not a fetcher. A Disallow does not remove the site from Spotlight, Siri, or Safari. Applebot is the crawler.",
  },
  {
    token: "Amazonbot",
    operator: "Amazon",
    purpose: "training",
    summary: "Crawls to improve Amazon products and services. Amazon says the crawl may be used to train Amazon AI models.",
    docTitle: "Amazon, Amazon Web Search crawlers",
    docUrl: AMAZON,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Independent of Amzn-SearchBot. Amazon says a change can take about 24 hours. Amazon's crawlers do not support crawl-delay.",
  },
  {
    token: "Meta-ExternalAgent",
    operator: "Meta",
    purpose: "training",
    summary: "Crawls for training foundation models or for improving products by indexing content. Meta's robots.txt example names this token.",
    docTitle: "Meta, Web Crawlers",
    docUrl: META,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Meta says a robots.txt change can take up to 24 hours.",
  },
  {
    token: "AI2Bot",
    operator: "Allen Institute for AI",
    purpose: "training",
    summary: "Fetches pages Ai2 uses to train open language models. The published User-Agent contains the token AI2Bot.",
    docTitle: "Allen Institute for AI, Crawling notice",
    docUrl: AI2,
    honorsRobots: "unstated",
    fetches: true,
    caveat: "Ai2 says you can filter or reject that User-Agent. The page does not say the crawler reads robots.txt.",
  },
  {
    token: "CCBot",
    operator: "Common Crawl",
    purpose: "corpus",
    summary: "Common Crawl's bot. The foundation publishes an open web-crawl dataset. The page gives User-agent: CCBot and Disallow: / as the opt-out.",
    docTitle: "Common Crawl, CCBot",
    docUrl: CC,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Common Crawl warns that other clients spoof CCBot. A robots.txt line does not prove which client will obey it.",
  },
  {
    token: "Google-Agent",
    operator: "Google",
    purpose: "agent",
    summary: "Used by agents on Google infrastructure to open pages and take actions a person requested.",
    docTitle: "Google, User-triggered fetchers",
    docUrl: GOOGLE_USER,
    honorsRobots: "may-ignore",
    fetches: true,
    caveat: "Google says user-triggered fetchers generally ignore robots.txt. The token on the page is Google-Agent, with a hyphen.",
  },
  {
    token: "Google-CloudVertexBot",
    operator: "Google",
    purpose: "agent",
    summary: "Crawls a site owner requested for Vertex AI Agents. Google says the token does not affect Google Search.",
    docTitle: "Google, Common crawlers",
    docUrl: GOOGLE_COMMON,
    honorsRobots: "yes",
    fetches: true,
    caveat: "Google lists this with the common crawlers, which obey robots.txt on automatic crawls. It does not change Google Search.",
  },
  {
    token: "OAI-AdsBot",
    operator: "OpenAI",
    purpose: "ads",
    summary: "Visits a landing page submitted as a ChatGPT ad, to check policy and relevance. OpenAI says the data is not used to train models.",
    docTitle: "OpenAI, Overview of OpenAI Crawlers",
    docUrl: OPENAI,
    honorsRobots: "unstated",
    fetches: true,
    caveat: "OpenAI documents the token. The page does not say a robots.txt rule stops OAI-AdsBot the way it describes GPTBot and OAI-SearchBot.",
  },
  {
    token: "Meta-ExternalAds",
    operator: "Meta",
    purpose: "ads",
    summary: "Crawls for advertising and other business products. Meta's robots.txt example includes a meta-externalads group.",
    docTitle: "Meta, Web Crawlers",
    docUrl: META,
    honorsRobots: "yes",
    fetches: true,
  },
];

export const omittedTokens: { name: string; reason: string; url: string }[] = [
  {
    name: "cohere-ai",
    reason:
      "Cohere's crawler page says Cohere does not currently crawl for foundation-model training, and the bot table is empty. The example token Coherebot is a hypothetical, so it is not scored. The string cohere-ai is not on that page.",
    url: COHERE,
  },
  {
    name: "anthropic-ai",
    reason:
      "Anthropic's crawler help page names ClaudeBot, Claude-User, and Claude-SearchBot. It does not name anthropic-ai.",
    url: ANTHROPIC,
  },
  {
    name: "FacebookExternalHit",
    reason:
      "Meta documents it as the link-preview crawler for Facebook, Instagram, and Messenger, and says it might bypass robots.txt for security checks. It is not an AI training or answer crawler, so it is not in the score.",
    url: META,
  },
  {
    name: "Googlebot",
    reason:
      "Googlebot is the Search crawler. Google-Extended is the separate token for Gemini training and grounding. Google says Google-Extended does not affect inclusion in Google Search.",
    url: GOOGLE_COMMON,
  },
  {
    name: "Google-NotebookLM",
    reason:
      "Google's user-triggered fetchers page lists Google-NotebookLM as a former Gemini Notebook agent, supported until August 2026. The current token on that page is Google-GeminiNotebook.",
    url: GOOGLE_USER,
  },
];

export function botByToken(token: string) {
  const key = token.toLowerCase();
  return aiBots.find((bot) => bot.token.toLowerCase() === key);
}
