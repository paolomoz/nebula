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
3. **Color palette structure** — named palette with role definitions, neutral
   temperature, contrast strategy, accent allowance.
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

- **Palette (axis A3) — lean dark.** Default to a palette where the
  `bg` role sits at low lightness (ink-on-dark surface) rather than
  paper-on-light. Dark palettes give photographic heroes their best
  surface and produce the strongest first-viewport contrast available
  in the plugin's vocabulary. Inside `palettes.md`, prefer entries
  whose ink-on-bg contrast ratio implies the surface is dark — e.g.,
  *Midnight Magic*, *Black & Gold Elegance*, *Deep Sea*, *Crimson
  Hues*, *Dark Sunset*. **Override** when the brief signals *"light"*,
  *"airy"*, *"open"*, *"paper"*, *"clinical"*, *"cream"*, or when the
  anchor implies a print/editorial register (Codex, Editorial Sparse,
  Gentle Craft, Hospitality Calm, Atelier Folio, Op-Ed — these
  typically want lighter palettes).
- **Hero treatment** — see Phase 4 § Hero default.
- **Image source** — Unsplash by default (see Phase 4c).

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

### Phase 4b — Pick signatures (0–2, optional)

Read `skills/nebula/reference/signatures.md`. Decide whether the brief
earns one or two **signature effects** — named set-piece moments
distinct from moves (a moves library entry composes a section; a
signature is a specific elaborated effect occupying a defined section
role). Most pages pick **zero or one**; two is reserved for editorial,
cinematic, or promo briefs and requires the signatures to occupy
*different* section roles.

For each candidate, verify all four constraints:

1. **Tech-stack budget.** Does the brief's anchor family permit the
   signature's tech stack? See the budget table at the top of
   `signatures.md` (trust-led B2B → vanilla only; editorial → may earn
   GSAP; music label / cinema / festival → may earn Three.js / shader).
2. **Anchor-family eligibility.** The brief's anchor family must
   appear in the signature's "Anchor families that earn it" list.
3. **Anti-pairs.** The motion vocabulary picked in Phase 2 § axis A4
   must **not** appear in the signature's anti-pairs.
4. **Specimen availability.** Prefer signatures with a local specimen
   (`signatures/<slug>/index.html`). Picking a `specimen-status:
   external-only` signature is allowed but render will require the
   user's explicit go-ahead to ship a placeholder section.

If a candidate fails any check, do not pick it. **Zero is a valid
choice** — don't force a signature where one isn't earned by the brief.

Record picked signatures by ID (S1, S2, …) in `direction.md` and
propagate to `DESIGN.json` under `extensions.signatures[]`. Each entry:
`{ id, name, sectionRole, specimen }` where `specimen` is either the
local path or the literal string `"external-only"`.

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
   that generation is currently NOT implemented and Unsplash will be
   used as fallback.
3. Default → `imagePolicy: "unsplash"`.

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

Total slot count must be ≤ 4 photos per page (the Catalog anchor with
an M2 card grid is the exception: card slots may exceed 4 *only* if no
other photo slot is present). Surface if the budget is breached.

Record all slots and the policy in `DESIGN.json.extensions.imageSlots[]`
and `DESIGN.json.extensions.imagePolicy`.

### Phase 4d — Pick hovers (0–1 per card grid)

Read `skills/nebula/reference/hovers.md`. If any picked move/signature
is a card-grid host (M2 photographic card, S9 elastic-cards, or any
future card-grid pattern), **optionally** pick one hover from the
library to apply *uniformly* to all cards in that grid.

The rules:

1. **0–1 hover per card grid.** Multiple grids on the same page may
   use different hovers; cards within a single grid must use the same
   hover (mixing hovers within a grid is render-refusal grade).
2. **Defaults to zero.** Unless the brief signals card emphasis
   (portfolio brief, gallery brief, atelier folio, featured-work
   showcase), prefer no hover.
3. **Verify constraints.** For each candidate hover:
   - Its `Applied to` list includes a picked host move/signature.
   - The brief's anchor family appears in its `Fits` list.
   - Its CSS tech cost is acceptable (all H1–H15 are vanilla CSS — no
     tech-budget concern).

Record picked hovers in `DESIGN.json.extensions.hovers[]` as
`{ id, name, appliedToMove, appliedToGridSlot, specimen }`. Each
entry binds the hover to a specific host so render knows which grid
to scope the CSS to.

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
Image slots: <N total, broken down: hero ×1, card ×3 …>
Image policy: <unsplash | user-supplied | generate (will fall back to unsplash)>

Default leans applied:
  palette       <dark | light (overridden because: …)>
  hero          <photo-bg (M1) | type-led (overridden because: …)>
  image source  <unsplash | user-supplied | generate>

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
  voice, moves, signatures). Include the full audit trail of axis
  choices, defaults, the named tension, and the picked-signature
  records under `extensions.signatures[]`.

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
  (Unsplash by default; user-supplied takes priority; generation
  opt-in only) + per-anchor skip rules + slot schema.
- `skills/nebula/reference/hovers.md` — hover effects catalog (H1–H15
  from Codrops). Applied as modifiers to card-grid host moves; 0–1
  hover per card grid.
- `reference/anchor-selection.md` — the 3-candidate generator + scoring
  procedure.
- `reference/curated-pools/` — human-curated content for each axis.
