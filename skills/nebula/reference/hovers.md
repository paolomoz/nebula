# Hovers library

> **Status: round 1 authored 2026-05-14 (15 entries, 1 specimen
> available via S9 elastic-cards).**
>
> Hovers are **modifiers** that apply to host moves — typically M2
> photographic card, S9 elastic-cards, or any card-grid pattern. They
> are a third class of artifact, distinct from moves (component-level
> composition recipes) and signatures (page-level set-piece moments).
> Round 1 catalogs 15 effects from the Codrops library
> ([HoverEffectIdeas](https://github.com/codrops/HoverEffectIdeas) +
> [CaptionHoverEffects](https://tympanus.net/Development/HoverEffectIdeas/)),
> reimplementable in vanilla CSS.

## Composition rule

**Hover affordance is the default**, not the opt-in. Every nebula
page ships hover responses on essentially every clickable or
pointable card-like element. Specifically:

- **M2 photographic card grids** — default hover: **H1 Sadie**.
- **Type-led card grids (M8 type-as-pattern bands, beer-name catalogues,
  manifesto card rows)** — default hover: **H16 Storefront** (NEW).
- **List-style content items** (news feeds, article lists, post
  lists) — default hover: **H17 Editorial Item** (NEW).
- **Bordered callout blocks** (pull-quotes, classified-style inserts,
  feature callouts) — container's `border-color` shifts to
  `--acc-primary` on hover; the inner CTA link continues to use L3
  Wilcox (the page-wide link effect).
- **Buttons** — see `buttons.md` (B1 Quiet hover is the default).
- **Inline body links** — see `links.md` (L3 Wilcox is the default).

The principle: **every clickable or pointable surface gets a subtle
response by default**. Personality is the default, not an opt-in.

**Consistency rules**:

- All cards in a single grid use the same hover (mixing is
  render-refusal grade).
- Multiple grids on the same page may use *different* hovers — a
  photographic destination grid using Sadie and a type-led catalogue
  using Storefront is correct.
- Pages with no card-like elements (e.g., editorial pages with only
  body prose) carry only the button + link defaults; no card hover
  is forced where there are no cards to hold it.

## Schema for each entry

```
## H<n> — <name>

**Source.** Codrops link to the original demo.
**Applied to.** Which moves/signatures can host it (typically [M2, S9]
or "any card-grid").
**Effect.** One line of what's visible on hover.
**Recipe.** Working CSS, scoped to `.fig` / `.fig img` / `.fig .cap`
markup. Render adapts class names to the page's namespace.
**Fits.** Anchor families that earn this hover.
**Avoid for.** The complement.
**Specimen.** Local runnable HTML, or `external-only` with source URL.
```

The canonical card markup these recipes target:

```html
<figure class="fig">
  <img src="..." alt="...">
  <figcaption class="cap">
    <h2 class="cap-title">Title</h2>
    <p class="cap-body">Body text</p>
  </figcaption>
</figure>
```

`figure.fig` has `position: relative; overflow: hidden; display: block;`
as the baseline; `img` covers it; `.cap` is positioned over the image
and animated.

## Entries

## H1 — Sadie

**Source.** [Codrops · CaptionHoverEffects · Sadie](https://tympanus.net/Development/CaptionHoverEffects/index.html)

**Applied to.** `[M2, S9, any card-grid]`

**Effect.** Caption gradient slides up from the bottom; image scales up subtly. The quietest hover in the set — present but not theatrical.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; isolation: isolate; }
.fig img {
  display: block; width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 1.6em 1.4em;
  color: #fff;
  background: linear-gradient(to top, rgba(15,12,8,0.75) 0%, rgba(15,12,8,0) 60%);
  transform: translateY(50%);
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-title { font-weight: 700; letter-spacing: -0.01em; transform: translateY(0); }
.fig .cap-body { opacity: 0; transform: translateY(8px); transition: opacity 0.35s, transform 0.35s; transition-delay: 0.1s; }
.fig:hover img { transform: scale(1.05); }
.fig:hover .cap { transform: translateY(0); }
.fig:hover .cap-body { opacity: 1; transform: translateY(0); }
```

**Fits.** Editorial / publication, quiet craft / atelier, hospitality, boutique hotel, documentary / journalism, sustainable / eco, luxury fashion (subtle tier).

**Avoid for.** Brutalist statement, vibrant consumer (too subtle), indie game (energy mismatch), sports / athletic.

**Specimen.** `signatures/elastic-cards/index.html` — Sadie hover is the per-card behavior in S9 Elastic Cards.

---

## H2 — Layla

**Source.** [Codrops · CaptionHoverEffects · Layla](https://tympanus.net/Development/CaptionHoverEffects/index2.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Inverted scrolls — title slides in from top, body from bottom, with a centered horizontal rule appearing between them. The most "editorial-poster" of the set.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.6em;
  color: #fff;
  background: rgba(15,12,8,0.55);
  opacity: 0;
  transition: opacity 0.4s;
}
.fig .cap-title {
  font-weight: 700; transform: translateY(-30px); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s;
}
.fig .cap-body {
  position: relative; transform: translateY(30px); opacity: 0; padding-top: 1em;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s;
}
.fig .cap-body::before {
  content: ""; position: absolute; top: 0; left: 50%; transform: translateX(-50%) scaleX(0);
  width: 60%; height: 1px; background: currentColor;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
}
.fig:hover img { transform: scale(1.08); }
.fig:hover .cap, .fig:hover .cap-title, .fig:hover .cap-body { opacity: 1; transform: translateY(0); }
.fig:hover .cap-body::before { transform: translateX(-50%) scaleX(1); }
```

**Fits.** Music label, cinema / film, festival / promo, editorial (poster variant), luxury fashion, indie game (premium tier), vibrant consumer / playful.

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, civic institutional (too theatrical), quiet craft (too declarative).

**Specimen.** `external-only` — see source link.

---

## H3 — Honey

**Source.** [Codrops · CaptionHoverEffects · Honey](https://tympanus.net/Development/CaptionHoverEffects/index3.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Bottom title slides up to settle inside the card; subtle image dim. The most reliable production hover — works everywhere.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: opacity 0.35s; }
.fig .cap {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 1.2em 1.4em;
  color: #fff;
  transform: translateY(50%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-title { font-weight: 600; }
.fig .cap-body {
  opacity: 0; max-height: 0; overflow: hidden;
  transition: opacity 0.3s 0.1s, max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig:hover img { opacity: 0.85; }
.fig:hover .cap { transform: translateY(0); }
.fig:hover .cap-body { opacity: 1; max-height: 4em; }
```

**Fits.** Almost any anchor — contemporary product, editorial, hospitality, boutique hotel, sustainable, civic (modern variant), documentary, music label (subtle tier).

**Avoid for.** Pure ops / utility / data dashboards (hover noise on tool surfaces), brutalist statement (too soft).

**Specimen.** `external-only` — see source link.

---

## H4 — Lily

**Source.** [Codrops · CaptionHoverEffects · Lily](https://tympanus.net/Development/CaptionHoverEffects/index4.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Title sits centered and steady; body fades in below; image zooms slightly. The reader's eye stays fixed while context arrives.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center;
  padding: 1.4em;
  color: #fff;
  background: linear-gradient(to top, rgba(15,12,8,0.5), rgba(15,12,8,0.15));
}
.fig .cap-title { font-weight: 700; transform: translateY(40%); transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap-body {
  opacity: 0; transform: translateY(40%);
  transition: opacity 0.3s 0.1s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig:hover img { transform: scale(1.06); }
.fig:hover .cap-title { transform: translateY(0); }
.fig:hover .cap-body { opacity: 1; transform: translateY(0); }
```

**Fits.** Editorial / publication, music label, cinema / film, documentary, hospitality (premium tier), luxury fashion, quiet craft (modern variant).

**Avoid for.** Brutalist (too soft), data / utility, trust-led B2B (too theatrical for the register).

**Specimen.** `external-only` — see source link.

---

## H5 — Selena

**Source.** [Codrops · CaptionHoverEffects · Selena](https://tympanus.net/Development/CaptionHoverEffects/index5.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Image rotates and scales away slightly; caption block fades in centered. Theatrical entry — the image *steps back* to introduce the caption.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; perspective: 1000px; }
.fig img {
  display: block; width: 100%;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.4em;
  color: #fff;
  background: rgba(15,12,8,0.45);
  opacity: 0;
  transition: opacity 0.4s;
}
.fig .cap-title { font-weight: 700; transform: scale(0.9); transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.5, 1); }
.fig .cap-body { transform: scale(0.9); transition: transform 0.4s cubic-bezier(0.34, 1.4, 0.5, 1) 0.05s; margin-top: 0.5em; }
.fig:hover img { transform: scale(0.94) rotate(-2deg); }
.fig:hover .cap { opacity: 1; }
.fig:hover .cap-title, .fig:hover .cap-body { transform: scale(1); }
```

**Fits.** Music label, cinema / film, festival / promo, vibrant consumer / playful, indie game (premium tier), luxury fashion (modern variant).

**Avoid for.** Trust-led B2B, healthcare clinical, civic institutional, editorial (too theatrical for literary registers).

**Specimen.** `external-only` — see source link.

---

## H6 — Apollo

**Source.** [Codrops · CaptionHoverEffects · Apollo](https://tympanus.net/Development/CaptionHoverEffects/index6.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Image scales and tilts subtly; caption appears from the top-left corner with a horizontal accent rule. Editorial poster mood with a single corner anchor.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img {
  display: block; width: 100%;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s;
}
.fig .cap {
  position: absolute; top: 0; left: 0;
  padding: 1.4em;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0,0,0,0.4);
}
.fig .cap-title { font-weight: 700; opacity: 0; transform: translateX(-12px); transition: opacity 0.35s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap-body { opacity: 0; transform: translateX(-12px); transition: opacity 0.35s 0.07s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.07s; margin-top: 0.4em; max-width: 22ch; }
.fig::after {
  content: ""; position: absolute; top: 1.4em; left: 1.4em;
  width: 2em; height: 1px; background: currentColor; color: #fff;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1) 0.15s;
}
.fig:hover img { transform: scale(1.05); filter: brightness(0.75); }
.fig:hover .cap-title, .fig:hover .cap-body { opacity: 1; transform: translateX(0); }
.fig:hover::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication, documentary / journalism, music label, cinema, luxury fashion, boutique hotel (cinematic variant).

**Avoid for.** Vibrant consumer / playful, sports / athletic, brutalist statement, ops / utility.

**Specimen.** `external-only` — see source link.

---

## H7 — Steve

**Source.** [Codrops · CaptionHoverEffects · Steve](https://tympanus.net/Development/CaptionHoverEffects/index7.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Image stays still; a full-overlay tint fades in with a frame inset, caption appears centered. The most "museum label" of the set — the image is the subject and the caption is reverent.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; isolation: isolate; }
.fig img { display: block; width: 100%; }
.fig .cap {
  position: absolute; inset: 0.8em;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1em;
  color: #fff;
  background: rgba(15,12,8,0.6);
  border: 1px solid rgba(255,255,255,0.6);
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 0.35s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-title { font-weight: 700; }
.fig .cap-body { margin-top: 0.5em; max-width: 24ch; text-align: center; }
.fig:hover .cap { opacity: 1; transform: scale(1); }
```

**Fits.** Editorial / publication, documentary / journalism, museum / gallery sites, boutique hotel (museum variant), luxury fashion, quiet craft (formal tier).

**Avoid for.** Vibrant consumer / playful, indie game, sports / athletic, brutalist (too formal).

**Specimen.** `external-only` — see source link.

---

## H8 — Marley

**Source.** [Codrops · CaptionHoverEffects · Marley](https://tympanus.net/Development/CaptionHoverEffects/index8.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Title sits centered at the bottom; body slides up to reveal beneath it on hover; thin top + bottom rules draw in. The most editorial-civic of the set — feels like a printed caption strip.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; left: 0; right: 0; bottom: 0;
  padding: 1.2em 1.4em;
  color: #fff;
  background: linear-gradient(to top, rgba(15,12,8,0.7), rgba(15,12,8,0));
}
.fig .cap-title { font-weight: 700; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap-body {
  opacity: 0; max-height: 0; overflow: hidden;
  transition: opacity 0.3s, max-height 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig::before, .fig::after {
  content: ""; position: absolute; left: 1.4em; right: 1.4em; height: 1px;
  background: rgba(255,255,255,0.8);
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig::before { top: 1.4em; transform-origin: left; }
.fig::after { bottom: 4.5em; transform-origin: right; }
.fig:hover img { transform: scale(1.04); }
.fig:hover .cap-title { transform: translateY(-1.8em); }
.fig:hover .cap-body { opacity: 1; max-height: 4em; }
.fig:hover::before, .fig:hover::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication, documentary / journalism, civic / institutional, museum / gallery, sustainable / eco, hospitality.

**Avoid for.** Vibrant consumer / playful, indie game, sports / athletic, brutalist statement.

**Specimen.** `external-only` — see source link.

---

## H9 — Ruby

**Source.** [Codrops · CaptionHoverEffects · Ruby](https://tympanus.net/Development/CaptionHoverEffects/index9.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Image scales down inside the card while a caption appears in the outer band that opens up. Like the image is being *displayed* in a frame.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; background: #1a1815; isolation: isolate; }
.fig img {
  display: block; width: 100%;
  transform: scale(1); transform-origin: center;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: space-between;
  padding: 1.4em;
  color: #fff;
  pointer-events: none;
}
.fig .cap-title {
  font-weight: 700;
  opacity: 0; transform: translateY(-16px);
  transition: opacity 0.35s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-body {
  opacity: 0; transform: translateY(16px); max-width: 28ch;
  transition: opacity 0.35s 0.05s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.05s;
}
.fig:hover img { transform: scale(0.86); }
.fig:hover .cap-title { opacity: 1; transform: translateY(0); }
.fig:hover .cap-body { opacity: 1; transform: translateY(0); }
```

**Fits.** Editorial / publication, music label, cinema, gallery / portfolio sites, luxury fashion / fragrance, boutique hotel.

**Avoid for.** Trust-led B2B (too theatrical), ops / utility, indie game (energy mismatch).

**Specimen.** `external-only` — see source link.

---

## H10 — Bubba

**Source.** [Codrops · CaptionHoverEffects · Bubba](https://tympanus.net/Development/CaptionHoverEffects/index10.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** A frame draws in from all four edges while a tint fades; title fades in centered with body below. The most architectural of the set — geometry as the entry.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; opacity: 1; transition: opacity 0.35s; }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.4em;
  color: #fff;
  background: rgba(15,12,8,0.55);
  opacity: 0;
  transition: opacity 0.35s;
}
.fig .cap-title { font-weight: 700; opacity: 0; transform: translateY(-12px); transition: opacity 0.35s 0.1s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.1s; }
.fig .cap-body { opacity: 0; transform: translateY(12px); margin-top: 0.5em; max-width: 26ch; text-align: center; transition: opacity 0.35s 0.15s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.15s; }
.fig::before, .fig::after {
  content: ""; position: absolute; inset: 1em;
  border: 1px solid #fff;
  transform: scale(1.05); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s;
  pointer-events: none;
}
.fig::after { transform: scale(0.95); }
.fig:hover img { opacity: 0.7; }
.fig:hover .cap, .fig:hover .cap-title, .fig:hover .cap-body { opacity: 1; transform: translateY(0); }
.fig:hover::before, .fig:hover::after { opacity: 1; transform: scale(1); }
```

**Fits.** Editorial / publication, museum / gallery, architecture firm, music label, cinema, luxury fashion (architectural tier).

**Avoid for.** Vibrant consumer (over-engineered), sports / athletic, indie game (energy mismatch), brutalist (the frame already exists in brutalist — redundant).

**Specimen.** `external-only` — see source link.

---

## H11 — Romeo

**Source.** [Codrops · CaptionHoverEffects · Romeo](https://tympanus.net/Development/CaptionHoverEffects/index11.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Title splits — half slides left, half slides right; body fades in centered between them; image scales slightly. The most theatrical of the lettered set.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.4em;
  color: #fff;
}
.fig .cap-title {
  font-weight: 700; display: inline-flex; gap: 0.4em;
}
.fig .cap-title > * {
  transform: translateY(8px); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s;
}
.fig .cap-title > :first-child { transform: translateX(-30px) translateY(0); }
.fig .cap-title > :last-child { transform: translateX(30px) translateY(0); }
.fig .cap-body { opacity: 0; transform: translateY(12px); margin-top: 0.6em; transition: opacity 0.35s 0.1s, transform 0.4s 0.1s; max-width: 24ch; text-align: center; }
.fig:hover img { transform: scale(1.06); }
.fig:hover .cap-title > * { opacity: 1; transform: translate(0); }
.fig:hover .cap-body { opacity: 1; transform: translateY(0); }
```

Note: title markup splits the title into two spans so each half can translate independently:
```html
<h2 class="cap-title"><span>Lorem</span> <span>Ipsum</span></h2>
```

**Fits.** Music label, cinema / film, festival / promo, vibrant consumer / playful, indie game (premium tier), luxury fashion (theatrical tier).

**Avoid for.** Trust-led B2B, healthcare clinical, editorial (literary registers), quiet craft, ops / utility.

**Specimen.** `external-only` — see source link.

---

## H12 — Dexter

**Source.** [Codrops · CaptionHoverEffects · Dexter](https://tympanus.net/Development/CaptionHoverEffects/index12.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** A diagonal sweep enters from the corner; image zooms; caption appears in the cleared zone. Cinematic, asymmetric, distinctive.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fig::before {
  content: ""; position: absolute; inset: 0;
  background: rgba(15,12,8,0.6);
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  transition: clip-path 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;
  padding: 1.4em;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s 0.15s;
}
.fig .cap-title { font-weight: 700; }
.fig .cap-body { margin-top: 0.5em; max-width: 24ch; }
.fig:hover img { transform: scale(1.08); }
.fig:hover::before { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
.fig:hover .cap { opacity: 1; }
```

**Fits.** Music label, cinema / film, festival / promo, indie game, vibrant consumer / playful.

**Avoid for.** Editorial (too aggressive), trust-led B2B, healthcare clinical, civic / institutional, quiet craft.

**Specimen.** `external-only` — see source link.

---

## H13 — Sarah

**Source.** [Codrops · CaptionHoverEffects · Sarah](https://tympanus.net/Development/CaptionHoverEffects/index13.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Bottom band slides up with title and a "→" affordance icon; image scales. The most "go-look-at-this" of the set — implies action.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; left: 0; right: 0; bottom: 0;
  display: flex; align-items: center; justify-content: space-between; gap: 1em;
  padding: 1em 1.4em;
  color: #1a1815; background: #fff;
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-title { font-weight: 700; }
.fig .cap-body { display: none; }
.fig .cap::after {
  content: "→"; font-size: 1.2em; line-height: 1; opacity: 0.6;
  transition: transform 0.3s, opacity 0.3s;
}
.fig:hover img { transform: scale(1.05); }
.fig:hover .cap { transform: translateY(0); }
.fig:hover .cap::after { transform: translateX(4px); opacity: 1; }
```

**Fits.** Editorial / publication (modern variant), documentary / journalism, blog / newsletter, hospitality (modern menu variant), contemporary product showcases, news / publication sites.

**Avoid for.** Brutalist statement, luxury fashion (too brisk), quiet craft (too commercial-feeling), ops / utility.

**Specimen.** `external-only` — see source link.

---

## H14 — Chico

**Source.** [Codrops · CaptionHoverEffects · Chico](https://tympanus.net/Development/CaptionHoverEffects/index14.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** An inner border scales into being while the whole image dims; title + body fade in within the framed zone. Quiet, formal, gallery-coded.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: filter 0.4s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.4em;
  color: #fff;
}
.fig .cap-title { font-weight: 700; opacity: 0; transition: opacity 0.4s 0.15s; }
.fig .cap-body { opacity: 0; margin-top: 0.5em; max-width: 28ch; text-align: center; transition: opacity 0.4s 0.2s; }
.fig::before {
  content: ""; position: absolute; inset: 1.2em;
  border: 1px solid rgba(255,255,255,0.7);
  transform: scale(1.06); opacity: 0;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s;
}
.fig:hover img { filter: brightness(0.55); transform: scale(1.03); }
.fig:hover::before { transform: scale(1); opacity: 1; }
.fig:hover .cap-title, .fig:hover .cap-body { opacity: 1; }
```

**Fits.** Editorial / publication, museum / gallery, hospitality (formal tier), luxury fashion, boutique hotel, quiet craft (formal tier), architecture firm.

**Avoid for.** Vibrant consumer / playful, sports / athletic, indie game, brutalist statement.

**Specimen.** `external-only` — see source link.

---

## H15 — Oscar

**Source.** [Codrops · CaptionHoverEffects · Oscar](https://tympanus.net/Development/CaptionHoverEffects/index15.html)

**Applied to.** `[M2, any card-grid]`

**Effect.** Caption fades in centered and scales gently while image dims to deep ink. The classic "image fades, words arrive" — the most universal hover after Honey.

**Recipe.**
```css
.fig { position: relative; overflow: hidden; }
.fig img { display: block; width: 100%; transition: filter 0.4s, transform 0.4s; }
.fig .cap {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; justify-content: center; align-items: center;
  padding: 1.4em;
  color: #fff;
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.35s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.fig .cap-title { font-weight: 700; }
.fig .cap-body { margin-top: 0.5em; max-width: 26ch; text-align: center; }
.fig:hover img { filter: brightness(0.45); transform: scale(1.03); }
.fig:hover .cap { opacity: 1; transform: scale(1); }
```

**Fits.** Almost any anchor that uses photographic cards. Universal default for elegant subtle hover; favors editorial, documentary, hospitality, boutique hotel, music label (subtle tier), luxury fashion, sustainable.

**Avoid for.** Brutalist statement, vibrant consumer / playful (too quiet), sports / athletic, ops / utility.

**Specimen.** `external-only` — see source link.

---

## H16 — Storefront

**Source.** New in nebula — designed for type-led card grids that carry per-card accent colors (M8 type-as-pattern bands, beer-name catalogues, manifesto card rows). The card *announces itself* on hover without leaving its grid position.

**Applied to.** `[M8, type-led card grids with per-card accents]`

**Effect.** On hover: card scales 1.02×, the card's accent color saturation lifts via `color-mix` (70% accent + 30% white) for a *brighter* version of the per-card hue, and a 1px underline reveals under the card's display element. Apply uniformly to every card in the grid; the per-card accent color varies but the hover shape stays consistent.

**Recipe.**
```css
.tcard {
  --card-accent: var(--acc-primary);  /* per-card override via inline style or data-attr */
  position: relative;
  background: var(--card-bg, var(--bg));
  padding: var(--rhythm) calc(var(--rhythm) * 1.2);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.tcard__title {
  color: var(--card-accent);
  position: relative;
  transition: color 0.2s ease;
}
.tcard__title::after {
  content: ""; position: absolute;
  left: 0; right: 0; bottom: -3px;
  height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.tcard:hover { transform: scale(1.02); }
.tcard:hover .tcard__title {
  color: color-mix(in oklch, var(--card-accent) 70%, white 30%);
}
.tcard:hover .tcard__title::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication (with per-card accents), music label (catalogue), hospitality (menu cards), vibrant consumer / playful, indie game, festival / promo, civic / institutional (publication register).

**Avoid for.** Photographic card grids (M2 — those carry H1 Sadie), list-style items (those carry H17), pure ops / utility surfaces.

**Anti-pairs (motion vocabularies).** V1 magnetic chain (cursor territory clash), V9 drift compositions (background territorial clash).

**Specimen.** `inline-complete` — the CSS recipe above is the full specimen. Render adapts class names to the page namespace.

---

## H17 — Editorial Item

**Source.** New in nebula — designed for list-style content items (news feeds, article lists, post lists). The list item *advances forward* on hover, signaling forward motion to the linked content.

**Applied to.** `[list-style content items, news / article / post feeds]`

**Effect.** On hover: title color shifts to `--acc-primary`, an underline appears under the title, and the whole item slides forward by 2px via `transform: translateX(2px)`. The forward motion is the read — like the bartender leaning in toward the listener.

**Recipe.**
```css
.eitem {
  display: block;
  padding: var(--rhythm) 0;
  border-bottom: 1px solid var(--rule, currentColor);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.eitem__title {
  color: var(--ink);
  position: relative;
  transition: color 0.2s ease;
}
.eitem__title::after {
  content: ""; position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.eitem:hover { transform: translateX(2px); }
.eitem:hover .eitem__title { color: var(--acc-primary); }
.eitem:hover .eitem__title::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication (article lists, news feeds), documentary / journalism, music label (release lists), civic / institutional (publication archives), hospitality (event lists), indie game (release notes), sustainable / eco (post feeds).

**Avoid for.** Card grids (use H1 / H16 instead), button-like CTAs (use B-effects), photographic surfaces (use H1 Sadie).

**Anti-pairs (motion vocabularies).** V1 magnetic chain (cursor territory clash), V11 crosshatching reveal (both want forward motion as the metaphor; redundant).

**Specimen.** `inline-complete` — the CSS recipe above is the full specimen.
