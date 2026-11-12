import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/ai-agents-next-12-months";
export const title = "AI agents in the next 12 months: $70.7 billion is dated (Nov 2026 to Nov 2027)";
export const thesis =
  "The next year has a filing, a handful of price steps, and a regulation calendar. It does not have a product launch on most of its months.";
export const description =
  "What is announced, what is only likely, and what to watch for AI agents from November 2026 through November 2027: coding, computer use, enterprise, shopping, voice, protocols, evals, and the price of a task. The $70.7 billion line is Anthropic’s November 10 filing, re-read November 12, 2026.";
export const readOn = "2026-11-07";
export const updatedOn = "2026-11-12";

export const keyNumbers = [
  {
    value: "$70.7B",
    label: "Anthropic commitments due in 12 months",
    note: "Approximately, in the 12 months after September 30, 2026. November 10, 2026 amendment, re-read November 12. Not one payment date. $4.2 billion of it is contingent.",
  },
  {
    value: "Dec 1",
    label: "Gemini 4 standard price doubles",
    note: "Carbon and Argon paid input goes from $2 to $4 per million tokens. Output goes from $10 to $20. The page names December 1, 2026.",
  },
  {
    value: "Jul 28",
    label: "MCP removal becomes eligible",
    note: "Roots, Sampling, Logging, and Dynamic Client Registration, in a revision on or after July 28, 2027. Eligibility is not deletion.",
  },
  {
    value: "Aug 2",
    label: "EU national AI sandboxes",
    note: "The Commission timeline says member states should have at least one operational. Annex III high-risk rules are December 2, 2027, after this window.",
  },
];

export const findings = [
  "Anthropic’s November 10, 2026 amendment prints approximately $70.7 billion of commitments due in the 12 months after September 30, 2026, approximately $451.6 billion expected before December 31, 2030, and approximately $900.9 billion in aggregate. The three figures overlap. Do not add them. About $4.2 billion of the 12-month line can still be avoided.",
  "Two model prices have a day. Gemini 4 Carbon and Argon step from $2 and $10 to $4 and $20 per million tokens on December 1, 2026. Gemini 3.8 Flash steps from $0.75 and $3.75 to $1.50 and $7.50 on January 1, 2027. OpenAI’s page still says GPT-5.6 Sol’s promotional price runs until November 30 and does not print the next rate.",
  "The product months are mostly empty. The dated marks that are not prices are regulatory or protocol clocks: December 2, 2026 on the EU timeline, April 29, 2027 for a UK bill’s procedural lapse, July 28, 2027 for MCP eligibility, and August 2, 2027 for national AI sandboxes. A month without a sentence stays blank.",
  "This page dates the year. It does not re-score production, and it does not repeat the 2027 forecast. Agents in production is the cross-section of what is running. AI agents in 2027 is the labeled forecast, with the calls that would prove it wrong.",
];

export const executiveSummary = [
  "One number in the next twelve months is large enough to misread. Anthropic’s S-1/A filed November 10, 2026, and re-read November 12, says approximately $70.7 billion of purchase commitments are due in the 12 months following September 30, 2026. The same paragraph’s aggregate is approximately $900.9 billion, and approximately $451.6 billion of that aggregate is expected before December 31, 2030. The 12-month line is inside the aggregate. Adding the three figures triple-counts the year. About $4.2 billion of the $70.7 billion sits on arrangements that can still be terminated or that have not met their conditions. The filing expects short-term compute to keep rising “in the near term,” and it still names no month. [[1]]",
  "The other dates are smaller and sharper. Google’s API pricing page, read November 12, doubles the paid standard rate for Gemini 4 Carbon and Gemini 4 Argon on December 1, 2026, and doubles Gemini 3.8 Flash on January 1, 2027. OpenAI’s pricing page, the same morning, still ends a GPT-5.6 Sol promotion on November 30 and does not print the price after it. Voice model retirements, read November 11, put an earliest Gemini Live cutoff on November 17, 2026 and remove gpt-realtime on January 20, 2027. Those are model ids. They are not a statement that agents got cheaper. [[2]][[3]][[4]]",
  "Everything else a buyer asks about, coding agents, computer use, and shopping checkout, is either already running or not dated. Enterprise platforms have their own brief. The specialist briefs hold those records: [enterprise platforms through May](/reports/enterprise-agent-platforms-next-6-months), [production](/reports/ai-agents-in-production-2026), the [2027 forecast](/reports/ai-agents-in-2027), [frameworks through May](/reports/ai-agent-frameworks-next-6-months), [shopping for the next 30 days](/reports/ai-shopping-agents-next-30-days), [voice](/reports/voice-agents-next-6-months), and [MCP](/reports/mcp-next-6-months). This flagship is the year those briefs sit inside, and the months they correctly leave blank.",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "commitment-lines",
    title: "Anthropic’s commitment lines, as printed",
    caption:
      "Three approximates from the same paragraph of the November 10, 2026 amendment. They overlap. The 12-month line is part of the aggregate. Do not add the bars.",
    unit: "billion USD, approximately",
    source:
      "Anthropic amended Form S-1, filed November 10, 2026, accession 0001628280-26-072484. Re-read November 12, 2026. [[1]]",
    series: ["As printed"],
    categories: [
      { label: "Due in 12 months", values: [70.7], displays: ["$70.7B"] },
      { label: "Before end of 2030", values: [451.6], displays: ["$451.6B"] },
      { label: "Aggregate", values: [900.9], displays: ["$900.9B"] },
    ],
  },
  {
    id: "price-steps",
    title: "Published standard token prices before and after the named day",
    caption:
      "Paid standard rates per million tokens. Carbon and Argon share the December 1 step. Flash steps on January 1, 2027. Output includes thinking tokens, on Google’s page.",
    unit: "USD per million tokens",
    source: "Google Gemini API pricing, aistudio.google.com/docs/pricing, read November 12, 2026. [[2]]",
    series: ["Through the cutoff", "Starting the next day"],
    categories: [
      { label: "Carbon input", values: [2, 4], displays: ["$2", "$4"] },
      { label: "Carbon output", values: [10, 20], displays: ["$10", "$20"] },
      { label: "Flash input", values: [0.75, 1.5], displays: ["$0.75", "$1.50"] },
      { label: "Flash output", values: [3.75, 7.5], displays: ["$3.75", "$7.50"] },
    ],
  },
];

export const chapters: ReportChapter[] = [
  {
    id: "how-a-month-gets-a-date",
    title: "How a month gets a date",
    blocks: [
      {
        kind: "p",
        text: "A claim is announced when a primary page names a day between November 12, 2026 and November 12, 2027. It is likely when a primary page points at that year and refuses the day. It is a watch when two pages disagree, the page uses “near term” or “later,” or the only date is a deadline for a bill rather than a product. A month with none of those stays empty. That rule is why this flagship is shorter than the year it covers.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Use this page to see which costs and which legal clocks already have a day. Use the specialist reports for the segment you ship. Do not treat the $70.7 billion as a market-size estimate for agents, and do not treat a doubled token price as a doubled task cost. The [2027 forecast](/reports/ai-agents-in-2027) argues those two prices move apart. This page only dates them.",
      },
    ],
  },
  {
    id: "the-filing",
    title: "The filing is the largest dated line",
    blocks: [
      {
        kind: "p",
        text: "The November 2 amendment, which the first version of this page quoted, printed approximately $69.8 billion on the 12-month line and approximately $895.4 billion in aggregate. The November 10 amendment replaced those approximates with $70.7 billion and $900.9 billion, and it prints approximately $451.6 billion expected before December 31, 2030. The November 11 scorecard caught the change and did not edit this URL. This update does. [[1]]",
      },
      {
        kind: "chart",
        id: "commitment-lines",
      },
      {
        kind: "p",
        text: "The contractual-obligations section is more precise than the summary paragraph, and it is still an approximate. Approximately $70.7 billion is expected to be paid in the 12 months following September 30, 2026, of which approximately $4.2 billion relates to arrangements that are subject to contingent conditions or termination rights before they start. The span runs through September 30, 2027. September 30 is the last day of the span, not a wire-transfer date. [[1]]",
      },
      {
        kind: "p",
        text: "The same filing says short-term compute “currently costs significantly more” than compute under multi-year commitments, and that Anthropic expects its use of short-term compute to increase in the near term and to compress operating margin. For the quarter ended September 30, 2026, the filing includes $5.0 billion of compute under short-term commitments. That $5.0 billion is a quarter that already closed. It is not a forecast for 2027, and the near-term sentence still has no month. [[1]]",
      },
      {
        kind: "callout",
        title: "Do not add the bars",
        text: "The $70.7 billion is part of the $900.9 billion, and the $451.6 billion is the slice of the aggregate expected before the end of 2030. A chart that stacks them invents a number the filing does not print.",
      },
    ],
  },
  {
    id: "prices",
    title: "Two price steps have a morning-after",
    blocks: [
      {
        kind: "p",
        text: "Token price is not task price. It is the only agent input this year that a vendor has scheduled in public. Google’s pricing page, read November 12, lists Gemini 4 Carbon and Gemini 4 Argon at $2 per million input tokens and $10 per million output tokens through November 30, 2026, and at $4 and $20 starting December 1. Output includes thinking tokens. Gemini 3.8 Flash is $0.75 and $3.75 through December 31, 2026, and $1.50 and $7.50 starting January 1, 2027. The ratio on each of those four rates is 2. That ratio is computed from the two printed numbers. [[2]]",
      },
      {
        kind: "chart",
        id: "price-steps",
      },
      {
        kind: "p",
        text: "OpenAI’s pricing page, read the same morning, still says GPT-5.6 Sol’s promotional pricing is available until November 30, 2026. It does not print the price that applies on December 1. The standard short-context rates in the HTML matched the November 11 calculator: Sol at $4 and $20 per million tokens under 272,000 input tokens. A promotion without a successor rate is a watch, not a forecast. The [cost calculator](/agent-cost-calculator) multiplies the printed rates. It does not guess December 1 for Sol. [[3]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "If a harness logged a Gemini 4 Carbon turn in November, the same token counts cost twice as much on December 1, before anyone changes the prompt. Re-price that path. Do not re-price a successful task by the same factor. Retries, tool JSON, and failed runs sit outside the token line. The [2027 forecast](/reports/ai-agents-in-2027) is the argument. This chapter is only the calendar.",
      },
    ],
  },
  {
    id: "by-segment",
    title: "What each segment has actually dated",
    blocks: [
      {
        kind: "p",
        text: "The segments below are the ones buyers ask for. A row is here only when a primary page, or a brief on this site that names its primary page, has a date. Undated product hope is not a row.",
      },
      {
        kind: "table",
        caption:
          "Segment calendar, November 12, 2026 through November 12, 2027. “Read” is the day the underlying page was opened, not the day the event happens.",
        headers: ["Segment", "What is dated", "Label", "Where to go next"],
        rows: [
          [
            "Coding and frameworks",
            "No framework in the November 12 set published a release day through May 2027. Microsoft’s Python 3.11 floor already shipped in python-1.25.0 on November 7.",
            "Watch",
            "[Frameworks, next 6 months](/reports/ai-agent-frameworks-next-6-months)",
          ],
          [
            "Computer use and browser",
            "The six-month browser brief, checked November 9, found one vendor day through May 9, 2027. This page does not add a second.",
            "Watch",
            "[Browser and computer-use](/reports/browser-and-computer-use-agents-next-6-months)",
          ],
          [
            "Enterprise platforms",
            "Survey splits stay on the production report. List prices, the November 30 Agent Builder date, and the December 2 earnings date are on the platforms brief.",
            "Announced meters",
            "[Production](/reports/ai-agents-in-production-2026). [Enterprise platforms](/reports/enterprise-agent-platforms-next-6-months).",
          ],
          [
            "Shopping and payments",
            "Black Friday and Cyber Monday are dated as traffic forecasts. No new checkout day was on the pages re-read November 12.",
            "Announced traffic, not a launch",
            "[Next 30 days](/reports/ai-shopping-agents-next-30-days)",
          ],
          [
            "Voice",
            "November 17, 2026 is Google’s earliest Live-preview cutoff. January 20, 2027 removes gpt-realtime. Read November 11.",
            "Announced",
            "[Voice, next 6 months](/reports/voice-agents-next-6-months)",
          ],
          [
            "MCP and protocols",
            "July 28, 2027 is the first day four MCP features may be removed. A2A’s latest tag is still May 28, 2026.",
            "Announced eligibility",
            "[MCP through May](/reports/mcp-next-6-months)",
          ],
          [
            "Evals and security",
            "Public boards are a snapshot, not a 2027 schedule. The UK bill’s proceedings lapse at the end of April 29, 2027.",
            "Announced procedure",
            "[Harness benchmark](/reports/agent-harness-benchmark-november-2026)",
          ],
          [
            "Price per task",
            "December 1 and January 1 token steps are announced. A cheaper successful run is not.",
            "Announced tokens",
            "[2027 forecast](/reports/ai-agents-in-2027) and the [calculator](/agent-cost-calculator)",
          ],
        ],
      },
    ],
  },
  {
    id: "regulation",
    title: "Regulation has more days than the product pages",
    blocks: [
      {
        kind: "p",
        text: "The dates in this chapter were read for the November 7 edition of this page and were not re-downloaded on November 12. They are carried because a flagship that drops a sourced clock in order to look new is worse than one that labels the read. If a later page moves them, this table is wrong until it is opened again.",
      },
      {
        kind: "table",
        caption: "Clocks carried from the November 7 read, with the primary page named there.",
        headers: ["Day", "What the page says", "Inside this window?"],
        rows: [
          [
            "December 2, 2026",
            "EU timeline: new prohibitions, and an Article 50(2) deadline for some providers already on the market.",
            "Yes",
          ],
          [
            "April 29, 2027",
            "UK Cyber Security and Resilience Bill proceedings lapse at the end of this day. A procedural expiry, not Royal Assent.",
            "Yes",
          ],
          [
            "July 28, 2027",
            "MCP: Roots, Sampling, Logging, and Dynamic Client Registration become eligible for removal in a later revision. Not removed on the day.",
            "Yes",
          ],
          [
            "August 2, 2027",
            "EU member states should have at least one national AI regulatory sandbox operational.",
            "Yes",
          ],
          [
            "September 30, 2027",
            "Last day of the span that holds Anthropic’s $70.7 billion line. Not a single payment date.",
            "Yes",
          ],
          [
            "December 2, 2027",
            "Annex III high-risk rules. The November 7 read said not to date them earlier.",
            "After this window",
          ],
          [
            "August 2, 2028",
            "High-risk AI embedded in Annex I products.",
            "After this window",
          ],
        ],
      },
      {
        kind: "p",
        text: "The MCP row is the one builders can mistake for a breaking change on the morning of July 28. The registry language, as carried on the [MCP brief](/reports/mcp-next-6-months), is eligibility. Maintainers may remove the feature in the first revision released on or after that day. They do not have to. An expedited removal for an active security risk can be shorter, and the November 7 read found none in force. [[5]]",
      },
    ],
  },
  {
    id: "voice-and-models",
    title: "Voice retirements are model ids, not a market call",
    blocks: [
      {
        kind: "p",
        text: "The voice brief, checked November 11, is the record for the minute rates. Two of its dates fall inside this year and are worth repeating only so a reader of the flagship does not miss them. Google lists November 17, 2026 as the earliest possible shutdown for gemini-3.1-flash-live-preview and gemini-2.5-flash-native-audio-preview-12-2025. OpenAI removes gpt-realtime, gpt-4o-realtime, and gpt-realtime-mini on January 20, 2027, and removes tts-1 on January 6. This page did not re-fetch those deprecation tables on November 12. [[4]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "If a production voice agent still calls gpt-realtime, January 20 is a hard id removal, not a pricing rumor. If it calls a Gemini Live preview, November 17 is the earliest Google has allowed itself, and the [voice brief](/reports/voice-agents-next-6-months) says the exact day comes in a later notice. Do not turn either sentence into “voice agents end.”",
      },
    ],
  },
  {
    id: "announced-likely-watch",
    title: "Announced, likely, and watch for",
    blocks: [
      {
        kind: "table",
        caption: "The year, sorted. Likely is almost empty because the undated sentences do not pick a month.",
        headers: ["Claim", "Label", "Limit"],
        rows: [
          [
            "$70.7 billion due across the 12 months after September 30, 2026",
            "Announced",
            "An approximate span through September 30, 2027. Not a bill on one day. $4.2 billion can drop out.",
          ],
          [
            "Gemini 4 rates on December 1, Flash rates on January 1",
            "Announced",
            "Standard paid tokens. Not a task price. Not a seat price.",
          ],
          [
            "GPT-5.6 Sol after November 30",
            "Watch",
            "The promotion’s end is dated. The next price is not printed.",
          ],
          [
            "Short-term compute rising “in the near term”",
            "Likely only as a direction",
            "The filing names no month. This page does not assign it to January or to June.",
          ],
          [
            "A new shopping checkout day before December 12",
            "Not announced",
            "See the 30-day brief. Adobe dated traffic, not a button.",
          ],
          [
            "A framework release day through May 2027",
            "Not announced",
            "The November 12 tag read found none.",
          ],
          [
            "Annex III high-risk rules",
            "Announced, after this window",
            "December 2, 2027. Do not pull them into November 2027.",
          ],
        ],
      },
      {
        kind: "p",
        text: "The [production report](/reports/ai-agents-in-production-2026) is where McKinsey’s scaling split and Menlo’s spend estimates live, with their sample sizes. Copying them here would turn a cross-section into a forecast. The [2027 page](/reports/ai-agents-in-2027) is allowed to say what we think happens, and it lists what would falsify it. This page does not take those calls back, and it does not launder them into announced facts.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [
      { kind: "h3", text: "What is announced for AI agents in the next 12 months?" },
      {
        kind: "p",
        text: "A commitment span, two token-price steps, voice model retirements, and a regulation calendar. Anthropic’s November 10 filing prints approximately $70.7 billion due in the 12 months after September 30, 2026. Gemini 4 standard prices double on December 1, 2026. Gemini 3.8 Flash doubles on January 1, 2027. MCP removal eligibility opens July 28, 2027. EU national sandboxes are dated August 2, 2027. Most product months are blank.",
      },
      { kind: "h3", text: "Is the $70.7 billion the size of the agent market?" },
      {
        kind: "p",
        text: "No. It is Anthropic’s approximate purchase commitments due in a 12-month span, mostly compute and infrastructure. It overlaps the $900.9 billion aggregate. It is not a revenue forecast and not an industry total.",
      },
      { kind: "h3", text: "Will AI agents get cheaper by November 2027?" },
      {
        kind: "p",
        text: "Two named token prices get more expensive, on December 1 and January 1. OpenAI has not printed GPT-5.6 Sol’s price after November 30. A successful task can move a different direction from the token. That argument, and what would falsify it, is the 2027 forecast. This page does not add a third price.",
      },
      { kind: "h3", text: "What is likely, as opposed to announced?" },
      {
        kind: "p",
        text: "Almost nothing with a month attached. The filing’s “near term” increase in short-term compute has no month. Amazon’s wider text-shopping rollout and OpenAI’s merchant portal are “weeks” and “later this year,” and they are tracked on the shopping briefs, not assigned to a month here.",
      },
      { kind: "h3", text: "How is this different from the 2027 forecast and the production report?" },
      {
        kind: "p",
        text: "Production is a cross-section of what is already running, with survey sample sizes and benchmark scores. The 2027 forecast is a labeled set of calls. This page is the calendar of days a filing, a pricing page, or a statute has already printed, from November 2026 through November 2027.",
      },
    ],
  },
];

export const methodology = [
  "Re-read on November 12, 2026: Anthropic’s November 10 S-1/A (accession 0001628280-26-072484), Google’s Gemini API pricing page, and OpenAI’s API pricing page. Dollar figures are the word “approximately” plus the number printed. The price ratio of 2 is computed from the two rates on the same row. The three commitment bars overlap and are not summed.",
  "Carried from the November 7 edition, and not re-downloaded on November 12: the EU AI Act Service Desk timeline, the MCP deprecated-features registry for revision 2026-07-28, and the UK bill’s April 29, 2027 lapse. Voice retirement days were read November 11 for the voice brief and were not re-fetched. Framework tags were read November 12 for the frameworks brief.",
  "Likely is reserved for a source that points at the year and withholds the day. “Near term” is reported as a direction without a month. Watch is a dated end with no successor price, or a disagreement this page did not resolve. Specialist reports are linked instead of copied, so a survey n is not separated from its method.",
  "This page did not run a survey, did not estimate agent revenue, and did not convert token prices into a cost per successful task. The $5.0 billion short-term compute figure is the quarter ended September 30, 2026, not a run rate.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Anthropic amended Form S-1, November 10, 2026",
    url: "https://www.sec.gov/Archives/edgar/data/2130357/000162828026072484/anthropicpbc-sx1ax2.htm",
    detail:
      "Accession 0001628280-26-072484. Re-read November 12, 2026. Approximately $900.9 billion aggregate, approximately $451.6 billion before December 31, 2030, approximately $70.7 billion due in the 12 months after September 30, 2026. About $4.2 billion of that 12-month line is contingent or terminable. Short-term compute expected to increase in the near term, with no month. $5.0 billion of short-term compute in the quarter ended September 30, 2026.",
  },
  {
    n: 2,
    title: "Gemini API pricing",
    url: "https://aistudio.google.com/docs/pricing",
    detail:
      "Read November 12, 2026. Gemini 4 Carbon and Gemini 4 Argon paid standard input $2 through November 30, 2026, and $4 from December 1. Output, including thinking tokens, $10 then $20. Gemini 3.8 Flash $0.75 and $3.75 through December 31, 2026, then $1.50 and $7.50 from January 1, 2027.",
  },
  {
    n: 3,
    title: "OpenAI API pricing",
    url: "https://developers.openai.com/api/docs/pricing",
    detail:
      "Read November 12, 2026. The page still says GPT-5.6 Sol’s promotional pricing is available until November 30, 2026, and does not print the following price. Short context on the page is labeled ≤272K input tokens. Standard short-context Sol rates in the HTML were $4 input and $20 output per million tokens.",
  },
  {
    n: 4,
    title: "Voice agents, November 11, 2026 read",
    url: "https://www.aiagentsinfo.com/reports/voice-agents-next-6-months",
    detail:
      "Primary pages named on that brief: Google’s Live API deprecations and OpenAI’s API deprecations, fetched November 11, 2026. November 17, 2026 is an earliest cutoff, not a confirmed shutdown. January 20, 2027 removes gpt-realtime. Not re-fetched for this November 12 update.",
  },
  {
    n: 5,
    title: "MCP, EU, and UK clocks carried from November 7",
    url: "https://ai-act-service-desk.ec.europa.eu/en/ai-act/timeline/timeline-implementation-eu-ai-act",
    detail:
      "EU Service Desk timeline, including the Digital Omnibus, as read November 7, 2026. MCP deprecated-features registry for specification 2026-07-28, same read. UK Parliament carry-over to the end of April 29, 2027, recorded from the November 4, 2026 motion. Not re-downloaded November 12.",
  },
];

export const faq = [
  {
    question: "What is announced for AI agents in the next 12 months?",
    answer:
      "Anthropic’s November 10, 2026 filing prints approximately $70.7 billion of commitments due in the 12 months after September 30, 2026. Gemini 4 standard prices double on December 1, 2026, and Gemini 3.8 Flash doubles on January 1, 2027. Voice model retirements and the EU, UK, and MCP clocks fill the rest of the dated grid. Most product months are blank.",
  },
  {
    question: "Is the $70.7 billion the size of the AI agent market?",
    answer:
      "No. It is Anthropic’s approximate purchase-commitment line for the 12 months after September 30, 2026, mostly compute. It is part of an approximately $900.9 billion aggregate. The figures overlap and should not be added.",
  },
  {
    question: "Will AI agents get cheaper by November 2027?",
    answer:
      "The dated token prices move up, not down: Gemini 4 on December 1, 2026, and Gemini 3.8 Flash on January 1, 2027. OpenAI has not printed GPT-5.6 Sol’s price after November 30. Cost per successful task is a different question, and it is argued on the 2027 forecast rather than dated here.",
  },
  {
    question: "What is likely, rather than announced?",
    answer:
      "Very little that has a month. Anthropic expects short-term compute to rise in the near term and names no month. Shopping and framework roadmaps through the next six months also lack a day, and those briefs say so.",
  },
  {
    question: "How is this different from the production report and the 2027 forecast?",
    answer:
      "The production report is a cross-section of agents already running, with survey samples and benchmark scores. The 2027 forecast is a labeled set of calls and the evidence that would falsify them. This page is the calendar of days a filing, a price page, or a statute has printed.",
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
