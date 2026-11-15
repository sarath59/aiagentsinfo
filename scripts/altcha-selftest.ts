import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { solveChallenge } from "altcha-lib/v1";
import { POST } from "../app/api/submit-tool/route";
import {
  altchaHmacKey,
  clearAltchaReplay,
  createAltchaChallenge,
  HUMAN_CHECK_MESSAGE,
  verifyAltchaPayload,
} from "../lib/altcha";
import { clearRateLimits } from "../lib/rate-limit";
import { HONEYPOT_FIELD, SUBMISSION_UNAVAILABLE_MESSAGE } from "../lib/submissions";

const savedKey = process.env.ALTCHA_HMAC_KEY;
const savedToken = process.env.GITHUB_SUBMISSIONS_TOKEN;

function restoreEnv() {
  if (savedKey === undefined) delete process.env.ALTCHA_HMAC_KEY;
  else process.env.ALTCHA_HMAC_KEY = savedKey;
  if (savedToken === undefined) delete process.env.GITHUB_SUBMISSIONS_TOKEN;
  else process.env.GITHUB_SUBMISSIONS_TOKEN = savedToken;
}

async function main() {
process.env.ALTCHA_HMAC_KEY = "test-hmac-key";
delete process.env.GITHUB_SUBMISSIONS_TOKEN;
clearAltchaReplay();
clearRateLimits();

assert.equal(altchaHmacKey(), "test-hmac-key");

delete process.env.ALTCHA_HMAC_KEY;
process.env.GITHUB_SUBMISSIONS_TOKEN = "desk-token";
const derived = altchaHmacKey();
assert.equal(derived, createHash("sha256").update("altcha-v1:desk-token", "utf8").digest("hex"));
assert.notEqual(derived, "desk-token");
assert.equal(derived?.length, 64);

delete process.env.GITHUB_SUBMISSIONS_TOKEN;
assert.equal(altchaHmacKey(), null);
assert.equal(await createAltchaChallenge(), null);
assert.deepEqual(await verifyAltchaPayload("anything"), { ok: false, reason: "unconfigured" });

process.env.ALTCHA_HMAC_KEY = "test-hmac-key";
process.env.GITHUB_SUBMISSIONS_TOKEN = "desk-token";
assert.equal(altchaHmacKey(), "test-hmac-key");
delete process.env.GITHUB_SUBMISSIONS_TOKEN;

const fresh = await createAltchaChallenge();
assert.ok(fresh);
assert.equal(fresh.maxnumber, 150_000);
assert.match(fresh.salt, /issued=\d+/);
assert.match(fresh.salt, /expires=\d+/);
assert.equal(fresh.algorithm, "SHA-256");

const solved = await solveChallenge(fresh.challenge, fresh.salt, fresh.algorithm, fresh.maxnumber).promise;
assert.ok(solved);

function encode(challenge: NonNullable<typeof fresh>, number: number) {
  return btoa(
    JSON.stringify({
      algorithm: challenge.algorithm,
      challenge: challenge.challenge,
      number,
      salt: challenge.salt,
      signature: challenge.signature,
    }),
  );
}

const payload = encode(fresh, solved.number);
const issued = Number(new URLSearchParams(fresh.salt.split("?")[1]).get("issued")) * 1000;
assert.equal((await verifyAltchaPayload(payload, issued + 1_000)).ok, false);
assert.equal((await verifyAltchaPayload(payload, issued + 4_000)).ok, false);

clearAltchaReplay();
assert.deepEqual(await verifyAltchaPayload(payload, issued + 4_000), { ok: true });
assert.equal((await verifyAltchaPayload(payload, issued + 5_000)).ok, false);

clearAltchaReplay();
const tampered = JSON.parse(atob(payload)) as { salt: string };
tampered.salt = tampered.salt.replace(/issued=\d+/, "issued=1");
assert.equal((await verifyAltchaPayload(btoa(JSON.stringify(tampered)), issued + 4_000)).ok, false);
assert.equal((await verifyAltchaPayload("not-a-payload", issued + 4_000)).ok, false);
const missingPayload = await verifyAltchaPayload("", issued + 4_000);
assert.equal(missingPayload.ok, false);
if (!missingPayload.ok) assert.equal(missingPayload.reason, "missing");

const expired = await createAltchaChallenge(Date.now() - 11 * 60 * 1000);
assert.ok(expired);
const expiredSolve = await solveChallenge(
  expired.challenge,
  expired.salt,
  expired.algorithm,
  expired.maxnumber,
).promise;
assert.ok(expiredSolve);
assert.equal((await verifyAltchaPayload(encode(expired, expiredSolve.number))).ok, false);

async function post(body: unknown, ip: string) {
  const response = await POST(
    new Request("http://localhost:3000/api/submit-tool", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "http://localhost:3000",
        "x-forwarded-for": ip,
      },
      body: JSON.stringify(body),
    }),
  );
  const json = (await response.json()) as { message?: string; errors?: Record<string, string>; code?: string };
  return { status: response.status, json };
}

const missing = await post({ name: "Example Tool" }, "203.0.113.10");
assert.equal(missing.status, 400);
assert.equal(missing.json.errors?.altcha, HUMAN_CHECK_MESSAGE);
assert.match(missing.json.message || "", /Please complete the human check/);

const garbage = await post({ altcha: "garbage-payload" }, "203.0.113.11");
assert.equal(garbage.status, 400);
assert.equal(garbage.json.errors?.altcha, HUMAN_CHECK_MESSAGE);

const honeypot = await post({ [HONEYPOT_FIELD]: "bot" }, "203.0.113.12");
assert.equal(honeypot.status, 200);
assert.equal(honeypot.json.errors, undefined);

clearAltchaReplay();
const tooSoonChallenge = await createAltchaChallenge(Date.now() + 30_000);
assert.ok(tooSoonChallenge);
const tooSoonSolve = await solveChallenge(
  tooSoonChallenge.challenge,
  tooSoonChallenge.salt,
  tooSoonChallenge.algorithm,
  tooSoonChallenge.maxnumber,
).promise;
assert.ok(tooSoonSolve);
const tooSoon = await post({ altcha: encode(tooSoonChallenge, tooSoonSolve.number), name: "No" }, "203.0.113.13");
assert.equal(tooSoon.status, 400);
assert.equal(tooSoon.json.errors?.altcha, HUMAN_CHECK_MESSAGE);

clearAltchaReplay();
const readyChallenge = await createAltchaChallenge(Date.now() - 5_000);
assert.ok(readyChallenge);
const readySolve = await solveChallenge(
  readyChallenge.challenge,
  readyChallenge.salt,
  readyChallenge.algorithm,
  readyChallenge.maxnumber,
).promise;
assert.ok(readySolve);
const readyPayload = encode(readyChallenge, readySolve.number);
const pastCaptcha = await post({ altcha: readyPayload, name: "No" }, "203.0.113.14");
assert.equal(pastCaptcha.status, 400);
assert.equal(pastCaptcha.json.errors?.altcha, undefined);
assert.ok(pastCaptcha.json.errors && Object.keys(pastCaptcha.json.errors).length > 0);
assert.doesNotMatch(pastCaptcha.json.message || "", /Please complete the human check/);

const replay = await post({ altcha: readyPayload, name: "No" }, "203.0.113.15");
assert.equal(replay.status, 400);
assert.equal(replay.json.errors?.altcha, HUMAN_CHECK_MESSAGE);

delete process.env.ALTCHA_HMAC_KEY;
delete process.env.GITHUB_SUBMISSIONS_TOKEN;
clearAltchaReplay();
const closed = await post({ name: "Example Tool", website: "example.com" }, "203.0.113.16");
assert.equal(closed.status, 503);
assert.equal(closed.json.code, "unconfigured");
assert.equal(closed.json.message, SUBMISSION_UNAVAILABLE_MESSAGE);
assert.equal(closed.json.errors, undefined);

restoreEnv();
clearAltchaReplay();
console.log("altcha-selftest: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
