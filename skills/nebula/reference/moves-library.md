# Moves library

> **Status: round 1 authored 2026-05-14 (photographic family, M1–M5).**
>
> This file lists named, concrete design recipes ("moves") with enough
> specificity that `nebula:render` can execute them deterministically.
> Each move is referenced by ID (M1, M2, …) from `DESIGN.json` and
> applied during render.

The agent reads this file in two places:
- `nebula:direct` Phase 4 — picks 2–4 moves that fit the anchor and axes.
- `nebula:render` Phase 1 — looks up each picked move and executes it.

**Sample from this library; do not invent moves.** If a needed move is not
in the library, stop and surface it — the library grows by user
authorship, not by improvisation.

## Schema for each move

```
## M<n> — <short name>

**Use when.** The situation(s) this move fits — anchor families,
section roles, brief signals. Be specific; *"hero section"* is too vague.

**Recipe.** The concrete CSS / HTML / structural pattern. Measurable
values (opacity ranges, filter parameters, mask stops, specific
properties). Self-contained enough that render can copy-paste-adapt.

**Pitfalls.** Named pitfalls this move tends to trip into (cross-link
to `pitfalls.md`).

**Pairs with.** Other moves that compose well with this one (e.g., M1
pairs with M5 to bookend a page).
```

## Index by anchor family

The library opens with the **photographic family** (M1–M5). Other anchor
families — type-led, grid-led, editorial composition, brutalist
statement — will be added as user-authored content lands.

### Photographic anchor family

## M1 — Photographic hero (full-bleed)

**Use when.** The anchor implies cinematic or atmospheric photography
(hospitality, music label, documentary, luxury fashion, boutique hotel,
wine / spirits, editorial). The brief volunteers hero photography or the
content surface contains named-subject photography that earns full-bleed
treatment. Pairs with a closing band (M5) to bookend the page.

**Recipe.**

- Photograph as a `position: absolute; inset: 0; z-index: -2` layer on
  the hero section.
- Stacked scrim via the **parent section's** `::after` — *NOT* the
  photo's `::after`. See `pitfalls.md` § Pitfall A — the photo's filter
  would dim the scrim too.
- Vertical scrim: dark at the type band, fading to the next section's
  substrate at the bottom 6–12% so the section transition is
  photographic, not edge-cut.
- Horizontal scrim: heavier on the side carrying type (left-anchored
  type → left-darker scrim; right-anchored → right-darker).

```css
.hero {
  position: relative;
  isolation: isolate;
  min-height: 80vh;
  padding: var(--pad);
  overflow: hidden;
}

.hero .photo {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: url(/path/to/hero.jpg);
  background-size: cover;
  background-position: center;
  /* Optional atmospheric filter; if used, scrim MUST be on parent's ::after */
  /* filter: saturate(0.6) brightness(0.5); */
}

.hero::after {
  /* Scrim on PARENT (see § Pitfall A) — sits between photo (z:-2) and content */
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    /* Horizontal scrim — type-side heavier (left-anchored type → left-darker) */
    linear-gradient(
      90deg,
      rgba(15, 12, 8, 0.45) 0%,
      rgba(15, 12, 8, 0.18) 40%,
      transparent 70%
    ),
    /* Vertical scrim — fades to next-section substrate in last 6-12% */
    linear-gradient(
      180deg,
      rgba(15, 12, 8, 0.55) 0%,
      rgba(15, 12, 8, 0.40) 40%,
      rgba(15, 12, 8, 0.22) 80%,
      var(--next-section-bg, transparent) 100%
    );
}

.hero .content { position: relative; z-index: 1; color: var(--paper); }
```

**Pitfalls.** `Pitfall A` (scrim under filtered photo — parent's
`::after`, not the photo's).

**Pairs with.** **M5** (cinematic closer) to bookend the page with the
same source photograph at different intensities. **M3** for a quiet
atmospheric band in the middle of a long-form page.

---

## M2 — Photographic card / panel

**Use when.** Card grids with real subjects — named-person portraits,
product-as-object photography, gallery thumbnails. The photo *is* the
card; type overlays it. Replaces the "photo cropped into a square
container with text below" pattern.

**Recipe.**

- Photograph IS the card surface (no surrounding chrome).
- Type overlays the bottom third via a bottom-weighted scrim on the
  *card's* `::after`. Bottom 12% is heavy ink; AA contrast verified at
  the type baseline.
- Hover scales the photo (1.03–1.05) and lightens the scrim slightly —
  the photo reveals more of itself when invited.

```css
.photo-card {
  position: relative;
  isolation: isolate;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  cursor: pointer;
}

.photo-card .photo {
  position: absolute;
  inset: 0;
  background-image: url(/path/to/subject.jpg);
  background-size: cover;
  background-position: center;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-card::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Upper two-thirds transparent; bottom third weights for type */
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 55%,
    rgba(15, 12, 8, 0.35) 75%,
    rgba(15, 12, 8, 0.78) 100%
  );
  transition: opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.photo-card .type {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 18px 18px;
  color: var(--paper);
  z-index: 1;
}

.photo-card:hover .photo { transform: scale(1.04); }
.photo-card:hover::after { opacity: 0.85; }
```

**Pitfalls.** `Pitfall A` applies *if* the photo is given a filter
(`.photo { filter: ... }`) — in that case move the scrim to the
parent's `::after` like M1.

**Pairs with.** **M4** (fade-into-page mask) for one or two hero
portraits within the same card grid, used as the "featured" treatment.

---

## M3 — Full-bleed atmospheric band

**Use when.** A mid-page section needs photography as *texture*, not
subject. Long-form pages that benefit from a photographic backdrop
behind type-led content. Editorial transitions between content sections.

**Recipe.**

- Big-photograph section with `filter: saturate(0.55–0.7)
  brightness(0.32–0.55)` on the photo layer (separate from the scrim
  layer, see § Pitfall A).
- Radial-gradient vignette centered on the type column (darker at
  center where type sits, photo more visible at corners) stacked with
  a linear-gradient.
- Photograph reads as atmospheric texture; type carries the section.

```css
.atmos-band {
  position: relative;
  isolation: isolate;
  padding: 96px 0;
  overflow: hidden;
}

.atmos-band .photo {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: url(/path/to/texture.jpg);
  background-size: cover;
  background-position: center;
  /* Photo is texture; subdue it */
  filter: saturate(0.58) brightness(0.42);
}

.atmos-band::after {
  /* Scrim on PARENT — see § Pitfall A.
     Radial vignette around type column + linear from top. */
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 60% 50% at 50% 50%,
      transparent 0%,
      rgba(15, 12, 8, 0.4) 100%
    ),
    linear-gradient(
      180deg,
      rgba(15, 12, 8, 0.20) 0%,
      rgba(15, 12, 8, 0.50) 100%
    );
}

.atmos-band .content {
  position: relative;
  z-index: 1;
  color: var(--paper);
  max-width: 60ch;
  margin: 0 auto;
}
```

**Pitfalls.** `Pitfall A` (mandatory — this move always uses a photo
filter).

**Pairs with.** **M1** (hero) and **M5** (closer) for a fully
photographic page rhythm. Can run standalone as a single mood-band in
an otherwise type-led page.

---

## M4 — Fade-into-page mask

**Use when.** Portrait or product photography that should *emerge from*
the page rather than sit in a rectangular frame. Gallery folios,
editorial subject treatments, single-image hero variants where the
subject is meant to look unframed.

**Recipe.**

- `mask-image` is a vertical linear gradient with stops near 12–16% and
  84–88% — transparent at the very top and very bottom, opaque in the
  middle.
- The image dissolves into the page's substrate at top and bottom — no
  hard rectangular boundary.
- Works on `<img>` directly, or on a wrapping element if you also want
  to round corners independently.

```css
.fade-mask {
  /* Vertical fade in/out — image emerges from / dissolves into the page */
  -webkit-mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 14%,
    #000 86%,
    transparent 100%
  );
  mask-image: linear-gradient(
    180deg,
    transparent 0%,
    #000 14%,
    #000 86%,
    transparent 100%
  );
}

.fade-mask img { width: 100%; height: auto; display: block; }
```

Tune the stops to taste — closer to 0% / 100% (e.g. 8% / 92%) gives a
softer dissolve; further in (18% / 82%) gives a more pronounced
emerging-from-page effect.

**Pitfalls.** No specific pitfall — the move is mask-only, no scrim,
no filter. Works on any photo. If the photo also needs a filter,
apply it to the masked element; the mask doesn't interact with
filters the way `::after` scrims do.

**Pairs with.** **M2** for one or two featured portraits in a card
grid that get a more refined treatment than the rest. Can run
standalone for editorial subject pages.

---

## M5 — Cinematic closer band

**Use when.** Closing a page that opened with M1 — bookends the
narrative with the same photograph at lower intensity. Festival-style
campaign pages, editorial features that want a final mood beat,
hospitality / wine / luxury closers.

**Recipe.**

- Reuses the hero photograph at a heavier `filter: brightness(0.4)` plus
  a brand-accent-tinted overlay (e.g., sunburn-red linear-gradient at
  ~0.16 opacity) layered on the parent's `::after` (per § Pitfall A).
- Big-type closer over the dimmed image. The accent tint comes from the
  brand palette's spark color, not from a generic warm overlay.
- Bookends the page when paired with M1.

```css
.closer-band {
  position: relative;
  isolation: isolate;
  min-height: 60vh;
  padding: 96px 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.closer-band .photo {
  position: absolute;
  inset: 0;
  z-index: -2;
  /* Reuse the M1 hero image source */
  background-image: url(/path/to/hero.jpg);
  background-size: cover;
  background-position: center;
  filter: brightness(0.4);
}

.closer-band::after {
  /* Brand-accent-tinted overlay on PARENT — see § Pitfall A */
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(
      180deg,
      var(--spark-tint, rgba(177, 74, 57, 0.16)) 0%,
      rgba(15, 12, 8, 0.60) 100%
    );
}

.closer-band h2 {
  position: relative;
  z-index: 1;
  font-size: clamp(2.5rem, 6vw, 5rem);
  color: var(--paper);
  text-align: center;
  max-width: 24ch;
  line-height: 1.1;
}
```

**Pitfalls.** `Pitfall A` (mandatory — filter + scrim layering).

**Pairs with.** **M1** (mandatory bookend) — they share a source photo,
so the page reads as a single visual arc rather than two separate
sections.

---

### Type-led anchor family

*TODO — author when needed.*

### Grid / system anchor family

*TODO — author when needed.*

### Editorial composition anchor family

*TODO — author when needed.*

### Brutalist statement anchor family

*TODO — author when needed.*
