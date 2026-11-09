import type { ComparisonPage } from "@/lib/comparisons";

/** List prices read from vendor pages on November 9, 2026. */
export const codingAgentsComparison: ComparisonPage = {
  slug: "ai-coding-agents",
  path: "/best/ai-coding-agents",
  title: "Best AI coding agents",
  heading: "Best AI coding agents (Nov 2026): 4 prices, free and paid",
  metaTitle: "Best AI coding agents: 4 prices (Nov 2026)",
  metaDescription:
    "Claude Code, Codex, Cursor, and GitHub Copilot list prices, free and paid, read November 9, 2026. No single best. Extra model use can cost more than the plan.",
  description:
    "There is no single best AI coding agent. On November 9, 2026, this page compares list prices for Claude Code, Codex, Cursor, and GitHub Copilot. Free and paid plans are both included. A plan price is not a count of how much code the agent will write.",
  summary:
    "Four coding agents. List prices read November 9, 2026 from the vendor pages. Free and paid. Not a quality ranking.",
  question: "What are the best AI coding agents in November 2026?",
  tableHeading: "How much do these AI coding agents cost?",
  tableLead:
    "Four products. Prices are the list prices on the vendor page read November 9, 2026. Equal monthly prices are not equal amounts of coding.",
  tableCaption: "Best AI coding agents — list price read November 9, 2026",
  bestForHeading: "Which AI coding agent fits which job?",
  bestForLead: "Job-fit notes from the product pages. Not scores, and not a claim that one writes better code.",
  methodHeading: "How were these AI coding agent prices checked?",
  methodLead:
    "Each price was copied from the vendor page named in the sources on November 9, 2026. A number that page did not print is left out.",
  methodNote:
    "Codex’s pricing page said Codex is included on ChatGPT Free, Go, Plus, Pro, Business, or Enterprise, and a feature note named the $100 and $200 Pro plans. The Free, Go, and Plus cards in that fetch did not print a dollar amount, so those stickers are not repeated here. An earlier check on November 6 is linked from the Codex listing. Cursor’s plan price does not include third-party models. GitHub’s credit totals are separate from the subscription price.",
  faqHeading: "What else do people ask about AI coding agent prices?",
  faqLead: "Short answers on free plans, Cursor, GitHub Copilot, and Claude Code limits.",
  applicationCategory: "DeveloperApplication",
  kind: "builder",
  verifiedOn: "2026-11-09",
  cellsNote:
    "Cells are list prices and plan limits copied from vendor pages on November 9, 2026. This is not a quality ranking.",
  columns: [
    { key: "name", label: "Agent" },
    { key: "vendor", label: "Maker" },
    { key: "bestFor", label: "Best for" },
    { key: "license", label: "Licence" },
    { key: "pricing", label: "List price" },
    { key: "platform", label: "Where it runs" },
    { key: "sources", label: "Sources" },
  ],
  topics: ["task-performance", "tools-saas", "how-agents-work", "harnesses"],
  categories: ["coding-agents"],
  takeaways: [
    "There is no single best AI coding agent. This page compares four list prices, not a score.",
    "On November 9, 2026, Cursor Plus is $8 a month and GitHub Copilot Pro is $10 a month. Claude Code is listed on Claude Pro at $20 a month, or $17 a month if $200 is paid up front.",
    "Free plans exist for Cursor, GitHub Copilot, and Codex. Claude’s Free card at $0 did not list Claude Code.",
  ],
  picks: [
    {
      title: "Best for the lowest paid sticker checked today",
      body: "Cursor Plus is $8 a month and includes Cursor’s own models. Third-party models are not on that plan. GitHub Copilot Pro is $10 a month.",
      href: "/directory/cursor",
    },
    {
      title: "Best for a coding agent inside a chat plan",
      body: "OpenAI’s Codex pricing page says Codex is included on ChatGPT plans, including Free. Claude Code is listed on the Pro card, not the Free card.",
      href: "/directory/codex",
    },
    {
      title: "Best for an editor you already use",
      body: "GitHub Copilot’s plans page lists editors including VS Code, Visual Studio, JetBrains, Xcode, and Neovim, plus the CLI and github.com.",
      href: "/directory/github-copilot",
    },
  ],
  rows: [
    {
      id: "claude-code",
      name: "Claude Code",
      vendor: "Anthropic",
      listingSlug: "claude-code",
      website: "https://claude.com/pricing",
      license: "Proprietary product on Claude plans",
      pricing:
        "Free $0 does not list Claude Code. Pro is $20/mo, or $17/mo if $200 is paid up front, and the Pro card lists Claude Code. Max is $100/mo with 5× Pro usage. Read November 9, 2026.",
      platform: "Included on the Pro pricing card. Product surfaces are on the Claude Code listing.",
      bestFor: "A coding agent on a Claude plan",
      job: "Anthropic’s pricing page lists Claude Code on Pro. The Free card does not.",
      sourceIds: [1],
    },
    {
      id: "codex",
      name: "Codex",
      vendor: "OpenAI",
      listingSlug: "codex",
      website: "https://chatgpt.com/codex/pricing/",
      license: "Included with ChatGPT plans",
      pricing:
        "Included on Free, Go, Plus, Pro, Business, or Enterprise. A feature note names $100 and $200 Pro plans. Free, Go, and Plus dollar amounts were not on the cards this fetch read. Read November 9, 2026.",
      platform: "The pricing page describes Codex with ChatGPT plans, plus an API-key path billed at API rates.",
      bestFor: "Coding inside a ChatGPT plan",
      job: "OpenAI says Codex is included on those ChatGPT plans. Limits depend on the plan and are not a fixed message count.",
      sourceIds: [2],
    },
    {
      id: "cursor",
      name: "Cursor",
      vendor: "Anysphere",
      listingSlug: "cursor",
      website: "https://cursor.com/pricing",
      license: "Proprietary editor",
      pricing:
        "Free $0, Plus $8/mo, Premium $30/mo, Super $100/mo, Ultra $200/mo. Annual: $80, $300, $1,000, $2,000. Teams $30, $100, or $200 per seat/mo. Third-party models are extra. Prices exclude tax. Read November 9, 2026.",
      platform: "Code editor. New plans are part of The X Subscription, shared with Grok.",
      bestFor: "An editor with its own models on Plus",
      job: "Plus includes Cursor’s Grok and Composer models only. Premium and above can add third-party models at API list price.",
      sourceIds: [3, 4],
    },
    {
      id: "github-copilot",
      name: "GitHub Copilot",
      vendor: "GitHub",
      listingSlug: "github-copilot",
      website: "https://github.com/features/copilot/plans",
      license: "Proprietary product",
      pricing:
        "Free $0 with 2,000 completions/mo. Pro $10/mo (1,500 credits), Pro+ $39/mo (7,000), Max $100/mo (20,000). One credit is $0.01. Read November 9, 2026.",
      platform: "Editors, github.com, and the Copilot CLI, as the plans page lists them.",
      bestFor: "An agent inside GitHub and an editor",
      job: "Paid plans include a monthly AI-credit allowance. Completions on paid plans are not billed in credits.",
      sourceIds: [5, 6],
    },
  ],
  sources: [
    { title: "Anthropic, Plans and pricing (read November 9, 2026)", url: "https://claude.com/pricing" },
    { title: "OpenAI, Codex pricing (read November 9, 2026)", url: "https://chatgpt.com/codex/pricing/" },
    { title: "Cursor, Pricing (read November 9, 2026)", url: "https://cursor.com/pricing" },
    {
      title: "Cursor, Models and pricing (read November 9, 2026)",
      url: "https://cursor.com/docs/models-and-pricing",
    },
    {
      title: "GitHub, Copilot plans (read November 9, 2026)",
      url: "https://github.com/features/copilot/plans",
    },
    {
      title: "GitHub Docs, Usage-based billing for individuals (read November 9, 2026)",
      url: "https://docs.github.com/en/copilot/concepts/billing-and-usage/individuals/billing",
    },
  ],
  faq: [
    {
      question: "What is the GitHub Copilot price in November 2026?",
      answer:
        "On November 9, 2026, GitHub lists Copilot Free at $0, Pro at $10 a month, Pro+ at $39 a month, and Max at $100 a month. Pro includes 1,500 AI credits, Pro+ 7,000, and Max 20,000. One credit is $0.01.",
    },
    {
      question: "How much does Cursor AI cost?",
      answer:
        "On November 9, 2026, Cursor lists Free at $0, Plus at $8 a month, Premium at $30, Super at $100, and Ultra at $200. Teams is $30, $100, or $200 per seat. Third-party models are not included in those prices.",
    },
    {
      question: "Is there a free AI coding agent?",
      answer:
        "Yes. Cursor Free, GitHub Copilot Free, and Codex on ChatGPT Free are $0 plans with limits. Claude’s Free card is also $0, and it did not list Claude Code when read on November 9, 2026.",
    },
    {
      question: "What are the Claude Code limits?",
      answer:
        "The pricing page read on November 9, 2026 says Pro includes more usage than Free every five hours and every week, and Max is 5 times Pro usage on both windows. It does not print a fixed number of coding tasks. A longer comparison with Codex, checked earlier in November, is on the Claude Code versus Codex pricing guide.",
    },
  ],
  related: [
    {
      href: "/blog/claude-code-vs-codex-pricing",
      title: "Claude Code vs Codex pricing",
      description: "Plan ladders checked November 6, 2026, including stickers this November 9 fetch did not reprint.",
      kicker: "Guide",
    },
    {
      href: "/directory/cursor",
      title: "Cursor",
      description: "What Cursor AI is, and the November 9, 2026 price.",
      kicker: "Directory",
    },
    {
      href: "/directory/github-copilot",
      title: "GitHub Copilot",
      description: "The November 9, 2026 price and credit allowance.",
      kicker: "Directory",
    },
    {
      href: "/reports/ai-coding-agents-next-30-days",
      title: "AI coding agents, 8 Nov to 8 Dec 2026",
      description: "Eleven tools, with prices checked November 8, 2026, and three dates already on official pages.",
      kicker: "Report",
    },
    {
      href: "/agent-cost-calculator",
      title: "AI agent cost calculator",
      description: "A 30-day model bill from official per-token prices. Separate from these seat prices.",
      kicker: "Calculator",
    },
    {
      href: "/topics/harnesses",
      title: "Agent harnesses",
      description: "The hub for the software around a coding agent.",
      kicker: "Topic",
    },
  ],
};
