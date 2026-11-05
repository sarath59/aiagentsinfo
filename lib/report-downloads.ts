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
import { months, description as shoppingDescription, path as shoppingPath, readOn, title as shoppingTitle } from "@/lib/shopping-report";
import { formatDate } from "@/lib/utils";

function tableFrom(caption: string, columns: SortableColumn[], rows: SortableRow[]): PdfTable {
  return {
    caption,
    headers: columns.map((column) => column.label),
    rows: rows.map((row) => columns.map((column) => row.display[column.key] || "")),
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
