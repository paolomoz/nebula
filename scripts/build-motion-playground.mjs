// Build the motion-vocabulary gallery at nebula/proposals/motion-playground.html.
// Round 3 — 12 additional ambitious vocabularies (9 from round 2 already in the pool).

import fs from 'fs/promises';
import path from 'path';

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>nebula · motion vocabularies (round 3)</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&display=swap">
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
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:14px}

  .vcard{position:relative;border-radius:12px;overflow:hidden;background:var(--paper);color:var(--ink);border:2px solid transparent;transition:border-color .15s,box-shadow .15s;box-shadow:0 1px 0 rgba(0,0,0,.05),0 6px 18px rgba(0,0,0,.20)}
  .vcard.picked{border-color:var(--pos);box-shadow:0 0 0 1px rgba(95,214,164,.4),0 12px 30px rgba(0,0,0,.30)}
  .vcheck{position:absolute;top:10px;right:10px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.92);color:#0e0f12;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;line-height:1;box-shadow:0 1px 3px rgba(0,0,0,.18);cursor:pointer;z-index:5;transition:background .15s,transform .12s}
  .vcheck:hover{transform:scale(1.06)}
  .vcheck.on{background:var(--pos);color:#0e0f12}
  .demo{position:relative;height:240px;overflow:hidden;border-bottom:1px solid var(--rule);background:var(--paper)}
  .vmeta{padding:14px 16px 12px}
  .vname{font-size:14px;font-weight:600;color:var(--ink);letter-spacing:-.005em}
  .vcaption{font-size:11.5px;color:var(--mute);margin-top:3px;line-height:1.5}
  .vtags{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}
  .vtag{font-size:10px;padding:2px 7px;border:1px solid var(--rule);border-radius:999px;color:var(--mute);font-family:var(--font-mono);letter-spacing:.04em}
  .vfoot{background:#0e0f12;color:var(--text-dim);padding:9px 14px 11px;font-size:10.5px;line-height:1.55;font-family:var(--font-mono)}
  .vfoot .lbl{color:var(--text-mute)}
  .vfoot .val{color:var(--text)}

  .demo-btn{display:inline-flex;align-items:center;justify-content:center;background:var(--ink);color:var(--paper);border:none;padding:11px 18px;font:600 12.5px/1 var(--font-ui);cursor:pointer;border-radius:0}

  /* ---- 1 — Linotype drop ---- */
  .v-linotype{height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:18px;overflow:hidden}
  .v-linotype .head{font-family:-apple-system,sans-serif;font-weight:700;font-size:20px;line-height:1.18;letter-spacing:-.012em;color:var(--ink);text-align:center}
  .v-linotype .line{display:block;opacity:0;transform:translateY(-32px)}
  .v-linotype.on .line{animation:lineDrop .5s cubic-bezier(0.45,1.6,0.5,1) forwards}
  @keyframes lineDrop{
    0%{opacity:0;transform:translateY(-32px)}
    70%{opacity:1;transform:translateY(3px)}
    100%{opacity:1;transform:translateY(0)}
  }

  /* ---- 2 — Page turn ---- */
  .v-pageturn{height:100%;display:flex;align-items:center;justify-content:center;perspective:1100px;padding:18px}
  .v-pageturn .book{position:relative;width:260px;height:160px}
  .v-pageturn .sheet{position:absolute;inset:0;background:#FFFCF4;border:1px solid var(--rule);padding:16px;font-family:-apple-system,sans-serif;font-size:11px;color:var(--ink);transform-origin:left center;transform-style:preserve-3d;backface-visibility:hidden;transition:transform .8s cubic-bezier(0.4,0,0.2,1)}
  .v-pageturn .sheet h5{font-weight:600;font-size:12px;margin-bottom:6px}
  .v-pageturn .sheet.front{z-index:2;box-shadow:0 0 0 rgba(0,0,0,0);transition:transform .8s cubic-bezier(0.4,0,0.2,1),box-shadow .8s}
  .v-pageturn:hover .sheet.front{transform:rotateY(-160deg);box-shadow:8px 0 28px rgba(0,0,0,.18)}
  .v-pageturn .sheet.back{z-index:1}

  /* ---- 3 — Slow lyric ---- */
  .v-lyric{height:100%;padding:22px;display:flex;flex-direction:column;justify-content:center}
  .v-lyric .phrase{font-family:Georgia,serif;font-size:15px;line-height:1.5;color:var(--ink);opacity:0;transform:translateY(6px);transition:opacity .9s ease, transform .9s ease}
  .v-lyric .phrase.in{opacity:1;transform:translateY(0)}

  /* ---- 4 — Spotlight follow ---- */
  .v-spot{height:100%;position:relative;cursor:none;background:#FFFCF4;overflow:hidden}
  .v-spot .cards{position:absolute;inset:0;display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding:14px}
  .v-spot .c{background:#F6F2EA;border:1px solid var(--rule);padding:12px;font-size:11px;color:var(--ink)}
  .v-spot .c h5{font-family:-apple-system,sans-serif;font-size:12px;font-weight:600;margin-bottom:5px}
  .v-spot .c p{color:var(--mute);font-size:10.5px;line-height:1.4}
  .v-spot .veil{position:absolute;inset:0;background:rgba(26,24,21,0.5);pointer-events:none;transition:opacity .15s;-webkit-mask:radial-gradient(circle 80px at var(--mx,50%) var(--my,50%),transparent 40%,rgba(0,0,0,.4) 60%,black 80%);mask:radial-gradient(circle 80px at var(--mx,50%) var(--my,50%),transparent 40%,rgba(0,0,0,.4) 60%,black 80%)}

  /* ---- 5 — Italic flicker ---- */
  .v-italic{height:100%;display:flex;align-items:center;justify-content:center;padding:18px;font-family:'Inter',sans-serif}
  .v-italic .head{font-weight:700;font-size:24px;line-height:1.12;letter-spacing:-.014em;color:var(--ink);text-align:center}
  .v-italic .head .w{display:inline-block;transition:font-variation-settings .25s ease-out;font-variation-settings:"wght" 700,"slnt" 0}
  .v-italic .head .w:hover{font-variation-settings:"wght" 700,"slnt" -10}

  /* ---- 6 — Domino settle ---- */
  .v-domino{height:100%;display:flex;align-items:center;justify-content:center;gap:6px;padding:18px;flex-wrap:nowrap}
  .v-domino .tile{flex:0 0 28px;height:64px;background:#FFFCF4;border:1px solid var(--rule);transform-origin:bottom left;transition:transform .35s cubic-bezier(0.65,0,0.35,1)}
  .v-domino.on .tile{transform:rotate(-22deg)}
  .v-domino .label{position:absolute;left:0;right:0;bottom:14px;text-align:center;font-size:10.5px;color:var(--mute);font-family:var(--font-mono)}

  /* ---- 7 — Foil iridescence ---- */
  .v-foil{height:100%;display:flex;align-items:center;justify-content:center;padding:18px}
  .v-foil .card{width:220px;height:160px;background:conic-gradient(from var(--angle,0deg),#F4D6E6,#E4D7F7,#D6E5F4,#D7F4E0,#F2F0D4,#F4D9D6,#F4D6E6);background-size:200% 200%;border:1px solid var(--rule);position:relative;overflow:hidden;transition:transform .2s ease}
  .v-foil .card::after{content:"";position:absolute;inset:0;background:linear-gradient(120deg,rgba(255,255,255,0.5),rgba(255,255,255,0) 40%);mix-blend-mode:overlay;pointer-events:none}
  .v-foil .badge{position:absolute;bottom:12px;left:14px;font-family:-apple-system,sans-serif;font-size:11.5px;font-weight:600;color:var(--ink);background:rgba(255,252,244,.9);padding:3px 7px;letter-spacing:.04em}

  /* ---- 8 — Shutter blink ---- */
  .v-shutter{height:100%;position:relative;overflow:hidden;cursor:pointer}
  .v-shutter .scene{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;font-size:18px;font-weight:600;letter-spacing:-.005em;background:#FFFCF4;color:var(--ink);transition:opacity .04s linear}
  .v-shutter .scene.alt{background:var(--ink);color:var(--paper)}
  .v-shutter .blink{position:absolute;inset:0;background:#0a0908;opacity:0;pointer-events:none;transition:opacity .06s linear}
  .v-shutter .blink.on{opacity:1}
  .v-shutter .hint{position:absolute;bottom:12px;right:14px;font-size:10px;color:var(--mute);font-family:var(--font-mono)}

  /* ---- 9 — Color bleed ---- */
  .v-bleed{height:100%;display:flex;align-items:center;justify-content:center;gap:10px;padding:18px;background:#FFFCF4}
  .v-bleed .b{flex:1;height:72px;background:#FFFCF4;border:1px solid var(--rule);font-family:-apple-system,sans-serif;font-size:12px;color:var(--ink);display:flex;align-items:center;justify-content:center;font-weight:500;transition:background .8s cubic-bezier(0.4,0,0.2,1),box-shadow .4s ease}
  .v-bleed .b:hover{background:#B14A39;color:var(--paper);box-shadow:0 0 28px 0 rgba(177,74,57,.4)}
  .v-bleed:has(.b:hover) .b:not(:hover){background:rgba(177,74,57,.08);box-shadow:inset 0 0 0 1px rgba(177,74,57,.15)}

  /* ---- 10 — Camera dolly ---- */
  .v-dolly{height:100%;position:relative;perspective:520px;overflow:hidden;background:#FCF7EA}
  .v-dolly .plane{position:absolute;will-change:transform}
  .v-dolly .pA{top:50%;left:50%;width:90px;height:90px;background:var(--ink);transform:translate(-50%,-50%);animation:dollyA 6s ease-in-out infinite alternate}
  .v-dolly .pB{top:30%;left:25%;width:50px;height:50px;background:var(--spark);border-radius:50%;animation:dollyB 8s ease-in-out infinite alternate}
  .v-dolly .pC{bottom:24%;right:18%;width:34px;height:34px;border:2px solid var(--ink);animation:dollyC 10s ease-in-out infinite alternate}
  .v-dolly .pD{bottom:38%;left:50%;width:160px;height:1px;background:var(--ink);opacity:.5;animation:dollyD 14s ease-in-out infinite alternate}
  @keyframes dollyA{0%{transform:translate(-50%,-50%) translateZ(0)}100%{transform:translate(-50%,-50%) translateZ(80px)}}
  @keyframes dollyB{0%{transform:translateZ(-40px) scale(.85)}100%{transform:translateZ(40px) scale(1.15)}}
  @keyframes dollyC{0%{transform:translateZ(-100px) rotate(0)}100%{transform:translateZ(60px) rotate(45deg)}}
  @keyframes dollyD{0%{transform:translateX(-50%) translateZ(-100px) scaleX(.6)}100%{transform:translateX(-50%) translateZ(100px) scaleX(1.4)}}

  /* ---- 11 — Apparition ---- */
  .v-appar{height:100%;position:relative;overflow:hidden;padding:18px}
  .v-appar .row{display:flex;gap:10px;flex-direction:column;height:100%;justify-content:center}
  .v-appar .row > div{background:#FFFCF4;border:1px solid var(--rule);padding:10px 14px;font-family:-apple-system,sans-serif;font-size:12px;color:var(--ink);opacity:0;transform:translateX(-30px)}
  .v-appar.on .row > div{animation:apparEnter 1.4s cubic-bezier(0.16,1,0.3,1) forwards}
  .v-appar.on .row > div:nth-child(1){animation-delay:0ms}
  .v-appar.on .row > div:nth-child(2){animation-delay:140ms}
  .v-appar.on .row > div:nth-child(3){animation-delay:280ms}
  @keyframes apparEnter{
    0%{opacity:0;transform:translateX(-30px)}
    25%{opacity:.5;transform:translateX(-18px)}
    100%{opacity:1;transform:translateX(0)}
  }

  /* ---- 12 — Crosshatching reveal ---- */
  .v-hatch{height:100%;position:relative;overflow:hidden}
  .v-hatch .content{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:#FFFCF4;font-family:-apple-system,sans-serif;font-weight:600;font-size:18px;color:var(--ink);letter-spacing:-.005em;text-align:center;padding:18px}
  .v-hatch .stripes{position:absolute;inset:0;pointer-events:none;display:flex}
  .v-hatch .stripe{flex:1;background:var(--ink);transform:skewX(-22deg);transform-origin:center;transition:transform 1.4s cubic-bezier(0.65,0,0.35,1)}
  .v-hatch .stripe:nth-child(1){margin-right:-30px}
  .v-hatch .stripe:nth-child(2){margin-right:-30px}
  .v-hatch.on .stripe:nth-child(1){transform:skewX(-22deg) translateX(-220%)}
  .v-hatch.on .stripe:nth-child(2){transform:skewX(-22deg) translateY(220%)}
  .v-hatch.on .stripe:nth-child(3){transform:skewX(-22deg) translateX(220%)}
  .v-hatch.on .stripe:nth-child(4){transform:skewX(-22deg) translateY(-220%)}

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
    <h1>nebula · motion vocabularies (round 3)</h1>
    <div class="sub">12 additional postures — print, cinematic, holographic, causal. Each card runs live. Pick what should join the pool alongside round 2's nine.</div>
  </div>
  <div style="display:flex;gap:10px;align-items:center">
    <span class="stats"><strong id="picked-count">0</strong> picked</span>
    <button class="btn-ghost btn" id="reset-btn">Reset</button>
    <button class="btn" id="copy-btn">Copy prompt</button>
  </div>
</div>

<div class="banner">round 2 already in motion.md: Magnetic chain · Paper-fold · Rack focus · Iris transition · Heat trace · Type-set-on-scroll · Chromatic separation · Match-cut morph · Drift compositions</div>

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
const STORAGE_KEY = 'nebula-motion-picks-r3';

const VOCABS = [
  {
    id: 'linotype-drop',
    name: 'Linotype drop',
    caption: 'Heading lines fall in as full slugs from above the line, with a tiny clunk on landing. Print compositor metaphor — not letter-by-letter, but line-by-line.',
    trigger: 'page-load or scroll-into-view',
    easing: 'cubic-bezier(0.45,1.6,0.5,1) — gravity + slight overshoot',
    duration: '500ms per line, 120ms stagger between lines',
    allowed: 'h1 / h2 hero headings, set in two or three lines',
    notAllowed: 'multi-paragraph body; one-line headings (loses the effect); UI labels; secondary text',
    demo: 'linotype',
  },
  {
    id: 'page-turn',
    name: 'Page-turn',
    caption: 'Sections transition like a book page turning — Y-axis rotation with shadow under the lifting sheet. Material book metaphor, not screen swipe.',
    trigger: 'hover / click on the turning sheet',
    easing: 'cubic-bezier(0.4,0,0.2,1)',
    duration: '800ms turn',
    allowed: 'documentary-style section openers; long-read transitions; gallery card flips that reveal long-form back content',
    notAllowed: 'nav transitions; rapid micro-interactions; mobile (small viewport breaks the metaphor)',
    demo: 'pageturn',
  },
  {
    id: 'slow-lyric',
    name: 'Slow lyric',
    caption: 'Hero text reveals phrase-by-phrase at reading rhythm — pauses between phrases that match natural cadence. Audience leans in to read.',
    trigger: 'page-load',
    easing: 'ease',
    duration: '900ms per phrase, 600ms pause between — total 4–6s for a 3-phrase reveal',
    allowed: 'one hero block per page; epigraph or opening manifesto',
    notAllowed: 'navigation; CTA labels; anywhere reading speed matters more than mood',
    demo: 'lyric',
  },
  {
    id: 'spotlight-follow',
    name: 'Spotlight follow',
    caption: 'A soft spotlight follows the cursor; background dims outside the light. Theater metaphor — the page reveals what you look at.',
    trigger: 'cursor position (continuous)',
    easing: 'instant tracking (mask radial-gradient)',
    duration: 'continuous tracking; spotlight radius ~80px',
    allowed: 'card grids, gallery rows; sections where one item at a time should lead',
    notAllowed: 'mobile (no cursor); reading body (mask harms comprehension); data tables',
    demo: 'spot',
  },
  {
    id: 'italic-flicker',
    name: 'Italic flicker',
    caption: 'Hovered display words tilt into italic via the variable-font slant axis, snap back on release. Type as muscle — the words respond to attention.',
    trigger: 'hover (per-word display text)',
    easing: 'ease-out',
    duration: '250ms slant engage, 250ms release',
    allowed: 'h1 / h2 display set in a variable font with a slnt axis (Inter, Recursive); interactive heading phrases',
    notAllowed: 'body text; non-variable fonts; whole-heading flicker (becomes nervous); long headings (one or two words max)',
    demo: 'italic',
  },
  {
    id: 'domino-settle',
    name: 'Domino settle',
    caption: 'Click an element and downstream elements settle in cascade — causal motion, like dominoes tipping. Each follows the previous on a beat.',
    trigger: 'click (on a seed element)',
    easing: 'cubic-bezier(0.65,0,0.35,1) in-out-cubic',
    duration: '350ms per tile, 90ms stagger',
    allowed: 'menu reveals; cascading section opens; tab switches where surrounding panels respond',
    notAllowed: 'idle motion; long chains (>6 elements becomes ceremony); reverse direction on un-click (stays where settled)',
    demo: 'domino',
  },
  {
    id: 'foil-iridescence',
    name: 'Foil iridescence',
    caption: 'Hovered surface refracts color across its plane based on cursor angle — holographic foil card metaphor. The surface has angular response.',
    trigger: 'cursor position over surface',
    easing: 'linear tracking on conic-gradient angle',
    duration: 'continuous; angle tracks cursor position',
    allowed: 'collectible-style cards, premium feature tiles, special-edition product surfaces',
    notAllowed: 'every card (loses meaning); body content; print-style or document interfaces',
    demo: 'foil',
  },
  {
    id: 'shutter-blink',
    name: 'Shutter blink',
    caption: 'Major transitions are punctuated by a 60–80ms blackout — a camera shutter cut. Cinematic punctuation, not fade or slide.',
    trigger: 'click / route change',
    easing: 'linear (instant on / off)',
    duration: '60ms blackout, instant content swap behind',
    allowed: 'major route transitions; campaign-page chapter cuts; hero-to-detail handoffs that should feel like a cut',
    notAllowed: 'high-frequency interactions; micro-interactions; settings panels; anywhere the blink would fire more than 2–3 times per session',
    demo: 'shutter',
  },
  {
    id: 'color-bleed',
    name: 'Color bleed',
    caption: 'Hovered element\\'s color bleeds into adjacent surfaces, like wet ink soaking paper. Adjacent borders tint; the page is materially wet for a moment.',
    trigger: 'hover',
    easing: 'cubic-bezier(0.4,0,0.2,1) for color, longer decay on release',
    duration: '400ms engage, 800ms recede on un-hover',
    allowed: 'tile grids where one element\\'s focus colors the surrounding tiles in echo; brand-led product showcases',
    notAllowed: 'form fields; data interfaces; sites where adjacent elements must remain neutral',
    demo: 'bleed',
  },
  {
    id: 'camera-dolly',
    name: 'Camera dolly',
    caption: 'Background composition dollies through pseudo-3D depth. Foreground content is stable; the page has a deep stage that breathes behind it.',
    trigger: 'continuous (looping) or scroll-coupled',
    easing: 'ease-in-out per layer (each layer has its own period)',
    duration: '6–14s loops per element, deliberately desynchronized',
    allowed: 'hero / above-the-fold; transition bands between sections; brand-element compositions',
    notAllowed: 'within reading flow; sites with intense data; mobile (depth illusion breaks on small viewports)',
    demo: 'dolly',
  },
  {
    id: 'apparition',
    name: 'Apparition',
    caption: 'Elements enter already in motion — they don\\'t fade or slide from a stopped state, they arrive from a drift. The page was alive before you arrived.',
    trigger: 'page-load / scroll-into-view',
    easing: 'cubic-bezier(0.16,1,0.3,1) — strong deceleration',
    duration: '1400ms total per element, 140ms stagger',
    allowed: 'hero blocks; major section openers; one apparition per scroll-zone',
    notAllowed: 'every element (becomes theatrical); UI controls; secondary content',
    demo: 'apparition',
  },
  {
    id: 'crosshatching-reveal',
    name: 'Crosshatching reveal',
    caption: 'Content reveals from behind etched diagonal stripes that draw apart. Engraving / printmaking metaphor — the page is being inked in.',
    trigger: 'scroll-into-view',
    easing: 'cubic-bezier(0.65,0,0.35,1) — symmetric',
    duration: '1400ms reveal, each stripe staggered 80ms',
    allowed: 'hero opener; major section transitions; one or two reveals per page',
    notAllowed: 'inline content; high-frequency reveals; small surfaces (loses metaphor); mobile (stripe scale becomes confusing)',
    demo: 'hatch',
  },
];

const state = { picks: new Set() };
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) for (const k of JSON.parse(raw)) state.picks.add(k);
} catch (e) {}
function persist() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.picks])); } catch (e) {} }

function tagsFor(v) {
  return \`<span class="vtag">trigger: \${v.trigger}</span><span class="vtag">easing: \${v.easing.split(' — ')[0].split(' ')[0]}</span><span class="vtag">duration: \${v.duration.split(',')[0].split(' (')[0]}</span>\`;
}

function demoMarkup(v) {
  switch (v.demo) {
    case 'linotype': {
      const lines = ['A page that arrives', 'in three full lines.'];
      return \`<div class="v-linotype" data-host="linotype">
        <div class="head">\${lines.map((l, i) => \`<span class="line" style="animation-delay:\${i * 120}ms">\${l}</span>\`).join('')}</div>
      </div>\`;
    }
    case 'pageturn':
      return \`<div class="v-pageturn">
        <div class="book">
          <div class="sheet back">
            <h5>Chapter II</h5>
            <p>What was beneath the page is revealed by lifting the surface — material continuity instead of swap.</p>
          </div>
          <div class="sheet front">
            <h5>Chapter I</h5>
            <p>Hover the page to turn it. The book metaphor is literal: rotation along the spine, shadow under the lift.</p>
          </div>
        </div>
      </div>\`;
    case 'lyric':
      return \`<div class="v-lyric" data-host="lyric">
        <div class="phrase">A page that reads itself —</div>
        <div class="phrase">in measured breaths,</div>
        <div class="phrase">arrives.</div>
      </div>\`;
    case 'spot':
      return \`<div class="v-spot" data-host="spot">
        <div class="cards">
          <div class="c"><h5>Tile one</h5><p>Move the cursor — the spotlight follows you.</p></div>
          <div class="c"><h5>Tile two</h5><p>Outside the light, the page dims to make room.</p></div>
          <div class="c"><h5>Tile three</h5><p>Inside the light, content remains itself.</p></div>
          <div class="c"><h5>Tile four</h5><p>Theater: the page reveals what you look at.</p></div>
        </div>
        <div class="veil"></div>
      </div>\`;
    case 'italic': {
      const words = ['Type', 'has', 'muscle.'];
      return \`<div class="v-italic"><div class="head">\${words.map(w => \`<span class="w">\${w}\${'&nbsp;'}</span>\`).join('')}</div></div>\`;
    }
    case 'domino':
      return \`<div class="v-domino" data-host="domino">
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
        <div class="tile"></div><div class="tile"></div><div class="tile"></div>
        <div class="label">→ click to tip the cascade</div>
      </div>\`;
    case 'foil':
      return \`<div class="v-foil" data-host="foil"><div class="card"><span class="badge">FOIL EDITION</span></div></div>\`;
    case 'shutter':
      return \`<div class="v-shutter" data-host="shutter">
        <div class="scene visible" data-i="0">FIRST CUT</div>
        <div class="scene alt" style="opacity:0" data-i="1">SECOND CUT</div>
        <div class="blink"></div>
        <div class="hint">→ click to cut</div>
      </div>\`;
    case 'bleed':
      return \`<div class="v-bleed">
        <div class="b">Tile A</div>
        <div class="b">Tile B</div>
        <div class="b">Tile C</div>
      </div>\`;
    case 'dolly':
      return \`<div class="v-dolly"><div class="plane pA"></div><div class="plane pB"></div><div class="plane pC"></div><div class="plane pD"></div></div>\`;
    case 'apparition':
      return \`<div class="v-appar" data-host="apparition">
        <div class="row">
          <div>The page was alive before you got here.</div>
          <div>Elements arrive already moving.</div>
          <div>They decelerate to a stop, but they kept moving until then.</div>
        </div>
      </div>\`;
    case 'hatch':
      return \`<div class="v-hatch" data-host="hatch">
        <div class="content">The page is inked in.</div>
        <div class="stripes"><div class="stripe"></div><div class="stripe"></div><div class="stripe"></div><div class="stripe"></div></div>
      </div>\`;
    default: return '';
  }
}

function renderGrid() {
  const root = document.getElementById('grid');
  root.innerHTML = VOCABS.map(v => \`
    <div class="vcard \${state.picks.has(v.id) ? 'picked' : ''}" data-id="\${v.id}">
      <div class="vcheck \${state.picks.has(v.id) ? 'on' : ''}" data-id="\${v.id}">✓</div>
      <div class="demo">\${demoMarkup(v)}</div>
      <div class="vmeta">
        <div class="vname">\${v.name}</div>
        <div class="vcaption">\${v.caption}</div>
        <div class="vtags">\${tagsFor(v)}</div>
      </div>
      <div class="vfoot">
        <span class="lbl">allowed:</span> <span class="val">\${v.allowed}</span><br>
        <span class="lbl">not allowed:</span> <span class="val">\${v.notAllowed}</span>
      </div>
    </div>
  \`).join('');
  setupDemos();
  updateStats();
}

function setupDemos() {
  // Linotype: replay every 4.5s
  for (const host of document.querySelectorAll('[data-host="linotype"]')) {
    const replay = () => { host.classList.remove('on'); void host.offsetWidth; host.classList.add('on'); };
    replay(); setInterval(replay, 4500);
  }
  // Slow lyric: phrase-by-phrase reveal
  for (const host of document.querySelectorAll('[data-host="lyric"]')) {
    const phrases = [...host.querySelectorAll('.phrase')];
    const replay = () => {
      for (const p of phrases) p.classList.remove('in');
      phrases.forEach((p, i) => setTimeout(() => p.classList.add('in'), i * 1400));
    };
    replay(); setInterval(replay, 7500);
  }
  // Spotlight follow
  for (const host of document.querySelectorAll('[data-host="spot"]')) {
    const veil = host.querySelector('.veil');
    host.addEventListener('mousemove', (e) => {
      const r = host.getBoundingClientRect();
      veil.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      veil.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  }
  // Domino: auto-cycle
  for (const host of document.querySelectorAll('[data-host="domino"]')) {
    const tiles = [...host.querySelectorAll('.tile')];
    let isOn = false;
    const fire = () => {
      isOn = !isOn;
      // Stagger via inline transition-delay
      tiles.forEach((t, i) => { t.style.transitionDelay = isOn ? (i * 90) + 'ms' : ((tiles.length - 1 - i) * 60) + 'ms'; });
      host.classList.toggle('on', isOn);
    };
    host.addEventListener('click', fire);
    setInterval(fire, 4200);
  }
  // Foil: cursor angle drives conic gradient angle
  for (const host of document.querySelectorAll('[data-host="foil"]')) {
    const card = host.querySelector('.card');
    host.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      const rotX = Math.max(-6, Math.min(6, -dy / 10));
      const rotY = Math.max(-6, Math.min(6, dx / 10));
      card.style.setProperty('--angle', (angle + 90) + 'deg');
      card.style.transform = \`perspective(800px) rotateY(\${rotY}deg) rotateX(\${rotX}deg)\`;
    });
    host.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }
  // Shutter
  for (const host of document.querySelectorAll('[data-host="shutter"]')) {
    const scenes = [...host.querySelectorAll('.scene')];
    const blink = host.querySelector('.blink');
    let on = 0;
    const cut = () => {
      blink.classList.add('on');
      setTimeout(() => {
        scenes[on].style.opacity = '0';
        scenes[1 - on].style.opacity = '1';
        on = 1 - on;
        blink.classList.remove('on');
      }, 60);
    };
    host.addEventListener('click', cut);
    setInterval(cut, 4000);
  }
  // Apparition
  for (const host of document.querySelectorAll('[data-host="apparition"]')) {
    const replay = () => { host.classList.remove('on'); void host.offsetWidth; host.classList.add('on'); };
    replay(); setInterval(replay, 5200);
  }
  // Crosshatching
  for (const host of document.querySelectorAll('[data-host="hatch"]')) {
    const replay = () => { host.classList.remove('on'); void host.offsetWidth; setTimeout(() => host.classList.add('on'), 200); };
    replay(); setInterval(replay, 5400);
  }
}

function updateStats() { document.getElementById('picked-count').textContent = state.picks.size; }

document.addEventListener('click', (e) => {
  const check = e.target.closest('.vcheck');
  if (!check) return;
  const id = check.dataset.id;
  if (state.picks.has(id)) state.picks.delete(id);
  else state.picks.add(id);
  const card = check.closest('.vcard');
  card.classList.toggle('picked');
  check.classList.toggle('on');
  updateStats();
  persist();
});

function buildPrompt() {
  if (state.picks.size === 0) return '# No motion vocabularies picked yet.\\nClick the ✓ in the corner of each card to select.';
  const picked = VOCABS.filter(v => state.picks.has(v.id));
  let out = '';
  out += 'I selected ' + picked.length + ' additional motion vocabularies from the nebula motion gallery (round 3). Append each to skills/direct/reference/curated-pools/motion.md as a new V<n> entry (numbering continues from the existing 9 round-2 entries), following the schema defined at the top of that file.\\n\\n';
  out += 'For each entry, use the captured discipline verbatim, with Fits/Avoid for inferred:\\n\\n';
  out += '## Selected vocabularies\\n\\n';
  for (const v of picked) {
    out += '### ' + v.name + '\\n';
    out += '  caption: ' + v.caption + '\\n';
    out += '  trigger: ' + v.trigger + '\\n';
    out += '  easing: ' + v.easing + '\\n';
    out += '  duration: ' + v.duration + '\\n';
    out += '  allowed: ' + v.allowed + '\\n';
    out += '  not allowed: ' + v.notAllowed + '\\n\\n';
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
modalBd.addEventListener('click', (e) => { if (e.target === modalBd) modalBd.classList.remove('open'); });
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
const outPath = path.join(outDir, 'motion-playground.html');
await fs.writeFile(outPath, html);
const stats = await fs.stat(outPath);
console.log(`wrote ${outPath}  (${(stats.size / 1024).toFixed(1)} KB)`);
