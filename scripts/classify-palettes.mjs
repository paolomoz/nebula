import fs from 'fs/promises';

// ---------- color math ----------

function hexToRgb(hex) {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return [h, s, l];
}
function relLuminance([r, g, b]) {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrastRatio(rgbA, rgbB) {
  const lA = relLuminance(rgbA), lB = relLuminance(rgbB);
  return (Math.max(lA, lB) + 0.05) / (Math.min(lA, lB) + 0.05);
}
function hueIsWarm(h) {
  // warm: 0–60 (red-orange-yellow) and 300–360 (red-magenta). Cool: 60–300.
  return (h >= 0 && h < 60) || (h > 300 && h <= 360);
}
function hueIsCool(h) {
  return h >= 180 && h < 280;
}
function hueIsEarth(h) {
  return (h >= 15 && h < 50);
}
function hueIsGreen(h) {
  return h >= 70 && h < 170;
}

// ---------- per-palette analysis ----------

function analyze(palette) {
  const rgb = palette.hex.map(hexToRgb);
  const hsl = rgb.map(rgbToHsl);
  const lums = rgb.map(relLuminance);

  // Sort indices by lightness.
  const order = [0, 1, 2, 3, 4].sort((a, b) => hsl[b][2] - hsl[a][2]);
  const lightestI = order[0];
  const darkestI = order[4];

  // Among the three mid colors, pick the most saturated as accent.
  const midIdxs = order.slice(1, 4);
  let accentI = midIdxs[0];
  for (const i of midIdxs) if (hsl[i][1] > hsl[accentI][1]) accentI = i;
  const surface1I = midIdxs.find(i => i !== accentI);
  const surface2I = midIdxs.find(i => i !== accentI && i !== surface1I);

  const roles = {
    bg: palette.hex[lightestI],
    ink: palette.hex[darkestI],
    accent: palette.hex[accentI],
    surface1: palette.hex[surface1I],
    surface2: palette.hex[surface2I],
  };

  const avgSat = hsl.reduce((a, x) => a + x[1], 0) / 5;
  const avgLight = hsl.reduce((a, x) => a + x[2], 0) / 5;
  const maxSat = Math.max(...hsl.map(x => x[1]));
  const minSat = Math.min(...hsl.map(x => x[1]));
  const inkBgContrast = contrastRatio(rgb[darkestI], rgb[lightestI]);
  const accentSat = hsl[accentI][1];
  const accentHue = hsl[accentI][0];

  const hues = hsl.map(x => x[0]);
  const warmCount = hues.filter(hueIsWarm).length;
  const coolCount = hues.filter(hueIsCool).length;
  const earthCount = hues.filter(hueIsEarth).length;
  const greenCount = hues.filter(hueIsGreen).length;

  // Hue spread (max gap between sorted hues, signal for monochrome vs multi).
  const sortedHues = [...hues].sort((a, b) => a - b);
  let maxGap = 0;
  for (let i = 1; i < sortedHues.length; i++) {
    maxGap = Math.max(maxGap, sortedHues[i] - sortedHues[i - 1]);
  }
  // Wrap-around gap.
  maxGap = Math.max(maxGap, sortedHues[0] + 360 - sortedHues[sortedHues.length - 1]);
  const hueRange = 360 - maxGap; // higher = more spread, lower = monochrome-y

  return {
    roles,
    stats: {
      avgSat,
      avgLight,
      maxSat,
      minSat,
      inkBgContrast,
      accentSat,
      accentHue,
      warmCount,
      coolCount,
      earthCount,
      greenCount,
      hueRange,
    },
  };
}

// ---------- intent definitions ----------

const INTENTS = [
  {
    id: 'trust-fintech',
    name: 'Trust-led B2B / fintech',
    blurb: 'Cool, restrained, single accent. The kind of palette a serious-tone B2B SaaS would not embarrass anyone with.',
    score(p) {
      let s = 0;
      if (p.tags.includes('blue')) s += 3;
      if (p.tags.includes('muted')) s += 2;
      if (p.tags.includes('modern')) s += 2;
      if (p.tags.includes('soft')) s += 1;
      if (p.stats.coolCount >= 2) s += 2;
      if (p.stats.avgSat < 0.5) s += 1;
      if (p.stats.inkBgContrast > 5) s += 1;
      if (p.stats.avgSat > 0.75) s -= 2;
      return s;
    },
  },
  {
    id: 'editorial',
    name: 'Editorial / publication',
    blurb: 'Cream-and-ink editorial. The page should read like printed paper with one hairline accent.',
    score(p) {
      let s = 0;
      if (p.tags.includes('sand')) s += 3;
      if (p.tags.includes('classic')) s += 2;
      if (p.tags.includes('vintage')) s += 2;
      if (p.tags.includes('muted')) s += 2;
      if (p.stats.warmCount >= 2 && p.stats.avgSat < 0.4) s += 2;
      if (p.stats.inkBgContrast > 7) s += 1;
      if (p.stats.maxSat > 0.85) s -= 1;
      return s;
    },
  },
  {
    id: 'brutalist',
    name: 'Brutalist statement',
    blurb: 'Stark mono base + one loud accent. Type carries the page; color punches in one place.',
    score(p) {
      let s = 0;
      if (p.tags.includes('black')) s += 3;
      if (p.tags.includes('bold')) s += 2;
      if (p.tags.includes('monochrome')) s += 2;
      if (p.tags.includes('dark')) s += 2;
      if (p.stats.minSat < 0.1 && p.stats.maxSat > 0.7) s += 3; // mono base + accent
      if (p.stats.inkBgContrast > 10) s += 2;
      return s;
    },
  },
  {
    id: 'quiet-craft',
    name: 'Quiet craft / atelier',
    blurb: 'Muted earth, low contrast warm. Studio-of-a-ceramicist palette.',
    score(p) {
      let s = 0;
      if (p.tags.includes('soft')) s += 2;
      if (p.tags.includes('muted')) s += 3;
      if (p.tags.includes('natural')) s += 2;
      if (p.tags.includes('earth')) s += 2;
      if (p.tags.includes('stone')) s += 2;
      if (p.stats.earthCount >= 2) s += 2;
      if (p.stats.avgSat < 0.4) s += 2;
      if (p.stats.inkBgContrast > 8) s -= 1;
      return s;
    },
  },
  {
    id: 'vibrant-playful',
    name: 'Vibrant consumer / playful',
    blurb: 'Saturated, multi-accent. Confident pop palette for consumer brands that want to be felt.',
    score(p) {
      let s = 0;
      if (p.tags.includes('vibrant')) s += 3;
      if (p.tags.includes('bright')) s += 2;
      if (p.tags.includes('bold')) s += 2;
      if (p.tags.includes('tropical')) s += 1;
      if (p.stats.avgSat > 0.6) s += 2;
      if (p.stats.hueRange > 180) s += 2; // multi-hue
      if (p.stats.maxSat > 0.85) s += 1;
      return s;
    },
  },
  {
    id: 'clinical',
    name: 'Healthcare / clinical',
    blurb: 'Light, cool, low-saturation. Reads as careful and competent without being cold.',
    score(p) {
      let s = 0;
      if (p.tags.includes('light')) s += 3;
      if (p.tags.includes('soft')) s += 2;
      if (p.tags.includes('pastel')) s += 2;
      if (p.tags.includes('cool')) s += 1;
      if (p.tags.includes('white')) s += 2;
      if (p.stats.avgLight > 0.7) s += 2;
      if (p.stats.coolCount >= 2) s += 1;
      if (p.stats.avgSat < 0.5) s += 1;
      return s;
    },
  },
  {
    id: 'civic',
    name: 'Civic / institutional',
    blurb: 'Classic, restrained, mid-saturation blue/red. Government, museum, library.',
    score(p) {
      let s = 0;
      if (p.tags.includes('classic')) s += 3;
      if (p.tags.includes('blue')) s += 2;
      if (p.tags.includes('modern')) s += 1;
      if (p.tags.includes('red')) s += 1;
      if (p.stats.avgSat >= 0.3 && p.stats.avgSat <= 0.65) s += 2;
      if (p.stats.inkBgContrast > 6) s += 1;
      return s;
    },
  },
  {
    id: 'luxury-fashion',
    name: 'Luxury fashion / fragrance',
    blurb: 'Dark, monochrome, gold accent. Quiet money palette.',
    score(p) {
      let s = 0;
      if (p.tags.includes('dark')) s += 3;
      if (p.tags.includes('gold')) s += 3;
      if (p.tags.includes('black')) s += 2;
      if (p.tags.includes('monochrome')) s += 1;
      if (p.stats.avgLight < 0.4) s += 2;
      if (p.stats.accentHue >= 30 && p.stats.accentHue <= 55 && p.stats.accentSat > 0.4) s += 2; // gold-ish
      return s;
    },
  },
  {
    id: 'indie-game',
    name: 'Indie game / playful tech',
    blurb: 'Neon, vibrant, multi-accent. The kind of palette that announces "this is fun."',
    score(p) {
      let s = 0;
      if (p.tags.includes('neon')) s += 3;
      if (p.tags.includes('vibrant')) s += 2;
      if (p.tags.includes('purple')) s += 1;
      if (p.tags.includes('bright')) s += 1;
      if (p.stats.maxSat > 0.85) s += 2;
      if (p.stats.hueRange > 200) s += 2;
      return s;
    },
  },
  {
    id: 'documentary',
    name: 'Documentary / journalism',
    blurb: 'Muted earth, sepia-adjacent, high body/heading contrast. Long-read magazine palette.',
    score(p) {
      let s = 0;
      if (p.tags.includes('muted')) s += 3;
      if (p.tags.includes('vintage')) s += 2;
      if (p.tags.includes('earth')) s += 2;
      if (p.tags.includes('brown')) s += 2;
      if (p.tags.includes('autumn')) s += 1;
      if (p.stats.avgSat < 0.45 && p.stats.warmCount >= 2) s += 2;
      if (p.stats.inkBgContrast > 6) s += 1;
      return s;
    },
  },
  {
    id: 'architecture',
    name: 'Architecture firm',
    blurb: 'Stone, monochrome, hairline. The folio of a quiet practice.',
    score(p) {
      let s = 0;
      if (p.tags.includes('stone')) s += 3;
      if (p.tags.includes('monochrome')) s += 3;
      if (p.tags.includes('white')) s += 2;
      if (p.tags.includes('black')) s += 1;
      if (p.stats.avgSat < 0.2) s += 3;
      if (p.stats.inkBgContrast > 8) s += 1;
      return s;
    },
  },
  {
    id: 'hospitality',
    name: 'Restaurant / hospitality',
    blurb: 'Warm, rich, lived-in. A neighborhood place at golden hour.',
    score(p) {
      let s = 0;
      if (p.tags.includes('autumn')) s += 2;
      if (p.tags.includes('sunset')) s += 2;
      if (p.tags.includes('gold')) s += 2;
      if (p.tags.includes('brown')) s += 2;
      if (p.tags.includes('earth')) s += 1;
      if (p.stats.warmCount >= 3) s += 2;
      if (p.stats.avgSat > 0.4 && p.stats.avgSat < 0.75) s += 1;
      return s;
    },
  },
  {
    id: 'outdoor-adventure',
    name: 'Outdoor / adventure',
    blurb: 'Natural greens and sky blues. Trail guide, outfitter, conservation.',
    score(p) {
      let s = 0;
      if (p.tags.includes('green')) s += 2;
      if (p.tags.includes('natural')) s += 2;
      if (p.tags.includes('sky')) s += 2;
      if (p.tags.includes('sea')) s += 1;
      if (p.tags.includes('beach')) s += 1;
      if (p.stats.greenCount >= 1 && p.stats.coolCount >= 1) s += 2;
      return s;
    },
  },
  {
    id: 'sustainable-eco',
    name: 'Sustainable / eco',
    blurb: 'Muted greens and earth tones. Materials-led, low-impact aesthetic.',
    score(p) {
      let s = 0;
      if (p.tags.includes('natural')) s += 2;
      if (p.tags.includes('earth')) s += 2;
      if (p.tags.includes('green')) s += 2;
      if (p.tags.includes('muted')) s += 2;
      if (p.stats.greenCount >= 1 && p.stats.avgSat < 0.5) s += 2;
      return s;
    },
  },
  {
    id: 'tech-research',
    name: 'Tech research / academic',
    blurb: 'Cool, restrained, single accent. The site of a research lab or thoughtful tech writeup.',
    score(p) {
      let s = 0;
      if (p.tags.includes('cool')) s += 2;
      if (p.tags.includes('modern')) s += 2;
      if (p.tags.includes('muted')) s += 2;
      if (p.tags.includes('blue')) s += 1;
      if (p.stats.coolCount >= 2 && p.stats.avgSat < 0.55) s += 2;
      if (p.stats.maxSat > 0.85) s -= 1;
      return s;
    },
  },
  {
    id: 'music-label',
    name: 'Music / record label',
    blurb: 'Retro, gradient-leaning, bold. A small label that ships sleeves you want to keep.',
    score(p) {
      let s = 0;
      if (p.tags.includes('retro')) s += 3;
      if (p.tags.includes('vintage')) s += 2;
      if (p.tags.includes('bold')) s += 2;
      if (p.tags.includes('gradient')) s += 1;
      if (p.stats.avgSat > 0.5 && p.stats.avgSat < 0.85) s += 1;
      return s;
    },
  },
  {
    id: 'cinematic',
    name: 'Cinema / film',
    blurb: 'Dark cinematic, deep saturation, low-key. A festival poster palette.',
    score(p) {
      let s = 0;
      if (p.tags.includes('dark')) s += 3;
      if (p.tags.includes('monochrome')) s += 1;
      if (p.tags.includes('black')) s += 1;
      if (p.stats.avgLight < 0.35) s += 3;
      if (p.stats.inkBgContrast > 8) s += 1;
      return s;
    },
  },
  {
    id: 'wine-spirits',
    name: 'Wine / spirits',
    blurb: 'Wine reds and deep earths. Cellar, vineyard, small distillery.',
    score(p) {
      let s = 0;
      if (p.tags.includes('red')) s += 2;
      if (p.tags.includes('brown')) s += 2;
      if (p.tags.includes('autumn')) s += 1;
      if (p.tags.includes('dark')) s += 1;
      if ((p.stats.accentHue < 25 || p.stats.accentHue > 340) && p.stats.accentSat > 0.4) s += 2; // red/burgundy
      if (p.stats.avgLight < 0.55) s += 1;
      return s;
    },
  },
  {
    id: 'athletic',
    name: 'Sports / athletic',
    blurb: 'Bold primary, high-contrast, performance-coded. Running club, gym, kit launch.',
    score(p) {
      let s = 0;
      if (p.tags.includes('bold')) s += 2;
      if (p.tags.includes('vibrant')) s += 2;
      if (p.tags.includes('red')) s += 1;
      if (p.tags.includes('blue')) s += 1;
      if (p.stats.maxSat > 0.8) s += 2;
      if (p.stats.inkBgContrast > 9) s += 1;
      return s;
    },
  },
  {
    id: 'boutique-hotel',
    name: 'Boutique hotel',
    blurb: 'Muted gold and sand. The lobby of a small Italian hotel, not a chain.',
    score(p) {
      let s = 0;
      if (p.tags.includes('muted')) s += 2;
      if (p.tags.includes('gold')) s += 2;
      if (p.tags.includes('sand')) s += 2;
      if (p.tags.includes('earth')) s += 1;
      if (p.stats.warmCount >= 2 && p.stats.avgSat < 0.5) s += 2;
      return s;
    },
  },
];

// ---------- run ----------

const data = JSON.parse(await fs.readFile('scripts/palettes.json', 'utf8'));
const enriched = data.palettes.map(p => ({ ...p, ...analyze(p) }));

const catalog = INTENTS.map(intent => {
  const scored = enriched
    .map(p => ({ ...p, _score: intent.score(p) }))
    .sort((a, b) => b._score - a._score);
  const top = scored.slice(0, 10);
  return {
    id: intent.id,
    name: intent.name,
    blurb: intent.blurb,
    palettes: top.map(p => ({
      hex: p.hex,
      name: p.name,
      likes: p.likes,
      tags: p.tags,
      roles: p.roles,
      score: p._score,
    })),
  };
});

await fs.writeFile('scripts/catalog.json', JSON.stringify({
  _meta: {
    source: data._meta,
    builtAt: new Date().toISOString(),
    intentCount: catalog.length,
    palettesPerIntent: 10,
  },
  intents: catalog,
}, null, 2));

console.log('catalog written: scripts/catalog.json');
console.log(`${catalog.length} intents × 10 palettes`);
for (const it of catalog) {
  const top = it.palettes[0];
  console.log(`  ${it.id.padEnd(20)} top: ${top.score.toString().padStart(2)} — ${top.name}  (${top.hex.join(' / ')})`);
}
