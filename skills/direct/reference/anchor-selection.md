# Anchor selection (invisible)

The procedure `nebula:direct` runs in Phase 1 to pick a real-world anchor
for the design without asking the user. The user only sees the chosen
anchor (and the two runners-up) in the direction report at Phase 6 — by
which point it is reviewable, not interactive.

## Why invisible

Asking the user "what's your anchor?" produces three failure modes:

1. The user says *"I don't know"* and we are no better off.
2. The user names a category (*"modernist"*, *"editorial"*) which is not
   an anchor at all — categories cannot push axes laterally the way a
   specific named reference can.
3. The user names a web reference (*"like Linear"*, *"like Stripe"*),
   which guarantees the result lands in the LLM-default web aesthetic the
   plugin is designed to escape.

Picking silently from human-curated taste lets nebula make the strong
choice and surface it for review.

## Procedure

1. **Read the brief.** Note vibe (verbatim), audience, purpose,
   constraints, any volunteered inspiration.
2. **Generate 3 candidates internally.** Each candidate must be:
   - A **specific named real-world reference** — a film, a building, a
     magazine, a piece of industrial design, a poster series, a city
     block, a piece of typography from a specific source. Not a web
     reference. Not a category.
   - **Drawn from across genres** — the 3 candidates should not all be
     from the same medium (don't propose three magazines).
   - **Plausibly defensible** for this brief — when the user reads the
     name in the direction report, the connection should be legible in
     one sentence.
3. **Score each candidate** on:
   - **Fit (0–5)** — alignment with the brief's vibe, audience, purpose.
   - **Distinctiveness (0–5)** — how far the anchor pushes axes away
     from LLM-default web aesthetics. Higher when the anchor implies
     an unusual type pairing, unusual density, unusual color, etc.
4. **Pick the highest combined score.** Ties broken by distinctiveness.
5. **Record all three.** The two unpicked candidates are surfaced as
   *runners-up* in `direction.md` so the user can redirect if they hate
   the chosen one.
6. **Surface to the user only at Phase 6.** Do not ask anything between
   Phase 1 and Phase 6.

## Anti-patterns

The agent must refuse anchors that fall into these traps:

- **Web references** as anchors (Linear, Stripe, Vercel, Apple, …) — the
  plugin's whole point is to escape these. If the brief volunteers one,
  read it as a *constraint* ("avoid the Linear-shaped result") rather
  than an anchor.
- **Categories** as anchors (modernist, brutalist, editorial,
  minimalist) — categories are descriptions of axes, not anchors.
- **Designer names** as anchors without a specific work (*"Tibor
  Kalman"* — which work?). Pick a specific piece by the designer.
- **Vague historical periods** (*"the 60s"* — what 60s? Penguin
  Classics 60s? Push Pin Studios 60s? IBM 60s?). Pick a specific
  manifestation.

## What is recorded

In `direction.md` under § Anchor:

```
Anchor:        <named reference>
Reason:        <one sentence on how this anchor fits the brief>
Implies on…:
  typography   <implication>
  density      <implication>
  palette      <implication>
  motion       <implication>
  edges        <implication>
Runner-up 1:   <named reference>  (<one-line reason it didn't win>)
Runner-up 2:   <named reference>  (<one-line reason it didn't win>)
```

The five *implies-on* lines are how the anchor pushes the axes laterally
in Phase 2. They are constraints, not predictions: Phase 2 samples from
the curated pool while honoring these implications.
