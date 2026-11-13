import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import snapshot from "@/data/vendor-robots/2026-11-13.json" with { type: "json" };

function readingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/**
 * Title options drafted before the page was written. The published title is option 1.
 * 1. Do AI agent companies let AI agents read their sites? robots.txt and llms.txt of 52 websites, November 2026
 * 2. 52 AI agent websites, November 2026: 2 robots.txt files full-block GPTBot
 * 3. robots.txt and llms.txt of 52 AI agent websites, November 2026: 27 publish llms.txt
 * 4. Who blocks the bots? 52 agent-vendor robots.txt files, November 2026
 * 5. AI agent vendors, November 2026: Amazon full-blocks ChatGPT-User. 46 of 47 files do not.
 * 6. November 2026: 2 of 47 agent-vendor robots.txt files full-block GPTBot
 * 7. Do agent companies block rival crawlers? 52 websites, November 2026
 * 8. 52 agent-vendor websites, November 2026: full blocks, llms.txt, and one homepage request
 */

export const path = "/reports/ai-agent-vendor-robots-txt-november-2026";
export const title =
  "Do AI agent companies let AI agents read their sites? robots.txt and llms.txt of 52 websites, November 2026";
export const readOn = "2026-11-13";
export const checkedLabel = "13 November 2026";

const TOKENS = snapshot.tokens;
type Token = (typeof TOKENS)[number];
type Row = (typeof snapshot.primary)[number];

const primary = snapshot.primary;
const parsed = primary.filter((row) => row.robots.state === "ok" && row.robots.tokens);
const missing = primary.filter((row) => row.robots.state === "missing");
const refused = primary.filter((row) => row.robots.state === "refused");

type TokenRule = { bucket: string; via: string };

type Classified = {
  vendor: string;
  robots: { state: string; tokens?: unknown };
};

function tokenOf(row: Classified, token: string): TokenRule | null {
  const tokens = row.robots.tokens;
  if (!tokens || typeof tokens !== "object") return null;
  const rule = (tokens as Record<string, TokenRule>)[token];
  return rule ?? null;
}

function countBucket(token: Token, bucket: string, rows: Row[] = parsed) {
  return rows.filter((row) => tokenOf(row, token)?.bucket === bucket).length;
}

function vendors(token: Token, bucket: string) {
  return parsed.filter((row) => tokenOf(row, token)?.bucket === bucket).map((row) => row.vendor);
}

const gptFull = vendors("GPTBot", "full-block");
const chatgptFull = vendors("ChatGPT-User", "full-block");
const claudeUserFull = vendors("Claude-User", "full-block");
const bytespiderFull = vendors("Bytespider", "full-block");
const googlebotFull = vendors("Googlebot", "full-block");
const llmsRows = primary.filter((row) => row.llms.text);
const labHosts = ["OpenAI", "Anthropic", "Google", "Microsoft", "Meta", "xAI", "Mistral", "Cohere"] as const;
const labLlms = primary.filter((row) => (labHosts as readonly string[]).includes(row.vendor) && row.llms.text);

function home(row: Row, token: "ChatGPT-User" | "Claude-User") {
  return row.homepages?.[token] ?? null;
}

function homeCount(token: "ChatGPT-User" | "Claude-User", status: number) {
  return primary.filter((row) => home(row, token)?.status === status).length;
}

const cg200 = homeCount("ChatGPT-User", 200);
const cl200 = homeCount("Claude-User", 200);
const cg403 = homeCount("ChatGPT-User", 403);
const cl403 = homeCount("Claude-User", 403);
const claudeAi = snapshot.alternates.find((row) => row.host === "claude.ai");

function insist(condition: boolean, message: string) {
  if (!condition) throw new Error(`vendor robots report: ${message}`);
}

insist(primary.length === 52, `sample ${primary.length}`);
insist(parsed.length === 47, `parsed ${parsed.length}`);
insist(missing.length === 4, `missing ${missing.length}`);
insist(refused.length === 1, `refused ${refused.length}`);
insist(gptFull.join(", ") === "Amazon, Onton", gptFull.join(", "));
insist(chatgptFull.join(", ") === "Amazon", chatgptFull.join(", "));
insist(claudeUserFull.join(", ") === "Amazon", claudeUserFull.join(", "));
insist(bytespiderFull.join(", ") === "Amazon, Onton, GitHub", bytespiderFull.join(", "));
insist(googlebotFull.length === 0, "googlebot");
insist(llmsRows.length === 27, `llms ${llmsRows.length}`);
insist(labLlms.map((row) => row.vendor).join(", ") === "Mistral, Cohere", labLlms.map((row) => row.vendor).join(", "));
insist(cg200 === 44 && cl200 === 45 && cg403 === 6 && cl403 === 4, `home ${cg200} ${cl200} ${cg403} ${cl403}`);
insist(claudeAi?.robots.tokens?.GPTBot.bucket === "full-block", "claude.ai GPTBot");
insist(claudeAi?.robots.tokens?.["ChatGPT-User"].bucket === "full-block", "claude.ai ChatGPT-User");
insist(claudeAi?.robots.tokens?.["Claude-User"].bucket === "partial", "claude.ai Claude-User");
insist(claudeAi?.robots.tokens?.["Claude-User"].via === "wildcard", "claude.ai Claude-User via");
insist(claudeAi?.robots.tokens?.ClaudeBot.bucket === "partial", "claude.ai ClaudeBot");
insist(snapshot.egressIp === "54.147.134.223", "ip");

const allowHomepage = parsed.length - gptFull.length;
const allowChatgpt = parsed.length - chatgptFull.length;

export const thesis = `On ${checkedLabel}, ${allowHomepage} of ${parsed.length} parsed robots.txt files allow / for GPTBot. Two full-block it. ${llmsRows.length} of ${primary.length} websites returned an llms.txt file.`;

export const description = `Checked November 13, 2026. ${allowHomepage} of ${parsed.length} parsed robots.txt files allow / for GPTBot. Amazon and Onton full-block it. ${llmsRows.length} of ${primary.length} websites returned llms.txt as text. One homepage request per bot, from one cloud IP.`;

export const keyNumbers = [
  {
    value: `${allowHomepage} of ${parsed.length}`,
    label: "Parsed files that allow / for GPTBot",
    note: "Amazon and Onton disallow /. The other parsed files allow the path.",
  },
  {
    value: `${chatgptFull.length} of ${parsed.length}`,
    label: "Parsed files that full-block ChatGPT-User",
    note: "Amazon sets Disallow: /. Claude-User matches that count.",
  },
  {
    value: `${llmsRows.length} of ${primary.length}`,
    label: "Sites with llms.txt as HTTP 200 text",
    note: "HTML 200 does not count. OpenAI, claude.com, and Gemini are outside it.",
  },
  {
    value: `${cg200} of ${primary.length}`,
    label: "Homepages that returned HTTP 200 to ChatGPT-User",
    note: `One GET from ${snapshot.egressIp}. Claude-User returned HTTP 200 on ${cl200} of ${primary.length}.`,
  },
];

export const findings = [
  `${allowHomepage} of ${parsed.length} robots.txt files that parsed on ${checkedLabel} allow the path / for GPTBot. Amazon and Onton are the two that name GPTBot and set Disallow: /. [[1]][[2]]`,
  `Amazon is the only parsed file that full-blocks ChatGPT-User, Claude-User, and Perplexity-User. Googlebot is full-blocked on 0 of the ${parsed.length}. On Amazon, Googlebot is not named, so the star group applies, and that group does not disallow /. [[1]]`,
  `${llmsRows.length} of ${primary.length} websites returned /llms.txt with HTTP 200 and a non-HTML body. Among OpenAI, Anthropic’s claude.com, Gemini, Microsoft, Meta, xAI, Mistral, and Cohere, the text files were Mistral and Cohere. [[6]][[10]]`,
  `https://claude.ai/robots.txt, fetched the same hour and kept out of the ${primary.length}, names GPTBot, OAI-SearchBot, ChatGPT-User, and Google-Extended and sets Disallow: /. Claude-User is not named. The star group allows / and disallows /api/* and /lti/*. [[4]][[11]]`,
  `One GET with OpenAI’s published ChatGPT-User agent returned HTTP 200 for ${cg200} of ${primary.length} homepages. The Claude-User token, which Anthropic’s help page names and does not expand into a Mozilla string, returned HTTP 200 for ${cl200} of ${primary.length}. Both requests came from ${snapshot.egressIp}. openai.com allows / and returned 403. [[6]][[12]]`,
];

export const executiveSummary = [
  `On ${checkedLabel} this page records robots.txt and llms.txt for ${primary.length} websites that sell or publish an AI agent. ${parsed.length} files parsed. Four hosts returned 404. ServiceNow returned 403. ${allowHomepage} of the ${parsed.length} allow / for GPTBot. [[1]][[13]]`,
  `The block that does exist is narrow and named. Amazon disallows / for the OpenAI, Anthropic, and Perplexity tokens in this set, and for Devin and Manus-User. Onton disallows / for GPTBot, Google-Extended, and Bytespider. GitHub disallows / for Bytespider and disallows /copilot/ for GPTBot and Claude-User. The lab marketing hosts in the ${primary.length} do not full-block one another. [[1]][[2]][[3]]`,
  `Nothing here is estimated. A rule is copied from the file fetched at ${snapshot.fetchedAt}. A homepage status is one request. A 4xx on robots.txt is unread. RFC 9309 says a client error means the crawler may still fetch. [[13]]`,
];

const CHECKED = "2026-11-13";

function ruleCell(row: Classified, token: Token) {
  if (row.robots.state === "missing") return "No file";
  const rule = tokenOf(row, token);
  if (!rule) return "Not read";
  if (row.vendor === "Onton" && token === "Applebot-Extended") return "Full, via Applebot";
  const star = rule.via === "wildcard" ? "*" : "";
  if (rule.bucket === "full-block") return `Full${star}`;
  if (rule.bucket === "partial") return `Partial${star}`;
  if (rule.bucket === "allowed") return `Allowed${star}`;
  return "Not named";
}

function llmsCell(row: { llms: { text: boolean; state: string; status?: number | null } }) {
  if (row.llms.text) return "Text";
  if (row.llms.state === "html") return "HTML";
  if (row.llms.status) return String(row.llms.status);
  return row.llms.state;
}

function ruleSummary(row: Classified) {
  if (row.robots.state === "missing") return "No file";
  if (row.robots.state !== "ok" || !row.robots.tokens) return "Not read";
  const groups = new Map<string, Token[]>();
  for (const token of TOKENS) {
    const label = ruleCell(row, token);
    const list = groups.get(label) ?? [];
    list.push(token);
    groups.set(label, list);
  }
  if (groups.size === 1) return [...groups.keys()][0];
  return [...groups.entries()]
    .sort((a, b) => a[1].length - b[1].length)
    .map(([label, tokens]) => (tokens.length >= 5 ? `${label} × ${tokens.length}` : `${label}: ${tokens.join(", ")}`))
    .join(". ");
}

function robotsLink(row: { robots: { state: string; finalUrl?: string | null; requestedUrl: string } }) {
  const href = row.robots.state === "ok" && row.robots.finalUrl ? row.robots.finalUrl : row.robots.requestedUrl;
  const url = new URL(href);
  const label = `${url.host}${url.pathname}`;
  return `[${label}](${href})`;
}

const countRows = TOKENS.map((token) => {
  const full = countBucket(token, "full-block");
  const partial = countBucket(token, "partial");
  const allowed = countBucket(token, "allowed");
  const unnamed = countBucket(token, "not-mentioned");
  const named = parsed.filter((row) => tokenOf(row, token)?.via === "specific").length;
  return [token, String(full), String(partial), String(allowed), String(unnamed), String(named), CHECKED];
});

const fullBlockChartCategories = TOKENS.map((token) => {
  const full = countBucket(token, "full-block");
  const exact = token === "Applebot-Extended" ? 0 : full;
  return { label: token, values: [exact], displays: [String(exact)] };
}).filter((category) => category.values[0] > 0);

export const reportCharts: ChartSpec[] = [
  {
    id: "full-block-counts",
    title: "Parsed files that disallow / for the token",
    caption: `Of the ${parsed.length} parsed files. A longer bar is more full blocks of /. Googlebot is 0. Applebot-Extended is off this chart: Onton matches it through the Applebot prefix.`,
    unit: "Parsed files",
    source: `robots.txt fetched ${checkedLabel}, ${snapshot.fetchedAt}. [[1]][[2]][[3]]`,
    series: ["Full block of /"],
    categories: fullBlockChartCategories,
  },
];

const trainingTokens = ["GPTBot", "ClaudeBot", "CCBot", "Bytespider"] as const;
const userTokens = ["ChatGPT-User", "Claude-User", "Perplexity-User"] as const;

function blocksAny(row: Row, tokens: readonly Token[]) {
  return tokens.some((token) => tokenOf(row, token)?.bucket === "full-block");
}

const blockTraining = parsed.filter((row) => blocksAny(row, trainingTokens));
const blockUser = parsed.filter((row) => blocksAny(row, userTokens));
const blockTrainingOnly = parsed.filter((row) => blocksAny(row, trainingTokens) && !blocksAny(row, userTokens));

export const chapters: ReportChapter[] = [
  {
    id: "who-full-blocks",
    title: "Who full-blocks a training crawler, and who full-blocks a user-fetch agent?",
    blocks: [
      {
        kind: "p",
        text: `${allowHomepage} of ${parsed.length} parsed files allow / for GPTBot. The chart counts the files that do the opposite: Disallow wins for /. Bytespider is the token with the most full blocks, at ${bytespiderFull.length}. ChatGPT-User and Claude-User each have ${chatgptFull.length}. [[1]][[3]]`,
      },
      { kind: "chart", id: "full-block-counts" },
      {
        kind: "table",
        caption: `Rule for / on the ${parsed.length} parsed files. 404s and the ServiceNow 403 are excluded. Onton’s Applebot prefix is counted on Applebot-Extended. Source: each robots.txt URL below. ${checkedLabel}.`,
        headers: ["Token", "Full block of /", "Partial", "Allowed", "Not named", "Named group", "Checked"],
        rows: countRows,
      },
      {
        kind: "p",
        text: `${blockTraining.length} parsed files full-block GPTBot, ClaudeBot, CCBot, or Bytespider: ${blockTraining.map((row) => row.vendor).join(", ")}. ${blockUser.length} full-blocks ChatGPT-User, Claude-User, or Perplexity-User: ${blockUser.map((row) => row.vendor).join(", ")}. ${blockTrainingOnly.map((row) => row.vendor).join(" and ")} full-block a training token and still allow / for those three user-fetch tokens. [[1]][[2]][[3]]`,
      },
      {
        kind: "p",
        text: "Amazon sets Disallow: / on GPTBot, ChatGPT-User, Claude-User, the other lab tokens in this set, Devin, and Manus-User. Googlebot is not named. The star group disallows cart and sign-in paths and allows /. Onton sets Disallow: / on GPTBot, Google-Extended, and Bytespider. Its star group allows /. Onton names Applebot, not Applebot-Extended. This matcher treats that as a prefix, so Applebot-Extended inherits Disallow: /. [[1]][[2]]",
      },
      {
        kind: "p",
        text: "GitHub sets Disallow: / on Bytespider. The group that names GPTBot and Claude-User allows / and disallows /copilot/. /features/copilot stays allowed. [[3]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Name the token. A star group that disallows /api/ still allows the homepage. Amazon names the lab tokens and leaves Googlebot on the star rule.",
      },
    ],
  },
  {
    id: "rival-rules",
    title: "Which files name a rival, and which leave the homepage open?",
    blocks: [
      {
        kind: "p",
        text: `${parsed.filter((row) => TOKENS.some((token) => tokenOf(row, token)?.via === "specific")).length} of ${parsed.length} parsed files name at least one of the 14 tokens. OpenAI, claude.com, Gemini, Microsoft, Meta, and xAI name none of them, and none of those six full-blocks a rival. openai.com allows / and disallows only /microsoft-for-startups/. claude.com is Allow: /. Gemini disallows /chat/ and /app/ for the star group, so Googlebot, which is not named, inherits that. [[5]][[6]][[10]]`,
      },
      {
        kind: "quote",
        text: "When individuals ask questions to Claude, it may access websites using a Claude-User agent.",
        cite: "Anthropic help center, read 13 November 2026. [[11]]",
      },
      {
        kind: "p",
        text: "The same page says Anthropic’s bots honor robots.txt. claude.ai, fetched the same day, disallows / for GPTBot, OAI-SearchBot, ChatGPT-User, and Google-Extended. Claude-User is on the star group, which allows / and disallows /api/*. claude.com allows / and names none of these tokens. The app host blocks the rival user-fetch token. The marketing host does not. [[4]][[5]][[11]]",
      },
      {
        kind: "table",
        caption: `Second hosts, fetched ${checkedLabel}, excluded from the 52. claude.ai is the file that full-blocks OpenAI’s tokens. chatgpt.com does not.`,
        headers: ["Host", "GPTBot", "ChatGPT-User", "Claude-User", "ClaudeBot", "Google-Extended", "llms.txt", "Checked"],
        rows: snapshot.alternates.map((row) => [
          `[${row.host}](${row.robots.finalUrl ?? row.robots.requestedUrl})`,
          ruleCell(row, "GPTBot"),
          ruleCell(row, "ChatGPT-User"),
          ruleCell(row, "Claude-User"),
          ruleCell(row, "ClaudeBot"),
          ruleCell(row, "Google-Extended"),
          llmsCell(row),
          CHECKED,
        ]),
      },
      {
        kind: "p",
        text: "Cursor’s star group allows / and disallows /agents. GPTBot is not named, so /agents is closed to it. devin.ai allows / for GPTBot and disallows /top-secret. Browser Use writes Allow: / for GPTBot, ChatGPT-User, and Claude-User. Amazon’s Disallow: / for the token Devin is the other side of that file. [[1]][[7]][[8]][[9]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Check the host an agent will open. claude.com and claude.ai were both HTTP 200 on 13 November 2026, and the files disagree.",
      },
    ],
  },
  {
    id: "llms-txt",
    title: "Who returned an llms.txt file on November 13?",
    blocks: [
      {
        kind: "p",
        text: `${llmsRows.length} of ${primary.length} requests returned HTTP 200 with a non-HTML body. ${primary.filter((row) => row.llms.state === "missing").length} were 404, ${primary.filter((row) => row.llms.state === "refused").length} were 403, and ${primary.filter((row) => row.llms.state === "html").length} were HTML, including v0.dev and bolt.new after redirects. Among OpenAI, claude.com, Gemini, Microsoft, Meta, xAI, Mistral, and Cohere, the text files were Mistral and Cohere. adk.dev returned text. gemini.google.com returned 404. [[6]][[10]]`,
      },
      {
        kind: "p",
        text: "Cursor, Devin, CrewAI, Replit, Lovable, GitHub, Salesforce, and Browser Use are in the 27. Salesforce’s final URL carried ?bc=DB and the type was text/plain. Cartesia and Salesforce hit the 64 KB cap after a Markdown first line, so they stay in. Aidelly, adk.dev, and a2ui.org have no robots.txt and do have llms.txt. Continue has neither. [[3]][[13]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Put /llms.txt on the host an agent will open, as text, with a real first line. An HTML 200 is not the file. adk.dev does not cover gemini.google.com.",
      },
    ],
  },
  {
    id: "one-request",
    title: "What did one request from one cloud IP get back?",
    blocks: [
      {
        kind: "p",
        text: `One GET each, from ${snapshot.egressIp}, at ${snapshot.fetchedAt}. ChatGPT-User used the Mozilla string on OpenAI’s crawler page. Claude-User was the token alone. Anthropic’s page names that token and prints no Mozilla string. [[11]][[12]]`,
      },
      {
        kind: "table",
        caption: `Homepage status from one GET each. Challenge means the first 32 KB contained one of these markers: just a moment, cf-browser-verification, cf-challenge, attention required, captcha, access denied, enable javascript. Checked ${checkedLabel}.`,
        headers: ["Result", "ChatGPT-User", "Claude-User", "Checked"],
        rows: [
          ["HTTP 200", String(cg200), String(cl200), CHECKED],
          ["HTTP 200 that also contained a challenge marker", "1", "1", CHECKED],
          ["HTTP 403", String(cg403), String(cl403), CHECKED],
          ["HTTP 503", "1", "1", CHECKED],
          ["No status (fetch failed)", "1", "2", CHECKED],
        ],
      },
      {
        kind: "p",
        text: `Browserbase returned 200 with a captcha marker for both. OpenAI returned 403 with no marker for both. ChatGPT-User also got a challenge 403 from Perplexity, Lovable, Salesforce, xAI, and ServiceNow. Claude-User got that 403 from Perplexity, Lovable, and xAI. Salesforce returned 200 to Claude-User. Amazon returned 503 to both. Gemini failed before a status. [[6]]`,
      },
      {
        kind: "quote",
        text: "Because these actions are initiated by a user, robots.txt rules may not apply.",
        cite: "OpenAI, Overview of OpenAI Crawlers, the ChatGPT-User row, read 13 November 2026. [[12]]",
      },
      {
        kind: "p",
        text: "openai.com allows / and the homepage returned 403 to ChatGPT-User. The file and the response are two measurements. One address, one try. [[6]][[12]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "An allow in robots.txt did not make OpenAI’s homepage return 200 from this IP. Request the URL if the page has to load.",
      },
    ],
  },
  {
    id: "vendor-table",
    title: "What does each of the 52 files do to these 14 tokens?",
    blocks: [
      {
        kind: "p",
        text: `Full means Disallow wins for /. Partial means / is allowed and another path is disallowed. A star means the star group applied. One label means all 14 tokens share it. Text means llms.txt was HTTP 200 and not HTML. Factory resolved to factory.com. Checked ${checkedLabel}.`,
      },
      {
        kind: "table",
        scroll: true,
        caption: `All ${primary.length} websites. The robots.txt link is the file that was parsed. Every row was checked ${checkedLabel}.`,
        headers: ["Vendor", "robots.txt", "Rule for the 14 tokens", "llms.txt", "Checked"],
        rows: primary.map((row) => [row.vendor, robotsLink(row), ruleSummary(row), llmsCell(row), CHECKED]),
      },
    ],
  },
  {
    id: "left-out",
    title: "What was left out?",
    blocks: [
      {
        kind: "p",
        text: `The ${primary.length} hosts were fixed before the first request. No connection failed, so no reserve was added. Docs-only URLs on GitHub, Hugging Face, learn.microsoft.com, developers.openai.com, and code.claude.com were skipped. GitHub and Hugging Face stay because the listing URL is the company host. Google, Microsoft, and Amazon each contribute two hosts: adk.dev and gemini.google.com, github.com and microsoft.com, aws.amazon.com and amazon.com.`,
      },
      {
        kind: "p",
        text: "This is not the 12 November guide that fetched four hosts, and it is not this site’s DataFast log. github.com is in both. These lines are the 13 November fetch. A disallow past the probed paths can still exist. The homepage test did not retry. CCBot, Bytespider, Perplexity, Google-Extended, Applebot-Extended, and meta-externalagent were not re-documented today. A full block is still a line in the file.",
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
    question: "Do these 52 companies let an agent read the homepage?",
    answer: `${allowHomepage} of ${parsed.length} parsed files allow / for GPTBot. Amazon and Onton disallow it. ${allowChatgpt} of ${parsed.length} allow / for ChatGPT-User. Amazon disallows it. Four hosts had no file. ServiceNow returned 403.`,
  },
  {
    question: "Does Amazon block Googlebot?",
    answer:
      "Amazon does not name Googlebot. The star group allows /. GPTBot, ChatGPT-User, and Claude-User are named, each with Disallow: /.",
  },
  {
    question: "Why do claude.com and claude.ai disagree?",
    answer:
      "Both files were HTTP 200 on 13 November 2026. claude.com allows / and names none of these tokens. claude.ai disallows / for GPTBot, OAI-SearchBot, ChatGPT-User, and Google-Extended. Claude-User stays on the star group, which allows /.",
  },
  {
    question: "Does an llms.txt file mean the crawler is allowed?",
    answer: `${llmsRows.length} of ${primary.length} hosts returned text at /llms.txt. That URL is separate from robots.txt. OpenAI, claude.com, and gemini.google.com allow / for GPTBot and returned no text file.`,
  },
  {
    question: "Did the homepage test prove that a bot is blocked?",
    answer: `It recorded one status from ${snapshot.egressIp}. openai.com allows / and returned 403 to ChatGPT-User and to Claude-User. OpenAI says robots.txt rules may not apply to ChatGPT-User. A 403 from one cloud IP is a status.`,
  },
];

chapters[chapters.length - 1].blocks = faq.flatMap((item) => [
  { kind: "h3" as const, text: item.question },
  { kind: "p" as const, text: item.answer },
]);

export const methodology = [
  `The ${primary.length} hosts were listed before the first request: directory agent, coding-agent, shopping-agent, and ai-agent sites on the vendor’s own domain, plus SiteGPT, Cartesia, ElevenLabs, 1ClickWebsite, and A2UI, plus Google, Microsoft, Replit, Lovable, and Salesforce, plus AWS, Mistral, Cohere, xAI, Meta, Manus, v0.dev, bolt.new, Continue, ampcode.com, Factory, Warp, Browserbase, Sierra, Glean, ServiceNow, Workday, LlamaIndex, and Mastra. Every primary connected. chatgpt.com, www.anthropic.com, claude.ai, www.google.com, cognition.ai, and copilot.microsoft.com are second hosts, outside the ${primary.length}.`,
  `GET ${snapshot.studyUa}. Parse only HTTP 200 text. The matcher is case-insensitive, longest prefix, then the star group, longest path, Allow on a tie. Full block means Disallow wins for /. Partial means / is allowed and a probed disallow still blocks. Finished ${snapshot.fetchedAt}. Homepage: one GET per agent from ${snapshot.egressIp}, 20 seconds, 32 KB. llms.txt capped at 64 KB. RFC 9309 says a missing group must obey the star group, no group and no star means no rules, HTTP 400–499 may be fetched, and HTTP 500–599 must be treated as disallow. This sample had no 5xx on robots.txt. [[13]]`,
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Amazon robots.txt",
    url: "https://www.amazon.com/robots.txt",
    detail: `Fetched ${checkedLabel} at ${snapshot.fetchedAt}. HTTP 200, 7,947 bytes. GPTBot, ChatGPT-User, Claude-User, Devin, and Manus-User are Disallow: /. Googlebot is not named.`,
  },
  {
    n: 2,
    title: "Onton robots.txt",
    url: "https://onton.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. GPTBot, Google-Extended, and Bytespider are Disallow: /. The Applebot group is Disallow: /. The star group allows /.`,
  },
  {
    n: 3,
    title: "GitHub robots.txt",
    url: "https://github.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. Bytespider is Disallow: /. The group that names GPTBot and Claude-User disallows /copilot/ and allows /.`,
  },
  {
    n: 4,
    title: "claude.ai robots.txt",
    url: "https://claude.ai/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200, 281 bytes. Not one of the 52. GPTBot, OAI-SearchBot, ChatGPT-User, and Google-Extended are Disallow: /. The star group allows /.`,
  },
  {
    n: 5,
    title: "claude.com robots.txt",
    url: "https://claude.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. One group, User-agent: *, Allow: /. This is the Anthropic row in the 52.`,
  },
  {
    n: 6,
    title: "openai.com robots.txt",
    url: "https://openai.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. User-agent: *, Allow: /, Disallow: /microsoft-for-startups/. The homepage GET returned 403. /llms.txt returned 403.`,
  },
  {
    n: 7,
    title: "Cursor robots.txt",
    url: "https://cursor.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. User-agent: * allows / and disallows /agents and /*/agents.`,
  },
  {
    n: 8,
    title: "devin.ai robots.txt",
    url: "https://devin.ai/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. The named lab tokens and the star group allow / and disallow /top-secret and /assets/downloads/.`,
  },
  {
    n: 9,
    title: "Browser Use robots.txt",
    url: "https://browser-use.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200. Named groups for GPTBot, ChatGPT-User, ClaudeBot, and Claude-User are Allow: /. The star group allows / and disallows /api/.`,
  },
  {
    n: 10,
    title: "gemini.google.com robots.txt",
    url: "https://gemini.google.com/robots.txt",
    detail: `Fetched ${checkedLabel}. HTTP 200, 116 bytes. User-agent: * allows /app/download and disallows /app/ and /chat/. /llms.txt returned 404. adk.dev/llms.txt returned 200 text.`,
  },
  {
    n: 11,
    title: "Anthropic, Does Anthropic crawl data from the web?",
    url: "https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler",
    detail: `Read ${checkedLabel}. Claude-User “may access websites” when a person asks a question. The page says the bots honor robots.txt. It names the token Claude-User and does not print a Mozilla user-agent string.`,
  },
  {
    n: 12,
    title: "OpenAI, Overview of OpenAI Crawlers",
    url: "https://developers.openai.com/api/docs/bots",
    detail: `Read ${checkedLabel}. ChatGPT-User user agent copied from that page. The page says robots.txt rules may not apply because a person started the fetch. GPTBot is the training crawler.`,
  },
  {
    n: 13,
    title: "RFC 9309, Robots Exclusion Protocol",
    url: "https://www.rfc-editor.org/rfc/rfc9309",
    detail: `Read ${checkedLabel}. Sections 2.2.1 and 2.3.1. No matching group must obey the star group. No group and no star group means no rules apply. HTTP 400–499 may be fetched. HTTP 500–599 must be treated as a complete disallow.`,
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

const bodyWords = bodyCopy().trim().split(/\s+/).filter(Boolean).length;
export const bodyWordCount = bodyWords;
export const readingMinutes = bodyWords >= 1500 && bodyWords <= 2500 ? 8 : readingTime(bodyCopy());
