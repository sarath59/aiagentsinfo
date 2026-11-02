import { contentDir, loadMarkdownCollection } from "@/lib/markdown";

export type GlossaryFrontmatter = {
  term: string;
  shortDefinition: string;
  sample?: boolean;
  related?: string[];
  topics?: string[];
};

export type GlossaryTerm = {
  slug: string;
  html: string;
} & GlossaryFrontmatter;

export async function getGlossaryTerms(): Promise<GlossaryTerm[]> {
  const docs = await loadMarkdownCollection<GlossaryFrontmatter>(
    contentDir("glossary"),
  );
  return docs
    .map((doc) => ({
      slug: doc.slug,
      html: doc.html,
      ...doc.data,
    }))
    .filter((term) => term.sample !== true)
    .sort((a, b) => a.term.localeCompare(b.term));
}

export async function getGlossaryTerm(slug: string) {
  const terms = await getGlossaryTerms();
  return terms.find((term) => term.slug === slug);
}

export function glossaryByLetter(terms: GlossaryTerm[]) {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const term of terms) {
    const letter = term.term.charAt(0).toUpperCase();
    const list = groups.get(letter) ?? [];
    list.push(term);
    groups.set(letter, list);
  }
  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
}
