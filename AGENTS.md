<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Site rules

aiagentsinfo.com does not run a newsletter. Do not add an email signup, a popup, a footer or header subscribe link, a `/newsletter` page, a subscribe API, or copy that promises a digest. Keep RSS at `/rss.xml`. Old `/newsletter` URLs redirect to `/` with status 308 and stay out of the sitemap. Do not add human visitor analytics or AI-bot crawl tracking (`trackGoal`, pageview cookies, Plausible, DataFast, bot hit logging, or similar).
