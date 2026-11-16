---
name: PDF.ai
title: "PDF.ai: free Hobby plan, Pro at $17/mo"
absoluteTitle: true
vendor: PDF.ai
website: https://pdf.ai
logo: /logos/pdf-ai.png
summary: "PDF.ai lets you ask questions of a PDF. Hobby is free: 1 file and 100 questions a month. Pro is $17/month, or $10/month billed yearly."
category: productivity
tags:
  - pdf
  - api
  - documents
  - indie
pricing:
  - freemium
  - paid
useCases:
  - writing
audiences:
  - builders
  - everyone
features:
  - "Hobby is $0: 1 PDF, 100 questions a month, OCR on 2 pages, 10 MB"
  - "Pro is $17/month or $10/month yearly. Ultimate is $27 or $20 per user. Enterprise is $37 or $30 per user"
  - "Parse API: standard OCR is 1 credit a page, Ask is 3 credits a page"
  - "POST https://pdf.ai/api/v2/parse and https://pdf.ai/api/v2/ask with an X-API-Key header"
pricingSummary: "The pricing page's JavaScript bundle, downloaded twice on 16 Nov 2026 (both HTTP 200, 44,796 bytes, identical), prices Hobby at $0, Pro at $17/month or $10/month billed yearly, Ultimate at $27 per user per month or $20 billed yearly, and Enterprise at $37 per user per month or $30 billed yearly. The yearly toggle is labeled Save 25%. The same bundle's commercial API modal lists $50 for 1,000 credits, $112 for 2,500, $200 for 5,000, and $350 for 10,000. The v2 credit-usage doc, also fetched twice the same day, lists a different menu: free 200 credits, then $49, $99, $249, and $599. That doc says it was last updated 11 months ago."
startingPrice: $0
billingPeriod: monthly
pricingPageUrl: https://pdf.ai/pricing
lastVerified: "2026-11-16"
newThisWeek: true
---

PDF.ai is the product behind searches for pdf.ai free and pdf.ai app. You upload a PDF and ask it questions, or you send the same file to an API that returns markdown, extracted fields, or a split. The homepage on 16 Nov 2026 leads with the API ("turn PDFs into structured data") and still documents chat. The site's own meta description says you can ask questions, get summaries, and find answers. The Twitter card on the homepage is @PDFdotai. No founder name is printed on the pages read for this listing, so none is given here.

The free app plan is real, and it is small. Hobby is $0, marked free forever in the pricing bundle. It allows 1 PDF upload, 100 questions a month, OCR on 2 pages of that file, a 10 MB max file, the basic model, and the basic web API for audio. That is enough to test one short document. It is not enough to run a folder of contracts.

## Pricing for the chat app

pdf.ai/pricing returned HTTP 200 twice on 16 Nov 2026, but the HTML shell is a client-rendered page (6,147 bytes both times) and does not contain the dollar amounts. The prices below are from the page's own JavaScript bundle, `pages/pricing-9cf87f1ae2b2bf38.js`, downloaded twice the same morning. The two downloads were identical, 44,796 bytes. A rendered fetch of the same URL showed $20 and $30 per user per month, which are the yearly Ultimate and Enterprise figures in that bundle. The bundle also has a monthly toggle. Yearly billing is labeled "Save 25%".

| Plan | Monthly | Yearly, per month | Uploads | Questions / month | OCR | Max file | Model | Audio |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Hobby | $0 | $0 | 1 | 100 | 2 pages/file | 10 MB | Basic | Basic web API |
| Pro | $17/mo | $10/mo | 100 | 1,000 | 10 pages/file | 50 MB | Basic | Basic web API |
| Ultimate | $27/user/mo | $20/user/mo | Unlimited | Unlimited | 50 pages/file | 50 MB | Advanced | OpenAI Whisper and TTS |
| Enterprise | $37/user/mo | $30/user/mo | Unlimited | Unlimited | 100 pages/file | 100 MB | Advanced | OpenAI Whisper and TTS |

Pro is priced per month. Ultimate and Enterprise are priced per user per month. The bundle also draws rows for a Chrome extension, "chat with all PDFs", an "AI Agents" row marked new, capture-and-ask, a white-labeled PDF embed, inviting teammates, and early access. Those cells are icons in the bundle, not text, so this listing does not say which column has the check. Read the live table before you assume Hobby includes the extension or that Enterprise includes a white-label embed. The page headline still says "a small investment for 10x productivity gains." That line is marketing. The limits above are the part you can check.

## The API, and why two price lists are both on the site

The homepage documents two calls. `POST https://pdf.ai/api/v2/parse` takes a file URL or an upload, a quality (`standard` or the advanced VLM path), a language list, and an `llm` flag. The response includes markdown, contents, and a page count. `POST https://pdf.ai/api/v2/ask` takes document ids and a prompt. The header is `X-API-Key`. The homepage says most documents come back in under 5 seconds, and that files are deleted after processing. Those are the site's claims, not a timing test run for this listing.

Credit use, from api.pdf.ai/v2/credit-usage, fetched twice on 16 Nov 2026 (both HTTP 200, 400,739 bytes):

| Action | Credits |
| --- | --- |
| Parse, standard OCR | 1 per page |
| Parse, advanced VLM | 2 per page, plus more if images need an LLM |
| Extract, standard | 2 per page, plus a parse if nothing is cached |
| Extract, advanced | 4 per page, plus a parse if nothing is cached |
| Split | 2 per page, plus a parse if nothing is cached |
| Ask | 3 per page. The document has to be parsed first, so you have a doc id |
| Delete | 0 |

A 10-page PDF, parsed once on standard OCR and asked one question, is 10 + 30 = 40 credits if the parse is not already cached. The free API allotment on that same doc is 200 credits a month, no card. That is five such questions, or more questions only if the parse is reused. The paid examples on that doc are $49 for 3,000 credits ($0.016 each), $99 for 10,000 ($0.010), $249 for 30,000 ($0.008), and $599 for 100,000 ($0.006). Above 100,000 the page says to write to support@pdf.ai. The doc says it was last updated 11 months ago.

The chat pricing bundle contains a second, older-looking menu titled "Commercial API add-on plan." It says uploading costs 2 credits, a GPT-3.5 message costs 1, and a GPT-4 message costs 4. The packs are $50 for 1,000 credits, $112 for 2,500, $200 for 5,000, $350 for 10,000, and a custom quote above that. A separate legacy page, api.pdf.ai/v1/api-limits, still describes an "Ultimate plan (old plan no longer supported)" with 100 uploads and 1,000 chats a month, and a dedicated API at those same $50 / $112 / $200 / $350 packs, with a 500-request-per-minute note and a 4.5 MB cap on file uploads against a 100 MB cap for URL uploads. Do not treat the v1 page, the pricing-page modal, and the v2 credit doc as one price. They were all still being served on 16 Nov 2026, and they do not match. Before you budget a batch, open the v2 credit-usage page and the developer hub at pdf.ai/developer (that URL redirected to the sign-in page when fetched without a session).

## Best for

Someone who has one PDF and wants to ask it questions tonight, on the free Hobby plan, or a developer who will parse a known page count and can do the credit multiplication above before sending a batch. The API shape is a single REST call. There is no SDK required for the example on the homepage.

## Watch out for

Hobby's OCR stops at 2 pages, even if the file is longer. A 30-page scan on Hobby is not a 30-page OCR. Pro raises that to 10 pages and still uses the basic model. Whisper and the advanced model start at Ultimate, which is priced per user. Questions on Ultimate and Enterprise are listed as unlimited. Uploads on Hobby are one file, so "chat with all PDFs" is not a Hobby feature unless the live checkmarks say otherwise, and the bundle did not spell that cell out as text. The API's free 200 credits and the app's free 100 questions are different products. Mixing the $49 v2 pack with the $50 add-on pack will produce a wrong budget. The v2 price page is dated 11 months before this check. The homepage's "under 5 seconds" and "files deleted after processing" lines are not a contract in the pricing bundle. No public revenue figure from Stripe or TrustMRR was found for this listing, so none is stated.

## Alternatives

[ReplyCurrent](/directory/replycurrent) answers a visitor from your site, docs, and PDFs, and shows the passage it used. It is a website assistant, not a parse API with a per-page credit. [SiteGPT](/directory/sitegpt) trains a support bot on your site and files. [TypingMind](/directory/typingmind) is a chat app where you bring model keys. It does not sell PDF parsing by the page. [VoiceDocket](/directory/voicedocket) goes the other way: a recording in, a timestamped PDF out, $29.99 once on a Mac. [Muse Ember](/directory/muse-ember) is a model that accepts a PDF as input. None of those publishes PDF.ai's Hobby limits or the two conflicting API menus.

Last verified: 16 Nov 2026.
