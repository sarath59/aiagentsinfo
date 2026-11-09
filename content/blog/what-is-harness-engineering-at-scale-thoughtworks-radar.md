---
title: "What Is Harness Engineering at Scale? Thoughtworks Radar Volume 35 Explained"
description: "What is harness engineering? It is the work of designing the software around an AI agent. Thoughtworks Technology Radar Volume 35, released November 4, 2026, makes harness engineering at scale a theme and treats the agent harness as a product."
takeaways:
  - "On November 4, 2026, Thoughtworks released Technology Radar Volume 35 and named harness engineering at scale as a theme rather than a single blip."
  - "The same day’s press release says the Adopt ring holds 11 practices and technologies, including agent sandboxing and threat modeling."
  - "Cecilia Geraldo’s November 4 post says the harness is everything between the model and the work, and that it needs an owner, versions, and evaluation."
date: "2026-11-07"
updated: "2026-11-08"
category: news
topics:
  - news
  - harnesses
  - how-agents-work
audience:
  - everyone
  - builders
companies:
  - thoughtworks
  - openai
  - anthropic
  - claude-code
  - langchain
byline: "AI Agents Info Editorial"
sources:
  - title: "Thoughtworks, As AI Agents Scale, Thoughtworks Technology Radar Highlights the Need for Stronger Controls (November 4, 2026)"
    url: "https://www.thoughtworks.com/about-us/news/2026/thoughtworks-technology-radar-highlights-stronger-controls"
  - title: "Cecilia Geraldo, Thoughtworks, The harness is a product (November 4, 2026)"
    url: "https://www.thoughtworks.com/en-us/insights/blog/generative-ai/harness-is-a-product"
  - title: "Thoughtworks Technology Radar, Volume 35 (November 2026)"
    url: "https://www.thoughtworks.com/en-us/radar"
  - title: "Thoughtworks Technology Radar, techniques summary, Volume 35"
    url: "https://www.thoughtworks.com/radar/techniques/summary"
  - title: "Thoughtworks Technology Radar, Enterprise harness (Assess, November 4, 2026)"
    url: "https://www.thoughtworks.com/en-us/radar/techniques/enterprise-harness"
  - title: "Kimberly Fessel, The New Stack, AI agents are getting more complex. Developers shouldn’t have to babysit them (November 6, 2026)"
    url: "https://thenewstack.io/harness-engineering-coding-agents/"
  - title: "Agent Patch Notes #3 (November 6, 2026)"
    url: "https://agentpatchnotes.beehiiv.com/p/agent-patch-notes-3"
faq:
  - question: "What is harness engineering?"
    answer: "Harness engineering is the work of designing the software around a model: the loop, the tools, the memory, the permissions, and the checks. This site’s glossary uses that definition. The longer guide is What is an AI agent harness? This page is Thoughtworks’ November 4, 2026 account of that work at organization scale."
  - question: "What is harness engineering at scale?"
    answer: "In Thoughtworks Technology Radar Volume 35, released November 4, 2026, harness engineering at scale is a theme, not one blip. It is the work of building and maintaining the environment around an AI agent — prompts, tools, memory, guardrails, and feedback loops — as a system with owners, versions, evaluation, security, and access control. Cecilia Geraldo’s same-day post calls that surrounding layer a product."
  - question: "What is an agent harness, according to Thoughtworks?"
    answer: "Geraldo’s November 4, 2026 post says an agent harness is everything between the model and the work. The list covers instructions and skills, tools, permissions and sandboxes, context policy, state, orchestration, evaluation, and telemetry. It is neither the model nor the application."
  - question: "What did Technology Radar Volume 35 put in the Adopt ring?"
    answer: "The November 4 press release says 11 practices and technologies are in the Adopt ring, including agent sandboxing and threat modeling. The quadrant summaries, checked November 7, 2026, list six Adopt techniques (agent sandboxing, mutation testing, path-to-production mapping, post-quantum cryptography, progressive context disclosure, and threat modeling), plus VictoriaMetrics on platforms, mise, OpenAI Codex, and OpenCode on tools, and the Open Data Contract Standard on languages and frameworks."
  - question: "What is an enterprise harness?"
    answer: "The Volume 35 enterprise-harness blip, placed in Assess and dated November 4, 2026, calls it the organization-wide layer of what coding agents consume, managed collectively. That includes skills, tools, connectors to internal context, approved technologies, architecture decision records, path-to-production guidance, hooks, and security policies. The blip says to keep it thin and federated, and to share assets through open standards and an agent plugin marketplace."
  - question: "What is human-in-the-loop theater?"
    answer: "The November 4 press release uses the phrase for approval that becomes a ritual rather than a meaningful check. The Volume 35 techniques summary places Human-in-the-loop theater in the Caution ring and describes it as a human left in the loop as an empty approval step, approving actions, prompts, or diffs they cannot realistically evaluate. The related Trial blip is risk-tiered human oversight."
  - question: "Who is quoted in the November 4 and November 6 coverage?"
    answer: "The November 4 press release quotes Rachel Laycock, chief technology officer at Thoughtworks. The same day’s blog is by Cecilia Geraldo, lead consultant. The New Stack article dated November 6, 2026, by Kimberly Fessel, quotes Vanitha Kumar, Head of Technology for Retail, CPG, Travel and Hospitality Market for Thoughtworks Americas. All three names appear on the Volume 35 contributor list."
---

On November 4, 2026, Thoughtworks released Volume 35 of its Technology Radar and made harness engineering at scale one of the edition’s themes. The same day’s [press release](https://www.thoughtworks.com/about-us/news/2026/thoughtworks-technology-radar-highlights-stronger-controls) quotes chief technology officer Rachel Laycock: clients used to ask how fast agents could write code. They now ask whether anyone can trust, review, and afford what those agents produce. Cecilia Geraldo’s [blog post](https://www.thoughtworks.com/en-us/insights/blog/generative-ai/harness-is-a-product), also dated November 4, states the practical claim in the headline. The harness is a product.

An [agent](/glossary/agent), on this site, is a model plus the software that offers tools, runs a step, and brings the result back. That software is the [agent harness](/glossary/harness). [Harness engineering](/glossary/harness-engineering) is the work of designing it. This note, published November 7, 2026, is about the Radar and the two write-ups that explained it. The standing definition stays on the [harness guide](/blog/what-is-an-ai-agent-harness). The pages cited here were re-read on November 7.

## What is harness engineering?

[Harness engineering](/glossary/harness-engineering) is the work of designing the software around a model: the loop, the tools, the memory, the permissions, and the checks. The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). Harness engineering at scale, in the next section, is Thoughtworks’ name for that same work once an organization has to own it, version it, and evaluate it.

## What is harness engineering at scale?

The [Volume 35 radar page](https://www.thoughtworks.com/en-us/radar) says the phrase is not new. What changed is the placement. Thoughtworks debated listing harness engineering as one blip, then made it a theme because it connects many techniques. The theme text defines the work as everything a team does to build the environment around an AI agent, from memory and context to feedback loops and [guardrails](/glossary/guardrail).

The same paragraph names the pieces that now travel together: Agent Plugins, an agent plugin marketplace, and Agent Package Manager. It calls the harness a living asset that needs an owner and upkeep, and it points at harness quality evaluation, a self-improving harness, and a feedback flywheel. The scale problem is last: an enterprise harness may show up as a product in the coming months, “not unlike what happened with platforms and platform engineering a few years ago.”

Geraldo, a lead consultant and a Radar contributor, writes the product version of that paragraph. Ask a team which model it runs and you get a name. Ask what wraps the model — instructions, tools, permissions, and how context is assembled — and the answer is often a pile of half-owned files. She says those files are one product. Many organizations have a model strategy and a platform strategy. Fewer have a harness strategy, and fewer still have a named person accountable for it. Her reason for caring: the harness is the layer where agentic engineering succeeds or fails.

The Radar calls itself an opinionated guide from Thoughtworks’ own projects, published twice a year. It is not a market census. The press release calls Volume 35 a biannual report informed by client work.

## What did Thoughtworks publish on November 4?

The press release is datelined November 4, 2026, Chicago. Its frame is that larger, longer-running agent tasks move the hard problems past the conversation with the model: securing the environment, deciding what an agent can access, keeping human oversight meaningful, and controlling cost.

The Adopt ring is the release’s strongest signal. Eleven practices and technologies sit there, including agent sandboxing and threat modeling. The release says earlier editions traced AI inside software engineering, Volume 34 examined the friction and risks of using it at scale, and Volume 35 turns to managing those risks as adoption grows.

Laycock’s quote is the release’s summary:

> Not long ago, the question we heard from clients was how fast agents could write code. Now it’s whether anyone can trust, review and afford what they produce.

She adds that models will keep improving, and that lasting value goes to organizations that invest in the engineering and oversight around them.

The release names four themes. The interactive radar shortens the second heading and retitles the fourth. The subjects match.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Theme in the November 4 press release</th>
<th>What the release says it covers</th>
</tr>
</thead>
<tbody>
<tr>
<td>Harness engineering at scale</td>
<td>Prompts, tools, memory, guardrails, and feedback loops become a product with owners, versions, and dependencies, plus evaluation, security, access control, and maintenance.</td>
</tr>
<tr>
<td>Putting more agents to work, without losing human judgment</td>
<td>Parallel sessions and longer tasks, including unattended overnight builds, can turn review and delivery into bottlenecks. The release warns against “human in the loop theater,” where approval is a ritual. The radar page heads this theme “Putting more agents to work.”</td>
</tr>
<tr>
<td>Beyond frontier models</td>
<td>A proprietary frontier model is no longer the obvious default. Open-weight models have narrowed the gap for many workloads and can run on an organization’s own infrastructure. Choose by task, cost, privacy, and operations.</td>
</tr>
<tr>
<td>The economics of running AI at scale</td>
<td>Cost includes routing, batching, storage, networking, and scheduling, not only the model price. The radar page heads the matching section “Constructing the AI factory.”</td>
</tr>
</tbody>
</table>
</div>

The rings on the rest of this page are recommendations. Adopt means seriously consider using it. Trial means ready, and less proven than Adopt. Assess means look closely, and trial it when it fits. Caution means consider another option, or avoid it, after negative experience.

## What is an agent harness in this edition?

Geraldo’s definition is the Volume 35 answer to “what is an agent harness?” The harness is everything between the model and the work. It is neither the model nor the application. It decides how the two meet.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Part of the harness, in the November 4 post</th>
<th>The job it does</th>
</tr>
</thead>
<tbody>
<tr>
<td>Instructions and skills</td>
<td>What the agent loads before it acts.</td>
</tr>
<tr>
<td>Tools</td>
<td>What the agent is allowed to call.</td>
</tr>
<tr>
<td>Permissions and sandboxes</td>
<td>The box the agent runs inside.</td>
</tr>
<tr>
<td>Context policy</td>
<td>What the agent is allowed to see.</td>
</tr>
<tr>
<td>State</td>
<td>What the agent carries between steps.</td>
</tr>
<tr>
<td>Orchestration</td>
<td>How the steps are sequenced. On this site, <a href="/glossary/orchestration">orchestration</a> means choosing the next step or specialist.</td>
</tr>
<tr>
<td>Evaluation</td>
<td>Whether the run was effective.</td>
</tr>
<tr>
<td>Telemetry</td>
<td>What happened when it was not.</td>
</tr>
</tbody>
</table>
</div>

She writes that none of these parts is new. Application engineering spent a decade spreading them across a framework, a platform team, and a CI pipeline. In an agent system they collapse into one artifact a small team can change in an afternoon, and that nobody may own. The failure she describes is a prototype that, six months later, is a folder of Markdown, a few wrapper scripts, a config file full of commented experiments, and one person who knows why the retry exists. It often works. It is a weak thing to upgrade, audit, or hand to another team. Her name for the unmanaged version is configuration debt with a system prompt.

The sentence the post quotes twice:

> The harness is the place where engineering judgment is expressed. If it’s not managed properly, it’s also the place where that judgment is lost.

The supply chain in the same post is where the plugin blips belong. Agent Plugins, she writes, packages agent skills and MCP servers into one installable plugin. Marketplaces and Agent Package Manager publish, pin, and compose those plugins, so teams stop pasting prompt fragments between repositories. A copied prompt has no version, no provenance, and no upgrade path. A package does. Once a harness depends on someone else’s plugin, it needs an owner. The techniques summary places the marketplace in Trial and says Anthropic popularized the pattern with its Claude Code plugin marketplace. Agent Plugins is in Assess on the platforms quadrant. Agent Package Manager is in Trial on the tools quadrant.

## Which blips carry the harness theme?

These rings are from the Volume 35 [techniques summary](https://www.thoughtworks.com/radar/techniques/summary) and the related-blip labels on those pages, checked November 7, 2026.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Blip</th>
<th>Ring in Volume 35</th>
<th>What the radar text uses it for</th>
</tr>
</thead>
<tbody>
<tr>
<td>Agent sandboxing</td>
<td>Adopt, techniques</td>
<td>A sensible default: isolated environments, restricted privileges, limited access to other systems, shaped by threat modeling.</td>
</tr>
<tr>
<td>Threat modeling</td>
<td>Adopt, techniques</td>
<td>A regular human-led exercise. The text says prompt injection and autonomous action can slip past rule-based scans.</td>
</tr>
<tr>
<td>Agent plugin marketplace</td>
<td>Trial, techniques</td>
<td>Distribution for skills, instructions, MCP servers, and subagent definitions, with a way to publish and update them.</td>
</tr>
<tr>
<td>Feedback flywheel</td>
<td>Trial, techniques</td>
<td>A team habit: ask at the end of a session what should change in a shared artifact, then decide in a retrospective. People still accept the edit.</td>
</tr>
<tr>
<td>Self-improving harness</td>
<td>Trial, techniques</td>
<td>Agents read traces and eval feedback, then propose or make changes to prompts, tools, skills, memory, and workflows. Humans set the bounds.</td>
</tr>
<tr>
<td>Risk-tiered human oversight</td>
<td>Trial, techniques</td>
<td>Review depth follows what a change could break, so attention goes where a person can still judge the diff.</td>
</tr>
<tr>
<td>Harness quality evaluation</td>
<td>Assess, techniques</td>
<td>Scheduled checks that a skill, plugin, or guardrail actually works.</td>
</tr>
<tr>
<td><a href="https://www.thoughtworks.com/en-us/radar/techniques/enterprise-harness">Enterprise harness</a></td>
<td>Assess, techniques</td>
<td>The shared layer coding agents consume, kept thin and federated.</td>
</tr>
<tr>
<td>Human-in-the-loop theater</td>
<td>Caution, techniques</td>
<td>An approval step the person cannot realistically evaluate. The text calls it an accountability sink.</td>
</tr>
<tr>
<td>AI-accelerated shadow IT</td>
<td>Caution, techniques</td>
<td>Software built outside the supported path, including with coding agents. The suggested answer is a useful enterprise harness and firm security limits.</td>
</tr>
</tbody>
</table>
</div>

Three neighboring cautions belong in the same reading. Agent instruction bloat is guidance that grows until it contradicts itself. The summary says Anthropic removed over 80 percent of Claude Code’s system prompt for its latest models with no measurable loss, and it tells teams to delete instructions a newer model no longer needs. Blanket frontier model usage is sending every task to the most capable model. Coding throughput as a measure of productivity is treating the share of AI-written code, or tokens consumed, as a badge. The summary says those numbers can show adoption and still be a poor proxy for productivity, and it points back to DORA metrics and business outcomes.

## What did the Adopt ring actually include?

The press release’s count of 11 is checkable. On November 7, 2026, the four quadrant summaries listed eleven Adopt blips. Six are techniques. The other five are a platform, three tools, and a language standard. Sandboxing and threat modeling are the examples in the release. They are not the whole ring.

<div class="table-scroll">
<table>
<thead>
<tr>
<th>Adopt blip</th>
<th>Quadrant</th>
</tr>
</thead>
<tbody>
<tr>
<td>Agent sandboxing</td>
<td>Techniques</td>
</tr>
<tr>
<td>Mutation testing</td>
<td>Techniques</td>
</tr>
<tr>
<td>Path-to-production mapping</td>
<td>Techniques</td>
</tr>
<tr>
<td>Post-quantum cryptography</td>
<td>Techniques</td>
</tr>
<tr>
<td>Progressive context disclosure</td>
<td>Techniques</td>
</tr>
<tr>
<td>Threat modeling</td>
<td>Techniques</td>
</tr>
<tr>
<td>VictoriaMetrics</td>
<td>Platforms</td>
</tr>
<tr>
<td>mise</td>
<td>Tools</td>
</tr>
<tr>
<td>OpenAI Codex</td>
<td>Tools</td>
</tr>
<tr>
<td>OpenCode</td>
<td>Tools</td>
</tr>
<tr>
<td>Open Data Contract Standard (ODCS)</td>
<td>Languages and frameworks</td>
</tr>
</tbody>
</table>
</div>

Agent sandboxing is the Adopt item closest to the release’s security line. The techniques summary says Thoughtworks had already recommended sandboxes for coding agents, and now treats sandboxing as a sensible default for agents that also act in business systems. The method it describes is risk-based, informed by threat modeling, using least privilege. The blip does not name one sandbox product.

Threat modeling, also Adopt, stays a human-led practice with help from agents. The summary points at MITRE ATLAS, which this volume places in Assess, and at toxic flow analysis for AI, in Trial, as ways to locate where prompt injection can enter. A session should end with decisions about where nondeterministic model behavior is acceptable, where it is not, and where a deterministic guardrail is required.

The other Adopt techniques are about the flood of agent output, not a new security tool. Path-to-production mapping is a workshop from the workstation to production that lists steps, then pain points, because more generated code exposes later bottlenecks. Progressive context disclosure loads detail only when a step needs it. The coding example is a short AGENTS.md that links out, plus deferring the full token cost of MCP tools and skills until they are used. Mutation testing targets generated tests that pass without catching a logic change.

OpenAI Codex and OpenCode are the coding tools in this volume’s Adopt ring. Claude Code is not one of the eleven. Related blips still mark Claude Code as Adopt from the April 2026 radar. That older placement is not a new Volume 35 decision.

## What is human-in-the-loop theater?

The press release keeps the warning short. People run several agent sessions and hand off longer tasks, including unattended overnight builds. Review and the delivery pipeline become the bottleneck. Approval that turns into a ritual is “human in the loop theater.” The attached advice is to measure review capacity before adding sessions.

The Caution blip is sharper. A person stays in the loop as an empty approval step and signs actions, prompts, or diffs they cannot realistically evaluate. The summary calls that an accountability sink: nobody owns the decision. The alternative is triage. Keep human review for changes a person can actually judge. Elsewhere, steer the system with checks such as mutation testing.

Risk-tiered human oversight, in Trial, is that triage. The riskiest or hardest-to-reverse changes are for humans to apply. Mid-risk changes get review. Low-risk changes can be auto-merged through continuous integration. Codebase zones can force a closer look. An LLM that classifies impact helps, and it is fallible. The summary says a published process from Meta combines those two signals, and that Thoughtworks teams use the split to spend scarce attention on purpose.

Unattended overnight agentic builds, also Trial, is the long task the press release names. A team gives a coding agent a feature-sized job in the evening and reads the result in the morning. The summary treats the entry requirements as the point: a sandbox, work specified up front, and feedback sensors so the agent can correct its own mistakes. A night’s diff can be too large for line-by-line review, so the team needs a harness it has already tested. The blip is Trial for teams that have those pieces, and a goal for teams that do not.

The November 6 New Stack conversation, below, uses a different sentence for the same week: agents that catch mistakes before a person looks, so developers stop babysitting the run. That claim is about feedback inside the harness. The Caution blip is about fake approval beside it. Volume 35 prints both.

## What is an enterprise harness?

The [enterprise harness blip](https://www.thoughtworks.com/en-us/radar/techniques/enterprise-harness), dated November 4, 2026, and placed in Assess, is the organization-scale version. It is the shared layer of what coding agents consume: skills, tools, connectors to internal context, approved technologies, architecture decision records, path-to-production guidance, hooks, and security policies. Teams need that common context on top of each team’s own instructions. The comparison in the blip is a developer-experience platform, pointed at agent experience.

The advice is modest, which is why the ring is Assess. Thoughtworks has seen organizations build a custom coding agent on top of OpenCode. The blip prefers open standards and a plugin marketplace. “There’s no consensus yet on how to do this well, so keep the enterprise harness thin and federated, leave room for experimentation and harvest what works.”

Geraldo describes what “running one” adds once a platform team is asked to own the runtime: auditability, access control, lifecycle, and spend limits. Her list is golden paths that are faster than the unsupported route, sandbox defaults that do not depend on someone remembering a flag, plugin allow-lists with provenance checks, one model-routing policy for cost and data residency, telemetry that names the harness version behind an output, and a deprecation policy so other teams can depend on the runtime.

Identity is the item she calls most urgent. An agent acting for a person needs an answer to whose permissions it is using, what it may do without asking, and what evidence remains. Those are harness decisions. A per-team config file is a poor place to leave them.

She also names the bypass. If the official harness is slower than something a team can assemble in a weekend, people will go around it. The Caution blip on AI-accelerated shadow IT says the same thing from the outside: coding agents make it easy to ship software with no tests, no pipeline, and no observability, and security is the first risk. The remedy in that blip is a place to experiment that is actually easier, with limits that stay firm.

Three questions end her post. Who owns the harness, as the person accountable for quality and the roadmap? How do you know the last change made it better, if the honest answer cannot be a demo, an anecdote, or an acceptance rate? What may it touch, including data, tools, credentials, and production? She writes that harness engineering emerged in 2026 and is still immature, and that the decisions are cheaper now than they will be in twelve months. This site’s [glossary](/glossary/harness-engineering) already points at earlier 2026 accounts, including OpenAI’s February 11 post and LangChain’s March 10 explainer. Geraldo’s sentence is Thoughtworks’ clock for that work.

## What has to be true before a harness rewrites itself?

The Trial blip for a self-improving harness is agents that read traces and evaluation results, then propose or apply changes to prompts, context strategy, workflows, skills, tools, memory, and middleware. The feedback flywheel, the summary says, still has people interpret the signal and edit the system. Research the blip names, including Meta-Harness and VERSE, pushes the loop further. The printed recommendation is bounded experiments, regression tests, and humans who set the goal, the editable surface, and whether a gain survives new tasks.

Geraldo’s brake is stricter. A loop that can rewrite instructions, pick its own tools, or re-rank results can drift. The output can look like learning and behave like entropy. Her signal is the flywheel: findings, incidents, failed evals, cost anomalies, and cases where a person took over. Without that, self-improvement is a model editing its own job description.

Three preconditions have to hold before she would run the loop:

- An evaluation harness, so a gain is measured.
- Provenance, so each self-authored change can be attributed, reviewed, and reverted.
- A rollback path, so a bad iteration costs an afternoon.

Automate the proposal. Keep the approval. The system may suggest an instruction, a tool swap, or a context rule. It does not merge on its own. The flywheel blip adds the matching maintenance rule: delete stale guidance, and drop a sensor that only makes noise.

## How do you tell whether a harness change worked?

Geraldo’s question for harness quality evaluation is whether a change made the agent better or worse. An acceptance rate, or a pull request that made the instructions clearer, does not answer it. Behavior is non-deterministic, tasks vary, and a set that represented the work in March can mislead by June. Suites also cost money and time, so teams measure what is cheap: tokens, accepted suggestions, tests passed. She calls those activity metrics. They can show that the system is busy.

The practice she describes is a golden set of real jobs, on the order of the 20 or 30 tasks the agent is supposed to do, each with a score. Version the set with the harness. Regress on every meaningful change, not only at release. Treat cost and latency as product numbers, because a better-looking answer that doubles spend has not improved the product. Keep a sample of human review for tone, judgment, and style, which a scored set will miss.

The set needs an owner and a review cadence, the way a release test does. Otherwise the eval is another kind of theater: green, and disconnected from customers. Her rule is that without an eval, there is no change.

The Assess blip is the operational version. Custom harnesses are skills, plugins, AGENTS.md files, and deterministic guardrails. For the non-deterministic parts, the summary says Thoughtworks teams use PluginEval on coding-agent plugins or skills. For deterministic guardrails, they want a test suite so each check can be built test-first and can show that it fires. Run the evaluations nightly or beside CI.

A test of one observable action is a [behavioral evaluation](/glossary/behavioral-evaluation) on this site. The writing guide is [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness). How to stand up the tasks and graders is [How to build an eval harness for AI agents](/blog/how-to-build-an-eval-harness-for-ai-agents). Thoughtworks’ golden set is a wider question than one action. This page does not treat them as the same test. Both say a harness you cannot measure is a harness you cannot safely change.

Two nearby pages answer different questions, and neither is a Thoughtworks result. [HarnessFlow](/research/harnessflow-mcts-harness-optimization) is this site’s note on a November 4, 2026 paper that searches for a better harness while the model stays fixed. The [November 2026 harness benchmark](/reports/agent-harness-benchmark-november-2026) lists public coding-agent scores with the date on each source. The [harness comparison](/trackers/harnesses) stays empty until every cell has a source. Volume 35 does not cite those pages.

## What did Vanitha Kumar tell The New Stack on November 6?

On November 6, 2026, The New Stack published [Kimberly Fessel’s account](https://thenewstack.io/harness-engineering-coding-agents/) of a podcast with Vanitha Kumar. The article identifies her as Head of Technology for Retail, CPG, Travel and Hospitality Market for Thoughtworks Americas. She is also on the Volume 35 contributor list, with Laycock and Geraldo.

Fessel’s opening matches the Radar’s second theme. Harness engineering, in that telling, gives agents tests, feedback loops, and guardrails so they can correct mistakes before a person reviews the work. They then hold longer tasks, and several can run at once. Kumar splits the job in one sentence: “Do it right the first time and also self-correct when you have done it for the first time.” The payoff The New Stack attributes to her is that you no longer have to “babysit and watch your agent do the work.”

One agent is a different problem from hundreds. That is where she talks about AI factories, and compares them to Kubernetes, which hid a lot of microservice machinery. Factories, in her account, standardize model choice, workload management, and cost. The line The New Stack quotes, brackets included: “The best way to build a platform is [to] make it easy to do the right thing.” The radar page uses the same factory language in “Constructing the AI factory,” and it also names Kubernetes as a base for serving and scheduling models. The podcast article is Kumar’s version of that theme. It is not a second Radar.

More autonomy also means more access to data, systems, and tools, which Fessel writes can add security exposure. Some organizations are delaying adoption because of that. Guardrails in the article restrict tools, force a test environment, and require a person for sensitive changes. Asked what next year looks like, Kumar says: “Security is going to be a big topic. Not even one year out.”

She discusses Volume 35, which the article dates to November 4. Fessel’s summary is AI, harness engineering, new agent practices, and older practices that now weigh more. The examples, via Kumar, are penetration testing and understanding the path to production: “old things that are making a comeback because they now have more added weight because of AI.” Path-to-production mapping is an Adopt technique, as the table above shows. This article did not find a Volume 35 blip titled penetration testing, so that example stays Kumar’s remark as The New Stack reported it.

The same day, the newsletter Agent Patch Notes published [issue 3](https://agentpatchnotes.beehiiv.com/p/agent-patch-notes-3), dated November 6, 2026. It describes tighter write permissions in Claude Code and a Factory coding harness rebuilt around programmatic tool calling. That roundup is context beside the Radar. It is not a Thoughtworks finding.

## What should a builder read next?

The November 4 material leaves a short list. Name an owner. Pair that owner with a golden set, and with a rule that a change without an eval does not ship. Decide the blast radius — data, tools, credentials, production — as part of the product, and sandbox by default. Keep human review for diffs a person can still judge. If the supported path is slower than a weekend setup, expect people to route around it.

The standing pages here are the glossary and the two guides already linked: [what an agent harness is](/blog/what-is-an-ai-agent-harness) and [how to evaluate one](/blog/how-do-you-evaluate-an-ai-agent-harness). [How agents work](/topics/how-agents-work) is the plain-language shelf. [Agent harnesses](/topics/harnesses) collects the guides, the [November 2026 benchmark](/reports/agent-harness-benchmark-november-2026), and [Best AI agent frameworks](/best/ai-agent-frameworks). This piece is on the [news](/topics/news) topic. Vendor docs for other runtimes are in the [agent frameworks](/directory/category/agent-frameworks) category and on the [Builders](/for/builders) page.

Volume 35’s own next step, on the radar page, is the interactive edition and the PDF. The sourced claim on November 7 is the one in the press release and the theme: Thoughtworks is telling teams to engineer the harness as a product, with sandboxing and threat modeling in Adopt, and the enterprise version still in Assess.

## Frequently asked questions

### What is harness engineering?

It is the work of designing the software around a model: the loop, the tools, the memory, the permissions, and the checks. The glossary entry is [harness engineering](/glossary/harness-engineering). The longer guide is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness). The rest of this page is Thoughtworks’ November 4, 2026 account of that work at organization scale.

### What is harness engineering at scale?

In Technology Radar Volume 35, released November 4, 2026, it is a theme, not one blip. Thoughtworks uses it for the environment around an AI agent — prompts, tools, memory, guardrails, and feedback loops — treated as a system with owners, versions, evaluation, security, and access control. Cecilia Geraldo’s post the same day calls that layer a product. The local definition of the work is [harness engineering](/glossary/harness-engineering).

### What is an agent harness, according to Thoughtworks?

Geraldo says it is everything between the model and the work: instructions and skills, tools, permissions and sandboxes, context policy, state, [orchestration](/glossary/orchestration), evaluation, and telemetry. It is neither the model nor the application. The longer guide on this site is [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness).

### What did Technology Radar Volume 35 put in the Adopt ring?

The November 4 press release says 11 practices and technologies, including agent sandboxing and threat modeling. Checked on November 7, 2026, the quadrant summaries list those two plus mutation testing, path-to-production mapping, post-quantum cryptography, and progressive context disclosure; VictoriaMetrics on platforms; mise, OpenAI Codex, and OpenCode on tools; and the Open Data Contract Standard on languages and frameworks.

### What is an enterprise harness?

The November 4 blip, in Assess, calls it the shared layer coding agents consume: skills, tools, connectors to internal context, approved technologies, architecture decision records, path-to-production guidance, hooks, and security policies. The printed advice is to keep it thin and federated, and to share assets through open standards and a plugin marketplace.

### What is human-in-the-loop theater?

The press release uses the phrase for approval that has become a ritual. The Caution blip describes a person signing actions, prompts, or diffs they cannot realistically evaluate. The Trial practice next to it is risk-tiered human oversight: a person reviews what they can still judge, and checks cover the rest.

### Who is quoted in the November 4 and November 6 coverage?

The press release quotes Rachel Laycock, Thoughtworks’ chief technology officer. The blog is by Cecilia Geraldo, lead consultant. The New Stack article dated November 6, 2026, quotes Vanitha Kumar, Head of Technology for Retail, CPG, Travel and Hospitality Market for Thoughtworks Americas. The Volume 35 contributor list includes all three.
