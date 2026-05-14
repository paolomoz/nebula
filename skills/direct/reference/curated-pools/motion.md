# Curated pool — motion vocabularies

> **Status: rounds 2–3 authored 2026-05-14 (11 vocabularies).**
>
> This pool lists named motion vocabularies the agent samples from in
> `nebula:direct` Phase 2 (axis A4). Each entry is a *rule set* — what is
> allowed to move, what is not, and how it moves when it does. Rounds 2–3
> authored from the nebula motion playground (ambitious / material /
> cinematic / chain-reactive postures; trivial hover-and-fade primitives
> deliberately excluded).

The agent reads this file when committing on the motion temperament axis.
**Sample from this list; do not invent a motion strategy.** If a brief
calls for a posture not represented here, stop and surface it — the pool
grows by user authorship, never by improvisation.

## Schema for each entry

```
## V<n> — <name>

**Character.** The posture the vocabulary declares. One sentence.
**Allowed to move.** Specific elements / surfaces.
**Not allowed to move.** Specific exclusions.
**Easing character.** Named curve with reasoning.
**Duration character.** Specific range.
**Trigger discipline.** Hover / scroll / click / continuous / route-change.
**Fits.** Anchor families / brief signals this vocabulary fits.
**Avoid for.** Briefs / anchors this vocabulary should not be used for.
```

## Entries

## V1 — Magnetic chain

**Character.** A page where elements are aware of the cursor and of each other — the closest element pulls strongest, the next pulls toward the first, the chain transmits.

**Allowed to move.** A chain of secondary elements (badges, breadcrumbs, nav items, decorative dots) that propagate cursor-pull along the chain. Each link follows the previous link, not the cursor directly.

**Not allowed to move.** Primary CTAs (must stay where intended). Body text. Any element that breaks reading flow. Form fields and inputs.

**Easing character.** `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — ease-out-quad. Calm decay; the chain settles, it doesn't snap.

**Duration character.** 140ms response on each link. Chain transmission is staggered by the per-link response, not by an explicit delay.

**Trigger discipline.** Cursor position (continuous). No click, no scroll. Desktop only — the vocabulary loses its meaning on touch.

**Fits.** Indie game / playful tech, music label, vibrant consumer; brand-led microsites where the cursor is a protagonist; risograph and pop-art anchor families. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, civic institutional, tech research (cursor playfulness reads as unprofessional); mobile-first designs (no cursor); long-read pages (breaks reading flow). <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V2 — Paper-fold

**Character.** Surfaces hinge along a fold line. The site reads as material — folded paper — not pixels.

**Allowed to move.** Card flips revealing back content; section openers that fold open along a center crease; modal entrances along a fold rather than a fade.

**Not allowed to move.** Navigation transitions (folding away the nav causes disorientation). Accidental triggers from scroll. Fold-on-hover where the fold is the *only* affordance — there must be a visible interaction handle.

**Easing character.** `cubic-bezier(0.22, 1, 0.36, 1)` — out-expo. The fold accelerates into the hinge and decelerates to rest, like real paper falling.

**Duration character.** 600ms hinge. Long enough to read as material, short enough not to drag.

**Trigger discipline.** Hover or click. Never continuous, never time-driven.

**Fits.** Quiet craft / atelier, editorial / publication, wine / spirits, boutique hotel, hospitality; material-led / foraged-palette / sense-of-history anchor families; print-adjacent brands. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech (too theatrical for the register), tech research, healthcare clinical, sports athletic, indie game (over-styled for playful product). <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V3 — Rack focus

**Character.** A film camera in the page. The site insists on one focus at a time; everything else recedes.

**Allowed to move.** Blur and dim on non-focused siblings within a grid, gallery, or menu. Scale up gently on the focused element. Depth-of-field is the *only* expressive move in this vocabulary.

**Not allowed to move.** Body type (blurring body text fails comprehension). Single-element views — rack focus needs siblings to defocus *against*. Translate or rotate moves.

**Easing character.** `cubic-bezier(0.4, 0, 0.2, 1)` — standard cinematic ease, mirrors how a camera lens actually pulls focus.

**Duration character.** 300ms focus pull. Felt as a camera operation, not a screen transition.

**Trigger discipline.** Hover on any element within the grid. The grid is the trigger surface, individual elements are the foci.

**Fits.** Editorial / publication, documentary / journalism, luxury fashion / fragrance, cinema / film, music label; gallery and portfolio briefs; festival-poster anchor families. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech (depth-of-field reads as gimmicky), tech research (data must stay readable), sports athletic, indie game (energy-mismatch); long-read body content where blur fails comprehension. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V4 — Iris transition

**Character.** Section openers and route changes close to a circle, then expand from a circle. A camera iris, not a fade. The cut is visible and earns its pause.

**Allowed to move.** Major section transitions, route changes, hero-to-detail handoffs. The iris always operates on the full viewport surface, never on a sub-element.

**Not allowed to move.** Micro-interactions; hover states; anything that fires more than 2–3 times per session. The iris is rare by design.

**Easing character.** `cubic-bezier(0.65, 0, 0.35, 1)` — in-out-cubic. Symmetric closing and opening; the pause at full-closed is part of the move.

**Duration character.** 1100ms total — 550ms close, 550ms open. Built for a deliberate beat, not for speed.

**Trigger discipline.** Click or route change. Never hover, never scroll-into-view, never time-driven.

**Fits.** Cinema / film, music label, luxury fashion / fragrance, indie game; festival-poster anchor families; special-event and campaign pages; promo / launch sites. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech, tech research / academic, healthcare clinical, civic institutional; product apps where transitions should be invisible; high-frequency UI surfaces. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V5 — Heat trace

**Character.** The cursor leaves a warm trail through the page — like a hand brushing through warm sand. Where you've been is briefly remembered; the trail cools and settles.

**Allowed to move.** Ambient warmth on the hero or above-the-fold surface. Long-form reading pages where the trace lives in the margins. The trace is a *layer*, never a foreground element.

**Not allowed to move.** Form fields. Data tables. Any element the cursor must precisely engage with — the wake would obscure or distract from the target.

**Easing character.** Linear decay (per trail node) plus radial fade (per trail node). Each trail node fades by a constant factor per frame; the trail length is implicit in the decay rate.

**Duration character.** Each trail point persists ~700ms then fades. The continuous trail is alive as long as the cursor moves.

**Trigger discipline.** Cursor movement (continuous). Desktop only — touch has no continuous cursor.

**Fits.** Editorial / publication, documentary / journalism, quiet craft / atelier, luxury fashion / fragrance; long-form reading pages; material-led anchor families; brand-led microsites. <!-- inferred -->

**Avoid for.** Tech research / academic, trust-led B2B / fintech, sports athletic, healthcare clinical; form-heavy or data-dense interfaces; mobile-first designs. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V6 — Type-set-on-scroll

**Character.** As a paragraph scrolls into view, its variable-font weight grows from hairline to bold across reading time. The text "sets itself" as you read.

**Allowed to move.** Editorial headings, pull quotes, and section-opening paragraphs — but only when set in a variable font with a weight axis. The animation maps to scroll dwell, not to a wall-clock duration.

**Not allowed to move.** Navigation labels (distracting). Body paragraphs (the animation pulls focus the wrong direction — heading-class type only). UI text. Non-variable fonts (the move requires the variable axis; without it, the discipline fails).

**Easing character.** Linear, mapped to scroll progress through the element. The user controls the pace.

**Duration character.** Tied to scroll dwell — approximately 1.2 seconds of read-equivalent travel through the element, but actual duration depends on the user's scroll speed.

**Trigger discipline.** Scroll progress through the element. Each element animates only on first scroll-through; subsequent re-entries do not replay (unless an explicit "replay" handle is provided).

**Fits.** Editorial / publication, documentary / journalism, quiet craft / atelier, sustainable / eco; type-led anchor families; variable-font-aware briefs. <!-- inferred -->

**Avoid for.** Tech research with extensive code samples, indie game (too quiet a move), sports athletic, trust-led B2B / fintech; sites without variable fonts in their type stack. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V7 — Chromatic separation

**Character.** Hovered display text gets a slight RGB split — red shadow left, blue right. A trace of digital materiality, holographic at the moment of focus, clean otherwise.

**Allowed to move.** `h1` / `h2` with `role="link"` or interactive headings; nav titles; eyebrow labels; display-class type that is genuinely interactive.

**Not allowed to move.** Body text (illegibility risk). Logo wordmarks (chromatic split fragments brand identity). Print or document-style designs (the move reads as a rendering bug in the wrong register).

**Easing character.** `ease-out` — the split engages quickly on hover, releases gently on un-hover. Asymmetric is correct here: the holographic moment is fast, the resolution is slow.

**Duration character.** 150ms engage, ~250ms release. The hover moment feels electric; the return to neutral feels considered.

**Trigger discipline.** Hover on display text only. Never on body, never on icons, never on form elements.

**Fits.** Music label, indie game / playful tech, vibrant consumer / playful, cinema / film (festival-poster register); risograph / pop-art / sleeve-art anchor families; brands where "digital materiality" is on-brand. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, editorial (literary register), civic institutional; brand wordmarks; print-style designs. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V8 — Match-cut morph

**Character.** Elements become other elements. A button morphs into a form; a card morphs into a modal. Shape continuity replaces fade transitions — visual cohesion across UI states.

**Allowed to move.** Button → expanded panel. Card → detail modal. Trigger → revealed content. The source element transforms into the destination in-place, with no second element appearing alongside.

**Not allowed to move.** Destination changes (this is *same-surface* morph only — the morphed element must end up where the original sat). Cases where the source must remain visible after the morph (use a different vocabulary for those). Cross-page route handoffs.

**Easing character.** `cubic-bezier(0.22, 1, 0.36, 1)` — out-expo. The morph accelerates into the new shape and decelerates to rest. Symmetric is wrong here; the destination shape should feel like the morph's resting point.

**Duration character.** 600ms shape transition. Long enough for the morph to be read as continuity, short enough not to drag.

**Trigger discipline.** Click or tap. Never hover, never scroll, never continuous.

**Fits.** Trust-led B2B / fintech, tech research / academic, civic institutional, vibrant consumer / playful; product showcases where state changes are part of the value story; app marketing pages. <!-- inferred -->

**Avoid for.** Editorial / publication, quiet craft / atelier, wine / spirits (over-engineered for static narrative); sites where the source element must remain visible after the morph fires. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V9 — Drift compositions

**Character.** Background composition lives. Geometric forms — circles, rectangles, lines — drift slowly along their own paths in Brownian motion. The page is alive but never busy.

**Allowed to move.** Hero / above-the-fold background compositions. Section-divider bands. Brand-element compositions in margins or empty surfaces. Each shape has its own loop period and direction.

**Not allowed to move.** Within reading flow (drift in the margins of the page where the eye is focused on text destroys reading). Data tables, charts, technical diagrams. Anywhere precision matters more than mood.

**Easing character.** `ease-in-out` (sinusoidal) per shape. Each shape follows its own path independently of others.

**Duration character.** 19–31 seconds per loop, with deliberately different periods per shape — the composition never returns to the same configuration on a predictable beat.

**Trigger discipline.** Continuous; independent per-element loops. Never coupled to user input, scroll, or events.

**Fits.** Quiet craft / atelier, sustainable / eco, music label, boutique hotel, luxury fashion / fragrance; material-led / foraged-palette anchor families; hero ambient bands and brand-mark compositions. <!-- inferred -->

**Avoid for.** Tech research / academic, sports athletic, healthcare clinical, data-dense pages (clinical margins need stillness); within reading-flow sections. <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## V10 — Color bleed

**Character.** A "wet ink" hover — the focused element's color bleeds into adjacent surfaces; the page is materially wet for a moment, then recedes back to neutral.

**Allowed to move.** Color and box-shadow on the hovered tile *and on its siblings* — adjacent tiles tint with the hovered element's accent. The bleed is a soft echo, not a saturation match. Used within tile grids or feature showcases where the focus colors its surroundings.

**Not allowed to move.** Form fields. Data interfaces and tables. Sites where adjacent elements must remain neutral for hierarchy. Body content. Anywhere the adjacent tinting would obscure meaning rather than reinforce it.

**Easing character.** `cubic-bezier(0.4, 0, 0.2, 1)` for the engage; a longer linear decay on release. Asymmetric is correct here: the bleed is fast, the recede is slow — like real ink soaking into paper and then evaporating.

**Duration character.** 400ms engage on hover, 800ms recede on un-hover. The asymmetry between engage and release is essential to the metaphor.

**Trigger discipline.** Hover. Never click, never scroll, never continuous.

**Fits.** Vibrant consumer / playful, music label, indie game / playful tech; brand-led product showcases; risograph / pop-art / sleeve-art anchor families where ink-soak is on-brand. <!-- inferred -->

**Avoid for.** Trust-led B2B / fintech (theatrical for serious tone), tech research / academic, healthcare clinical, civic institutional; form interfaces; data tables and dashboards (adjacent tinting destroys neutrality). <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 3) → user pick
  pickedAt: 2026-05-14
-->

## V11 — Crosshatching reveal

**Character.** Content emerges from behind etched diagonal stripes that wipe apart. Engraving / printmaking metaphor — the page is being inked in.

**Allowed to move.** Hero openers, major section reveals, transition bands. The stripes are a *temporary layer* — they exist only during the reveal and clear completely afterward; they are never decorative remainder.

**Not allowed to move.** Inline content reveals (the move is event-class, not paragraph-class). High-frequency reveals (one or two per page; the etching metaphor cannot be a UI primitive). Small surfaces (the stripes need viewport-scale to read as engraving rather than glitch).

**Easing character.** `cubic-bezier(0.65, 0, 0.35, 1)` — symmetric in-out-cubic. Stripes draw apart along the same curve they would close on, like a deliberate two-hand gesture.

**Duration character.** 1400ms total reveal, with each stripe staggered 80ms. Long enough that the engraving metaphor reads; short enough not to delay first-content-visible past the user's patience.

**Trigger discipline.** Scroll-into-view, once per element. Never replays, never on hover, never continuous.

**Fits.** Editorial / publication, music label, cinema / film, quiet craft / atelier; print-adjacent brands; record-sleeve and editorial-revival anchor families. <!-- inferred -->

**Avoid for.** Tech research / academic, trust-led B2B / fintech (the printmaking metaphor reads as ornament rather than meaning), high-frequency UI surfaces, healthcare clinical; mobile-first designs (narrow viewports compress the stripes into noise). <!-- inferred -->

<!-- _provenance:
  writtenBy: motion-playground.html (round 3) → user pick
  pickedAt: 2026-05-14
-->
