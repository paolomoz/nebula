# Signatures library

> **Status: round 1 authored 2026-05-14 (9 signatures — 4 with specimens, 5 external-only).**
>
> This file catalogs named *set-piece effects* — discrete dramatic
> moments that occupy a specific section role. Signatures are distinct
> from the motion vocabularies in `curated-pools/motion.md`: vocabularies
> are page-wide *postures* (what's allowed to move at all); signatures
> are named *moments* (specific elaborated effects in a specific slot).

## How signatures compose with motion vocabularies

A page picks **exactly one** motion vocabulary (V1–V11 from
`curated-pools/motion.md`) + **0–2 named signatures**.

- Zero signatures is the type-led default.
- One signature is the most common — typically a hero or a gallery moment.
- Two is generous and reserved for editorial / cinematic / promo briefs;
  the two must be in different section roles (hero + gallery is fine;
  hero + hero is not).

Each signature declares **anti-pairs** — motion vocabularies it conflicts
with. The agent must check these in `direct` before picking the
combination; violations are render-refusal grade.

## Tech-stack budget per anchor family

Every signature declares its **tech stack**. Anchor families have
budgets:

| Anchor family | Tech budget |
|---|---|
| trust-led B2B / fintech, healthcare clinical, civic institutional, tech research / academic | vanilla CSS · vanilla JS only |
| editorial / publication, documentary / journalism, sustainable / eco, quiet craft / atelier | + GSAP if the move earns it |
| music label, cinema / film, luxury fashion, festival / promo, indie game (premium tier), boutique hotel (cinematic variant) | + Three.js / WebGL / custom GLSL |
| vibrant consumer / playful, hospitality, wine / spirits | usually vanilla JS; Three.js only for launch / campaign pages |
| sports / athletic | vanilla JS; rarely needs more |

A signature whose tech stack exceeds the brief's budget is **refused**
in `direct` — the agent surfaces the conflict and proposes a cheaper
alternative from the catalog.

## Schema for each entry

```
## S<n> — <name>

**Source / inspiration.** Link to the original source the signature is named after.
**Section role.** hero / gallery / transition / band / reveal / closer.
**Tech stack.** Vanilla CSS · Vanilla JS · GSAP · Three.js / WebGL · Custom GLSL.
**Anchor families that earn it.** Which nebula intents make this defensible.
**Recipe outline.** High-level structural notes — what to build, what to avoid.
**Anti-pairs.** Motion vocabularies (V<n>) this signature conflicts with.
**Specimen.** Local runnable HTML, or `specimen-status: external-only — see source`.
```

## Entries

## S1 — Horizontal Parallax Gallery

**Source / inspiration.** [tympanus.net/Tutorials/HorizontalParallaxGallery/index2.html](https://tympanus.net/Tutorials/HorizontalParallaxGallery/index2.html) — Codrops tutorial.

**Section role.** Gallery / portfolio band. Often deployed mid-page as the showcase moment of a folio or editorial feature.

**Tech stack.** Vanilla JS + CSS (no WebGL, no GSAP). Vertical scroll input is mapped to horizontal translation of a row of image panels, with per-layer parallax.

**Anchor families that earn it.** Music label, cinema / film, luxury fashion / fragrance, editorial / publication, vibrant consumer / playful, boutique hotel (cinematic variant); festival-poster and sleeve-art anchor families.

**Recipe outline.** A horizontally-laid row of large image panels with type overlays per panel. The container is taller than viewport; scroll progress drives `transform: translateX` on the row. Inner image layers translate at slightly different rates than the outer card (parallax depth). Single-axis scroll mapping — never combine with horizontal-scroll input.

**Anti-pairs.** V1 magnetic chain (competing cursor-driven motion), V6 type-set-on-scroll (both compete for scroll dwell), V11 crosshatching reveal (both want scroll-into-view as a major event).

**Specimen.** `signatures/horizontal-parallax-gallery/index.html`

<!-- _provenance:
  reimpl: clean-room (DOM-only port; no WebGL)
  author: Paolo
-->

---

## S2 — Canvas Grid Mouse

**Source / inspiration.** [codepen.io/creativeocean/full/emBOove](https://codepen.io/creativeocean/full/emBOove) — Creative Ocean codepen.

**Section role.** Hero / above-the-fold ambient. Replaces a static hero background with a cursor-reactive canvas field.

**Tech stack.** Vanilla JS + Canvas 2D. No GSAP, no Tweakpane. The canvas is sized to the smaller viewport dimension and re-renders on every cursor move + every animation frame.

**Anchor families that earn it.** Indie game / playful tech, music label, vibrant consumer / playful, tech research (subtle / monochrome variant), cinema / film (high-contrast variant).

**Recipe outline.** A grid of glyphs (or dots / shapes) draws to canvas. Each cell stores a base value + a displacement that decays toward zero. Mouse position influences cells within a radius via a falloff function. Per-frame loop updates displacements and redraws. The effect lives behind the hero type; type must remain readable in all displacement states (use a generous floor on glyph alpha).

**Anti-pairs.** V1 magnetic chain (territorial overlap — both cursor-reactive), V5 heat trace (territorial — both cursor wake metaphors), V7 chromatic separation (clashes with the canvas's high-contrast field).

**Specimen.** `signatures/canvas-grid-mouse/index.html`

<!-- _provenance:
  reimpl: clean-room (no GSAP, no Tweakpane)
  author: Paolo
-->

---

## S3 — Delphi clone

**Source / inspiration.** [delphi-three.vercel.app](https://delphi-three.vercel.app/) — third-party Three.js demo titled "Clone Yourself."

**Section role.** Hero. A signature-tier launch / campaign hero, not a recurring band.

**Tech stack.** Three.js / WebGL. The slug `delphi-three` implies the Three.js variant of a Delphi project; presumably a 3D scene with cloned/duplicated subject(s) rendered through WebGL.

**Anchor families that earn it.** Music label, cinema / film, festival / promo pages, luxury fashion (premium tier), indie game (premium tier).

**Recipe outline.** TBD — author when specimen is built. High-level expectation: a 3D scene with a cloned subject, dramatic lighting, possibly a shader pass that emphasizes the cloning (chromatic separation, ghosting). Subject must read clearly against the WebGL background; this is not an ambient effect.

**Anti-pairs.** Most subtle vocabularies — V5 heat trace, V9 drift compositions (background territorial clash), V11 crosshatching (both want hero attention). Pairs cleanly with V4 iris transition for entry/exit beats.

**Specimen.** `specimen-status: external-only — see source link` (high reimpl cost: Three.js scene authoring).

---

## S4 — Telescope Zoom

**Source / inspiration.** [tympanus.net/Tutorials/TelescopeZoom](https://tympanus.net/Tutorials/TelescopeZoom/) — Codrops tutorial.

**Section role.** Hero transition / scroll-driven reveal. The first scroll on the page is the move.

**Tech stack.** Original uses GSAP; reimplementable in vanilla JS via `IntersectionObserver` + scroll progress mapping. Medium reimpl cost.

**Anchor families that earn it.** Music label, cinema / film, editorial / publication (modern variant), luxury fashion / fragrance, festival / promo.

**Recipe outline.** Hero image(s) scale up dramatically as the user scrolls into the page — the "looking through a telescope" effect. Scroll progress through the hero drives `transform: scale(...)` on layered image panels. The deepest layer scales most; outer layers scale less, producing a depth illusion. The move only fires on the first viewport-pass — subsequent scroll-back is static.

**Anti-pairs.** V6 type-set-on-scroll (both consume scroll dwell), V11 crosshatching reveal (both want scroll-into-view as the event), V3 rack focus (depth-of-field clashes with the telescope's depth illusion).

**Specimen.** `specimen-status: external-only — see source link` (medium reimpl cost; queue as next-priority specimen).

---

## S5 — Shader Animation (GSAP)

**Source / inspiration.** [tympanus.net/Tutorials/ShaderAnimationGSAP](https://tympanus.net/Tutorials/ShaderAnimationGSAP/) — Codrops tutorial.

**Section role.** Hero or transition between image states. Image-to-image dissolves with shader-driven distortion.

**Tech stack.** Three.js + custom GLSL fragment shader + GSAP. The shader uniforms (progress, distortion, color shift) are animated by GSAP timelines on click. High reimpl cost — requires GLSL knowledge.

**Anchor families that earn it.** Music label, cinema / film, festival / promo, luxury fashion (premium tier with budget for shader authoring).

**Recipe outline.** A WebGL plane displays an image via a fragment shader. Clicking advances to the next image; the shader animates the transition via a progress uniform (often a noise-based dissolve, ripple, or pixel-displacement effect). GSAP drives the uniform values; Three.js renders the plane.

**Anti-pairs.** V5 heat trace, V9 drift compositions (background ambient clash), V7 chromatic separation (chromatic effects already in the shader). Pairs cleanly with V8 match-cut morph for state transitions elsewhere on the page.

**Specimen.** `specimen-status: external-only — see source link` (high reimpl cost: GLSL fluency required).

---

## S6 — Gridmorphic

**Source / inspiration.** [codepen.io/gridmorphic/full/WbQPRwv](https://codepen.io/gridmorphic/full/WbQPRwv) — Codepen entry (source page returns 403 in WebFetch; user to inspect directly).

**Section role.** Gallery / content surface. The name suggests a grid that morphs between layouts.

**Tech stack.** TBD — source page inaccessible to programmatic fetch. Likely vanilla JS + CSS Grid + transform-based morphing; may use GSAP.

**Anchor families that earn it.** TBD pending closer inspection — likely music label, vibrant consumer, editorial (modern variant), indie game.

**Recipe outline.** TBD — author when specimen is built. Likely: a grid of items whose layout shifts (re-flows + animates) between named arrangements (compact ↔ spread; equal ↔ asymmetric) on trigger.

**Anti-pairs.** TBD; likely V8 match-cut morph (territorial — both about shape transitions).

**Specimen.** `specimen-status: external-only — see source link` (source page blocked; manual verification needed first).

---

## S7 — Imagen Header

**Source / inspiration.** [imagen-header-rebuild.vercel.app](https://imagen-header-rebuild.vercel.app/) — third-party rebuild of Google DeepMind's Imagen landing-page header by Pragmattic.

**Section role.** Hero only. A statement opener for AI / generative / launch pages.

**Tech stack.** React Three Fiber + Three.js Shading Language (TSL) + GSAP + Tailwind. Original is React-based. High reimpl cost; non-React reimpl would require porting TSL shader to GLSL.

**Anchor families that earn it.** Cinema / film, music label, festival / promo, luxury fashion (premium / launch tier), indie game (premium tier). AI / research product launch pages specifically.

**Recipe outline.** Hero background is a Three.js scene of morphing / flowing imagery — typically a soft-focus gradient-and-photo field that mutates continuously while remaining legible. GSAP orchestrates entry and idle states. Type sits over the field with high contrast.

**Anti-pairs.** V9 drift compositions (territorial — both background ambient), V5 heat trace (clashes with the morphing field), V7 chromatic separation (overkill if the hero already does chromatic shader work).

**Specimen.** `specimen-status: external-only — see source link` (high reimpl cost: R3F + TSL).

---

## S8 — Elastic Grid Scroll

**Source / inspiration.** Codrops Elastic Grid Scroll (Codrops `Scroll-Animations-Grid` family; user authored). 7-column, 63-item grid with elastic scroll-driven motion.

**Section role.** Gallery / content surface. A mid-page or full-page gallery moment that turns scrolling into the showcase mechanic.

**Tech stack.** Vanilla JS + CSS (no GSAP). Scroll velocity drives per-item transforms (skew + scale + translate) with elastic falloff that releases when scroll stops.

**Anchor families that earn it.** Editorial / publication, documentary / journalism, music label, vibrant consumer / playful, indie game (premium variant), cinema / film.

**Recipe outline.** A multi-column grid of image items (typically 7 columns × 9 rows = 63 items in the canonical implementation). On scroll, per-item transforms apply a skew + scale based on scroll velocity, releasing elastically when velocity falls. Use `transform` (GPU) for all motion; never animate layout properties.

**Anti-pairs.** V6 type-set-on-scroll (both consume scroll dwell), V11 crosshatching reveal (both want scroll-into-view as the major event), V1 magnetic chain (territory clash on input).

**Specimen.** `signatures/elastic-grid-scroll/index.html`

<!-- _provenance:
  reimpl: clean-room (7-col, 63 items, no GSAP)
  author: Paolo
-->

---

## S9 — Elastic Cards (4×2 variant)

**Source / inspiration.** 4×2 variant of S8 (Elastic Grid Scroll), combined with **Sadie-style hover** from Codrops [HoverEffectIdeas](https://tympanus.net/Development/HoverEffectIdeas/). User-authored.

**Section role.** Feature grid / showcase. A smaller, more curated cousin of S8 — designed for 8 marquee items rather than a wide gallery.

**Tech stack.** Vanilla JS + CSS (no GSAP). Inherits the elastic-scroll behavior of S8, plus per-card hover micro-motion in the Sadie idiom (smooth scale + caption reveal).

**Anchor families that earn it.** Editorial / publication, music label, hospitality, boutique hotel, luxury fashion / fragrance, documentary / journalism, sustainable / eco (curated showcase).

**Recipe outline.** 4-column × 2-row card grid (8 items). Each card carries an image + caption. On scroll, the grid behaves elastically per S8. On hover, individual cards lift smoothly and the caption reveals or shifts (Sadie hover). The hover and the scroll motion must not compete — hover suppresses during active scroll velocity.

**Anti-pairs.** V7 chromatic separation (both want hover-state focus), V11 crosshatching reveal (scroll territory), V1 magnetic chain (cursor territory).

**Specimen.** `signatures/elastic-cards/index.html`

<!-- _provenance:
  reimpl: clean-room (4×2 variant of S8 + Sadie hover from HoverEffectIdeas)
  author: Paolo
-->
