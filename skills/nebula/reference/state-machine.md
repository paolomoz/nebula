# State machine

Lifecycle of a nebula project. Used by the orchestrator (`nebula`) for its
state report and by each sub-skill for stale-flag handling.

## Stages

```
none  →  briefed  →  directed  →  rendered
                                      ↑
                               (re-direct flags
                                this stale)
```

| Stage      | Set by              | Triggered when                                        |
|------------|---------------------|-------------------------------------------------------|
| `none`     | (initial)           | `nebula/state.json` is absent or empty.               |
| `briefed`  | `nebula:brief`      | `nebula/brief.md` is written.                         |
| `directed` | `nebula:direct`     | `PRODUCT.md` + `DESIGN.md` + `DESIGN.json` are written. |
| `rendered` | `nebula:render`     | `nebula/index.html` is written.                       |

## state.json schema

```json
{
  "_provenance": {
    "writtenBy": "<skill>",
    "writtenAt": "<iso-timestamp>",
    "nebulaVersion": "0.1.0"
  },
  "stage": "none | briefed | directed | rendered",
  "brief": {
    "resolvedAt": "<iso-timestamp>",
    "phrase": "<user's verbatim opening phrase>",
    "briefFile": "nebula/brief.md"
  },
  "direction": {
    "resolvedAt": "<iso-timestamp>",
    "anchor": "<chosen anchor name>",
    "directionFile": "nebula/direction.md"
  },
  "render": {
    "resolvedAt": "<iso-timestamp>",
    "indexFile": "nebula/index.html",
    "shapeFile": "nebula/shape.md",
    "stale": false,
    "staleReason": null
  }
}
```

Sections corresponding to stages not yet reached are absent (not present
as null keys).

## Stale rules

- A re-direct (via `nebula:direct --re-direct`) sets `render.stale = true`
  if a render exists. `render.staleReason` records the timestamp of the
  re-direct.
- A clean re-render (via `nebula:render` after a stale flag) clears the
  flag on success.
- Stale flags are advisory: the agent surfaces them in the state report
  and warns before overwriting a stale render, but does not block.

## State report (`$nebula` with no argument)

When invoked without arguments, the orchestrator produces a read-only
report. Format:

```
nebula state
============

Stage:        <none | briefed | directed | rendered>
Last writer:  <skill>  at <iso-timestamp>

Brief:        <yes / no>  →  nebula/brief.md
Direction:    <yes / no>  →  nebula/direction.md  (anchor: <name>)
Render:       <yes / no>  →  nebula/index.html  (stale: <yes / no>)

Next recommended: $nebula <brief | direct | render>
```

The recommended-next column is deterministic:

| Stage      | Recommended next                              |
|------------|-----------------------------------------------|
| `none`     | `$nebula brief`                               |
| `briefed`  | `$nebula direct`                              |
| `directed` | `$nebula render`                              |
| `rendered` | "review and iterate, or describe a refinement to render again" |

If `render.stale` is true, the recommended-next overrides to:
`$nebula render` (with a one-line note that the prior render is stale
against the current direction).
