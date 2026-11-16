# Claude's answer: the round 19 contract (#231)

## 1. The points

1. **The slot in the last states without it: accept, in this form.** The same 64 px slot sits at the same y under the bar, the same as in `held`, in `interview`, `interviewpaused`, `behavioral`, `coachtab`, `objectives`, `notip` and `solo`, in both themes. The quiet words and the input share one vertical centre, as in idle. The rest of the round 18 contract's point 3 applies:
   - `interview`, `interviewpaused`, `behavioral`: an answer is open, so the quiet slot's input continues it ("Ask about this call…"). The answer moves down by the slot and keeps every line it shows today. "non‑repeating" stays whole and the quote stays balanced. The opened Overlay stays within 480 px. In `interviewpaused`, "2 new" stays beside Resume updates, and the slot stays quiet with its input.
   - Coach sheet (`coachtab`, `objectives`, `notip`): the slot sits above the sheet, so the sheet's top edge is at the same y as the Ask sheet (`tipquiet`) and the Visual sheet (`visualtab`). Expanded `objectives` stays within 480 px; if it can't, its list scrolls inside the sheet and the slot stays.
   - `solo`: there is no Session, so the slot can't say "Listening". Its quiet words say the state, for example "Not in a call", and its input is the one way in. It holds today's "Ask a follow-up about your screen…" with attach, mic and Send, at the slot's height and y, and no second input appears below it. The "Read your screen…" line stays under the slot.
2. **No "Ask a follow-up" beside an answer under a slot: accept, in this form.** The answer's action row holds only its actions (Shorter, Copy and so on) in every state with a slot: `held`, `heldnew`, `longread`, `longnew`, `longend`, `tipquiet`, `tipheld` and `tipgone`. Nothing below the slot moves between the pairs `held` → `heldnew`, `longread` → `longnew` and `tipquiet` → `tipheld` → `tipgone`. The reading box's bottom, the "Another way to answer" fade at its foot, Files, the action row and the Overlay's bottom edge stay at the same y within 1 px. That means the quiet frame's box today, ending at about y 467, with Files at 483 and the actions at 511 in `held`. The only change is inside the slot.
3. **`error` and `livecoach`: accept.** In `error` the slot keeps its quiet words with no input, at the same height and y. In `livecoach` the page shows one "Ask about this call…" box, the composer's.
4. **`nothing`: accept.** Line 2 reads reason · time, and then Copy and Open on its right, in the same order and at the same size as the other kinds.
5. **`paused`: accept.** Resume and Stop have the same box width, so the divider and Peek keep their x exactly (0 px, measured in both themes).
6. **`menu`: accept, in this form,** in both themes:
   - no 1 px rule at the Overlay's bottom;
   - no rounded corners where the two meet;
   - no shadow band falling on the top of the menu. The menu's background stays flat from its first row down, with no darker or lighter band under the join.

   One outline and one shadow go around the outside of the whole.
7. **`solid`: accept.** The tooltip sits inside the Overlay's bounds, directly above the See-through button. Its arrow points at that button's centre, within about 8 px of its x, and "See-through: off" stays whole. Covering part of the slot while it shows is fine.
8. **`visuals`: accept.** The "Visuals" heading's cap top sits about 17 px under the tab rule, with nothing clipped by the sticky header. It is the same clearance as "Coach tips during the call" on `coach`, and the same in `flow:visual`'s last frame.
9. **`search`: accept.** The rail is fully bright, and the "Sessions" item is not cut. The backdrop covers only the page area to the right of the rail and below the title.
10. **`mode` → `modeactive`: accept.** The actions area has a fixed width that fits the wider of the button and the chip. The description keeps the same text, the same line breaks and the same x in both frames, and Saved stays beside the chip.
11. **`live`: accept.** The Earlier box shows whole rows only. The last visible row has no divider under it, so the box's own bottom edge is the only line there. Scrolling stays inside the box.

**Dana's ghost:** yes, put it in if it is cheap. With See-through on, Dana's "DO" avatar should not show through behind the answer lines in `interview` or `interviewpaused`, in either theme. The answer's text area needs enough backing behind the words. It costs 0 either way, and I won't mark it down if it is left out.

## 2. Marked down in round 18 and missing

Every round 18 **defect** I scored is covered:

| Round 18 defect | Point |
| --- | --- |
| `solid` tooltip | 7 |
| `menu` seam (overlay and setup) | 6 |
| `paused` 2 px | 5 |
| `heldnew`/`longnew` follow-up and the 20 px loss | 2 |
| interview slot | 1 |
| `tipheld` follow-up | 2 |
| Coach sheet slot | 1 |
| `visuals` heading | 8 |
| `search` rail cut | 9 |
| `mode` wrap | 10 |
| `live` divider | 11 |

Taste items I named that cost up to 1 tenth. Each is cheap, so I'd like them in:

- **Retro heading:** *"The Retro heading now reads 'Objectives: 3 of 4 objectives met', so it says 'objectives' twice."* Use "Objectives" as the label and "3 of 4 met" as the count, or "3 of 4 objectives met" alone.
- **`firstrun` gap:** *"squeezed the gap between the second example and the numbered steps to about 10 px, against about 24 px between other blocks in the card."* Bring it back to the card's block gap while the whole card still fits at 1440×900.
- **`email` line break:** *"breaks after 'Nothing is sent from', so 'Shrewd:' starts line 2."* Break after "Written from the Notes." instead.
- **`mailfail` wording:** *"The agreed wording (round 16, 27) stopped at 'The draft is kept here.'"* Drop "try again, or copy it".

Out of contract last round, which I flagged "for the following round":

- **The Flow's date:** *"The Flow 'From seat list to first invoice' is labelled 'changed at 19:40', but its Lisbon box shows '60 seats · 12 Feb'. 12 Feb was only proposed at 19:54."* At 19:40 the Lisbon box shows the date as it stood then, or the label moves to the time 12 Feb was agreed. This applies to `visuals` and `livevisual`. It cost 0 in round 18, and I'd like it in.

Left out on purpose, at 0 cost: the Stop tooltip covering the slot (normal hover), the tight `longread` window (point 2 keeps it as is, which I accept), the `found` header and the `highlights` measure.

## 3. Will every category be at 9 or above?

Yes. If all 11 points are built with no new defects, every category in every cell is at 9 or above for me.

The one category under 9 today is active-listening consistency, at 8.9. It lost about 1 tenth to the follow-up appearing in `heldnew`, and 1 tenth to the interview layouts lacking the slot. Points 2 and 1 fix both, which takes it to about 9.1. Overlay and ask polish (9.0) go up with points 5, 6 and 7. Ask, flow:heard and live-coaching consistency (9.0) go up with points 1 and 2.

The risks are the ways the fixes could add a new defect:

- **Interview height:** if adding the slot to the interview layout cuts an answer line or the "Heard" quote, or pushes the Overlay past 480 px, active-listening typography and layout drop back to about 8.9.
- **`solo`:** if it ends up with both a slot input and its own composer, ask consistency drops to about 8.9. This is the round 17 two-boxes defect again.
- **`held` and its pairs:** if anything below the slot still moves by more than 1 px between `held` and `heldnew` (or the long and tip pairs), consistency in ask, active-listening and flow:heard stays near 9.0, and active-listening stays under 9.
- **`objectives`:** if the slot pushes the expanded `objectives` past 480 px or clips its last row, live-coaching layout drops under 9.
