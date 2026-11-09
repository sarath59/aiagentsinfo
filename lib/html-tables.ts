import { citeSentence, sourceDateLabel, sourceDay, type PageSource } from "@/lib/attribution";

export type HtmlTable = {
  headers: string[];
  rows: string[][];
};

function decode(value: string) {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();
}

function cells(row: string) {
  return [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((match) => decode(match[1]));
}

export function extractHtmlTables(html: string): HtmlTable[] {
  const tables = [...html.matchAll(/<table\b[\s\S]*?<\/table>/gi)];
  return tables.map((match) => {
    const parsed = [...match[0].matchAll(/<tr\b[\s\S]*?<\/tr>/gi)]
      .map((row) => cells(row[0]))
      .filter((row) => row.length > 0);
    return {
      headers: parsed[0] ?? [],
      rows: parsed.slice(1),
    };
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tableSourceHtml(source: PageSource, showCite: boolean) {
  const title = escapeHtml(source.title);
  const dated = source.updated
    ? `, updated <time datetime="${sourceDay(source.updated)}">${escapeHtml(sourceDateLabel(source.updated))}</time>`
    : "";
  const cite = showCite ? ` How to cite: ${escapeHtml(citeSentence(source))}` : "";
  return `<p class="data-source">Source: <a href="https://www.aiagentsinfo.com">aiagentsinfo.com</a>, <a href="${source.path}">${title}</a>${dated}.${cite}</p>`;
}

export function withTableDownloads(html: string, basePath: string, source?: PageSource & { showCite?: boolean }) {
  const unwrapped = html.replace(
    /<div class="table-scroll">\s*(<table\b[\s\S]*?<\/table>)\s*<\/div>/gi,
    "$1",
  );
  let index = 0;
  return unwrapped.replace(/<table\b[\s\S]*?<\/table>/gi, (table) => {
    index += 1;
    const credit = source ? tableSourceHtml(source, index === 1 && source.showCite === true) : "";
    return `<div class="table-block"><p class="table-actions no-print"><a href="${basePath}/${index}">Download CSV</a></p><div class="table-scroll">${table}</div>${credit}</div>`;
  });
}
