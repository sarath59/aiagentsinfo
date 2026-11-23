"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackGoal } from "@/lib/analytics";

export function TrackLink({
  href,
  goal,
  className,
  children,
  metadata,
}: {
  href: string;
  goal: string;
  className?: string;
  children: ReactNode;
  metadata?: Record<string, string>;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackGoal(goal, metadata)}>
      {children}
    </Link>
  );
}
