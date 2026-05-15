// Open the rendered nebula-test-4 page, take screenshots at desktop +
// mobile widths, extract structural + content signals, write a JSON
// digest the user can scan.

import { chromium } from 'playwright';
import fs from 'fs/promises';

const FILE_URL = 'file:///Users/paolo/stardust/nebula-test-4/nebula/index.html';
const OUT_DIR = '/Users/paolo/stardust/stardust-greenfield/scripts/test-4-out';

await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto(FILE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);

// 1. Desktop full-page screenshot
await page.screenshot({ path: `${OUT_DIR}/desktop-full.png`, fullPage: true });

// 2. Desktop first-viewport screenshot
await page.screenshot({ path: `${OUT_DIR}/desktop-fold.png`, fullPage: false });

// 3. Capture structural digest
const digest = await page.evaluate(() => {
  // Section sequence (data-section attributes)
  const sections = [...document.querySelectorAll('[data-section]')].map((s, i) => ({
    index: i,
    role: s.dataset.section,
    headingText: s.querySelector('h1, h2, h3')?.textContent?.trim()?.slice(0, 80) || null,
    tag: s.tagName.toLowerCase(),
    childCount: s.children.length,
  }));

  // Beer names — check whether all eleven are present in the catalogue section
  const ELEVEN = ['Montestella','Ghisa','Sant’Ambroeus','Sant\'Ambroeus','Magut','Ligera','Domm','Ortiga','Porpora','Robb de Matt','Gaina','Fa Balà L\'Oeucc','Fa Bala L\'Oeucc'];
  const bodyText = document.body.innerText;
  const beersFound = ELEVEN.filter(n => bodyText.includes(n));

  // Required Italian phrases from brief / shape.md
  const REQUIRED_PHRASES = [
    'la birra ribelle di Milano',
    '1996',
    'Adelchi',
    'Golgi',
    'Fai scorta di Lambrate',
    'NON FILTRATA',
    'NON PASTORIZZATA',
    'NON IN VENDITA',
  ];
  const phrasesFound = REQUIRED_PHRASES.filter(p => bodyText.toLowerCase().includes(p.toLowerCase()));
  const phrasesMissing = REQUIRED_PHRASES.filter(p => !bodyText.toLowerCase().includes(p.toLowerCase()));

  // Anti-pattern check — should NOT contain these
  const ANTI = [
    'kraft paper', 'chalkboard', 'edison bulb', 'edison-bulb',
    'passion', 'journey', 'artisanal', 'small batch',
    'join our community', 'our story', 'our mission',
  ];
  const antiHits = ANTI.filter(p => bodyText.toLowerCase().includes(p.toLowerCase()));

  // Image audit
  const images = [...document.querySelectorAll('img, [style*="background-image"]')];
  const imageAudit = images.map(el => {
    const isImg = el.tagName.toLowerCase() === 'img';
    const src = isImg ? el.src : (el.style.backgroundImage?.match(/url\((['"]?)([^'")]+)\1\)/)?.[2] ?? null);
    return {
      tag: el.tagName.toLowerCase(),
      src: src?.slice(0, 120) || null,
      alt: el.alt || null,
      isUnsplash: !!src?.includes('unsplash.com'),
      dataImgSource: el.dataset?.imgSource || null,
      dataImgSlotId: el.dataset?.imgSlotId || null,
      loading: el.loading || null,
    };
  });

  // Button audit — count primary + secondary; check they share recipes
  const primaryBtns = document.querySelectorAll('.btn--primary, .ds-btn--primary, [class*="primary"]');
  const secondaryBtns = document.querySelectorAll('.btn--secondary, .ds-btn--secondary, [class*="secondary"]');

  // Inline link audit — any body-prose <a> that isn't .btn-like
  const links = [...document.querySelectorAll('a')];
  const bodyLinks = links.filter(a => {
    const cl = a.className || '';
    return !cl.includes('btn') && !cl.includes('nav') && a.closest('[data-section]');
  }).slice(0, 10);

  // Typography in use — Google Fonts loaded
  const fontLinks = [...document.querySelectorAll('link[href*="fonts.googleapis.com"]')].map(l => l.href);

  // Colors used (sample primary surfaces)
  const root = getComputedStyle(document.documentElement);
  const cssVars = {};
  for (const v of ['--paper','--ghisa','--ambra','--nebbia','--tank','--rule','--ink','--bg','--accent']) {
    cssVars[v] = root.getPropertyValue(v).trim() || null;
  }

  // Animations / motion — are there continuous CSS animations running?
  const animations = document.getAnimations().map(a => ({
    name: a.animationName || a.id || a.constructor.name,
    playState: a.playState,
    target: a.effect?.target?.tagName?.toLowerCase() || null,
  }));

  // Section padding sample — confirms density school applied
  const heroPad = (() => {
    const hero = document.querySelector('[data-section="hero"]');
    if (!hero) return null;
    const s = getComputedStyle(hero);
    return { paddingTop: s.paddingTop, paddingBottom: s.paddingBottom };
  })();

  return {
    sectionsCount: sections.length,
    sections,
    beersFound,
    beersMissing: ELEVEN.filter(n => !beersFound.some(b => b === n || b.startsWith(n))).filter((v,i,a)=>a.indexOf(v)===i),
    phrasesFound,
    phrasesMissing,
    antiHits,
    imageCount: images.length,
    imageAudit,
    primaryBtnCount: primaryBtns.length,
    secondaryBtnCount: secondaryBtns.length,
    bodyLinksSample: bodyLinks.map(a => ({ text: a.textContent?.trim()?.slice(0, 60), href: a.href?.slice(0, 80), className: a.className })),
    fontLinks,
    cssVars,
    activeAnimations: animations.length,
    animationsSample: animations.slice(0, 8),
    heroPad,
    bodyLength: bodyText.length,
  };
});

await fs.writeFile(`${OUT_DIR}/digest.json`, JSON.stringify(digest, null, 2));

// 4. Mobile screenshot
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT_DIR}/mobile-full.png`, fullPage: true });
await page.screenshot({ path: `${OUT_DIR}/mobile-fold.png`, fullPage: false });

// 5. Capture per-section screenshots at desktop
await page.setViewportSize({ width: 1440, height: 900 });
await page.waitForTimeout(300);
const sectionLocators = await page.$$('[data-section]');
for (let i = 0; i < sectionLocators.length; i++) {
  const role = await sectionLocators[i].getAttribute('data-section');
  try {
    await sectionLocators[i].screenshot({ path: `${OUT_DIR}/section-${String(i).padStart(2, '0')}-${role}.png` });
  } catch (e) {
    console.log(`  could not screenshot section ${role}: ${e.message}`);
  }
}

await browser.close();

// Print compact summary
console.log('---');
console.log(`sections: ${digest.sectionsCount}`);
console.log(`beers found: ${digest.beersFound.length} / 11`);
console.log(`  missing: ${digest.beersMissing.length ? digest.beersMissing.join(', ') : 'none'}`);
console.log(`required phrases found: ${digest.phrasesFound.length} / 8`);
console.log(`  missing: ${digest.phrasesMissing.length ? digest.phrasesMissing.join(' | ') : 'none'}`);
console.log(`anti-pattern hits: ${digest.antiHits.length ? digest.antiHits.join(', ') : 'NONE (clean)'}`);
console.log(`images: ${digest.imageCount} (unsplash: ${digest.imageAudit.filter(i => i.isUnsplash).length})`);
console.log(`primary buttons: ${digest.primaryBtnCount}, secondary: ${digest.secondaryBtnCount}`);
console.log(`fontLinks:`); for (const f of digest.fontLinks) console.log(`  ${f.slice(0, 100)}`);
console.log(`cssVars:`); for (const [k,v] of Object.entries(digest.cssVars)) if (v) console.log(`  ${k}: ${v}`);
console.log(`activeAnimations: ${digest.activeAnimations}`);
console.log(`heroPad: ${JSON.stringify(digest.heroPad)}`);
console.log(`bodyLinks sample: ${digest.bodyLinksSample.length}`);
console.log(`---`);
console.log(`screenshots → ${OUT_DIR}/`);
