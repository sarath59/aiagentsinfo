---
title: "What Is BioBasicsBench? How Well AI Agents Handle Everyday Wet-Lab Science"
description: "What is BioBasicsBench? It is OpenAI’s November 6, 2026 benchmark, built with Ligo, that scores AI agents on 100 raw wet-lab tasks. At the xhigh setting, GPT-6 Astra scored 66.7% of rubric credit."
takeaways:
  - "On November 6, 2026, OpenAI introduced BioBasicsBench with Ligo: 100 tasks that test whether an AI agent can read raw wet-lab evidence, catch errors, and stop when the data cannot support a conclusion."
  - "At the xhigh setting, GPT-6 Astra scored 66.7% of available rubric credit (95% CI 60.3–73.1%). GPT-5.6 Sol scored 43.8% (37.6–50.0%). The run covered seven models, 37 settings, and 18,500 graded attempts."
  - "OpenAI says a higher score does not yet mean a model can make a reliable lab judgment, and that tracking these skills also matters for biosafety and biosecurity."
date: "2026-11-08"
updated: "2026-11-08"
category: news
topics:
  - news
  - research
  - task-performance
audience:
  - everyone
  - builders
companies:
  - openai
  - ligo
byline: "AI Agents Info Editorial"
sources:
  - title: "OpenAI, Measuring how AI agents handle everyday wet-lab science (November 6, 2026)"
    url: "https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science"
  - title: "Ligo Biosciences, homepage (re-read November 8, 2026)"
    url: "https://ligo.bio/"
  - title: "Brian Buntz, R&D World, OpenAI unveils BioBasicsBench (November 6, 2026)"
    url: "https://www.rdworldonline.com/openai-unveils-biobasicsbench-a-benchmark-to-gauge-how-well-ai-agents-read-raw-experimental-data-across-100-routine-wet-lab-tasks/"
  - title: "Unite.AI, OpenAI Introduces BioBasicsBench to Test AI Agents on Wet-Lab Data (November 6, 2026)"
    url: "https://www.unite.ai/openai-introduces-biobasicsbench-to-test-ai-agents-on-wet-lab-data/"
  - title: "Wes Tanaka, AIA Affairs, OpenAI introduces BioBasicsBench to test AI agents on wet-lab tasks (November 7, 2026)"
    url: "https://www.aiaffairs.com/technology/openai-biobasicsbench-ai-agents-wet-lab-tasks/"
faq:
  - question: "What is BioBasicsBench?"
    answer: "BioBasicsBench is a benchmark OpenAI introduced on November 6, 2026, with Ligo, a biotech company focused on enzyme design. It has 100 tasks across protein methods, imaging and cytometry, quantification and assays, nucleic acid methods, and molecular cloning. The tasks ask an AI agent to interpret raw experimental data, identify errors, and recognize when the evidence cannot support a conclusion."
  - question: "How well do AI agents handle wet-lab science on this benchmark?"
    answer: "At the xhigh reasoning-effort setting, the highest setting OpenAI reported for all seven models, GPT-6 Astra scored 66.7% of available rubric credit (95% CI 60.3–73.1%) and GPT-6.1 Sol scored 62.0% (55.6–68.4%). GPT-5.6 Sol scored 43.8% (37.6–50.0%). GPT-6 Luna, GPT-5.5, GPT-5.4, and GPT-5.2 scored 38.3%, 35.4%, 33.2%, and 31.2%. OpenAI says those higher scores do not yet mean a model can make a reliable lab judgment."
  - question: "How do you evaluate AI agents on experimental data?"
    answer: "BioBasicsBench is one public answer. Scientists wrote tasks from their own experiments, each with an expert rubric that can award partial credit. OpenAI ran five attempts on every task, reported the average share of rubric credit, and estimated a 95% confidence interval by resampling whole tasks. A useful agent evaluation on this kind of evidence also checks whether the agent notices a bad control and withholds a conclusion the data cannot support."
  - question: "Who reviewed the BioBasicsBench tasks?"
    answer: "OpenAI says each task had an internal review by a Ligo scientist who had not written it, an external review by a PhD-level scientist working in a wet lab, and a final internal review. Reviewers checked the prompt, the experimental evidence, the rubric, the author notes, and a graded model attempt."
  - question: "Does a higher BioBasicsBench score mean a model can work in a lab?"
    answer: "No. OpenAI writes that higher benchmark scores do not yet mean models can make reliable judgments in the lab. The same post shows GPT-6 Astra still letting an assumption override controls, discounting a contradictory observation, and overcounting colonies on one plate by about 12%."
  - question: "Which models did OpenAI evaluate?"
    answer: "The November 6, 2026 post evaluates seven OpenAI models: GPT-5.2, GPT-5.4, GPT-5.5, GPT-5.6 Sol, GPT-6.1 Sol, GPT-6 Luna, and GPT-6 Astra. It reports 37 model-and-reasoning-effort settings, five attempts on each of the 100 tasks per setting, and 18,500 results in total. It does not report a model from another lab."
---

On November 6, 2026, OpenAI published [Measuring how AI agents handle everyday wet-lab science](https://openai.com/index/measuring-how-ai-agents-handle-wet-lab-science) and introduced BioBasicsBench. The [benchmark](/glossary/benchmark) has 100 tasks, built with Ligo, and it measures how well an [agent](/glossary/agent) interprets raw experimental data from routine wet-lab work. At the xhigh setting, which allows more reasoning per task, GPT-6 Astra earned 66.7% of the available rubric credit. GPT-5.6 Sol earned 43.8%. OpenAI says the results show progress on routine lab analysis, with room left for images, controls, and experimental context.

This page was published on November 8, 2026. The OpenAI post, Ligo’s site, and the same-week write-ups cited below were re-read that day. The numbers in the tables are from OpenAI’s page.

## What is BioBasicsBench?

BioBasicsBench is a 100-task agent evaluation of everyday wet-lab analysis. OpenAI describes Ligo, its partner on the benchmark, as a biotech company focused on enzyme design. Ligo’s own homepage, checked November 8, uses the name Ligo Biosciences and says the company builds tooling to manipulate chemistry and biology, starting with enzyme design.

The 100 tasks sit in five areas of routine lab work: protein methods, imaging and cytometry, quantification and assays, nucleic acid methods, and molecular cloning. A task can be as direct as reading the molecular weight of a DNA sample on a gel, or it can be a detailed assay analysis. OpenAI says all of them are work a wet-lab scientist should be able to finish reliably.

An agent returns a structured answer: the conclusion, measurement, or recommendation the task asked for, and supporting reasoning where the task requires it. Most tasks test several skills at once. OpenAI names biological knowledge, reading images and other data, error detection, and protocol understanding. A figure caption on the same page says skill tags overlap, so those tags are not a second task count.

R&D World and Unite.AI, both dated November 6, and AIA Affairs, dated November 7, describe the same release: 100 tasks, built with Ligo, scored on raw experimental evidence. Where a later paragraph gives a score, the figure is OpenAI’s.

## Why is raw wet-lab evidence harder than a paper figure?

OpenAI’s reason for a new benchmark is the evidence itself. The post says everyday wet-lab work involves failed experiments, ambiguous images, and conflicting observations. Benchmarks built from charts and images chosen for scientific papers can miss that ambiguity, and the troubleshooting that goes with it.

A paper figure is the picture someone selected after the experiment made sense. The file on the bench is whatever the instrument wrote, including a control that does not match the label, a microscope pass that is a focus series rather than a biological change, and a count that is easy to inflate. Misreading an image, or missing a problem in the controls that check a result, can send a scientist toward a conclusion the run does not support, and toward more experiments that will not answer the question.

That is an agent-evaluation problem, not only a biology problem. A [behavioral evaluation](/glossary/behavioral-evaluation) checks one observable action. An end-to-end benchmark asks whether the job, scored against a rubric, came out right. BioBasicsBench is the second kind of test. The writing guide for the smaller check is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). The software around a model, which this benchmark does not score, is an [agent harness](/glossary/harness).

## How were the 100 tasks written and reviewed?

Scientists created the tasks from their own experiments. Each question has expert-written grading criteria. OpenAI describes three reviews after that:

1. An internal review by a Ligo scientist who had not written the task.
2. An external review by a PhD-level scientist working in a wet lab.
3. A final internal review.

Reviewers checked the prompt, the experimental evidence, the rubric, the author notes, and a graded model attempt. The rubric can give credit for the conclusion, for a number, for the reasoning, or for recognizing that the evidence is not enough. A correct final line and a shaky analysis do not have to receive the same score.

## What experimental data is the agent given?

The inputs keep the forms scientists already use: gel and blot images, plate photographs, microscopy stacks, sequencing reads, plate-reader exports, and videos of bench work. One task can include several kinds. Reference sheets, such as ladder charts and plasmid maps, support the reading. They are not a separate experiment.

OpenAI’s counts overlap. Adding the column does not produce 100.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Kind of data</th>
<th>Tasks</th>
<th>What OpenAI says it includes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Gels and blots</td>
<td>31</td>
<td>Agarose DNA gels, SDS-PAGE gels, Western blots</td>
</tr>
<tr>
<td>Protocols, notes, and specs</td>
<td>27</td>
<td>Protocols and SOPs, lab notebooks and run records, photographed handwritten notes, catalogues, instrument specs, published methods</td>
</tr>
<tr>
<td>Tables and instrument exports</td>
<td>20</td>
<td>CSV and Excel exports, lane layouts and inventories, raw flow cytometry (FCS) files</td>
</tr>
<tr>
<td>Bench, apparatus, and reagent photos</td>
<td>18</td>
<td>Benches, gel rigs, reagent and culture tubes, a PCR plate, tube racks, pH strips, a concentrator, a freezer, a liquid-handler deck</td>
</tr>
<tr>
<td>Microscopy</td>
<td>14</td>
<td>Raw brightfield and fluorescence images, multi-channel sets, z-stacks, time-lapse movies</td>
</tr>
<tr>
<td>Instrument screens and plots</td>
<td>13</td>
<td>Photos of flow cytometer, microscope, NanoDrop, plate reader, and balance screens; exported standard curves, chromatograms, and plots</td>
</tr>
<tr>
<td>Sequencing files</td>
<td>12</td>
<td>Raw long-read FASTQs, FASTA sequences, GenBank maps</td>
</tr>
<tr>
<td>Protocol videos</td>
<td>7</td>
<td>Streaking, inoculation, serial dilution, SDS-PAGE tank and incubator setups, weighing on a balance</td>
</tr>
<tr>
<td>Agar plates and colonies</td>
<td>7</td>
<td>Transformation plates, blue/white screens, antibiotic-disc plates</td>
</tr>
<tr>
<td>Reference sheets</td>
<td>21</td>
<td>Ladder charts, plasmid maps, pH charts. OpenAI marks these as supporting material.</td>
</tr>
</tbody>
</table>
</div>

## How does BioBasicsBench score an answer?

OpenAI evaluated seven models: GPT-5.2, GPT-5.4, GPT-5.5, GPT-5.6 Sol, GPT-6.1 Sol, GPT-6 Luna, and GPT-6 Astra. The evaluation covers 37 model-and-reasoning-effort settings. Each setting is five attempts on each of the 100 tasks. That is 18,500 results.

The metric is mean reward: the average task score, as a percentage of the rubric credit available on that task. The error bars are 95% confidence intervals from resampling whole tasks, with the five attempts for a task kept together. A task is the unit that moves in the resample, not a single attempt.

OpenAI also plots mean reward against average output tokens per task, on a logarithmic scale. Dashed orange lines are GPT-5 models. Solid blue lines are GPT-6 models. Effort settings differ by model. The chart includes max-effort points where OpenAI ran them. The table below is the xhigh setting, the highest one published for all seven models.

## How well did the models do at the xhigh setting?

Xhigh is the highest reasoning-effort setting OpenAI reports for every model in the table. Each row is all 100 tasks and five attempts per task.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Model</th>
<th>Mean reward</th>
<th>95% CI</th>
<th>Output tokens per task</th>
</tr>
</thead>
<tbody>
<tr>
<td>GPT-6 Astra</td>
<td>66.7%</td>
<td>60.3–73.1%</td>
<td>4,704</td>
</tr>
<tr>
<td>GPT-6.1 Sol</td>
<td>62.0%</td>
<td>55.6–68.4%</td>
<td>5,238</td>
</tr>
<tr>
<td>GPT-5.6 Sol</td>
<td>43.8%</td>
<td>37.6–50.0%</td>
<td>9,099</td>
</tr>
<tr>
<td>GPT-6 Luna</td>
<td>38.3%</td>
<td>32.3–44.5%</td>
<td>13,120</td>
</tr>
<tr>
<td>GPT-5.5</td>
<td>35.4%</td>
<td>29.7–41.0%</td>
<td>11,135</td>
</tr>
<tr>
<td>GPT-5.4</td>
<td>33.2%</td>
<td>28.3–38.4%</td>
<td>13,717</td>
</tr>
<tr>
<td>GPT-5.2</td>
<td>31.2%</td>
<td>26.2–36.3%</td>
<td>27,620</td>
</tr>
</tbody>
</table>
</div>

Two comparisons are firmer than the rest of the ranking. Astra’s interval (60.3–73.1%) and GPT-5.6 Sol’s (37.6–50.0%) do not overlap. GPT-6.1 Sol’s interval (55.6–68.4%) and GPT-5.6 Sol’s also do not overlap. Astra’s interval and GPT-6.1 Sol’s do overlap, so the 66.7% to 62.0% gap is the point estimate, not a separation the confidence intervals establish on their own. GPT-6 Luna’s 38.3% sits below GPT-5.6 Sol’s 43.8%, and those intervals overlap too. On this table the higher scores are Astra and GPT-6.1 Sol, not every model with a GPT-6 name.

Token use moves the other way. At xhigh, Astra averaged 4,704 output tokens per task. GPT-5.6 Sol averaged 9,099. GPT-5.2 averaged 27,620, the most in the table, at the lowest mean reward. OpenAI says Astra’s gain over GPT-5.6 Sol shows up even at low reasoning effort, and that stronger native multimodal ability may be what moves everyday wet-lab analysis. The post does not print the low-effort percentages in the table above, so those settings stay on OpenAI’s chart.

Unite.AI’s November 6 article reports the same xhigh pair that leads the table: 66.7% (60.3–73.1%) for GPT-6 Astra and 43.8% (37.6–50.0%) for GPT-5.6 Sol, with 4,704 and 9,099 output tokens. AIA Affairs reports those two headline scores and the 37 settings. This page keeps the full seven-row table from OpenAI.

## Where did GPT-6 Astra improve on GPT-5.6 Sol?

OpenAI groups the Astra examples under three headings. Each one is a case where the older model finished a plausible story and Astra stayed with what the file could show.

**Recognizing the limit of the data.** In one cell-imaging task, GPT-5.6 Sol classified cells as dead from the signal of a dye used to mark dead cells. OpenAI’s caption says a second channel can share light with that detector: the SYTOX-labelled window is 470–540 nm, the FUN-1 green window is 525–580 nm, and they overlap at 525–540 nm. The shared window permits interference, and the amount was not measured. Brightness alone could not justify the dead-cell call. Astra treated that as ambiguity and asked for controls that could separate the signals. OpenAI calls this the trap of over-interpreting data.

**Multimodal detail.** Another task asked for a conclusion from a DNA cloning experiment, where the controls do the work. GPT-5.6 Sol saw no colonies on the negative-control plate and reasoned from that empty plate. GPT-6 Astra read the rim. OpenAI’s caption says the label “LB Kan50” identifies kanamycin, a different antibiotic from the ampicillin used in the experiment. Astra rejected the plate as a reliable control.

**Experimental context.** A third task showed cells coming into and out of focus across microscope frames. GPT-5.6 Sol looked for a biological reason the cells seemed to disappear. GPT-6 Astra recognized a z-stack: a series of images taken at different depths. OpenAI’s point is that the reading depends on knowing what the instrument was doing, not only on what a single frame looks like.

## Where do the models still fail?

OpenAI states the limit in one sentence: higher benchmark scores do not yet mean models can make reliable judgments in the lab. The examples that follow are Astra failures. In each one, an assumption, an expected answer, or a supplied label outweighs the evidence, or a correct intermediate observation never reaches the final decision.

**An assumption overrides the controls.** On a colony PCR gel, Astra can tell the colony bands apart as two groups. It then assumes a larger PCR product would mark successful cloning, and it proposes lanes 4, 6, 7, and 8. The reference comparison of the controls selects lanes 5, 9, and 10. OpenAI says the visual grouping is right and the identities attached to the groups are reversed. Selecting those colonies would lead to purifying the incorrect plasmid.

**A contradictory observation is dropped.** Astra concludes that vacuoles, compartments inside cells, are generally darker than the surrounding cell, even though some vacuoles in the same image are lighter. OpenAI notes that changing focus can reverse the contrast, so the darker examples do not make a general rule. Astra comments that contrast varies with focus, then gives more weight to the cells it calls better focused and keeps only the darker description. The lighter regions were seen and left out of the conclusion.

**A routine count is off.** Astra’s counting marks on one plate do not line up with individual colonies. OpenAI says it fails to separate close neighbors, misses visible colonies, and marks empty agar. The net result on that plate is an overcount of about 12% against the benchmark reference. With the plated volume and dilution held fixed, that overcount inflates the estimate of how efficiently DNA was introduced into the cells by the same proportion.

These are published evaluation failures, not a claim that the rest of the 100 tasks failed the same way. They are the cases OpenAI chose to show what a 66.7% mean reward still gets wrong.

## How do you evaluate an AI agent on experimental data?

BioBasicsBench is a worked example of that question. The design choices are the part worth copying, separate from any one model score.

The task starts from a real run, not from a cleaned figure. The grader is a rubric with partial credit, so a right-looking conclusion can still lose points for the reasoning, and a refusal can earn credit when the evidence is too weak. Five attempts per task keep one lucky transcript from being the score. The confidence interval resamples tasks, which is the right unit if the hard part is the experiment rather than the wording of a single try. Review is independent of the person who wrote the item: someone inside Ligo who did not author it, then a PhD-level wet-lab scientist outside that draft, then one more internal pass that includes a graded model attempt.

What the benchmark does not measure is the [harness](/glossary/harness): the loop, the tools, the memory, and the permissions around a model. OpenAI’s published comparison is seven models at different reasoning-effort settings. A team that wraps one of those models in extra tools, or that lets a person approve the answer, is running a different test. [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness) is the definition this site uses. [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness) is the guide for checking one action inside that software. Yesterday’s note on [harness engineering at scale](/blog/what-is-harness-engineering-at-scale-thoughtworks-radar) is about owning that software. It is not a score on wet-lab evidence.

Two other pages on this site answer different benchmark questions. The [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026) lists public SWE-bench and Terminal-Bench scores for coding agents, each with the date on its source. The [benchmark leaderboard](/trackers/benchmarks) publishes a cell only when it has a source, a date, and the harness that produced it. BioBasicsBench is not one of those coding rows. The source for the table above is the November 6 OpenAI post.

For someone deciding whether to trust an agent on experimental data, the practical test is the one OpenAI’s failures illustrate. Did the agent read the control, or the assumption it brought in? Did a contradictory observation survive into the final sentence? Did the agent say when the file cannot support the claim? Mean reward summarizes those checks. The checks are the result a builder can act on.

## What should a builder take from the score?

A 66.7% mean reward is progress against GPT-5.6 Sol on this rubric, at fewer output tokens, on evidence that includes gels, plates, microscopy, sequencing files, and bench video. The 95% interval on that score runs from 60.3% to 73.1%, and the same post documents misses on controls, contrast, and counting. OpenAI’s closing line is that accelerating biological research depends on getting that everyday work right, and that progress here could leave scientists more time to choose the next experiment.

The same paragraph says tracking these capabilities will help OpenAI understand their implications for biosafety and biosecurity. That is a statement about monitoring the skill. It is not a claim that the current scores are safe to treat as a lab assistant.

OpenAI’s products for building and using agents live elsewhere on this site, and neither page is a BioBasicsBench result. The open-source toolkit is the [OpenAI Agents SDK](/directory/openai-agents-sdk). The consumer product is [ChatGPT](/directory/chatgpt). This article is filed under [news](/topics/news), [research](/topics/research), and [task performance](/topics/task-performance).

## Frequently asked questions

### What is BioBasicsBench?

It is a benchmark OpenAI introduced on November 6, 2026, with Ligo. One hundred tasks cover protein methods, imaging and cytometry, quantification and assays, nucleic acid methods, and molecular cloning. Each task asks an agent to interpret raw experimental data, catch errors, and notice when the evidence cannot support a conclusion. The glossary entry for this kind of test is [benchmark](/glossary/benchmark).

### How well do AI agents handle wet-lab science on this benchmark?

At xhigh, GPT-6 Astra scored 66.7% of available rubric credit (95% CI 60.3–73.1%) and GPT-6.1 Sol scored 62.0% (55.6–68.4%). GPT-5.6 Sol scored 43.8% (37.6–50.0%). GPT-6 Luna, GPT-5.5, GPT-5.4, and GPT-5.2 scored 38.3%, 35.4%, 33.2%, and 31.2%. OpenAI says the higher scores are not yet reliable lab judgment.

### How do you evaluate AI agents on experimental data?

Use tasks from real runs, grade with a rubric that can award partial credit, repeat the attempt, and report uncertainty at the level of the task. BioBasicsBench also grades the decision to withhold a conclusion. A single visible action, such as a tool call, is a [behavioral evaluation](/glossary/behavioral-evaluation). The longer guide is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness).

### Who reviewed the BioBasicsBench tasks?

OpenAI says each task was reviewed by a Ligo scientist who had not written it, then by a PhD-level scientist working in a wet lab, then in a final internal review. That last pass covered the prompt, the evidence, the rubric, the author notes, and a graded model attempt.

### Does a higher BioBasicsBench score mean a model can work in a lab?

OpenAI says it does not. The post shows GPT-6 Astra still overriding controls on a colony PCR gel, dropping lighter vacuoles that contradict a darker-vacuole rule, and overcounting one plate’s colonies by about 12%.

### Which models did OpenAI evaluate?

Seven of its own: GPT-5.2, GPT-5.4, GPT-5.5, GPT-5.6 Sol, GPT-6.1 Sol, GPT-6 Luna, and GPT-6 Astra. The post reports 37 model-and-reasoning-effort settings and 18,500 graded results. It does not report a model from another lab.
