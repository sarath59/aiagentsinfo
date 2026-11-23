"use client";

import Link from "next/link";
import { CompanyLogo } from "@/components/CompanyLogo";
import { trackGoal } from "@/lib/analytics";
import { HERO_TOOL_LOGO_CLICK, listToolMeta } from "@/lib/analytics/list-tool-goals";
import type { LogoTile } from "@/lib/companies";

export type HeroTool = {
  slug: string;
  name: string;
  logo?: string;
  tile?: LogoTile;
};

/** Logo-only strip — no names or blurbs. Clicks open the listing. */
export function HeroToolStrip({ tools }: { tools: HeroTool[] }) {
  if (!tools.length) return null;

  return (
    <div className="lab-hero-tools" data-hero-stop aria-label="Featured tools in the directory">
      <ul className="lab-hero-tool-row">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/directory/${tool.slug}`}
              className="lab-hero-tool focus-ring"
              title={tool.name}
              aria-label={tool.name}
              onClick={() =>
                trackGoal(
                  HERO_TOOL_LOGO_CLICK,
                  listToolMeta({ placement: "home_hero", listing_slug: tool.slug }),
                )
              }
            >
              <CompanyLogo name={tool.name} src={tool.logo || undefined} tile={tool.tile} size="md" />
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/directory" className="lab-hero-tools-more focus-ring">
        Browse all
      </Link>
    </div>
  );
}
