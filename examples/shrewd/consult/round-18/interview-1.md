# Judge interview after round 18 (#231): the round 19 contract

This is not a scoring task. Work read-only; the one file you may write is your answer, named at the end.

In round 18 every cell is at 9 or above from both of you (Claude 9.17, GPT Sol 9.30). One category is under 9: Claude, consistency on Active listening, 8.9. Your round 18 scores and findings are in `design/climb/quire/round-18/scores-{WHO}.json` and `replies/*-{WHO}.md`, beside the other judge's. The earlier contracts are `design/climb/consult/round-15/`, `round-16/` and `round-17/contract.md`.

The proposed round 19 contract is a fix for every round 18 defect either of you named:

1. **The slot in the last states without it:** `interview`, `interviewpaused`, `behavioral` (the interview layout at the side), the open Coach sheet (`coachtab`, `objectives`, `notip`) and `solo`. Each gets the same 64 px slot under the bar.
2. **No "Ask a follow-up" beside any answer under a slot.** A quiet slot's input is the follow-up; when help fills the slot, the bar's Ask continues the answer (`heldnew`, `longnew`, `tipheld`). The reading box is one height whether the slot is quiet or full, so nothing below the slot moves.
3. `error` and `livecoach`: no input in the slot. Each already has an Ask input open below it.
4. `nothing`: the Suggestion's line 2 has Open on its right, after Copy, like the other kinds.
5. `paused`: Resume and Stop are exactly the same width, so the divider and Peek keep their x.
6. `menu`: the Overlay and the menu read as one panel. No rule, no rounded corners and no shadow between them; one outline and one shadow around both.
7. `solid`: the See-through tooltip sits inside the Overlay, just above its control in the action row, pointing at it.
8. `visuals`: the "Visuals" heading sits about 17 px clear under the tab rule, like `coach`.
9. `search`: the backdrop leaves the rail undimmed and uncut; it covers only the page area below the title.
10. `mode` → `modeactive`: the description under the title keeps the same line breaks; the actions area keeps one width whether it holds the button or the chip.
11. `live`: the Earlier box shows whole rows only, with no row divider at its bottom edge.

Out of contract, not proposed: the See-through ghost of Dana's avatar behind the interview lines (Claude, cost 0). Say if you want it in.

## Questions

1. For each point, accept, or give the exact form you need.
2. Is anything you marked down in round 18 missing? Quote it.
3. If every point is built, with no new defects, will every category in every cell be at 9 or above for you? Name any that would not be, and exactly why.

## Answer

Write your answer as Markdown to `design/climb/consult/round-18/{WHO}-1.md`, then end your turn with the single word: saved
