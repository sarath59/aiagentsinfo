---
title: "Multi-Agent Orchestration: Removing the Interaction Term Costs 7.2 to 17.3 Points on Code (2026)"
description: "What is multi-agent orchestration? An orchestrator chooses the next worker and what that worker may read. In Liu and Xiong, arXiv November 5, 2026, dropping the interaction term costs 7.2 points on their long-input HumanEval and 17.3 points on MBPP."
takeaways:
  - "Multi-agent orchestration is the rule for which worker runs next and which earlier results that worker is allowed to see. The orchestrator is the part that makes that choice. The workers stay fixed."
  - "Liu and Xiong posted IAPO to arXiv on November 5, 2026. On their long-input code tasks, with Qwen2.5-7B-Instruct as every worker, removing the interaction term costs 17.3 points on MBPP and 7.2 points on HumanEval."
  - "At a matched token budget, the same trained plans lead the strongest of fifteen published systems by 2.3 points on their GSM8K, 3.6 on DROP, and 9.7 on MBPP, and sit within a point on MATH and HumanEval. Those percentages are the paper’s own long documents, not the public leaderboards."
date: "2026-11-09"
updated: "2026-11-09"
category: explainer
topics:
  - research
  - harnesses
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - arxiv
  - huggingface
byline: "AI Agents Info Editorial"
sources:
  - title: "Liu and Xiong, Learning Multi-Agent Orchestration: Higher-Order Interactions in Policy Improvement (arXiv:2611.07495, submitted November 5, 2026; read November 9, 2026)"
    url: "https://arxiv.org/abs/2611.07495"
  - title: "HTML version of the paper (read November 9, 2026)"
    url: "https://arxiv.org/html/2611.07495"
  - title: "PDF of the paper (read November 9, 2026)"
    url: "https://arxiv.org/pdf/2611.07495"
  - title: "Qwen2.5-7B-Instruct model card (opened November 9, 2026)"
    url: "https://huggingface.co/Qwen/Qwen2.5-7B-Instruct"
  - title: "OpenAI, Orchestration and handoffs (read November 9, 2026)"
    url: "https://developers.openai.com/api/docs/guides/agents/orchestration"
  - title: "Microsoft Learn, AI Agent Orchestration Patterns (read November 8, 2026, on the control-loop guide)"
    url: "https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns"
dataset:
  title: "IAPO long-input orchestration scores, November 2026"
  description: "Accuracy and tokens transcribed from Liu and Xiong, arXiv:2611.07495. Single-episode scores are Table 7. Matched-budget scores are Table 8. The benchmarks are the authors’ long-input constructions, run with Qwen2.5-7B-Instruct."
  isBasedOn: "https://arxiv.org/abs/2611.07495"
faq:
  - question: "What is multi-agent orchestration?"
    answer: "Multi-agent orchestration is the rule for which worker runs next and which earlier results that worker may read. In Liu and Xiong, arXiv:2611.07495, posted November 5, 2026, the orchestrator makes that choice and the worker policies stay fixed. A handoff, in OpenAI’s Agents SDK page read November 9, 2026, is the related product pattern in which a specialist takes ownership of the reply."
  - question: "What is multi-agent orchestration in AI?"
    answer: "In an AI system it is the same choice, made around language-model workers. The November 5 paper trains that choice. Product docs describe it without training it: OpenAI distinguishes a handoff from an agent used as a tool, and Microsoft Learn documents sequential, concurrent, handoff, group chat, and Magentic patterns."
  - question: "What did IAPO find on code?"
    answer: "On the paper’s long-input code tasks, with Qwen2.5-7B-Instruct as every worker, the interaction term is worth 17.3 points on MBPP (81.1% versus 63.8% for the same method without it) and 7.2 points on HumanEval (83.7% versus 76.5%). Those are one episode each, from Table 7. They are not public HumanEval or MBPP leaderboard scores."
  - question: "Does IAPO beat other multi-agent systems?"
    answer: "At a token budget matched to the strongest baseline, Table 8 gives IAPO 81.8% on the paper’s GSM8K (+2.3 versus LLM-Debate), 48.6% on MATH (+0.3 versus DyLAN), 74.2% on DROP (+3.6 versus LLM-Debate), 80.9% on MBPP (+9.7 versus DyLAN), and 84.3% on HumanEval (+0.5 versus MaAS). One episode already reaches 81.1% on MBPP at 5.1 thousand tokens, against DyLAN’s 71.2% at 121.9 thousand."
  - question: "What model did the experiment use?"
    answer: "Every worker call in the paper is Qwen2.5-7B-Instruct, in bfloat16 on vLLM, temperature 1, with a 24,576-token context window and at most 4,096 completion tokens. The Hugging Face card for that checkpoint was still public on November 9, 2026. The paper does not claim this is a current frontier model."
  - question: "What is an AI agent orchestrator?"
    answer: "An orchestrator is the part that chooses the next worker and the earlier outputs that worker may see. In the paper, that part is agent 0. The workers are the language model, the retriever, the calculator, and the other roles. The glossary entry is Orchestrator."
  - question: "How is this different from a multi-agent orchestration framework?"
    answer: "A framework is the library a team installs. IAPO is a training method for the policy inside one experimental harness, compared with fifteen published systems on the authors’ documents. A sourced list of installable libraries, with release tags from November 9, 2026, is the agent-framework comparison on this site. Those two lists answer different questions."
  - question: "Where is the paper, and is there code?"
    answer: "The record is arXiv 2611.07495, version 1, submitted November 5, 2026. The abstract page, the HTML, and the PDF are linked on this page. On November 9, 2026, the abstract page did not list a code repository."
---

Updated November 9, 2026.

## What is multi-agent orchestration?

Multi-agent orchestration is the rule for which worker runs next, and which earlier results that worker is allowed to see.

An [orchestrator](/glossary/orchestrator) makes that choice. The workers do the reading, the calculating, and the writing. In Liu and Xiong, [arXiv:2611.07495](https://arxiv.org/abs/2611.07495), posted November 5, 2026, the workers’ own policies stay fixed and the training changes only the orchestrator. The paper’s name for the method is IAPO, interaction-aware policy optimization.

That is the research meaning. Product pages use the same words for a design choice a person writes down. [OpenAI’s orchestration page](https://developers.openai.com/api/docs/guides/agents/orchestration), read November 9, 2026, says the first choice is who owns the reply. A [handoff](/glossary/agent-handoff) moves control to a specialist. An agent used as a tool leaves the manager in charge. The short glossary entry for the whole idea is [orchestration](/glossary/orchestration). The workshop that holds the rule is an [agent harness](/blog/what-is-an-ai-agent-harness), and the shelf for those pages is [Agent harnesses](/topics/harnesses).

On November 9, 2026, Google’s public autocomplete for “multi-agent orchestration” offered frameworks, a platform, patterns, GitHub, and “what is multi-agent orchestration.” This page answers the question with one paper. The framework list people also search for is a different page, linked below.

## What did the November 5, 2026 paper find?

Removing the interaction term costs 7.2 points on the paper’s long-input HumanEval and 17.3 points on MBPP. At a matched token budget, the trained plans match or beat the strongest of fifteen published systems, and one episode uses fewer tokens.

The authors are Kaixuan Liu, Department of Computer Science, Emory University, and Guojun Xiong, the corresponding author, John Hopcroft Center for Computer Science, Shanghai Jiao Tong University. arXiv lists version 1 in cs.LG, submitted November 5, 2026 at 05:58:30 UTC. The abstract’s sentence is that removing the interaction term costs 7 to 17 points of accuracy on code. Table 7 prints the two code cells behind that range: MBPP 81.1% with the term and 63.8% without it, HumanEval 83.7% and 76.5%. Table 8’s paired test calls those gaps +17.3 and +7.2, both with z above 2.

The same abstract says the deployed plans reach the strongest system’s accuracy with fewer tokens. One IAPO episode costs 5.1 thousand to 11.5 thousand tokens. The strongest baselines in Figure 2 cost 26.5 thousand to 121.9 thousand, which the paper calls 2.7 to 24 times more. On MBPP a single episode is already 81.1% at 5.1 thousand tokens, against DyLAN at 71.2% and 121.9 thousand tokens.

Those percentages belong to the authors’ long documents. A problem’s own statement sits among 30 to 90 other problems, so the file is longer than the original benchmark item. The paper says the absolute accuracies are not comparable with published numbers on the original benchmarks.

## Why does scoring each decision by itself miss the gain?

Because the value of calling a worker depends on the calls that came before it. The paper proves that those interactions can account for half of the attainable gain.

Ordinary training gives each decision its own advantage and treats the other decisions as fixed. In orchestration, a later call is useful only if an earlier call left something worth reading. The paper’s example is which worker to call and which earlier outputs it may see. The gain of changing both is not the sum of changing each one.

IAPO writes the gap between two policies as a finite sum of those interaction terms, estimates the first- and second-order terms from sampled runs, and accepts an update only when a high-confidence lower bound on the gain is positive. The proof says every accepted update improves the training objective with high probability. The certificate covers net return on the validation problems. Test accuracy is a separate measurement.

A small exact check makes the miss visible. On a task the paper calls Complementarity, the first-order score is zero while the best step gains 0.148. On Redundancy, the first-order score takes a step that gains 0.006 against a better step at 0.010. Across 6,000 validation runs of these controlled tasks, no candidate with a negative gain was accepted. The half-gain sentence is the theorem’s bound on what a first-order rule can miss. It is not a claim that every benchmark lost 50 points.

## How does IAPO compare with fifteen other multi-agent systems?

At the strongest baseline’s token budget, IAPO is ahead on the paper’s GSM8K, DROP, and MBPP, and within a point of the leader on MATH and HumanEval.

The fifteen systems share the executor and the splits. Three are single-agent prompting methods: chain-of-thought, complexity-based prompting, and self-consistency. Six are hand-built multi-agent systems: MultiPersona, LLM-Debate, LLM-Blender, DyLAN, AgentVerse, and MacNet. Six search or train a workflow: AutoAgents, GPTSwarm, ADAS, AFlow, MAS-Zero, and MaAS. The paper runs each as released, so none of them has the team’s BM25 retriever. They read the whole document. The orchestrated team reaches the document through an evidence finder or through a generalist that reads all of it.

The table uses the paper’s own units. Accuracy is percent. Tokens are thousands per problem. “One episode” is Table 7, configuration A, the setting trained with the smaller token price. “Matched budget” is Table 8: a vote, or on code a program selector, over as many episodes as fit inside the strongest baseline’s tokens. Appendix I sets those caps at 28.6 thousand for GSM8K, 53.8 thousand for MATH, 57.1 thousand for DROP, and 26.5 thousand for HumanEval. On MBPP the vote is capped at 35.4 thousand, below DyLAN’s 121.9 thousand, and the +9.7 is still against DyLAN’s score at that higher spend. The first-order column is the same method with the interaction term removed.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Long-input task</th>
<th>IAPO, one episode</th>
<th>First order only, one episode</th>
<th>Strongest baseline</th>
<th>IAPO, matched budget</th>
</tr>
</thead>
<tbody>
<tr>
<td>GSM8K, 790 test problems</td>
<td>78.1% at 5.6k tokens</td>
<td>77.4% at 9.7k</td>
<td>LLM-Debate, 79.5% at 28.6k</td>
<td>81.8% at 25.1k, +2.3</td>
</tr>
<tr>
<td>MATH, 220 test problems</td>
<td>37.7% at 5.6k</td>
<td>37.6% at 15.2k</td>
<td>DyLAN, 48.3% at 54.3k</td>
<td>48.6% at 50.8k, +0.3</td>
</tr>
<tr>
<td>DROP, 800 test problems</td>
<td>69.2% at 11.5k</td>
<td>67.9% at 20.1k</td>
<td>LLM-Debate, 70.6% at 57.1k</td>
<td>74.2% at 46.0k, +3.6</td>
</tr>
<tr>
<td>MBPP, 333 test problems</td>
<td>81.1% at 5.1k</td>
<td>63.8% at 15.7k</td>
<td>DyLAN, 71.2% at 121.9k</td>
<td>80.9% at 33.1k, +9.7</td>
</tr>
<tr>
<td>HumanEval, 131 test problems</td>
<td>83.7% at 9.9k</td>
<td>76.5% at 18.1k</td>
<td>MaAS, 83.8% at 26.5k</td>
<td>84.3% at 20.4k, +0.5</td>
</tr>
</tbody>
</table>
</div>

The paper marks the GSM8K, DROP, and MBPP matched-budget gaps as z above 2. The MATH gap of 0.3 and the HumanEval gap of 0.5 are not. A second training price, which the paper calls IAPO-Lite, pushes GSM8K to 85.1%, MATH to 54.3%, and MBPP to 78.3% at the matched budget, and gives up 4.5 points on DROP and 8.1 points on HumanEval. Fewer tokens and a higher score are not the same result on every column.

Search and training tokens are excluded from the per-problem costs. One MBPP run uses about 170 million tokens in total, the paper’s Appendix I.

## What does removing the interaction term cost on code?

On one episode it costs 17.3 points on MBPP and 7.2 points on HumanEval, and the first-order plans also spend more tokens.

Table 7 is the clean comparison. The retriever, the roles, the validation, and the certification stay. Only the interaction term comes out. IAPO then uses 32% to 58% of the first-order variant’s tokens on every benchmark. On the question-answering and math rows the accuracy gap is smaller: +0.6 on GSM8K, 0.0 on MATH, and +1.4 on DROP.

The deployed plans show why code moves. Test-and-repair helps only after a program exists, which is a pair of decisions. IAPO deploys that pair in all four code runs. The first-order variant never proposes it, fills the slots with a second programmer, and the paper says it loses 17 points on MBPP and 7 on HumanEval at 3.1 and 1.8 times the tokens. On the other tasks, every IAPO run follows the evidence finder with the analyst. The first-order variant never calls the analyst. The analyst alone loses points, so a score that looks at one decision never selects it. The pair gains.

## What model and harness did the experiment use?

Every worker is Qwen2.5-7B-Instruct. The harness is a pipeline of at most five decisions, four on code, over a fixed menu of roles.

Appendix H says each call is a chat completion in bfloat16 on vLLM, one engine per H200, with a 24,576-token context window, at most 4,096 completion tokens, and temperature 1. IAPO trajectories are capped at 32,768 tokens. Baselines are capped at 131,072, and some code and math runs at 393,216. The [Qwen2.5-7B-Instruct card](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) was still public on November 9, 2026. It is the checkpoint the paper froze. It is a poor label for the model inside a current coding product.

The roles for questions and math are a planner, an evidence finder that runs BM25 and makes no model call, an analyst, a generalist that reads the whole document, a calculator, a checker, and a selector. Code adds MaAS’s test-and-repair operator, up to three repairs. The orchestrator sees an embedding of the task and a few flags, including how much of the token budget is spent. It does not see the score. The last decision can only stop. That menu leaves 2,016 open-loop plans at five decisions and 432 at four.

The reward is accuracy minus a token price. The main setting uses a price fixed in a pilot so that one extra revision of about 1,500 tokens breaks even. IAPO-Lite uses a much higher token price. Training starts from a uniform policy, fits on 6,400 proposal episodes from 200 problems, and certifies candidates on 8,000 validation episodes. Test problems are never used for fitting or selection.

## What are the limits of this multi-agent orchestration result?

The result is a comparison inside one paper’s harness, on long documents the authors built, with one 7B worker model.

The public GSM8K, MATH, DROP, MBPP, and HumanEval numbers people quote elsewhere do not apply here. The documents are longer, the scorer follows the paper’s rules, and every system sees the opening words of the target unit inside the question.

The baselines and the team do not see the file the same way. Baselines read the whole document and have no BM25 retriever. The team retrieves the top few units or spends a generalist call on the whole file. The 7.2 and 17.3 point gaps keep the retriever on both sides, so that particular tool is not the difference. The gap against DyLAN or MaAS still mixes the learned policy with that retrieval choice and with a much smaller token cap.

Several baseline rows carry the paper’s own warnings. AgentVerse crashed on 12 of 131 HumanEval problems and 17 of 333 MBPP problems. MAS-Zero’s design step failed on 76% to 94% of iterations. On DROP, the baselines’ training file shares 120 of 161 passages with the test split. A trajectory that exhausts its budget scores zero. That happened only on MBPP among IAPO’s test runs, at most 3 of 1,332 episodes in a run.

The certificate accepts an update when the lower bound on validation return is positive. It does not certify the test-set accuracy in the table. The hand-built systems were also adapted where the shared 7B setup forced a change, then frozen. A reader who wants a product ranking of Claude, Codex, or an installed framework will not find it in these cells.

## How does learned orchestration sit inside an agent harness?

The harness is the program around the model. Orchestration is the part of that program that picks the next step or the next agent. IAPO trains that part and leaves the model weights alone.

On this site a [harness](/glossary/harness) is the loop, the tools, the memory, the permissions, and the stop rules. [Harness engineering](/glossary/harness-engineering) is the work of designing them. The control loop those pieces run is [How do AI agents work?](/blog/how-do-ai-agents-work). A [multi-agent](/glossary/multi-agent) system is the case with more than one role. IAPO is a training method for the choice among roles, measured on one frozen model.

Two nearby papers ask different questions. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches for a new executable harness. [Parallel agent teams](/research/parallel-agent-teams-test-time-compute) keep the harness and change how a budget of agents is split into teams. IAPO keeps the role menu and changes how the orchestrator is trained. The 2022 ancestor of writing a step and then acting is [ReAct](/research/react-reasoning-and-acting).

Microsoft’s architecture guide, cited from the control-loop page, still says to use the lowest level that meets the job: one model call, one agent with tools, or multi-agent orchestration. This paper is evidence about the third level, on the tasks and the 7B model it names. It is not a reason to add roles to a job one worker already finishes.

## Where can you read more on this site?

- Terms: [orchestration](/glossary/orchestration), [orchestrator](/glossary/orchestrator), [agent handoff](/glossary/agent-handoff), [multi-agent](/glossary/multi-agent), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [agent](/glossary/agent), [agent loop](/glossary/agent-loop)
- The harness hub: [Agent harnesses](/topics/harnesses)
- Guides: [How do AI agents work?](/blog/how-do-ai-agents-work), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness)
- Research: [Parallel agent teams](/research/parallel-agent-teams-test-time-compute), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [ReAct](/research/react-reasoning-and-acting)
- Libraries people search for under this heading: [Best AI agent frameworks](/best/ai-agent-frameworks), with release tags read November 9, 2026. That page is a licence and release table. It is not a score for IAPO.

## FAQ

### What is multi-agent orchestration?

It is the rule for which worker runs next and which earlier results that worker may read. Liu and Xiong, in a paper posted November 5, 2026, train that rule and keep the workers fixed. The glossary entry is [orchestration](/glossary/orchestration).

### What is multi-agent orchestration in AI?

It is that rule inside a system whose workers are language models, tools, or both. OpenAI’s page, read November 9, 2026, splits the product version into a [handoff](/glossary/agent-handoff) and an agent used as a tool. The paper’s version learns the sequence of calls.

### What did IAPO find on code?

Removing the interaction term costs 17.3 points on the paper’s long-input MBPP and 7.2 points on HumanEval, for one episode of Qwen2.5-7B-Instruct. The scores are 81.1% versus 63.8%, and 83.7% versus 76.5%.

### Does IAPO beat other multi-agent systems?

At a matched token budget it leads the strongest of the fifteen systems by 2.3, 3.6, and 9.7 points on the paper’s GSM8K, DROP, and MBPP, and it is within a point on MATH and HumanEval. One MBPP episode is 81.1% at 5.1 thousand tokens, against DyLAN at 71.2% and 121.9 thousand tokens.

### What model did the experiment use?

Qwen2.5-7B-Instruct for every worker call, temperature 1, on vLLM. The model card was still public on November 9, 2026. The paper’s scores are for that checkpoint inside this harness.

### What is an AI agent orchestrator?

The part that chooses the next worker and the earlier outputs that worker may see. The paper calls it agent 0. The glossary entry is [orchestrator](/glossary/orchestrator).

### How is this different from a multi-agent orchestration framework?

A framework is software a team installs. IAPO is a training method reported in one paper. Installable libraries, with their November 9, 2026 release tags, are [Best AI agent frameworks](/best/ai-agent-frameworks).

### Where is the paper, and is there code?

[arXiv 2611.07495](https://arxiv.org/abs/2611.07495), version 1, submitted November 5, 2026. On November 9, 2026, the abstract page did not list a code repository.
