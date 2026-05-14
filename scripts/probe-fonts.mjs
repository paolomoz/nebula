import { chromium } from 'playwright';
import fs from 'fs/promises';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 1800 },
});
const page = await ctx.newPage();

async function probe(url, label) {
  console.log(`\n=== ${label} ===`);
  console.log('GOTO:', url);
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    console.log('STATUS:', resp?.status());
    await page.waitForTimeout(3500);
    const title = await page.title();
    console.log('TITLE:', title);

    for (let i = 0; i < 4; i++) {
      await page.mouse.wheel(0, 1500);
      await page.waitForTimeout(600);
    }

    const info = await page.evaluate(() => {
      // Try to find font-pair-card-like elements
      const candidates = [
        '[class*="pair"]','[class*="combo"]','[class*="card"]','[class*="pairing"]',
      ];
      const found = {};
      for (const sel of candidates) {
        const els = document.querySelectorAll(sel);
        if (els.length > 0) found[sel] = els.length;
      }
      return {
        anchors: document.querySelectorAll('a').length,
        sampleAnchorTexts: [...document.querySelectorAll('a')].slice(0, 30).map(a => ({ href: a.getAttribute('href'), text: (a.textContent || '').trim().slice(0, 60) })),
        candidateSelectors: found,
        bodyLen: document.body.innerText.length,
      };
    });
    console.log(JSON.stringify(info, null, 2).slice(0, 4000));

    const safeName = label.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    await fs.writeFile(`scripts/probe-${safeName}.html`, await page.content());
    console.log(`saved scripts/probe-${safeName}.html`);
  } catch (e) {
    console.log('ERR:', e.message);
  }
}

await probe('https://www.fontpair.co/', 'fontpair-home');
await probe('https://www.fontpair.co/all', 'fontpair-all');
await probe('https://www.fontpair.co/inspiration', 'fontpair-inspiration');

await browser.close();
console.log('\nDONE');
