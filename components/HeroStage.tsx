"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const HeroPointer = dynamic(
  () => import("@/components/HeroPointer").then((mod) => mod.HeroPointer),
  { ssr: false },
);

export function HeroStage({ children }: { children: ReactNode }) {
  return (
    <div className="hero-shell">
      <div className="hero-stage" data-hero-stage aria-hidden="true">
        {children}
        <HeroPointer />
      </div>
    </div>
  );
}
