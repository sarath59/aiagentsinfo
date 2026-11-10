import { redirectReportFile } from "@/lib/report-page-redirect";

export function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  return redirectReportFile(request, context.params);
}

export function HEAD(request: Request, context: { params: Promise<{ slug: string }> }) {
  return redirectReportFile(request, context.params);
}
