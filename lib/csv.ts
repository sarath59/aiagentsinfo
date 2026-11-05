function cell(value: string) {
  const text = value.replace(/\r?\n/g, " ").replace(/\s+/g, " ").trim();
  if (/[",]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export function toCsv(headers: string[], rows: string[][]) {
  return [headers, ...rows].map((row) => row.map((value) => cell(value)).join(",")).join("\r\n") + "\r\n";
}

export function csvResponse(headers: string[], rows: string[][], filename: string) {
  return new Response(toCsv(headers, rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
