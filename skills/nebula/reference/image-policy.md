# Image policy

> Policy decision: 2026-05-14.
>
> **Default source: picsum.photos.** Pages render with picsum.photos
> photography unless the user has supplied assets (which takes priority) or
> has explicitly asked for generated imagery (opt-in, future). The previous
> `source.unsplash.com` endpoint was deprecated by Unsplash in 2024 and
> never appears in nebula renders.
>
> Same human-sourced principle that governs palettes and typefaces holds for
> images: real photography by real humans. AI image generation is reserved
> for briefs that *explicitly request* generative-as-the-aesthetic — never
> as a silent default.

## The 3-way resolution chain

`render` resolves each image slot in `DESIGN.json.extensions.imageSlots[]`
through this chain, in order:

1. **User-supplied** (`nebula/assets/images/<role>.<ext>`)
   - Check the local directory first. Recognised extensions: `webp`,
     `jpg`, `jpeg`, `png`.
   - If a file matching the slot's `role` is present, use it.
   - Mark `data-img-source="user"` on the rendered element.

2. **picsum.photos seed URL** (default)
   - Construct: `https://picsum.photos/seed/<keywords-joined-by-hyphen>/<w>/<h>`
     where `<w>`/`<h>` derive from the slot's `aspectRatio` and the
     desired render size, and `<keywords-joined-by-hyphen>` is the
     slot's `keywords[]` array joined with `-`.
   - Mark `data-img-source="picsum"`.
   - This URL is **free, no API key required**, deterministic by
     seed (same keywords → same photo), and still working in 2026.
     **The previous `source.unsplash.com/featured/<w>x<h>/?<keywords>`
     endpoint was deprecated by Unsplash in 2024 and no longer
     serves images — never emit it.**

3. **Generated** (opt-in only, future implementation)
   - When `DESIGN.json.extensions.imagePolicy === "generate"`,
     a future revision will integrate with a generation service.
   - **Currently NOT IMPLEMENTED.** When the policy is set, render
     surfaces this clearly and falls back to Unsplash with a warning.
   - Mark `data-img-source="generated"` once implemented.

4. **Labeled placeholder** (final fallback)
   - If none of the above produces an image (network error, invalid
     response), render a CSS-only placeholder card with the slot's
     `altText` as visible text and `data-img-source="placeholder"`.
   - Placeholders are a *visible TODO*, not a polished default.

## How `direct` picks the policy

The `imagePolicy` field on `DESIGN.json` is derived at direct time, in this
priority order:

1. **User-supplied assets present.** If `nebula/assets/images/` exists and
   contains at least one file matching a slot role, set
   `imagePolicy: "user-supplied"`. Render still falls back to picsum.photos for
   slots without a matching file.

2. **Brief explicitly requests generation.** If the brief contains phrases
   like *"generate the imagery"*, *"AI-generated photos"*, *"images by
   model"*, *"render with generated images"*, set
   `imagePolicy: "generate"`. Surface to the user that generation is
   currently not implemented and picsum.photos will be used as fallback.

3. **Default.** `imagePolicy: "picsum"`.

## Default hero treatment

**The hero section defaults to a full-bleed photographic background
image (M1 photographic hero) unless the brief or anchor signals
otherwise.** This is the most load-bearing default in the plugin:

- The hero is the page's first viewport — its impression sets the page.
- A full-bleed photograph carries subject, mood, and register all at
  once, in less type than a type-led hero would need.
- Pairs strongly with the **dark palette default** (see
  `direct/SKILL.md` Phase 2 § Default leans) — dark `bg` role +
  photographic hero is the strongest first-viewport contrast available
  in the plugin's vocabulary.

**Override conditions** (each silently switches the default; surface
the substitution in `direct`'s gate report so the user can correct):

- Brief signals a non-photo hero: *"type-led hero"*, *"abstract hero"*,
  *"logo-only hero"*, *"no hero image"*, *"minimal hero"*, *"hero is
  the headline"*.
- Anchor family in the no-photos column (Codex / Op-Ed / Manifesto /
  brutalist / type-led / Utilitarian Tight / Data Dense / civic
  institutional in restrained mode) — the per-anchor skip rule
  excludes M1 entirely.

## Photography prominence (when M1 is picked)

When M1 is in play (the default + most picked-cases), photography
must be **prominent and well-handled**, not boxed and apologetic:

- **Full-bleed scale.** The hero element uses `min-height: 90vh` to
  `100vh` so the photograph fills the first viewport. No 16:9-letterboxed
  hero with a header above and a CTA-section below it — the hero *is* the
  photo.
- **Text contrast care.** Apply `Pitfall A` scrim correctly — scrim is
  on the **parent section's** `::after`, never on the filtered photo's
  pseudo-element. Verify WCAG AA at the densest type area at minimum;
  AAA where the brief demands.
- **Brand-anchored keywords.** When sourcing from picsum.photos (or any
  fallback), the slot's
  `keywords[]` array must read as specific to the brand subject — *not*
  stock-photo clichés. For a ceramicist:
  `[ceramic-studio, hands-at-wheel, warm-light, raw-clay]`, not
  `[creative, studio, work, business]`.
- **Subject-side scrim weight.** Vertical scrim is darker at the band
  carrying type (heading + body + CTA); horizontal scrim is heavier on
  the side carrying the type column. M1's recipe encodes this.

## How `direct` picks image slots

When the picked moves include the photographic family (M1–M5), derive
slots one-to-one with the moves' image requirements:

| Move | Slots produced | Aspect ratio | Notes |
|---|---|---|---|
| M1 Photographic hero | 1 slot, role `hero` | `16:9` or `21:9` | keywords from anchor + brief |
| M2 Photographic card | N slots, roles `card-1` … `card-N` | `3:4` | N = card-grid count, typically 3–6 |
| M3 Atmospheric band | 1 slot, role `atmos-band` | `21:9` | keywords from anchor mood; filter applied |
| M4 Fade-into-page mask | 1–2 slots, role `subject-portrait` | `4:5` or `3:4` | masked at top/bottom |
| M5 Cinematic closer | reuses M1's image at heavier filter | (inherited) | no new slot — same source URL |

Each slot encodes:

```json
{
  "id": "hero-1",
  "role": "hero",
  "moveId": "M1",
  "aspectRatio": "16:9",
  "dimensions": { "w": 1600, "h": 900 },
  "keywords": ["ceramic-studio", "pottery-wheel", "warm-light", "hands"],
  "altText": "A ceramicist's hands on the wheel in a warm-lit studio."
}
```

## Per-anchor defaults: when to skip image slots entirely

Some anchor families don't want photography. For these, `direct`
**should not pick M1–M5** from the moves library; the renderer has no
image slots to resolve.

| Anchor family | Photo policy |
|---|---|
| Codex, Op-Ed, Manifesto (long-form text-led) | no photos; CSS-generated geometry only |
| Brutalist statement | no photos; geometric / rule-line composition |
| Type-led / type-foundry anchors | no photos; type as the surface |
| Utilitarian Tight, Data Dense | no photos; data / panel composition |
| Civic-institutional (publication-only register) | no photos by default; brief can override |
| Catalog (D11) | **photos required** — but as product cards (M2), never as hero (M1) |
| Hospitality, boutique hotel, music label, cinema, festival, luxury fashion, editorial, documentary | photos earn moves M1–M5 by default |

When an anchor in the no-photos column is paired with a brief that
*does* call for imagery (e.g., editorial-essay brief on a Codex
anchor), `direct` may pick M4 (fade-into-page mask) as a measured
single-photo exception. M1, M2, M3, M5 stay forbidden.

## Image discipline

To avoid the "every nebula page looks stock-flavored" failure mode:

- **Max 4 photos per page** across all slots. A six-card M2 grid is OK
  *only* if it's the only photo set on the page; otherwise cap card
  count at 3 to stay under the budget.
- **Mix subject and texture.** Not all 4 photos should be of human
  subjects; at least one should be atmospheric / environmental
  (M3 territory).
- **Brand-anchored keywords, not stock clichés.** For a ceramicist:
  prefer `ceramic-studio, hands, pottery-wheel, warm-light` over
  `creative, studio, work`. The keyword list lives in the slot and is
  authored by `direct` from anchor + brief — never from "what stock
  photos exist for X."

## User asset convention

When the user wants to ship with their own photography:

- Create `nebula/assets/images/` in the project root (not inside the
  plugin — alongside `nebula/brief.md`, `nebula/direction.md`, etc.).
- Name files by slot role: `hero.webp`, `card-1.jpg`, `card-2.jpg`,
  `subject-portrait.png`, etc.
- Recommended formats: WebP (best compression for photographs), JPEG
  (universally supported), PNG (only for transparency / illustration).
- `direct` doesn't need to know the files exist — `render` checks at
  resolution time and falls back per the chain.

## Provenance and accessibility

Every rendered image must carry:

- `data-img-source="<user|picsum|generated|placeholder>"`
- `data-img-slot-id="<slot-id>"` (back-reference to DESIGN.json)
- `alt="<slot.altText>"` — always present; describe the photographic
  subject, not the design role
- `loading="lazy"` (except hero / above-the-fold, which may be eager)
- `decoding="async"` for non-critical photos

## Validation at render

The `render` skill's Phase 4 (validations) must check:

- Every slot in `DESIGN.json.extensions.imageSlots[]` resolved to a
  rendered image (or a labeled placeholder).
- Every rendered photographic element has a `data-img-source` attribute.
- Total photo count is within the image-discipline budget (≤ 4 unless
  the anchor is Catalog with a card grid).
