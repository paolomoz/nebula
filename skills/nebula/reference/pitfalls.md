# Pitfalls

> **Status: round 1 authored 2026-05-14 (Pitfall A — referenced by M1, M3, M5).**
>
> This file lists named rules render must respect. Each pitfall has an ID,
> a description of the failure mode, and a check the agent can run on the
> rendered output.

The agent reads this file in `nebula:render` Phase 4 to validate the
rendered HTML beyond impeccable's own checks.

## Schema for each pitfall

```
## Pitfall <letter> — <short name>

**Failure mode.** What goes wrong if this is violated, with a concrete
example.

**Check.** How the agent verifies the render is clean. Either a
description of an inspect step, a specific CSS / DOM pattern to look
for, or a measurable validation.

**Remedy.** What to change to satisfy the check.
```

## The pitfalls

## Pitfall A — Scrim layered under a filtered photo

**Failure mode.** A common composition for photographic sections is:
a full-bleed photo at `z-index: -2` plus a dark scrim that lifts the
overlaid type's contrast. When the photo has a CSS `filter` applied
(`saturate()`, `brightness()`, `hue-rotate()`, etc.) **and** the scrim
is attached to the *photo element's* `::after`, the filter applies to
the photo *and* to its pseudo-element. The scrim gets darkened /
desaturated by the very filter that was supposed to atmosphere the
photo — so the contrast you intended to add is partly eaten, and AA
contrast at the type baseline fails.

This shows up most often in moves M1, M3, and M5 (any move that
combines a `filter` on the photo with a scrim for type contrast).

**Check.**
1. For each section that has a `filter:` on a photo / image-bearing
   element, locate every scrim pseudo-element (`::before` / `::after`
   with `position: absolute; inset: 0`).
2. Verify each such scrim is attached to the *parent section*, not to
   the filtered element. Specifically: the scrim's CSS selector must
   target the parent (`.hero::after`), not the photo (`.hero .photo::after`).
3. Sample WCAG contrast at the densest type point against the rendered
   composition (not just the scrim color × paper color). AA must hold;
   AAA where the brief requires it.

**Remedy.** Move the scrim's `::after` declaration from the
filtered element to its parent container. Use `position: absolute;
inset: 0; z-index: -1; pointer-events: none;` so the scrim sits
between the filtered photo (z: -2) and the foreground content (z: ≥0).
The parent's `::after` is outside the filter chain, so the scrim
renders at its declared opacity.

Worked example shown in `moves-library.md` § M1 Recipe (CSS block).
