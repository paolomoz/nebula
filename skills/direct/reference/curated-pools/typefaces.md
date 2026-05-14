# Curated pool — typefaces

> **Status: round 1 authored 2026-05-14.**
>
> This pool lists vetted Google Font pairings the agent samples from in
> `nebula:direct` Phase 2 (axis A1). Round 1 sourced from
> [Fontpair.co](https://www.fontpair.co)'s per-font pairing pages for ~75
> popular Google Fonts; pairings curated by Fontpair's editorial team, then
> surfaced through a per-intent playground and filtered by Paolo.

The agent reads this file when committing on the typography axis. **Sample
from this list; do not invent.** If a needed pairing is missing from the
pool, stop and surface to the user — the pool grows by user authorship.

## Schema for each entry

```
## T<n> — <name>

**Display.** Named typeface, weight strategy, intended use.
**Body.** Named typeface, weight strategy, intended use.
**Scale.** Type ratio (e.g., 1.333) and reasoning.
**Fits.** Anchor families / brief signals this pairing fits.
**Avoid for.** Briefs / anchors this pairing should not be used for.
**Source / CDN.** Where the typefaces come from (Google Fonts, Adobe Fonts,
self-hosted, etc.). Include CSS @import or <link> snippet.
```

## Entries

## T1 — Montserrat & Google Sans

**Display.** `Montserrat` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Google Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** trust-led B2B / fintech <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

**Source / CDN.** Google Fonts.
  > **Note:** `Google Sans` is hosted on Fontshare, not Google Fonts. Substitute the appropriate Fontshare CSS import for that family.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: geometric-sans
  pickedFor: trust-fintech
-->

## T2 — Inter & Montserrat

**Display.** `Inter` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Montserrat` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** trust-led B2B / fintech <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Montserrat:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: geometric-sans
  pickedFor: trust-fintech
-->

## T3 — Playfair Display & Nunito

**Display.** `Playfair Display` (modern-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Nunito` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.414` — editorial ratio — the high-contrast display sets a magazine rhythm. <!-- inferred -->

**Fits.** editorial / publication, luxury fashion / fragrance, cinema / film; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, sports / athletic, healthcare / clinical, vibrant consumer / playful, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Nunito:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: modern-serif
  bodyGenre: humanist-sans
  pickedFor: editorial, luxury-fashion, cinematic
-->

## T4 — Fraunces & Epilogue

**Display.** `Fraunces` (modern-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Epilogue` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.414` — editorial ratio — the high-contrast display sets a magazine rhythm. <!-- inferred -->

**Fits.** editorial / publication; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, sports / athletic <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=Epilogue:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: modern-serif
  bodyGenre: humanist-sans
  pickedFor: editorial
-->

## T5 — Archivo Black & Archivo

**Display.** `Archivo Black` (condensed-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Archivo` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** brutalist statement, sports / athletic; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits, quiet craft / atelier, architecture firm <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Black:wght@500;700&family=Archivo:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist, athletic
-->

## T6 — Archivo Narrow & General Sans

**Display.** `Archivo Narrow` (condensed-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `General Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** brutalist statement; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits <!-- inferred -->

**Source / CDN.** Google Fonts.
  > **Note:** `General Sans` is hosted on Fontshare, not Google Fonts. Substitute the appropriate Fontshare CSS import for that family.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist
-->

## T7 — Unbounded & Albert Sans

**Display.** `Unbounded` (display-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Albert Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — display-led ratio — heading earns the room. <!-- inferred -->

**Fits.** brutalist statement, vibrant consumer / playful, indie game / playful tech; also fits risograph, pop-art, sleeve-art anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits, trust-led B2B / fintech, architecture firm, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Albert+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: display-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist, vibrant-playful, indie-game
-->

## T8 — Staatliches & DM Sans

**Display.** `Staatliches` (condensed-sans). single available weight (400) — works because Staatliches is decorative-by-nature; pair with body-side weight contrast.

**Body.** `DM Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** brutalist statement, sports / athletic; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits, quiet craft / atelier, architecture firm <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Staatliches:wght@400&family=DM+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist, athletic
-->

## T9 — Unbounded & Geist

**Display.** `Unbounded` (display-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — display-led ratio — heading earns the room. <!-- inferred -->

**Fits.** brutalist statement, indie game / playful tech; also fits risograph, pop-art, sleeve-art anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits, trust-led B2B / fintech, architecture firm <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unbounded:wght@500;700&family=Geist:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: display-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist, indie-game
-->

## T10 — Archivo Narrow & Archivo

**Display.** `Archivo Narrow` (condensed-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Archivo` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** brutalist statement; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication, wine / spirits <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@500;700&family=Archivo:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: geometric-sans
  pickedFor: brutalist
-->

## T11 — Inknut Antiqua & Work Sans

**Display.** `Inknut Antiqua` (old-style-serif). single available weight (400) — works because Inknut Antiqua is decorative-by-nature; pair with body-side weight contrast.

**Body.** `Work Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.333` — classic editorial ratio — balances heading warmth with steady body cadence. <!-- inferred -->

**Fits.** quiet craft / atelier; also fits atelier, foraged-palette, sense-of-history anchor families <!-- inferred from playground intent selection -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400&family=Work+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: old-style-serif
  bodyGenre: humanist-sans
  pickedFor: quiet-craft
-->

## T12 — Noto Serif & Noto Sans

**Display.** `Noto Serif` (transitional-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Noto Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** quiet craft / atelier <!-- inferred from playground intent selection -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@500;700&family=Noto+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: transitional-serif
  bodyGenre: humanist-sans
  pickedFor: quiet-craft
-->

## T13 — Roboto Serif & Roboto

**Display.** `Roboto Serif` (transitional-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Roboto` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** quiet craft / atelier <!-- inferred from playground intent selection -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Serif:wght@500;700&family=Roboto:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: transitional-serif
  bodyGenre: humanist-sans
  pickedFor: quiet-craft
-->

## T14 — Rethink Sans & Geist

**Display.** `Rethink Sans` (grotesque-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** vibrant consumer / playful <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@500;700&family=Geist:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: grotesque-sans
  bodyGenre: geometric-sans
  pickedFor: vibrant-playful
-->

## T15 — Zalando Sans Expanded & Zalando Sans

**Display.** `Zalando Sans Expanded` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Zalando Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** healthcare / clinical <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film, indie game / playful tech <!-- inferred -->

**Source / CDN.** Google Fonts.
  > **Note:** `Zalando Sans Expanded` is hosted on Fontshare, not Google Fonts. Substitute the appropriate Fontshare CSS import for that family.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: humanist-sans
  pickedFor: clinical
-->

## T16 — Open Sans & Source Sans Pro

**Display.** `Open Sans` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Source Sans Pro` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** healthcare / clinical <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film, indie game / playful tech <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=Source+Sans+Pro:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: humanist-sans
  pickedFor: clinical
-->

## T17 — Roboto & Open Sans

**Display.** `Roboto` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Open Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** healthcare / clinical <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film, indie game / playful tech <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@500;700&family=Open+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: humanist-sans
  pickedFor: clinical
-->

## T18 — Open Sans & PT Sans

**Display.** `Open Sans` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `PT Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** healthcare / clinical <!-- inferred from playground intent selection -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film, indie game / playful tech <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=PT+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: humanist-sans
  pickedFor: clinical
-->

## T19 — Epilogue & Spectral

**Display.** `Epilogue` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Spectral` (transitional-serif). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** civic / institutional, documentary / journalism <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, vibrant consumer / playful, brutalist statement, sports / athletic <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500;700&family=Spectral:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: transitional-serif
  pickedFor: civic, documentary
-->

## T20 — DM Serif Text & DM Sans

**Display.** `DM Serif Text` (modern-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `DM Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.414` — editorial ratio — the high-contrast display sets a magazine rhythm. <!-- inferred -->

**Fits.** luxury fashion / fragrance; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, vibrant consumer / playful, indie game / playful tech, sports / athletic <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: modern-serif
  bodyGenre: geometric-sans
  pickedFor: luxury-fashion
-->

## T21 — DM Serif Display & DM Sans

**Display.** `DM Serif Display` (modern-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `DM Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.414` — editorial ratio — the high-contrast display sets a magazine rhythm. <!-- inferred -->

**Fits.** luxury fashion / fragrance; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, vibrant consumer / playful, indie game / playful tech, sports / athletic <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: modern-serif
  bodyGenre: geometric-sans
  pickedFor: luxury-fashion
-->

## T22 — Instrument Sans & Geist Mono

**Display.** `Instrument Sans` (grotesque-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist Mono` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** indie game / playful tech; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@500;700&family=Geist+Mono:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: grotesque-sans
  bodyGenre: monospace
  pickedFor: indie-game
-->

## T23 — Karla & Inconsolata

**Display.** `Karla` (grotesque-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Inconsolata` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** indie game / playful tech; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:wght@500;700&family=Inconsolata:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: grotesque-sans
  bodyGenre: monospace
  pickedFor: indie-game
-->

## T24 — Syne & Red Hat Text

**Display.** `Syne` (display-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Red Hat Text` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — display-led ratio — heading earns the room. <!-- inferred -->

**Fits.** indie game / playful tech; also fits risograph, pop-art, sleeve-art anchor families <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@500;700&family=Red+Hat+Text:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: display-sans
  bodyGenre: humanist-sans
  pickedFor: indie-game
-->

## T25 — Open Sans & Lora

**Display.** `Open Sans` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Lora` (transitional-serif). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** documentary / journalism, sustainable / eco <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, sports / athletic, vibrant consumer / playful, cinema / film, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=Lora:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: transitional-serif
  pickedFor: documentary, sustainable-eco
-->

## T26 — Nunito & Merriweather

**Display.** `Nunito` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Merriweather` (transitional-serif). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** documentary / journalism, sustainable / eco <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, sports / athletic, vibrant consumer / playful, cinema / film, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700&family=Merriweather:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: transitional-serif
  pickedFor: documentary, sustainable-eco
-->

## T27 — Archivo & IBM Plex Mono

**Display.** `Archivo` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `IBM Plex Mono` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** architecture firm, tech research / academic; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, indie game / playful tech, sports / athletic, hospitality, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: monospace
  pickedFor: architecture, tech-research
-->

## T28 — IBM Plex Mono & Inter

**Display.** `IBM Plex Mono` (monospace). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Inter` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** architecture firm; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, indie game / playful tech, sports / athletic, hospitality <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500;700&family=Inter:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: monospace
  bodyGenre: geometric-sans
  pickedFor: architecture
-->

## T29 — Inter & Inconsolata

**Display.** `Inter` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Inconsolata` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** architecture firm; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, indie game / playful tech, sports / athletic, hospitality <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@500;700&family=Inconsolata:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: monospace
  pickedFor: architecture
-->

## T30 — Barlow Condensed & Barlow

**Display.** `Barlow Condensed` (condensed-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Barlow` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** outdoor / adventure; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700&family=Barlow:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: humanist-sans
  pickedFor: outdoor-adventure
-->

## T31 — Fira Sans Condensed & Fira Sans

**Display.** `Fira Sans Condensed` (condensed-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Fira Sans` (humanist-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** outdoor / adventure; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@500;700&family=Fira+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: humanist-sans
  pickedFor: outdoor-adventure
-->

## T32 — News Cycle & Newsreader

**Display.** `News Cycle` (condensed-sans). single available weight (400) — works because News Cycle is decorative-by-nature; pair with body-side weight contrast.

**Body.** `Newsreader` (transitional-serif). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — athletic ratio — the condensed display wants to dominate. <!-- inferred -->

**Fits.** outdoor / adventure; also fits athletic, outdoor, fieldwork anchor families <!-- inferred from playground intent selection -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=News+Cycle:wght@400&family=Newsreader:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: condensed-sans
  bodyGenre: transitional-serif
  pickedFor: outdoor-adventure
-->

## T33 — Open Sans & Merriweather

**Display.** `Open Sans` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Merriweather` (transitional-serif). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — utilitarian ratio — pair stays calm and readable, no register shift between heading and body. <!-- inferred -->

**Fits.** sustainable / eco <!-- inferred from playground intent selection -->

**Avoid for.** indie game / playful tech, cinema / film, sports / athletic, brutalist statement <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@500;700&family=Merriweather:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: transitional-serif
  pickedFor: sustainable-eco
-->

## T34 — Manrope & Geist Mono

**Display.** `Manrope` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist Mono` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** tech research / academic; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, brutalist statement, indie game / playful tech, hospitality <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&family=Geist+Mono:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: monospace
  pickedFor: tech-research
-->

## T35 — DM Sans & DM Mono

**Display.** `DM Sans` (geometric-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `DM Mono` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** tech research / academic; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, brutalist statement, indie game / playful tech, hospitality <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@500;700&family=DM+Mono:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: geometric-sans
  bodyGenre: monospace
  pickedFor: tech-research
-->

## T36 — Work Sans & JetBrains Mono

**Display.** `Work Sans` (humanist-sans). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `JetBrains Mono` (monospace). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.25` — technical ratio — mono character stays disciplined; no display drama. <!-- inferred -->

**Fits.** tech research / academic; also fits Swiss-grid, system-led, technical-writing anchor families <!-- inferred from playground intent selection -->

**Avoid for.** vibrant consumer / playful, brutalist statement, indie game / playful tech, hospitality <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@500;700&family=JetBrains+Mono:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: humanist-sans
  bodyGenre: monospace
  pickedFor: tech-research
-->

## T37 — Young Serif & Geist

**Display.** `Young Serif` (display-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.5` — display-led ratio — heading earns the room. <!-- inferred -->

**Fits.** music / record label, cinema / film; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, tech research / academic, healthcare / clinical, editorial / publication, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Young+Serif:wght@500;700&family=Geist:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: display-serif
  bodyGenre: geometric-sans
  pickedFor: music-label, cinematic
-->

## T38 — Arvo & Geist

**Display.** `Arvo` (slab-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `Geist` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.333` — slab ratio — display has weight without theatrics. <!-- inferred -->

**Fits.** music / record label; also fits record-sleeve, mid-century print anchor families <!-- inferred from playground intent selection -->

**Avoid for.** trust-led B2B / fintech, architecture firm, tech research / academic <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Arvo:wght@500;700&family=Geist:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: slab-serif
  bodyGenre: geometric-sans
  pickedFor: music-label
-->

## T39 — Fraunces & DM Sans

**Display.** `Fraunces` (modern-serif). 500 for sub-display and eyebrow, 700 for hero.

**Body.** `DM Sans` (geometric-sans). 400 for body, 500 for inline emphasis, 700 for inline strong.

**Scale.** `1.414` — editorial ratio — the high-contrast display sets a magazine rhythm. <!-- inferred -->

**Fits.** cinema / film; also fits editorial-revival, festival-poster anchor families <!-- inferred from playground intent selection -->

**Avoid for.** healthcare / clinical, editorial / publication, quiet craft / atelier <!-- inferred -->

**Source / CDN.** Google Fonts.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;700&family=DM+Sans:wght@400;500;700&display=swap">
```

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: modern-serif
  bodyGenre: geometric-sans
  pickedFor: cinematic
-->

