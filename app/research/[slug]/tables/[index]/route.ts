import { csvResponse } from "@/lib/csv";
import { extractHtmlTables } from "@/lib/html-tables";
import { getResearchDoc } from "@/lib/research";

export async function GET(_request: Request, context: { params: Promise<{ slug: string; index: string }> }) {
  const { slug, index } = await context.params;
  const doc = await getResearchDoc(slug);
  const table = doc ? extractHtmlTables(doc.html)[Number(index) - 1] : undefined;
  if (!doc || !table || !table.headers.length) return new Response("Not found", { status: 404 });
  return csvResponse(table.headers, table.rows, `${slug}-table-${index}.csv`, {
    title: doc.title,
    updated: doc.updated ?? doc.date,
    path: `/research/${doc.slug}`,
  });
}
