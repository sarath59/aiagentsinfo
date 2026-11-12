import assert from "node:assert/strict";
import { aiBots } from "../lib/robots/bots";
import { evaluateRobots, scoreSentence } from "../lib/robots/evaluate";
import { isBlockedAddress, rejectionForUrl } from "../lib/robots/fetch-robots";
import { choiceFor, generateRobots } from "../lib/robots/generate";
import { decidePath, parseRobotsTxt, patternMatches } from "../lib/robots/parse";

function access(file: string, token: string, path = "/") {
  return decidePath(parseRobotsTxt(file), token, path).access;
}

const empty = parseRobotsTxt("");
assert.equal(empty.groups.length, 0);
assert.equal(decidePath(empty, "GPTBot", "/").access, "allowed");
assert.equal(decidePath(empty, "GPTBot", "/secret").access, "allowed");

const missing = evaluateRobots("", ["/"], "missing");
assert.equal(missing.bots.every((bot) => bot.paths[0].access === "allowed"), true);
assert.match(scoreSentence(missing.scores[0].lines), /Answer fetches: \d+\/\d+ allowed/);

const unreachable = evaluateRobots("User-agent: *\nDisallow: /", ["/"], "unreachable");
assert.equal(unreachable.bots.every((bot) => bot.paths[0].access === "disallowed"), true);

const caseFile = "User-agent: gptbot\nDisallow: /private\n";
assert.equal(access(caseFile, "GPTBot", "/private/x"), "disallowed");
assert.equal(access(caseFile, "GPTBot", "/Private/x"), "allowed");
assert.equal(access(caseFile, "gptbot", "/private"), "disallowed");

const groups = `
User-agent: *
Disallow: /secret

User-agent: GPTBot
Allow: /secret/public
Disallow: /secret

User-agent: ClaudeBot
User-agent: Claude-SearchBot
Disallow: /drafts
`;
assert.equal(access(groups, "OAI-SearchBot", "/secret"), "disallowed");
assert.equal(access(groups, "OAI-SearchBot", "/"), "allowed");
assert.equal(access(groups, "GPTBot", "/secret/public/a"), "allowed");
assert.equal(access(groups, "GPTBot", "/secret/other"), "disallowed");
assert.equal(access(groups, "ClaudeBot", "/drafts"), "disallowed");
assert.equal(access(groups, "Claude-SearchBot", "/drafts"), "disallowed");
assert.equal(access(groups, "ClaudeBot", "/secret"), "allowed");

const longest = `
User-agent: Googlebot
Disallow: /archive

User-agent: Googlebot-News
Allow: /archive/news
`;
const news = decidePath(parseRobotsTxt(longest), "Googlebot-News", "/archive/news");
assert.equal(news.access, "allowed");
assert.equal(news.matchedAgents.some((agent) => agent.toLowerCase() === "googlebot-news"), true);
const plain = decidePath(parseRobotsTxt(longest), "Googlebot", "/archive");
assert.equal(plain.access, "disallowed");
assert.equal(plain.prefixMatch, false);
const extended = decidePath(parseRobotsTxt("User-agent: Applebot\nDisallow: /\n"), "Applebot-Extended", "/");
assert.equal(extended.access, "disallowed");
assert.equal(extended.prefixMatch, true);

const tie = "User-agent: *\nDisallow: /foo\nAllow: /foo\n";
assert.equal(access(tie, "GPTBot", "/foo"), "allowed");
assert.equal(access(tie, "GPTBot", "/foo/bar"), "allowed");

const rfcLongest = `
User-agent: foobot
Allow: /example/page/
Disallow: /example/page/disallowed.gif
`;
assert.equal(access(rfcLongest, "foobot", "/example/page/disallowed.gif"), "disallowed");
assert.equal(access(rfcLongest, "foobot", "/example/page/other"), "allowed");

assert.equal(patternMatches("*.gif$", "/cats/a.gif"), true);
assert.equal(patternMatches("*.gif$", "/cats/a.gif.bak"), false);
assert.equal(patternMatches("*.gif$", "/cats/a.GIF"), false);
assert.equal(patternMatches("/foo$", "/foo"), true);
assert.equal(patternMatches("/foo$", "/foobar"), false);
assert.equal(patternMatches("/foo", "/foobar"), true);
assert.equal(patternMatches("/a/*/c", "/a/b/c"), true);
assert.equal(patternMatches("/a/*/c", "/a/b/c/d"), true);
assert.equal(patternMatches("/a/*/c$", "/a/b/c/d"), false);
assert.equal(patternMatches("/a/*/c$", "/a/b/c"), true);
assert.equal(patternMatches("", "/"), false);

const merged = `
User-agent: ExampleBot
Disallow: /foo

User-agent: ExampleBot
Disallow: /bar
`;
assert.equal(access(merged, "ExampleBot", "/foo"), "disallowed");
assert.equal(access(merged, "ExampleBot", "/bar"), "disallowed");
assert.equal(access(merged, "ExampleBot", "/baz"), "allowed");

const before = "Disallow: /\nUser-agent: *\nAllow: /\n";
const parsedBefore = parseRobotsTxt(before);
assert.equal(parsedBefore.ignoredRules, 1);
assert.equal(access(before, "GPTBot", "/hidden"), "allowed");

const sitemap = "User-agent: A\nSitemap: https://example.com/sitemap.xml\nUser-agent: B\nDisallow: /no\n";
const parsedSitemap = parseRobotsTxt(sitemap);
assert.deepEqual(parsedSitemap.sitemaps, ["https://example.com/sitemap.xml"]);
assert.equal(parsedSitemap.groups.length, 1);
assert.equal(access(sitemap, "A", "/no"), "disallowed");

assert.equal(decidePath(parseRobotsTxt("User-agent: *\nDisallow: /"), "GPTBot", "/robots.txt").access, "allowed");
assert.equal(decidePath(parseRobotsTxt("User-agent: *\nDisallow: /"), "GPTBot", "/robots.txt").implicitRobots, true);

const encoded = "User-agent: *\nDisallow: /foo/bar\n";
assert.equal(access(encoded, "GPTBot", "/foo/%62ar"), "disallowed");

const versioned = "User-agent: GPTBot/1.4\nDisallow: /train\n";
assert.equal(access(versioned, "GPTBot", "/train"), "disallowed");

assert.equal(rejectionForUrl("http://127.0.0.1/robots.txt"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://10.1.2.3/"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://192.168.1.20/robots.txt"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://169.254.169.254/"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://[::1]/robots.txt"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://localhost/robots.txt"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("http://example.com:22/robots.txt"), "This checker fetches robots.txt on port 80 or 443 only.");
assert.equal(rejectionForUrl("file:///etc/passwd"), "Use an http or https URL.");
assert.equal(rejectionForUrl("http://user:pass@example.com/"), "Remove the username and password from the URL.");
assert.equal(rejectionForUrl("http://2130706433/"), "That host is not a public website this checker can fetch.");
assert.equal(rejectionForUrl("https://example.com/robots.txt"), null);
assert.equal(isBlockedAddress("8.8.8.8"), false);
assert.equal(isBlockedAddress("::ffff:127.0.0.1"), true);
assert.equal(isBlockedAddress("172.16.4.2"), true);

const generated = generateRobots({
  policy: "allow-search-answer",
  choices: Object.fromEntries(aiBots.map((bot) => [bot.token, choiceFor(bot, "allow-search-answer")])),
  paths: ["/api/", "/account"],
  sitemap: "https://example.com/sitemap.xml",
  variant: 0,
});
assert.match(generated.text, /User-agent: GPTBot/);
assert.match(generated.text, /User-agent: OAI-SearchBot/);
assert.match(generated.text, /Sitemap: https:\/\/example.com\/sitemap.xml/);
assert.equal(access(generated.text, "GPTBot", "/"), "disallowed");
assert.equal(access(generated.text, "OAI-SearchBot", "/"), "allowed");
assert.equal(access(generated.text, "OAI-SearchBot", "/api/"), "disallowed");
assert.equal(access(generated.text, "Claude-User", "/"), "allowed");
assert.equal(access(generated.text, "Googlebot", "/api/x"), "disallowed");
assert.equal(access(generated.text, "Googlebot", "/"), "allowed");

const starApi = evaluateRobots("User-agent: *\nDisallow: /api/\n", ["/", "/api/"], "parsed");
assert.deepEqual(starApi.wildcardBlocks, []);
const starRoot = evaluateRobots("User-agent: *\nDisallow: /\n", ["/"], "parsed");
assert.deepEqual(starRoot.wildcardBlocks, ["/"]);

const split = generateRobots({ ...{
  policy: "allow-all" as const,
  choices: Object.fromEntries(aiBots.map((bot) => [bot.token, "allow" as const])),
  paths: [],
  sitemap: "",
  variant: 1,
}});
assert.equal(split.variant, 1);
const gptGroups = split.text.split("\n").filter((line) => line.startsWith("User-agent: GPTBot"));
assert.equal(gptGroups.length, 1);

const tokens = new Set(aiBots.map((bot) => bot.token.toLowerCase()));
assert.equal(tokens.size, aiBots.length);
for (const bot of aiBots) {
  assert.ok(bot.docUrl.startsWith("https://"), bot.token);
  assert.equal(bot.summary.length > 40, true, bot.token);
}

console.log(`robots selftest ok (${aiBots.length} bots)`);
