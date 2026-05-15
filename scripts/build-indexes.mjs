// Build sidecar .index.json files for every nebula pool / library.
//
// Each pool's markdown is the source of truth; the index is generated.
// `direct` reads the index for fast filtering (anchor-family fits,
// tech-budget tiers, computed stats), then reads only the top-k full
// entries from the markdown.
//
// Re-run after editing any pool:
//   node scripts/build-indexes.mjs

import fs from 'fs/promises';
import path from 'path';

// -----------------------------------------------------------------------------
// Pools
// -----------------------------------------------------------------------------

const POOLS = [
  // Curated axis pools (direct's 5 axes)
  { name: 'typefaces', file: 'skills/direct/reference/curated-pools/typefaces.md',  idPattern: /^## (T\d+)\s+—\s+(.+)$/m, extras: 'typefaces'  },
  // Palettes use a dual-prefix ID scheme (pd-* dual-anchor, fm-* free-mode); see palettes.md.
  { name: 'palettes',  file: 'skills/direct/reference/curated-pools/palettes.md',   idPattern: /^## ((?:pd|fm)-[\w-]+)\s+—\s+(.+)$/m, extras: 'palettes'   },
  { name: 'density',   file: 'skills/direct/reference/curated-pools/density.md',    idPattern: /^## (D\d+)\s+—\s+(.+)$/m, extras: 'density'    },
  { name: 'motion',    file: 'skills/direct/reference/curated-pools/motion.md',     idPattern: /^## (V\d+)\s+—\s+(.+)$/m, extras: 'motion'     },
  { name: 'edges',     file: 'skills/direct/reference/curated-pools/edges.md',      idPattern: /^## (E\d+)\s+—\s+(.+)$/m, extras: 'edges'      },
  // Recipe libraries (consumed by direct's Phase 4 / 4b / 4d / 4e)
  // Moves use letter-suffixed IDs (M6a / M6b) for sibling variants of the same move family.
  { name: 'moves',      file: 'skills/nebula/reference/moves-library.md', idPattern: /^## (M\d+[a-z]?)\s+—\s+(.+)$/m, extras: 'moves'      },
  { name: 'signatures', file: 'skills/nebula/reference/signatures.md',    idPattern: /^## (S\d+)\s+—\s+(.+)$/m, extras: 'signatures' },
  { name: 'hovers',     file: 'skills/nebula/reference/hovers.md',        idPattern: /^## (H\d+)\s+—\s+(.+)$/m, extras: 'hovers'     },
  { name: 'buttons',    file: 'skills/nebula/reference/buttons.md',       idPattern: /^## (B\d+)\s+—\s+(.+)$/m, extras: 'buttons'    },
  { name: 'links',      file: 'skills/nebula/reference/links.md',         idPattern: /^## (L\d+)\s+—\s+(.+)$/m, extras: 'links'      },
];

// -----------------------------------------------------------------------------
// Intent term mapping
// -----------------------------------------------------------------------------
// Maps the prose names anchored in pool entries' Fits/Avoid sections to
// canonical nebula intent IDs.

const INTENT_TERMS = [
  ['trust-fintech',     ['trust-led b2b', 'fintech', 'trust-led']],
  ['editorial',         ['editorial / publication', 'editorial /', 'editorial-revival', 'editorial']],
  ['brutalist',         ['brutalist statement', 'brutalist']],
  ['quiet-craft',       ['quiet craft / atelier', 'quiet craft', 'atelier']],
  ['vibrant-playful',   ['vibrant consumer / playful', 'vibrant consumer', 'vibrant', 'playful']],
  ['clinical',          ['healthcare clinical', 'healthcare', 'clinical']],
  ['civic',             ['civic / institutional', 'civic-institutional', 'civic-modern', 'civic']],
  ['luxury-fashion',    ['luxury fashion / fragrance', 'luxury fashion', 'luxury / fragrance', 'luxury']],
  ['indie-game',        ['indie game / playful tech', 'indie game']],
  ['documentary',       ['documentary / journalism', 'documentary']],
  ['architecture',      ['architecture firm', 'architecture']],
  ['hospitality',       ['restaurant / hospitality', 'hospitality']],
  ['outdoor-adventure', ['outdoor / adventure', 'outdoor', 'adventure']],
  ['sustainable-eco',   ['sustainable / eco', 'sustainable', 'eco']],
  ['tech-research',     ['tech research / academic', 'tech research', 'academic']],
  ['music-label',       ['music label', 'music / record label', 'record label']],
  ['cinematic',         ['cinema / film', 'cinematic', 'cinema']],
  ['wine-spirits',      ['wine / spirits', 'wine']],
  ['athletic',          ['sports / athletic', 'athletic', 'sports']],
  ['boutique-hotel',    ['boutique hotel']],
];

function matchIntents(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  const seen = new Set();
  for (const [key, terms] of INTENT_TERMS) {
    if (terms.some(t => lower.includes(t.toLowerCase()))) seen.add(key);
  }
  return [...seen];
}

// -----------------------------------------------------------------------------
// Generic markdown helpers
// -----------------------------------------------------------------------------

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function anchorFor(id, name) {
  // Matches GitHub markdown auto-generated anchors. The em-dash collapses
  // to "" but the surrounding spaces collapse to a single dash.
  return slugify(`${id} ${name}`);
}

// Extract the text body of a labelled markdown field:
//   **Fieldname.** value text ... (until next **Field.** or <!-- or end)
function field(body, fieldName) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\*\\*${escaped}\\.\\*\\*\\s*([\\s\\S]+?)(?=\\n\\s*\\*\\*[A-Z]|\\n\\s*<!--|\\n\\s*##|$)`, 'i');
  const m = body.match(re);
  return m ? m[1].trim() : null;
}

// Extract the first backtick-quoted value from a string.
function firstBacktickValue(text) {
  if (!text) return null;
  const m = text.match(/`([^`]+)`/);
  return m ? m[1] : null;
}

// Parse entries: split body by an H2 heading matching the pool's idPattern; skip schema example.
function parseEntries(md, idPattern) {
  // Promote single-pattern to global for matchAll.
  const flags = idPattern.flags.replace('m', '') + 'gm';
  const re = new RegExp(idPattern.source, flags);
  const positions = [];
  let m;
  while ((m = re.exec(md)) !== null) {
    positions.push({ index: m.index, id: m[1], name: m[2].trim() });
  }
  const entries = [];
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].index;
    const end = i + 1 < positions.length ? positions[i + 1].index : md.length;
    entries.push({ id: positions[i].id, name: positions[i].name, body: md.slice(start, end) });
  }
  // Filter schema-example sentinels (defensive — shouldn't appear with strict regex)
  return entries.filter(e => !/<name>|<n>|<id>/.test(e.name));
}

// -----------------------------------------------------------------------------
// Pool-specific extras extractors
// -----------------------------------------------------------------------------

function extrasForTypefaces(body) {
  // **Display.** `Montserrat` (geometric-sans). 500 for ...
  // **Body.** `Google Sans` (geometric-sans). 400 for body, ...
  // **Scale.** `1.25` — utilitarian ratio — ...
  const display = body.match(/\*\*Display\.\*\*\s*`([^`]+)`\s*\(([^)]+)\)/);
  const body2 = body.match(/\*\*Body\.\*\*\s*`([^`]+)`\s*\(([^)]+)\)/);
  const scale = body.match(/\*\*Scale\.\*\*\s*`([0-9.]+)`/);
  return {
    display: display ? { name: display[1], genre: display[2].trim() } : null,
    body:    body2   ? { name: body2[1],   genre: body2[2].trim()   } : null,
    scale:   scale   ? parseFloat(scale[1]) : null,
  };
}

function extrasForPalettes(body) {
  // v2 schema (2026-05-15): dual-anchor pool. Substrate is a separate axis
  // with two fixed values (light #F4F1E6 / dark #0F1216). Each palette
  // entry carries an anchorMode (dual = 3 accents | free = 5 accents),
  // an intensity tag, and an accents list with named roles.
  const anchorMode = (fieldShortest(body, 'Anchor mode') || '').toLowerCase().replace(/\s*\(.*$/, '').trim() || null;
  const intensity  = (fieldShortest(body, 'Intensity')  || '').toLowerCase().trim() || null;

  // Accents block — looks like:
  //   - `primary`        · `#048090` — confident teal
  //   - `divider`        · `#456990` — slate
  const accentsBlock = body.match(/\*\*Accents\.\*\*\s*([\s\S]+?)(?=\n\s*\*\*[A-Z]|<!--)/);
  const accents = [];
  if (accentsBlock) {
    const lineRe = /-\s*`([\w-]+)`\s*·\s*`(#[0-9a-fA-F]{6})`(?:\s*—\s*(.+))?/g;
    let m;
    while ((m = lineRe.exec(accentsBlock[1])) !== null) {
      accents.push({
        role: m[1],
        hex: m[2].toUpperCase(),
        note: m[3]?.trim() || null,
      });
    }
  }

  return {
    anchorMode,
    intensity,
    accents,
    accentCount: accents.length,
  };
}

function extrasForDensity(body) {
  // **Section padding.** \n  - desktop: `84px`
  // **Line-height for body / display.** \n  - body: `1.55` ...
  // **Type scale.** \n - ratio: `1.5` ...
  // etc.
  const padMatch = body.match(/desktop:\s*`([0-9]+)px`/);
  const lhBody   = body.match(/body:\s*`([0-9.]+)`/);
  const lhDisp   = body.match(/display:\s*`([0-9.]+)`/);
  const ratioM   = body.match(/ratio:\s*`([0-9.]+)`/);
  const baseM    = body.match(/base body:\s*`([0-9.]+)px`/);
  const rhythmM  = body.match(/Inter-element spacing.*?`([0-9]+)px`/s);
  const contM    = body.match(/container max-width:\s*`([0-9]+)px`/);
  const gridM    = body.match(/grid gap:\s*`([0-9]+)px`/);
  return {
    values: {
      pad:       padMatch  ? parseFloat(padMatch[1])  : null,
      lhBody:    lhBody    ? parseFloat(lhBody[1])    : null,
      lhDisplay: lhDisp    ? parseFloat(lhDisp[1])    : null,
      scale:     ratioM    ? parseFloat(ratioM[1])    : null,
      base:      baseM     ? parseFloat(baseM[1])     : null,
      rhythm:    rhythmM   ? parseFloat(rhythmM[1])   : null,
      container: contM     ? parseFloat(contM[1])     : null,
      gridGap:   gridM     ? parseFloat(gridM[1])     : null,
    },
  };
}

function extrasForMotion(body) {
  return {
    trigger:  fieldShortest(body, 'Trigger discipline'),
    easing:   fieldShortest(body, 'Easing character'),
    duration: fieldShortest(body, 'Duration character'),
  };
}

function extrasForEdges(body) {
  // Parse the **Radii.** list
  const radiiBlock = body.match(/\*\*Radii\.\*\*\s*([\s\S]+?)(?=\n\s*\*\*[A-Z]|<!--)/);
  const radii = {};
  if (radiiBlock) {
    const re = /-\s*(\w+):\s*`([^`]+)`/g;
    let m;
    while ((m = re.exec(radiiBlock[1])) !== null) {
      radii[m[1]] = m[2];
    }
  }
  return { radii };
}

function extrasForMoves(body) {
  // Family from heading-context; pairsWith from prose
  const pairsField = field(body, 'Pairs with') || '';
  const pairsRe = /\b(M\d+|S\d+)\b/g;
  const pairs = [...new Set([...pairsField.matchAll(pairsRe)].map(m => m[1]))];
  // Pitfalls reference
  const pitfallsField = field(body, 'Pitfalls') || '';
  const pitfalls = [...new Set([...pitfallsField.matchAll(/Pitfall\s+([A-Z])/g)].map(m => m[1]))];
  // Use-when intents
  const useWhen = matchIntents(field(body, 'Use when') || '');
  return { useWhen, pairsWith: pairs, pitfalls };
}

function extrasForSignatures(body) {
  const sectionRole = stripTrailingDot(fieldShortest(body, 'Section role'));
  const techStack   = stripTrailingDot(fieldShortest(body, 'Tech stack'));
  const fitsRaw     = field(body, 'Anchor families that earn it') || '';
  const antiPairsField = field(body, 'Anti-pairs') || '';
  const antiPairs = [...new Set([...antiPairsField.matchAll(/\bV\d+/g)].map(m => m[0]))];
  const specimen = (field(body, 'Specimen') || '').trim();
  const specimenStatus = specimen.includes('external-only') ? 'external-only' : 'local';
  return {
    sectionRole,
    techStack,
    fits: matchIntents(fitsRaw),
    antiPairs,
    specimenStatus,
    specimen: specimenStatus === 'local'
      ? (specimen.match(/`([^`]+)`/)?.[1] ?? null)
      : null,
  };
}

function extrasForHovers(body) {
  const appliedToField = field(body, 'Applied to') || '';
  const appliedTo = [...new Set([...appliedToField.matchAll(/\b(M\d+|S\d+)\b/g)].map(m => m[1]))];
  const techStack = stripTrailingDot(fieldShortest(body, 'Tech stack'));
  const trigger = stripTrailingDot(fieldShortest(body, 'Trigger'));
  const specimen = (field(body, 'Specimen') || '').trim();
  const specimenStatus = specimen.includes('external-only') ? 'external-only' : 'local';
  return {
    appliedTo,
    techStack,
    trigger,
    specimenStatus,
    specimen: specimenStatus === 'local'
      ? (specimen.match(/`([^`]+)`/)?.[1] ?? null)
      : null,
  };
}

function extrasForButtons(body) {
  const techStackRaw = fieldShortest(body, 'Tech stack');
  const trigger = stripTrailingDot(fieldShortest(body, 'Trigger'));
  // Derive tier from tech stack
  let tier = 'css-only';
  if (/Canvas|webgl|three\.js|GLSL|shader/i.test(techStackRaw || '')) tier = 'canvas-or-webgl';
  else if (/JS|GSAP/i.test(techStackRaw || '')) tier = 'css-plus-js';
  const specimen = (field(body, 'Specimen') || '').trim();
  const specimenStatus =
    specimen.includes('external-only') ? 'external-only'
    : specimen.toLowerCase().startsWith('inline-complete') ? 'inline'
    : 'local';
  return {
    techStack: stripTrailingDot(techStackRaw),
    tier,
    trigger,
    specimenStatus,
  };
}

// Helpers
function round(n, d) { const p = Math.pow(10, d); return Math.round(n * p) / p; }
function stripTrailingDot(s) { return s ? s.replace(/\s*\.\s*$/, '').trim() : s; }
function fieldShortest(body, fieldName) {
  // Stops at first sentence-period or newline — most "tech stack" / "trigger" entries are one line
  const v = field(body, fieldName);
  if (!v) return null;
  const firstLine = v.split('\n')[0].trim();
  // Take up to first period not inside backticks for short fields
  return firstLine;
}

function extrasForLinks(body) {
  // Links are CSS-only universally; trigger is hover for all.
  // Track tech stack (string), trigger (string), specimen status.
  const techStack = stripTrailingDot(fieldShortest(body, 'Tech stack'));
  const trigger   = stripTrailingDot(fieldShortest(body, 'Trigger'));
  const specimen  = (field(body, 'Specimen') || '').trim();
  const specimenStatus = specimen.includes('external-only') ? 'external-only'
                       : specimen.toLowerCase().startsWith('inline-complete') ? 'inline'
                       : 'local';
  return {
    techStack,
    trigger,
    specimenStatus,
  };
}

const EXTRAS = {
  typefaces:  extrasForTypefaces,
  palettes:   extrasForPalettes,
  density:    extrasForDensity,
  motion:     extrasForMotion,
  edges:      extrasForEdges,
  moves:      extrasForMoves,
  signatures: extrasForSignatures,
  hovers:     extrasForHovers,
  buttons:    extrasForButtons,
  links:      extrasForLinks,
};

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function buildIndex(pool) {
  const md = await fs.readFile(pool.file, 'utf8');
  const entries = parseEntries(md, pool.idPattern);

  const extrasFn = EXTRAS[pool.extras];
  const indexed = entries.map(e => {
    const fits  = matchIntents(field(e.body, 'Fits') || '');
    const avoid = matchIntents(field(e.body, 'Avoid for') || '');
    return {
      id: e.id,
      name: e.name,
      anchor: anchorFor(e.id, e.name),
      filePath: pool.file,
      fits,
      avoid,
      ...(extrasFn ? extrasFn(e.body) : {}),
    };
  });
  return indexed;
}

async function main() {
  for (const pool of POOLS) {
    try {
      const entries = await buildIndex(pool);
      const indexPath = pool.file.replace(/\.md$/, '.index.json');
      const payload = {
        _meta: {
          pool: pool.name,
          schemaVersion: 1,
          builtAt: new Date().toISOString(),
          sourceFile: pool.file,
          count: entries.length,
        },
        entries,
      };
      await fs.writeFile(indexPath, JSON.stringify(payload, null, 2));
      console.log(`${pool.name.padEnd(12)} ${entries.length.toString().padStart(3)} entries  →  ${indexPath}`);
    } catch (err) {
      console.error(`${pool.name}: failed — ${err.message}`);
    }
  }
}

await main();
