import { csvResponse } from "@/lib/csv";
import { extractHtmlTables } from "@/lib/html-tables";
import { getBlogPost } from "@/lib/blog";

export async function GET(_request: Request, context: { params: Promise<{ slug: string; index: string }> }) {
  const { slug, index } = await context.params;
  const post = await getBlogPost(slug);
  const table = post ? extractHtmlTables(post.html)[Number(index) - 1] : undefined;
  if (!post || !table || !table.headers.length) return new Response("Not found", { status: 404 });
  return csvResponse(table.headers, table.rows, `${slug}-table-${index}.csv`);
}
