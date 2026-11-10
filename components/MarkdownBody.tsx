import { SortableArticleHtml } from "@/components/SortableArticleHtml";

export function MarkdownBody({
  html,
  className = "",
  sortable = false,
}: {
  html: string;
  className?: string;
  sortable?: boolean;
}) {
  const classes = `prose-article ${className}`.trim();
  if (sortable) return <SortableArticleHtml html={html} className={classes} />;
  return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
}
