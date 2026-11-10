import { verifyReportDownload } from "@/lib/report-download-token";

export function downloadToken(request: Request) {
  return new URL(request.url).searchParams.get("token")?.trim() ?? "";
}

export function unauthorizedDownload() {
  return new Response("Download the full report from the report page. A link is issued after the form.", {
    status: 401,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}

export function reportDownloadAllowed(request: Request, slug: string) {
  return verifyReportDownload(downloadToken(request), slug);
}

export function privateFileHeaders(headers: Record<string, string>) {
  return {
    "Cache-Control": "private, no-store",
    "X-Robots-Tag": "noindex",
    ...headers,
  };
}

export function safeDownloadName(filename: string, fallback: string) {
  const clean = filename.replace(/[^A-Za-z0-9._-]/g, "");
  return clean || fallback;
}
