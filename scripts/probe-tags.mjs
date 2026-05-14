import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();

// Candidate tags — covers temperature, mood, palette structure, season, era,
// material, theme. Tests which ones Coolors actually recognises.
const candidateTags = [
  // Temperature & mood
  'warm', 'cool', 'dark', 'light', 'bright', 'muted', 'vibrant', 'soft',
  // Saturation
  'pastel', 'neon', 'monochrome', 'minimal', 'bold', 'gradient',
  // Era / style
  'vintage', 'retro', 'modern', 'rustic', 'industrial', 'classic',
  // Season
  'autumn', 'spring', 'summer', 'winter',
  // Nature / theme
  'earth', 'ocean', 'forest', 'sunset', 'sunrise', 'sky', 'sand', 'rainbow',
  'natural', 'tropical', 'desert', 'beach', 'sea', 'flower',
  // Material / finish
  'metallic', 'gold', 'wood', 'paper', 'stone',
  // Genre
  'cyberpunk', 'futuristic', 'medieval', 'gothic',
  // Subject
  'autumn', 'christmas', 'halloween', 'valentine',
  // Color-led
  'blue', 'red', 'green', 'orange', 'yellow', 'purple', 'pink', 'brown', 'black', 'white',
];

const results = [];
for (const tag of [...new Set(candidateTags)]) {
  const url = `https://coolors.co/palettes/popular/${tag}`;
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await page.waitForTimeout(800);
    const finalUrl = page.url();
    const n = await page.evaluate(() => document.querySelectorAll('.palette-card_colors').length);
    const status = resp?.status();
    const redirected = finalUrl !== url;
    results.push({ tag, status, n, redirected, finalUrl: redirected ? finalUrl : '' });
    console.log(`${tag.padEnd(14)} → ${status} → ${n.toString().padStart(3)} palettes${redirected ? `  REDIR → ${finalUrl}` : ''}`);
  } catch (e) {
    results.push({ tag, error: e.message });
    console.log(`${tag.padEnd(14)} → ERROR ${e.message}`);
  }
}

await browser.close();

// Save findings
const fs = await import('fs/promises');
await fs.writeFile('scripts/tags-probe.json', JSON.stringify(results, null, 2));
console.log('\nSaved scripts/tags-probe.json');
console.log(`Valid tags (200, no redir, ≥48 palettes): ${results.filter(r => r.status === 200 && !r.redirected && r.n >= 48).length}/${results.length}`);
