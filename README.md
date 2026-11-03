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
| `GITHUB_SUBMISSIONS_TOKEN` | **Required on Vercel** for [Submit your tool](https://www.aiagentsinfo.com/submit) to save. Without it, the form does not pretend the submission was stored: it gives the visitor an email draft to `hello@aiagentsinfo.com`. |
| `GITHUB_SUBMISSIONS_REPO` | Optional `owner/name`. Defaults to `sarath59/aiagentsinfo`. Set this when pending submissions should land in a different repo (use a private repo if submitter emails should not be on public issues). |

Newsletter (`POST /api/newsletter`) is still a stub: it validates and logs, and does not store addresses. Tool submissions are documented below.

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

`/submit` is public. There is no login and no payment. `/directory/submit` redirects there. The header, footer, and directory page link to it.

1. The form posts to `POST /api/submit-tool`.
2. The server checks the same rules as the browser, ignores a filled honeypot, and rate-limits an IP to 5 posts in 15 minutes.
3. When `GITHUB_SUBMISSIONS_TOKEN` is set, the server opens a GitHub issue titled `Tool submission: …` with the label `tool-submission`. The body contains a JSON block whose `"status"` is `"pending"`. The route creates that label (color `#0C5CAD`) the first time if it is missing.
4. Pending issues are **not** directory listings. Vercel’s filesystem is read-only, so the form does not write into the repo by itself.
5. If the token is missing, or GitHub rejects the issue, the API returns an error and a `mailto:` link. The page shows that link. Nothing is described as saved.
6. To publish, edit the JSON: set `"status"` to `"approved"`, delete `email` if it should not enter a public git history, and commit it as `data/submissions/<slug>.json` on `main`. The `slug` field has to match the filename.
7. The next deploy reads `data/submissions/*.json`. Only `"approved"` records are rendered, merged with `content/directory`, and added to the sitemap. `"pending"` files are parsed and skipped. A slug that matches an existing listing, or a reserved directory path (`new`, `trending`, `editors-picks`, `submit`), fails the build.

Pending submissions show up as GitHub issues:

`https://github.com/sarath59/aiagentsinfo/issues?q=label%3Atool-submission`

(or the same path on `GITHUB_SUBMISSIONS_REPO` if you override it).

Token setup for Vercel → Project → Settings → Environment Variables → Production:

- Fine-grained personal access token: repository access to the submissions repo, **Issues: Read and write** (this includes labels).
- Classic personal access token: `public_repo` for a public repo, or `repo` for a private repo.

Category slugs and pricing slugs live in `lib/directory-meta.ts`. A stored file looks like this (this example is not a real product; do not commit it as approved):

```json
{
  "name": "Example Tool",
  "website": "https://example.com",
  "tagline": "One line that says what it does.",
  "description": "A longer description of the product, in the maker's words.",
  "category": "productivity",
  "type": "saas",
  "pricing": "freemium",
  "startingPrice": "$12/month",
  "logoUrl": "https://example.com/logo.png",
  "makerName": "Maker Name",
  "makerX": "maker",
  "makerType": "yc",
  "ycBatch": "W26",
  "launchYear": 2026,
  "revenueSourceUrl": "https://example.com/revenue",
  "githubUrl": "https://github.com/example/example",
  "email": "",
  "consent": true,
  "status": "approved",
  "submittedAt": "2026-11-03T00:00:00.000Z",
  "slug": "example-tool"
}
```

`type` is `ai-tool`, `saas`, `app`, `agent-framework`, or `other`. `makerType` is `indie-hacker`, `startup`, or `yc` (with `ycBatch`). `pricing` is `free`, `freemium`, `paid`, or `open-source`. Logo files are not uploaded; `logoUrl` is a public image address.

## Deploy on Vercel with a custom domain

1. Push this repository to GitHub (already the case for this project).
2. In Vercel: **Add New Project** → import `sarath59/aiagentsinfo` → framework preset Next.js → deploy. `vercel.json` sets `"framework": "nextjs"` and enables Git deployments **only on `main`** (no preview deploys for PR or feature branches).
3. Project Settings → Environment Variables → set `GITHUB_SUBMISSIONS_TOKEN` so `/submit` can open issues. Optionally set `GITHUB_SUBMISSIONS_REPO` to `owner/name` (default `sarath59/aiagentsinfo`). Production canonical links are `https://www.aiagentsinfo.com` even if `NEXT_PUBLIC_SITE_URL` points at the apex or a `vercel.app` host. Optionally set `NEXT_PUBLIC_ANALYTICS_DOMAIN` when you actually have analytics (no keys in the repo).
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
- Directory with filters, category/tag pages, collections, public submit form (`/submit`), SoftwareApplication JSON-LD
- Tracker stubs: breakthroughs, harnesses, benchmarks
- About, Contact, Privacy, Terms, Advertise/media kit
- Dark/light mode, sitemap, robots, RSS
- Labeled sponsor slots (newsletter, directory featured, blog in-feed, research desk)
- Env-based analytics hook (off unless configured)

Do not commit placeholder articles, invented scores, fake sponsors, or unverified listings.
