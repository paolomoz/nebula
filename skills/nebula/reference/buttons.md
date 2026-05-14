# Buttons library

> **Status: round 1 authored 2026-05-14 (12 entries, 0 specimens —
> CSS-only entries are inline-complete; canvas/shader entries are
> external-only with source links).**
>
> Button animations are an **atomic-scope** decision, distinct from
> hovers (card-grid scope) and signatures (page set-pieces). The most-
> clicked element on a page carries disproportionate voice — its
> animation reads to every visitor on every interaction.

## Composition rule

**0–1 button animation per page.** Button voice is consistent across
all primary buttons on a site; mixing a particle-burst on one CTA and
a slide-fill on another is the loudest possible UX inconsistency.

Each picked button animation actually defines a **button system** —
not just one effect. Every entry below specifies *both* a `primary`
recipe (the headline animation) and a quieter `secondary` recipe for
non-primary buttons (the ghost / text / outline buttons on the page).

## Tech-stack budget per anchor family

| Anchor family | Budget |
|---|---|
| trust-led B2B / fintech, healthcare clinical, civic institutional, tech research / academic | **CSS-only** (B1–B6) |
| editorial / publication, documentary / journalism, sustainable / eco, quiet craft / atelier | CSS + light JS (B1–B8) |
| music label, cinema / film, festival / promo, luxury fashion (statement tier), indie game (premium tier) | + canvas particle / WebGL (B1–B12) |
| vibrant consumer / playful, hospitality | usually CSS + light JS; canvas allowed for launch / campaign pages |
| sports / athletic | CSS-only or CSS + ripple (B1–B8) |

A button animation whose tech stack exceeds the brief's budget is
**refused** in `direct` — propose a cheaper alternative from the
catalog.

## Schema for each entry

```
## B<n> — <name>

**Source.** Inspiration or origin link.
**Effect.** One-line description.
**Tech stack.** Vanilla CSS · Vanilla JS + Canvas · GSAP · Three.js / WebGL.
**Trigger.** Hover · click · idle · cursor-tracking.
**Primary recipe.** CSS + (optional) JS for primary CTA buttons.
**Secondary recipe.** Quieter complement for secondary / ghost buttons.
**Fits.** Anchor families that earn it.
**Avoid for.** Complement.
**Specimen.** Local path or external-only.
```

The canonical button markup these recipes target:

```html
<button class="btn btn--primary">Read on</button>
<button class="btn btn--secondary">Save</button>
```

## Entries

## B1 — Quiet hover

**Source.** Universal CSS pattern; the default for most production sites.

**Effect.** Button lifts 1px on hover with a soft shadow shift. Nothing more. The quietest possible button animation that still acknowledges the pointer.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Primary + secondary recipe.**
```css
.btn {
  display: inline-flex; align-items: center; gap: 0.5em;
  padding: 0.8em 1.4em;
  font: 600 0.95rem/1 var(--font-ui);
  border: 0; cursor: pointer;
  transition:
    transform 0.18s cubic-bezier(0.2,0,0.2,1),
    box-shadow 0.18s cubic-bezier(0.2,0,0.2,1);
}
.btn--primary {
  background: var(--ink); color: var(--paper);
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
}
.btn--secondary {
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
}
.btn--secondary:hover { transform: translateY(-1px); }
```

**Fits.** Any anchor — universal default. Particularly correct for trust-led B2B, healthcare clinical, civic, tech research, editorial, documentary, sustainable.

**Avoid for.** No avoids — but on music label / festival / cinema briefs the quiet hover may under-deliver, in which case pick something louder from this catalog.

**Specimen.** Inline-complete (CSS above is the full recipe).

---

## B2 — Fill slide

**Source.** Common CSS pattern, popularized by indie design systems.

**Effect.** Primary button is filled; on hover, the fill *slides out* from one edge and the outline + text-color invert. Reads as a deliberate state change, not a generic hover.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Primary recipe.**
```css
.btn { position: relative; overflow: hidden; isolation: isolate;
  display: inline-flex; align-items: center;
  padding: 0.8em 1.4em;
  font: 600 0.95rem/1 var(--font-ui);
  cursor: pointer; border: 1px solid var(--ink);
  transition: color 0.4s cubic-bezier(0.4,0,0.2,1);
}
.btn--primary {
  background: var(--ink); color: var(--paper);
}
.btn--primary::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: var(--paper);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
}
.btn--primary:hover { color: var(--ink); }
.btn--primary:hover::before { transform: scaleX(1); }
```

**Secondary recipe.** Outline button that fills from the same edge:
```css
.btn--secondary {
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
  transition: color 0.4s cubic-bezier(0.4,0,0.2,1);
}
.btn--secondary::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background: var(--ink);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
}
.btn--secondary:hover { color: var(--paper); }
.btn--secondary:hover::before { transform: scaleX(1); }
```

**Fits.** Editorial / publication, civic / institutional, sustainable / eco, contemporary product, documentary; brands where deliberate state change reads as care.

**Avoid for.** Pure ops / utility (too much motion for tool surfaces), brutalist (too soft for the register).

**Specimen.** Inline-complete.

---

## B3 — Ring expand

**Source.** CSS pattern from product design systems (Linear-adjacent).

**Effect.** Filled button stays still; a thin outline ring expands outward from the button on hover, suggesting reach. Subtle but distinctive.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Primary recipe.**
```css
.btn--primary {
  position: relative;
  background: var(--ink); color: var(--paper);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  font: 600 0.95rem/1 var(--font-ui);
}
.btn--primary::after {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  border: 1px solid var(--ink);
  opacity: 0; transform: scale(1);
  transition:
    transform 0.4s cubic-bezier(0.22,1,0.36,1),
    opacity 0.3s;
}
.btn--primary:hover::after {
  opacity: 0.4;
  transform: scale(1.18) translateY(-1px);
}
```

**Secondary recipe.** Same ring on ghost button:
```css
.btn--secondary {
  position: relative;
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
  padding: 0.8em 1.4em; cursor: pointer;
}
.btn--secondary::after {
  content: ""; position: absolute; inset: -1px; pointer-events: none;
  border: 1px solid var(--ink);
  opacity: 0; transform: scale(1);
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
}
.btn--secondary:hover::after {
  opacity: 0.5;
  transform: scale(1.12);
}
```

**Fits.** Trust-led B2B / fintech, tech research, contemporary product, civic, healthcare; product registers where state change should signal *capability*.

**Avoid for.** Editorial (too product-y), wine / spirits (too cool), brutalist (the soft ring conflicts with the posture).

**Specimen.** Inline-complete.

---

## B4 — Inverted hover

**Source.** Classic editorial / civic CSS pattern.

**Effect.** Filled-to-outline (and vice versa) on hover with smooth color transition. The most declarative button hover: the button literally changes state, not just micro-position.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Primary recipe.**
```css
.btn--primary {
  background: var(--ink); color: var(--paper);
  border: 1px solid var(--ink);
  padding: 0.8em 1.4em;
  font: 600 0.95rem/1 var(--font-ui); cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.btn--primary:hover {
  background: var(--paper); color: var(--ink);
}
```

**Secondary recipe.** Ghost that fills:
```css
.btn--secondary {
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
  padding: 0.8em 1.4em; cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.btn--secondary:hover {
  background: var(--ink); color: var(--paper);
}
```

**Fits.** Editorial / publication, civic / institutional, documentary, sustainable, quiet craft / atelier, hospitality (formal tier).

**Avoid for.** Vibrant consumer (too restrained), indie game, sports / athletic, music label.

**Specimen.** Inline-complete.

---

## B5 — Underline draw

**Source.** Editorial / newsletter pattern; common on Substack-style sites.

**Effect.** For ghost / text-style buttons, an underline draws in from left on hover. Primary buttons stay filled with a quiet hover.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Primary recipe.** Standard quiet hover (filled buttons keep their voice):
```css
.btn--primary {
  background: var(--ink); color: var(--paper);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  transition: transform 0.18s;
}
.btn--primary:hover { transform: translateY(-1px); }
```

**Secondary recipe.** Text button with underline draw:
```css
.btn--secondary {
  background: transparent; color: var(--ink);
  padding: 0.4em 0; border: 0; cursor: pointer;
  position: relative;
  font: 500 0.95rem/1 var(--font-ui);
}
.btn--secondary::after {
  content: ""; position: absolute;
  left: 0; right: 0; bottom: 0; height: 1px;
  background: currentColor;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
}
.btn--secondary:hover::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication, documentary / journalism, newsletter / blog, sustainable / eco, quiet craft, hospitality.

**Avoid for.** Trust-led B2B (text buttons read as under-emphasized for primary actions), vibrant consumer, sports / athletic, indie game.

**Specimen.** Inline-complete.

---

## B6 — Arrow lean

**Source.** Pattern popularized by Stripe / Vercel / Linear marketing pages.

**Effect.** Primary button carries a trailing `→` that translates right on hover, signaling forward motion. Subtle but suggestive of action.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Markup** (note the arrow span):
```html
<button class="btn btn--primary">Read on <span class="arrow">→</span></button>
```

**Primary recipe.**
```css
.btn--primary {
  display: inline-flex; align-items: center; gap: 0.5em;
  background: var(--ink); color: var(--paper);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  font: 600 0.95rem/1 var(--font-ui);
  transition: background 0.2s;
}
.btn--primary .arrow {
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.btn--primary:hover .arrow { transform: translateX(4px); }
```

**Secondary recipe.** Ghost variant with the same arrow:
```css
.btn--secondary {
  display: inline-flex; align-items: center; gap: 0.5em;
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
  padding: 0.8em 1.4em; cursor: pointer;
}
.btn--secondary .arrow {
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
}
.btn--secondary:hover .arrow { transform: translateX(3px); }
```

**Fits.** Contemporary product, trust-led B2B / fintech, tech research, civic-modern, documentary, sustainable; any brief where the CTA implies *forward* movement.

**Avoid for.** Editorial / long-read (too product-y), quiet craft (too directive), brutalist (too soft).

**Specimen.** Inline-complete.

---

## B7 — Magnetic pull

**Source.** Common JS pattern; popularized by Locomotive / agency portfolio sites.

**Effect.** Primary button slightly tracks cursor when within a ~80px radius. Subtle 4–6px translation following the cursor; releases on `mouseleave`. The button feels *attracted* to the pointer.

**Tech stack.** Vanilla CSS + light JS.

**Trigger.** Cursor-tracking (continuous).

**Primary recipe.**
```css
.btn--primary {
  background: var(--ink); color: var(--paper);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  font: 600 0.95rem/1 var(--font-ui);
  transition: transform 0.18s cubic-bezier(0.2,0,0.2,1);
  will-change: transform;
}
```

```javascript
document.querySelectorAll('.btn--primary[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / r.width;
    const dy = (e.clientY - cy) / r.height;
    btn.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
```

**Secondary recipe.** No magnetic pull on secondary buttons — they get a standard quiet hover (translateY -1px). The contrast is the point.

**Fits.** Music label, cinema / film, festival / promo, indie game, vibrant consumer / playful, luxury fashion (cinematic tier), agency / portfolio sites.

**Avoid for.** Trust-led B2B (cursor-tracking on CTAs reads as gimmicky for serious tones), healthcare clinical, civic institutional, ops / utility. Mobile (no cursor — magnetism dies silently; verify mobile fallback to quiet hover).

**Specimen.** `external-only` — see source pattern. Inline-complete recipe above; full implementation including mobile fallback is straightforward.

---

## B8 — Material ripple

**Source.** Material Design idiom; canonical click feedback pattern.

**Effect.** Click spawns a radial expanding circle from the cursor point, fades to transparent. Acknowledges the click visibly without any state change to the button itself.

**Tech stack.** Vanilla CSS + light JS.

**Trigger.** Click.

**Primary recipe.**
```css
.btn--primary {
  position: relative; overflow: hidden;
  background: var(--ink); color: var(--paper);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  font: 600 0.95rem/1 var(--font-ui);
}
.btn-ripple {
  position: absolute;
  width: 8px; height: 8px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0);
  animation: rippleExpand 0.6s linear forwards;
}
@keyframes rippleExpand {
  to { transform: translate(-50%, -50%) scale(40); opacity: 0; }
}
```

```javascript
document.querySelectorAll('.btn[data-ripple]').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    ripple.style.left = (e.clientX - r.left) + 'px';
    ripple.style.top = (e.clientY - r.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
```

**Secondary recipe.** Ripple on the ghost button uses dark ripple color:
```css
.btn--secondary .btn-ripple {
  background: rgba(26,24,21,0.18);
}
```

**Fits.** Contemporary product, trust-led B2B (material-adjacent tier), tech research, civic-modern, vibrant consumer.

**Avoid for.** Editorial / publication, quiet craft, wine / spirits, music label, luxury fashion (Material idiom reads as too tech-product for these registers).

**Specimen.** Inline-complete.

---

## B9 — Particle burst (squares)

**Source.** [Codrops · ParticleEffectsButtons](https://github.com/codrops/ParticleEffectsButtons) — squares variant.

**Effect.** On click, the button visually disintegrates into a cloud of small *square* particles that scatter outward and fade. The button itself remains operable; the particle effect is a moment of theater on the action.

**Tech stack.** Vanilla JS + Canvas 2D.

**Trigger.** Click.

**Recipe outline.** A canvas is positioned over the button; on click, the button's content is sampled, particles are spawned at each color-sampled cell, particles animate outward with momentum + decay. The Codrops repo provides the reference implementation.

**Primary recipe.** See source repo. Integration approach:
```html
<button class="btn btn--primary" data-particle="squares">Get started</button>
```
- Inline the Codrops particle library
- Initialize the effect bound to `[data-particle="squares"]`
- Disintegration runs ~600–900ms; button remains clickable

**Secondary recipe.** Ghost button with a quiet hover (no particle effect on secondary — keeps the effect rare and earned).
```css
.btn--secondary {
  background: transparent; color: var(--ink);
  border: 1px solid var(--ink);
  padding: 0.8em 1.4em; cursor: pointer;
  transition: transform 0.18s;
}
.btn--secondary:hover { transform: translateY(-1px); }
```

**Fits.** Music label, cinema / film, festival / promo, indie game (premium tier), luxury fashion (statement tier); launch / campaign pages where one big CTA earns theatrics.

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, civic institutional, tech research, editorial / publication, quiet craft, hospitality (the particles fire on every click — fatigue is immediate for normal product use).

**Specimen.** `external-only` — see [Codrops repo](https://github.com/codrops/ParticleEffectsButtons). Clean-room reimplementation is straightforward (canvas + per-particle physics); roadmap.

---

## B10 — Particle burst (circles)

**Source.** [Codrops · ParticleEffectsButtons](https://github.com/codrops/ParticleEffectsButtons) — circles variant.

**Effect.** Same disintegration as B9 but particles are *circles* — softer mood, less aggressive than the squares. Same JS approach; particle shape is the only difference.

**Tech stack.** Vanilla JS + Canvas 2D.

**Trigger.** Click.

**Primary recipe.** As B9, with circle particles. Sampling and physics identical:
```html
<button class="btn btn--primary" data-particle="circles">Get started</button>
```

**Secondary recipe.** Quiet hover (same as B9).

**Fits.** Same as B9, but the *softer* feel suits luxury fashion, premium hospitality, cinema (literary variant), music label (subtle tier) — anchors where particle theatrics are earned but should feel refined rather than aggressive.

**Avoid for.** Same as B9.

**Specimen.** `external-only` — see Codrops repo.

---

## B11 — Particle implode

**Source.** Inverse of [Codrops · ParticleEffectsButtons](https://github.com/codrops/ParticleEffectsButtons) — particles converge *into* the button.

**Effect.** On hover, particles spawn around the button perimeter and converge inward, *assembling* the button visually. Reads as the button gathering itself before action — opposite directional from the disintegration variants.

**Tech stack.** Vanilla JS + Canvas 2D.

**Trigger.** Hover (continuous, not click).

**Recipe outline.** A canvas is positioned over the button; on hover-enter, particles spawn at the canvas perimeter and animate inward, settling at sampled button-content positions; on hover-leave, particles reverse to perimeter and fade. Implementation is the Codrops approach in reverse.

**Primary recipe.** Bind to `[data-particle="implode"]`:
```html
<button class="btn btn--primary" data-particle="implode">Begin</button>
```

**Secondary recipe.** Quiet hover.

**Fits.** Indie game / playful tech, music label (futurist tier), cinema (sci-fi / festival tier), vibrant consumer (launch tier).

**Avoid for.** Trust-led B2B, civic, healthcare, editorial, quiet craft, hospitality.

**Specimen.** `external-only` — reverse-direction variant of the Codrops library; roadmap reimplementation.

---

## B12 — Iridescent foil

**Source.** Holographic foil-card pattern; common in collectible / premium UI.

**Effect.** Primary button surface is a conic-gradient that rotates based on cursor angle, giving a foil-card / iridescent refraction effect. The button appears to *catch the light* as the cursor moves across it.

**Tech stack.** Vanilla CSS + light JS (cursor angle tracking). Optional shader upgrade for premium tier.

**Trigger.** Cursor position over button.

**Primary recipe.**
```css
.btn--primary {
  position: relative; overflow: hidden;
  background: conic-gradient(
    from var(--angle, 0deg),
    #F4D6E6, #E4D7F7, #D6E5F4, #D7F4E0, #F2F0D4, #F4D9D6, #F4D6E6
  );
  color: var(--ink);
  padding: 0.8em 1.4em; border: 0; cursor: pointer;
  font: 600 0.95rem/1 var(--font-ui);
  font-weight: 700;
  transition: transform 0.2s;
}
.btn--primary::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(120deg, rgba(255,255,255,0.5), rgba(255,255,255,0) 40%);
  mix-blend-mode: overlay; pointer-events: none;
}
.btn--primary:hover { transform: translateY(-1px); }
```

```javascript
document.querySelectorAll('.btn--primary[data-foil]').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * 180 / Math.PI + 90;
    btn.style.setProperty('--angle', angle + 'deg');
  });
  btn.addEventListener('mouseleave', () => btn.style.setProperty('--angle', '0deg'));
});
```

**Secondary recipe.** Ghost button — no foil; just a quiet hover so the contrast between primary and secondary is part of the system's voice.

**Fits.** Music label (special edition / launch), luxury fashion (statement tier), indie game (premium / collectible tier), festival / promo (special-edition merch pages), cinema (premiere campaigns).

**Avoid for.** Trust-led B2B, healthcare clinical, civic, tech research, editorial, documentary, quiet craft, sustainable, hospitality (the foil reads as decorative / consumer-collectible — wrong register for serious or restrained brands).

**Specimen.** `external-only` (premium tier — full implementation may include WebGL shader upgrade for true foil refraction).
