---
name: ui-climb
description: Run one round of a UI climb - two AI judges (Claude Opus and GPT Sol through Codex) score your design's screenshots against benchmark apps, category by category, and the round is saved with a verdict computed from the files. Between rounds, interview the judges until they sign a contract of exactly what moves each score. Use when asked to set up ui-climb, run a climb round, interview the judges, score a design against a benchmark app, or "ui-climb".
---

# UI climb: one round

A climb raises a design's score round by round until two independent judges put **every category of every cell at 9 or above** and above every benchmark app. A cell is one surface (a screen group, such as "Settings") or one flow (a task walked through several screens, such as "flow:signup").

This skill is a thin layer on the `council` skill. Load `council` with the Skill tool and follow it, with the additions below. Council's own rules hold: fight scope creep, and report an unavailable member instead of substituting one.

## Setup (once)

Run this when asked to set up ui-climb, or when a round is asked for and there is no `rubric.json` yet. Ask the user only what the code can't tell you, and stop after step 6: never start a round unasked.

1. **Install.** Make sure this skill and `council` are both in the project's `.claude/skills/` (and `.agents/skills/` if the user runs Codex). If `council` is missing, copy it from `skills/council` in https://github.com/myn/ui-climb.
2. **Check what's needed**, and give the user the exact fix for anything missing:
   - `node -v` is 22.18 or newer (the scripts are `.ts` files Node runs directly);
   - both judges are reachable. In T3 Code, `orchestrator_capabilities` lists a Claude Opus and a GPT Sol model. Elsewhere, `codex --version` works and Codex is logged in (`codex login` if not);
   - Playwright is installed in the project, or can be (`npm i -D playwright`; a Chromium-based browser the machine already has, such as Edge or Chrome, saves a browser download).
3. **Ask about the product**, in one message: what it is and who uses it; which apps it must beat, and where their screenshots are (or whether to capture them); its surfaces (screen groups) and the task flows to walk; any pass/fail rules; which themes it ships. Read the code first, and propose answers for the user to correct rather than asking blank.
4. **Write the rubric.** Make the climb folder (default `design/climb/`) and write `rubric.json` from `templates/rubric.json` beside this file:
   - `product`: the key your design is scored under in each cell. Every other key in a cell is a benchmark app.
   - `categories`: what each cell is scored on, 1 to 10. Keep the template's unless the user wants others.
   - `rules`: pass/fail rules. One broken rule fails the round.
   - `flows`: the task flows, `flow:<id>` to a one-line task.
   - `maxRounds` (the climb stops there), `driftLimit` (how far a benchmark score may move from round 1), and `skip` (a category to the cells it does not apply to).
5. **Write the screenshot script.** Work out how the UI runs (dev server, Storybook, a static atlas, an Electron build) and write one script that takes a design name, an output folder and state IDs, and saves each state at true size in every theme as `<state>-<theme>.png`. If a rule is about fonts, it also saves every computed font family to `fonts.json`. Write the list of states per surface and the states each flow walks, in order, next to it. Run it once into a scratch folder and show the user a few PNGs.
6. **Hand over.** Tell the user what was set up, and that "run a ui-climb round" starts round 1.

Each design gets its own folder under the climb folder: `design/climb/<design>/round-NN/`.

## Members

Exactly two, so council's three-provider default does not apply:

- **Claude Opus**: the latest Claude Opus model, effort `high`.
- **GPT Sol through Codex**: the latest GPT Sol model, reasoning effort `high`.

If the user names other judges, use those. Each judge starts fresh every round (never resume a past reviewer), is read-only, and gets the same brief, word for word.

In T3 Code, call `orchestrator_capabilities` once, then start both judges with `delegate_task` in parallel. Elsewhere, use the harness's subagent tools (for Codex, a `codex exec` subprocess works).

- **Run the council from a live thread.** In T3 Code every `delegate_task` is tied to the caller's active run. Never run it from a background native subagent: once the parent turn ends, its delegate calls fail with `parent_not_active`. To hand off a whole round, start the agent that runs it with `delegate_task` (with `isolation: "worktree"` if it writes).
- **Keep long replies out of your context.** Tell each judge to stay read-only except for one write: its raw reply, word for word, to `<round>/reply-<claude|codex>.md`, then end with the one word "saved". Give the absolute path of the working folder.
- **Batch big jobs.** With many screens, split the brief into batches (one per surface group) and run one batch at a time, so at most two judges run at once. Save each reply to `<round>/replies/<batch>-<who>.md`.

## The round folder

`<climb>/<design>/round-NN/` holds:

1. `screens/`: the screenshots scored, at true size, in every theme you ship (for example `-dark.png` and `-light.png`). Shoot them from the real build or a static atlas with a script (Playwright works), never by hand, so every round is shot the same way. If a rule is about fonts, have the script list every computed font family and save it as `fonts.json`, so the rule is checked, not eyeballed. Benchmark screens are referenced where they are kept, never copied into the round.
2. `brief.md`: the one brief both judges got, word for word. Build it from `rubric.json` and `templates/brief.md`: what the product is, the screens per cell (with a one-line caption on any frame whose change is the point), the categories, the rules, and the reply format. **Never put the target score or the stop rule in it**: no "9", no "target", no "to pass". A judge who knows the bar grades to it.
3. `scores-claude.json`, `scores-codex.json`: each reply, parsed into `{ reviewer, model, cells: { <cell>: { <product>: {<category>: 1-10}, <app>: {...} } }, rules: {<rule>: true|false}, findings: [...] }`. Every category for your design and for each benchmark app on that cell. Keep the raw replies (`reply-claude.md`, `reply-codex.md`).
4. `round.json`: `{ design, round, date, claim, screens, rules, features }`. `rules` is false if either judge (or `fonts.json`) breaks it. `features` maps each feature in scope to the screen IDs that show it; an empty list fails the round, so no feature goes unscored. `claim` is the verdict `node <this skill>/scripts/climb.ts <climb>/<design>` prints, never your own call.
5. `README.md`: what was scored, the verdict and why, the useful findings, the disagreements, and the score table (one column per round so far; a cell's score is the mean over its categories).

Commit every round.

## Benchmarks are frozen at round 1

Round 1 scores your design and every benchmark app. From round 2 on, the brief lists your design only, and the verdict judges it against each judge's round 1 benchmark scores. A round that does rescore the benchmarks is **void** if any benchmark score moves more than `driftLimit` from round 1: the judges' scale moved, not your design.

## Between rounds: interview the judges

No round is designed from guesses. Scores go flat when the design guesses at what the judges want and swings between their answers. Before designing each round, interview both judges until everyone agrees on exactly what will move each cell to the goal. The goal (every category at 9) may be named in an interview; it is never named in a scoring brief.

1. **Interview.** After a round is recorded, put questions to both judges, each read-only, and save each set of questions and each answer (start from `templates/interview.md`):
   - questions: `<climb>/consult/round-NN/interview-K.md`
   - answers: `<claude|codex>-K.md` in the same folder

   Ask:
   - what separates their 8, 9 and 10 in each category;
   - which products they hold as the standard on each surface;
   - for each cell, the biggest reason it is not at the goal, and the exact changes that would get it there;
   - what they will no longer mark down;
   - their final position on any point the design has swung on.
2. **Settle the disagreements.** Give each judge the other judge's answer and a proposed resolution for every point where they differ. Each judge accepts, accepts with a change, or rejects. Run more interviews until no point is left open. Never settle a disagreement yourself or from your docs: take it back to both judges.
3. **Write the contract.** Gather everything both judges agreed into `<climb>/consult/round-NN/contract.md` (start from `templates/contract.md`):
   - every change, screen by screen, in exact form (sizes, words, positions);
   - any new states or evidence the judges asked for;
   - any changes to the brief;
   - what the judges will no longer mark down;
   - the score each judge expects.

   Both judges then sign it in a final interview: nothing in it is misstated, nothing they required is missing, and they expect the goal to be met if it is built as written.
4. **Deliberate until it is understood.** If anything in the contract is unclear (a vague requirement, a missing size or word, an answer that could be read two ways), ask again. Do not start the design until the contract leaves no doubt.
5. **Build to the contract, then check it.** The next round's design must carry every point of the signed contract. Before shooting, go through the contract point by point and record in the round's README where each point is met. A point that was not built blocks the round, unless the judges agree to drop it. Earlier contracts stay in force.

The judges are authoritative: where a signed contract differs from your design docs or guidelines, build to the contract and update the doc to match.

## Verdict

`node <this skill>/scripts/climb.ts <climb>/<design>` (for example `.claude/skills/ui-climb/scripts/climb.ts`) decides it from the saved files:

- **void**: a benchmark score moved more than `driftLimit` from round 1.
- **fail**: a broken rule, or a feature without a screen.
- **done**: every category of every cell is at 9 or above from both judges, and on every cell a benchmark app shares, each category's score for your design, averaged over the judges, is higher than that app's. A higher mean that loses one category is not done.
- **stopped**: the round is `maxRounds` and not done.
- **climb**: none of the above; keep going.

The script exits non-zero if a saved `claim` differs from the computed verdict. The user makes the final call.
