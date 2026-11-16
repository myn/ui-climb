# UI review: <product> (round NN<, batch>)

You are one reviewer on a two-member design review. Work read-only: open and look at files, but do not create, edit, move or delete anything, and do not run anything that writes, except the one reply file named at the end. Judge only what the screenshots show.

**<Product>** is <one paragraph: what it is, who uses it, how (mouse, touch, keyboard), and the names of its main surfaces, so the reviewer uses your words>.

Every screenshot shows <the whole 1440×900 screen / the app window> in a `-dark.png` and a `-light.png`. Judge <product>'s own UI, not <anything drawn behind it>.

Every file is under <absolute path of the working folder>. `x-{dark,light}.png` means two files, `x-dark.png` and `x-light.png`. Open each one listed and look at it.

## What to score

### `<cell id>`: the <surface name> surface

- `<product>`: `<round>/screens/<state>-{dark,light}.png` (<caption, only when the change is the point>), ...
- `<benchmark app>`: `<path to its frozen screens>` ... (round 1 only; from round 2 on, list them as "reference only, not scored")

### `flow:<id>`: the task flow "<task>"

- `<product>`, in order: `<state a>` → `<state b>` → `<state c>`
- `<benchmark app>`, in order: ...

## Rubric

Score each category from 1 to 10 (one decimal allowed), for <product> and each app listed on each cell. Score each on its own merits against the best software you know; do not grade on a curve between them.

<one line per category from rubric.json>

## Rules

Say for each rule whether any screen breaks it, and where:

<one line per rule from rubric.json>

## Findings

Before new findings, check every finding from the last round: met, or not, and why. Then list each defect you see, with its cell, its screen, what is wrong, and what would fix it. Name only real defects; there is no quota.

## Reply

Write your reply as Markdown to `<round>/reply-<who>.md`, ending with one JSON block:

```json
{ "cells": { "<cell id>": { "<product>": { "<category>": 0 }, "<app>": { "<category>": 0 } } }, "rules": { "<rule>": true }, "findings": ["<cell>: <screen>: <defect and fix>"] }
```

Then end your turn with the single word: saved
