# Curated pool — edge languages

> **Status: rounds 1–2 authored 2026-05-14 (8 edge languages, all restrained).**
>
> This pool lists named edge languages the agent samples from in
> `nebula:direct` Phase 2 (axis A5). Each entry defines a corner-radius
> philosophy and a border treatment as a *committed posture* — not a
> default. Rounds 1–2 all sit in the same restrained register: modest
> radii (0–12px), hairline-or-no borders, no statement moves. Statement
> postures (notch, dashed, concrete slab, mat-board, glass etched, etc.)
> were deliberately deferred — they can be authored later when a brief
> calls for a signature edge.

The agent reads this file when committing on the edge language axis.
**Sample from this list; do not pick a radius value freely.**

## Schema for each entry

```
## E<n> — <name>

**Corner posture.** What corners say about the design. One paragraph.
**Radii.** Specific values per role: surface containers, buttons,
inputs, badges, images, cards.
**Border treatment.** Hairline (1px / 0.5px), heavy (2–4px), none.
Color sourcing (token, neutral, accent). Where borders carry weight
and where they are absent.
**Divider treatment.** Section dividers (rule lines, ground-color
swaps, whitespace alone). Inline dividers (between list items, between
cards).
**Fits.** Anchor families / brief signals this edge language fits.
**Avoid for.** Briefs / anchors this edge language should not be used for.
```

## Entries

## E1 — Hairline crisp

**Corner posture.** A whisper of radius — 2px on every role. Just enough that nothing reads as cut by a knife, not enough to look soft. Hairline borders on containers, no borders on filled buttons, no shadows. The page reads as editorial or civic, and crucially, *type does the work* — the edges step back so the words can come forward.

**Radii.**
  - card:   `2px`
  - button: `2px`
  - input:  `2px`
  - badge:  `2px`
  - image:  `2px`

**Border treatment.** 1px `var(--rule)` hairline on cards and inputs — quiet enough that the container is felt rather than seen. No border on buttons (they're filled), no border on badges (they're filled), no border on images (the image's own value carries it). The hairline is *neutral-cool*, not ink-black — sourced from the design-token rule color, not the body ink.

**Divider treatment.** Thin 1px rule line between major sections; occasional hairline accent (using the brand spark color) for chapter-level breaks where a section deserves a register shift. No ground-swap blocks; the rule and the whitespace do all the section separation.

**Fits.** Editorial / publication, civic / institutional, documentary / journalism, trust-led B2B / fintech, tech research / academic, healthcare clinical, sustainable / eco; restrained brand signals; any brief where type should lead and edges should disappear. Editorial-revival, civic, and material-led anchor families. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech (too quiet to support the energy), brutalist statement (too soft to carry the posture), luxury fashion / fragrance (lacks the deliberate-luxury cue that wants either a heavier statement or no border at all). <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html → user pick
  pickedAt: 2026-05-14
-->

## E2 — Soft product

**Corner posture.** 10px on cards, 8px on buttons, capsule badges. No visible borders on surfaces — depth comes from a very subtle shadow that draws the card boundary instead. The contemporary product posture, but *committed about no-border*: the absence is deliberate, not the result of forgetting to set one. Cards float; buttons sit; the page feels modern without trying to.

**Radii.**
  - card:   `10px`
  - button: `8px`
  - input:  `8px`
  - badge:  `999px` (capsule)
  - image:  `8px`

**Border treatment.** No border on cards. No border on buttons (filled). 1px `var(--rule)` hairline on inputs only — inputs need to read as enterable surfaces, and the hairline is the cheapest accurate signal. Card boundary is drawn instead by a subtle diffuse shadow: `0 2px 8px rgba(0,0,0,.06)`. The shadow is the boundary; that's the substitution this language makes.

**Divider treatment.** Whitespace alone between sections — no rule lines, no ground-swap bands. The shadow on cards + section padding does all the visual separation. Inline lists separate by spacing (no separators between cards in a grid).

**Fits.** Trust-led B2B / fintech, tech research / academic, contemporary product showcases, healthcare clinical, sustainable / eco, civic-modern, indie game / playful tech (lighter variant), vibrant consumer / playful (when paired with a calm palette); modern web product anchor families. <!-- inferred -->

**Avoid for.** Brutalist statement, editorial / long-read (the floating-card metaphor competes with reading flow), wine / spirits (lacks the materiality the register wants), music label (too quiet to carry sleeve-art energy), boutique hotel (too contemporary-tech for hospitality warmth). <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html → user pick
  pickedAt: 2026-05-14
-->

## E3 — Library hairline

**Corner posture.** Zero radius on every role. 1px hairline-rule borders on cards and inputs, nothing on buttons (filled), no shadows. The library register — structure without softening; the page reads as a built thing, made of straight lines and right angles.

**Radii.**
  - card:   `0px`
  - button: `0px`
  - input:  `0px`
  - badge:  `0px`
  - image:  `0px`

**Border treatment.** 1px `var(--rule)` hairline on cards and inputs. The borders *are* the geometry — without them, zero-radius surfaces would float as raw rectangles with no boundary signal. No border on buttons or badges (filled). The hairline is neutral-rule, not ink — present enough to draw a container, quiet enough not to compete with type.

**Divider treatment.** Thin 1px rule line between major sections; quiet, no accent. The page accumulates structure through repeated rule lines rather than through ornament.

**Fits.** Civic / institutional (the library is in the name), editorial / publication, documentary / journalism, tech research / academic, trust-led B2B / fintech (the more conservative end); reference and archive sites; brutalist-adjacent registers without the heaviness. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, luxury fashion / fragrance, hospitality, boutique hotel (lacks warmth); contemporary product brands where the absolute absence of radius reads as dated rather than as posture. <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## E4 — Civic 4

**Corner posture.** Uniform 4px radius on every role. Small enough that the page still reads as structural, large enough that nothing has the cut-by-knife feel of zero radius. The government / library / civic-modern register — softer than crisp, still structural. The page reads as careful, considered, public-facing.

**Radii.**
  - card:   `4px`
  - button: `4px`
  - input:  `4px`
  - badge:  `4px`
  - image:  `4px`

**Border treatment.** 1px `var(--rule)` hairline on cards and inputs. No border on buttons (filled) or badges. The uniformity is the move — every container softens by the same amount; the page has a single corner voice.

**Divider treatment.** Thin rule between sections, whitespace within. No accent rules, no ground-swaps.

**Fits.** Civic / institutional, healthcare clinical, trust-led B2B / fintech, tech research / academic, documentary / journalism; modern-government register; reference applications that don't want to read as too sharp. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, music label, luxury fashion / fragrance (too utilitarian for premium); brands that need to feel expressive or sensory. <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## E5 — Workshop

**Corner posture.** 4px radii throughout, but borders fire *only on inputs* — cards are borderless, buttons are filled. The tool-and-utility register: the inputs declare themselves because that's where work happens; the cards step back because they're just frames around the work.

**Radii.**
  - card:   `4px`
  - button: `4px`
  - input:  `4px`
  - badge:  `4px`
  - image:  `4px`

**Border treatment.** 1px `var(--rule)` hairline on inputs only. No border on cards (they sit as paper-on-paper). No border on buttons (filled) or badges. The asymmetry is intentional: the input is the most important atom in this register, and the border declares it.

**Divider treatment.** Whitespace between sections by default. A thin rule appears only on *tool boundaries* — between functional zones, not between content sections.

**Fits.** Tech research / academic, trust-led B2B / fintech, civic-modern, sustainable / eco; tool-and-utility products; developer dashboards; admin consoles; data interfaces where work is the subject. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, music label, luxury fashion / fragrance, boutique hotel; brand-led marketing sites where containers need to declare themselves. <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## E6 — Quiet card

**Corner posture.** 6px on cards and buttons, capsule badges. No borders anywhere except inputs. No shadow. The documentation register — easy to read, almost invisible as a system. The page reads as text laid on slightly softened sheets; nothing is asked of the user's attention by the edges.

**Radii.**
  - card:   `6px`
  - button: `6px`
  - input:  `6px`
  - badge:  `999px` (capsule)
  - image:  `6px`

**Border treatment.** No borders on cards or buttons. 1px `var(--rule)` hairline on inputs (inputs always need to read as enterable). The system is *almost invisible* — only the input border tells you there's a system at all.

**Divider treatment.** Whitespace alone between sections. No rule lines, no shadows separating elements. The page relies entirely on padding and section spacing.

**Fits.** Documentation, help systems, tech research / academic, trust-led B2B / fintech, sustainable / eco, contemporary product; reading-heavy product surfaces; admin tools that want to disappear into the content. <!-- inferred -->

**Avoid for.** Brutalist statement, editorial (too soft for the long-read register that wants type-led structure), music label, indie game / playful tech, hospitality (too quiet for sensory brands). <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## E7 — Notebook

**Corner posture.** 6px on cards, 4px on buttons (the action commits a little more than the container). Hairline-rule border on cards only — the card is a sheet of ruled paper, the surroundings are blank desk. Note-taking / research-app register; the page reads as a journal.

**Radii.**
  - card:   `6px`
  - button: `4px`
  - input:  `4px`
  - badge:  `999px` (capsule)
  - image:  `6px`

**Border treatment.** 1px `var(--rule)` hairline on cards (the ruled-sheet metaphor) and on inputs (enterable surface). No border on buttons or badges. The card border is what makes this language read as journal — without it, cards would float and the metaphor would collapse.

**Divider treatment.** Thin rule line between sections — consistent with the journal-page metaphor where rules are how pages organize themselves.

**Fits.** Note-taking products, research applications, documentary / journalism, editorial / publication (modern variant), tech research / academic, sustainable / eco; ruled-paper / journal metaphors; reading-and-writing surfaces. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, music label, hospitality, brutalist statement; brands that need to feel premium, loud, or sensory. <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->

## E8 — Breath

**Corner posture.** 8px cards, 6px buttons, capsule badges. Hairline on inputs only. Very subtle shadow on cards — a *breath* of elevation, not a lift. The card barely sits above the page; you feel it more than see it. Documentation-meets-product register.

**Radii.**
  - card:   `8px`
  - button: `6px`
  - input:  `6px`
  - badge:  `999px` (capsule)
  - image:  `8px`

**Border treatment.** No border on cards (the breath shadow draws the boundary). No border on buttons or badges (filled). 1px `var(--rule)` hairline on inputs. The shadow is the lightest possible — `0 1px 3px rgba(0,0,0,.04)` — calibrated so a card with a hairline border would look heavier than one with this shadow alone.

**Divider treatment.** Whitespace between sections; the subtle card shadow does the work of separating elements within. No rule lines.

**Fits.** Trust-led B2B / fintech, tech research / academic, contemporary product, healthcare clinical, sustainable / eco, civic-modern, documentation surfaces; documentation-meets-product register; modern web application surfaces. <!-- inferred -->

**Avoid for.** Brutalist statement, editorial / long-read (the breath shadow competes with reading flow), wine / spirits (lacks the materiality the register wants), music label, hospitality, boutique hotel (too quiet for sensory registers). <!-- inferred -->

<!-- _provenance:
  writtenBy: edges-playground.html (round 2) → user pick
  pickedAt: 2026-05-14
-->
