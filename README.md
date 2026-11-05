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
| `GITHUB_SUBMISSIONS_TOKEN` | **Required on Vercel** for [Submit your tool](https://www.aiagentsinfo.com/submit) to publish. Without it, the form does not pretend the listing was saved: it gives the visitor an email draft to `hello@aiagentsinfo.com`. |
| `GITHUB_SUBMISSIONS_REPO` | Optional `owner/name` of a **private** repository. When set to a repo other than `sarath59/aiagentsinfo`, the submitter email is stored only in a GitHub issue there. When unset, the email is dropped. |
| `UPSTASH_REDIS_REST_URL` | First-party analytics store. Required in production, together with the token, or counts are accepted and discarded. Vercel KV's `KV_REST_API_URL` is also read. |
| `UPSTASH_REDIS_REST_TOKEN` | REST token for that database. `KV_REST_API_TOKEN` is also read. |
| `ANALYTICS_IP_SALT` | Secret mixed into the daily network hash. Without it, raw IPs are still never stored, and unique-network dedupe is skipped. |
| `ANALYTICS_ADMIN_KEY` | Unlocks `/admin/analytics` and `/api/analytics/summary`. Query `?key=` or the `aai_admin` cookie. |

Newsletter (`POST /api/newsletter`) is still a stub: it validates and logs, and does not store addresses. Tool submissions are documented below.

## First-party analytics

The public site keeps its own counts in addition to the DataFast script. The browser script is `public/aai.js`. It does not use cookies. `/admin/analytics` is private, `noindex`, and absent from the sitemap. Bots that never run JavaScript are classified in `proxy.ts` and logged after the response is sent.

To turn storage on in Vercel:

1. Create a free Redis database at [Upstash](https://console.upstash.com), or add the Upstash integration from the Vercel storage marketplace.
2. Project → Settings → Environment Variables → Production. Add `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `ANALYTICS_ADMIN_KEY`, and `ANALYTICS_IP_SALT`. Generate the two secrets with `openssl rand -base64 32`. If the database is Vercel KV, `KV_REST_API_URL` and `KV_REST_API_TOKEN` work in place of the Upstash pair.
3. Redeploy production. Open `https://www.aiagentsinfo.com/admin/analytics?key=YOUR_ADMIN_KEY`. Daily JSON is `https://www.aiagentsinfo.com/api/analytics/summary?key=YOUR_ADMIN_KEY`.

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
| Approved tool submission | `data/submissions/<slug>.json` with `"status": "approved"` | `/directory/<slug>` |

1. Copy an existing file in the same folder.
2. Change `slug` (or the filename) plus title/description/date.
3. Commit. The page is generated at build time and added to `/sitemap.xml` and `/rss.xml`.

Blog categories: `explainer`, `news`, `guide`, `tools`.  
Research types: `paper-breakdown`, `original-report`, `benchmark`.  
Directory categories, pricing, tags, and collection flags (`newThisWeek`, `trending`, `editorsPick`, `sponsored`) live in each listing's front matter. Set a flag only when it is true.

Byline is always **AI Agents Info Editorial** or **AI Agents Info Research**. Do not add fake authors, bios, testimonials, ratings, user counts, or invented citations.

## Submit your tool

`/submit` is public. There is no login, no payment, and no manual approval. `/directory/submit` redirects there. The header, footer, and directory page link to it.

1. The form posts to `POST /api/submit-tool`.
2. The server sanitizes text and checks the same required fields as the browser. A filled honeypot is ignored. An IP is limited to 5 posts in 15 minutes. Profanity and obvious spam are rejected.
3. The website URL must be public and respond with a final 2xx status (redirects are followed, up to five hops). Private hosts are refused.
4. The registrable host, with a leading `www.` removed, is compared with every directory listing and every `data/submissions/*.json` file already on `main`. A repeat domain is rejected.
5. When `GITHUB_SUBMISSIONS_TOKEN` is set, the server commits `data/submissions/<slug>.json` to `main` on `sarath59/aiagentsinfo` through the GitHub Contents API. `"status"` is `"approved"`. `logoUrl` is stored. **`email` is not in that file.** Vercel redeploys `main`, and the listing usually appears within about two minutes with a Community submitted badge.
6. If `GITHUB_SUBMISSIONS_REPO` is a different repository, the email is also written to a private GitHub issue labeled `tool-submission` in that repo. If the variable is unset, or points at `sarath59/aiagentsinfo`, the email is dropped.
7. If the token is missing or GitHub rejects the commit, the API returns an error and a `mailto:` link. The page shows that link. Nothing is described as published.
8. The deploy reads `data/submissions/*.json`. Only `"approved"` records are rendered, merged with `content/directory`, and added to the sitemap. `"pending"` files are parsed and skipped. A slug that matches an existing listing, or a reserved directory path (`new`, `trending`, `editors-picks`, `submit`), fails the build.

Token setup for Vercel → Project → Settings → Environment Variables → Production. The token must be allowed to commit to `main`.

Fine-grained personal access token:

- Repository access includes `sarath59/aiagentsinfo`.
- **Contents: Read and write** on that repository (this is what creates the public JSON and triggers the deploy).
- If `GITHUB_SUBMISSIONS_REPO` is set to a private repository, also grant that repository access and **Issues: Read and write** there. Do not grant that private repo as the place the JSON is committed; the public file always goes to `sarath59/aiagentsinfo`.

Classic personal access token:

- `public_repo` is enough when `GITHUB_SUBMISSIONS_REPO` is unset (contents and nothing private).
- `repo` is required when the email is stored in a private repository, because one token has to write contents on the public site and issues on the private repo.

Category slugs and pricing slugs live in `lib/directory-meta.ts`. A published file looks like this (this example is not a real product; do not commit it by hand):

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
  "consent": true,
  "status": "approved",
  "submittedAt": "2026-11-03T00:00:00.000Z",
  "slug": "example-tool"
}
```

`type` is `ai-tool`, `saas`, `app`, `agent-framework`, or `other`. `makerType` is `indie-hacker`, `startup`, or `yc` (with `ycBatch`). `pricing` is `free`, `freemium`, `paid`, `open-source`, or `free-trial`. `billingPeriod` is `monthly`, `yearly`, `weekly`, `one-time`, or `usage`, and may be empty. Social URLs and the pricing page are optional and are omitted from the public page when blank. The form accepts `example.com` and `www.example.com` and stores `https://`. Logo files are not uploaded; `logoUrl` is a public image address. There is no `email` field.

## Deploy on Vercel with a custom domain

1. Push this repository to GitHub (already the case for this project).
2. In Vercel: **Add New Project** → import `sarath59/aiagentsinfo` → framework preset Next.js → deploy. `vercel.json` sets `"framework": "nextjs"` and enables Git deployments **only on `main`** (no preview deploys for PR or feature branches).
3. Project Settings → Environment Variables → set `GITHUB_SUBMISSIONS_TOKEN` (Contents read/write on `sarath59/aiagentsinfo`) so `/submit` can commit listings to `main`. Optionally set `GITHUB_SUBMISSIONS_REPO` to a private `owner/name` if submitter emails should be kept in issues. Production canonical links are `https://www.aiagentsinfo.com` even if `NEXT_PUBLIC_SITE_URL` points at the apex or a `vercel.app` host. Optionally set `NEXT_PUBLIC_ANALYTICS_DOMAIN` when you actually have analytics (no keys in the repo). Optionally set `NEXT_PUBLIC_BING_VERIFICATION` and `NEXT_PUBLIC_GOOGLE_VERIFICATION` after creating those webmaster properties; leave them unset until you have the codes.
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

- Landing page with directory search, adult reading paths, news strip, research, glossary teaser, newsletter form
- Audience pages: Plain English (large-text toggle), Builders, Research
- Topic/coverage pages
- Blog index (categories + pagination) and post template
- Research index (type + topic filters) and paper template with BibTeX + ScholarlyArticle JSON-LD
- Glossary A–Z
- Directory with filters, category/tag pages, collections, public submit form (`/submit`), SoftwareApplication JSON-LD
- Tracker stubs: breakthroughs, harnesses, benchmarks
- About, Contact, Privacy, Terms, Advertise/media kit
- Dark/light mode, sitemap, robots, RSS
- Labeled sponsor slots (newsletter, directory featured, blog in-feed, research desk)
- Env-based analytics hook (off unless configured)

Do not commit placeholder articles, invented scores, fake sponsors, or unverified listings.
