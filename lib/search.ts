import { getBlogPosts } from "@/lib/blog";
import { companyForName, resolveCompanies, type LogoTile } from "@/lib/companies";
import { getDirectoryListings } from "@/lib/directory";
import { getGlossaryTerms } from "@/lib/glossary";
import { getResearchDocs } from "@/lib/research";

export type SearchMark = {
  name: string;
  src?: string;
  tile?: LogoTile;
};

export type SearchHit = {
  type: "Blog" | "Research" | "Glossary" | "Directory";
  title: string;
  description: string;
  href: string;
  marks: SearchMark[];
};

export async function searchSite(query: string): Promise<SearchHit[]> {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const [posts, research, glossary, listings] = await Promise.all([
    getBlogPosts(),
    getResearchDocs(),
    getGlossaryTerms(),
    getDirectoryListings(),
  ]);

  const hits: SearchHit[] = [];

  for (const post of posts) {
    if (`${post.title} ${post.description} ${post.topics.join(" ")}`.toLowerCase().includes(q)) {
      hits.push({
        type: "Blog",
        title: post.title,
        description: post.description,
        href: `/blog/${post.slug}`,
        marks: resolveCompanies(post.companies).map((company) => ({
          name: company.name,
          src: company.logo,
          tile: company.tile,
        })),
      });
    }
  }
  for (const doc of research) {
    if (`${doc.title} ${doc.description} ${doc.abstract}`.toLowerCase().includes(q)) {
      hits.push({
        type: "Research",
        title: doc.title,
        description: doc.description,
        href: `/research/${doc.slug}`,
        marks: resolveCompanies(doc.companies).map((company) => ({
          name: company.name,
          src: company.logo,
          tile: company.tile,
        })),
      });
    }
  }
  for (const term of glossary) {
    if (`${term.term} ${term.shortDefinition}`.toLowerCase().includes(q)) {
      hits.push({
        type: "Glossary",
        title: term.term,
        description: term.shortDefinition,
        href: `/glossary/${term.slug}`,
        marks: [],
      });
    }
  }
  for (const listing of listings) {
    if (`${listing.name} ${listing.vendor} ${listing.summary} ${listing.tags.join(" ")}`.toLowerCase().includes(q)) {
      const brand = companyForName(listing.name);
      hits.push({
        type: "Directory",
        title: listing.name,
        description: listing.summary,
        href: `/directory/${listing.slug}`,
        marks: [
          {
            name: listing.name,
            src: listing.logo || undefined,
            tile: brand?.tile,
          },
        ],
      });
    }
  }
  return hits;
}
