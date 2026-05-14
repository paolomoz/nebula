---
name: render
description: Render the directed design as a self-contained single-page HTML file (typically nebula/index.html). Executes the moves named in DESIGN.md via impeccable's craft loop, runs impeccable's validations, and iterates with the user. Use after /nebula:direct has produced a direction, or via /nebula:render.
license: Apache-2.0
---

# nebula:render

Generate the single-page HTML at `nebula/index.html` from the target spec
produced by `direct`. Execute the named moves from the moves library.
Validate via impeccable's craft loop.

`render` does **not** make design decisions. All decisions live in
`PRODUCT.md` / `DESIGN.md` / `DESIGN.json` / `nebula/direction.md`. If
something is undecided at render time, stop and recommend `direct` —
do not improvise.

## Inputs

- No positional. `render` reads the target spec from the project root and
  the direction trace from `nebula/direction.md`.
- `--refine` — optional. Iterate on an existing render against user
  feedback. Default behaviour: if `nebula/index.html` exists and is not
  stale, ask whether to refine or replace.

## Setup

1. Run the master skill's setup
   (`skills/nebula/SKILL.md` § Setup) — impeccable dep check, context
   loader, state read.
2. Verify the target spec exists at the project root: `PRODUCT.md`,
   `DESIGN.md`, `DESIGN.json`. If any is missing, stop and recommend
   `$nebula direct` first.
3. Verify `nebula/direction.md` exists. If absent, abort — the direction
   trace is load-bearing for render's named-move execution.
4. If `nebula/index.html` exists and `state.json` marks it `stale: true`,
   warn the user before overwriting.

## Procedure

### Phase 1 — Load the contract

Read the target spec end-to-end:

- `PRODUCT.md` — register, audience, brand personality, anti-refs,
  design principles.
- `DESIGN.md` — token vocabulary (colors, typography, spacing, radii),
  component defaults, voice rules.
- `DESIGN.json` — divergence trace, picked moves, named tension, the
  axis-by-axis choices.
- `nebula/direction.md` — full reasoning trace; cite when a render
  decision needs to defend itself against the spec.

The picked moves (M-ids) in `DESIGN.json` are the recipes `render`
executes. Look each one up in
`skills/nebula/reference/moves-library.md` before rendering.

The picked signatures (S-ids) in
`DESIGN.json.extensions.signatures[]` are the named set-piece effects
to apply. For each picked signature:

- Read the catalog entry in `skills/nebula/reference/signatures.md`
  for composition role, recipe outline, and anti-pairs.
- If the entry's `specimen` field is a local path
  (`skills/nebula/reference/signatures/<slug>/index.html`), **read the
  specimen end-to-end** as the structural and timing reference. The
  specimen is the source of truth for *how* — markup hierarchy, JS
  event handlers, animation timings.
- If `specimen` is `"external-only"`, stop and surface to the user:
  *"signature `<S-id>` has no local specimen — proceed with a
  placeholder section + a TODO link to the source, or pick a different
  signature with a local specimen?"* Do not fabricate a specimen from
  the source URL or from your own knowledge.

### Phase 2 — Compose the page-shape brief

Before writing HTML, write a one-screen **page-shape brief** to
`nebula/shape.md`: section sequence, what each section is for, which
moves apply to which sections, the placement of the named tension. The
brief is the spec render writes the HTML against — a render that
deviates from its own brief is rejected.

### Phase 3 — Render

Generate `nebula/index.html` as a **self-contained** file:

- Inline CSS in a single `<style>` block (or in `<style>` blocks per
  major section if that aids review).
- External fonts via standard CDN imports (Google Fonts, etc.) where the
  picked typefaces require them.
- No JavaScript unless the moves or signatures demand it; if needed,
  inline.
- `:root` CSS custom properties expose the design tokens from
  `DESIGN.json` so downstream consumers can re-skin.
- Respect impeccable's hard rules: OKLCH colors, no pure black/white,
  no glassmorphism, no side stripes, no gradient text, ≥1.25 type ratio
  for brand register, AA contrast minimum.

**Resolve each image slot** in `DESIGN.json.extensions.imageSlots[]`
through the chain defined in `skills/nebula/reference/image-policy.md`:

1. **User-supplied first.** Check `nebula/assets/images/<role>.<ext>`
   (webp, jpg, jpeg, png in that preference order). If a file matches
   the slot role, use it. Mark `data-img-source="user"`.
2. **Unsplash Source URL** (the default).
   `https://source.unsplash.com/featured/<w>x<h>/?<keywords>` where
   `<w>x<h>` derives from `slot.dimensions` and `<keywords>` is the
   slot's `keywords[]` joined by commas. Mark
   `data-img-source="unsplash"`.
3. **Generated.** Only if `imagePolicy === "generate"`. **Currently
   NOT implemented** — when this policy fires, surface a warning to
   the user that generation is on the roadmap, and fall back to
   Unsplash for this render.
4. **Labeled placeholder.** If the above fails (network, no fit),
   render a CSS-only block with the slot's `altText` as visible text
   and `data-img-source="placeholder"`. Placeholders are visible TODOs,
   not polished defaults.

Every rendered photographic element must carry:
- `data-img-source="<user|unsplash|generated|placeholder>"`
- `data-img-slot-id="<slot.id>"` (back-reference to DESIGN.json)
- `alt="<slot.altText>"` — describing the subject, not the design role
- `loading="lazy"` (except hero / above-the-fold, which may be eager)
- `decoding="async"` for non-critical photos

**Apply the picked button animation** from
`DESIGN.json.extensions.buttonAnimation` to the page's button system:

- Look up the entry in `skills/nebula/reference/buttons.md`. The entry
  defines both a `primaryRecipe` and a `secondaryRecipe`.
- Apply `primaryRecipe` to every `.btn--primary` (or equivalent CTA
  class in the page namespace) — uniformly across the page.
- Apply `secondaryRecipe` to every `.btn--secondary` (ghost / outline /
  text) — uniformly across the page.
- For JS-bearing animations (B7–B12), inline the JS at the bottom of
  the page. Bind via `data-` attributes the entry specifies
  (`data-magnetic`, `data-ripple`, `data-particle="squares"`, etc.).
- For `external-only` specimens (B9–B12 particle / shader), the
  catalog's recipe outline is the integration spec; the full canvas
  / shader library is referenced via the source link. If the user
  has not committed to vendoring those libraries, **render falls
  back to B1 quiet hover** and surfaces the substitution.

**Apply each picked hover** in `DESIGN.json.extensions.hovers[]` to its
declared host:

- Look up the hover entry in `skills/nebula/reference/hovers.md` for
  the CSS recipe.
- Scope the recipe to the host grid via `data-hover="<H-id>"` on the
  host wrapper (e.g., `<section data-hover="H1" data-move="M2">`).
  Render adapts the canonical `.fig`/`.cap` class names from the
  recipe to the page's own namespace.
- If the hover has a local specimen, read it for any non-CSS context
  (markup splits like H11 Romeo's two-span title); otherwise the CSS
  recipe in `hovers.md` is the full instruction.
- All cards in the host grid receive the same hover. Mixing two
  hovers within one grid is render-refusal grade.

For each picked signature, **adapt the specimen — never inline it
verbatim**. The specimen demonstrates the technique; render adapts it
to the brand:

- Replace specimen placeholder copy (titles, captions, item labels)
  with content sourced from the brief or the page-shape brief.
- Swap specimen color values with the page's design tokens (paper /
  ink / accent from the picked palette in `DESIGN.json`). The
  specimen's color choices were illustrative; the brand's are
  authoritative.
- Substitute typography to the picked Google Fonts (display + body
  from the picked typeface pair). Match the specimen's weight strategy
  but with the brand's families.
- Preserve the specimen's structural patterns (markup hierarchy,
  JS event handlers, animation timing values, CSS custom properties).
  Re-author CSS class names if they collide with the page's namespace.
- Scope the signature's CSS to a wrapper marked
  `data-signature="<S-id>"` so the page's structural data-attributes
  can locate it later (see § Phase 4 § Signature integrity).

### Phase 4 — Impeccable craft loop

Hand the rendered HTML to impeccable's craft loop for validation. Run
the relevant impeccable commands (consult impeccable's command registry
at session start). Address every issue the loop surfaces; do not ship a
render with unresolved hard-rule violations.

Also run nebula-specific checks:

- **Pitfalls** (`skills/nebula/reference/pitfalls.md`). The named-rule
  validations the user has authored. Pitfall A is the most-cited one
  (scrim under filtered photo); verify it holds wherever a move uses
  a photo filter.
- **Signature integrity.** Every signature ID named in
  `DESIGN.json.extensions.signatures[]` is present in the rendered
  HTML, wrapped in a `data-signature="<S-id>"` element. Every
  `data-signature` element in the rendered HTML corresponds to a
  picked signature. No orphan signatures either direction.
- **Move integrity.** Same rule for `data-move="<M-id>"` against the
  picked moves in `DESIGN.json`.
- **Image slot integrity.** Every slot in
  `DESIGN.json.extensions.imageSlots[]` resolved to a rendered image
  (or a labeled placeholder). Every rendered photo carries
  `data-img-source` + `data-img-slot-id` + a non-empty `alt`. Total
  photo count is within the Unsplash-discipline budget (≤ 4 photos
  unless the anchor is Catalog with an M2 card grid as the only photo
  set).
- **Hover integrity.** Every hover in
  `DESIGN.json.extensions.hovers[]` is applied to its declared host
  in the rendered HTML, scoped to a `data-hover="<H-id>"` wrapper.
  Every card within the host grid receives the same hover — no
  intra-grid mixing.
- **Button-system integrity.** The picked button animation
  (`DESIGN.json.extensions.buttonAnimation`) is applied uniformly:
  every `.btn--primary` shares the same primary recipe; every
  `.btn--secondary` shares the same secondary recipe. No buttons on
  the page use animations from other catalog entries. If the picked
  animation was substituted by render (e.g., external-only specimen
  not available, fell back to B1), the substitution is recorded in
  the render report.

### Phase 5 — Surface and iterate

Open the rendered page for the user to view. Surface a one-screen render
report:

```
render complete
===============

Page:        nebula/index.html
Sections:    <list of section data-roles>
Moves:       <M-ids actually applied, in execution order>
Tension:     <one-line>

Validations:
  impeccable craft     <pass/fail summary>
  nebula pitfalls      <pass/fail summary>

Next: review the page, then either approve or describe what to refine.
```

Iteration happens in conversation: the user describes feedback, render
re-runs with `--refine`. **Default: keep direction.** Only invoke
`direct --re-direct` if the user's feedback names an axis-level change
(e.g., *"the typography is wrong"*) rather than a composition-level fix
(e.g., *"the hero needs a quote"*).

### Phase 6 — Update state

Update `nebula/state.json`:

- `render.resolvedAt` = now
- `render.indexFile` = `"nebula/index.html"`
- `render.shapeFile` = `"nebula/shape.md"`
- `render.stale` = false
- `stage` = `rendered`

## Outputs

| Path                  | Purpose                                                |
|-----------------------|--------------------------------------------------------|
| `nebula/index.html`   | The rendered single-page design (self-contained).      |
| `nebula/shape.md`     | The page-shape brief render wrote the HTML against.    |
| `nebula/state.json`   | Updated with `render.*` fields and `stage: rendered`.  |

## Failure modes

- **Missing target spec.** Abort and recommend `$nebula direct`.
- **Picked move not in library.** When `DESIGN.json` names a move (e.g.,
  M7) that does not exist in `moves-library.md`, abort. Surface the
  mismatch and ask the user to add the move to the library or pick a
  different one in `direct`.
- **Impeccable validation fails on hard rules.** Do not ship the render.
  Surface every failure and iterate. If the failure follows from a
  direction-level choice (e.g., a palette that cannot reach AA contrast),
  surface that the direction itself is the conflict and recommend
  `direct --re-direct` with a constraint update.
- **User feedback names an axis-level change during render iteration.**
  Stop refining the HTML. Recommend `direct --re-direct` — refining HTML
  against a wrong axis is wasted cycles.

## References

- `reference/render-contract.md` — what a finished nebula page must
  satisfy (token surface, structural data-attributes, validation checks).
- `skills/nebula/reference/moves-library.md` — the named moves render
  executes.
- `skills/nebula/reference/signatures.md` — the signature catalog;
  specimens live at `signatures/<slug>/index.html`.
- `skills/nebula/reference/image-policy.md` — image source policy
  (Unsplash by default; user-supplied takes priority; generation
  opt-in) + slot schema + provenance + validation rules.
- `skills/nebula/reference/hovers.md` — hover effects catalog
  (H1–H15 from Codrops). CSS recipes scoped to `data-hover="<H-id>"`.
- `skills/nebula/reference/buttons.md` — button animation catalog
  (B1–B12). Each entry defines a primary + secondary recipe applied
  page-wide.
- `skills/nebula/reference/pitfalls.md` — nebula-specific render rules.
