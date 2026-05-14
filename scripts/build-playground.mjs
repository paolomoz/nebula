import fs from 'fs/promises';
import path from 'path';

const catalog = JSON.parse(await fs.readFile('scripts/catalog.json', 'utf8'));

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>nebula · palette catalog</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0e0f12;
    --panel:#15171c;
    --panel-2:#1d1f26;
    --line:#2a2d35;
    --line-soft:#1f2229;
    --text:#e6e6ea;
    --text-mute:#8e92a0;
    --text-dim:#5a5e6c;
    --accent:#7a9eff;
    --accent-2:#b59cff;
    --pos:#5fd6a4;
    --shadow:0 10px 30px rgba(0,0,0,.45);
    --font-ui:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;
    --font-mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
  }
  html,body{height:100%}
  body{
    background:var(--bg);
    color:var(--text);
    font-family:var(--font-ui);
    font-size:14px;
    line-height:1.5;
    -webkit-font-smoothing:antialiased;
  }
  /* Layout */
  .app{display:grid;grid-template-columns:240px 1fr;min-height:100vh}
  /* Sidebar */
  .sidebar{
    position:sticky;top:0;align-self:start;height:100vh;
    background:var(--panel);border-right:1px solid var(--line);
    display:flex;flex-direction:column;overflow:hidden;
  }
  .brand{padding:18px 18px 12px;border-bottom:1px solid var(--line-soft)}
  .brand h1{font-size:14px;font-weight:600;letter-spacing:.02em}
  .brand .sub{font-size:11px;color:var(--text-mute);margin-top:2px;line-height:1.4}
  .intent-list{flex:1;overflow-y:auto;padding:8px 0}
  .intent-link{
    display:flex;justify-content:space-between;align-items:center;gap:8px;
    padding:8px 18px;font-size:12.5px;color:var(--text-mute);
    cursor:pointer;border-left:2px solid transparent;
    transition:color .15s,border-color .15s,background .15s;
  }
  .intent-link:hover{color:var(--text);background:rgba(255,255,255,.02)}
  .intent-link.has-picks{color:var(--text)}
  .intent-link .count{
    font-family:var(--font-mono);font-size:11px;color:var(--text-dim);
    padding:2px 6px;border-radius:999px;border:1px solid var(--line);
    min-width:34px;text-align:center;
  }
  .intent-link.has-picks .count{color:var(--pos);border-color:rgba(95,214,164,.35)}
  .sidebar-foot{padding:14px 18px;border-top:1px solid var(--line-soft);font-size:11px;color:var(--text-dim);line-height:1.5}
  /* Main */
  .main{padding:0 28px 80px}
  .topbar{
    position:sticky;top:0;z-index:20;background:rgba(14,15,18,.85);backdrop-filter:blur(12px);
    display:flex;justify-content:space-between;align-items:center;gap:12px;
    padding:16px 0;margin-bottom:8px;border-bottom:1px solid var(--line-soft);
  }
  .topbar .stats{font-size:13px;color:var(--text-mute)}
  .topbar .stats strong{color:var(--text);font-weight:600}
  .btn{
    background:var(--accent);color:#0e0f12;border:none;border-radius:8px;
    padding:9px 14px;font:600 12.5px/1 var(--font-ui);letter-spacing:.01em;
    cursor:pointer;transition:transform .12s,filter .12s;
  }
  .btn:hover{filter:brightness(1.08)}
  .btn:active{transform:translateY(1px)}
  .btn-ghost{background:transparent;color:var(--text-mute);border:1px solid var(--line)}
  .btn-ghost:hover{color:var(--text);border-color:var(--text-dim)}
  /* Intent section */
  .intent{padding:32px 0 8px;scroll-margin-top:72px}
  .intent h2{font-size:20px;font-weight:600;letter-spacing:-.01em}
  .intent .blurb{color:var(--text-mute);font-size:13px;margin-top:4px;max-width:60ch}
  .intent .meta{margin-top:6px;font-size:11.5px;color:var(--text-dim);font-family:var(--font-mono);letter-spacing:.02em}
  .palette-grid{
    margin-top:18px;display:grid;
    grid-template-columns:repeat(auto-fill,minmax(280px,1fr));
    gap:14px;
  }
  /* Palette card — mock */
  .pcard{
    --pbg:#fff;--pink:#111;--paccent:#444;--psurface:#eee;--psurface2:#ddd;
    position:relative;border-radius:12px;overflow:hidden;
    background:var(--pbg);color:var(--pink);
    cursor:pointer;
    border:2px solid transparent;
    transition:transform .15s ease,box-shadow .15s ease,border-color .15s ease;
    box-shadow:0 1px 0 rgba(0,0,0,.04),0 6px 18px rgba(0,0,0,.18);
  }
  .pcard:hover{transform:translateY(-2px);box-shadow:0 1px 0 rgba(0,0,0,.04),0 12px 30px rgba(0,0,0,.25)}
  .pcard.picked{border-color:var(--pos);box-shadow:0 0 0 1px rgba(95,214,164,.4),0 12px 30px rgba(0,0,0,.3)}
  .pcard .pcheck{
    position:absolute;top:10px;right:10px;width:22px;height:22px;border-radius:50%;
    background:#fff;color:#0e0f12;display:flex;align-items:center;justify-content:center;
    font-size:13px;font-weight:700;line-height:1;
    box-shadow:0 1px 3px rgba(0,0,0,.2);
    opacity:0;transform:scale(.85);transition:opacity .15s,transform .15s;
    z-index:3;pointer-events:none;
  }
  .pcard.picked .pcheck{opacity:1;transform:scale(1);background:var(--pos)}
  .pmock{padding:20px 18px 14px;min-height:280px;display:flex;flex-direction:column;gap:10px}
  .peyebrow{
    display:inline-flex;align-items:center;align-self:flex-start;
    font-size:10.5px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;
    padding:4px 8px;border-radius:999px;
    background:var(--paccent);color:var(--pbg);
  }
  .pheading{font-size:20px;font-weight:700;line-height:1.15;letter-spacing:-.01em;color:var(--pink)}
  .pbody{font-size:12.5px;line-height:1.55;color:var(--pink);opacity:.78}
  .pbtn-row{display:flex;gap:8px;margin-top:2px}
  .pbtn{
    display:inline-flex;align-items:center;padding:7px 12px;border-radius:7px;
    font-size:11.5px;font-weight:600;letter-spacing:.01em;border:1px solid transparent;
    background:var(--paccent);color:var(--pbg);
  }
  .pbtn.secondary{background:transparent;color:var(--pink);border-color:var(--pink);opacity:.6}
  .psurface{
    background:var(--psurface);color:var(--pink);
    border-radius:8px;padding:10px 12px;font-size:11px;line-height:1.5;
    display:flex;justify-content:space-between;align-items:center;
  }
  .psurface .pdot{width:6px;height:6px;border-radius:50%;background:var(--paccent)}
  .pstrip{display:flex;height:8px}
  .pstrip > div{flex:1}
  .pfoot{
    background:var(--panel);color:var(--text);
    padding:10px 14px 12px;font-size:11px;
  }
  .pfoot .pname{font-size:12px;color:var(--text);font-weight:600;letter-spacing:.005em;line-height:1.3}
  .pfoot .pmeta{margin-top:3px;color:var(--text-dim);font-family:var(--font-mono);font-size:10.5px;display:flex;gap:6px;flex-wrap:wrap}
  .pfoot .pmeta .ptag{padding:1px 6px;border:1px solid var(--line);border-radius:4px;color:var(--text-mute)}
  /* Modal */
  .modal-bd{
    position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;
    z-index:100;padding:24px;
  }
  .modal-bd.open{display:flex}
  .modal{
    background:var(--panel);border:1px solid var(--line);border-radius:14px;
    width:min(820px,100%);max-height:88vh;display:flex;flex-direction:column;overflow:hidden;
    box-shadow:var(--shadow);
  }
  .modal-head{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line-soft)}
  .modal-head h2{font-size:14px;font-weight:600}
  .modal-head .close{background:transparent;border:none;color:var(--text-mute);font-size:18px;cursor:pointer;padding:4px}
  .modal-head .close:hover{color:var(--text)}
  .modal-body{padding:16px 20px 20px;overflow-y:auto}
  .promptbox{
    background:#0a0b0e;border:1px solid var(--line);border-radius:10px;
    padding:14px 16px;font-family:var(--font-mono);font-size:12px;line-height:1.6;
    color:var(--text);white-space:pre-wrap;word-break:break-word;
    max-height:60vh;overflow-y:auto;
  }
  .modal-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px 16px;border-top:1px solid var(--line-soft)}
  /* Misc */
  .empty{padding:40px 0;color:var(--text-dim);font-style:italic}
  .toast{
    position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(16px);
    background:var(--pos);color:#0e0f12;padding:8px 14px;border-radius:999px;
    font-size:12.5px;font-weight:600;
    opacity:0;transition:opacity .2s,transform .2s;
    pointer-events:none;z-index:200;
  }
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  /* Sticky reset row */
  .reset-row{display:flex;gap:8px;align-items:center}
</style>
</head>
<body>
<div class="app">
  <aside class="sidebar">
    <div class="brand">
      <h1>nebula · palettes</h1>
      <div class="sub">${catalog.intents.length} intents × ${catalog.intents[0].palettes.length} palettes from Coolors. Click cards to select. Copy the prompt back to Claude when done.</div>
    </div>
    <nav class="intent-list" id="intentList"></nav>
    <div class="sidebar-foot">Source: coolors.co/palettes/popular/&lt;tag&gt;<br>${catalog._meta.source.paletteCount} palettes scraped, ${catalog.intents.length * 10} surfaced here.</div>
  </aside>

  <main class="main">
    <div class="topbar">
      <div class="stats"><strong id="picked-count">0</strong> palettes selected across <strong id="intents-touched">0</strong> intents</div>
      <div class="reset-row">
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
const STORAGE_KEY = 'nebula-palette-picks';

// state: map of "intentId|hexkey" -> true
const state = { picks: new Map() };

// hydrate
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

function paletteKey(intentId, hex) {
  return intentId + '|' + hex.join('-');
}

function pickedCountForIntent(intentId) {
  let n = 0;
  for (const k of state.picks.keys()) if (k.startsWith(intentId + '|')) n++;
  return n;
}

function totalPicked() {
  return state.picks.size;
}

function intentsTouched() {
  const seen = new Set();
  for (const k of state.picks.keys()) seen.add(k.split('|')[0]);
  return seen.size;
}

function makeMock(p) {
  const bg = '#' + p.roles.bg;
  const ink = '#' + p.roles.ink;
  const accent = '#' + p.roles.accent;
  const surface1 = '#' + p.roles.surface1;
  const surface2 = '#' + p.roles.surface2;
  const strip = p.hex.map(h => '<div style="background:#' + h + '"></div>').join('');
  return \`<div class="pmock" style="--pbg:\${bg};--pink:\${ink};--paccent:\${accent};--psurface:\${surface1};--psurface2:\${surface2};background:\${bg};color:\${ink}">
    <span class="peyebrow">— New release</span>
    <div class="pheading">A composed page<br>begins with color.</div>
    <div class="pbody">Calm body text sits against the background while the accent fires for one important action below.</div>
    <div class="pbtn-row">
      <span class="pbtn">Get started</span>
      <span class="pbtn secondary">Read more</span>
    </div>
    <div class="psurface" style="background:\${surface1};color:\${ink}">
      <span>Card surface · subtitle</span>
      <span class="pdot" style="background:\${accent}"></span>
    </div>
    <div style="flex:1"></div>
    <div class="pstrip">\${strip}</div>
  </div>\`;
}

function makeCard(intentId, p) {
  const key = paletteKey(intentId, p.hex);
  const isPicked = state.picks.has(key);
  const tagText = (p.tags || []).slice(0, 4).map(t => '<span class="ptag">' + t + '</span>').join('');
  return \`<div class="pcard \${isPicked ? 'picked' : ''}" data-intent="\${intentId}" data-key="\${key}">
    <div class="pcheck">✓</div>
    \${makeMock(p)}
    <div class="pfoot">
      <div class="pname">\${p.name}</div>
      <div class="pmeta">\${tagText}</div>
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
      <div class="meta">\${it.palettes.length} palettes · click to select</div>
      <div class="palette-grid">\${it.palettes.map(p => makeCard(it.id, p)).join('')}</div>
    </section>
  \`).join('');
}

function renderStats() {
  document.getElementById('picked-count').textContent = totalPicked();
  document.getElementById('intents-touched').textContent = intentsTouched();
}

function renderAll() {
  renderSidebar();
  renderMain();
  renderStats();
}

renderAll();

document.addEventListener('click', (e) => {
  const card = e.target.closest('.pcard');
  if (!card) return;
  const key = card.dataset.key;
  if (state.picks.has(key)) state.picks.delete(key);
  else state.picks.set(key, true);
  card.classList.toggle('picked');
  // sidebar count + topbar stats
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
    return '# No palettes selected yet.\\nGo back and click some palettes you like — the prompt will fill in here.';
  }
  const picksByIntent = new Map();
  for (const k of state.picks.keys()) {
    const [intentId, hexKey] = k.split('|');
    if (!picksByIntent.has(intentId)) picksByIntent.set(intentId, []);
    picksByIntent.get(intentId).push(hexKey);
  }
  let out = '';
  out += 'I selected ' + state.picks.size + ' palettes from the nebula Coolors catalog (' + picksByIntent.size + ' intents covered). Please append each to skills/direct/reference/curated-pools/palettes.md as a new P<n> entry, following the schema defined at the top of that file.\\n\\n';
  out += 'For each palette:\\n';
  out += '  • **Source.** Replace the Coolors name with a real-world named reference you can defend (a specific magazine spread, film, building, piece of pottery, etc.). If you cannot confidently name a real source, write "Source: TODO (Coolors-curated; original Coolors name: \\"<name>\\")" and Paolo will fill in.\\n';
  out += '  • **Colors.** Convert each hex to OKLCH and assign role names per the suggested mapping (bg / ink / accent / surface1 / surface2). Role names should be brand-native, not "primary/secondary".\\n';
  out += '  • Fill the remaining schema fields (Neutral temperature, Contrast strategy, Accent allowance, Fits, Avoid for) inferred from the palette character. Mark inferences "(<!-- inferred -->)".\\n\\n';
  out += '## Selected palettes\\n\\n';
  for (const intentId of picksByIntent.keys()) {
    const intent = CATALOG.intents.find(i => i.id === intentId);
    out += '### Intent: ' + intent.name + ' (\`' + intentId + '\`)\\n\\n';
    for (const hexKey of picksByIntent.get(intentId)) {
      const p = intent.palettes.find(pp => pp.hex.join('-') === hexKey);
      out += '- **' + p.name + '** · \`#' + p.hex.join('\` \`#') + '\`  \\n';
      out += '  Suggested roles: bg=\`#' + p.roles.bg + '\`, ink=\`#' + p.roles.ink + '\`, accent=\`#' + p.roles.accent + '\`, surface1=\`#' + p.roles.surface1 + '\`, surface2=\`#' + p.roles.surface2 + '\`  \\n';
      out += '  Coolors tags: \`' + p.tags.join('\`, \`') + '\` · Likes: ' + p.likes + '\\n\\n';
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
    // fallback
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
const outPath = path.join(outDir, 'palettes-playground.html');
await fs.writeFile(outPath, html);
const stats = await fs.stat(outPath);
console.log(`wrote ${outPath}`);
console.log(`size: ${(stats.size / 1024).toFixed(1)} KB`);
console.log(`embedded: ${catalog.intents.length} intents × ${catalog.intents[0].palettes.length} palettes`);
