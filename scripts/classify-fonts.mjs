import fs from 'fs/promises';

// ---------- font genre map ----------
// Each font tagged with a primary genre. Used to score pairings against intents.
const GENRE = {
  // Geometric sans (clean, modern, neutral-leaning)
  'Inter': 'geometric-sans', 'Manrope': 'geometric-sans', 'Geist': 'geometric-sans',
  'Plus Jakarta Sans': 'geometric-sans', 'DM Sans': 'geometric-sans',
  'Hanken Grotesk': 'geometric-sans', 'Albert Sans': 'geometric-sans',
  'Sora': 'geometric-sans', 'Mulish': 'geometric-sans', 'Figtree': 'geometric-sans',
  'Archivo': 'geometric-sans', 'Be Vietnam Pro': 'geometric-sans',
  'Poppins': 'geometric-sans', 'Montserrat': 'geometric-sans',
  'Reddit Sans': 'geometric-sans', 'Satoshi': 'geometric-sans',
  'Supreme': 'geometric-sans', 'General Sans': 'geometric-sans',
  'Ranade': 'geometric-sans', 'Google Sans': 'geometric-sans',
  // Grotesque (contemporary, slightly mechanical)
  'Space Grotesk': 'grotesque-sans', 'Bricolage Grotesque': 'grotesque-sans',
  'Public Sans': 'grotesque-sans', 'Funnel Display': 'grotesque-sans',
  'Instrument Sans': 'grotesque-sans', 'Rethink Sans': 'grotesque-sans',
  'Epunda Sans': 'grotesque-sans', 'TASA Orbiter': 'grotesque-sans',
  'Urbanist': 'grotesque-sans', 'Karla': 'grotesque-sans',
  'Libre Franklin': 'grotesque-sans', 'Chivo': 'grotesque-sans',
  // Humanist sans (warm, friendly, readable)
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
  'David Libre': 'humanist-sans', 'Rosario': 'humanist-sans',
  'Zalando Sans': 'humanist-sans', 'Zalando Sans Expanded': 'humanist-sans',
  'Ubuntu': 'humanist-sans', 'TikTok Sans': 'humanist-sans',
  'Zen Kaku Gothic Antique': 'humanist-sans', 'Zen Kaku Gothic New': 'humanist-sans',
  'Zain': 'humanist-sans', 'SUSE': 'humanist-sans', 'Varela': 'humanist-sans',
  'Ysabeau': 'humanist-sans', 'Ysabeau Infant': 'humanist-sans',
  'Reddit Sans': 'humanist-sans',
  // Rounded sans
  'Varela Round': 'rounded-sans',
  // Condensed sans (athletic, headline)
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
  // Display sans (expressive)
  'Unbounded': 'display-sans', 'Syne': 'display-sans',
  // Old-style serif (warm, calligraphic)
  'EB Garamond': 'old-style-serif', 'Cormorant Garamond': 'old-style-serif',
  'Crimson Pro': 'old-style-serif', 'Crimson Text': 'old-style-serif',
  'Libre Caslon Text': 'old-style-serif', 'Libre Caslon Display': 'old-style-serif',
  'Inknut Antiqua': 'old-style-serif', 'Gentium Book Plus': 'old-style-serif',
  // Transitional / book serif
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
  // Modern / didone serif (high-contrast, editorial)
  'Playfair Display': 'modern-serif', 'Playfair': 'modern-serif',
  'Playfair Display SC': 'modern-serif',
  'DM Serif Display': 'modern-serif', 'DM Serif Text': 'modern-serif',
  'Italiana': 'modern-serif', 'Marcellus': 'modern-serif',
  'Fraunces': 'modern-serif', 'Instrument Serif': 'modern-serif',
  'Gloock': 'modern-serif', 'Noto Serif Display': 'modern-serif',
  'Plein': 'modern-serif',
  // Slab serif
  'Roboto Slab': 'slab-serif', 'Arvo': 'slab-serif', 'Bitter': 'slab-serif',
  'Aleo': 'slab-serif', 'Epunda Slab': 'slab-serif',
  // Display serif (chunky, decorative)
  'Abril Fatface': 'display-serif', 'Young Serif': 'display-serif',
  'BioRhyme': 'display-serif',
  // Decorative display (loud, characterful)
  'Lobster': 'decorative-display', 'Alfa Slab One': 'decorative-display',
  'Righteous': 'decorative-display', 'Metal': 'decorative-display',
  'Tanker': 'decorative-display', 'Clash Display': 'decorative-display',
  'Sansita': 'decorative-display',
  // Monospace
  'JetBrains Mono': 'monospace', 'Fira Code': 'monospace',
  'IBM Plex Mono': 'monospace', 'Source Code Pro': 'monospace',
  'Geist Mono': 'monospace', 'Space Mono': 'monospace',
  'DM Mono': 'monospace', 'Roboto Mono': 'monospace',
  'Inconsolata': 'monospace', 'VT323': 'monospace', 'SUSE Mono': 'monospace',
  // Handwriting / script
  'Yellowtail': 'handwriting', 'Averia Serif Libre': 'handwriting',
};

function genreOf(name) {
  return GENRE[name] || 'unclassified';
}

// ---------- intent scorers ----------

function in_(list, ...items) { return items.some(i => list.includes(i)); }

const INTENTS = [
  {
    id: 'trust-fintech',
    name: 'Trust-led B2B / fintech',
    blurb: 'Geometric or grotesque sans pairings. Calm. Clear. Reads as competence.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'geometric-sans' && bg === 'geometric-sans') s += 4;
      if (dg === 'geometric-sans' && bg === 'humanist-sans') s += 3;
      if (dg === 'grotesque-sans' && bg === 'geometric-sans') s += 3;
      if (dg === 'grotesque-sans' && bg === 'humanist-sans') s += 2;
      if (dg === 'geometric-sans' && bg === 'monospace') s += 1; // small accent
      // Penalize the most-default Inter+Inter case
      if (p.display === 'Inter' && p.body === 'Inter') s -= 3;
      if (p.display === 'Roboto' && p.body === 'Roboto') s -= 2;
      return s;
    },
  },
  {
    id: 'editorial',
    name: 'Editorial / publication',
    blurb: 'Old-style or transitional serif body with a sans display, or full serif pair. Long-read magazine pages.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'modern-serif' && bg === 'transitional-serif') s += 4;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'transitional-serif' && bg === 'humanist-sans') s += 2;
      if (dg === 'geometric-sans' && bg === 'transitional-serif') s += 2;
      if (dg === 'geometric-sans' && bg === 'old-style-serif') s += 2;
      if (dg === 'old-style-serif' && bg === 'old-style-serif') s += 2;
      return s;
    },
  },
  {
    id: 'brutalist',
    name: 'Brutalist statement',
    blurb: 'Condensed sans or display + monospace body. Or a single extreme display.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'condensed-sans' && bg === 'monospace') s += 4;
      if (dg === 'condensed-sans' && bg === 'geometric-sans') s += 3;
      if (dg === 'display-sans' && bg === 'geometric-sans') s += 3;
      if (dg === 'condensed-sans' && bg === 'humanist-sans') s += 2;
      if (dg === 'grotesque-sans' && bg === 'monospace') s += 3;
      if (dg === 'display-sans' && bg === 'monospace') s += 3;
      if (dg === 'decorative-display' && bg === 'humanist-sans') s += 1;
      return s;
    },
  },
  {
    id: 'quiet-craft',
    name: 'Quiet craft / atelier',
    blurb: 'Warm serif headings with humanist sans body. Studio of a ceramicist. Whisper-volume type.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'old-style-serif' && bg === 'humanist-sans') s += 4;
      if (dg === 'transitional-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'geometric-sans') s += 2;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 1;
      if (dg === 'slab-serif' && bg === 'humanist-sans') s += 2;
      return s;
    },
  },
  {
    id: 'vibrant-playful',
    name: 'Vibrant consumer / playful',
    blurb: 'Display sans or decorative + geometric sans body. Confident.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'display-sans' && bg === 'geometric-sans') s += 4;
      if (dg === 'decorative-display' && bg === 'geometric-sans') s += 3;
      if (dg === 'grotesque-sans' && bg === 'geometric-sans') s += 2;
      if (dg === 'display-serif' && bg === 'geometric-sans') s += 2;
      if (dg === 'condensed-sans' && bg === 'geometric-sans') s += 1;
      return s;
    },
  },
  {
    id: 'clinical',
    name: 'Healthcare / clinical',
    blurb: 'Humanist sans pair. Warm. Calm. Approachable. No display drama.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'humanist-sans' && bg === 'humanist-sans') s += 4;
      if (dg === 'rounded-sans' && bg === 'humanist-sans') s += 3;
      if (dg === 'humanist-sans' && bg === 'rounded-sans') s += 3;
      if (dg === 'geometric-sans' && bg === 'humanist-sans') s += 2;
      // Penalize anything that says "loud"
      if (in_([dg, bg], 'condensed-sans', 'decorative-display', 'display-sans')) s -= 3;
      return s;
    },
  },
  {
    id: 'civic',
    name: 'Civic / institutional',
    blurb: 'Humanist sans + transitional serif. Library, museum, civic letter.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'humanist-sans' && bg === 'transitional-serif') s += 4;
      if (dg === 'humanist-sans' && bg === 'old-style-serif') s += 3;
      if (dg === 'geometric-sans' && bg === 'transitional-serif') s += 3;
      if (dg === 'transitional-serif' && bg === 'humanist-sans') s += 2;
      if (dg === 'humanist-sans' && bg === 'humanist-sans') s += 1;
      return s;
    },
  },
  {
    id: 'luxury-fashion',
    name: 'Luxury fashion / fragrance',
    blurb: 'Thin modern serif heading + geometric sans body. Negative space.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'modern-serif' && bg === 'geometric-sans') s += 4;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'geometric-sans') s += 2;
      if (dg === 'display-sans' && bg === 'geometric-sans') s += 2;
      // Italiana, Marcellus, Cormorant fit especially
      if (p.display === 'Italiana' || p.display === 'Marcellus' || p.display === 'Cormorant Garamond') s += 2;
      return s;
    },
  },
  {
    id: 'indie-game',
    name: 'Indie game / playful tech',
    blurb: 'Display sans or decorative + grotesque body. Mono accent. Plays well.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'display-sans' && bg === 'geometric-sans') s += 4;
      if (dg === 'display-sans' && bg === 'monospace') s += 4;
      if (dg === 'decorative-display' && bg === 'geometric-sans') s += 3;
      if (dg === 'grotesque-sans' && bg === 'monospace') s += 3;
      if (dg === 'decorative-display' && bg === 'monospace') s += 2;
      if (p.display === 'Unbounded' || p.display === 'Syne' || p.display === 'Bricolage Grotesque') s += 2;
      return s;
    },
  },
  {
    id: 'documentary',
    name: 'Documentary / journalism',
    blurb: 'Transitional serif body + humanist sans display. Long-form reading.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'humanist-sans' && bg === 'transitional-serif') s += 4;
      if (dg === 'humanist-sans' && bg === 'old-style-serif') s += 3;
      if (dg === 'geometric-sans' && bg === 'transitional-serif') s += 3;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 2;
      if (dg === 'slab-serif' && bg === 'humanist-sans') s += 2;
      return s;
    },
  },
  {
    id: 'architecture',
    name: 'Architecture firm',
    blurb: 'Grotesque sans + monospace, or all-mono. Reduced palette. Folio of a quiet practice.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'grotesque-sans' && bg === 'monospace') s += 4;
      if (dg === 'geometric-sans' && bg === 'monospace') s += 4;
      if (dg === 'monospace' && bg === 'humanist-sans') s += 3;
      if (dg === 'monospace' && bg === 'geometric-sans') s += 3;
      if (dg === 'geometric-sans' && bg === 'geometric-sans' && (p.display.includes('Plex') || p.display === 'Space Grotesk' || p.display === 'Archivo')) s += 2;
      return s;
    },
  },
  {
    id: 'hospitality',
    name: 'Restaurant / hospitality',
    blurb: 'Old-style serif heading + warm humanist body. Or decorative display + humanist. Golden-hour mood.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'old-style-serif' && bg === 'humanist-sans') s += 4;
      if (dg === 'display-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'decorative-display' && bg === 'humanist-sans') s += 3;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 2;
      if (dg === 'old-style-serif' && bg === 'rounded-sans') s += 2;
      return s;
    },
  },
  {
    id: 'outdoor-adventure',
    name: 'Outdoor / adventure',
    blurb: 'Condensed display + slab or transitional body. Trail guide, outfitter, athletic but earthy.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'condensed-sans' && bg === 'transitional-serif') s += 4;
      if (dg === 'condensed-sans' && bg === 'slab-serif') s += 4;
      if (dg === 'condensed-sans' && bg === 'humanist-sans') s += 3;
      if (dg === 'slab-serif' && bg === 'humanist-sans') s += 2;
      return s;
    },
  },
  {
    id: 'sustainable-eco',
    name: 'Sustainable / eco',
    blurb: 'Humanist sans + transitional serif. Materials-led, low-impact aesthetic.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'humanist-sans' && bg === 'transitional-serif') s += 4;
      if (dg === 'humanist-sans' && bg === 'old-style-serif') s += 3;
      if (dg === 'geometric-sans' && bg === 'transitional-serif') s += 2;
      if (dg === 'transitional-serif' && bg === 'humanist-sans') s += 2;
      return s;
    },
  },
  {
    id: 'tech-research',
    name: 'Tech research / academic',
    blurb: 'Mono pair, or geometric sans + mono. Reads as careful and considered.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'monospace' && bg === 'geometric-sans') s += 4;
      if (dg === 'monospace' && bg === 'humanist-sans') s += 3;
      if (dg === 'geometric-sans' && bg === 'monospace') s += 4;
      if (dg === 'humanist-sans' && bg === 'monospace') s += 3;
      // IBM Plex set is gold here
      if (p.display.startsWith('IBM Plex') || p.body.startsWith('IBM Plex')) s += 2;
      return s;
    },
  },
  {
    id: 'music-label',
    name: 'Music / record label',
    blurb: 'Display serif or decorative + geometric body. Sleeve-art typography.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'display-serif' && bg === 'geometric-sans') s += 4;
      if (dg === 'decorative-display' && bg === 'geometric-sans') s += 4;
      if (dg === 'modern-serif' && bg === 'geometric-sans') s += 3;
      if (dg === 'slab-serif' && bg === 'geometric-sans') s += 3;
      if (dg === 'display-sans' && bg === 'monospace') s += 2;
      return s;
    },
  },
  {
    id: 'cinematic',
    name: 'Cinema / film',
    blurb: 'High-drama modern serif + geometric sans. Festival poster type.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'modern-serif' && bg === 'geometric-sans') s += 4;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'display-serif' && bg === 'geometric-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'geometric-sans') s += 2;
      return s;
    },
  },
  {
    id: 'wine-spirits',
    name: 'Wine / spirits',
    blurb: 'Old-style serif. Calligraphic warmth. Vineyard, cellar, small distillery.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'old-style-serif' && bg === 'humanist-sans') s += 4;
      if (dg === 'old-style-serif' && bg === 'geometric-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'old-style-serif') s += 2;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 2;
      if (dg === 'display-serif' && bg === 'humanist-sans') s += 2;
      return s;
    },
  },
  {
    id: 'athletic',
    name: 'Sports / athletic',
    blurb: 'Condensed sans + geometric body. Big, athletic, performance.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'condensed-sans' && bg === 'geometric-sans') s += 4;
      if (dg === 'condensed-sans' && bg === 'humanist-sans') s += 3;
      if (dg === 'display-sans' && bg === 'geometric-sans') s += 2;
      if (dg === 'condensed-sans' && bg === 'monospace') s += 2;
      return s;
    },
  },
  {
    id: 'boutique-hotel',
    name: 'Boutique hotel',
    blurb: 'Refined old-style or modern serif + understated humanist body. Lobby of a small Italian hotel.',
    score(p, dg, bg) {
      let s = 0;
      if (dg === 'old-style-serif' && bg === 'humanist-sans') s += 4;
      if (dg === 'modern-serif' && bg === 'humanist-sans') s += 3;
      if (dg === 'old-style-serif' && bg === 'geometric-sans') s += 2;
      if (dg === 'modern-serif' && bg === 'geometric-sans') s += 2;
      return s;
    },
  },
];

// ---------- run ----------

const data = JSON.parse(await fs.readFile('scripts/fontpair-pairs.json', 'utf8'));
const enriched = data.pairs.map(p => ({
  ...p,
  displayGenre: genreOf(p.display),
  bodyGenre: genreOf(p.body),
}));

console.log(`pairings: ${enriched.length}`);
const unclassified = enriched.filter(p => p.displayGenre === 'unclassified' || p.bodyGenre === 'unclassified');
if (unclassified.length) {
  const names = new Set();
  for (const p of unclassified) {
    if (p.displayGenre === 'unclassified') names.add(p.display);
    if (p.bodyGenre === 'unclassified') names.add(p.body);
  }
  console.log(`unclassified fonts (${names.size}): ${[...names].sort().join(', ')}`);
}

const catalog = INTENTS.map(intent => {
  const scored = enriched
    .map(p => ({ ...p, _score: intent.score(p, p.displayGenre, p.bodyGenre) }))
    .sort((a, b) => b._score - a._score);
  return {
    id: intent.id,
    name: intent.name,
    blurb: intent.blurb,
    pairings: scored.slice(0, 10).map(p => ({
      display: p.display,
      body: p.body,
      label: p.label,
      displayGenre: p.displayGenre,
      bodyGenre: p.bodyGenre,
      score: p._score,
    })),
  };
});

await fs.writeFile('scripts/catalog-fonts.json', JSON.stringify({
  _meta: {
    source: data._meta,
    builtAt: new Date().toISOString(),
    intentCount: catalog.length,
    pairingsPerIntent: 10,
  },
  intents: catalog,
}, null, 2));
console.log('wrote scripts/catalog-fonts.json');
for (const it of catalog) {
  const top = it.pairings[0];
  console.log(`  ${it.id.padEnd(20)} top score ${top.score} — ${top.display} & ${top.body}  (${top.displayGenre} + ${top.bodyGenre})`);
}
