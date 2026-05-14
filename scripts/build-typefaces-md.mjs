// Build skills/direct/reference/curated-pools/typefaces.md from font pairing
// picks. Each unique pairing becomes a T<n> entry following the schema at the
// top of the file.

import fs from 'fs/promises';

// Re-use the genre map from classify-fonts.mjs. Kept minimal — only what's
// needed to derive pair character + Google Fonts link strategy.
const GENRE = {
  'Inter': 'geometric-sans', 'Manrope': 'geometric-sans', 'Geist': 'geometric-sans',
  'Plus Jakarta Sans': 'geometric-sans', 'DM Sans': 'geometric-sans',
  'Hanken Grotesk': 'geometric-sans', 'Albert Sans': 'geometric-sans',
  'Sora': 'geometric-sans', 'Mulish': 'geometric-sans', 'Figtree': 'geometric-sans',
  'Archivo': 'geometric-sans', 'Be Vietnam Pro': 'geometric-sans',
  'Poppins': 'geometric-sans', 'Montserrat': 'geometric-sans',
  'Reddit Sans': 'geometric-sans', 'Satoshi': 'geometric-sans',
  'Supreme': 'geometric-sans', 'General Sans': 'geometric-sans',
  'Ranade': 'geometric-sans', 'Google Sans': 'geometric-sans',
  'Space Grotesk': 'grotesque-sans', 'Bricolage Grotesque': 'grotesque-sans',
  'Public Sans': 'grotesque-sans', 'Funnel Display': 'grotesque-sans',
  'Instrument Sans': 'grotesque-sans', 'Rethink Sans': 'grotesque-sans',
  'Epunda Sans': 'grotesque-sans', 'TASA Orbiter': 'grotesque-sans',
  'Urbanist': 'grotesque-sans', 'Karla': 'grotesque-sans',
  'Libre Franklin': 'grotesque-sans', 'Chivo': 'grotesque-sans',
  'Work Sans': 'humanist-sans', 'Open Sans': 'humanist-sans', 'Lato': 'humanist-sans',
  'Source Sans Pro': 'humanist-sans', 'Fira Sans': 'humanist-sans',
  'Nunito': 'humanist-sans', 'Nunito Sans': 'humanist-sans',
  'IBM Plex Sans': 'humanist-sans', 'Roboto': 'humanist-sans',
  'PT Sans': 'humanist-sans', 'Ubuntu': 'humanist-sans',
  'Alegreya Sans': 'humanist-sans', 'Merriweather Sans': 'humanist-sans',
  'Noto Sans': 'humanist-sans', 'Red Hat Text': 'humanist-sans',
  'Barlow': 'humanist-sans', 'Barlow Semi Condensed': 'humanist-sans',
  'Prompt': 'humanist-sans', 'Raleway': 'humanist-sans',
  'Epilogue': 'humanist-sans', 'Maitree': 'humanist-sans',
  'Rosario': 'humanist-sans',
  'Zalando Sans': 'humanist-sans', 'Zalando Sans Expanded': 'humanist-sans',
  'TikTok Sans': 'humanist-sans',
  'Zen Kaku Gothic Antique': 'humanist-sans', 'Zen Kaku Gothic New': 'humanist-sans',
  'Zain': 'humanist-sans', 'SUSE': 'humanist-sans', 'Varela': 'humanist-sans',
  'Ysabeau': 'humanist-sans', 'Ysabeau Infant': 'humanist-sans',
  'Rubik': 'humanist-sans',
  'Varela Round': 'rounded-sans',
  'Bebas Neue': 'condensed-sans', 'Oswald': 'condensed-sans',
  'Anton': 'condensed-sans', 'Archivo Narrow': 'condensed-sans',
  'Archivo Black': 'condensed-sans', 'League Spartan': 'condensed-sans',
  'Staatliches': 'condensed-sans', 'Special Gothic': 'condensed-sans',
  'Special Gothic Condensed One': 'condensed-sans',
  'Special Gothic Expanded One': 'condensed-sans',
  'IBM Plex Sans Condensed': 'condensed-sans', 'Fira Sans Condensed': 'condensed-sans',
  'Barlow Condensed': 'condensed-sans', 'Alumni Sans': 'condensed-sans',
  'BenchNine': 'condensed-sans', 'Voltaire': 'condensed-sans',
  'News Cycle': 'condensed-sans',
  'Unbounded': 'display-sans', 'Syne': 'display-sans',
  'EB Garamond': 'old-style-serif', 'Cormorant Garamond': 'old-style-serif',
  'Crimson Pro': 'old-style-serif', 'Crimson Text': 'old-style-serif',
  'Libre Caslon Text': 'old-style-serif', 'Libre Caslon Display': 'old-style-serif',
  'Inknut Antiqua': 'old-style-serif', 'Gentium Book Plus': 'old-style-serif',
  'Lora': 'transitional-serif', 'Libre Baskerville': 'transitional-serif',
  'PT Serif': 'transitional-serif', 'Source Serif 4': 'transitional-serif',
  'Source Serif Pro': 'transitional-serif', 'Newsreader': 'transitional-serif',
  'Merriweather': 'transitional-serif', 'Petrona': 'transitional-serif',
  'Faustina': 'transitional-serif', 'IBM Plex Serif': 'transitional-serif',
  'Spectral': 'transitional-serif', 'Noto Serif': 'transitional-serif',
  'Domine': 'transitional-serif', 'Ovo': 'transitional-serif',
  'Lustria': 'transitional-serif', 'Besley': 'transitional-serif',
  'Roboto Serif': 'transitional-serif', 'Alegreya': 'transitional-serif',
  'Ysabeau SC': 'transitional-serif', 'General Serif': 'transitional-serif',
  'Gambetta': 'transitional-serif', 'Recia': 'transitional-serif',
  'Playfair Display': 'modern-serif', 'Playfair': 'modern-serif',
  'Playfair Display SC': 'modern-serif',
  'DM Serif Display': 'modern-serif', 'DM Serif Text': 'modern-serif',
  'Italiana': 'modern-serif', 'Marcellus': 'modern-serif',
  'Fraunces': 'modern-serif', 'Instrument Serif': 'modern-serif',
  'Gloock': 'modern-serif', 'Noto Serif Display': 'modern-serif',
  'Roboto Slab': 'slab-serif', 'Arvo': 'slab-serif', 'Bitter': 'slab-serif',
  'Aleo': 'slab-serif', 'Epunda Slab': 'slab-serif',
  'Abril Fatface': 'display-serif', 'Young Serif': 'display-serif',
  'BioRhyme': 'display-serif',
  'Lobster': 'decorative-display', 'Alfa Slab One': 'decorative-display',
  'Righteous': 'decorative-display', 'Metal': 'decorative-display',
  'JetBrains Mono': 'monospace', 'Fira Code': 'monospace',
  'IBM Plex Mono': 'monospace', 'Source Code Pro': 'monospace',
  'Geist Mono': 'monospace', 'Space Mono': 'monospace',
  'DM Mono': 'monospace', 'Roboto Mono': 'monospace',
  'Inconsolata': 'monospace', 'VT323': 'monospace', 'SUSE Mono': 'monospace',
};
function genre(name) { return GENRE[name] || 'unclassified'; }

// Fonts on Google Fonts that only have one weight (400).
const SINGLE_WEIGHT_GF = new Set([
  'Abril Fatface', 'Alfa Slab One', 'Bebas Neue', 'Italiana', 'Marcellus',
  'Righteous', 'Staatliches', 'Anton', 'Lobster', 'News Cycle', 'VT323',
  'Voltaire', 'Inknut Antiqua' /* limited weights; safe to keep wider */,
]);
// Some Google Fonts I'm not sure exist; treat as Google Fonts if user picked them.
// "General Sans", "Google Sans" — these are Fontshare, not Google Fonts. Note in entry.
const NOT_GOOGLE_FONTS = new Set([
  'General Sans', 'General Serif', 'Google Sans', 'Satoshi', 'Supreme',
  'Ranade', 'TASA Orbiter', 'Tanker', 'Clash Display', 'Plein', 'Metal',
  'Recia', 'Gambetta', 'Funnel Display', 'Zalando Sans', 'Zalando Sans Expanded',
  'TikTok Sans',
]);

function weightsFor(font, role) {
  if (SINGLE_WEIGHT_GF.has(font)) return ['400'];
  if (role === 'display') return ['500', '700'];
  return ['400', '500', '700'];
}

function googleFontsHref(displayFont, displayWeights, bodyFont, bodyWeights) {
  // Build CSS2 URL. If a font appears in both display and body, merge weights.
  const map = new Map();
  if (!NOT_GOOGLE_FONTS.has(displayFont)) map.set(displayFont, new Set(displayWeights));
  if (!NOT_GOOGLE_FONTS.has(bodyFont)) {
    const cur = map.get(bodyFont) || new Set();
    for (const w of bodyWeights) cur.add(w);
    map.set(bodyFont, cur);
  }
  const families = [...map.entries()].map(([name, ws]) => {
    const sorted = [...ws].map(Number).sort((a, b) => a - b);
    return `family=${name.replace(/ /g, '+')}:wght@${sorted.join(';')}`;
  });
  return `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
}

function scaleRatio(dg, bg, displayFont) {
  // Ratio + reasoning.
  if (dg === 'display-sans' || dg === 'decorative-display' || dg === 'display-serif') {
    return { ratio: 1.5, reason: 'display-led ratio — heading earns the room' };
  }
  if (dg === 'modern-serif') {
    return { ratio: 1.414, reason: 'editorial ratio — the high-contrast display sets a magazine rhythm' };
  }
  if (dg === 'old-style-serif') {
    return { ratio: 1.333, reason: 'classic editorial ratio — balances heading warmth with steady body cadence' };
  }
  if (dg === 'condensed-sans') {
    return { ratio: 1.5, reason: 'athletic ratio — the condensed display wants to dominate' };
  }
  if (dg === 'monospace' || bg === 'monospace') {
    return { ratio: 1.25, reason: 'technical ratio — mono character stays disciplined; no display drama' };
  }
  if (dg === 'slab-serif') {
    return { ratio: 1.333, reason: 'slab ratio — display has weight without theatrics' };
  }
  return { ratio: 1.25, reason: 'utilitarian ratio — pair stays calm and readable, no register shift between heading and body' };
}

// Nebula intent metadata.
const NEBULA_INTENTS = {
  'trust-fintech': { name: 'Trust-led B2B / fintech', short: 'trust-led B2B / fintech' },
  'editorial': { name: 'Editorial / publication', short: 'editorial / publication' },
  'brutalist': { name: 'Brutalist statement', short: 'brutalist statement' },
  'quiet-craft': { name: 'Quiet craft / atelier', short: 'quiet craft / atelier' },
  'vibrant-playful': { name: 'Vibrant consumer / playful', short: 'vibrant consumer / playful' },
  'clinical': { name: 'Healthcare / clinical', short: 'healthcare / clinical' },
  'civic': { name: 'Civic / institutional', short: 'civic / institutional' },
  'luxury-fashion': { name: 'Luxury fashion / fragrance', short: 'luxury fashion / fragrance' },
  'indie-game': { name: 'Indie game / playful tech', short: 'indie game / playful tech' },
  'documentary': { name: 'Documentary / journalism', short: 'documentary / journalism' },
  'architecture': { name: 'Architecture firm', short: 'architecture firm' },
  'hospitality': { name: 'Restaurant / hospitality', short: 'restaurant / hospitality' },
  'outdoor-adventure': { name: 'Outdoor / adventure', short: 'outdoor / adventure' },
  'sustainable-eco': { name: 'Sustainable / eco', short: 'sustainable / eco' },
  'tech-research': { name: 'Tech research / academic', short: 'tech research / academic' },
  'music-label': { name: 'Music / record label', short: 'music / record label' },
  'cinematic': { name: 'Cinema / film', short: 'cinema / film' },
  'wine-spirits': { name: 'Wine / spirits', short: 'wine / spirits' },
  'athletic': { name: 'Sports / athletic', short: 'sports / athletic' },
  'boutique-hotel': { name: 'Boutique hotel', short: 'boutique hotel' },
};

const AVOID_BY_INTENT = {
  'trust-fintech': ['brutalist statement', 'indie game / playful tech', 'vibrant consumer / playful'],
  'editorial': ['indie game / playful tech', 'sports / athletic'],
  'brutalist': ['healthcare / clinical', 'boutique hotel', 'editorial / publication', 'wine / spirits'],
  'quiet-craft': ['sports / athletic', 'indie game / playful tech', 'vibrant consumer / playful', 'brutalist statement'],
  'vibrant-playful': ['trust-led B2B / fintech', 'architecture firm', 'wine / spirits', 'quiet craft / atelier'],
  'clinical': ['brutalist statement', 'wine / spirits', 'cinema / film', 'indie game / playful tech'],
  'civic': ['indie game / playful tech', 'vibrant consumer / playful', 'brutalist statement'],
  'luxury-fashion': ['healthcare / clinical', 'vibrant consumer / playful', 'indie game / playful tech', 'sports / athletic'],
  'indie-game': ['trust-led B2B / fintech', 'architecture firm', 'wine / spirits', 'editorial / publication'],
  'documentary': ['indie game / playful tech', 'sports / athletic', 'vibrant consumer / playful'],
  'architecture': ['vibrant consumer / playful', 'indie game / playful tech', 'sports / athletic', 'hospitality'],
  'hospitality': ['trust-led B2B / fintech', 'tech research / academic', 'healthcare / clinical'],
  'outdoor-adventure': ['luxury fashion / fragrance', 'wine / spirits', 'cinema / film', 'quiet craft / atelier'],
  'sustainable-eco': ['indie game / playful tech', 'cinema / film', 'sports / athletic', 'brutalist statement'],
  'tech-research': ['vibrant consumer / playful', 'brutalist statement', 'indie game / playful tech', 'hospitality'],
  'music-label': ['trust-led B2B / fintech', 'architecture firm', 'tech research / academic'],
  'cinematic': ['healthcare / clinical', 'editorial / publication', 'quiet craft / atelier'],
  'wine-spirits': ['healthcare / clinical', 'tech research / academic', 'indie game / playful tech'],
  'athletic': ['quiet craft / atelier', 'editorial / publication', 'architecture firm', 'wine / spirits'],
  'boutique-hotel': ['indie game / playful tech', 'sports / athletic', 'brutalist statement'],
};

function anchorAdjacencies(dg, bg) {
  const out = new Set();
  if (dg === 'monospace' || bg === 'monospace') out.add('Swiss-grid, system-led, technical-writing anchor families');
  if (dg === 'modern-serif' || dg === 'display-serif') out.add('editorial-revival, festival-poster anchor families');
  if (dg === 'old-style-serif') out.add('atelier, foraged-palette, sense-of-history anchor families');
  if (dg === 'display-sans' || dg === 'decorative-display') out.add('risograph, pop-art, sleeve-art anchor families');
  if (dg === 'condensed-sans') out.add('athletic, outdoor, fieldwork anchor families');
  if (dg === 'slab-serif') out.add('record-sleeve, mid-century print anchor families');
  return [...out];
}

function buildEntry(num, pair) {
  const { display, body, intents, displayGenre, bodyGenre } = pair;
  const displayWeights = weightsFor(display, 'display');
  const bodyWeights = weightsFor(body, 'body');
  const scale = scaleRatio(displayGenre, bodyGenre, display);
  const href = googleFontsHref(display, displayWeights, body, bodyWeights);

  const fitsList = [...new Set(intents)].map(id => NEBULA_INTENTS[id]?.short || id);
  const anchors = anchorAdjacencies(displayGenre, bodyGenre);
  const fitsLine = [fitsList.join(', '), anchors.length ? `; also fits ${anchors.join(', ')}` : ''].join('');

  const avoidSet = new Set();
  for (const id of intents) for (const v of (AVOID_BY_INTENT[id] || [])) avoidSet.add(v);
  for (const v of fitsList) avoidSet.delete(v);
  const avoidLine = avoidSet.size ? [...avoidSet].join(', ') : 'no strong anti-fits surfaced from the picked-intent set';

  // Special-case copy
  const notGoogle = NOT_GOOGLE_FONTS.has(display) || NOT_GOOGLE_FONTS.has(body);
  const cdnNote = notGoogle
    ? `\n  > **Note:** \`${NOT_GOOGLE_FONTS.has(display) ? display : body}\` is hosted on Fontshare, not Google Fonts. Substitute the appropriate Fontshare CSS import for that family.`
    : '';

  const dispWeightStrat = SINGLE_WEIGHT_GF.has(display)
    ? `single available weight (400) — works because ${display} is decorative-by-nature; pair with body-side weight contrast`
    : displayWeights.length === 2 && displayWeights[0] === '500' && displayWeights[1] === '700'
    ? `500 for sub-display and eyebrow, 700 for hero`
    : `weights ${displayWeights.join(', ')}`;
  const bodyWeightStrat = SINGLE_WEIGHT_GF.has(body)
    ? `single available weight (400) — restrict ${body} to surfaces where weight contrast isn't load-bearing`
    : `400 for body, 500 for inline emphasis, 700 for inline strong`;

  return `## T${num} — ${display} & ${body}

**Display.** \`${display}\` (${displayGenre}). ${dispWeightStrat}.

**Body.** \`${body}\` (${bodyGenre}). ${bodyWeightStrat}.

**Scale.** \`${scale.ratio}\` — ${scale.reason}. <!-- inferred -->

**Fits.** ${fitsLine} <!-- inferred from playground intent selection -->

**Avoid for.** ${avoidLine} <!-- inferred -->

**Source / CDN.** Google Fonts.${cdnNote}
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${href}">
\`\`\`

<!-- _provenance:
  writtenBy: scripts/build-typefaces-md.mjs
  source: fontpair.co (curated pairing gallery)
  displayGenre: ${displayGenre}
  bodyGenre: ${bodyGenre}
  pickedFor: ${[...new Set(intents)].join(', ')}
-->

`;
}

// ---------- run ----------

const picksJson = JSON.parse(await fs.readFile('scripts/picks-fonts.json', 'utf8'));

// Group picks by display|body, accumulating intents.
const byKey = new Map();
for (const pick of picksJson.picks) {
  const key = `${pick.display}|${pick.body}`;
  if (!byKey.has(key)) {
    byKey.set(key, {
      display: pick.display,
      body: pick.body,
      intents: [],
      displayGenre: genre(pick.display),
      bodyGenre: genre(pick.body),
    });
  }
  byKey.get(key).intents.push(pick.intent);
}
const unique = [...byKey.values()];
console.log(`picks: ${picksJson.picks.length}, unique pairings: ${unique.length}`);

const header = `# Curated pool — typefaces

> **Status: round 1 authored 2026-05-14.**
>
> This pool lists vetted Google Font pairings the agent samples from in
> \`nebula:direct\` Phase 2 (axis A1). Round 1 sourced from
> [Fontpair.co](https://www.fontpair.co)'s per-font pairing pages for ~75
> popular Google Fonts; pairings curated by Fontpair's editorial team, then
> surfaced through a per-intent playground and filtered by Paolo.

The agent reads this file when committing on the typography axis. **Sample
from this list; do not invent.** If a needed pairing is missing from the
pool, stop and surface to the user — the pool grows by user authorship.

## Schema for each entry

\`\`\`
## T<n> — <name>

**Display.** Named typeface, weight strategy, intended use.
**Body.** Named typeface, weight strategy, intended use.
**Scale.** Type ratio (e.g., 1.333) and reasoning.
**Fits.** Anchor families / brief signals this pairing fits.
**Avoid for.** Briefs / anchors this pairing should not be used for.
**Source / CDN.** Where the typefaces come from (Google Fonts, Adobe Fonts,
self-hosted, etc.). Include CSS @import or <link> snippet.
\`\`\`

## Entries

`;

let body = '';
for (let i = 0; i < unique.length; i++) {
  body += buildEntry(i + 1, unique[i]);
}

const outPath = 'skills/direct/reference/curated-pools/typefaces.md';
await fs.writeFile(outPath, header + body);
console.log(`wrote ${outPath}`);
console.log(`entries: ${unique.length}`);
