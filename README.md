# nebula

> Design a great single-page website from scratch.

Nebula is a Claude Code plugin for greenfield single-page design — typically a
home page. It is a higher-level skill built **on top of
[impeccable](https://github.com/pbakaus/impeccable)**: impeccable owns *how* to
design well; nebula owns the specific job of taking a brief and turning it
into a single page that has personality.

Nebula is the sibling of [stardust](https://github.com/adobe/skills):
**stardust** redesigns existing sites (starts from `extract`); **nebula**
designs new ones (starts from a `brief`). Both ride on impeccable, neither
depends on the other.

## Pipeline

```
brief  →  direct  →  render
```

1. **brief** — capture the user's input (name, audience, purpose, vibe,
   optional inspiration). Writes `nebula/brief.md`. Asks at most 2–3
   clarifying questions if the input is sparse.
2. **direct** — pick an anchor (silently, from human-curated candidates),
   commit on the 5 personality axes (typography, density, color, motion,
   edges), and write the target spec (`PRODUCT.md`, `DESIGN.md`,
   `DESIGN.json`) plus a reasoning trace at `nebula/direction.md`.
3. **render** — generate a self-contained `nebula/index.html` via
   impeccable's craft loop, executing the moves named in `DESIGN.md`.

## Surface

```
$nebula                  # state report + next recommended step
$nebula brief [phrase]   # capture / refine the brief
$nebula direct           # resolve direction (anchor + 5 axes)
$nebula render           # render the single-page HTML
```

## Hard dependency

Nebula requires impeccable to be installed. There are no fallbacks. On every
invocation nebula verifies the impeccable skill is reachable and aborts
otherwise with a clear install hint.

## Human-sourced taste

Nebula's curated content — typefaces, palettes, motion vocabularies, density
schools, edge languages, and design moves — is **human-authored, not
LLM-generated**. The point of the plugin is to replace "LLM's average taste"
with curated taste; the reference pools and moves library encode that taste
and grow over time.

## What nebula does NOT ship

- **No design language of its own.** All hard design rules are impeccable's.
  Nebula adds *greenfield-specific* opinions (the 5 axes, the anchor model,
  the moves library).
- **No multi-page output.** Narrow scope by design: one page (typically a
  home page). Multi-page is out of scope for v0.x.
- **No closed brief vocabulary.** The user's input is open. The agent reasons
  about it in public.

## Status

`v0.1.0` — initial scaffold.

## License

Apache-2.0
