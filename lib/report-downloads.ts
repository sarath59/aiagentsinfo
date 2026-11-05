import {
  description as benchmarkDescription,
  path as benchmarkPath,
  title as benchmarkTitle,
} from "@/lib/benchmark-report";
import {
  description as frameworkDescription,
  directorySentence,
  frameworkColumns,
  frameworkCsv,
  frameworkRows,
  keyFigures,
  leadParagraph,
  licenceBreakdown,
  licenceSentence,
  methodologyFacts,
  path as frameworkPath,
  quietReleaseSentence,
  recentReleaseSentence,
  recencyColumns,
  recencyRows,
  relatedSentence,
  retrievedDay,
  tableCaption,
  title as frameworkTitle,
} from "@/lib/framework-github-stats";
import {
  BENCHMARK_READ_ON,
  sweColumns,
  sweRows,
  swebenchBenchmark,
  terminalBench,
  terminalColumns,
  terminalRows,
} from "@/lib/harness-benchmark";
import type { PdfModel, PdfTable } from "@/lib/pdf";
import { absoluteUrl } from "@/lib/site";
import type { SortableColumn, SortableRow } from "@/lib/sortable";
import {
  description as outlookDescription,
  months as outlookMonths,
  path as outlookPath,
  readOn as outlookReadOn,
  title as outlookTitle,
} from "@/lib/agents-outlook";
import { months, description as shoppingDescription, path as shoppingPath, readOn, title as shoppingTitle } from "@/lib/shopping-report";
import { formatDate } from "@/lib/utils";

function tableFrom(caption: string, columns: SortableColumn[], rows: SortableRow[]): PdfTable {
  return {
    caption,
    headers: columns.map((column) => column.label),
    rows: rows.map((row) => columns.map((column) => row.display[column.key] || "")),
  };
}

export function agentsOutlookPdf(): PdfModel {
  const dateLabel = formatDate(outlookReadOn);
  return {
    filename: "ai-agents-nov-2026-may-2027.pdf",
    title: outlookTitle,
    description: outlookDescription,
    dateLabel,
    url: absoluteUrl(outlookPath),
    sections: [
      {
        paragraphs: [
          "From November 2026 through May 2027, the public record is a short list of things a company or a government has already dated, plus a handful of phrases with no day attached. Anthropic filed an amended prospectus on November 2. Apple's auditors signed the Form 10-K on November 3. AWS, Sysdig, DeepSeek, and Tencent posted on November 3 and 4. The European Commission's AI Act timeline names December 2, 2026. It does not name a product launch between then and May 2027.",
          "Shopping and payments for the same six months are in the separate report AI shopping agents in the next 6 months. This page does not repeat that checkout record. Scores for coding harnesses are in the November harness benchmark. A month with no dated launch is left empty on purpose.",
        ],
      },
      {
        heading: "How a claim is sorted",
        paragraphs: [
          "Announced means a linked filing, company page, protocol changelog, or official timeline says it.",
          'Likely means that page aims the work at this six-month stretch and does not name a day. The word means "their phrase covers these months." It is not a new odds estimate from this desk.',
          "Watch for means a later check should confirm the item or drop it: the page withholds a date, the tense is future, or a follow-up named earlier was not confirmed on November 5, 2026.",
        ],
      },
      {
        heading: "Announced",
        paragraphs: [
          "Anthropic's amended S-1, filed November 2, 2026, describes Claude Code as the coding agent already in market and Claude Cowork as a research preview from January 2026 that, as of September 30, 2026, had outpaced Claude Code's adoption at the equivalent point. The quarterly table shows revenue of $16,956 million and an operating loss of $567 million for the three months ended September 30, 2026. Nine-month revenue is $33,242 million and the operating loss is $1,260 million.",
          "OpenAI's computer-use guide, read November 5, covers macOS and Windows with ChatGPT Work and Codex. It does not mention Linux. Anthropic's computer-use toolset computer_toolset_20260801 is on the Claude API and Google Cloud and is not in Claude Managed Agents. Tencent's November 4 post says Hy4 can use a command line and a graphical interface. The API is live. WorkBuddy and CodeBuddy are free from November 4 through November 15. The TokenHub discount runs through December 31, 2026.",
          "AWS posted on November 3 that WorkSpaces for AI agents now supports Linux and Windows 11 cloud desktops in addition to Windows Server. Sysdig announced general availability of Sysdig AI Defense on November 4. DeepSeek Harness v0.2.2-rc.1 was released November 4 and is still marked a developer preview. Harmony Harness, arXiv 2610.15150, submitted October 10, 2026, is a research paper, not a product announcement. The MCP specification dated July 28, 2026 deprecates Roots, Sampling, and Logging with a minimum 12-month window, so those features stay at least through July 28, 2027.",
          "Apple's Form 10-K, auditor's report dated November 3, 2026, warns that agents can act without authorization and that some consequences may be hard to reverse. It does not describe a specific incident. The EU AI Act timeline dates December 2, 2026 for new prohibitions and an Article 50(2) transition. Annex III high-risk rules are dated December 2, 2027. On October 30, 2026 the UK Digital Regulation Cooperation Forum said existing law already applies to personal AI agents.",
        ],
      },
      {
        heading: "Likely",
        paragraphs: [
          'Anthropic\'s November 2 prospectus says: "We expect our use of short-term compute to continue to increase in the near term and to in turn compress our operating margin and Adjusted Operating Margin as a result." The phrase does not name a month. About $69.8 billion of commitments are due in the 12 months after September 30, 2026, a span that includes this window and runs past it.',
          'Tencent\'s November 4 post says weights and system cards will be released in the coming days, and that Hy4 Flash is scheduled for release soon. Neither sentence names a day.',
        ],
      },
      {
        heading: "Watch for",
        paragraphs: [
          'Citrix\'s November 4 announcement uses "will be able" and "will become" for two SecurAccess controls and does not name a day. OpenAI\'s computer-use page does not mention Linux. DeepSeek\'s README warns of compatibility-breaking changes and does not end the preview. Harmony Harness does not schedule a product. The next EU dates after this window are August 2, 2027 and December 2, 2027.',
        ],
      },
      {
        heading: "Month by month, November 2026 to May 2027",
        paragraphs: [
          "An empty announcement means no linked source named that month. It is not a prediction that the month will be quiet.",
        ],
        table: {
          caption: "Announced, likely, and watch-for notes by month",
          headers: ["Month", "Announced", "Likely", "Watch for"],
          rows: outlookMonths.map((item) => [item.month, item.announced, item.likely, item.watch]),
        },
      },
    ],
  };
}

export function shoppingReportPdf(): PdfModel {
  const dateLabel = formatDate(readOn);
  return {
    filename: "ai-shopping-agents-nov-2026-may-2027.pdf",
    title: shoppingTitle,
    description: shoppingDescription,
    dateLabel,
    url: absoluteUrl(shoppingPath),
    sections: [
      {
        paragraphs: [
          "From November 2026 through May 2027, the public record is a short list of rollouts already underway and a handful of phrases with no day attached. Google has direct checkout running for named Canadian retailers as of November 4, and a U.S. cart that launched October 15. OpenAI's merchant page, read November 5, still sends the ChatGPT purchase to the store's own site or app. Amazon's October 29 earnings release counts users of Alexa for Shopping and does not name the next launch. Microsoft's Copilot Checkout page says it cannot give a timeline for other countries.",
          'The dated work inside the window is Google\'s: simplified Universal Commerce Protocol tools in Merchant Center "starting next year," loyalty rewards "in the coming months," and Australia and Canada "early next year" on the developer guide. OpenAI aims at a self-serve merchant platform "later this year," and more regions "over time." Adobe has published holiday traffic forecasts for November and December. Those figures are clicks from an AI source onto a retail site. They are not a count of agents paying on their own.',
          "A month with no dated launch is left empty on purpose. Who can pay today is covered on this site in the guide Can an AI shopping agent check out for you?",
        ],
      },
      {
        heading: "How a claim is sorted",
        paragraphs: [
          "Announced means a linked company page or an Adobe page says it.",
          'Likely means that page aims the work at this six-month stretch and does not name a day. The word means "their phrase covers these months." It is not a new odds estimate from this desk.',
          "Watch for means a later check should confirm the item or drop it: the page withholds a date, two pages disagree, or a follow-up named earlier was not confirmed on November 5, 2026.",
        ],
      },
      {
        heading: "Month by month, November 2026 to May 2027",
        paragraphs: [
          "An empty announcement means no linked source named that month. It is not a prediction that the month will be quiet, and it is not a prediction that a product will ship.",
        ],
        table: {
          caption: "Announced, likely, and watch-for notes by month",
          headers: ["Month", "Announced", "Likely", "Watch for"],
          rows: months.map((item) => [item.month, item.announced, item.likely, item.watch]),
        },
      },
    ],
  };
}

export function benchmarkReportPdf(): PdfModel {
  const dateLabel = formatDate(BENCHMARK_READ_ON);
  return {
    filename: "agent-harness-benchmark-november-2026.pdf",
    title: benchmarkTitle,
    description: benchmarkDescription,
    dateLabel,
    url: absoluteUrl(benchmarkPath),
    sections: [
      {
        paragraphs: [
          "This page copies public scores for coding agents and the harnesses around them. A harness is the loop, tools, and limits around a model. The tables use the official SWE-bench leaderboard and the official Terminal-Bench 4.0 leaderboard. Each row keeps the date on that source. Nothing here is estimated, and a score from another website is not filled in when the official board does not list it.",
          "SWE-bench Verified is 500 real GitHub issues. The score is the percent resolved: the share of issues whose tests passed. The bash-only rows all use mini-SWE-agent, so the harness stays the same while the model changes. The SWE-bench site says release 2.x calls tools, while release 1.x reads the action out of the model's text, and that those two generations are not necessarily comparable. The version column is the release named on the row.",
          "Terminal-Bench 4.0 is the current board on tbench.ai. The agent column changes by row, so those scores include Claude Code, Codex, Grok Build, mini-SWE-agent, or Muse Code, not one shared harness. Accuracy and the 95% half-width are the fields on the official leaderboard. The cost cell is copied as printed, including a partial-trial note where the board includes one.",
          `The newest result date on the SWE-bench Verified file, as read on ${dateLabel}, is ${swebenchBenchmark.newestResultDate}. The Terminal-Bench 4.0 board record says it was updated ${terminalBench.updatedAt}. This November report is a reading of those boards. It is not a claim that either project published a new run in November.`,
        ],
      },
      {
        heading: "SWE-bench Verified, bash only",
        paragraphs: [
          `${swebenchBenchmark.bashOnly.length} rows from the Verified list where the harness is mini-SWE-agent. "Team checked" means the SWE-bench page marks the run as performed or checked by the SWE-bench team. A "No" means the row is on the official board without that mark. Source: swebench.com, read ${dateLabel}.`,
        ],
        table: tableFrom(
          "SWE-bench Verified bash-only scores",
          sweColumns,
          sweRows(swebenchBenchmark.bashOnly),
        ),
      },
      {
        heading: "Other harnesses the SWE-bench team checked",
        paragraphs: [
          `${swebenchBenchmark.teamCheckedOther.length} Verified rows that use a harness other than mini-SWE-agent and that the board marks as team-checked.`,
        ],
        table: tableFrom(
          "Team-checked SWE-bench Verified rows outside the bash-only harness",
          sweColumns,
          sweRows(swebenchBenchmark.teamCheckedOther),
        ),
      },
      {
        heading: "SWE-bench Multilingual, same harness",
        paragraphs: [
          `${swebenchBenchmark.multilingualInstances} instances, ${swebenchBenchmark.multilingual.length} mini-SWE-agent rows on the same official file. This is a separate task set from Verified, so the percents are not a second reading of the 500 Verified issues.`,
        ],
        table: tableFrom(
          "SWE-bench Multilingual mini-SWE-agent scores",
          sweColumns,
          sweRows(swebenchBenchmark.multilingual),
        ),
      },
      {
        heading: "Terminal-Bench 4.0",
        paragraphs: [
          `${terminalBench.rows.length} rows. ${terminalBench.description} The board name on Harbor Hub is ${terminalBench.name}, and the record was updated ${terminalBench.updatedAt}. Read ${dateLabel}.`,
        ],
        table: tableFrom("Terminal-Bench 4.0 official leaderboard", terminalColumns, terminalRows()),
      },
      {
        heading: "Left out",
        bullets: [
          "Third-party score roundups, including pages that list SWE-bench results above the official board, are not used. If the official file does not contain the row, it is not on this page.",
          "SWE-bench Full, Lite, and Multimodal are on swebench.com and were not copied into this month's tables.",
          "OSWorld, WebArena, GAIA, and SWE-bench Pro were not read from an official board for this edition, so they are not given scores here.",
          'The November 3, 2026 paper "You don\'t need long context" reports its own SWE-bench Verified and Terminal-Bench 2.1 runs. Those are the authors\' runs, not rows on the public boards, and they stay on the research note.',
        ],
      },
    ],
  };
}

export function frameworkReportPdf(): PdfModel {
  const dateLabel = formatDate(retrievedDay);
  const licenceRows = licenceBreakdown().map((item) => [item.label, String(item.count)]);
  return {
    filename: "ai-agent-framework-github-stats-november-2026.pdf",
    title: frameworkTitle,
    description: frameworkDescription,
    dateLabel,
    url: absoluteUrl(frameworkPath),
    sections: [
      {
        paragraphs: [
          leadParagraph(),
          ...keyFigures().map((figure) => `${figure.label}: ${figure.value}. ${figure.note}`),
        ],
      },
      {
        heading: "Repositories",
        paragraphs: [
          "The framework name is the GitHub repository. Open issues + PRs is GitHub's open_issues_count, which includes open pull requests.",
        ],
        table: tableFrom(tableCaption(), frameworkColumns, frameworkRows()),
      },
      {
        heading: "Licences",
        paragraphs: [licenceSentence()],
        table: {
          caption: "Licence field returned by GitHub",
          headers: ["Licence", "Repositories"],
          rows: licenceRows,
        },
      },
      {
        heading: "Release recency",
        paragraphs: [recentReleaseSentence(), quietReleaseSentence()],
        table: tableFrom(`Days from each latest release to ${dateLabel}`, recencyColumns, recencyRows()),
      },
      {
        heading: "Methodology",
        paragraphs: [methodologyFacts(), directorySentence(absoluteUrl), relatedSentence(absoluteUrl)].flat().filter(Boolean),
      },
    ],
  };
}

const pdfModels = {
  "ai-agents-next-6-months": agentsOutlookPdf,
  "ai-shopping-agents-next-6-months": shoppingReportPdf,
  "agent-harness-benchmark-november-2026": benchmarkReportPdf,
  "ai-agent-framework-github-stats-november-2026": frameworkReportPdf,
} as const;

export type ReportSlug = keyof typeof pdfModels;

export function reportPdf(slug: string) {
  if (!(slug in pdfModels)) return undefined;
  return pdfModels[slug as ReportSlug]();
}

export function reportCsv(slug: string, table: string | null) {
  if (slug === "ai-agent-framework-github-stats-november-2026") {
    if (table && table !== "frameworks") return undefined;
    return frameworkCsv();
  }
  if (slug === "ai-agents-next-6-months") {
    return {
      filename: "ai-agents-nov-2026-may-2027.csv",
      headers: ["Month", "Announced", "Likely", "Watch for"],
      rows: outlookMonths.map((item) => [item.month, item.announced, item.likely, item.watch]),
    };
  }
  if (slug === "ai-shopping-agents-next-6-months") {
    return {
      filename: "ai-shopping-agents-nov-2026-may-2027.csv",
      headers: ["Month", "Announced", "Likely", "Watch for"],
      rows: months.map((item) => [item.month, item.announced, item.likely, item.watch]),
    };
  }
  if (slug !== "agent-harness-benchmark-november-2026") return undefined;
  const tables: Record<string, { filename: string; caption: string; columns: SortableColumn[]; rows: SortableRow[] }> = {
    "swe-bash": {
      filename: "swe-bench-verified-bash-only.csv",
      caption: "SWE-bench Verified bash-only scores",
      columns: sweColumns,
      rows: sweRows(swebenchBenchmark.bashOnly),
    },
    "swe-checked": {
      filename: "swe-bench-verified-team-checked.csv",
      caption: "Team-checked SWE-bench Verified rows outside the bash-only harness",
      columns: sweColumns,
      rows: sweRows(swebenchBenchmark.teamCheckedOther),
    },
    "swe-multilingual": {
      filename: "swe-bench-multilingual-mini-swe-agent.csv",
      caption: "SWE-bench Multilingual mini-SWE-agent scores",
      columns: sweColumns,
      rows: sweRows(swebenchBenchmark.multilingual),
    },
    "terminal-bench": {
      filename: "terminal-bench-4.csv",
      caption: "Terminal-Bench 4.0 official leaderboard",
      columns: terminalColumns,
      rows: terminalRows(),
    },
  };
  const selected = table ? tables[table] : undefined;
  if (!selected) return undefined;
  return {
    filename: selected.filename,
    headers: selected.columns.map((column) => column.label),
    rows: selected.rows.map((row) => selected.columns.map((column) => row.display[column.key] || "")),
  };
}
