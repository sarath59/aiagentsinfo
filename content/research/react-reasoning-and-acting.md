---
title: "ReAct: Synergizing Reasoning and Acting in Language Models"
description: "ReAct (Yao et al., 2022) interleaves a reasoning trace with an action, then reads the observation. The paper reports this on HotpotQA, FEVER, ALFWorld, and WebShop."
absoluteTitle: true
date: "2026-10-18"
updated: "2026-11-08"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
companies:
  - arxiv
  - github
  - wikipedia
paperTitle: "ReAct: Synergizing Reasoning and Acting in Language Models"
paperAuthors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao"
paperYear: 2022
paperUrl: "https://arxiv.org/abs/2210.03629"
codeUrl: "https://github.com/ysymyth/ReAct"
venue: "arXiv:2210.03629 (ICLR 2023)"
abstract: "ReAct prompts a language model to produce traces that mix verbal reasoning with task-specific actions, then observations. The paper studies question answering (HotpotQA), fact verification (FEVER), and interactive decision making (ALFWorld and WebShop)."
keyFindings:
  - "The paper interleaves reasoning traces and actions so a model can update a plan and call an external source, such as a Wikipedia API, instead of only reasoning in text or only acting."
  - "On HotpotQA and FEVER, the authors report that this interaction reduces hallucination and error propagation they associate with chain-of-thought alone."
  - "On ALFWorld and WebShop, the paper reports absolute success-rate gains of 34% and 10% over the imitation and reinforcement-learning methods it compares, using one or two in-context examples."
  - "Those figures belong to the models and tasks in the paper. They are not a current leaderboard."
methodology: "The authors evaluate prompting strategies on HotpotQA, FEVER, ALFWorld, and WebShop with language models of that period. Read the paper's experimental section for splits, baselines, and decoding details rather than relying on this summary."
limitations:
  - "This page is an editorial summary of the public paper, not a reproduction."
  - "Prompting recipes drift as models and tool APIs change. Do not copy 2022 scores into a later comparison."
  - "Thought traces are generated text. They are not evidence of a mind inside the model."
references:
  - title: "Yao et al., ReAct: Synergizing Reasoning and Acting in Language Models (arXiv:2210.03629)"
    url: "https://arxiv.org/abs/2210.03629"
  - title: "ReAct project site"
    url: "https://react-lm.github.io"
  - title: "Wei et al., Chain-of-Thought Prompting Elicits Reasoning in Large Language Models (arXiv:2201.11903)"
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

## What is ReAct: Synergizing Reasoning and Acting in Language Models?

ReAct is a 2022 prompting pattern that writes a reasoning trace, takes an action, then reads the observation before the next step.

If you have seen an agent print “Thought:” then “Action:” then “Observation:”, you have seen a descendant of **ReAct**. The contribution is not a new model. It is a prompting pattern that treats language as both a scratchpad and an interface to tools. The paper’s own title is ReAct: Synergizing Reasoning and Acting in Language Models. Yao, Zhao, Yu, Du, Shafran, Narasimhan, and Cao posted it as arXiv:2210.03629. It later appeared at ICLR 2023.

The pattern sits next to the [harness](/glossary/harness) glossary entry: the loop around the model, not the weights. The broader account of that loop, including the product runtimes checked November 8, 2026, is [How do AI agents work?](/blog/how-do-ai-agents-work). The short definition of the cycle is [agent loop](/glossary/agent-loop).

## What the paper actually does

The authors prompt a model to alternate reasoning traces with actions. On HotpotQA and FEVER, those actions hit a Wikipedia API. On ALFWorld and WebShop, the actions are steps in an interactive environment. They compare the mixture with reasoning-only and acting-only setups, and on the interactive tasks with imitation and reinforcement-learning baselines.

The public abstract reports absolute success-rate gains of 34% (ALFWorld) and 10% (WebShop) against those imitation and reinforcement-learning methods, with one or two in-context examples. Cite the paper for the exact tables. Do not treat the figures as a score for any 2026 product.

## What not to copy forward

Do not paste the original task scores into a modern [benchmark](/glossary/benchmark) chart. Tool APIs, context windows, and models have moved. A current number needs a current eval and a date.

## Read the source

- Paper: [arXiv:2210.03629](https://arxiv.org/abs/2210.03629). The abstract still states the 34% and 10% success-rate sentences. Re-read November 8, 2026.
- Project site: [react-lm.github.io](https://react-lm.github.io). It resolved on November 8, 2026.
- Code: [ysymyth/ReAct](https://github.com/ysymyth/ReAct). The repository resolved on November 8, 2026. GitHub lists its last push as February 6, 2024. It is the paper’s code.
- Related on this site: [Agent harnesses](/topics/harnesses), [How do AI agents work?](/blog/how-do-ai-agents-work), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [agent loop](/glossary/agent-loop), [tool use](/glossary/tool-use), [autonomy](/glossary/autonomy)
