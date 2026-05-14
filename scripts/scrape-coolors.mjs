import { chromium } from 'playwright';
import fs from 'fs/promises';

// Coolors tags that returned ≥40 palettes in probe-tags.mjs.
const TAGS = [
  // Temperature & lightness
  'cool', 'dark', 'light', 'bright',
  // Saturation / intensity
  'muted', 'vibrant', 'soft', 'pastel', 'neon', 'bold',
  // Structure
  'monochrome', 'gradient',
  // Era / style
  'vintage', 'retro', 'modern', 'classic',
  // Season
  'autumn', 'spring', 'summer', 'winter',
  // Theme / mood
  'earth', 'sunset', 'sky', 'sand', 'natural', 'beach', 'sea', 'gold', 'stone',
  // Color-led (kept for diversity)
  'blue', 'red', 'green', 'orange', 'yellow', 'purple', 'brown', 'black', 'white',
  // Niche but useful
  'tropical', 'halloween', 'christmas',
];

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();

const palettesByKey = new Map(); // key = hex sequence, value = { hex[5], name, likes, tags[] }

async function scrapeTag(tag) {
  const url = `https://coolors.co/palettes/popular/${tag}`;
  let resp;
  try {
    resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  } catch (e) {
    console.log(`  ${tag}: navigation error ${e.message}`);
    return 0;
  }
  if (resp?.status() !== 200) {
    console.log(`  ${tag}: status ${resp?.status()}`);
    return 0;
  }
  await page.waitForTimeout(1500);

  const items = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.palette-card')];
    return cards.map(card => {
      const colorEls = [...card.querySelectorAll('.palette-card_colors > div')];
      const hex = colorEls
        .map(el => (el.querySelector('span')?.textContent || '').trim().toUpperCase())
        .filter(h => /^[0-9A-F]{6}$/.test(h));
      const nameEl = card.querySelector('.palette-card_name');
      const name = (nameEl?.textContent || '').trim();
      const likeEl = card.querySelector('.palette-card_save-btn span');
      const likes = (likeEl?.textContent || '').trim();
      return { hex, name, likes };
    }).filter(p => p.hex.length === 5);
  });

  let added = 0;
  for (const p of items) {
    const key = p.hex.join('-');
    if (palettesByKey.has(key)) {
      palettesByKey.get(key).tags.push(tag);
    } else {
      palettesByKey.set(key, { ...p, tags: [tag] });
      added++;
    }
  }
  console.log(`  ${tag}: ${items.length} palettes (${added} new, ${items.length - added} dupes)`);
  return items.length;
}

console.log(`scraping ${TAGS.length} tags from coolors.co/palettes/popular/<tag>`);
for (const tag of TAGS) {
  await scrapeTag(tag);
  // polite delay
  await page.waitForTimeout(600);
}

await browser.close();

const all = [...palettesByKey.values()];
console.log(`\ntotal unique palettes: ${all.length}`);

const outPath = 'scripts/palettes.json';
await fs.writeFile(outPath, JSON.stringify({
  _meta: {
    source: 'coolors.co/palettes/popular/<tag>',
    scrapedAt: new Date().toISOString(),
    tagsScraped: TAGS,
    paletteCount: all.length,
  },
  palettes: all,
}, null, 2));
console.log(`wrote ${outPath}`);
