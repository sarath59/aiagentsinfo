import type { ComponentProps } from "react";
import { ArticleTemplate } from "@/components/ArticleTemplate";

/**
 * Shared chrome for /reports. The display face is loaded in app/reports/layout.tsx.
 * shell="report" turns on the gated download form, so a new report that uses this
 * layout gets "Download this report" without a separate embed.
 */
export function ReportLayout(props: ComponentProps<typeof ArticleTemplate>) {
  return <ArticleTemplate {...props} shell="report" />;
}
