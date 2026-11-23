/**
 * Named AI / search / training agents we track from User-Agent.
 * Longer tokens are matched first so Applebot-Extended wins over Applebot.
 * Includes tokens from lib/robots/bots.ts plus common agents not on that robots page.
 */

export type BotPurpose = "answer" | "search" | "training" | "agent" | "corpus" | "ads" | "other";

export type TrackedBot = {
  token: string;
  operator: string;
  purpose: BotPurpose;
  /** Lowercase substrings that identify this bot in a User-Agent. First listed is preferred. */
  needles: string[];
};

export const trackedBots: TrackedBot[] = [
  // OpenAI
  { token: "ChatGPT-User", operator: "OpenAI", purpose: "answer", needles: ["chatgpt-user"] },
  { token: "OAI-SearchBot", operator: "OpenAI", purpose: "search", needles: ["oai-searchbot"] },
  { token: "OAI-AdsBot", operator: "OpenAI", purpose: "ads", needles: ["oai-adsbot"] },
  { token: "GPTBot", operator: "OpenAI", purpose: "training", needles: ["gptbot"] },

  // Anthropic
  { token: "Claude-User", operator: "Anthropic", purpose: "answer", needles: ["claude-user"] },
  { token: "Claude-SearchBot", operator: "Anthropic", purpose: "search", needles: ["claude-searchbot"] },
  { token: "ClaudeBot", operator: "Anthropic", purpose: "training", needles: ["claudebot"] },

  // Perplexity
  { token: "Perplexity-User", operator: "Perplexity", purpose: "answer", needles: ["perplexity-user"] },
  { token: "PerplexityBot", operator: "Perplexity", purpose: "search", needles: ["perplexitybot"] },

  // Google (named agents before generic Googlebot)
  { token: "Google-GeminiNotebook", operator: "Google", purpose: "answer", needles: ["google-gemininotebook", "google-notebooklm"] },
  { token: "Google-CloudVertexBot", operator: "Google", purpose: "agent", needles: ["google-cloudvertexbot"] },
  { token: "Google-InspectionTool", operator: "Google", purpose: "search", needles: ["google-inspectiontool"] },
  { token: "Google-Read-Aloud", operator: "Google", purpose: "answer", needles: ["google-read-aloud"] },
  { token: "Google-Agent", operator: "Google", purpose: "agent", needles: ["google-agent"] },
  { token: "GoogleAgent", operator: "Google", purpose: "agent", needles: ["googleagent"] },
  { token: "GoogleOther", operator: "Google", purpose: "training", needles: ["googleother"] },
  { token: "Googlebot", operator: "Google", purpose: "search", needles: ["googlebot"] },

  // Microsoft
  { token: "Bingbot", operator: "Microsoft", purpose: "search", needles: ["bingbot"] },
  { token: "msnbot", operator: "Microsoft", purpose: "search", needles: ["msnbot"] },
  { token: "Copilot", operator: "Microsoft", purpose: "answer", needles: ["copilot"] },

  // Apple
  { token: "Applebot-Extended", operator: "Apple", purpose: "training", needles: ["applebot-extended"] },
  { token: "Applebot", operator: "Apple", purpose: "search", needles: ["applebot"] },

  // Amazon
  { token: "Amzn-SearchBot", operator: "Amazon", purpose: "search", needles: ["amzn-searchbot"] },
  { token: "Amzn-User", operator: "Amazon", purpose: "answer", needles: ["amzn-user"] },
  { token: "Amazonbot", operator: "Amazon", purpose: "training", needles: ["amazonbot"] },

  // DuckDuckGo / You / Diffbot
  { token: "DuckAssistBot", operator: "DuckDuckGo", purpose: "answer", needles: ["duckassistbot"] },
  { token: "YouBot", operator: "You.com", purpose: "search", needles: ["youbot"] },
  { token: "Diffbot-User", operator: "Diffbot", purpose: "answer", needles: ["diffbot-user"] },
  { token: "Diffbot", operator: "Diffbot", purpose: "search", needles: ["diffbot"] },

  // Meta
  { token: "Meta-ExternalFetcher", operator: "Meta", purpose: "answer", needles: ["meta-externalfetcher"] },
  { token: "Meta-ExternalAgent", operator: "Meta", purpose: "training", needles: ["meta-externalagent"] },
  { token: "Meta-ExternalAds", operator: "Meta", purpose: "ads", needles: ["meta-externalads"] },
  { token: "Meta-WebIndexer", operator: "Meta", purpose: "search", needles: ["meta-webindexer"] },
  { token: "FacebookBot", operator: "Meta", purpose: "other", needles: ["facebookbot"] },

  // xAI
  { token: "xAI-SearchBot", operator: "xAI", purpose: "answer", needles: ["xai-searchbot"] },
  { token: "Grok-DeepSearch", operator: "xAI", purpose: "answer", needles: ["grok-deepsearch"] },
  { token: "xAI-Web-Crawler", operator: "xAI", purpose: "other", needles: ["xai-web-crawler"] },
  { token: "xAI-Grok", operator: "xAI", purpose: "other", needles: ["xai-grok"] },
  { token: "xAI-Bot", operator: "xAI", purpose: "other", needles: ["xai-bot"] },
  { token: "GrokBot", operator: "xAI", purpose: "other", needles: ["grokbot"] },

  // Mistral / Moonshot / ByteDance / Baidu / Alibaba / others
  { token: "MistralAI-User", operator: "Mistral", purpose: "answer", needles: ["mistralai-user"] },
  { token: "MistralAI-Index", operator: "Mistral", purpose: "search", needles: ["mistralai-index"] },
  { token: "Kimi-User", operator: "Moonshot AI", purpose: "answer", needles: ["kimi-user"] },
  { token: "Kimi-SearchBot", operator: "Moonshot AI", purpose: "search", needles: ["kimi-searchbot"] },
  { token: "KimiBot", operator: "Moonshot AI", purpose: "training", needles: ["kimibot"] },
  { token: "Bytespider", operator: "ByteDance", purpose: "search", needles: ["bytespider"] },
  { token: "Doubaobot", operator: "ByteDance", purpose: "other", needles: ["doubaobot"] },
  { token: "TikTokSpider", operator: "ByteDance", purpose: "search", needles: ["tiktokspider"] },
  { token: "ERNIEBot", operator: "Baidu", purpose: "training", needles: ["erniebot"] },
  { token: "YiyanBot", operator: "Baidu", purpose: "other", needles: ["yiyanbot"] },
  { token: "Baiduspider", operator: "Baidu", purpose: "search", needles: ["baiduspider"] },
  { token: "Qwen-User", operator: "Alibaba", purpose: "answer", needles: ["qwen-user"] },
  { token: "QwenBot", operator: "Alibaba", purpose: "training", needles: ["qwenbot"] },
  { token: "TongyiBot", operator: "Alibaba", purpose: "other", needles: ["tongyibot"] },
  { token: "AliyunBot", operator: "Alibaba", purpose: "other", needles: ["aliyunbot"] },
  { token: "ChatGLM-Spider", operator: "Zhipu AI", purpose: "training", needles: ["chatglm-spider"] },
  { token: "DeepSeekBot", operator: "DeepSeek", purpose: "training", needles: ["deepseekbot"] },
  { token: "cohere-training-data-crawler", operator: "Cohere", purpose: "training", needles: ["cohere-training-data-crawler"] },
  { token: "cohere-ai", operator: "Cohere", purpose: "training", needles: ["cohere-ai"] },
  { token: "AI2Bot", operator: "Allen Institute for AI", purpose: "training", needles: ["ai2bot"] },
  { token: "CCBot", operator: "Common Crawl", purpose: "corpus", needles: ["ccbot"] },
];

/** Precomputed: longest needle first so specific tokens win. */
export const matchOrder: { bot: TrackedBot; needle: string }[] = trackedBots
  .flatMap((bot) => bot.needles.map((needle) => ({ bot, needle })))
  .sort((a, b) => b.needle.length - a.needle.length || a.needle.localeCompare(b.needle));
