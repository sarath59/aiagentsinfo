import benchmark from "@/data/benchmarks/november-2026.json";
import frameworkSnapshot from "@/data/framework-github-stats/2026-11.json";
import downloads from "@/data/trackers/downloads-snapshot.json";
import starsSnapshot from "@/data/trackers/stars-snapshot.json";
import type { ChartSpec, ReportChapter } from "@/lib/report-model";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
const num = new Intl.NumberFormat("en-US");

export const path = "/reports/ai-agents-in-production-2026";
export const title = "AI agents in production, 2026: the grader decides who is shipping";
export const thesis =
  "Large companies say they are scaling agents. The runs that can be graded are the ones with a score, a harness, and a bill.";
export const description =
  "What 'agents in production' means in November 2026: McKinsey's scaling split, Menlo's spend estimates, SWE-bench and Terminal-Bench rows with the harness named, OSWorld 2.0, and the packages builders actually download.";
export const readOn = "2026-11-10";
export const readingMinutes = 22;

function money(value: number) {
  return usd.format(value);
}

function daysBetween(earlierIso: string, laterIso: string) {
  const ms = 24 * 60 * 60 * 1000;
  const midnight = (iso: string) => {
    const date = new Date(iso);
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  };
  return Math.round((midnight(laterIso) - midnight(earlierIso)) / ms);
}

const frameworkCount = frameworkSnapshot.repos.length;
const recentReleaseCount = frameworkSnapshot.repos.filter(
  (repo) => daysBetween(repo.latest_release_at, frameworkSnapshot.retrieved_at) <= 30,
).length;

function terminal(model: string, agent: string, effort: string) {
  const row = benchmark.terminalBench.rows.find(
    (item) => item.model === model && item.agent === agent && item.effort === effort,
  );
  if (!row) throw new Error(`Missing Terminal-Bench row ${model} / ${agent} / ${effort}`);
  return row;
}

function listedCost(cost: string) {
  const value = Number(cost.replace(/[$,]/g, "").split(" ")[0]);
  if (!Number.isFinite(value)) throw new Error(`Unparsed Terminal-Bench cost: ${cost}`);
  return value;
}

const opus55 = terminal("Opus 5.5", "Claude Code", "max");
const sonnet55 = terminal("Sonnet 5.5", "Claude Code", "max");
const astra = terminal("GPT-6 Astra", "Codex", "max");
const sol = terminal("GPT-6.1 Sol", "Codex", "max");
const boardRows = [opus55, sonnet55, astra, sol];
const swe = benchmark.swebench.bashOnly.filter((row) => row.miniVersion === "2.0.0").slice(0, 6);
const sweLead = swe[0];
if (!sweLead) throw new Error("SWE-bench bash-only list is empty");

const codexCostRatio = listedCost(astra.cost) / listedCost(sol.cost);
const pypiWindow = downloads.pypi[0];
const pypiTop = [...downloads.pypi].sort((a, b) => b.windowDownloads - a.windowDownloads).slice(0, 6);
const npmTop = [...downloads.npm]
  .filter((row) => row.package !== "ai")
  .sort((a, b) => b.windowDownloads - a.windowDownloads)
  .slice(0, 5);
const starTop = [...starsSnapshot.rows].sort((a, b) => b.stars - a.stars || a.name.localeCompare(b.name)).slice(0, 6);
const vercelAi = downloads.npm.find((row) => row.package === "ai");

function millions(value: number) {
  return `${(value / 1_000_000).toFixed(1)} million`;
}

export const sources = [
  {
    n: 1,
    title: "McKinsey, The state of AI in 2026: On the road to ROI",
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    detail:
      "Published August 25, 2026. Online survey in the field May 4 to June 8, 2026. PDF: https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/the-state-of-ai-in-2026-on-the-road-to-roi_final.pdf",
  },
  {
    n: 2,
    title: "Menlo Ventures, 2026: The State of Enterprise AI",
    url: "https://menlovc.com/perspective/2026-the-state-of-enterprise-ai/",
    detail:
      "Published November 3, 2026. PDF: https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf",
  },
  {
    n: 3,
    title: "Stanford HAI, Artificial Intelligence Index Report 2026",
    url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    detail:
      "Ninth edition, April 2026. arXiv:2606.15708. PDF: https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf",
  },
  {
    n: 4,
    title: "SWE-bench Verified and Terminal-Bench 4.0, as copied on this site",
    url: "https://www.swebench.com/verified.html",
    detail: `Copied November 5, 2026 for the harness benchmark. Terminal-Bench board: ${benchmark.terminalBench.boardUrl}. SWE-bench Verified is ${benchmark.swebench.verifiedInstances} instances. The local copy's newest Verified result date is ${benchmark.swebench.newestResultDate}.`,
  },
  {
    n: 5,
    title: "OSWorld 2.0 scores printed on the benchmark page",
    url: "https://osworld-v2.xlang.ai/",
    detail:
      "The three rows used here are the rows stored in the November 9, 2026 browser and computer-use report on this site. Settings are copied as printed.",
  },
  {
    n: 6,
    title: "Andreessen Horowitz, Can agents use a computer yet?",
    url: "https://a16z.com/can-agents-use-a-computer-yet-weve-got-the-data/",
    detail: "Fabrizio Serafini, Seema Amble, and Eric Zhou, August 10, 2026. Their OSWorld-Verified figures are cited as theirs.",
  },
  {
    n: 7,
    title: "PyPI and npm download snapshot on this site",
    url: "/trackers/downloads",
    detail: `Snapshot retrieved ${downloads.retrievedDay}. PyPI counts are file requests without mirrors, from pypistats. npm counts are file requests from the npm registry. A download is not a user.`,
  },
  {
    n: 8,
    title: "GitHub star snapshot and the November 5 framework-release pull",
    url: "/trackers/stars",
    detail: `Stars retrieved ${starsSnapshot.retrievedDay} from the GitHub REST API. Release recency is a separate pull at ${frameworkSnapshot.retrieved_at}, published on the framework report.`,
  },
] as const;

export const keyNumbers = [
  {
    value: "40%",
    label: "of large-company respondents scaling agents",
    note: "McKinsey, 2026 survey. Up from 27%. Smaller companies stayed at 22%.",
  },
  {
    value: "37%",
    label: "attribute any EBIT impact to AI",
    note: "McKinsey. Unchanged from last year. High performers stay at about 6%.",
  },
  {
    value: "$176.8B",
    label: "Menlo's deployment-spend estimate",
    note: "By September 2026, annualized. Menlo's model, from $33B in 2025.",
  },
  {
    value: "76.8%",
    label: "top SWE-bench Verified row we store",
    note: "mini-SWE-agent, Claude 4.5 Opus, high effort. Result date February 17, 2026.",
  },
  {
    value: `${codexCostRatio.toFixed(1)}×`,
    label: "Codex run-cost gap at the same accuracy",
    note: "GPT-6 Astra vs GPT-6.1 Sol, both 58.18% on Terminal-Bench 4.0, effort max.",
  },
  {
    value: "20.6%",
    label: "best OSWorld 2.0 binary row we copied",
    note: "Claude Opus 4.8, 500-step primary metric. Partial score on that row is 54.8%.",
  },
];

export const findings = [
  "McKinsey's agent-scaling jump is a large-company fact. Forty percent of respondents at firms above $1 billion in revenue said they were scaling agents, up from 27 percent. Smaller firms stayed at 22 percent.",
  "Company profit did not follow. Any EBIT impact stayed at 37 percent of respondents, and the high-performer cut stayed at about 6 percent, while 80 percent said their own productivity improved.",
  "Menlo's model puts enterprise deployment spend at $176.8 billion by September 2026. Coding ($34.0 billion) and chatbots ($25.0 billion) are most of the $77.3 billion application market in that model.",
  "On the public coding boards, the harness is part of the score. mini-SWE-agent leads the bash-only SWE-bench Verified copy at 76.8 percent. Claude Code leads Terminal-Bench 4.0 at 64.85 percent. Those are different loops.",
  "Inside one harness the bill still moves. On Terminal-Bench 4.0, Codex at max effort scores 58.18 percent with both GPT-6 Astra and GPT-6.1 Sol. The listed run costs are $3,267.18 and $634.24.",
  "Computer use is a different sport. The OSWorld 2.0 binary completion we copied for Claude Opus 4.8 is 20.6 percent. Andreessen Horowitz's 85 percent is OSWorld-Verified, a different board.",
];

export const executiveSummary = [
  "In November 2026 an agent is in production when a company can point at a repeated workflow, a harness, and a way to fail the run. A survey answer that says 'we are scaling agents' is a different object. This report keeps the two apart.",
  "McKinsey's Global Survey, fielded May 4 to June 8, 2026, has the cleanest split. Among 1,719 respondents in 97 countries, 40 percent of people at organizations with more than $1 billion in revenue said they were scaling AI agents, up from 27 percent a year earlier. Respondents at smaller organizations stayed at 22 percent. About one in five respondents said their organization was scaling software coding agents, 31 percent at the larger enterprises. Over that same year, the share attributing any EBIT impact to AI stayed at 37 percent, and the share McKinsey calls high performers stayed at about 6 percent. Eighty percent said AI had improved their own productivity. Individual output and company profit are different measurements. [[1]]",
  "Menlo Ventures' November 3 estimate says the money moved anyway. Enterprise deployment spend in their model reached $176.8 billion by September 2026, from $33 billion in 2025. On OpenRouter, they report agents generating 80 percent of tokens. Coding and chatbots, $34.0 billion and $25.0 billion, dominate a $77.3 billion application market in the same model. Those are Menlo's figures, built from a survey, filings, and third-party traces. They are not an audited industry census. [[2]]",
  `The public evals agree with the spending pattern and refuse the victory lap. In the SWE-bench Verified bash-only copy stored here on November 5, the lead row is mini-SWE-agent 2.0.0 with Claude 4.5 Opus at high effort: ${sweLead.resolved} percent resolved, listed cost ${money(sweLead.costUsd ?? 0)}, result date ${sweLead.date}. On Terminal-Bench 4.0 the lead row is a different harness, Claude Code, with Opus 5.5 at max effort: ${opus55.accuracy} percent, ${opus55.successes} of ${opus55.trials} trials, listed cost ${opus55.cost}. Hold the harness at Codex and the accuracy at ${astra.accuracy} percent and the listed run cost is still ${astra.cost} for GPT-6 Astra against ${sol.cost} for GPT-6.1 Sol, ${codexCostRatio.toFixed(1)} times the money for the same printed score. [[4]]`,
  "Computer use is not that chart. The OSWorld 2.0 page, as copied for this site on November 9, prints 20.6 percent binary completion for Claude Opus 4.8 on the 500-step primary metric, with a 54.8 percent partial score and 244K output tokens on that row. Andreessen Horowitz's August 10 note cites OSWorld-Verified moving from 42 percent to 85 percent, above a human figure of about 72 percent on that board. Same family of tasks, different tests, and neither number is a contract. [[5]][[6]]",
  "The claim this report is willing to defend: fund the agent where a test, a diff, or a closed runbook can mark the run wrong. A seat on a chatbot, which McKinsey still finds to be the tool most often described as scaled, is a different purchase.",
];

const charts: ChartSpec[] = [
  {
    id: "mckinsey-scaling",
    title: "Share of respondents who say their organization is scaling AI agents",
    caption:
      "Respondents saying their organization is scaling AI agents, by company size. Large means annual revenue above $1 billion.",
    unit: "percent of respondents in that size band",
    source: "McKinsey Global Survey on the state of AI, fielded May 4 to June 8, 2026, n = 1,719. [[1]]",
    series: ["Prior-year survey", "2026 survey"],
    categories: [
      { label: "Large enterprises", values: [27, 40], displays: ["27%", "40%"] },
      { label: "Smaller organizations", values: [22, 22], displays: ["22%", "22%"] },
    ],
  },
  {
    id: "menlo-spend",
    title: "Menlo's enterprise AI deployment-spend estimates",
    caption: "Enterprise AI deployment spend in Menlo Ventures' bottoms-up model. 2026 is the figure through September, shown as an annualized run rate.",
    unit: "billions of US dollars, Menlo estimate",
    source:
      "Menlo Ventures, 2026: The State of Enterprise AI, November 3, 2026. Prior years were reclassified into this year's taxonomy. [[2]]",
    series: ["Deployment spend"],
    categories: [
      { label: "2023", values: [1.7], displays: ["$1.7B"] },
      { label: "2024", values: [8.5], displays: ["$8.5B"] },
      { label: "2025", values: [33], displays: ["$33B"] },
      { label: "Sep 2026", values: [176.8], displays: ["$176.8B"] },
    ],
  },
  {
    id: "menlo-apps",
    title: "Where Menlo puts the 2026 application dollars",
    caption:
      "Application-market slices in Menlo's 2026 model. Coding plus chatbots are the two slices they describe as 76 percent of the $77.3 billion app market. The third bar is the remainder of that total.",
    unit: "billions of US dollars, Menlo estimate",
    source: "Menlo Ventures, November 3, 2026. Remainder is $77.3B minus the two named slices, not a category Menlo named. [[2]]",
    series: ["Spend"],
    categories: [
      { label: "Coding", values: [34], displays: ["$34.0B"] },
      { label: "Chatbots", values: [25], displays: ["$25.0B"] },
      { label: "Rest of app market", values: [18.3], displays: ["$18.3B"] },
    ],
  },
  {
    id: "swe-bench",
    title: "SWE-bench Verified, bash-only, top of the November 5 copy",
    caption:
      "Percent of SWE-bench Verified issues resolved. Every row is mini-SWE-agent 2.0.0, the tool-calling generation. Release 1.x parses text and is left off this chart. Verified is 500 issues.",
    unit: "percent resolved",
    source: `Official SWE-bench Verified board, copied November 5, 2026. Lead result date ${sweLead.date}. [[4]]`,
    series: ["Resolved"],
    categories: swe.map((row) => ({
      label: row.model,
      values: [row.resolved],
      displays: [`${row.resolved}%`],
    })),
  },
  {
    id: "terminal-cost",
    title: "Terminal-Bench 4.0 listed run cost on four rows",
    caption:
      "Cost cell copied as printed on Terminal-Bench 4.0, for four rows with a complete cost (no partial-trial note). The agent is not the same on every row.",
    unit: "US dollars, listed run cost",
    source: `Terminal-Bench 4.0 leaderboard, board updated ${benchmark.terminalBench.updatedAt}, copied November 5, 2026. [[4]]`,
    series: ["Listed run cost"],
    categories: boardRows.map((row) => ({
      label: `${row.model} + ${row.agent}`,
      values: [listedCost(row.cost)],
      displays: [money(listedCost(row.cost))],
    })),
  },
  {
    id: "terminal-per-success",
    title: "Listed run cost divided by recorded successes",
    caption:
      "Arithmetic on this page: the printed run cost divided by the successes field. This is not a vendor invoice and not a price per token.",
    unit: "US dollars per recorded success",
    source: "Computed from the Terminal-Bench 4.0 rows above. [[4]]",
    series: ["Per success"],
    categories: boardRows.map((row) => ({
      label: `${row.model} + ${row.agent}`,
      values: [listedCost(row.cost) / row.successes],
      displays: [money(listedCost(row.cost) / row.successes)],
    })),
  },
  {
    id: "pypi",
    title: "PyPI file requests for agent packages",
    caption: `PyPI downloads without mirrors, ${pypiWindow?.windowStart} through ${pypiWindow?.windowEnd}. A download is a file request, not an install and not a user.`,
    unit: "file requests in the window",
    source: `Snapshot retrieved ${downloads.retrievedDay} from pypistats. [[7]]`,
    series: ["Downloads"],
    categories: pypiTop.map((row) => ({
      label: row.package,
      values: [row.windowDownloads],
      displays: [millions(row.windowDownloads)],
    })),
  },
  {
    id: "stars",
    title: "GitHub stars on agent repositories",
    caption: "stargazers_count from the GitHub REST API. Stars are attention, not production seats.",
    unit: "stars",
    source: `Snapshot retrieved ${starsSnapshot.retrievedDay}. [[8]]`,
    series: ["Stars"],
    categories: starTop.map((row) => ({
      label: row.name,
      values: [row.stars],
      displays: [num.format(row.stars)],
    })),
  },
];

export const reportCharts = charts;

export const chapters: ReportChapter[] = [
  {
    id: "scaling-is-a-survey-answer",
    title: "Scaling is a survey answer",
    blocks: [
      {
        kind: "p",
        text: "McKinsey has run a global AI survey for the better part of a decade. The 2026 wave was online, in the field from May 4 to June 8, and it collected 1,719 responses across 97 countries. Responses are weighted by each country's contribution to global GDP, which keeps a small country's reply from counting like a large one's. Thirty-six percent of respondents said they work at organizations with more than $1 billion in annual revenue. The people answering are not a random sample of employees. They are the people McKinsey could reach who would fill in a survey about their company's AI use. Read every percentage below as 'share of those respondents,' and read 'large' as that revenue cut. [[1]]",
      },
      {
        kind: "p",
        text: "Inside that frame, the agent result is a size result. Forty percent of respondents from large organizations said they were scaling AI agents, up from 27 percent in the prior wave. The share at smaller organizations was 22 percent in both waves. McKinsey's own sentence is the right one: the increase in agentic AI is mostly accounted for by large enterprises. A vendor who quotes '40 percent of companies are scaling agents' has dropped the only clause that makes the number true.",
      },
      { kind: "chart", id: "mckinsey-scaling" },
      {
        kind: "p",
        text: "The same survey says what else is being scaled, and the order matters. Chatbots are the tool most often described as scaled across the enterprise, at 47 percent of respondents. AI agents, and software coding agents specifically, each sit at about two in ten overall. Coding agents reach 31 percent among the large enterprises. So the modal 'scaled AI tool' in this survey is still a chatbot. The agent number is real, and it is not the majority experience. Treating the chatbot row and the agent row as one adoption story is how a buyer ends up purchasing a chat window and calling the rollout agentic.",
      },
      {
        kind: "p",
        text: "McKinsey defines high performers narrowly: respondents who attribute at least 5 percent of EBIT to AI use and who describe the impact as significant. That group is about 6 percent of respondents, flat with last year. They are twice as likely as other respondents to say they are scaling software coding agents, and 2.7 times as likely to say they are scaling other agentic AI. They are also the group that feels the bill. High performers report being constrained by costs on software coding agents about three times as often as others, while the cost constraint on other tools looks similar between the groups. The firms that have pushed coding agents furthest are the firms reporting that tokens are now a design constraint. Cost is showing up in the successful deployments, not only in the stalled ones.",
      },
      {
        kind: "p",
        text: "Two other buying facts sit next to that. Nearly a third of respondents, 32 percent, said their organization had decided against buying at least one software product or feature because it could be built in-house with agentic coding tools. Among high performers the share is nearly half, against 31 percent of other respondents. And about 20 percent of all respondents said AI operating costs, including token costs, had constrained their AI use, with about one in ten saying that for each of chatbots, agents, and coding agents separately. The build-versus-buy shift and the cost constraint are the same phenomenon seen from purchasing and from finance.",
      },
      {
        kind: "p",
        text: "The profit line did not move with any of this. Thirty-seven percent of respondents attribute at least some EBIT impact to AI, about the same as last year. Eighty percent say AI improved their own productivity, and about half say it helped them make better decisions. Mid-level managers and individual contributors are more likely than executives to report a negative effect: 47 percent against 31 percent. A program can be popular with the person using it, uncomfortable for the person under the executive, and invisible in EBIT. Those three sentences are allowed to be true together.",
      },
      {
        kind: "quote",
        text: "Just 14 percent of respondents from organizations using AI report that AI contributed to an overall decline in workforce size in the past year—less than half the 32 percent who, in last year's survey, expected workforce reductions over the same period.",
        cite: "McKinsey, The state of AI in 2026. [[1]]",
      },
      {
        kind: "p",
        text: "This year's expectation moved the other way. Thirty-nine percent expect an AI-related decline in total employment over the coming year, up from 32 percent, and 43 percent expect no AI-related change. The quote above is the reason this report does not treat 39 percent as a forecast of layoffs. The same question, asked of a similar instrument, overshot the reported outcome last time. Headcount is picked up again in the 2027 forecast, where it is labeled as a forecast. Here it is only the track record of the question.",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "If your company is under $1 billion in revenue, 22 percent is the base rate this survey gives you, and it did not rise. If you are over that line, ask which workflow is being scaled, what marks a run as failed, and what the retry budget is. 'Scaling' in this questionnaire is the respondent's choice of phase. It is not a success rate. The high-performer cut is the useful tell: the respondents who say coding agents are scaled are also the ones saying the token bill is now in the way.",
      },
    ],
  },
  {
    id: "where-the-dollars-went",
    title: "The dollars followed work that can be checked",
    blocks: [
      {
        kind: "p",
        text: "Menlo's fourth annual enterprise report, published November 3, 2026, is an estimate with a method, which is better than a round number and worse than a 10-K. Morning Consult fielded the underlying survey from September 8 to September 26, 2026, to nearly 400 U.S. enterprise decision-makers whose organizations represent more than $4 billion in AI spending. Dollar totals for the market are Menlo's bottoms-up model on top of those answers, public filings, and third-party reports. Revenue is an annualized run rate. They reclassified prior years so that data-labeling vendors such as Mercor sit in development rather than deployment. Anyone comparing their 2025 bar to a chart from last year's PDF should use this year's rebased figures, not the old ones. [[2]]",
      },
      {
        kind: "p",
        text: "On that basis they put enterprise deployment spend at $1.7 billion in 2023, $8.5 billion in 2024 (5.0 times), $33 billion in 2025 (3.9 times), and $176.8 billion by September 2026 (5.4 times the 2025 figure). The round '$177 billion' in their headline is that $176.8 billion. Spend on building models, in the same model, is $102.5 billion, up 5.3 times. Their ratio is about $1.70 of deployment spend for each dollar going into building models. Fifty-five percent of the AI dollars, they estimate, is net-new spend rather than a transfer out of existing software or labor budgets.",
      },
      { kind: "chart", id: "menlo-spend" },
      {
        kind: "p",
        text: "The application split is the part that should change a roadmap. In Menlo's model the application market is $77.3 billion. Coding is $34.0 billion and chatbots are $25.0 billion, which they describe as 76 percent of that market. The labs' own coding agents grew from $1 billion to $24 billion, and the rest of the coding market still grew 2.9 times to $10 billion. Coding as a category is 96 percent AI-native in their taxonomy. AI assistants are $9.5 billion and healthcare is $3.7 billion. Incumbents, they say, are taking share in older software categories: IT at 91 percent, data science at 88 percent, HR at 68 percent. New agent categories and old system-of-record categories are not moving in the same direction.",
      },
      { kind: "chart", id: "menlo-apps" },
      {
        kind: "callout",
        title: "One router, not the market",
        text: "Menlo reports that on OpenRouter, agents generate 80 percent of tokens, 130.9 trillion a week, roughly seven times human-driven usage, and that agent traffic is up 37 times since it overtook human traffic in February. OpenRouter is a multi-model router used heavily by developers. It is not the enterprise procurement market, and it is not ChatGPT. Use the 80 percent as evidence that machine-driven loops dominate one large developer pipe. Do not use it as the share of corporate AI spend.",
      },
      {
        kind: "p",
        text: "Model share, in their survey-weighted read of production API usage, moved toward the labs that are winning coding. Frontier labs are 69 percent of deployment dollars, up from 50 percent. Anthropic's share of enterprise API spend went from 40 percent to 55 percent, OpenAI's from 27 percent to 31 percent, and Google's from 21 percent to 9 percent. Those three named shares add to 95 percentage points. This page does not assign the remaining points, because the sentences used here do not. Open-source models are a separate cut: 19 percent of usage, up from 11 percent, and 4 percent of spend. Usage share and dollar share diverge, which is what you expect when the cheap model handles the high-volume call and the expensive model handles the call someone will grade.",
      },
      {
        kind: "p",
        text: "Menlo's explanation for the concentration is the one this report agrees with, because the evals later in the page show the same shape. Spend concentrates where an agent can act, where the workflow repeats, and where the result can be checked. Coding has a test suite. A chatbot session has a user who either continues or does not. A general 'AI employee' has neither, until someone builds the grader. The $34 billion is not a compliment to the word agent. It is a compliment to the unit test.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "A product whose demo is a general employee is aimed at the slice of Menlo's app market that is not coding and not chat. That remainder, on their numbers, is about $18 billion, and it includes categories where they say incumbents are gaining. Price the company against that slice, not against $177 billion. And if a board slide quotes Anthropic at 55 percent of enterprise API spend, the footnote is Menlo's survey-weighted estimate, not a stack of invoices.",
      },
    ],
  },
  {
    id: "coding-agents",
    title: "Coding agents are ahead because the grader already exists",
    blocks: [
      {
        kind: "p",
        text: `SWE-bench Verified is 500 real GitHub issues. A row's score is the percent of issues whose tests passed. The bash-only slice stored on this site holds the harness still: every row is mini-SWE-agent, so the chart below is a model comparison inside one loop, not a comparison of Claude Code, Codex, and a vendor demo. The SWE-bench project says release 2.x calls tools, while release 1.x reads an action out of the model's text, and that the two generations are not necessarily comparable. The lead rows in our November 5 copy are mini-SWE-agent 2.0.0. They are tool-calling runs. [[4]]`,
      },
      {
        kind: "p",
        text: `The lead row is ${sweLead.name}: ${sweLead.resolved} percent resolved, listed cost ${money(sweLead.costUsd ?? 0)}, result date ${sweLead.date}, reasoning effort ${sweLead.reasoningEffort}. The next rows in that copy, same harness and same date, are ${swe[1]?.name} at ${swe[1]?.resolved} percent (listed cost ${money(swe[1]?.costUsd ?? 0)}) and ${swe[2]?.name} at ${swe[2]?.resolved} percent (listed cost ${money(swe[2]?.costUsd ?? 0)}). The cluster is tight. A two-point gap on 500 issues is 10 issues. It is not a generation of product advantage, and it is not a reason to rewrite a stack.`,
      },
      { kind: "chart", id: "swe-bench" },
      {
        kind: "p",
        text: "If the listed cost on the lead row is the cost of the full 500-issue run, the arithmetic is about 75 cents per issue ($376.95 / 500). This page does not have a separate per-issue invoice, so that figure stays an if. It is still the right order of magnitude to hold in your head: a minimal tool-calling harness, on a graded software task, was not a multi-dollar event per issue on that February row. Terminal-Bench, below, is a different order of magnitude because the harness and the task are different. Quoting 'coding agents cost 75 cents' without the harness name would be the mistake this section exists to prevent.",
      },
      {
        kind: "p",
        text: "Stanford's 2026 Index is worth reading beside this table, because the Index is where a careless summary will come from. The top takeaway says performance on SWE-bench Verified rose from 60 percent to near 100 percent of meeting the human baseline in a single year. The coding section of the same report, discussing the state of the board as of February 2026, says the top models are clustered in the low-to-mid 70s and names Claude 4.5 Opus (high reasoning) at approximately 76.8 percent, with Kimi K2.5, GPT-5.2, and Gemini 3 Flash (high reasoning) between 70 and 76 percent. That 76.8 percent is the same lead this site's November 5 copy stores for mini-SWE-agent. The Index also says, in a chapter opener, that AI agents are improving but still fail roughly one in three attempts. A 76.8 percent resolve rate leaves 23.2 percent unresolved on that row, which is in the neighborhood of 'one in three' only if you round hard and forget that the row is one model plus one harness. [[3]][[4]]",
      },
      {
        kind: "callout",
        title: "Do not promote the baseline sentence",
        text: "This page does not have Stanford's definition of the human baseline in a form that turns 76.8 percent resolved into 'near 100 percent.' We report the resolve rate, the harness, and the date. The baseline sentence can stay in the Index, where it is attached to whatever figure 2.1.1 is actually plotting.",
      },
      {
        kind: "p",
        text: "The practical consequence for a coding-agent buyer is that the public number is a property of a triple: model, harness, effort. mini-SWE-agent is a minimal loop. Claude Code and Codex, which show up on Terminal-Bench rather than in this bash-only slice, carry their own tools, their own compaction, and their own retry policy. A model card that prints a SWE-bench score without the harness is borrowing the Verified brand for a run you cannot reconstruct. The [November harness benchmark](/reports/agent-harness-benchmark-november-2026) keeps the full tables, including the team-checked rows that use other harnesses and the multilingual set, which is a different task list and must not be averaged with these 500.",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Publish the harness version, whether the loop calls tools or parses text, the effort setting, and the grader next to the percent. Buyers should write the eval set into the contract and should refuse a SWE-bench number that does not name the agent. The interesting gap in this table is not between 76.8 and 75.8. It is between a minimal tool-calling harness that already clears three quarters of a graded issue set and a production repo whose tests, flaky CI, and private code the public board has never seen.",
      },
    ],
  },
  {
    id: "cost-per-success",
    title: "The harness sets the bill",
    blocks: [
      {
        kind: "p",
        text: `Terminal-Bench 4.0 is the current board linked from tbench.ai. Unlike the bash-only SWE-bench slice, the agent column changes by row. The copy stored here was read November 5, 2026. The board's own updated-at stamp in that copy is ${benchmark.terminalBench.updatedAt}. Accuracy and the 95 percent half-width are the leaderboard's fields. The cost cell is copied as printed, including a partial-trial note where the board includes one. Rows with a partial note are left out of the cost chart, because a partial bill is not comparable to a full one. [[4]]`,
      },
      {
        kind: "p",
        text: `The lead row is ${opus55.model} with ${opus55.agent} at effort ${opus55.effort}: ${opus55.accuracy} percent, half-width ${opus55.ciHalfWidth}, ${opus55.successes} successes out of ${opus55.trials} trials, listed cost ${opus55.cost}, result date ${opus55.date}. ${sonnet55.model} with the same agent and effort scores ${sonnet55.accuracy} percent (${sonnet55.successes}/${sonnet55.trials}) at a listed cost of ${sonnet55.cost}. Inside Claude Code, the higher score is the cheaper listed run. That single comparison is enough to retire 'you have to buy the most expensive setting.'`,
      },
      {
        kind: "p",
        text: `The clean price comparison holds the harness still. ${astra.model} with ${astra.agent} at effort ${astra.effort} scores ${astra.accuracy} percent, ${astra.successes} of ${astra.trials}, listed cost ${astra.cost}, date ${astra.date}. ${sol.model} with the same agent and the same effort scores ${sol.accuracy} percent, ${sol.successes} of ${sol.trials}, listed cost ${sol.cost}, date ${sol.date}. Same printed accuracy. The Astra run is listed at ${codexCostRatio.toFixed(1)} times the Sol run. Dividing listed cost by recorded successes gives ${money(listedCost(astra.cost) / astra.successes)} per success for Astra and ${money(listedCost(sol.cost) / sol.successes)} for Sol. Opus 5.5 with Claude Code comes out at ${money(listedCost(opus55.cost) / opus55.successes)} per recorded success, on a higher accuracy and a different harness, so it does not enter a ranking against Codex.`,
      },
      { kind: "chart", id: "terminal-cost" },
      { kind: "chart", id: "terminal-per-success" },
      {
        kind: "p",
        text: "Why would two Codex runs with the same accuracy and the same effort label differ by a factor of five? This page does not have the traces, so it will not invent a cause. The candidates a harness engineer would actually inspect are real: how much tool output is kept in the window, whether a failed command is retried with the full history or a compacted one, whether the effort setting spends reasoning tokens before the first shell call, and whether the run caches an environment that the other run rebuilds. That inspection is context engineering. It is the decision of what occupies the window on turn n, given the tool results from turns 1 through n-1. It is not a slogan for 'write a better prompt.'",
      },
      {
        kind: "p",
        text: "McKinsey's cost result lands in the same place from the buyer's side. The respondents most likely to say they are scaling coding agents are about three times as likely to say costs constrained that use. A team that is not yet scaling will not see the bill, because the bill is produced by retries. A dashboard that tracks tokens per seat, or cost per employee per month, averages the human who asked one question together with the loop that took forty tool calls to go red and then green. Cost per successful task is the unit that matches the way the board already reports the work: a cost, a success count, and a trial count, on the same row.",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Ask the vendor for cost per successful task on your eval, with the harness version pinned. A token-price cut on the model card does not answer the question the Terminal-Bench rows raise. Inside one agent, Codex, the listed bill moved by a factor of five at a fixed score. Builders should log successes, retries, input tokens, and output tokens on the same span, and should be able to say which of those moved when the bill moved.",
      },
    ],
  },
  {
    id: "computer-use",
    title: "Computer use is still a runbook",
    blocks: [
      {
        kind: "p",
        text: "A coding agent fails in a way a test can see. A computer-use agent fails in a way a screenshot often cannot. The OSWorld 2.0 numbers this site copied on November 9 make that concrete, and they have to be quoted with the setting, because the page prints different settings on different rows. Claude Opus 4.8, maximum thinking, batched tool calls, 500-step primary metric: 20.6 percent binary completion, 54.8 percent partial score, 244K output tokens. Claude Opus 4.7, maximum thinking, batched tool calls: 18.2 percent binary. GPT-5.5 is printed as about 14 percent binary and 39K output tokens, on a row the page describes as the more token-efficient run. Partial credit is not a finished task. A 54.8 percent partial score next to a 20.6 percent binary score means the run often got somewhere and did not finish. [[5]]",
      },
      {
        kind: "p",
        text: "Andreessen Horowitz, on August 10, 2026, describes a different board. They write that the best computer-using model a year earlier scored 42 percent on OSWorld-Verified and that the best score at the time of their note was 85 percent, above the roughly 72 percent humans manage on those tasks. They also write, from conversations with teams running computer-use workflows, that protocol-following tasks work and that agents break when the work leaves the runbook. The founder quote they include says the models were not good enough to use in production on their own until Opus 4.6 in February 2026. Their production examples are the long tail of software without an API: CRM updates, portal logins, ticket handling, record checks. [[6]]",
      },
      {
        kind: "callout",
        title: "Two boards, two numbers",
        text: "20.6 percent binary on OSWorld 2.0 and 85 percent on OSWorld-Verified cannot be averaged, and neither can be subtracted from a SWE-bench resolve rate. The task, the harness, the step limit, and the grader are all different. Quote the board's name or do not quote the percent.",
      },
      {
        kind: "p",
        text: "The a16z piece and the OSWorld 2.0 binary rate are compatible once you stop treating them as a horse race. A narrow, cached, checkable UI path can be in production while a general desktop benchmark is still failing four times in five on a binary grader. That is the shape of the category. The [browser and computer-use report](/reports/browser-and-computer-use-agents-next-6-months) lists the ten live products and the one vendor date through May 9, 2027. This page does not repeat that table. What it adds is the evaluation point: binary completion on the OSWorld 2.0 primary metric we copied is still about one in five for the best printed row, at a token cost (244K output tokens on that Opus 4.8 row) that makes an unattended retry loop expensive fast.",
      },
      {
        kind: "p",
        text: "Tool calling is the shared mechanism, and it does not rescue the category by itself. A computer-use model emits a click, a keystroke, or a tool call. The harness applies it in a sandbox, observes the next screen, and decides whether to continue. MCP, the Model Context Protocol, is one way to expose those tools to the model through a schema. Standardizing the socket is worth doing. It does not grade the screen. A buyer who mandates MCP and stops there has standardized the plug, not the outcome. The glossary entries for [tool use](/glossary/tool-use), [harness](/glossary/harness), and [MCP](/glossary/model-context-protocol) keep the definitions short. The engineering point is the one in the previous section: the window fills up with observations, and somebody has to decide what remains.",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Ship computer use as a runbook with a check at the end: a known UI, a cached path, a human on the step that moves money or deletes data. If the task has no stable screen and no API, the 20.6 percent binary row is the relevant public number, not the 85 percent on a different board. Do not staff a general desktop employee on the evidence in this report.",
      },
    ],
  },
  {
    id: "what-builders-install",
    title: "What builders actually install",
    blocks: [
      {
        kind: "p",
        text: `Surveys say what respondents claim. Package registries say what a build machine requested. They are not the same, and the registry is the less flattering one, which is why it belongs here. The download snapshot on this site was retrieved ${downloads.retrievedDay}. The PyPI window in it runs from ${pypiWindow?.windowStart} through ${pypiWindow?.windowEnd}, counted without mirrors. The top of that window is ${pypiTop[0]?.package} at ${num.format(pypiTop[0]?.windowDownloads ?? 0)} file requests, then ${pypiTop[1]?.package} at ${num.format(pypiTop[1]?.windowDownloads ?? 0)}, ${pypiTop[2]?.package} at ${num.format(pypiTop[2]?.windowDownloads ?? 0)}, ${pypiTop[3]?.package} at ${num.format(pypiTop[3]?.windowDownloads ?? 0)}, ${pypiTop[4]?.package} at ${num.format(pypiTop[4]?.windowDownloads ?? 0)}, and ${pypiTop[5]?.package} at ${num.format(pypiTop[5]?.windowDownloads ?? 0)}. A download is a file request. CI, mirrors we failed to exclude, and dependency installs all count. It is still a better picture of the harness layer than a logo wall. [[7]]`,
      },
      { kind: "chart", id: "pypi" },
      {
        kind: "p",
        text: `Two cautions belong in the same breath as the chart. pydantic-ai-slim and pydantic-ai are separate packages, so their bars are not additive users. And the npm package \`ai\`, the Vercel AI SDK, is in the same snapshot at ${vercelAi ? num.format(vercelAi.windowDownloads) : "a large count"} file requests over the same window. It is left off the agent chart. That package is a model SDK. A download of it is not evidence that an agent loop was installed. The npm packages that are agent loops, over the same window, are led by ${npmTop[0]?.package} (${num.format(npmTop[0]?.windowDownloads ?? 0)}), ${npmTop[1]?.package} (${num.format(npmTop[1]?.windowDownloads ?? 0)}), ${npmTop[2]?.package} (${num.format(npmTop[2]?.windowDownloads ?? 0)}), ${npmTop[3]?.package} (${num.format(npmTop[3]?.windowDownloads ?? 0)}), and ${npmTop[4]?.package} (${num.format(npmTop[4]?.windowDownloads ?? 0)}).`,
      },
      {
        kind: "p",
        text: `Stars are the attention series, pulled separately on ${starsSnapshot.retrievedDay}. ${starTop[0]?.name} (${starTop[0]?.repo}) leads that snapshot at ${num.format(starTop[0]?.stars ?? 0)} stars, then ${starTop[1]?.name} at ${num.format(starTop[1]?.stars ?? 0)} and ${starTop[2]?.name} at ${num.format(starTop[2]?.stars ?? 0)}. Stars do not convert to the PyPI bars at a stable rate, and they should not be asked to. LangChain's star count and its download count are both large. A repository can be starred and quiet, or downloaded constantly by CI and rarely starred. The [stars tracker](/trackers/stars) and the [downloads tracker](/trackers/downloads) are the live pages. [[8]]`,
      },
      { kind: "chart", id: "stars" },
      {
        kind: "p",
        text: `Release recency is a third pull, on ${frameworkSnapshot.retrieved_at.slice(0, 10)}, of ${frameworkCount} open-source frameworks and SDKs. ${recentReleaseCount} of the ${frameworkCount} had a latest GitHub release within 30 days of that pull. The list, the licences, and the day counts are on the [framework release report](/reports/ai-agent-framework-github-stats-november-2026). The point for this page is narrower. The harness layer builders import is being shipped against, not abandoned. A production agent in 2026 is usually one of these loops, or a vendor harness such as Claude Code or Codex, wrapped around a model, with the company's own tools on the side. It is rarely a new runtime invented for the demo.`,
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Pick the harness the way you pick a database: by what you will have to operate. LangChain and LangGraph dominate file requests. Claude Agent SDK, OpenAI Agents SDK, Google ADK, CrewAI, Pydantic AI, Mastra, and Strands are the other names with a real download trail in this window. Stars are a reason to read the repo. They are not a reason to adopt it. If you publish an agent framework, report downloads and a pinned eval, not a star-count screenshot.",
      },
    ],
  },
  {
    id: "what-to-fund",
    title: "What to fund",
    blocks: [
      {
        kind: "p",
        text: "Put the pieces in one purchase order. From McKinsey: agent scaling rose where the company was already large, coding agents are the agent type with a measurable build-versus-buy effect, profit attribution did not move, and the teams that scaled coding agents are the ones reporting the cost constraint. From Menlo: the deployment dollars in their model concentrated in coding and chat, on a router the machine-driven share of tokens is already the majority, and open-source usage is far ahead of open-source spend. From the boards: a minimal tool-calling harness clears about three quarters of SWE-bench Verified, a heavier coding harness on Terminal-Bench has a listed bill that moves by a factor of five inside a single agent at a fixed score, and the best OSWorld 2.0 binary row we copied finishes about one run in five.",
      },
      {
        kind: "p",
        text: "That is enough to fund three lines and to leave one unfunded. Fund a coding agent where the repository has tests, and buy it on cost per green run with the harness pinned. Fund a computer-use runbook where the UI is stable and a person still approves the step that cannot be undone. Fund the harness work itself: compaction, retries, traces, and the eval that gates a change. Leave unfunded the general employee agent, the one whose pitch is that it will notice what to do. Nothing in the sources above is a measurement of that product. The chatbot seat, which is what 47 percent of McKinsey's respondents say is actually scaled, can be bought as a chatbot. Calling it an agent does not give it a grader.",
      },
      {
        kind: "p",
        text: "The [12-month filing calendar](/reports/ai-agents-next-12-months) is the page for dates a company or a government has already put on paper. This page is the cross-section of what is running. The [2027 forecast](/reports/ai-agents-in-2027) says what we think changes, and it says what would prove us wrong. List prices for the coding products sit on the [30-day pricing brief](/reports/ai-coding-agents-next-30-days). They are a third unit, beside token price and cost per success, and they should not be mixed into the charts above.",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Write the task class on the order: graded software work, checkable UI runbook, or chat. Ask for the harness version, the eval, the success definition, and the cost per success. A vendor who can answer those four is selling an agent. A vendor who answers with a seat price and a model name is selling a subscription.",
      },
    ],
  },
  {
    id: "methodology",
    title: "Methodology",
    blocks: [
      {
        kind: "p",
        text: "This page did not field a survey, recruit an expert panel, or interview companies. It copies published figures and recomputes nothing except the arithmetic it labels. There is no hidden sample of practitioners behind the sentences.",
      },
      {
        kind: "h3",
        text: "What was counted",
      },
      {
        kind: "p",
        text: "McKinsey's figures are the shares printed in the August 25, 2026 survey report: scaling by company size, the roughly one-in-five and 31 percent coding-agent shares, the 47 percent chatbot figure, the 37 percent EBIT figure, the about-6-percent high-performer definition, the 80 percent productivity figure, the 32 percent and 'nearly half' build-versus-buy figures, the cost-constraint figures, and the 14, 32, and 39 percent workforce figures. 'Large' means annual revenue above $1 billion, which is McKinsey's cut. The survey is GDP-weighted. n is 1,719. [[1]]",
      },
      {
        kind: "p",
        text: "Menlo's dollar figures are Menlo's estimates, annualized run rate, from the November 3, 2026 report. The $18.3 billion 'rest of app market' bar is this page's subtraction, $77.3 billion minus $34.0 billion minus $25.0 billion. Menlo describes coding and chatbots as 76 percent of that market. The subtraction is shown so the chart's three bars add to the total they named. It is not a segment they published under that label. The OpenRouter token shares are Menlo's account of OpenRouter, not a recount by this site. [[2]]",
      },
      {
        kind: "p",
        text: `SWE-bench and Terminal-Bench figures are the rows in the November 5, 2026 copy used by the harness benchmark. The newest Verified result date in that copy is ${benchmark.swebench.newestResultDate}. Cost-per-success is listed run cost divided by the successes field. The SWE-bench per-issue figure is listed cost divided by 500, stated as conditional on that cost being the full run. The Codex cost ratio is GPT-6 Astra's listed cost divided by GPT-6.1 Sol's listed cost, both at effort max. Rows whose cost cell mentions a partial trial are excluded from those divisions. [[4]]`,
      },
      {
        kind: "p",
        text: `OSWorld 2.0 figures are the three rows stored for the November 9 browser report, originally read off https://osworld-v2.xlang.ai/. They are quoted in the computer-use chapter with the setting printed on the row. They are not drawn on a chart, because 'about 14 percent' is not a point that belongs on the same axis as 20.6 and 18.2 without a label the bar cannot carry. Package counts and star counts are the snapshots retrieved ${downloads.retrievedDay}. Release recency uses the framework snapshot retrieved ${frameworkSnapshot.retrieved_at}, with the same UTC-day distance the framework report uses, and a 30-day cutoff. [[5]][[7]][[8]]`,
      },
      {
        kind: "h3",
        text: "What this does not measure",
      },
      {
        kind: "p",
        text: "It does not measure how many agents are unattended in production. McKinsey measured what respondents said about scaling. Menlo estimated spend. The boards measured harnesses on public tasks. Registries measured file requests. None of those is a census of deployed agents. It does not measure quality of life, wages, or incidents. The Stanford human-baseline sentence is quoted and not converted into a resolve rate. Andreessen Horowitz's OSWorld-Verified numbers are quoted as theirs and are not merged with OSWorld 2.0. Deloitte's January 2026 enterprise survey is left out of the charts because its fieldwork was August and September 2025 and its questions are about AI programs in general. Using it as an agent-production rate would be a category error.",
      },
      {
        kind: "p",
        text: "Forward-looking sentences are not in this report except as pointers. The workforce expectation, the Menlo growth rates, and the board scores are described as measurements with a date. What we think happens in 2027, and what would falsify it, is [AI agents in 2027](/reports/ai-agents-in-2027).",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "If you cite this page, cite the source number, not 'AI Agents Info found.' We found the public record and did the division. The division is marked wherever it appears.",
      },
    ],
  },
];
