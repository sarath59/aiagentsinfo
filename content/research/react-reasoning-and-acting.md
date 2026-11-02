---
title: "Paper breakdown: ReAct — reasoning and acting in language models"
description: "Sample editorial breakdown of Yao et al. 2022, a widely cited pattern for interleaving free-text thoughts with tool actions."
date: "2026-10-18"
updated: "2026-10-26"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
sample: true
paperTitle: "ReAct: Synergizing Reasoning and Acting in Language Models"
paperAuthors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao"
paperYear: 2022
paperUrl: "https://arxiv.org/abs/2210.03629"
codeUrl: "https://github.com/ysymyth/ReAct"
venue: "arXiv:2210.03629 (later ICLR 2023)"
abstract: "Sample editorial summary: ReAct prompts a language model to produce traces that mix verbal reasoning ('thoughts') with actions in an environment, then observations, rather than only chain-of-thought or only action. The paper studies question answering and interactive tasks and compares against acting-only and reasoning-only baselines."
keyFindings:
  - "The paper argues that interleaving thoughts and actions can reduce error propagation compared with acting-only prompts on the tasks they study."
  - "It presents qualitative traces where thoughts are used to track goals and handle exceptions — useful as a design pattern, not as a universal law."
  - "Results are task- and model-specific; treat numbers as historical, not as a 2026 leaderboard."
methodology: "Sample note: the authors evaluate prompting strategies on public QA and interactive environments of that period, using then-current language models. Read the paper's experimental section for splits, baselines, and decoding details rather than relying on this summary."
limitations:
  - "This page is a sample editorial summary, not a peer review or a reproduction."
  - "Prompting recipes drift as models and tool APIs change; do not copy 2022 numbers into a 2026 comparison."
  - "Thought traces are not a window into a mind; they are generated text that may or may not be faithful to the model's internals."
references:
  - title: "Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
  - title: "Wei et al., Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (cited by ReAct; arXiv:2201.11903)"
    url: "https://arxiv.org/abs/2201.11903"
citation:
  apa: "Yao, S., Zhao, J., Yu, D., Du, N., Shafran, I., Narasimhan, K., & Cao, Y. (2022). ReAct: Synergizing reasoning and acting in language models. arXiv:2210.03629."
  bibtex: |
    @article{yao2022react,
      title={ReAct: Synergizing Reasoning and Acting in Language Models},
      author={Yao, Shunyu and Zhao, Jeffrey and Yu, Dian and Du, Nan and Shafran, Izhak and Narasimhan, Karthik and Cao, Yuan},
      journal={arXiv preprint arXiv:2210.03629},
      year={2022},
      url={https://arxiv.org/abs/2210.03629}
    }
---

> **Sample research page.** Editorial summary for the `/research/[slug]` template. Replace this file with a reported breakdown. All bibliographic fields above point at the public paper.

## Why this paper is on the syllabus

If you have seen an agent print “Thought:” then “Action:” then “Observation:”, you have seen a descendant of **ReAct**. The contribution is not a new model. It is a **prompting pattern** that treats language as both a scratchpad and an interface to tools.

That is why it belongs next to our [harness guide](/blog/how-agent-harnesses-work) and the [harness](/glossary/harness) glossary entry.

## What to steal (carefully)

- **Interleave**, do not dump a long plan then execute blindly.
- **Keep observations in the trace** so later steps can correct earlier ones.
- **Measure against acting-only and reasoning-only** ablations if you claim the mix matters.

## What not to steal

Do not treat the original task scores as a modern [benchmark](/glossary/benchmark). Tool APIs, context windows, and models have moved. If you need current numbers, use a living eval and cite the date — see [reading agent benchmarks](/research/reading-agent-benchmarks).

## Read next

- Primary source: [arXiv:2210.03629](https://arxiv.org/abs/2210.03629)
- Related glossary: [tool use](/glossary/tool-use), [autonomy](/glossary/autonomy)
- Trackers: [breakthroughs timeline](/trackers/breakthroughs) (stub)
