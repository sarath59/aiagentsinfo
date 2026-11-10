import { sourceComment } from "@/lib/attribution";
import { toCsv } from "@/lib/csv";
import { privateFileHeaders, reportDownloadAllowed, safeDownloadName, unauthorizedDownload } from "@/lib/report-download-http";
import { isDownloadableReport, reportAttribution, reportCsv } from "@/lib/report-downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isDownloadableReport(slug)) return new Response("Not found", { status: 404 });
  if (!reportDownloadAllowed(request, slug)) return unauthorizedDownload();
  const table = new URL(request.url).searchParams.get("table");
  const csv = reportCsv(slug, table);
  if (!csv) return new Response("Not found", { status: 404 });
  const source = reportAttribution(slug);
  const filename = safeDownloadName(csv.filename, "report.csv");
  return new Response(toCsv(csv.headers, csv.rows, source ? sourceComment(source) : undefined), {
    headers: privateFileHeaders({
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    }),
  });
}
