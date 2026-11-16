// Each round's verdict is worked out from its saved files, never claimed by hand.
// Run: npm test   (node --test "skills/ui-climb/scripts/*.test.ts")
import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { verdict, claimErrors, loadRounds, loadRubric, type Round, type Rubric } from "./climb.ts";

const cats = ["hierarchy", "typography", "layout", "colour", "copy", "steps", "overlay-speed", "proactive", "consistency", "polish"];
const rubric: Rubric = {
  product: "mine",
  categories: Object.fromEntries(cats.map((c) => [c, c])),
  maxRounds: 20,
  driftLimit: 0.5,
  skip: { "overlay-speed": ["notes"] },
};
const all = (n: number) => Object.fromEntries(cats.map((c) => [c, n]));
const rules = { "No mono fonts": true, "One screen only": true };
// A round where your design scores `me` everywhere and a benchmark app `them`, from both reviewers, on two cells.
const round = (n: number, me: number, them: number, extra: Partial<Round> = {}): Round => {
  const cells = { overlay: { mine: all(me), rival: all(them) }, "flow:ask": { mine: all(me), rival: all(them) } };
  return { round: n, rules, features: { Ask: ["working"] }, reviewers: { claude: { cells }, codex: { cells: structuredClone(cells) } }, ...extra };
};
const v = (...rounds: Round[]) => verdict(rounds, rubric);

test("a round that clears every bar is done", () => {
  assert.equal(v(round(1, 7, 8), round(2, 9.5, 8)).verdict, "done");
});

test("a round below the bar keeps climbing", () => {
  assert.equal(v(round(1, 7, 8)).verdict, "climb");
});

test("a missing category is not done", () => {
  const r2 = round(2, 9.5, 8);
  delete r2.reviewers.claude.cells.overlay.mine.proactive;
  const out = v(round(1, 7, 8), r2);
  assert.equal(out.verdict, "climb");
  assert.match(out.reasons.join("\n"), /no score for proactive on overlay/);
});

test("a benchmark score that moves more than the drift limit from round 1 voids the round", () => {
  const r2 = round(2, 9.5, 8);
  r2.reviewers.codex.cells.overlay.rival.copy = 7.4;
  const out = v(round(1, 7, 8), r2);
  assert.equal(out.verdict, "void");
  assert.match(out.reasons.join("\n"), /codex.*overlay.*rival.*copy/);
  r2.reviewers.codex.cells.overlay.rival.copy = 7.5; // exactly the limit is allowed
  assert.equal(v(round(1, 7, 8), r2).verdict, "done");
});

test("a broken rule or a feature without a screen fails the round", () => {
  assert.equal(v(round(1, 9.5, 8, { rules: { ...rules, "One screen only": false } })).verdict, "fail");
  const out = v(round(1, 9.5, 8, { features: { Ask: ["working"], "Auto-stop": [] } }));
  assert.equal(out.verdict, "fail");
  assert.match(out.reasons.join("\n"), /Auto-stop/);
});

test("one reviewer below 9 in one category is not done", () => {
  const r = round(1, 9.5, 8);
  r.reviewers.claude.cells["flow:ask"].mine.steps = 8.5;
  assert.equal(v(r).verdict, "climb");
});

test("a higher mean that loses one category to a benchmark app is not done", () => {
  const r = round(1, 9.5, 8);
  for (const who of ["claude", "codex"]) r.reviewers[who].cells.overlay.rival.steps = 9.8;
  const out = v(r);
  assert.equal(out.verdict, "climb");
  assert.match(out.reasons.join("\n"), /on overlay rival scores 9\.80 for steps, mine 9\.50/);
});

test("a category only one reviewer scored for a benchmark app is missing", () => {
  const r = round(1, 9.5, 8);
  delete r.reviewers.codex.cells.overlay.rival.copy;
  assert.match(v(r).reasons.join("\n"), /codex left out copy for rival on overlay/);
});

test("a round with its own frozen rubric is judged on that rubric's categories", () => {
  const r = round(1, 9.5, 8, { categories: cats.filter((c) => c !== "proactive") });
  for (const who of ["claude", "codex"]) for (const app of ["mine", "rival"]) delete r.reviewers[who].cells.overlay[app].proactive;
  assert.equal(v(r).verdict, "done");
  assert.equal(v({ ...r, categories: undefined }).verdict, "climb");
});

test("the last round stops whatever its scores, unless it is done", () => {
  const rounds = Array.from({ length: rubric.maxRounds }, (_, i) => round(i + 1, 7, 8));
  assert.equal(verdict(rounds, rubric).verdict, "stopped");
  rounds[rubric.maxRounds - 1] = round(rubric.maxRounds, 9.5, 8);
  assert.equal(verdict(rounds, rubric).verdict, "done");
});

test("a false done claim is caught", () => {
  const r = round(1, 9.5, 8, { claim: "done" });
  r.reviewers.claude.cells.overlay.mine.colour = 8;
  assert.match(claimErrors([r], rubric).join("\n"), /round 1 claims done but is climb/);
});

test("a later round with no benchmark scores is judged against round 1's", () => {
  const mineOnly = (n: number, me: number): Round => {
    const cells = { overlay: { mine: all(me) }, "flow:ask": { mine: all(me) } };
    return { round: n, rules, features: { Ask: ["working"] }, reviewers: { claude: { cells }, codex: { cells: structuredClone(cells) } } };
  };
  assert.equal(v(round(1, 7, 8), mineOnly(2, 9.5)).verdict, "done");
  assert.match(v(round(1, 7, 9.6), mineOnly(2, 9.5)).reasons.join("\n"), /on overlay rival scores 9\.60 for copy, mine 9\.50/);
});

test("a skipped category is left out on the cells it names", () => {
  const r2 = round(2, 9.5, 8);
  for (const s of Object.values(r2.reviewers)) s.cells.notes = { mine: { ...all(9.5), "overlay-speed": 3 } };
  assert.equal(v(round(1, 7, 8), r2).verdict, "done");
  r2.reviewers.claude.cells.overlay.mine["overlay-speed"] = 3;
  assert.equal(v(round(1, 7, 8), r2).verdict, "climb");
});

test("the Shrewd example: round 1 fails, round 19 is done", () => {
  const dir = fileURLToPath(new URL("../../../examples/shrewd/quire", import.meta.url));
  const rounds = loadRounds(dir);
  const r = loadRubric(dir);
  assert.deepEqual(rounds.map((_, i) => verdict(rounds.slice(0, i + 1), r).verdict), ["fail", "done"]);
  assert.deepEqual(claimErrors(rounds, r), []);
});
