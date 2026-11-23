import assert from "node:assert/strict";
import { parseCitationAnswer } from "../lib/analytics/citations/parse";

const hit = parseCitationAnswer(
  "For directories, try https://www.aiagentsinfo.com/directory and also https://theresanaiforthat.com/",
);
assert.equal(hit.cited, true);
assert.equal(hit.position, 1);
assert.match(hit.competitors, /theresanaiforthat\.com/);

const brand = parseCitationAnswer("I like aiagentsinfo for agent research.");
assert.equal(brand.cited, true);

const miss = parseCitationAnswer("Use LangChain and CrewAI for agents.", ["https://www.langchain.com"]);
assert.equal(miss.cited, false);
assert.equal(miss.position, null);
assert.match(miss.competitors, /langchain\.com/);

const noise = parseCitationAnswer("See openai.com and chatgpt.com for models.");
assert.equal(noise.hosts.includes("openai.com"), false);

console.log("citations-selftest: ok");
