---
name: brief
description: Capture the user's input for a new single-page website design — name, audience, purpose, vibe, optional inspiration references. Writes nebula/brief.md. Asks at most 2–3 clarifying questions if input is sparse. Use when starting a new nebula design or when invoked via /nebula:brief.
license: Apache-2.0
---

# nebula:brief

Capture the user's input for a new single-page design and persist it as
`nebula/brief.md`. The brief is the load-bearing artifact for everything
downstream: `direct` resolves direction *against* the brief; `render` is
ultimately answerable to it.

`brief` does **not** make design decisions. No anchor, no typeface, no
palette. Those happen in `direct`. The brief captures intent only.

## Inputs

- `<phrase>` — optional positional. The user's opening words ("a portfolio
  for a Berlin-based ceramicist", "landing page for a B2B fintech that
  serves accountants"). If omitted, ask the user for one.
- `--auto` (or `-y`) — **end-to-end mode**. Suppresses Phase 3
  clarifying questions; infers every missing section from the seed
  phrase and marks `<!-- inferred (auto-mode) -->`. See § Auto-mode
  behavior below.

## Setup

1. Run the master skill's setup
   (`skills/nebula/SKILL.md` § Setup) — impeccable dep check, context
   loader, state read.
2. Read `nebula/brief.md` if present. If a brief already exists, ask
   whether the user wants to refine it (additive) or replace it (fresh).
   Default to refine.

## Procedure

### Phase 1 — Receive

Take the user's phrase as the seed of the brief. Restate it back in one
sentence to confirm understanding before asking anything.

### Phase 2 — Identify gaps

A complete brief covers:

- **Name** — the product, company, or person the page is for.
- **Purpose** — what the page is supposed to do (sell, inform, convert,
  showcase, route).
- **Audience** — who the page is talking to (named role, not "users").
- **Vibe / tone** — a short phrase the user owns (not nebula's
  interpretation). Examples: *"quiet and precise"*, *"loud and
  irreverent"*, *"patient and curatorial"*.
- **Inspiration (optional)** — any real-world references the user
  *volunteers*. Verbal references only in v0.x; URL crawl is out of scope.
- **Constraints (optional)** — any hard constraints (must have X section,
  must not look like Y, must support RTL, must hit AAA contrast, etc.).

### Phase 3 — Ask up to 2–3 clarifying questions

Hard ceiling: 3 questions per turn, no exceptions. Prioritise the gaps that
would most change the design direction (typically: audience, purpose,
vibe). Skip questions whose answers can be inferred with high confidence
from the phrase.

Do **not** ask about anchor, palette, typeface, density, or any axis.
Those are nebula's job, not the user's. The brief is intent-only.

### Phase 4 — Write `nebula/brief.md`

Format: markdown with a `_provenance` frontmatter block. Sections:

- **Name** — single line.
- **Purpose** — one or two sentences. What the page should do, and for
  whom.
- **Audience** — named role(s), tone signals, anything the user said about
  the people on the receiving end.
- **Vibe** — verbatim from the user when possible; if synthesised, mark
  `<!-- inferred -->`.
- **Inspiration** — list of volunteered references with a one-line note
  on what about each reference is relevant. Empty list is fine.
- **Constraints** — list of hard constraints. Empty list is fine.
- **Open questions** — anything the user did not answer and nebula did
  not press on; downstream stages may surface these.

### Phase 5 — Update state and recommend next

Update `nebula/state.json`:

- `brief.resolvedAt` = now
- `brief.phrase` = the user's verbatim opening phrase
- `brief.briefFile` = `"nebula/brief.md"`
- `stage` = `briefed`

Print a one-screen summary and recommend `nebula direct`:

```
brief captured
==============

Name:        <name>
Purpose:     <one-line>
Audience:    <named role>
Vibe:        "<verbatim user phrase>"
Inspiration: <count> references
Constraints: <count> entries

Wrote: nebula/brief.md

Next: $nebula direct
```

## Outputs

| Path                | Purpose                                          |
|---------------------|--------------------------------------------------|
| `nebula/brief.md`   | Captured brief, structured.                      |
| `nebula/state.json` | Updated with brief.* fields and `stage: briefed`. |

## Auto-mode behavior (`--auto`)

When `--auto` is set:

1. **Phase 3 clarifying questions are suppressed entirely.** No
   questions are asked, regardless of how sparse the seed phrase is.
2. **Every missing section is inferred** from the seed phrase using
   LLM reasoning. Each inferred section is marked
   `<!-- inferred (auto-mode) -->` so the user can grep for them
   later. Examples of inference:
   - **Name** — extracted from the phrase if a proper noun is present;
     otherwise generated as a category descriptor ("the page",
     "the product").
   - **Purpose** — derived from verbs and intent words in the phrase.
   - **Audience** — inferred from anchor signals (the kind of brand
     described); marked `<!-- inferred -->`.
   - **Vibe** — derived directly from adjectives in the phrase; if
     no adjectives, default to a register-appropriate phrase pulled
     from the anchor family.
   - **Inspiration** — empty list unless the phrase volunteered a
     reference.
   - **Constraints** — empty list unless the phrase named one.
3. **The brief is written immediately** with all inferences in place.
4. **Phase 5 surfaces but does not recommend `$nebula direct`** — the
   orchestrator continues to direct automatically.
5. **`state.json` carries `mode: "auto"` on the brief stage.**

The "phrase too sparse to anchor 3 questions" failure mode does not
apply in auto-mode — the brief is always written, even from a
one-line seed. The user accepts that the inferred brief may not
match their intent; they review the artifact after the fact.

## Failure modes

- **Phrase too sparse to anchor 3 questions.** Surface honestly: *"I'd
  need to ask more than 3 things to make this brief useful — give me a
  paragraph about what you're trying to build, who it's for, and how it
  should feel."* Do not partially-write a thin brief.
- **User says 'figure it out'.** That's a valid brief mode. Capture
  what's volunteered, mark missing sections `<!-- inferred -->` with the
  basis, and let `direct` resolve from minimal input.

## References

- *None yet — brief is intent-only and does not consume curated content.*
