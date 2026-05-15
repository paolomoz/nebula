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
- `--auto` (or `-y`) — **end-to-end mode**. Suppresses the Phase 5
  review pause; produces the render and exits. External-only
  specimen needs and overwrite confirmations are resolved by
  substitution rather than by asking. See § Auto-mode behavior
  below.

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

#### Palette bake-in (3 palettes per page)

Every render bakes **three palettes** into the page — the primary
pick plus two alternates from `DESIGN.json.extensions.palettes`.
Substrate is set once at the page root via `--bg` / `--ink`; accent
sets are scoped to a class on `<html>` (or `<body>`):

```html
<html class="palette-primary" data-palette-primary="<primary-id>"
      data-palette-alts="<id-1>,<id-2>">
```

For each of the three palettes, render emits one CSS class block
keyed by the palette ID:

```css
:root, .palette-<id> {
  --acc-primary:        #...;
  --acc-divider:        #...;
  --acc-inverted-band:  #...;
  --acc-section-a:      #...;   /* free-mode only */
  --acc-section-b:      #...;   /* free-mode only */
}
```

`--bg` and `--ink` come from the picked substrate and do NOT change
across palettes (the substrate axis is independent — alternates only
swap accents). Render also emits the constant substrate vars:

```css
:root {
  --bg:  #F4F1E6;   /* or #0F1216 for dark substrate */
  --ink: #0F1216;   /* or #F4F1E6 for dark substrate */
}
```

A small bootstrap script switches the palette class on load:

```html
<script>
  (function() {
    var p = new URLSearchParams(location.search).get('palette');
    if (!p) return;
    var alts = (document.documentElement.dataset.paletteAlts || '').split(',');
    var primary = document.documentElement.dataset.palettePrimary;
    if (p === primary || alts.indexOf(p) >= 0) {
      document.documentElement.className =
        document.documentElement.className.replace(/palette-\S+/g, '').trim() +
        ' palette-' + p;
    }
  })();
</script>
```

Place the script in `<head>` so the swap fires before paint and
prevents a primary-then-alternate flash. ~2KB inline JS.

**At render completion print the 3 active palette IDs** to the
render report (see § Phase 5).

#### Generate the page

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
2. **picsum.photos seed URL** (the default).
   `https://picsum.photos/seed/<keywords-joined-by-hyphen>/<w>/<h>`
   where `<w>`/`<h>` derive from `slot.dimensions` and
   `<keywords-joined-by-hyphen>` is the slot's `keywords[]` joined
   with `-`. Mark `data-img-source="picsum"`.
   **The deprecated `source.unsplash.com/featured/<w>x<h>/?<keywords>`
   endpoint must never be emitted — it stopped serving images in 2024.**
3. **Generated.** Only if `imagePolicy === "generate"`. **Currently
   NOT implemented** — when this policy fires, surface a warning to
   the user that generation is on the roadmap, and fall back to
   picsum.photos for this render.
4. **Labeled placeholder.** If the above fails (network, no fit),
   render a CSS-only block with the slot's `altText` as visible text
   and `data-img-source="placeholder"`. Placeholders are visible TODOs,
   not polished defaults.

Every rendered photographic element must carry:
- `data-img-source="<user|picsum|generated|placeholder>"`
- `data-img-slot-id="<slot.id>"` (back-reference to DESIGN.json)
- `alt="<slot.altText>"` — describing the subject, not the design role
- `loading="lazy"` (except hero / above-the-fold, which may be eager)
- `decoding="async"` for non-critical photos

**Apply the picked link effect** from
`DESIGN.json.extensions.linkEffect` to every inline `<a>` in body
prose:

- Look up the entry in `skills/nebula/reference/links.md` (via its
  index for the recipe location).
- Add the `.lnk` class to every body-prose `<a>` element (or adapt
  the class name to the page namespace).
- Inline the CSS recipe; for letter-stagger entries (L5 Roald) or
  text-swap entries (L8 Magnus), wrap link text per the entry's
  declared markup (split letters into spans, add `data-replace`,
  etc.).
- Do **not** apply the link effect to button-like `<a>` elements
  (CTAs, nav items). Only body-prose links carry this decoration.

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
to the brand. **But preserve every "Load-bearing details" item
declared in the signature's catalog entry** — those are the parts of
the specimen that, if simplified, collapse the effect. Examples:
canvas z-order relative to the hero scrim (S17), sampling-source for
lens / chromatic effects (S15, S17), specific parametric clamps that
keep scroll-driven motion within section bounds (S8), containing-block
hygiene for sticky descendants (S11). When a signature entry lists
load-bearing details, render the adaptation in two passes — first
adapt content/tokens, then *re-check every load-bearing detail still
holds* before finalizing the section.

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
  **Total picked signatures is between 2 and 4** (the new floor).
  **Exactly one picked signature carries `isHero: true`** in
  `DESIGN.json` and is rendered on the section with
  `data-section="hero"`; render refuses if the hero signature is
  not on the hero section.
- **Move integrity.** Same rule for `data-move="<M-id>"` against the
  picked moves in `DESIGN.json`.
- **Image slot integrity.** Every slot in
  `DESIGN.json.extensions.imageSlots[]` resolved to a rendered image
  (or a labeled placeholder). Every rendered photo carries
  `data-img-source` + `data-img-slot-id` + a non-empty `alt`. Total
  photo count is within the image-discipline budget (≤ 8 photos —
  raised from 4 in round 2 after S1 Horizontal Parallax Gallery
  picks were degrading to 3-card carousels under the prior cap).
- **Hover integrity.** Every hover in
  `DESIGN.json.extensions.hovers[]` is applied to its declared host
  in the rendered HTML, scoped to a `data-hover="<H-id>"` wrapper.
  Every card within the host grid receives the same hover — no
  intra-grid mixing.
- **Sticky element integrity (Pitfall B).** Scan the rendered CSS for
  rules that turn `body` into a sticky containing block:
  `body { overflow-x: hidden | clip }` *combined with*
  `body { height: 100% | 100vh }`, or any other rule that gives `body`
  a finite height. If any element on the page declares
  `position: sticky`, neither rule may apply to `body` — scope
  horizontal-overflow protection to a `.page-wrap` (or similar)
  *around* the sections, and never give `body` a finite height.
  Programmatic check: for every sticky element, after scrolling the
  page to `scrollHeight / 2`, the element's `getBoundingClientRect()`
  `top` must remain ≤ its declared sticky offset (i.e., still
  pinned). Visual inspection of only the hero viewport hides this
  regression — the check must scroll past viewport 1. See
  `pitfalls.md` § Pitfall B for the remedy.
- **Signature load-bearing details (per-entry).** For every picked
  signature whose catalog entry declares a "Load-bearing details"
  list, render verifies each listed property is present in the
  rendered HTML/CSS as authored (not simplified away during the
  specimen-adapt pass). Missing load-bearing details collapse the
  effect — e.g., S17 Rain lenses without canvas-above-scrim z-order
  ships as nearly invisible specks; S11 Context-aware logo without
  Pitfall B compliance un-sticks past viewport 1.
- **Hover coverage (default-on).** For every section in the rendered
  HTML whose `data-move` belongs to the card-family
  (`M2`, `M8`, `S9`, or any other card-grid-bearing move/signature
  picked), the section element MUST carry a `data-hover="<H-id>"`
  attribute pointing to a valid H-id from the hovers index. Silent
  omission is a render refusal. Bordered callout blocks must also
  carry a border-color hover transition consuming `--acc-primary`.
- **Accent territory integrity.** Each `--acc-*` custom property is
  consumed by the section roles its name implies. The contract:
  | CSS var | Allowed consumers |
  |---|---|
  | `--acc-primary` | hero kicker, primary CTA, masthead serif mark, top-of-page rule, hero hover |
  | `--acc-divider` | section dividers, hairline rules between bands, stat-row separators |
  | `--acc-inverted-band` | substrate of the inverted manifesto / declaration band |
  | `--acc-section-a` | one named section family (odd-indexed cards, one half of a pair) |
  | `--acc-section-b` | the alternate section family |

  A section element annotated as a hero MUST consume `--acc-primary`,
  not `--acc-divider` or `--acc-section-b`. Mixed-role placement on a
  single section is **render-refusal grade**. The check exists to
  catch the common failure mode where a multi-accent palette is
  sprayed indiscriminately across sections, producing a carnival
  rather than an editorial composition.
- **Palette bake-in integrity.** Three palette class blocks present
  in the rendered CSS — primary + two alternates. The bootstrap
  script reads `URLSearchParams.get('palette')` and swaps the
  `palette-<id>` class on `<html>` before first paint. Substrate
  (`--bg` / `--ink`) is constant across all three palettes. The
  three palette IDs are reported to Phase 5's render report.
- **Button-system integrity.** The picked button animation
  (`DESIGN.json.extensions.buttonAnimation`) is applied uniformly:
  every `.btn--primary` shares the same primary recipe; every
  `.btn--secondary` shares the same secondary recipe. No buttons on
  the page use animations from other catalog entries. If the picked
  animation was substituted by render (e.g., external-only specimen
  not available, fell back to B1), the substitution is recorded in
  the render report.
- **Link-effect integrity.** The picked link effect
  (`DESIGN.json.extensions.linkEffect`) is applied uniformly to
  every inline `<a>` in body prose. CTAs and nav links are exempt
  (they're button-system territory). No paragraph contains two
  different link decorations.

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

Palettes baked in:
  substrate  <dark | light>
  primary    <id>  (<name>)         → default
  alternate  <id>  (<name>)         → ?palette=<id>
  alternate  <id>  (<name>)         → ?palette=<id>

Validations:
  impeccable craft           <pass/fail summary>
  nebula pitfalls            <pass/fail summary>
  accent territory           <pass/fail summary>
  palette bake-in            <pass/fail summary>
  signature integrity        <pass/fail summary>
  hover-coverage             <pass/fail summary>

Next: review the page (the URL also accepts ?palette=<id> to preview
the two alternates), then either approve or describe what to refine.
```

**When `imagePolicy` resolved to `picsum`, append a one-line hint to
the render report (single line, immediately after the Validations
block):**

```
Image upgrade: this page renders with picsum.photos placeholders.
  A real photograph or a generated hero (e.g. Gemini 3 Pro Image,
  Midjourney, Imagen 3) will lift the result substantially for
  cinematic / music-label / festival / luxury / hospitality anchors.
  Future: `node scripts/gen-hero.mjs --slot=hero` (helper not yet
  implemented; track at TODO/issue).
```

Picsum is the right default — deterministic by seed, free, no API
key — but for any anchor where mood-photography is load-bearing
(music label, cinema, festival, luxury fashion, hospitality,
boutique hotel, wine / spirits), the hint flags that the page is
shipping at *placeholder* quality and an upgrade is one image away.
Do **not** show the hint when the slot was user-supplied; the
upgrade has already happened.

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

## Auto-mode behavior (`--auto`)

When `--auto` is set:

1. **Phase 5's review / refine pause is suppressed.** Render produces
   `nebula/index.html`, runs all Phase 4 validations, prints the
   completion report, and exits. No `--refine` invitation, no "wait
   for feedback" pause.
2. **Confirmation prompts are resolved by substitution:**
   - **Stale render exists** — overwrite without asking. The
     `state.json.render.stale` flag is consumed and cleared by the
     re-render.
   - **External-only specimen with no local fallback** (typically
     S3 / S5 / S7 / B9 / B10 / B11 / B12) — substitute the closest
     **local-specimen** sibling and record the substitution. For
     example, B9 particle-burst → fall back to B8 Material ripple
     for the same intent (click-acknowledge); S3 / S5 / S7 →
     S2 Canvas Grid Mouse or S12 Four-layer parallax depending on
     the hero role.
3. **Validation failures are repaired, not surfaced.** Auto-mode runs
   impeccable's craft loop and the nebula Phase 4 checks. When a hard-
   rule violation surfaces (pitfall hit, contrast failure, accent
   territory miss, hover coverage gap, sticky integrity break,
   load-bearing detail missing), the agent **repairs in place** and
   re-runs the check. Auto-mode escalates to a stop only if a
   violation can't be repaired within 3 attempts; in that case the
   page is still shipped, with the unresolved violation listed in
   the render report under `## Unresolved (auto-mode)`.
4. **The render report ends with an auto-mode summary** that the
   orchestrator concatenates with the brief and direct summaries:
   ```
   Auto-mode summary
   =================
   Inferred brief sections: <list>           # from brief --auto
   Substitutions in direct: <count>          # from direct --auto
   Render fallbacks: <count>                 # from render --auto
   Unresolved validations: <count or "none">
   Review the artifacts above to refine; re-run any phase
   manually to override.
   ```
5. **`state.json.render.mode = "auto"`** is recorded.

What auto-mode never compromises:

- The substrate / accent territory rules (every section consumes the
  correct `--acc-*` var).
- The signature-on-hero rule (one always present, even if substituted).
- The hover-coverage default-on rule.
- The image-discipline budget (still ≤ 8 photos per page).
- Pitfall A and Pitfall B (still validated).

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
  (picsum.photos by default; user-supplied takes priority; generation
  opt-in) + slot schema + provenance + validation rules.
- `skills/nebula/reference/hovers.md` — hover effects catalog
  (H1–H15 from Codrops). CSS recipes scoped to `data-hover="<H-id>"`.
- `skills/nebula/reference/buttons.md` — button animation catalog
  (B1–B12). Each entry defines a primary + secondary recipe applied
  page-wide.
- `skills/nebula/reference/links.md` — inline-link effect catalog
  (L1–L12 from Codrops Creative Link Effects). One effect applied to
  every body-prose `<a>` page-wide; CTAs and nav exempt.
- `skills/nebula/reference/pitfalls.md` — nebula-specific render rules.
