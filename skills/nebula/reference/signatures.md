# Signatures library

> **Status: rounds 1–2 authored (17 signatures — 12 with specimens, 5 external-only). Round 1 2026-05-14; round 2 2026-05-15.**
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

---

## S10 — Clipped-section reveal

**Source / inspiration.** Codrops-adjacent scroll pattern — pinned sections with `clip-path` scrubbed by scroll progress, plus a center photo crossfade and a 3D perspective gallery as the concluding band.

**Section role.** Full-page scroll narrative; vertical hero-to-band-to-gallery transition mechanism. Sits as the *spine* of a long-form page rather than a single section.

**Tech stack.** Vanilla JS + CSS (`clip-path` polygon scrubbed by scroll observer). No GSAP, no WebGL.

**Anchor families that earn it.** Cinema / film, music label, festival / promo, indie game (premium tier), luxury fashion (statement tier), vibrant consumer / playful (launch tier).

**Recipe outline.** A wrapper of `height: 400vh` holds a `position: sticky; height: 100dvh` section. Inside, three `.pinned-section` absolute layers stack at z-indexes 3 / 2 / 1; their `clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0)` is scrubbed on scroll — bottom corners pull from 100% → 0% so each section collapses bottom-up to reveal the next. After the pinned trilogy, a `perspective: 1200px` gallery band rotates image cards in 3D as they enter the viewport.

**Anti-pairs.** V6 type-set-on-scroll (both consume scroll dwell), V11 crosshatching reveal (both want scroll-into-view as the major event), V4 iris transition (scroll-cut conflicts with iris-cut).

**Specimen.** `signatures/clipped-sections/index.html`

<!-- _provenance:
  reimpl: clean-room (DOM + clip-path; no GSAP)
  author: Paolo
-->

---

## S11 — Context-aware logo

**Source / inspiration.** [Codrops · context-aware fixed logo](https://tympanus.net/Development/) — fixed brand mark that transforms across sections.

**Section role.** Page-wide persistent atom — not a section but a *site chrome* element that responds to scroll position. The logo morphs as the user passes through differently-themed sections.

**Tech stack.** Vanilla JS + CSS. IntersectionObserver per section toggles one of seven effect classes on the fixed `.logo`. Uses variable font weights (Inter 200/500/700) and Playfair Display italic for the ornamental pre-mark.

**Anchor families that earn it.** Music label, cinema / film, festival / promo, indie game (premium tier), luxury fashion, agency / portfolio sites, design-studio capability showcases.

**Recipe outline.** A `position: fixed` logo at top-left with seven named effect classes:
- `fx-1` **vanish** — `scale(0) opacity(0)` (the logo disappears entirely)
- `fx-2` **blur** — `filter: blur(5px) scale(.9) opacity(.5)`
- `fx-3` **slide-up** — parent `overflow: hidden`, inner `translateY(-102%)`
- `fx-4` **char-scatter** — each `.logo__char` translates to a random offset + rotate
- `fx-5` **char-shuffle** — each char swaps text content briefly before resolving
- `fx-6` **move-rotate** — `translate(...) rotate(...)` to a fixed angle
- `fx-7` **slide-off** — `translateX(-120%)` exits left

IntersectionObserver per section adds the corresponding class. Default state (no class) restores neutral.

**Anti-pairs.** None significant — the logo is persistent chrome, not section-bound. Mildly conflicts with V11 crosshatching (cleared section transitions disrupt the smooth observer continuity).

**Specimen.** `signatures/context-logo/index.html`

<!-- _provenance:
  reimpl: clean-room (vanilla JS + IntersectionObserver per section)
  author: Paolo
-->

---

## S12 — Four-layer parallax

**Source / inspiration.** Osmo-style parallax landing — four image layers translated at different rates as the user scrolls through the hero trigger section. Mountain-hero is the canonical use; portrait subject + foreground/background scrub is the alternative.

**Section role.** Hero with depth illusion. The first viewport reveals the layers in their natural position; scrolling pushes layers apart vertically to expose the deeper space.

**Tech stack.** Vanilla JS + CSS. Each `.parallax__layer-img` sets `--y` from scroll progress; CSS applies `translate3d(0, calc(var(--y) * 1%), 0)`. yPercent values 70 / 55 / 40 / 10 from back to front.

**Anchor families that earn it.** Outdoor / adventure, sustainable / eco, hospitality (landscape-led), cinema / film, music label (landscape album sleeve), boutique hotel (landscape-led tier), festival / promo (landscape).

**Recipe outline.** A `100vh` `.parallax__header` holds four absolutely-positioned `<img>` layers. A `scroll` listener computes progress through the header element and assigns each layer a yPercent offset. Layers transform via `translate3d` (GPU); `will-change: transform`. The title sits at z-index 3 on top of layer 4 (foreground).

**Anti-pairs.** V5 heat trace (cursor wake conflicts with layer scrub on hero), V9 drift compositions (background territorial clash), V11 crosshatching (both want scroll-into-view as the major event).

**Specimen.** `signatures/four-layer-parallax/index.html`

<!-- _provenance:
  reimpl: clean-room (vanilla JS scroll listener; no GSAP)
  author: Paolo
-->

---

## S13 — Cylinder grid

**Source / inspiration.** WebGL playground — 3D cylinder grid with click-to-randomize per-cell colors. Each click reseeds the palette across the field.

**Section role.** Hero / above-the-fold ambient. A bold, interactive WebGL surface that announces the brand as digital-native.

**Tech stack.** WebGL (canvas#webgl-canvas — Three.js scene with instanced cylinder mesh). Vanilla JS, no GSAP. Hard tech tier — high reimpl cost; not for budgets that don't earn it.

**Anchor families that earn it.** Indie game / playful tech, music label (festival / launch tier), cinema / film (festival promo), vibrant consumer / playful (campaign tier), luxury fashion (collectible-edition pages).

**Recipe outline.** A fixed-position `<canvas id="webgl-canvas">` covers the viewport. A Three.js scene instances `CylinderGeometry` on a grid; per-instance color is randomized on `click` event. Camera is fixed; cylinders may rotate gently on idle. Type overlay (`.overlay h1`) sits above the canvas with `mix-blend-mode: difference` for visibility against the dynamic palette.

**Anti-pairs.** V9 drift compositions (territorial — both background ambient), V5 heat trace (cursor wake on heavy WebGL doesn't read), V7 chromatic separation (already chromatic), V11 crosshatching (overkill).

**Specimen.** `signatures/cylinder-grid/index.html`

<!-- _provenance:
  reimpl: clean-room (Three.js instanced mesh)
  author: Paolo
-->

---

## S14 — Just-scroll pinned reveal

**Source / inspiration.** Moussa-style portfolio — *"just scroll it"* narrative with full-viewport hero + footer that mirror each other, and pinned scroll-reveal sections between.

**Section role.** Page-wide scroll narrative; for portfolio / agency / launch pages where the whole page is the story and reveal-pacing IS the design.

**Tech stack.** Vanilla JS + CSS. Pinned scroll observers + `mix-blend-mode: difference` on the nav to handle dark/light section transitions transparently.

**Anchor families that earn it.** Agency / portfolio sites, cinema / film (festival microsite), music label (launch / featured-artist page), luxury fashion (statement / lookbook), vibrant consumer / playful (launch campaign), indie game (premium tier launch).

**Recipe outline.** Fixed nav with `mix-blend-mode: difference` so its color flips against varying section backgrounds. Hero and footer share the same structure (image + overlay + centered text), creating bookends. Between them, pinned `position: sticky` sections with `100vh` scroll-reveal content blocks. Cursor-driven UI is minimal — the scroll IS the interaction.

**Anti-pairs.** V6 type-set-on-scroll (both consume scroll dwell), V11 crosshatching reveal (both want scroll-into-view as the major event), V4 iris transition (scroll-cut vs iris-cut conflicts).

**Specimen.** `signatures/just-scroll/index.html`

<!-- _provenance:
  reimpl: clean-room (vanilla JS scroll observers; no GSAP)
  author: Paolo
-->

---

## S15 — CSS glitch

**Source / inspiration.** CSS-only chromatic-glitch image effect — stacked clip-path layers with `mix-blend-mode: screen` + chromatic tints (red / cyan / green) produce channel separation across animated slices. Variants: **Haunted** (red/cyan/green slivers) and **Ethereal** (pink/cyan/white slivers, slower).

**Section role.** Hero / band — atmospheric image treatment that runs continuously without input. Best as a single hero photograph or a single mood-band; never as a recurring decoration.

**Tech stack.** Pure CSS — no JS. Five layered pseudo-elements with `mix-blend-mode` + clip-path animations on staggered delays.

**Anchor families that earn it.** Music label, cinema / film (horror / thriller / festival), indie game (atmospheric / dark tier), vibrant consumer (campaign / launch), luxury fashion (statement / Halloween edition).

**Recipe outline.** A wrapper holds 5 stacked image layers — same image, with `mix-blend-mode: screen` (layers 2–4) and `mix-blend-mode: overlay` (layer 5), each tinted via `background-color` + chromatic tint vars. `@keyframes` cycles `clip-path: polygon(...)` slices with staggered timing per layer; tints become visible at each slice as chromatic offset. Two variants share the same structure with different `:root` vars:
- `.variant-haunted` — red/cyan/green tints, 4s cycle
- `.variant-ethereal` — pink/cyan/white tints, 3s cycle, `hard-light` final blend

**Anti-pairs.** V7 chromatic separation (territorial overlap — both about RGB separation), V5 heat trace (visual noise compounds).

**Specimen.** `signatures/css-glitch/index.html`

<!-- _provenance:
  reimpl: clean-room (pure CSS — no JS)
  author: Paolo
-->

---

## S16 — Article-intro suite

**Source / inspiration.** Codrops-style article-intro reveal patterns — 7 variants of "how the hero transitions when you start reading" (shrink / fade / slice / side / side-fixed / push / grid).

**Section role.** Article hero-to-body transition. Specifically for editorial / long-form / journalism pages where the article *opens* and the reader is invited into the body. Each variant is a different metaphor for that transition.

**Tech stack.** Vanilla JS + CSS. `transition` on layout properties (height / width / transform / position) — the agent's note in the source flags that the hero element itself must carry the transition or it collapses instantly.

**Anchor families that earn it.** Editorial / publication, documentary / journalism, music label (long-form artist features), academic publishing, museum / gallery (essay pages).

**Recipe outline.** A `.header` element holds the article hero (height: 100vh, min-height: 560px). When scroll triggers `.modify` class, the chosen variant's properties animate. The 7 variants:
1. **shrink** — hero height collapses to a header strip; body reveals below
2. **fade** — hero crossfades to body
3. **slice** — hero splits horizontally; body comes up from the gap
4. **side** — hero translates left; body slides up from the right
5. **side-fixed** — like side but hero stays pinned at width: 50%
6. **push** — hero is pushed up off-screen as body enters
7. **grid** — hero shifts into a grid cell; body fills the remaining cells

The picker UI in the source HTML lets a designer test all 7; in production, `direct` would pick one variant per page.

**Anti-pairs.** V11 crosshatching reveal (both want scroll-into-view as event), V4 iris transition (article-intro IS a transition; iris would compete), V6 type-set-on-scroll on the article body (the variant transition uses scroll budget).

**Specimen.** `signatures/article-intro-suite/index.html`

<!-- _provenance:
  reimpl: clean-room (vanilla JS + CSS transitions; carries a designer-facing picker)
  author: Paolo
-->

---

## S17 — Rain lenses

**Source / inspiration.** Canvas 2D simulation — rain droplets on glass with magnifying-lens distortion. Each droplet refracts the background image beneath it as a lens.

**Section role.** Hero / band — atmospheric overlay that runs continuously. Pairs especially with a weather widget or a mood-led page (a venue's "tonight in Milano" hero, a film's noir landing).

**Tech stack.** Canvas 2D + vanilla JS. Particles spawn at the top, fall with gravity, accumulate at the bottom; each particle samples the background image as a lens distortion.

**Anchor families that earn it.** Cinema / film (noir / atmospheric), music label (album-mood tier), indie game (atmospheric / weather-themed), vibrant consumer (mood / seasonal campaigns), hospitality (rain-evening / cocktail-bar mood).

**Recipe outline.** A fixed `<canvas>` covers the viewport. A particle system spawns droplets at the top with random horizontal offsets. Each frame: update positions (gravity), draw the background image, then per droplet draw a clipped lens-distorted sample of the image at the droplet's location. A weather widget overlay (`.widget` with `.widget__temp` huge, `.widget__forecast` small) sits centered as the page's content.

**Anti-pairs.** V9 drift compositions (territorial — both continuous ambient), V5 heat trace (cursor wake compounds with droplet motion), V11 crosshatching reveal (clashing motion vocabularies).

**Specimen.** `signatures/rain-lenses/index.html`

<!-- _provenance:
  reimpl: clean-room (Canvas 2D particle system; no Three.js)
  author: Paolo
-->

