import { chromium } from 'playwright';
import fs from 'fs/promises';

// Curated list of popular Google Fonts to query Fontpair for pairings.
// Spans sans-serif, serif, display, mono so we get a diverse pool.
const SLUGS = [
  // Geometric / contemporary sans
  'inter', 'manrope', 'sora', 'plus-jakarta-sans', 'dm-sans', 'urbanist',
  'figtree', 'public-sans', 'space-grotesk', 'hanken-grotesk', 'geist',
  'bricolage-grotesque', 'albert-sans', 'unbounded', 'syne',
  // Humanist sans
  'work-sans', 'open-sans', 'lato', 'mulish', 'nunito', 'source-sans-3',
  'source-sans-pro', 'fira-sans', 'roboto', 'noto-sans', 'rubik',
  'ibm-plex-sans', 'barlow', 'prompt',
  // Condensed / display sans
  'oswald', 'bebas-neue', 'anton', 'archivo', 'archivo-narrow', 'archivo-black',
  'league-spartan', 'staatliches',
  // Old-style / transitional serif
  'eb-garamond', 'cormorant-garamond', 'crimson-pro', 'crimson-text',
  'libre-baskerville', 'libre-caslon-text', 'libre-caslon-display',
  'lora', 'merriweather', 'source-serif-4', 'source-serif-pro',
  // Modern / display serif
  'playfair-display', 'playfair', 'dm-serif-display', 'dm-serif-text',
  'italiana', 'marcellus', 'fraunces', 'instrument-serif', 'gloock',
  'newsreader', 'bitter', 'spectral',
  // Slab serif
  'roboto-slab', 'arvo',
  // Display / decorative
  'lobster', 'abril-fatface', 'alfa-slab-one', 'righteous',
  // Monospace
  'jetbrains-mono', 'fira-code', 'ibm-plex-mono', 'source-code-pro',
  'geist-mono', 'space-mono', 'dm-mono', 'inconsolata', 'roboto-mono',
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 1800 },
});
const page = await ctx.newPage();

async function countCards() {
  return await page.evaluate(() => document.querySelectorAll('h2[data-font-name]').length);
}
async function scrollUntilStable(maxIter = 20) {
  let prev = -1, cur = await countCards();
  for (let i = 0; i < maxIter && cur !== prev; i++) {
    prev = cur;
    await page.mouse.wheel(0, 4500);
    await page.waitForTimeout(550);
    cur = await countCards();
  }
  return cur;
}
async function extractPairs() {
  return await page.evaluate(() => {
    const all = [...document.querySelectorAll('h2[data-font-name]')];
    const out = [];
    for (const h2 of all) {
      const card = h2.closest('div.rounded-card') || h2.closest('a') || h2.parentElement;
      const p = card?.querySelector('p[data-font-name]');
      if (!p) continue;
      out.push({
        display: h2.getAttribute('data-font-name'),
        displayType: h2.getAttribute('data-font-type'),
        body: p.getAttribute('data-font-name'),
        bodyType: p.getAttribute('data-font-type'),
        label: (h2.textContent || '').trim(),
      });
    }
    return out;
  });
}
async function scrapeUrl(url) {
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  if (resp?.status() !== 200) return { status: resp?.status(), pairs: [] };
  await page.waitForTimeout(1100);
  await scrollUntilStable();
  const pairs = await extractPairs();
  return { status: 200, pairs };
}

const collected = [];

// Seed from /all
process.stdout.write('seed /all  ');
const seed = await scrapeUrl('https://www.fontpair.co/all');
console.log(`→ ${seed.status} → ${seed.pairs.length}`);
collected.push(...seed.pairs);

// Per-font pages
for (let i = 0; i < SLUGS.length; i++) {
  const slug = SLUGS[i];
  const url = `https://www.fontpair.co/fonts/google/${slug}`;
  process.stdout.write(`[${(i + 1).toString().padStart(2)}/${SLUGS.length}] ${slug.padEnd(28)} `);
  const r = await scrapeUrl(url);
  process.stdout.write(`→ ${r.status} → ${r.pairs.length}\n`);
  collected.push(...r.pairs);
  await page.waitForTimeout(200);
}

await browser.close();

// Dedupe by display|body (case-insensitive).
const byKey = new Map();
for (const p of collected) {
  const k = `${p.display.toLowerCase()}|${p.body.toLowerCase()}`;
  if (!byKey.has(k)) byKey.set(k, p);
}
const unique = [...byKey.values()];

// Eligible: display is google, body has font-name (bodyType in the DOM is "body" for the body element).
const eligible = unique.filter(p => p.displayType === 'google' && (p.bodyType === 'google' || p.bodyType === 'body'));

// Filter out pairs where the same font is on both sides (the "(Bold) & (Regular)" entries) — they are stylistically thin.
const filtered = eligible.filter(p => p.display.toLowerCase() !== p.body.toLowerCase());

console.log(`\nraw: ${collected.length}`);
console.log(`unique: ${unique.length}`);
console.log(`eligible: ${eligible.length}`);
console.log(`after filtering same-font pairs: ${filtered.length}`);

await fs.writeFile('scripts/fontpair-pairs.json', JSON.stringify({
  _meta: {
    source: 'fontpair.co/all + fontpair.co/fonts/google/<slug>',
    scrapedAt: new Date().toISOString(),
    slugsAttempted: SLUGS.length,
    totalRaw: collected.length,
    uniquePairs: unique.length,
    filteredPairs: filtered.length,
  },
  pairs: filtered,
}, null, 2));
console.log('wrote scripts/fontpair-pairs.json');

// Print font frequency.
const freq = new Map();
for (const p of filtered) {
  freq.set(p.display, (freq.get(p.display) || 0) + 1);
  freq.set(p.body, (freq.get(p.body) || 0) + 1);
}
const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
console.log(`\nunique font families involved: ${freq.size}`);
console.log('most common (top 20):');
for (const [f, c] of sorted.slice(0, 20)) console.log(`  ${f.padEnd(30)} ${c}`);
