# Curated pool — density schools

> **Status: round 1 authored 2026-05-14 (one school — the Default).**
>
> This pool lists named density schools the agent samples from in
> `nebula:direct` Phase 2 (axis A2). Each entry is a *named*
> whitespace-and-rhythm strategy — *"balanced"* is not a school name.

The agent reads this file when committing on the density axis. **Sample
from this list; do not pick a number out of thin air.**

Round 1 ships a single school — the **Default** — applied to all intents
until more specific schools are tuned. When a brief calls for a markedly
different density (editorial-sparse for a long-read, data-dense for an
ops dashboard), the user adds the school here and direct then samples
from a wider pool.

## Schema for each entry

```
## D<n> — <name>

**Character.** What this density school *feels like*. One paragraph,
not a number.
**Section padding.** Desktop / tablet / mobile values (px).
**Line-height for body / display.** Specific multipliers.
**Type scale.** Ratio + base body size.
**Inter-element spacing.** Rhythm value + character.
**Container & grid.** Max-width + grid gap.
**Information density per viewport.** Sections per scroll, text density.
**Fits.** Anchor families / brief signals this school fits.
**Avoid for.** Briefs / anchors this school should not be used for.
```

## Entries

## D1 — Default

**Character.** Contemporary product density with a confident heading
voice. Section padding sits at 84px — comfortable but not luxurious; the
page transitions are felt without being announced. The type scale ratio
of 1.5 is the school's most opinionated choice: at a 16px base, headings
compound to ~54px display, which gives every section a real titular
moment. Body line-height holds at a calm 1.55 for reading rhythm while
display tightens to 1.10 so the big headings sit together, not loose.
Grid gap of 14px is *deliberately tight* — the school reads as
modern-product rather than editorial-airy. Together: a page that opens
firmly, breathes evenly between bands, and still gives heading
hierarchy real authority.

**Section padding.**
  - desktop: `84px`
  - tablet:  `59px` (84 × 0.7)
  - mobile:  `42px` (84 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.10`

**Type scale.**
  - ratio:        `1.5` (display-led)
  - base body:    `16px`
  - derived h3:   `24px`
  - derived h2:   `36px`
  - derived h1:   `54px`

**Inter-element spacing.** `20px` rhythm — regular. Stack gap between
heading, body, and CTA in a section block; the value is the unit the
school propagates wherever items live close together.

**Container & grid.**
  - container max-width: `1296px` (standard wide product)
  - grid gap:            `14px` (tight; cards sit close)

**Information density per viewport.** ~1.0–1.2 sections per 1080-tall
scroll on desktop; body bands run 50–70 characters per line at the
container max-width; card grids show three columns at full width with
minimal interstitial gutter.

**Fits.** All nebula intents in v0.x — this is the **default school**
applied when no more specific density is selected. Particularly suits
contemporary product, trust-led B2B, tech-research, civic, healthcare,
indie-game, music-label, athletic. Pairs well with anchor families that
want a confident heading voice without editorial slowness.

**Avoid for.** No hard avoids — but if a brief is markedly
editorial-led (long-read article, gallery folio, atelier portfolio),
the default heading scale (1.5) and tight grid (14px) will read as too
product. Author an `Editorial Sparse` or `Gentle Craft` school and use
that instead. Equally, if a brief is operations-led (data dashboard,
admin console with information density as a job), author a
`Data Dense` school with smaller padding and tighter line-heights.

<!-- _provenance:
  writtenBy: playground (density-playground.html) → user save
  savedAs: "Default"
  scope: applied to all nebula intents until more specific schools are tuned
-->
