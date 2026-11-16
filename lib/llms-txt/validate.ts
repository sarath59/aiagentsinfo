/**
 * Structure rules from https://llmstxt.org/ (v2, updated 10 August 2026).
 * The H1 is the only required section. Order after that is a blockquote summary,
 * free markdown without headings, then H2 file lists of `- [name](url): notes`.
 * "Optional" is the conventional H2 for links an agent can skip.
 * This module stays free of Node APIs so paste mode can run it in the browser.
 */

export type Severity = "error" | "warning" | "info";

export type Finding = {
  severity: Severity;
  code: string;
  message: string;
  fix: string;
};

export type LlmsLink = {
  name: string;
  url: string;
  notes: string;
  line: number;
  section: string;
  absolute: boolean;
};

export type LlmsSection = {
  heading: string;
  line: number;
  links: number;
};

export type LlmsValidation = {
  title: string | null;
  summary: string | null;
  sections: LlmsSection[];
  links: LlmsLink[];
  findings: Finding[];
};

export const PASTE_TOKEN_METHOD = "character count divided by 4, rounded up";

export function estimateTokensByChars(text: string) {
  return Math.ceil(text.length / 4);
}

export function looksLikeHtml(body: string, contentType?: string | null) {
  if (contentType && /text\/html|application\/xhtml/i.test(contentType)) return true;
  const start = body.trimStart().slice(0, 300).toLowerCase();
  return (
    start.startsWith("<!doctype html") ||
    start.startsWith("<html") ||
    start.startsWith("<head") ||
    start.startsWith("<body")
  );
}

const LIST_LINE = /^(\s{0,3})([-*+]|\d{1,3}\.)\s+(.*)$/;
const LINK_LINE = /^\[([^\]\n]*)\]\(([^)\s]*)\)(.*)$/;
const TITLE_LINK = /^\[([^\]\n]*)\]\(([^)\s]+)\s+"[^"]*"\)(.*)$/;

type Classified = {
  absolute: boolean;
  href: string;
  host: string | null;
  badScheme: boolean;
};

export function validateLlmsTxt(text: string, options?: { baseUrl?: string | null }): LlmsValidation {
  const findings: Finding[] = [];
  const input = text.replace(/^\uFEFF/, "");
  if (!input.trim()) {
    findings.push({
      severity: "error",
      code: "empty",
      message: "The file is empty.",
      fix: "Publish a Markdown file whose first line is a single H1 with the site name.",
    });
    return { title: null, summary: null, sections: [], links: [], findings };
  }
  if (looksLikeHtml(input)) {
    findings.push({
      severity: "error",
      code: "html",
      message: "The body is HTML. A 200 response that is a web page is a soft 404, not an llms.txt file.",
      fix: "Serve text/plain or text/markdown at /llms.txt, with a Markdown H1 as the first line.",
    });
    return { title: null, summary: null, sections: [], links: [], findings };
  }

  const lines = input.split(/\r?\n/);
  let fence = false;
  let title: string | null = null;
  let h1Count = 0;
  let h1Line = 0;
  let firstContentLine = 0;
  const summaryLines: string[] = [];
  let summaryClosed = false;
  let sawSummary = false;
  let mode: "before" | "after-h1" | "summary" | "details" | "section" = "before";
  const sections: LlmsSection[] = [];
  const links: LlmsLink[] = [];
  let current: LlmsSection | null = null;
  let malformed = 0;
  const malformedLines: number[] = [];
  let linksBeforeH2 = 0;
  let deeper = 0;
  let lateSummary = false;

  function pushLink(name: string, url: string, notes: string, line: number, section: string) {
    const classified = classifyUrl(url, options?.baseUrl);
    links.push({
      name: name.trim(),
      url: url.trim(),
      notes: notes.trim(),
      line,
      section,
      absolute: classified.absolute,
    });
    if (mode !== "section") linksBeforeH2 += 1;
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";
    const trimmed = line.trim();
    if (/^(```|~~~)/.test(trimmed)) {
      fence = !fence;
      continue;
    }
    if (fence || !trimmed) {
      if (!trimmed && mode === "summary") summaryClosed = true;
      continue;
    }
    const lineNo = index + 1;
    if (!firstContentLine) firstContentLine = lineNo;

    if (/^#{3,}\s/.test(trimmed)) {
      deeper += 1;
      continue;
    }
    if (/^##\s+/.test(trimmed)) {
      if (mode === "summary") summaryClosed = true;
      const heading = trimmed.replace(/^##\s+/, "").trim();
      current = { heading, line: lineNo, links: 0 };
      sections.push(current);
      mode = "section";
      continue;
    }
    if (/^#\s+/.test(trimmed)) {
      h1Count += 1;
      if (!title) {
        title = trimmed.replace(/^#\s+/, "").trim();
        h1Line = lineNo;
        mode = "after-h1";
      }
      continue;
    }

    if (mode === "before") mode = "details";

    const quote = /^>\s?(.*)$/.exec(trimmed);
    if (quote && (mode === "after-h1" || mode === "summary") && !summaryClosed) {
      mode = "summary";
      sawSummary = true;
      if (quote[1]?.trim()) summaryLines.push(quote[1].trim());
      continue;
    }
    if (quote && !sawSummary) lateSummary = true;

    if (mode === "summary") {
      summaryClosed = true;
      mode = "details";
    }

    const list = LIST_LINE.exec(line);
    if (!list) continue;
    const body = list[3] ?? "";
    const titled = TITLE_LINK.exec(body);
    const plain = LINK_LINE.exec(body);
    const match = titled || plain;
    if (!match) {
      malformed += 1;
      if (malformedLines.length < 5) malformedLines.push(lineNo);
      continue;
    }
    const name = match[1] ?? "";
    const url = (match[2] ?? "").replace(/^<|>$/g, "");
    let rest = (match[3] ?? "").trim();
    if (titled) rest = rest.replace(/^\)/, "").trim();
    if (!name.trim() || !url.trim()) {
      malformed += 1;
      if (malformedLines.length < 5) malformedLines.push(lineNo);
      continue;
    }
    let notes = "";
    if (rest.startsWith(":")) notes = rest.slice(1).trim();
    else if (rest) {
      malformed += 1;
      if (malformedLines.length < 5) malformedLines.push(lineNo);
    }
    if (current && mode === "section") current.links += 1;
    pushLink(name, url, notes, lineNo, current?.heading ?? "");
  }

  if (h1Count === 0) {
    findings.push({
      severity: "error",
      code: "missing-h1",
      message: "The file has no H1. The spec's only required section is one H1 with the site or project name.",
      fix: "Put `# Site name` on the first line of content.",
    });
  } else if (h1Line !== firstContentLine) {
    findings.push({
      severity: "error",
      code: "h1-not-first",
      message: "The H1 is not the first line of content.",
      fix: "Move the single H1 above the summary, the details, and every H2.",
    });
  }
  if (h1Count > 1) {
    findings.push({
      severity: "error",
      code: "multiple-h1",
      message: `The file has ${h1Count} H1 headings. The spec allows one.`,
      fix: "Keep a single H1 and turn the others into H2 sections.",
    });
  }
  if (!sawSummary) {
    findings.push({
      severity: "info",
      code: "no-summary",
      message: "There is no blockquote summary. The spec makes that block optional and places it under the H1.",
      fix: "Add one `> ` line under the H1 with a short description of the site.",
    });
  } else if (lateSummary) {
    findings.push({
      severity: "warning",
      code: "summary-not-first",
      message: "A blockquote appears after other content. The spec puts the summary directly under the H1.",
      fix: "Move the summary blockquote to the first block under the H1.",
    });
  }
  if (deeper) {
    findings.push({
      severity: "info",
      code: "deeper-headings",
      message: `${deeper} heading${deeper === 1 ? "" : "s"} go deeper than H2. The spec's file lists use H2.`,
      fix: "Use H2 for each group of links.",
    });
  }
  if (linksBeforeH2) {
    findings.push({
      severity: "info",
      code: "links-before-h2",
      message: `${linksBeforeH2} markdown link${linksBeforeH2 === 1 ? "" : "s"} sit above the first H2.`,
      fix: "Put file lists under H2 headings. Detail text above the H2s can stay.",
    });
  }
  if (malformed) {
    findings.push({
      severity: "warning",
      code: "malformed-links",
      message: `${malformed} list item${malformed === 1 ? "" : "s"} ${malformed === 1 ? "is" : "are"} not \`[name](url)\`. Line${malformedLines.length === 1 ? "" : "s"} ${malformedLines.join(", ")}.`,
      fix: "Rewrite each item as `- [name](https://host/page.md): notes`.",
    });
  }

  const emptySections = sections.filter((section) => section.links === 0);
  if (emptySections.length) {
    const sample = emptySections
      .slice(0, 3)
      .map((section) => section.heading)
      .join(", ");
    findings.push({
      severity: "warning",
      code: "sections-without-links",
      message: `${emptySections.length} H2 section${emptySections.length === 1 ? "" : "s"} contain no markdown link list (${sample}).`,
      fix: "Under each H2, add `- [name](url): notes`, or remove the heading.",
    });
  }

  const optional = sections.filter((section) => section.heading.toLowerCase() === "optional");
  if (!optional.length) {
    findings.push({
      severity: "info",
      code: "optional-missing",
      message: "There is no Optional section. The spec uses that H2 for links an agent can skip.",
      fix: "Add a final `## Optional` list for secondary pages.",
    });
  } else if (optional.some((section) => section.heading !== "Optional")) {
    findings.push({
      severity: "info",
      code: "optional-name",
      message: "The secondary section is not spelled Optional.",
      fix: "Name the heading exactly `Optional` so a short-context reader can find it.",
    });
  }
  if (optional.length && sections.at(-1)?.heading.toLowerCase() !== "optional") {
    findings.push({
      severity: "info",
      code: "optional-not-last",
      message: "Optional is not the last H2. The spec's example puts skippable links at the end.",
      fix: "Move `## Optional` below the other H2 sections.",
    });
  }

  addLinkFindings(findings, links, options?.baseUrl);

  return {
    title,
    summary: summaryLines.join(" ").replace(/\s+/g, " ").trim() || null,
    sections,
    links,
    findings: capFindings(findings),
  };
}

function addLinkFindings(findings: Finding[], links: LlmsLink[], baseUrl?: string | null) {
  const relative: string[] = [];
  const badScheme: string[] = [];
  const httpLinks: string[] = [];
  const seen = new Map<string, number>();
  let external = 0;
  const externalSamples: string[] = [];
  let baseHost: string | null = null;
  if (baseUrl) {
    try {
      baseHost = new URL(baseUrl).hostname.toLowerCase();
    } catch {
      baseHost = null;
    }
  }

  for (const link of links) {
    const raw = link.url.trim();
    const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(raw);
    if (scheme && scheme[1]?.toLowerCase() !== "http" && scheme[1]?.toLowerCase() !== "https") {
      badScheme.push(raw);
      continue;
    }
    if (!link.absolute) {
      relative.push(raw);
      const relativeKey = raw;
      seen.set(relativeKey, (seen.get(relativeKey) ?? 0) + 1);
      continue;
    }
    if (/^http:\/\//i.test(raw) && httpLinks.length < 3) httpLinks.push(raw);
    let key = raw;
    let host: string | null = null;
    try {
      const url = new URL(raw);
      url.hash = "";
      host = url.hostname.toLowerCase();
      key = url.href;
    } catch {
      key = raw;
    }
    seen.set(key, (seen.get(key) ?? 0) + 1);
    if (baseHost && host && host !== baseHost) {
      external += 1;
      if (externalSamples.length < 3) externalSamples.push(raw);
    }
  }

  const duplicates = [...seen.entries()].filter((entry) => entry[1] > 1);
  if (badScheme.length) {
    findings.push({
      severity: "error",
      code: "bad-scheme",
      message: `${badScheme.length} link${badScheme.length === 1 ? "" : "s"} use a scheme other than http or https (${sample(badScheme)}).`,
      fix: "Point each link at an https URL an agent can fetch.",
    });
  }
  if (relative.length) {
    findings.push({
      severity: "warning",
      code: "relative-urls",
      message: `${relative.length} link${relative.length === 1 ? "" : "s"} are relative (${sample(relative)}).`,
      fix: "Use absolute https URLs so the file still works when an agent reads it outside the browser.",
    });
  }
  if (duplicates.length) {
    const extra = duplicates.reduce((sum, entry) => sum + entry[1] - 1, 0);
    findings.push({
      severity: "warning",
      code: "duplicate-urls",
      message: `${extra} duplicate URL${extra === 1 ? "" : "s"} (${sample(duplicates.map((entry) => entry[0]))}).`,
      fix: "Keep one link per URL.",
    });
  }
  if (external) {
    findings.push({
      severity: "info",
      code: "external-hosts",
      message: `${external} link${external === 1 ? "" : "s"} leave this host (${sample(externalSamples)}). The spec allows external URLs.`,
      fix: "Keep an off-site link only when that page is the one an agent should read.",
    });
  }
  if (httpLinks.length) {
    findings.push({
      severity: "info",
      code: "http-links",
      message: `Some links use http (${sample(httpLinks)}).`,
      fix: "Prefer https URLs.",
    });
  }
}

function classifyUrl(raw: string, baseUrl?: string | null): Classified {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const url = new URL(trimmed);
      return { absolute: true, href: url.href, host: url.hostname.toLowerCase(), badScheme: false };
    } catch {
      return { absolute: false, href: trimmed, host: null, badScheme: false };
    }
  }
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(trimmed);
  if (scheme) return { absolute: false, href: trimmed, host: null, badScheme: true };
  if (baseUrl) {
    try {
      const url = new URL(trimmed, baseUrl);
      return { absolute: false, href: url.href, host: url.hostname.toLowerCase(), badScheme: false };
    } catch {
      return { absolute: false, href: trimmed, host: null, badScheme: false };
    }
  }
  return { absolute: false, href: trimmed, host: null, badScheme: false };
}

function sample(values: string[]) {
  return values
    .slice(0, 3)
    .map((value) => value.slice(0, 120))
    .join(", ");
}

function capFindings(findings: Finding[]) {
  if (findings.length <= 40) return findings;
  return [
    ...findings.slice(0, 39),
    {
      severity: "info" as const,
      code: "findings-capped",
      message: `${findings.length - 39} more findings were left off this list.`,
      fix: "Fix the errors above and run the check again.",
    },
  ];
}

export function countBySeverity(findings: Finding[]) {
  return {
    error: findings.filter((finding) => finding.severity === "error").length,
    warning: findings.filter((finding) => finding.severity === "warning").length,
    info: findings.filter((finding) => finding.severity === "info").length,
  };
}
