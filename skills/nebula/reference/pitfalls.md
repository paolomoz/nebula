# Pitfalls

> **Status: stub — human-authored content required.**
>
> This file lists named rules render must respect. Each pitfall has an ID,
> a description of the failure mode, and a check the agent can run on the
> rendered output.

The agent reads this file in `nebula:render` Phase 4 to validate the
rendered HTML beyond impeccable's own checks.

## Schema for each pitfall

```
## Pitfall <letter> — <short name>

**Failure mode.** What goes wrong if this is violated, with a concrete
example.

**Check.** How the agent verifies the render is clean. Either a
description of an inspect step, a specific CSS / DOM pattern to look
for, or a measurable validation.

**Remedy.** What to change to satisfy the check.
```

## The pitfalls

<!-- TODO (human-authored): the user has already referenced "Pitfall A"
     in the moves discussion (the photo's ::after vs the parent's ::after
     for scrim layering). Transcribe that and any others when authoring. -->

*TODO: Pitfall A — scrim under filtered photo (parent's ::after, not
photo's, so the photo's filter doesn't dim the scrim).*

*TODO: additional pitfalls as you author them.*
