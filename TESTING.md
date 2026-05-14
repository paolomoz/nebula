# Testing nebula

> First-test plan for the round-1 plugin (brief → direct → render with
> moves + signatures wired end-to-end).

## Prerequisites

- Claude Code installed.
- **impeccable** installed (hard dependency, no fallbacks). Install
  from <https://github.com/pbakaus/impeccable> if needed.
- A clean project directory (`mkdir nebula-test-1 && cd nebula-test-1`).

## Install nebula

Install the plugin from this repo:

```
# from inside Claude Code
/plugin install paolomoz/nebula
```

Or vendor it manually by cloning into your harness's `skills/` directory.

## Test sequence

Three commands in order. Each writes artifacts the next consumes.

### 1. Brief

```
/nebula brief
```

Or, with a seed phrase:

```
/nebula brief "portfolio for a Berlin-based ceramicist who only sells direct"
```

Watch for:
- **Restatement.** The agent should restate the brief in one sentence
  before asking anything.
- **Question discipline.** ≤ 3 clarifying questions, all on
  audience / purpose / vibe / constraints — *never* on anchor /
  typography / palette / motion / edges (those are nebula's job).
- **Output:** `nebula/brief.md` and `nebula/state.json` with
  `stage: briefed`.

### 2. Direct

```
/nebula direct
```

Watch for:
- **Silent anchor selection.** No questions during Phase 1. The chosen
  anchor and two runner-ups should surface only in the Phase 6 gate
  report.
- **Axis picks from the pools.** Each of the 5 axes should cite a
  specific entry ID (T<n> / D<n> / P<n> / V<n> / E<n>) from the
  curated-pools files. **No invented font/palette/move/signature
  names.** If the agent invents anything, that's a regression.
- **Named tension.** Phase 3 must declare exactly one productive
  contradiction. Failure to declare = re-pick at least one axis.
- **Moves: 2–4 picked.** Each cited by ID (M1–M5 from
  `moves-library.md`).
- **Signatures: 0–2 picked.** Each gated on the four constraints
  (tech-stack budget · anchor eligibility · anti-pairs · specimen
  availability). Zero is a valid and common result.
- **Gate report.** A single-screen summary with the distinctiveness
  count (≥ 3 axes diverging from LLM-default).
- **Output:** `PRODUCT.md`, `DESIGN.md`, `DESIGN.json`,
  `nebula/direction.md`, `nebula/state.json` with `stage: directed`.

### 3. Render

```
/nebula render
```

Watch for:
- **Specimen reading.** For each picked signature with a local
  specimen, the agent should *read the specimen file end-to-end*
  before rendering — not just glance at the catalog entry.
- **Adaptation, not copying.** Specimen placeholder copy → brief
  content. Specimen colors → design tokens. Specimen fonts → picked
  Google Fonts. Specimen structure preserved.
- **`data-signature="<S-id>"` wrappers** present in the rendered
  HTML for each picked signature.
- **Validation gate.** Impeccable's craft loop + nebula pitfalls +
  signature/move integrity must all pass before declaring complete.
- **Output:** `nebula/index.html` (self-contained),
  `nebula/shape.md`, `nebula/state.json` with `stage: rendered`.

## What the first test will calibrate

Expect these to need tuning after observing one or two real runs:

- **Specimen adaptation quality.** How well does the agent substitute
  brand tokens into a specimen without breaking its motion timing or
  structural patterns?
- **Tech-stack budget.** Is the trust-led-B2B → vanilla-only rule too
  strict? Does music-label → WebGL feel earned?
- **Distinctiveness check.** Is ≥3-axes-diverge the right threshold,
  or does it force over-styling on briefs that genuinely want quiet?
- **Move pick count.** Is 2–4 moves the right range? Some briefs may
  want one strong move; very few warrant four.
- **Gate verbosity.** Is the Phase 6 gate report useful to scan, or
  does it become noise after the first few runs?
- **Anchor selection.** Do the silent-picked anchors feel defensible?
  Should the runner-ups be visible earlier?

## Iteration loop after the first render

- **Composition-level fix** (e.g., *"the hero needs a quote"*) →
  `/nebula render --refine`. Direction stays.
- **Axis-level change** (e.g., *"the typography is wrong"*) →
  `/nebula direct --re-direct`. The previous render is stale-flagged.

## Reporting issues

When something surprises you in a test run, capture:

1. The brief that produced it.
2. The Phase 6 gate report from `direct`.
3. The render report from `render`.
4. What specifically surprised — the artifact, not just the impression.

Open an issue at <https://github.com/paolomoz/nebula/issues> with
those four. The artifacts in `nebula/` (brief, direction, shape,
index) are the durable evidence.
