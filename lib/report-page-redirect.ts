import { NextResponse } from "next/server";

/** Old /pdf and /csv URLs. The report is the HTML page. */
export async function redirectReportFile(request: Request, params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const location = new URL(`/reports/${encodeURIComponent(slug)}`, request.url);
  location.search = "";
  return NextResponse.redirect(location, 308);
}
