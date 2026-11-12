import type { ChartSpec, ReportChapter } from "@/lib/report-model";
import { readingTime } from "@/lib/utils";

export const path = "/reports/ai-agent-frameworks-next-6-months";
export const title =
  "AI agent frameworks, Nov 2026 to May 2027: Pydantic AI 2.68.0 shipped today. The Agents SDK stable tag did not.";
export const thesis =
  "Eight frameworks have a tag you can pin. None of them has published a release date between December 2026 and May 2027.";
export const description =
  "Where LangGraph, the OpenAI Agents SDK, Google ADK, CrewAI, Microsoft Agent Framework, Mastra, Pydantic AI, and the Claude Agent SDK are heading through May 2027. Stars and tags read from GitHub on November 12, 2026. No roadmap date was on the releases.";
export const readOn = "2026-11-12";

const stars = {
  langgraph: 44831,
  langgraphNov5: 44482,
  crew: 60797,
  crewNov5: 60514,
  microsoft: 14642,
  microsoftNov5: 14539,
  openai: 30631,
  openaiNov5: 30508,
  adk: 22186,
  adkNov5: 22109,
  pydantic: 21155,
  pydanticNov5: 21032,
  mastra: 29479,
  mastraNov5: 29339,
  claude: 8527,
  claudeNov5: 8430,
  a2a: 26501,
};

function delta(now: number, then: number) {
  return now - then;
}

export const keyNumbers = [
  {
    value: "v2.68.0",
    label: "Pydantic AI, published today",
    note: "GitHub published_at 2026-11-12 01:56 UTC. The release name says 2026-11-11. The tag is the third stable in eight days.",
  },
  {
    value: "Oct 15",
    label: "newest stable Agents SDK tag",
    note: "v0.24.0. A newer tag exists, v0.24.0-alpha.7, published November 8, and GitHub marks it prerelease.",
  },
  {
    value: "0",
    label: "dated releases through May 2027",
    note: "None of these eight repositories, A2A, or the MCP Python SDK printed a future release day on the tags read November 12.",
  },
  {
    value: "+349",
    label: "LangGraph stars since November 5",
    note: "44,831 minus 44,482. Two GitHub reads, seven days. Not a run rate.",
  },
];

export const findings = [
  "Pydantic AI v2.68.0 was published at 01:56 UTC on November 12. v2.67.0 was November 10. v2.66.0 was November 4. The cadence is the fact. The notes do not name a December feature.",
  "OpenAI’s newest stable tag is still v0.24.0 from October 15. The newest tag overall is v0.24.0-alpha.7, a prerelease from November 8 that keeps a classic runtime beside a native one. A prerelease is not a stable pin.",
  "Google ADK v2.14.0, published November 7, says A2A, evaluation, execution environments, and core runtime modules graduated from experimental. The A2A repository’s own latest release is still v1.0.1 from May 28, 2026.",
  "Microsoft Agent Framework python-1.25.0, published November 7, drops Python 3.10 and adds callable MCP approval policies. Mastra’s latest tag is still @mastra/core@1.82.0 from November 4, even though the repo was pushed on November 12.",
];

export const executiveSummary = [
  "The six-month question builders actually have is which framework is still shipping, not which one will win. On the morning of November 12, 2026, GitHub’s API returned a stable tag from the last eight days for Pydantic AI, CrewAI, the Claude Agent SDK, Google ADK, and Microsoft Agent Framework. LangGraph’s newest tag is an SDK package from November 6. Mastra’s newest tag is November 4. OpenAI’s newest stable tag is October 15. [[1]][[2]][[3]][[4]][[5]][[6]][[7]][[8]]",
  "None of those release notes prints a day between December 2026 and May 12, 2027. A2A’s latest release remains v1.0.1, published May 28, 2026, with 26,501 stars on the same read. The MCP Python SDK’s latest tag remains v2.3.0 from October 2. The next protocol date this site already carries, July 28, 2027 for MCP removal eligibility, sits outside this window. It stays on the [twelve-month outlook](/reports/ai-agents-next-12-months). [[9]][[10]]",
  "Stars moved, and they are the wrong ranking. From the November 5 snapshot to the November 12 read, LangGraph gained 349 stars, CrewAI 283, Mastra 140, the Agents SDK and Pydantic AI 123 each. CrewAI still leads this set at 60,797. The [November 5 table](/reports/ai-agent-framework-github-stats-november-2026) is the census. This page is the week after it, and the months that have no date. The [harness benchmark](/reports/agent-harness-benchmark-november-2026) is where a score lives. A star count is not one.",
];

export const reportCharts: ChartSpec[] = [
  {
    id: "days-since-tag",
    title: "Days since the newest stable tag, as of November 12, 2026",
    caption:
      "Calendar days from the stable tag’s published_at to November 12, UTC. OpenAI’s prerelease on November 8 is not the bar. Pydantic AI’s tag was published the same UTC day, so the bar is zero.",
    unit: "days",
    source:
      "GitHub releases API, November 12, 2026. Stable tags only. [[1]][[2]][[3]][[4]][[5]][[6]][[7]][[8]]",
    series: ["Days"],
    categories: [
      { label: "Pydantic AI", values: [0], displays: ["0"] },
      { label: "CrewAI", values: [1], displays: ["1"] },
      { label: "Claude Agent SDK", values: [3], displays: ["3"] },
      { label: "Google ADK", values: [5], displays: ["5"] },
      { label: "Microsoft", values: [5], displays: ["5"] },
      { label: "LangGraph SDK", values: [6], displays: ["6"] },
      { label: "Mastra", values: [8], displays: ["8"] },
      { label: "OpenAI Agents SDK", values: [28], displays: ["28"] },
    ],
  },
  {
    id: "star-delta",
    title: "Star change from the November 5 snapshot to the November 12 read",
    caption:
      "stargazers_count on November 12 minus the November 5 snapshot. Seven days, two reads. Do not turn the gap into a monthly rate.",
    unit: "stars",
    source:
      "GitHub repository API, November 12, 2026, and this site’s November 5 snapshot. [[1]][[2]][[3]][[4]][[5]][[6]][[7]][[8]]",
    series: ["Star change"],
    categories: [
      { label: "LangGraph", values: [delta(stars.langgraph, stars.langgraphNov5)], displays: ["+349"] },
      { label: "CrewAI", values: [delta(stars.crew, stars.crewNov5)], displays: ["+283"] },
      { label: "Mastra", values: [delta(stars.mastra, stars.mastraNov5)], displays: ["+140"] },
      { label: "Agents SDK", values: [delta(stars.openai, stars.openaiNov5)], displays: ["+123"] },
      { label: "Pydantic AI", values: [delta(stars.pydantic, stars.pydanticNov5)], displays: ["+123"] },
      { label: "Agent Framework", values: [delta(stars.microsoft, stars.microsoftNov5)], displays: ["+103"] },
      { label: "Claude SDK", values: [delta(stars.claude, stars.claudeNov5)], displays: ["+97"] },
      { label: "ADK", values: [delta(stars.adk, stars.adkNov5)], displays: ["+77"] },
    ],
  },
];

if (delta(stars.langgraph, stars.langgraphNov5) !== 349) throw new Error("langgraph delta");
if (delta(stars.crew, stars.crewNov5) !== 283) throw new Error("crew delta");
if (delta(stars.mastra, stars.mastraNov5) !== 140) throw new Error("mastra delta");
if (delta(stars.openai, stars.openaiNov5) !== 123) throw new Error("openai delta");
if (delta(stars.pydantic, stars.pydanticNov5) !== 123) throw new Error("pydantic delta");
if (delta(stars.microsoft, stars.microsoftNov5) !== 103) throw new Error("microsoft delta");
if (delta(stars.claude, stars.claudeNov5) !== 97) throw new Error("claude delta");
if (delta(stars.adk, stars.adkNov5) !== 77) throw new Error("adk delta");

export const chapters: ReportChapter[] = [
  {
    id: "what-shipping-means",
    title: "Shipping is a tag, not a roadmap",
    blocks: [
      {
        kind: "p",
        text: "A framework comparison that ranks stars is a popularity sort. The question for the next six months is whether the repository you pin is still cutting stable tags, whether the tag is the package you import, and whether anyone has dated the next break. On November 12 the answer is a table. It is not a winner.",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Pin the stable tag you can install today. Pydantic AI’s pin is v2.68.0. The OpenAI Agents SDK’s stable pin is still v0.24.0, and the November 8 alpha is a separate artifact. If your monorepo install follows GitHub’s “latest” release, LangGraph will hand you langgraph-sdk 0.4.14, not the core library tag 1.2.20. Read the tag name before you bump.",
      },
    ],
  },
  {
    id: "comparison",
    title: "Eight frameworks, one morning",
    blocks: [
      {
        kind: "p",
        text: "Stars and tags below are the GitHub API on November 12, 2026. The repository responses carried Date headers from 06:55 GMT. Latest-release is the newest non-prerelease. Where a newer prerelease exists, the table says so. Days are calendar days from published_at to November 12, UTC. The November 5 star is this site’s snapshot, not a second live call. [[1]][[2]][[3]][[4]][[5]][[6]][[7]][[8]]",
      },
      {
        kind: "table",
        caption:
          "AI agent frameworks compared on the stable tag and the star count, read November 12, 2026. Not a quality ranking. Full November 5 census: the framework GitHub stats report.",
        headers: ["Repository", "Stable tag", "Published (UTC)", "Stars Nov 12", "Stars Nov 5"],
        rows: [
          ["langchain-ai/langgraph", "sdk==0.4.14 (core 1.2.20 on Nov 5)", "2026-11-06", "44,831", "44,482"],
          ["crewAIInc/crewAI", "1.15.40", "2026-11-11", "60,797", "60,514"],
          ["microsoft/agent-framework", "python-1.25.0", "2026-11-07", "14,642", "14,539"],
          ["openai/openai-agents-python", "v0.24.0 (alpha.7 is prerelease)", "2026-10-15", "30,631", "30,508"],
          ["google/adk-python", "v2.14.0", "2026-11-07", "22,186", "22,109"],
          ["pydantic/pydantic-ai", "v2.68.0", "2026-11-12", "21,155", "21,032"],
          ["mastra-ai/mastra", "@mastra/core@1.82.0", "2026-11-04", "29,479", "29,339"],
          ["anthropics/claude-agent-sdk-python", "v0.2.180", "2026-11-09", "8,527", "8,430"],
        ],
      },
      {
        kind: "chart",
        id: "days-since-tag",
      },
      {
        kind: "chart",
        id: "star-delta",
      },
      {
        kind: "p",
        text: "CrewAI leads the star column and shipped 1.15.40 on November 11. The notes are a patch: chromadb leaves the embedding-function layer, historical state can be read by row id, and an agent stops when CrewAI AMP cannot resolve its apps. That is maintenance. It is not a new orchestration model. The [November 5 report](/reports/ai-agent-framework-github-stats-november-2026) still has the wider set of 19 repositories, including the ones that have gone quiet. This table is the eight the brief was asked to watch, re-read a week later. [[2]]",
      },
    ],
  },
  {
    id: "what-the-tags-changed",
    title: "What the new tags actually changed",
    blocks: [
      {
        kind: "h3",
        text: "Pydantic AI cut three stables in eight days",
      },
      {
        kind: "p",
        text: "v2.68.0’s notes, published November 12, add OutputTokenLimitExceeded and a fallback when a response is cut off at max_tokens, move approvals and answers inside the run with RequestInput, and add DelegationTasks.discover(). Those are harness controls: a stop when the output budget is hit, a place to ask the user, and a way to find delegated work. The notes do not say the next tag is December. [[1]]",
      },
      {
        kind: "h3",
        text: "ADK graduated A2A and evals",
      },
      {
        kind: "p",
        text: "ADK v2.14.0’s highlights, dated November 4 in the notes and published November 7, move execution environments, A2A, evaluation, and core runtime modules out of experimental. Multi-run eval is a flag, adk eval --num_runs, with a parallelism flag. Tool arguments can be matched exactly, case-insensitively, with a numeric tolerance, or by an LLM. The same notes say a 30-node workflow’s 200-turn run was 23% faster with 9% lower peak memory. That is the project’s own measurement of one workflow, not a public leaderboard. The [harness benchmark](/reports/agent-harness-benchmark-november-2026) is the page that keeps SWE-bench and Terminal-Bench. [[5]]",
      },
      {
        kind: "h3",
        text: "Microsoft’s break is Python 3.11",
      },
      {
        kind: "p",
        text: "python-1.25.0, published November 7, marks Python 3.10 ineligible across the framework packages, including the A2A and MCP hosting packages. It also adds callable MCP discovery approval policies: tool-name and read-only filters, caller overrides, and a refresh for retained tools. dotnet-1.28.0, published November 6, adds a GA computer tool on Foundry and says the Foundry project endpoint still needs the preview tool. Two languages, two tags, one week, and no date after that. [[4]]",
      },
      {
        kind: "h3",
        text: "OpenAI’s stable line stopped in October",
      },
      {
        kind: "p",
        text: "v0.24.0-alpha.7, published November 8, tells you to import the retained v0 runtime through agents.classic, to store sessions yourself, and to attach voice and hosted tools to native agents. It also says executor write defaults changed. That is a migration note for people already on the alpha, not a stable release announcement. /releases/latest still returns v0.24.0 from October 15. If your lockfile tracks latest, it will not pick up the alpha. If your lockfile tracks the newest tag by date, it will, and you will be on a prerelease. [[3]]",
      },
      {
        kind: "callout",
        title: "LangGraph’s latest tag is not the core library",
        text: "On November 12, /releases/latest for langchain-ai/langgraph returned sdk==0.4.14, published November 6. The core tag 1.2.20 was published November 5 and adds a strict resume mode that refuses stale interrupt answers, plus a distinct id for each interrupt() in a task. Install the package you mean.",
      },
    ],
  },
  {
    id: "protocols",
    title: "MCP and A2A did not get a six-month date",
    blocks: [
      {
        kind: "p",
        text: "a2aproject/A2A had 26,501 stars on this read. Its latest release is v1.0.1, published May 28, 2026, a spec bugfix that prefers application/a2a+json. The repository was pushed November 11. A push is not a release. ADK calling A2A stable is a client statement. It does not move the protocol tag. [[9]][[5]]",
      },
      {
        kind: "p",
        text: "modelcontextprotocol/python-sdk’s latest release is v2.3.0, published October 2, 2026. The specification repository was pushed November 12. This brief did not re-download the specification HTML. The [MCP six-month report](/reports/mcp-next-6-months), checked November 10, still has revision 2026-07-28 as current. July 28, 2027, the day four features become eligible for removal, is after May 2027. Eligibility is not deletion. [[10]]",
      },
      {
        kind: "means",
        audience: "Builders",
        text: "Support MCP where the host you ship already does, and treat A2A as a protocol whose own tag has not moved since May. ADK 2.14.0 is a reason to stop calling ADK’s A2A integration experimental. It is not a reason to promise a partner a new A2A revision by May.",
      },
    ],
  },
  {
    id: "announced-likely-watch",
    title: "Announced, likely, and watch for",
    blocks: [
      {
        kind: "p",
        text: "Announced, for a forward window, means a source names a day between November 12, 2026 and May 12, 2027. The tags above are history. They are not a schedule. Likely means a source points at a month in the window and withholds the day. No release note in this set does that. Watch is the short list of things that would change the table.",
      },
      {
        kind: "table",
        caption: "November 2026 through May 2027. A blank likely column is the finding.",
        headers: ["Item", "Label", "What would change it"],
        rows: [
          [
            "A named framework release day after November 12",
            "Not announced",
            "A tag, a milestone, or a maintainer post that prints a date.",
          ],
          [
            "Pydantic, CrewAI, ADK, Agent Framework, Claude SDK cadence",
            "Already shipped",
            "The next tag. None of the notes aims it at a month.",
          ],
          [
            "OpenAI Agents SDK stable tag after v0.24.0",
            "Watch",
            "A non-prerelease newer than October 15. Alpha.7 does not count.",
          ],
          [
            "Mastra tag after @mastra/core@1.82.0",
            "Watch",
            "The repo was pushed November 12. The latest release was still November 4.",
          ],
          [
            "A2A release after v1.0.1",
            "Watch",
            "The protocol repo has not released since May 28, 2026.",
          ],
          [
            "MCP removal of Roots, Sampling, Logging, or Dynamic Client Registration",
            "Outside this window",
            "Eligibility opens July 28, 2027, on the twelve-month page. Not a May event.",
          ],
        ],
      },
      {
        kind: "means",
        audience: "Buyers",
        text: "Do not buy a framework on a six-month roadmap slide unless the vendor has published the day. The evidence this morning is cadence and one breaking change you can already hit: Microsoft’s Python 3.11 floor. Scores, when you need them, are the [November harness benchmark](/reports/agent-harness-benchmark-november-2026). The year-long calendar of filings and regulation is the [twelve-month flagship](/reports/ai-agents-next-12-months).",
      },
    ],
  },
  {
    id: "faq",
    title: "FAQ",
    blocks: [
      { kind: "h3", text: "Which AI agent framework released an update in November 2026?" },
      {
        kind: "p",
        text: "On the November 12 read, stable tags dated in November were LangGraph’s SDK on November 6 and core library on November 5, CrewAI on November 11, Microsoft’s Python package on November 7 and .NET package on November 6, Google ADK on November 7, Pydantic AI on November 4, November 10, and November 12, Mastra on November 4, and the Claude Agent SDK on November 9. OpenAI’s November tag is a prerelease.",
      },
      { kind: "h3", text: "What is the best AI agent framework?" },
      {
        kind: "p",
        text: "This page does not pick one. CrewAI has the most stars in the set, 60,797. Pydantic AI has the newest stable tag, v2.68.0. OpenAI’s stable tag is the oldest of the eight. Those are different questions. A benchmark score is a third question, and it lives on the harness benchmark.",
      },
      { kind: "h3", text: "Is the OpenAI Agents SDK ahead of LangGraph?" },
      {
        kind: "p",
        text: "Not on the clocks this page uses. LangGraph’s newest stable tag is November 6. The Agents SDK’s newest stable tag is October 15. LangGraph has more stars, 44,831 to 30,631. Neither number is a capability score.",
      },
      { kind: "h3", text: "Does Google ADK support A2A?" },
      {
        kind: "p",
        text: "ADK v2.14.0 says the A2A integration graduated from experimental, and the CLI can generate an agent card. The A2A repository’s latest release is still v1.0.1 from May 28, 2026.",
      },
      { kind: "h3", text: "What should a team pin for the next six months?" },
      {
        kind: "p",
        text: "The stable tag in the table, plus a test that fails when the import breaks. No repository in this set has published the tag you will be on in May. Re-read /releases/latest before you let a bot bump it, because LangGraph’s latest tag is an SDK package and OpenAI’s newest tag is a prerelease.",
      },
    ],
  },
];

export const methodology = [
  "Stars are stargazers_count from the GitHub repository API on November 12, 2026. Response Date headers on the eight framework calls were 06:55 GMT. Tags are published_at from the releases API. /releases/latest skips prereleases, so OpenAI’s stable tag and its newer alpha are both reported. Days are UTC calendar dates, not rounded hours.",
  "Star deltas subtract this site’s November 5, 2026 snapshot from the November 12 counts. The arithmetic is checked in the source file. A seven-day gap is not projected to May.",
  "A2A stars and the MCP Python SDK tag were read the same morning. The MCP specification HTML was not re-fetched. The July 28, 2027 eligibility date is cited from the twelve-month report, not re-derived here.",
  "ADK’s 23% and 9% figures are the release notes’ measurement of one 30-node, 200-turn workflow. They are not copied onto SWE-bench. No survey, no expert panel, and no unpublished roadmap was added.",
];

export const sources: { n: number; title: string; url: string; detail: string }[] = [
  {
    n: 1,
    title: "Pydantic AI v2.68.0",
    url: "https://github.com/pydantic/pydantic-ai/releases/tag/v2.68.0",
    detail:
      "Published 2026-11-12T01:56:19Z. Release name says 2026-11-11. Prior stables on the releases list: v2.67.0 at 2026-11-10T23:11:23Z and v2.66.0 at 2026-11-04T11:51:46Z. Repository stars 21,155 at the November 12 read.",
  },
  {
    n: 2,
    title: "CrewAI 1.15.40",
    url: "https://github.com/crewAIInc/crewAI/releases/tag/1.15.40",
    detail: "Published 2026-11-11T22:19:53Z. Stars 60,797. November 5 snapshot 60,514.",
  },
  {
    n: 3,
    title: "OpenAI Agents SDK releases",
    url: "https://github.com/openai/openai-agents-python/releases",
    detail:
      "v0.24.0-alpha.7 published 2026-11-08T07:05:11Z, prerelease. v0.24.0 published 2026-10-15T02:20:12Z, not a prerelease. /releases/latest returned v0.24.0. Stars 30,631. November 5 snapshot 30,508.",
  },
  {
    n: 4,
    title: "Microsoft Agent Framework python-1.25.0",
    url: "https://github.com/microsoft/agent-framework/releases/tag/python-1.25.0",
    detail:
      "Published 2026-11-07T15:52:42Z. Python 3.11 or later. MCP discovery approval policies. dotnet-1.28.0 published 2026-11-06T22:00:01Z. Stars 14,642. November 5 snapshot 14,539.",
  },
  {
    n: 5,
    title: "Google ADK v2.14.0",
    url: "https://github.com/google/adk-python/releases/tag/v2.14.0",
    detail:
      "Published 2026-11-07T00:58:18Z. Notes headed 2.14.0 (2026-11-04). A2A, evaluation, environments, and core runtime marked stable. Stars 22,186. November 5 snapshot 22,109.",
  },
  {
    n: 6,
    title: "LangGraph releases",
    url: "https://github.com/langchain-ai/langgraph/releases",
    detail:
      "sdk==0.4.14 published 2026-11-06T03:03:34Z and returned by /releases/latest. Core tag 1.2.20 published 2026-11-05T02:20:53Z. That core tag’s notes add a strict resume mode that refuses stale interrupt answers, and a distinct id for each interrupt() in a task. Stars 44,831. November 5 snapshot 44,482."
  },
  {
    n: 7,
    title: "Mastra @mastra/core@1.82.0",
    url: "https://github.com/mastra-ai/mastra/releases/tag/%40mastra/core%401.82.0",
    detail:
      "Published 2026-11-04T10:59:56Z. Still the newest release on November 12. Repository pushed_at 2026-11-12T06:55:01Z. Stars 29,479. November 5 snapshot 29,339.",
  },
  {
    n: 8,
    title: "Claude Agent SDK v0.2.180",
    url: "https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.180",
    detail: "Published 2026-11-09T20:09:14Z. Stars 8,527. November 5 snapshot 8,430, when the latest tag was v0.2.178.",
  },
  {
    n: 9,
    title: "A2A v1.0.1",
    url: "https://github.com/a2aproject/A2A/releases/tag/v1.0.1",
    detail:
      "Published 2026-05-28T11:34:36Z. Spec bugfix. Repository stars 26,501 on the November 12 read. Pushed 2026-11-11.",
  },
  {
    n: 10,
    title: "MCP Python SDK v2.3.0",
    url: "https://github.com/modelcontextprotocol/python-sdk/releases/tag/v2.3.0",
    detail:
      "Published 2026-10-02T22:02:27Z, returned by /releases/latest on November 12. The specification repository modelcontextprotocol/modelcontextprotocol was pushed 2026-11-12 and had 9,675 stars. The specification text was not re-fetched.",
  },
];

export const faq = [
  {
    question: "Which AI agent framework released an update in November 2026?",
    answer:
      "Stable November tags on the November 12, 2026 GitHub read: LangGraph (SDK November 6, core library November 5), CrewAI 1.15.40 on November 11, Microsoft Agent Framework Python on November 7 and .NET on November 6, Google ADK v2.14.0 on November 7, Pydantic AI on November 4, 10, and 12, Mastra on November 4, and the Claude Agent SDK on November 9. OpenAI’s November 8 tag is a prerelease. The stable Agents SDK tag is still October 15.",
  },
  {
    question: "What is the best AI agent framework?",
    answer:
      "This report does not name one. CrewAI has the most stars in the set, at 60,797. Pydantic AI has the newest stable tag, v2.68.0, published November 12. A benchmark score is a separate measurement, on the November harness benchmark.",
  },
  {
    question: "Is the OpenAI Agents SDK ahead of LangGraph?",
    answer:
      "Not on these clocks. LangGraph’s newest stable tag is November 6. The Agents SDK’s newest stable tag is October 15. LangGraph has 44,831 stars and the Agents SDK has 30,631. Neither figure is a capability score.",
  },
  {
    question: "Does Google ADK support A2A?",
    answer:
      "ADK v2.14.0, published November 7, 2026, says the A2A integration is no longer experimental. The A2A repository’s latest release is v1.0.1 from May 28, 2026.",
  },
  {
    question: "What framework release is scheduled before May 2027?",
    answer:
      "None of the eight repositories, the A2A repo, or the MCP Python SDK printed a future release day on the tags read November 12, 2026. The next dated protocol mark this site carries is July 28, 2027, and it is outside this six-month window.",
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
