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

See `.env.example`. The only variable used by the site itself is:

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Used for local development (`http://localhost:3000`). Production canonical URLs are always `https://www.aiagentsinfo.com`, including when this variable is the apex host or a `vercel.app` host. |
| `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Optional. If set, a Plausible-style analytics script loads (no API keys). Leave unset for no tracking. |
| `NEXT_PUBLIC_ANALYTICS_SRC` | Optional custom analytics script URL. |

Newsletter (`POST /api/newsletter`) and tool submissions (`POST /api/submit-tool`) are **stubs**. They validate input and log on the server. Wire a provider in those files when you are ready. **Do not commit API keys.** This repository is public.

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

1. Copy an existing file in the same folder.
2. Change `slug` (or the filename) plus title/description/date.
3. Commit. The page is generated at build time and added to `/sitemap.xml` and `/rss.xml`.

Blog categories: `explainer`, `news`, `guide`, `tools`.  
Research types: `paper-breakdown`, `original-report`, `benchmark`.  
Directory categories, pricing, tags, and collection flags (`newThisWeek`, `trending`, `editorsPick`, `sponsored`) live in each listing's front matter. Set a flag only when it is true.

Byline is always **AI Agents Info Editorial** or **AI Agents Info Research**. Do not add fake authors, bios, testimonials, ratings, user counts, or invented citations.

## Deploy on Vercel with a custom domain

1. Push this repository to GitHub (already the case for this project).
2. In Vercel: **Add New Project** → import `sarath59/aiagentsinfo` → framework preset Next.js → deploy. `vercel.json` sets `"framework": "nextjs"` and enables Git deployments **only on `main`** (no preview deploys for PR or feature branches).
3. Project Settings → Environment Variables → production canonical links are `https://www.aiagentsinfo.com` even if `NEXT_PUBLIC_SITE_URL` points at the apex or a `vercel.app` host. Optionally set `NEXT_PUBLIC_ANALYTICS_DOMAIN` when you actually have analytics (no keys in the repo).
4. Project Settings → Domains → add `aiagentsinfo.com` and `www.aiagentsinfo.com`, with `www` as the canonical host. Point DNS (A/ALIAS/CNAME) as Vercel instructs. The apex host redirects to `www`.
5. Wait for the certificate, then confirm `/sitemap.xml`, `/robots.txt`, and `/rss.xml` on the live host.

No auth providers to configure. No Stripe.

## What ships in v1

- Landing page with directory search, audience doors, news strip, research, glossary teaser, newsletter form
- Audience pages: Kids, Everyone (large-text toggle), Builders, Research
- Topic/coverage pages
- Blog index (categories + pagination) and post template
- Research index (type + topic filters) and paper template with BibTeX + ScholarlyArticle JSON-LD
- Glossary A–Z
- Directory with filters, category/tag pages, collections, submit form, SoftwareApplication JSON-LD
- Tracker stubs: breakthroughs, harnesses, benchmarks
- About, Contact, Privacy, Terms, Advertise/media kit
- Dark/light mode, sitemap, robots, RSS
- Labeled sponsor slots (newsletter, directory featured, blog in-feed, research desk)
- Env-based analytics hook (off unless configured)

Do not commit placeholder articles, invented scores, fake sponsors, or unverified listings.
