import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/enterprise-agent-platforms-next-6-months";
export const title =
  "Enterprise agent platforms, Nov 2026 to May 2027: Agent Builder ends November 30. A standard action is still $0.10.";
export const thesis =
  "Seven vendors publish a meter. None of them prices an AI employee by headcount, and the only product removal dated inside this window is OpenAI’s Agent Builder on November 30.";
export const description =
  "What Salesforce Agentforce, Microsoft Copilot Studio, Google Gemini Enterprise, AWS Bedrock AgentCore, ServiceNow, OpenAI, and Workday actually bill for agents from November 2026 through May 2027. List prices read November 12, 2026. Agent Builder ends November 30. Salesforce reports December 2.";
export const readOn = "2026-11-12";

const flexPerCredit = 500 / 100_000;
const standardAction = 20 * flexPerCredit;
const voiceAction = 30 * flexPerCredit;
const helpResolution = 400 * flexPerCredit;
const slackbotStandard = 40 * flexPerCredit;
const slackbotAdvanced = 200 * flexPerCredit;
const packCredit = 200 / 25_000;
const actionPack = 5 * packCredit;
const actionPayg = 5 * 0.01;
const illustrativePack = 141 * packCredit;
const illustrativePayg = 141 * 0.01;
const newConversationPack = 461 * packCredit;
const maxCredits = 2_750_000;
const maxStandardActions = maxCredits / 20;
const maxCreditDollars = maxCredits * flexPerCredit;
const googlePerMillion = (1_000_000 / 15_000) * 0.085;
const awsPerMillion = 0.005 * 1_000;

if (standardAction !== 0.1) throw new Error("standard action");
if (voiceAction !== 0.15) throw new Error("voice action");
if (helpResolution !== 2) throw new Error("help resolution");
if (slackbotStandard !== 0.2) throw new Error("slackbot standard");
if (slackbotAdvanced !== 1) throw new Error("slackbot advanced");
if (packCredit !== 0.008) throw new Error("pack credit");
if (actionPack !== 0.04) throw new Error("action pack");
if (actionPayg !== 0.05) throw new Error("action payg");
if (Math.abs(illustrativePack - 1.128) > 1e-9) throw new Error("141 pack");
if (illustrativePayg !== 1.41) throw new Error("141 payg");
if (Math.abs(newConversationPack - 3.688) > 1e-9) throw new Error("461 pack");
if (maxStandardActions !== 137_500) throw new Error("max actions");
if (maxCreditDollars !== 13_750) throw new Error("max dollars");
if (Math.abs(googlePerMillion - 17 / 3) > 1e-9) throw new Error("google gateway");
if (awsPerMillion !== 5) throw new Error("aws gateway");

export const keyNumbers = [
  {
    value: "Nov 30",
    label: "Agent Builder and Evals come off the OpenAI platform",
    note: "The June 3, 2026 update is still on the AgentKit post. OpenAI points builders to the Agents SDK or to Workspace Agents in ChatGPT.",
  },
  {
    value: "$0.10",
    label: "one Salesforce standard action",
    note: "20 Flex Credits. The pricing page lists Flex Credits at $500 per 100,000. The rate card, updated November 3, 2026, still prints 20.",
  },
  {
    value: "141",
    label: "Copilot Credits in Microsoft’s own reasoning example",
    note: "Token meter only, before feature rates. At $200 per 25,000 credits that is $1.128. Microsoft says the token counts are illustrative.",
  },
  {
    value: "Dec 2",
    label: "Salesforce prints the next Agentforce number",
    note: "Q3 FY27 results, announced November 10. The last figure is still the quarter ended July 31: Agentforce ARR exceeded $1.5 billion.",
  },
];

export const findings = [
  "OpenAI’s Agent Builder and Evals products stop on November 30, 2026. Workspace Agents stay, in research preview, and on a token-based Enterprise agreement the rate card prices them at GPT-5.6 Sol: $4 per million input tokens, $0.40 cached, $20 output. That promotional rate is available at least through November 21. A credit-based agreement is a different card.",
  "A Salesforce standard action is $0.10. A Copilot Studio agent action is 5 credits: $0.04 in a $200 pack, or $0.05 at $0.01 pay-as-you-go. Microsoft’s illustrative reasoning follow-up is 141 credits on the token meter alone. ServiceNow bills a small agentic workflow at 25 assists and does not print a dollar. Workday’s own example is 1 credit or 5, and the page does not print a dollar either. These rows do not add.",
  "Microsoft has provisioned an Entra Agent ID for new Copilot Studio agents since May 2026. Salesforce’s Flex Credits rate card, updated November 3, still lists Headless Platform Interaction as TBA, and the September 17 help article still says agentic usage is not metered. The badge and the invoice are not the same announcement.",
  "No page in this set names a product day in January, February, March, April, or May 2027. The dated marks inside the window are Ignite on November 17, the Sol promotion through at least November 21, Agent Builder on November 30, re:Invent from November 30 to December 4, and Salesforce’s earnings on December 2.",
];

export const executiveSummary = [
  "Buyers searching for an AI employee, or for AI staff, are asking for a headcount. The platforms that sell agents into a company do not bill one. On November 12, 2026 the public meters were an action, a conversation, a credit, an assist, a token, and a vCPU-hour. A [small-business card](/blog/how-much-does-an-ai-employee-cost) is a different invoice. This page is the enterprise one, through May 12, 2027. [[1]][[7]][[8]][[16]][[21]][[22]]",
  "Two dates are already on primary pages, and they are not price cuts. OpenAI’s June 3, 2026 update, still sitting on the AgentKit post, says Agent Builder and Evals are unavailable from November 30, 2026. Salesforce will release third-quarter fiscal 2027 results on December 2, 2026. The last Agentforce annual recurring revenue it has printed exceeded $1.5 billion for the quarter ended July 31, and from that quarter the figure includes Slackbot and Headless 360. A bigger number on December 2 will not, by itself, say the action got cheaper. [[3]][[4]][[10]]",
  "The comparison that looks easy is the one to refuse. Twenty Salesforce Flex Credits are $0.10. Five Copilot Credits are $0.04 in a pack. Microsoft’s own follow-up on a reasoning model is 141 credits before the feature rates, which is $1.128 at the pack price. The [November 10 credit reading](/blog/agentforce-vs-copilot-studio-pricing-november-2026) does that arithmetic for those two vendors and was not edited for this page. The pages were read again on November 12. The $0.10, the $2 resolution, the pack, and the 141 were still there. [[1]][[2]][[7]][[8]]",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "salesforce-meters",
    title: "Salesforce list price of six named meters, November 12, 2026",
    caption:
      "Each bar is the list price of the unit named on that row. A conversation is not an action. A help resolution is 400 Flex Credits. Slackbot standard is 40 credits and Slackbot advanced is 200. Do not add the bars, and do not treat the short bars as a cheaper product. They are a smaller unit.",
    unit: "USD, list",
    source:
      "Agentforce pricing page, read November 12, 2026, and the Flex Credits rate card updated November 3, 2026. Dollar figures on the credit rows are the credit count times $0.005. The conversation bar is the $2 printed on the pricing page. [[1]][[2]]",
    series: ["List price"],
    categories: [
      { label: "Standard action", values: [standardAction], displays: ["$0.10"] },
      { label: "Voice action", values: [voiceAction], displays: ["$0.15"] },
      { label: "Slackbot standard", values: [slackbotStandard], displays: ["$0.20"] },
      { label: "Slackbot advanced", values: [slackbotAdvanced], displays: ["$1.00"] },
      { label: "Conversation", values: [2], displays: ["$2.00"] },
      { label: "Help resolution", values: [helpResolution], displays: ["$2.00"] },
    ],
  },
  {
    id: "servicenow-assists",
    title: "ServiceNow assists for one MCP gateway call and three workflow sizes",
    caption:
      "Assists, not dollars. The overview effective August 24, 2026 does not print a price per assist. A small workflow is less than 4 tool actions. Medium is 5 to 8. Large is 9 to 20. Actions past 20 start another workflow. The gateway row is one call and response to a third-party MCP server.",
    unit: "assists",
    source: "ServiceNow Assist Overview, effective August 24, 2026. Read November 12, 2026. [[21]]",
    series: ["Assists"],
    categories: [
      { label: "MCP gateway call", values: [1], displays: ["1"] },
      { label: "Small workflow", values: [25], displays: ["25"] },
      { label: "Medium workflow", values: [50], displays: ["50"] },
      { label: "Large workflow", values: [150], displays: ["150"] },
    ],
  },
  {
    id: "gateway-million",
    title: "Gateway calls, dollars per million, from the two pages that publish a call rate",
    caption:
      "AWS lists $0.005 per 1,000 Gateway invocations, which is $5.00 per million. Google says one Agent Compute vCPU-hour at $0.085 corresponds to 15,000 Agent Gateway calls. One million divided by 15,000, times $0.085, is $5.666…, shown as $5.67. Google’s figure is that arithmetic. It is not a separate SKU. The calls are not the same product.",
    unit: "USD per million calls",
    source:
      "Amazon Bedrock AgentCore pricing and Gemini Enterprise Agent Platform pricing, both read November 12, 2026. [[14]][[16]]",
    series: ["USD per million"],
    categories: [
      { label: "AWS Gateway", values: [awsPerMillion], displays: ["$5.00"] },
      { label: "Google, computed", values: [googlePerMillion], displays: ["$5.67"] },
    ],
  },
];

export const chapters: ReportChapter[] = [
  {
    id: "meters",
    title: "The meter is the product",
    blocks: [
      {
        kind: "p",
        text: "An enterprise agent platform is the thing a company buys so an agent can work inside the business: a CRM, a service desk, a suite, a cloud runtime, an HR system. The sales name is often a digital worker or an AI employee. The contract is not. On the pages read November 12, 2026, seven vendors were current. Agentspace is the old name on Google’s own blog: the editor’s note says it is now part of Gemini Enterprise. OpenAI’s AgentKit post is still live, and it now says the visual builder is leaving. Workday, ServiceNow, AWS, Microsoft, and Salesforce each have a current pricing or billing page. A vendor that did not survive that check is not in the table. [[10]][[18]][[20]]",
      },
      {
        kind: "table",
        caption:
          "Enterprise agent meters read November 12, 2026. Dollar figures from a credit count are arithmetic on the published credit price. A blank dollar means the page did not print one. Units are not interchangeable.",
        headers: ["Vendor", "Unit", "List price", "What one unit is"],
        rows: [
          [
            "Salesforce Agentforce",
            "Standard action",
            "$0.10",
            "20 Flex Credits. Custom action is the same 20. Sandbox multiplier is 16. [[1]][[2]]",
          ],
          [
            "Salesforce Agentforce",
            "Voice action",
            "$0.15",
            "30 Flex Credits. Some customers are billed on Voice Minutes instead. The rate card says so and does not price that second meter here. [[2]]",
          ],
          [
            "Salesforce Agentforce",
            "Conversation",
            "$2.00",
            "One conversation. Flex Credits and Conversations are not supported in the same org. [[1]]",
          ],
          [
            "Salesforce Agentforce",
            "Help or IT/HR resolution",
            "$2.00",
            "400 Flex Credits in production. Sandbox multiplier is 0. [[1]][[2]]",
          ],
          [
            "Microsoft Copilot Studio",
            "Agent action, pack",
            "$0.04",
            "5 credits. Pack is $200 for 25,000 credits a month, billed annually. Unused pack credits do not roll to the next month. [[7]][[8]]",
          ],
          [
            "Microsoft Copilot Studio",
            "Agent action, pay-as-you-go",
            "$0.05",
            "5 credits at $0.01. Pay-as-you-go starts after the pack is exhausted if that meter is on. [[7]][[8]]",
          ],
          [
            "Microsoft 365 Copilot",
            "User",
            "$30 per user per month",
            "Billed annually, on the licensing guide. Employee-facing Copilot Studio use is no charge when the agent runs as that licensed user. Fair-use limits apply. [[8]]",
          ],
          [
            "Google Gemini Enterprise app",
            "Seat",
            "Not printed",
            "Per user per month. Bought separately from the Agent Platform. Business edition is capped at 300 people. [[17]]",
          ],
          [
            "Google Agent Platform",
            "vCPU-hour",
            "$0.085",
            "Agent Compute. The same hour is the page’s correspondence for 15,000 Agent Gateway calls. Model tokens are extra. [[16]]",
          ],
          [
            "AWS Bedrock AgentCore",
            "1,000 Gateway invocations",
            "$0.005",
            "ListTools, InvokeTool, Ping. Identity is no extra charge through Runtime or Gateway. [[14]]",
          ],
          [
            "ServiceNow",
            "Agentic workflow",
            "Not printed",
            "25, 50, or 150 assists by tool-action count. The assist pool is the contract. Overage may be invoiced. [[21]]",
          ],
          [
            "Workday",
            "Agent skill",
            "Not printed",
            "1 credit for a Self-Service retrieval, 5 for autonomous completion, on Workday’s own example. [[22]]",
          ],
          [
            "OpenAI Workspace Agents",
            "1 million tokens",
            "$4 / $0.40 / $20",
            "GPT-5.6 Sol input, cached input, and output, on eligible token-based Enterprise agreements. Research preview. [[11]][[12]]",
          ],
        ],
      },
      {
        kind: "callout",
        title: "Do not add the rows",
        text: "A $0.10 action, a $0.04 action, a 25-assist workflow, and a $4-per-million token rate are four contracts. A buyer who picks the smallest sticker has picked the smallest unit, which is a different mistake.",
      },
      {
        kind: "chart",
        id: "salesforce-meters",
      },
      {
        kind: "p",
        text: "Salesforce is the vendor that prints the most dollars, so it is the chart. The $2 conversation and the $2 help resolution are the same sticker on different units. The help resolution is 400 credits. The conversation is not credits at all, and the pricing page says the two buying models will not be supported in the same org. Slackbot, which the Q2 earnings release folded into Agentforce ARR, is on the rate card at 40 credits for a standard action and 200 for an advanced one. That is $0.20 and $1.00 at the $500-per-100,000 list. [[1]][[2]][[3]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Ask which row the quote is on before you ask for a discount. A seat that says unmetered, a credit pool that expires, and a conversation price that cannot share an org with credits are three different budgets. The [credit-by-credit Agentforce and Copilot Studio page](/blog/agentforce-vs-copilot-studio-pricing-november-2026) is the November 10 worksheet. This chapter is the November 12 re-read, plus the vendors that page does not cover.",
      },
    ],
  },
  {
    id: "what-the-unit-buys",
    title: "What $0.10, five credits, and 25 assists actually buy",
    blocks: [
      {
        kind: "h3",
        text: "Salesforce sells the action, the seat, and a credit pool that does not roll",
      },
      {
        kind: "p",
        text: "The pricing page defines an action as one function the agent executes: updating a record, summarizing a case, answering a product question, or running a custom prompt or flow. Each action is metered on its own. Standard and custom actions are 20 Flex Credits. Voice actions are 30. Unused Flex Credits do not roll into the next term. If you pass the entitlement, the page says there is no overage penalty: the contracted rate is billed monthly in arrears. That is the opposite of a hard stop. [[1]]",
      },
      {
        kind: "p",
        text: "Three seat prices sit beside the credits. The employee add-on is $125 per user per month and says usage for employees is unmetered. The Industries add-on is $150. The Agentforce user license is $5 per user per month and says it requires Flex Credits, so the $5 is the door and the credits are the meter. Foundations is $0 and names the builder, Prompt Builder, Agent Script, Coworker, and Vibes. It does not print a production credit allowance. Max Edition includes the add-on and 2.75 million Flex Credits per org per year. The page does not print the Max subscription price. Divided by 20, the allowance is 137,500 standard actions. At $0.005 a credit it is $13,750 of list-price credit inside whatever the edition costs. It is not a gift of $13,750. [[1]]",
      },
      {
        kind: "p",
        text: "The Coworker user license is on the same page as a per-user SKU. The copy read November 12 lists included searches, the org’s security and access policies, and 30 MB of indexing per user per month. It does not print a dollar. This report does not supply one. Pre-Commit, a second buying model, says it will be widely available later this year and does not name a day. Pay-as-you-go and Pre-Commit apply to Flex Credits. The page says conversation pricing, the add-ons, and Agentforce 1 Editions are not on those two models. [[1]]",
      },
      {
        kind: "callout",
        title: "One cell on the voice example does not match its own row",
        text: "Example 5 prints 4 actions, 120 Flex Credits, and a per-use-case cost of $0.15, then a monthly total of $180 for 36,000 credits. Four voice actions at 30 credits are 120 credits, which is $0.60 at $0.005, not $0.15. The $180 matches 36,000 credits. It does not match 300 calls times $0.15, which is $45. Use the rate card for the voice action. Do not use that $0.15 cell as the price of the 120-credit example.",
      },
      {
        kind: "h3",
        text: "Copilot Studio’s five-credit action is the cheap line. The reasoning example is not.",
      },
      {
        kind: "p",
        text: "Copilot Credits are the unit. Learn’s billing page, read November 12, prices a classic answer at 1 credit, a generative answer at 2, an agent action at 5, and tenant-graph grounding at 10. Agent-flow actions are 13 credits per 100 actions. A reasoning model adds a second meter: 10 credits per 1,000 billed tokens, on top of the feature rate. Cached input that the model only reads is not billed. Input it writes, and output, including reasoning tokens, are billed. Computer-using agents are billed at the agent-action rate, and that use is not included in the Microsoft 365 Copilot license. [[7]]",
      },
      {
        kind: "p",
        text: "Microsoft’s own follow-up, on Claude Opus 4.7, bills 14,100 tokens. At 10 credits per 1,000 tokens that is 141 credits, $1.128 in a pack and $1.41 at pay-as-you-go, before the feature rates for the turn. The same page’s new-conversation variant is 461 credits, $3.688 in a pack, before the generative-answer line. The page says the token counts are illustrative. Eleven Salesforce standard actions, at $0.10, are $1.10. That does not buy the 141-credit line. It is a different meter. [[7]][[8]]",
      },
      {
        kind: "p",
        text: "Enforcement is specific. Learn says a tenant on the prepaid model is enforced at 125% of prepaid capacity, and the environment’s agents are then blocked, including a conversation already underway. An environment that bills the overage to pay-as-you-go is not blocked when the pack runs out. The licensing guide prices Microsoft 365 Copilot at $30 per user per month, billed annually, and says employee-facing Copilot Studio use is included when the person has that license and the agent runs as that user. Fair-use limits apply, and Microsoft says it can change them. The guide does not print the number at which fair use stops. [[7]][[8]]",
      },
      {
        kind: "h3",
        text: "ServiceNow and Workday publish the count and withhold the dollar",
      },
      {
        kind: "p",
        text: "ServiceNow’s Assist Overview, effective August 24, 2026, defines an assist as the unit for Now Assist skills. The pool is contractual, measured daily, and resets on a 12-month anniversary. Production and sub-production both consume assists. If usage passes the entitlement, ServiceNow may invoice the excess. The overview does not print a dollar per assist. For agents, the rows that matter are the workflow sizes: less than 4 tool actions is 25 assists, 5 to 8 is 50, and 9 to 20 is 150. One action is one tool invocation. Past 20 actions, a new workflow starts. A single information lookup in Agent Studio is 1 assist. So is one AI Gateway call from a registered MCP client to a third-party MCP server. [[21]]",
      },
      {
        kind: "chart",
        id: "servicenow-assists",
      },
      {
        kind: "p",
        text: "Workday’s Flex Credits page says you pay for the work the AI completes, not every token, and not headcount. The worked example is the Self-Service Agent: 1 credit for instant information retrieval, 5 credits for autonomous task completion. Credits are an annual purchase, with complimentary credits sized to the company, and the page says most agents can be tested free in non-production. It does not print a dollar per credit. A quote that answers “what does a Workday agent cost?” with one number is not using this page. [[22]]",
      },
      {
        kind: "h3",
        text: "OpenAI’s remaining enterprise agent is a token line, and the builder that is leaving is dated",
      },
      {
        kind: "p",
        text: "The AgentKit post is dated October 6, 2025. The update dated June 3, 2026 says OpenAI is winding down Agent Builder and Evals. From November 30, 2026 they will not be available on the OpenAI platform. The same paragraph recommends the Agents SDK for workflows that should continue as code, and Workspace Agents in ChatGPT for natural-language prompting. ChatKit and the Connector Registry are described in the original post. The update does not say the registry is shutting down. The registry, in that post, includes third-party MCP servers. [[10]]",
      },
      {
        kind: "p",
        text: "Workspace Agents are in research preview for ChatGPT Business, Enterprise, Edu, and Teachers. The help article says they are off by default at launch for Enterprise, and admins can turn them on. The product page lists role-based access, audit logs, approval gates before a send or a record change, and a central admin console. The token rate card, for eligible token-based Enterprise agreements, prices Workspace Agents on GPT-5.6 Sol at $4, $0.40, and $20 per million input, cached input, and output tokens. It says the Sol promotional pricing is available at least through November 21, 2026, and that the promotion does not apply to legacy metering. Customers still on a credit card are told to use a different rate card. This page did not price that card. Enterprise seat price is not a number on these pages. It is custom. [[11]][[12]][[13]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "If the proposal says “per agent” or “per employee,” ask for the unit in the vendor’s own noun: action, conversation, Copilot Credit, assist, token, or vCPU-hour. Then ask what happens at zero. Salesforce bills the contracted rate in arrears. Copilot Studio can block the agent at 125% of a prepaid pack. ServiceNow may invoice the excess assists. Those are three different failure modes, and they are already written down.",
      },
    ],
  },
  {
    id: "gateways",
    title: "The one place two vendors almost share a unit",
    blocks: [
      {
        kind: "p",
        text: "Most of the table cannot be drawn on one axis. Gateway calls can, with a label on the arithmetic. AWS prices AgentCore Gateway at $0.005 per 1,000 API invocations, and the pricing page names ListTools, InvokeTool, and Ping. That is $5.00 per million invocations. Google’s Agent Platform pricing page says one Agent Compute vCPU-hour, at $0.085, corresponds to 15,000 API calls or authorization requests through Agent Gateway during agent execution. A million calls is 1,000,000 ÷ 15,000 × $0.085, which is $5.666…, rounded here to $5.67. Model tokens on Google are a separate bill. AWS model use is also separate. The nearness of $5 and $5.67 is a coincidence of two published ratios. It is not a market price for “an MCP call.” [[14]][[16]]",
      },
      {
        kind: "chart",
        id: "gateway-million",
      },
      {
        kind: "table",
        caption:
          "MCP and A2A as the vendor pages read on November 12, 2026 describe them. A blank means this brief’s sources did not print that claim. It is not a finding that the feature is absent from the product.",
        headers: ["Vendor", "MCP", "A2A", "Where the page says it"],
        rows: [
          [
            "Salesforce",
            "Hosted MCP can expose an Agentforce agent or a prompt template as a tool. Execution runs as the authenticated user.",
            "Not stated on the pages read for this brief.",
            "Developer doc, read November 12. [[6]]",
          ],
          [
            "Microsoft Copilot Studio",
            "MCP servers can be added. They do not add API permissions to the Entra Agent ID. Custom connectors and REST tools are in the same sentence.",
            "Not stated on the pages read for this brief.",
            "Identity article, read November 12. [[9]]",
          ],
          [
            "Google",
            "Agent Platform supports MCP. The April 22, 2026 post names it next to ADK.",
            "The same post names A2A. The app FAQ says Standard and Plus can bring external agents in through A2A.",
            "April 22 post and the app FAQ. [[17]][[18]]",
          ],
          [
            "AWS AgentCore",
            "Gateway examples are MCP tool calls. Invocations are the $0.005 line.",
            "Not named on the pricing page read for this brief.",
            "Pricing page. [[14]]",
          ],
          [
            "ServiceNow",
            "One AI Gateway call to a third-party MCP server is 1 assist.",
            "Not stated in the Assist Overview.",
            "Overview effective August 24, 2026. [[21]]",
          ],
          [
            "OpenAI",
            "The October 6, 2025 AgentKit post says the Connector Registry includes third-party MCPs. The June 2026 update does not withdraw that sentence.",
            "Not stated on the Workspace Agents page read for this brief.",
            "AgentKit post. [[10]]",
          ],
          [
            "Workday",
            "Not stated on the Flex Credits page.",
            "Not stated on the Flex Credits page.",
            "The page says Agent-Ready Tools connect Workday to any agent, and it does not name the protocol. [[22]]",
          ],
        ],
      },
      {
        kind: "p",
        text: "The protocol calendar is a different report. Revision work, the registry, and the July 28, 2027 removal eligibility sit on the [MCP outlook](/reports/mcp-next-6-months) and the [twelve-month flagship](/reports/ai-agents-next-12-months). This table is only what these seven vendors print about their own products. A blank cell is a gap in the sources read on November 12. It is not a compatibility claim. [[18]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Price the tool call on the platform that will host it, not on the protocol. A ServiceNow MCP gateway call is 1 assist, and the dollar is in the contract. An AgentCore InvokeTool is on the $0.005-per-thousand line, and the model call is not in that line. A Copilot Studio MCP server does not, on Microsoft’s identity page, become an Entra API permission. The permission model and the meter are separate designs. Treat them as separate reviews.",
      },
    ],
  },
  {
    id: "identity",
    title: "The badge is ahead of the invoice",
    blocks: [
      {
        kind: "h3",
        text: "Microsoft already issues an agent identity. The tenant admin cannot mint its token.",
      },
      {
        kind: "p",
        text: "Copilot Studio’s identity article says new agents get an Entra Agent ID: a service principal with an Agent subtype. Agents created before that existed, in May 2026, keep a legacy app registration and “will be migrated” later. The article does not name the migration day. For a standard-harness agent, the ID is provisioned when the agent is created. For the GitHub Copilot harness, it is provisioned at first publish, not when the draft is saved. A Microsoft-owned blueprint creates the identity. No one in the tenant, including a tenant administrator, can generate tokens with it. [[9]]",
      },
      {
        kind: "p",
        text: "Scopes on that ID describe Power Platform connector access. They are not Graph scopes such as Mail.Read. Conditional Access on the agent identity is enforced today only when the agent runs in Teams. Other channels still call connectors through the existing Power Platform flow, so an admin can see the scopes and the policy is not yet evaluated on those calls. Custom connectors, MCP servers, and REST API tools do not add API permissions to the Entra Agent ID. Deleting the agent removes the ID. Every ID counts against the tenant’s directory-object quota. [[9]]",
      },
      {
        kind: "h3",
        text: "Salesforce’s hosted MCP still runs as the user. The agent’s own badge is still TBA.",
      },
      {
        kind: "p",
        text: "The developer doc for exposing an Agentforce agent as an MCP tool says execution runs in the authenticated user’s context. Sharing rules, field-level security, and the Einstein Trust Layer apply. Only agents built in the Agent Script Builder can be exposed, and they are not exposed until someone configures them. That is the current tool path: the person, not a separate agent principal. [[6]]",
      },
      {
        kind: "p",
        text: "A help article published September 17, 2026 describes the other path and still uses the future tense. It says Salesforce is targeting November for agent registration and a billing model in which each external agent gets its own identity, narrower permissions, and a meter. Every successful call over MCP or a direct API would be a Headless Platform Interaction. The multipliers “haven’t been announced yet,” the cell is TBA, and “agentic usage isn’t metered.” Salesforce will give 30 days’ notice before a number is added and metering begins. The rate card updated November 3, 2026 prints the same TBA under Customer 360 Platform, Headless Platform Interaction. Sandboxes, scratch orgs, and Developer Edition would not draw that meter. Traditional integrations stay on their current pricing. As of this read, the article has not been replaced by a “now available” line. This report does not turn “Targeting November” into a missed launch, and it does not turn it into a shipped one. [[2]][[5]]",
      },
      {
        kind: "quote",
        text: "The multipliers for this usage type haven't been announced yet, so it is currently listed as “TBA” and agentic usage isn’t metered.",
        cite: "Salesforce Help, Understand AIforce Impact, published September 17, 2026. Read November 12, 2026. [[5]]",
      },
      {
        kind: "h3",
        text: "AWS charges the token request unless the agent is already on Runtime or Gateway",
      },
      {
        kind: "p",
        text: "AgentCore Identity is how an agent reaches AWS resources and third-party tools, on a user’s behalf or on its own with pre-authorized consent. The pricing page says customers who use it through Runtime or Gateway pay nothing extra for Identity. Everyone else pays $0.010 per 1,000 successful OAuth-token or API-key requests for a non-AWS resource. The same page’s example names Amazon Cognito, Okta, and Microsoft Entra ID as identity providers. Gateway also has a Policy meter at $0.000025 per authorization request, with the first 100 temporal policies per policy engine free of that charge. Natural-language policy authoring is $0.13 per 1,000 input tokens. [[14]]",
      },
      {
        kind: "p",
        text: "Two dates on that pricing page have already passed, and the sentences have not been rewritten. Short-term memory ingestion is $1.00 per GB as of October 6, 2026, replacing $0.25 per 1,000 events through October 5. The v2 committed baseline is still “launching by October 2026,” on a page read November 12. v2 consumption CPU is $0.1276 per vCPU-hour in the worked example. Do not read the October clause as either shipped or cancelled. Read it as a sentence the page has not updated. [[14]]",
      },
      {
        kind: "h3",
        text: "Google split the seat from the platform, and named an agent ID in April",
      },
      {
        kind: "p",
        text: "The app FAQ says Gemini Enterprise app and Gemini Enterprise Agent Platform are purchased separately. The app is per seat per month and needs a user license. The platform, which the FAQ calls the evolution of Vertex AI, is pay-as-you-go on a Google Cloud account. The FAQ does not print the seat price. Business edition is for teams up to 300. Standard and Plus add higher quota, unlimited seats, third-party agents, and a path to bring external agents in through A2A. Identity controls on Standard and Plus include Cloud IAM, third-party identity systems, and document-level access so a search or an agent does not leak a file the person cannot open. Audit logging, CMEK, and VPC Service Controls are listed for those editions. All editions include Model Armor on prompts and responses. [[17]]",
      },
      {
        kind: "p",
        text: "The April 22, 2026 post is the one that names Agent Identity: a unique cryptographic ID “for complete traceability and auditing,” with Agent Gateway as the control for interactions between agents and data. The same post says both no-code and pro-code agents are managed through one model for identity, security, and auditing, and that Agent Platform supports A2A and MCP. The pricing page read November 12 does not give Agent Identity its own SKU. It prices Agent Compute, and it says Memory Bank billing on the new structure “will commence on September 1st, 2026.” That sentence is still in the future tense on a November read. Same rule as the AWS October line: do not upgrade a stale tense into a fact. [[16]][[18]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Ask for the principal the audit log will show. On Salesforce’s hosted MCP doc, that principal is still the user. On Copilot Studio, a new agent has an Entra Agent ID, and the admin cannot mint a token for it. On the Salesforce rate card, the meter that would bill a registered external agent is still TBA, with 30 days’ notice before it starts. Signing the identity design and signing the price are two reviews. Do them in that order only if you know the price is not in the contract yet.",
      },
    ],
  },
  {
    id: "calendar",
    title: "What is dated between now and May 2027",
    blocks: [
      {
        kind: "p",
        text: "Announced means a linked page names the day. Likely means a vendor sentence aims the work at this stretch and does not lock the day, and this report says why that reading is fair. Watch means a later check should confirm the item or drop it. A month with no dated enterprise-platform event stays empty in the announced column. The [general six-month outlook](/reports/ai-agents-next-6-months) covers other product filings. This table is these platforms only. [[3]][[4]][[10]][[14]][[15]][[23]]",
      },
      {
        kind: "table",
        caption:
          "Enterprise agent platforms, November 12, 2026 through May 12, 2027. Conference dates are dates of conferences. They are not feature ship dates.",
        headers: ["Month", "Announced", "Likely", "Watch"],
        rows: [
          [
            "November 2026",
            "November 17–20: Microsoft Ignite in San Francisco, with a Security Pre-Day on November 16. November 21: GPT-5.6 Sol promotional pricing on the Enterprise token card is available at least through this day. November 30: Agent Builder and Evals leave the OpenAI platform. The same day, AWS re:Invent opens in Las Vegas and runs through December 4.",
            "Salesforce’s pricing page says Pre-Commit will be widely available later this year. The sentence does not name November, and it does not name a day. It is not a November appointment.",
            "Whether Ignite or the first day of re:Invent puts a new meter on a pricing page. A keynote line is not a price. Whether the September 17 Salesforce article’s “Targeting November” is updated, and whether Headless Platform Interaction leaves TBA. As of this read it has not.",
          ],
          [
            "December 2026",
            "December 2: Salesforce releases Q3 fiscal 2027 results, announced November 10. December 4: re:Invent ends. December 31: the Enterprise token card says GPT-6 Astra for Law promotional pricing is available at least through this day. That row is a model configuration, not an agent SKU.",
            "“Later this year,” read in November 2026, can only refer to the weeks left in 2026. That is why Pre-Commit sits in this window at all. The page still does not give it a day, so December is not a deadline this report is willing to print.",
            "The Agentforce ARR on December 2, and whether the definition still includes Slackbot and Headless 360. The Q2 figure, for the quarter ended July 31, exceeded $1.5 billion and was up over 240% year over year. Combined Agentforce and Data 360 ARR was nearly $3.9 billion. Do not treat either line as action revenue.",
          ],
          [
            "January 2027",
            "No page in this set names a platform launch day in January.",
            "Nothing in the source set is written to a January day.",
            "A rate-card edit. Salesforce says multipliers may be updated from time to time. A change is not announced until the card or the pricing page changes.",
          ],
          [
            "February 2027",
            "No page in this set names a platform launch day in February.",
            "Nothing in the source set is written to a February day.",
            "Whether Workday or ServiceNow prints a dollar per credit or per assist. Neither page does today.",
          ],
          [
            "March 2027",
            "No page in this set names a platform launch day in March.",
            "Nothing in the source set is written to a March day.",
            "Whether Google’s FAQ prints a seat price. It describes a per-user monthly fee and does not print the number.",
          ],
          [
            "April 2027",
            "No page in this set names a platform launch day in April. Google Cloud Next ’26 was April 22, 2026. This brief did not find a published date for a 2027 Next.",
            "Nothing in the source set is written to an April day.",
            "A Copilot Studio migration date for legacy app registrations. The identity article says they will move to Entra Agent IDs and does not say when.",
          ],
          [
            "May 2027",
            "No source names a May day. May 12 is the end of this report’s window, six months after the read.",
            "Nothing in the source set is written to May.",
            "The HPI multiplier, if Salesforce has by then given the 30 days’ notice the September article describes. Until that notice, the rate card’s TBA is the fact.",
          ],
        ],
      },
      {
        kind: "p",
        text: "The Q2 definition is the part a December headline will skip. Salesforce’s August 26, 2026 release says Agentforce ARR exceeded $1.5 billion, up over 240% year over year, and that effective Q2 FY27 the figure includes Slackbot and Headless 360. The same release says Agentforce and Data 360 ARR together reached nearly $3.9 billion, up over 210%. The company defines that combined line as the annualized recurring value of active Data 360 and certain AI subscription agreements. It is not a count of $0.10 actions. 7.0 billion Agentic Work Units had been delivered to date, 3.2 billion of them in the quarter. The release does not define an Agentic Work Unit as a Flex Credit. This report does not either. [[3]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Put November 30 and December 2 on the calendar. Do not put a feature on the calendar because a conference is that week. If a keynote announces a meter, wait for the pricing page. The pages read for this brief are the record. A slide is not.",
      },
    ],
  },
  {
    id: "what-to-ask",
    title: "What to ask before the order form",
    blocks: [
      {
        kind: "p",
        text: "The next six months do not contain a published price cut for these platforms. They contain one removal, one earnings date, two conferences, and a set of meters that were already live on November 12. A buyer who waits for May to “see where pricing settles” is waiting on a month this source set leaves blank. The decision is which meter you can audit, and which identity the log will name when the agent acts. [[1]][[9]][[10]]",
      },
      {
        kind: "h3",
        text: "Five questions, in the vendor’s nouns",
      },
      {
        kind: "p",
        text: "Which unit is on the quote: action, conversation, credit, assist, token, or vCPU-hour? Which of Salesforce’s buying models is it, and is Pre-Commit actually orderable yet, or still “later this year”? If the agent is employee-facing, is the person on a $125 Salesforce add-on, a $5 user license plus credits, or a $30 Microsoft 365 Copilot license, and does computer use fall outside that inclusion? What does the audit record show as the actor, and is the meter for a separate agent identity TBA, free through the runtime, or already an Entra object? What happens at empty: arrears at the contracted rate, a block at 125% of the pack, or an invoice for assists? [[1]][[5]][[7]][[8]][[9]][[14]][[21]]",
      },
      {
        kind: "p",
        text: "Builders have a narrower cut. If the workflow is code, OpenAI’s own update says the Agents SDK, not Agent Builder, after November 30. If the workflow is a shared natural-language agent, Workspace Agents are the product the same sentence names, and they are off by default for Enterprise until an admin enables them. If the tool is MCP, price the host. Salesforce’s current hosted path runs as the user. ServiceNow’s gateway call is 1 assist. AgentCore’s InvokeTool is on the Gateway line. Google’s correspondence is 15,000 calls per $0.085 vCPU-hour, plus tokens. The [MCP brief](/reports/mcp-next-6-months) is the protocol. This page is the invoice. [[6]][[10]][[13]][[14]][[16]][[21]]",
      },
      {
        kind: "p",
        text: "A token bill for a model you call yourself is still a third invoice. The [AI agent cost calculator](/agent-cost-calculator) uses official per-token prices. It does not price a Flex Credit, an assist, or a Copilot Credit. The [twelve-month flagship](/reports/ai-agents-next-12-months) holds the filing and the regulation dates. The label “AI employee,” and why the software is not a legal employee, is [a separate guide](/blog/what-is-an-ai-employee). [[12]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Quote a task in the vendor’s unit, then write down the actor the log will name. If either answer is “the AI employee,” the quote is not finished. The pages read on November 12 do not contain that unit.",
      },
    ],
  },
];

export const methodology = [
  "Pages were read on November 12, 2026. The set was Salesforce’s Agentforce pricing page and the Flex Credits rate card updated November 3, 2026; Microsoft Learn’s Copilot Studio billing page and the Copilot Studio licensing guide; Microsoft Learn’s agent-identity article; OpenAI’s AgentKit post, the Workspace Agents page, the Enterprise token rate card, and the Workspace Agents help article; the Amazon Bedrock AgentCore pricing page and the re:Invent 2026 page; Google’s Agent Platform pricing page, the Gemini Enterprise app FAQ, the April 22, 2026 platform post, the October 9, 2025 Gemini Enterprise post, and the Agentspace post’s editor’s note; ServiceNow’s Assist Overview, effective August 24, 2026; Workday’s Flex Credits page; Salesforce’s Q2 fiscal 2027 earnings release of August 26, 2026 and the November 10, 2026 earnings-date notice; the September 17, 2026 Salesforce help article on AIforce; the Salesforce developer doc for Agentforce tools on hosted MCP; and Microsoft’s September 30, 2026 Security blog for Ignite. No account was logged into. No API was called. No survey was run.",
  "A dollar next to a credit count is arithmetic: Flex Credits at $500 per 100,000 are $0.005 each; a Copilot Credit in a $200 pack of 25,000 is $0.008; pay-as-you-go is the $0.01 the licensing guide prints. The Google per-million figure is 1,000,000 ÷ 15,000 × $0.085. It is labeled as arithmetic because the pricing page states a correspondence, not a per-million SKU. Max Edition’s 137,500 standard actions and $13,750 of list-price credit are the same kind of arithmetic. They are not a price for the edition.",
  "This report does not print a number the page withheld. That includes a dollar for the Agentforce Coworker user license, a dollar per Workday Flex Credit, a dollar per ServiceNow assist, a Gemini Enterprise app seat price, a credit-based OpenAI Enterprise card, and an Agentforce Voice Minutes rate. It does not treat the $0.15 cell in Salesforce’s voice example as the price of 120 credits. It does not treat Agentforce ARR as action revenue. From Q2 FY27 that ARR includes Slackbot and Headless 360, which the earnings release says in the same bullet.",
  "“Targeting November” on the September 17 help article, “launching by October 2026” on the AgentCore pricing page, and “will commence on September 1st, 2026” on Google’s Memory Bank line are quoted as the tense on the page during a November 12 read. They are not upgraded into a shipped date or a missed one. Conference dates are conference dates. A keynote is not entered as announced until a product page names the change. Negotiated discounts, taxes, and private order forms are outside the sources. The November 10 Agentforce and Copilot Studio comparison on this site was not edited. Ahrefs was not used.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Salesforce, Agentforce pricing",
    url: "https://www.salesforce.com/agentforce/pricing/",
    detail:
      "Read November 12, 2026. Flex Credits $500 per 100,000. Standard action 20 credits, voice action 30. Conversations $2, not combinable with Flex Credits in the same org. Add-on $125 per user per month, Industries $150, user license $5 and requires Flex Credits, Foundations $0, Max Edition 2.75 million Flex Credits per org per year. Unused credits do not roll. No overage penalty: contracted rate billed monthly in arrears. Pre-Commit “widely available later this year.” Coworker user license prints no dollar.",
  },
  {
    n: 2,
    title: "Salesforce, Flex Credits rate card",
    url: "https://www.salesforce.com/en-us/wp-content/uploads/sites/4/assets/pdf/agentforce/Flex-Credits-Rate-Card-11.3.2026.pdf",
    detail:
      "Updated as of November 3, 2026. Read November 12. Production multipliers: standard and custom action 20, voice action 30, Help Agent Resolution 400, IT and HR Employee Agent Resolution 400, Slackbot standard 40, Slackbot advanced 200. Sandbox: action 16, voice 24, both resolution rows 0. Headless Platform Interaction listed as TBA. No rollover.",
  },
  {
    n: 3,
    title: "Salesforce, second quarter fiscal 2027 results",
    url: "https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/",
    detail:
      "August 26, 2026. Quarter ended July 31, 2026. Agentforce ARR exceeded $1.5 billion, up over 240% year over year, and from this quarter includes Slackbot and Headless 360. Agentforce and Data 360 ARR nearly $3.9 billion, up over 210%. 7.0 billion Agentic Work Units to date, 3.2 billion in the quarter.",
  },
  {
    n: 4,
    title: "Salesforce, third quarter fiscal 2027 earnings date",
    url: "https://investor.salesforce.com/news/news-details/2026/Salesforce-Announces-Date-of-Third-Quarter-Fiscal-2027-Earnings-Release-and-Webcast/default.aspx",
    detail: "November 10, 2026. Results on December 2, 2026, after market close. Webcast 2:00 p.m. Pacific.",
  },
  {
    n: 5,
    title: "Salesforce Help, Understand AIforce Impact",
    url: "https://help.salesforce.com/s/articleView?id=005360285&language=en_US&type=1",
    detail:
      "Published September 17, 2026. Read November 12. Still says “Targeting November” for agent registration and Headless Platform Interaction billing. Multiplier TBA. Agentic usage is not metered. 30 days’ notice before a number and before metering. Sandboxes would not draw the meter.",
  },
  {
    n: 6,
    title: "Salesforce Developers, Agentforce tools on hosted MCP",
    url: "https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/agentforce.html",
    detail:
      "Read November 12, 2026. An Agentforce agent or a Prompt Builder template can be exposed as an MCP tool if the agent was built in Agent Script Builder. Execution runs in the authenticated user’s context.",
  },
  {
    n: 7,
    title: "Microsoft Learn, Copilot Studio billing rates",
    url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management",
    detail:
      "Read November 12, 2026. Classic answer 1 credit, generative answer 2, agent action 5, tenant-graph grounding 10, agent flow 13 credits per 100 actions. Reasoning models add 10 credits per 1,000 billed tokens. Illustrative follow-up on Claude Opus 4.7 is 14,100 billed tokens, 141 credits, before feature rates. A new-conversation variant in the same example is 461 credits. Prepaid enforcement at 125% blocks agents. Computer-using agents are not included in the Microsoft 365 Copilot license.",
  },
  {
    n: 8,
    title: "Microsoft, Copilot Studio licensing guide",
    url: "https://www.microsoft.com/licensing/guidance/Microsoft-Copilot-Studio",
    detail:
      "Read November 12, 2026. Pay-as-you-go $0.01 per Copilot Credit. Capacity pack $200 per month for 25,000 credits, billed annually. Unused pack credits do not roll to the next month. Microsoft 365 Copilot listed at $30 per user per month. Employee-facing use is included when the user holds that license and the agent runs as that user, subject to fair-use limits the guide does not number.",
  },
  {
    n: 9,
    title: "Microsoft Learn, Copilot Studio agent identities",
    url: "https://learn.microsoft.com/en-us/microsoft-copilot-studio/govern-agents-identities-overview",
    detail:
      "Read November 12, 2026. New agents get an Entra Agent ID, a service principal with an Agent subtype, since May 2026. Older agents keep app registrations until a migration the article does not date. Tenant admins cannot mint tokens for the agent identity. Conditional Access on that identity is enforced in Teams only. MCP servers, custom connectors, and REST tools do not add API permissions to the ID.",
  },
  {
    n: 10,
    title: "OpenAI, Introducing AgentKit",
    url: "https://openai.com/index/introducing-agentkit/",
    detail:
      "Post dated October 6, 2025. Update dated June 3, 2026, read November 12, 2026. Agent Builder and Evals will not be available on the OpenAI platform from November 30, 2026. The update recommends the Agents SDK or Workspace Agents. The original post says the Connector Registry includes third-party MCPs.",
  },
  {
    n: 11,
    title: "OpenAI, Workspace agents for business",
    url: "https://openai.com/business/workspace-agents/",
    detail:
      "Read November 12, 2026. Research preview for ChatGPT Business, Enterprise, Edu, and Teachers. Role-based access, audit logs, approval gates, and a central admin console are described on the page.",
  },
  {
    n: 12,
    title: "OpenAI Help, ChatGPT Enterprise token rate card",
    url: "https://help.openai.com/en/articles/20001415-chatgpt-rate-card-enterprise-token-based-pricing",
    detail:
      "Read November 12, 2026. Applies to eligible token-based Enterprise agreements. Workspace Agents on GPT-5.6 Sol: $4 per million input tokens, $0.40 cached, $20 output. Promotional Sol pricing available at least through November 21, 2026, and not on legacy metering. Credit-based agreements are directed to a different card. GPT-6 Astra for Law promotional pricing available at least through December 31, 2026.",
  },
  {
    n: 13,
    title: "OpenAI Help, Workspace agents for Enterprise and Business",
    url: "https://help.openai.com/en/articles/20001143-chatgpt-workspace-agents-for-enterprise-and-business",
    detail:
      "Read November 12, 2026. Off by default at launch for ChatGPT Enterprise. Admins can enable them. Role-based access applies. Write approvals and action constraints are described in the article.",
  },
  {
    n: 14,
    title: "AWS, Amazon Bedrock AgentCore pricing",
    url: "https://aws.amazon.com/bedrock/agentcore/pricing/",
    detail:
      "Read November 12, 2026. Gateway $0.005 per 1,000 invocations. Identity $0.010 per 1,000 token or API-key requests for non-AWS resources, and no extra charge through Runtime or Gateway. Policy $0.000025 per authorization request. v2 consumption CPU $0.1276 per vCPU-hour in the worked example. Committed v2 baseline still “launching by October 2026.” Short-term memory ingestion $1.00 per GB as of October 6, 2026.",
  },
  {
    n: 15,
    title: "AWS, re:Invent 2026",
    url: "https://aws.amazon.com/events/reinvent/",
    detail: "Read November 12, 2026. November 30 to December 4, 2026, Las Vegas. A conference date, not a feature date.",
  },
  {
    n: 16,
    title: "Google Cloud, Gemini Enterprise Agent Platform pricing",
    url: "https://cloud.google.com/products/gemini-enterprise-agent-platform/pricing",
    detail:
      "Read November 12, 2026. Agent Compute $0.085 per vCPU-hour. Agent Memory $0.009 per GiB-hour. One vCPU-hour corresponds to 15,000 Agent Gateway calls or authorization requests. Runtime idle time between turns is not billed. Memory Bank billing “will commence on September 1st, 2026,” still in that tense on this read. Model tokens are separate.",
  },
  {
    n: 17,
    title: "Google Cloud, Gemini Enterprise app FAQ",
    url: "https://cloud.google.com/gemini-enterprise/faq",
    detail:
      "Read November 12, 2026. The app and the Agent Platform are purchased separately. The app is per seat per month and the FAQ does not print the price. Business edition is for teams up to 300. Standard and Plus can bring external agents in through A2A. Identity, document-level access, audit logs, CMEK, and Model Armor are described for the editions named on the page.",
  },
  {
    n: 18,
    title: "Google Cloud Blog, the new Gemini Enterprise",
    url: "https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development",
    detail:
      "April 22, 2026. Read November 12. Agent Platform is described as the evolution of Vertex AI. The post names Agent Identity as a unique cryptographic ID, Agent Gateway, and support for A2A and MCP.",
  },
  {
    n: 19,
    title: "Google Cloud Blog, Introducing Gemini Enterprise",
    url: "https://cloud.google.com/blog/products/ai-machine-learning/introducing-gemini-enterprise",
    detail:
      "October 9, 2025. Read November 12, 2026. Introduces Gemini Enterprise as the workplace front door and describes a central governance framework to visualize, secure, and audit agents. An editor’s note on the page points builder work at Gemini Enterprise Agent Platform.",
  },
  {
    n: 20,
    title: "Google Cloud Blog, Google Agentspace",
    url: "https://cloud.google.com/blog/products/ai-machine-learning/bringing-ai-agents-to-enterprises-with-google-agentspace",
    detail:
      "December 13, 2024, with an editor’s note read November 12, 2026. The note says Agentspace is now part of Gemini Enterprise and that its agent creation and orchestration technology powers the Gemini Enterprise platform.",
  },
  {
    n: 21,
    title: "ServiceNow, Assist Overview",
    url: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/legal/sn-assist-overview.pdf",
    detail:
      "Effective August 24, 2026. Read November 12. No dollar per assist. Small agentic workflow, less than 4 tool actions, 25 assists. Medium, 5 to 8, 50 assists. Large, 9 to 20, 150 assists. Actions beyond 20 start a new workflow. One AI Gateway call from a registered MCP client to a third-party MCP server is 1 assist. Annual pool. Overage may be invoiced.",
  },
  {
    n: 22,
    title: "Workday, AI Flex Credits",
    url: "https://www.workday.com/en-us/ai-agents/ai-flex-credits.html",
    detail:
      "Read November 12, 2026. Usage-based credits for agents and platform features. The page’s example is 1 credit for a Self-Service information retrieval and 5 credits for autonomous task completion. No dollar per credit. Most agents can be tested free in non-production. Annual purchase, plus complimentary credits sized to the company.",
  },
  {
    n: 23,
    title: "Microsoft Security Blog, Ignite 2026",
    url: "https://www.microsoft.com/en-us/security/blog/2026/09/30/secure-whats-next-your-guide-to-microsoft-security-at-microsoft-ignite-2026/",
    detail:
      "September 30, 2026. Ignite in San Francisco, November 17–20, 2026. Security Pre-Day on November 16. A conference date, not a feature date.",
  },
];

export const faq = [
  {
    question: "How much does an enterprise AI employee cost?",
    answer:
      "The platforms do not sell one by headcount. On the pages read November 12, 2026, a Salesforce standard action is $0.10, a Copilot Studio agent action is $0.04 in a credit pack or $0.05 pay-as-you-go, and Microsoft 365 Copilot is $30 per user per month before the fair-use inclusion. ServiceNow and Workday publish assist and credit counts and do not print a dollar. OpenAI’s Workspace Agents, on a token-based Enterprise agreement, follow GPT-5.6 Sol token rates.",
  },
  {
    question: "When does OpenAI Agent Builder shut down?",
    answer:
      "OpenAI’s June 3, 2026 update, on the AgentKit post, says Agent Builder and Evals will not be available on the OpenAI platform from November 30, 2026. The same update points to the Agents SDK or to Workspace Agents in ChatGPT.",
  },
  {
    question: "Is Salesforce Agentforce priced per conversation or per action?",
    answer:
      "Both exist, and the pricing page says they will not be supported in the same org. Conversations are $2. Flex Credits are $500 per 100,000, and a standard action is 20 credits, $0.10. A help resolution is 400 credits, $2.",
  },
  {
    question: "Does Microsoft Copilot Studio give an agent its own identity?",
    answer:
      "New Copilot Studio agents get an Entra Agent ID, a service principal with an Agent subtype. Microsoft’s article dates that model to May 2026. Agents created before then still use app registrations until a migration the article does not date. Tenant administrators cannot generate tokens with the agent identity.",
  },
  {
    question: "Did Google Agentspace become Gemini Enterprise?",
    answer:
      "Google’s Agentspace post carries an editor’s note, read November 12, 2026, that says Agentspace is now part of Gemini Enterprise. The app and the Agent Platform are separate purchases. The app FAQ does not print a seat price.",
  },
  {
    question: "What enterprise agent change is dated before May 2027?",
    answer:
      "Agent Builder and Evals leave the OpenAI platform on November 30, 2026. Salesforce releases Q3 fiscal 2027 results on December 2, 2026. Microsoft Ignite is November 17–20, and AWS re:Invent is November 30 to December 4. No page in this set names a product day in January, February, March, April, or May 2027.",
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
