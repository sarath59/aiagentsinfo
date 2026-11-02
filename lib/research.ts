import { contentDir, loadMarkdownCollection } from "@/lib/markdown";

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
      ...doc.data,
    }))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getResearchDoc(slug: string) {
  const docs = await getResearchDocs();
  return docs.find((doc) => doc.slug === slug);
}

export function researchTypeTitle(slug: string) {
  return researchTypes.find((type) => type.slug === slug)?.title ?? slug;
}

export function researchTopics(docs: ResearchDoc[]) {
  return Array.from(new Set(docs.flatMap((doc) => doc.topics))).sort();
}
