import assert from "node:assert/strict";
import {
  BADGE_ALT,
  BADGE_ORIGIN,
  cleanBadgeName,
  genericBadgeEmbed,
  listingBadgeEmbed,
  renderBadge,
} from "../lib/badge";

const aider = listingBadgeEmbed("aider", "Aider");
assert.equal(
  aider.html,
  `<a href="${BADGE_ORIGIN}/directory/aider"><img src="${BADGE_ORIGIN}/badge/aider.svg" alt="${BADGE_ALT}" width="${aider.width}" height="${aider.height}"></a>`,
);
assert.equal(aider.markdown, `[![${BADGE_ALT}](${BADGE_ORIGIN}/badge/aider.svg)](${BADGE_ORIGIN}/directory/aider)`);
assert.equal(aider.html.includes("nofollow"), false);
assert.equal(aider.html.includes("rel="), false);
assert.equal(aider.html.toLowerCase().includes("utm_"), false);
assert.equal(aider.markdown.includes("nofollow"), false);

const light = renderBadge({ name: "Aider", variant: "light" });
const dark = renderBadge({ name: "Aider", variant: "dark" });
const compact = renderBadge({ name: "Aider", variant: "compact" });
assert.match(light.svg, /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="\d+" height="48"/);
assert.match(light.svg, />Aider</);
assert.match(light.svg, />Listed on AI Agents Info</);
const visible = [...light.svg.matchAll(/<(?:text|title)[^>]*>([^<]*)<\//g)].map((match) => match[1]).join(" ");
assert.equal(/\b(rating|rank|score|stars)\b/i.test(visible), false);
assert.equal(visible.includes("#"), false);
assert.doesNotMatch(light.svg, /<script/i);
assert.match(light.svg, /font-family="Inter,/);
assert.equal(light.width, dark.width);
assert.equal(light.height, dark.height);
assert.match(dark.svg, /fill="#0B1F33"/);
assert.ok(compact.height < light.height);
assert.match(compact.svg, /height="28"/);
assert.equal(compact.svg.includes(">Aider<"), false);

const escaped = renderBadge({ name: "A & B <tools>", variant: "light" });
assert.match(escaped.svg, /A &amp; B &lt;tools&gt;/);
assert.equal(escaped.svg.includes("A & B"), false);
assert.equal(cleanBadgeName("Seedream 5.0 Pro AI Image Generator").endsWith("…"), true);
assert.equal([...cleanBadgeName("Seedream 5.0 Pro AI Image Generator")].length <= 28, true);

const generic = genericBadgeEmbed();
assert.equal(generic.href, `${BADGE_ORIGIN}/directory`);
assert.match(generic.html, /src="https:\/\/www\.aiagentsinfo\.com\/badge\/listed\.svg"/);
assert.equal(generic.html.includes("/directory/listed"), false);
const genericArt = renderBadge();
assert.equal(genericArt.svg.includes(">Aider<"), false);
assert.match(genericArt.svg, /width="\d+" height="36"/);

console.log("badge selftest ok");
