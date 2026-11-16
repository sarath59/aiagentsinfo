import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/site";

/** Old /pdf and /csv URLs. The report is the HTML page. */
export async function redirectReportFile(request: Request, params: Promise<{ slug: string }>) {
  const { slug } = await params;
  const location = new URL(`/reports/${encodeURIComponent(slug)}`, request.url);
  location.search = "";
  const canonical = absoluteUrl(`/reports/${encodeURIComponent(slug)}`);
  return NextResponse.redirect(location, {
    status: 308,
    headers: { Link: `<${canonical}>; rel="canonical"` },
  });
}
