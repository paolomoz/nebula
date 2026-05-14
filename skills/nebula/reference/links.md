# Links library

> **Status: round 1 authored 2026-05-14 (12 entries, 0 specimens —
> all entries are CSS-only and inline-complete).**
>
> Link effects are **inline-text-link decorations** — the visual
> language of every `<a>` inside body prose. A fourth atomic-scope
> decision, distinct from hovers (card-grid modifiers), buttons
> (CTA atoms), and motion vocabularies (page-wide postures).

## Composition rule

**0–1 link effect per page.** All inline links in body prose share
one decoration so the reading voice stays consistent. Mixing two
link effects in the same paragraph is the loudest possible
reading-flow inconsistency.

This rule matches buttons' rule shape (0–1 per page, page-wide
voice). See `retrieval.md` § Consolidation watch — buttons + links
are the most likely future merge into a single `micro-interactions.md`.

## Tech-stack budget per anchor family

All Codrops Creative Link Effects are **CSS-only** — no tech budget
constraint. The anchor only affects *which* effect fits (e.g.,
Aratron's highlighter fill is wrong for trust-led B2B; Anpan's
quiet color change is wrong for music-label).

| Anchor family | Recommended range |
|---|---|
| trust-led B2B / fintech, healthcare clinical, civic institutional, tech research | L1 Sansa · L3 Wilcox · L12 Anpan |
| editorial / publication, documentary / journalism, sustainable / eco, quiet craft | L1–L4 · L9 · L10 · L12 |
| music label, cinema / film, festival / promo, luxury fashion, indie game | L2 · L4 · L5–L8 · L11 |
| vibrant consumer / playful, hospitality | L1 · L2 · L7 · L8 · L11 |
| sports / athletic | L1 · L3 · L7 |

## Schema for each entry

```
## L<n> — <name>

**Source.** Codrops link to the original demo.
**Effect.** One-line description of what happens on hover.
**Tech stack.** Vanilla CSS · CSS + minimal markup (letter spans).
**Trigger.** Hover.
**Recipe.** Working CSS scoped to `.lnk` class.
**Fits.** Anchor families that earn this effect.
**Avoid for.** The complement.
**Specimen.** Local path or `external-only`.
```

The canonical link markup these recipes target:

```html
<p>Read more <a class="lnk" href="…">about the project</a> and
the <a class="lnk" href="…">field notes</a>.</p>
```

For effects that need per-letter wrapping (L5 Roald, L8 Magnus), the
recipe declares the augmented markup; `render` wraps inline.

## Entries

## L1 — Sansa

**Source.** [Codrops · CreativeLinkEffects · Sansa](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Slim 1px underline draws in from left on hover. The quietest underline effect; reads as deliberate without being theatrical.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-repeat: no-repeat;
  background-size: 0 1px;
  transition: background-size 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  padding-bottom: 1px;
}
.lnk:hover { background-size: 100% 1px; }
```

**Fits.** Editorial / publication, civic / institutional, documentary, trust-led B2B / fintech, healthcare clinical, sustainable / eco, tech research / academic — universal-restrained default.

**Avoid for.** Brutalist statement, music label (too quiet), indie game (energy mismatch).

**Specimen.** `external-only` — see source.

---

## L2 — Boa

**Source.** [Codrops · CreativeLinkEffects · Boa](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** 1px underline draws in from the center outward (symmetric scaleX). Reads as more deliberate than Sansa — the user sees the line "open up."

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  position: relative;
}
.lnk::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 1px; background: currentColor;
  transform: scaleX(0); transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover::after { transform: scaleX(1); }
```

**Fits.** Editorial / publication, music label, cinema / film, documentary, luxury fashion (subtle tier).

**Avoid for.** Trust-led B2B (the symmetric draw reads as theatrical for serious tones), ops / utility, brutalist.

**Specimen.** `external-only` — see source.

---

## L3 — Wilcox

**Source.** [Codrops · CreativeLinkEffects · Wilcox](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Underline is always present (1px); on hover, it *thickens* to 3px. The line stays — the link declares itself before the cursor arrives.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
  transition: border-bottom-width 0.2s, padding-bottom 0.2s;
}
.lnk:hover {
  border-bottom-width: 3px;
  padding-bottom: 0;
}
```

**Fits.** Editorial / publication, documentary / journalism, civic, sustainable, tech research, healthcare, hospitality (formal tier) — anchor families that want visible accessibility cues for links.

**Avoid for.** Vibrant consumer / playful, indie game (too restrained), brutalist.

**Specimen.** `external-only` — see source.

---

## L4 — Levin

**Source.** [Codrops · CreativeLinkEffects · Levin](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Two-tone underline — one thin line and one thicker line, separated by a small gap, both draw in on hover. Editorial-poster idiom; reads as deliberately typographic.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  background-image:
    linear-gradient(currentColor, currentColor),
    linear-gradient(currentColor, currentColor);
  background-size: 0 1px, 0 2px;
  background-position: 0 100%, 0 calc(100% + 3px);
  background-repeat: no-repeat;
  padding-bottom: 4px;
  transition: background-size 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover { background-size: 100% 1px, 100% 2px; }
```

**Fits.** Editorial / publication, music label (literary tier), cinema / film, luxury fashion, documentary (poster variant).

**Avoid for.** Trust-led B2B, ops / utility, civic (the typographic poster idiom is too declarative for civic-quiet).

**Specimen.** `external-only` — see source.

---

## L5 — Roald

**Source.** [Codrops · CreativeLinkEffects · Roald](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Letter-by-letter color sweep on hover — each character shifts to the accent color in stagger, producing a horizontal wave of color through the link text.

**Tech stack.** Vanilla CSS + minimal markup (letter wrapping).

**Trigger.** Hover.

**Markup** (render wraps each letter in a span):
```html
<a class="lnk lnk--roald" href="…"><span>R</span><span>o</span><span>a</span><span>l</span><span>d</span></a>
```

**Recipe.**
```css
.lnk--roald { text-decoration: none; color: var(--ink); }
.lnk--roald span {
  transition: color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk--roald:hover span { color: var(--accent); }
.lnk--roald:hover span:nth-child(1) { transition-delay: 0ms; }
.lnk--roald:hover span:nth-child(2) { transition-delay: 40ms; }
.lnk--roald:hover span:nth-child(3) { transition-delay: 80ms; }
.lnk--roald:hover span:nth-child(4) { transition-delay: 120ms; }
.lnk--roald:hover span:nth-child(5) { transition-delay: 160ms; }
.lnk--roald:hover span:nth-child(6) { transition-delay: 200ms; }
.lnk--roald:hover span:nth-child(7) { transition-delay: 240ms; }
.lnk--roald:hover span:nth-child(8) { transition-delay: 280ms; }
.lnk--roald:hover span:nth-child(9) { transition-delay: 320ms; }
.lnk--roald:hover span:nth-child(10) { transition-delay: 360ms; }
/* render generates nth-child rules dynamically up to longest link */
```

**Fits.** Music label, indie game / playful tech, cinema (festival variant), vibrant consumer / playful — anchors where the kinetic letter wave is on-brand.

**Avoid for.** Long-prose contexts (the wave breaks reading flow if links are frequent), trust-led B2B, civic, healthcare, editorial-quiet, ops / utility.

**Specimen.** `external-only` — see source.

---

## L6 — Almos

**Source.** [Codrops · CreativeLinkEffects · Almos](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Bracket pair `[` and `]` appears around the link text on hover, sliding in from outside. Reads as editorial-cool — the brackets signal "this is a citation / aside / footnote."

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  position: relative;
  padding: 0 0.3em;
  transition: padding 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk::before, .lnk::after {
  position: absolute;
  top: 0; bottom: 0;
  color: currentColor;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk::before { content: "["; left: 0; transform: translateX(4px); }
.lnk::after  { content: "]"; right: 0; transform: translateX(-4px); }
.lnk:hover::before { opacity: 1; transform: translateX(0); }
.lnk:hover::after  { opacity: 1; transform: translateX(0); }
```

**Fits.** Editorial / publication, documentary / journalism, music label (literary tier), indie game (premium / type-led tier), cinema (festival), academic / scholarly publications.

**Avoid for.** Trust-led B2B (too playful), civic, healthcare clinical, ops / utility, vibrant consumer (the bracket idiom reads as too literary for consumer pop).

**Specimen.** `external-only` — see source.

---

## L7 — Aratron

**Source.** [Codrops · CreativeLinkEffects · Aratron](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Background fills behind text on hover (highlighter-style), text inverts color. The most physical of the link effects — the link feels marked by hand.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 100%;
  background-size: 100% 0;
  background-repeat: no-repeat;
  padding: 0 4px;
  transition:
    background-size 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    color 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover {
  background-size: 100% 100%;
  color: var(--paper);
}
```

**Fits.** Editorial / publication (modern variant), vibrant consumer / playful, music label, indie game, documentary (modern variant), hospitality (modern variant).

**Avoid for.** Trust-led B2B, healthcare clinical, civic institutional, restrained quiet-craft registers (the highlighter idiom reads as too informal).

**Specimen.** `external-only` — see source.

---

## L8 — Magnus

**Source.** [Codrops · CreativeLinkEffects · Magnus](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Text slides up out of view; a duplicate in the accent color slides up from below to replace it. The link reads as having a *second voice* that arrives on hover.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Markup** (render wraps inner content + adds `data-replace`):
```html
<a class="lnk lnk--magnus" href="…" data-replace="Magnus"><span>Magnus</span></a>
```

**Recipe.**
```css
.lnk--magnus {
  display: inline-block;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  vertical-align: top;
  line-height: 1.1;
}
.lnk--magnus span {
  display: inline-block;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk--magnus::after {
  content: attr(data-replace);
  position: absolute;
  top: 100%; left: 0;
  color: var(--accent);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk--magnus:hover span { transform: translateY(-100%); }
.lnk--magnus:hover::after { transform: translateY(-100%); }
```

**Fits.** Editorial / publication (modern variant), music label, cinema / film, vibrant consumer / playful, luxury fashion (statement tier).

**Avoid for.** Trust-led B2B, civic, healthcare, ops / utility — the swap idiom reads as theatrical for serious tones. **Verify accessibility** (screen readers may double-read; ensure `data-replace` content is appropriate).

**Specimen.** `external-only` — see source.

---

## L9 — Pinkerton

**Source.** [Codrops · CreativeLinkEffects · Pinkerton](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Strikethrough draws in left-to-right on hover. Best reserved for *semantic* uses — deletion, "before/after," superseded links — not general navigation.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0 55%;
  background-size: 0 1px;
  background-repeat: no-repeat;
  transition: background-size 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover { background-size: 100% 1px; }
```

**Fits.** Editorial (specific semantic uses), documentary / journalism, news / publication sites that mark superseded references, civic publication archives, archival / library sites.

**Avoid for.** Standard navigation, primary CTAs, any link where strikethrough's "deleted" connotation is wrong. This is a *specialist* effect — not a general-purpose default. Most pages should use L1 or L12 instead.

**Specimen.** `external-only` — see source.

---

## L10 — Eachann

**Source.** [Codrops · CreativeLinkEffects · Eachann](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Small asterisk `*` appears next to the word on hover, sliding in. Reads as footnote / annotation — the link signals supplementary content.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  position: relative;
  padding-right: 0.4em;
  transition: padding-right 0.25s;
}
.lnk::after {
  content: "*";
  position: absolute;
  right: -0.2em; top: -0.15em;
  font-size: 0.85em;
  color: var(--accent);
  opacity: 0;
  transform: translateX(4px);
  transition: opacity 0.25s, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover { padding-right: 0.8em; }
.lnk:hover::after { opacity: 1; transform: translateX(0); }
```

**Fits.** Editorial / publication (footnote / annotation register), documentary / journalism (long-form essays with citations), academic / scholarly publications, museum / gallery sites, archive / library sites.

**Avoid for.** Contemporary product, trust-led B2B (too literary for product tone), vibrant consumer / playful (too quiet), hospitality, music label (the asterisk idiom is wrong register).

**Specimen.** `external-only` — see source.

---

## L11 — Ergon

**Source.** [Codrops · CreativeLinkEffects · Ergon](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** Diagonal stripe pattern fills the underline space on hover — kinetic, distinctive. The link grows a *patterned* underline rather than a solid one.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  background-image: repeating-linear-gradient(
    -45deg,
    currentColor 0,
    currentColor 1px,
    transparent 1px,
    transparent 3px
  );
  background-position: 0 calc(100% + 4px);
  background-size: 0 4px;
  background-repeat: no-repeat;
  padding-bottom: 6px;
  transition: background-size 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover { background-size: 100% 4px; }
```

**Fits.** Music label, indie game / playful tech, cinema (festival variant), vibrant consumer / playful, architecture firm (technical tier).

**Avoid for.** Trust-led B2B, civic, healthcare clinical, editorial-quiet registers (the diagonal-stripe idiom is too kinetic for restrained tones), ops / utility.

**Specimen.** `external-only` — see source.

---

## L12 — Anpan

**Source.** [Codrops · CreativeLinkEffects · Anpan](https://tympanus.net/Development/CreativeLinkEffects/).

**Effect.** The quietest possible link effect — text color shifts to accent on hover, *no underline*, *no decoration*. The link is identified by hover alone.

**Tech stack.** Vanilla CSS.

**Trigger.** Hover.

**Recipe.**
```css
.lnk {
  text-decoration: none;
  color: var(--ink);
  transition: color 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.lnk:hover { color: var(--accent); }
.lnk:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 2px;
}
```

**Fits.** Trust-led B2B / fintech, healthcare clinical, civic / institutional, tech research / academic — any anchor where link decorations are too much and links should melt into prose.

**Avoid for.** Anywhere underline is *semantically expected* — particularly accessibility-critical contexts where color-only differentiation fails WCAG. **The focus-visible outline above is mandatory** to satisfy WCAG 1.4.1 (Use of Color); links must remain identifiable without hover. Verify with accessibility audit; if links aren't visually distinct from prose without hover, escalate to L1 Sansa (which adds an always-on light underline cue).

**Specimen.** `external-only` — see source.
