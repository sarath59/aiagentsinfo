import { aiBots, purposeLabel, type AiBot, type BotPurpose, type HonorsRobots } from "@/lib/robots/bots";
import { decidePath, parseRobotsTxt, type MatchSource, type ParsedRobots, type Rule } from "@/lib/robots/parse";

export type FileKind = "parsed" | "missing" | "refused" | "unreachable" | "not-robots";

export type BotRow = {
  token: string;
  operator: string;
  purpose: BotPurpose;
  purposeLabel: string;
  summary: string;
  docTitle: string;
  docUrl: string;
  honorsRobots: HonorsRobots;
  fetches: boolean;
  caveat?: string;
  paths: PathRow[];
  note?: string;
};

export type PathRow = {
  path: string;
  access: "allowed" | "disallowed" | "unknown";
  implicitRobots: boolean;
  rule: { type: Rule["type"]; pattern: string } | null;
  matchedAgents: string[];
  matchSource: MatchSource;
  prefixMatch: boolean;
};

export type ScoreLine = {
  id: string;
  label: string;
  allowed: number;
  total: number;
};

export type Evaluation = {
  kind: FileKind;
  scores: { path: string; lines: ScoreLine[] }[];
  /** Answer and agent fetchers whose operator says the file may not apply. */
  mayIgnore: string[];
  bots: BotRow[];
  sitemaps: string[];
  fixes: string[];
  /** True when a parsed file's * group disallows this path. */
  wildcardBlocks: string[];
};

const SCORE_GROUPS: { id: string; label: string; purposes: BotPurpose[] }[] = [
  { id: "answer", label: "Answer fetches", purposes: ["answer"] },
  { id: "search", label: "Search and indexing", purposes: ["search"] },
  { id: "training", label: "Training controls", purposes: ["training"] },
  { id: "corpus", label: "Open crawl corpus", purposes: ["corpus"] },
];

export function evaluateRobots(text: string, paths: string[], kind: FileKind = "parsed"): Evaluation {
  const parsed = kind === "parsed" || kind === "missing" ? parseRobotsTxt(kind === "missing" ? "" : text) : parseRobotsTxt("");
  const uniquePaths = unique(paths.length ? paths : ["/"]);
  const mayIgnore = aiBots.filter((bot) => bot.honorsRobots === "may-ignore").map((bot) => bot.token);

  const bots = aiBots.map((bot) => rowFor(bot, parsed, uniquePaths, kind));
  const scores =
    kind === "parsed" || kind === "missing" || kind === "unreachable"
      ? uniquePaths.map((path) => ({ path, lines: scoreLines(bots, path) }))
      : [];

  const wildcardBlocks =
    kind === "parsed"
      ? uniquePaths.filter(
          (path) => path.split("?")[0] === "/" && decidePath(parsed, "NotANamedBot", path).access === "disallowed",
        )
      : [];

  return {
    kind,
    scores,
    mayIgnore,
    bots,
    sitemaps: kind === "parsed" ? parsed.sitemaps : [],
    fixes: fixesFor(kind, bots, parsed, uniquePaths, wildcardBlocks),
    wildcardBlocks,
  };
}

function rowFor(bot: AiBot, parsed: ParsedRobots, paths: string[], kind: FileKind): BotRow {
  const pathsRows = paths.map((path) => pathRow(bot, parsed, path, kind));
  return {
    token: bot.token,
    operator: bot.operator,
    purpose: bot.purpose,
    purposeLabel: purposeLabel[bot.purpose],
    summary: bot.summary,
    docTitle: bot.docTitle,
    docUrl: bot.docUrl,
    honorsRobots: bot.honorsRobots,
    fetches: bot.fetches,
    caveat: bot.caveat,
    paths: pathsRows,
    note: appleNote(bot, parsed, paths[0] ?? "/"),
  };
}

function pathRow(bot: AiBot, parsed: ParsedRobots, path: string, kind: FileKind): PathRow {
  if (kind === "refused" || kind === "not-robots") {
    return {
      path,
      access: "unknown",
      implicitRobots: false,
      rule: null,
      matchedAgents: [],
      matchSource: "none",
      prefixMatch: false,
    };
  }
  if (kind === "unreachable") {
    return {
      path,
      access: "disallowed",
      implicitRobots: false,
      rule: null,
      matchedAgents: [],
      matchSource: "none",
      prefixMatch: false,
    };
  }
  const decision = decidePath(parsed, bot.token, path);
  return {
    path,
    access: decision.access,
    implicitRobots: decision.implicitRobots,
    rule: decision.rule ? { type: decision.rule.type, pattern: decision.rule.pattern } : null,
    matchedAgents: decision.matchedAgents,
    matchSource: decision.matchSource,
    prefixMatch: decision.prefixMatch,
  };
}

function scoreLines(bots: BotRow[], path: string): ScoreLine[] {
  return SCORE_GROUPS.map((group) => {
    const rows = bots.filter((bot) => group.purposes.includes(bot.purpose) && bot.honorsRobots === "yes");
    const allowed = rows.filter((bot) => bot.paths.find((item) => item.path === path)?.access === "allowed").length;
    return { id: group.id, label: group.label, allowed, total: rows.length };
  }).filter((line) => line.total > 0);
}

function appleNote(bot: AiBot, parsed: ParsedRobots, path: string) {
  if (bot.token !== "Applebot") return undefined;
  const own = decidePath(parsed, "Applebot", path);
  const namesApplebot = own.matchSource === "specific" && own.matchedAgents.some((agent) => agent.toLowerCase() === "applebot");
  if (namesApplebot) return undefined;
  const google = decidePath(parsed, "Googlebot", path);
  if (google.matchSource !== "specific") return undefined;
  const googleWord = google.access === "allowed" ? "allows" : "blocks";
  const rfcWord =
    own.matchSource === "wildcard" ? "the * group" : own.matchSource === "none" ? "no matching group" : own.matchedAgents.join(", ");
  if (google.access === own.access) {
    return `The file does not name Applebot. Apple says it would follow the Googlebot group, which also ${googleWord} this path. The RFC 9309 match is ${rfcWord}.`;
  }
  return `The file does not name Applebot. Apple says it would follow the Googlebot group, which ${googleWord} this path. The RFC 9309 match is ${rfcWord}, which ${own.access === "allowed" ? "allows" : "blocks"} it.`;
}

function fixesFor(
  kind: FileKind,
  bots: BotRow[],
  parsed: ParsedRobots,
  paths: string[],
  wildcardBlocks: string[],
): string[] {
  const fixes: string[] = [];
  const home = paths[0] ?? "/";

  if (kind === "missing") {
    fixes.push(
      "There is no robots.txt. RFC 9309 treats that as allow-all, so every compliant crawler may fetch a public URL. Publish a file if you want search and answer bots in and training crawlers out.",
    );
  } else if (kind === "unreachable") {
    fixes.push(
      "RFC 9309 says a crawler must treat an unreachable robots.txt (HTTP 5xx, or a network failure) as a complete disallow until the file can be fetched again. Fix the error. Do not read the table as a policy you chose.",
    );
  } else if (kind === "refused") {
    fixes.push(
      "The server refused this check, so the file was not read. RFC 9309 lets a crawler treat a 4xx as allow-all. That is not an Allow line. Paste the file, or run the check from a network the host accepts.",
    );
  } else if (kind === "not-robots") {
    fixes.push(
      "The response was HTML, not a robots.txt file. This checker did not apply it as rules. A crawler that skips unparseable lines can end up with no rules, which allows fetching.",
    );
  }

  if (kind === "parsed") {
    for (const path of wildcardBlocks) {
      fixes.push(
        `User-agent: * disallows ${path}. A bot with no group of its own is blocked there, including Googlebot. Google-Extended does not change Google Search. If the block was meant only for an AI crawler, name that crawler and leave * allowed.`,
      );
    }

    const homeRows = (purpose: BotPurpose, access: "allowed" | "disallowed") =>
      bots.filter(
        (bot) =>
          bot.purpose === purpose &&
          bot.honorsRobots === "yes" &&
          bot.paths.find((item) => item.path === home)?.access === access,
      );

    for (const bot of homeRows("search", "disallowed")) {
      fixes.push(searchFix(bot));
    }
    for (const bot of homeRows("answer", "disallowed")) {
      fixes.push(
        `${bot.token} is blocked for ${home}. ${bot.operator} says this token honors robots.txt, so a block stops the fetch that answers a question. Allow ${bot.token} for the paths you want cited. That group does not inherit rules from *.`,
      );
    }
    const trainingOpen = homeRows("training", "allowed");
    for (const bot of trainingOpen) {
      if (bot.token === "GPTBot") {
        fixes.push(
          "GPTBot is allowed for /. OpenAI says that token may train foundation models, and that OAI-SearchBot is a separate switch for ChatGPT search. Disallow GPTBot and allow OAI-SearchBot if you want search eligibility without the training crawl.",
        );
      } else if (bot.token === "Google-Extended") {
        fixes.push(
          "Google-Extended is allowed. Google says that token covers future Gemini training and grounding, and that it does not affect Google Search. Disallow Google-Extended if you want to opt out of that use. Leave Googlebot alone.",
        );
      } else if (bot.token === "ClaudeBot") {
        fixes.push(
          "ClaudeBot is allowed for /. Anthropic says that token collects pages that may train Claude, and that Claude-SearchBot and Claude-User are separate. Disallow ClaudeBot if you want the training crawl stopped and the other two left in.",
        );
      } else if (bot.token === "Applebot-Extended") {
        fixes.push(
          "Applebot-Extended is allowed. Apple says that token controls training use of the Applebot crawl, and that Applebot-Extended does not itself crawl. Disallow it to opt out of that training use. Spotlight, Siri, and Safari still follow Applebot.",
        );
      }
    }
    if (!parsed.sitemaps.length) {
      fixes.push("The file has no Sitemap line. Add one if you want crawlers that read Sitemap records to find the sitemap. It does not change Allow or Disallow.");
    }
  }

  return fixes.slice(0, 8);
}

function searchFix(bot: BotRow) {
  if (bot.token === "OAI-SearchBot") {
    return "OAI-SearchBot is blocked for /. OpenAI says a site that opts out is not shown in ChatGPT search answers, though it can still appear as a navigational link. Allow OAI-SearchBot if you want to be eligible. That does not require allowing GPTBot.";
  }
  if (bot.token === "Claude-SearchBot") {
    return "Claude-SearchBot is blocked for /. Anthropic says a block keeps the site out of the index it uses for Claude search. Allow Claude-SearchBot and, separately, decide what to do with ClaudeBot.";
  }
  if (bot.token === "PerplexityBot") {
    return "PerplexityBot is blocked for /. Perplexity says this is the crawler that surfaces sites in Perplexity search, and that it is not the training crawl. Allow PerplexityBot if you want that index. Perplexity-User may ignore the file anyway.";
  }
  return `${bot.token} is blocked for /. ${bot.operator} documents it as a search crawler that reads robots.txt. A named Allow is required, because a group that names the bot ignores the * group.`;
}

function unique(values: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
  }
  return out;
}

export function scoreSentence(lines: ScoreLine[]) {
  const answer = lines.find((line) => line.id === "answer");
  const search = lines.find((line) => line.id === "search");
  const training = lines.find((line) => line.id === "training");
  const parts: string[] = [];
  if (answer) parts.push(`Answer fetches: ${answer.allowed}/${answer.total} allowed`);
  if (search) parts.push(`Search: ${search.allowed}/${search.total} allowed`);
  if (training) parts.push(`Training controls: ${training.allowed}/${training.total} allowed`);
  return parts.join(". ");
}
