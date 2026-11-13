---
title: "Folio context folding: 66 of 75, 2.4× lower cost"
description: "Folio, arXiv November 12, 2026: on 75 chained LOCA-bench tasks the runtime fold solves 66, against 54 for a model-written summary, at 2.4× lower normalized cost. The median fold is 0.6 seconds."
date: "2026-11-13"
updated: "2026-11-13"
absoluteTitle: true
ledeQuestion: "How many tasks did Folio solve, and at what cost?"
ledeAnswer: "66 of 75 chained LOCA-bench tasks, at 2.4 times lower normalized cost than the same runtime with a model-written summary."
dataset:
  title: "Folio LOCA-bench success, time, and normalized cost, November 2026"
  description: "Ruan, Peng, Zhang, and coauthors, arXiv:2611.16627. On 75 chained LOCA-bench tasks with DeepSeek-V4-Pro, Folio at a 1M window solves 66. Piki-Classic, the same runtime with a model-written summary, solves 54 at 2.38 times the normalized token cost."
  isBasedOn: "https://arxiv.org/abs/2611.16627"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - anthropic
  - openai
paperTitle: "Folio: Recoverable Multi-Resolution Context Folding for Long-Horizon Language Agents"
paperAuthors: "Yubo Ruan, Tao Peng, Jiao Zhang, Chuanguo Ma, Lei Xu, Han Zhou, Wenwu Wang, Xiafei Lv, Xingjie Zhou, Guiju Fan, Hao Wang, Fenghui Zhang, Mao Miao, Shuo Li"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.16627"
venue: "arXiv technical paper, 2611.16627, version 1 submitted November 12, 2026"
abstract: |
  A long agent session fills the context window with tool results. The usual harness fix is a second model call that summarizes the history. Folio, posted to arXiv on November 12, 2026, skips that call. While the agent runs, the runtime writes three linked records: a short turn note the model adds to its ordinary reply, an event manifest of every call, and the captured source. A fold later selects coarser views of records that already exist. The outline prints a handle, such as t3.12, and recovery tools read that source back.

  On 75 LOCA-bench tasks chained into five sessions, with DeepSeek-V4-Pro behind every system, Folio at a 1 million token window solves 66. The same runtime with a model-written summary, called Piki-Classic, solves 54. The paired gap is 14 tasks Folio solves alone and 2 it misses, exact McNemar p = 0.004. Mean working time is 10.2 minutes per task against 16.3. Normalized cost, in DeepSeek cached-read equivalents, is 19.75 million tokens per task against 47.00 million. The body of the paper calls that 2.38 times, and the abstract rounds it to 2.4 times. The median fold takes 613 milliseconds and makes no model call. A Piki-Classic compaction takes a median of 101 seconds.

  Claude Code, Codex, and SoL-Pi, each also on DeepSeek-V4-Pro with a 1 million token window, solve 59, 57, and 49. The paired tests against Claude Code (p = 0.19) and Codex (p = 0.06) do not clear 0.05. The test against SoL-Pi does (p < 0.001). Those three harnesses do not expose provider usage, so this paper has no cost for them. Flagged contamination runs stay in every count.
whyItMatters: |
  Context compaction is harness engineering. The model weights stay fixed. The software around the model decides what the next call is allowed to see, and that decision is on the bill. SpecCompact, covered on this site from the November 4 paper, keeps the summary and tries to draft it faster. Folio removes the summary call. The runtime has already stored the turn note, the manifest, and the source, so a fold is a selection among those views.

  The production reason to care is the share of spend that compaction touches. A Microsoft Research preprint whose PDF was last modified October 20, 2026, reports 13.5 million GitHub Copilot agentic coding sessions from 3.2 million users in June 2026, and 760 million model calls. Compaction fires in 7.8 percent of sessions and those sessions account for 44.2 percent of token consumption. That measurement is not a row in Folio's table. It is why a 101-second summary, and the cache break that comes with rewriting the prefix, shows up on a real invoice.

  For a builder the comparison that the statistics support is inside one runtime: Piki with a fold against Piki with a summary, same model, same tasks, same tools. Claude Code's public docs, read November 13, 2026, still describe compaction as a summary of the conversation. OpenAI's compaction guide, read the same day, returns an opaque compaction item. Folio's outline is readable text plus a handle that resolves to the captured bytes. Those are different products. The numbers below are the authors' runs, not a vendor leaderboard.
keyFindings:
  - "Table 1, 75 chained LOCA-bench tasks, DeepSeek-V4-Pro, one run per chain: Folio at a 1M window solves 66 (13.2 ± 1.5 of 15 per chain) in a mean of 10.2 minutes and a median of 6.9. Piki-Classic solves 54 (10.8 ± 1.3) in 16.3 / 13.7 minutes. Claude Code solves 59 (11.8 ± 0.8) in 18.5 / 13.7. Codex solves 57 (11.4 ± 1.7) in 20.2 / 15.4. SoL-Pi solves 49 (9.8 ± 1.3) in 21.0 / 17.9. Folio at 128K solves 60 (12.0 ± 1.2) in 16.4 / 7.8. Contamination flags, kept in the counts: Folio 8, 128K 9, Piki-Classic 11, Claude Code 9, Codex 27, SoL-Pi 24."
  - "Paired by task, Folio solves 14 tasks Piki-Classic fails and fails 2 that Piki-Classic solves (exact McNemar p = 0.004). Against Claude Code the split is 14 to 7 (p = 0.19). Against Codex it is 14 to 5 (p = 0.06). Against SoL-Pi it is 20 to 3 (p < 0.001). The paper says the differences from Piki-Classic and SoL-Pi are significant at 0.05 and the differences from Claude Code and Codex are not. Folio is faster on 57 of 75 tasks than Piki-Classic, median time ratio 1.45, and faster than Claude Code, Codex, and SoL-Pi on 61, 65, and 64 tasks, median ratios 1.56, 1.80, and 1.90."
  - "Table 2, means per task, normalized cost h + 30u + 90o in cached-read equivalents: Folio 1M is 19.75 million, Folio 128K is 19.83 million, Piki-Classic is 47.00 million. Over 75 tasks that is 1,481 million against 3,525 million, which the paper calls 2.38 times. Folio is cheaper on 68 of 75 tasks and in all 15 environments, median per-task ratio 2.29. Input tokens are 4.01 million for Folio and 14.12 million for Piki-Classic. Cache hit rates are 92.0 percent and 94.1 percent. Tool-call totals are 10,701 and 10,173. Piki-Classic's 24 summary requests cost 420 million normalized tokens, 28 percent of Folio's total."
  - "Table 4, medians: a Folio fold on the 1M window makes 0 model calls, takes 613 milliseconds, and moves context from 242K tokens to 64K, a 7.3× compression of the folded history. The 128K fold takes 346 milliseconds, from 121K to 39K. Piki-Classic's compaction makes a model call, takes 101 seconds, and runs at about 908K tokens down to 58K. The paper calls the 101 seconds 165 times a 1M fold. All 85 folds on the 75-task 1M run were triggered by the landing-price rule. On the 128K run, 201 of 236 folds were triggered by the safety line."
  - "Ablations, Table 3. Dropping the dossier moves 75-task success from 66 to 65 and cost by 0.1 percent. Dropping L1 turn notes moves success from 66 to 63 and cost down 1.6 percent. The paper says both shifts sit inside the 3-to-4-out-of-15 variation across chains. On the first chain only, removing scan and ctx drops success from 13 to 8, with two timeouts, one agent error, and 21 provider retries against none for the full system. Removing the outline as well raises cost 63 percent, from 18.07 million to 29.44 million normalized tokens per task, and folds 31 times against 16."
  - "The agent uses the handles. On the main 1M runs it made 315 ctx calls, 55 scan calls, and 86 handle expansions. Twenty-one ctx calls, 6.7 percent, exited nonzero. In the CanvasArrangeExam case, a fold at 351K tokens landed at 83K in 928 milliseconds, and a later ctx over calls t8.6–t8.177 read 793 KB and 16,708 lines outside the window and returned 6.4K tokens. The task passed. Across 809 folds in the section, including ablations and the budget sweep, the re-render check found one mismatch, in a discarded zero-outline run."
methodology: |
  The source is arXiv 2611.16627, version 1, primary category cs.AI. The Atom record lists version 1 as submitted November 12, 2026, at 10:59:40 UTC, and updated at the same time. The comment field says 13 pages, 6 figures, and 5 tables. This page did not find a later version on November 13, 2026, and the abstract page did not link a code repository. A search that day for the title plus Piki did not turn up a public runtime under this paper's name. Other projects named fold or context-fold are different software.

  The PDF author block, read November 13, marks Yubo Ruan, Jiao Zhang, and Hao Wang at Beijing University of Posts and Telecommunications, and Tao Peng, Chuanguo Ma, Lei Xu, Han Zhou, Wenwu Wang, Xiafei Lv, Xingjie Zhou, Guiju Fan, Fenghui Zhang, Mao Miao, and Shuo Li at Baidu, Inc. The BUPT addresses are ruanyubo, jiaozhang, and h.wang. The Baidu addresses match the remaining names. The HTML author block on arXiv mixes those emails across names. The PDF is the source for the affiliations.

  LOCA-bench is Zeng, Huang, and He, arXiv 2602.07962, submitted February 8, 2026. Folio uses its 15 environments and five seeds, 75 tasks with deterministic graders, and then chains them: chain k is the k-th seed of every environment, given as 15 tasks in one session, so later tasks sit on the history of earlier ones. Each system runs each chain once. Task prompts match by hash across systems. That chain is the authors' protocol. The public LOCA-bench leaderboard, opened November 13, describes environment growth from 8K to 256K tokens. Folio's 66 of 75 is not a row on that board.

  Every system uses DeepSeek-V4-Pro. Folio runs in a runtime the paper calls Piki, at a 1 million token window, with landing budget L = 50K tokens and λ = 1. A 128K run lets the window cap cut that budget to about 16.5K. Piki-Classic is the same runtime, summarizing with the model when context reaches 90 percent of the window. Claude Code, Codex, and SoL-Pi, the last with all four mechanisms from Liu et al., arXiv 2609.20519, run at a 1 million token window. No system has a step or time budget beyond the benchmark timeout. Time excludes environment setup and grading. Cost is reported only where the runtime records provider usage. The normalized unit is h + 30u + 90o, DeepSeek-V4-Pro's cached, uncached, and output price ratios. Closed harnesses are compared on success and time only. Paired success uses an exact McNemar test. The benchmark's contamination scan flags runs that read grader data, and flagged runs stay in the tables.
limitations:
  - "The limitations section says the evaluation is one benchmark, one model, and one price structure. Each chain runs once, so the comparison is 75 paired tasks. Success on the same configuration moves by 3 to 4 tasks out of 15 across chains. Variants that remove scan, ctx, or the outline, and the landing-budget sweep, each cover one chain."
  - "Claude Code, Codex, and SoL-Pi do not expose provider usage, so the 2.38 times cost figure is Folio against Piki-Classic. It is not a dollar comparison with the hosted products, and it uses DeepSeek's price ratios of 30 for uncached input and cache writes and 90 for output. A different provider changes the trigger, because the trigger prices the rebuild at those ratios."
  - "The paired lead over Claude Code and over Codex does not clear 0.05. Codex's 57 successes include 27 runs the contamination scan flagged. SoL-Pi's 49 include 24. Folio's 66 include 8. The paper keeps flagged runs. It does not print a success count with those runs removed."
  - "The 128K configuration solves 60 tasks, more than any 1M baseline in the table, and its normalized cost matches the 1M Folio run within 0.4 percent. Mean time rises from 10.2 minutes to 16.4. The paper does not print a McNemar test for the 128K run against Claude Code or Codex."
  - "L1 notes and dossier entries are written by the model and can be wrong. An oversized dossier is consolidated by an auxiliary model call, which can drop or merge entries. ctx runs commands the model writes. The paper says isolation and permissions depend on the surrounding runtime, which this paper does not evaluate. A missing source file, or one above 64 MB, makes scan return the cut copy and say so."
  - "Tasks whose evidence can be re-queried cheaply, and tasks with open-ended outputs, may gain less from reading a captured history. The landing budget is one value, L = 50K, with a sensitivity sweep on one chain. Budgets above 75K hit a 60K cap on the raw area. The arXiv record, checked November 13, 2026, did not link code."
references:
  - title: "Ruan, Peng, Zhang, et al., Folio (arXiv:2611.16627)"
    url: "https://arxiv.org/abs/2611.16627"
    note: "Version 1 submitted November 12, 2026, 10:59:40 UTC. Primary subject cs.AI. Read November 13, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.16627"
    note: "The HTML author block mixes email addresses. Affiliations on this page are taken from the PDF."
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.16627"
    note: "13 pages. Author affiliations and Tables 1 through 4 were checked against this PDF on November 13, 2026."
  - title: "Zeng, Huang, and He, LOCA-bench (arXiv:2602.07962)"
    url: "https://arxiv.org/abs/2602.07962"
    note: "Submitted February 8, 2026. The benchmark Folio chains. Folio's session protocol is not the public leaderboard protocol."
  - title: "LOCA-bench code"
    url: "https://github.com/hkust-nlp/LOCA-bench"
    note: "Repository opened November 13, 2026."
  - title: "LOCA-bench leaderboard"
    url: "https://loca-bench.github.io/"
    note: "Opened November 13, 2026. The page describes environment growth from 8K to 256K tokens. Folio's 66 of 75 is not printed there."
  - title: "Liu et al., SoL-Pi (arXiv:2609.20519)"
    url: "https://arxiv.org/abs/2609.20519"
    note: "The harness Folio runs with all four mechanisms enabled. Submitted September 2026, outside this week's window."
  - title: "Claude Code context window"
    url: "https://code.claude.com/docs/en/context-window"
    note: "Read November 13, 2026. Compaction summarizes the conversation. Folio's Claude Code score is the authors' run on DeepSeek-V4-Pro, not a score from this page."
  - title: "OpenAI, Compaction"
    url: "https://developers.openai.com/api/docs/guides/compaction"
    note: "Read November 13, 2026. Server-side compaction returns an opaque item. The Codex row in Folio is the authors' harness run, not this API's published price."
  - title: "Liu et al., CompactionBench preprint (Microsoft Research)"
    url: "https://www.microsoft.com/en-us/research/publication/benchmarking-long-horizon-agent-context-compaction-with-compactionbench/"
    note: "Publication page says November 2026. The PDF URL path is /2026/10/ and the file was last modified October 20, 2026. Older than this week's window. Cited for the June 2026 Copilot trace, not as a LOCA-bench comparison."
  - title: "An, Feng, and Yin, SpecCompact (arXiv:2611.06876)"
    url: "https://arxiv.org/abs/2611.06876"
    note: "November 4, 2026. Speeds the summary Folio does not write. Covered on this site."
citation:
  apa: "Ruan, Y., Peng, T., Zhang, J., Ma, C., Xu, L., Zhou, H., Wang, W., Lv, X., Zhou, X., Fan, G., Wang, H., Zhang, F., Miao, M., & Li, S. (2026, November 12). Folio: Recoverable multi-resolution context folding for long-horizon language agents. arXiv:2611.16627."
  bibtex: |
    @article{ruan2026folio,
      title={Folio: Recoverable Multi-Resolution Context Folding for Long-Horizon Language Agents},
      author={Ruan, Yubo and Peng, Tao and Zhang, Jiao and Ma, Chuanguo and Xu, Lei and Zhou, Han and Wang, Wenwu and Lv, Xiafei and Zhou, Xingjie and Fan, Guiju and Wang, Hao and Zhang, Fenghui and Miao, Mao and Li, Shuo},
      journal={arXiv preprint arXiv:2611.16627},
      year={2026},
      url={https://arxiv.org/abs/2611.16627}
    }
faq:
  - question: "What is Folio, and when was it released?"
    answer: "Folio is a context manager for a language agent. The runtime records a turn note, an event manifest, and the source bytes while the agent works, then folds the window by selecting coarser views of those records. Recovery tools read the source back through a call handle. arXiv lists version 1 as submitted November 12, 2026, at 10:59:40 UTC, in cs.AI. This breakdown was published November 13, 2026."
  - question: "What is the headline result?"
    answer: "On 75 chained LOCA-bench tasks, all on DeepSeek-V4-Pro, Folio with a 1 million token window solves 66. The same runtime with a model-written summary solves 54. The paired test is exact McNemar p = 0.004. Normalized cost is 2.38 times lower for the fold, which the abstract rounds to 2.4 times. Mean working time is 10.2 minutes per task against 16.3. The median fold takes 613 milliseconds and makes no model call."
  - question: "Does Folio beat Claude Code and Codex?"
    answer: "On the authors' means, Folio solves 66, Claude Code 59, and Codex 57, all on DeepSeek-V4-Pro with a 1 million token window. The paired tests do not clear 0.05: p = 0.19 against Claude Code and p = 0.06 against Codex. Codex's count includes 27 runs the contamination scan flagged, and those runs stay in the table. The paper has no token bill for either product. These are the authors' runs of the harnesses, not the vendors' leaderboards and not the hosted models those products ship."
  - question: "Why is the cost 2.4 times lower if the cache hit rate is also lower?"
    answer: "Folio's cache hit rate is 92.0 percent and Piki-Classic's is 94.1 percent. Folio still reads 4.01 million input tokens per task against 14.12 million, because Piki-Classic carries the history up toward 90 percent of a 1 million token window before it summarizes. The normalized unit charges uncached tokens at 30 times a cached read and output at 90 times. Piki-Classic's 24 summary calls add 420 million normalized tokens by themselves. Fewer cached tokens, read many fewer times, beat a slightly higher hit rate on a much larger prompt."
  - question: "What happens if the window is 128K?"
    answer: "Folio at 128K solves 60 of 75 tasks, which is more than Claude Code, Codex, SoL-Pi, or Piki-Classic solved at 1 million tokens in this table. Mean time rises to 16.4 minutes, close to Piki-Classic's 16.3. Normalized cost is 19.83 million tokens per task against 19.75 million at 1M, within 0.4 percent. It folds 3.15 times per task instead of 1.13, and 201 of 236 folds are the safety line rather than the price rule. The paper does not print a paired significance test for this row against Claude Code or Codex."
  - question: "How is this different from SpecCompact, HarnessFlow, and Evolver?"
    answer: "SpecCompact still asks a model for a structured summary and tries to draft that summary faster. Folio does not make that call. HarnessFlow searches for a new executable harness. Folio keeps the runtime and changes the context manager inside it. Evolver stores reusable procedures from past runs and can inject them later. Folio stores the tool results of the current session so a later step can read the exact bytes. The three papers answer different questions, and none of their tables is a row in this one."
  - question: "What are the limits of the result?"
    answer: "One benchmark, one model, one price ratio, and one run of each chain. Closed harnesses have no cost in the paper. The Claude Code and Codex success gaps are not significant at 0.05, and flagged contamination runs are kept, including 27 of Codex's 75. Notes and dossier entries can be wrong. ctx runs model-written commands, and the paper does not evaluate the sandbox. The arXiv record did not link code on November 13, 2026."
  - question: "Where is the paper?"
    answer: "The record is arXiv 2611.16627. The abstract, the HTML, and the PDF are linked in the references. LOCA-bench is arXiv 2602.07962, with a GitHub repository and a leaderboard that uses a different protocol. This page did not find a Folio code release on the arXiv record."
---

## The fold selects records the runtime already wrote

A [harness](/glossary/harness) has to decide what the next model call sees. On a long task that decision is repeated, and each repeat is a bill. The usual implementation asks the model to summarize the transcript. [Claude Code's context-window page](https://code.claude.com/docs/en/context-window), read November 13, 2026, says compaction summarizes the conversation history so the session fits. [OpenAI's compaction guide](https://developers.openai.com/api/docs/guides/compaction), read the same day, says the server returns an encrypted compaction item that carries prior state in fewer tokens, and that the item is opaque. Both are model-produced reductions. Folio's reduction is a view selection over records the runtime wrote on the way.

Three levels, three authors. The model writes only L1, a short note at the end of an ordinary reply: an outcome line and fact lines. The runtime writes L2, a manifest row per call, with the tool, a digest of the arguments, status, size, and, above 1K tokens, a one-line shape. The runtime writes L3, the append-only event log, including the full output when the copy routed to the model was cut. A handle such as `t3.12` is the identity. A byte range and a digest are the access hint. A mismatch falls back to parsing the log.

The fold renders into a layout budget. The reference budget is 50K tokens. Twenty percent holds the outline. Of the rest, twenty percent holds the head of the open turn's raw results and the remainder holds the tail. Closed turns start at three resolutions: the newest with call rows, the two before it with the full note, older turns as a brief. Already sent lines are not redrawn at a richer level, which is how the folded prefix stays a cache hit. Recovery is three operations on the same handle. `scan` reads a bounded page. `ctx` binds the full text to a file and runs a command the agent writes, so a 900-row table can be counted outside the window. The dossier keeps findings, notes, and rules, and the next fold carries it, under a budget of 12 percent of the window.

The trigger prices the landing point `S = B + L + D`: stable prefix, layout budget, rendered dossier. A fold is due once the cached reads carried above that landing point have cost as much as rebuilding it. The reference uses DeepSeek-V4-Pro's ratios, 30 for uncached input and cache writes and 90 for output. The extra reasoning after a fold, and the tokens read back, are left out of the trigger on purpose. They show up in later requests, where the cost equation counts them.

## 66 of 75, and which gaps clear 0.05

The paper's comparisons are internal. Piki-Classic is the same runtime, summarizing at 90 percent of the window. [Claude Code](https://code.claude.com/docs/en/context-window), [Codex](https://developers.openai.com/api/docs/guides/compaction), and [SoL-Pi](https://arxiv.org/abs/2609.20519) are the authors' runs of those harnesses on DeepSeek-V4-Pro, at a 1 million token window. No cell is copied from a vendor board. The [LOCA-bench leaderboard](https://loca-bench.github.io/), opened November 13, scores a different protocol, environment growth from 8K to 256K tokens. Folio chains 15 tasks into one session so the history of earlier tasks is still there.

Table 1 is successes out of 75, the mean and standard deviation of successes out of 15 per chain, working time in minutes, and runs the benchmark's contamination scan flagged. Flagged runs stay in the success count.

| System | Solved | Per chain | Mean min | Median min | Flagged |
| --- | --- | --- | --- | --- | --- |
| Claude Code | 59 | 11.8 ± 0.8 | 18.5 | 13.7 | 9 |
| Codex | 57 | 11.4 ± 1.7 | 20.2 | 15.4 | 27 |
| SoL-Pi | 49 | 9.8 ± 1.3 | 21.0 | 17.9 | 24 |
| Piki-Classic | 54 | 10.8 ± 1.3 | 16.3 | 13.7 | 11 |
| Folio, 128K | 60 | 12.0 ± 1.2 | 16.4 | 7.8 | 9 |
| Folio, 1M | 66 | 13.2 ± 1.5 | 10.2 | 6.9 | 8 |

The comparison the test supports is Folio against Piki-Classic. Paired by task, Folio solves 14 that the summary misses and misses 2 that the summary solves. Exact McNemar p = 0.004. It is faster on 57 of 75 tasks, median time ratio 1.45. Mean time falls from 16.3 minutes to 10.2.

The lead over Claude Code and Codex is a count, and the paper says it is not significant at 0.05. The splits are 14 to 7 (p = 0.19) and 14 to 5 (p = 0.06). SoL-Pi is 20 to 3 (p < 0.001). Codex's 57 includes 27 flagged runs. SoL-Pi's 49 includes 24. Folio's 66 includes 8. A buyer who drops flagged runs cannot recompute the ranking from the printed table, because the paper does not say which flagged runs were successes.

The lead shows up late. Figure 3a is cumulative successes along the 15-task session, and the paper says Folio's gap widens in the second half, after earlier tasks have been folded. Two environments carry a large share of the gap. NHL B2B analysis is 4 of 5 for Folio and 0 of 5 for every other system. A/B-test analysis is 4 of 5 for Folio and at most 2 of 5 for the others.

## Where the normalized tokens go

Table 2 is the bill the Piki runtime recorded. Closed harnesses are absent because they did not expose provider usage. Normalized cost is cached input plus 30 times uncached input plus 90 times output, in millions of cached-read equivalents per task.

| Per task | Folio 1M | Folio 128K | Piki-Classic |
| --- | --- | --- | --- |
| Input tokens (M) | 4.01 | 2.72 | 14.12 |
| Cached | 3.69 | 2.46 | 13.29 |
| Uncached | 0.32 | 0.27 | 0.83 |
| Output tokens (M) | 0.07 | 0.10 | 0.10 |
| Cache hit rate | 92.0% | 90.2% | 94.1% |
| Normalized cost (M) | 19.75 | 19.83 | 47.00 |
| Folds or compactions | 1.13 | 3.15 | 0.32 |
| Model requests | 29.5 | 39.9 | 34.4 |

Over 75 tasks the totals are 1,481 million normalized tokens for Folio and 3,525 million for Piki-Classic. Dividing gives 2.38, which the abstract rounds to 2.4. Folio is cheaper on 68 of 75 tasks and in all 15 environments. The median per-task ratio is 2.29, a bit under the ratio of means, so a few expensive tasks pull the mean.

The tool-call totals are close, 10,701 and 10,173 across the two Piki runs. The paper's point is that the agents do similar work and carry different histories. Piki-Classic waits until the window is about 90 percent full, so a request can carry on the order of 900K tokens. It reads 3.5 times as much input. Its 24 summary requests cost 420 million normalized tokens, 28 percent of Folio's entire bill, before the summary's effect on later requests.

A fold is cheap because it is not a generation. Table 4, medians: 85 folds on the 1M run, zero model calls, 613 milliseconds, context from 242K to 64K, 7.3 times compression of the folded history, dossier 1.2K. Piki-Classic's 24 compactions each call the model, median 101 seconds, from about 908K to 58K. The paper calls 101 seconds 165 times a fold. On the 128K window the median fold is 346 milliseconds, from 121K to 39K. Across 809 folds in the whole section the re-render check, which rebuilds closed turns from the L1 and L2 files and checks that every tool output sits in exactly one manifest row, found one mismatch, in a discarded run.

The 128K row is the practical surprise. It solves 60 tasks, above every 1M baseline in Table 1, at a normalized cost within 0.4 percent of the 1M Folio run. It gets there by folding almost three times as often, reading 32 percent less input, issuing 35 percent more requests, and generating more output. The table prints 0.10 million output tokens against 0.07 million, and the text says 46 percent more, so that percentage is from the unrounded counts. Mean time goes back up to 16.4 minutes. A smaller window, on this price ratio, did not produce a smaller bill. It produced a slower agent that still finished more tasks than the summary baseline.

## What the ablations say to keep

Dropping the dossier changes one success, 66 to 65, and 0.1 percent of cost. Dropping the model's turn notes changes three successes, 66 to 63, and lowers cost 1.6 percent. The paper says a different chain of the same configuration already moves success by 3 to 4 out of 15, so those two cuts are not a result you can separate from noise.

The cuts that hurt were run on the first chain only. Removing `scan` and `ctx` drops that chain from 13 successes to 8. Three of the seven failures are timeouts or an agent error, and the run had 21 provider retries against none for the full system. Removing the outline as well, so the layout holds only raw text, folds 31 times against 16 and costs 63 percent more, 29.44 million against 18.07 million normalized tokens per task. Success, 11 of 15, sits inside the chain variation. The outline is how a fold stays small without making the next request refill immediately.

The landing-budget sweep, fifth chain, two orders, says the reference 50K is a compromise. From 10K to 70K, folds per chain fall from 49 to 13 and recoveries of folded content fall from 144 to 12. Successes rise from 11 to 13.5 of 15. The two runs at 50K differ by three tasks, 14 and 11. Cost is lowest at 30K, 17.5 million per task. The paper says 50K lies within 11 percent of that minimum. Above 75K the raw area hits a 60K cap, so a configured 150K does not buy a 150K landing, and cost rises with no further success.

On the main 1M run the agent did use the handles: 315 `ctx` calls, 55 `scan` calls, 86 expansions, and 21 `ctx` calls, 6.7 percent, that exited nonzero. In the CanvasArrangeExam case the fold took a 351K context to 83K in 928 milliseconds. The announcements, 793 KB and 16,708 lines across calls `t8.6`–`t8.177`, stayed out of the window. `ctx` returned 6.4K tokens of extracted exam rows. The task passed.

## What this means if you ship the harness

Ship the record before you ship a better summarizer. [SpecCompact](/research/speccompact-agent-context-compaction) is the right paper if the product already summarizes and the wait is the complaint: an 8.68× median in that paper's Hermes user study, with task scores that do not move as one story. Folio is the right paper if the summary itself is the thing you want off the critical path. The median wait here falls from 101 seconds to 0.6 seconds because the fold makes no model call. The task gain that clears 0.05 is 12 more solved tasks out of 75, inside one runtime, on one model.

Keep a handle that resolves to bytes, and a tool that can compute over the file. A summary that names "the course table" does not let the next step count 16,708 lines. Folio's `ctx` does, and the ablation that removes it is the one that loses successes on the chain where it was tried. Put the sandbox around that tool before you expose it. The paper does not.

Price the landing point, including the size you intend to keep. Piki-Classic fires at 90 percent of the window, lets the prompt get large, and then pays a rewrite. A reply on the [Codex repository](https://github.com/openai/codex/issues/10365), February 2, 2026, described the CLI default then as compaction at 90 percent of the available window. The compaction guide read on November 13 prices a threshold the caller sets, and it does not restate that 90 percent figure. Folio's 1M run fired all 85 folds from the price rule. The 128K run fired 201 of 236 from a safety line, because the cap left little room above the landing point. If the window is the small one, the formula is no longer what folds.

Do not read 66 against 59 as a reason to swap a production Claude Code or Codex install for an unpublished runtime. The paired tests do not say that, the model is DeepSeek-V4-Pro in every row, the cost column does not exist for those products, and Codex's count includes 27 flagged runs. Read it as evidence that the context manager is a large term in cost per task, and that a recoverable fold can beat a summary inside a controlled runtime. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches the whole harness program and reports cost per task after the search. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) stores procedures for a later session. Folio stores this session's tool results. The [short-context report](/research/you-dont-need-long-context) asks whether a written handoff can hold accuracy. Folio asks whether the original bytes can stay addressable after the window shrinks. Those are four different changes.

The June 2026 Copilot trace in the Microsoft Research preprint is the scale check. Compaction in 7.8 percent of sessions, 44.2 percent of tokens. Folio does not measure Copilot, and that preprint's PDF was last modified October 20, 2026, so it is background, not a result from this week. If your own traces have the same shape, the sessions worth instrumenting are the long ones, and the number to log is the summary call's latency and the cache miss on the next request. Folio's claim is that both can go to a runtime selection, provided the source was recorded on the way.
