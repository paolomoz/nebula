---
name: nebula
description: Design a great single-page website from scratch — typically a home page. Reasoned in the open, human-sourced taste, built on top of impeccable. Use when the user asks to design a new website, create a home page, build a landing page from a brief, design something from nothing, or invokes /nebula.
license: Apache-2.0
---

# nebula

You are operating the `nebula` skill: a guided greenfield design of a single
page, typically a home page. The user supplies intent; your job is to reason
about it, propose a direction, and execute through three sub-commands that
delegate the actual craft work to **impeccable**.

Nebula is the sibling of stardust: stardust redesigns existing sites (starts
from `extract`), nebula designs new ones (starts from a brief). Both ride on
impeccable; neither depends on the other.

## Setup (run before anything else)

1. **Verify impeccable is installed.** Nebula has a hard dependency on
   impeccable and ships no fallbacks. Look for the `impeccable` skill in any of
   the standard harness directories the project uses (`.claude/skills/`,
   `.agents/skills/`, `.cursor/skills/`, etc.). If it is not installed, stop
   and tell the user:
   > Nebula requires impeccable. Install it from
   > <https://github.com/pbakaus/impeccable> and re-run the command.
2. **Run impeccable's context loader once per session.** Execute the loader
   at `<harness>/skills/impeccable/scripts/load-context.mjs`. Skip if it has
   already run this session.
3. **Read nebula state.** Read `nebula/state.json` if present
   (`reference/state-machine.md` defines the schema). Note which stages have
   produced artifacts: `brief`, `directed`, `rendered`.

## Routing

Once setup is done, route on the user's input:

- **No argument.** Render the **state report** described in
  `reference/state-machine.md`: which stage we're at, what was last written,
  recommended next command. Do not write anything.
- **`--auto` (or `-y`) flag present anywhere in the input.** Enter
  **end-to-end mode** — see § End-to-end (auto) mode below. Runs
  `brief` → `direct` → `render` in sequence with no gates, no
  clarifying questions, no review pauses. Every inferred /
  substituted decision is marked in the artifacts for after-the-fact
  audit.
- **First word is `brief`, `direct`, or `render`.** Delegate to the matching
  sub-command (`nebula:<name>` skill). Pass remaining args through
  (`--auto` propagates to the sub-skill).
- **First word is anything else (a freeform phrase).** Treat it as the
  opening of a brief. Route to `nebula:brief` with the phrase as input.

## End-to-end (auto) mode

`--auto` is for **first-pass / fast-draft** scenarios — get something
on the screen quickly to iterate on. Not for production renders that
need to be defended. Invoking it means: *"ship what the agent picks;
I'll review the artifacts after, not before."*

Invocation forms:

- `/nebula --auto "<brief phrase>"` — orchestrator runs the full chain.
- `/nebula:brief --auto "<phrase>"` — auto-mode brief only.
- `/nebula:direct --auto` — auto-mode direct only (against existing brief).
- `/nebula:render --auto` — auto-mode render only (against existing spec).

**What `--auto` suppresses** (the gates each sub-skill normally honors):

| Phase | Normal behavior | Auto-mode behavior |
|---|---|---|
| brief Phase 3 (2–3 clarifying questions) | Asks the user | **Suppressed** — every gap is inferred from the seed phrase and marked `<!-- inferred (auto-mode) -->` |
| direct Phase 6 (`"go"` gate) | Waits for confirmation | **Suppressed** — direction is written immediately; gate report is logged but doesn't block |
| direct failure modes (tension undeclarable, distinctiveness collapse, pool gap) | Stops; asks | **Forces best-available pick**: re-rolls the most divergent axis, picks nearest-fit from the pool with `<!-- best-available -->`, never halts |
| direct external-only specimen needs opt-in | Asks the user | **Substitutes** the next-best local specimen from the pool and records the substitution in `direction.md` |
| render Phase 5 (review / refine pause) | Surfaces report, waits | **Suppressed** — report is printed and render exits; no `--refine` pause |
| render external-only specimen with no local fallback | Asks the user | **Falls back to a local-specimen signature** (typically the closest sibling) with the substitution recorded |

**What auto-mode never compromises** (these still hold):

- Anti-pattern rules (no kraft paper / Edison bulbs / "passion" / etc.)
- Pitfall A (scrim under filtered photo) and Pitfall B (sticky containing-block)
- Impeccable craft validation (the final pass still runs; failures are fixed,
  not bypassed)
- Render validations (accent territory, signature integrity, hover coverage,
  load-bearing details, sticky integrity)

**Audit trail.** Every inferred / substituted / re-rolled decision lands in
the artifacts:

- `brief.md` carries `<!-- inferred (auto-mode) -->` markers on every section
  not lifted from the seed phrase.
- `direction.md` carries a `## Auto-mode substitutions` block listing every
  pool gap, distinctiveness re-roll, external-only fallback, and
  tension re-derivation.
- `state.json` records `mode: "auto"` on the run.
- The final render report ends with:
  ```
  Auto-mode summary
  =================
  Inferred brief sections: <list>
  Substitutions in direct: <count>
  Render fallbacks: <count>
  Review the artifacts above to refine; re-run any phase manually to override.
  ```

**Loop end-of-life.** Auto-mode runs the whole chain once and exits.
There is no auto-iterate (`--auto --refine` is not a thing). To
refine, the user reads the artifacts, picks a phase to re-run
manually (without `--auto`), and re-enters the normal gated flow.

## The "open and reasoned" principle

Nebula does not ship a closed `intent → choices` lookup. Every freeform
input is reasoned about in public. The user has the final say on direction;
nebula proposes, the user gates between `direct` and `render`.

## Human-sourced taste

Nebula's curated content — typefaces, palettes, motion vocabularies, density
schools, edge languages, named design moves, and signature effects — is
**human-authored, not LLM-generated**. The reference files under
`skills/direct/reference/curated-pools/`, `reference/moves-library.md`, and
`reference/signatures.md` (plus the specimen HTML files under
`reference/signatures/<slug>/`) exist precisely because LLM-default choices
are the "AI-slop" failure mode the plugin is designed to prevent. **Sample
from the pools; do not invent fonts, palettes, moves, or signatures.** If a
needed entry is missing, stop and tell the user — do not improvise.

## Per-stage state

Stages have a lifecycle: `none → briefed → directed → rendered`. When
direction changes after render, mark the render `stale` and require explicit
user opt-in to re-render. Details in `reference/state-machine.md`.

## Artifacts you read and write

Nebula state lives under `nebula/`. Impeccable's `PRODUCT.md` / `DESIGN.md` /
`DESIGN.json` live at the project root and represent the target spec. The
rendered page lives at `nebula/index.html`. Full layout in
`reference/state-machine.md`.

## Provenance

Every artifact nebula writes carries a provenance block as the first line or
first key, declaring: which sub-command wrote it, against which user input,
what was synthesized vs. authored, and what other artifacts were read.

## What nebula never does

- Invent design opinions that contradict impeccable's hard rules. Defer to
  impeccable.
- Skip the direction gate. Render only runs after `direct` has produced a
  direction and the user has seen it.
- Generate fonts, palettes, or moves from its own taste. Sample from the
  human-curated pools.
- Render multi-page output. One page per nebula project. Multi-page is out of
  scope for v0.x.

## References

- `reference/axes.md` — the 5 personality axes nebula commits on
  (typography, density, color, motion, edges).
- `reference/moves-library.md` — named design moves (M1, M2, …) indexed by
  anchor family and situation. Consumed by `direct` (selection) and `render`
  (execution).
- `reference/signatures.md` — named set-piece effects (S1, S2, …) — set
  pieces distinct from moves; specimens live at
  `reference/signatures/<slug>/index.html`. Carries the composition rule
  (1 motion vocabulary + 0–2 signatures per page) and per-anchor tech-stack
  budget.
- `reference/image-policy.md` — image source policy (picsum.photos by
  default, user-supplied takes priority, generation opt-in only), the
  3-way resolution chain, slot schema, per-anchor skip rules, image
  discipline (max 4 photos / brand-anchored keywords). The deprecated
  `source.unsplash.com` endpoint is explicitly forbidden.
- `reference/hovers.md` — hover effects catalog (H1–H15 from Codrops:
  Sadie, Layla, Honey, Lily, Selena, Apollo, Steve, Marley, Ruby,
  Bubba, Romeo, Dexter, Sarah, Chico, Oscar). Applied as modifiers
  to card-grid host moves; 0–1 hover per card grid; consistency
  within a grid is mandatory.
- `reference/buttons.md` — button animation catalog (B1–B12). Each
  entry is a *button system* (primary + secondary recipes). 0–1 per
  page applied to all buttons; tech-stack budget per anchor family
  (CSS-only for restrained anchors; canvas particle / WebGL only
  when the anchor earns it).
- `reference/links.md` — inline-link effect catalog (L1–L12 from
  Codrops Creative Link Effects: Sansa, Boa, Wilcox, Levin, Roald,
  Almos, Aratron, Magnus, Pinkerton, Eachann, Ergon, Anpan). 0–1
  per page applied uniformly to every body-prose `<a>`; CTAs and
  nav exempt. All CSS-only.
- `reference/retrieval.md` — the index-first retrieval pattern. Every
  pool / library has a sidecar `<pool>.index.json` for fast
  filtering. `direct` reads the index, narrows to top-k candidates,
  then reads only those full entries from the source markdown.
  Regenerate via `node scripts/build-indexes.mjs` after any pool
  edit.
- `reference/pitfalls.md` — named rules that must not be violated.
- `reference/state-machine.md` — lifecycle, state report format, stale rules.
