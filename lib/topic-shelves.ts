export type TopicShelfLink = { href: string; anchor: string; note: string };

/** Curated links for topic hubs. Auto lists below still include every tagged page. */
export const topicShelves: Record<string, { heading: string; answer: string; links: TopicShelfLink[] }> = {
  harnesses: {
    heading: "Which agent harness pages should you read first?",
    answer:
      "Start with the definition, then the evaluation guide, how to build an eval harness, the comparison tables, the November benchmark, and the research notes.",
    links: [
      {
        href: "/blog/langgraph-vs-crewai-vs-openai-agents-sdk",
        anchor: "LangGraph vs CrewAI vs the OpenAI Agents SDK",
        note: "Three MIT libraries. langgraph 1.2.20, crewai 1.15.39, and openai-agents 0.24.0 on November 10, 2026. The bills are LangSmith, AMP, and the model API.",
      },
      {
        href: "/blog/what-is-muse-ember",
        anchor: "What is Muse Ember?",
        note: "Meta’s November 9, 2026 worker model. $0.10 and $0.50 per million tokens, scored against Haiku 5.5 and GPT-6 Luna.",
      },
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
        href: "/research/how-many-github-stars-does-deepseek-harness-have",
        anchor: "277,506 GitHub stars on DeepSeek Harness",
        note: "03:35 UTC on November 10, 2026. First of 7 repositories with harness in the name and more than 10,000 stars.",
      },
      {
        href: "/blog/what-is-an-ai-agent-harness",
        anchor: "What an AI agent harness is",
        note: "The loop, tools, memory, permissions, and stop rules around a model, including DeepSeek Harness.",
      },
      {
        href: "/blog/what-is-multi-agent-orchestration",
        anchor: "What is multi-agent orchestration?",
        note: "November 5, 2026 paper: dropping the interaction term costs 7.2 and 17.3 points on the authors’ code tasks.",
      },
      {
        href: "/blog/how-do-you-evaluate-an-ai-agent-harness",
        anchor: "How to evaluate an AI agent harness",
        note: "Test one action you can see, then check that the whole job still finishes.",
      },
      {
        href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
        anchor: "How to build an eval harness for AI agents",
        note: "Isolate every trial, grade the environment, keep a held-out set. Harbor, Inspect, or local pytest.",
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
        href: "/trackers/downloads",
        anchor: "AI agent framework downloads tracker",
        note: "PyPI and npm file requests, refreshed daily. A download is not a user.",
      },
      {
        href: "/trackers/agents-md",
        anchor: "AGENTS.md adoption tracker",
        note: "Live GitHub search for the filename, kept next to the October 2026 census.",
      },
      {
        href: "/tools/agents-md-generator",
        anchor: "AGENTS.md generator",
        note: "A free in-browser draft from your stack and commands. Nothing you type is stored.",
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
        href: "/blog/agentforce-vs-copilot-studio-pricing-november-2026",
        anchor: "Agentforce is $0.10 per action. Copilot Studio’s example is 141 credits.",
        note: "November 10, 2026 list prices. A Help Agent Resolution is $2.00. The $0.04 action is one meter.",
      },
      {
        href: "/research/livekit-agents-vs-pipecat-installs-november-2026",
        anchor: "LiveKit Agents had 4,583,195 downloads. Pipecat had 2,007 more stars.",
        note: "October 10 through November 8, 2026, PyPI without mirrors. Stars read 07:38 UTC on November 10.",
      },
      {
        href: "/blog/what-is-elevenagents-campaign-manager",
        anchor: "What is ElevenAgents Campaign Manager?",
        note: "ElevenLabs, November 9, 2026. Outbound until a named outcome, default cap of 6 attempts.",
      },
      {
        href: "/blog/how-do-ai-agents-work",
        anchor: "How do AI agents work?",
        note: "The control loop from a goal to an action, checked against current product docs.",
      },
      {
        href: "/blog/mcp-server-meaning-42072-github-repos",
        anchor: "MCP server meaning: 42,072 repos carry the tag",
        note: "GitHub topic total at 03:35 UTC on November 10, 2026, set next to the November 8 registry count of 59,506.",
      },
      {
        href: "/blog/how-to-build-an-eval-harness-for-ai-agents",
        anchor: "How to build an eval harness for AI agents",
        note: "The evaluation layer: isolated trials, graders, and a held-out set.",
      },
      {
        href: "/blog/what-is-multi-agent-orchestration",
        anchor: "What is multi-agent orchestration?",
        note: "An orchestrator chooses the next worker. A November 5, 2026 paper measures the cost of ignoring pairs of those choices.",
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
        href: "/trackers/downloads",
        anchor: "AI agent framework downloads tracker",
        note: "What pip and npm fetched, refreshed daily from pypistats and npm.",
      },
      {
        href: "/trackers/agents-md",
        anchor: "AGENTS.md adoption tracker",
        note: "How many public files are named AGENTS.md, next to the October 2026 census.",
      },
      {
        href: "/tools/agents-md-generator",
        anchor: "AGENTS.md generator",
        note: "Write the file from your commands. The form stays in the browser.",
      },
      {
        href: "/topics/harnesses",
        anchor: "Agent harnesses hub",
        note: "The software around the model, collected in one place.",
      },
    ],
  },
};
