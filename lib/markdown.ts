import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ParsedDocument<T> = {
  slug: string;
  filepath: string;
  data: T;
  content: string;
  html: string;
  toc: TocItem[];
};

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeStringify, { allowDangerousHtml: true });

export function contentDir(...segments: string[]) {
  return path.join(process.cwd(), "content", ...segments);
}

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[`*_]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const heading = /<h([23]) id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  for (const match of html.matchAll(heading)) {
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    items.push({
      id: match[2],
      text,
      level: Number(match[1]) as 2 | 3,
    });
  }
  return items;
}

export async function renderMarkdown(markdown: string) {
  const file = await processor.process(markdown);
  return String(file);
}

export function listMarkdownFiles(directory: string) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => path.join(directory, file));
}

export async function loadMarkdownCollection<T extends object>(
  directory: string,
): Promise<ParsedDocument<T>[]> {
  const files = listMarkdownFiles(directory);
  const docs = await Promise.all(
    files.map(async (filepath) => {
      const raw = fs.readFileSync(filepath, "utf8");
      const parsed = matter(raw);
      const slugFromFile = path.basename(filepath).replace(/\.mdx?$/, "");
      const data = parsed.data as T & { slug?: string };
      const slug = data.slug || slugFromFile;
      const html = await renderMarkdown(parsed.content);
      return {
        slug,
        filepath,
        data,
        content: parsed.content,
        html,
        toc: extractToc(html),
      } satisfies ParsedDocument<T>;
    }),
  );
  return docs;
}
