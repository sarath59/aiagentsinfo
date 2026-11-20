import type { ReactNode } from "react";
import { ReportReadTracker } from "@/components/ReportReadTracker";

export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReportReadTracker />
      {children}
    </>
  );
}
