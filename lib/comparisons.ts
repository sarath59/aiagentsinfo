import type { RelatedCard } from "@/components/ArticleTemplate";
import { codingAgentsComparison } from "@/lib/coding-agents-comparison";
import { consumerComparisons } from "@/lib/consumer-comparisons";
import { starsForRepo } from "@/lib/framework-stars";
import { frameworkComparison } from "@/lib/framework-comparison";
import type { SortableColumn, SortableRow } from "@/lib/sortable";
import { licenceIsOpenSource, textIsFree } from "@/lib/table-facets";

export const COMPARISON_VERIFIED_ON = "2026-11-08";
export const COMPARISON_VERIFIED_LABEL = "November 2026";

export const COMPARISON_HUB = {
  href: "/best",
  title: "Best AI agents",
  heading: "Best AI agents in 2026",
  metaTitle: "Best AI agents: 15 sourced tables (2026)",
  metaDescription:
    "Best AI agents compared by job: 5 builder tables and 10 for shopping, search, travel, email, and more. Licence, list price, platform (Nov 2026).",
  summary:
    "Sourced comparisons of harnesses, frameworks, coding agents, computer use, evaluation tools, and 10 consumer jobs. Last verified November 2026.",
  description:
    "Best AI agents on this site are compared by job. Five tables cover harnesses, frameworks, coding-agent prices, computer use, and evaluation. Ten more cover shopping, web search, travel booking, email, personal assistant tasks, research, scheduling, writing, students, and small business.",
} as const;

export type ComparisonFaq = { question: string; answer: string };
export type ComparisonSource = { title: string; url: string };
export type ComparisonPick = { title: string; body: string; href?: string };
export type ComparisonKind = "builder" | "consumer";
export type ComparisonSection = { id: string; heading: string; paragraphs: string[] };

export type ComparisonRow = {
  id: string;
  name: string;
  vendor: string;
  listingSlug?: string;
  website: string;
  license: string;
  pricing: string;
  platform: string;
  bestFor: string;
  job: string;
  sourceIds: number[];
};

export type ComparisonPage = {
  slug: string;
  path: string;
  title: string;
  heading: string;
  metaTitle: string;
  metaDescription: string;
  description: string;
  summary: string;
  question: string;
  tableHeading: string;
  tableLead: string;
  tableCaption: string;
  bestForHeading: string;
  bestForLead: string;
  methodHeading: string;
  methodLead: string;
  faqHeading: string;
  faqLead: string;
  applicationCategory: string;
  kind: ComparisonKind;
  topics: string[];
  categories: string[];
  takeaways: string[];
  picks: ComparisonPick[];
  rows: ComparisonRow[];
  sources: ComparisonSource[];
  faq: ComparisonFaq[];
  related: RelatedCard[];
  columns: SortableColumn[];
  sections?: ComparisonSection[];
  /** ISO day when this page was checked. Other pages keep the shared November 2026 label. */
  verifiedOn?: string;
  /** Replaces the default “licence, list price, and platform” note. */
  cellsNote?: string;
  /** Replaces the default method paragraph about list prices. */
  methodNote?: string;
};

const LISTING_LOGOS: Record<string, string> = {
  "claude-code": "/logos/claude-code.svg",
  "claude-agent-sdk": "/logos/claude-code.svg",
  claude: "/logos/claude.png",
  codex: "/logos/openai.svg",
  "openai-agents-sdk": "/logos/openai.svg",
  chatgpt: "/logos/chatgpt.svg",
  "pydantic-ai": "/logos/pydantic.svg",
  "google-adk": "/logos/adk.png",
  gemini: "/logos/gemini.png",
  "microsoft-agent-framework": "/logos/microsoft.png",
  smolagents: "/logos/huggingface.svg",
  langchain: "/logos/langchain.png",
  crewai: "/logos/crewai.png",
  "amazon-rufus": "/logos/amazon.png",
  cursor: "/logos/cursor.svg",
  "github-copilot": "/logos/github-copilot.svg",
  perplexity: "/logos/perplexity.png",
  khanmigo: "/logos/khanmigo.png",
  typingmind: "/logos/typingmind.png",
  replycurrent: "/logos/replycurrent.png",
};

export function comparisonLogo(row: ComparisonRow) {
  return row.listingSlug ? LISTING_LOGOS[row.listingSlug] : undefined;
}

const GLOSSARY_COMPARISON_SLUGS: Record<string, string[]> = {
  agent: [
    "ai-agents-for-shopping",
    "ai-agents-for-web-search",
    "ai-agents-for-personal-assistant-tasks",
    "ai-agents-for-writing",
  ],
  harness: ["ai-agent-harnesses", "ai-agent-frameworks"],
  "harness-engineering": ["ai-agent-harnesses"],
  orchestration: ["ai-agent-harnesses"],
  "computer-use": ["computer-use-agents"],
  "browser-use": ["computer-use-agents"],
  "behavioral-evaluation": ["ai-agent-evaluation-tools"],
  benchmark: ["ai-agent-evaluation-tools"],
  "shopping-agent": ["ai-agents-for-shopping"],
  "agentic-checkout": ["ai-agents-for-shopping"],
  "product-feed": ["ai-agents-for-shopping"],
  rag: ["ai-agents-for-research"],
  prompt: ["ai-agents-for-writing"],
  "digital-worker": ["ai-agents-for-personal-assistant-tasks", "ai-agents-for-small-business"],
  "tool-use": ["ai-agents-for-web-search", "ai-agents-for-email"],
  autonomy: ["ai-agents-for-shopping", "ai-agents-for-personal-assistant-tasks"],
};

export function comparisonRows(rows: ComparisonRow[]): SortableRow[] {
  return rows.map((row) => {
    const stars = starsForRepo(row.vendor);
    return {
      id: row.id,
      sort: {
        name: row.name,
        vendor: row.vendor,
        bestFor: row.bestFor,
        license: row.license,
        pricing: row.pricing,
        platform: row.platform,
        sources: row.sourceIds.join(","),
        stars,
      },
      display: {
        name: row.name,
        vendor: row.vendor,
        bestFor: row.bestFor,
        license: row.license,
        pricing: row.pricing,
        platform: row.platform,
        sources: row.sourceIds.map((id) => `[${id}]`).join(" "),
        stars: stars == null ? "" : stars.toLocaleString("en-US"),
      },
      href: {
        name: row.listingSlug ? `/directory/${row.listingSlug}` : row.website,
      },
      facets: {
        stars,
        free: textIsFree(row.pricing, row.license),
        openSource: licenceIsOpenSource(row.license),
        useCase: row.bestFor,
      },
    };
  });
}

export const harnessComparison: ComparisonPage = {
  slug: "ai-agent-harnesses",
  path: "/best/ai-agent-harnesses",
  title: "Best AI agent harness",
  heading: "Best AI agent harness in 2026",
  metaTitle: "Best AI agent harness: 11 compared (Nov 2026)",
  metaDescription:
    "There is no single best AI agent harness. We compared 11 coding, open-source, and local runtimes on licence, list price, and platform. Checked November 2026.",
  description:
    "There is no single best AI agent harness. A harness is the loop, tools, memory, permissions, and stop rules around a model. Use Claude Code or Codex when you want a shipping coding product; use the Claude Agent SDK or OpenAI Agents SDK when you want that loop inside your own app; use Pydantic AI, Google ADK, Microsoft Agent Framework, smolagents, or DeepSeek Harness when you want an open-source runtime you can run yourself.",
  summary:
    "Sourced comparison of coding, open-source, and local agent harnesses. Last verified November 2026. No invented scores.",
  question: "Which AI agent harness is best in 2026?",
  tableHeading: "How do AI agent harnesses compare on price and licence?",
  tableLead:
    "The table lists 11 harnesses with a Best for label, open-source licence, list price, and platform copied from official pages in November 2026 — not a quality ranking.",
  tableCaption: "Best AI agent harness comparison — Best for, open source licence, pricing, and platform",
  bestForHeading: "Which AI agent harness is best for each job?",
  bestForLead:
    "Claude Code and Codex fit a shipping coding product; the Claude Agent SDK and OpenAI Agents SDK fit an embedded loop; smolagents fits a documented local-model path.",
  methodHeading: "How was this AI agent harness comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a licence file, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI agent harnesses?",
  faqLead:
    "These short answers cover cost, Windows, open source, local runtimes, and why this page has no star ratings.",
  applicationCategory: "DeveloperApplication",
  kind: "builder",
  columns: [
    { key: "name", label: "Tool" },
    { key: "vendor", label: "Maker" },
    { key: "bestFor", label: "Best for" },
    { key: "license", label: "Open source / licence" },
    { key: "pricing", label: "Pricing" },
    { key: "platform", label: "Platform (local or hosted)" },
    { key: "sources", label: "Sources" },
  ],
  topics: ["harnesses", "task-performance", "how-agents-work", "tools-saas"],
  categories: ["agent-frameworks", "coding-agents"],
  takeaways: [
    "A harness is not a model. Two products can share a model and behave differently because the workshop around it differs.",
    "The table lists licence, list price, and platform from official pages. It does not rank quality or invent a score.",
    "Coding products, embeddable SDKs, and local open-source runtimes are different jobs. The variant sections below keep those jobs apart.",
  ],
  picks: [
    {
      title: "Best for a shipping coding agent",
      body: "Claude Code and Codex are finished products with a terminal, editor, and plan page. They are not libraries you drop into an unrelated app.",
      href: "/directory/claude-code",
    },
    {
      title: "Best for embedding a coding loop",
      body: "The Claude Agent SDK packages Claude Code’s loop for Python or TypeScript. The OpenAI Agents SDK is MIT-licensed and runs the loop in your process.",
      href: "/directory/claude-agent-sdk",
    },
    {
      title: "Best open-source typed Python harness",
      body: "Pydantic AI Harness adds a workspace, plan, memory, and a Coder agent on top of a typed loop. The library is MIT licensed. Logfire is a separate paid product.",
      href: "/directory/pydantic-ai",
    },
    {
      title: "Best for a local model",
      body: "smolagents documents Transformers and Ollama. DeepSeek Harness starts a web interface on the machine where you run it. Running the harness locally is not the same as running the model locally.",
      href: "/directory/smolagents",
    },
  ],
  rows: [
    {
      id: "claude-code",
      name: "Claude Code",
      vendor: "Anthropic",
      listingSlug: "claude-code",
      website: "https://claude.com/product/claude-code",
      license: "Proprietary product",
      pricing:
        "Not on Free ($0). Pro $20/mo, Max $100/mo, Ultra $200/mo, shared with the rest of Claude. Console use is billed at API rates. Prices exclude tax. Checked 7 Nov 2026.",
      platform: "macOS, Linux, and Windows. Terminal, VS Code, JetBrains, web, iOS, Android, GitHub, Slack.",
      bestFor: "Best for a shipping coding agent",
      job: "Shipping coding agent: explain a repo, edit files, run tests, open pull requests.",
      sourceIds: [1, 2],
    },
    {
      id: "codex",
      name: "Codex",
      vendor: "OpenAI",
      listingSlug: "codex",
      website: "https://openai.com/codex/",
      license: "Product on ChatGPT plans; OpenAI describes the harness layer as open source",
      pricing:
        "Checked 6 Nov 2026. Free $0, Go $8/mo, Plus $20, Pro from $100 ($100/$200/$500), Business $20/user/mo billed annually ($25 billed monthly). Included on Free and Go with limits. Codex Cloud is not on Free or Go.",
      platform: "ChatGPT, Codex CLI, IDE extension, and web. Cloud tasks can keep running after you close the laptop.",
      bestFor: "Best for coding on ChatGPT plans",
      job: "Shipping coding agent across a repository, including pull-request review.",
      sourceIds: [3, 4, 5],
    },
    {
      id: "claude-agent-sdk",
      name: "Claude Agent SDK",
      vendor: "Anthropic",
      listingSlug: "claude-agent-sdk",
      website: "https://code.claude.com/docs/en/agent-sdk/overview",
      license: "Python package on GitHub is MIT; Anthropic says SDK use is under its Commercial Terms unless a component says otherwise",
      pricing:
        "No separate SDK subscription on claude.com/pricing. Model use is billed at Claude API rates. Opus 5.5 $4 / $20 per million tokens; Sonnet 5.5 $2 / $10. Checked 3 Nov 2026.",
      platform: "Python and TypeScript libraries. Other languages can drive the Claude Code CLI.",
      bestFor: "Best for embedding Claude Code",
      job: "The Claude Code loop, tools, permissions, sessions, and hooks inside your own app.",
      sourceIds: [6, 2, 7],
    },
    {
      id: "openai-agents-sdk",
      name: "OpenAI Agents SDK",
      vendor: "OpenAI",
      listingSlug: "openai-agents-sdk",
      website: "https://developers.openai.com/api/docs/guides/agents/sdk",
      license: "MIT (Python openai-agents and TypeScript @openai/agents)",
      pricing:
        "No SDK licence fee. Model calls go through your OpenAI API account at API rates. OpenAI does not list a separate SDK subscription. Checked 3 Nov 2026.",
      platform: "Python and TypeScript. Runs in your application. Sandbox agents use an isolated workspace.",
      bestFor: "Best for an MIT embeddable loop",
      job: "Embeddable loop: model calls, tools, handoffs, guardrails, sessions, tracing.",
      sourceIds: [8, 9],
    },
    {
      id: "pydantic-ai",
      name: "Pydantic AI Harness",
      vendor: "Pydantic",
      listingSlug: "pydantic-ai",
      website: "https://pydantic.dev/docs/ai/harness/",
      license: "MIT",
      pricing:
        "The library has no fee. Pydantic’s pricing page is for Logfire (Personal free with 10 million records/month; Team $49/mo; Growth $249/mo). Checked 3 Nov 2026.",
      platform: "Python. LocalWorkspace runs file and shell tools on your machine. Optional sandboxes: Modal, E2B, Render, Sprites, Daytona, boxd.",
      bestFor: "Best for typed Python plus a Coder",
      job: "Typed agent loop plus workspace, plan, memory, sub-agents, and a Coder agent.",
      sourceIds: [10, 11, 12],
    },
    {
      id: "google-adk",
      name: "Google ADK",
      vendor: "Google",
      listingSlug: "google-adk",
      website: "https://adk.dev",
      license: "Apache License 2.0 (Python repository)",
      pricing:
        "No price for ADK itself. Gemini or Google Cloud usage is billed separately. Checked 3 Nov 2026.",
      platform: "Python, TypeScript, Go, Java, and Kotlin. Run on your servers or deploy to Google Cloud.",
      bestFor: "Best for multi-language Google Cloud agents",
      job: "Code-first agents with tools, graph workflows, and multi-agent coordinators.",
      sourceIds: [13, 14],
    },
    {
      id: "microsoft-agent-framework",
      name: "Microsoft Agent Framework",
      vendor: "Microsoft",
      listingSlug: "microsoft-agent-framework",
      website: "https://learn.microsoft.com/en-us/agent-framework/overview/",
      license: "MIT",
      pricing:
        "No fee for the framework. You pay the model or cloud you connect. Checked 3 Nov 2026.",
      platform: "Python and .NET. Go SDK in public preview (Go 1.26 or later).",
      bestFor: "Best for long Python or .NET tasks",
      job: "Harness Agent for long tasks (planning, files, memory, tool approval) plus graph workflows.",
      sourceIds: [15],
    },
    {
      id: "smolagents",
      name: "smolagents",
      vendor: "Hugging Face",
      listingSlug: "smolagents",
      website: "https://huggingface.co/docs/smolagents/index",
      license: "Apache License 2.0",
      pricing:
        "No smolagents subscription. You pay the model host you connect, if that host charges. Checked 3 Nov 2026.",
      platform:
        "Python. Models via Hugging Face Inference, OpenAI/Anthropic through LiteLLM, or locally with Transformers or Ollama. Optional Docker, E2B, Modal, or Blaxel sandboxes.",
      bestFor: "Best for a local model",
      job: "Small library. CodeAgent writes Python to call tools; ToolCallingAgent uses ordinary tool calls.",
      sourceIds: [16, 17],
    },
    {
      id: "deepseek-harness",
      name: "DeepSeek Harness",
      vendor: "DeepSeek",
      website: "https://github.com/deepseek-ai/deepseek-harness",
      license: "MIT",
      pricing: "No product price. The repository is source. Model calls, if any, are billed by the model you connect.",
      platform:
        "Local developer preview. npx @deepseek-ai/dsh web starts a web interface on the machine where you run it. Newest listed item on 5 Nov 2026 was pre-release v0.2.2-rc.1 (4 Nov 2026).",
      bestFor: "Best for a local open-source preview",
      job: "Open-source plugin harness (dsh), still in developer preview. Not a shipping app like Claude Code or Codex.",
      sourceIds: [18, 19],
    },
    {
      id: "langchain",
      name: "LangChain / LangSmith",
      vendor: "LangChain",
      listingSlug: "langchain",
      website: "https://www.langchain.com",
      license: "Open-source libraries; LangSmith is a hosted (and optionally self-hosted) platform",
      pricing:
        "LangSmith Developer $0/seat then pay as you go, up to 5,000 base traces/month. Plus $39/seat, up to 10,000 base traces/month. Enterprise custom. 1 LangChain Standard Unit = $1. Checked 8 Nov 2026.",
      platform: "Open-source libraries plus LangSmith cloud, hybrid, or self-hosted on Enterprise.",
      bestFor: "Best for a framework plus LangSmith evals",
      job: "Framework for composing agents; LangSmith adds tracing, evals, and deployment.",
      sourceIds: [20, 21],
    },
    {
      id: "crewai",
      name: "CrewAI",
      vendor: "CrewAI",
      listingSlug: "crewai",
      website: "https://crewai.com",
      license: "MIT (open-source framework)",
      pricing:
        "Cloud Basic is free with 50 workflow executions a month. Enterprise is custom. Checked 3 Nov 2026.",
      platform: "Open-source package plus a hosted cloud product.",
      bestFor: "Best for role-based crews",
      job: "Role-based multi-agent crews. A framework, not a finished coding IDE.",
      sourceIds: [22],
    },
  ],
  sources: [
    { title: "Anthropic, Claude Code product page (listing checked 7 Nov 2026)", url: "https://claude.com/product/claude-code" },
    { title: "Anthropic, Claude pricing (listing checked 7 Nov 2026)", url: "https://claude.com/pricing" },
    { title: "OpenAI, Codex", url: "https://openai.com/codex/" },
    { title: "OpenAI, Codex as a platform: build on the open agent harness", url: "https://developers.openai.com/blog/codex-as-a-platform" },
    { title: "This site, Codex directory listing (checked 6 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "Anthropic, Agent SDK overview", url: "https://code.claude.com/docs/en/agent-sdk/overview" },
    { title: "This site, Claude Agent SDK listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/claude-agent-sdk" },
    { title: "OpenAI, Agents SDK", url: "https://developers.openai.com/api/docs/guides/agents/sdk" },
    { title: "OpenAI, Sandbox agents", url: "https://developers.openai.com/api/docs/guides/agents/sandboxes" },
    { title: "Pydantic, Pydantic AI Harness", url: "https://pydantic.dev/docs/ai/harness/" },
    { title: "Pydantic AI GitHub LICENSE (MIT)", url: "https://github.com/pydantic/pydantic-ai/blob/main/LICENSE" },
    { title: "This site, Pydantic AI listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/pydantic-ai" },
    { title: "Google, Agent Development Kit", url: "https://adk.dev" },
    { title: "Google, Welcome to ADK 2.0", url: "https://adk.dev/2.0/" },
    { title: "Microsoft, Agent Framework overview", url: "https://learn.microsoft.com/en-us/agent-framework/overview/" },
    { title: "Hugging Face, smolagents", url: "https://huggingface.co/docs/smolagents/index" },
    { title: "Hugging Face, smolagents index (Transformers and Ollama)", url: "https://huggingface.co/docs/smolagents/en/index" },
    { title: "DeepSeek Harness repository", url: "https://github.com/deepseek-ai/deepseek-harness" },
    { title: "DeepSeek Harness README", url: "https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md" },
    { title: "LangChain, LangSmith plans and pricing (read 8 Nov 2026)", url: "https://www.langchain.com/pricing" },
    { title: "This site, LangChain listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/langchain" },
    { title: "This site, CrewAI listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/crewai" },
  ],
  faq: [
    {
      question: "What is an AI agent harness?",
      answer:
        "An AI agent harness is the software around a language model that lets the model take steps. It holds the tools, the memory, the permissions, the record of what happened, and the rule for when to stop. On this site, an agent is the model plus that harness.",
    },
    {
      question: "Is there a single best AI agent harness?",
      answer:
        "No. A shipping coding product, an embeddable SDK, and a local open-source runtime solve different jobs. This page compares licence, list price, and platform from official sources. It does not publish a quality ranking or a composite score.",
    },
    {
      question: "What is the best AI agent harness for coding?",
      answer:
        "If you want a finished coding product, Claude Code and Codex are the two with public plan pages and editor or terminal clients on this site. If you want the same kind of loop inside your own app, the Claude Agent SDK, the OpenAI Agents SDK, and Pydantic AI’s Coder agent are the documented options. Scores from different benchmarks are not treated as a ranking here.",
    },
    {
      question: "What is the best open source AI agent harness?",
      answer:
        "There is no single best open source AI agent harness on this page. Several rows are open source: the OpenAI Agents SDK and Microsoft Agent Framework are MIT; Pydantic AI is MIT; Google ADK and smolagents are Apache 2.0; DeepSeek Harness and CrewAI’s framework are MIT. LangChain’s libraries are open source; LangSmith is a separate platform. Licence text is not the same as a hosted product being free.",
    },
    {
      question: "What is the best local AI agent harness?",
      answer:
        "Local has two meanings. The harness can run on your machine while the model is still an API. Pydantic AI’s LocalWorkspace and DeepSeek Harness’s local web UI work that way. smolagents separately documents running the model locally with Transformers or Ollama. This page does not claim those local setups match a hosted coding product.",
    },
    {
      question: "How much does an AI agent harness cost?",
      answer:
        "It depends on the product. Claude Code is on Anthropic Pro, Max, and Ultra plans, not Free. Codex rides ChatGPT plans, including Free with limits. Open-source SDKs such as the OpenAI Agents SDK, Pydantic AI, Google ADK, Microsoft Agent Framework, and smolagents have no library fee; you still pay the model you call. LangSmith has seat and trace prices. Every figure in the table is a list price from an official page, dated November 2026.",
    },
    {
      question: "Does an AI agent harness run on Windows?",
      answer:
        "Claude Code documents macOS, Linux, and Windows. Codex runs in ChatGPT, a CLI, an IDE extension, and the web. Open-source libraries run wherever you can install Python or TypeScript. Windows here is the computer you develop on, not a computer-use desktop agent.",
    },
    {
      question: "Why are there no star ratings?",
      answer:
        "This site does not invent ratings, traffic, or composite scores. A cell is published only when an official page, a licence file, or a listing already checked on this site supports it. Public benchmark scores live on the November 2026 harness benchmark report, copied from official leaderboards.",
    },
  ],
  related: [
    {
      href: "/blog/what-is-an-ai-agent-harness",
      title: "What is an AI agent harness?",
      description: "The workshop around a model: loop, tools, memory, permissions, and stop rules.",
      kicker: "Guide",
      date: "2026-11-03",
    },
    {
      href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
      title: "How do you evaluate an AI agent harness?",
      description: "Behavioral evals versus end-to-end benchmarks.",
      kicker: "Guide",
      date: "2026-11-06",
    },
    {
      href: "/reports/agent-harness-benchmark-november-2026",
      title: "Harness benchmark, November 2026",
      description: "Official SWE-bench and Terminal-Bench scores, each with a date.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: "/glossary/harness",
      title: "Harness",
      description: "The runtime around a model — loop, tools, memory, permissions, and stop conditions.",
      kicker: "Glossary",
    },
    {
      href: "/directory/category/agent-frameworks",
      title: "Agent frameworks and harnesses",
      description: "Directory listings for libraries and harnesses.",
      kicker: "Directory",
    },
    {
      href: COMPARISON_HUB.href,
      title: COMPARISON_HUB.title,
      description: "The hub for every sourced best-of table on this site.",
      kicker: "Hub",
    },
    {
      href: "/best/computer-use-agents",
      title: "Best computer use agents",
      description: "Desktop, API, open-source, and Windows computer use.",
      kicker: "Comparison",
    },
    {
      href: "/best/ai-agent-evaluation-tools",
      title: "Best AI agent evaluation tools",
      description: "Sourced comparison of regression and trajectory evaluation stacks.",
      kicker: "Comparison",
    },
  ],
};

export const computerUseComparison: ComparisonPage = {
  slug: "computer-use-agents",
  path: "/best/computer-use-agents",
  title: "Best computer use agents",
  heading: "Best computer use agents in 2026",
  metaTitle: "Best computer use agents: we compared 7 (2026)",
  metaDescription:
    "There is no single best computer use agent. We compared 7 desktop, API, open-source, and Windows options on licence, price, and platform (Nov 2026).",
  description:
    "There is no single best computer use agent. A computer use agent looks at a screen and clicks, types, or scrolls. In November 2026, Claude Cowork and Claude Code can do that on a Mac or Windows desktop in research preview, and the ChatGPT desktop app can do it on Mac or Windows for ChatGPT Work and Codex. Anthropic, OpenAI, and Gemini also document APIs where your own code runs each action. Open-source options include UI-TARS Desktop (Apache 2.0, Windows and macOS) and MagenticLite (MIT, macOS or Windows with WSL).",
  summary:
    "Sourced comparison of desktop, API, open-source, and Windows computer use agents. Last verified November 2026. No invented scores.",
  question: "Which computer use agent is best in 2026?",
  tableHeading: "How do computer use agents compare on price, licence, and Windows?",
  tableLead:
    "The table lists 7 computer use agents with a Best for label, open-source licence, list price, and Windows, macOS, or API platform from official pages, last verified November 2026.",
  tableCaption: "Best computer use agents comparison — Best for, open source licence, pricing, and Windows or macOS platform",
  bestForHeading: "Which computer use agent is best for each job?",
  bestForLead:
    "Claude Cowork, Claude Code, and ChatGPT Computer Use fit a live Mac or Windows desktop; UI-TARS Desktop fits open source on Windows; the APIs fit a loop you write yourself.",
  methodHeading: "How was this computer use agent comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a licence file, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about computer use agents?",
  faqLead:
    "These short answers cover Windows, open source, cost, and whether you should let an agent handle money or passwords.",
  applicationCategory: "DesktopApplication",
  kind: "builder",
  columns: [
    { key: "name", label: "Tool" },
    { key: "vendor", label: "Maker" },
    { key: "bestFor", label: "Best for" },
    { key: "license", label: "Open source / licence" },
    { key: "pricing", label: "Pricing" },
    { key: "platform", label: "Platform (Windows, macOS, API)" },
    { key: "sources", label: "Sources" },
  ],
  topics: ["task-performance", "how-agents-work", "harnesses", "tools-saas"],
  categories: ["ai-agents", "automation", "productivity"],
  takeaways: [
    "Computer use is a tool. The harness around the model takes the screenshot, runs the click, and brings the new screen back.",
    "A desktop product that drives your live screen is not the same as an API that expects you to run each action in a machine you control.",
    "Payments, passwords, and other hard-to-undo steps still need a person. Vendor pages say so.",
  ],
  picks: [
    {
      title: "Best for a Mac or Windows desktop you already use",
      body: "Claude Cowork and Claude Code (research preview on Pro, Max, and Ultra) and ChatGPT Computer Use (Work and Codex, supported regions) are the two native desktop products checked here.",
      href: "/directory/claude",
    },
    {
      title: "Best for building your own loop",
      body: "Anthropic, OpenAI, and Gemini document computer-use APIs. Your application executes the click or keystroke and returns a new screenshot.",
      href: "/directory/gemini",
    },
    {
      title: "Best open-source desktop agent",
      body: "UI-TARS Desktop is Apache 2.0 and documents Windows, macOS, and browser operators. MagenticLite is MIT and documents macOS or Windows with WSL, with the browser in a VM sandbox.",
    },
    {
      title: "Best computer use agent for Windows",
      body: "Native Windows GUI control is documented for Claude’s desktop research preview, ChatGPT’s desktop app (foreground on the active desktop), and UI-TARS Desktop. MagenticLite’s Windows path is WSL, not a native GUI operator.",
      href: "/directory/chatgpt",
    },
  ],
  rows: [
    {
      id: "claude-desktop-cu",
      name: "Claude Cowork / Claude Code computer use",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://claude.com/resources/articles/dispatch-and-computer-use",
      license: "Proprietary product",
      pricing:
        "Research preview for Claude Pro, Max, and Ultra. Pro $20/mo, Max $100/mo, Ultra $200/mo on the pricing page recorded 3 Nov 2026. Not described as a separate add-on price.",
      platform: "macOS and Windows desktop app, which must stay awake. Dispatch can assign the task from a phone.",
      bestFor: "Best for a live Mac or Windows desktop",
      job: "Point, click, and complete tasks on your screen when a connector is missing. Asks permission first.",
      sourceIds: [1, 2, 3],
    },
    {
      id: "chatgpt-desktop-cu",
      name: "ChatGPT desktop Computer Use",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://developers.openai.com/codex/computer-use",
      license: "Proprietary product",
      pricing:
        "Documented for ChatGPT Work and Codex in supported regions. Codex plan ladder on this site was checked 6 Nov 2026. The Computer Use page does not print a separate add-on price.",
      platform:
        "macOS and Windows. On Windows it runs on the active desktop in the foreground. On macOS it can run a scoped task in the background; locked use is macOS-only.",
      bestFor: "Best for ChatGPT Work or Codex desktop",
      job: "See and operate graphical apps when a plugin or MCP server is not enough.",
      sourceIds: [4, 5],
    },
    {
      id: "anthropic-cu-api",
      name: "Anthropic computer use API",
      vendor: "Anthropic",
      listingSlug: "claude",
      website: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool",
      license: "API feature; billed with Claude API usage",
      pricing: "No separate computer-use SKU on the pages checked. Token use is billed at Claude API rates.",
      platform:
        "Messages API toolset computer_toolset_20260801. Your application runs screenshot, click, type, and zoom in an environment you control. Not available in Claude Managed Agents.",
      bestFor: "Best for your own Anthropic loop",
      job: "Model chooses UI actions; your code executes them. Browser-use is a narrower tool that stays on a page.",
      sourceIds: [6, 7],
    },
    {
      id: "openai-cu-api",
      name: "OpenAI computer use API",
      vendor: "OpenAI",
      listingSlug: "chatgpt",
      website: "https://developers.openai.com/api/docs/guides/tools-computer-use",
      license: "API feature; billed with OpenAI API usage",
      pricing: "No separate computer-use SKU on the guide checked 8 Nov 2026. You pay the model and any runtime you attach.",
      platform: "API loop you connect to a browser or desktop runtime you control. The guide separates browser tools from screenshot and mouse or keyboard tools.",
      bestFor: "Best for your own OpenAI loop",
      job: "Your code runs each action and returns the new screen or page state.",
      sourceIds: [8],
    },
    {
      id: "gemini-cu",
      name: "Gemini Computer Use",
      vendor: "Google",
      listingSlug: "gemini",
      website: "https://aistudio.google.com/docs/computer-use",
      license: "API feature; billed with Gemini API usage",
      pricing:
        "No separate Computer Use SKU on the guide checked 8 Nov 2026. Google AI consumer plans on this site’s Gemini listing were checked 3 Nov 2026.",
      platform:
        "Browser, mobile, and desktop environments. You implement the client that executes actions (the docs use Playwright for a browser example) and send a new screenshot back.",
      bestFor: "Best for a Gemini Computer Use client",
      job: "Screenshot in, UI action out, with optional intent text and safety decisions that can require confirmation or block a step.",
      sourceIds: [9, 10],
    },
    {
      id: "ui-tars-desktop",
      name: "UI-TARS Desktop",
      vendor: "ByteDance",
      website: "https://github.com/bytedance/UI-TARS-desktop",
      license: "Apache License 2.0",
      pricing: "No product price on the repository README. You supply a model provider key if the stack calls a hosted model.",
      platform: "Desktop application. README lists Windows, macOS, and browser operators, plus local and remote computer operators.",
      bestFor: "Best for open source on Windows",
      job: "Open-source GUI agent driven by UI-TARS and Seed vision-language models. Screenshot, mouse, and keyboard control.",
      sourceIds: [11],
    },
    {
      id: "magentic-lite",
      name: "MagenticLite",
      vendor: "Microsoft",
      website: "https://github.com/microsoft/magentic-ui",
      license: "MIT",
      pricing: "No product price on the README. You connect a model endpoint.",
      platform:
        "macOS or Windows with WSL. pip package magentic_ui. Browser sessions run inside a Quicksand VM sandbox. Not documented as a native Windows GUI operator.",
      bestFor: "Best for MIT with a WSL sandbox",
      job: "Experimental agent for browser work and local files, with approval before critical actions.",
      sourceIds: [12, 13],
    },
  ],
  sources: [
    { title: "Anthropic, Put Claude to work on your computer (read 8 Nov 2026)", url: "https://claude.com/resources/articles/dispatch-and-computer-use" },
    { title: "This site, Claude listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/claude" },
    { title: "This site, Can an AI agent use your computer? (updated 8 Nov 2026)", url: "https://www.aiagentsinfo.com/blog/can-an-ai-agent-use-your-computer" },
    { title: "OpenAI, Computer Use in the ChatGPT desktop app (read 8 Nov 2026)", url: "https://developers.openai.com/codex/computer-use" },
    { title: "This site, Codex listing (checked 6 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/codex" },
    { title: "Anthropic, Computer use tool (read 8 Nov 2026)", url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool" },
    { title: "This site, Claude Code listing (checked 7 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/claude-code" },
    { title: "OpenAI, Computer use API guide (read 8 Nov 2026)", url: "https://developers.openai.com/api/docs/guides/tools-computer-use" },
    { title: "Google, Computer use on AI Studio (read 8 Nov 2026)", url: "https://aistudio.google.com/docs/computer-use" },
    { title: "This site, Gemini listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/gemini" },
    { title: "ByteDance, UI-TARS-desktop README (Apache 2.0; Windows/macOS/browser)", url: "https://github.com/bytedance/UI-TARS-desktop" },
    { title: "Microsoft, Magentic-UI / MagenticLite README (MIT; macOS or Windows WSL)", url: "https://github.com/microsoft/magentic-ui" },
    { title: "Microsoft, Magentic-UI LICENSE (MIT)", url: "https://github.com/microsoft/magentic-ui/blob/main/LICENSE" },
  ],
  faq: [
    {
      question: "What is a computer use agent?",
      answer:
        "A computer use agent is an agent whose tool is computer use. The model looks at the screen and asks for a click, a keystroke, or a scroll. The app runs that action and returns the new screen.",
    },
    {
      question: "Is computer use the same as an agent harness?",
      answer:
        "No. Computer use is a tool. The harness is the software around the model: the loop, the tools, the memory, the permissions, and the rule for when to stop. The harness offers computer use, runs the click, and brings the new screen back.",
    },
    {
      question: "What is the best open source computer use agent?",
      answer:
        "UI-TARS Desktop is Apache 2.0 and documents Windows, macOS, and browser operators. MagenticLite is MIT and documents macOS or Windows with WSL, with the browser inside a VM sandbox. Neither is treated here as a quality ranking against Claude or ChatGPT.",
    },
    {
      question: "What is the best computer use agent for Windows?",
      answer:
        "Native Windows GUI control is documented for Claude Cowork and Claude Code (research preview), the ChatGPT desktop app (foreground on the active desktop), and UI-TARS Desktop. MagenticLite’s documented Windows path is WSL. Gemini Computer Use can target a desktop environment, but you write the action handler.",
    },
    {
      question: "Do I need to approve each click?",
      answer:
        "You need to approve access, and you should approve anything hard to undo. Claude’s product article says Claude asks for permission first and before opening a new app. ChatGPT asks before it uses an app and may ask before a sensitive action. API loops can batch ordinary clicks if your application allows them. Anthropic, OpenAI, and Google each tell you to confirm purchases and other consequential actions.",
    },
    {
      question: "Is computer use reliable enough for money or passwords?",
      answer:
        "The pages checked here say no, unless a person is in the loop. Anthropic says computer use is still early and to avoid sensitive data. OpenAI says to stay present for payment and credential steps. Google says Computer Use can contain errors, and its payments category can block a checkout or ask for confirmation.",
    },
    {
      question: "How much do computer use agents cost?",
      answer:
        "Claude Cowork and Claude Code computer use is a research preview on Pro, Max, and Ultra, not Free. ChatGPT Computer Use is documented for Work and Codex in supported regions. UI-TARS Desktop and MagenticLite are open source with no product fee; you still pay any model they call. API computer use is billed at the provider’s token rates. This page does not invent a blended price.",
    },
  ],
  related: [
    {
      href: "/blog/can-an-ai-agent-use-your-computer",
      title: "Can an AI agent use your computer?",
      description: "Yes, when the product includes computer use. Re-checked November 2026.",
      kicker: "Guide",
      date: "2026-11-05",
    },
    {
      href: "/glossary/computer-use",
      title: "Computer use",
      description: "A tool loop in which a model looks at a screen and asks for a mouse or keyboard action.",
      kicker: "Glossary",
    },
    {
      href: "/glossary/browser-use",
      title: "Browser use",
      description: "Agent tools that read and act on a web page, without taking over a full desktop.",
      kicker: "Glossary",
    },
    {
      href: "/blog/tencent-releases-hy4-with-computer-use",
      title: "Tencent releases Hy4 with computer use",
      description: "A model with computer use is not, by itself, a complete desktop agent.",
      kicker: "News",
      date: "2026-11-05",
    },
    {
      href: COMPARISON_HUB.href,
      title: COMPARISON_HUB.title,
      description: "The hub for every sourced best-of table on this site.",
      kicker: "Hub",
    },
    {
      href: "/best/ai-agent-harnesses",
      title: "Best AI agent harness",
      description: "The workshop that can offer computer use as one of its tools.",
      kicker: "Comparison",
    },
    {
      href: "/directory/claude",
      title: "Claude",
      description: "Anthropic’s assistant family, including computer-use features documented by the vendor.",
      kicker: "Directory",
    },
  ],
};

export const evaluationComparison: ComparisonPage = {
  slug: "ai-agent-evaluation-tools",
  path: "/best/ai-agent-evaluation-tools",
  title: "Best AI agent evaluation tools",
  heading: "Best AI agent evaluation tools in 2026",
  metaTitle: "Best AI agent evaluation tools: 8 in 2026",
  metaDescription:
    "There is no single best AI agent evaluation tool. We compared 8 local, CI, and hosted stacks on licence, list price, and platform (Nov 2026).",
  description:
    "There is no single best among AI agent evaluation tools. They check tool calls, trajectories, and whether a job still finishes. Promptfoo, DeepEval, Inspect, and Pydantic Evals are libraries you run locally or in CI. LangSmith, Langfuse, Braintrust, and Confident AI add hosted tracing and online evals. Phoenix is source-available under Elastic License 2.0 for self-hosting. This page does not invent a ranking.",
  summary:
    "Sourced comparison of agent evaluation and trajectory-testing tools, including open source. Last verified November 2026.",
  question: "Which AI agent evaluation tool is best in 2026?",
  tableHeading: "How do AI agent evaluation tools compare on price and licence?",
  tableLead:
    "The table lists 8 evaluation tools with a Best for label, open-source licence, list price, and local, CI, or hosted platform from official pages, last verified November 2026.",
  tableCaption: "Best AI agent evaluation tools comparison — Best for, open source licence, pricing, and local or CI platform",
  bestForHeading: "Which AI agent evaluation tool is best for each check?",
  bestForLead:
    "Promptfoo fits local CI gates; DeepEval fits pytest-style agent metrics; Inspect fits sandboxed agent evals; Langfuse and Phoenix fit self-hosted tracing plus evals.",
  methodHeading: "How was this AI agent evaluation comparison checked?",
  methodLead:
    "Every cell comes from an official product page, a licence file, or a listing on this site that already cites that official page.",
  faqHeading: "What else do people ask about AI agent evaluation tools?",
  faqLead:
    "These short answers cover open source, hosted platforms, cost, and how a behavioral eval differs from a benchmark.",
  applicationCategory: "DeveloperApplication",
  kind: "builder",
  columns: [
    { key: "name", label: "Tool" },
    { key: "vendor", label: "Maker" },
    { key: "bestFor", label: "Best for" },
    { key: "license", label: "Open source / licence" },
    { key: "pricing", label: "Pricing" },
    { key: "platform", label: "Platform (local, CI, hosted)" },
    { key: "sources", label: "Sources" },
  ],
  topics: ["harnesses", "how-agents-work", "research", "tools-saas"],
  categories: ["developer-tools", "agent-frameworks"],
  takeaways: [
    "Evaluation is not the same as observability. Tracing tells you what happened. An eval scores a step or a whole job against a written expectation.",
    "Open-source libraries and hosted platforms often pair: DeepEval with Confident AI, Pydantic Evals with Logfire, LangChain libraries with LangSmith, Phoenix with Arize AX.",
    "A behavioral eval checks one action. An end-to-end benchmark still answers whether the job finished. Keep both.",
  ],
  picks: [
    {
      title: "Best for CI and red-team prompt tests",
      body: "Promptfoo’s Community plan is free, MIT licensed, and documents local or self-hosted runs plus CI. Red teaming on Community is capped at 10,000 probes a month. Enterprise is custom.",
    },
    {
      title: "Best for pytest-style agent metrics",
      body: "DeepEval is Apache licensed on PyPI and documents trajectory-based evaluation and agent metrics such as tool correctness. Confident AI is the hosted companion, with a free tier and Starter at $200 a month.",
    },
    {
      title: "Best for sandboxed agent evals",
      body: "Inspect, from the UK AI Security Institute and Meridian Labs, is MIT licensed. It documents built-in agents, external agents such as Claude Code and Codex CLI, and sandboxes including Docker, Kubernetes, and Modal.",
    },
    {
      title: "Best self-hostable tracing plus evals",
      body: "Langfuse’s core is MIT except for ee/ directories. Cloud Hobby is free with 50,000 units a month; Core is $29 a month. Phoenix is Elastic License 2.0: you may run it yourself, and you may not offer it as a hosted service.",
      href: "/directory/langchain",
    },
  ],
  rows: [
    {
      id: "promptfoo",
      name: "Promptfoo",
      vendor: "Promptfoo",
      website: "https://www.promptfoo.dev/pricing/",
      license: "MIT",
      pricing:
        "Community is free forever, including local or self-hosted runs. Red teaming on Community is up to 10,000 probes a month. Enterprise and On-Premise are custom. Read 8 Nov 2026.",
      platform: "Local CLI, self-host, CI/CD. Cloud and on-premise are Enterprise options.",
      bestFor: "Best for local CI and red teaming",
      job: "Prompt, model, and RAG evaluations, plus red teaming. Community includes LLM evaluation features.",
      sourceIds: [1, 2],
    },
    {
      id: "deepeval",
      name: "DeepEval",
      vendor: "Confident AI",
      website: "https://www.deepeval.com/",
      license: "Apache Software License (PyPI classifier)",
      pricing:
        "The library has no licence fee. Confident AI Free is $0 with 2 seats, 1 project, 5 test runs a week, and 1 GB-month of traces. Starter is $200/month per organization. Team is $2,000/month. Enterprise is custom. Read 8 Nov 2026.",
      platform: "Python (and a TypeScript SDK in beta, per DeepEval’s own blog). Unit tests in CI. Optional Confident AI cloud.",
      bestFor: "Best for pytest-style agent metrics",
      job: "Pytest-style LLM and agent evals, including trajectory-based evaluation and tool-correctness metrics.",
      sourceIds: [3, 4],
    },
    {
      id: "inspect",
      name: "Inspect",
      vendor: "UK AI Security Institute and Meridian Labs",
      website: "https://inspect.aisi.org.uk/",
      license: "MIT",
      pricing: "No hosted product price. pip install inspect-ai. You pay the model provider you call.",
      platform:
        "Python CLI and API. VS Code extension. Sandboxes: Docker, Kubernetes, Modal, Proxmox, Vagrant, and others. Local inference via Hugging Face, vLLM, or SGLang is documented.",
      bestFor: "Best for sandboxed agent evals",
      job: "Write and run model and agent evaluations, including external agents such as Claude Code, Codex CLI, and Gemini CLI.",
      sourceIds: [5, 6],
    },
    {
      id: "pydantic-evals",
      name: "Pydantic Evals",
      vendor: "Pydantic",
      listingSlug: "pydantic-ai",
      website: "https://pydantic.dev/docs/ai/evals/",
      license: "MIT (pydantic-ai repository)",
      pricing:
        "pip install pydantic-evals. Optional Logfire: Personal free with 10 million records a month; Team $49/mo; Growth $249/mo. Checked 3 Nov 2026 for Logfire.",
      platform: "Python, code-first datasets and evaluators. Results in the terminal, on disk, or in Logfire.",
      bestFor: "Best for typed Python evals",
      job: "Grade final outputs and trajectories (sequence and arguments of tool calls). Online evaluation against sampled production traffic is documented.",
      sourceIds: [7, 8, 9],
    },
    {
      id: "langsmith",
      name: "LangSmith",
      vendor: "LangChain",
      listingSlug: "langchain",
      website: "https://www.langchain.com/pricing",
      license: "Hosted platform; LangChain libraries are open source",
      pricing:
        "Developer $0/seat then pay as you go, 5,000 base traces/month. Plus $39/seat, 10,000 base traces/month. Enterprise custom, including self-hosted and hybrid. 1 LSU = $1. Read 8 Nov 2026.",
      platform: "LangChain Cloud (US or EU). Enterprise adds hybrid and self-hosted.",
      bestFor: "Best for hosted traces and evals",
      job: "Tracing plus online and offline evals, datasets, and prompt playground. Engine can cluster failures and propose fixes, billed in LSUs.",
      sourceIds: [10, 11],
    },
    {
      id: "langfuse",
      name: "Langfuse",
      vendor: "Langfuse (ClickHouse)",
      website: "https://langfuse.com/pricing",
      license: "MIT for code outside ee/ directories; ee/ code is separately licensed",
      pricing:
        "Self-host the open-source core for free. Cloud Hobby is free (50k units/month, 2 users). Core $29/month. Pro $199/month. Enterprise $2,499/month. Extra Cloud units start at $8 per 100k. Read 8 Nov 2026.",
      platform: "Cloud (US, EU, or Japan) or self-host with Docker Compose or Kubernetes.",
      bestFor: "Best for self-hosted tracing",
      job: "Tracing, datasets, experiments, LLM-as-judge, human annotation, and prompt management.",
      sourceIds: [12, 13],
    },
    {
      id: "braintrust",
      name: "Braintrust",
      vendor: "Braintrust",
      website: "https://www.braintrust.dev/pricing",
      license: "Hosted platform (open-source SDKs are separate; this row is the product page)",
      pricing:
        "Starter $0/month with $10 model credits, 1 GB processed data, 10k scores, 14-day retention. Pro $249/month with $100 credits, 5 GB, 50k scores, 30-day retention. Enterprise custom. Read 8 Nov 2026.",
      platform: "Hosted. Enterprise lists on-prem or hosted deployment.",
      bestFor: "Best for hosted experiments",
      job: "Tracing, evaluation, playgrounds, experiments, and scores, including human review scores.",
      sourceIds: [14],
    },
    {
      id: "phoenix",
      name: "Arize Phoenix",
      vendor: "Arize AI",
      website: "https://docs.arize.com/phoenix",
      license: "Elastic License 2.0 (source-available; you may not offer it as a hosted or managed service)",
      pricing:
        "No Cloud price on the Phoenix docs page checked 8 Nov 2026. You can self-host. Arize AX is the separate managed platform.",
      platform: "Self-host. Tracing over OpenTelemetry. Python, TypeScript, and Java instrumentation is documented.",
      bestFor: "Best for self-hosted source-available evals",
      job: "Traces, LLM and code evals, datasets, experiments, and prompt playground. Can attach DeepEval or Ragas evaluators.",
      sourceIds: [15, 16],
    },
  ],
  sources: [
    { title: "Promptfoo pricing (read 8 Nov 2026)", url: "https://www.promptfoo.dev/pricing/" },
    { title: "promptfoo/promptfoo LICENSE (MIT)", url: "https://github.com/promptfoo/promptfoo/blob/main/LICENSE" },
    { title: "DeepEval docs (read 8 Nov 2026)", url: "https://www.deepeval.com/" },
    { title: "Confident AI pricing (read 8 Nov 2026)", url: "https://www.confident-ai.com/pricing" },
    { title: "Inspect, UK AI Security Institute (read 8 Nov 2026)", url: "https://inspect.aisi.org.uk/" },
    { title: "inspect_ai LICENSE (MIT)", url: "https://github.com/UKGovernmentBEIS/inspect_ai/blob/main/LICENSE" },
    { title: "Pydantic Evals", url: "https://pydantic.dev/docs/ai/evals/" },
    { title: "pydantic-ai LICENSE (MIT)", url: "https://github.com/pydantic/pydantic-ai/blob/main/LICENSE" },
    { title: "This site, Pydantic AI listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/pydantic-ai" },
    { title: "LangChain, LangSmith pricing (read 8 Nov 2026)", url: "https://www.langchain.com/pricing" },
    { title: "This site, LangChain listing (checked 3 Nov 2026)", url: "https://www.aiagentsinfo.com/directory/langchain" },
    { title: "Langfuse pricing (read 8 Nov 2026)", url: "https://langfuse.com/pricing" },
    { title: "langfuse LICENSE (MIT except ee/)", url: "https://github.com/langfuse/langfuse/blob/main/LICENSE" },
    { title: "Braintrust pricing (read 8 Nov 2026)", url: "https://www.braintrust.dev/pricing" },
    { title: "Arize Phoenix docs (read 8 Nov 2026)", url: "https://docs.arize.com/phoenix" },
    { title: "Arize Phoenix LICENSE (Elastic License 2.0)", url: "https://github.com/Arize-ai/phoenix/blob/main/LICENSE" },
  ],
  faq: [
    {
      question: "What is an AI agent evaluation tool?",
      answer:
        "It is software that scores an agent against a written expectation. That can be one tool call, a whole trajectory, or whether a frozen set of tasks still finishes. Tracing without a score is observability, not evaluation.",
    },
    {
      question: "What is the best open source AI agent evaluation tool?",
      answer:
        "Promptfoo, Inspect, and Pydantic Evals are MIT. DeepEval is Apache licensed on PyPI. Langfuse’s core is MIT except for ee/ folders. Phoenix is Elastic License 2.0, which is source-available and forbids offering it as a hosted service. Which one fits depends on whether you need CI gates, sandboxes, or production traces.",
    },
    {
      question: "How is a behavioral eval different from a benchmark?",
      answer:
        "A behavioral eval checks one observable action, such as a tool call or a clarifying question. A benchmark scores a frozen set of tasks. Google’s 9 September 2026 harness-engineering post treats the benchmark as the destination and the behavioral eval as the check you use while you change the harness.",
    },
    {
      question: "Do I need a hosted platform?",
      answer:
        "Not to start. Promptfoo, DeepEval, Inspect, and Pydantic Evals run in your own process or CI. Hosted platforms add shared traces, annotation queues, and online evals on live traffic. Several open-source tools have an optional paid companion.",
    },
    {
      question: "How much do AI agent evaluation tools cost?",
      answer:
        "Open-source libraries are free to install. You still pay the model used as a judge, if any. LangSmith starts at $0 a seat then pay as you go, with Plus at $39 a seat. Langfuse Cloud has a free Hobby tier and paid Core, Pro, and Enterprise plans. Braintrust’s Starter plan is $0 a month with included credits; Pro is $249 a month. Confident AI is the hosted companion to DeepEval. Figures are list prices read in November 2026.",
    },
    {
      question: "Is Phoenix open source?",
      answer:
        "Phoenix’s repository uses Elastic License 2.0. You may run it yourself. You may not provide it to third parties as a hosted or managed service. That is not an OSI open-source licence. Langfuse’s non-ee code is MIT.",
    },
    {
      question: "Why are there no benchmark percentages on this page?",
      answer:
        "Those numbers belong on a dated leaderboard with the harness that produced them. Mixing scores from different tasks or versions as if they were one experiment would be misleading. The November 2026 harness benchmark copies official SWE-bench and Terminal-Bench rows instead.",
    },
  ],
  related: [
    {
      href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
      title: "How do you evaluate an AI agent harness?",
      description: "Behavioral evals, held-out tasks, and when a benchmark still matters.",
      kicker: "Guide",
      date: "2026-11-06",
    },
    {
      href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
      title: "How to build an eval harness for AI agents",
      description: "Tasks, isolated trials, and graders. Harbor, Inspect, or a local pytest suite.",
      kicker: "Guide",
      date: "2026-11-09",
    },
    {
      href: "/glossary/behavioral-evaluation",
      title: "Behavioral evaluation",
      description: "A test that checks one observable agent action rather than a whole benchmark score.",
      kicker: "Glossary",
    },
    {
      href: "/glossary/benchmark",
      title: "Benchmark",
      description: "A frozen task set with a published scoring rule.",
      kicker: "Glossary",
    },
    {
      href: "/reports/agent-harness-benchmark-november-2026",
      title: "Harness benchmark, November 2026",
      description: "Official board scores, not a substitute for your own regression tests.",
      kicker: "Report",
      date: "2026-11-05",
    },
    {
      href: COMPARISON_HUB.href,
      title: COMPARISON_HUB.title,
      description: "The hub for every sourced best-of table on this site.",
      kicker: "Hub",
    },
    {
      href: "/best/ai-agent-harnesses",
      title: "Best AI agent harness",
      description: "The runtimes these evals wrap.",
      kicker: "Comparison",
    },
    {
      href: "/directory/langchain",
      title: "LangChain",
      description: "Open-source framework and the LangSmith evaluation platform.",
      kicker: "Directory",
    },
  ],
};

export const comparisonPages: ComparisonPage[] = [
  harnessComparison,
  frameworkComparison,
  codingAgentsComparison,
  computerUseComparison,
  evaluationComparison,
  ...consumerComparisons,
];

export function comparisonBySlug(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}

export function comparisonsForTopic(topic: string) {
  return comparisonPages.filter((page) => page.topics.includes(topic));
}

export function comparisonsForCategory(category: string) {
  return comparisonPages.filter((page) => page.categories.includes(category));
}

export function comparisonsForListing(slug: string) {
  return comparisonPages.filter((page) => page.rows.some((row) => row.listingSlug === slug));
}

export function comparisonsForGlossary(slug: string) {
  const slugs = GLOSSARY_COMPARISON_SLUGS[slug];
  if (!slugs) return [];
  return comparisonPages.filter((page) => slugs.includes(page.slug));
}

export function glossaryShowsBestOf(slug: string) {
  return Object.prototype.hasOwnProperty.call(GLOSSARY_COMPARISON_SLUGS, slug);
}

export function comparisonItemListItems(page: ComparisonPage) {
  return page.rows.map((row) => ({
    name: row.name,
    url: row.listingSlug ? `/directory/${row.listingSlug}` : row.website,
    description: row.job,
    sameAs: row.website,
    applicationCategory: page.applicationCategory,
    software: true as const,
  }));
}

function assertClickTitle(label: string, metaTitle: string, metaDescription: string, keyword: string) {
  if (metaTitle.length > 60) {
    throw new Error(`${label} metaTitle is ${metaTitle.length} characters (max 60)`);
  }
  if (!metaTitle.startsWith(keyword)) {
    throw new Error(`${label} metaTitle must start with "${keyword}"`);
  }
  if (metaDescription.length < 135 || metaDescription.length > 165) {
    throw new Error(`${label} metaDescription is ${metaDescription.length} characters (aim ~150)`);
  }
}

assertClickTitle("hub", COMPARISON_HUB.metaTitle, COMPARISON_HUB.metaDescription, COMPARISON_HUB.title);
for (const page of comparisonPages) {
  assertClickTitle(page.slug, page.metaTitle, page.metaDescription, page.title);
}
