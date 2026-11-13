import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/ai-coding-agents-next-6-months";
export const title =
  "AI coding agents, Nov 2026 to May 2027: Terminal-Bench's lead costs $4,719. The intervals overlap.";
export const thesis =
  "Claude Code's best Terminal-Bench 4.1 row and Codex's best row overlap. SWE-bench Verified has not added a result since February 26, 2026.";
export const description =
  "Coding agents from November 13, 2026 through May 13, 2027. Terminal-Bench 4.1 and SWE-bench Verified re-read the same day: Claude Code's best row is $4,718.65, Codex's is $634.24, and the 95% intervals overlap. Dated marks are November 18, November 21, and the end of 2026.";
export const readOn = "2026-11-13";

const opusAccuracy = 65.76;
const opusHalf = 3.11;
const opusSuccesses = 217;
const opusCost = 4718.65;
const fableAccuracy = 65.76;
const fableHalf = 2.85;
const fableCost = 16492.76;
const sonnetAccuracy = 63.94;
const sonnetHalf = 3;
const sonnetSuccesses = 211;
const sonnetCost = 7333.64;
const solAccuracy = 60.91;
const solHalf = 2.97;
const solSuccesses = 201;
const solCost = 634.24;
const trials = 330;
const sweLeadCost = 376.95;
const sweSecondCost = 36.64;

function calendarDays(start: string, end: string) {
  return Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000);
}

function perSuccess(cost: number, successes: number) {
  return Math.round((cost / successes) * 100) / 100;
}

const opusEach = perSuccess(opusCost, opusSuccesses);
const fableEach = perSuccess(fableCost, opusSuccesses);
const solEach = perSuccess(solCost, solSuccesses);
const opusLow = Math.round((opusAccuracy - opusHalf) * 100) / 100;
const solHigh = Math.round((solAccuracy + solHalf) * 100) / 100;
const costRatio = Math.round((opusCost / solCost) * 10) / 10;
const sweRatio = Math.round((sweLeadCost / sweSecondCost) * 10) / 10;
const quietDays = calendarDays("2026-05-22", "2026-11-13");
const boardDays = calendarDays("2026-02-26", "2026-11-13");
const orbHours = 45_000 / 60;

if (opusEach !== 21.74) throw new Error("opus per success");
if (fableEach !== 76) throw new Error("fable per success");
if (solEach !== 3.16) throw new Error("sol per success");
if (opusLow !== 62.65 || solHigh !== 63.88 || !(opusLow < solHigh)) throw new Error("intervals");
if (costRatio !== 7.4) throw new Error("cost ratio");
if (sweRatio !== 10.3) throw new Error("swe ratio");
if (quietDays !== 175 || boardDays !== 260) throw new Error("day counts");
if (orbHours !== 750) throw new Error("orb hours");
if (Math.round((opusSuccesses / trials) * 10000) / 100 !== opusAccuracy) throw new Error("opus rate");
if (Math.round((solSuccesses / trials) * 10000) / 100 !== solAccuracy) throw new Error("sol rate");
if (sonnetSuccesses !== 211 || sonnetCost !== 7333.64) throw new Error("sonnet row");
if (135_153 - 133_622 !== 1_531) throw new Error("codex stars");
if (93_389 - 92_927 !== 462) throw new Error("openhands stars");

const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const keyNumbers = [
  {
    value: money(solCost),
    label: "Codex's best Terminal-Bench 4.1 row",
    note: "GPT-6.1 Sol, max effort, Codex harness. 201 of 330, 60.91% ± 2.97. Dated September 29, 2026. Board updated November 13.",
  },
  {
    value: money(opusCost),
    label: "Claude Code's cheaper tie at the top",
    note: "Opus 5.5, max, 217 of 330, 65.76% ± 3.11. Fable 5.2 matches the 217 and prints $16,492.76.",
  },
  {
    value: "Feb 26",
    label: "newest date in the SWE-bench Verified file",
    note: "Fetched November 13, 2026. 180 results. Claude Code and the Codex product are not agent names on that list.",
  },
  {
    value: "Nov 21",
    label: "GPT-5.6 Sol's promo rate, at least through this day",
    note: "Codex pricing, read November 13. The page does not print the rate that follows. Antigravity removes three models on November 18.",
  },
];

export const findings = [
  `On Terminal-Bench 4.1, Claude Code plus Opus 5.5 at max effort resolves 217 of 330 tasks (65.76%, half-width 3.11) for ${money(opusCost)}. Codex plus GPT-6.1 Sol at max effort resolves 201 of 330 (60.91%, half-width 2.97) for ${money(solCost)}. The intervals run to ${opusLow}% and ${solHigh}%. They overlap. The bill does not: ${money(opusCost)} is ${costRatio} times ${money(solCost)}.`,
  `Dividing the printed bill by the printed successes puts Codex at ${money(solEach)} a success and that Claude Code row at ${money(opusEach)}. The same 217 successes with Fable 5.2, dated November 9, 2026, print ${money(fableCost)}, or ${money(fableEach)} a success. The board does not say the dollar was recomputed when the task set moved.`,
  `SWE-bench Verified's embedded leaderboard, fetched November 13, has 180 results and a newest date of February 26, 2026. That is ${boardDays} days earlier. The 79.2% rows are Sonar Foundation Agent and live-SWE-agent, not Claude Code or Codex. The bash-only lead is mini-SWE-agent with Claude 4.5 Opus high, 76.8% at ${money(sweLeadCost)}, against MiniMax M2.5 high at 75.8% and ${money(sweSecondCost)}.`,
  "Three dates inside November 13, 2026 through May 13, 2027 are already on a vendor page: Antigravity removes three models on November 18, GPT-5.6 Sol's promotional Codex rate runs at least through November 21, and GitHub's Fable zero-data-retention exemption runs through the end of 2026. No page read for this report names a coding-agent launch in January, February, March, April, or May 2027.",
];

export const executiveSummary = [
  "A buyer comparing coding agents over the next six months is holding two different scoreboards. [Terminal-Bench 4.1](https://www.tbench.ai/), whose leaderboard file was updated at 2026-11-13T06:38:11Z, scores the product harness: Claude Code, Codex, Grok Build, Muse Code, and mini-SWE-agent. [SWE-bench Verified](https://www.swebench.com/), fetched the same morning, still ends on February 26, 2026. Cursor, GitHub Copilot, Devin, Jules, Amp, Factory, Cline, and Aider have no row on either board under those product names. [[1]][[2]][[3]]",
  `The lead that marketing can quote does not survive the interval the board prints. Claude Code's best row is 217 successes and ${money(opusCost)}. Codex's best row is 201 successes and ${money(solCost)}. Subtract the half-width from 65.76 and add it to 60.91 and the ranges meet. Fable 5.2 ties the success count and costs ${money(fableCost)}. A seat price is a third number, and it is not either of those bills. The [30-day price brief](/reports/ai-coding-agents-next-30-days) is the November 8 sticker sheet. This page re-read the meters on November 13 and does not paste that sheet again. [[3]][[5]][[9]]`,
  "What is actually dated between now and May 13, 2027 is short. November 18, November 21, and the end of 2026. The repos that moved this morning, and the one that last moved on May 22, are the cadence evidence. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) is a paper about searching for a harness program. It is not a row on these boards. The [November harness benchmark](/reports/agent-harness-benchmark-november-2026) keeps the earlier tables, including Terminal-Bench 4.0. [[4]][[17]][[22]]",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "tb-accuracy",
    title: "Terminal-Bench 4.1 accuracy for four product rows, with the printed half-width",
    caption:
      "Opus 5.5, Fable 5.2, and Sonnet 5.5 are Claude Code at max effort. GPT-6.1 Sol is Codex at max effort. Each bar is the printed accuracy. The label adds the 95% half-width from the same row. All four rows use 330 trials. Opus 5.5 and Fable 5.2 both record 217 successes. The lower end of the Opus interval is 62.65%. The upper end of the Sol interval is 63.88%. Those two ranges overlap.",
    unit: "percent resolved",
    source:
      "Terminal-Bench 4.1 leaderboard embedded in tbench.ai, leaderboard updated_at 2026-11-13T06:38:11.170193Z. Row dates are the board's display_date. [[3]]",
    series: ["Accuracy"],
    categories: [
      { label: "Opus 5.5", values: [opusAccuracy], displays: ["65.76% ± 3.11"] },
      { label: "Fable 5.2", values: [fableAccuracy], displays: [`65.76% ± ${fableHalf.toFixed(2)}`] },
      { label: "Sonnet 5.5", values: [sonnetAccuracy], displays: [`63.94% ± ${sonnetHalf.toFixed(2)}`] },
      { label: "GPT-6.1 Sol", values: [solAccuracy], displays: ["60.91% ± 2.97"] },
    ],
  },
  {
    id: "tb-cost",
    title: "The same four rows, total dollars printed on the board",
    caption:
      "Dollars are total_cost_usd, not a per-seat price. Dividing by successes is this page's arithmetic: $21.74, $76.00, $34.76, and $3.16. Sonnet 5.5 is 211 successes and $7,333.64. Do not read the short bar as a worse agent. It is a smaller bill.",
    unit: "USD, board total",
    source: "Same Terminal-Bench 4.1 rows as the accuracy chart. Per-success figures are total_cost_usd divided by successes, rounded to the cent. [[3]]",
    series: ["Board total"],
    categories: [
      { label: "GPT-6.1 Sol", values: [solCost], displays: [money(solCost)] },
      { label: "Opus 5.5", values: [opusCost], displays: [money(opusCost)] },
      { label: "Sonnet 5.5", values: [sonnetCost], displays: [money(sonnetCost)] },
      { label: "Fable 5.2", values: [fableCost], displays: [money(fableCost)] },
    ],
  },
  {
    id: "entry-stickers",
    title: "Lowest paid monthly sticker that includes a coding agent, re-read November 13",
    caption:
      "Equal stickers are not equal work. Codex Go is $8 and stays on GPT-6 Luna. Cursor Plus is $8 and is Grok models only, with no cloud agents. Copilot Pro is $10 and 1,500 GitHub AI credits. Claude Code starts at $20, or $17 a month if $200 is paid up front. Jules and Gemini CLI print no dollar on the pages read here, so they are not on the chart.",
    unit: "USD per month",
    source:
      "Codex pricing, Cursor pricing, GitHub Copilot plans, and Claude pricing, each fetched November 13, 2026. [[5]][[9]][[10]][[11]]",
    series: ["Monthly sticker"],
    categories: [
      { label: "Codex Go", values: [8], displays: ["$8"] },
      { label: "Cursor Plus", values: [8], displays: ["$8"] },
      { label: "Copilot Pro", values: [10], displays: ["$10"] },
      { label: "Claude Pro", values: [20], displays: ["$20"] },
      { label: "Devin Pro", values: [20], displays: ["$20"] },
      { label: "Amp Individual", values: [20], displays: ["$20"] },
      { label: "Factory Pro", values: [20], displays: ["$20"] },
    ],
  },
];

const sonnetEach = perSuccess(sonnetCost, sonnetSuccesses);
if (sonnetEach !== 34.76) throw new Error("sonnet per success");

export const chapters: ReportChapter[] = [
  {
    id: "how-a-claim-is-sorted",
    title: "How a claim is sorted",
    blocks: [
      {
        kind: "p",
        text: "Announced means a vendor page, a changelog, a docs page, or an official leaderboard file already prints the date or the figure. The date is copied. It is not inferred from a version number.",
      },
      {
        kind: "p",
        text: "Likely means the public record makes one follow-up more reasonable than the alternatives, and no page has named the day. Each likely call says what would confirm it and what would kill it.",
      },
      {
        kind: "p",
        text: "Watch for means a page is missing a number, a repo has gone quiet, or a sentence is written so that the next fetch can settle it. A watch item is not a forecast with a costume.",
      },
      {
        kind: "p",
        text: "The window is November 13, 2026 through May 13, 2027. The [30-day coding brief](/reports/ai-coding-agents-next-30-days) stops on December 8 and keeps the long price matrix from November 8. This page links that matrix. It does not paste it. Scores from the [November harness benchmark](/reports/agent-harness-benchmark-november-2026) stay on that page, except one comparison that uses its Terminal-Bench 4.0 copy next to today's 4.1 file. [[4]]",
      },
    ],
  },
  {
    id: "announced",
    title: "Three dates are already printed",
    blocks: [
      {
        kind: "p",
        text: "Most of the next six months is blank on purpose. The pages fetched on November 13 name three marks inside the window, and one product post from November 10 that is already live.",
      },
      {
        kind: "table",
        caption: "Dates a primary page already prints. Read November 13, 2026. A version tag with no calendar day is not in this table.",
        headers: ["When", "What the page says", "Source"],
        rows: [
          [
            "Nov 18, 2026",
            "Antigravity's model table marks Claude Sonnet 4.6 (thinking), Claude Opus 4.6 (thinking), and GPT-OSS-120b with \"Will be removed on November 18, 2026.\"",
            "[Antigravity models](https://antigravity.google/docs/models)",
          ],
          [
            "Nov 21, 2026",
            "Codex pricing says GPT-5.6 Sol's promotional pricing is available at least through November 21, 2026. It does not print the next rate.",
            "[Codex pricing](https://developers.openai.com/codex/pricing)",
          ],
          [
            "Nov 10, 2026",
            "Amp's Boxes post is already published. The smallest always-on box, b1.tiny, is listed at $0.025 an hour and $18 for 30 days always on. Personal and Team prices in the video are called out as Enterprise prices, and the post says those are higher.",
            "[Amp Boxes](https://ampcode.com/news/boxes)",
          ],
          [
            "End of 2026",
            "GitHub's Copilot model page says customers can request Claude Fable 5, 5.1, or 5.2 with zero data retention through the end of 2026. After that, continued use would require Enterprise Frontier Safeguards. An admin still has to enable each model.",
            "[Copilot supported models](https://docs.github.com/en/copilot/reference/ai-models/supported-models)",
          ],
        ],
      },
      {
        kind: "p",
        text: "The Copilot retirement table on that same page ends on October 19, 2026. Gemini 3.7 Flash, GPT-5.5, GPT-5.4, and GPT-5 mini are in that past list. Nothing in the table is scheduled between November 13, 2026 and May 13, 2027. A missing future row is a fact about the page. It is not a promise that models will stay. [[12]]",
      },
      {
        kind: "p",
        text: "Claude Code 2.1.323, dated November 12, 2026, adds Code Mode: an experimental opt-in in which Claude writes JavaScript to call its tools. The changelog links the Code Mode docs URL. That URL returned HTTP 404 on November 13. This report does not describe a switch the doc page did not return. The same release says an MCP sign-in now asks for confirmation even in bypass and auto modes, and that project MCP approvals must match the server's exact name. [[7]][[8]]",
      },
      {
        kind: "callout",
        title: "Already shipped, no day left in the window",
        text: "Codex cloud tasks, Cursor cloud agents from the Premium tier up, Copilot in the cloud on paid plans, Devin Cloud on Pro, Jules on a cloud VM, and Amp orbs are on the pricing or product pages now. The six-month question is the meter and the admin switch, not whether a background agent exists. [[5]][[9]][[10]][[11]][[14]][[15]][[18]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Put November 18 and November 21 on a calendar. Do not put a product launch in March. If a vendor slide shows one, ask for the URL. The pages read for this report do not have it.",
      },
    ],
  },
  {
    id: "boards",
    title: "The board you were quoted is not the harness you run",
    blocks: [
      {
        kind: "p",
        text: "SWE-bench Verified is 500 human-filtered instances. The site's bash-only view runs every model through mini-SWE-agent. Release 2.x calls tools. Release 1.x parses an action out of the model's text. The project says those generations are not necessarily comparable. The February 2026 lead rows below are mini-SWE-agent 2.0.0, so they sit on the tool-calling side of that break. [[1]][[2]]",
      },
      {
        kind: "table",
        caption:
          "SWE-bench Verified, from the leaderboard JSON embedded in swebench.com on November 13, 2026. Newest result date in the 180-row file: February 26, 2026.",
        headers: ["Resolved", "Date", "Agent", "Model", "Cost"],
        rows: [
          ["79.2%", "Dec 5, 2025", "Sonar Foundation Agent", "Claude 4.5 Opus", "Not listed"],
          ["79.2%", "Dec 15, 2025", "live-SWE-agent", "Claude 4.5 Opus, medium", "Not listed"],
          ["76.8%", "Feb 17, 2026", "mini-SWE-agent 2.0.0", "Claude 4.5 Opus, high", money(sweLeadCost)],
          ["75.8%", "Feb 17, 2026", "mini-SWE-agent 2.0.0", "Gemini 3 Flash, high", "$177.98"],
          ["75.8%", "Feb 17, 2026", "mini-SWE-agent 2.0.0", "MiniMax M2.5, high", money(sweSecondCost)],
          ["72.8%", "Feb 19, 2026", "mini-SWE-agent 2.0.0", "GPT 5.2 Codex", "$224.71"],
        ],
      },
      {
        kind: "p",
        text: `The bash-only lead costs ${money(sweLeadCost)} for 76.8%. MiniMax M2.5 high, open weights, is one point lower at ${money(sweSecondCost)}. That is ${sweRatio} times the cost for one percentage point, on the same harness generation. OpenHands has nine Verified rows. Google Jules has one, from December 2024. Factory Code Droid has one, from June 2024, at 37.0%. A search of the agent and name fields finds no row whose agent is Claude Code, Cursor, Devin, Copilot, Cline, or Aider. \"GPT 5.2 Codex\" is a model name on mini-SWE-agent, not the Codex product. [[1]]`,
      },
      {
        kind: "h3",
        text: "Terminal-Bench 4.1 is where the product harness shows up",
      },
      {
        kind: "chart",
        id: "tb-accuracy",
      },
      {
        kind: "chart",
        id: "tb-cost",
      },
      {
        kind: "p",
        text: `The file calls itself Terminal-Bench 4.1, leaderboard name 4-1-0. Fifty-five rows. The agents are Claude Code, Codex, Grok Build, Muse Code, and mini-SWE-agent under two capitalizations. Cursor, Copilot, Devin, Jules, OpenHands, Cline, Aider, Amp, and Factory are absent. Opus 5.5 on Claude Code at max effort, display date September 22, 2026, is 65.76% ± 3.11, 217 successes, ${money(opusCost)}. Fable 5.2 on Claude Code at max effort, display date November 9, 2026, is the same 65.76% and the same 217, at ${money(fableCost)}, with a tighter half-width of 2.85. GPT-6.1 Sol on Codex at max effort, September 29, 2026, is 60.91% ± 2.97, 201 successes, ${money(solCost)}. [[3]]`,
      },
      {
        kind: "p",
        text: `Per success, using the board's own successes and total_cost_usd, that is ${money(opusEach)} for Opus 5.5, ${money(fableEach)} for Fable 5.2, ${money(sonnetEach)} for Sonnet 5.5 (211 successes, ${money(sonnetCost)}), and ${money(solEach)} for Sol. The Opus interval's low end is ${opusLow}%. The Sol interval's high end is ${solHigh}%. ${opusLow} is below ${solHigh}, so the ranges overlap. Sixteen more successes, on 330 trials, is the whole gap. It is not a separated lead. [[3]]`,
      },
      {
        kind: "quote",
        text: "The November 5 copy of Terminal-Bench 4.0 lists Opus 5.5 on Claude Code at max effort as 64.85%, 214 of 330, and $4,718.65. Today's 4.1 row prints 65.76%, 217 of 330, and $4,718.65.",
        cite: "Harness benchmark, November 2026, quoting the 4.0 board, set next to the 4.1 file read November 13. [[3]][[4]]",
      },
      {
        kind: "p",
        text: "The board does not say whether that dollar was recomputed for the new task set. This page uses the 4.1 figures. It does not average them with 4.0, and it does not treat the matching cent as proof the bill was freshly metered. Grok Build's best row is Grok 4.7 at xhigh, 38.79% ± 3.59, 128 of 330, with a total of 3683.287146 dollars, which rounds to $3,683.29, dated September 21, 2026. That row is on the board. Cursor has no row. [[3]][[4]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Quote a score with the harness, the effort, the trial count, the half-width, and the date. \"Claude leads SWE-bench\" is a sentence about mini-SWE-agent or about Sonar's agent, depending on which row you grabbed. It is not a sentence about the Claude Code binary your team installed.",
      },
    ],
  },
  {
    id: "meters",
    title: "A $20 seat is four different meters",
    blocks: [
      {
        kind: "p",
        text: "The chart is the entry sticker. The paragraph under it is the meter, because the sticker is where people stop. List prices were read on November 13, 2026. The [November 6 pricing guide](/blog/claude-code-vs-codex-pricing) compares Claude Code and Codex in more detail and was not rewritten for this page. [[5]][[9]]",
      },
      {
        kind: "chart",
        id: "entry-stickers",
      },
      {
        kind: "table",
        caption:
          "What the entry paid plan actually meters, from the page named. \"Not printed\" means the fetched page has no dollar or no count. It is not a guess.",
        headers: ["Plan", "Sticker", "What draws the allowance", "Source"],
        rows: [
          [
            "Codex Go",
            "$8/month",
            "GPT-6 Luna at Standard speed in the desktop app, subject to rollout. Cloud features are a Plus line, not a Go line.",
            "[Codex pricing](https://developers.openai.com/codex/pricing)",
          ],
          [
            "Codex Plus",
            "$20/month",
            "Web, CLI, IDE, iOS, and cloud integrations such as code review and Slack. Local-message estimates per five hours, not caps: GPT-6.1 Sol 15–160, GPT-6 Astra 5–45, GPT-6 Luna 350–3,000. Pro has no five-hour limit. Fast mode spends included usage at 2.5× Standard.",
            "[Codex pricing](https://developers.openai.com/codex/pricing)",
          ],
          [
            "Claude Pro",
            "$20/month, or $17 annual",
            "Claude Code is included. One pool with the rest of Claude, every five hours and every week. No fixed message count. Annual price is $200 up front.",
            "[Claude pricing](https://claude.com/pricing)",
          ],
          [
            "Claude Max / Ultra",
            "$100 / $200",
            "Max is 5× Pro every five hours and every week, plus $100 a month in API credits. Ultra is 10× Pro weekly, no five-hour limit for verified accounts, plus $200 in API credits. Those monthly API credits cannot be used in Claude Code. Usage credits are a separate switch.",
            "[Claude help center](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan)",
          ],
          [
            "Cursor Plus",
            "$8/month",
            "Shared weekly pool with Grok. Grok models only. Cloud agents start on Premium at $30, which is 4× Plus. Third-party models are API list price, billed separately, from Premium up.",
            "[Cursor pricing](https://cursor.com/pricing)",
          ],
          [
            "Copilot Pro",
            "$10/month",
            "1,500 GitHub AI credits: 1,000 base and 500 flex. Paid plans include Copilot in the cloud. Free does not. Extra credits on Business and Enterprise pools are $0.01 each. Pro+ is $39 and 7,000 credits. Max is $100 and 20,000.",
            "[Copilot plans](https://docs.github.com/en/copilot/get-started/plans)",
          ],
          [
            "Devin Pro",
            "$20/month",
            "Cloud agents and free use of SWE-2. The allowance refreshes daily and weekly. The page does not print the quota. Extra usage is API pricing. Max is $200 and says \"significantly higher\" with no multiple.",
            "[Devin pricing](https://devin.ai/pricing)",
          ],
          [
            "Amp Individual",
            "$20/month",
            "45,000 minutes of Amp-hosted orb time, which is 750 hours. Self-hosted orbs are free and do not spend those minutes. Bring-your-own keys have no Amp token fee on Hobby, Individual, and Teams.",
            "[Amp pricing](https://ampcode.com/pricing)",
          ],
          [
            "Factory Pro",
            "$20/month",
            "Desktop, CLI, and SDK, full model availability. Free is bring-your-own inference. Teams is $60 a month plus $40 a person, up to 10 seats. Business and Enterprise do not print a dollar.",
            "[Factory pricing](https://factory.com/pricing)",
          ],
          [
            "Jules",
            "Not printed",
            "15 tasks a day and 3 concurrent on the base card, powered by Gemini 2.5 Pro. Pro is 100 a day and 15 concurrent. Ultra is 300 a day and 60 concurrent. Pro and Ultra name Gemini 3 Pro. No dollar on the cards.",
            "[Jules](https://jules.google/)",
          ],
          [
            "Gemini CLI",
            "Not printed",
            "The quota page, last updated June 18, 2026, lists 1,000, 1,500, and 2,000 requests a day by account type, and 250 a day on an unpaid API key. It says Google AI Plus is not supported. It does not print a dollar.",
            "[Gemini CLI quotas](https://geminicli.com/docs/resources/quota-and-pricing/)",
          ],
          [
            "OpenHands Teams",
            "$500/month",
            "Self-hosted, up to 10 users, then $50 a seat. Capped at 5,000 sessions a month. Agent Canvas is free, MIT, bring your own key. The table lists a 30-day trial on Teams.",
            "[OpenHands pricing](https://www.openhands.dev/pricing)",
          ],
        ],
      },
      {
        kind: "p",
        text: "Codex Business is $25 per user per month when billed monthly, and $20 per user per month when billed annually, for two or more users. Claude's pricing FAQ prices Enterprise at $20 per seat per month plus usage at API rates, billed annually, and lists Claude Security in beta on that plan. Copilot Business is $19 a seat and 1,900 credits. Copilot Enterprise is $39 a seat and 3,900 credits. Copilot access is a different contract: $0 a seat for a licensed GitHub Enterprise Cloud user, or $10 a seat standalone, with no included credits. [[5]][[9]][[11]]",
      },
      {
        kind: "callout",
        title: "Do not add these rows",
        text: "A Claude Pro seat, a Codex Plus seat, and a Copilot Pro seat can each say $10 or $20 and still buy a different unit: a shared five-hour pool, an estimated message band, or a credit. Terminal-Bench's $634.24 is a benchmark bill for 330 trials, not a month of either seat. The [cost calculator](/agent-cost-calculator) prices tokens. It does not price these seats.",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: `If the job looks like Terminal-Bench's top rows, the published bill favors Codex at ${money(solEach)} a success over Claude Code at ${money(opusEach)}, and the accuracy ranges overlap. If the job is a $8 Cursor seat, you are on Grok models without cloud agents. The cloud-agent Cursor plan starts at $30. Ask which meter the invoice will use before you compare the stickers.`,
      },
    ],
  },
  {
    id: "cloud-and-controls",
    title: "The admin switch is already the product",
    blocks: [
      {
        kind: "p",
        text: "Background agents are not a 2027 roadmap item on these pages. They are a column in the price table. What the next six months adds, if the pages keep their current shape, is who may turn the agent loose: MCP servers, network policy, audit logs, and a sandbox that still asks.",
      },
      {
        kind: "table",
        caption:
          "Controls printed on the pricing or docs page. A blank dollar means the page did not print one. This table does not fill checkmarks that the Copilot plan grid did not render as text.",
        headers: ["Product", "What the page already lists", "Where it starts"],
        rows: [
          [
            "Claude Code",
            "Enterprise at $20 a seat plus API usage, billed annually. The pricing page lists SCIM, audit logs, and Claude Security in beta on that plan. MCP sign-in asks even in bypass and auto modes, as of 2.1.323.",
            "[Pricing](https://claude.com/pricing) and the [Nov 12 changelog](https://code.claude.com/docs/en/changelog)",
          ],
          [
            "Codex",
            "Enterprise lists SCIM, EKM, RBAC, audit logs, the Compliance API, and Codex Security for connected GitHub repositories. The usage FAQ says every MCP server adds context and spends more of the allowance. API-key sessions do not get the cloud integrations.",
            "[Codex pricing](https://developers.openai.com/codex/pricing)",
          ],
          [
            "Cursor",
            "Enterprise is custom price. The comparison table gives it auto-run, browser, and network controls, plus repository, model, and MCP access controls, audit logs, and service accounts. Premium at $30 is where cloud agents begin.",
            "[Cursor pricing](https://cursor.com/pricing)",
          ],
          [
            "GitHub Copilot",
            "Third-party coding agents, Claude and Codex, are in public preview and have to be enabled. GitHub scans agent-written code with CodeQL, secret scanning, and dependency checks before the pull request is finalized. Fable 5, 5.1, and 5.2 retain data by default unless a zero-data-retention exemption is approved, and that exemption is written through the end of 2026.",
            "[Third-party agents](https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents)",
          ],
          [
            "Amp",
            "Enterprise lists audit logs, network and MCP access controls, IP allowlisting, and SCIM. Teams has no extra workspace fee. Some controls, including SAML, need at least one paid member. All tiers point at a zero and minimal data retention policy.",
            "[Amp pricing](https://ampcode.com/pricing)",
          ],
          [
            "Factory",
            "Business lists SSO, SAML/SCIM, zero data retention, audit logs, and a network policy. No dollar on Business or Enterprise. Pro is the $20 individual card.",
            "[Factory pricing](https://factory.com/pricing)",
          ],
          [
            "OpenHands",
            "Teams is self-hosted and lists SSO/SAML, RBAC, and budgeting. The comparison table has an MCP and secrets row. Agent Canvas's integrations cell says Select MCP only. The Teams cap is 5,000 sessions a month.",
            "[OpenHands pricing](https://www.openhands.dev/pricing)",
          ],
          [
            "Devin",
            "Teams is $80 a month plus $40 per full seat, up to 100 users, with SAML/OIDC and three usage tiers. Enterprise adds SCIM, role-based access, and a dedicated deployment option. No per-task dollar.",
            "[Devin pricing](https://devin.ai/pricing)",
          ],
        ],
      },
      {
        kind: "p",
        text: "Cursor's CLI changelog, latest heading v2026.10.22, documents Cloud Agent environments and self-hosted workers as behavior you can run now: redeploy an environment, register a worker under the team you picked, raise an MCP tool timeout. It does not name a date in 2027. That is the shape of the category. The cloud loop is shipping. The calendar is not. [[23]]",
      },
      {
        kind: "p",
        text: "Codex's own pricing page tells you to limit MCP servers because each one adds context. That is the builder's cost, separate from the Enterprise access-control row. A coding agent with eight MCP servers is a larger prompt on every turn. The [MCP outlook](/reports/mcp-next-6-months) is the protocol brief. This page only records what the coding-agent vendors print on their own plans. [[9]]",
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "If the requirement is \"the agent opens pull requests while we sleep, and we can see the audit log,\" you are shopping a control, not a benchmark row. Copilot's third-party agents, Codex cloud, Claude Code on the web, Devin Cloud, and Jules already do the pull-request loop. The pages differ on whether MCP, network egress, and retention are an Enterprise ticket or a default.",
      },
    ],
  },
  {
    id: "likely",
    title: "Three calls the record will support",
    blocks: [
      {
        kind: "h3",
        text: "The repos that moved this morning will move again",
      },
      {
        kind: "p",
        text: "On November 13 the public GitHub API showed anthropics/claude-code, openai/codex, OpenHands/OpenHands, google-gemini/gemini-cli, and cline/cline all pushed that same UTC day. Claude Code's latest release is v2.1.323, published November 12. Codex's latest is rust-v0.169.0, published November 13. OpenHands v1.40.0 was published November 12. Gemini CLI v0.68.0 was published November 10. Cline's latest release is still v4.1.26 from October 26, even though the branch moved. Against the November 8 API read on the [30-day brief](/reports/ai-coding-agents-next-30-days), Codex gained 1,531 stars (133,622 to 135,153) and OpenHands gained 462 (92,927 to 93,389). Star counts are not a score. The push timestamps are the evidence. [[4]][[22]]",
      },
      {
        kind: "p",
        text: "Likely: each of those five repositories publishes at least one more release before May 13, 2027. Confirm it with a release published after November 13. Kill it for a given repo if a calendar month ends with no release and no push. The call does not name the features. Claude Code 2.1.323, dated November 12, is a point release on a repo that already moved again the next morning. [[7]][[22]]",
      },
      {
        kind: "h3",
        text: "The invoice stays a pool, a credit, or a minute",
      },
      {
        kind: "p",
        text: "No pricing page in this set sells a successful task. Claude sells a shared pool and refuses to print a message count. Codex sells estimated message bands and a credit table, and tells you not to estimate included tasks from API token prices. Copilot sells AI credits at a stated pack, with a $0.01 overage. Amp sells orb minutes. Jules sells a task cap and hides the dollar. Devin sells a quota and hides the count. [[5]][[9]][[11]][[14]][[15]][[18]]",
      },
      {
        kind: "p",
        text: "Likely: on May 13, 2027 those pages still do not print a dollar per successful task. Confirm it by reading the same URLs. Kill it the day any one of them prints that price. Terminal-Bench can keep printing a total_cost_usd for a 330-trial run. That number is a benchmark receipt. It is not your invoice.",
      },
      {
        kind: "h3",
        text: "SWE-bench Verified stays the wrong purchase board",
      },
      {
        kind: "p",
        text: "The Verified file's newest date is February 26, 2026. The product harnesses a team installs, or assigns inside GitHub, are scored on Terminal-Bench when they are scored at all. Likely: a Claude Code versus Codex decision made from swebench.com alone will still be a decision about mini-SWE-agent, Sonar, or live-SWE-agent. Confirm it if a later fetch still has no agent named Claude Code or Codex and the max date is still February 26. Kill it when either product name appears as the agent on a Verified row dated after February 26. [[1]][[3]]",
      },
      {
        kind: "means",
        audience: "Builders and buyers",
        text: "Budget for another point release. Do not budget for a new per-task price list. Keep the purchase argument on Terminal-Bench, with the harness and the half-width in the sentence, until SWE-bench grows a row that names the binary you run.",
      },
    ],
  },
  {
    id: "watch-for",
    title: "What to check, and what settles it",
    blocks: [
      {
        kind: "table",
        caption:
          "Signals with no extra forecast attached. The confirm column is the observation that ends the question. The kill column is the observation that drops the watch.",
        headers: ["Signal", "Confirm", "Kill"],
        rows: [
          [
            "Antigravity, November 18",
            "On November 19 the three footnoted models are gone from the table.",
            "The footnote is edited and Sonnet 4.6, Opus 4.6, and GPT-OSS-120b remain.",
          ],
          [
            "GPT-5.6 Sol promo, November 21",
            "The pricing page drops \"at least through November 21, 2026\" or prints the next rate.",
            "On November 22 the same sentence is still the only rate note.",
          ],
          [
            "Fable zero data retention, end of 2026",
            "After December 31 the Copilot footnote no longer grants the exemption without Enterprise Frontier Safeguards.",
            "The footnote moves the date later.",
          ],
          [
            "Aider, last push May 22, 2026",
            "The API pushed_at moves past 2026-05-22T14:02:20Z.",
            "If it is still that timestamp on May 13, 2027, treat the repo as unmaintained for a new project. The watch itself ends either way.",
          ],
          [
            "Cline release tag",
            "A release published after October 26, 2026. The branch already moved on November 13. The tag did not.",
            "Not a kill. A tag that never comes is the finding.",
          ],
          [
            "Jules dollar",
            "A price appears on the plan cards at jules.google.",
            "On May 13 the cards still name task caps and no dollar.",
          ],
          [
            "Code Mode docs",
            "https://code.claude.com/docs/en/code-mode returns the setup page instead of HTTP 404.",
            "The changelog drops Code Mode.",
          ],
          [
            "SWE-bench Verified freshness",
            "The embedded JSON contains a result date after 2026-02-26.",
            "Not a kill. Another quiet quarter means the February file is still the file.",
          ],
          [
            "Gemini CLI price",
            "The quota page's \"Last updated\" moves past June 18, 2026 and a dollar appears.",
            "The date and the missing dollar are unchanged on May 13.",
          ],
        ],
      },
      {
        kind: "p",
        text: `Aider-AI/aider is the outlier in the API read: 50,100 stars, license Apache-2.0, latest release v0.86.0 published August 9, 2025, last push May 22, 2026. That push is ${quietDays} calendar days before this reading. The other five repositories above were pushed on November 13. Silence is the signal. A star count that still ticks is not a release. [[22]]`,
      },
      {
        kind: "means",
        audience: "Builders",
        text: "If you pin a harness in a Dockerfile, pin one whose release tag moved in the last month, and re-read the Sol line on November 22 before you assume the promo rate survived. Aider is the repo to re-check before you recommend it for a new codebase.",
      },
    ],
  },
  {
    id: "cadence",
    title: "Who shipped this week",
    blocks: [
      {
        kind: "p",
        text: "The API fields below are star count, last push, SPDX license, and the latest release tag and publish time, read from api.github.com on November 13, 2026. Claude Code's license field came back empty. That is not the same as a named SPDX id.",
      },
      {
        kind: "table",
        caption: "Open-source coding-agent repositories. Public GitHub API, November 13, 2026.",
        headers: ["Repository", "Stars", "Latest release", "Release published", "Last push"],
        rows: [
          ["anthropics/claude-code", "155,509", "v2.1.323", "Nov 12, 2026", "Nov 13, 2026"],
          ["openai/codex", "135,153", "rust-v0.169.0", "Nov 13, 2026", "Nov 13, 2026"],
          ["google-gemini/gemini-cli", "108,812", "v0.68.0", "Nov 10, 2026", "Nov 13, 2026"],
          ["OpenHands/OpenHands", "93,389", "v1.40.0", "Nov 12, 2026", "Nov 13, 2026"],
          ["cline/cline", "71,582", "v4.1.26", "Oct 26, 2026", "Nov 13, 2026"],
          ["Aider-AI/aider", "50,100", "v0.86.0", "Aug 9, 2025", "May 22, 2026"],
        ],
      },
      {
        kind: "p",
        text: "Licenses on the non-empty responses: Apache-2.0 for Codex, Gemini CLI, Cline, and Aider. MIT for OpenHands. These are repository facts. They are not a support contract. OpenHands' paid Teams plan is a separate invoice on top of the MIT canvas. [[21]][[22]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Use the push time when you choose a harness to fork. Use the release time when you choose a version to pin. Cline is the case where those two clocks disagree, and Aider is the case where both clocks stopped.",
      },
    ],
  },
  {
    id: "left-out",
    title: "What was left out",
    blocks: [
      {
        kind: "p",
        text: "The full November 8 price grid, including Antigravity's Google AI plan dollars, lives on the [30-day brief](/reports/ai-coding-agents-next-30-days). This page re-checked the coding-agent stickers it cites and left the rest of that grid alone. Windsurf was not re-fetched, so the old redirect note is not repeated.",
      },
      {
        kind: "p",
        text: "Terminal-Bench 4.0's full table stays on the [harness benchmark](/reports/agent-harness-benchmark-november-2026). Only the Opus 5.5 cost line is set beside 4.1, because the cent matches and the success count does not. HarnessFlow's benchmark means stay on the [research note](/research/harnessflow-mcts-harness-optimization). They are not copied here, and they are not a SWE-bench or Terminal-Bench row.",
      },
      {
        kind: "p",
        text: "No traffic, revenue, survey, or expert panel. Copilot plan-grid icons that did not come through as text are not scored as yes or no. The Ultraplan removal page says the research preview is gone and does not date the removal, so it is not in the dated table. Computer use and shopping have their own outlooks. A model price that was not on a page fetched November 13 is not in this one.",
      },
      {
        kind: "p",
        text: "The [seat-price guide](/blog/claude-code-vs-codex-pricing) remains the long Claude-versus-Codex comparison. Its prices were checked November 9. Where this page and that one could drift, this page is the November 13 read, and that page was not edited except for a link here.",
      },
    ],
  },
];

export const faq = [
  {
    question: "Which coding agent leads Terminal-Bench 4.1?",
    answer:
      "Two Claude Code rows tie at 65.76% and 217 of 330: Opus 5.5 at max effort for $4,718.65, and Fable 5.2 at max effort for $16,492.76. Codex's best row is GPT-6.1 Sol at max effort, 60.91% and 201 of 330, for $634.24. The 95% intervals overlap. The leaderboard file was updated November 13, 2026.",
  },
  {
    question: "Does SWE-bench say Claude Code beats Codex?",
    answer:
      "No. The Verified file fetched November 13, 2026 does not list Claude Code or the Codex product as agents. Its newest result date is February 26, 2026. The 79.2% rows are Sonar Foundation Agent and live-SWE-agent. The bash-only lead is mini-SWE-agent.",
  },
  {
    question: "What coding-agent dates are already set before May 13, 2027?",
    answer:
      "Antigravity removes three models on November 18, 2026. GPT-5.6 Sol's promotional Codex rate runs at least through November 21, 2026. GitHub's Fable zero-data-retention exemption runs through the end of 2026. No page read for this report names a launch in January through May 2027.",
  },
  {
    question: "Why can the same Terminal-Bench accuracy cost $4,719 or $16,493?",
    answer:
      "The board prints both. Opus 5.5 and Fable 5.2 on Claude Code, both at max effort, both record 217 successes and 65.76%. The totals are $4,718.65 and $16,492.76. The page does not explain the gap. Dividing by 217 is $21.74 and $76.00.",
  },
  {
    question: "Is Aider still shipping?",
    answer:
      "The GitHub API on November 13, 2026 showed Aider-AI/aider last pushed on May 22, 2026. The latest release, v0.86.0, was published August 9, 2025. Claude Code, Codex, Gemini CLI, OpenHands, and Cline were all pushed on November 13.",
  },
];

export const methodology = [
  "Prices, limits, changelog lines, and leaderboard rows were read from the linked pages on November 13, 2026. GitHub figures are from api.github.com the same day: stargazers_count, pushed_at, license, and the latest release. A figure without a public source is not in the tables.",
  "Terminal-Bench 4.1 numbers come from the leaderboard payload embedded in https://www.tbench.ai/. The leaderboard object is named 4-1-0 and its updated_at is 2026-11-13T06:38:11.170193Z. Accuracy, half-width, successes, n_trials, total_cost_usd, and display_date are the board's fields. Dollars per success are total_cost_usd divided by successes, rounded to the cent. The interval check subtracts the printed half-width from 65.76 and adds the printed half-width to 60.91. That is arithmetic on the board's fields, not a new statistical test.",
  "SWE-bench numbers come from the application/json block with id leaderboard-data on https://www.swebench.com/, fetched the same day. The Verified array has 180 results. The newest date field is 2026-02-26. Costs are copied from the result objects and rounded to the cent for display. The method notes on https://www.swebench.com/verified.html are the source for the 500-instance set and for the 1.x versus 2.x tool-calling break.",
  "The Terminal-Bench 4.0 comparison uses the copy stored for the November 5 harness benchmark on this site, which names the official 4.0 board as its source. It is used only for the Opus 5.5 row whose printed dollar matches today's 4.1 row. The two boards are not averaged.",
  `Calendar-day counts use UTC midnights. February 26 to November 13 is ${boardDays} days. May 22 to November 13 is ${quietDays} days. Amp's 45,000 minutes are divided by 60 to get 750 hours. Box prices are quoted as printed. The hourly rate times 720 hours matches the $18 cell for b1.tiny and is not used to overwrite cells that do not match that product.`,
  "Left out on purpose: any Copilot grid icon that did not survive as text, any Jules or Gemini CLI dollar the pages do not print, any Windsurf check not re-fetched today, the Code Mode setup the changelog links but the doc URL did not return, and any survey, traffic, or revenue figure. Company-reported leaderboard rows are copied, not re-run.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "SWE-bench leaderboard",
    url: "https://www.swebench.com/",
    detail:
      "Verified JSON embedded in the page, 180 results, newest date February 26, 2026. Fetched November 13, 2026.",
  },
  {
    n: 2,
    title: "SWE-bench Verified",
    url: "https://www.swebench.com/verified.html",
    detail:
      "500 human-filtered instances. mini-SWE-agent 2.x uses tool calling. 1.x parses actions from text. Fetched November 13, 2026.",
  },
  {
    n: 3,
    title: "Terminal-Bench",
    url: "https://www.tbench.ai/",
    detail:
      "Leaderboard 4.1, name 4-1-0, updated_at 2026-11-13T06:38:11.170193Z. Accuracy, half-width, successes, and total_cost_usd taken from that payload.",
  },
  {
    n: 4,
    title: "AI Agents Info, agent harness benchmark, November 2026",
    url: "https://www.aiagentsinfo.com/reports/agent-harness-benchmark-november-2026",
    detail:
      "The November 5 copy of Terminal-Bench 4.0, used here only for the Opus 5.5 row at 64.85% and $4,718.65.",
  },
  {
    n: 5,
    title: "Anthropic, plans and pricing",
    url: "https://claude.com/pricing",
    detail:
      "Free excludes Claude Code. Pro $20 or $17 annual. Max $100. Ultra $200. Enterprise $20 per seat plus API usage. Fetched November 13, 2026.",
  },
  {
    n: 6,
    title: "Anthropic Help Center, Claude Code on Pro, Max, or Ultra",
    url: "https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-max-or-ultra-plan",
    detail:
      "Shared limits. Monthly API credits on Max and Ultra cannot be used in Claude Code. Fetched November 13, 2026.",
  },
  {
    n: 7,
    title: "Claude Code changelog",
    url: "https://code.claude.com/docs/en/changelog",
    detail: "Version 2.1.323, November 12, 2026. Code Mode, and MCP sign-in confirmation in bypass and auto modes.",
  },
  {
    n: 8,
    title: "Claude Code, Code Mode docs URL",
    url: "https://code.claude.com/docs/en/code-mode",
    detail: "Linked from the November 12 changelog. HTTP 404 on November 13, 2026. The setup steps are not described here.",
  },
  {
    n: 9,
    title: "OpenAI, Codex pricing",
    url: "https://developers.openai.com/codex/pricing",
    detail:
      "Free $0, Go $8, Plus $20, Pro from $100, Business $25 monthly or $20 annual. Sol promo through November 21, 2026. Local-message estimates and the MCP note. Fetched November 13, 2026.",
  },
  {
    n: 10,
    title: "Cursor pricing",
    url: "https://cursor.com/pricing",
    detail:
      "Plus $8, Grok models only. Premium $30 is where cloud agents start. Enterprise lists MCP access controls. Fetched November 13, 2026.",
  },
  {
    n: 11,
    title: "GitHub Docs, Copilot plans",
    url: "https://docs.github.com/en/copilot/get-started/plans",
    detail:
      "Pro $10 and 1,500 credits. Business $19 and 1,900. Enterprise $39 and 3,900. Overage $0.01 per credit. Cloud agent on paid plans. Fetched November 13, 2026.",
  },
  {
    n: 12,
    title: "GitHub Docs, supported Copilot models",
    url: "https://docs.github.com/en/copilot/reference/ai-models/supported-models",
    detail:
      "Retirement table ends October 19, 2026. Fable zero-data-retention exemption through the end of 2026. Fetched November 13, 2026.",
  },
  {
    n: 13,
    title: "GitHub Docs, third-party coding agents",
    url: "https://docs.github.com/en/copilot/concepts/agent-capabilities/about-agents/about-third-party-coding-agents",
    detail:
      "Claude and Codex agents in public preview. CodeQL, secret scanning, and dependency scanning before the pull request is finalized. Fetched November 13, 2026.",
  },
  {
    n: 14,
    title: "Cognition, Devin pricing",
    url: "https://devin.ai/pricing",
    detail:
      "Free $0, Pro $20, Max $200, Teams $80 plus $40 per full seat. Daily and weekly refresh. No printed quota. Fetched November 13, 2026.",
  },
  {
    n: 15,
    title: "Google, Jules",
    url: "https://jules.google/",
    detail:
      "15, 100, and 300 tasks a day. No dollar on the plan cards. Fetched November 13, 2026.",
  },
  {
    n: 16,
    title: "Gemini CLI, quotas and pricing",
    url: "https://geminicli.com/docs/resources/quota-and-pricing/",
    detail:
      "Daily request caps. Last updated June 18, 2026. No dollar on the page. Fetched November 13, 2026.",
  },
  {
    n: 17,
    title: "Google, Antigravity models",
    url: "https://antigravity.google/docs/models",
    detail:
      "Claude Sonnet 4.6 (thinking), Claude Opus 4.6 (thinking), and GPT-OSS-120b marked for removal on November 18, 2026. Fetched November 13, 2026.",
  },
  {
    n: 18,
    title: "Amp pricing",
    url: "https://ampcode.com/pricing",
    detail:
      "Hobby free. Individual $20 and 45,000 orb minutes. Enterprise lists audit logs and network and MCP controls. Fetched November 13, 2026.",
  },
  {
    n: 19,
    title: "Amp, Boxes",
    url: "https://ampcode.com/news/boxes",
    detail:
      "Posted November 10, 2026. b1.tiny is $0.025 an hour and $18 for 30 days always on. Fetched November 13, 2026.",
  },
  {
    n: 20,
    title: "Factory pricing",
    url: "https://factory.com/pricing",
    detail:
      "Free bring-your-own inference. Pro $20. Teams $60 plus $40 a person, up to 10 seats. Business lists zero data retention and a network policy, with no dollar. Fetched November 13, 2026.",
  },
  {
    n: 21,
    title: "OpenHands pricing",
    url: "https://www.openhands.dev/pricing",
    detail:
      "Agent Canvas free and MIT. Teams $500 a month up to 10 users, then $50 a seat, capped at 5,000 sessions a month. Fetched November 13, 2026.",
  },
  {
    n: 22,
    title: "GitHub REST API, six repositories",
    url: "https://api.github.com/repos/openai/codex",
    detail:
      "claude-code, openai/codex, gemini-cli, OpenHands, cline, and Aider-AI/aider. Stars, license, pushed_at, and latest release. Read November 13, 2026. The Codex URL is the example. Each row links its own repository in the table.",
  },
  {
    n: 23,
    title: "Cursor CLI changelog",
    url: "https://cursor.com/docs/cli/changelog",
    detail:
      "Latest heading v2026.10.22. Cloud Agent environments and self-hosted workers as current behavior. No 2027 date. Fetched November 13, 2026.",
  },
];

export const toc = chapters.map((chapter) => ({ id: chapter.id, text: chapter.title, level: 2 as const }));

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
    ...keyNumbers.flatMap((item) => [item.value, item.label, item.note]),
    ...executiveSummary,
    ...findings,
    ...chapters.flatMap((chapter) => [chapter.title, ...chapter.blocks.map(blockWords)]),
    ...reportCharts.flatMap((chart) => [chart.title, chart.caption, chart.source]),
    ...methodology,
    ...faq.flatMap((item) => [item.question, item.answer]),
  ].join("\n");
}

export const readingMinutes = readingTime(bodyCopy());
