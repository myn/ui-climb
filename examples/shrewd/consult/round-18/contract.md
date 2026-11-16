# The round 19 contract (#231, agreed after round 18)

Both judges accepted the 11 points in `interview-1.md` (Claude in `claude-1.md`, GPT Sol in `codex-1.md`), in the exact forms below. Both expect every category in every cell at 9 or above if it is built as written with no new defects. The round 15, 16 and 17 contracts stay in force.

1. **The 64 px slot, at the same y, in `interview`, `interviewpaused`, `behavioral`, `coachtab`, `objectives`, `notip` and `solo`**, with quiet words and input on one centre line.
   - In the interview layouts the slot's input continues the open answer, and the answer keeps every line.
   - In `interviewpaused` the slot stays quiet with its input, and "2 new" stays beside Resume updates.
   - The Coach sheet's top edge sits at the same y as the Ask and Visual sheets. `objectives` stays within 480 px.
   - In `solo`, the composer itself sits in the slot (no second field), with the "Read your screen…" line under it.
2. **No "Ask a follow-up" beside any answer under a slot.** Within each sequence (`held` → `heldnew`, `longread` → `longnew`, `tipquiet` → `tipheld` → `tipgone`), nothing below the slot moves by more than 1 px.
3. `error` (keeping its recovery panel) and `livecoach`: the slot has no input.
4. `nothing`: line 2 is reason · time, then Copy and Open on its right.
5. `paused`: Resume and Stop are the same width. The divider and Peek don't move.
6. `menu`: one panel, with one outline and one shadow. There is no rule, corner or shadow band at the join.
7. `solid`: the tooltip sits inside the Overlay, directly above See-through, its arrow on the control's centre.
8. `visuals`: the heading sits about 17 px clear under the tab rule, unclipped.
9. `search`: the rail is fully bright and uncut; the backdrop covers only the page area right of the rail and below the title.
10. `mode` → `modeactive`: the actions area has one fixed width, so the description keeps its text, breaks and x; Saved stays beside the chip.
11. `live`: the Earlier box shows whole rows, with no divider at its foot, and its own bottom edge and scroll.

Claude's cheap items, built too (each costs up to 1 tenth for Claude, nothing for GPT Sol):
- The Retro heading is "Objectives: 3 of 4 met".
- `firstrun`: the gap between the second example and the numbered steps is back to the card's block gap.
- `email`: the helper breaks after "Written from the Notes."
- `mailfail`: "Your mail app didn't open. The draft is kept here."
- The Flow's date: its 19:40 label matches what it shows.
- Dana's avatar no longer shows through behind the interview lines.
