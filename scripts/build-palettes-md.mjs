// Build skills/direct/reference/curated-pools/palettes.md from the user's
// playground picks. Each unique palette becomes a P<n> entry following the
// schema declared at the top of the file. OKLCH values are computed from
// hex; everything else is inferred from palette characteristics and the
// nebula intent(s) the palette was picked for.

import fs from 'fs/promises';

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

// "Avoid for" mapping: which intents the palette is least likely to serve,
// derived as the broad complement of the "Fits" intents.
const AVOID_BY_INTENT = {
  'trust-fintech': ['brutalist statement', 'indie game / playful tech', 'vibrant consumer / playful'],
  'editorial': ['indie game / playful tech', 'sports / athletic', 'vibrant consumer / playful'],
  'brutalist': ['healthcare / clinical', 'boutique hotel', 'editorial / publication'],
  'quiet-craft': ['sports / athletic', 'indie game / playful tech', 'vibrant consumer / playful'],
  'vibrant-playful': ['trust-led B2B / fintech', 'architecture firm', 'wine / spirits', 'quiet craft / atelier'],
  'clinical': ['brutalist statement', 'wine / spirits', 'cinema / film'],
  'civic': ['indie game / playful tech', 'vibrant consumer / playful'],
  'luxury-fashion': ['healthcare / clinical', 'vibrant consumer / playful', 'indie game / playful tech'],
  'indie-game': ['trust-led B2B / fintech', 'architecture firm', 'wine / spirits', 'editorial / publication'],
  'documentary': ['indie game / playful tech', 'sports / athletic', 'vibrant consumer / playful'],
  'architecture': ['vibrant consumer / playful', 'indie game / playful tech', 'sports / athletic'],
  'hospitality': ['trust-led B2B / fintech', 'tech research / academic', 'healthcare / clinical'],
  'outdoor-adventure': ['luxury fashion / fragrance', 'wine / spirits', 'cinema / film'],
  'sustainable-eco': ['indie game / playful tech', 'cinema / film', 'sports / athletic'],
  'tech-research': ['vibrant consumer / playful', 'brutalist statement', 'indie game / playful tech'],
  'music-label': ['trust-led B2B / fintech', 'architecture firm', 'tech research / academic'],
  'cinematic': ['healthcare / clinical', 'editorial / publication'],
  'wine-spirits': ['healthcare / clinical', 'tech research / academic', 'indie game / playful tech'],
  'athletic': ['quiet craft / atelier', 'editorial / publication', 'architecture firm', 'wine / spirits'],
  'boutique-hotel': ['indie game / playful tech', 'sports / athletic', 'brutalist statement'],
};

// ---------- hex → OKLCH ----------

function hexToOklch(hex) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const toLin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lr = toLin(r), lg = toLin(g), lb = toLin(b);

  const lcone = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const mcone = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const scone = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(lcone);
  const m_ = Math.cbrt(mcone);
  const s_ = Math.cbrt(scone);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  const C = Math.sqrt(a * a + bb * bb);
  let h = Math.atan2(bb, a) * 180 / Math.PI;
  if (h < 0) h += 360;

  return { L, C, h };
}

function formatOklch({ L, C, h }) {
  const Lpct = (L * 100).toFixed(1);
  const Cstr = C.toFixed(3);
  const hstr = C < 0.005 ? 'none' : h.toFixed(1);
  return `oklch(${Lpct}% ${Cstr} ${hstr})`;
}

// ---------- analysis ----------

function relLuminance(hex) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const f = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(hexA, hexB) {
  const la = relLuminance(hexA), lb = relLuminance(hexB);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function hueBucket(h) {
  if (h < 25 || h >= 340) return 'red';
  if (h < 50) return 'orange';
  if (h < 70) return 'yellow';
  if (h < 165) return 'green';
  if (h < 200) return 'teal';
  if (h < 250) return 'blue';
  if (h < 290) return 'violet';
  return 'magenta';
}

function neutralTemperature(palette) {
  let warm = 0, cool = 0, neutral = 0;
  for (const h of palette.hex) {
    const o = hexToOklch(h);
    if (o.C < 0.025) { neutral++; continue; }
    const hu = o.h;
    if (hu < 60 || hu > 300) warm++;
    else if (hu >= 180 && hu < 280) cool++;
  }
  if (neutral >= 3) return 'true-gray-leaning — three or more colors sit close to chromatic zero';
  if (warm >= 3) return 'warm-leaning — three or more colors fall in the red/orange/yellow arc';
  if (cool >= 3) return 'cool-leaning — three or more colors fall in the blue/teal arc';
  if (warm > cool) return 'mildly warm — warm hues outnumber cool';
  if (cool > warm) return 'mildly cool — cool hues outnumber warm';
  return 'balanced — warm and cool hues in rough parity';
}

function contrastStrategy(roles) {
  const inkBg = contrast(roles.ink, roles.bg);
  const inkS1 = contrast(roles.ink, roles.surface1);
  let strategy;
  if (inkBg >= 12) strategy = `body ink↔bg sits at ${inkBg.toFixed(1)}:1 — passes WCAG AAA easily; small text reads cleanly`;
  else if (inkBg >= 7) strategy = `body ink↔bg sits at ${inkBg.toFixed(1)}:1 — passes AA at all sizes and AAA at large`;
  else if (inkBg >= 4.5) strategy = `body ink↔bg sits at ${inkBg.toFixed(1)}:1 — passes AA at body sizes; verify on small text`;
  else strategy = `body ink↔bg sits at ${inkBg.toFixed(1)}:1 — below AA; reserve ink for headings/large display, not body`;
  strategy += `; ink↔surface1 sits at ${inkS1.toFixed(1)}:1 (use surface1 for cards or quiet bands where contrast can soften)`;
  return strategy;
}

function accentAllowance(roles) {
  const o = hexToOklch(roles.accent);
  const sat = o.C;
  const isWarm = (o.h < 60 || o.h > 320);
  if (sat > 0.18) return 'reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue';
  if (sat > 0.10) return 'fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain';
  return 'mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions';
}

function fitsLine(intents, tags) {
  const intentList = [...new Set(intents)].map(id => NEBULA_INTENTS[id]?.short || id);
  // Add anchor-family adjacencies inferred from tags.
  const extras = new Set();
  if (tags.includes('vintage') || tags.includes('retro')) extras.add('record-sleeve and editorial-revival anchor families');
  if (tags.includes('stone') || tags.includes('monochrome')) extras.add('Swiss-grid, system-led anchor families');
  if (tags.includes('natural') || tags.includes('earth')) extras.add('material-led, foraged-palette anchor families');
  if (tags.includes('neon') || tags.includes('vibrant')) extras.add('pop-art and risograph anchor families');
  if (tags.includes('autumn') || tags.includes('sunset')) extras.add('cinematic golden-hour anchor families');
  const extraStr = extras.size ? `; also fits ${[...extras].join(', ')}` : '';
  return intentList.join(', ') + extraStr;
}

function avoidLine(intents) {
  const seen = new Set();
  for (const id of intents) {
    for (const v of (AVOID_BY_INTENT[id] || [])) seen.add(v);
  }
  // Remove anything that also appears in fits (defensive).
  const fitsSet = new Set(intents.map(id => NEBULA_INTENTS[id]?.short));
  const filtered = [...seen].filter(v => !fitsSet.has(v));
  return filtered.length ? filtered.join(', ') : 'no strong anti-fits surfaced from the picked-intent set';
}

// ---------- build markdown ----------

const picksJson = JSON.parse(await fs.readFile('scripts/picks.json', 'utf8'));
const catalog = JSON.parse(await fs.readFile('scripts/catalog.json', 'utf8'));

// Build a hex-key → palette lookup from catalog (it has every picked palette).
const lookup = new Map();
for (const intent of catalog.intents) {
  for (const p of intent.palettes) {
    const key = p.hex.join('-');
    if (!lookup.has(key)) lookup.set(key, p);
  }
}

// Group picks by hex sequence; accumulate intents per palette.
const byHex = new Map();
for (const pick of picksJson.picks) {
  const key = pick.hex.join('-');
  if (!byHex.has(key)) {
    const palette = lookup.get(key);
    if (!palette) {
      console.warn(`!! palette not found in catalog: ${key}`);
      continue;
    }
    byHex.set(key, { ...palette, intents: [] });
  }
  byHex.get(key).intents.push(pick.intent);
}

const unique = [...byHex.values()];
console.log(`picks: ${picksJson.picks.length}, unique palettes: ${unique.length}`);

// ---------- emit ----------

const header = `# Curated pool — palettes

> **Status: round 1 authored 2026-05-14.**
>
> This pool lists vetted palettes the agent samples from in \`nebula:direct\`
> Phase 2 (axis A3). Each palette is sourced from a real-world reference (see
> Source field) — by design, *not* generated from a hue wheel. Initial round
> drawn from Coolors community-curated palettes, surfaced through a per-intent
> playground; sources to be replaced by Paolo with defensible real-world
> references over time.

The agent reads this file when committing on the color palette structure
axis. **Sample from this list; do not generate palettes from scratch.**

## Schema for each entry

\`\`\`
## P<n> — <name>

**Source.** The real-world reference the palette is drawn from. Specific
(*"the cover of Apartamento #28"*, not *"editorial magazines"*).
**Colors.** OKLCH values for every color in the palette, with a role
label (\`ink\`, \`paper\`, \`accent-a\`, \`accent-b\`, \`surface-mute\`, etc.).
Role names are brand-native; not \`primary\`/\`secondary\` — see
divergence-toolkit § 4.
**Neutral temperature.** Warm / cool / true-gray, with reasoning.
**Contrast strategy.** Where contrast is highest, where it is gentlest,
which roles must hit AA, which can sit below for decorative use.
**Accent allowance.** Where each accent is allowed to fire (CTAs only,
illustrations only, full-bleed bands only, never on small text, etc.).
**Fits.** Anchor families / brief signals this palette fits.
**Avoid for.** Briefs / anchors this palette should not be used for.
\`\`\`

## Entries

`;

let body = '';
for (let i = 0; i < unique.length; i++) {
  const p = unique[i];
  const num = i + 1;

  // OKLCH per color, plus role names.
  const roleOrder = ['bg', 'ink', 'accent', 'surface1', 'surface2'];
  const roleHexMap = p.roles;
  const colorLines = roleOrder.map(role => {
    const hex = roleHexMap[role];
    const ok = formatOklch(hexToOklch(hex));
    return `  - \`${role.padEnd(8)}\` · \`${ok}\` · \`#${hex}\``;
  }).join('\n');

  const neutral = neutralTemperature(p);
  const contrastStr = contrastStrategy(p.roles);
  const accentStr = accentAllowance(p.roles);
  const fits = fitsLine(p.intents, p.tags);
  const avoid = avoidLine(p.intents);

  body += `## P${num} — ${p.name}

**Source.** TODO (Coolors-curated; original Coolors name: *"${p.name}"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
${colorLines}

**Neutral temperature.** ${neutral} <!-- inferred -->

**Contrast strategy.** ${contrastStr} <!-- inferred -->

**Accent allowance.** ${accentStr} <!-- inferred -->

**Fits.** ${fits} <!-- inferred from playground intent selection + tags -->

**Avoid for.** ${avoid} <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: ${p.tags.join(', ')}
  coolorsLikes: ${p.likes}
  pickedFor: ${[...new Set(p.intents)].join(', ')}
-->

`;
}

const outPath = 'skills/direct/reference/curated-pools/palettes.md';
await fs.writeFile(outPath, header + body);
console.log(`wrote ${outPath}`);
console.log(`entries: ${unique.length}`);
