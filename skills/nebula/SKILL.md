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
- **First word is `brief`, `direct`, or `render`.** Delegate to the matching
  sub-command (`nebula:<name>` skill). Pass remaining args through.
- **First word is anything else (a freeform phrase).** Treat it as the
  opening of a brief. Route to `nebula:brief` with the phrase as input.

## The "open and reasoned" principle

Nebula does not ship a closed `intent → choices` lookup. Every freeform
input is reasoned about in public. The user has the final say on direction;
nebula proposes, the user gates between `direct` and `render`.

## Human-sourced taste

Nebula's curated content — typefaces, palettes, motion vocabularies, density
schools, edge languages, and named design moves — is **human-authored, not
LLM-generated**. The reference files under `skills/direct/reference/curated-pools/`
and `reference/moves-library.md` exist precisely because LLM-default choices
are the "AI-slop" failure mode the plugin is designed to prevent. **Sample
from the pools; do not invent fonts, palettes, or moves.** If a needed entry
is missing from the pool, stop and tell the user — do not improvise.

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
  *Human-authored content — see file for status.*
- `reference/moves-library.md` — named design moves (M1, M2, …) indexed by
  anchor family and situation. Consumed by `direct` (selection) and `render`
  (execution).
  *Human-authored content — see file for status.*
- `reference/pitfalls.md` — named rules that must not be violated.
  *Human-authored content — see file for status.*
- `reference/state-machine.md` — lifecycle, state report format, stale rules.
