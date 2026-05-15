---
name: direct
description: Set the visual direction for a new single-page design. Silently picks an anchor from human-curated candidates, commits on the 5 personality axes (typography, density, color, motion, edges), names one productive tension, and writes the target spec (PRODUCT.md, DESIGN.md, DESIGN.json) plus a reasoning trace at nebula/direction.md. Use when a nebula brief exists and a direction is needed, or via /nebula:direct.
license: Apache-2.0
---

# nebula:direct

Resolve `nebula/brief.md` into a complete **target specification**:
project-root `PRODUCT.md` and `DESIGN.md` (impeccable format), a
`DESIGN.json` sidecar with the divergence audit trail, and a
`nebula/direction.md` with the full reasoning trace.

`direct` produces the spec against which `render` operates. It never writes
HTML — that is `nebula:render`.

## Inputs

- No positional. `direct` reads `nebula/brief.md` and operates against it.
- `--re-direct` — optional. Replace the current direction with a new one.
  Triggers stale-flagging on the rendered page (if any). Default behaviour
  without the flag is additive: if a direction already exists, the agent
  asks before replacing.

## Setup

1. Run the master skill's setup
   (`skills/nebula/SKILL.md` § Setup) — impeccable dep check, context
   loader, state read.
2. Verify `nebula/brief.md` exists. If not, stop and recommend
   `$nebula brief` first.
3. Read `nebula/direction.md` if present. If a prior direction exists and
   `--re-direct` was not passed, ask whether to refine or replace.

## Procedure

> **Retrieval discipline.** Every pool / library pick (Phases 2, 4,
> 4b, 4d, 4e) follows the index-first pattern documented in
> `skills/nebula/reference/retrieval.md`: read the `<pool>.index.json`
> sidecar, filter by `fits` / `avoid` / tech-tier / pool-specific
> stats, score top 3–8 candidates, then read only those entries'
> full bodies from the markdown. Never load the full pool markdown
> to pick a single entry. The full markdown is for the final pick
> (after narrowing) and for Phase 5's distinctiveness check.

### Phase 1 — Anchor selection (invisible)

Pick a real-world anchor that fits the brief. **The user is not asked.**
The procedure is silent; the result is surfaced at the gate.

1. Read the brief. Note vibe, audience, purpose, constraints.
2. Generate **3 candidate anchors** internally. Each candidate must be a
   specific, named real-world reference (a film, a building, a magazine,
   a piece of industrial design, a city block, a poster series — not a
   web reference, and not a category like "modernist"). Procedure:
   `reference/anchor-selection.md`.
3. Score each candidate on two dimensions:
   - **Fit** to the brief (vibe, audience, purpose).
   - **Distinctiveness** from LLM-default web aesthetics.
4. Pick the highest-combined-score candidate. Record the other two as
   `runner-ups` in `direction.md` so the user can redirect if they hate
   the chosen one.
5. Continue to Phase 2 without prompting the user.

### Phase 2 — Commit on the 5 axes

For each of the 5 axes in `skills/nebula/reference/axes.md`, commit to a
named choice. **Sample from the curated pools under `reference/curated-pools/`.
Do not generate from scratch.** If a needed entry is missing from a pool,
stop and tell the user — do not improvise.

The 5 axes:

1. **Typography** — typeface pair + scale + weight strategy.
   Pool: `reference/curated-pools/typefaces.md`.
2. **Density** — named density school (e.g., "editorial-sparse",
   "utilitarian-tight"), drives spacing tokens.
   Pool: `reference/curated-pools/density.md`.
3. **Color palette** — **two independent picks** per the v2 schema:
   (a) **Substrate mode** — `light` (`#F4F1E6`) or `dark` (`#0F1216`),
   selected from brief signals; default `dark`, override on signals
   like *"paper"*, *"cream"*, *"editorial-print"*, *"almost-white"*,
   *"clinical"*.
   (b) **Accent set** — picked from `palettes.md` by `fits` / `avoid`
   / `intensity` / `anchorMode`. Default pool slice is
   `anchorMode: dual` (3 accents); pick from `anchorMode: free`
   (5 accents) only on brief signals like *"festival-loud"*,
   *"five-accent identity"*, or *"section-distribution palette"*.
   See § Accent territory rules in `render/SKILL.md` for the
   role-to-section-element contract render enforces.
   Pool: `reference/curated-pools/palettes.md`.
4. **Motion temperament** — one named motion vocabulary defining what is
   allowed to move, what is not, easing character.
   Pool: `reference/curated-pools/motion.md`.
5. **Edge language** — corner radius philosophy + border treatment.
   Pool: `reference/curated-pools/edges.md`.

For each axis, also record **the obvious default for this anchor** alongside
the choice — so the distinctiveness check at Phase 4 has data to operate on.

#### Default leans (apply unless the brief signals otherwise)

These are nebula's design defaults — applied silently and surfaced in the
gate report so the user sees them and can override.

- **Substrate (palette pick a) — default dark.** Substrate is one of
  two fixed values: `#F4F1E6` (light) or `#0F1216` (dark). Default
  `dark` — gives photographic heroes their best surface and produces
  the strongest first-viewport contrast available in the vocabulary.
  **Override** when the brief signals *"paper"*, *"cream"*,
  *"editorial-print"*, *"almost-white"*, *"clinical"*, *"airy"*, or
  when the anchor implies a print/editorial register (Codex,
  Editorial Sparse, Gentle Craft, Hospitality Calm, Atelier Folio,
  Op-Ed typically want light substrate).
- **Accent set (palette pick b) — pick from the pool.** Dual-anchor
  pool (3 accents) is the default slice; pick free-mode (5 accents)
  only when the brief earns multi-accent section-distribution.
- **Hero treatment** — see Phase 4 § Hero default.
- **Image source** — picsum.photos by default (see Phase 4c).

Distinctiveness check (Phase 5) operates against the **LLM-default**,
not against nebula's default leans. A dark-leaning palette pick can
still be distinctive if the chosen palette isn't the obvious choice
for the anchor.

### Phase 3 — Name the tension

Commit to **one named tension** the design exploits — a productive
contradiction (e.g., *"editorial serif body with a brutalist display sans"*,
*"quiet motion under loud color"*, *"brutal density on soft palette"*). If
you cannot name a tension, the design is averaging itself toward the middle.
Stop and re-pick at least one axis.

### Phase 4 — Pick the moves

Read `skills/nebula/reference/moves-library.md`. Pick **2–4 named moves**
that fit the chosen anchor and the 5 axes. Each move is referenced by ID
(M1, M2, …) in the moves library. Record the picked move IDs in
`direction.md` and propagate them into `DESIGN.md` so `render` knows what
recipes to execute.

If the moves library does not yet contain entries that fit, surface this
to the user — do not invent moves. The library grows over time as the user
adds new ones.

#### Hero default

Default: **include M1 (Photographic hero, full-bleed)** in the picked
moves. The hero is the page's first viewport — a full-bleed
photographic background carries subject and mood from the very first
scroll-point, and pairs strongly with the dark-palette default for
type contrast (apply `Pitfall A` scrim care — scrim on parent's
`::after`, never on the filtered photo).

When M1 is picked, photography must read as **prominent**, not
apologetic — `min-height: 90–100vh` on the hero, full-bleed scale,
contrast-verified at the densest type area. See `image-policy.md` §
Photography prominence.

**Override** when:

- Brief explicitly signals a non-photo hero (*"type-led hero"*,
  *"abstract hero"*, *"logo-only hero"*, *"no hero image"*, *"minimal
  hero"*, *"hero is the headline"*).
- Anchor family in the no-photos column (per `image-policy.md` §
  per-anchor defaults): Codex, Op-Ed, Manifesto, brutalist, type-led,
  Utilitarian Tight, Data Dense, civic institutional in restrained
  mode.

When overriding, surface the substitution and the substitute hero
treatment in the gate report (e.g., *"M1 substituted with type-led
hero per brief; no photo slot for hero."*).

### Phase 4b — Pick signatures (2–4 per page, one always on the hero)

Read `skills/nebula/reference/signatures.md`. Every nebula page picks
**2–4 signatures**, with **one always on the hero**. Zero is no
longer a valid choice; "well-mannered editorial that could be
re-skinned for any brand in the anchor family" is the failure mode
this floor exists to prevent.

**Two-step pick procedure:**

1. **Hero signature first.** Filter the index to hero-eligible
   entries — currently **S1 · S2 · S4 · S10 · S12 · S13 · S14 ·
   S15 · S17** (specimen-local hero-class entries). For external-
   only hero-class entries (S3 / S5 / S7) the user must opt in
   explicitly. Score the surviving candidates by anchor-family fit,
   tech-budget tier, anti-pair check against the picked motion
   vocabulary, and specimen availability. Pick the highest scorer.
2. **Additional signature(s).** Pick **1–3 more** from non-hero
   section roles (gallery, atmospheric band, type-as-pattern,
   transition, persistent chrome, closer). Same constraint set as
   step 1; no two picked signatures may occupy the same section
   role.

For every candidate verify:

1. **Tech-stack budget.** Anchor permits the signature's tech tier.
2. **Anchor-family eligibility.** Brief's anchor appears in the
   signature's "Anchor families that earn it" list.
3. **Anti-pairs.** Picked motion vocabulary (Phase 2 § A4) does NOT
   appear in the signature's anti-pairs. No two picked signatures
   list each other in anti-pairs.
4. **Specimen availability.** Prefer local specimens. External-only
   requires explicit user opt-in.

Record picks in `DESIGN.json.extensions.signatures[]` as
`[{ id, name, sectionRole, isHero, specimen }, ...]` where exactly
one entry has `isHero: true`.

### Phase 4c — Image slots and policy

Read `skills/nebula/reference/image-policy.md`. Decide the page's
**image policy** and derive **image slots** from the picked moves.

**Policy detection** (priority order):

1. Check whether `nebula/assets/images/` exists with at least one
   recognised file (webp/jpg/jpeg/png). If yes →
   `imagePolicy: "user-supplied"`.
2. Check the brief for explicit generation requests (phrases like
   *"generate the imagery"*, *"AI-generated photos"*, *"images by
   model"*). If yes → `imagePolicy: "generate"`. Surface to the user
   that generation is currently NOT implemented and picsum.photos
   will be used as fallback.
3. Default → `imagePolicy: "picsum"`.

**Slot derivation**:

For each picked move from the photographic family (M1–M5), produce
slots per the table in `image-policy.md` § "How direct picks image
slots." M5 reuses M1's slot at a heavier filter; do not produce a new
slot for it.

For each slot, author:
- `role` (e.g., `hero`, `card-1`, `atmos-band`, `subject-portrait`)
- `moveId` (the move that placed it)
- `aspectRatio` + computed `dimensions`
- **`keywords[]`** — brand-anchored terms derived from the anchor + brief.
  *Not* stock clichés ("creative," "studio," "work"); specific terms
  the anchor implies ("ceramic-studio," "pottery-wheel," "warm-light").
- **`altText`** — describe the photographic subject, not the design role.

**Per-anchor skip rule**:

If the brief's anchor family is in the no-photos column of
`image-policy.md` (Codex / Op-Ed / Manifesto / brutalist / type-led /
Utilitarian Tight / Data Dense), do **not** pick photographic moves
(M1–M5) in Phase 4. If you already picked one, revisit Phase 4 — the
anchor disallows it.

**Budget check**:

Total slot count must be ≤ 8 photos per page (raised from ≤ 4 in
round 2; the prior cap broke signature picks like S1 Horizontal
Parallax Gallery, which needs ≥ 5 cards to read as a marquee). The
Catalog anchor's M2 card grid can occupy most of the budget without
needing to displace an M1 hero. Surface if the budget is breached.

Record all slots and the policy in `DESIGN.json.extensions.imageSlots[]`
and `DESIGN.json.extensions.imagePolicy`.

### Phase 4d — Pick hovers (default coverage on every card-like grid)

Read `skills/nebula/reference/hovers.md`. **Hover affordance is the
default, not the opt-in** — every nebula page ships responses on
essentially every clickable or pointable card-like element. Pick a
hover for **every** picked move/signature that hosts a card grid or a
list:

| Host pattern | Default hover |
|---|---|
| M2 photographic card grids | **H1 Sadie** |
| M8 type-as-pattern bands / per-card-accent catalogues | **H16 Storefront** |
| S9 Elastic Cards | **H1 Sadie** (already wired in the specimen) |
| List-style content items (news / article / post feeds) | **H17 Editorial Item** |
| Bordered callout blocks (pull-quotes, classified inserts) | container border shifts to `--acc-primary` on hover (no H-entry needed; render handles inline) |

The picking rules:

1. **One hover per host grid.** Cards within a single grid must
   share the same hover (mixing is render-refusal grade).
2. **Multiple grids on one page may use different hovers** — a
   photographic destination grid using Sadie and a type-led
   catalogue using Storefront is correct.
3. **Verify per-candidate constraints**:
   - `Applied to` list includes the picked host move/signature.
   - Brief's anchor family appears in `Fits`.
   - Anti-pairs against the picked motion vocabulary (Phase 2 § A4).
4. **Pages with no cards** still carry button + link hovers (Phase
   4e + 4f); no card hover is forced where there are no cards.

Record picked hovers in `DESIGN.json.extensions.hovers[]` as
`{ id, name, appliedToMove, appliedToGridSlot, specimen }`. Render
validates that every card-family section in the page has a matching
`data-hover` attribute (see `render/SKILL.md` § hover-coverage
validation).

### Phase 4e — Pick button animation (0–1 per page)

Read `skills/nebula/reference/buttons.md`. Pick **exactly one** button
animation (or zero on rare anchors). Every button animation is a
**button system** — it defines both a primary recipe (filled CTA) and
a secondary recipe (ghost / outline / text complement). Picking one
binds the *entire button voice* of the page.

**Default**: B1 Quiet hover (universal CSS pattern, fits any anchor).

**Tech-stack budget check.** Verify the picked animation's tech tier
is within the brief's anchor budget:

| Anchor family | Allowed tier (max) |
|---|---|
| trust-led B2B / fintech, healthcare clinical, civic institutional, tech research / academic | CSS-only (B1–B6) |
| editorial / publication, documentary / journalism, sustainable / eco, quiet craft / atelier | CSS + light JS (B1–B8) |
| music label, cinema / film, festival / promo, luxury fashion (statement tier), indie game (premium tier) | + canvas particle / WebGL (B1–B12) |
| vibrant consumer / playful, hospitality | usually B1–B8; B9–B12 only for launch / campaign pages |
| sports / athletic | B1–B8 (CSS or ripple) |

A pick that exceeds the budget is **refused** — propose a cheaper
alternative from the same animation family. Surface the substitution
in the gate report.

**Anchor fits / avoids.** Verify the brief's anchor family appears in
the entry's "Fits" list (or close adjacency). Anchors in the entry's
"Avoid for" list disqualify the pick.

Record the picked entry in `DESIGN.json.extensions.buttonAnimation`
as `{ id, name, tier, primaryRecipe, secondaryRecipe, specimen }`.

### Phase 4f — Pick link effect (0–1 per page)

Read `skills/nebula/reference/links.md` (via its index sidecar per
the retrieval pattern). Pick **exactly one** link effect (or zero on
rare ops/utility briefs). The picked effect applies *uniformly* to
every inline `<a>` in body prose across the page — mixing two link
decorations in the same paragraph is the loudest possible
reading-flow inconsistency.

**Default**: L1 Sansa (slim left-to-right underline). It fits any
anchor that wants visible link cues; L12 Anpan (color-only) is the
quietest alternative for trust-led B2B / clinical / civic where
underline decorations read as too much.

**Constraints to verify**:

1. **Anchor-family fits.** Brief's anchor appears in the entry's
   "Fits" list (or close adjacency).
2. **Tech budget.** All Codrops link effects are CSS-only — no
   tech-budget concern. The recommended-range table at the top of
   `links.md` narrows candidates by anchor.
3. **Accessibility.** L12 Anpan requires the focus-visible outline
   in its recipe (color-only differentiation fails WCAG 1.4.1 on
   its own). If the brief signals "accessibility-first" or "AAA
   contrast", prefer L1 Sansa or L3 Wilcox (always-visible
   underline cue).
4. **Semantic specificity.** L9 Pinkerton (strikethrough draw-in)
   is reserved for *semantic* uses (deletion, superseded refs) —
   don't pick it as a default link decoration.

Record the picked entry in `DESIGN.json.extensions.linkEffect` as
`{ id, name, recipe }`. Render applies it to every `<a>` in body
prose.

### Phase 5 — Distinctiveness check (gate)

Before writing the target spec, run the distinctiveness check. For each
axis, name the **default choice** (what an LLM would pick if asked cold)
and the **nebula choice**. If 3 or more axes match the default, the
direction has collapsed to the middle — re-pick from a different pool
selection or re-roll the anchor. Surface the comparison table in the
direction reasoning trace.

### Phase 6 — Show the direction to the user (gate)

Surface a one-screen direction report:

```
direction resolved
==================

Anchor:           <named reference>  (runner-ups: <ref-2>, <ref-3>)
Tension:          <one-line productive contradiction>

Axes:
  typography      <pool-entry-name>  (default would be: <default>)
  density         <pool-entry-name>  (default would be: <default>)
  palette         <pool-entry-name>  (default would be: <default>)
  motion          <pool-entry-name>  (default would be: <default>)
  edges           <pool-entry-name>  (default would be: <default>)

Moves:       <M-ids>
Signatures:  <S-ids, or "none — type-led">
Hovers:      <H-ids per host, or "none">
Buttons:     <B-id> (<tier>)
Links:       <L-id> (e.g., L1 Sansa)
Image slots: <N total, broken down: hero ×1, card ×3 …>
Image policy: <picsum | user-supplied | generate (will fall back to picsum)>

Palettes baked in:
  substrate  <dark | light>
  primary    <id>  (<name>)         → default
  alternate  <id>  (<name>)         → ?palette=<id>
  alternate  <id>  (<name>)         → ?palette=<id>

Default leans applied:
  substrate     <dark | light (overridden because: …)>
  hero          <photo-bg (M1) | type-led (overridden because: …)>
  image source  <picsum | user-supplied | generate>

Distinctiveness: <N>/5 axes diverge from default.
```

Wait for the user's confirmation (`"go"`, or a correction to any axis or
the anchor) before writing the target spec.

### Phase 7 — Write target spec

Author the project-root spec in impeccable's format:

- `PRODUCT.md` — strategy (audience, register, brand personality, anti-refs,
  design principles), derived from the brief.
- `DESIGN.md` — visual system (Stitch frontmatter + 6 sections). Tokens
  derived from the axis choices in Phase 2 and the moves picked in Phase 4.
- `DESIGN.json` — sidecar with extensions (divergence, componentStyle,
  voice, moves, signatures, palettes). Include the full audit trail
  of axis choices, defaults, the named tension, picked-signature
  records under `extensions.signatures[]`, and the **three baked-in
  palettes** under `extensions.palettes`:
  ```json
  "palettes": {
    "substrate": "dark | light",
    "primary":   { "id": "<picked-id>", "accents": [...] },
    "alternates": [
      { "id": "<adjacent-id-1>", "accents": [...] },
      { "id": "<adjacent-id-2>", "accents": [...] }
    ]
  }
  ```
  Adjacents are picked from the same pool slice (same `anchorMode` —
  dual or free) as the primary, by closeness of `fits[]` overlap.
  Render bakes all three into the page as switchable CSS classes
  (see `render/SKILL.md` § Phase 3 § Palette bake-in).

Every component HTML/CSS snippet must be self-contained, use `ds-` class
prefixes, and respect impeccable's hard rules.

### Phase 8 — Write direction.md and update state

Write `nebula/direction.md`. The full reasoning trace: brief restatement,
anchor candidates considered and scored, axis choices with defaults,
tension named, moves picked, distinctiveness table, user confirmation.

Update `nebula/state.json`:

- `direction.resolvedAt` = now
- `direction.anchor` = chosen anchor name
- `direction.directionFile` = `"nebula/direction.md"`
- `stage` = `directed`
- If `--re-direct` and a render exists: set `render.stale = true` and
  `render.staleReason = "direction changed at <ts>"`.

Print a one-screen summary and recommend `nebula render`:

```
direction written
=================

Anchor:   <named reference>
Tension:  <one-line>
Moves:    <M-ids>

Wrote:
  PRODUCT.md, DESIGN.md, DESIGN.json
  nebula/direction.md

Next: $nebula render
```

## Outputs

| Path                  | Purpose                                                |
|-----------------------|--------------------------------------------------------|
| `PRODUCT.md`          | Target strategy (impeccable format).                   |
| `DESIGN.md`           | Target visual system (Stitch frontmatter + 6 sections). |
| `DESIGN.json`         | Sidecar with extensions and full direction audit trail. |
| `nebula/direction.md` | Resolved direction + full reasoning trace.             |
| `nebula/state.json`   | Updated with `direction.*` fields and `stage: directed`. |

## Failure modes

- **No brief.** Abort and recommend `$nebula brief`.
- **Missing pool entry.** When the brief implies a need the pool doesn't
  cover (e.g., a typeface family no curated entry fits), stop. Surface
  what's missing and ask the user to either expand the pool or accept a
  near-fit from the existing pool. Never invent.
- **Tension undeclarable.** When Phase 3 cannot name a productive tension
  after the axes are picked, stop. Re-pick at least one axis with the goal
  of creating tension. Surface the loop honestly.
- **Distinctiveness collapse.** When Phase 5's check fails (≥3 axes match
  default), stop. Re-pick from different pool entries or re-roll the
  anchor.
- **Re-direct with an existing rendered page.** Always confirm before
  stale-flagging. The flag is reversible (clears on successful re-render),
  but a re-direct invalidates work the user may have approved.

## References

- `skills/nebula/reference/axes.md` — the 5 axes spec.
- `skills/nebula/reference/moves-library.md` — moves indexed by anchor
  family.
- `skills/nebula/reference/signatures.md` — signature effects catalog;
  composition rule + tech-stack budget per anchor family.
- `skills/nebula/reference/image-policy.md` — image source policy
  (picsum.photos by default; user-supplied takes priority; generation
  opt-in only) + per-anchor skip rules + slot schema.
- `skills/nebula/reference/hovers.md` — hover effects catalog (H1–H15
  from Codrops). Applied as modifiers to card-grid host moves; 0–1
  hover per card grid.
- `skills/nebula/reference/buttons.md` — button animation catalog
  (B1–B12). Each entry is a *button system* (primary + secondary
  recipes); 0–1 per page; tech-stack budget per anchor family.
- `skills/nebula/reference/links.md` — inline-link effect catalog
  (L1–L12 from Codrops Creative Link Effects). 0–1 per page;
  applied uniformly to every `<a>` in body prose. CSS-only
  universally; anchor decides which entry fits.
- `skills/nebula/reference/retrieval.md` — the index-first retrieval
  pattern used by every Phase 2 / 4 / 4b / 4d / 4e pick. Index
  sidecars live next to each pool's markdown (`<pool>.index.json`).
  Regenerate via `node scripts/build-indexes.mjs` after any pool
  edit.
- `reference/anchor-selection.md` — the 3-candidate generator + scoring
  procedure.
- `reference/curated-pools/` — human-curated content for each axis.
