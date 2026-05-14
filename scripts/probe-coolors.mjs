import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  viewport: { width: 1440, height: 900 },
});
const page = await ctx.newPage();

async function countPalettes() {
  return await page.evaluate(() => document.querySelectorAll('.palette-card_colors').length);
}

const urls = [
  'https://coolors.co/palettes/popular',
  'https://coolors.co/palettes/trending',
  'https://coolors.co/palettes/new',
];

for (const url of urls) {
  console.log('\n===', url, '===');
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  console.log('STATUS:', resp?.status());
  await page.waitForTimeout(2000);

  let prev = -1;
  let cur = await countPalettes();
  console.log(`initial: ${cur}`);
  // Scroll until palettes stop growing (or hit 30 iterations).
  for (let i = 0; i < 30 && cur > prev; i++) {
    prev = cur;
    await page.mouse.wheel(0, 3000);
    await page.waitForTimeout(1200);
    cur = await countPalettes();
    if (cur !== prev) console.log(`  after scroll ${i + 1}: ${cur}`);
  }
  console.log(`final: ${cur}`);
}

// Try a hashtag-style URL to see if tags exist.
console.log('\n=== testing tag URLs ===');
for (const url of [
  'https://coolors.co/palettes/popular/warm',
  'https://coolors.co/palettes/popular/dark',
  'https://coolors.co/palettes/popular/pastel',
  'https://coolors.co/palettes/popular/vintage',
]) {
  try {
    const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20_000 });
    await page.waitForTimeout(2000);
    const n = await countPalettes();
    console.log(`${url} → ${resp?.status()} → ${n} palettes`);
  } catch (e) {
    console.log(`${url} → ERROR: ${e.message}`);
  }
}

await browser.close();
console.log('DONE');
