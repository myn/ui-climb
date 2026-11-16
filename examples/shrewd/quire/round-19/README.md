# Quire, round 19 (#231)

## What was scored

Round 19 was built to the fourth contract with the judges (`design/climb/consult/round-18/contract.md`). Both accepted 11 fixes in an exact form, and both said every category would reach 9 if it was built as written:

- the help slot in the last states without it (the interview layouts, the open Coach sheet, and solo, where the composer itself is the slot);
- no "Ask a follow-up" beside an answer under a slot, with nothing below the slot moving between quiet and full;
- no slot input in `error` and on the live page;
- Open on the Suggestion;
- Resume and Stop one width;
- the menu and the Overlay as one panel;
- the See-through tooltip inside the Overlay;
- the Visuals heading clear of the tab rule;
- search leaving the rail alone;
- one width for the Mode actions;
- whole rows in the live page's Earlier box.

Claude's small items were built too: the Retro heading, the first-run gap, the email and mail-failure wording, the Flow's time, and a fuller backing behind the interview lines.

## Verdict: done

`node scripts/climb.ts design/climb/quire` gives **done**. No rule is broken. **Every category of every cell is at 9 or above from both reviewers**, and Quire loses no category to any benchmark app. Claude's mean is 9.25 (9.17 in round 18) and GPT Sol's 9.33 (9.30). The owner makes the final call on #231.

| Cell | Claude r18 → r19 | GPT Sol r18 → r19 | Mean r19 |
| --- | --- | --- | --- |
| overlay | 9.13 → 9.24 | 9.26 → 9.32 | 9.28 |
| ask | 9.12 → 9.21 | 9.21 → 9.36 | 9.29 |
| active-listening | 9.13 → 9.15 | 9.24 → 9.33 | 9.24 |
| flow:ask | 9.19 → 9.25 | 9.39 → 9.39 | 9.32 |
| flow:heard | 9.17 → 9.24 | 9.33 → 9.45 | 9.34 |
| live-coaching | 9.17 → 9.31 | 9.21 → 9.27 | 9.29 |
| visuals | 9.16 → 9.32 | 9.28 → 9.30 | 9.31 |
| flow:coaching | 9.21 → 9.34 | 9.21 → 9.30 | 9.32 |
| flow:visual | 9.17 → 9.32 | 9.28 → 9.30 | 9.31 |
| dashboard | 9.18 → 9.30 | 9.32 → 9.36 | 9.33 |
| notes | 9.20 → 9.28 | 9.33 → 9.33 | 9.31 |
| flow:past-decision | 9.19 → 9.29 | 9.36 → 9.38 | 9.33 |
| flow:follow-up | 9.19 → 9.29 | 9.33 → 9.33 | 9.31 |
| session-page | 9.11 → 9.13 | 9.31 → 9.31 | 9.22 |
| flow:retro | 9.13 → 9.19 | 9.34 → 9.34 | 9.27 |
| settings | 9.19 → 9.20 | 9.31 → 9.31 | 9.26 |
| flow:first-session | 9.18 → 9.19 | 9.34 → 9.31 | 9.25 |
| flow:mode | 9.18 → 9.20 | 9.31 → 9.29 | 9.24 |

## How the climb got here

Rounds 11 to 15 sat flat (Claude 8.0 to 8.2, GPT Sol 8.5 to 8.7) while the design guessed at what the reviewers wanted and swung between their answers. After round 15 the owner asked for the judges to be interviewed until it was clear what they judge against. The changes since then:

- Before each round, both judges agree and sign a contract of exactly what each cell needs (`design/climb/consult/round-15/` to `round-18/`).
- Disagreements go back to both judges, never to the docs.
- The brief checks old findings first, sets no quota, and costs only real defects.
- The judges outrank the ADRs and guidance (CLAUDE.md, AGENTS.md, the ui-climb skill).

The means since then:

| | Round 15 | Round 16 | Round 17 | Round 18 | Round 19 |
| --- | --- | --- | --- | --- | --- |
| Claude | 8.14 | 8.94 | 9.04 | 9.17 | 9.25 |
| GPT Sol | 8.65 | 9.16 | 9.23 | 9.30 | 9.33 |

## Council score table

A cell's score is the mean over its categories (without `overlay-speed` on the cells with no Overlay) for Shrewd (Quire).

| Delegate | Round 1 | Round 2 | Round 3 | Round 4 | Round 5 | Round 6 | Round 7 | Round 8 | Round 9 | Round 10 | Round 11 | Round 12 | Round 13 | Round 14 | Round 15 | Round 16 | Round 17 | Round 18 | Round 19 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Claude Opus 5.5 | 7.4 | 7.6 | 7.6 | 7.5 | 7.6 | 7.5 | 7.7 | 7.6 | 7.6 | 8.0 | 8.0 | 8.1 | 8.2 | 8.1 | 8.1 | 8.9 | 9.0 | 9.2 | 9.3 |
| GPT Sol | 7.8 | 8.1 | 8.2 | 8.2 | 8.2 | 8.1 | 8.2 | 8.2 | 8.5 | 8.5 | 8.5 | 8.7 | 8.6 | 8.6 | 8.7 | 9.2 | 9.2 | 9.3 | 9.3 |
