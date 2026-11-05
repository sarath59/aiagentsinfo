import { csvResponse } from "@/lib/csv";
import { reportCsv } from "@/lib/report-downloads";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const table = new URL(request.url).searchParams.get("table");
  const csv = reportCsv(slug, table);
  if (!csv) return new Response("Not found", { status: 404 });
  return csvResponse(csv.headers, csv.rows, csv.filename);
}
