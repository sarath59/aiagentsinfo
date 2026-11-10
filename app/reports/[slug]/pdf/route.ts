import { buildPdf } from "@/lib/pdf";
import { privateFileHeaders, reportDownloadAllowed, safeDownloadName, unauthorizedDownload } from "@/lib/report-download-http";
import { isDownloadableReport, reportPdf } from "@/lib/report-downloads";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!isDownloadableReport(slug)) return new Response("Not found", { status: 404 });
  if (!reportDownloadAllowed(request, slug)) return unauthorizedDownload();
  const model = reportPdf(slug);
  if (!model) return new Response("Not found", { status: 404 });
  const bytes = await buildPdf(model);
  const filename = safeDownloadName(model.filename, "report.pdf");
  return new Response(Buffer.from(bytes), {
    headers: privateFileHeaders({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    }),
  });
}
