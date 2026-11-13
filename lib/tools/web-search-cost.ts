import { bandFor, modelById, modelPrices, type ModelPrice } from "@/lib/model-prices";

/** Vendor pages re-read on this UTC date. A figure dated earlier is a token count, not a price. */
export const SEARCH_PRICE_CHECKED = "2026-11-13";
export const DAYS = 30;

export const searchToolPath = "/tools/web-search-api-cost-per-agent-task";

const OPENAI_PRICING = "https://developers.openai.com/api/docs/pricing";
const OPENAI_GUIDE = "https://developers.openai.com/api/docs/guides/tools-web-search";
const ANTHROPIC_PRICING = "https://platform.claude.com/docs/en/about-claude/pricing";
const ANTHROPIC_TOOL = "https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool";
const GEMINI_PRICING = "https://ai.google.dev/gemini-api/docs/pricing";
const GEMINI_SEARCH = "https://ai.google.dev/gemini-api/docs/google-search";
const TAVILY = "https://docs.tavily.com/documentation/api-credits";
const EXA = "https://exa.ai/docs/admin/pricing";
const BRAVE = "https://brave.com/search/api/";
const PERPLEXITY = "https://docs.perplexity.ai/docs/getting-started/pricing";
const PERPLEXITY_MODELS = "https://docs.perplexity.ai/docs/agent-api/models";
const SERPAPI = "https://serpapi.com/pricing";
const TOKEN_POST = "https://www.aiagentsinfo.com/blog/web-search-tool-definition-tokens";

export const sonarPrice: ModelPrice = {
  id: "perplexity-sonar",
  provider: "OpenAI",
  label: "perplexity/sonar",
  sourceUrl: PERPLEXITY_MODELS,
  bands: [{ inputPerMillion: 0.25, outputPerMillion: 2.5, label: "Agent API list price" }],
  notes: [
    "Perplexity’s Agent API models page, read November 13, 2026, lists perplexity/sonar at $0.25 per million input tokens and $2.50 per million output tokens. Cache-read at $0.0625 is not used.",
  ],
};

export function searchModelById(id: string): ModelPrice {
  if (id === sonarPrice.id) return sonarPrice;
  return modelById(id);
}

export function searchModelGroups() {
  const groups = ["OpenAI", "Anthropic", "Google", "xAI"] as const;
  return [
    ...groups.map((provider) => ({
      provider,
      models: modelPrices.filter((model) => model.provider === provider),
    })),
    { provider: "Perplexity", models: [sonarPrice] },
  ];
}

type ResultPolicy = "model" | "none" | "sonar";

export type SearchMode = {
  id: string;
  label: string;
  /** Dollars per search call before extra results. */
  perCall: number;
  /** Dollars per result past includedResults. */
  extraPerResult: number;
  includedResults: number;
  /** Credits consumed per call, when the allowance is in credits. */
  creditsPerCall?: number;
  /** Queries past this many per day are outside the published cap and are not priced. */
  dailyCap?: number;
};

type Allowance =
  | { kind: "none" }
  | { kind: "requests"; requests: number }
  | { kind: "usd"; usd: number }
  | { kind: "credits"; credits: number; perCredit: number };

export type SearchApi = {
  id: string;
  name: string;
  sourceUrl: string;
  sourceLabel: string;
  modes: SearchMode[];
  defaultMode: string;
  /** tiktoken o200k_base of the tool text. Null means this page has no measurement. */
  definitionTokens: number | null;
  definitionNote: string;
  resultPolicy: ResultPolicy;
  allowance: Allowance;
  callNote: string;
};

export const searchApis: SearchApi[] = [
  {
    id: "openai-web-search",
    name: "OpenAI web search",
    sourceUrl: OPENAI_PRICING,
    sourceLabel: "OpenAI API pricing",
    modes: [
      { id: "web_search", label: "web_search, $10 / 1,000", perCall: 0.01, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      {
        id: "preview-other",
        label: "preview on non-reasoning models, $25 / 1,000, content tokens free",
        perCall: 0.025,
        extraPerResult: 0,
        includedResults: Number.POSITIVE_INFINITY,
      },
    ],
    defaultMode: "web_search",
    definitionTokens: 8,
    definitionNote:
      "Recounted November 13, 2026: tiktoken o200k_base of [{\"type\":\"web_search\"}] is 8 tokens. The object alone is 6. The web search guide still says new Responses integrations send {\"type\":\"web_search\"}.",
    resultPolicy: "model",
    allowance: { kind: "none" },
    callNote:
      "OpenAI’s pricing page, read November 13, 2026: web search is $10.00 per 1,000 calls plus search-content tokens at model rates. Preview on non-reasoning models is $25.00 per 1,000 and those content tokens are free. gpt-4o-mini and gpt-4.1-mini are not in this model list. On those two, the same page bills non-preview search content as a fixed 8,000 input tokens. This calculator does not apply that block.",
  },
  {
    id: "anthropic-web-search",
    name: "Anthropic web search",
    sourceUrl: ANTHROPIC_PRICING,
    sourceLabel: "Anthropic API pricing",
    modes: [
      { id: "web_search", label: "$10 / 1,000 searches", perCall: 0.01, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
    ],
    defaultMode: "web_search",
    definitionTokens: 17,
    definitionNote:
      "Recounted November 13, 2026: tiktoken o200k_base of [{\"type\":\"web_search_20260318\",\"name\":\"web_search\"}] is 17 tokens. The object alone is 15. The tool page’s current examples use that type.",
    resultPolicy: "model",
    allowance: { kind: "none" },
    callNote:
      "Anthropic’s pricing page, read November 13, 2026: web search is $10 USD per 1,000 searches, plus standard token costs for search-generated content. A search that fails with an error is not billed. The tool page says cited_text, title, and url do not count as tokens. Put only the counted text in the tokens-per-result box. This calculator assumes every search succeeds.",
  },
  {
    id: "gemini-grounding",
    name: "Gemini grounding with Google Search",
    sourceUrl: GEMINI_PRICING,
    sourceLabel: "Gemini API pricing",
    modes: [
      {
        id: "gemini-3",
        label: "Gemini 3 and newer, $14 / 1,000 queries",
        perCall: 0.014,
        extraPerResult: 0,
        includedResults: Number.POSITIVE_INFINITY,
        dailyCap: 1500,
      },
      {
        id: "gemini-2-5",
        label: "Gemini 2.5, $35 / 1,000 grounded prompts",
        perCall: 0.035,
        extraPerResult: 0,
        includedResults: Number.POSITIVE_INFINITY,
      },
    ],
    defaultMode: "gemini-3",
    definitionTokens: null,
    definitionNote: "Google does not publish the tool-definition token count. It is not in this total.",
    resultPolicy: "none",
    allowance: { kind: "requests", requests: 5000 },
    callNote:
      "Gemini API pricing, read November 13, 2026: Gemini 3 and newer grounding is 5,000 free search requests a month, shared across those models, then $14 per 1,000, with a daily cap of 1,500. The grounding guide says Gemini 3 bills each search query the model executes. Gemini 2.5 on the pricing page is 1,500 requests a day free, then $35 per 1,000 grounded prompts. The same pricing page says Search Grounding retrieved tokens are excluded. This row does not add result tokens. The 2.5 free daily allowance is not the 5,000 monthly allowance, so the free-tier toggle subtracts 5,000 only on the Gemini 3 row.",
  },
  {
    id: "tavily",
    name: "Tavily Search",
    sourceUrl: TAVILY,
    sourceLabel: "Tavily credits and pricing",
    modes: [
      { id: "basic-payg", label: "Basic, pay as you go, 1 credit at $0.008", perCall: 0.008, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY, creditsPerCall: 1 },
      { id: "advanced-payg", label: "Advanced, pay as you go, 2 credits at $0.008", perCall: 0.016, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY, creditsPerCall: 2 },
      { id: "basic-project", label: "Basic, Project plan, 1 credit at $0.0075", perCall: 0.0075, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY, creditsPerCall: 1 },
    ],
    defaultMode: "basic-payg",
    definitionTokens: 862,
    definitionNote:
      "tavily_search alone was 862 tokens on November 11, 2026, sliced from the keyless tools list in tavily-mcp 0.2.23. Not remeasured November 13.",
    resultPolicy: "model",
    allowance: { kind: "credits", credits: 1000, perCredit: 0.008 },
    callNote:
      "Tavily’s credits page, read November 13, 2026: basic search is 1 credit a request and advanced is 2. Pay as you go is $0.008 a credit. Project is $30 for 4,000 credits, which the page prints as $0.0075 a credit. The free Researcher plan is 1,000 credits a month. The page prices the request, not each result. The 1,000-credit toggle applies only to the $0.008 rows.",
  },
  {
    id: "exa",
    name: "Exa /search",
    sourceUrl: EXA,
    sourceLabel: "Exa pricing",
    modes: [
      { id: "lite", label: "lite or instant, $4 / 1,000 for up to 10 results", perCall: 0.004, extraPerResult: 0.001, includedResults: 10 },
      { id: "auto", label: "auto or fast, $7 / 1,000 for up to 10 results", perCall: 0.007, extraPerResult: 0.001, includedResults: 10 },
    ],
    defaultMode: "lite",
    definitionTokens: 348,
    definitionNote:
      "Exa’s hosted tools/list with ?tools=web_search_exa was 348 tokens on November 11, 2026, server 3.5.0. Not remeasured November 13. That list does not name lite or auto.",
    resultPolicy: "model",
    allowance: { kind: "usd", usd: 10 },
    callNote:
      "Exa’s pricing page, read November 13, 2026: /search lite and instant are $4 per 1,000 requests for up to 10 results. Auto and fast are $7. Each result past 10 is $1 per 1,000 results. The free tier is $10 in credits, reset on the first of the month. Page-summary prices are a separate column and are not added here.",
  },
  {
    id: "brave",
    name: "Brave Search API",
    sourceUrl: BRAVE,
    sourceLabel: "Brave Search API plans",
    modes: [
      { id: "search", label: "Search, $5 / 1,000 requests", perCall: 0.005, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
    ],
    defaultMode: "search",
    definitionTokens: 1400,
    definitionNote:
      "brave_web_search alone was 1,400 tokens on November 11, 2026, from @brave/brave-search-mcp-server 2.1.4. The eight-tool list was 25,495. Not remeasured November 13. This row uses the search tool only.",
    resultPolicy: "model",
    allowance: { kind: "usd", usd: 5 },
    callNote:
      "Brave’s Search API plans page, read November 13, 2026: Search is $5 per 1,000 requests, up to 50 queries a second, and includes $5 in free credits every month. The request price does not change with the result count. Answers, at $4 per 1,000 plus token rates, are a different plan and are not this row.",
  },
  {
    id: "perplexity-search",
    name: "Perplexity Search API",
    sourceUrl: PERPLEXITY,
    sourceLabel: "Perplexity pricing",
    modes: [
      { id: "standard", label: "Search API, $5 / 1,000 requests", perCall: 0.005, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      { id: "fast", label: "Fast Search, $1 / 1,000 requests", perCall: 0.001, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
    ],
    defaultMode: "standard",
    definitionTokens: null,
    definitionNote: "Perplexity does not publish a tool-definition token count for the Search API. It is not in this total.",
    resultPolicy: "model",
    allowance: { kind: "none" },
    callNote:
      "Perplexity’s pricing page, read November 13, 2026: the Search API is $5.00 per 1,000 successful requests, or $1.00 with search_type fast. Up to five queries in one request are one bill. Extracted text does not change that price, and Perplexity adds no model tokens. Snippets you then put into another model are that model’s input. This row prices one request per search you enter, not a five-query bundle.",
  },
  {
    id: "perplexity-agent",
    name: "Perplexity Agent web_search",
    sourceUrl: PERPLEXITY,
    sourceLabel: "Perplexity pricing, Agent API tools",
    modes: [
      { id: "standard", label: "web_search, $2.50 / 1,000 invocations", perCall: 0.0025, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      { id: "fast", label: "web_search fast, $1 / 1,000 invocations", perCall: 0.001, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
    ],
    defaultMode: "standard",
    definitionTokens: null,
    definitionNote: "The Agent API pricing table does not publish a tool-definition token count. It is not in this total.",
    resultPolicy: "sonar",
    allowance: { kind: "none" },
    callNote:
      "The same Perplexity pricing page lists Agent API web_search at $0.0025 an invocation, or $0.001 with fast. That fee is separate from model tokens. Result text on this row is priced at perplexity/sonar, $0.25 and $2.50 per million, from the models page read the same day. Sonar Chat Completions is not a row here.",
  },
  {
    id: "serpapi",
    name: "SerpAPI",
    sourceUrl: SERPAPI,
    sourceLabel: "SerpAPI pricing",
    modes: [
      { id: "free", label: "Free, $0 for 250 searches", perCall: 0, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      { id: "starter", label: "Starter, $25 for 1,000 searches", perCall: 0.025, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      { id: "developer", label: "Developer, $75 for 5,000 searches", perCall: 0.015, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
      { id: "production", label: "Production, $150 for 15,000 searches", perCall: 0.01, extraPerResult: 0, includedResults: Number.POSITIVE_INFINITY },
    ],
    defaultMode: "starter",
    definitionTokens: null,
    definitionNote: "SerpAPI does not publish a tool-definition token count. It is not in this total.",
    resultPolicy: "model",
    allowance: { kind: "none" },
    callNote:
      "SerpAPI’s pricing page, read November 13, 2026, sells monthly plans: Free 250 searches, Starter $25 for 1,000, Developer $75 for 5,000, Production $150 for 15,000. The page does not print an overage rate. The per-search figures on Starter, Developer, and Production are plan price divided by included searches, and they apply only if you use the whole plan. This calculator charges the plan price when the month’s searches fit, and refuses to price searches past the plan.",
  },
];

const serpPlans: Record<string, { price: number; included: number }> = {
  free: { price: 0, included: 250 },
  starter: { price: 25, included: 1000 },
  developer: { price: 75, included: 5000 },
  production: { price: 150, included: 15000 },
};

export type SearchInputs = {
  searchesPerTask: number;
  resultsPerSearch: number;
  tokensPerResult: number;
  tasksPerDay: number;
  outputTokensPerTask: number;
  modelId: string;
  applyAllowance: boolean;
};

export type SearchLine = {
  id: string;
  name: string;
  modeLabel: string;
  sourceUrl: string;
  sourceLabel: string;
  callPerTask: number;
  callMonth: number;
  definitionTokens: number | null;
  resultTokens: number;
  inputTokens: number;
  tokenPerTask: number;
  tokenMonth: number;
  perTask: number;
  month: number;
  notes: string[];
  /** True when part of the call volume has no published price. */
  partial: boolean;
};

export function searchApiById(id: string) {
  return searchApis.find((api) => api.id === id) ?? searchApis[0];
}

export function modeById(api: SearchApi, modeId: string) {
  return api.modes.find((mode) => mode.id === modeId) ?? api.modes[0];
}

function usable(inputs: SearchInputs) {
  const values = [
    inputs.searchesPerTask,
    inputs.resultsPerSearch,
    inputs.tokensPerResult,
    inputs.tasksPerDay,
    inputs.outputTokensPerTask,
  ];
  if (!values.every((value) => Number.isFinite(value) && value >= 0)) return false;
  if (inputs.searchesPerTask > 1_000 || inputs.resultsPerSearch > 100) return false;
  if (inputs.tokensPerResult > 100_000 || inputs.outputTokensPerTask > 10_000_000 || inputs.tasksPerDay > 100_000) return false;
  return true;
}

function tokenCost(model: ModelPrice, inputTokens: number, outputTokens: number) {
  const band = bandFor(model, inputTokens);
  const perTask = (inputTokens * band.inputPerMillion + outputTokens * band.outputPerMillion) / 1_000_000;
  return { band, perTask };
}

function callCost(api: SearchApi, mode: SearchMode, inputs: SearchInputs, monthlySearches: number) {
  const notes: string[] = [];
  let billable = monthlySearches;
  if (mode.dailyCap != null && inputs.tasksPerDay > 0) {
    const daily = inputs.searchesPerTask * inputs.tasksPerDay;
    if (daily > mode.dailyCap) {
      billable = mode.dailyCap * DAYS;
      notes.push(
        `${formatCount(daily)} queries a day is above the published cap of ${formatCount(mode.dailyCap)}. Only ${formatCount(mode.dailyCap)} a day are priced. The rest have no published price.`,
      );
    }
  }

  if (api.id === "serpapi") {
    const plan = serpPlans[mode.id];
    if (!plan) return { callMonth: 0, notes: ["That SerpAPI plan is not on the page read November 13."], partial: true };
    if (monthlySearches > plan.included) {
      notes.push(
        `${formatCount(monthlySearches)} searches in 30 days is past the ${formatCount(plan.included)} included in ${mode.label}. The $${plan.price} plan price is shown. Searches past the plan are not priced.`,
      );
      return { callMonth: plan.price, notes, partial: true };
    }
    notes.push(
      monthlySearches === plan.included
        ? "The month uses every included search, so the plan price and the divided rate match."
        : `You still pay the plan price. ${formatCount(monthlySearches)} searches are inside ${formatCount(plan.included)}.`,
    );
    return { callMonth: plan.price, notes, partial: false };
  }

  const extraResults = Math.max(0, inputs.resultsPerSearch - mode.includedResults);
  const perSearch = mode.perCall + extraResults * mode.extraPerResult;
  let callMonth = billable * perSearch;

  if (inputs.applyAllowance && api.allowance.kind === "requests" && mode.id === "gemini-3") {
    const covered = Math.min(billable, api.allowance.requests);
    callMonth = Math.max(0, billable - api.allowance.requests) * perSearch;
    notes.push(`Free-tier toggle subtracts ${formatCount(covered)} of the published 5,000 monthly requests.`);
  }
  if (inputs.applyAllowance && api.allowance.kind === "usd") {
    const covered = Math.min(callMonth, api.allowance.usd);
    callMonth = Math.max(0, callMonth - api.allowance.usd);
    notes.push(`Free-credit toggle subtracts $${api.allowance.usd.toFixed(2)}. $${covered.toFixed(2)} of it applied.`);
  }
  if (
    inputs.applyAllowance &&
    api.allowance.kind === "credits" &&
    mode.creditsPerCall &&
    mode.perCall === api.allowance.perCredit * mode.creditsPerCall
  ) {
    const credits = billable * mode.creditsPerCall;
    const billableCredits = Math.max(0, credits - api.allowance.credits);
    callMonth = billableCredits * api.allowance.perCredit;
    notes.push(`Free-tier toggle subtracts up to ${formatCount(api.allowance.credits)} credits at $${api.allowance.perCredit}.`);
  }
  if (inputs.applyAllowance && api.id === "gemini-grounding" && mode.id === "gemini-2-5") {
    notes.push("The 5,000-request allowance is the Gemini 3 row. It is not subtracted from Gemini 2.5.");
  }

  return { callMonth, notes, partial: notes.some((note) => note.includes("not priced") || note.includes("Only")) };
}

export function priceSearchApi(api: SearchApi, modeId: string, inputs: SearchInputs): SearchLine | null {
  if (!usable(inputs)) return null;
  const mode = modeById(api, modeId);
  const model = searchModelById(inputs.modelId);
  const tokenModel = api.resultPolicy === "sonar" ? sonarPrice : model;
  const monthlyTasks = inputs.tasksPerDay * DAYS;
  const monthlySearches = inputs.searchesPerTask * monthlyTasks;
  const calls = callCost(api, mode, inputs, monthlySearches);
  const contentTokensFree = api.id === "openai-web-search" && mode.id === "preview-other";
  const resultTokens =
    api.resultPolicy === "none" || contentTokensFree
      ? 0
      : inputs.searchesPerTask * inputs.resultsPerSearch * inputs.tokensPerResult;
  const definitionTokens = api.definitionTokens;
  const inputTokens = (definitionTokens ?? 0) + resultTokens;
  const outputTokens = api.resultPolicy === "none" ? 0 : inputs.outputTokensPerTask;
  const tokenPerTask = tokenCost(tokenModel, inputTokens, outputTokens).perTask;
  const tokenMonth = tokenPerTask * monthlyTasks;
  const callPerTask = monthlyTasks > 0 ? calls.callMonth / monthlyTasks : 0;
  const notes = [api.callNote, api.definitionNote, ...calls.notes];
  if (api.resultPolicy === "none") {
    notes.push("Result text is not added. Output tokens are not added on this row.");
  }
  if (contentTokensFree) {
    notes.push("This preview row does not add result tokens. OpenAI’s page says those content tokens are free. Output tokens you enter are still priced.");
  }
  if (api.resultPolicy === "sonar" && inputs.modelId !== sonarPrice.id) {
    notes.push("Result and output tokens on this row use perplexity/sonar, not the model selected above.");
  }
  if (definitionTokens == null) {
    notes.push("No measured tool-definition size is added.");
  }
  return {
    id: api.id,
    name: api.name,
    modeLabel: mode.label,
    sourceUrl: api.sourceUrl,
    sourceLabel: api.sourceLabel,
    callPerTask,
    callMonth: calls.callMonth,
    definitionTokens,
    resultTokens,
    inputTokens,
    tokenPerTask,
    tokenMonth,
    perTask: callPerTask + tokenPerTask,
    month: calls.callMonth + tokenMonth,
    notes,
    partial: calls.partial,
  };
}

export function sumLines(lines: SearchLine[]): { perTask: number; month: number; partial: boolean } {
  return {
    perTask: lines.reduce((sum, line) => sum + line.perTask, 0),
    month: lines.reduce((sum, line) => sum + line.month, 0),
    partial: lines.some((line) => line.partial),
  };
}

export function formatUsd(value: number) {
  const abs = Math.abs(value);
  const maximumFractionDigits = abs > 0 && abs < 0.01 ? 6 : abs < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits,
  }).format(value);
}

export function formatCount(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

export const guideLinks = {
  openaiGuide: OPENAI_GUIDE,
  anthropicTool: ANTHROPIC_TOOL,
  geminiSearch: GEMINI_SEARCH,
  tokenPost: TOKEN_POST,
  perplexityModels: PERPLEXITY_MODELS,
};
