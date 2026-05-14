# Moves library

> **Status: stub — human-authored content required.**
>
> This file lists named, concrete design recipes ("moves") with enough
> specificity that `nebula:render` can execute them deterministically.
> Each move is referenced by ID (M1, M2, …) from `DESIGN.json` and
> applied during render.

The agent reads this file in two places:
- `nebula:direct` Phase 4 — picks 2–4 moves that fit the anchor and axes.
- `nebula:render` Phase 1 — looks up each picked move and executes it.

**Sample from this library; do not invent moves.** If a needed move is not
in the library, stop and surface it — the library grows by user
authorship, not by improvisation.

## Schema for each move

```
## M<n> — <short name>

**Use when.** The situation(s) this move fits — anchor families,
section roles, brief signals. Be specific; *"hero section"* is too vague.

**Recipe.** The concrete CSS / HTML / structural pattern. Measurable
values (opacity ranges, filter parameters, mask stops, specific
properties). Self-contained enough that render can copy-paste-adapt.

**Pitfalls.** Named pitfalls this move tends to trip into (cross-link
to `pitfalls.md`).

**Pairs with.** Other moves that compose well with this one (e.g., M1
pairs with M5 to bookend a page).
```

## Index by anchor family

<!-- TODO (human-authored): add the moves you've already vetted.
     The user has spoken about M1–M5 (photographic treatments) — those
     are starter candidates. Other anchor families (Swiss-grid,
     brutalist, editorial, type-led, etc.) will need their own moves.
     Add moves here as you discover or author them. -->

### Photographic anchor family

<!-- M1, M2, M3, M4, M5 from the user's earlier reference content go
     here once authored. The user has already drafted these in
     conversation; transcribe verbatim when ready. -->

*TODO: M1 — photographic hero (full-bleed)*

*TODO: M2 — photographic card / panel*

*TODO: M3 — full-bleed atmospheric band*

*TODO: M4 — fade-into-page mask*

*TODO: M5 — cinematic closer band*

### Type-led anchor family

*TODO*

### Grid / system anchor family

*TODO*

### Editorial anchor family

*TODO*
