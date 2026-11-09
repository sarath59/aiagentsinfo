export const PRICE_READ_ON = "2026-11-09";

export const OPENAI_PRICING_URL = "https://developers.openai.com/api/docs/pricing";
export const ANTHROPIC_PRICING_URL = "https://platform.claude.com/docs/en/about-claude/pricing";
export const GOOGLE_PRICING_URL = "https://aistudio.google.com/docs/pricing";
export const XAI_PRICING_URL = "https://docs.x.ai/docs/models";

export type PriceBand = {
  /** Use this band when input tokens per task are at or below this number. The last band has no cap. */
  maxInputTokens?: number;
  inputPerMillion: number;
  outputPerMillion: number;
  label: string;
};

export type ModelPrice = {
  id: string;
  provider: "OpenAI" | "Anthropic" | "Google" | "xAI";
  label: string;
  sourceUrl: string;
  bands: PriceBand[];
  notes: string[];
};

const openaiLong =
  "OpenAI's pricing page, read November 9, 2026, defines short context as 272,000 input tokens or fewer and long context as more than that. This calculator switches at that line. It does not add the 10% regional or FedRAMP uplift, and it does not use cached, batch, flex, fast, or ultrafast prices.";

const xaiLong =
  "xAI's models page, read November 9, 2026, bills the higher rate for every token in a request once the prompt reaches 200,000 tokens. This calculator switches at that line. Cached-input prices are not used.";

const openaiSingle =
  "This model has one standard input price and one standard output price on the OpenAI page. A separate long-context price is not listed on that row. Cached, batch, flex, and fast prices are not used.";

export const modelPrices: ModelPrice[] = [
  {
    id: "gpt-6-astra",
    provider: "OpenAI",
    label: "gpt-6-astra",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 10, outputPerMillion: 50, label: "Short context" },
      { inputPerMillion: 20, outputPerMillion: 75, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-6.1-sol",
    provider: "OpenAI",
    label: "gpt-6.1-sol",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 2, outputPerMillion: 10, label: "Short context" },
      { inputPerMillion: 4, outputPerMillion: 15, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-6.1-terra",
    provider: "OpenAI",
    label: "gpt-6.1-terra",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 1, outputPerMillion: 5, label: "Short context" },
      { inputPerMillion: 2, outputPerMillion: 7.5, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-6-luna",
    provider: "OpenAI",
    label: "gpt-6-luna",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 0.1, outputPerMillion: 0.5, label: "Short context" },
      { inputPerMillion: 0.2, outputPerMillion: 0.75, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-6-sol",
    provider: "OpenAI",
    label: "gpt-6-sol",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 2, outputPerMillion: 10, label: "Short context" },
      { inputPerMillion: 4, outputPerMillion: 15, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-5.6-sol",
    provider: "OpenAI",
    label: "gpt-5.6-sol",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 4, outputPerMillion: 20, label: "Short context" },
      { inputPerMillion: 8, outputPerMillion: 30, label: "Long context" },
    ],
    notes: [
      openaiLong,
      "The same page says GPT-5.6 Sol’s promotional pricing is available until November 30, 2026. It does not print the price that applies after that date. The numbers here are the standard prices listed on November 9, 2026.",
    ],
  },
  {
    id: "gpt-5.6-terra",
    provider: "OpenAI",
    label: "gpt-5.6-terra",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 2, outputPerMillion: 12, label: "Short context" },
      { inputPerMillion: 4, outputPerMillion: 18, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-5.6-luna",
    provider: "OpenAI",
    label: "gpt-5.6-luna",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [
      { maxInputTokens: 272_000, inputPerMillion: 0.2, outputPerMillion: 1.2, label: "Short context" },
      { inputPerMillion: 0.4, outputPerMillion: 1.8, label: "Long context" },
    ],
    notes: [openaiLong],
  },
  {
    id: "gpt-5",
    provider: "OpenAI",
    label: "gpt-5",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [{ inputPerMillion: 1.25, outputPerMillion: 10, label: "Standard" }],
    notes: [openaiSingle],
  },
  {
    id: "gpt-5-mini",
    provider: "OpenAI",
    label: "gpt-5-mini",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [{ inputPerMillion: 0.25, outputPerMillion: 2, label: "Standard" }],
    notes: [openaiSingle],
  },
  {
    id: "gpt-5-nano",
    provider: "OpenAI",
    label: "gpt-5-nano",
    sourceUrl: OPENAI_PRICING_URL,
    bands: [{ inputPerMillion: 0.05, outputPerMillion: 0.4, label: "Standard" }],
    notes: [openaiSingle],
  },
  {
    id: "claude-opus-5-5",
    provider: "Anthropic",
    label: "Claude Opus 5.5",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [{ inputPerMillion: 4, outputPerMillion: 20, label: "Standard" }],
    notes: [
      "Anthropic's pricing page lists Claude Opus 5.5 at $4 per million input tokens and $20 per million output tokens. Cache writes, cache hits, and batch prices are not used.",
    ],
  },
  {
    id: "claude-sonnet-5-5",
    provider: "Anthropic",
    label: "Claude Sonnet 5.5",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [{ inputPerMillion: 2, outputPerMillion: 10, label: "Standard" }],
    notes: [
      "Anthropic's pricing page lists Claude Sonnet 5.5 at $2 per million input tokens and $10 per million output tokens. Cache writes, cache hits, and batch prices are not used.",
    ],
  },
  {
    id: "claude-haiku-5-5",
    provider: "Anthropic",
    label: "Claude Haiku 5.5",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [
      {
        maxInputTokens: 100_000,
        inputPerMillion: 0.1,
        outputPerMillion: 0.5,
        label: "Prompt up to 100,000 tokens",
      },
      {
        inputPerMillion: 0.5,
        outputPerMillion: 2.5,
        label: "Prompt over 100,000 tokens",
      },
    ],
    notes: [
      "Anthropic lists two standard prices for Claude Haiku 5.5. Prompts up to 100,000 tokens are $0.10 input and $0.50 output per million tokens. Prompts over 100,000 tokens are $0.50 and $2.50. The switch uses the input-token box as the prompt size.",
    ],
  },
  {
    id: "claude-opus-5",
    provider: "Anthropic",
    label: "Claude Opus 5",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [{ inputPerMillion: 5, outputPerMillion: 25, label: "Standard" }],
    notes: [
      "Anthropic's pricing page lists Claude Opus 5 at $5 per million input tokens and $25 per million output tokens.",
    ],
  },
  {
    id: "claude-sonnet-5",
    provider: "Anthropic",
    label: "Claude Sonnet 5",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [{ inputPerMillion: 2, outputPerMillion: 10, label: "Standard" }],
    notes: [
      "Anthropic's pricing page says the $2 input and $10 output price for Claude Sonnet 5, first announced as introductory pricing through August 31, 2026, is now the standard price. The scheduled increase to $3 and $15 on September 1, 2026 did not happen.",
    ],
  },
  {
    id: "claude-fable-5-1",
    provider: "Anthropic",
    label: "Claude Fable 5.1",
    sourceUrl: ANTHROPIC_PRICING_URL,
    bands: [{ inputPerMillion: 10, outputPerMillion: 50, label: "Standard" }],
    notes: [
      "Anthropic's pricing page lists Claude Fable 5.1 at $10 per million input tokens and $50 per million output tokens.",
    ],
  },
  {
    id: "gemini-4-argon",
    provider: "Google",
    label: "Gemini 4 Argon",
    sourceUrl: GOOGLE_PRICING_URL,
    bands: [{ inputPerMillion: 2, outputPerMillion: 10, label: "Paid standard, through November 30, 2026" }],
    notes: [
      "Google's Gemini API pricing page lists Gemini 4 Argon paid standard input at $2 per million tokens through November 30, 2026, and $4 starting December 1, 2026. Output, including thinking tokens, is $10 through November 30, 2026, and $20 starting December 1, 2026. This calculator uses the November 9 price and does not change itself on December 1. The page that served these prices is aistudio.google.com/docs/pricing. The older developer URL redirects there.",
      "The output price includes thinking tokens. If you want those counted, put them in the output box. Search grounding is a separate per-query fee and is not included.",
    ],
  },
  {
    id: "gemini-3.8-flash",
    provider: "Google",
    label: "Gemini 3.8 Flash",
    sourceUrl: GOOGLE_PRICING_URL,
    bands: [{ inputPerMillion: 0.75, outputPerMillion: 3.75, label: "Paid standard, through December 31, 2026" }],
    notes: [
      "Google's Gemini API pricing page lists Gemini 3.8 Flash paid standard input at $0.75 per million tokens through December 31, 2026, and $1.50 starting January 1, 2027. Output, including thinking tokens, is $3.75 through December 31, 2026, and $7.50 starting January 1, 2027. This calculator uses the November 9 price.",
      "The output price includes thinking tokens. Search grounding is not included.",
      "The page that served these prices on November 9, 2026 is aistudio.google.com/docs/pricing. The older developer URL redirects there.",
    ],
  },
  {
    id: "grok-4.7",
    provider: "xAI",
    label: "grok-4.7",
    sourceUrl: XAI_PRICING_URL,
    bands: [
      { maxInputTokens: 199_999, inputPerMillion: 2, outputPerMillion: 6, label: "Prompt under 200,000 tokens" },
      { inputPerMillion: 4, outputPerMillion: 12, label: "Prompt of 200,000 tokens or more" },
    ],
    notes: [
      xaiLong,
      "xAI's models page says Grok 4.7 is the model to use for code and chat. The knowledge cut-off printed on that page is May 2026.",
    ],
  },
  {
    id: "grok-build-0.1",
    provider: "xAI",
    label: "grok-build-0.1",
    sourceUrl: XAI_PRICING_URL,
    bands: [
      { maxInputTokens: 199_999, inputPerMillion: 1, outputPerMillion: 2, label: "Prompt under 200,000 tokens" },
      { inputPerMillion: 2, outputPerMillion: 4, label: "Prompt of 200,000 tokens or more" },
    ],
    notes: [xaiLong],
  },
];

export function modelById(id: string) {
  return modelPrices.find((model) => model.id === id) ?? modelPrices[0];
}

export function bandFor(model: ModelPrice, inputTokens: number) {
  return (
    model.bands.find((band) => band.maxInputTokens == null || inputTokens <= band.maxInputTokens) ??
    model.bands[model.bands.length - 1]
  );
}

/** 30-day cost from official per-million token prices. Returns null when the inputs are not usable. */
export function thirtyDayCost(model: ModelPrice, inputTokens: number, outputTokens: number, tasksPerDay: number) {
  if (![inputTokens, outputTokens, tasksPerDay].every((value) => Number.isFinite(value) && value >= 0)) return null;
  if (inputTokens > 10_000_000 || outputTokens > 10_000_000 || tasksPerDay > 100_000) return null;
  const band = bandFor(model, inputTokens);
  const perTask = (inputTokens * band.inputPerMillion + outputTokens * band.outputPerMillion) / 1_000_000;
  const perDay = perTask * tasksPerDay;
  return { band, perTask, perDay, thirtyDay: perDay * 30 };
}
