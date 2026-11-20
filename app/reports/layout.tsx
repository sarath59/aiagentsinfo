import type { ReactNode } from "react";
import { ReportReadTracker } from "@/components/ReportReadTracker";

export default function ReportsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReportReadTracker />
      {children}
    </>
  );
}
