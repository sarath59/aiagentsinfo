# AI Agents Info

Public site for [aiagentsinfo.com](https://www.aiagentsinfo.com): a learning and research publication about AI and AI agents, plus a directory of AI tools, apps, SaaS, and agents. The canonical host is `https://www.aiagentsinfo.com`.

Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**. Content is Markdown in the repo. There is **no authentication** and **no payments**.

## Local development

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful scripts: `npm run build`, `npm run lint`, `npm start`.

## Environment variables

See `.env.example`. **Do not commit API keys.** This repository is public.

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Used for local development (`http://localhost:3000`). Production canonical URLs are always `https://www.aiagentsinfo.com`, including when this variable is the apex host or a `vercel.app` host. |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Optional. If set, a Plausible-style analytics script loads (no API keys). Leave unset for no tracking. |
| `NEXT_PUBLIC_ANALYTICS_SRC` | Optional custom analytics script URL. |
| `NEXT_PUBLIC_BING_VERIFICATION` | Optional. When set, the root layout renders `<meta name="msvalidate.01">` for Bing Webmaster Tools. Unset means the tag is omitted. |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Optional. When set, the root layout renders `<meta name="google-site-verification">`. Unset means the tag is omitted. |
| `SUPABASE_URL` | **Required on Vercel** for [Submit your tool](https://www.aiagentsinfo.com/submit) to publish. The Supabase project URL. Without it, the form does not pretend the listing was saved: it gives the visitor an email draft to `hello@aiagentsinfo.com`. |
| `SUPABASE_SECRET_KEY` | **Required on Vercel** with `SUPABASE_URL`. A Supabase secret key (`sb_secret_...`). Server-only; never prefix it with `NEXT_PUBLIC_`. |
| `BOT_TRACKING_API_KEY` | Protects `/api/bot-tracking` and `/api/analytics` report APIs. Generate with `openssl rand -hex 32`. Server-only. |
| `BOT_TRACKING_ALERT_WEBHOOK` | Optional. POST JSON when a new `bot_token` is first seen. |
| `BOT_TRACKING_IP_SALT` | Optional. Salt for `ip_hash` (defaults to the API key). |
| `ALTCHA_HMAC_KEY` | **Required on Vercel.** Signs the submit form's human check. Generate one with `openssl rand -hex 32`. |
| `GITHUB_SUBMISSIONS_TOKEN` | Legacy. Submissions no longer use it. Tracker pages fall back to it when `GITHUB_TOKEN` is unset. |

This site does not run a newsletter, an email signup, a popup, or a subscribe CTA. Do not add one, and do not add an analytics goal that exists only for newsletter signup. Old `/newsletter` URLs redirect to `/` with status 308. RSS at `/rss.xml` is the feed. Tool submissions are documented below. Analytics is first-party (Supabase); DataFast is not used.

## Brand assets

Geometric A (rounded apex, inner arch, separate right foot, four-point star). On light surfaces the A is deep navy with a subtle electric-blue-to-cyan gradient and the star is gold. A white reversed mark is for the midnight panel and other dark surfaces.

- `public/logo-mark.svg` — icon mark, transparent
- `public/brand/mark.svg` — same icon-only mark
- `public/brand/mark-reversed.svg` — white A, gold star
- `public/brand/wordmark.svg` — “AI Agents Info” in Inter
- `public/brand/lockup.svg` — mark plus the wordmark
- Favicon: `app/icon.svg`, `app/favicon.ico`, `public/brand/icon-16.png`, `public/brand/icon-32.png`, `public/brand/icon-48.png`
- Apple touch icon: `app/apple-icon.png`, `public/apple-touch-icon.png`
- Manifest icons: `public/brand/icon.svg`, `public/brand/icon-192.png`, `public/brand/icon-512.png`
- Social images: `app/opengraph-image.tsx`, `app/twitter-image.tsx`

## How to add content

Every new URL is a new file. Front matter is YAML. Publish only real, checked material. A file with `sample: true` is omitted from the site.

| Kind | Folder | URL |
| --- | --- | --- |
| Blog post | `content/blog/*.md` | `/blog/<slug>` |
| Research paper/report | `content/research/*.md` | `/research/<slug>` |
| Glossary term | `content/glossary/*.md` | `/glossary/<slug>` |
| Directory listing | `content/directory/*.md` | `/directory/<slug>` |
| Approved tool submission | A row in the Supabase table `directory_submissions`, or a legacy `data/submissions/<slug>.json` with `"status": "approved"` | `/directory/<slug>` |

1. Copy an existing file in the same folder.
2. Change `slug` (or the filename) plus title/description/date.
3. Commit. The page is generated at build time and added to `/sitemap.xml` and `/rss.xml`.

Blog categories: `explainer`, `news`, `guide`, `tools`.  
Research types: `paper-breakdown`, `original-report`, `benchmark`.  
Directory categories, pricing, tags, and collection flags (`newThisWeek`, `trending`, `editorsPick`, `sponsored`) live in each listing's front matter. Set a flag only when it is true.

Byline is always **AI Agents Info Editorial** or **AI Agents Info Research**. Do not add fake authors, bios, testimonials, ratings, user counts, or invented citations.

Do not add a newsletter form, popup, footer signup, header link, `/newsletter` page, subscribe API, or copy that promises a digest ("subscribe", "weekly digest in your inbox", "join N readers"). RSS stays. A shared layout change must not put a signup back on blog, research, report, directory, or tool pages.

## Submit your tool

`/submit` is public. There is no login, no payment, and no manual approval. `/directory/submit` redirects there. The header, footer, and directory page link to it.

1. The form posts to `POST /api/submit-tool`.
2. The server sanitizes text and checks the same required fields as the browser. A filled honeypot is ignored. An IP is limited to 5 posts in 15 minutes. Profanity and obvious spam are rejected.
3. The website URL must be public and respond with a final 2xx status (redirects are followed, up to five hops). Private hosts are refused.
4. The registrable host, with a leading `www.` removed, is compared with every directory listing and every legacy `data/submissions/*.json` file. The table's unique `website_domain` key rejects a domain that is already a saved row. A repeat domain is rejected.
5. When `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are set, the server inserts a row into `directory_submissions` through the Supabase Data API. `status` is `approved`. `logo_url` and `email` are stored. Directory pages, RSS, and share cards do not render `email`, and page reads never select it. A slug that clashes with a saved row moves to the next free slug. Nothing is committed to git, so a submission does not trigger a deploy.
6. After the insert, the server expires the cached Supabase reads. The listing's page is live right away, with a Community submitted badge. The directory, category pages, sitemap, and `llms.txt` include it on their next request. An indexable listing is sent to IndexNow from the production deployment.
7. If Supabase is not configured or rejects the insert, the API returns an error and a `mailto:` link. The page shows that link. Nothing is described as published.
8. Pages read approved rows through Next's cache, so visitor traffic does not query the database. Rows edited in the Supabase dashboard appear within six hours, or on the next deploy. If Supabase cannot be read during a build, the build fails rather than publishing the directory without those listings. A row whose slug matches an existing listing or a reserved directory path is skipped and logged.

### Analytics (bots + humans)

1. Run [`supabase/bot-tracking.sql`](supabase/bot-tracking.sql), [`supabase/visitor-analytics.sql`](supabase/visitor-analytics.sql), and [`supabase/submission-analytics.sql`](supabase/submission-analytics.sql) in the Supabase SQL editor.
2. Set `BOT_TRACKING_API_KEY` on Vercel (reads both report APIs). Optional: `BOT_TRACKING_ALERT_WEBHOOK`, `BOT_TRACKING_IP_SALT`.
3. Uses `SUPABASE_URL` / `SUPABASE_SECRET_KEY`. Bot hits: `proxy.ts` → `bot_hits`. Humans: `SiteTracker` + `trackGoal` → `/api/analytics/collect` → `visitor_events`.

```bash
# Bots
curl -s -H "Authorization: Bearer $BOT_TRACKING_API_KEY" \
  "https://www.aiagentsinfo.com/api/bot-tracking?report=stats"

# Humans (pageviews, goals, AI referrers, funnels)
curl -s -H "Authorization: Bearer $BOT_TRACKING_API_KEY" \
  "https://www.aiagentsinfo.com/api/analytics?report=overview"
```

Bot reports: `stats`, `sessions`, `funnel`, `accept`, `unknown`, `answer-vs-training`, `alerts`, `registry`, `meta`.  
Human reports: `overview`, `pages`, `goals`, `referrers`, `ai-referrals`, `answer-to-visit`, `funnel-submit`, `submissions`, `submission-rejects`, `submission-categories`, `funnel-report-read`, `citations`, `citation-prompts`, `citation-summary`, `citation-by-prompt`, `meta`.

Submit funnel goals (no emails/PII in meta): `submit_cta` → `/submit` pageview → `form_started` → `submit_attempt` → `listing_submitted` / `submit_success`. Also: `submit_validation_error`, `submit_rejected`, `submit_fallback`, `submit_spam_blocked`, share kit (`submit_share_copy`, `submit_share_download`, `submit_open_listing`, `submit_another`).

### AI citation monitoring

Server logs cannot tell you whether ChatGPT/Perplexity/Gemini *name* you. A daily job asks a fixed prompt list and records whether `aiagentsinfo.com` appears.

1. Run [`supabase/citations-extra.sql`](supabase/citations-extra.sql) (extra prompts + summary views).
2. Set at least one of `OPENAI_API_KEY`, `PERPLEXITY_API_KEY`, `GEMINI_API_KEY`, `ANTHROPIC_API_KEY`.
3. Run manually when you want (no Vercel Cron):

```bash
curl -s -X POST -H "Authorization: Bearer $BOT_TRACKING_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"limitPrompts":5,"engines":["perplexity"]}' \
  "https://www.aiagentsinfo.com/api/analytics/citations/run"
```

### Directory submissions

The table (Supabase SQL editor), with row level security on and no policies, so only the server's secret key can read or write it:

```sql
create table public.directory_submissions (
  slug text primary key, website_domain text not null unique,
  status text not null default 'approved' check (status in ('pending', 'approved')),
  submitted_at timestamptz not null default now(),
  name text not null, website text not null, tagline text not null, description text not null,
  category text not null, type text, pricing text not null,
  starting_price text not null default '', billing_period text not null default '',
  pricing_page_url text not null default '', logo_url text not null default '',
  maker_name text not null default '', maker_x text not null default '', maker_type text,
  yc_batch text not null default '', launch_year int,
  revenue_source_url text not null default '', linkedin_url text not null default '',
  github_url text not null default '', youtube_url text not null default '',
  discord_url text not null default '', instagram_url text not null default '',
  product_hunt_url text not null default '', email text not null default ''
);
alter table public.directory_submissions enable row level security;
```

Legacy submissions in `data/submissions/*.json` still load and render. Do not add new files there by hand.

Category slugs and pricing slugs live in `lib/directory-meta.ts`. A legacy file looks like this (this example is not a real product; do not commit it by hand):

```json
{
  "name": "Example Tool",
  "website": "https://example.com",
  "tagline": "One line that says what it does.",
  "description": "A longer description of the product, in the maker's words.",
  "category": "productivity",
  "type": "saas",
  "pricing": "freemium",
  "startingPrice": "$19/mo",
  "billingPeriod": "monthly",
  "pricingPageUrl": "https://example.com/pricing",
  "logoUrl": "https://example.com/logo.png",
  "makerName": "Maker Name",
  "makerX": "maker",
  "makerType": "yc",
  "ycBatch": "W26",
  "launchYear": 2026,
  "revenueSourceUrl": "https://example.com/revenue",
  "linkedinUrl": "",
  "githubUrl": "https://github.com/example/example",
  "youtubeUrl": "",
  "discordUrl": "",
  "instagramUrl": "",
  "productHuntUrl": "",
  "email": "maker@example.com",
  "consent": true,
  "status": "approved",
  "submittedAt": "2026-11-03T00:00:00.000Z",
  "slug": "example-tool"
}
```

`type` is `ai-tool`, `saas`, `app`, `agent-framework`, or `other`. `makerType` is `indie-hacker`, `startup`, or `yc` (with `ycBatch`). `pricing` is `free`, `freemium`, `paid`, `open-source`, or `free-trial`. `billingPeriod` is `monthly`, `yearly`, `weekly`, `one-time`, or `usage`, and may be empty. Social URLs and the pricing page are optional and are omitted from the public page when blank. The form accepts `example.com` and `www.example.com` and stores `https://`. Logo files are not uploaded; `logoUrl` is a public image address. New submissions require `email`. Older files without it still load. The address is not shown on directory pages, RSS, or share cards.

## Deploy on Vercel with a custom domain

1. Push this repository to GitHub (already the case for this project).
2. In Vercel: **Add New Project** → import `sarath59/aiagentsinfo` → framework preset Next.js → deploy. `vercel.json` sets `"framework": "nextjs"` and enables Git deployments **only on `main`** (no preview deploys for PR or feature branches).
3. Project Settings → Environment Variables → set `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, and `ALTCHA_HMAC_KEY` so `/submit` can save listings. Production canonical links are `https://www.aiagentsinfo.com` even if `NEXT_PUBLIC_SITE_URL` points at the apex or a `vercel.app` host. Optionally set `NEXT_PUBLIC_ANALYTICS_DOMAIN` when you actually have analytics (no keys in the repo). Optionally set `NEXT_PUBLIC_BING_VERIFICATION` and `NEXT_PUBLIC_GOOGLE_VERIFICATION` after creating those webmaster properties; leave them unset until you have the codes.
4. Project Settings → Domains → add `aiagentsinfo.com` and `www.aiagentsinfo.com`, with `www` as the canonical host. Point DNS (A/ALIAS/CNAME) as Vercel instructs. The apex host redirects to `www`.
5. Wait for the certificate, then confirm `/sitemap.xml`, `/robots.txt`, and `/rss.xml` on the live host.

No auth providers to configure. No Stripe.

## Search indexing (IndexNow)

`robots.txt` allows Bingbot (and the other listed crawlers) on `/` and points at `https://www.aiagentsinfo.com/sitemap.xml`. The sitemap lists absolute `www` URLs.

IndexNow tells Bing — and engines that use that feed, including ChatGPT search, Copilot, and DuckDuckGo — which URLs changed. The key is public and lives in `public/<key>.txt` (the file body is the key). A push to `main` runs `.github/workflows/indexnow.yml`, which waits until that file is live and then submits the URLs affected by the push. Shared layout, component, or library edits submit the full sitemap.

```bash
npm run indexnow -- --all
npm run indexnow -- --changed
npm run indexnow -- --urls https://www.aiagentsinfo.com/blog
```

## What ships in v1

- Landing page with directory search, adult reading paths, news strip, research, glossary teaser
- Audience pages: Plain English (large-text toggle), Builders, Research
- Topic/coverage pages
- Blog index (categories + pagination) and post template
- Research index (type + topic filters) and paper template with BibTeX + ScholarlyArticle JSON-LD
- Glossary A–Z
- Directory with filters, category/tag pages, collections, public submit form (`/submit`), SoftwareApplication JSON-LD
- Tracker stubs: breakthroughs, harnesses, benchmarks
- About, Contact, Privacy, Terms, Advertise/media kit
- Dark/light mode, sitemap, robots, RSS
- Labeled sponsor slots (directory featured, blog in-feed, research desk). No newsletter placement.
- Env-based analytics hook (off unless configured)

Do not commit placeholder articles, invented scores, fake sponsors, or unverified listings.
