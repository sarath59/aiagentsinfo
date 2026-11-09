"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackGoal } from "@/lib/analytics";

export function TrackLink({
  href,
  goal,
  className,
  children,
}: {
  href: string;
  goal: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackGoal(goal)}>
      {children}
    </Link>
  );
}
