import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/ai-answer-crawlers-november-2026";
export const title =
  "AI answer crawlers, November 2026: 196 fetches in 7 days, 160 from ChatGPT-User";
export const thesis =
  "Answer engines fetched this site far more often than they sent a person. The pages they opened most were the homepage, the trust pages, and robots.txt.";
export const description =
  "196 IP-verified answer fetches on aiagentsinfo.com from 4 to 10 November 2026, 160 of them by ChatGPT-User. Indexing was 7,843 and training was 9,563. Checked November 11, 2026.";
export const readOn = "2026-11-11";

/** Copied from the DataFast bot-traffic export. Do not replace these with a later window. */
const ANSWERS = 196;
const CHATGPT = 160;
const GOOGLE_AGENT = 16;
const CLAUDE_USER = 12;
const DUCK = 8;
const INDEXING = 7843;
const TRAINING = 9563;
const TOTAL = 17602;
const OAI_SEARCH = 5903;
const GOOGLE_OTHER = 8680;
const PERPLEXITY_BOT = 1217;
const CLAUDE_BOT = 788;
const GOOGLEBOT = 633;
const BINGBOT = 88;
const APPLEBOT = 44;
const META_AGENT = 44;
const GPTBOT = 7;
const INSPECTION = 2;
const HOME = 69;
const TRUST = 33;
const HOME_AND_TRUST = HOME + TRUST;
const REPORT_ARTICLES = 22;
const SITEMAP_URLS = 292;
const SITEMAP_HIT = 35;
const CHATGPT_PATHS = 37;
const CHATGPT_VISITORS = 4;
const GOOGLE_VISITORS = 6;
const BING_VISITORS = 2;

const COUNT_SOURCE = "DataFast export";
const CHECKED = "11 Nov 2026";

function n(value: number) {
  return value.toLocaleString("en-US");
}

/** One decimal, half up. The fraction is printed beside every percent. */
function pct(part: number, whole: number) {
  return (Math.round((part / whole) * 1000) / 10).toFixed(1);
}

const shareChatgpt = pct(CHATGPT, ANSWERS);
const shareHome = pct(HOME, CHATGPT);
const shareTrustOfChatgpt = pct(TRUST, CHATGPT);
const shareTrustOfAnswers = pct(TRUST, ANSWERS);
const shareHomeTrust = pct(HOME_AND_TRUST, CHATGPT);
const shareReports = pct(REPORT_ARTICLES, CHATGPT);
const shareGoogleAgentPage = pct(14, GOOGLE_AGENT);
const shareNov10 = pct(76, ANSWERS);
const shareAnswersOfAll = pct(ANSWERS, TOTAL);
const sharePerplexityIndex = pct(PERPLEXITY_BOT, INDEXING);
const shareOaiIndex = pct(OAI_SEARCH, INDEXING);
const shareGoogleOther = pct(GOOGLE_OTHER, TRAINING);
const shareSitemap = pct(SITEMAP_HIT, SITEMAP_URLS);

const sourced = (row: string[]) => [...row, COUNT_SOURCE, CHECKED];

export const keyNumbers = [
  {
    value: n(ANSWERS),
    label: "Answer fetches",
    note: `4–10 Nov 2026 IST. ChatGPT-User ${n(CHATGPT)}. IP-verified.`,
  },
  {
    value: n(HOME),
    label: "Homepage fetches by ChatGPT-User",
    note: `${shareHome}% of ${n(CHATGPT)}. Computed: ${HOME} ÷ ${CHATGPT}.`,
  },
  {
    value: n(TOTAL),
    label: "Bot requests, all IP-verified",
    note: `${n(INDEXING)} indexing, ${n(TRAINING)} training.`,
  },
  {
    value: "40:1",
    label: "ChatGPT fetches per referral visitor",
    note: `Computed: ${CHATGPT} ÷ ${CHATGPT_VISITORS}. Windows differ by part of 11 Nov.`,
  },
];

export const findings = [
  `DataFast recorded ${n(ANSWERS)} answer fetches from 4 through 10 November 2026, Asia/Calcutta. Every request in the file is IP-verified. ChatGPT-User made ${n(CHATGPT)}, GoogleAgent ${n(GOOGLE_AGENT)}, Claude-User ${n(CLAUDE_USER)}, and DuckAssistBot ${n(DUCK)}.`,
  `ChatGPT-User fetched the homepage ${n(HOME)} times, ${shareHome} percent of its ${n(CHATGPT)} fetches (${HOME} ÷ ${CHATGPT}, computed). It fetched /verified-revenue, /terms, /editorial-policy, /privacy, and /about ${n(TRUST)} times.`,
  `The same seven days hold ${n(INDEXING)} indexing fetches and ${n(TRAINING)} training fetches, ${n(TOTAL)} requests in all. OAI-SearchBot: ${n(OAI_SEARCH)} indexing. GoogleOther: ${n(GOOGLE_OTHER)} training. PerplexityBot: ${n(PERPLEXITY_BOT)} indexing and 0 answer fetches. GPTBot: ${n(GPTBOT)}.`,
  `The sitemap checked on 11 November 2026 lists ${n(SITEMAP_URLS)} URLs. Answer engines fetched ${n(SITEMAP_HIT)} of them at least once. ChatGPT-User requested ${n(CHATGPT_PATHS)} distinct paths. GoogleAgent requested 2.`,
  `Human referrers for 4–11 November 2026 IST, seven full days plus 11 November so far, list ChatGPT ${CHATGPT_VISITORS}, Google ${GOOGLE_VISITORS}, and Bing ${BING_VISITORS}. The export was generated at 6:46 a.m. IST on 11 November. ${CHATGPT} ÷ ${CHATGPT_VISITORS} is 40 to 1, computed, across windows that are not the same length.`,
];

export const executiveSummary = [
  `On 11 November 2026 this page reports a closed week. From 4 November through 10 November 2026, Asia/Calcutta, answer engines fetched ${n(ANSWERS)} pages. ChatGPT-User made ${n(CHATGPT)} of them. The other ${n(TOTAL - ANSWERS)} requests were indexing or training. [[1]]`,
  `The homepage took ${n(HOME)} ChatGPT-User fetches. Five trust and legal pages took ${n(TRUST)}. Eight report articles took ${n(REPORT_ARTICLES)}. The human table, generated at 6:46 a.m. IST on 11 November, shows ${CHATGPT_VISITORS} visitors from ChatGPT. [[1]][[2]]`,
  `Nothing here is estimated. Counts are copied from the DataFast export. Shares, the 40-to-1 ratio, and the conversion of 10:06 a.m. Pacific into 11:36 p.m. IST are computed and labeled as computed.`,
];

export const reportCharts: ChartSpec[] = [
  {
    id: "daily-answers",
    title: "Answer fetches by day",
    caption: "Sitewide answer fetches by Asia/Calcutta date, summed from hourly buckets.",
    unit: "answer fetches",
    source: `${COUNT_SOURCE}. Not split by engine. 6 Nov omits 00:00; that empty hour is absent and the other buckets already match the window totals. Checked ${CHECKED}.`,
    series: ["Answer fetches"],
    categories: [
      { label: "4 Nov", values: [0], displays: ["0"] },
      { label: "5 Nov", values: [0], displays: ["0"] },
      { label: "6 Nov", values: [5], displays: ["5"] },
      { label: "7 Nov", values: [17], displays: ["17"] },
      { label: "8 Nov", values: [35], displays: ["35"] },
      { label: "9 Nov", values: [63], displays: ["63"] },
      { label: "10 Nov", values: [76], displays: ["76"] },
    ],
  },
];

export const chapters: ReportChapter[] = [
  {
    id: "which-engines",
    title: "Which answer engines fetched a page?",
    blocks: [
      {
        kind: "p",
        text: `DataFast classified ${n(ANSWERS)} requests as answer fetches. The field is aiAnswerRequests. The export used category "all" and verification "all". All ${n(TOTAL)} requests are IP-verified. User-agent-only requests are 0. [[1]]`,
      },
      {
        kind: "p",
        text: `Four user agents make up the ${n(ANSWERS)}. Each share is computed (${CHATGPT} ÷ ${ANSWERS} is ${shareChatgpt} percent). After rounding to one decimal, the four shares sum to 100.0 percent.`,
      },
      {
        kind: "table",
        caption: "Answer fetches by engine, 4–10 November 2026, Asia/Calcutta. Shares are computed.",
        headers: ["Engine", "Operator", "Fetches", "Share of 196", "Distinct paths", "Source", "Checked"],
        rows: [
          sourced(["ChatGPT-User", "OpenAI", n(CHATGPT), `${shareChatgpt}%`, n(CHATGPT_PATHS)]),
          sourced(["GoogleAgent", "Google", n(GOOGLE_AGENT), `${pct(GOOGLE_AGENT, ANSWERS)}%`, "2"]),
          sourced(["Claude-User", "Anthropic", n(CLAUDE_USER), `${pct(CLAUDE_USER, ANSWERS)}%`, "3"]),
          sourced(["DuckAssistBot", "DuckDuckGo", n(DUCK), `${pct(DUCK, ANSWERS)}%`, "3"]),
        ],
      },
      {
        kind: "p",
        text: `Perplexity and Microsoft recorded 0 answer fetches. PerplexityBot still indexed ${n(PERPLEXITY_BOT)} times. Bingbot indexed ${n(BINGBOT)} times. [[1]]`,
      },
    ],
  },
  {
    id: "what-chatgpt-opened",
    title: "What did ChatGPT-User open?",
    blocks: [
      {
        kind: "p",
        text: `ChatGPT-User's ${n(CHATGPT)} fetches hit ${n(CHATGPT_PATHS)} path strings. The homepage is ${n(HOME)}, ${shareHome} percent (${HOME} ÷ ${CHATGPT}). [[1]]`,
      },
      {
        kind: "p",
        text: `Trust and legal pages, defined here as [/verified-revenue](/verified-revenue), [/terms](/terms), [/editorial-policy](/editorial-policy), [/privacy](/privacy), and [/about](/about), were fetched 11, 9, 8, 4, and 1 times. The sum is ${n(TRUST)}: ${shareTrustOfChatgpt} percent of ChatGPT-User (${TRUST} ÷ ${CHATGPT}) and ${shareTrustOfAnswers} percent of all answer fetches (${TRUST} ÷ ${ANSWERS}). Both percents are computed. Homepage plus those five paths is ${n(HOME_AND_TRUST)}, ${shareHomeTrust} percent of ChatGPT-User (${HOME_AND_TRUST} ÷ ${CHATGPT}), computed. /submit was fetched 11 times and is not in that trust set.`,
      },
      {
        kind: "p",
        text: `Report articles, /reports/ paths other than the index and two legacy /pdf URLs, were fetched ${n(REPORT_ARTICLES)} times: the [coding brief](/reports/ai-coding-agents-next-30-days) 8, the [harness benchmark](/reports/agent-harness-benchmark-november-2026) 5, the [framework table](/reports/ai-agent-framework-github-stats-november-2026) 2, the [shopping outlook](/reports/ai-shopping-agents-next-6-months) 2, the [12-month outlook](/reports/ai-agents-next-12-months) 2, and one each for the six-month, browser, and MCP outlooks. ${REPORT_ARTICLES} ÷ ${CHATGPT} is ${shareReports} percent, computed. Two more fetches hit legacy /pdf URLs, one each on the harness benchmark and the 12-month outlook. They are counted and not linked.`,
      },
      {
        kind: "table",
        caption: `ChatGPT-User paths fetched at least twice. Source on every row: ${COUNT_SOURCE}, 4–10 Nov 2026, IP-verified. Checked ${CHECKED}.`,
        headers: ["Path", "Fetches", "Source", "Checked"],
        rows: [
          ["/", n(HOME)],
          ["/submit", "11"],
          ["/verified-revenue", "11"],
          ["/terms", "9"],
          ["/editorial-policy", "8"],
          ["/reports/ai-coding-agents-next-30-days", "8"],
          ["/reports/agent-harness-benchmark-november-2026", "5"],
          ["/privacy", "4"],
          ["/directory", "3"],
          ["/reports/ai-agent-framework-github-stats-november-2026", "2"],
          ["/reports/ai-shopping-agents-next-6-months", "2"],
          ["/blog/how-do-you-evaluate-an-ai-agent-harness", "2"],
          ["/reports/ai-agents-next-12-months", "2"],
        ].map((row) => [...row, COUNT_SOURCE, CHECKED]),
      },
      {
        kind: "p",
        text: "Twenty-four other ChatGPT-User paths were fetched once, including /about, /directory/traxy, /directory/everygen-ai, both /pdf URLs, and one evaluation-tools URL with utm_source=chatgpt.com.",
      },
    ],
  },
  {
    id: "other-answer-engines",
    title: "Did Google, Claude, and DuckDuckGo open the same pages?",
    blocks: [
      {
        kind: "p",
        text: `They did not. GoogleAgent used two paths: 14 fetches of the [framework table](/reports/ai-agent-framework-github-stats-november-2026) and 2 of [/best/ai-agent-frameworks](/best/ai-agent-frameworks). 14 ÷ 16 is ${shareGoogleAgentPage} percent, computed. Google's fetchers page, updated 2026-08-19 UTC, documents Google-Agent, with a hyphen, as a user-triggered agent fetcher that generally ignores robots.txt. It does not document the spelling GoogleAgent. The export has DataFast's label, not the raw User-Agent, so these ${n(GOOGLE_AGENT)} rows stay under that label. [[1]][[6]]`,
      },
      {
        kind: "p",
        text: `Claude-User used three paths: /robots.txt 6 times (6 ÷ 12 is 50 percent), the [shopping outlook](/reports/ai-shopping-agents-next-6-months) 5 times, and the OpenClaw stars note once. Anthropic says Claude-User fetches on a user question, honors robots.txt, and that a block stops retrieval. The help page said "Updated this week" and dates a training signal to 30 October 2026. [[1]][[4]]`,
      },
      {
        kind: "p",
        text: `DuckAssistBot used three paths: /robots.txt 5 times (5 ÷ 8 is 62.5 percent), the SpecCompact note twice, and /research once. DuckDuckGo says it crawls in real time for cited answers, does not train models, and applies a Disallow after 72 hours without changing organic rank. Treating any of this as a habit beyond this week is an inference. [[1]][[8]]`,
      },
    ],
  },
  {
    id: "indexing-and-training",
    title: "What were the other 17,406 fetches for?",
    blocks: [
      {
        kind: "p",
        text: `Answer fetches are ${shareAnswersOfAll} percent of ${n(TOTAL)} requests (${ANSWERS} ÷ ${TOTAL}, computed). Indexing is ${n(INDEXING)}. Training is ${n(TRAINING)}. Company totals, each fully IP-verified: Google ${n(9331)}, OpenAI ${n(6070)}, Perplexity ${n(1217)}, Anthropic ${n(800)}, Microsoft ${n(88)}, Apple ${n(44)}, Meta ${n(44)}, DuckDuckGo ${n(DUCK)}. [[1]]`,
      },
      {
        kind: "table",
        caption:
          "Bots, 4–10 Nov 2026. Purpose from the vendor page checked 11 Nov 2026. Zero means absent from this crawler list. Google-Extended is not a user agent.",
        headers: ["Bot", "Operator", "Documented purpose", "7-day count", "DataFast category", "Source", "Checked"],
        rows: [
          sourced(["GoogleOther", "Google", "Generic crawler, including internal research. Not tied to one product. [[5]]", n(GOOGLE_OTHER), "training"]),
          sourced(["OAI-SearchBot", "OpenAI", "Surfaces sites in ChatGPT search. Opt-out removes search answers. [[3]]", n(OAI_SEARCH), "search_index"]),
          sourced(["PerplexityBot", "Perplexity", "Search results. Not a foundation-model crawler. [[7]]", n(PERPLEXITY_BOT), "search_index"]),
          sourced(["ClaudeBot", "Anthropic", "Collects pages that may train Claude. [[4]]", n(CLAUDE_BOT), "training"]),
          sourced(["Googlebot", "Google", "Crawler for Google Search. [[5]]", n(GOOGLEBOT), "search_index"]),
          sourced(["ChatGPT-User", "OpenAI", "User-triggered. robots.txt may not apply. Not used for Search inclusion. [[3]]", n(CHATGPT), "answer_fetch"]),
          sourced(["Bingbot", "Microsoft", "Bing's standard crawler. [[9]]", n(BINGBOT), "search_index"]),
          sourced(["Applebot", "Apple", "Spotlight, Siri, and Safari search. Data may also train models. [[10]]", n(APPLEBOT), "training"]),
          sourced(["meta-externalagent", "Meta", "Vendor page returned HTTP 500. No purpose copied.", n(META_AGENT), "training"]),
          sourced(["GoogleAgent", "Google, DataFast label", "answer_fetch label. Google documents Google-Agent, a different spelling. [[6]]", n(GOOGLE_AGENT), "answer_fetch"]),
          sourced(["Claude-User", "Anthropic", "User-triggered. Honors robots.txt. [[4]]", n(CLAUDE_USER), "answer_fetch"]),
          sourced(["DuckAssistBot", "DuckDuckGo", "Real-time answers that cite sources. Not used for training. [[8]]", n(DUCK), "answer_fetch"]),
          sourced(["GPTBot", "OpenAI", "May train generative models. Independent of OAI-SearchBot. [[3]]", n(GPTBOT), "training"]),
          sourced(["Google-InspectionTool", "Google", "URL inspection and rich-result tests. Not Search ranking. [[5]]", n(INSPECTION), "search_index"]),
          sourced(["Claude-SearchBot", "Anthropic", "Indexes pages for Claude search. [[4]]", "0", "Absent"]),
          sourced(["Perplexity-User", "Perplexity", "User-triggered. Generally ignores robots.txt. [[7]]", "0", "Absent"]),
          sourced(["Google-Extended", "Google", "robots.txt token for Gemini training and grounding. No user agent. [[5]]", "—", "Not a fetcher"]),
        ],
      },
      {
        kind: "p",
        text: `Computed from the copied totals: PerplexityBot is ${sharePerplexityIndex} percent of indexing, OAI-SearchBot ${shareOaiIndex} percent, and GoogleOther ${shareGoogleOther} percent of training. OpenAI says OAI-SearchBot and GPTBot are independent in robots.txt, and that a search change can take about 24 hours. OAI-AdsBot is documented and absent. Apple's page, published 4 September 2026, calls Applebot a search crawler and says the data may also train models. DataFast filed the ${n(APPLEBOT)} Applebot requests as training. [[3]][[5]][[10]]`,
      },
    ],
  },
  {
    id: "which-days",
    title: "Which days carried the 196 answer fetches?",
    blocks: [
      {
        kind: "p",
        text: `Hourly buckets are sitewide and name no engine, so there is no per-engine day series. 167 buckets are present. The missing hour is 6 November, 00:00 IST, and the present buckets already sum to the window totals. Answer fetches by date are 0, 0, 5, 17, 35, 63, 76. 10 November is ${shareNov10} percent of the week (76 ÷ ${ANSWERS}, computed). First answer hour: 6 November, 10:00 IST, 3 fetches. Busiest: 10 November, 22:00 IST, 12 fetches. [[1]]`,
      },
      { kind: "chart", id: "daily-answers" },
      {
        kind: "table",
        caption: "Sitewide bot requests by Asia/Calcutta date, summed from the hourly export.",
        headers: ["Date", "Answers", "Indexing", "Training", "Total", "Hours present", "Source", "Checked"],
        rows: [
          sourced(["4 Nov 2026", "0", "64", "654", n(718), "24"]),
          sourced(["5 Nov 2026", "0", "90", "680", n(770), "24"]),
          sourced(["6 Nov 2026", "5", "53", "187", "245", "23"]),
          sourced(["7 Nov 2026", "17", n(1443), "318", n(1778), "24"]),
          sourced(["8 Nov 2026", "35", "688", n(1117), n(1840), "24"]),
          sourced(["9 Nov 2026", "63", n(1623), n(3638), n(5324), "24"]),
          sourced(["10 Nov 2026", "76", n(3882), n(2969), n(6927), "24"]),
        ],
      },
    ],
  },
  {
    id: "humans-and-robots",
    title: "How many humans arrived, and what does robots.txt allow?",
    blocks: [
      {
        kind: "p",
        text: `The human brief prints "2026-11-04 to 2026-11-11 IST (7 full days + today so far)." Generated at 6:46 a.m. IST, it marks 11 November partial: 7 visitors and 16 pageviews. The bot window ends at the close of 10 November. Referrers: ChatGPT ${CHATGPT_VISITORS}, Google ${GOOGLE_VISITORS}, Bing ${BING_VISITORS}, Direct/None 97, X 12, and one each from Medium, substack.com, intercom.com, and Product Hunt. No Perplexity, Claude, or DuckDuckGo row is printed. The ${GOOGLE_VISITORS} Google visitors are search referrals, separate from the ${n(GOOGLE_AGENT)} GoogleAgent fetches. The ${BING_VISITORS} Bing visitors are separate from Bingbot's ${n(BINGBOT)} indexing fetches. [[1]][[2]]`,
      },
      {
        kind: "p",
        text: `The sitemap on 11 November 2026 had ${n(SITEMAP_URLS)} URLs. ${n(SITEMAP_HIT)} were answer-fetched at least once (${SITEMAP_HIT} ÷ ${SITEMAP_URLS} is ${shareSitemap} percent, computed), with the query string stripped. Outside it: /robots.txt (11 fetches), two /pdf URLs, and /directory/everygen-ai. This report was not among the ${n(SITEMAP_URLS)}. [[13]]`,
      },
      {
        kind: "p",
        text: "The served robots.txt repeats Allow: / and Disallow: /api/ for * and for 24 named agents: Googlebot, Google-Extended, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Applebot, Applebot-Extended, CCBot, Meta-ExternalAgent, Meta-ExternalFetcher, Amazonbot, DuckAssistBot, cohere-ai, Bytespider, YouBot, Diffbot, and AI2Bot. GoogleOther, Google-InspectionTool, and Google-Agent are not named, so * covers them. OpenAI, Google, and Perplexity say user-triggered fetchers may ignore the file. Anthropic says Claude-User honors it. A DuckDuckGo Disallow takes 72 hours. [[3]][[4]][[6]][[7]][[8]][[12]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: `Write the homepage and the five trust pages as if ChatGPT will read them at answer time. This week that was ${n(HOME)} homepage fetches and ${n(TRUST)} trust-page fetches, against ${n(REPORT_ARTICLES)} fetches of report articles. Human analytics showed ${CHATGPT_VISITORS} ChatGPT visitors, in a window that includes the morning of 11 November, and missed the fetches. Claude-User opened /robots.txt on 6 of ${n(CLAUDE_USER)} fetches. DuckAssistBot opened it on 5 of ${n(DUCK)}. The file allows them and blocks only /api/. A fetch is not a citation. One site, one week.`,
      },
    ],
  },
  {
    id: "left-out",
    title: "What was left out?",
    blocks: [
      {
        kind: "p",
        text: "No per-engine day series and no raw User-Agent, so GoogleAgent stays separate from Google-Agent. No URL list for indexing or training: the pages payload is 39 answer-fetch paths and hasMore is false. Meta's crawler docs returned HTTP 500 on 11 November 2026, so meta-externalagent has no vendor purpose here. Counts stop at the end of 10 November. Search Console is not in the tables. The /pdf fetches and /directory/everygen-ai are not sitemap hits.",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [
      { kind: "h3", text: "Did an answer engine cite this site?" },
      {
        kind: "p",
        text: "The log counts fetches. It does not store the answer. A request is not a citation.",
      },
      { kind: "h3", text: "Why is the ChatGPT figure 40 to 1?" },
      {
        kind: "p",
        text: `Computed: ${CHATGPT} ChatGPT-User fetches in seven full days, divided by ${CHATGPT_VISITORS} referral visitors in a window that also includes part of 11 November. A fetch is a bot request. A visitor is a browser session. It is not a conversion rate.`,
      },
      { kind: "h3", text: "Does Google document GoogleAgent?" },
      {
        kind: "p",
        text: "Google documents Google-Agent, hyphenated, updated 2026-08-19 UTC. It does not document the spelling GoogleAgent. DataFast's label on the 16 fetches is GoogleAgent. The two strings are not merged.",
      },
      { kind: "h3", text: "Why did Claude-User fetch robots.txt six times?" },
      {
        kind: "p",
        text: "The export records the path, not a reason. Anthropic says Claude-User honors robots.txt. Six of twelve fetches were that file, as were five of DuckAssistBot's eight.",
      },
      { kind: "h3", text: "Should a builder block GPTBot because it barely visited?" },
      {
        kind: "p",
        text: `OpenAI treats GPTBot and OAI-SearchBot as independent. This file shows ${n(GPTBOT)} and ${n(OAI_SEARCH)}. This site allows both. This page does not recommend a change.`,
      },
    ],
  },
];

export const methodology = [
  `DataFast's bot-traffic route returned this export for Asia/Calcutta, interval hour, from 2026-11-03T18:30:00.000Z through 2026-11-10T18:29:59.999Z. Daily rows sum the hourly buckets. The sums match the window totals. IP verification is DataFast's flag: ${n(TOTAL)} of ${n(TOTAL)}. This page did not resolve the addresses again. Paths come from the answer_fetch pages payload, a window total. The sitemap count is the live file on 11 November 2026, ${n(SITEMAP_URLS)} URLs, matched after stripping a query string.`,
  "One site, seven days, 196 answer fetches. GoogleAgent put 14 of 16 fetches on one URL, so a share this size moves when one engine repeats a page. Human counts need a browser that runs the site script. Bot counts do not.",
  "Google's Search Status Dashboard, checked 11 November 2026, shows the November 2026 core update as an active ranking incident from 10 November 2026, 10:06 a.m. Pacific (11:36 p.m. IST, computed). The history list has no completed duration. Google says rollout may take up to two weeks. These tables are not Search Console. Impression swings from 11 November are rollout noise for Search Console only. [[11]]",
  "Nothing here is estimated. Counts are copied. A zero means the documented bot is absent from the crawler list. Shares and the 40-to-1 ratio are computed. A vendor purpose is copied only from a page that loaded on 11 November 2026.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "DataFast, Bot traffic API",
    url: "https://datafa.st/docs/api/website/bot-traffic",
    detail:
      "Checked 11 November 2026. Docs name the fields. Counts are this site's export for 4–10 November 2026, Asia/Calcutta, hourly, all IP-verified.",
  },
  {
    n: 2,
    title: "DataFast human referrers for aiagentsinfo.com",
    url: "https://datafa.st/",
    detail:
      'Generated 11 November 2026, 6:46 a.m. IST. Window on the brief: "2026-11-04 to 2026-11-11 IST (7 full days + today so far)." ChatGPT 4, Google 6, Bing 2. The homepage does not print these cells.',
  },
  {
    n: 3,
    title: "OpenAI, Overview of OpenAI Crawlers",
    url: "https://platform.openai.com/docs/bots",
    detail: "Checked 11 November 2026. Same overview at https://developers.openai.com/api/docs/bots. OAI-SearchBot, GPTBot, ChatGPT-User. OAI-AdsBot is documented and absent here.",
  },
  {
    n: 4,
    title: "Anthropic, Does Anthropic crawl data from the web?",
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    detail: 'Checked 11 November 2026. Help center: "Updated this week." ClaudeBot, Claude-User, Claude-SearchBot. Training-preference note dated 30 October 2026.',
  },
  {
    n: 5,
    title: "Google, common crawlers",
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers",
    detail: "Last updated 2026-10-30 UTC. Checked 11 November 2026. Googlebot, GoogleOther, Google-InspectionTool, Google-Extended. Google-Extended has no HTTP user agent.",
  },
  {
    n: 6,
    title: "Google, user-triggered fetchers",
    url: "https://developers.google.com/crawling/docs/crawlers-fetchers/google-user-triggered-fetchers",
    detail: "Last updated 2026-08-19 UTC. Checked 11 November 2026. Documents Google-Agent. Does not document the spelling GoogleAgent.",
  },
  {
    n: 7,
    title: "Perplexity Crawlers",
    url: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers",
    detail: "Checked 11 November 2026. PerplexityBot is for search results, not foundation-model training. Perplexity-User is user-triggered and generally ignores robots.txt.",
  },
  {
    n: 8,
    title: "DuckDuckGo, DuckAssistBot",
    url: "https://duckduckgo.com/duckduckgo-help-pages/results/duckassistbot",
    detail: "Checked 11 November 2026. Real-time answers, not training. robots.txt opt-out takes effect after 72 hours and does not change organic rankings.",
  },
  {
    n: 9,
    title: "Microsoft, Which crawlers does Bing use?",
    url: "https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0",
    detail: "Checked 11 November 2026. Bingbot is Bing's standard crawler.",
  },
  {
    n: 10,
    title: "Apple, About Applebot",
    url: "https://support.apple.com/en-us/119829",
    detail: "Published 4 September 2026. Checked 11 November 2026. Search in Spotlight, Siri, and Safari. Crawled data may also train models. Applebot-Extended does not crawl.",
  },
  {
    n: 11,
    title: "Google Search Status Dashboard",
    url: "https://status.search.google.com/",
    detail: "Checked 11 November 2026. November 2026 core update, ranking, start 10 November 2026, 10:06 a.m. Pacific, still active. History: https://status.search.google.com/summary.",
  },
  {
    n: 12,
    title: "aiagentsinfo.com robots.txt",
    url: "https://www.aiagentsinfo.com/robots.txt",
    detail: "Rule read from app/robots.txt/route.ts on 11 November 2026. Allow: / and Disallow: /api/ for * and each named agent.",
  },
  {
    n: 13,
    title: "aiagentsinfo.com sitemap",
    url: "https://www.aiagentsinfo.com/sitemap.xml",
    detail: `Fetched 11 November 2026. ${n(SITEMAP_URLS)} URLs. This report was not in that file yet.`,
  },
];

export const faq = [
  {
    question: "Did an answer engine cite this site?",
    answer: "The log counts fetches. It does not store the answer. A request is not a citation.",
  },
  {
    question: "Why is the ChatGPT figure 40 to 1?",
    answer: `Computed: ${CHATGPT} ChatGPT-User fetches in seven full days, divided by ${CHATGPT_VISITORS} referral visitors in a window that also includes part of 11 November. A fetch is a bot request. A visitor is a browser session. It is not a conversion rate.`,
  },
  {
    question: "Does Google document GoogleAgent?",
    answer:
      "Google documents Google-Agent, hyphenated, updated 2026-08-19 UTC. It does not document the spelling GoogleAgent. DataFast's label on the 16 fetches is GoogleAgent. The two strings are not merged.",
  },
  {
    question: "Why did Claude-User fetch robots.txt six times?",
    answer:
      "The export records the path, not a reason. Anthropic says Claude-User honors robots.txt. Six of twelve fetches were that file, as were five of DuckAssistBot's eight.",
  },
  {
    question: "Should a builder block GPTBot because it barely visited?",
    answer: `OpenAI treats GPTBot and OAI-SearchBot as independent. This file shows ${n(GPTBOT)} and ${n(OAI_SEARCH)}. This site allows both. This page does not recommend a change.`,
  },
];

function blockWords(block: ReportChapter["blocks"][number]) {
  if (block.kind === "p" || block.kind === "h3") return block.text;
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

/** Body, tables, and FAQ. Source notes sit under Sources and are not in this minute count. */
const bodyWords = bodyCopy().trim().split(/\s+/).filter(Boolean).length;
/**
 * Daily briefs use the 6–8 minute band in the report playbook (about 1,500–2,500 words).
 * The harness benchmark uses a fixed minute count in that band. 220 words per minute
 * would print a longer badge for the same band, so the badge stays at 8 when the body is inside it.
 */
export const readingMinutes = bodyWords >= 1500 && bodyWords <= 2500 ? 8 : readingTime(bodyCopy());
