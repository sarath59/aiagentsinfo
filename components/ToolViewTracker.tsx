"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackTool } from "@/lib/analytics";
import { toolSlugForPath } from "@/lib/tools-catalog";

/** Fires tool_view once per visit to a free tool page. */
export function ToolViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const slug = toolSlugForPath(pathname);
    if (!slug) return;
    trackTool("tool_view", slug);
  }, [pathname]);

  return null;
}
