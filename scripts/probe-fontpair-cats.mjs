import { chromium } from 'playwright';
import fs from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 1800 },
});
const page = await ctx.newPage();

async function countAndSample(url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForTimeout(2500);
  let prev = -1, cur = await page.evaluate(() => document.querySelectorAll('h2[data-font-name]').length);
  for (let i = 0; i < 30 && cur !== prev; i++) {
    prev = cur;
    await page.mouse.wheel(0, 4000);
    await page.waitForTimeout(700);
    cur = await page.evaluate(() => document.querySelectorAll('h2[data-font-name]').length);
  }
  const cards = await page.evaluate(() => {
    const all = [...document.querySelectorAll('h2[data-font-name]')];
    const out = [];
    for (const h2 of all) {
      const card = h2.closest('div.rounded-card') || h2.closest('a') || h2.parentElement;
      const p = card?.querySelector('p[data-font-name]');
      if (!p) continue;
      out.push({ display: h2.getAttribute('data-font-name'), body: p.getAttribute('data-font-name'), label: (h2.textContent || '').trim() });
    }
    return out;
  });
  return { url, count: cards.length, sample: cards.slice(0, 5) };
}

const urls = [
  'https://www.fontpair.co/category/serif',
  'https://www.fontpair.co/category/sans-serif',
  'https://www.fontpair.co/category/display',
  'https://www.fontpair.co/category/monospace',
  'https://www.fontpair.co/category/handwriting',
  'https://www.fontpair.co/fonts/google/inter',
  'https://www.fontpair.co/fonts/google/playfair-display',
  'https://www.fontpair.co/fonts/google/roboto',
  'https://www.fontpair.co/fonts/google/eb-garamond',
];

for (const u of urls) {
  try {
    const r = await countAndSample(u);
    console.log(`${u.padEnd(70)}  →  ${r.count}`);
    if (r.sample.length) for (const s of r.sample) console.log('    ', s.label);
  } catch (e) {
    console.log(`${u}  →  ERR ${e.message}`);
  }
}

await browser.close();
