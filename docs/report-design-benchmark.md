# Report design benchmark

Checked November 10, 2026. This note is the design and quality bar for `/reports` on aiagentsinfo.com. It records five flagship AI reports published in 2026, what their pages and PDFs actually do, and what this site copied.

## How the five were chosen

There is no single public citation index that ranks every 2026 AI report against the others. Google Scholar, checked the same day, still surfaces the 2025 AI Index (and earlier editions on author profiles) rather than a settled citation count for the 2026 edition. The choice below is the set of 2026 flagships with a disclosed method, a recurring series, and repeated mention in 2026 secondary reading lists we could open. It is not a Scholar ranking.

Left out on purpose:

- Mary Meeker / BOND, *Trends — Artificial Intelligence*, is dated May 30, 2025 (Mary Meeker, Jay Simons, Daegwon Chae, Alexander Krey). It is not a 2026 report. [PDF](https://www.bondcap.com/report/pdf/Trends_Artificial_Intelligence.pdf).
- Andreessen Horowitz did not publish one annual flagship in 2026. The OpenRouter token study is dated December 4, 2025. The 2026 pieces are essays, including the August 10 computer-use note used as a source in our production report.
- Epoch AI's *Trends* page is a living dashboard (the trends page we opened carried an "Updated Feb. 5, 2026" stamp, with later data on the homepage). It is not one annual. Epoch's article *The plunging price of thought* is a source in our 2027 forecast, not one of the five layout models.
- Menlo Ventures' *2026: The State of Enterprise AI* (November 3, 2026) is the best new primary source on enterprise agent spend, and our production report uses it. It had been public for a week when this note was written, so it cannot yet be called one of the most cited reports of the year. It is in the "also read" section for layout.

The five:

1. Stanford HAI, *Artificial Intelligence Index Report 2026* (ninth edition, April 2026).
2. Nathan Benaich and Air Street Capital, *State of AI Report 2026* (ninth annual, October 8, 2026).
3. McKinsey, *The state of AI in 2026: On the road to ROI* (August 25, 2026).
4. Deloitte AI Institute, *State of AI in the Enterprise 2026: The untapped edge* (January 2026).
5. BCG, *AI Radar 2026: As AI Investments Surge, CEOs Take the Lead* (January 15, 2026).

## 1. Stanford HAI, AI Index 2026

- Report: [The 2026 AI Index Report](https://hai.stanford.edu/ai-index/2026-ai-index-report)
- PDF: [ai_index_report_2026.pdf](https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf)
- Archive: [arXiv:2606.15708](https://arxiv.org/abs/2606.15708) (submitted April 14, 2026; revised June 29, 2026). Citation they ask for: Sajadieh, Fattorini, Perrault, and the AI Index Steering Committee, Stanford HAI, April 2026.

Layout. A cover built around the year, a one-page contents list, nine numbered chapters (01 Research and Development through 09 Public Opinion), an introduction, and an appendix. "Top Takeaways" is a numbered list of claims, each a sentence with a figure, before the chapters. Chapters open with a short argument, then figures. The web edition repeats the chapter lineup as a numbered index. Charts carry a figure number, a one-line title, and a source line ("SWE-bench Leaderboard, 2026 | Chart: 2026 AI Index report"). There is a "How to cite" block and a pointer to the public data. Footnotes sit under the section that uses them.

Typography. The PDF is a long print document: a display setting for the year and chapter openers, a serif or high-contrast headline face against a text face for body, body size in the usual print range, and a measure narrow enough to read in a column. The web chapter pages are a separate, more open layout. We did not extract embedded font names from the PDF in this pass (the file is large and the fetch stalled), so the type claim here is from the page structure and the print convention of this series, not from a `pdffonts` dump.

Research practice. The Index collates other people's measurements and says so. The technical-performance chapter states that scores are from leaderboards, repositories, and company disclosures, that company-reported results are assumed accurate, and that the cutoff is early 2026. Sample sizes are the underlying datasets (for example SWE-bench Verified's issue set), not one Stanford survey. Chart density is high: many figures per chapter, each with a source. The same report can say two different things about one benchmark. The top takeaway says SWE-bench Verified rose "from 60% to near 100% of meeting the human baseline." The coding section, as of February 2026, puts the Verified lead at about 76.8% resolved, clustered in the low-to-mid 70s. Our reports keep the resolve rate and do not promote the baseline sentence into a second number.

## 2. Air Street, State of AI Report 2026

- Site: [stateof.ai](https://www.stateof.ai/)
- PDF: [State-of-AI-Report-2026.pdf](https://www.stateof.ai/State-of-AI-Report-2026.pdf)
- Author note: [Air Street Press, October 8, 2026](https://press.airstreet.com/p/state-of-ai-2026)
- Explore: [2026 explore](https://www.stateof.ai/2026-explore/)

Layout. This one is a slide deck, not a book. The cover names the author, the date (October 8, 2026), and the series ("9th annual"). A "what you need to know" slide groups bullets under Research, Industry, Politics, and Safety. Later slides are one claim plus one chart. The deck ends with a predictions section that scores the previous year's calls. That self-audit is the part worth copying: a forecast that can be wrong in public.

Typography. Deck type, not book type. Short lines, very large numerals, a grotesque display face on dark slides. Body text is sparse because the slide is the argument. Line length is a title plus a caption, not a 70-character paragraph. We did not copy the dark deck. The site is light mode only.

Research practice. The deck is an investor's reading of the year, peer-reviewed by people the author names as lab, startup, policy, and academic reviewers. It does not publish a single sample size because it is not one survey. Sourcing is the chart credit on the slide. Density is one chart per slide across a long deck. Claims are sorted into sections so a reader can skip. Our reports take the sectioning and the "score your last forecast" habit. They do not take the slide-as-page format.

## 3. McKinsey, The state of AI in 2026

- Article: [The State of AI: Global Survey 2026](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- PDF: [On the road to ROI](https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/the-state-of-ai-in-2026-on-the-road-to-roi_final.pdf)
- Date: August 25, 2026. Authors named on the PDF: Dan Tinkoff, Lieven Van der Veken, and Michael Chui, with Tara Balakrishnan.

Layout. A short hero (title, date, one-sentence deck), then "Key takeaways" as a tight bullet list before the narrative. The article and the PDF share that order. Exhibits are numbered, titled as a sentence ("Forty percent of respondents from large organizations..."), and sourced to the survey. An "About the research" box gives field dates, n, geography, the revenue mix, and the weighting. That box is the methodology. It is not buried.

Typography. McKinsey's article template uses a serif display for the headline and a grotesque for body and UI. The PDF follows the same split: exhibit titles in the display face, annotations in a small sans. Body measure is a single reading column, roughly 60–75 characters. Exhibit pages go wider. We copied the split (one display face for report headings, Inter for body) and the column measure already used on this site (`70ch`).

Research practice. One instrument. Online survey, May 4 to June 8, 2026, 1,719 respondents, 97 countries, responses weighted by each country's share of global GDP. Thirty-six percent of respondents work at organizations with more than $1 billion of revenue. The report says when a figure is unchanged from last year (EBIT impact at 37 percent, high performers at about 6 percent) and when an expectation missed (32 percent expected a workforce decline last year; 14 percent now report one). Charts are a few exhibits per section, not a chart on every paragraph. Definitions are in footnotes (what "high performer" means, what "scaling" is being asked). That is the standard our methodology sections follow: say who was asked, what the word means, and what the survey cannot see.

## 4. Deloitte, State of AI in the Enterprise 2026

- UK summary: [The State of AI in the Enterprise](https://www.deloitte.com/uk/en/issues/generative-ai/state-of-ai-in-enterprise.html)
- PDF: [state-of-ai-2026.pdf](https://www.deloitte.com/content/dam/assets-zone3/us/en/docs/services/consulting/2026/state-of-ai-2026.pdf)
- Press example: [Deloitte Cyprus, March 3, 2026](https://www.deloitte.com/cy/en/about/press-room/state-of-ai-in-the-enterprise.html), pointing at the January report.

Layout. Cover with the report name and the subtitle "The untapped edge," a table of contents, an overview that states the sample in the first screen, numbered key findings, then chapters. Methodology is its own section (the PDF points to it, around page 40) and is repeated in short form on the web summary. Findings are written as headlines ("AI is moving from the pilot...") with the figure in the first sentence.

Typography. A consulting print report: serif or high-contrast headlines, sans body, generous margins, callout statistics pulled into large numerals. The web summary is a shorter article with the same findings and a methodology paragraph. Line length on the web summary is a normal article column.

Research practice. The largest sample in this set. The PDF says 3,235 director-to-C-suite respondents, six industries, 24 countries, fielded August to September 2025, split evenly between IT and line-of-business leaders, plus 15 executive interviews. The January 2026 cover is the publication date; the fieldwork is 2025. That lag matters, and our reports say so when they cite it. Several figures are about AI experiments in general, not agents. We do not relabel them as agent statistics.

## 5. BCG, AI Radar 2026

- Article: [As AI Investments Surge, CEOs Take the Lead](https://www.bcg.com/publications/2026/as-ai-investments-surge-ceos-take-the-lead)
- Press release: [January 15, 2026](https://www.bcg.com/press/15january2026-as-ai-investments-surge-ceos-take-lead)
- Authors named on the article: Jessica Apotheker, Sylvain Duranton, Vladimir Lukic, Nicolas de Bellefonds, and Christoph Schweizer.

Layout. A web article with a one-line deck, a handful of large statistics, and short sections. The press release is a finding list a reader can scan in a minute: sample, the 94 percent who would keep spending without immediate returns, the 72 percent of CEOs who say they are the main decision maker, the 90 percent who expect agents to produce measurable returns in 2026. Survey slides that circulate with the report put the methodology on a dashboard page: role mix, markets, industries, revenue bands, and the question wording under the chart.

Typography. BCG's web articles use a grotesque for UI and a stronger display weight for the headline and the big numbers. The slides are chart-first. Body, where it exists, is short.

Research practice. Third annual wave. n = 2,360 executives, 16 markets, nine industries, including 640 CEOs. The press release and the Japanese-language republication (February 26, 2026) both give the sample and say companies plan to put more than 30 percent of 2026 AI investment into agentic AI. These are plans and beliefs. BCG's own companion note, citing this survey, also says only a small share of companies are generating AI value at scale. Our 2027 report treats the CEO belief as an expectation and sets it next to McKinsey's EBIT result. It does not treat "90 percent of CEOs expect ROI" as evidence that ROI arrived.

## Also read, not in the five

- [Menlo Ventures, 2026: The State of Enterprise AI](https://menlovc.com/perspective/2026-the-state-of-enterprise-ai/) (November 3, 2026). [PDF](https://menlovc.com/wp-content/uploads/2026/11/menlo_ventures_enterprise_ai_report-2026-110326.pdf). Key findings as bullets, then a narrative, then a methodology: Morning Consult, September 8–26, 2026, nearly 400 U.S. enterprise decision-makers, more than $4 billion in AI spend represented. Dollar totals are Menlo's bottoms-up estimates, annualized run rate, with a taxonomy change called out. Charts are large and few. This is the layout our production report is closest to, because it is about agents and spend rather than CEO mood.
- [Epoch AI, The plunging price of thought](https://epoch.ai/publications/the-plunging-price-of-thought). A methods-forward article: key takeaways, a caveat section that lists benchmaxxing, switching costs, and a short time series, then the estimates. The page carries a September 23, 2026 update stamp. Useful as a model for how to label a number that is an estimate.

## What we copied

| Pattern | Where it shows up in the five | What `/reports` does |
| --- | --- | --- |
| Hero | Title, one-line deck, date, who wrote it | Title, one-line thesis, published date, reading time, byline |
| Key figures | McKinsey takeaways, BCG big numbers, Menlo findings, Index top takeaways | A key-numbers strip, then a key-findings list as cards |
| Executive summary | Index introduction, Deloitte overview, McKinsey opening | An executive summary before the chapters |
| Numbered chapters | Index 01–09, Deloitte contents | Numbered `<h2>` chapters and a sticky table of contents |
| Charts | One claim, a chart, a source line, a table of the same numbers | Inline SVG bar charts, a data table under each, a source line |
| Callouts and pull quotes | Exhibit callouts, deck quotations, finding boxes | A callout, a sourced pull quote, and a "what this means" box at the end of each chapter |
| Methodology | McKinsey "About the research," Deloitte methodology, Menlo method note, Epoch caveats | A methodology section that states what was counted and what was not |
| Citations | Footnotes, figure credits, "how to cite" | Numbered sources, inline, linking to the primary page |
| Print | The PDFs are the product for Index, Deloitte, McKinsey | The HTML page is the report. Print CSS drops navigation and prints the chapters, charts, and tables. It does not add a download or a print button. |
| Type | Serif or display headlines, grotesque body, ~60–75 character measure on the article reports. The Air Street deck is the exception. | Source Serif 4, self-hosted with `next/font`, on report headings only. Body stays Inter. Measure stays `70ch`. |
| Forecast hygiene | Air Street scores last year's predictions. McKinsey separates expected workforce cuts from reported ones. | Forecasts are labeled, and the 2027 report lists what would falsify them |

## On-page reading

Reports on aiagentsinfo.com are read on the site. There is no download, no PDF, no CSV, and no form, on current reports or on ones added later. The site does not run an email newsletter, on `/reports` or anywhere else. Do not add a signup, a popup, or a digest CTA to a new page. `ReportLayout` sets `shell="report"` on the shared article template. That template renders the title, the reading time, the key numbers, and a table of contents with section anchors. On a wide screen the contents list stays in view beside the chapters. On a narrow screen it sits above the chapters. A new report that uses `ReportLayout` gets that chrome and does not get a file link, a form, or a newsletter.

The page is the full report. Charts are inline SVG, and each chart has its table and its source line in the HTML. Sources and the citation snippet stay on the page. Dataset JSON-LD describes the page. It does not include `distribution` or `downloadUrl`.

An old `/reports/<slug>/pdf` or `/reports/<slug>/csv` URL, including one with a `table` or `token` query, answers 308 and sends the reader to `/reports/<slug>`. It does not 404, and it does not return a file.

## What we refused

- A download, a PDF, a CSV, or a lead form. The report is the page.
- An email newsletter, a signup form, or a digest CTA. RSS at `/rss.xml` is the feed.
- Dark slide decks. The site is light mode only.
- A second body font. Inter stays the text face.
- A chart with no table. The SVG is the picture. The table is the number.
- A sample size we did not read. Every survey figure in the new reports names n, the field dates, and the publisher.
- Invented citation counts. This note says how the five were picked. It does not pretend Scholar returned a 2026 league table.
