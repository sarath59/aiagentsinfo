import { contentDir, loadMarkdownCollection } from "@/lib/markdown";
import { readingTime } from "@/lib/utils";

export const researchTypes = [
  { slug: "paper-breakdown", title: "Paper breakdown" },
  { slug: "original-report", title: "Original report" },
  { slug: "benchmark", title: "Benchmark" },
] as const;

export type ResearchType = (typeof researchTypes)[number]["slug"];

export type ResearchFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  type: ResearchType;
  topics: string[];
  /** Company slugs from lib/companies. Logos render from this list. */
  companies?: string[];
  sample?: boolean;
  paperTitle?: string;
  paperAuthors?: string;
  paperYear?: number;
  paperUrl?: string;
  codeUrl?: string;
  venue?: string;
  abstract: string;
  keyFindings: string[];
  methodology: string;
  limitations: string[];
  /** Rendered after the abstract on longform breakdowns. */
  whyItMatters?: string;
  /** When true, Article JSON-LD carries the CC BY 4.0 license URL. The paper keeps its own license. */
  contentLicense?: boolean;
  faq?: { question: string; answer: string }[];
  references: { title: string; url?: string; note?: string }[];
  citation: {
    bibtex: string;
    apa?: string;
  };
};

export type ResearchDoc = {
  slug: string;
  html: string;
  toc: { id: string; text: string; level: 2 | 3 }[];
  readingMinutes: number;
} & ResearchFrontmatter;

export async function getResearchDocs(): Promise<ResearchDoc[]> {
  const docs = await loadMarkdownCollection<ResearchFrontmatter>(
    contentDir("research"),
  );
  return docs
    .map((doc) => ({
      slug: doc.slug,
      html: doc.html,
      toc: doc.toc,
      readingMinutes: readingTime(
        [
          doc.content,
          doc.data.abstract,
          doc.data.whyItMatters ?? "",
          doc.data.methodology,
          ...doc.data.keyFindings,
          ...doc.data.limitations,
        ].join("\n"),
      ),
      ...doc.data,
    }))
    .filter((doc) => doc.sample !== true)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getResearchDoc(slug: string) {
  const docs = await getResearchDocs();
  return docs.find((doc) => doc.slug === slug);
}

export function relatedResearchDocs(doc: ResearchDoc, all: ResearchDoc[], limit = 3) {
  return all
    .filter((other) => other.slug !== doc.slug)
    .map((other) => {
      const topicScore = other.topics.filter((topic) => doc.topics.includes(topic)).length;
      const typeScore = other.type === doc.type ? 1 : 0;
      return { other, score: topicScore * 2 + typeScore };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.other.date) - +new Date(a.other.date))
    .slice(0, limit)
    .map((entry) => entry.other);
}

export function researchTypeTitle(slug: string) {
  return researchTypes.find((type) => type.slug === slug)?.title ?? slug;
}

export function researchTopics(docs: ResearchDoc[]) {
  return Array.from(new Set(docs.flatMap((doc) => doc.topics))).sort();
}
