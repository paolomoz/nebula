# Pitfalls

> **Status: rounds 1–2 authored (Pitfall A round 1; Pitfall B round 2 — 2026-05-15).**
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

## Pitfall B — Sticky containing-block trap

**Failure mode.** A site needs `position: sticky` on a nav, a logo, a
sidebar, or any persistent chrome element. The author also wants
horizontal-overflow protection — so they set
`body { overflow-x: hidden; }` (or `overflow-x: clip`). Often
combined with `body { height: 100%; }` from a CSS reset.

The combination makes **`body` itself the sticky containing block**
for any sticky descendant. Since `body` is now capped at one viewport
tall, the sticky element **un-sticks after viewport 1** — even though
`position: sticky` is correctly declared and worked when the page was
shorter than the viewport.

The regression is **silent on visual inspection** if the reviewer only
looks at the hero / first fold — sticky elements appear to work
fine. The break is past the first scroll, when the sticky logo
suddenly disappears or stops following.

This is the most common reason a nebula render's S11 *Context-aware
logo* or a persistent masthead breaks past the hero — verified in
a real test run.

**Check.**
1. Scan the rendered CSS for `body { ... overflow-x: hidden | clip }`
   and for any rule that gives `body` a clipped overflow or a finite
   height (`height: 100%`, `height: 100vh`, etc.).
2. For every element rendered with `position: sticky`, verify its
   containing block is **not** `body`. The containing block is the
   nearest scrollport ancestor that is *not* clipped on the relevant
   axis.
3. **Open the rendered page past the first viewport** (programmatic
   check: scroll to `document.documentElement.scrollHeight / 2`,
   sample the sticky element's `getBoundingClientRect()` — `top`
   should still be ≤ the declared sticky offset, not below it). A
   Playwright sanity check that scrolls to multiple positions and
   asserts sticky-element top stays bounded catches this in seconds.

**Remedy.** Scope horizontal-overflow protection to a **wrapper
around the sections**, not `body`:

```css
/* Bad — traps any sticky descendant */
body { overflow-x: hidden; height: 100%; }

/* Good — wrapper protects scroll without trapping stickies */
body { /* no overflow rule; no height: 100% */ }
.page-wrap { overflow-x: clip; }   /* clip, not hidden, so sticky
                                       still establishes containing
                                       block via the document root */
```

Stickies declared *outside* `.page-wrap` (or via portals) escape the
wrapper's clipping entirely. If a sticky must live inside the wrapper,
remove `body { height: 100% }` and verify the wrapper has no other
overflow or transform that creates a containing block.

The render contract names this check as **Sticky element integrity**
in `render/SKILL.md` Phase 4.
