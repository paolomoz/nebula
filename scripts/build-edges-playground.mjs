// Build the edge-language gallery — round 2.
// 12 restrained edge languages in the same posture as the round-1 picks
// (Hairline crisp, Soft product): modest radii, quiet borders, no statements.

import fs from 'fs/promises';
import path from 'path';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>nebula · edge languages (round 2)</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#0e0f12; --panel:#15171c;
    --line:#2a2d35; --line-soft:#1f2229;
    --text:#e6e6ea; --text-mute:#8e92a0; --text-dim:#5a5e6c;
    --accent:#7a9eff; --pos:#5fd6a4;
    --shadow:0 10px 30px rgba(0,0,0,.45);
    --font-ui:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,system-ui,sans-serif;
    --font-mono:ui-monospace,'SF Mono',Menlo,Consolas,monospace;
    --paper:#F6F2EA; --ink:#1A1815; --mute:#7C766C; --rule:#D9D2C5; --spark:#B14A39;
  }
  html,body{height:100%}
  body{background:var(--bg);color:var(--text);font-family:var(--font-ui);font-size:14px;line-height:1.5;-webkit-font-smoothing:antialiased}
  .topbar{position:sticky;top:0;z-index:30;background:rgba(14,15,18,.85);backdrop-filter:blur(12px);display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px 28px;border-bottom:1px solid var(--line-soft)}
  .topbar h1{font-size:14px;font-weight:600}
  .topbar .sub{color:var(--text-mute);font-size:11.5px;margin-top:2px;max-width:80ch}
  .topbar .stats{color:var(--text-mute);font-size:13px}
  .topbar .stats strong{color:var(--text)}
  .banner{padding:10px 28px;background:#16201e;color:#8de3bf;font-size:12px;border-bottom:1px solid var(--line-soft);font-family:var(--font-mono)}
  .btn{background:var(--accent);color:#0e0f12;border:none;border-radius:8px;padding:9px 14px;font:600 12.5px/1 var(--font-ui);letter-spacing:.01em;cursor:pointer}
  .btn:hover{filter:brightness(1.08)}
  .btn-ghost{background:transparent;color:var(--text-mute);border:1px solid var(--line)}
  .btn-ghost:hover{color:var(--text);border-color:var(--text-dim)}
  .wrap{padding:24px 28px 80px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(420px,1fr));gap:14px}

  .ecard{position:relative;border-radius:12px;overflow:hidden;background:var(--paper);color:var(--ink);border:2px solid transparent;transition:border-color .15s,box-shadow .15s;box-shadow:0 1px 0 rgba(0,0,0,.05),0 6px 18px rgba(0,0,0,.20)}
  .ecard.picked{border-color:var(--pos);box-shadow:0 0 0 1px rgba(95,214,164,.4),0 12px 30px rgba(0,0,0,.30)}
  .echeck{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.92);color:#0e0f12;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;line-height:1;box-shadow:0 1px 3px rgba(0,0,0,.18);cursor:pointer;z-index:5;transition:background .15s,transform .12s}
  .echeck:hover{transform:scale(1.06)}
  .echeck.on{background:var(--pos);color:#0e0f12}
  .edemo{position:relative;height:300px;overflow:hidden;border-bottom:1px solid var(--rule);background:var(--paper);padding:22px 20px 20px}
  .emeta{padding:14px 16px 12px}
  .ename{font-size:14px;font-weight:600;color:var(--ink);letter-spacing:-.005em}
  .ecaption{font-size:11.5px;color:var(--mute);margin-top:3px;line-height:1.5}
  .efoot{background:#0e0f12;color:var(--text-dim);padding:9px 14px 11px;font-size:10.5px;line-height:1.55;font-family:var(--font-mono)}
  .efoot .lbl{color:var(--text-mute)}
  .efoot .val{color:var(--text)}

  /* meta chips */
  .vtag{font-size:10px;padding:2px 7px;border:1px solid var(--rule);border-radius:999px;color:var(--mute);font-family:var(--font-mono);letter-spacing:.04em;display:inline-block}
  .vtags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}

  /* divider visual styles */
  .e-rule-dashed{height:0;border-top:1.5px dashed var(--ink);opacity:.45}
  .e-rule-heavy{height:3px;background:var(--ink)}
  .e-rule-accent{height:1px;background:var(--spark)}
  .e-rule{height:1px;background:var(--rule)}
  .e-rule-soft{height:1px;background:var(--rule);opacity:.5}
  .e-rule-input-only{height:0}

  /* canonical demo atoms */
  .e-card{
    --card-r: 0; --btn-r: 0; --input-r: 0; --badge-r: 0; --image-r: 0;
    --card-border: none; --btn-border: none; --input-border: 1px solid var(--rule);
    --card-shadow: none;
    height:100%;display:flex;flex-direction:column;gap:11px;
    background:#FFFCF4;
    border-radius:var(--card-r);
    border:var(--card-border);
    box-shadow:var(--card-shadow);
    padding:14px 16px;
    position:relative;
  }
  .e-row{display:flex;align-items:center;justify-content:space-between;gap:10px}
  .e-photo{width:68px;height:68px;background:radial-gradient(circle at 30% 30%,#C9A786 0%,#967355 40%,#5B4032 75%,#2E1F15 100%);border-radius:var(--image-r);flex-shrink:0}
  .e-badge{font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;padding:4px 9px;border-radius:var(--badge-r);background:var(--ink);color:var(--paper);align-self:flex-start;line-height:1}
  .e-h{font-family:-apple-system,sans-serif;font-weight:700;font-size:17px;line-height:1.2;letter-spacing:-.012em;color:var(--ink)}
  .e-body{font-family:Georgia,serif;font-size:12.5px;line-height:1.5;color:var(--ink);opacity:.85}
  .e-actions{display:flex;gap:8px;align-items:center}
  .e-btn{background:var(--ink);color:var(--paper);font:600 12px/1 var(--font-ui);padding:9px 14px;border-radius:var(--btn-r);border:var(--btn-border);cursor:pointer}
  .e-btn-2{background:transparent;color:var(--ink);font:500 12px/1 var(--font-ui);padding:9px 14px;border-radius:var(--btn-r);border:1px solid var(--ink);cursor:pointer}
  .e-input{font-family:-apple-system,sans-serif;font-size:12px;color:var(--ink);background:#fff;border-radius:var(--input-r);border:var(--input-border);padding:9px 12px;outline:none;width:100%}
  .e-input::placeholder{color:var(--mute)}

  /* Modal etc */
  .modal-bd{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:100;padding:24px}
  .modal-bd.open{display:flex}
  .modal{background:var(--panel);border:1px solid var(--line);border-radius:14px;width:min(820px,100%);max-height:88vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:var(--shadow)}
  .modal-head{display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--line-soft)}
  .modal-head h2{font-size:14px;font-weight:600}
  .modal-head .close{background:transparent;border:none;color:var(--text-mute);font-size:18px;cursor:pointer;padding:4px}
  .modal-body{padding:16px 20px 20px;overflow-y:auto}
  .promptbox{background:#0a0b0e;border:1px solid var(--line);border-radius:10px;padding:14px 16px;font-family:var(--font-mono);font-size:12px;line-height:1.6;color:var(--text);white-space:pre-wrap;word-break:break-word;max-height:60vh;overflow-y:auto}
  .modal-foot{display:flex;justify-content:flex-end;gap:8px;padding:12px 20px 16px;border-top:1px solid var(--line-soft)}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--pos);color:#0e0f12;padding:8px 14px;border-radius:999px;font-size:12.5px;font-weight:600;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;z-index:200}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
</style>
</head>
<body>
<div class="topbar">
  <div>
    <h1>nebula · edge languages (round 2)</h1>
    <div class="sub">12 additional restrained postures — same direction as round 1 (modest radii, quiet borders, no statement moves). Each card uses the same canonical component panel; pick what should join the pool.</div>
  </div>
  <div style="display:flex;gap:10px;align-items:center">
    <span class="stats"><strong id="picked-count">0</strong> picked</span>
    <button class="btn-ghost btn" id="reset-btn">Reset</button>
    <button class="btn" id="copy-btn">Copy prompt</button>
  </div>
</div>

<div class="banner">round 1 already in edges.md: E1 Hairline crisp · E2 Soft product</div>

<div class="wrap"><div class="grid" id="grid"></div></div>

<div class="modal-bd" id="modal-bd">
  <div class="modal">
    <div class="modal-head"><h2>Prompt for Claude</h2><button class="close" id="modal-close">×</button></div>
    <div class="modal-body"><div class="promptbox" id="promptbox"></div></div>
    <div class="modal-foot">
      <button class="btn-ghost btn" id="modal-close-2">Close</button>
      <button class="btn" id="copy-now-btn">Copy to clipboard</button>
    </div>
  </div>
</div>
<div class="toast" id="toast">Copied</div>

<script>
const STORAGE_KEY = 'nebula-edges-picks-r2';

// Each edge language: a restrained variation. r999 = capsule.
const EDGES = [
  {
    id: 'library-hairline',
    name: 'Library hairline',
    caption: 'Zero radius. 1px hairline-rule borders on cards and inputs. No shadow. The library register — structure without softening; the page is a built thing.',
    radii: { card: 0, button: 0, input: 0, badge: 0, image: 0 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule line between sections; quiet, no accent',
    ruleClass: 'e-rule',
  },
  {
    id: 'page',
    name: 'Page',
    caption: 'Zero radius cards with hairline ink borders. Buttons stay 2px (just-not-sharp). Print-page metaphor — the card reads as a printed sheet of paper, the action softens slightly.',
    radii: { card: 0, button: 2, input: 2, badge: 0, image: 0 },
    cardBorder: '1px solid var(--ink)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--ink)',
    shadow: 'none',
    divider: 'hairline ink rule line; thicker on chapter breaks',
    ruleClass: 'e-rule',
  },
  {
    id: 'civic-4',
    name: 'Civic 4',
    caption: 'Uniform 4px radius. Hairline-rule borders on cards and inputs. No shadow. Government / library / civic-modern register — softer than crisp, still structural.',
    radii: { card: 4, button: 4, input: 4, badge: 4, image: 4 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule between sections; whitespace within',
    ruleClass: 'e-rule',
  },
  {
    id: 'workshop',
    name: 'Workshop',
    caption: '4px radii, hairline border on inputs ONLY (cards are borderless). No shadow. Tool-and-utility register — the inputs declare themselves, the cards step back.',
    radii: { card: 4, button: 4, input: 4, badge: 4, image: 4 },
    cardBorder: 'none',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'whitespace between sections; thin rule only on tool boundaries',
    ruleClass: 'e-rule-soft',
  },
  {
    id: 'quiet-card',
    name: 'Quiet card',
    caption: '6px on cards and buttons, capsule badges. No borders anywhere. No shadow. The documentation register — easy to read, almost invisible as a system.',
    radii: { card: 6, button: 6, input: 6, badge: 999, image: 6 },
    cardBorder: 'none',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'whitespace alone',
    ruleClass: 'e-rule-soft',
  },
  {
    id: 'notebook',
    name: 'Notebook',
    caption: '6px on cards, 4px on buttons. Hairline-rule border on cards only. No shadow. Note-taking / research-app register — the card is a sheet of ruled paper.',
    radii: { card: 6, button: 4, input: 4, badge: 999, image: 6 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule between sections',
    ruleClass: 'e-rule',
  },
  {
    id: 'editors-eight',
    name: "Editor's 8",
    caption: '8px on cards and buttons, capsule badges. No card borders, hairline on inputs, no shadow. Reading-room product — slightly more soft than crisp, still type-led.',
    radii: { card: 8, button: 8, input: 8, badge: 999, image: 8 },
    cardBorder: 'none',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'whitespace; subtle accent rule on chapter breaks',
    ruleClass: 'e-rule-accent',
  },
  {
    id: 'hairline-product',
    name: 'Hairline product',
    caption: '8px cards, 6px buttons. Hairline-rule border on cards. No shadow. Halfway between hairline-crisp and soft-product — keeps the border, softens the corners.',
    radii: { card: 8, button: 6, input: 6, badge: 999, image: 6 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule between sections',
    ruleClass: 'e-rule',
  },
  {
    id: 'breath',
    name: 'Breath',
    caption: '8px cards, 6px buttons. Hairline on inputs only. Very subtle shadow on cards — a breath of elevation, not a lift. Documentation-meets-product register.',
    radii: { card: 8, button: 6, input: 6, badge: 999, image: 8 },
    cardBorder: 'none',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: '0 1px 3px rgba(0,0,0,.04)',
    divider: 'whitespace; subtle shadow stacking does the work',
    ruleClass: 'e-rule-soft',
  },
  {
    id: 'mid-product',
    name: 'Mid-product',
    caption: '12px cards, 10px buttons, capsule badges. No border, subtle pillow-light shadow. Between soft-product and pillow — slightly more contemporary, still calm.',
    radii: { card: 12, button: 10, input: 10, badge: 999, image: 10 },
    cardBorder: 'none',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: '0 4px 12px rgba(0,0,0,.07)',
    divider: 'whitespace between sections',
    ruleClass: 'e-rule-soft',
  },
  {
    id: 'letter',
    name: 'Letter',
    caption: '4px cards, sharp buttons (0px — friendly action with a sharp commit). Hairline borders. No shadow. Newsletter-modern register — the page is a letter you signed.',
    radii: { card: 4, button: 0, input: 4, badge: 0, image: 4 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule between sections',
    ruleClass: 'e-rule',
  },
  {
    id: 'civic-with-action',
    name: 'Civic with action',
    caption: '2px cards (civic restraint) + fully-rounded capsule buttons (friendly action). Hairline border on cards. Civic base with a single asymmetric warmth.',
    radii: { card: 2, button: 999, input: 999, badge: 999, image: 2 },
    cardBorder: '1px solid var(--rule)',
    btnBorder: 'none',
    inputBorder: '1px solid var(--rule)',
    shadow: 'none',
    divider: 'thin rule between sections',
    ruleClass: 'e-rule',
  },
];

const state = { picks: new Set() };
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) for (const k of JSON.parse(raw)) state.picks.add(k);
} catch (e) {}
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.picks])); } catch (e) {} }

function r(v) { return v === 999 ? '999 (capsule)' : v + 'px'; }
function radiusBlurb(rad) {
  return 'card ' + r(rad.card) + ' · button ' + r(rad.button) + ' · input ' + r(rad.input) + ' · badge ' + r(rad.badge) + ' · image ' + r(rad.image);
}
function tagsFor(e) {
  return \`<span class="vtag">card \${r(e.radii.card)}</span><span class="vtag">btn \${r(e.radii.button)}</span><span class="vtag">badge \${r(e.radii.badge)}</span>\`;
}
function cardStyle(e) {
  return [
    '--card-r:' + e.radii.card + 'px',
    '--btn-r:' + e.radii.button + 'px',
    '--input-r:' + e.radii.input + 'px',
    '--badge-r:' + e.radii.badge + 'px',
    '--image-r:' + e.radii.image + 'px',
    '--card-border:' + e.cardBorder,
    '--btn-border:' + e.btnBorder,
    '--input-border:' + e.inputBorder,
    '--card-shadow:' + e.shadow,
  ].join(';');
}
function demoMarkup(e) {
  return \`<div class="e-card" style="\${cardStyle(e)}">
    <div class="e-row">
      <div class="e-photo"></div>
      <span class="e-badge">VOL. II</span>
    </div>
    <div class="e-h">Field guide</div>
    <div class="e-body">Six selected notes from the season's research, set in real type and surrounded by the edges of this language.</div>
    <div class="e-actions">
      <button class="e-btn">Read on</button>
      <button class="e-btn-2">Save</button>
    </div>
    <div class="\${e.ruleClass}"></div>
    <input class="e-input" placeholder="enter your email">
  </div>\`;
}

function renderGrid() {
  const root = document.getElementById('grid');
  root.innerHTML = EDGES.map(e => \`
    <div class="ecard \${state.picks.has(e.id) ? 'picked' : ''}" data-id="\${e.id}">
      <div class="echeck \${state.picks.has(e.id) ? 'on' : ''}" data-id="\${e.id}">✓</div>
      <div class="edemo">\${demoMarkup(e)}</div>
      <div class="emeta">
        <div class="ename">\${e.name}</div>
        <div class="ecaption">\${e.caption}</div>
        <div class="vtags">\${tagsFor(e)}</div>
      </div>
      <div class="efoot">
        <span class="lbl">radii:</span> <span class="val">\${radiusBlurb(e.radii)}</span><br>
        <span class="lbl">borders:</span> <span class="val">card \${e.cardBorder} · input \${e.inputBorder} · shadow \${e.shadow}</span><br>
        <span class="lbl">dividers:</span> <span class="val">\${e.divider}</span>
      </div>
    </div>
  \`).join('');
  updateStats();
}
function updateStats() { document.getElementById('picked-count').textContent = state.picks.size; }

document.addEventListener('click', (ev) => {
  const check = ev.target.closest('.echeck');
  if (!check) return;
  const id = check.dataset.id;
  if (state.picks.has(id)) state.picks.delete(id);
  else state.picks.add(id);
  const card = check.closest('.ecard');
  card.classList.toggle('picked');
  check.classList.toggle('on');
  updateStats();
  persist();
});

function buildPrompt() {
  if (state.picks.size === 0) return '# No edge languages picked yet.\\nClick the ✓ in the corner of each card to select.';
  const picked = EDGES.filter(e => state.picks.has(e.id));
  let out = '';
  out += 'I selected ' + picked.length + ' additional edge languages from the nebula edges gallery (round 2 — restrained variations). Append each to skills/direct/reference/curated-pools/edges.md as a new E<n> entry (numbering continues from the existing 2 round-1 entries), following the schema defined at the top of that file.\\n\\n';
  out += 'For each entry, use the captured details verbatim, with Fits/Avoid for inferred:\\n\\n';
  out += '## Selected edge languages\\n\\n';
  for (const e of picked) {
    out += '### ' + e.name + '\\n';
    out += '  caption: ' + e.caption + '\\n';
    out += '  radii: ' + radiusBlurb(e.radii) + '\\n';
    out += '  card border: ' + e.cardBorder + '\\n';
    out += '  button border: ' + e.btnBorder + '\\n';
    out += '  input border: ' + e.inputBorder + '\\n';
    out += '  shadow: ' + e.shadow + '\\n';
    out += '  divider: ' + e.divider + '\\n\\n';
  }
  return out;
}

function showToast(m) { const t = document.getElementById('toast'); t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 1600); }
async function copyToClipboard(text) {
  try { await navigator.clipboard.writeText(text); showToast('Copied · paste back to Claude'); }
  catch (e) {
    const ta = document.createElement('textarea'); ta.value = text;
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
    showToast('Copied · paste back to Claude');
  }
}
const modalBd = document.getElementById('modal-bd');
const promptbox = document.getElementById('promptbox');
document.getElementById('copy-btn').addEventListener('click', () => { promptbox.textContent = buildPrompt(); modalBd.classList.add('open'); });
document.getElementById('modal-close').addEventListener('click', () => modalBd.classList.remove('open'));
document.getElementById('modal-close-2').addEventListener('click', () => modalBd.classList.remove('open'));
modalBd.addEventListener('click', (ev) => { if (ev.target === modalBd) modalBd.classList.remove('open'); });
document.getElementById('copy-now-btn').addEventListener('click', () => copyToClipboard(promptbox.textContent));
document.getElementById('reset-btn').addEventListener('click', () => {
  if (state.picks.size === 0) return;
  if (!confirm('Clear all ' + state.picks.size + ' picks?')) return;
  state.picks.clear(); persist(); renderGrid();
});

renderGrid();
</script>
</body>
</html>
`;

const outDir = 'nebula/proposals';
await fs.mkdir(outDir, { recursive: true });
const outPath = path.join(outDir, 'edges-playground.html');
await fs.writeFile(outPath, html);
const stats = await fs.stat(outPath);
console.log(`wrote ${outPath}  (${(stats.size / 1024).toFixed(1)} KB)`);
