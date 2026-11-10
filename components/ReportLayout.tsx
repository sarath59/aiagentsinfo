import type { ComponentProps } from "react";
import { ArticleTemplate } from "@/components/ArticleTemplate";

/**
 * Shared chrome for /reports. The display face is loaded in app/reports/layout.tsx.
 * shell="report" turns on numbered chapters, the contents list, and the reading time.
 * Reports are read on the page. This layout does not add a download or a form.
 */
export function ReportLayout(props: ComponentProps<typeof ArticleTemplate>) {
  return <ArticleTemplate {...props} shell="report" />;
}
