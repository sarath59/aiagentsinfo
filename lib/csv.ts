import { sourceComment, type PageSource } from "@/lib/attribution";

function cell(value: string) {
  const text = value.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  if (/[",]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsv(headers: string[], rows: string[][], comment?: string) {
  const table = [headers, ...rows].map((row) => row.map((value) => cell(value)).join(",")).join("\r\n") + "\r\n";
  return comment ? `${comment}\r\n${table}` : table;
}

export function csvResponse(headers: string[], rows: string[][], filename: string, source?: PageSource) {
  return new Response(toCsv(headers, rows, source ? sourceComment(source) : undefined), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
