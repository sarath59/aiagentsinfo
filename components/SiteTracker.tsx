"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageview } from "@/lib/analytics";

/** Fires a first-party pageview on each App Router navigation. */
export function SiteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackPageview(pathname);
  }, [pathname, searchParams]);

  return null;
}
