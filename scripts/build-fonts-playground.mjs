import fs from 'fs/promises';
import path from 'path';

const catalog = JSON.parse(await fs.readFile('scripts/catalog-fonts.json', 'utf8'));

// Collect every font name used across all surfaced pairings.
const fontSet = new Set();
for (const it of catalog.intents) {
  for (const p of it.pairings) {
    fontSet.add(p.display);
    fontSet.add(p.body);
  }
}
const fonts = [...fontSet].sort();
console.log(`surfaced pairings need ${fonts.length} unique fonts`);

// Build Google Fonts CSS @import for all of them. Request 400 and 700 to cover body + display.
function gfFamily(name) {
  return name.replace(/ /g, '+');
}
const familyParams = fonts.map(f => `family=${gfFamily(f)}:wght@400;500;700`).join('&');
const gfImport = `https://fonts.googleapis.com/css2?${familyParams}&display=swap`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>nebula · font pair catalog</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${gfImport}">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0e0f12; --panel:#15171c; --panel-2:#1d1f26;
    --line:#2a2d35; --line-soft:#1f2229;
    --text:#e6e6ea; --text-mute:#8e92a0; --text-dim:#5a5e6c;
    --accent:#7a9eff; --pos:#5fd6a4;
    --shadow:0 10px 30px rgba(0,0,0,.45);
    --font-ui:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;
    --font-mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
    /* Canonical mock palette — type carries the card, color is neutral */
    --paper:#F6F2EA; --ink:#1A1815; --mute:#7C766C; --rule:#D9D2C5; --spark:#B14A39;
  }
  html,body{height:100%}
  body{background:var(--bg);color:var(--text);font-family:var(--font-ui);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}
  .app{display:grid;grid-template-columns:240px 1fr;min-height:100vh}
  .sidebar{position:sticky;top:0;align-self:start;height:100vh;background:var(--panel);border-right:1px solid var(--line);display:flex;flex-direction:column;overflow:hidden}
  .brand{padding:18px 18px 12px;border-bottom:1px solid var(--line-soft)}
  .brand h1{font-size:14px;font-weight:600;letter-spacing:.02em}
  .brand .sub{font-size:11px;color:var(--text-mute);margin-top:2px;line-height:1.4}
  .intent-list{flex:1;overflow-y:auto;padding:8px 0}
  .intent-link{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 18px;font-size:12.5px;color:var(--text-mute);cursor:pointer;border-left:2px solid transparent;transition:color .15s,background .15s}
  .intent-link:hover{color:var(--text);background:rgba(255,255,255,.02)}
  .intent-link.has-picks{color:var(--text)}
  .intent-link .count{font-family:var(--font-mono);font-size:11px;color:var(--text-dim);padding:2px 6px;border-radius:999px;border:1px solid var(--line);min-width:34px;text-align:center}
  .intent-link.has-picks .count{color:var(--pos);border-color:rgba(95,214,164,.35)}
  .sidebar-foot{padding:14px 18px;border-top:1px solid var(--line-soft);font-size:11px;color:var(--text-dim);line-height:1.5}
  .main{padding:0 28px 80px}
  .topbar{position:sticky;top:0;z-index:20;background:rgba(14,15,18,.85);backdrop-filter:blur(12px);display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 0;margin-bottom:8px;border-bottom:1px solid var(--line-soft)}
  .topbar .stats{font-size:13px;color:var(--text-mute)}
  .topbar .stats strong{color:var(--text);font-weight:600}
  .btn{background:var(--accent);color:#0e0f12;border:none;border-radius:8px;padding:9px 14px;font:600 12.5px/1 var(--font-ui);letter-spacing:.01em;cursor:pointer;transition:filter .12s,transform .12s}
  .btn:hover{filter:brightness(1.08)}
  .btn:active{transform:translateY(1px)}
  .btn-ghost{background:transparent;color:var(--text-mute);border:1px solid var(--line)}
  .btn-ghost:hover{color:var(--text);border-color:var(--text-dim)}
  .intent{padding:32px 0 8px;scroll-margin-top:72px}
  .intent h2{font-size:20px;font-weight:600;letter-spacing:-.01em}
  .intent .blurb{color:var(--text-mute);font-size:13px;margin-top:4px;max-width:60ch}
  .intent .meta{margin-top:6px;font-size:11.5px;color:var(--text-dim);font-family:var(--font-mono);letter-spacing:.02em}
  .pair-grid{margin-top:18px;display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:14px}
  /* Pair card */
  .pcard{
    position:relative;border-radius:12px;overflow:hidden;
    background:var(--paper);color:var(--ink);
    border:2px solid transparent;cursor:pointer;
    transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;
    box-shadow:0 1px 0 rgba(0,0,0,.05),0 6px 18px rgba(0,0,0,.20);
  }
  .pcard:hover{transform:translateY(-2px);box-shadow:0 1px 0 rgba(0,0,0,.05),0 12px 30px rgba(0,0,0,.28)}
  .pcard.picked{border-color:var(--pos);box-shadow:0 0 0 1px rgba(95,214,164,.4),0 12px 30px rgba(0,0,0,.30)}
  .pcard .pcheck{position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;background:#fff;color:#0e0f12;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;line-height:1;box-shadow:0 1px 3px rgba(0,0,0,.2);opacity:0;transform:scale(.85);transition:opacity .15s,transform .15s;z-index:3;pointer-events:none}
  .pcard.picked .pcheck{opacity:1;transform:scale(1);background:var(--pos)}
  .pmock{padding:22px 22px 18px;display:flex;flex-direction:column;gap:12px}
  .peyebrow{
    display:inline-flex;align-self:flex-start;
    font-size:10.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;
    padding:3px 8px;border-radius:0;color:var(--spark);
    border-bottom:1.5px solid var(--spark);
  }
  .pheading{font-size:34px;font-weight:600;line-height:1.1;letter-spacing:-.015em;color:var(--ink)}
  .pbody{font-size:14.5px;line-height:1.6;color:var(--ink)}
  .pquote{
    font-size:16px;font-weight:400;line-height:1.45;color:var(--mute);
    border-left:2px solid var(--rule);padding-left:12px;font-style:italic;
  }
  .pcaption{font-size:11px;color:var(--mute);letter-spacing:.04em;text-transform:uppercase;font-weight:500}
  .pfoot{
    background:#0e0f12;color:var(--text);padding:11px 14px 13px;
    font-size:11px;line-height:1.35;
    display:flex;justify-content:space-between;align-items:flex-end;gap:12px;
  }
  .pfoot .left{display:flex;flex-direction:column;gap:3px}
  .pfoot .pname{font-size:11.5px;color:var(--text);font-weight:600;font-family:var(--font-mono)}
  .pfoot .pmeta{color:var(--text-dim);font-family:var(--font-mono);font-size:10.5px}
  .pfoot .pgenres{display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end}
  .pfoot .pgenre{padding:1px 6px;border:1px solid var(--line);border-radius:4px;color:var(--text-mute);font-family:var(--font-mono);font-size:10px}
  /* Modal */
  .modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:100;padding:24px}
  .modal-bd.open{display:flex}
  .modal{background:var(--panel);border:1px solid var(--line);border-radius:14px;width:min(820px,100%);max-height:88vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--shadow)}
  .modal-head{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line-soft)}
  .modal-head h2{font-size:14px;font-weight:600}
  .modal-head .close{background:transparent;border:none;color:var(--text-mute);font-size:18px;cursor:pointer;padding:4px}
  .modal-head .close:hover{color:var(--text)}
  .modal-body{padding:16px 20px 20px;overflow-y:auto}
  .promptbox{background:#0a0b0e;border:1px solid var(--line);border-radius:10px;padding:14px 16px;font-family:var(--font-mono);font-size:12px;line-height:1.6;color:var(--text);white-space:pre-wrap;word-break:break-word;max-height:60vh;overflow-y:auto}
  .modal-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px 16px;border-top:1px solid var(--line-soft)}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--pos);color:#0e0f12;padding:8px 14px;border-radius:999px;font-size:12.5px;font-weight:600;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;z-index:200}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <h1>nebula · font pairs</h1>
      <div class="sub">${catalog.intents.length} intents × ${catalog.intents[0].pairings.length} pairings sourced from Fontpair.co (all Google Fonts). Click cards to select. Copy prompt back to Claude when done.</div>
    </div>
    <nav class="intent-list" id="intentList"></nav>
    <div class="sidebar-foot">Source: fontpair.co/all + fontpair.co/fonts/google/&lt;slug&gt;<br>${catalog._meta.source.uniquePairs} unique pairings scraped across ${catalog._meta.source.slugsAttempted} popular Google Fonts. ${fonts.length} font families loaded.</div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div class="stats"><strong id="picked-count">0</strong> pairings selected across <strong id="intents-touched">0</strong> intents</div>
      <div style="display:flex;gap:8px">
        <button class="btn-ghost btn" id="reset-btn">Reset</button>
        <button class="btn" id="copy-btn">Copy prompt</button>
      </div>
    </div>
    <div id="intents"></div>
  </main>
</div>

<div class="modal-bd" id="modal-bd">
  <div class="modal">
    <div class="modal-head">
      <h2>Prompt for Claude</h2>
      <button class="close" id="modal-close">×</button>
    </div>
    <div class="modal-body">
      <div class="promptbox" id="promptbox"></div>
    </div>
    <div class="modal-foot">
      <button class="btn-ghost btn" id="modal-close-2">Close</button>
      <button class="btn" id="copy-now-btn">Copy to clipboard</button>
    </div>
  </div>
</div>

<div class="toast" id="toast">Copied to clipboard</div>

<script>
const CATALOG = ${JSON.stringify(catalog)};
const STORAGE_KEY = 'nebula-fonts-picks';

const state = { picks: new Map() };

try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const obj = JSON.parse(raw);
    for (const k of obj) state.picks.set(k, true);
  }
} catch (e) {}

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.picks.keys()])); } catch (e) {}
}

function pairKey(intentId, display, body) {
  return intentId + '|' + display + ' + ' + body;
}
function pickedCountForIntent(intentId) {
  let n = 0; for (const k of state.picks.keys()) if (k.startsWith(intentId + '|')) n++; return n;
}
function totalPicked() { return state.picks.size; }
function intentsTouched() {
  const seen = new Set();
  for (const k of state.picks.keys()) seen.add(k.split('|')[0]);
  return seen.size;
}

function makeMock(p) {
  return \`<div class="pmock">
    <span class="peyebrow" style="font-family:'\${p.body}',sans-serif">— Field notes</span>
    <div class="pheading" style="font-family:'\${p.display}',serif">A composed page begins with type.</div>
    <div class="pbody" style="font-family:'\${p.body}',sans-serif">The display sets the tone in one breath; the body sustains it across the page. A good pair makes each one work harder by being unmistakably itself.</div>
    <div class="pquote" style="font-family:'\${p.body}',sans-serif">"Type is a beam of thought you can hold in your hand."</div>
    <div class="pcaption" style="font-family:'\${p.body}',sans-serif">Issue 14 · Spring</div>
  </div>\`;
}

function makeCard(intentId, p) {
  const key = pairKey(intentId, p.display, p.body);
  const isPicked = state.picks.has(key);
  return \`<div class="pcard \${isPicked ? 'picked' : ''}" data-intent="\${intentId}" data-key="\${key}">
    <div class="pcheck">✓</div>
    \${makeMock(p)}
    <div class="pfoot">
      <div class="left">
        <div class="pname">\${p.display} · \${p.body}</div>
        <div class="pmeta">display · body</div>
      </div>
      <div class="pgenres">
        <span class="pgenre">\${p.displayGenre}</span>
        <span class="pgenre">\${p.bodyGenre}</span>
      </div>
    </div>
  </div>\`;
}

function renderSidebar() {
  const list = document.getElementById('intentList');
  list.innerHTML = CATALOG.intents.map(it => {
    const n = pickedCountForIntent(it.id);
    return \`<a class="intent-link \${n > 0 ? 'has-picks' : ''}" href="#sec-\${it.id}">
      <span>\${it.name}</span>
      <span class="count">\${n}/10</span>
    </a>\`;
  }).join('');
}
function renderMain() {
  const main = document.getElementById('intents');
  main.innerHTML = CATALOG.intents.map(it => \`
    <section class="intent" id="sec-\${it.id}">
      <h2>\${it.name}</h2>
      <div class="blurb">\${it.blurb}</div>
      <div class="meta">\${it.pairings.length} pairings · click to select</div>
      <div class="pair-grid">\${it.pairings.map(p => makeCard(it.id, p)).join('')}</div>
    </section>
  \`).join('');
}
function renderStats() {
  document.getElementById('picked-count').textContent = totalPicked();
  document.getElementById('intents-touched').textContent = intentsTouched();
}
function renderAll() { renderSidebar(); renderMain(); renderStats(); }

renderAll();

document.addEventListener('click', (e) => {
  const card = e.target.closest('.pcard');
  if (!card) return;
  const key = card.dataset.key;
  if (state.picks.has(key)) state.picks.delete(key);
  else state.picks.set(key, true);
  card.classList.toggle('picked');
  const intentId = card.dataset.intent;
  const link = document.querySelector('.intent-link[href="#sec-' + intentId + '"]');
  const n = pickedCountForIntent(intentId);
  link.querySelector('.count').textContent = n + '/10';
  link.classList.toggle('has-picks', n > 0);
  renderStats();
  persist();
});

function buildPrompt() {
  if (state.picks.size === 0) {
    return '# No font pairings selected yet.\\nGo back and click some pairings — the prompt will fill in here.';
  }
  const picksByIntent = new Map();
  for (const k of state.picks.keys()) {
    const [intentId, label] = k.split('|');
    if (!picksByIntent.has(intentId)) picksByIntent.set(intentId, []);
    picksByIntent.get(intentId).push(label);
  }
  let out = '';
  out += 'I selected ' + state.picks.size + ' font pairings from the nebula Fontpair catalog (' + picksByIntent.size + ' intents covered). Please append each to skills/direct/reference/curated-pools/typefaces.md as a new T<n> entry, following the schema defined at the top of that file.\\n\\n';
  out += 'For each pairing:\\n';
  out += '  • **Display.** Named Google Font + a defendable weight strategy (e.g., 700 for hero, 600 for sub-display).\\n';
  out += '  • **Body.** Named Google Font + body and emphasis weights (400 / 500 typically, 700 for inline strong).\\n';
  out += '  • **Scale.** Pick a type ratio per the pair character: 1.25 for utilitarian pairs, 1.333 for editorial sans/serif mixes, 1.414+ for display-led pairs. Justify in one sentence.\\n';
  out += '  • **Fits.** Use the intents I selected the pair for + any anchor-family adjacency from the genres.\\n';
  out += '  • **Avoid for.** Complement of fits; be specific.\\n';
  out += '  • **Source / CDN.** Both fonts are Google Fonts; include the exact <link> tag with the weights you actually call up.\\n\\n';
  out += '## Selected pairings\\n\\n';
  for (const intentId of picksByIntent.keys()) {
    const intent = CATALOG.intents.find(i => i.id === intentId);
    out += '### Intent: ' + intent.name + ' (\`' + intentId + '\`)\\n\\n';
    for (const label of picksByIntent.get(intentId)) {
      const [display, body] = label.split(' + ');
      const p = intent.pairings.find(pp => pp.display === display && pp.body === body);
      out += '- **' + display + ' & ' + body + '**  \\n';
      out += '  Genres: \`' + p.displayGenre + '\` (display) · \`' + p.bodyGenre + '\` (body)\\n\\n';
    }
  }
  return out;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1600);
}
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied · paste back to Claude');
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Copied · paste back to Claude');
  }
}

const modalBd = document.getElementById('modal-bd');
const promptbox = document.getElementById('promptbox');
document.getElementById('copy-btn').addEventListener('click', () => {
  promptbox.textContent = buildPrompt();
  modalBd.classList.add('open');
});
document.getElementById('modal-close').addEventListener('click', () => modalBd.classList.remove('open'));
document.getElementById('modal-close-2').addEventListener('click', () => modalBd.classList.remove('open'));
modalBd.addEventListener('click', (e) => { if (e.target === modalBd) modalBd.classList.remove('open'); });
document.getElementById('copy-now-btn').addEventListener('click', () => copyToClipboard(promptbox.textContent));
document.getElementById('reset-btn').addEventListener('click', () => {
  if (state.picks.size === 0) return;
  if (!confirm('Clear all ' + state.picks.size + ' selections?')) return;
  state.picks.clear();
  persist();
  renderAll();
});
</script>
</body>
</html>
`;

const outDir = 'nebula/proposals';
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, 'fonts-playground.html');
await fs.writeFile(outPath, html);
const stats = await fs.stat(outPath);
console.log(`wrote ${outPath}  (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`embedded: ${catalog.intents.length} intents × ${catalog.intents[0].pairings.length} pairings`);
console.log(`fonts in the Google Fonts request: ${fonts.length}`);
