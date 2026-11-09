import snapshot from "@/data/trackers/agents-md-snapshot.json";
import { fetchJson, fetchText, githubAuthHeaders, githubToken, integer, isoDay, shortDate } from "@/lib/trackers/http";

const PAPER = {
  date: "2026-10-16",
  eitherRoot: 6006,
  frame: 22854,
  rootAgentsMd: 4954,
  rootClaudeMd: 3440,
  onlyAgentsMd: 2566,
  onlyClaudeMd: 1052,
  both: 2388,
  title: "What Open-Source Projects Tell Their Coding Agents: A Census of AGENTS.md and CLAUDE.md",
  url: "https://arxiv.org/abs/2610.31715",
  note: "Public GitHub repositories with at least 1,000 stars, a push in the previous 90 days, not a fork, not archived, in thirteen languages. An adopter has a root AGENTS.md or CLAUDE.md, exact case, on the default branch.",
} as const;

type GithubSearch = {
  total_count?: number;
  incomplete_results?: boolean;
};

export type SearchObservation = {
  label: string;
  query: string;
  count: number;
  incomplete: boolean;
  source: string;
  sourceUrl: string;
  retrievedAt: string;
};

export type AgentsMdReport = {
  live: boolean;
  retrievedAt: string;
  retrievedDay: string;
  github: SearchObservation[];
  specStars: number | null;
  specStarsRetrievedAt: string | null;
  homepageClaim: string | null;
  homepageRetrievedAt: string | null;
  paper: typeof PAPER;
  snapshot: {
    sourcegraphRootAgentsMd: number;
    sourcegraphRootClaudeMd: number;
    sourcegraphRetrievedAt: string;
    sourcegraphWarnings: string[];
  };
  failures: string[];
};

function snapshotGithub(): SearchObservation[] {
  return (snapshot.github ?? []) as SearchObservation[];
}

export async function getAgentsMdReport(): Promise<AgentsMdReport> {
  const failures: string[] = [];
  const github: SearchObservation[] = [];
  const retrieved: string[] = [];

  const queries = [
    {
      label: "Files named AGENTS.md",
      query: "filename:AGENTS.md",
    },
    {
      label: "Files named CLAUDE.md",
      query: "filename:CLAUDE.md",
    },
  ];

  const auth = githubAuthHeaders();
  if (!githubToken()) {
    failures.push(
      "GitHub code search was not called: this host has no GITHUB_TOKEN. Code search requires authentication. The census, homepage claim, spec-repo stars, and the dated public-index snapshot stay on the page.",
    );
  }
  for (const item of queries) {
    if (!githubToken()) break;
    const url = `https://api.github.com/search/code?q=${encodeURIComponent(item.query)}`;
    const response = await fetchJson<GithubSearch>(url, {
      headers: {
        Accept: "application/vnd.github+json",
        ...auth,
      },
      timeoutMs: 10_000,
    });
    if (!response.ok) {
      failures.push(`GitHub code search (${item.query}): ${response.error}`);
      continue;
    }
    const count = response.data.total_count;
    if (typeof count !== "number") {
      failures.push(`GitHub code search (${item.query}): missing total_count`);
      continue;
    }
    github.push({
      label: item.label,
      query: item.query,
      count,
      incomplete: response.data.incomplete_results === true,
      source: "GitHub code search API",
      sourceUrl: url,
      retrievedAt: response.retrievedAt,
    });
    retrieved.push(response.retrievedAt);
  }

  const spec = await fetchJson<{ stargazers_count?: number }>("https://api.github.com/repos/agentsmd/agents.md", {
    headers: {
      Accept: "application/vnd.github+json",
      ...auth,
    },
    timeoutMs: 8_000,
  });
  let specStars: number | null = null;
  let specStarsRetrievedAt: string | null = null;
  if (spec.ok && typeof spec.data.stargazers_count === "number") {
    specStars = spec.data.stargazers_count;
    specStarsRetrievedAt = spec.retrievedAt;
    retrieved.push(spec.retrievedAt);
  } else {
    failures.push(`GitHub repo agentsmd/agents.md: ${spec.ok ? "missing stargazers_count" : spec.error}`);
  }

  const homepage = await fetchText("https://agents.md/", { timeoutMs: 8_000 });
  let homepageClaim: string | null = null;
  let homepageRetrievedAt: string | null = null;
  if (homepage.ok) {
    const match = homepage.data.match(/used by over\s+([0-9]+k)\s+open-source projects/i);
    homepageClaim = match ? `over ${match[1]} open-source projects` : null;
    homepageRetrievedAt = homepage.retrievedAt;
    retrieved.push(homepage.retrievedAt);
    if (!homepageClaim) failures.push("agents.md homepage: the 60k sentence was not found in the HTML");
  } else {
    failures.push(`agents.md homepage: ${homepage.error}`);
  }

  const liveGithub = github.length > 0;
  const retrievedAt =
    retrieved.sort().at(-1) ??
    specStarsRetrievedAt ??
    snapshot.retrievedAt ??
    new Date().toISOString();

  return {
    live: liveGithub,
    retrievedAt,
    retrievedDay: isoDay(retrievedAt),
    github: liveGithub ? github : snapshotGithub(),
    specStars: specStars ?? snapshot.specStars,
    specStarsRetrievedAt: specStarsRetrievedAt ?? snapshot.specStarsRetrievedAt,
    homepageClaim: homepageClaim ?? snapshot.homepageClaim,
    homepageRetrievedAt: homepageRetrievedAt ?? snapshot.homepageRetrievedAt,
    paper: PAPER,
    snapshot: {
      sourcegraphRootAgentsMd: snapshot.sourcegraph.rootAgentsMd,
      sourcegraphRootClaudeMd: snapshot.sourcegraph.rootClaudeMd,
      sourcegraphRetrievedAt: snapshot.sourcegraph.retrievedAt,
      sourcegraphWarnings: snapshot.sourcegraph.warnings,
    },
    failures,
  };
}

export function paperRate() {
  return ((PAPER.eitherRoot / PAPER.frame) * 100).toFixed(1);
}

export function paperSentence() {
  return `${integer(PAPER.eitherRoot)} of ${integer(PAPER.frame)} popular, active GitHub repositories (${paperRate()}%) had a root AGENTS.md or CLAUDE.md on ${shortDate(PAPER.date)}.`;
}

export function githubAgentsCount(report: AgentsMdReport) {
  return report.github.find((item) => item.query === "filename:AGENTS.md") ?? report.github[0] ?? null;
}

export function agentsMdFaq(report: AgentsMdReport) {
  const github = githubAgentsCount(report);
  const githubLead = github
    ? `GitHub code search returned ${integer(github.count)} files named AGENTS.md${github.incomplete ? " (incomplete results flag set)" : ""} on ${shortDate(github.retrievedAt)}.`
    : "GitHub’s code search API did not return a total on this pass, so this page does not print a live GitHub file count.";
  return [
    {
      question: "How many public GitHub repos contain an AGENTS.md file?",
      answer: `${githubLead} That search counts files, including nested paths and whatever GitHub’s index includes. It is not the October 2026 census.`,
    },
    {
      question: "How many popular repositories used AGENTS.md in October 2026?",
      answer: paperSentence(),
    },
    {
      question: "Why don't the live search and the census match?",
      answer:
        "They measure different sets. The census required 1,000 stars, a push in 90 days, thirteen languages, and a root file with exact case. GitHub code search counts files named AGENTS.md across the public index it searches. The AGENTS.md homepage’s “over 60k” sentence is a third, undated claim.",
    },
    {
      question: "Where do the AGENTS.md tracker numbers come from?",
      answer:
        "Live file counts use GitHub’s code search API (q=filename:AGENTS.md) when a token is available. The census figures are copied from arXiv:2610.31715v2. Spec-repo stars come from api.github.com/repos/agentsmd/agents.md. The homepage claim is read from https://agents.md/.",
    },
  ];
}

export function agentsMdTakeaways(report: AgentsMdReport) {
  const github = githubAgentsCount(report);
  const lines: string[] = [];
  if (github) {
    lines.push(
      `GitHub code search: ${integer(github.count)} files named AGENTS.md on ${shortDate(github.retrievedAt)}${github.incomplete ? ", with incomplete_results true" : ""}.`,
    );
  } else {
    lines.push("No live GitHub code-search total on this pass. The census and the last public index snapshot stay on the page.");
  }
  lines.push(paperSentence());
  if (report.homepageClaim) {
    lines.push(
      `The AGENTS.md homepage, read ${report.homepageRetrievedAt ? shortDate(report.homepageRetrievedAt) : "on this pass"}, still says the format is used by ${report.homepageClaim}.`,
    );
  }
  lines.push("File presence is not evidence that an agent read the file or that the file changed task success.");
  return lines;
}
