import { BOTS_CHECKED_LABEL, aiBots, type AiBot, type BotPurpose } from "@/lib/robots/bots";

export type PolicyId = "allow-search-answer" | "allow-all" | "block-named";
export type BotChoice = "allow" | "block";

export const policies: { id: PolicyId; label: string; detail: string }[] = [
  {
    id: "allow-search-answer",
    label: "Allow search and answer fetches. Block training.",
    detail: "OAI-SearchBot, Claude-SearchBot, and the other search tokens stay allowed. GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Amazonbot, and Meta-ExternalAgent are disallowed. CCBot is disallowed with them.",
  },
  {
    id: "allow-all",
    label: "Allow every documented token.",
    detail: "Each token gets Allow: /. Protected paths are still disallowed, and they are repeated inside every named group.",
  },
  {
    id: "block-named",
    label: "Block every documented token.",
    detail: "Each token gets Disallow: /. User-agent: * is not a block-all, so Googlebot is not caught by this preset.",
  },
];

export function choiceFor(bot: AiBot, policy: PolicyId): BotChoice {
  if (policy === "allow-all") return "allow";
  if (policy === "block-named") return "block";
  if (bot.purpose === "training" || bot.purpose === "corpus") return "block";
  return "allow";
}

export function generateRobots(input: {
  policy: PolicyId;
  choices: Record<string, BotChoice>;
  paths: string[];
  sitemap: string;
  variant: number;
}): { text: string; variant: number; warnings: string[] } {
  const variant = ((input.variant % 2) + 2) % 2;
  const paths = cleanPaths(input.paths);
  const sitemap = cleanSitemap(input.sitemap);
  const warnings: string[] = [];

  const chosen = aiBots.map((bot) => ({
    bot,
    choice: input.choices[bot.token] ?? choiceFor(bot, input.policy),
  }));

  const ignoring = chosen.filter((item) => item.bot.honorsRobots === "may-ignore").map((item) => item.bot.token);
  const unstated = chosen.filter((item) => item.bot.honorsRobots === "unstated").map((item) => item.bot.token);
  if (ignoring.length) {
    warnings.push(
      `${ignoring.join(", ")} may ignore robots.txt. A Disallow in this file does not stop those fetches.`,
    );
  }
  if (unstated.length) {
    warnings.push(
      `${unstated.join(", ")}: the operator page does not say the crawler reads robots.txt. The lines are a request.`,
    );
  }

  const lines: string[] = [
    "# robots.txt",
    `# Policy: ${policyLabel(input.policy)}.`,
    `# Tokens from operator docs read ${BOTS_CHECKED_LABEL}.`,
    "# robots.txt is a request, not access control. RFC 9309.",
    "# A named group replaces User-agent: * for that bot.",
    "# Protected paths are repeated in every group that is otherwise allowed.",
    "# Googlebot is not an AI token and is not listed. Google-Extended does not change Google Search.",
  ];
  if (ignoring.length) {
    lines.push("# These tokens may ignore this file:");
    lines.push(`# ${ignoring.join(", ")}`);
  }
  if (unstated.length) {
    lines.push("# Operator pages do not say these tokens read robots.txt:");
    lines.push(`# ${unstated.join(", ")}`);
  }
  lines.push("");

  if (variant === 0) {
    const buckets = new Map<string, AiBot[]>();
    for (const item of chosen) {
      const key = item.choice;
      const list = buckets.get(key) ?? [];
      list.push(item.bot);
      buckets.set(key, list);
    }
    for (const choice of ["block", "allow"] as const) {
      const bots = buckets.get(choice);
      if (!bots?.length) continue;
      writeGroup(lines, bots, choice, paths);
    }
  } else {
    for (const item of chosen) {
      writeGroup(lines, [item.bot], item.choice, paths);
    }
  }

  lines.push("User-agent: *");
  if (paths.length) {
    for (const path of paths) lines.push(`Disallow: ${path}`);
  } else {
    lines.push("Allow: /");
  }
  lines.push("");
  if (sitemap) lines.push(`Sitemap: ${sitemap}`, "");

  return { text: `${lines.join("\n").trim()}\n`, variant, warnings };
}

function writeGroup(lines: string[], bots: AiBot[], choice: BotChoice, paths: string[]) {
  for (const bot of bots) lines.push(`User-agent: ${bot.token}`);
  lines.push(`# ${groupComment(bots, choice)}`);
  if (choice === "block") {
    lines.push("Disallow: /");
  } else {
    lines.push("Allow: /");
    for (const path of paths) lines.push(`Disallow: ${path}`);
  }
  lines.push("");
}

function groupComment(bots: AiBot[], choice: BotChoice) {
  const purposes = [...new Set(bots.map((bot) => bot.purpose))];
  const purposeText = purposes.map(purposePhrase).join(", ");
  const verb = choice === "block" ? "Blocked" : "Allowed";
  return `${verb}. ${purposeText}.`;
}

function purposePhrase(purpose: BotPurpose) {
  if (purpose === "training") return "Training";
  if (purpose === "search") return "Search and indexing";
  if (purpose === "answer") return "Answer fetch";
  if (purpose === "corpus") return "Open crawl corpus";
  if (purpose === "agent") return "Agent crawl";
  return "Ads review";
}

function policyLabel(policy: PolicyId) {
  return policies.find((item) => item.id === policy)?.label ?? policy;
}

export function cleanPaths(values: string[]) {
  const out: string[] = [];
  for (const value of values) {
    const path = value.trim();
    if (!path || path === "/") continue;
    if (!path.startsWith("/") || path.includes(" ") || path.includes("#") || path.length > 200) continue;
    if (!out.includes(path)) out.push(path);
    if (out.length >= 20) break;
  }
  return out;
}

export function cleanSitemap(value: string) {
  const raw = value.trim();
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    if (url.username || url.password) return "";
    if (raw.length > 500) return "";
    return url.toString();
  } catch {
    return "";
  }
}
