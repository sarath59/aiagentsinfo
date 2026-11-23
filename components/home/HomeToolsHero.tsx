"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { CompanyLogo } from "@/components/CompanyLogo";
import { TrackLink } from "@/components/TrackLink";
import { trackGoal } from "@/lib/analytics";
import {
  HERO_DIRECTORY_CLICK,
  HERO_TOOL_LOGO_CLICK,
  LIST_TOOL_CTA,
  LIST_TOOL_PATH,
  listToolMeta,
} from "@/lib/analytics/list-tool-goals";
import type { LogoTile } from "@/lib/companies";
import { FEATURED_PRICE_LABEL } from "@/lib/paid-listings/offer";

export type HomeHeroTool = {
  slug: string;
  name: string;
  logo?: string;
  tile?: LogoTile;
};

/** First viewport: vertical tool list + AI-answers CTA. */
export function HomeToolsHero({ tools, toolCount }: { tools: HomeHeroTool[]; toolCount: string }) {
  const router = useRouter();

  function onWallClick(event: MouseEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a, button, [data-hero-stop]")) return;
    trackGoal(HERO_DIRECTORY_CLICK, listToolMeta({ placement: "home_tools_wall" }));
    router.push("/directory");
  }

  return (
    <section
      className="home-tools-hero"
      aria-label="AI agent tools in the directory"
      onClick={onWallClick}
    >
      <div className="home-tools-hero-fx" aria-hidden="true" />
      <h1 id="home-heading" className="sr-only">
        AI Agents Info directory
      </h1>

      <div className="home-tools-hero-cta-wrap" data-hero-stop>
        <TrackLink
          href={LIST_TOOL_PATH}
          goal={LIST_TOOL_CTA}
          metadata={listToolMeta({ placement: "home_tools_wall" })}
          className="btn-primary focus-ring home-tools-hero-big-cta"
        >
          Put your tool in AI answers · {FEATURED_PRICE_LABEL}
        </TrackLink>
        <p className="home-tools-hero-count">
          <Link href="/directory" className="focus-ring">
            {toolCount} tools live
          </Link>
        </p>
      </div>

      <ol className="home-tools-list">
        {tools.map((tool, index) => (
          <li key={tool.slug}>
            <Link
              href={`/directory/${tool.slug}`}
              className="home-tools-row focus-ring"
              onClick={() =>
                trackGoal(
                  HERO_TOOL_LOGO_CLICK,
                  listToolMeta({ placement: "home_tools_wall", listing_slug: tool.slug }),
                )
              }
            >
              <span className="home-tools-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <CompanyLogo name={tool.name} src={tool.logo || undefined} tile={tool.tile} size="sm" />
              <span className="home-tools-name">{tool.name}</span>
            </Link>
          </li>
        ))}
      </ol>

      <p className="home-tools-hero-hint" data-hero-stop>
        <Link href="/directory" className="focus-ring">
          Open the full directory
        </Link>
      </p>
    </section>
  );
}
