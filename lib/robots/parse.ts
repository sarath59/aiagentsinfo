/** RFC 9309 parser and matcher.
 *  User-agent: case-insensitive, longest prefix wins, equal-length groups merge.
 *  Allow / Disallow: longest matching pattern wins; equal length, Allow wins.
 *  `*` is any run of characters. `$` at the end anchors the end of the path.
 *  The path match is case-sensitive. `/robots.txt` is always allowed.
 */

export type RuleType = "allow" | "disallow";

export type Rule = {
  type: RuleType;
  pattern: string;
  line: number;
};

export type Group = {
  agents: string[];
  rules: Rule[];
};

export type ParsedRobots = {
  groups: Group[];
  sitemaps: string[];
  /** Allow or Disallow lines that appeared before the first User-agent. */
  ignoredRules: number;
};

export type MatchSource = "specific" | "wildcard" | "none";

export type PathDecision = {
  access: "allowed" | "disallowed";
  /** True when the path is the robots.txt file itself. */
  implicitRobots: boolean;
  rule: Rule | null;
  matchedAgents: string[];
  matchSource: MatchSource;
  /** True when the winning user-agent is a proper prefix of the product token. */
  prefixMatch: boolean;
};

const MAX_CHARS = 500 * 1024;

export function parseRobotsTxt(input: string): ParsedRobots {
  const text = input.replace(/^\uFEFF/, "").slice(0, MAX_CHARS);
  const groups: Group[] = [];
  const sitemaps: string[] = [];
  let agents: string[] = [];
  let rules: Rule[] = [];
  let sawRule = false;
  let ignoredRules = 0;

  function flush() {
    if (!agents.length) return;
    groups.push({ agents, rules });
    agents = [];
    rules = [];
    sawRule = false;
  }

  const lines = text.split(/\r\n|\n|\r/);
  for (let index = 0; index < lines.length; index += 1) {
    const hash = lines[index].indexOf("#");
    const line = (hash === -1 ? lines[index] : lines[index].slice(0, hash)).trim();
    if (!line) continue;
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim().toLowerCase();
    const value = line.slice(sep + 1).trim();

    if (key === "user-agent") {
      const token = productToken(value);
      if (!token) continue;
      if (sawRule) flush();
      agents.push(token);
      continue;
    }

    if (key === "sitemap") {
      if (value) sitemaps.push(value);
      continue;
    }

    if (key === "allow" || key === "disallow") {
      if (!agents.length) {
        ignoredRules += 1;
        continue;
      }
      rules.push({ type: key, pattern: value, line: index + 1 });
      sawRule = true;
    }
  }
  flush();
  return { groups, sitemaps, ignoredRules };
}

/** Product token, with a trailing slash-version removed. `*` stays `*`. */
export function productToken(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "*") return "*";
  const slash = trimmed.indexOf("/");
  return (slash === -1 ? trimmed : trimmed.slice(0, slash)).trim();
}

export function normalizeCheckedPath(input: string): string | null {
  const raw = input.trim();
  if (!raw) return "/";
  if (raw.length > 2000) return null;
  let path = raw;
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      path = `${url.pathname || "/"}${url.search}`;
    } catch {
      return null;
    }
  } else if (!raw.startsWith("/")) {
    path = `/${raw}`;
  }
  path = path.split("#")[0] || "/";
  if (!path.startsWith("/")) return null;
  return decodeUnreserved(path);
}

export function decidePath(parsed: ParsedRobots, product: string, path: string): PathDecision {
  const clean = normalizeCheckedPath(path) ?? "/";
  const pathname = clean.split("?")[0] || "/";
  if (pathname === "/robots.txt") {
    return {
      access: "allowed",
      implicitRobots: true,
      rule: null,
      matchedAgents: [],
      matchSource: "none",
      prefixMatch: false,
    };
  }

  const selected = selectGroup(parsed, product);
  let best: { rule: Rule; length: number } | null = null;
  for (const rule of selected.rules) {
    if (!rule.pattern) continue;
    if (!patternMatches(rule.pattern, clean)) continue;
    const length = rule.pattern.length;
    if (!best || length > best.length || (length === best.length && rule.type === "allow" && best.rule.type !== "allow")) {
      best = { rule, length };
    }
  }

  const token = productToken(product).toLowerCase();
  const prefixMatch =
    selected.source === "specific" && selected.agents.some((agent) => agent.toLowerCase() !== token);

  if (!best) {
    return {
      access: "allowed",
      implicitRobots: false,
      rule: null,
      matchedAgents: selected.agents,
      matchSource: selected.source,
      prefixMatch,
    };
  }
  return {
    access: best.rule.type === "allow" ? "allowed" : "disallowed",
    implicitRobots: false,
    rule: best.rule,
    matchedAgents: selected.agents,
    matchSource: selected.source,
    prefixMatch,
  };
}

function selectGroup(parsed: ParsedRobots, product: string): { source: MatchSource; agents: string[]; rules: Rule[] } {
  const needle = productToken(product).toLowerCase();
  if (!needle || needle === "*") {
    return starGroup(parsed);
  }

  let bestLength = 0;
  const winners: Group[] = [];
  const agentLabels: string[] = [];

  for (const group of parsed.groups) {
    let groupBest = "";
    let groupLabel = "";
    for (const agent of group.agents) {
      if (agent === "*") continue;
      const value = agent.toLowerCase();
      if (needle.startsWith(value) && value.length > groupBest.length) {
        groupBest = value;
        groupLabel = agent;
      }
    }
    if (!groupBest) continue;
    if (groupBest.length > bestLength) {
      bestLength = groupBest.length;
      winners.length = 0;
      winners.push(group);
      agentLabels.length = 0;
      agentLabels.push(groupLabel);
    } else if (groupBest.length === bestLength) {
      winners.push(group);
      if (!agentLabels.some((label) => label.toLowerCase() === groupLabel.toLowerCase())) agentLabels.push(groupLabel);
    }
  }

  if (winners.length) {
    return { source: "specific", agents: agentLabels, rules: winners.flatMap((group) => group.rules) };
  }
  return starGroup(parsed);
}

function starGroup(parsed: ParsedRobots): { source: MatchSource; agents: string[]; rules: Rule[] } {
  const stars = parsed.groups.filter((group) => group.agents.some((agent) => agent === "*"));
  if (!stars.length) return { source: "none", agents: [], rules: [] };
  return { source: "wildcard", agents: ["*"], rules: stars.flatMap((group) => group.rules) };
}

/** True when `pattern` matches `path` from the first character, with `*` and a trailing `$`. */
export function patternMatches(pattern: string, path: string): boolean {
  if (!pattern) return false;
  const candidates = pathCandidates(path);
  return candidates.some((candidate) => patternMatchesOne(pattern, candidate));
}

function patternMatchesOne(pattern: string, path: string): boolean {
  const anchor = pattern.endsWith("$");
  const body = anchor ? pattern.slice(0, -1) : pattern;
  if (!body.includes("*")) {
    if (!body) return anchor ? path === "" : false;
    return anchor ? path === body : path.startsWith(body);
  }

  const parts = body.split("*");
  if (!path.startsWith(parts[0])) return false;
  let index = parts[0].length;
  for (let i = 1; i < parts.length; i += 1) {
    const part = parts[i];
    const last = i === parts.length - 1;
    if (last && anchor) {
      if (part === "") return true;
      if (path.length < part.length) return false;
      const start = path.length - part.length;
      if (start < index) return false;
      return path.endsWith(part);
    }
    if (part === "") continue;
    const found = path.indexOf(part, index);
    if (found === -1) return false;
    index = found + part.length;
  }
  return true;
}

function pathCandidates(path: string) {
  const encoded = path.replaceAll("*", "%2A").replaceAll("$", "%24");
  return encoded === path ? [path] : [path, encoded];
}

function decodeUnreserved(path: string) {
  return path.replace(/%[0-9A-Fa-f]{2}/g, (sequence) => {
    const byte = Number.parseInt(sequence.slice(1), 16);
    const unreserved =
      (byte >= 0x41 && byte <= 0x5a) ||
      (byte >= 0x61 && byte <= 0x7a) ||
      (byte >= 0x30 && byte <= 0x39) ||
      byte === 0x2d ||
      byte === 0x2e ||
      byte === 0x5f ||
      byte === 0x7e;
    return unreserved ? String.fromCharCode(byte) : sequence;
  });
}
