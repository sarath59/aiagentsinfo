import { Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";
import { ReportReadTracker } from "@/components/ReportReadTracker";

const reportDisplay = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-report-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className={reportDisplay.variable}>
      <ReportReadTracker />
      {children}
    </div>
  );
}
