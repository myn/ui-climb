// The UI climb's verdict, worked out from a design's saved round folders. Never claim a verdict by hand.
// Usage: node climb.ts <climb dir>/<design>   prints each round's verdict and any round whose saved claim is wrong.
// The rubric is read from <climb dir>/rubric.json (one level above the design folder).
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

type Scores = Record<string, number>; // category -> 1-10
export type Round = {
  round: number;
  claim?: string;
  rules: Record<string, boolean>;
  features: Record<string, string[]>; // feature -> screen IDs that show it
  reviewers: Record<string, { cells: Record<string, Record<string, Scores>> }>; // reviewer -> surface or flow -> app -> scores
  categories?: string[]; // from the round's own frozen rubric.json, when it was scored on an older rubric
};
export type Rubric = {
  product: string; // the key your own design is scored under in each cell; every other key is a benchmark app
  categories: Record<string, string>;
  maxRounds: number;
  driftLimit: number;
  skip?: Record<string, string[]>; // category -> cells it does not apply to
};

const BAR = 9; // the target lives here only: it never goes into a reviewer's brief

const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;

/** The verdict of the last round in `rounds` (round 1 first): done, void, fail, stopped or climb, with the reasons. */
export function verdict(rounds: Round[], rubric: Rubric) {
  const r = rounds.at(-1)!;
  const first = rounds[0];
  const me = rubric.product;
  const categories = r.categories ?? Object.keys(rubric.categories);
  const catsFor = (cell: string) => categories.filter((c) => !rubric.skip?.[c]?.includes(cell));
  const voids: string[] = [];
  const fails: string[] = [];
  const short: string[] = [];
  for (const [who, { cells }] of Object.entries(r.reviewers)) {
    for (const [cell, apps] of Object.entries(cells)) {
      for (const [app, s] of Object.entries(apps)) {
        if (app === me) {
          for (const c of catsFor(cell)) if (!(s[c] >= BAR)) short.push(`${who} gives ${me} ${s[c] ?? "no score"} for ${c} on ${cell}`);
          continue;
        }
        const base = first.reviewers[who]?.cells[cell]?.[app];
        for (const c of catsFor(cell)) {
          if (base?.[c] != null && s[c] != null && Math.abs(s[c] - base[c]) > rubric.driftLimit) voids.push(`${who} moved ${cell} ${app} ${c} from ${base[c]} to ${s[c]}`);
        }
      }
    }
  }
  // Your design must beat every benchmark app on every cell they share, in every category, each averaged over reviewers.
  const cells = new Set(Object.values(r.reviewers).flatMap((x) => Object.keys(x.cells)));
  for (const cell of cells) {
    // Benchmark scores are frozen at round 1: a later round scores your design only, and an app it leaves out is
    // judged on that reviewer's round 1 score.
    const apps = new Set([r, first].flatMap((rd) => Object.values(rd.reviewers).flatMap((x) => Object.keys(x.cells[cell] ?? {}))));
    // A score only one reviewer gave is missing: the verdict averages over every reviewer.
    const avg = (app: string, c: string) => {
      const xs = Object.entries(r.reviewers).map(([who, x]) => [who, x.cells[cell]?.[app]?.[c] ?? (app === me ? undefined : first.reviewers[who]?.cells[cell]?.[app]?.[c])] as const);
      for (const [who, n] of xs) if (n == null) short.push(`${who} left out ${c} for ${app} on ${cell}`);
      return mean(xs.map(([, n]) => n ?? NaN));
    };
    for (const app of apps) if (app !== me) for (const c of catsFor(cell)) {
      const [mine, them] = [avg(me, c), avg(app, c)];
      if (!(mine > them)) short.push(`on ${cell} ${app} scores ${them.toFixed(2)} for ${c}, ${me} ${mine.toFixed(2)}`);
    }
  }
  for (const [rule, ok] of Object.entries(r.rules)) if (!ok) fails.push(`rule broken: ${rule}`);
  for (const [f, screens] of Object.entries(r.features)) if (!screens.length) fails.push(`feature without a screen: ${f}`);

  const reasons = [...voids, ...fails, ...short];
  if (!reasons.length) return { verdict: "done", reasons };
  if (r.round >= rubric.maxRounds) return { verdict: "stopped", reasons };
  return { verdict: voids.length ? "void" : fails.length ? "fail" : "climb", reasons };
}

/** Every round whose saved claim differs from its computed verdict. */
export function claimErrors(rounds: Round[], rubric: Rubric) {
  return rounds.flatMap((r, i) => {
    const v = verdict(rounds.slice(0, i + 1), rubric).verdict;
    return r.claim && r.claim !== v ? [`round ${r.round} claims ${r.claim} but is ${v}`] : [];
  });
}

/** Reads `<dir>/round-NN/` folders: round.json plus one scores-<reviewer>.json per reviewer. */
export function loadRounds(dir: string): Round[] {
  return readdirSync(dir).filter((f) => /^round-\d+$/.test(f)).sort().map((f) => {
    const d = join(dir, f);
    const r = JSON.parse(readFileSync(join(d, "round.json"), "utf8"));
    if (existsSync(join(d, "rubric.json"))) r.categories = Object.keys(JSON.parse(readFileSync(join(d, "rubric.json"), "utf8")).categories);
    r.reviewers = Object.fromEntries(readdirSync(d).filter((x) => /^scores-.+\.json$/.test(x)).map((x) => [x.slice(7, -5), JSON.parse(readFileSync(join(d, x), "utf8"))]));
    return r;
  });
}

export const loadRubric = (dir: string): Rubric => JSON.parse(readFileSync(join(dirname(resolve(dir)), "rubric.json"), "utf8"));

if (import.meta.filename === process.argv[1]) {
  const dir = process.argv[2];
  if (!dir || !existsSync(dir)) {
    console.error("usage: node climb.ts <climb dir>/<design>");
    process.exit(2);
  }
  const rubric = loadRubric(dir);
  const rounds = loadRounds(dir);
  rounds.forEach((r, i) => {
    const v = verdict(rounds.slice(0, i + 1), rubric);
    console.log(`round ${r.round}: ${v.verdict}`);
    if (i === rounds.length - 1) for (const why of v.reasons.slice(0, 20)) console.log(`  ${why}`);
  });
  const errors = claimErrors(rounds, rubric);
  for (const e of errors) console.error(e);
  if (errors.length) process.exit(1);
}
