import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/googleagent-gemini-4-hydrogen-fetches-november-2026";
export const readOn = "2026-11-14";

const COUNT_SOURCE = "DataFast";
const CHECKED = "2026-11-14";
const REPORT = "/reports/ai-agent-framework-github-stats-november-2026";

/**
 * Copied from the DataFast bot-traffic export pulled 14 November 2026, about 8:50 a.m.
 * Asia/Calcutta. 14 November stops at that hour. Do not replace these cells with a later pull.
 */
type DayRow = {
  date: string;
  label: string;
  answers: number;
  google: number;
  openai: number;
  anthropic: number;
  duck: number;
  indexing: number;
  training: number;
  agentFetches: number;
  agentPaths: number;
  notebookFetches: number;
  notebookPaths: number;
  chatgptFetches: number;
  chatgptPaths: number;
  partial?: boolean;
};

const days: DayRow[] = [
  { date: "2026-11-01", label: "1 Nov", answers: 0, google: 0, openai: 0, anthropic: 0, duck: 0, indexing: 0, training: 0, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-02", label: "2 Nov", answers: 0, google: 0, openai: 0, anthropic: 0, duck: 0, indexing: 0, training: 0, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-03", label: "3 Nov", answers: 0, google: 0, openai: 0, anthropic: 0, duck: 0, indexing: 5, training: 53, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-04", label: "4 Nov", answers: 0, google: 0, openai: 0, anthropic: 0, duck: 0, indexing: 64, training: 654, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-05", label: "5 Nov", answers: 0, google: 0, openai: 0, anthropic: 0, duck: 0, indexing: 90, training: 680, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-06", label: "6 Nov", answers: 5, google: 0, openai: 0, anthropic: 2, duck: 3, indexing: 53, training: 187, agentFetches: 0, agentPaths: 0, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 0, chatgptPaths: 0 },
  { date: "2026-11-07", label: "7 Nov", answers: 17, google: 1, openai: 11, anthropic: 2, duck: 3, indexing: 1443, training: 318, agentFetches: 1, agentPaths: 1, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 11, chatgptPaths: 10 },
  { date: "2026-11-08", label: "8 Nov", answers: 35, google: 3, openai: 28, anthropic: 2, duck: 2, indexing: 688, training: 1117, agentFetches: 3, agentPaths: 1, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 28, chatgptPaths: 11 },
  { date: "2026-11-09", label: "9 Nov", answers: 63, google: 5, openai: 56, anthropic: 2, duck: 0, indexing: 1623, training: 3638, agentFetches: 5, agentPaths: 1, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 56, chatgptPaths: 16 },
  { date: "2026-11-10", label: "10 Nov", answers: 76, google: 7, openai: 65, anthropic: 4, duck: 0, indexing: 3882, training: 2969, agentFetches: 7, agentPaths: 2, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 65, chatgptPaths: 21 },
  { date: "2026-11-11", label: "11 Nov", answers: 116, google: 13, openai: 94, anthropic: 7, duck: 2, indexing: 1794, training: 955, agentFetches: 13, agentPaths: 4, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 94, chatgptPaths: 31 },
  { date: "2026-11-12", label: "12 Nov", answers: 120, google: 24, openai: 94, anthropic: 2, duck: 0, indexing: 4718, training: 10391, agentFetches: 20, agentPaths: 8, notebookFetches: 4, notebookPaths: 2, chatgptFetches: 94, chatgptPaths: 41 },
  { date: "2026-11-13", label: "13 Nov", answers: 132, google: 21, openai: 109, anthropic: 2, duck: 0, indexing: 6752, training: 1989, agentFetches: 19, agentPaths: 15, notebookFetches: 2, notebookPaths: 1, chatgptFetches: 109, chatgptPaths: 36 },
  { date: "2026-11-14", label: "14 Nov*", answers: 42, google: 15, openai: 27, anthropic: 0, duck: 0, indexing: 558, training: 1996, agentFetches: 15, agentPaths: 7, notebookFetches: 0, notebookPaths: 0, chatgptFetches: 27, chatgptPaths: 13, partial: true },
];

const agentPathRows: { date: string; page: string; fetches: number }[] = [
  { date: "2026-11-07", page: REPORT, fetches: 1 },
  { date: "2026-11-08", page: REPORT, fetches: 3 },
  { date: "2026-11-09", page: REPORT, fetches: 5 },
  { date: "2026-11-10", page: "/best/ai-agent-frameworks", fetches: 2 },
  { date: "2026-11-10", page: REPORT, fetches: 5 },
  { date: "2026-11-11", page: "/best/ai-agent-frameworks", fetches: 5 },
  { date: "2026-11-11", page: "/blog/is-autogen-deprecated", fetches: 1 },
  { date: "2026-11-11", page: REPORT, fetches: 5 },
  { date: "2026-11-11", page: "/trackers/stars", fetches: 2 },
  { date: "2026-11-12", page: "/best/ai-agent-frameworks", fetches: 3 },
  { date: "2026-11-12", page: "/blog/ai-agent-framework-release-november-2026", fetches: 3 },
  { date: "2026-11-12", page: "/directory/category/agent-frameworks", fetches: 2 },
  { date: "2026-11-12", page: REPORT, fetches: 6 },
  { date: "2026-11-12", page: "/reports/ai-agent-frameworks-next-6-months", fetches: 1 },
  { date: "2026-11-12", page: "/research/ai-agent-framework-release-cadence-october-november-2026", fetches: 3 },
  { date: "2026-11-12", page: "/research/how-many-github-stars-does-openclaw-have", fetches: 1 },
  { date: "2026-11-12", page: "/trackers/stars", fetches: 1 },
  { date: "2026-11-13", page: "/best/ai-agent-frameworks", fetches: 1 },
  { date: "2026-11-13", page: "/blog/ai-agent-framework-release-november-2026", fetches: 1 },
  { date: "2026-11-13", page: REPORT, fetches: 4 },
  { date: "2026-11-13", page: "/research/ai-agent-framework-release-cadence-october-november-2026", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/framework-github-stars", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/github-stars", fetches: 2 },
  { date: "2026-11-13", page: "/trackers/stars", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/agno", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/crewai", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/google-adk", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/langgraph", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/microsoft-agent-framework", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/openai-agents-sdk", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/pydantic-ai", fetches: 1 },
  { date: "2026-11-13", page: "/trackers/stars/smolagents", fetches: 1 },
  { date: "2026-11-14", page: "/best/ai-agent-frameworks", fetches: 3 },
  { date: "2026-11-14", page: "/blog/which-ai-agent-framework-do-people-install", fetches: 1 },
  { date: "2026-11-14", page: "/directory/ag2", fetches: 1 },
  { date: "2026-11-14", page: REPORT, fetches: 6 },
  { date: "2026-11-14", page: "/reports/ai-agent-frameworks-next-6-months", fetches: 2 },
  { date: "2026-11-14", page: "/trackers/github-stars", fetches: 1 },
  { date: "2026-11-14", page: "/trackers/releases", fetches: 1 },
];

const LIVE_PATHS = new Set([
  REPORT,
  "/best/ai-agent-frameworks",
  "/blog/is-autogen-deprecated",
  "/blog/ai-agent-framework-release-november-2026",
  "/blog/which-ai-agent-framework-do-people-install",
  "/directory/category/agent-frameworks",
  "/directory/ag2",
  "/reports/ai-agent-frameworks-next-6-months",
  "/research/ai-agent-framework-release-cadence-october-november-2026",
  "/research/how-many-github-stars-does-openclaw-have",
  "/trackers/stars",
  "/trackers/stars/crewai",
  "/trackers/stars/google-adk",
  "/trackers/stars/langgraph",
  "/trackers/stars/smolagents",
]);

const PRE = new Set(["2026-11-08", "2026-11-09", "2026-11-10", "2026-11-11"]);
const POST = new Set(["2026-11-12", "2026-11-13"]);

function sumDays(dates: Set<string>, field: "agentFetches" | "agentPaths" | "chatgptFetches" | "chatgptPaths") {
  return days.filter((day) => dates.has(day.date)).reduce((total, day) => total + day[field], 0);
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

for (const day of days) {
  assert(
    day.answers === day.google + day.openai + day.anthropic + day.duck,
    `${day.date} answer fetches do not sum`,
  );
  assert(day.google === day.agentFetches + day.notebookFetches, `${day.date} Google column does not match`);
  const rows = agentPathRows.filter((row) => row.date === day.date);
  const fetched = rows.reduce((total, row) => total + row.fetches, 0);
  assert(fetched === day.agentFetches, `${day.date} path rows sum to ${fetched}, not ${day.agentFetches}`);
  assert(new Set(rows.map((row) => row.page)).size === day.agentPaths, `${day.date} distinct paths mismatch`);
}

const preAgentFetches = sumDays(PRE, "agentFetches");
const postAgentFetches = sumDays(POST, "agentFetches");
const preAgentPaths = sumDays(PRE, "agentPaths");
const postAgentPaths = sumDays(POST, "agentPaths");
const preChatFetches = sumDays(PRE, "chatgptFetches");
const postChatFetches = sumDays(POST, "chatgptFetches");
const preChatPaths = sumDays(PRE, "chatgptPaths");
const postChatPaths = sumDays(POST, "chatgptPaths");

assert(preAgentFetches === 28 && postAgentFetches === 39, "GoogleAgent window totals");
assert(preAgentPaths === 8 && postAgentPaths === 23, "GoogleAgent path totals");
assert(preChatFetches === 243 && postChatFetches === 203, "ChatGPT-User window totals");
assert(preChatPaths === 79 && postChatPaths === 77, "ChatGPT-User path totals");

const PRE_DAYS = PRE.size;
const POST_DAYS = POST.size;

function perDay(total: number, windowDays: number) {
  const value = total / windowDays;
  return Number.isInteger(value) ? value.toFixed(1) : String(value);
}

function times(postTotal: number, preTotal: number, digits: number) {
  return (postTotal / POST_DAYS / (preTotal / PRE_DAYS)).toFixed(digits);
}

const agentPerDayPre = perDay(preAgentFetches, PRE_DAYS);
const agentPerDayPost = perDay(postAgentFetches, POST_DAYS);
const agentPathsPre = perDay(preAgentPaths, PRE_DAYS);
const agentPathsPost = perDay(postAgentPaths, POST_DAYS);
const chatPerDayPre = perDay(preChatFetches, PRE_DAYS);
const chatPerDayPost = perDay(postChatFetches, POST_DAYS);
const chatPathsPre = perDay(preChatPaths, PRE_DAYS);
const chatPathsPost = perDay(postChatPaths, POST_DAYS);
const agentFetchX = times(postAgentFetches, preAgentFetches, 1);
const agentPathX = times(postAgentPaths, preAgentPaths, 2);
const chatFetchX = times(postChatFetches, preChatFetches, 2);
const chatPathX = times(postChatPaths, preChatPaths, 2);

assert(agentFetchX === "2.8" && agentPathX === "5.75", "headline ratios");
assert(chatFetchX === "1.67" && chatPathX === "1.95", "control ratios");
assert(agentPerDayPre === "7.0" && agentPerDayPost === "19.5", "GoogleAgent daily rates");
assert(agentPathsPre === "2.0" && agentPathsPost === "11.5", "GoogleAgent path rates");
assert(chatPerDayPre === "60.75" && chatPerDayPost === "101.5", "ChatGPT daily rates");
assert(chatPathsPre === "19.75" && chatPathsPost === "38.5", "ChatGPT path rates");

function fetchesOf(page: string, dates?: Set<string>) {
  return agentPathRows
    .filter((row) => row.page === page && (!dates || dates.has(row.date)))
    .reduce((total, row) => total + row.fetches, 0);
}

const reportAll = fetchesOf(REPORT);
const agentAll = days.reduce((total, day) => total + day.agentFetches, 0);
const reportPre = fetchesOf(REPORT, PRE);
const reportPost = fetchesOf(REPORT, POST);
assert(reportAll === 35 && agentAll === 83, "framework report share");
assert(reportPre === 18 && reportPost === 10, "framework report windows");

function n(value: number) {
  return value.toLocaleString("en-US");
}

function dayLabel(date: string) {
  const day = days.find((row) => row.date === date);
  return day?.partial ? `${date} (partial)` : date;
}

function pageCell(page: string) {
  return LIVE_PATHS.has(page) ? `[${page}](${page})` : page;
}

const sourced = (row: string[]) => [...row, COUNT_SOURCE, CHECKED];

const overlapAnswers = days
  .filter((day) => day.date >= "2026-11-04" && day.date <= "2026-11-10")
  .reduce((total, day) => total + day.answers, 0);
const overlapChat = days
  .filter((day) => day.date >= "2026-11-04" && day.date <= "2026-11-10")
  .reduce((total, day) => total + day.openai, 0);
const overlapAgent = days
  .filter((day) => day.date >= "2026-11-04" && day.date <= "2026-11-10")
  .reduce((total, day) => total + day.agentFetches, 0);
assert(overlapAnswers === 196 && overlapChat === 160 && overlapAgent === 16, "overlap with 11 Nov brief");

export const title = `GoogleAgent after Gemini 4 Hydrogen, November 2026: ${agentFetchX}x answer fetches and ${agentPathX}x paths in 2 days`;
export const thesis = `GoogleAgent’s daily answer fetches on this site rose ${agentFetchX}x, and the distinct paths it opened rose ${agentPathX}x, across the two full days after 12 November. ChatGPT-User rose ${chatFetchX}x. The log measures the gap. It does not name the cause.`;
export const description = `GoogleAgent answer fetches on aiagentsinfo.com went from ${agentPerDayPre} a day on 8–11 November to ${agentPerDayPost} a day on 12–13 November (${agentFetchX}x), and distinct paths from ${agentPathsPre} to ${agentPathsPost} a day (${agentPathX}x). ChatGPT-User went from ${chatPerDayPre} to ${chatPerDayPost} a day (${chatFetchX}x). Checked November 14, 2026.`;

export const keyNumbers = [
  {
    value: `${agentFetchX}x`,
    label: "GoogleAgent fetches per day",
    note: `${agentPerDayPost} on 12–13 Nov vs ${agentPerDayPre} on 8–11 Nov. ${postAgentFetches} ÷ 2 over ${preAgentFetches} ÷ 4.`,
  },
  {
    value: `${agentPathX}x`,
    label: "GoogleAgent paths per day",
    note: `${agentPathsPost} on 12–13 Nov vs ${agentPathsPre} on 8–11 Nov. Distinct paths, not fetches.`,
  },
  {
    value: `${chatFetchX}x`,
    label: "ChatGPT-User fetches per day",
    note: `${chatPerDayPost} vs ${chatPerDayPre}, same windows. The control series.`,
  },
  {
    value: "13",
    label: "GoogleAgent fetches on 11 Nov",
    note: "The day before the Hydrogen post. Already up from 7 on 10 Nov.",
  },
];

export const findings = [
  `GoogleAgent: ${preAgentFetches} answer fetches on 8–11 November (${agentPerDayPre}/day) and ${postAgentFetches} on 12–13 November (${agentPerDayPost}/day), ${agentFetchX}x. Distinct paths ${agentPathsPre}/day, then ${agentPathsPost}/day, ${agentPathX}x. DataFast, IP-verified, pulled about 8:50 a.m. IST on 14 November 2026.`,
  `It was already up before the post. GoogleAgent fetched 13 times across 4 paths on 11 November, from 7 fetches and 2 paths on 10 November. The ${agentFetchX}x keeps that day in the pre window.`,
  `ChatGPT-User made ${preChatFetches} fetches (${chatPerDayPre} a day), then ${postChatFetches} (${chatPerDayPost}), ${chatFetchX}x. Paths went from ${chatPathsPre} a day to ${chatPathsPost}, ${chatPathX}x. OpenAI’s release notes, read 14 November 2026, have no 12 November entry.`,
  `Every GoogleAgent path is a framework or GitHub-stars URL. The framework report was ${reportAll} of ${agentAll} fetches from 7 November through the partial 14th. On 13 November, 4 of 8 requested star slugs have no star page here.`,
  `Google’s 12 November post says Hydrogen is in Search globally and that it supercharges query fan-out across subtopics. The November 2026 core update began 10 November 2026 at 10:07 PST and may take up to 2 weeks.`,
];

export const executiveSummary = [
  `On 14 November 2026 this page times GoogleAgent against ChatGPT-User. Pre is 8–11 November. Post is 12–13 November. 14 November ends about 8:50 a.m. IST and stays out of the rates.`,
  `GoogleAgent went from ${agentPerDayPre} fetches a day to ${agentPerDayPost}, and from ${agentPathsPre} paths a day to ${agentPathsPost}. ChatGPT-User went from ${chatPerDayPre} to ${chatPerDayPost}, and from ${chatPathsPre} paths a day to ${chatPathsPost}. Both were climbing before 12 November.`,
  `Counts are copied from one DataFast export. Rates are computed. A request is not a citation or a click.`,
];

const chartDays = days.filter((day) => day.date >= "2026-11-07");

export const reportCharts: ChartSpec[] = [
  {
    id: "googleagent-daily",
    title: "GoogleAgent fetches and distinct paths by day",
    caption: "GoogleAgent answer fetches and distinct paths. 14 Nov is partial, through about 8:50 a.m. IST.",
    unit: "fetches or distinct paths",
    source: `${COUNT_SOURCE}, IP-verified, pulled about 8:50 a.m. IST on 14 Nov 2026. NotebookLM is not in these bars.`,
    series: ["Fetches", "Distinct paths"],
    categories: chartDays.map((day) => ({
      label: day.label,
      values: [day.agentFetches, day.agentPaths],
      displays: [String(day.agentFetches), String(day.agentPaths)],
    })),
  },
  {
    id: "paths-compared",
    title: "Distinct paths per day, GoogleAgent and ChatGPT-User",
    caption: "Distinct paths per day. 14 Nov is partial.",
    unit: "distinct paths",
    source: `${COUNT_SOURCE}, IP-verified, pulled about 8:50 a.m. IST on 14 Nov 2026.`,
    series: ["GoogleAgent", "ChatGPT-User"],
    categories: chartDays.map((day) => ({
      label: day.label,
      values: [day.agentPaths, day.chatgptPaths],
      displays: [String(day.agentPaths), String(day.chatgptPaths)],
    })),
  },
];

const rateRows = [
  sourced([
    "GoogleAgent",
    String(preAgentFetches),
    agentPerDayPre,
    String(postAgentFetches),
    agentPerDayPost,
    `${agentFetchX}x`,
    agentPathsPre,
    agentPathsPost,
    `${agentPathX}x`,
  ]),
  sourced([
    "ChatGPT-User",
    String(preChatFetches),
    chatPerDayPre,
    String(postChatFetches),
    chatPerDayPost,
    `${chatFetchX}x`,
    chatPathsPre,
    chatPathsPost,
    `${chatPathX}x`,
  ]),
];

export const chapters: ReportChapter[] = [
  {
    id: "what-google-announced",
    title: "What did Google say changed on 12 November?",
    blocks: [
      {
        kind: "p",
        text: "Robby Stein published the note on 12 November 2026. Two sentences set the clock for this log. [[1]]",
      },
      {
        kind: "quote",
        text: "Today, Google Search is bringing cutting-edge intelligence to everyone with Gemini 4 Hydrogen. This is the biggest model upgrade to Search yet.",
        cite: "Robby Stein, Google Search blog, 12 November 2026. [[1]]",
      },
      {
        kind: "quote",
        text: "Hydrogen’s advanced reasoning supercharges our query fan-out technique in Search, connecting you to a broader range of helpful links than before. By more thoroughly understanding your question and conducting simultaneous queries across all the relevant subtopics, Search helps you find sites you previously might not have discovered.",
        cite: "Robby Stein, Google Search blog, 12 November 2026. The page also says Hydrogen “is now available globally in Google Search for all users.” [[1]]",
      },
      {
        kind: "p",
        text: "AI Mode is named only as “AI Mode languages.” The post does not call Hydrogen the AI Mode default, does not mention AI Overviews, and names no crawler. Fan-out was already in the AI features guide, updated 10 December 2025: multiple related searches across subtopics while an answer is generated. The new word is supercharges. [[1]][[3]]",
      },
      {
        kind: "p",
        text: "The core update began at 2026-11-10 10:06 US/Pacific. At 10:07 PST Google said it applies globally, to all languages, and “may take up to 2 weeks,” through 24 November. On 14 November it still had no end time. 10:07 PST is 23:37 IST. The 7 fetches that day have no hour, so they cannot be placed around that minute. [[2]]",
      },
    ],
  },
  {
    id: "did-googleagent-rise",
    title: "Did GoogleAgent fetch more pages after that date?",
    blocks: [
      {
        kind: "p",
        text: `DataFast labels these answer fetches GoogleAgent. ${preAgentFetches} of them fall on 8–11 November, ${agentPerDayPre} a day. ${postAgentFetches} fall on 12–13 November, ${agentPerDayPost} a day. That is ${agentFetchX}x, computed. Distinct paths go from ${preAgentPaths} to ${postAgentPaths}, ${agentPathsPre} to ${agentPathsPost} a day, ${agentPathX}x. [[5]]`,
      },
      { kind: "chart", id: "googleagent-daily" },
      {
        kind: "callout",
        title: "Already rising on 11 November",
        text: "13 fetches and 4 paths on 11 November, before the post, up from 7 and 2 on 10 November. The 2.8x keeps 11 November in the pre window.",
      },
      {
        kind: "p",
        text: `Fetches were 20 then 19. Paths were 8 then 15. The [framework report](${REPORT}) took ${reportPre} of ${preAgentFetches} pre-window fetches and ${reportPost} of ${postAgentFetches} after. The share fell while the path count rose. The partial 14th already has 15 fetches and 7 paths by about 8:50 a.m. That is a morning count, not a rate, and it is outside the ${agentFetchX}x. [[5]]`,
      },
      {
        kind: "p",
        text: "NotebookLM is out of the rate: 4 fetches (2 paths) on 12 November and 2 fetches (1 path) on 13 November. The Google column adds them and reads 24 and 21. Google’s 19 August 2026 page documents Google-Agent, hyphenated, as agents on Google infrastructure that “navigate the web and perform actions upon user request.” It does not document GoogleAgent, and it does not mention AI Mode. The [11 November brief](/reports/ai-answer-crawlers-november-2026) kept the spellings apart. [[4]][[8]]",
      },
    ],
  },
  {
    id: "did-the-control-match",
    title: "Did ChatGPT-User rise by the same factor?",
    blocks: [
      {
        kind: "p",
        text: `ChatGPT-User is the control: same host, same days, no model note on 12 November. ${preChatFetches} fetches on 8–11 November is ${chatPerDayPre} a day. ${postChatFetches} on 12–13 November is ${chatPerDayPost}, ${chatFetchX}x. Paths go from ${chatPathsPre} a day to ${chatPathsPost}, ${chatPathX}x, against GoogleAgent’s ${agentPathX}x. [[5]][[6]][[7]]`,
      },
      { kind: "chart", id: "paths-compared" },
      {
        kind: "table",
        caption:
          "8–11 November versus 12–13 November. Per-day rates are computed. 14 November is excluded.",
        headers: [
          "Series",
          "Pre fetches",
          "Pre / day",
          "Post fetches",
          "Post / day",
          "Fetch ratio",
          "Pre paths / day",
          "Post paths / day",
          "Path ratio",
          "Source",
          "Checked",
        ],
        rows: rateRows,
        scroll: true,
      },
      {
        kind: "p",
        text: "ChatGPT-User was flat on the announcement day: 94 fetches on 11 November and 94 on 12 November, then 109 on 13 November. GoogleAgent went 13, 20, 19. Paths went 31, 41, 36 against 4, 8, 15. ChatGPT-User’s top path this week was the homepage. For 4–10 November the earlier brief had that at 69 of 160. [[5]][[8]]",
      },
      {
        kind: "p",
        text: "OpenAI says ChatGPT-User visits a page when someone asks a question and “is not used for crawling the web in an automatic fashion.” Release notes read 14 November have no 12 November heading. Voice retires 11 December (noted 10 November). ChatGPT Wallet is 13 November. Neither changes the crawler’s model. Claude-User fell from 7 fetches to 2. DuckAssistBot stopped after 2 fetches on 11 November. [[5]][[6]][[7]]",
      },
    ],
  },
  {
    id: "which-paths",
    title: "Which paths did GoogleAgent open?",
    blocks: [
      {
        kind: "p",
        text: `Every GoogleAgent row is below: ${agentAll} fetches from 7 November through the partial 14th, ${reportAll} of them on the [framework report](${REPORT}). The rest are the comparison, framework posts, the directory, and star URLs. No shopping page, no coding-agent page, no homepage. [[5]]`,
      },
      {
        kind: "p",
        text: "This site’s keyword log at 6:50 a.m. IST on 11 November records Search Console through 10 November: “ai agent framework release november 2026” had 27 impressions, average position 7.3, and 2 clicks, 26 of them on that report. Not re-queried on 14 November.",
      },
      {
        kind: "table",
        scroll: true,
        caption:
          "Every GoogleAgent path in the 14 November pull. An unlinked path has no page in this repository.",
        headers: ["Date", "Path", "Fetches", "Source", "Checked"],
        rows: agentPathRows.map((row) => sourced([dayLabel(row.date), pageCell(row.page), String(row.fetches)])),
      },
      {
        kind: "p",
        text: "Four of the eight 13 November star URLs are real pages from 11 November: crewai, google-adk, langgraph, smolagents. agno, microsoft-agent-framework, openai-agents-sdk, and pydantic-ai are not. The Agents SDK page is /trackers/stars/openai-agents. pydantic-ai is rank 11, and only 10 star pages are built. /trackers/github-stars and /trackers/framework-github-stars have no page module. Guessed names and new pages are both in the file. [[5]][[9]]",
      },
    ],
  },
  {
    id: "which-pages-were-new",
    title: "Which of those pages were published that week?",
    blocks: [
      {
        kind: "p",
        text: "New that week means the rendering file’s first commit is 7–14 November 2026, from git log --follow --diff-filter=A, read 14 November 2026. A commit date is not the minute a URL went live. [[9]]",
      },
      {
        kind: "table",
        scroll: true,
        caption:
          "First commit of the file that renders each GoogleAgent path. Read 14 November 2026.",
        headers: ["Path", "First commit", "New that week?", "Source", "Checked"],
        rows: [
          [pageCell(REPORT), "2026-11-05", "No", "git log", CHECKED],
          [pageCell("/best/ai-agent-frameworks"), "2026-11-09", "Yes", "git log", CHECKED],
          [pageCell("/blog/is-autogen-deprecated"), "2026-11-09", "Yes", "git log", CHECKED],
          [pageCell("/trackers/stars"), "2026-11-09", "Yes", "git log", CHECKED],
          [pageCell("/research/how-many-github-stars-does-openclaw-have"), "2026-11-09", "Yes", "git log", CHECKED],
          [pageCell("/blog/which-ai-agent-framework-do-people-install"), "2026-11-09", "Yes", "git log", CHECKED],
          [pageCell("/blog/ai-agent-framework-release-november-2026"), "2026-11-11", "Yes", "git log", CHECKED],
          [pageCell("/research/ai-agent-framework-release-cadence-october-november-2026"), "2026-11-11", "Yes", "git log", CHECKED],
          [pageCell("/reports/ai-agent-frameworks-next-6-months"), "2026-11-11", "Yes", "git log", CHECKED],
          [pageCell("/directory/ag2"), "2026-11-11", "Yes", "git log", CHECKED],
          ["/trackers/stars/crewai, google-adk, langgraph, smolagents", "2026-11-11", "Yes", "git log", CHECKED],
          [pageCell("/directory/category/agent-frameworks"), "2026-11-02", "No", "git log", CHECKED],
          ["/trackers/stars/agno", "No page", "No", "files", CHECKED],
          ["/trackers/stars/microsoft-agent-framework", "No page", "No", "files", CHECKED],
          ["/trackers/stars/openai-agents-sdk", "No page", "No", "files", CHECKED],
          ["/trackers/stars/pydantic-ai", "No page", "No", "files", CHECKED],
          ["/trackers/github-stars", "No page", "No", "files", CHECKED],
          ["/trackers/framework-github-stars", "No page", "No", "files", CHECKED],
          ["/trackers/releases", "No index", "No", "files", CHECKED],
        ],
      },
      {
        kind: "p",
        text: "The comparison, first committed 9 November, is the second path on 10 November. The AutoGen post and stars index, also 9 November, appear on 11 November, before the Hydrogen post. Pages committed 11 November show up on 12 and 13 November. New URLs explain a lot of the spread. They do not explain the four star slugs that were never pages. [[5]][[9]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Do not rewrite a framework page from two days of one fetcher. Re-count after 24 November, when Google’s core-update window can be over, and see whether old URLs are still in the set. Until then, fix the paths a fan-out can miss: /trackers/stars/openai-agents-sdk is not a page. The id is openai-agents.",
      },
    ],
  },
  {
    id: "day-table",
    title: "What did each day record?",
    blocks: [
      {
        kind: "p",
        text: "Answer fetches are the four company columns added up. Google is GoogleAgent plus Google-NotebookLM. 1–5 November are zero answer fetches. 14 November is partial. [[5]]",
      },
      {
        kind: "table",
        scroll: true,
        caption:
          "Asia/Calcutta days. Pulled about 8:50 a.m. IST on 14 November 2026. Google = GoogleAgent + Google-NotebookLM.",
        headers: [
          "Date",
          "Answer fetches",
          "Google",
          "ChatGPT-User",
          "Claude-User",
          "DuckAssistBot",
          "Indexing",
          "Training",
          "Source",
          "Checked",
        ],
        rows: days.map((day) =>
          sourced([
            dayLabel(day.date),
            String(day.answers),
            String(day.google),
            String(day.openai),
            String(day.anthropic),
            String(day.duck),
            n(day.indexing),
            n(day.training),
          ]),
        ),
      },
      {
        kind: "p",
        text: `From 4 through 10 November the rows sum to ${overlapAnswers} answer fetches, ${overlapChat} from ChatGPT-User, and ${overlapAgent} from GoogleAgent, the same totals as the [11 November brief](/reports/ai-answer-crawlers-november-2026). This page does not repeat that path essay. [[5]][[8]]`,
      },
      {
        kind: "p",
        text: `12 November is also a sitewide bot day. Indexing went from ${n(1794)} to ${n(4718)}, and training from ${n(955)} to ${n(10391)}. On 13 November indexing was ${n(6752)} and training fell to ${n(1989)}. GoogleAgent’s step from 13 to 20 fetches sits inside that spike. The export does not name the training crawler, and this brief has no URL list for it. [[5]]`,
      },
    ],
  },
  {
    id: "left-out",
    title: "What was left out",
    blocks: [
      {
        kind: "p",
        text: "One site, two full post days, no raw User-Agent, no hours, no indexing URL list. 14 November stops about 8:50 a.m. IST. IP verification is DataFast’s. A fetch is not a citation or a click. The 7.3 position is through 10 November only. [[4]][[5]]",
      },
      {
        kind: "p",
        text: "Run it again after 24 November 2026. Hold the fan-out reading only if GoogleAgent is still above 2.0 distinct paths a day on URLs that were already old. A collapse to one URL, or a spread made only of the 9 and 11 November pages, fails it. [[2]]",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [],
  },
];

export const faq = [
  {
    question: "Did Gemini 4 Hydrogen cause the extra GoogleAgent fetches?",
    answer: `Fetches went from ${agentPerDayPre} to ${agentPerDayPost} a day, and paths from ${agentPathsPre} to ${agentPathsPost}, after 12 November. The series was already at 13 fetches on 11 November. The core update and this site’s new URLs sit in the same week. Consistent with fan-out. Not a cause.`,
  },
  {
    question: "What is GoogleAgent?",
    answer:
      "DataFast’s label. Google documents Google-Agent, hyphenated, updated 19 August 2026, as a user-triggered fetcher. It does not document GoogleAgent or tie it to AI Mode. The spellings stay separate.",
  },
  {
    question: "Why is ChatGPT-User the control?",
    answer:
      "Largest series, same days. OpenAI’s notes, read 14 November 2026, have no 12 November entry. ChatGPT-User rose 1.67x. GoogleAgent rose 2.8x.",
  },
  {
    question: "Why is 14 November left out of the 2.8x?",
    answer:
      "The pull ends about 8:50 a.m. IST: 15 GoogleAgent fetches and 27 ChatGPT-User fetches. In the table. Not a daily rate.",
  },
  {
    question: "What would show the wider fan-out held?",
    answer:
      "Rerun after 24 November 2026. GoogleAgent should still be above 2.0 paths a day, on URLs that were already old. A fetch is still not a citation.",
  },
];

chapters[chapters.length - 1].blocks = faq.flatMap((item) => [
  { kind: "h3" as const, text: item.question },
  { kind: "p" as const, text: item.answer },
]);

export const methodology = [
  `DataFast bot-traffic export, IP-verified, Asia/Calcutta, pulled about 8:50 a.m. IST on 14 November 2026. Google = GoogleAgent + Google-NotebookLM. Pre is 8–11 November. Post is 12–13 November. ${agentPerDayPost} ÷ ${agentPerDayPre} prints as ${agentFetchX}x. Path rows match the export. Publish dates are git log --follow --diff-filter=A. A missing path is a missing file. [[1]][[5]][[9]]`,
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Google Search gets a major upgrade with Gemini 4 Hydrogen",
    url: "https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/",
    detail:
      "Robby Stein, VP of Product, Google Search. Dated 12 November 2026. Read 14 November 2026. Hydrogen available globally in Google Search. Fan-out sentence quoted on this page. AI Mode is named only in the languages bullet. AI Overviews are not named.",
  },
  {
    n: 2,
    title: "Google Search Status Dashboard, November 2026 core update",
    url: "https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc",
    detail:
      "Read 14 November 2026. Incident began at 2026-11-10 10:06 US/Pacific. Description at 10:07 PST: released globally, all languages, rollout may take up to 2 weeks. Also listed on https://status.search.google.com/summary.",
  },
  {
    n: 3,
    title: "Google, AI features and your website",
    url: "https://developers.google.com/search/docs/appearance/ai-features",
    detail:
      "Last updated 2025-12-10 UTC. Read 14 November 2026. AI Overviews and AI Mode may use query fan-out, issuing multiple related searches across subtopics while a response is generated.",
  },
  {
    n: 4,
    title: "Google, user-triggered fetchers",
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers",
    detail:
      "Last updated 2026-08-19 UTC. Read 14 November 2026. Documents Google-Agent. Does not document the spelling GoogleAgent. Lists Google-NotebookLM as the former Gemini Notebook agent, supported until August 2026.",
  },
  {
    n: 5,
    title: "DataFast, bot-traffic API",
    url: "https://datafa.st/docs/api/website/bot-traffic",
    detail:
      "Route documentation. The cells on this page are aiagentsinfo.com’s own IP-verified export, Asia/Calcutta calendar days, pulled about 8:50 a.m. IST on 14 November 2026. The docs page does not publish these counts. 14 November is partial.",
  },
  {
    n: 6,
    title: "OpenAI, Overview of OpenAI crawlers",
    url: "https://platform.openai.com/docs/bots",
    detail:
      "Read 14 November 2026. ChatGPT-User may visit a page when a user asks ChatGPT or a custom GPT a question. Not an automatic crawl. robots.txt rules may not apply.",
  },
  {
    n: 7,
    title: "OpenAI, ChatGPT release notes",
    url: "https://help.openai.com/en/articles/6825453-chatgpt-release-notes",
    detail:
      "Read 14 November 2026. No heading dated 12 November 2026. The surrounding notes are 10 November (voice retirement on 11 December 2026) and 13 November (ChatGPT Wallet).",
  },
  {
    n: 8,
    title: "AI answer crawlers, November 2026: 196 fetches in 7 days, 160 from ChatGPT-User",
    url: "https://www.aiagentsinfo.com/reports/ai-answer-crawlers-november-2026",
    detail:
      "This site, 11 November 2026. Window 4–10 November. 196 answer fetches, 160 ChatGPT-User, 16 GoogleAgent. This brief’s rows for those days sum to the same three totals.",
  },
  {
    n: 9,
    title: "aiagentsinfo.com repository history",
    url: "https://github.com/sarath59/aiagentsinfo",
    detail:
      "First-commit dates read 14 November 2026 with git log --follow --diff-filter=A. Framework report 5 November. Comparison, AutoGen post, stars index, OpenClaw note, and install post 9 November. Release post, cadence note, six-month outlook, AG2 listing, and per-entity star pages 11 November. Category route 2 November.",
  },
];

function blockWords(block: ReportChapter["blocks"][number]) {
  if (block.kind === "p" || block.kind === "h3" || block.kind === "quote") return `${block.text} ${"cite" in block ? block.cite : ""}`;
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

const bodyWords = bodyCopy().trim().split(/\s+/).filter(Boolean).length;
/** Playbook band is 1,500–2,500 words, shown as an 8 minute read. */
export const readingMinutes = bodyWords >= 1500 && bodyWords <= 2500 ? 8 : readingTime(bodyCopy());
export const bodyWordCount = bodyWords;
