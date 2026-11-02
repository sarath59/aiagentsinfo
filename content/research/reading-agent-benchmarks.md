---
title: "Original report (sample): How to read an agent benchmark"
description: "Sample original report on how this publication will read agent leaderboards: task match, contamination, cost, and human review — with pointers to public evals, not invented scores."
date: "2026-10-25"
updated: "2026-10-31"
type: original-report
topics:
  - research
  - task-performance
  - harnesses
sample: true
paperTitle: "How to read an agent benchmark (sample editorial report)"
paperAuthors: "AI Agents Info Research"
paperYear: 2026
abstract: "Sample original report: leaderboards for language-model agents are easy to misread. This note lists checks this desk will use — task match, contamination risk, hidden cost, human baselines, and harness identity — and points at public eval projects without quoting unpublished or invented numbers."
keyFindings:
  - "A benchmark is a frozen task suite plus a scoring rule. It is not the job you run in production."
  - "The harness (tools, retries, browsing, extra models) is part of the system under test. Naming only the base model is incomplete."
  - "Cost, latency, and human escalation rates belong next to accuracy. They are often missing from screenshots of leaderboards."
methodology: "This is a methods note, not an experiment. It does not run models. It proposes a reading checklist and cites public evaluation projects so future tracker pages have a documented standard."
limitations:
  - "Sample editorial content. No new empirical results."
  - "Public benchmarks change; always read the current dataset card."
  - "We do not rank vendors here and we do not invent scores."
references:
  - title: "SWE-bench (public software-engineering benchmark project)"
    url: "https://www.swebench.com/"
  - title: "GAIA: a benchmark for General AI Assistants (arXiv:2311.12983)"
    url: "https://arxiv.org/abs/2311.12983"
  - title: "HELM — Holistic Evaluation of Language Models (Stanford CRFM)"
    url: "https://crfm.stanford.edu/helm/"
citation:
  apa: "AI Agents Info Research. (2026). How to read an agent benchmark (sample editorial report). AI Agents Info."
  bibtex: |
    @misc{aiagentsinfo2026benchmarks,
      title={How to read an agent benchmark (sample editorial report)},
      author={{AI Agents Info Research}},
      year={2026},
      howpublished={AI Agents Info},
      note={Sample placeholder. Replace with a citable report.},
      url={https://aiagentsinfo.com/research/reading-agent-benchmarks}
    }
---

> **Sample original report.** Not a new scientific result. Use it as the skeleton for future desk notes. Do not cite it as evidence of model quality.

## The checklist

When a chart claims an agent is “state of the art,” this desk will ask:

1. **Task match.** Is the suite about tickets, browsers, shopping, or exams? SWE-bench is not GAIA; neither is your internal workflow.
2. **System identity.** Which [harness](/glossary/harness), tools, retries, and time budget? A model name is not a system.
3. **Contamination and leakage.** Was the task in training data or in previous traces? If nobody says, assume uncertainty.
4. **Human baseline.** Compared with whom, with what time limit?
5. **Cost and failure mode.** Dollars, tokens, wall time, and how it fails (refuses, loops, silently wrong).
6. **Date.** Leaderboards move. We will timestamp every number we eventually publish on the [benchmark tracker](/trackers/benchmarks).

## Public starting points (not scores)

- [SWE-bench](https://www.swebench.com/) — software engineering tasks.
- [GAIA](https://arxiv.org/abs/2311.12983) — assistant-style questions that often need tools.
- [HELM](https://crfm.stanford.edu/helm/) — broader language-model evaluation, not agent-only.

We are not copying tables of numbers into this sample. When the tracker leaves stub status, each cell will name a source and a retrieval date.

## How this feeds the rest of the site

- [ReAct breakdown](/research/react-reasoning-and-acting) for a historical prompting pattern.
- [How agent harnesses work](/blog/how-agent-harnesses-work) for the runtime around the eval.
- Glossary: [benchmark](/glossary/benchmark), [agent](/glossary/agent).
