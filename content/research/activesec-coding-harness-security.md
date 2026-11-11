---
title: "4B judge refused 118 of 120 benign coding tasks"
description: "ActiveSecHarness, arXiv November 10, 2026: a qwen3:4b judge blocked every attack row and refused 118 of 120 benign fixtures. Ring 0 blocked every attack and refused none, in 12.7 µs."
date: "2026-11-11"
updated: "2026-11-11"
absoluteTitle: true
ledeQuestion: "What did the 4B judge refuse?"
ledeAnswer: "118 of 120 benign software-engineering fixtures. It also blocked all 132 attack rows. Ring 0 blocked those 132 and refused none of the 120."
dataset:
  title: "ActiveSecHarness mediation rates, November 2026"
  description: "Attack block rate and false-positive rate from Hegelich et al., arXiv:2611.13960, Table 4, on 132 attack rows and 120 benign fixtures. The qwen3:4b judge is 1.000 and 0.983. Ring 0 is 1.000 and 0.000."
  isBasedOn: "https://arxiv.org/abs/2611.13960"
type: paper-breakdown
topics:
  - harnesses
  - how-agents-work
  - task-performance
  - research
companies:
  - arxiv
  - claude-code
  - codex
  - anthropic
  - openai
paperTitle: "From Attack Surface to Defense Architecture: Compositional Security for Agentic Coding Harnesses"
paperAuthors: "Simon Hegelich, Bardh Prenkaj, Habiba Sarhan, Morteza Shahrezaye, Kolja Hegelich, Christian Montag, Ralf Schneider, Erik Cambria"
paperYear: 2026
paperUrl: "https://arxiv.org/abs/2611.13960"
venue: "arXiv technical paper, 2611.13960, version 1 published November 10, 2026"
abstract: |
  A coding agent is useful because it can run a shell, edit a tree, and open a socket. The same three abilities are the attack. ActiveSecHarness, posted to arXiv on November 10, 2026, asks where the stop should sit: in a second model that guesses, in a regex over the command string, or in a reference monitor that checks the resource before the operating system opens it.

  The monitor is Ring 0. The name is the authors' own. It is not a CPU privilege ring. Intelligence may propose an action. It does not get to define the authority for that action. Tokens shrink when they are delegated. A label for trust and a label for sensitivity travel with files. Guards on the network, credentials, archives, and the sandbox refuse the call when the labels or the OS check fail.

  On 252 fixtures, a local qwen3:4b judge blocked every attack row and refused 118 of 120 ordinary software-engineering fixtures. Ring 0 blocked every attack row and refused none of those 120. Median time for the monitor was 12.7 microseconds. Median time for the judge was 142.3 milliseconds. A regex blacklist stopped 0.439 of the attack rows and none of the benign ones. An idealized allowlist that never hallucinates still missed 4 of 12 multi-step chains whose individual steps each stayed inside the task.
whyItMatters: |
  Harness engineering, on this site, is the loop, the tools, the permissions, and the stop rule around a frozen model. This paper takes the stop rule as the object. The model can stay capable. The claim is that capability is the wrong place to hang the check for a path, a socket, or a process.

  Two product shapes already split those jobs, and the split is easy to blur. On November 11, 2026, Claude Code's permission-mode docs describe auto mode as a second model, a classifier, reviewing actions, and describe the Bash sandbox as a separate operating-system boundary around shell commands. The sandbox page says that boundary covers shell commands only, and that file tools, MCP servers, and hooks run outside it. The same day, OpenAI's Codex sandbox page says the sandbox is the technical boundary and the approval policy is the decision to stop and ask. Automatic review, when it is on, does not change that boundary. ActiveSecHarness is a measurement of one proposed monitor on the authors' fixtures. It is not a score for either product. The useful reading is which layer caught the attack, and what that layer did to ordinary work.

  The web-agent version of the same question is the November 9 Harness Matters note: a harness can change whether an unsafe click happens, on a different surface and a different metric. HarnessFlow, posted November 4, searches a harness for a higher task score and does not score an attack. The evaluation guide on this site separates one visible action from the finished job. This paper's pair of rates is that separation, applied to a coding harness: attack block rate, and the share of benign work the same check refuses.
keyFindings:
  - "Table 4, full suite, attack block rate on 132 attack-labeled rows and false-positive rate on 120 benign fixtures, Clopper-Pearson 95% intervals as printed: Unguarded 0.000 [0.00, 0.03] and 0.000. Regex 0.439 [0.35, 0.53] and 0.000. Live LLM-judge (qwen3:4b) 1.000 [0.97, 1.00] and 0.983. ActiveSec Ring 0 1.000 [0.97, 1.00] and 0.000. Hybrid, with Ring 0 authoritative, 1.000 [0.97, 1.00] and 0.000. Section 5.3 prints the judge's false-positive count as 118 of 120, interval [0.941, 0.998], and the judge's attack-block interval as [0.972, 1.000]."
  - "Median latency in Table 4, with the 95th percentile in parentheses: Unguarded 0.1 µs (0.1 µs), Regex 6.6 µs (9.7 µs), Ring 0 12.7 µs (0.56 ms), live judge 142.3 ms (512 ms), hybrid 142.3 ms (512 ms). The paper's 11,200× figure is the judge's median divided by Ring 0's median. 142.3 milliseconds divided by 12.7 microseconds is about 11,205. Ring 0's 95th percentile, 0.56 ms, is still under the paper's 1 ms budget. The judge's 95th percentile is 512 ms."
  - "On the 120 single-step attacks alone, Section 5.2, regex blocks 50 of 120, attack block rate 0.417, interval [0.327, 0.510], and refuses none of 120 benign fixtures, interval [0.000, 0.030]. Ring 0 blocks all 120, interval [0.970, 1.000], and refuses none. Figure 3's regex rates by domain are 0.62 on living-off-the-land binaries, 0.77 on network and SSRF, 0.52 on prompt injection and the lethal trifecta, 0.25 on secrets, 0.24 on sandbox escape, and 0.18 on archives. Ring 0 is 1.00 in every domain on that figure."
  - "The two regex slices add to the full-suite rate. Fifty of 120 single-step attacks plus 8 of 12 kill chains is 58 of 132. Fifty-eight divided by 132 is 0.439 to three decimals, the rate Table 4 prints. Section 5.4 gives the kill-chain intervals: unguarded 0.000 [0.000, 0.265], regex 0.667 [0.349, 0.901], and Ring 0, the judge, and the hybrid each 1.000 [0.735, 1.000]."
  - "Table 5, 12 kill chains and 12 benign multi-step workflows, no language model in the policy: an oracle stateless task policy blocks 8 of 12 chains, attack block rate 0.667 [0.35, 0.90], and refuses 0 of 12 benign workflows [0.00, 0.26]. A one-bit taint lock blocks 12 of 12 [0.74, 1.00] and refuses 10 of 12 benign workflows, false-positive rate 0.833 [0.52, 0.98]. The product lattice plus the workspace ledger blocks 12 of 12 and passes 12 of 12. Per-step state folding at trajectory length 50 is 20.0 µs median, 20.2 µs at the 95th percentile, and 0.999 ms for the 50 steps."
  - "The hybrid does not raise the attack block rate above Ring 0. It keeps the judge's median latency, 142.3 ms, because the judge is still called on every fixture. Section 5.3 states that Ring 0, once it is the authority, absorbs the judge's false positives, and that a synchronous model on the syscall adds latency without added attack coverage on this suite."
methodology: |
  The source is arXiv 2611.13960, version 1, category cs.CR. The Atom record lists it as published November 10, 2026, at 11:52:40 UTC, and the updated time is the same. The PDF date line reads "Preprint. November 11, 2026." The arXiv comment line reads "21 pages, 3 figuers, 1 sublement." This page did not find a later version on November 11, 2026.

  The authors are Simon Hegelich, Bardh Prenkaj, Habiba Sarhan, Morteza Shahrezaye, and Kolja Hegelich, affiliated with Evercursion – GaiaLogic Unipessoal Lda.; Christian Montag, University of Macau; Ralf Schneider, Allianz Group; and Erik Cambria, Nanyang Technological University, Singapore. The PDF marks Hegelich as the corresponding author, simon.hegelich@evercursion.ai. The HTML author block repeats those affiliations.

  The suite is 120 single-step attack fixtures, 120 benign software-engineering fixtures, and 12 five-stage kill chains, 252 in total. Table 4's attack denominator is 132, the 120 attacks plus the 12 chains. The false-positive denominator in that table is the 120 benign fixtures. Experiment 1 reports the 240 single-step fixtures on their own. Table 5 is a separate 24-trajectory ablation, 12 chains and 12 benign workflows, and those 12 benign workflows are not the 120.

  Five regimes score the same call objects. Unguarded executes the call. Regex is a static blacklist of literal patterns. The live judge is Ollama qwen3:4b, one zero-shot block-or-allow decision per fixture, 252 calls in the recorded run, with decisions cached on disk. Ring 0 runs NetworkGuard, CredentialGuard, MalwareGuard, CommandDeobfuscator, and SecurityKernel, with thin adapters where the fixture does not include the full archive bytes. The hybrid asks the judge and then lets Ring 0 decide. The judge cannot override a Ring 0 allow.

  Attack block rate is the fraction of attack fixtures denied. A kill chain counts as blocked when the regime denies the chain. False-positive rate is the fraction of benign fixtures denied. Latency is wall-clock mediation time. Intervals are Clopper-Pearson exact 95% intervals. The paper says the numbers are computed from data/lotlimmune benchmark.json.

  Table 5 removes the model. The oracle policy is given the tools, binaries, workspace prefixes, and HTTPS domains the legitimate task needs, plus argument checks, and it scores each step without memory of prior steps. The authors describe it as a stand-in for Conseca at a theoretical upper bound, with no policy-generation errors. The one-bit lock taints the session after any untrusted read and then denies side-effecting calls. The product lattice tracks trust and sensitivity together, and the ledger records which agent wrote which file.
limitations:
  - "Section 7.1 says the 0.983 false-positive rate is a small-model worst case. The judge is qwen3:4b under a zero-shot block-or-allow prompt. The authors write that a frontier model, or a multi-turn policy over trusted context, would keep more single-step utility. They also write that higher single-action accuracy would not make a model a reference monitor. This page did not find a Claude, GPT, or Gemini judge in Table 4."
  - "Ring 0's 1.000 and 0.000 are deterministic checks on structured fixtures whose provenance changes at explicit boundaries, such as a summary step or a declassification step. Section 7.1 says the paper does not claim 100% task completion, or zero semantic bugs, on open-ended software engineering. When qwen3:4b is the planner, the authors say task utility still drops, and novel business-logic bugs depend on the Ring 2 reviewer."
  - "The kill-chain sample is 12. Section 5.4's interval for a perfect block rate on those 12 is [0.735, 1.000]. Table 5 prints [0.74, 1.00]. A perfect score on 12 chains leaves a wide interval. The full-suite interval, on 132 attack rows, is the tighter one, [0.97, 1.00] in the table."
  - "The single-step false-positive interval for 0 of 120 is [0.000, 0.030]. Zero refusals on this benign set is compatible with a rate as high as about 3% at the printed bound. Table 5's zero refusals are 0 of 12, interval [0.00, 0.26]."
  - "Regex, the judge, and Ring 0 are the authors' implementations on the authors' fixtures. The introduction names SWE-agent, OpenHands, and published offensive agents as the kind of harness that reuses a shell. None of those products is a row in Table 4. Claude Code and Codex, checked November 11, 2026, are not rows either."
  - "Section 5.1 says Ring 0 uses thin adapters where full archive bytes are absent. An archive result in that condition is a check against the adapter's view of the fixture, not against every byte of a live archive."
  - "The appendix says fixture JSON, figure scripts, and guard adapters ship with the accompanying benchmark artifacts. On November 11, 2026, the arXiv record linked the abstract and the PDF. This page did not find a code URL on that record."
references:
  - title: "Hegelich et al., ActiveSecHarness (arXiv:2611.13960)"
    url: "https://arxiv.org/abs/2611.13960"
  - title: "HTML version of the paper"
    url: "https://arxiv.org/html/2611.13960"
  - title: "PDF of the paper"
    url: "https://arxiv.org/pdf/2611.13960"
  - title: "Claude Code, permission modes"
    url: "https://code.claude.com/docs/en/permission-modes"
    note: "Read November 11, 2026. Auto mode is a classifier reviewing actions. It is not a row in this paper."
  - title: "Claude Code, sandboxed Bash tool"
    url: "https://code.claude.com/docs/en/sandboxing"
    note: "Read November 11, 2026. The sandbox is an operating-system boundary around shell commands. File tools, MCP servers, and hooks run outside it. The sandbox is off by default."
  - title: "Claude Code changelog"
    url: "https://code.claude.com/docs/en/changelog"
    note: "Read November 11, 2026. The newest entry on the page was 2.1.322, dated November 10, 2026."
  - title: "OpenAI, Codex sandbox"
    url: "https://developers.openai.com/codex/concepts/sandboxing"
    note: "Read November 11, 2026. Sandbox and approval are separate controls. Automatic review does not move the sandbox boundary."
  - title: "Zhu et al., HarnessSecurity-Bench (arXiv:2610.07639)"
    url: "https://arxiv.org/abs/2610.07639"
    note: "Atom published time October 6, 2026, 02:34:53 UTC. Abstract read November 11, 2026. Measures six shipping harnesses, including Claude Code and Codex CLI. A different suite from ActiveSecHarness."
  - title: "Debenedetti et al., AgentDojo (arXiv:2406.13352)"
    url: "https://arxiv.org/abs/2406.13352"
    note: "Cited by ActiveSecHarness for joint measurement of utility and security under tool-calling agents."
  - title: "Tsai and Bagdasarian, Contextual agent security (arXiv:2501.17070)"
    url: "https://arxiv.org/abs/2501.17070"
    note: "HotOS 2025. The PDF cites this as Conseca. Table 5's oracle is the authors' stateless upper bound in that style, not a rerun of the HotOS system."
  - title: "Debenedetti et al., CaMeL (arXiv:2503.18813)"
    url: "https://arxiv.org/abs/2503.18813"
    note: "Cited by ActiveSecHarness as Defeating prompt injections by design, 2025."
citation:
  apa: "Hegelich, S., Prenkaj, B., Sarhan, H., Shahrezaye, M., Hegelich, K., Montag, C., Schneider, R., & Cambria, E. (2026, November 10). From attack surface to defense architecture: Compositional security for agentic coding harnesses. arXiv:2611.13960."
  bibtex: |
    @article{hegelich2026activesec,
      title={From Attack Surface to Defense Architecture: Compositional Security for Agentic Coding Harnesses},
      author={Hegelich, Simon and Prenkaj, Bardh and Sarhan, Habiba and Shahrezaye, Morteza and Hegelich, Kolja and Montag, Christian and Schneider, Ralf and Cambria, Erik},
      journal={arXiv preprint arXiv:2611.13960},
      year={2026},
      url={https://arxiv.org/abs/2611.13960}
    }
faq:
  - question: "What is ActiveSecHarness?"
    answer: "A design for the stop rule inside a coding-agent harness. The model may propose a shell command, a file write, or a network call. Ring 0, a reference monitor, decides whether that call is allowed. The paper uses four rings as a naming scheme for trust and authority. Ring 0 is the monitor. It is not a CPU privilege level. Tokens can only shrink when work is delegated, and files carry a trust label and a sensitivity label."
  - question: "When was the paper released, and who wrote it?"
    answer: "arXiv lists version 1 as published November 10, 2026, at 11:52:40 UTC, in cs.CR. The PDF date line says November 11, 2026. The authors are Simon Hegelich, Bardh Prenkaj, Habiba Sarhan, Morteza Shahrezaye, Kolja Hegelich, Christian Montag, Ralf Schneider, and Erik Cambria. Hegelich is the corresponding author, at Evercursion. Cambria is listed at Nanyang Technological University. This breakdown was published November 11, 2026."
  - question: "What did the 4B judge refuse?"
    answer: "On the main suite it refused 118 of 120 benign software-engineering fixtures, a false-positive rate of 0.983, interval [0.941, 0.998]. It also blocked every attack row, 132 of 132 in Table 4's denominator. The model is Ollama qwen3:4b, one zero-shot block-or-allow call per fixture. Section 7.1 calls this a small-model worst case and says a frontier judge would refuse less ordinary work. That frontier judge is not in the table."
  - question: "Did Ring 0 block the attacks without blocking the work?"
    answer: "On these fixtures, yes. Table 4 gives Ring 0 an attack block rate of 1.000 and a false-positive rate of 0.000, at a median 12.7 microseconds, with a 95th percentile of 0.56 milliseconds. The single-step slice is 120 of 120 attacks and 0 of 120 benign fixtures. The separate 12-and-12 trajectory test is also 12 blocked and 12 passed. The intervals on the 12-chain slice are wide. Section 7.1 limits the claim to structured fixtures, not to open-ended engineering."
  - question: "How does this compare with Claude Code and Codex on November 11, 2026?"
    answer: "It does not score them. Claude Code's docs, read that day, separate a classifier in auto mode from an operating-system sandbox around Bash, PowerShell, and Monitor commands. The sandbox page says file tools, MCP servers, and hooks run outside that sandbox, and that the sandbox is off by default. Codex's sandbox page separates the sandbox boundary from the approval policy, and says automatic review does not change the boundary. ActiveSecHarness's judge is qwen3:4b on the authors' fixtures. Reading 0.983 as Claude's classifier, or 0.000 as Codex's sandbox, adds a comparison the table does not contain."
  - question: "Where is the paper, and is there code?"
    answer: "The record is arXiv 2611.13960. The abstract page, the HTML version, and the PDF are linked in the references. The appendix says fixture JSON, figure scripts, and guard adapters ship with the benchmark artifacts. On November 11, 2026, this page did not find a repository linked from the arXiv record."
---

## A judge that stops every attack can still stop the job

The number that changes a harness design is the pair, not the attack rate alone. Table 4 scores five ways of mediating the same calls. Attack block rate uses 132 attack-labeled rows, the 120 single-step attacks plus 12 kill chains. The false-positive rate uses 120 benign software-engineering fixtures. Intervals in the table are the paper's printed Clopper-Pearson bounds, rounded to two decimals.

| Regime | Attack block rate | Interval | False-positive rate | Median latency (95th) |
| --- | --- | --- | --- | --- |
| Unguarded | 0.000 | [0.00, 0.03] | 0.000 | 0.1 µs (0.1 µs) |
| Regex | 0.439 | [0.35, 0.53] | 0.000 | 6.6 µs (9.7 µs) |
| Live judge, qwen3:4b | 1.000 | [0.97, 1.00] | 0.983 | 142.3 ms (512 ms) |
| Ring 0 | 1.000 | [0.97, 1.00] | 0.000 | 12.7 µs (0.56 ms) |
| Hybrid, Ring 0 decides | 1.000 | [0.97, 1.00] | 0.000 | 142.3 ms (512 ms) |

Section 5.3 prints the judge's refusal as 118 of 120, interval [0.941, 0.998]. One hundred eighteen divided by 120 is 0.9833, which the paper records as 0.983 and, in the abstract, as 98.3% of benign SWE work. The same section prints the judge's attack-block interval as [0.972, 1.000]. The table rounds that bound.

The speedup is the same two medians. Ring 0 takes 12.7 microseconds. The judge takes 142.3 milliseconds. Dividing the second by the first gives about 11,205. The paper states 11,200×. The tail is a different fact. Ring 0's 95th percentile is 0.56 milliseconds, about 44 times its median, and still under the 1 millisecond budget the paper draws on Figure 2. The judge's 95th percentile is 512 milliseconds. The hybrid copies Ring 0's decisions and the judge's clock, because the judge still runs.

Unguarded is the bottom of the table on purpose. The paper calls that regime YOLO. It blocks nothing. A coding harness that treats a shell string as already authorized is that row.

## What a command-string blacklist leaves through

Regex is fast and, on this suite, harmless to the benign fixtures. It is also the regime that lets more than half the attack rows through. Table 4's 0.439 is the full denominator. Section 5.2 isolates the 120 single-step attacks: regex blocks 50, rate 0.417, interval [0.327, 0.510], and refuses 0 of 120 benign fixtures, interval [0.000, 0.030]. Section 5.4 scores the 12 chains on their own: regex blocks 8, rate 0.667, interval [0.349, 0.901]. Fifty plus 8 is 58. One hundred twenty plus 12 is 132. Fifty-eight divided by 132 is 0.439 to three decimals. That is the check that the two slices are the table's rate, not a second experiment.

Figure 3 shows where the string check is thin. Regex attack block rate is 0.77 on network and SSRF fixtures, 0.62 on living-off-the-land binaries, and 0.52 on the prompt-injection and lethal-trifecta domain. It is 0.25 on secrets, 0.24 on sandbox escape, and 0.18 on archives. Ring 0 is 1.00 in each of those six domains on the same figure, with a false-positive rate of 0.00. The paper's point is structural. A pattern over one command string does not see an archive member, a label that moved onto a file, or a socket whose address was resolved after the string was checked.

The domains are a checklist, not a procedure. Domain A is misuse of programs already on the machine, and of the harness's own policy files. Domain B is hostile archives and encodings. Domain C is network calls that reach somewhere the string did not name. Domain D is credentials. Domain E is leaving the workspace. Domain F is instructions that arrive inside retrieved content, including a handoff between agents. Table 1 in the paper maps the older names, symlink races, path traversal, credential exposure, build hooks, onto the requirement that is supposed to stop them. Complete mediation, resource containment, information-flow control, and temporal integrity are those requirements. The empirical claim is that Ring 0 implements them as guards, and that the regex does not.

## An allowlist with no model still misses 4 of 12 chains

A fair objection to Table 4 is that qwen3:4b is a weak gate. Section 7.1 agrees. The authors call 0.983 a small-model worst case and write that a frontier model would keep more single-step utility. They then remove the model.

Table 5 scores 12 five-stage kill chains and 12 five-stage benign workflows with three policies that do not call a language model. The oracle is handed the exact tools, binaries, workspace prefixes, and HTTPS domains the legitimate task needs. It checks each step on its own, with no memory of earlier steps. The paper presents it as Conseca at a theoretical ceiling: no hallucinated policy. That oracle refuses 0 of 12 benign workflows, interval [0.00, 0.26], and blocks 8 of 12 chains, attack block rate 0.667, interval [0.35, 0.90]. The 4 misses are chains in which every individual step sits inside the task's allowlist. The harm is the composition. An archive extraction stays in the workspace and still carries a member that escapes the destination tree. A write stays in scope and carries bytes that are not what the name suggests. Untrusted text leads to a shell binary the task already allowed. One agent writes a file and another agent, reading that file, reaches an allowlisted network destination.

A one-bit taint lock closes those 4 and blocks all 12 chains, interval [0.74, 1.00]. It also refuses 10 of 12 benign workflows, false-positive rate 0.833, interval [0.52, 0.98]. The paper says the 2 that survive are offline local refactors. The 10 that die start by reading an issue, a review, a crash log, a webhook, or a patch, and then try to edit or run a test. Any coding agent that begins from a GitHub issue is on the wrong side of a one-bit flag.

The product lattice is the authors' repair for that pair of failures. Trust has four levels, from trusted up to untrusted. Sensitivity has two, public and sensitive. Reading an issue can move the flow to a derived, public label that still permits an isolated test, while an arbitrary shell and a network send stay closed. A shared file keeps the writer's label, so the second agent does not get a clean read. Table 5 reports 12 of 12 chains blocked and 12 of 12 benign workflows passed. Per-step cost of folding that state stays flat as the trajectory grows. The paper prints 22.0, 20.5, 19.6, 20.2, and 20.0 microseconds at lengths 1, 5, 10, 25, and 50. At length 50 the 95th percentile is 20.2 microseconds per step, and 50 steps cost 0.999 milliseconds.

The intervals on 12 items are the reason to stay calm about the word "all." A perfect block rate on 12 chains has a printed lower bound of 0.74 in Table 5 and 0.735 in the prose of Section 5.4. The full suite, 132 attack rows, is the result with the narrower bound.

## Where Claude Code and Codex already split the job

Checked on November 11, 2026, the shipping harnesses already use two different mechanisms, and they do not use this paper's monitor.

[Claude Code's permission modes](https://code.claude.com/docs/en/permission-modes) say that in auto mode a second model, the classifier, reviews actions. With version 2.1.283 or later, auto mode is the built-in starting mode for interactive terminal and VS Code sessions. The [changelog](https://code.claude.com/docs/en/changelog) showed 2.1.322 as the newest entry, dated November 10, 2026. The [Bash sandbox](https://code.claude.com/docs/en/sandboxing) is a different control. The page says the operating system enforces the boundary, on macOS with Seatbelt and on Linux and WSL2 with bubblewrap and socat, and that native Windows runs commands unsandboxed. It also says the sandbox covers shell commands only, that file tools, MCP servers, and hooks run outside it, and that the sandbox is off by default. Auto-allow, inside the sandbox, skips the prompt for sandboxed commands. Commands that match an exclusion, and retries the model asks to run unsandboxed, leave that boundary.

[Codex's sandbox page](https://developers.openai.com/codex/concepts/sandboxing) draws the same line in different words. The sandbox is the technical boundary. The approval policy decides when the agent must stop. Workspace-write is described as the default low-friction local mode: read, edit inside the workspace, run routine local commands. Danger-full-access removes the filesystem and network boundaries. Automatic review can answer an approval request. The page says that review does not change the sandbox boundary. On macOS the enforcement is Seatbelt. On Linux and WSL2 it is bubblewrap.

Those docs are the current product description. They are not a measurement of attack block rate, and ActiveSecHarness did not run them. The architectural rhyme is still useful. Claude's classifier and Codex's automatic reviewer sit where this paper's judge sits: a model asked whether an action is allowed. Claude's Bash sandbox and Codex's workspace sandbox sit closer to Ring 0: an operating-system boundary that does not depend on the model guessing. The gap the paper is aimed at is visible in Claude's own sentence. File tools, MCP servers, and hooks are outside the Bash sandbox. A monitor that only wraps the shell has not mediated every way the harness touches the machine.

Two published numbers from other suites belong next to this table so the 1.000 is not asked to do their job. [HarnessSecurity-Bench](https://arxiv.org/abs/2610.07639), arXiv 2610.07639, version 1 on October 6, 2026, evaluates six shipping harnesses, including Claude Code and Codex CLI, on 23 tasks. Its abstract, read November 11, says that under GLM-5.2, enabling auto-approve raised attack success from 29.2% to 95.6%. Command allowlisting and command denylisting reduced attack effects, the first with a small utility loss and the second with a utility gain. That is a measurement of product settings on that benchmark's tasks. It is not a row that can be subtracted from Table 4.

[Harness Matters](/research/harness-matters-web-agent-security), posted November 9, measures web-agent harnesses. Its open-source overall attack success rate is 32.55% after capability failures are excluded. The surface is a browser, the metric drops failed tasks out of the denominator, and the harnesses are Browser Use, Skyvern, Agent-E, and SeeAct. A coding-harness monitor that scores 1.000 on shell fixtures does not move that web rate.

[HarnessFlow](/research/harnessflow-mcts-harness-optimization) searches an executable harness for a higher task score. With 15 attempts per benchmark and GPT-5.4-mini, the selected harnesses average 69.48%. That search grades success on held-out tasks. It does not grade whether a denied call was an attack. A harness can win a task table and still be the unguarded row here. The [evaluation guide](/blog/how-do-you-evaluate-an-ai-agent-harness) is the method that keeps those questions apart: one visible action, then the whole job. ActiveSecHarness reports the action. It does not report the job's resolution rate.

## What to change in a harness you already run

Buy the pair of rates. An attack block rate of 1.000 with a false-positive rate of 0.983 means the check stopped the suite by stopping the work. Anyone shipping a classifier, in auto mode or as an "approve for me" reviewer, should ask for the benign-work refusal rate on their own tasks before treating the block rate as a security result. This paper's answer for a 4B zero-shot judge is 118 of 120. A frontier classifier can do better than that and still be the wrong object to trust with a path check. The oracle in Table 5 is the evidence for that second sentence: with no model error at all, a stateless allowlist missed 4 of 12 chains.

Put the deterministic check on the resource, and keep it on when the model is allowed to run. Ring 0's median is 12.7 microseconds, so the latency argument for skipping the check is weak on this paper's clock. The latency argument against a synchronous judge is the one the table supports: 142.3 milliseconds per fixture, and no gain in attack block rate once Ring 0 already decides. If a product already has an OS sandbox, turn it on and read the list of tools that sit outside it. On Claude Code, as of November 11, that list includes file tools, MCP servers, and hooks, and the sandbox ships off.

Do not replace a lattice with a single tainted bit. The one-bit lock in Table 5 is what a "after you read the issue, you may not write or run tests" rule does. It blocked every chain in the small set and 10 of 12 ordinary issue-driven workflows. Issue-driven work is the ordinary case for a coding agent.

Treat 1.000 and 0.000 as a statement about these fixtures. The guards were written for the invariants in the suite. Section 5.1 says some archive checks run through thin adapters because the fixture lacks the bytes. Section 7.1 says a small model used as the planner still fails tasks, and that business-logic bugs fall to a reviewer whose quality scales with the model. A buyer who needs a resolution rate on SWE-bench should read a task paper. A buyer who needs to know whether the shell, the file tool, and the MCP server share one authority check will not find that answer in a SWE-bench score.

The monitor is the kind of component a harness can ship without waiting for a lab to release weights. The paper's own release does not yet include a linked repository. Until the fixtures and the guards are public, Table 4 is the authors' report of their file `data/lotlimmune benchmark.json`.

## Read the paper

The November 10 record, the two product docs checked the next day, and the October benchmark of shipping harnesses:

- [ActiveSecHarness on arXiv](https://arxiv.org/abs/2611.13960)
- [HTML](https://arxiv.org/html/2611.13960)
- [PDF](https://arxiv.org/pdf/2611.13960)
- [Claude Code permission modes](https://code.claude.com/docs/en/permission-modes)
- [Claude Code sandbox](https://code.claude.com/docs/en/sandboxing)
- [Codex sandbox](https://developers.openai.com/codex/concepts/sandboxing)
- [HarnessSecurity-Bench](https://arxiv.org/abs/2610.07639)

Related pages on this site: [agent harnesses hub](/topics/harnesses), [how agents work](/topics/how-agents-work), [task performance](/topics/task-performance), [research](/topics/research), [Harness Matters](/research/harness-matters-web-agent-security), [HarnessFlow](/research/harnessflow-mcts-harness-optimization), [What is an AI agent harness?](/blog/what-is-an-ai-agent-harness), [How do you evaluate an AI agent harness?](/blog/how-do-you-evaluate-an-ai-agent-harness), [harness](/glossary/harness), [harness engineering](/glossary/harness-engineering), [guardrail](/glossary/guardrail), [tool use](/glossary/tool-use), and the [November harness benchmark](/reports/agent-harness-benchmark-november-2026).
