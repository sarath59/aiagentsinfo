import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

export type PdfTable = {
  caption: string;
  headers: string[];
  rows: string[][];
};

export type PdfSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: PdfTable;
};

export type PdfModel = {
  filename: string;
  title: string;
  description: string;
  dateLabel: string;
  url: string;
  sections: PdfSection[];
};

const NAVY = rgb(0.043, 0.122, 0.2);
const BLUE = rgb(0.047, 0.361, 0.678);
const GOLD = rgb(0.878, 0.69, 0.29);
const INK = rgb(0.043, 0.122, 0.2);
const MUTED = rgb(0.227, 0.318, 0.408);
const RULE = rgb(0.82, 0.86, 0.9);
const HEADER_FILL = rgb(0.93, 0.95, 0.98);
const ZEBRAS = rgb(0.965, 0.973, 0.98);

function sanitize(value: string) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/×/g, "x")
    .replace(/[^\x09\x0a\x0d\x20-\x7e]/g, "");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const clean = sanitize(text).trim();
  if (!clean) return [""];
  const lines: string[] = [];
  let line = "";
  const words = clean.split(/\s+/);
  for (const word of words) {
    const pieces = splitLong(word, font, size, maxWidth);
    for (const piece of pieces) {
      const next = line ? `${line} ${piece}` : piece;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        line = next;
      } else {
        if (line) lines.push(line);
        line = piece;
      }
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function splitLong(word: string, font: PDFFont, size: number, maxWidth: number) {
  if (font.widthOfTextAtSize(word, size) <= maxWidth) return [word];
  const parts: string[] = [];
  let current = "";
  for (const char of word) {
    const next = current + char;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) current = next;
    else {
      if (current) parts.push(current);
      current = char;
    }
  }
  if (current) parts.push(current);
  return parts.length ? parts : [word];
}

class Writer {
  private doc: PDFDocument;
  private font: PDFFont;
  private bold: PDFFont;
  private page!: PDFPage;
  private y = 0;
  private pageNumber = 0;
  private width = 612;
  private height = 792;
  private readonly margin = 48;

  constructor(doc: PDFDocument, font: PDFFont, bold: PDFFont) {
    this.doc = doc;
    this.font = font;
    this.bold = bold;
  }

  start(landscape: boolean) {
    this.width = landscape ? 792 : 612;
    this.height = landscape ? 612 : 792;
    this.addPage();
  }

  private addPage() {
    this.page = this.doc.addPage([this.width, this.height]);
    this.pageNumber += 1;
    this.page.drawRectangle({ x: 0, y: this.height - 28, width: this.width, height: 28, color: NAVY });
    this.page.drawRectangle({ x: 0, y: this.height - 31, width: this.width, height: 3, color: GOLD });
    this.page.drawText("AI Agents Info", {
      x: this.margin,
      y: this.height - 19,
      size: 9,
      font: this.bold,
      color: rgb(1, 1, 1),
    });
    this.y = this.height - 52;
  }

  finish(url: string) {
    const pages = this.doc.getPages();
    pages.forEach((page, index) => {
      const width = page.getWidth();
      page.drawText(sanitize(url), {
        x: this.margin,
        y: 22,
        size: 8,
        font: this.font,
        color: MUTED,
      });
      const label = `${index + 1} / ${pages.length}`;
      const labelWidth = this.font.widthOfTextAtSize(label, 8);
      page.drawText(label, {
        x: width - this.margin - labelWidth,
        y: 22,
        size: 8,
        font: this.font,
        color: MUTED,
      });
    });
  }

  private ensure(height: number, landscape: boolean) {
    if (this.y - height < 42) this.addPageKeeping(landscape);
  }

  private addPageKeeping(landscape: boolean) {
    const width = landscape ? 792 : 612;
    const height = landscape ? 612 : 792;
    if (this.width !== width) {
      this.width = width;
      this.height = height;
    }
    this.addPage();
  }

  titleBlock(title: string, description: string, dateLabel: string) {
    this.paragraph(title, 18, this.bold, INK, 22);
    this.y -= 4;
    this.paragraph(description, 11, this.font, MUTED, 15);
    this.y -= 2;
    this.paragraph(dateLabel, 10, this.font, BLUE, 14);
    this.y -= 8;
  }

  heading(text: string) {
    this.ensure(36, false);
    this.y -= 8;
    this.page.drawRectangle({ x: this.margin, y: this.y - 2, width: 36, height: 2, color: GOLD });
    this.y -= 16;
    this.paragraph(text, 13, this.bold, NAVY, 17);
    this.y -= 4;
  }

  paragraph(text: string, size: number, font: PDFFont, color: ReturnType<typeof rgb>, lineHeight: number) {
    const lines = wrap(text, font, size, this.width - this.margin * 2);
    for (const line of lines) {
      this.ensure(lineHeight + 4, false);
      this.page.drawText(line, { x: this.margin, y: this.y - size, size, font, color });
      this.y -= lineHeight;
    }
  }

  bullet(text: string) {
    const size = 10;
    const lines = wrap(text, this.font, size, this.width - this.margin * 2 - 14);
    lines.forEach((line, index) => {
      this.ensure(14, false);
      if (index === 0) {
        this.page.drawCircle({ x: this.margin + 3, y: this.y - 7, size: 1.6, color: BLUE });
      }
      this.page.drawText(line, {
        x: this.margin + 12,
        y: this.y - size,
        size,
        font: this.font,
        color: INK,
      });
      this.y -= 13;
    });
    this.y -= 2;
  }

  table(table: PdfTable) {
    this.addPageKeeping(true);
    this.paragraph(table.caption, 11, this.bold, NAVY, 15);
    this.y -= 6;
    const headers = table.headers.map((header) => sanitize(header));
    const body = table.rows.map((row) => headers.map((_, index) => sanitize(row[index] ?? "")));
    const usable = this.width - this.margin * 2;
    const widths = columnWidths(headers, body, usable, this.font, this.bold);
    this.drawRow(headers, widths, 8, this.bold, rgb(1, 1, 1), NAVY, true);
    body.forEach((row, index) => {
      this.drawRow(row, widths, 7.5, this.font, INK, index % 2 === 0 ? ZEBRAS : rgb(1, 1, 1), true);
    });
    this.y -= 8;
  }

  private drawRow(
    values: string[],
    widths: number[],
    size: number,
    font: PDFFont,
    color: ReturnType<typeof rgb>,
    fill: ReturnType<typeof rgb>,
    landscape: boolean,
  ) {
    const wrapped = values.map((value, index) => wrap(value, font, size, Math.max(12, widths[index] - 8)));
    const lineHeight = size + 2;
    const height = Math.max(...wrapped.map((lines) => lines.length)) * lineHeight + 8;
    if (this.y - height < 42) {
      this.addPageKeeping(landscape);
    }
    let x = this.margin;
    this.page.drawRectangle({ x, y: this.y - height, width: widths.reduce((sum, width) => sum + width, 0), height, color: fill });
    wrapped.forEach((lines, index) => {
      this.page.drawRectangle({
        x,
        y: this.y - height,
        width: widths[index],
        height,
        borderColor: RULE,
        borderWidth: 0.4,
      });
      lines.forEach((line, lineIndex) => {
        this.page.drawText(line, {
          x: x + 4,
          y: this.y - 6 - size - lineIndex * lineHeight,
          size,
          font,
          color,
        });
      });
      x += widths[index];
    });
    this.y -= height;
  }
}

function columnWidths(headers: string[], rows: string[][], usable: number, font: PDFFont, bold: PDFFont) {
  const count = headers.length || 1;
  const weights = headers.map((header, index) => {
    const samples = [header, ...rows.slice(0, 12).map((row) => row[index] ?? "")];
    const longest = Math.max(...samples.map((sample) => font.widthOfTextAtSize(sanitize(sample).slice(0, 48), 7.5)), bold.widthOfTextAtSize(sanitize(header), 8));
    return Math.max(36, longest);
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0) || count;
  const raw = weights.map((weight) => (weight / total) * usable);
  const min = Math.min(48, usable / count);
  const adjusted = raw.map((width) => Math.max(min, width));
  const scale = usable / adjusted.reduce((sum, width) => sum + width, 0);
  return adjusted.map((width) => width * scale);
}

export async function buildPdf(model: PdfModel) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const writer = new Writer(doc, font, bold);
  writer.start(false);
  writer.titleBlock(model.title, model.description, `Last updated ${model.dateLabel}`);
  for (const section of model.sections) {
    if (section.heading) writer.heading(section.heading);
    for (const paragraph of section.paragraphs ?? []) writer.paragraph(paragraph, 10.5, font, INK, 14);
    for (const bullet of section.bullets ?? []) writer.bullet(bullet);
    if (section.table) writer.table(section.table);
  }
  writer.finish(model.url);
  doc.setTitle(sanitize(model.title));
  doc.setAuthor("AI Agents Info");
  doc.setSubject(sanitize(model.description));
  return doc.save();
}
