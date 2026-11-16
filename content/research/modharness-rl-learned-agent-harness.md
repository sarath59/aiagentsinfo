---
title: "ModHarness-RL agent harness: CodeSearch F1 +14–24%"
description: "ModHarness-RL learns an agent harness as programs during RL. Qwen3-8B CodeSearch F1 rose from 0.333 to 0.412 on a 1,024-token budget. arXiv, 13 Nov 2026."
absoluteTitle: true
ledeQuestion: "What did ModHarness-RL change about the agent harness?"
ledeAnswer: "It learned two programs during training. On CodeSearch, overall F1 rose 14–24% over a fixed harness, including 0.333 to 0.412 for Qwen3-8B when history was capped at 1,024 tokens."
dataset:
  title: "ModHarness-RL CodeSearch F1, November 2026"
  description: "Overall F1 from He et al., arXiv:2611.18533, Table 1. Mean of file, module, and entity F1 on 288 SWE-bench localization tasks. Qwen3-8B with a 1,024-token history budget moved from 0.333 to 0.412."
  isBasedOn: "https://arxiv.org/abs/2611.18533"
date: "2026-11-16"
updated: "2026-11-16"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - openai
  - langchain
paperTitle: "ModHarness-RL: Recasting Harnesses as Learnable and Evolving Programs for Agentic RL"
paperAuthors: "Zelin He, Siyu Zhu, Jacob Helwig, Yujian Liu, Li An, Rohit Jain, Shiyu Chang, Alborz Geramifard"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.18533"
venue: "arXiv technical paper, 2611.18533, submitted November 13, 2026"
abstract: |
  A fixed agent harness goes stale while a model trains. ModHarness-RL, submitted to arXiv on November 13, 2026, learns that harness as two programs and keeps updating one of them as the weights change. On CodeSearch, overall F1 rose 14–24% over the same training run with the harness held fixed. For Qwen3-8B, with history capped at 1,024 tokens, the score moved from 0.333 to 0.412.

  The first program, Compression, rewrites old tool output without calling a model. The second, Steering, appends a short instruction only when a check over the trace fires, and a judge installs that check only for failures that are still happening. GPT-5-mini writes the programs. The policy that trains under them is Qwen3-4B or Qwen3-8B. Both trained agents beat zero-shot GPT-5-mini on the same localization tasks.

  The score is the mean of three F1 numbers: the file, the module, and the entity the agent names. It is not the percent of SWE-bench issues a patch resolves. This page was published November 16, 2026.
whyItMatters: |
  Harness engineering, on this site, is the work of designing the loop, tools, memory, permissions, and stop rules around a model. The glossary entry for a [harness](/glossary/harness), and the guide [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), use that definition. Shipping harnesses still ship that design by hand. On November 16, 2026, LangChain’s Deep Agents README still calls the library a batteries-included harness and still summarizes long threads. OpenClaw’s compaction page still summarizes older history in one model request. Hermes’s developer guide still fires an auxiliary-model summary at 50% of the context window by default.

  ModHarness-RL asks a different question, and it asks it during training. If the model is changing, the scaffold written for the model at step 0 is a guess about the model at step 200. The paper’s answer is to represent two pieces of the scaffold as programs over typed turns, fit the context program once, and admit a steering check only when replay shows the failure is not going away.

  That is a different change from the two harness papers already on this site. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches a tree of executable harnesses and then scores the winner with the model held fixed. [Evolver](/research/evolver-agent-exploration-evolving-capabilities) leaves Claude Code and Codex in place and injects a strategy note from an earlier trace. ModHarness-RL trains the weights and the harness together, on models from 1.5B to 8B, and the thing it writes is a program a trainer can replay. It does not replace a product harness, and its F1 is not a row on the SWE-bench leaderboard.

  The practical question is which part of a hand-written harness is doing the work, and what it costs to keep a frontier model in the compaction loop. In this paper, steering carries more of the CodeSearch gain than compression, compression matches a GPT-5-mini summary closely while spending far fewer teacher calls, and refitting the compression program during training makes the score worse. Those three results are why the page is here. For a compaction method aimed at a product harness rather than an RL trainer, see [SpecCompact](/research/speccompact-agent-context-compaction) and [Folio](/research/folio-recoverable-context-folding).
keyFindings:
  - "On CodeSearch, ModHarness-RL improves overall F1 over the fixed base harness in every setting: Qwen3-4B from 0.303 to 0.368 (+21%) and from 0.361 to 0.424 (+17%); Qwen3-8B from 0.333 to 0.412 (+24%) and from 0.403 to 0.460 (+14%). The paper’s average of those four relative gains is 19%. The history budget is 1,024 tokens in the limited settings and 8,192 in the sufficient ones."
  - "The same 8B run under the 1,024-token budget moves the instance-weighted means from file 0.540, module 0.285, and entity 0.175 to file 0.602, module 0.379, and entity 0.256. Entity F1 stays the lowest of the three. The gain is not only a coarser file name."
  - "Zero-shot GPT-5-mini, the model that writes the programs, scores 0.094 overall under the 1,024-token budget and 0.366 under the 8,192-token budget. Both trained ModHarness-RL agents beat it in both budgets. The 8B agent’s 0.460 against the creator’s 0.366 is the cleanest of those four comparisons."
  - "Steering alone averages a 15% relative gain over the base harness across the four CodeSearch settings. Compression alone averages 6%. On the 4B model with 8,192 tokens, compression alone is 0.363 against a base of 0.361, and on SWE-bench Lite that cell falls from 0.385 to 0.374."
  - "Against a GPT-5-mini summary called whenever the budget fills, the learned compression program scores 0.345 versus 0.340 on Qwen3-4B and 0.359 versus 0.377 on Qwen3-8B, both context-limited. The paper prints 36 scaled teacher calls and about 0.183 million tokens for the program, against 12,365 calls and 62.6 million estimated tokens for the 4B summary run."
  - "Refitting compression every ten steps drops Qwen3-8B under the 1,024-token budget from 0.412 to 0.279. Training the policy first and the harness second drops Qwen3-4B under the 8,192-token budget from 0.424 to 0.290, below the fixed-harness baseline of 0.361."
  - "In one printed CodeSearch episode on pypika, a steering check stays silent while the agent opens whole files. After a grep that shows a single function, the guidance tells the agent to scan nearby definitions. The agent then submits Term.rlike and receives the full reward of 3/3 for the file, the class, and the function."
methodology: |
  The source is arXiv 2611.18533, version 1. The abstract page says submitted on 13 Nov 2026, and the version line is Fri, 13 Nov 2026 18:45:49 UTC, primary category cs.AI. The same record is on the cs.AI listing dated Monday, 16 November 2026. This page did not find a v2. This breakdown was published November 16, 2026.

  The PDF names Zelin He, Siyu Zhu, and Jacob Helwig as equal contributors. He is listed at The Pennsylvania State University. Zhu, Helwig, Rohit Jain, Shiyu Chang, and Alborz Geramifard are listed at LinkedIn. Yujian Liu, Li An, and Chang are listed at the University of California, Santa Barbara. A footnote marks He, Liu, and An as interns at LinkedIn. The project page at https://zlhe0.github.io/ModHarness-RL/ prints the second author as Jason Zhu. This page uses Siyu Zhu, the name on the PDF.

  CodeSearch follows Sutawika et al., arXiv:2603.17829, which the paper calls CodeScout. The agent receives a repository checked out before a fix, plus the issue, and names the files, modules, and entities the fix changes. Training uses SWE-Smith. Evaluation is 288 tasks: 100 from SWE-bench Lite, 100 from SWE-bench Verified, and 88 from SWE-bench Pro. The reward is the sum of the three F1 scores, on a scale of 0 to 3. The tables report the mean of the three, on a scale of 0 to 1. Each training step samples 8 tasks and 8 episodes per task. The policy may take 10 turns, generates at most 1,024 tokens per turn, and issues one shell command per turn. The command times out after 30 seconds, and the agent sees at most 10,000 bytes of output. Qwen3-4B and Qwen3-8B train with reasoning disabled.

  Every method trains with GRPO for 200 steps on one node of eight H100s. The final checkpoint is scored. CodeSearch error bars in the figures are ±1 standard deviation over ten evaluations of that checkpoint. Compression is fit once, before training, by GPT-5-mini at medium reasoning effort. Steering runs 20 rounds, one every 10 steps, beside the trainer. A candidate is installed only when it scores strictly above the current harness on a held-out slice of 128 training tasks. That slice is disjoint from the 288 evaluation tasks. The history budget excludes the task statement. When the rendered history still exceeds it, the oldest whole turns are dropped and the gap is marked “[earlier turns omitted].” A limited cell uses 1,024 tokens. A sufficient cell uses 8,192, except ALFWorld, whose sufficient budget is 12,288 because episodes run longer.

  ALFWorld uses Qwen2.5-1.5B-Instruct, warm-started with supervised fine-tuning because it wins none of the training games, and Qwen2.5-7B-Instruct. Evaluation is 274 games. BIRD SQL uses Qwen3.5-2B and Qwen3.5-4B, with reasoning disabled, on the 1,534-question dev split. The paper runs the full method and the third-party baselines on CodeSearch only. On ALFWorld and BIRD SQL it reports each program alone against the base harness.
limitations:
  - "The full method and the memory, skill, prompt, and harness-evolution baselines are reported on CodeSearch. ALFWorld and BIRD SQL test each program alone. The paper says the full comparison should have covered those two environments as well."
  - "The official SWE-bench leaderboard reports percent resolved: a patch counts when hidden tests pass. Table 1 is the mean of file, module, and entity F1 on 288 localization tasks drawn from Lite, Verified, and Pro. A reader who treats 0.460 as 46% of issues resolved is reading a different benchmark."
  - "The abstract’s 5–12% margin over the strongest learned baseline fits three of the four CodeSearch settings. On Qwen3-8B with a 1,024-token budget, the strongest of EvolveR, SkillRL, INSPO, and HarnessForge is EvolveR at 0.347, and 0.412 is 18.7% above that. The 12% figure matches 0.412 against DeepAgents at 0.368, and DeepAgents is the fixed scaffold."
  - "GPT-5-mini writes every learned program, memory, skill, prompt, and harness edit, and it writes the summaries in the compaction comparison. The paper’s own limitation is that the creator is proprietary. The programs can be reused after they are written. A team that cannot call that model does not yet have a substitute in this paper."
  - "The compression call counts and several token totals are marked estimated or scaled. The 36 and 38 teacher calls are not a log of a public API bill. The paper’s “on the order of 100×” is the authors’ summary of those estimates."
  - "Table 2’s ALFWorld scores are 8.723 to 9.866. Figure 6 draws that environment on an axis marked 0, 5, and 10. They are not CodeSearch F1, and this page does not convert them into a win rate."
  - "DeepAgents in the table is version 0.6.12, run inside the authors’ trainer. On November 16, 2026 the repository’s newest listed deepagents release was 0.7.38, published November 13. The table is not a score for that release, and it is not a score for the hosted Deep Agents product."
  - "HarnessForge’s released code could not be run on CodeSearch as shipped. The authors ported the edit loop, used three rounds instead of the paper’s original training procedure, and replaced its fine-tuning stage with the same GRPO used everywhere else. The HarnessForge row is that port."
  - "A deterministic program can catch a repeated tool call or a file view that shows a single definition. The paper says this is a poor fit for open-ended conversation, where the signal is semantic. The gate can also accept a program that is slightly worse, because it scores candidates on a limited held-out set."
  - "The arXiv record and the project page, checked November 16, 2026, do not link a code repository. The cantools and pypika episodes are the authors’ illustrations, not a package a reader can pip-install today."
references:
  - title: "He et al., ModHarness-RL (arXiv:2611.18533)"
    url: "https://arxiv.org/abs/2611.18533"
    note: "Version 1, submitted 13 Nov 2026, 18:45:49 UTC. Primary category cs.AI. Read November 16, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.18533"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.18533"
  - title: "ModHarness-RL project page"
    url: "https://zlhe0.github.io/ModHarness-RL/"
    note: "Loaded November 16, 2026. Prints the second author as Jason Zhu. The PDF prints Siyu Zhu. No code repository linked from this page."
  - title: "Sutawika et al., CodeScout (arXiv:2603.17829)"
    url: "https://arxiv.org/abs/2603.17829"
    note: "The CodeSearch recipe this paper says it follows."
  - title: "SWE-bench leaderboard"
    url: "https://www.swebench.com/"
    note: "Read November 16, 2026. Each entry is percent resolved. That is a different metric from Table 1."
  - title: "LangChain Deep Agents"
    url: "https://github.com/langchain-ai/deepagents"
    note: "README on main, pushed 2026-11-15, read November 16, 2026. The paper cites version 0.6.12. The newest deepagents release listed that day was 0.7.38, published 2026-11-13."
  - title: "OpenClaw compaction"
    url: "https://docs.openclaw.ai/concepts/compaction"
    note: "Read November 16, 2026. Built-in compaction still summarizes older history in one model request."
  - title: "Hermes context compression guide"
    url: "https://github.com/NousResearch/hermes-agent/blob/main/website/docs/developer-guide/context-compression-and-caching.md"
    note: "Read November 16, 2026. Agent compressor threshold defaults to 0.50. prepare_ahead defaults to false."
  - title: "Chen et al., HarnessForge (arXiv:2606.01779)"
    url: "https://arxiv.org/abs/2606.01779"
    note: "The harness-evolution baseline. The ModHarness-RL authors say they ported the loop because the released code could not run on CodeSearch as shipped."
citation:
  apa: "He, Z., Zhu, S., Helwig, J., Liu, Y., An, L., Jain, R., Chang, S., & Geramifard, A. (2026, November 13). ModHarness-RL: Recasting harnesses as learnable and evolving programs for agentic RL. arXiv:2611.18533."
  bibtex: |
    @article{he2026modharness,
      title={ModHarness-RL: Recasting Harnesses as Learnable and Evolving Programs for Agentic RL},
      author={He, Zelin and Zhu, Siyu and Helwig, Jacob and Liu, Yujian and An, Li and Jain, Rohit and Chang, Shiyu and Geramifard, Alborz},
      journal={arXiv preprint arXiv:2611.18533},
      year={2026},
      url={https://arxiv.org/abs/2611.18533}
    }
faq:
  - question: "What is ModHarness-RL?"
    answer: "It is a training method that treats two parts of an agent harness as programs. Compression rebuilds the model’s context from typed turns, including the thought, the tool call, and the tool result. Steering adds a short instruction only when a check over those turns fires. GPT-5-mini proposes the programs. A held-out gate installs a steering check only when replay shows the failure is still occurring and the new harness scores higher. The model weights train with GRPO under the harness that is currently installed."
  - question: "When was the paper released, and who wrote it?"
    answer: "arXiv lists version 1 as submitted on 13 November 2026 at 18:45:49 UTC, in cs.AI. The same record appears on the 16 November 2026 listing. The PDF authors are Zelin He, Siyu Zhu, Jacob Helwig, Yujian Liu, Li An, Rohit Jain, Shiyu Chang, and Alborz Geramifard, with affiliations at Penn State, LinkedIn, and UC Santa Barbara. He, Zhu, and Helwig are equal contributors. The project page prints the second author as Jason Zhu. This breakdown uses the PDF name and was published 16 November 2026."
  - question: "How much did CodeSearch F1 rise?"
    answer: "Over a fixed harness trained the same way, overall F1 rose from 0.303 to 0.368 and from 0.361 to 0.424 for Qwen3-4B, and from 0.333 to 0.412 and from 0.403 to 0.460 for Qwen3-8B. Those are the paper’s +21%, +17%, +24%, and +14%. The first number in each pair is the 1,024-token history budget. The second is 8,192 tokens. The evaluation set is 288 tasks, 100 from SWE-bench Lite, 100 from Verified, and 88 from Pro."
  - question: "Is 0.412 a SWE-bench resolve rate?"
    answer: "No. 0.412 is the mean of three F1 scores for Qwen3-8B under a 1,024-token budget: did the agent name the right file, the right module, and the right entity. The reward before averaging is the sum of those three, from 0 to 3. The official SWE-bench leaderboard, read 16 November 2026, reports percent resolved, which counts a task only when the submitted patch passes hidden tests. Table 1 is not that number, and it is not a submission to that board."
  - question: "How is the compression program different from asking a model to summarize?"
    answer: "GPT-5-mini writes the program once, offline. After that, every episode runs the program with no model call. In the comparison, the alternative calls GPT-5-mini online whenever the history budget fills. On the two CodeSearch rows, the program scores 0.345 against 0.340 and 0.359 against 0.377. The paper prints 36 scaled calls for the program against 12,365 and 9,607 estimated calls for the online summary. Those call counts are the authors’ estimates, not an invoice."
  - question: "What did steering do on the pypika episode?"
    answer: "The check looks at the newest file view and fires when that view shows at most one function or class. Search hits and full-file reads stay silent. On a pypika task about rlike, the check fires after a grep that shows only def rlike. The guidance tells the agent to open the module and scan nearby definitions before submitting. The next command widens the view, and the agent submits Term.rlike in pypika/terms.py. The paper scores that episode 3/3. It is one training episode, not a success rate."
  - question: "Does this replace Claude Code, Codex, Deep Agents, OpenClaw, or Hermes?"
    answer: "No. Those products, as documented on 16 November 2026, still run a hand-written harness and still summarize with a model when the window fills. ModHarness-RL trains Qwen models from 1.5B to 8B inside the authors’ GRPO trainer. Its DeepAgents row is version 0.6.12 inside that trainer. The repository’s newest deepagents release on 16 November was 0.7.38. Use the paper to decide what to learn during training. Use a product page to decide what to install."
  - question: "Where is the paper, and is there code?"
    answer: "The record is arXiv 2611.18533. The abstract, the HTML, the PDF, and the project page are linked in the references. Checked on 16 November 2026, neither the arXiv record nor the project page linked a source repository."
---

## What a learned agent harness changes

ModHarness-RL is a November 13, 2026 method that stops treating the agent harness as a file you freeze before training. On CodeSearch, learning two programs and co-evolving one of them with the weights raised overall F1 by 14–24% over that frozen harness. The largest move is Qwen3-8B under a 1,024-token history budget, from 0.333 to 0.412.

The harness guides this sits next to are on [Agent harnesses](/topics/harnesses). The question the rest of this page closes is whether that gain is a better summary, a better prompt, or a program that only speaks when the model is still failing.

## The CodeSearch table

CodeSearch asks the agent to name the file, the module, and the entity a gold patch changes. Overall F1 is the mean of those three scores. Delta is the relative change against the base harness of the same model. Every learned row uses GPT-5-mini as the writer. The base harness is the hand-written scaffold, trained with the same GRPO run and left unchanged. DeepAgents is LangChain’s harness at version 0.6.12, also left unchanged. Bold in the paper marks the best cell in a column within a model. Here the ModHarness-RL row is the one to read across.

| Method | Lite | Verified | Pro | Overall | Versus base |
| --- | --- | --- | --- | --- | --- |
| Qwen3-4B, 1,024-token history | | | | | |
| Zero-shot, not trained | 0.172 | 0.139 | 0.113 | 0.142 | −53% |
| Base harness | 0.349 | 0.328 | 0.224 | 0.303 | — |
| DeepAgents 0.6.12 | 0.358 | 0.334 | 0.292 | 0.329 | +9% |
| INSPO, learned prompts | 0.323 | 0.317 | 0.253 | 0.299 | −1% |
| EvolveR, learned memory | 0.327 | 0.327 | 0.219 | 0.294 | −3% |
| HarnessForge, ported | 0.372 | 0.351 | 0.289 | 0.339 | +12% |
| SkillRL | 0.359 | 0.374 | 0.308 | 0.349 | +15% |
| Compression only | 0.393 | 0.356 | 0.277 | 0.345 | +14% |
| Steering only | 0.426 | 0.361 | 0.302 | 0.365 | +20% |
| ModHarness-RL | 0.422 | 0.388 | 0.282 | 0.368 | +21% |
| Qwen3-8B, 1,024-token history | | | | | |
| Zero-shot, not trained | 0.090 | 0.084 | 0.095 | 0.089 | −73% |
| Base harness | 0.363 | 0.357 | 0.272 | 0.333 | — |
| DeepAgents 0.6.12 | 0.433 | 0.371 | 0.289 | 0.368 | +10% |
| INSPO, learned prompts | 0.331 | 0.358 | 0.241 | 0.313 | −6% |
| EvolveR, learned memory | 0.381 | 0.374 | 0.277 | 0.347 | +4% |
| HarnessForge, ported | 0.350 | 0.348 | 0.192 | 0.301 | −10% |
| SkillRL | 0.338 | 0.308 | 0.275 | 0.309 | −7% |
| Compression only | 0.392 | 0.356 | 0.323 | 0.359 | +8% |
| Steering only | 0.453 | 0.397 | 0.298 | 0.386 | +16% |
| ModHarness-RL | 0.441 | 0.437 | 0.351 | 0.412 | +24% |

The 8,192-token budget is the same experiment with room to spare. The history still rarely hits the cap. ModHarness-RL still leads both models.

| Method | Lite | Verified | Pro | Overall | Versus base |
| --- | --- | --- | --- | --- | --- |
| Qwen3-4B, 8,192-token history | | | | | |
| Zero-shot, not trained | 0.138 | 0.111 | 0.105 | 0.119 | −67% |
| Base harness | 0.385 | 0.351 | 0.346 | 0.361 | — |
| DeepAgents 0.6.12 | 0.407 | 0.380 | 0.310 | 0.368 | +2% |
| INSPO, learned prompts | 0.400 | 0.408 | 0.322 | 0.379 | +5% |
| EvolveR, learned memory | 0.406 | 0.416 | 0.322 | 0.384 | +6% |
| HarnessForge, ported | 0.407 | 0.394 | 0.358 | 0.388 | +7% |
| SkillRL | 0.438 | 0.400 | 0.341 | 0.395 | +9% |
| Compression only | 0.374 | 0.374 | 0.338 | 0.363 | +1% |
| Steering only | 0.439 | 0.410 | 0.356 | 0.403 | +12% |
| ModHarness-RL | 0.454 | 0.432 | 0.381 | 0.424 | +17% |
| Qwen3-8B, 8,192-token history | | | | | |
| Zero-shot, not trained | 0.098 | 0.097 | 0.059 | 0.086 | −79% |
| Base harness | 0.431 | 0.419 | 0.352 | 0.403 | — |
| DeepAgents 0.6.12 | 0.465 | 0.456 | 0.361 | 0.430 | +7% |
| INSPO, learned prompts | 0.477 | 0.441 | 0.347 | 0.425 | +5% |
| EvolveR, learned memory | 0.443 | 0.450 | 0.353 | 0.418 | +4% |
| HarnessForge, ported | 0.430 | 0.395 | 0.274 | 0.370 | −8% |
| SkillRL | 0.478 | 0.428 | 0.362 | 0.426 | +6% |
| Compression only | 0.453 | 0.461 | 0.329 | 0.418 | +4% |
| Steering only | 0.483 | 0.487 | 0.385 | 0.455 | +13% |
| ModHarness-RL | 0.492 | 0.473 | 0.409 | 0.460 | +14% |
| GPT-5-mini, zero-shot, both budgets | | | | | |
| 1,024-token history | 0.113 | 0.108 | 0.055 | 0.094 | — |
| 8,192-token history | 0.404 | 0.389 | 0.298 | 0.366 | — |

GPT-5-mini is not trained in this table. It is the writer. Under the tight budget it scores 0.094, below every trained Qwen row. Under the loose budget it scores 0.366, which beats the trained 4B base harness (0.361) and loses to both ModHarness-RL agents (0.424 and 0.460). The paper’s claim that the gain is not distillation is this comparison: the policy sees the program’s output, and that output is never a training target.

The abstract’s other claim needs the table next to it. “5 to 12% over the strongest” memory, skill, prompt, or harness-evolution baseline is SkillRL on three settings: 0.349 to 0.368, 0.395 to 0.424, and 0.426 to 0.460. Those relative gaps are about 5%, 7%, and 8%. On Qwen3-8B with 1,024 tokens, the strongest of those four learned baselines is EvolveR at 0.347. ModHarness-RL at 0.412 is 18.7% above EvolveR, and 12.0% above DeepAgents at 0.368. The 12% sentence fits the fixed scaffold. It does not fit EvolveR in that cell. DeepAgents, INSPO, EvolveR, and the port of HarnessForge are all inside the authors’ trainer. They are not the public leaderboards of those projects.

Table 5 in the paper breaks the same runs into file, module, and entity. For Qwen3-8B with 1,024 tokens, the instance-weighted means move from 0.540, 0.285, and 0.175 to 0.602, 0.379, and 0.256. The entity is still the weak score. It is also the granularity that moves the most relative to its own base. A file-only reading of 0.412 misses that.

## A compression program, not another summary call

The useful half of the harness, once the budget is tight, is still not the summary. Steering’s average relative gain on CodeSearch is 15%. Compression’s is 6%. Compression’s case is cost, and one episode shows what the program actually keeps.

Figure 13 prints a program that walks earlier turns, skips anything that is not a file read, skips reads under 1,000 characters, and replaces a long read with a digest when that digest saves at least 200 characters. The digest keeps a header of the form “[read N chars; M lines]”, the imports and top-level assignments, and for each function or class the header, the first six body lines, a truncation marker, and the last two body lines. The newest turn is left alone.

On a stored cantools episode, the issue is a J1939 frame-id unpack that returns the wrong reserved field. A full `cat` of `src/cantools/j1939.py` is 4,484 characters. The digest keeps `frame_id_pack`, `frame_id_unpack`, and `pgn_pack` as stubs and says the file has 142 lines. Search output and a 71-character grep stay verbatim. The tool text the model would read before turn 5 falls from 5,626 characters to 2,809. That is one episode. It is the mechanism, not the average.

The alternative in Table 2 is the obvious one: when the budget fills, call GPT-5-mini, the same writer, and let it rewrite the history for that episode. Score is held-out validation. Calls, tokens, and milliseconds per turn for the teacher are the cost of producing the summary or the program across one training run. The paper marks some cells estimated (e), scaled from another run (s), or a lower bound (b).

| Setting | Method | Score | Teacher calls | Teacher tokens | ms per turn |
| --- | --- | --- | --- | --- | --- |
| CodeSearch, Qwen3-4B, limited | GPT-5-mini compaction | 0.340 | 12,365 e | 62.6M e | 749 e |
| CodeSearch, Qwen3-4B, limited | Compression program | 0.345 | 36 s | 0.183M e,s | 0.30 |
| CodeSearch, Qwen3-8B, limited | GPT-5-mini compaction | 0.377 | 9,607 e | 32.2M e | 329 e |
| CodeSearch, Qwen3-8B, limited | Compression program | 0.359 | 36 s | 0.183M e,s | 0.24 |
| ALFWorld, Qwen2.5-1.5B, limited | GPT-5-mini compaction | 8.723 | 247,347 e | 1,789.5M e | 4,127 e |
| ALFWorld, Qwen2.5-1.5B, limited | Compression program | 8.893 | 38 s | 0.198M e,s | 1.42 |
| ALFWorld, Qwen2.5-7B, sufficient | GPT-5-mini compaction | 9.866 | 7,123 e | 124.8M e | ≥103 e,b |
| ALFWorld, Qwen2.5-7B, sufficient | Compression program | 9.757 | 38 s | 0.198M e,s | 0.51 |

On CodeSearch the program wins one cell by 0.005 and loses the other by 0.018. The paper calls the loss “up to 5%.” The printed call ratio is larger than the “on the order of 100×” sentence, and the call counts on the program rows are scaled. Read them as the authors’ accounting, then look at the score column before you cancel a summarizer. The ALFWorld scores sit on the 0-to-10 axis of Figure 6. They are not the F1 in the tables above, and this page does not turn 8.893 into a percent of games won.

Two efficiency facts are on firmer ground because they are about the trained policy’s own context, not the teacher bill. Under the budget used in training, the prompt at the last model call stays within 3% of the base harness when the budget is 1,024 tokens. When the budget is large enough that it rarely binds, compression uses 74% fewer tokens on ALFWorld and 10% fewer on CodeSearch. Prefix-cache reuse falls, from a range of 64–95% of prompt tokens for the append-only harness to 58–72% for the program, and prefill tokens, the ones the cache misses, are still lower in three of four cells. A deterministic rewrite can keep a prefix stable. A fresh summary often cannot.

## Steering only for the failure that stays

The judge’s job is to refuse guidance the model is already learning to stop needing. Replay runs each candidate check over stored trajectories and plots how often the failure occurs by training step. The judge then does one of three things: install the guidance if the rate is flat or rising, keep watching if it has not settled, or skip it if the rate is falling. Figure 12 defines a failure, for that plot, as an episode that ends without a submitted answer. In the case where the rate keeps recurring, installing the guidance cuts it. In the case where the rate is already falling, leaving the guidance off is the run the judge picks, and the rate keeps falling.

The pypika episode is the concrete check. The task says the `rlike` method produces the wrong SQL. The program scans the newest command output that names a Python file and contains a `def` or a `class`, and it fires when that view has at most one of those lines. A search that lists several hits stays silent. `cat pypika/terms.py`, with 61 functions and 2 classes, stays silent. `cat pypika/enums.py` stays silent. `grep rlike` on `terms.py` shows a single definition, 52 characters, and the check fires. The guidance is one instruction: if the view shows only one function or class, open the module that defines it and scan nearby definitions before submitting. The next command is `grep rlike -A 100`. The agent submits `Term.rlike` in `pypika/terms.py` and scores 3/3.

That episode is an existence proof for a typed trigger. The ablation is the evidence that the loop around the trigger matters.

| Pipeline | 4B, 1,024 | 8B, 1,024 | 4B, 8,192 | 8B, 8,192 |
| --- | --- | --- | --- | --- |
| No new triggers during training | 0.302 | 0.378 | 0.365 | 0.375 |
| Every proposed trigger goes to the gate | 0.356 | 0.377 | 0.376 | 0.411 |
| Train the policy, then the harness | 0.344 | 0.395 | 0.290 | 0.444 |
| Fit the harness, then train the policy | 0.341 | 0.381 | 0.352 | 0.451 |
| Refit compression every 10 steps | 0.336 | 0.279 | 0.360 | 0.398 |
| ModHarness-RL | 0.368 | 0.412 | 0.424 | 0.460 |

A steering program written once, before training, lands at 0.302 on the 4B tight-budget run. The base harness there is 0.303. Generating new checks during training is the difference. Skipping the judge and sending every proposal to the gate is worse in every column. Doing all of the policy updates first, then fitting the harness, drops the 4B loose-budget run to 0.290, which is under the fixed harness at 0.361. The reverse order, harness first, is also under the joint run in every column.

The sharpest negative is the compression row. Refitting the context program every ten steps, instead of once before training, drops the 8B tight-budget score from 0.412 to 0.279. The paper’s reading is that the policy needs a stable rendering of the past while it trains. A harness that rewrites history on a schedule can erase the gain the rewrite was meant to buy. Table 4, on the loose budget only, is a smaller sensitivity check: updating steering every 5, 10, or 20 steps scores 0.404, 0.424, and 0.404 for the 4B model, and 0.429, 0.460, and 0.461 for the 8B model. The interval was chosen in advance. Ten steps is the reported setting, not a tuned winner on a large sweep.

## What is shipping on November 16, 2026

The comparison that matters for someone buying an agent is not another row inside this trainer. It is the harness they can install today.

[Deep Agents](https://github.com/langchain-ai/deepagents), the repository the paper cites, is still described on its README as the batteries-included agent harness. The README read on November 16, 2026 lists sub-agents with isolated context, a filesystem, and context management that summarizes long threads and offloads tool outputs to disk. The default branch was pushed November 15. The newest release tagged `deepagents` was 0.7.38, published November 13. The paper’s row is 0.6.12, with its planning checklist, scratchpad, sub-agents, and summarization, trained inside the authors’ loop and then frozen. A gain over that row is evidence about a pinned scaffold during GRPO. It is not a benchmark of the November 16 library, and the README’s quickstart model is not Qwen3-8B.

[OpenClaw’s compaction page](https://docs.openclaw.ai/concepts/compaction), read the same day, still summarizes older turns in one model request. A split turn adds a request. A failed safeguard audit adds one request per corrective attempt. Auto-compaction is on by default, and new configs default the mode to safeguard. The page also documents a separate OpenAI Responses compaction path for direct API-key sessions. Neither path is a program proposed from the agent’s own training trajectories and replayed over past ones. The summary is still a model call. [SpecCompact](/research/speccompact-agent-context-compaction) is the note on this site for speeding that kind of summary. ModHarness-RL’s compression result is the other design: pay the model once to write a program, then stop calling it.

[Hermes](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/developer-guide/context-compression-and-caching.md), in the developer guide read November 16, still runs two compression layers. The agent compressor, the primary one, fires at 50% of the context window by default and summarizes the middle with an auxiliary model while the head and tail stay protected. `prepare_ahead` can write the next summary in the background. It defaults to false. That is a hand-written policy with a model in the loop. It is the right contrast with a steering check that fires on a single function definition and a compression function that never calls a model at step time.

[HarnessFlow](/research/harnessflow-mcts-harness-optimization) and [Evolver](/research/evolver-agent-exploration-evolving-capabilities) remain the neighboring results, and they answer different questions. HarnessFlow searches harness source and reports an average of 69.48% after 15 attempts, with the executor held fixed. Evolver injects at most 12,000 bytes of strategy text into Claude Code or Codex and, on 320 diagnostic pairs, moves success from 83.13% to 87.50%. Neither number belongs in Table 1. Table 1 does not belong on those pages. The [November harness benchmark](/reports/agent-harness-benchmark-november-2026) copies official SWE-bench and Terminal-Bench resolve rates for named products. Those rates answer “did the patch pass.” This paper answers “did the trained localizer name the right symbol.”

On ALFWorld and BIRD SQL the paper is thinner on purpose. Each program alone beats the base harness in seven of eight settings. Under a limited ALFWorld budget, compression’s average gain over the two Qwen2.5 models is 22%, and steering’s is 16%. On BIRD SQL the two programs are close at Qwen3.5-2B, and compression is ahead at Qwen3.5-4B. The 1,024-token budget runs out on 30–42% of base-harness BIRD turns. The 8,192-token budget never runs out there. The full bake-off against EvolveR, SkillRL, INSPO, HarnessForge, and DeepAgents was not run on either environment. A team that only cares about text-to-SQL or household tasks does not yet have the table the CodeSearch reader has.

## What this means if you build or buy agents

Buy a harness for the loop you will run tomorrow, and treat this paper as a training result. Claude Code, Codex, Deep Agents, OpenClaw, and Hermes, as documented on November 16, still ship a fixed scaffold and still spend a model call on the summary. ModHarness-RL does not give you a drop-in replacement, and 0.412 is not a reason to swap one of those products for an 8B GRPO run.

If you train a small tool-using model, freeze the context renderer and let the guidance move. The ablation is the actionable part. Refitting compression every ten steps cut the best tight-budget 8B score from 0.412 to 0.279. A steering program written once, before any training, did not beat the base harness. The procedure that worked is: write compression once, replay candidate checks over the trajectories you already stored, and install a check only when the failure is still there at a later step.

Spend the frontier model on the program, not on every episode. The CodeSearch compaction comparison is a 0.005 win and a 0.018 loss against calling GPT-5-mini online, with the teacher-call counts estimated two orders of magnitude lower for the program. That trade is worth making when the traces are shell output and file reads, which a rule can digest. The paper says the same rule is a poor fit when the trace is open-ended conversation. [Folio](/research/folio-recoverable-context-folding) is the neighboring design for keeping the original tool bytes addressable after a fold, without this training loop.

Do not put Table 1 on a SWE-bench slide. The official board at [swebench.com](https://www.swebench.com/), read November 16, scores percent resolved. This paper scores whether a trained model named the right file, module, and entity, under a history budget of 1,024 or 8,192 tokens, with reasoning turned off. If you need a resolve rate for a product harness, start from the [November harness benchmark](/reports/agent-harness-benchmark-november-2026) and the [harness evaluation guide](/blog/how-do-you-evaluate-an-ai-agent-harness). If you need the definition before any of these numbers, start from [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

## Read the paper

The November 13 paper, the project page, and the live harness docs used above:

- [ModHarness-RL on arXiv](https://arxiv.org/abs/2611.18533)
- [HTML](https://arxiv.org/html/2611.18533)
- [PDF](https://arxiv.org/pdf/2611.18533)
- [Project page](https://zlhe0.github.io/ModHarness-RL/)
- [CodeScout, the CodeSearch recipe](https://arxiv.org/abs/2603.17829)
- [SWE-bench](https://www.swebench.com/)
- [Deep Agents](https://github.com/langchain-ai/deepagents)
- [OpenClaw compaction](https://docs.openclaw.ai/concepts/compaction)
- [Hermes compression guide](https://github.com/NousResearch/hermes-agent/blob/main/website/docs/developer-guide/context-compression-and-caching.md)

Related pages on this site: [agent harnesses hub](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [context compaction](/glossary/context-compaction), [context window](/glossary/context-window), [tool use](/glossary/tool-use), [benchmark](/glossary/benchmark), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [Evolver](/research/evolver-agent-exploration-evolving-capabilities), [SpecCompact](/research/speccompact-agent-context-compaction), [Folio](/research/folio-recoverable-context-folding), the [November harness benchmark](/reports/agent-harness-benchmark-november-2026), and [Best AI agent harness](/best/ai-agent-harnesses).
