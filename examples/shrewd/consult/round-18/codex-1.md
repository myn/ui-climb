# Round 19 contract response — codex, GPT Sol

This is a contract interview, not a new scoring pass. I accept the proposed fixes with the clarifications below. Earlier contracts remain in force except where this contract explicitly replaces them.

## 1. The proposed points

1. **Accept: the missing 64 px slots.** Add the same slot under the bar in `interview`, `interviewpaused`, `behavioral`, `coachtab`, `objectives`, `notip` and `solo`, in both themes. Keep the two complete help lines, agreed type sizes and 480 px Overlay ceiling. The open Coach sheets get the quiet input when no composer is open. In `solo`, retain its existing composer as the sole editable input; adding the slot must not add another field. Keep its screen-reading context line with that composer. The existing `auto` exception remains.

2. **Accept: one continuation route and a stable reading box.** Remove “Ask a follow-up” beside every answer under a slot, including `heldnew`, `longnew` and `tipheld`. The quiet input continues the current answer; when help fills the slot, the bar's Ask continues that same answer. Reserve the reading height in advance: quiet → full → quiet must preserve the reading box's top and bottom, text and scroll position, Files and action-row positions. In particular, fix both `held` → `heldnew` and `longread` → `longnew`; preserving only the lead's position leaves the recorded defect unresolved. This requires equal geometry within each sequence, not one universal reading-box height for every layout.

3. **Accept the no-slot-input rule, with a factual correction for `error`.** `livecoach` retains the composer below and loses the slot input. `error` also loses the slot input, but its round 18 screenshot does **not** already have an Ask input below: it shows the recovery panel with Sign in, Try again and Dismiss. My finding explicitly said, “There is only one field here; this is not a recurrence of mute's former duplicate-input defect.” Keep that recovery panel and the bar's Ask; no new composer is required to satisfy this fix. Retain the 64 px slot in both states.

4. **Accept.** In `nothing`, put Open on line 2's right, after Copy, with the existing reason and call time intact. Open is the contextual route for that Suggestion.

5. **Accept.** Resume and Stop occupy exactly the same width and region. Together with the existing fixed status region, this keeps the time, divider and Peek stationary across Listening, Paused and Slow down, within the previously agreed 1 px tolerance.

6. **Accept.** The open `menu` and Overlay form one continuous panel: one outer outline and shadow, with no internal bottom rule, rounded corner or shadow at their join, in either theme. Moving the menu closer while retaining the upper panel's shadow does not finish the fix.

7. **Accept.** In `solid`, place the ordinary-width See-through tooltip inside the Overlay, just above its action-row control, with the arrow pointing at that control. Keep “See-through” unbroken and the explanation readable at the existing size. This resolves Claude's remaining anchor finding without reopening the already-fixed width issue.

8. **Accept.** Give the `visuals` heading about 17 px of clear space below the tab rule, matching `coach`. The whole heading must sit below the sticky header, with no clipping or underline touching its letters.

9. **Accept.** In `search`, restrict the backdrop to the page area below the complete Sessions title. The entire rail, including the selected Sessions item, remains undimmed and uncut. Preserve the dropdown's already-correct clearance below the title.

10. **Accept.** Reserve one width for the actions area in `mode` and `modeactive`, wide enough for either the button or active chip. The description keeps the same line breaks and position when activation occurs; Saved remains beside the replacement control.

11. **Accept.** In `live`, show whole Earlier rows and remove the last visible row's redundant bottom divider. Keep the band's outer bottom boundary, its clearance above the composer and its independent scrolling. Removing the doubled line must not remove the bounded history area already accepted in round 18.

**Dana's avatar ghost:** I do not require adding it to this contract for my scores. It was Claude's zero-cost, out-of-contract observation; I made no deduction for it. Leaving it out creates no additional GPT Sol blocker. This is not a decision on Claude's behalf.

## 2. Missing round 18 deductions

**None of my scored round 18 defects is missing**, with the exact forms above. The coverage is:

| Recorded GPT Sol defect | Contract point(s) |
| --- | --- |
| Reading box loses about 20 px and follow-up returns when help arrives | 2 |
| Missing slot in Interview, paused Interview, Behavioral and Solo | 1 |
| Missing slot/input in the open Coach sheets | 1 |
| Follow-up returns in `tipheld`; duplicate inputs in `livecoach` | 2, 3 |
| Visuals heading touches the tab rule | 8 |
| Menu join retains a border, corners and shadow | 6 |
| Paused divider and Peek shift 2 px | 5 |
| Slot input remains in `error` | 3 |
| Suggestion lacks Open | 4 |

One recorded evidence limitation is not newly demonstrated by the proposal:

> “The equal-height quiet live-page slot is not shown, so that visual requirement is not credited as demonstrated.”

That remains a zero-cost evidence note, not a missing deduction or an additional condition for reaching 9. The existing equal-height requirement remains in force. My preferences for larger sources, metadata and utility controls likewise carry no deduction and need no new work. Points 7 and 9–11 address the other judge's observations, which I accept without inventing additional deductions.

## 3. Expected category floor

**Yes. If these points are built in the forms above, prior accepted fixes remain intact and there are no new defects, every category in every one of the 18 cells will be at least 9 for me. None would remain below 9 for a known reason.**

My round 18 category minimum was already 9.0. These fixes resolve the remaining recorded defects; there is no further taste threshold or unannounced requirement. This is a conditional contract commitment, not a score submission for unseen round 19 renders, and it does not predict Claude's verdict.

I reviewed both judges' round 18 records, my scores and the earlier contracts, and inspected the round 18 `error`, `solo` and `live` light screenshots to resolve the wording above. I did not run the app, tests or a fresh full screenshot scoring pass. Runtime capture, focus, timing and integration claims remain unverified and retain their zero-cost treatment.
