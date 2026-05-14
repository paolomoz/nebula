# Personality axes

> **Status: stub — human-authored content required.**
>
> This file declares the 5 axes nebula commits on during `direct`. Each axis
> entry should specify *what is committed to*, *how to choose well*, *what
> the AI-default looks like* (so the distinctiveness check has a target),
> and *which curated pool the agent samples from*.

The agent reads this file in `nebula:direct` Phase 2. Every axis listed
here must have a corresponding curated pool under
`skills/direct/reference/curated-pools/`.

## Schema for each axis entry

```
## <axis-id> — <name>

**Commits to.** A one-paragraph definition of what is decided on this axis.
What downstream artifacts encode the decision (DESIGN.md fields,
DESIGN.json keys, render-time choices).

**Choose well by.** Heuristics the agent applies when picking from the
pool: what to weigh, what to avoid, how the anchor and brief interact
with this axis.

**Default-LLM choice.** The unsurprising / template choice a generic
model would make on this axis. The distinctiveness check at
`nebula:direct` Phase 5 compares the agent's pick against this default.

**Pool.** Pointer to the curated-pool file the agent samples from for
this axis.
```

## The 5 axes

<!-- TODO (human-authored): replace these stubs with your authored content.
     The order matters — typography first because it carries the most
     identity per change. Add or remove axes here only with care; the
     direct skill expects exactly the set listed in this file. -->

## A1 — Typography

**Commits to.** TODO

**Choose well by.** TODO

**Default-LLM choice.** TODO

**Pool.** `skills/direct/reference/curated-pools/typefaces.md`

## A2 — Density

**Commits to.** TODO

**Choose well by.** TODO

**Default-LLM choice.** TODO

**Pool.** `skills/direct/reference/curated-pools/density.md`

## A3 — Color palette structure

**Commits to.** TODO

**Choose well by.** TODO

**Default-LLM choice.** TODO

**Pool.** `skills/direct/reference/curated-pools/palettes.md`

## A4 — Motion temperament

**Commits to.** TODO

**Choose well by.** TODO

**Default-LLM choice.** TODO

**Pool.** `skills/direct/reference/curated-pools/motion.md`

## A5 — Edge language

**Commits to.** TODO

**Choose well by.** TODO

**Default-LLM choice.** TODO

**Pool.** `skills/direct/reference/curated-pools/edges.md`
