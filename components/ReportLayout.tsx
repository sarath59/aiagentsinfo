import type { ComponentProps } from "react";
import { ArticleTemplate } from "@/components/ArticleTemplate";

/** Shared chrome for /reports. The display face is loaded in app/reports/layout.tsx and used only on headings inside `.report-shell`. */
export function ReportLayout(props: ComponentProps<typeof ArticleTemplate>) {
  return <ArticleTemplate {...props} shell="report" />;
}
