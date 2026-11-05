import { buildPdf } from "@/lib/pdf";
import { reportPdf } from "@/lib/report-downloads";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const model = reportPdf(slug);
  if (!model) return new Response("Not found", { status: 404 });
  const bytes = await buildPdf(model);
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${model.filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
