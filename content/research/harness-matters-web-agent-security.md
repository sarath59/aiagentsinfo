---
title: "Harness Matters: 32.55% web-agent attack success"
description: "Harness Matters, arXiv November 9, 2026: six open-source web-agent harnesses had a 32.55% attack success rate after capability failures were set aside. The harness and the model both changed the outcome."
date: "2026-11-10"
updated: "2026-11-11"
absoluteTitle: true
ledeQuestion: "What attack success rate did Harness Matters report?"
ledeAnswer: "On six open-source web-agent harnesses, the overall attack success rate was 32.55%, after capability failures were excluded."
dataset:
  title: "WebTrap Farm attack success rates, November 2026"
  description: "Attack success rates from Wu et al., arXiv:2611.11971, Table 4 and Table 5. The open-source overall is 32.55% after capability failures are excluded."
  isBasedOn: "https://arxiv.org/abs/2611.11971"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - github
  - google
  - anthropic
  - openai
paperTitle: "Harness Matters: Measuring and Dissecting Security Resilience in Web Agents"
paperAuthors: "Xinyi Wu, Jiagui Chen, JiaYi Dong, Geng Hong, Xudong Pan, Jiarun Dai, Mingxuan Liu, Min Yang"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.11971"
codeUrl: "https://github.com/Agrfeblve/WebTrapFarm"
venue: "arXiv technical paper, 2611.11971, submitted November 9, 2026"
abstract: |
  A web-agent harness is the program that turns a model’s decision into a browser action: it reads the user’s goal, looks at the page, plans the next step, and clicks or types. Harness Matters, posted to arXiv on November 9, 2026, measures whether that program changes security, not only whether the task gets done.

  The authors build WebTrap Farm, a paired test. Each attack task has a usability twin with the adversarial trigger removed. An attack that fails counts as a defense only when the twin shows the agent could have completed the same kind of interaction. Otherwise the miss is a capability failure and is left out of the attack-success rate.

  On six open-source harnesses, the overall attack success rate is 32.55%. SeeAct is 42.31% and Agent-E is 20.24%. A mixed-effects model finds that the harness, the backend model, and their interaction all change the security outcome, each with p below 10 to the minus 45. Two commercial computer-use systems, pinned to older model names, are lower, at 15.14% and 16.85%, and are not part of that 32.55%. This page was published November 10, 2026.
whyItMatters: |
  Harness engineering, on this site, is the work of designing the loop, tools, memory, permissions, and stop rules around a model. The glossary entry for a harness uses that definition. Most public harness comparisons ask whether the job finished. Harness Matters asks a different question: when the job is one the agent is capable of doing, how often does the harness carry an unsafe action through.

  That split matters for anyone choosing or buying a web agent. A harness that completes more tasks is not automatically the safer one. In this paper Skyvern 2.0 has the highest task-completion rate they print, 85.25%, and a defense success rate of 58.01%. Agent-E has the highest defense success rate, 79.76%, and a task-completion rate of 61.33%. A procurement check that reads only a task score will miss that reversal.

  The comparison with earlier notes on this site is about the question, not the leaderboard. HarnessFlow, the November 4 paper, keeps the model fixed and searches for a harness with a higher task score. This paper keeps named harnesses fixed and scores security. The two numbers are not substitutes. The November 6 guide on evaluating a harness separates a behavioral check of one action from an end-to-end task score. WebTrap Farm is a third measurement: end-to-end, but the outcome is an unsafe action rather than a finished benign task.

  Checked November 10, 2026, the products around these harnesses have moved. Google’s computer-use guide lists gemini-3.8-flash as the recommended model and does not list the paper’s gemini-3.7-flash. Anthropic’s computer-use page shows claude-opus-5-5 with a toolset dated August 2026, not the paper’s claude-haiku-4-5-20251001. Browser Use and Skyvern were both pushed that morning. The tables below are the authors’ runs of the configurations they name. They are not a score for those November 10 services.
keyFindings:
  - "Table 4, attack success rate after capability failures are excluded: the six open-source harnesses are SeeAct 42.31%, Skyvern 2.0 41.99%, Browser Use (Vision) 34.08%, Browser Use (Text) 33.84%, Skyvern 1.0 21.80%, and Agent-E 20.24%. The paper states an overall of 32.55% for those harnesses. Table 5’s overall cell is the same 32.55%, across seven backend models. Commercial systems are separate rows: Gemini Computer Use 15.14% and Claude Computer Use 16.85%."
  - "The same table splits the rate by surface. Malicious user prompts, malicious prompt injection, and deceptive website design are 24.96%, 49.44%, and 54.37% for SeeAct, and 8.48%, 25.16%, and 23.01% for Agent-E. Gemini Computer Use is 1.45%, 14.29%, and 25.51%. Claude Computer Use is 9.59%, 16.67%, and 22.12%. The paper says overall rates are a weighted average across attacks, not an unweighted mean of the three columns."
  - "Table 5, same denominator, by backend model inside the open-source harnesses: Qwen3-VL-30B 41.73% overall, GPT-4o 39.12%, Qwen3-VL-235B 37.34%, Claude-3.7-Sonnet 32.11%, GPT-5.2 27.41%, GPT-5.1 27.38%, Claude-Opus-4.5 22.90%. Claude-Opus-4.5 is 3.25% on malicious user prompts and 36.03% on malicious prompt injection. Qwen3-VL-30B is 57.94% on malicious user prompts and 27.78% on malicious prompt injection. The column overalls are 27.34%, 33.54%, and 35.27%."
  - "Table 6 holds the model fixed and still moves the defense success rate. Under GPT-4o, Agent-E is 83.79% and Skyvern 2.0 is 42.89%. The paper states that gap as 40.90 percentage points. The seven-model overall defense success rates are Agent-E 79.76%, Skyvern 1.0 78.20%, Browser Use (Text) 66.16%, Browser Use (Vision) 65.92%, Skyvern 2.0 58.01%, and SeeAct 57.69%. The grand overall is 67.45%."
  - "Table 7 is a mixed-effects logistic regression on the calibrated outcomes for the open-source cross. Harness: 5 degrees of freedom, chi-square 331.17, p = 1.97×10^−69. Backend model: 6 degrees of freedom, chi-square 437.63, p = 2.25×10^−91. Interaction: 30 degrees of freedom, chi-square 299.81, p = 2.88×10^−46. The paper says all three are below 10^−45. A model of whether a task was evaluable at all stays below 10^−31 for the same three effects, and an extreme relabeling of capability failures stays below 10^−39."
  - "Naive web-side attacks, with no extra injected sentence and no extra deceptive copy, can match attacks that include that copy. On malicious prompt injection, SeeAct’s naive rate is 50.00% and the rate for the other attacks is 49.37%. On deceptive website design, Browser Use (Text) is 41.27% naive and 36.30% on the other attacks. The paper reads this as harness-intrinsic: the page affordance is enough."
  - "Stage-level conditional defense rates, and the GPT-4o ablations on 100 sampled tasks each, are the design evidence. Replacing Agent-E’s goal-interpretation prompt with Skyvern 2.0’s lowers that stage’s conditional rate from 75.61% to 53.85%, a drop of 21.76 points. Removing risk-awareness cues drops Browser Use (Vision) from 73.91% to 43.48% and Agent-E from 92.86% to 69.77%. Relaxing Agent-E’s perception filter drops the web-side perception stage from 56.94% to 50.70%. Removing Skyvern 1.0’s goal-anchoring instruction drops planning from 70.73% to 54.05%. Giving Agent-E’s planner the original user instruction raises planning from 19.35% to 43.59%."
methodology: |
  The source is arXiv 2611.11971, version 1. The submission history lists it as submitted by Xinyi Wu on Monday, November 9, 2026, at 06:53:04 UTC. The primary category is cs.CR, with cs.AI as the second category. The PDF and the HTML were both read on November 10, 2026. The PDF is 19 pages. Table 4 and Table 5 match across the two renderings. This page did not find a later version.

  The author block marks Xinyi Wu and Jiagui Chen with equal contribution, and Geng Hong and Min Yang as corresponding authors. Superscripts place Wu, Chen, Dong, Hong, Dai, and Yang at Fudan University, Pan also at the Shanghai Innovation Institute, Liu at Zhongguancun Laboratory, and Yang also at the Shanghai Pudong Research Institute of Cryptology. The acknowledgment credits the New Generation Artificial Intelligence National Science and Technology Major Project, number 2025ZD0123204. Appendix E is a meta-review prepared by the program committee for the 2027 IEEE Symposium on Security and Privacy. It includes a section titled Reasons for Acceptance. The PDF does not print a proceedings page range.

  A web-agent harness, in Section 2, is the execution program around the model. The authors surveyed 40 papers from 2021 to 2026 and 68 GitHub projects with at least 1,000 stars, found with the queries “web agent” and “browser agent,” after dropping repositories that do not implement agentic web interaction. They split the common workflow into four stages: goal interpretation, webpage perception, reasoning and planning, and action execution. Table 1’s ratios, over those 68 projects, are raw-prompt forwarding 15.0% and an LLM goal interpreter 85.0%; a textual state encoder 67.7% and a multimodal encoder 39.8%; a single-controller planner 73.0% and a multi-role planner 27.0%; a rule-based action grounder 83.8% and an LLM action grounder 16.2%. Perception sums to more than 100% because some agents support both encoders.

  WebTrap Farm pairs each attack task with a usability task. If the unsafe action happens, the label is attack success. If it does not, and the usability twin succeeds, the label is defense success. If the twin also fails, the label is capability failure. Attack success rate and defense success rate both drop capability failures from the denominator. Task completion rate is the share of attack tasks that are not capability failures. Outcomes are read from JavaScript on the page, not from the agent’s own log. Open-ended malicious-user-prompt text is scored by GPT-4o. A 10% random sample, 672 of 6,720 outputs, had 99.26% agreement between two human annotators, and the judge matched their consensus in 99.55% of cases.

  Table 11 counts the attack tasks: 160 malicious user prompts, 158 malicious prompt injections, and 187 deceptive website designs. Those three printed counts sum to 505. User-side goals include bias, misinformation, cybercrime, illegal activity, and abusive behavior. Web-side goals are sensitive-information disclosure, a malicious download, and permission abuse. A naive web-side variant inserts no extra attack sentence and no extra deceptive copy. The environments are adapted from earlier datasets and hosted by the authors. The ethics appendix says the runs used locally controlled agents and self-hosted sites, and did not touch third-party systems.

  The six open-source harnesses are SeeAct, Browser Use in a text configuration and a vision configuration, Agent-E, Skyvern 1.0, and Skyvern 2.0. Each is crossed with seven backends: GPT-4o, GPT-5.1, GPT-5.2, Claude-Opus-4.5, Claude-3.7-Sonnet, Qwen3-VL-30B-A3B-Instruct, and Qwen3-VL-235B-A22B-Instruct. Temperature is 0. Each task needs one completed execution. Infrastructure failures are retried. The full benchmark was repeated three times on all six harnesses with Qwen3-VL-235B and with GPT-5.1. The paper says the average standard deviation is 1.73 percentage points. The two commercial rows use the products’ own models and do not swap backends: Gemini Computer Use as gemini-3.7-flash, and Claude Computer Use as claude-haiku-4-5-20251001.

  The regression in Table 7 is a generalized linear mixed model. Fixed effects are harness, backend model, their interaction, and attack category. Task is a random intercept. Six harnesses and seven models give the printed degrees of freedom, 5, 6, and 30. The commercial systems are not in that cross.

  Section 5 localizes a defense inside a successful trace. Two annotators labeled 300 stage-level instances, with 97.33% agreement and Cohen’s kappa of 0.96. Automated labels matched the humans in 98.67% of that sample. Conditional defense success rate at a stage is the share of remaining security-relevant tasks whose defense is localized there, after earlier-stage defenses are removed. The ablations use GPT-4o and 100 sampled tasks per surface.
limitations:
  - "The limitations section says the evaluation covers three attack categories, and that malicious tools are outside the scope. It also says the websites are controlled. Dynamic live sites are not in the measurement. The authors call the control a gain for reproducibility."
  - "Attack success rate and defense success rate exclude capability failures. The 32.55% figure is not the share of all 505 attack tasks on which an unsafe action occurred. The paper does not print one task-completion rate for the whole study. It does print 85.25% for Skyvern 2.0 and 61.33% for Agent-E."
  - "The 32.55% overall is the open-source result. Gemini Computer Use at 15.14% and Claude Computer Use at 16.85% are not inside it. Those two rows use gemini-3.7-flash and claude-haiku-4-5-20251001. On November 10, 2026, Google’s computer-use model list named gemini-4-argon, gemini-3.8-flash, gemini-3.5-flash-lite, and gemini-3-flash-preview. Anthropic’s computer-use example used claude-opus-5-5 and the toolset computer_toolset_20260801."
  - "The paper does not name a commit for Browser Use, Skyvern, SeeAct, or Agent-E. On November 10, 2026, browser-use/browser-use showed 120,474 stars and a push at 02:34:17 UTC, and Skyvern-AI/skyvern showed 23,376 stars and a push at 05:01:12 UTC. The table is not a score of those heads, and not a score of Browser Use Cloud."
  - "Appendix E says fine-grained intent interpretation, risk-aware reasoning, perception filtering, and goal anchoring are supported by the controlled ablations. It says the textual-versus-multimodal, single-versus-multi-role, and rule-versus-LLM-grounding contrasts are observational differences between harnesses. The same appendix says a static attack set will lag newer attacks."
  - "Open-ended malicious-user-prompt scoring uses GPT-4o. The human check is a 10% sample, not every output. Stage labels used for the conditional rates are automatic outside a 300-instance sample. The case study of a credit-card field is one inspected trace, not a rate."
  - "The public repository, checked November 10, 2026, was created February 6, 2026, last pushed October 8, 2026, and showed 0 stars and no GitHub license. The README says result databases, trajectories, and fitted artifacts are not in the code-only release. The arXiv license link is the non-exclusive distribution license, not a Creative Commons license."
references:
  - title: "Wu et al., Harness Matters (arXiv:2611.11971)"
    url: "https://arxiv.org/abs/2611.11971"
    note: "Version 1 submitted November 9, 2026, 06:53:04 UTC, by Xinyi Wu. Primary category cs.CR. PDF and HTML read November 10, 2026."
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.11971"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.11971"
    note: "19 pages. Table 4 and Table 5 match the HTML."
  - title: "WebTrap Farm source repository"
    url: "https://github.com/Agrfeblve/WebTrapFarm"
    note: "GitHub API on November 10, 2026: created February 6, 2026, pushed October 8, 2026, 0 stars, license field empty. README says experimental result databases are not included."
  - title: "Google, Computer use (Gemini API on AI Studio)"
    url: "https://aistudio.google.com/docs/computer-use"
    note: "Loaded November 10, 2026. The old ai.google.dev address redirected here. Supported models named on the page: gemini-4-argon, gemini-3.8-flash (called the recommended model), gemini-3.5-flash-lite, and gemini-3-flash-preview. Prompt-injection detection is described as opt-in screenshot scanning."
  - title: "Anthropic, Computer use tool"
    url: "https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool"
    note: "Loaded November 10, 2026. The example request uses claude-opus-5-5 and computer_toolset_20260801."
  - title: "Browser Use"
    url: "https://github.com/browser-use/browser-use"
    note: "GitHub API on November 10, 2026: 120,474 stars, pushed 02:34:17 UTC. The description names the open-source library and Browser Use Cloud."
  - title: "Skyvern"
    url: "https://github.com/Skyvern-AI/skyvern"
    note: "GitHub API on November 10, 2026: 23,376 stars, pushed 05:01:12 UTC. Description: automate browser-based workflows with AI."
  - title: "Hong et al., HarnessFlow (arXiv:2611.06254)"
    url: "https://arxiv.org/abs/2611.06254"
    note: "Submitted November 4, 2026. Searches a harness for task score. A different question from this security measurement."
citation:
  apa: "Wu, X., Chen, J., Dong, J., Hong, G., Pan, X., Dai, J., Liu, M., & Yang, M. (2026, November 9). Harness Matters: Measuring and dissecting security resilience in web agents. arXiv:2611.11971."
  bibtex: |
    @article{wu2026harnessmatters,
      title={Harness Matters: Measuring and Dissecting Security Resilience in Web Agents},
      author={Wu, Xinyi and Chen, Jiagui and Dong, JiaYi and Hong, Geng and Pan, Xudong and Dai, Jiarun and Liu, Mingxuan and Yang, Min},
      journal={arXiv preprint arXiv:2611.11971},
      year={2026},
      url={https://arxiv.org/abs/2611.11971}
    }
faq:
  - question: "What does harness mean in the Harness Matters paper?"
    answer: "A harness is the program around the model that runs a web agent. The paper splits it into four stages: goal interpretation, webpage perception, reasoning and planning, and action execution. Harness Matters measures that program as a security factor. It does not train a new model and it does not search for a new harness. The six open-source harnesses in the experiment are SeeAct, Browser Use in text and vision configurations, Agent-E, Skyvern 1.0, and Skyvern 2.0."
  - question: "What is the headline attack success rate, and when was the paper released?"
    answer: "arXiv lists version 1 as submitted November 9, 2026, at 06:53:04 UTC, in cs.CR, with cs.AI as a second category. On the six open-source web-agent harnesses, the overall attack success rate is 32.55% after capability failures are excluded. SeeAct is 42.31% and Agent-E is 20.24%. This breakdown was published November 10, 2026."
  - question: "Does the harness matter if the model stays the same?"
    answer: "Yes, in this experiment. Under GPT-4o, Agent-E’s defense success rate is 83.79% and Skyvern 2.0’s is 42.89%, a gap the paper states as 40.90 percentage points. The mixed-effects model gives the harness a chi-square of 331.17 on 5 degrees of freedom, p = 1.97×10^−69. The model and the harness-by-model interaction are also below 10^−45. Claude-Opus-4.5’s overall defense success rate is 77.10%, but inside Agent-E it is 75.19%, below GPT-4o’s 83.79% and Qwen3-VL-235B’s 82.16% in that same harness."
  - question: "Why are some failed attacks not counted as defenses?"
    answer: "Each attack task has a usability twin with the adversarial trigger removed. If the agent fails the attack and also fails the twin, WebTrap Farm calls that a capability failure and leaves it out of the attack success rate and the defense success rate. The 32.55% figure is the rate among tasks the agent showed it could perform. It is not the rate across every task in the set."
  - question: "How do the commercial computer-use systems compare?"
    answer: "Table 4 prints Gemini Computer Use, pinned to gemini-3.7-flash, at 15.14% overall, and Claude Computer Use, pinned to claude-haiku-4-5-20251001, at 16.85%. Both are below the open-source overall of 32.55%. Deceptive website design is higher than those overalls: 25.51% for Gemini and 22.12% for Claude. These rows do not swap in the seven backend models, and they are not the computer-use model names on Google’s and Anthropic’s docs on November 10, 2026."
  - question: "Where does the defense actually happen?"
    answer: "It depends on the attack surface. On malicious user prompts, Agent-E’s goal interpreter localizes 82.71% of its conditional defense at that first stage, while raw-prompt forwarding localizes 0.00%. On web-side attacks, Agent-E’s textual perception localizes 78.99%, and Browser Use (Vision) localizes 9.96% at perception. Skyvern 1.0 localizes 78.17% at planning. Rule-based action grounding localizes 0.00% at the execution stage in these tables. The GPT-4o ablations, on 100 tasks each, support finer intent prompts, risk-awareness cues, perception filtering, and keeping the planner tied to the original user goal."
  - question: "Is a more capable harness a safer harness?"
    answer: "Not in the comparison the paper prints. Skyvern 2.0 has the highest task-completion rate in that discussion, 85.25%, and a defense success rate of 58.01%. Agent-E has the highest defense success rate, 79.76%, and a task-completion rate of 61.33%. Completing more web interactions can also mean completing more unsafe ones when the checks are weak."
  - question: "What are the limits of the result?"
    answer: "The study uses three attack categories on controlled websites, not malicious tools and not the live web. Capability failures are excluded from the headline rate. The commercial rows are two older model pins. Several component comparisons are observations across different harnesses, not isolated swaps. The code repository does not include the result databases. Appendix E also says a fixed attack set will lag newer attacks."
  - question: "Where is the paper and the code?"
    answer: "The record is arXiv 2611.11971. The abstract page, the HTML, and the PDF are linked in the references. The code is https://github.com/Agrfeblve/WebTrapFarm. On November 10, 2026 that repository had been pushed on October 8, 2026, showed 0 stars, and the README said the experimental result databases are not included."
---

## What the six harnesses did under attack

The rates below are the authors’ measurements inside WebTrap Farm. An attack success means the unsafe action was carried out. The denominator drops tasks labeled capability failure, which are attacks the agent also could not complete in the benign twin. The paper says the overall column is a weighted average across attacks. It is not the unweighted mean of the three surface columns, and the six harness overalls do not themselves average to 32.55. That 32.55% is the aggregate the paper prints for the open-source runs, and it is also the bottom-right cell of the model table.

MUP is malicious user prompts. MPI is malicious prompt injection. DWD is deceptive website design. The two commercial rows use the product’s own model. They are not crossed with the seven backends.

| System | MUP | MPI | DWD | Overall |
| --- | --- | --- | --- | --- |
| SeeAct | 24.96% | 49.44% | 54.37% | 42.31% |
| Browser Use (Text) | 25.87% | 35.38% | 37.13% | 33.84% |
| Browser Use (Vision) | 21.17% | 40.55% | 36.17% | 34.08% |
| Agent-E | 8.48% | 25.16% | 23.01% | 20.24% |
| Skyvern 1.0 | 32.75% | 8.04% | 24.02% | 21.80% |
| Skyvern 2.0 | 43.49% | 39.79% | 42.83% | 41.99% |
| Claude Computer Use | 9.59% | 16.67% | 22.12% | 16.85% |
| Gemini Computer Use | 1.45% | 14.29% | 25.51% | 15.14% |

SeeAct and Skyvern 2.0 are the highest open-source overalls, 42.31% and 41.99%. Agent-E is the lowest, 20.24%, and Skyvern 1.0 is next at 21.80%. The unweighted mean of those six overalls is 194.26 divided by 6, which is 32.38% to two decimals, not the printed 32.55%. The 32.55% figure is the paper’s weighted aggregate, also printed as Table 5’s overall cell. The ordering is not the same on every surface. Skyvern 1.0 is the highest on malicious user prompts, 32.75%, and the lowest on malicious prompt injection, 8.04%. Agent-E is lowest on user prompts, 8.48%, and still above 20% on both web-side surfaces. A harness that looks safer on one surface is not the safer harness on the others.

The commercial overalls, 16.85% and 15.14%, sit below every open-source overall. The nearest open-source overalls are Agent-E at 20.24% and Skyvern 1.0 at 21.80%. On deceptive website design the commercial rows are not the lowest: Gemini is 25.51%, above Agent-E’s 23.01% and Skyvern 1.0’s 24.02%, and Claude is 22.12%. The paper’s sentence is that the commercial systems show stronger end-to-end safeguards than the open-source harnesses and still have meaningful vulnerabilities under deceptive design.

### The same harnesses, split by model

Table 5 pools the open-source harnesses and splits by the model inside them. The overall row is the 32.55% figure.

| Backend model | MUP | MPI | DWD | Overall |
| --- | --- | --- | --- | --- |
| Claude-3.7-Sonnet | 31.03% | 31.19% | 33.72% | 32.11% |
| Claude-Opus-4.5 | 3.25% | 36.03% | 22.55% | 22.90% |
| GPT-4o | 32.15% | 35.86% | 46.57% | 39.12% |
| GPT-5.1 | 10.81% | 37.59% | 29.47% | 27.38% |
| GPT-5.2 | 5.52% | 36.48% | 33.97% | 27.41% |
| Qwen3-VL-235B | 44.73% | 29.48% | 38.99% | 37.34% |
| Qwen3-VL-30B | 57.94% | 27.78% | 42.25% | 41.73% |
| Overall | 27.34% | 33.54% | 35.27% | 32.55% |

A low rate on malicious user prompts does not travel to the web. Claude-Opus-4.5 is 3.25% on user prompts and 36.03% when the instruction is in the page. GPT-5.2 is 5.52% on user prompts, 36.48% on prompt injection, and 33.97% on deceptive design. Qwen3-VL-30B is the reverse shape: 57.94% on user prompts, the highest cell in that column, and 27.78% on prompt injection, below several of the closed models. The paper’s reading is that model safety does not transfer uniformly across surfaces, so a model has to be scored inside the web-agent loop.

Defense success rate is the complement of attack success rate on this denominator. The printed grand overalls add to 100.00: 32.55% attack success and 67.45% defense success. That arithmetic is the two printed overalls. It is what the definitions imply when every non-capability-failure is one or the other.

Table 6 is defense success rate with the model held fixed. The paper’s example is the GPT-4o column: Agent-E 83.79%, Skyvern 2.0 42.89%, a gap of 40.90 points. Claude-Opus-4.5’s column overall is 77.10%, and Agent-E under that model is 75.19%, which is below GPT-4o and below Qwen3-VL-235B in the same harness.

| Harness | Claude-3.7 | Claude-Opus-4.5 | GPT-4o | GPT-5.1 | GPT-5.2 | Qwen3-235B | Qwen3-30B | Overall |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SeeAct | 53.36% | 68.95% | 57.45% | 59.32% | 69.96% | 56.58% | 41.16% | 57.69% |
| Browser Use (Text) | 67.61% | 73.17% | 60.90% | 73.16% | 68.08% | 60.84% | 60.35% | 66.16% |
| Browser Use (Vision) | 67.55% | 74.89% | 64.46% | 68.08% | 67.93% | 58.81% | 59.78% | 65.92% |
| Agent-E | 80.42% | 75.19% | 83.79% | 84.09% | 76.21% | 82.16% | 76.13% | 79.76% |
| Skyvern 1.0 | 82.18% | 91.55% | 61.94% | 84.53% | 84.86% | 74.88% | 69.19% | 78.20% |
| Skyvern 2.0 | 54.93% | 77.59% | 42.89% | 65.23% | 70.48% | 50.72% | 45.12% | 58.01% |
| Overall | 67.89% | 77.10% | 60.88% | 72.62% | 72.59% | 62.66% | 58.27% | 67.45% |

Skyvern 1.0 is not uniformly strong. Under GPT-4o it is 61.94%, below both Browser Use rows. Under Claude-Opus-4.5 it is 91.55%, the highest cell in the table. The harness effect and the model effect are both visible in the same grid, which is what the regression is for.

### The regression

Table 7 fits a mixed-effects logistic regression to the calibrated attack outcomes. Harness, model, their interaction, and attack category are fixed effects. Task is a random intercept. Degrees of freedom match a cross of six harnesses and seven models, with one level of each factor as the reference: 5, 6, and 5 times 6.

| Effect | Degrees of freedom | Chi-square | p-value |
| --- | --- | --- | --- |
| Agent harness | 5 | 331.17 | 1.97×10^−69 |
| Backend model | 6 | 437.63 | 2.25×10^−91 |
| Harness × model | 30 | 299.81 | 2.88×10^−46 |

The model term is the largest chi-square. The harness term is still far past conventional significance, and so is the interaction, which is the statistical form of “this model is safer in one harness than in another.” The paper says all three p-values are below 10^−45. The checks it reports against the capability filter do not remove that conclusion: modeling whether a task was evaluable at all keeps all three effects below 10^−31, and relabeling capability failures at the extremes keeps them below 10^−39. Those checks are bounds. The paper does not print the exact p-values for them.

The repeats are a separate stability check. Three full runs of all six harnesses, on Qwen3-VL-235B and on GPT-5.1, have an average standard deviation of 1.73 percentage points. That is the paper’s statement about run-to-run variation under temperature 0. It is not a confidence interval on the 32.55% aggregate.

### Attacks with no extra attack text

For the web-side sets, a naive variant adds no injected instruction and no extra deceptive sentence. The unsafe element can still be on the page. Figure 3 compares those naive runs with the runs that do include explicit attack content.

On malicious prompt injection, SeeAct’s naive attack success rate is 50.00%, against 49.37% for the other attacks. On deceptive website design, Browser Use (Text) is 41.27% naive and 36.30% on the other attacks. The paper says explicit attack wording can sometimes trip a model’s safety training, while a naive page gives the model fewer cues. The example in the text is a credit-card field on a course-selection task with no attack sentence. The agent treats the field as part of the task. The authors call that a harness-intrinsic failure: the loop does not check whether the action is necessary for the user’s goal before it executes.

## Where a successful defense shows up

Section 5 reads logs from defense-success runs and marks the stage where the defense becomes effective. Conditional defense success rate is not the overall defense rate. It is the share of the remaining security-relevant tasks whose defense is localized at that stage, after defenses localized earlier have been removed. A zero at a later stage can mean the defense already happened, or that this stage never blocked anything. The tables print the component that harness uses at the stage.

### Malicious user prompts

| Harness | Goal interpretation | Rate | Planning | Rate | Action execution | Rate |
| --- | --- | --- | --- | --- | --- | --- |
| SeeAct | Raw-prompt forwarding | 0.00% | Single-controller | 67.86% | LLM grounder | 26.94% |
| Browser Use (Text) | Raw-prompt forwarding | 0.00% | Single-controller | 64.60% | Rule-based grounder | 0.00% |
| Browser Use (Vision) | Raw-prompt forwarding | 0.00% | Single-controller | 70.31% | Rule-based grounder | 0.00% |
| Agent-E | LLM goal interpreter | 82.71% | Multi-role | 69.50% | Rule-based grounder | 0.00% |
| Skyvern 1.0 | LLM goal interpreter | 42.79% | Single-controller | 35.54% | Rule-based grounder | 0.00% |
| Skyvern 2.0 | LLM goal interpreter | 8.13% | Multi-role | 45.74% | LLM grounder | 23.51% |

Raw-prompt forwarding localizes nothing at goal interpretation, which is what that design does: the user text is passed on. An LLM interpreter is not enough by itself. Agent-E localizes 82.71% there. Skyvern 2.0, which also has an LLM interpreter, localizes 8.13%. On 100 sampled user-prompt tasks with GPT-4o, swapping Agent-E’s interpretation prompt for the less detailed Skyvern 2.0 prompt moves that stage from 75.61% to 53.85%, a drop of 21.76 points. Those ablation rates are not the full-set rates in the table.

Planning rates do not line up with single-controller versus multi-role. Browser Use (Vision) is 70.31% and Agent-E is 69.50%, on different planner structures. The paper ties the difference to risk-awareness cues in the reasoning prompt. Removing those cues, still on 100 GPT-4o tasks, drops Browser Use (Vision) from 73.91% to 43.48%, which is 30.43 points, and Agent-E from 92.86% to 69.77%, which is 23.09 points.

At execution, the two LLM grounders still localize some defense, 26.94% and 23.51%. Every rule-based grounder in this table is 0.00%. The paper says a rule maps a planned action to a browser command without a semantic check, while an LLM grounder can trip a guardrail again. It also says those grounding prompts do not implement an explicit safety check, so the protection is incidental.

### Web-side attacks

| Harness | Perception | Rate | Planning | Rate | Action execution | Rate |
| --- | --- | --- | --- | --- | --- | --- |
| SeeAct | Multimodal | 10.23% | Single-controller | 35.02% | LLM grounder | 1.63% |
| Browser Use (Text) | Textual | 18.93% | Single-controller | 44.32% | Rule-based grounder | 0.00% |
| Browser Use (Vision) | Multimodal | 9.96% | Single-controller | 47.22% | Rule-based grounder | 0.00% |
| Agent-E | Textual | 78.99% | Multi-role | 10.65% | Rule-based grounder | 0.00% |
| Skyvern 1.0 | Multimodal | 15.38% | Single-controller | 78.17% | Rule-based grounder | 0.00% |
| Skyvern 2.0 | Multimodal | 11.83% | Multi-role | 51.44% | LLM grounder | 4.07% |

Agent-E localizes 78.99% of web-side conditional defense at perception. The paper associates that with structured extraction that filters page content before the planner sees it. The four multimodal perception rates in the table are all below 20%, and Browser Use (Vision) is the lowest at 9.96%. Relaxing Agent-E’s filter so every element is exposed, on 100 sampled web-side tasks with GPT-4o, moves the perception stage from 56.94% to 50.70%, a drop of 6.24 points. That is a smaller move than the user-prompt ablations.

Planning is where Skyvern 1.0 localizes 78.17%. Agent-E’s multi-role planner localizes 10.65% on this surface. The paper’s trace reading is that one role can summarize an injected instruction into a plan that the next role treats as trusted. Removing the goal-anchoring instruction from Skyvern 1.0 drops the stage from 70.73% to 54.05%, which is 16.68 points. Giving Agent-E’s planner the original user instruction, in addition to the upstream plan, raises the stage from 19.35% to 43.59%, which is 24.24 points.

Execution is thin on this surface. SeeAct is 1.63% and Skyvern 2.0 is 4.07%. Rule-based grounders are 0.00%. The paper’s explanation is that a web-side attack has already been broken into clicks and field fills that look legitimate one at a time, so the grounder rarely sees a reason to stop.

The case study is one Skyvern 1.0 trace on a job-application form that asks for a credit card at the end. The intent stage writes a guardrail against sensitive information. Early attempts refuse the field. After the agent misses the completion signal and retries, it later fills the card number, with the same guardrail still in the prompt. The paper treats that trace as evidence that prompt-level guardrails can erode over a long execution. It does not report how often that pattern occurred.

## How this compares with harnesses as they stand on November 10

The paper’s open-source rows are configurations, not the November 10 default branch. [Browser Use](https://github.com/browser-use/browser-use) showed 120,474 stars on the GitHub API that day, with a push at 02:34:17 UTC, and the repository description names both the Python library and Browser Use Cloud. [Skyvern](https://github.com/Skyvern-AI/skyvern) showed 23,376 stars and a push at 05:01:12 UTC. The paper does not name the commit it ran. A star count is not a security score. It is evidence that the projects in the table are still the public projects, and that their trees have moved since a paper that does not pin a revision.

The commercial pins are older than the docs loaded the same day. [Google’s computer-use guide](https://aistudio.google.com/docs/computer-use) lists four models: gemini-4-argon, gemini-3.8-flash as the recommended model, gemini-3.5-flash-lite, and gemini-3-flash-preview. gemini-3.7-flash is not one of those four names. The page also describes opt-in screenshot scanning for prompt injection, and configurable safety policies. [Anthropic’s computer-use tool page](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool) shows an example with claude-opus-5-5 and the toolset `computer_toolset_20260801`. The paper’s Claude row is claude-haiku-4-5-20251001. A lower attack rate on those pins is not a measurement of the November 10 APIs. This site’s [computer-use guide](/blog/can-an-ai-agent-use-your-computer) is about whether a product can drive a screen. It is not a security table, and it should not be read as one.

The coding-harness counterpart, posted November 10, is [ActiveSecHarness](/research/activesec-coding-harness-security). On its own fixtures a local 4B judge blocked every attack row and refused 118 of 120 benign software-engineering fixtures. Ring 0, that paper’s reference monitor, blocked every attack row and refused none of those 120. That page is the coding note. The rates in this note stay with web agents.

Task-score harness work answers a different question. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches for an executable harness with a higher score on six benchmarks, with the model held fixed. WebTrap Farm does not search. It scores named harnesses on whether an unsafe action happened. A harness that wins a task benchmark can still be the one that finishes the unsafe click. Skyvern 2.0’s 85.25% task-completion rate next to a 58.01% defense success rate is the paper’s own illustration.

The [guide to evaluating a harness](/blog/how-do-you-evaluate-an-ai-agent-harness) separates a check of one visible action from an end-to-end task score. WebTrap Farm is end-to-end, and the end is an unsafe action. Someone buying or building a web agent can use both: a task score says the job can finish, and a calibrated attack rate says how often a capable run does the wrong job. Neither number is a substitute for a log of the specific action a deployment must block, such as a payment or a password.

## What the experiment controlled

Names and numbers in this section are printed in the November 9 paper unless a link says otherwise.

The attack set is three categories. Malicious user prompts are 160 tasks, built from five goals, eight base prompts each, and four content strategies. Malicious prompt injection is 158 tasks. Deceptive website design is 187 tasks. The three counts in Table 11 sum to 505. Methods and contents were included only when at least two earlier papers had tested them. Web-side tasks include a naive content type. One construction exception is printed: default selection is not paired with sensitive-information disclosure, because a preselected option is not a form the agent has to fill.

Scoring for clicks, downloads, permissions, and form values uses the page instrumentation. Open-ended text uses GPT-4o, checked on 672 of 6,720 outputs. The usability twin keeps the interaction and removes the adversarial trigger. For a malicious post, the twin asks for a benign post on the same kind of page. For a web-side download, the twin removes the malicious content and asks for the download directly. Defense success requires the twin to succeed.

Agents run at their documented defaults. The authors say they do not change core architecture, reasoning logic, or built-in safety mechanisms. Temperature is 0. One completed execution is required per task. The three-repeat check covers two of the seven models. Logs used in Section 5 are enabled on the open-source agents and, the paper says, do not change runtime behavior. Commercial agents are scored from the page, because their internal stages are not available. That is why the stage tables do not include the two commercial rows.

The survey behind Table 1 is 68 GitHub projects with at least 1,000 stars, plus 40 papers. The six evaluated harnesses are a subset chosen to cover the component types, not a random sample of the 68. SeeAct is raw-prompt, multimodal, single-controller, and LLM-grounded. Both Browser Use configurations are raw-prompt and rule-grounded, one textual and one multimodal. Agent-E is an LLM interpreter, textual perception, multi-role planning, and a rule grounder. Skyvern 1.0 is an LLM interpreter, multimodal, single-controller, and rule-grounded. Skyvern 2.0 is an LLM interpreter, multimodal, multi-role, and LLM-grounded.

## Limits that change how to read the rates

The paper’s limitations section names three bounds. The attack set is three categories, so a tool-poisoning result is not in these tables. The sites are controlled, so a live page with changing layout is not in these tables. Runs vary, and the authors’ answer is the 1.73 percentage-point average standard deviation on the repeated slice, plus temperature 0 and a large task set.

The denominator is the second bound, and it is in the metric definitions rather than the limitations paragraph. Attack success rate excludes capability failures. Quoting 32.55% as “the agent was attacked successfully on 32.55% of tasks” adds a claim the table does not make. The paper never prints the capability-failure count that would turn 32.55% back into a share of all tasks.

The commercial comparison is a third bound. Two pinned model names, not the model list on the vendor docs as of November 10, sit below the open-source overall and still fail deceptive design at 25.51% and 22.12%. Google’s current guide also offers an opt-in prompt-injection scan that this paper does not turn on or off, because that control is not part of the gemini-3.7-flash setup it ran.

Appendix E draws a line the results section is easy to slide past. The prompt swaps and the filter relaxation are controlled ablations on 100 tasks. The broader contrasts, text versus screenshot, one planner versus several roles, rules versus an LLM grounder, are differences between whole harnesses that also differ in other ways. Agent-E’s low attack rate is not, by itself, an estimate of what textual perception would do inside Skyvern.

The code release does not contain the result databases. The repository was last pushed October 8, 2026. Until those databases are public, the tables are the authors’ report of their own runs. The ethics appendix says the paper does not release exploit-ready procedures. This page follows that boundary: the categories are named, and the payload text is not.

## Read the paper

The November 9 paper, the code, and the two computer-use docs checked against the commercial pins:

- [Harness Matters on arXiv](https://arxiv.org/abs/2611.11971)
- [HTML](https://arxiv.org/html/2611.11971)
- [PDF](https://arxiv.org/pdf/2611.11971)
- [WebTrap Farm](https://github.com/Agrfeblve/WebTrapFarm)
- [Google computer use](https://aistudio.google.com/docs/computer-use)
- [Anthropic computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool)
- [Browser Use](https://github.com/browser-use/browser-use)
- [Skyvern](https://github.com/Skyvern-AI/skyvern)

Related pages on this site: [agent harnesses hub](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [Can an AI agent use your computer?](/blog/can-an-ai-agent-use-your-computer), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [guardrail](/glossary/guardrail), [tool use](/glossary/tool-use), [benchmark](/glossary/benchmark), [Best AI agent harness](/best/ai-agent-harnesses), and the [November harness benchmark](/reports/agent-harness-benchmark-november-2026).
