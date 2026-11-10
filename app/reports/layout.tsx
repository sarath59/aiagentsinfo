import { Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

const reportDisplay = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-report-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <div className={reportDisplay.variable}>{children}</div>;
}
