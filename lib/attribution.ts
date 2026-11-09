import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export type PageSource = {
  title: string;
  /** ISO day or datetime. Omitted only when the page has no retrieval date. */
  updated?: string;
  path: string;
};

export function sourceDay(updated: string) {
  return updated.slice(0, 10);
}

export function sourceDateLabel(updated: string) {
  const day = sourceDay(updated);
  return formatDate(`${day}T00:00:00.000Z`) || day;
}

/** Visible sentence: "Source: aiagentsinfo.com, [title], updated [date]." */
export function sourceSentence(source: PageSource) {
  const dated = source.updated ? `, updated ${sourceDateLabel(source.updated)}` : "";
  return `Source: aiagentsinfo.com, ${source.title}${dated}`;
}

export function citeSentence(source: PageSource) {
  const url = absoluteUrl(source.path);
  const dated = source.updated ? ` Updated ${sourceDateLabel(source.updated)}.` : "";
  return `${source.title}. AI Agents Info (aiagentsinfo.com). ${url}.${dated}`;
}

/** First line of a CSV download. Spreadsheet apps show it; comment-aware parsers can skip it. */
export function sourceComment(source: PageSource) {
  const sentence = sourceSentence(source).replace(/[\r\n]+/g, " ");
  return `# ${sentence}. ${absoluteUrl(source.path)}`;
}
