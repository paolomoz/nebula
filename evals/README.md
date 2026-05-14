# Evals

> **Status: scaffold.**

Placeholder for eval tasks. Mirrors the `evals/` shape used in stardust —
one directory per eval with `task.md` and `criteria.json`.

## Suggested initial evals

- `brief-from-sparse-input` — does brief correctly ask 2–3 high-leverage
  clarifying questions when input is a single phrase?
- `direct-anchor-distinctiveness` — given a brief, does the anchor
  picked land >3/5 axes diverging from default?
- `direct-tension-named` — does direct refuse to proceed when no
  tension can be named?
- `render-self-contained` — is `nebula/index.html` viewable in a
  browser with no external dependencies beyond font CDNs?
- `render-pitfall-A` — does render correctly attach the scrim to the
  parent's `::after` rather than the filtered photo's?

Authoring evals is a follow-up step once the moves and pools have
real content.
