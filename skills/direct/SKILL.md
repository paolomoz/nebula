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

Moves: <M-ids>

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
  voice). Include the full audit trail of axis choices, defaults, and the
  named tension.

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
- `reference/anchor-selection.md` — the 3-candidate generator + scoring
  procedure.
- `reference/curated-pools/` — human-curated content for each axis.
  *Human-authored content — see each file for status.*
