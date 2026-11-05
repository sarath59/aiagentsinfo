---
title: "Paper breakdown: Weight-space programming — a language model that reads and edits neural weights"
description: "MIT CSAIL note, November 2, 2026: GPT-6 Astra edited neural weights, with no training loop, and raised a small model's MATH-500 score from 7.9% to 48.1%."
date: "2026-11-03"
updated: "2026-11-04"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - research
companies:
  - github
  - arxiv
  - anthropic
  - langchain
  - crewai
paperTitle: "Sparks of Weight-Space Programming: LLMs can natively read & write neural network weights"
paperAuthors: "Rikiya Takehi, Jayden Teoh, Alex Zhang, Omar Khattab"
paperYear: 2026
paperUrl: "https://rikiyat.github.io/blog/weight-space-programming/"
codeUrl: "https://github.com/RikiyaT/lm_understand-logs"
venue: "MIT CSAIL research note, published November 2, 2026"
abstract: |
  A neural network is a long list of numbers. Those numbers shape how a model answers, moves, or plays. The usual way to set them is training: show examples, measure the mistakes, and nudge the numbers. On November 2, 2026, Rikiya Takehi, Jayden Teoh, Alex Zhang, and Omar Khattab, all listed at MIT CSAIL, published a research note that asks a different question. Can a frontier language model, GPT-6 Astra, look at those numbers and rewrite some of them, with no gradient descent and no training loop?

  In the tests they report, Astra sometimes could. It named what small networks had been trained to do, patched a control policy that was stuck, and wrote small game-playing networks that beat PPO policies the authors trained for comparison. On Qwen3.5-0.8B, an edit to 0.016% of the weights raised their MATH-500 score from 7.9% to 48.1%. They also report that this mostly helped the model finish answers, because the unedited model was looping, and that the same style of edit did not add math skill to Gemma 3 270M.

  A large language model edited another model's numbers by reasoning about them. The edit helped a tiny model stop repeating itself and finish more math problems. On the evidence in the note, it did not install a new skill the smaller model lacked.
whyItMatters: |
  Most agent products keep the weights frozen and put the engineering in the harness: the loop, the tools, the memory, and the checks. This note is an early report of a general-purpose language model editing weights directly. If later work holds the result up, "train a model" and "edit a model by asking" sit closer together than they did.

  The practical lesson in the note is narrower than that hope. The math jump on Qwen3.5-0.8B came from removing a looping direction in two layers. The same procedure did not add math ability to Gemma 3 270M, which rarely loops. The authors also say the current results are limited by context length and harnesses, and that they are building a benchmark and a harness for this skill. A harness benchmark is not in the note yet.

  For how a frozen model already acts through tools, see the site's notes on harnesses, the ReAct prompting pattern, and the directory of agent frameworks. Those systems leave the weights alone. This note does not replace them.
keyFindings:
  - "From the weights alone, with no tools, Astra named the correct game for all four PPO policies in the first experiment. Each network had the same shape, 17,253 weights. The post's summary card marks the Breakout example at 99% confidence."
  - "On three character-level language models, with the input and output layers removed, Astra named the training text in both attempts for each model and named every copying head the authors measured, and no other head."
  - "On a Kinetix car-on-ramp policy that the authors say never succeeds in 256 episodes, one tool-free edit changed 3.5% of 171,664 weights and succeeded in all 1,024 evaluation episodes."
  - "One-shot MinAtar networks, scored over 1,000 episodes, beat the authors' PPO runs at 100 million steps in all three games. Against PPO at 500 million steps the scores were Breakout 517.4 versus 25.3, Seaquest 53.1 versus 88.9, and Asterix 53.2 versus 55.2."
  - "With 50 forward passes and no training, the Qwen3.5-0.8B edit changed 131,072 weights (0.016%). MATH-500 moved from 7.9% to 48.1%, GSM8K from 13.8% to 67.1%, and IFEval from 21.0% to 62.3%. Answers that hit the 32,768-token limit fell from 93.0% to 33.1%."
  - "The same kind of edit on Gemma 3 270M left MATH-500 at 6.8% unedited and between 7.0% and 7.7% after edits. From weights alone, Astra did not identify which of two Gemma copies was sycophantic in four attempts. With attention maps, it did, on all three pairs."
methodology: |
  The source is a research note, "Sparks of Weight-Space Programming," published November 2, 2026. The page lists Rikiya Takehi, Jayden Teoh, Alex Zhang, and Omar Khattab, each with the affiliation MIT CSAIL. The model that reads and writes weights in the experiments is GPT-6 Astra. The authors define weight-space programming as a general-purpose language model reading and writing a network's weights directly, not through an optimizer and in particular not with gradient descent, around a natural-language spec. Some experiments give Astra no environment feedback at all.

  There are eight experiments. The first three ask Astra to read weights: which of four grid games a PPO policy was trained on, which shape a small diffusion model draws, and which of three character-level languages a transformer was trained on when only the middle blocks are shown. Experiment 4 asks it to repair a failing car policy. Experiments 5 and 6 ask it to write game and 9×9 Go networks. Experiment 7 asks which of two Gemma 3 270M copies was trained to be sycophantic. Experiment 8 asks it to raise Qwen3.5-0.8B's math score by editing weights inside a Python session, with a budget of forward passes and a ban on training. Logs, code, and the networks are in a GitHub repository. An edited Qwen checkpoint and a live demo are on Hugging Face.
limitations:
  - "The authors call the results early and limited by context length and harnesses. The benchmark and harness they say they are building are not part of this release."
  - "On Qwen3.5-0.8B they write that fixing loops is not the same as making a model better at math: the edit lets the model finish answers it could already work out. Gemma 3 270M, which rarely loops, did not gain a real MATH-500 increase."
  - "Game scores are against PPO policies trained for this note, at the step counts the authors state. They are not a public leaderboard for Go, Atari, or computer use."
  - "Most of the networks are small: 17,253 weights in the game-reading test, 171,664 in the car test, about 1.48 million in the Go test. The language-model edits are Qwen3.5-0.8B and Gemma 3 270M."
  - "Astra could not tell the sycophantic Gemma copy from the honest one using weights alone. On the diffusion models it drew outlines, while the models generate filled shapes."
  - "One frontier model did the reading and writing. The release is the authors' blog post, dated November 2, 2026. Their own citation marks it as a blog post. This page did not find an arXiv identifier on that post."
  - "A checkpoint rebuild reported on the edited model's Hugging Face card scored 51.0% on a full MATH-500 re-run. Its base-model check is a 25-problem smoke test, not the full 500, so it does not re-establish every number in the note."
references:
  - title: "Takehi, Teoh, Zhang, and Khattab, Sparks of Weight-Space Programming (November 2, 2026)"
    url: "https://rikiyat.github.io/blog/weight-space-programming/"
  - title: "Experiment logs, diffs, and rebuild code on GitHub"
    url: "https://github.com/RikiyaT/lm_understand-logs"
  - title: "Edited Qwen3.5-0.8B checkpoint, with the November 2, 2026 re-run notes"
    url: "https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming"
  - title: "Live demo of the base model and the edited checkpoint"
    url: "https://huggingface.co/spaces/akhaliq/weight-space-programming-demo"
  - title: "Qwen3.5-0.8B model card, including the thinking-loop note and published scores"
    url: "https://huggingface.co/Qwen/Qwen3.5-0.8B"
  - title: "Lee et al., Meta-Harness: End-to-End Optimization of Model Harnesses (arXiv:2603.28052)"
    url: "https://arxiv.org/abs/2603.28052"
    note: "Cited by the weight-space post as earlier harness optimization. Submitted March 30, 2026."
  - title: "Elhage et al., A Mathematical Framework for Transformer Circuits"
    url: "https://transformer-circuits.pub/2021/framework/index.html"
    note: "The post says Astra's copying-head analysis matched a method in this essay."
  - title: "Schlag, Irie, and Schmidhuber, Linear Transformers Are Secretly Fast Weight Programmers (arXiv:2102.11174)"
    url: "https://arxiv.org/abs/2102.11174"
    note: "Linked by the post as prior work that trains networks to write weights."
  - title: "Lindner et al., Tracr: Compiled Transformers as a Laboratory for Interpretability (arXiv:2301.05062)"
    url: "https://arxiv.org/abs/2301.05062"
    note: "Linked by the post as compiling formal programs into weights."
citation:
  apa: "Takehi, R., Teoh, J., Zhang, A., & Khattab, O. (2026, November 2). Sparks of weight-space programming: LLMs can natively read & write neural network weights. https://rikiyat.github.io/blog/weight-space-programming/"
  bibtex: |
    @misc{takehi2026weightspace,
      title        = {{Sparks of Weight-Space Programming: LLMs can natively read \& write neural network weights}},
      author       = {Takehi, Rikiya and Teoh, Jayden and Zhang, Alex and Khattab, Omar},
      year         = {2026},
      month        = nov,
      howpublished = {\url{https://rikiyat.github.io/blog/weight-space-programming/}},
      note         = {Blog post}
    }
faq:
  - question: "What is weight-space programming?"
    answer: "In the November 2, 2026 MIT CSAIL note by Takehi, Teoh, Zhang, and Khattab, weight-space programming means a general-purpose language model reads a neural network's weights and writes new weights directly. The edit is not done by gradient descent or by a training loop. The model they use for that reading and writing is GPT-6 Astra."
  - question: "When was this released, and who wrote it?"
    answer: "The research note is dated November 2, 2026 on the authors' page. The authors are Rikiya Takehi, Jayden Teoh, Alex Zhang, and Omar Khattab. The page lists MIT CSAIL as the affiliation for each of them. This breakdown was published November 3, 2026."
  - question: "What math result does the note actually report?"
    answer: "With 50 forward passes and no training, Astra edited 131,072 weights of Qwen3.5-0.8B, which the note calls 0.016% of the model. Under the note's settings, MATH-500 rose from 7.9% to 48.1%, GSM8K from 13.8% to 67.1%, and IFEval from 21.0% to 62.3%. The share of MATH-500 answers that hit a 32,768-token limit fell from 93.0% to 33.1%."
  - question: "Did the small model learn more math, or did it stop getting stuck?"
    answer: "The authors say fixing loops is not the same as making a model better at math. It lets the model finish answers it could already work out. They traced Qwen3.5-0.8B's loops to one direction in the MLPs of layers 15 and 19 and subtracted that direction. On Gemma 3 270M, which hit its token limit on 8.5% of answers rather than 93%, edits left MATH-500 between 7.0% and 7.7%, against 6.8% for the base model."
  - question: "Did the game-playing networks beat today's best systems?"
    answer: "The note compares Astra's networks with PPO policies the authors trained. On MinAtar, one-shot scores over 1,000 episodes are Breakout 517.4, Seaquest 53.1, and Asterix 53.2. PPO at 100 million steps scores 15.8, 5.6, and 25.8 on those games. PPO at 500 million steps scores 25.3, 88.9, and 55.2. On 9×9 Go, the note says zero forward passes win more than half the games against two smaller PPO networks, and 50 forward passes beat an equal-sized PPO network trained on 20 million games. It does not publish that 50-pass win rate. The comparison set is the authors' PPO runs."
  - question: "Where are the paper, the code, and the edited model?"
    answer: "The note is on the authors' site, linked in the references on this page. The logs and rebuild code are in the GitHub repository RikiyaT/lm_understand-logs. The edited Qwen3.5-0.8B checkpoint is RikiyaT/Qwen3.5-0.8B-weight-space-programming on Hugging Face, and that card links a live demo."
  - question: "How is this different from training a model, or from building an agent harness?"
    answer: "Training nudges weights with a loss and many examples. A harness is the software around a frozen model: tools, memory, checks, and the loop. Weight-space programming, as defined in the note, asks a language model to read and rewrite weights itself. The authors still used a harness for the larger experiments, including a Python session and a budget of forward passes, and they say harness limits are still part of the bottleneck."
---

## How it compares with methods in use today

The note does not claim a new public [benchmark](/glossary/benchmark) record. It compares Astra with baselines the authors built, and it says what older ways of writing weights looked like. This section checks those claims against the note and against sources that were live on November 3, 2026.

**Against training.** The authors' game policies were trained with PPO. Astra's one-shot MinAtar networks, which never play before they are scored, beat those PPO runs at 100 million steps in all three games. The table in the note is:

| Game | PPO, 100 million steps | PPO, 500 million steps | Astra, one shot |
| --- | --- | --- | --- |
| Breakout | 15.8 | 25.3 | 517.4 |
| Seaquest | 5.6 | 88.9 | 53.1 |
| Asterix | 25.8 | 55.2 | 53.2 |

Scoring is 1,000 episodes, with sticky actions of 0.1. PPO is the best of 3 to 10 seeds. On 9×9 Go, the note says a network written with zero forward passes wins more than half its games against two smaller PPO networks, and that 50 forward passes beat an equal-sized PPO network trained on 20 million games. It does not publish a win rate for that 50-pass match, so none is stated here. These are comparisons with the authors' PPO runs, not with a current public game engine.

**Against the Qwen3.5-0.8B model card.** The [Qwen3.5-0.8B card](https://huggingface.co/Qwen/Qwen3.5-0.8B) warns that, in thinking mode with the recommended sampling parameters, this model is more prone to thinking loops than other Qwen3.5 models, and that those loops may stop it from finishing. The card's recommended thinking setting for text tasks is temperature 1.0, top-p 0.95, top-k 20, and presence penalty 1.5. A footnote on the same card says non-video benchmarks used that setup with temperature 0.6 in thinking mode. The note's Qwen evaluation uses temperature 0.6, top-p 0.95, top-k 20, and presence penalty 1.5, up to 32,768 tokens. That matches the card's benchmark footnote, not the temperature-1.0 recommendation.

The card's published thinking-mode IFEval for the Qwen3.5-0.8B column is 44.0. Non-thinking IFEval in the same table is 52.1. The note's own base IFEval is 21.0, rising to 62.3 after the edit, with two samples per problem. Those are different measurements. The card does not list MATH-500, so the 7.9% to 48.1% result has no twin number on the model card. Read the note's MATH-500 figure as the authors' protocol, including the looping they measured: 93.0% of base MATH-500 answers hit the token limit, and 85 of the first 96 practice answers did too.

**Against the authors' own negative control.** Gemma 3 270M hit its token limit on 8.5% of answers, against 93% for the Qwen setup. MATH-500, averaged over four samples, was 6.8% unedited and 7.0%, 7.6%, 7.7%, and 7.0% after budgets of 5, 10, 25, and 50 forward passes. The authors say no edit moved the score by more than about a point, and that the gain was not established. Editing removed an obstacle that was hiding answers. It did not add an ability the model lacked.

**Against a second run of the edited checkpoint.** The [edited-model card](https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming) says the checkpoint was rebuilt on November 2, 2026 from the published diff, with every rebuilt tensor checked by SHA-256 against the checkpoint evaluated in the note. Only the down-projection weights in layers 15 and 19 differ from Qwen/Qwen3.5-0.8B at commit `2fc06364715b967f1860aea9cf38778875588b17`. A full MATH-500 re-run, 500 problems times 4 samples, scored 51.0%, with 31.6% of answers hitting the token limit. A 25-problem smoke test of the base model scored 5.0%, with 95% hitting the limit. That re-run supports the direction of the MATH-500 result. It is not a full replay of the base model, and it does not re-report GSM8K or IFEval.

**Against harness work and older ways of writing weights.** The post cites [Meta-Harness](https://arxiv.org/abs/2603.28052), whose arXiv page is titled "Meta-Harness: End-to-End Optimization of Model Harnesses" and is dated March 30, 2026, in a sentence about using language models to optimize whole harnesses. A [harness](/glossary/harness) still matters in this note: the Go and Qwen experiments give Astra a Python session, a ban on training, and a budget of forward passes. The [ReAct breakdown](/research/react-reasoning-and-acting) is the other layer, a prompting loop over a model whose weights stay as trained. [Agent frameworks](/directory/category/agent-frameworks) in the directory, including LangChain and CrewAI, are that kind of wrapper. The post's own links describe two older routes with these anchor words: "custom networks trained to write them" ([arXiv:2102.11174](https://arxiv.org/abs/2102.11174)) and "compilers from formal programs" ([arXiv:2301.05062](https://arxiv.org/abs/2301.05062)). The authors' claim for what is new is a general-purpose frontier model, used as it is, reading and writing the weights.

## What the experiments controlled

This is the part for readers who want the protocol, not the metaphor. Names and numbers below are the ones printed in the November 2 note unless a link says otherwise.

**Reading games.** Four PPO policies play grid versions of Breakout, Pong, Pac-Man, and Freeway. The board is 10×10. The network is an MLP, 500 → 32 → 32 → 5, tanh, 17,253 weights, trained for 1 billion steps, best of three seeds. Inputs are five channels. Actions are no-op, up, down, left, and right. Astra receives the weights as text and a description of the grid and actions, with no game named and no tools. The note says it named the right game for all four.

**Reading diffusion models.** Three DDPMs generate filled circles, squares, or triangles at 12×12 grayscale. The network is 160 → 64 → 64 → 144, ReLU, 23,824 weights, trained with Adam for 40,000 steps at batch 512. Astra is told not to run a forward pass. It names the shape and draws the outline from the output layer. The note says the outlines, rather than filled shapes, are a sign it is reading weight geometry rather than simulating the network.

**Reading the middle of a tiny language model.** Three character-level transformers, 4 layers by 6 heads, width 384, about 7.16 million weights, train on 1 billion characters of Python, Japanese in romaji, or English. Astra sees only the four transformer blocks, with Python allowed and the network forbidden, up to 100 runs. It names the language in both attempts. The note's table gives confidences of 0.56 and 0.52 for Python, 0.55 and 0.62 for romaji, and 0.58 and 0.48 for English. Copying heads it names match the heads measured by running the model. Measured copying heads score 0.22 to 0.55. Every other head scores at most 0.02. The authors say this matches a method in Elhage et al. that they never mentioned to Astra.

**Repairing the car.** The official Kinetix actor is 679 → 128, ReLU, then five layers of 128 with tanh, then 16 outputs: 171,664 weights. Official PPO for 1 billion steps never succeeds in 256 episodes. Astra gets the weights, the scene, and one recorded episode, in one reply, with no tools. The edit succeeds in all 1,024 episodes and changes 3.5% of the weights. The note describes a small added path that backs the car up, then hands control back to the trained policy.

**Writing MinAtar and Go.** MinAtar networks start at all zeros, shape 600 → 32 → 32 → 6, tanh. Astra gets the rules and source, and may not roll the network out before scoring. For Go, the network is 243 → 512 × 6 → 82, ReLU, 1,480,274 weights, also starting at zero. The sandbox can edit tensors with NumPy or PyTorch on CPU and cannot run the network there. A forward pass is up to 128 games or 256 positions. Training, search, and tree search are forbidden. With zero forward passes the note says Astra wrote the Go network in one Python run of 336 lines.

**Sycophancy.** Two copies of instruction-tuned Gemma 3 270M, 18 layers, are fine-tuned the same way, with embeddings frozen. One answers correctly. The other follows the user's guess. On facts the model knows and was not trained on, the note says the sycophant follows 100% of wrong guesses and the honest model follows 1–3%. Weights alone were not enough: four attempts found differences and could not map them to behavior. When Astra could see attention weights on up to 16 texts it wrote, and not the model outputs, it picked the sycophant in all three pairs. For head 10.2, the note's figure gives the honest model 94.3% of attention on the question's numbers and 0.75% on the user's answer, and the sycophant 3.5% and 85.7%.

**The Qwen edit.** Qwen3.5-0.8B, thinking on, 24 layers. Practice items are 7,469 from the GSM8K training set and 7,275 from the MATH training set, not the test sets. A forward pass answers up to 512 problems or reads up to 1,024 texts. Budgets are 10, 25, or 50. The 50-pass edit subtracts one looping direction from 64 output columns of the MLP down-projection in layers 15 and 19: 131,072 weights. Sample counts in the note include 4 on MATH-500, 2 on GSM8K and IFEval, 16 on AMC23, 4 on Minerva Math, OlympiadBench, and GPQA Diamond, and 1 on a fixed 1,000-question slice of MMLU-Pro. Scores for AMC23, Minerva, OlympiadBench, GPQA, and MMLU-Pro are not in the table printed above, so they are not repeated here.

| Qwen3.5-0.8B | MATH-500 | GSM8K | IFEval | Hit the token limit |
| --- | --- | --- | --- | --- |
| Base | 7.9% | 13.8% | 21.0% | 93.0% |
| Edit, 10 forward passes | 12.3% | 25.7% | 49.0% | 87.2% |
| Edit, 25 forward passes | 14.1% | 25.1% | 39.9% | 86.4% |
| Edit, 50 forward passes | 48.1% | 67.1% | 62.3% | 33.1% |

The edited-model card publishes these SHA-256 hashes for the raw bfloat16 bytes of the two changed tensors: layer 15 `82e2d733ea64feaeb4af93a1e065641d3df98b494a8b7576ef2f52e90fe2ee53`, layer 19 `8ef3c61bc36af113ad58e89dbb0a4a14dcba5a45cb750c15ab515c82ddd12eb2`.

The authors' forward look is explicit and untested in this note. They hope later systems might audit weights without a test set, steer a capability by editing a few weights, or move a circuit from one architecture to another. They also name recursive self-improvement as a possibility if a model could edit its own weights. This note does not show that. A separate page on this site covers what [Anthropic told the SEC](/blog/anthropic-may-soon-meet-ai-acceleration-threshold) on November 2, 2026 about automated AI research. That filing is a different document, with different claims.

## Read the paper

The original note, the logs, and the edited checkpoint:

- [Sparks of Weight-Space Programming](https://rikiyat.github.io/blog/weight-space-programming/)
- [GitHub logs and code](https://github.com/RikiyaT/lm_understand-logs)
- [Edited Qwen3.5-0.8B checkpoint](https://huggingface.co/RikiyaT/Qwen3.5-0.8B-weight-space-programming)
- [Live demo](https://huggingface.co/spaces/akhaliq/weight-space-programming-demo)

Related pages on this site: [harnesses](/topics/harnesses), [how agents work](/topics/how-agents-work), [research](/topics/research), [language models](/glossary/llm), and [agents](/glossary/agent).
