import { loadMarkdownCollection } from "@/lib/markdown";
import { contentDir } from "@/lib/markdown";
import { readingTime } from "@/lib/utils";

export const blogCategories = [
  { slug: "explainer", title: "Explainers" },
  { slug: "news", title: "News" },
  { slug: "guide", title: "Guides" },
  { slug: "tools", title: "Tools" },
] as const;

export type BlogCategory = (typeof blogCategories)[number]["slug"];

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: BlogCategory;
  topics: string[];
  audience?: string[];
  byline?: string;
  /** Company slugs from lib/companies. Logos render from this list. */
  companies?: string[];
  sample?: boolean;
  sources?: { title: string; url: string }[];
  faq?: { question: string; answer: string }[];
  takeaways?: string[];
  /** When true, Article JSON-LD carries the CC BY 4.0 license URL. */
  contentLicense?: boolean;
  /** Original numbers on the page. Rendered as Dataset JSON-LD, separate from the article. */
  dataset?: {
    title: string;
    description: string;
    isBasedOn?: string;
  };
};

export type BlogPost = {
  slug: string;
  html: string;
  toc: { id: string; text: string; level: 2 | 3 }[];
  readingMinutes: number;
} & BlogFrontmatter;

function byDate(a: BlogPost, b: BlogPost) {
  return +new Date(b.date) - +new Date(a.date);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const docs = await loadMarkdownCollection<BlogFrontmatter>(
    contentDir("blog"),
  );
  return docs
    .map((doc) => ({
      slug: doc.slug,
      html: doc.html,
      toc: doc.toc,
      readingMinutes: readingTime(doc.content),
      ...doc.data,
    }))
    .filter((post) => post.sample !== true)
    .sort(byDate);
}

export async function getBlogPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export function relatedBlogPosts(post: BlogPost, all: BlogPost[], limit = 3) {
  const ranked = all
    .filter((other) => other.slug !== post.slug)
    .map((other) => {
      const topicScore = other.topics.filter((topic) =>
        post.topics.includes(topic),
      ).length;
      const categoryScore = other.category === post.category ? 1 : 0;
      return { other, score: topicScore * 2 + categoryScore };
    })
    .sort((a, b) => b.score - a.score || +new Date(b.other.date) - +new Date(a.other.date));
  const matched = ranked.filter((entry) => entry.score > 0);
  const chosen = (matched.length ? matched : ranked).slice(0, limit);
  return chosen.map((entry) => entry.other);
}

export function categoryTitle(slug: string) {
  return blogCategories.find((category) => category.slug === slug)?.title ?? slug;
}
