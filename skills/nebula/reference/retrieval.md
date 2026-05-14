# Retrieval pattern for nebula pools

> Status: 2026-05-14. Every pool and library now has a sidecar
> `.index.json` next to its markdown. `direct` reads the index for
> fast filtering and loads only the top-k full entries from the
> markdown. This document is the contract for that pattern.

## Why indexes exist

As pools grow, loading the full markdown to pick a single entry is
wasteful. The palettes file is ~1,400 lines for 48 entries; the
hovers file is ~960 lines for 15 entries. At 500 palettes, full-load
picking blows the context window before any reasoning happens.

The index sidecar reduces picking from O(N) to O(k):
1. Read the small index → query by tags + stats.
2. Narrow to top 3–8 candidates.
3. Read only those entries' full bodies from the markdown.

The index is **generated**, not hand-authored. Source of truth stays
in the markdown.

## Pool index map

| Pool / library | Source markdown | Index sidecar |
|---|---|---|
| typefaces | `skills/direct/reference/curated-pools/typefaces.md` | `…/typefaces.index.json` |
| palettes  | `skills/direct/reference/curated-pools/palettes.md`  | `…/palettes.index.json`  |
| density   | `skills/direct/reference/curated-pools/density.md`   | `…/density.index.json`   |
| motion    | `skills/direct/reference/curated-pools/motion.md`    | `…/motion.index.json`    |
| edges     | `skills/direct/reference/curated-pools/edges.md`     | `…/edges.index.json`     |
| moves     | `skills/nebula/reference/moves-library.md`           | `…/moves-library.index.json` |
| signatures | `skills/nebula/reference/signatures.md`             | `…/signatures.index.json` |
| hovers    | `skills/nebula/reference/hovers.md`                  | `…/hovers.index.json`    |
| buttons   | `skills/nebula/reference/buttons.md`                 | `…/buttons.index.json`   |

## Index format

Every index file:

```json
{
  "_meta": {
    "pool": "palettes",
    "schemaVersion": 1,
    "builtAt": "<iso-timestamp>",
    "sourceFile": "<path to markdown>",
    "count": 48
  },
  "entries": [
    { "id": "P1", "name": "…", "anchor": "…", "filePath": "…",
      "fits": ["trust-fintech", "tech-research"],
      "avoid": ["brutalist", "vibrant-playful", "indie-game"],
      ...pool-specific extras
    },
    ...
  ]
}
```

Every entry carries:
- `id` — canonical ID (T1, P1, D1, …) referenced in DESIGN.json.
- `name` — display name (matches the H2 heading).
- `anchor` — slug for direct linking within the source markdown
  (e.g., `p1-neutral-harmony-bliss` → GitHub-style markdown anchor).
- `filePath` — relative path to the source markdown.
- `fits[]` — canonical nebula intent IDs the entry serves.
- `avoid[]` — canonical nebula intent IDs the entry should not serve.

Plus pool-specific extras:

| Pool | Extras |
|---|---|
| typefaces | `display: { name, genre }`, `body: { name, genre }`, `scale` |
| palettes  | `roles: { bg, ink, accent, surface1, surface2 }` (each with L/C/h/hex), `stats: { avgLightness, avgChroma, contrastInkBg, bgLightness, bgChroma, isDarkLean, isLightLean, isMonochrome, accentHue, accentChroma }` |
| density   | `values: { pad, lhBody, lhDisplay, scale, base, rhythm, container, gridGap }` |
| motion    | `trigger`, `easing`, `duration` |
| edges     | `radii: { card, button, input, badge, image }` |
| moves     | `useWhen: []`, `pairsWith: []`, `pitfalls: []` |
| signatures | `sectionRole`, `techStack`, `antiPairs: []`, `specimen`, `specimenStatus` |
| hovers    | `appliedTo: []`, `techStack`, `trigger`, `specimen`, `specimenStatus` |
| buttons   | `techStack`, `tier`, `trigger`, `specimenStatus` |

## The retrieval pattern (used by `direct`)

For every axis pick or library pick in `direct`'s phases:

1. **Read the index** (`<pool>.index.json`).
2. **Filter** by:
   - **Anchor-family fit** — keep entries whose `fits[]` includes the
     brief's anchor family (or a close adjacency). Drop entries whose
     `avoid[]` lists the brief's anchor family.
   - **Tech-stack budget** (where applicable — signatures, buttons) —
     keep entries within the anchor's tech tier.
   - **Pool-specific filters** (where useful):
     - palettes: apply the dark-lean default (`stats.isDarkLean`)
       unless the brief signals "light/airy/open/paper/clinical/cream"
       or the anchor implies an editorial-light register.
     - moves: filter by photographic family for picked photo-bearing
       brief; type-led family for type-led briefs.
     - hovers: filter by `appliedTo` — only show hovers that can host
       on a picked move/signature.
3. **Score** the surviving candidates by:
   - **Fit strength** — anchor family is a direct match (+2) vs. an
     adjacency (+1).
   - **Distinctiveness** — drop entries that would also be the
     LLM-default for this anchor (drives the Phase 5 distinctiveness
     check).
   - **Brief signals** — boost entries whose name/character matches
     vibe words from the brief.
4. **Top-k** — keep the top 3–8 candidates (k depends on pool size).
5. **Read only those entries' full bodies** from the source markdown.
   Use `grep -A <lines> "^## <ID>"` or read with section-bounded line
   ranges; never re-read the full file.
6. **Make the pick** from the narrowed candidates with the full
   context available for the final decision.

Read the full markdown only when:
- The pool is very small (<10 entries) — palette breadth filter is
  unnecessary at that size.
- The agent needs the full character paragraphs of all surviving
  candidates to write Phase 8's reasoning trace.
- A failure mode requires the agent to surface what the library
  *doesn't* contain (gap detection).

## Regenerating the indexes

After authoring or editing any pool, regenerate the indexes:

```sh
node scripts/build-indexes.mjs
```

The generator parses each markdown file, extracts fields by labelled
patterns (`**Fits.**`, `**Avoid for.**`, etc.) and pool-specific
structure, and writes the sidecar JSON. Re-runs are idempotent.

The generator should be re-run as part of any commit that touches a
pool markdown file; CI can enforce this (an unstaged index after the
generator runs means the pool was edited without regenerating).

## Distinctiveness check still operates on the full file

Phase 5's distinctiveness check compares the agent's pick to the
**LLM-default** for the brief's anchor. This is a *reasoning* step,
not a filter step — it needs the full character paragraphs to
defend the comparison. Read the picked entry's full body for Phase 5;
read the rejected runners-up's bodies only if the gate report needs
to surface them.

## What lives in the index, what stays in the markdown

**In the index** (read for filtering/scoring, never load the full file
just to read this):
- ID, name, anchor, file path
- fits / avoid (intent IDs)
- Computed stats (palette OKLCH, density values, etc.)
- Specimen path + status (for signatures, hovers, buttons)

**In the markdown only** (read after the pick is narrowed):
- Character paragraphs / posture statements
- CSS / JS recipes
- Detailed "fits" reasoning and "avoid for" reasoning
- Provenance blocks
- Cross-references to other pools

## Schema versioning

Every index carries `_meta.schemaVersion`. Bumps happen when:
- A new pool is added.
- A new required field is added to all entries.
- A field's semantics change.

The generator declares the schema it produces; consumers (`direct`)
should fail loudly if the schema version is unfamiliar rather than
silently proceeding with stale field assumptions.

## Future scaling moves (not built yet)

When pools approach 500+ entries per axis, two further moves become
necessary:

1. **Per-anchor seed pools** — anchor-specific subset indexes
   (`palettes.trust-fintech.index.json`, etc.) — hand-curated subsets
   of ~15 entries each. `direct` picks from the anchor's seed first;
   falls back to the full pool only when the seed is exhausted.
2. **Embeddings retrieval** — entries get embedding vectors; brief
   gets an embedding; top-k cosine match feeds Step 3 above. Reduces
   reliance on tag-overlap and surfaces semantically-close entries
   that don't share explicit tags.

Neither is built. Both are tracked here so the index format above
remains forward-compatible — extras can be added without breaking
existing entries.
