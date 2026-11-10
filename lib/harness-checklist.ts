export const path = "/tools/ai-agent-harness-evaluation-checklist";
export const title = "AI agent harness evaluation checklist: twelve sourced checks";
export const description =
  "Twelve yes-or-no checks for an AI agent harness, each tied to a public post or board. The count stays in the browser. It is not a SWE-bench or Terminal-Bench score.";
export const readOn = "2026-11-10";

export type ChecklistItem = {
  id: string;
  prompt: string;
  sourceSays: string;
  sourceName: string;
  sourceUrl: string;
};

export type ChecklistGroup = {
  id: string;
  heading: string;
  answer: string;
  items: ChecklistItem[];
};

const google =
  "https://developers.googleblog.com/en/the-anatomy-of-harness-engineering-how-to-evaluate-iterate-and-guard-ai-coding-agents/";
const nvidia =
  "https://developer.nvidia.com/blog/use-nvidia-nemo-to-turn-agent-failures-into-tests-and-harness-fixes/";
const anthropic = "https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents";
const swebench = "https://www.swebench.com/";
const terminal = "https://www.tbench.ai/";

export const checklistGroups: ChecklistGroup[] = [
  {
    id: "before-a-board",
    heading: "What do you check before you quote a public board?",
    answer:
      "Dogfood first, write one check for an action you can see, and keep an end-to-end destination suite.",
    items: [
      {
        id: "dogfood",
        prompt: "The agent can already do routine work in its own codebase.",
        sourceSays:
          "Google’s September 9, 2026 post says evaluations belong after dogfooding. Until the agent can handle routine work in its own codebase, a suite is early.",
        sourceName: "Google Developers Blog, September 9, 2026",
        sourceUrl: google,
      },
      {
        id: "one-action",
        prompt:
          "You have a written check for one observable action, such as a clarifying question, a validator before “done,” or a canonical link.",
        sourceSays:
          "The same post treats those three actions as behavioral checks. The check reads a step in the trace, rather than a final paragraph.",
        sourceName: "Google Developers Blog, September 9, 2026",
        sourceUrl: google,
      },
      {
        id: "destination",
        prompt: "You still keep an end-to-end suite as the destination score.",
        sourceSays:
          "Google says behavioral checks and end-to-end suites are complementary. Macro benchmarks verify the destination. Behavioral checks are the partner you use while you change the harness.",
        sourceName: "Google Developers Blog, September 9, 2026",
        sourceUrl: google,
      },
    ],
  },
  {
    id: "accept-a-change",
    heading: "When can you accept a change to the harness?",
    answer:
      "Start from a stored failure, change one part, and require the held-out tasks to improve as well.",
    items: [
      {
        id: "stored-failure",
        prompt: "The test started from a stored trace or a failure you can point at.",
        sourceSays:
          "NVIDIA’s November 4, 2026 walkthrough points NeMo Compass at stored traces, then writes Harbor tasks for a failure the traces already show: a send without confirmation.",
        sourceName: "NVIDIA Technical Blog, November 4, 2026",
        sourceUrl: nvidia,
      },
      {
        id: "one-change",
        prompt: "The edit you are judging changes one part of the harness.",
        sourceSays:
          "In that walkthrough the harness edit is one instruction change, in Hermes SOUL.md. The post’s closing step is to try one change, then rerun the tests.",
        sourceName: "NVIDIA Technical Blog, November 4, 2026",
        sourceUrl: nvidia,
      },
      {
        id: "held-out",
        prompt:
          "Some tasks were hidden from whoever proposed the edit, and you accept the change only when the development tasks and the held-out tasks both improve.",
        sourceSays:
          "NVIDIA withheld two of four Harbor tasks from the coding agents that proposed the edit, and says to accept a change only when it improves both the test cases and the held-out set.",
        sourceName: "NVIDIA Technical Blog, November 4, 2026",
        sourceUrl: nvidia,
      },
    ],
  },
  {
    id: "trial",
    heading: "What keeps a trial from lying?",
    answer: "A clean environment, a written grader, and a task that states everything the grader checks.",
    items: [
      {
        id: "clean-environment",
        prompt: "Each trial starts from a clean environment.",
        sourceSays:
          "Anthropic’s January 9, 2026 post says each trial should be isolated. In internal evals, Claude gained an advantage by reading git history left by earlier trials.",
        sourceName: "Anthropic, January 9, 2026",
        sourceUrl: anthropic,
      },
      {
        id: "grader",
        prompt: "A grader is written down, and it scores a transcript or the environment’s final state.",
        sourceSays:
          "Anthropic defines a grader as logic that scores some aspect of performance, a transcript as the full record of the trial, and an outcome as the final state in the environment. A last sentence that says the job is done is not the outcome.",
        sourceName: "Anthropic, January 9, 2026",
        sourceUrl: anthropic,
      },
      {
        id: "spec",
        prompt: "The task states everything the grader checks, and a reference solution passes those checks.",
        sourceSays:
          "Anthropic says agents should not fail because a filepath or another detail was missing from the task, and that a reference solution should pass the graders so you know the task is solvable.",
        sourceName: "Anthropic, January 9, 2026",
        sourceUrl: anthropic,
      },
    ],
  },
  {
    id: "public-score",
    heading: "How do you read a public harness score?",
    answer: "Name the harness, keep the date on the source, and keep unlike boards in separate columns.",
    items: [
      {
        id: "name-the-harness",
        prompt: "Any score you repeat names the harness on the same row.",
        sourceSays:
          "The November 2026 harness benchmark copies the harness column from the official SWE-bench and Terminal-Bench boards. A percent without that column is a different claim.",
        sourceName: "AI Agents Info, November 2026 harness benchmark",
        sourceUrl: "/reports/agent-harness-benchmark-november-2026",
      },
      {
        id: "keep-the-date",
        prompt: "You kept the date printed on the official source next to the number.",
        sourceSays:
          "That benchmark stores each result date. The Terminal-Bench 4.0 board record it copied says the board was updated 2026-10-23. The page was read November 8, 2026.",
        sourceName: "Terminal-Bench and the November 2026 harness benchmark",
        sourceUrl: terminal,
      },
      {
        id: "do-not-merge-boards",
        prompt:
          "You kept SWE-bench release 1.x and release 2.x apart, and you read Terminal-Bench accuracy with its uncertainty. Cost stays its own cell.",
        sourceSays:
          "This site’s November 2026 harness benchmark, reading swebench.com, says release 2.x calls tools while release 1.x reads the action out of the model’s text, and that those generations are not necessarily comparable. Terminal-Bench publishes accuracy with a 95% half-width. The benchmark copies cost as its own field.",
        sourceName: "SWE-bench, Terminal-Bench, and the November 2026 harness benchmark",
        sourceUrl: swebench,
      },
    ],
  },
];

export const checklistItems = checklistGroups.flatMap((group) => group.items);

export const checklistSources = [
  { name: "Taylor Mullen and Christian Gunderman, Google Developers Blog, September 9, 2026", url: google },
  { name: "Patrick Moorhead, Sean Lopp, and Moon Chung, NVIDIA Technical Blog, November 4, 2026", url: nvidia },
  { name: "Anthropic, Demystifying evals for AI agents, January 9, 2026", url: anthropic },
  { name: "SWE-bench leaderboard", url: swebench },
  { name: "Terminal-Bench", url: terminal },
  {
    name: "AI Agents Info, November 2026 agent harness benchmark, read November 8, 2026",
    url: "/reports/agent-harness-benchmark-november-2026",
  },
];
