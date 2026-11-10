import type { PdfSection } from "@/lib/pdf";

export type ChartSpec = {
  id: string;
  title: string;
  caption: string;
  unit: string;
  source: string;
  series: string[];
  categories: { label: string; values: number[]; displays: string[] }[];
};

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "quote"; text: string; cite: string }
  | { kind: "callout"; title: string; text: string }
  | { kind: "means"; audience: "Builders" | "Buyers" | "Builders and buyers"; text: string }
  | { kind: "chart"; id: string }
  | { kind: "table"; caption: string; headers: string[]; rows: string[][] };

export type ReportChapter = {
  id: string;
  title: string;
  blocks: Block[];
};

export function plain(text: string) {
  return text
    .replace(/\[\[(\d+)\]\]/g, "[$1]")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");
}

export function chapterPdf(chapters: ReportChapter[], charts: ChartSpec[]): PdfSection[] {
  const byId = new Map(charts.map((chart) => [chart.id, chart]));
  return chapters.map((chapter) => {
    const paragraphs: string[] = [];
    const bullets: string[] = [];
    let table: PdfSection["table"];
    for (const block of chapter.blocks) {
      if (block.kind === "p" || block.kind === "h3" || block.kind === "callout") {
        paragraphs.push(plain(block.kind === "h3" ? block.text : block.kind === "callout" ? `${block.title}. ${block.text}` : block.text));
      } else if (block.kind === "quote") {
        paragraphs.push(plain(`"${block.text}" ${block.cite}`));
      } else if (block.kind === "means") {
        bullets.push(plain(`${block.audience}: ${block.text}`));
      } else if (block.kind === "table" && !table) {
        table = { caption: block.caption, headers: block.headers, rows: block.rows };
      } else if (block.kind === "chart" && !table) {
        const chart = byId.get(block.id);
        if (chart) {
          table = {
            caption: chart.caption,
            headers: ["", ...chart.series],
            rows: chart.categories.map((category) => [category.label, ...category.displays]),
          };
        }
      }
    }
    return {
      heading: chapter.title,
      ...(paragraphs.length ? { paragraphs } : {}),
      ...(bullets.length ? { bullets } : {}),
      ...(table ? { table } : {}),
    };
  });
}

export function chartsCsv(charts: ChartSpec[]) {
  const headers = ["Chart", "Category", "Series", "Value", "Display", "Unit", "Source"];
  const rows = charts.flatMap((chart) =>
    chart.categories.flatMap((category) =>
      chart.series.map((series, index) => [
        chart.title,
        category.label,
        series,
        String(category.values[index] ?? ""),
        category.displays[index] ?? "",
        chart.unit,
        chart.source,
      ]),
    ),
  );
  return { headers, rows };
}
