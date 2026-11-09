export type TopicShelfLink = { href: string; anchor: string; note: string };

/** Curated links for topic hubs. Auto lists below still include every tagged page. */
export const topicShelves: Record<string, { heading: string; answer: string; links: TopicShelfLink[] }> = {
  harnesses: {
    heading: "Which agent harness pages should you read first?",
    answer:
      "Start with the definition, then the evaluation guide, the comparison tables, the November benchmark, and the research notes.",
    links: [
      {
        href: "/blog/is-autogen-deprecated",
        anchor: "Is AutoGen deprecated?",
        note: "61,753 stars on November 9, 2026. The README says archived. GitHub’s archive flag was false.",
      },
      {
        href: "/research/how-many-github-stars-does-openclaw-have",
        anchor: "How many GitHub stars does OpenClaw have?",
        note: "394,222 at 07:41 UTC on November 9, 2026, beside ten other repositories from the same pull.",
      },
      {
        href: "/blog/what-is-an-ai-agent-harness",
        anchor: "What an AI agent harness is",
        note: "The loop, tools, memory, permissions, and stop rules around a model, including DeepSeek Harness.",
      },
      {
        href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
        anchor: "How to evaluate an AI agent harness",
        note: "Test one action you can see, then check that the whole job still finishes.",
      },
      {
        href: "/best/ai-agent-harnesses",
        anchor: "Best AI agent harness, 11 compared",
        note: "Coding, open-source, and local runtimes. Licence and list price, not a score.",
      },
      {
        href: "/best/ai-agent-frameworks",
        anchor: "Best AI agent frameworks, 19 free and open source",
        note: "Licence and latest GitHub release, read November 9, 2026.",
      },
      {
        href: "/reports/agent-harness-benchmark-november-2026",
        anchor: "Agent harness benchmark, November 2026",
        note: "Public SWE-bench and Terminal-Bench scores, each with the date on the source.",
      },
      {
        href: "/trackers/harnesses",
        anchor: "Harness comparison tracker",
        note: "The short pointer from the tracker to the sourced table.",
      },
      {
        href: "/research/harnessflow-mcts-harness-optimization",
        anchor: "HarnessFlow research note",
        note: "MCTS search over harness changes, from a November 4, 2026 paper.",
      },
      {
        href: "/research/speccompact-agent-context-compaction",
        anchor: "SpecCompact agent context compaction",
        note: "A faster summary inside a harness, with an 8.68× median in the paper’s Hermes study.",
      },
      {
        href: "/research/evolver-agent-exploration-evolving-capabilities",
        anchor: "Evolver research note",
        note: "A paper on turning agent exploration into capabilities the harness can keep.",
      },
      {
        href: "/research/react-reasoning-and-acting",
        anchor: "ReAct: Synergizing Reasoning and Acting in Language Models",
        note: "The 2022 paper behind Thought, Action, and Observation traces.",
      },
      {
        href: "/blog/what-is-harness-engineering-at-scale-thoughtworks-radar",
        anchor: "Harness engineering at scale",
        note: "Thoughtworks Technology Radar Volume 35, released November 4, 2026.",
      },
      {
        href: "/research/garry-tan-harness-evals-november-2026",
        anchor: "Garry Tan harness evals, November 2026",
        note: "A November 5 matrix that did not separate harnesses on pass rate, and the cost figures that report does print.",
      },
      {
        href: "/blog/claude-code-dont-ask-again",
        anchor: "Claude Code Don't Ask Again",
        note: "What a saved Bash approval writes into .claude/settings.local.json.",
      },
      {
        href: "/glossary/harness-engineering",
        anchor: "Harness engineering, defined",
        note: "The short glossary entry for designing the software around the model.",
      },
      {
        href: "/glossary/harness",
        anchor: "Harness, defined",
        note: "The one-sentence definition this site uses.",
      },
      {
        href: "/reports/ai-agent-framework-github-stats-november-2026",
        anchor: "Framework releases pulled November 5, 2026",
        note: "The earlier GitHub snapshot for the same 19 repositories.",
      },
    ],
  },
  shopping: {
    heading: "Which shopping-agent pages answer the buying questions?",
    answer:
      "The six-company timeline, the checkout guide, and the Amazon Rufus note are the three pages that say who can pay.",
    links: [
      {
        href: "/reports/ai-shopping-agents-next-6-months",
        anchor: "AI shopping agents next 6 months: 6 companies",
        note: "What Google, OpenAI, Amazon, Microsoft, Shopify, and Adobe have dated through May 2027.",
      },
      {
        href: "/blog/can-an-ai-shopping-agent-check-out-for-you",
        anchor: "Can an AI shopping agent check out for you?",
        note: "A payment path, a saved method, and an approval rule. The store remains the seller.",
      },
      {
        href: "/directory/amazon-rufus",
        anchor: "Amazon Rufus latest features and expansion in November 2026",
        note: "Alexa for Shopping, including the November 6 text rollout for some U.S. customers.",
      },
      {
        href: "/best/ai-agents-for-shopping",
        anchor: "Best AI agent for shopping",
        note: "A sourced table of shopping assistants. Not a star rating.",
      },
      {
        href: "/glossary/agentic-checkout",
        anchor: "What agentic checkout means",
        note: "The payment step, with the store still the seller.",
      },
      {
        href: "/glossary/shopping-agent",
        anchor: "What a shopping agent is",
        note: "An agent pointed at a catalog, a cart, and sometimes a payment.",
      },
      {
        href: "/glossary/product-feed",
        anchor: "What a product feed is",
        note: "The catalog file a shopping agent is allowed to quote.",
      },
    ],
  },
  "how-agents-work": {
    heading: "Which pages explain how AI agents work?",
    answer:
      "The control-loop guide is the start. The glossary, the ReAct paper, and the cost calculator answer the questions that follow.",
    links: [
      {
        href: "/blog/how-do-ai-agents-work",
        anchor: "How do AI agents work?",
        note: "The control loop from a goal to an action, checked against current product docs.",
      },
      {
        href: "/glossary/agent",
        anchor: "What are AI agents?",
        note: "On this site, a model plus the harness that runs tools and stops.",
      },
      {
        href: "/glossary/agent-loop",
        anchor: "What an agent loop is",
        note: "Propose a step, run a tool, read the result, repeat.",
      },
      {
        href: "/research/react-reasoning-and-acting",
        anchor: "ReAct: Synergizing Reasoning and Acting in Language Models",
        note: "The paper that interleaved a written thought with a tool action.",
      },
      {
        href: "/blog/can-an-ai-agent-use-your-computer",
        anchor: "Can an AI agent use your computer?",
        note: "Yes, when the product includes computer use. Re-checked November 7, 2026.",
      },
      {
        href: "/reports/browser-and-computer-use-agents-next-6-months",
        anchor: "Browser and computer-use agents next 6 months: 10 products, one date",
        note: "Ten live products from November 9, 2026 through May 9, 2027. The only named day is November 18.",
      },
      {
        href: "/agent-cost-calculator",
        anchor: "AI agent cost calculator and chatbot cost calculator",
        note: "A 30-day token bill from official prices. Seat prices are separate.",
      },
      {
        href: "/best/ai-coding-agents",
        anchor: "Best AI coding agents, with November 9 prices",
        note: "Claude Code, Codex, Cursor, and GitHub Copilot, free and paid.",
      },
      {
        href: "/best/ai-agent-frameworks",
        anchor: "Best AI agent frameworks",
        note: "19 free and open-source libraries, with release tags from November 9, 2026.",
      },
      {
        href: "/topics/harnesses",
        anchor: "Agent harnesses hub",
        note: "The software around the model, collected in one place.",
      },
    ],
  },
};
