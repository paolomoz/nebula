# Render contract

What a finished nebula page (`nebula/index.html`) must satisfy. Render
checks itself against this contract at Phase 4 before declaring complete.

## Self-containment

- Single HTML file. No external CSS files; CSS inlined in `<style>`.
- External fonts via standard CDN imports (Google Fonts, Adobe Fonts).
  If a typeface in the picked pool requires a self-hosted file, the
  agent surfaces this as a gap rather than substituting.
- JS only if the picked moves require it; if needed, inlined in `<script>`.
- No build step required to view the file. Drop into a browser, page works.

## Token surface

A `:root` block at the top of `<style>` exposes every design token from
`DESIGN.json` as a CSS custom property. The naming follows
`--<role>-<modifier>` (e.g., `--ink-primary`, `--paper-default`,
`--space-band`, `--type-display-scale`). This is the interface for any
downstream consumer that wants to re-skin without re-rendering.

The token surface is exhaustive:

- Colors — every role from the picked palette.
- Typography — family, scale ratio, size for each step, weight per role,
  line-height per role.
- Spacing — base unit, section padding (desktop/tablet/mobile), inter-
  element rhythm.
- Radii — per role from the picked edge language.
- Motion — duration values, easing curves from the picked motion vocabulary.

## Structural data-attributes

Every major section carries `data-section="<role>"` where `<role>` is one
of the canonical role names declared in the page-shape brief
(`hero`, `value-stack`, `feature-band`, `proof`, `cta-closer`, etc.).
Sub-sections carry `data-block` if relevant.

Every named move applied to the page is reflected in the markup via
`data-move="M<n>"` on the section it applies to.

## Validation gate

Render is complete only when every check passes:

- **Impeccable hard rules.** Run impeccable's craft commands; address
  every issue. No pure black/white, OKLCH for all colors, no glassmorphism,
  no side stripes, no gradient text, ≥1.25 type ratio for brand register.
- **Contrast.** AA minimum on every text-against-surface pair; AAA on
  body type when the brief asks for it.
- **Nebula pitfalls.** Every named pitfall from
  `skills/nebula/reference/pitfalls.md` is checked and passes.
- **Move integrity.** Every move named in `DESIGN.json` is applied; every
  move applied is named in `DESIGN.json`. No orphan moves either direction.
- **Tension visible.** The named tension from the direction trace is
  legible in the rendered page. (E.g., if the tension is *"serif body
  + brutalist display"*, both surfaces should be visible from the first
  viewport.)
- **No fabricated content.** Every named-person quote, statistic, address,
  testimonial in the markup is sourced from the brief or marked as
  `data-placeholder="true"` with a visible placeholder indicator. The
  agent does not invent named people or facts.

## What the contract does NOT cover

- Aesthetic correctness. That is the user's call after viewing the page.
- Section-level composition decisions. Those live in `nebula/shape.md`.
- Tokens that downstream products may extend. The token surface above is
  the minimum; products may add their own.
