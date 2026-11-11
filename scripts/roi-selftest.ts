import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { thirtyDayCost, modelById } from "../lib/model-prices";
import {
  calculateRoi,
  formatBreakEven,
  formatPayback,
  formatRoi,
  formatUsd,
  inputFromFields,
  presetFields,
  reviewMinutesAtZeroNet,
  roiCsv,
  roiMarkdown,
  roiPath,
  roiPresets,
  sensitivityTable,
  successPercentAtZeroNet,
  supportTriagePreset,
  type RoiInput,
} from "../lib/tools/roi";

function close(actual: number, expected: number, label: string) {
  const gap = Math.abs(actual - expected);
  const scale = Math.max(1, Math.abs(expected));
  assert.ok(gap <= 1e-6 * scale, `${label}: ${actual} vs ${expected}`);
}

function must(result: ReturnType<typeof calculateRoi>) {
  if (!result.ok) assert.fail(result.message);
  return result;
}

const support = must(calculateRoi(supportTriagePreset.input));
close(support.baselineHours, 800 / 3, "support baseline hours");
close(support.baselineHumanCost, 12000, "support baseline cost");
close(support.agentHumanHours, 120, "support agent hours");
close(support.agentHumanCost, 5400, "support agent human cost");
close(support.hoursSaved, 440 / 3, "support hours saved");
close(support.monthlyAgentCost, 230, "support agent bill");
close(support.monthlyNet, 6370, "support net");
close(support.annualRoiPercent ?? NaN, (74440 / 4760) * 100, "support ROI");
assert.equal(support.payback.kind, "months");
if (support.payback.kind === "months") close(support.payback.months, 2000 / 6370, "support payback");
assert.equal(support.breakEven.kind, "tasks");
if (support.breakEven.kind === "tasks") close(support.breakEven.tasks, 150 / 3.26, "support break-even");
assert.equal(support.verdict, "pays-back");
assert.equal(support.largestDrag?.id, "review");
close(support.largestDrag?.dollars ?? NaN, 3000, "review drag");
assert.equal(formatUsd(support.monthlyNet), "$6,370.00");
assert.equal(formatRoi(support.annualRoiPercent), "1,563.9%");
assert.equal(formatPayback(support.payback), "0.31 months");
assert.equal(formatBreakEven(support.breakEven), "46.0 tasks/month");

const zeroSetup = must(calculateRoi({ ...supportTriagePreset.input, setupCost: 0 }));
assert.equal(zeroSetup.payback.kind, "immediate");
assert.equal(zeroSetup.verdict, "pays-back");
close(zeroSetup.annualRoiPercent ?? NaN, (6370 / 230) * 100, "zero setup ROI");
assert.equal(formatPayback(zeroSetup.payback), "Immediate");
assert.equal(formatRoi(zeroSetup.annualRoiPercent), "2,769.6%");

const losingInput: RoiInput = {
  tasksPerMonth: 500,
  minutesPerTask: 6,
  hourlyCost: 40,
  agentCostPerTask: 1.5,
  successPercent: 50,
  reviewMinutes: 5,
  reworkMinutes: 12,
  setupCost: 4000,
  platformCost: 300,
};
const losing = must(calculateRoi(losingInput));
close(losing.monthlyNet, 2000 - (5500 / 60) * 40 - 1050, "losing net");
assert.ok(losing.monthlyNet < 0);
assert.equal(losing.payback.kind, "never");
assert.equal(losing.breakEven.kind, "none");
assert.equal(losing.verdict, "loses");
assert.equal(formatPayback(losing.payback), "Never pays back");

const losingNoSetup = must(calculateRoi({ ...losingInput, setupCost: 0 }));
assert.equal(losingNoSetup.payback.kind, "immediate");
assert.equal(losingNoSetup.verdict, "loses");

const fullSuccess = must(
  calculateRoi({
    tasksPerMonth: 1000,
    minutesPerTask: 10,
    hourlyCost: 60,
    agentCostPerTask: 0.1,
    successPercent: 100,
    reviewMinutes: 1,
    reworkMinutes: 0,
    setupCost: 1200,
    platformCost: 50,
  }),
);
const ignoredRework = must(
  calculateRoi({
    tasksPerMonth: 1000,
    minutesPerTask: 10,
    hourlyCost: 60,
    agentCostPerTask: 0.1,
    successPercent: 100,
    reviewMinutes: 1,
    reworkMinutes: 45,
    setupCost: 1200,
    platformCost: 50,
  }),
);
close(fullSuccess.agentHumanHours, ignoredRework.agentHumanHours, "rework ignored at 100%");
close(fullSuccess.reworkHours, 0, "rework hours");
close(fullSuccess.monthlyNet, 8850, "full success net");
close(fullSuccess.annualRoiPercent ?? NaN, 3500, "full success ROI");
assert.equal(fullSuccess.payback.kind, "months");
if (fullSuccess.payback.kind === "months") close(fullSuccess.payback.months, 1200 / 8850, "full success payback");
assert.equal(fullSuccess.breakEven.kind, "tasks");
if (fullSuccess.breakEven.kind === "tasks") close(fullSuccess.breakEven.tasks, 50 / 8.9, "full success break-even");

const large = must(
  calculateRoi({
    tasksPerMonth: 100_000,
    minutesPerTask: 4,
    hourlyCost: 30,
    agentCostPerTask: 0.02,
    successPercent: 90,
    reviewMinutes: 0.5,
    reworkMinutes: 4,
    setupCost: 10_000,
    platformCost: 500,
  }),
);
close(large.baselineHumanCost, 200_000, "large baseline");
close(large.agentHumanCost, 45_000, "large human");
close(large.monthlyAgentCost, 2500, "large agent bill");
close(large.monthlyNet, 152_500, "large net");
close(large.annualRoiPercent ?? NaN, 4550, "large ROI");
assert.equal(large.payback.kind, "months");
if (large.payback.kind === "months") close(large.payback.months, 10_000 / 152_500, "large payback");
assert.equal(large.breakEven.kind, "tasks");
if (large.breakEven.kind === "tasks") close(large.breakEven.tasks, 500 / 1.53, "large break-even");
assert.equal(large.verdict, "pays-back");

const noSpend = must(
  calculateRoi({
    tasksPerMonth: 10,
    minutesPerTask: 30,
    hourlyCost: 50,
    agentCostPerTask: 0,
    successPercent: 100,
    reviewMinutes: 0,
    reworkMinutes: 0,
    setupCost: 0,
    platformCost: 0,
  }),
);
assert.equal(noSpend.annualRoiPercent, null);
assert.equal(formatRoi(noSpend.annualRoiPercent), "Not defined");
assert.equal(noSpend.payback.kind, "immediate");
assert.equal(noSpend.verdict, "pays-back");
close(noSpend.monthlyNet, 250, "no spend net");

const marginal = must(calculateRoi({ ...supportTriagePreset.input, setupCost: 80_000 }));
assert.equal(marginal.verdict, "marginal");
assert.equal(marginal.payback.kind, "months");
if (marginal.payback.kind === "months") assert.ok(marginal.payback.months > 12);

const reviewFlip = reviewMinutesAtZeroNet(supportTriagePreset.input);
assert.ok(reviewFlip != null);
close(reviewFlip ?? NaN, 937 / 150, "review at zero net");
const atReview = must(calculateRoi({ ...supportTriagePreset.input, reviewMinutes: reviewFlip ?? 0 }));
close(atReview.monthlyNet, 0, "net at solved review");
const at625 = must(calculateRoi({ ...supportTriagePreset.input, reviewMinutes: 6.25 }));
close(at625.monthlyNet, -5, "net at 6.25 review");
assert.equal(formatUsd(at625.monthlyNet), "-$5.00");
assert.equal(at625.verdict, "loses");

const successFlip = successPercentAtZeroNet(supportTriagePreset.input);
assert.ok(successFlip != null);
const atSuccess = must(calculateRoi({ ...supportTriagePreset.input, successPercent: successFlip ?? 0 }));
close(atSuccess.monthlyNet, 0, "net at solved success");
const at27 = must(calculateRoi({ ...supportTriagePreset.input, successPercent: 27 }));
const at26 = must(calculateRoi({ ...supportTriagePreset.input, successPercent: 26 }));
close(at27.monthlyNet, 10, "net at 27%");
close(at26.monthlyNet, -110, "net at 26%");

const priced = thirtyDayCost(modelById("gpt-5"), 4000, 800, 1);
assert.ok(priced);
close(priced?.perTask ?? NaN, 0.013, "gpt-5 per task");
const swapped = must(calculateRoi({ ...supportTriagePreset.input, agentCostPerTask: priced?.perTask ?? 0 }));
close(swapped.monthlyNet, 6424, "swapped token price net");
assert.equal(formatUsd(swapped.monthlyNet), "$6,424.00");

const heavyReview = must(calculateRoi({ ...supportTriagePreset.input, reviewMinutes: 6 }));
close(heavyReview.monthlyNet, 370, "review 6 at 80%");
const heavyLow = must(calculateRoi({ ...supportTriagePreset.input, reviewMinutes: 6, successPercent: 60 }));
close(heavyLow.monthlyNet, -2030, "review 6 at 60%");

assert.equal(formatUsd(0.013), "$0.013");
assert.equal(formatUsd(0.04), "$0.04");
assert.equal(formatPayback(heavyReview.payback), "5.41 months");

const table = sensitivityTable(supportTriagePreset.input);
assert.deepEqual(
  table.map((row) => row.successPercent),
  [60, 65, 70, 75, 80, 85, 90, 95],
);
const expectedNets = [3970, 4570, 5170, 5770, 6370, 6970, 7570, 8170];
table.forEach((row, index) => {
  assert.equal(row.result.ok, true);
  if (row.result.ok) close(row.result.monthlyNet, expectedNets[index], `sensitivity ${row.successPercent}`);
});
const row80 = table.find((row) => row.successPercent === 80);
assert.ok(row80?.result.ok);
if (row80?.result.ok) {
  assert.equal(formatRoi(row80.result.annualRoiPercent), "1,563.9%");
  assert.equal(formatPayback(row80.result.payback), "0.31 months");
}
assert.equal(formatRoi(table[0].result.ok ? table[0].result.annualRoiPercent : null), "958.8%");
assert.equal(formatPayback(table[0].result.ok ? table[0].result.payback : { kind: "never" }), "0.50 months");

assert.equal(calculateRoi({ ...supportTriagePreset.input, successPercent: 101 }).ok, false);
assert.equal(calculateRoi({ ...supportTriagePreset.input, tasksPerMonth: -1 }).ok, false);
assert.equal(calculateRoi({ ...supportTriagePreset.input, hourlyCost: Number.NaN }).ok, false);

const roundTrip = inputFromFields(presetFields(supportTriagePreset.input));
assert.ok(!("error" in roundTrip));
if (!("error" in roundTrip)) {
  assert.deepEqual(roundTrip, supportTriagePreset.input);
  assert.equal(
    roiPath(roundTrip),
    "/tools/ai-agent-roi-calculator?tasks=2000&minutes=8&rate=45&agent=0.04&success=80&review=2&rework=8&setup=2000&platform=150",
  );
}

const markdown = roiMarkdown(support, `https://www.aiagentsinfo.com${roiPath(supportTriagePreset.input)}`);
assert.ok(markdown.includes("$6,370.00"));
assert.ok(markdown.includes("1,563.9%"));
assert.ok(markdown.includes("(12 × monthly net − setup) / (setup + 12 × monthly agent cost) × 100"));
const csv = roiCsv(support);
assert.ok(csv.includes("monthly_net_savings_usd,6370"));
assert.ok(csv.includes("success_percent,monthly_net_usd,annual_roi_percent,payback"));
assert.equal(roiPresets.length, 4);

const article = readFileSync(
  join(process.cwd(), "content/blog/does-a-support-triage-agent-pay-back.md"),
  "utf8",
);
const share = roiPath(supportTriagePreset.input);
assert.ok(article.includes(share), "article missing prefilled calculator URL");
for (const needle of ["$6,370.00", "0.31 months", "1,563.9%", "46.0", "-$5.00", "$6,424.00", "$370.00", "-$2,030.00", "5.41 months"]) {
  assert.ok(article.includes(needle), `article missing ${needle}`);
}
for (const row of table) {
  if (!row.result.ok) continue;
  const cell = `${formatUsd(row.result.monthlyNet)} | ${formatRoi(row.result.annualRoiPercent)} | ${formatPayback(row.result.payback)}`;
  assert.ok(article.includes(cell), `article missing sensitivity ${cell}`);
}

console.log("roi-selftest: ok");
console.log({
  net: formatUsd(support.monthlyNet),
  roi: formatRoi(support.annualRoiPercent),
  payback: formatPayback(support.payback),
  breakEven: formatBreakEven(support.breakEven),
  share,
});
