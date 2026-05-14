# Curated pool — palettes

> **Status: round 1 authored 2026-05-14.**
>
> This pool lists vetted palettes the agent samples from in `nebula:direct`
> Phase 2 (axis A3). Each palette is sourced from a real-world reference (see
> Source field) — by design, *not* generated from a hue wheel. Initial round
> drawn from Coolors community-curated palettes, surfaced through a per-intent
> playground; sources to be replaced by Paolo with defensible real-world
> references over time.

The agent reads this file when committing on the color palette structure
axis. **Sample from this list; do not generate palettes from scratch.**

## Schema for each entry

```
## P<n> — <name>

**Source.** The real-world reference the palette is drawn from. Specific
(*"the cover of Apartamento #28"*, not *"editorial magazines"*).
**Colors.** OKLCH values for every color in the palette, with a role
label (`ink`, `paper`, `accent-a`, `accent-b`, `surface-mute`, etc.).
Role names are brand-native; not `primary`/`secondary` — see
divergence-toolkit § 4.
**Neutral temperature.** Warm / cool / true-gray, with reasoning.
**Contrast strategy.** Where contrast is highest, where it is gentlest,
which roles must hit AA, which can sit below for decorative use.
**Accent allowance.** Where each accent is allowed to fire (CTAs only,
illustrations only, full-bleed bands only, never on small text, etc.).
**Fits.** Anchor families / brief signals this palette fits.
**Avoid for.** Briefs / anchors this palette should not be used for.
```

## Entries

## P1 — Neutral Harmony Bliss

**Source.** TODO (Coolors-curated; original Coolors name: *"Neutral Harmony Bliss"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.5% 0.025 99.5)` · `#F4F1DE`
  - `ink     ` · `oklch(38.0% 0.046 279.1)` · `#3D405B`
  - `accent  ` · `oklch(86.4% 0.089 79.0)` · `#F2CC8F`
  - `surface1` · `oklch(68.8% 0.133 35.8)` · `#E07A5F`
  - `surface2` · `oklch(72.2% 0.063 163.1)` · `#81B29A`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 8.9:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 3.4:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** trust-led B2B / fintech, tech research / academic <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, bold, modern, beach, white
  coolorsLikes: 48.3K
  pickedFor: trust-fintech, tech-research
-->

## P2 — Deep Blue Waters

**Source.** TODO (Coolors-curated; original Coolors name: *"Deep Blue Waters"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(89.0% 0.009 128.6)` · `#D9DCD6`
  - `ink     ` · `oklch(36.1% 0.064 237.4)` · `#16425B`
  - `accent  ` · `oklch(78.0% 0.073 218.9)` · `#81C3D7`
  - `surface1` · `oklch(56.1% 0.092 238.7)` · `#3A7CA5`
  - `surface2` · `oklch(49.3% 0.089 244.2)` · `#2F6690`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 7.7:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 2.3:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** trust-led B2B / fintech <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: winter, sky, sea, blue
  coolorsLikes: 7,820
  pickedFor: trust-fintech
-->

## P3 — Monochrome Beach

**Source.** TODO (Coolors-curated; original Coolors name: *"Monochrome Beach"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(100.0% 0.000 none)` · `#FFFFFF`
  - `ink     ` · `oklch(32.9% 0.000 none)` · `#353535`
  - `accent  ` · `oklch(39.7% 0.058 240.3)` · `#284B63`
  - `surface1` · `oklch(88.5% 0.000 none)` · `#D9D9D9`
  - `surface2` · `oklch(50.4% 0.054 200.6)` · `#3C6E71`

**Neutral temperature.** true-gray-leaning — three or more colors sit close to chromatic zero <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 12.3:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 8.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** trust-led B2B / fintech, tech research / academic; also fits Swiss-grid, system-led anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, gradient, modern, stone, black, white
  coolorsLikes: 23.4K
  pickedFor: trust-fintech, tech-research
-->

## P4 — Gentle Sea Breeze

**Source.** TODO (Coolors-curated; original Coolors name: *"Gentle Sea Breeze"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(100.0% 0.000 none)` · `#FFFFFF`
  - `ink     ` · `oklch(27.0% 0.051 228.1)` · `#022B3A`
  - `accent  ` · `oklch(88.0% 0.049 248.4)` · `#BFDBF7`
  - `surface1` · `oklch(92.3% 0.018 272.3)` · `#E1E5F2`
  - `surface2` · `oklch(53.6% 0.085 214.3)` · `#1F7A8C`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 14.9:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 11.8:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** trust-led B2B / fintech, civic / institutional; also fits Swiss-grid, system-led anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: modern, sea, stone, blue
  coolorsLikes: 7,987
  pickedFor: trust-fintech, civic
-->

## P5 — Earthly Tones

**Source.** TODO (Coolors-curated; original Coolors name: *"Earthly Tones"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(98.3% 0.001 none)` · `#FAF9F9`
  - `ink     ` · `oklch(47.3% 0.032 271.4)` · `#555B6E`
  - `accent  ` · `oklch(90.4% 0.059 56.2)` · `#FFD6BA`
  - `surface1` · `oklch(88.7% 0.040 180.8)` · `#BEE3DB`
  - `surface2` · `oklch(72.8% 0.042 192.4)` · `#89B0AE`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 6.4:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 4.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** editorial / publication <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, sports / athletic, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, modern, sand, beach, white
  coolorsLikes: 21.3K
  pickedFor: editorial
-->

## P6 — Neon Jungle

**Source.** TODO (Coolors-curated; original Coolors name: *"Neon Jungle"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(100.0% 0.000 none)` · `#FFFFFF`
  - `ink     ` · `oklch(16.3% 0.011 132.9)` · `#0C0F0A`
  - `accent  ` · `oklch(64.8% 0.247 9.2)` · `#FF206E`
  - `surface1` · `oklch(84.8% 0.138 182.1)` · `#41EAD4`
  - `surface2` · `oklch(96.5% 0.210 110.9)` · `#FBFF12`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 19.3:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 12.8:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue <!-- inferred -->

**Fits.** brutalist statement; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: neon, bold, black
  coolorsLikes: 7,423
  pickedFor: brutalist
-->

## P7 — Warm Autumn Glow

**Source.** TODO (Coolors-curated; original Coolors name: *"Warm Autumn Glow"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(90.8% 0.057 98.6)` · `#EAE2B7`
  - `ink     ` · `oklch(29.4% 0.066 238.5)` · `#003049`
  - `accent  ` · `oklch(71.9% 0.179 54.4)` · `#F77F00`
  - `surface1` · `oklch(84.0% 0.147 80.5)` · `#FCBF49`
  - `surface2` · `oklch(56.8% 0.208 27.1)` · `#D62828`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 10.6:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 8.4:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** brutalist statement; also fits pop-art and risograph anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, bold, modern, sunset, orange, black, white
  coolorsLikes: 48.2K
  pickedFor: brutalist
-->

## P8 — Rustic Charm

**Source.** TODO (Coolors-curated; original Coolors name: *"Rustic Charm"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(99.1% 0.014 93.0)` · `#FFFCF2`
  - `ink     ` · `oklch(26.1% 0.004 none)` · `#252422`
  - `accent  ` · `oklch(65.6% 0.186 39.4)` · `#EB5E28`
  - `surface1` · `oklch(82.6% 0.018 81.3)` · `#CCC5B9`
  - `surface2` · `oklch(36.2% 0.008 75.3)` · `#403D39`

**Neutral temperature.** true-gray-leaning — three or more colors sit close to chromatic zero <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 15.1:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 9.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue <!-- inferred -->

**Fits.** brutalist statement; also fits Swiss-grid, system-led anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, boutique hotel, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, gradient, modern, autumn, stone, black, white, halloween
  coolorsLikes: 18.5K
  pickedFor: brutalist
-->

## P9 — Olive Garden Feast

**Source.** TODO (Coolors-curated; original Coolors name: *"Olive Garden Feast"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(98.1% 0.034 99.8)` · `#FEFAE0`
  - `ink     ` · `oklch(31.2% 0.053 129.6)` · `#283618`
  - `accent  ` · `oklch(60.9% 0.130 57.3)` · `#BC6C25`
  - `surface1` · `oklch(75.3% 0.110 67.8)` · `#DDA15E`
  - `surface2` · `oklch(50.8% 0.076 119.9)` · `#606C38`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 12.2:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 5.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** quiet craft / atelier; also fits material-led, foraged-palette anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, gradient, autumn, earth, natural, green, orange, white
  coolorsLikes: 98K
  pickedFor: quiet-craft
-->

## P10 — Neutral Elegance

**Source.** TODO (Coolors-curated; original Coolors name: *"Neutral Elegance"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(96.4% 0.007 97.4)` · `#F4F3EE`
  - `ink     ` · `oklch(37.3% 0.013 57.9)` · `#463F3A`
  - `accent  ` · `oklch(79.5% 0.061 37.7)` · `#E0AFA0`
  - `surface1` · `oklch(78.4% 0.011 81.8)` · `#BCB8B1`
  - `surface2` · `oklch(61.0% 0.013 51.2)` · `#8A817C`

**Neutral temperature.** true-gray-leaning — three or more colors sit close to chromatic zero <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 9.3:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 5.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** quiet craft / atelier; also fits Swiss-grid, system-led anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, monochrome, modern, summer, stone, black, white
  coolorsLikes: 23.9K
  pickedFor: quiet-craft
-->

## P11 — Earthy Green

**Source.** TODO (Coolors-curated; original Coolors name: *"Earthy Green"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(85.4% 0.020 133.1)` · `#CAD2C5`
  - `ink     ` · `oklch(35.4% 0.024 231.6)` · `#2F3E46`
  - `accent  ` · `oklch(40.8% 0.032 205.0)` · `#354F52`
  - `surface1` · `oklch(69.9% 0.058 151.2)` · `#84A98C`
  - `surface2` · `oklch(54.4% 0.047 176.7)` · `#52796F`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 7.1:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 4.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** quiet craft / atelier; also fits Swiss-grid, system-led anchor families, material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, monochrome, gradient, winter, earth, natural, sea
  coolorsLikes: 38.4K
  pickedFor: quiet-craft
-->

## P12 — Warm Neutral Tones

**Source.** TODO (Coolors-curated; original Coolors name: *"Warm Neutral Tones"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(97.0% 0.013 196.9)` · `#ECF8F8`
  - `ink     ` · `oklch(69.2% 0.049 63.7)` · `#B2967D`
  - `accent  ` · `oklch(83.2% 0.051 42.9)` · `#E6BEAE`
  - `surface1` · `oklch(92.6% 0.012 37.4)` · `#EEE4E1`
  - `surface2` · `oklch(89.0% 0.026 67.5)` · `#E7D8C9`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.6:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** quiet craft / atelier, documentary / journalism; also fits Swiss-grid, system-led anchor families, material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** sports / athletic, indie game / playful tech, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, spring, earth, natural, stone
  coolorsLikes: 17.4K
  pickedFor: quiet-craft, documentary
-->

## P13 — Contrast Pop

**Source.** TODO (Coolors-curated; original Coolors name: *"Contrast Pop"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(99.8% 0.004 none)` · `#FDFFFC`
  - `ink     ` · `oklch(19.3% 0.045 244.0)` · `#011627`
  - `accent  ` · `oklch(78.3% 0.168 66.2)` · `#FF9F1C`
  - `surface1` · `oklch(59.4% 0.228 23.1)` · `#E71D36`
  - `surface2` · `oklch(74.2% 0.121 185.4)` · `#2EC4B6`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 18.2:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 4.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** vibrant consumer / playful, sports / athletic; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, bold, modern, beach, black, white
  coolorsLikes: 19.8K
  pickedFor: vibrant-playful, athletic
-->

## P14 — Sunny Beach Day

**Source.** TODO (Coolors-curated; original Coolors name: *"Sunny Beach Day"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(78.1% 0.127 57.9)` · `#F4A261`
  - `ink     ` · `oklch(37.5% 0.044 226.2)` · `#264653`
  - `accent  ` · `oklch(67.8% 0.156 35.2)` · `#E76F51`
  - `surface1` · `oklch(83.4% 0.117 87.4)` · `#E9C46A`
  - `surface2` · `oklch(63.0% 0.101 183.0)` · `#2A9D8F`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 4.9:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 6.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** vibrant consumer / playful; also fits pop-art and risograph anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, vibrant, bold, modern, autumn, sunset, beach, orange, tropical
  coolorsLikes: 124.7K
  pickedFor: vibrant-playful
-->

## P15 — Oceanic Cactus

**Source.** TODO (Coolors-curated; original Coolors name: *"Oceanic Cactus"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(99.2% 0.013 145.5)` · `#F7FFF7`
  - `ink     ` · `oklch(41.0% 0.059 209.8)` · `#1A535C`
  - `accent  ` · `oklch(92.2% 0.143 97.8)` · `#FFE66D`
  - `surface1` · `oklch(71.2% 0.181 22.8)` · `#FF6B6B`
  - `surface2` · `oklch(77.6% 0.112 188.5)` · `#4ECDC4`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 8.5:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 3.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** vibrant consumer / playful; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, bold, modern, spring, beach, white, tropical
  coolorsLikes: 18.1K
  pickedFor: vibrant-playful
-->

## P16 — Sunset Bliss

**Source.** TODO (Coolors-curated; original Coolors name: *"Sunset Bliss"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(81.0% 0.092 206.2)` · `#73D2DE`
  - `ink     ` · `oklch(55.5% 0.086 191.9)` · `#218380`
  - `accent  ` · `oklch(83.7% 0.152 78.4)` · `#FFBC42`
  - `surface1` · `oklch(56.8% 0.221 9.8)` · `#D81159`
  - `surface2` · `oklch(45.6% 0.137 358.3)` · `#8F2D56`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.6:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** vibrant consumer / playful; also fits pop-art and risograph anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold, sunset, tropical
  coolorsLikes: 9,952
  pickedFor: vibrant-playful
-->

## P17 — Vibrant Harmony

**Source.** TODO (Coolors-curated; original Coolors name: *"Vibrant Harmony"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(87.9% 0.162 90.9)` · `#FFD23F`
  - `ink     ` · `oklch(34.1% 0.155 314.2)` · `#540D6E`
  - `accent  ` · `oklch(65.9% 0.156 156.6)` · `#0EAD69`
  - `surface1` · `oklch(63.9% 0.207 13.5)` · `#EE4266`
  - `surface2` · `oklch(76.7% 0.132 173.5)` · `#3BCEAC`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 8.8:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 3.4:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** vibrant consumer / playful, indie game / playful tech; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, quiet craft / atelier, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold, tropical
  coolorsLikes: 8,995
  pickedFor: vibrant-playful, indie-game
-->

## P18 — Soft Sand

**Source.** TODO (Coolors-curated; original Coolors name: *"Soft Sand"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(94.5% 0.005 106.5)` · `#EDEDE9`
  - `ink     ` · `oklch(81.5% 0.034 52.2)` · `#D5BDAF`
  - `accent  ` · `oklch(94.5% 0.018 70.2)` · `#F5EBE0`
  - `surface1` · `oklch(88.1% 0.022 60.7)` · `#E3D5CA`
  - `surface2` · `oklch(85.1% 0.018 67.6)` · `#D6CCC2`

**Neutral temperature.** true-gray-leaning — three or more colors sit close to chromatic zero <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 1.5:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** healthcare / clinical; also fits record-sleeve and editorial-revival anchor families, Swiss-grid, system-led anchor families, material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: soft, pastel, gradient, vintage, retro, classic, summer, earth, sand, natural, stone, white
  coolorsLikes: 45.9K
  pickedFor: clinical
-->

## P19 — Pastel Bliss

**Source.** TODO (Coolors-curated; original Coolors name: *"Pastel Bliss"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.4% 0.012 29.9)` · `#F8EDEB`
  - `ink     ` · `oklch(87.0% 0.086 61.7)` · `#FEC89A`
  - `accent  ` · `oklch(83.9% 0.089 31.0)` · `#FFB5A7`
  - `surface1` · `oklch(90.4% 0.045 29.9)` · `#FCD5CE`
  - `surface2` · `oklch(91.2% 0.045 61.8)` · `#F9DCC4`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 1.3:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** healthcare / clinical; also fits material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, soft, pastel, gradient, spring, summer, natural, beach, white
  coolorsLikes: 37.6K
  pickedFor: clinical
-->

## P20 — Pastel Dreams

**Source.** TODO (Coolors-curated; original Coolors name: *"Pastel Dreams"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(91.9% 0.026 161.9)` · `#D6EADF`
  - `ink     ` · `oklch(68.8% 0.082 262.8)` · `#809BCE`
  - `accent  ` · `oklch(85.8% 0.048 349.4)` · `#EAC4D5`
  - `surface1` · `oklch(87.4% 0.046 171.9)` · `#B8E0D2`
  - `surface2` · `oklch(76.5% 0.052 239.4)` · `#95B8D1`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.2:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** healthcare / clinical <!-- inferred from playground intent selection + tags -->

**Avoid for.** brutalist statement, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: soft, pastel, spring, winter, sea
  coolorsLikes: 7,922
  pickedFor: clinical
-->

## P21 — Cool Coastal Vibes

**Source.** TODO (Coolors-curated; original Coolors name: *"Cool Coastal Vibes"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.8% 0.006 223.5)` · `#EDF2F4`
  - `ink     ` · `oklch(30.5% 0.038 279.7)` · `#2B2D42`
  - `accent  ` · `oklch(55.9% 0.225 24.0)` · `#D90429`
  - `surface1` · `oklch(68.0% 0.034 261.7)` · `#8D99AE`
  - `surface2` · `oklch(61.2% 0.231 22.6)` · `#EF233C`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 12.0:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 4.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue <!-- inferred -->

**Fits.** civic / institutional, wine / spirits <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, vibrant consumer / playful, healthcare / clinical, tech research / academic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, gradient, modern, red, black, white
  coolorsLikes: 34.4K
  pickedFor: civic, wine-spirits
-->

## P22 — Watermelon Sorbet

**Source.** TODO (Coolors-curated; original Coolors name: *"Watermelon Sorbet"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(88.0% 0.135 86.1)` · `#FFD166`
  - `ink     ` · `oklch(32.9% 0.059 225.8)` · `#073B4C`
  - `accent  ` · `oklch(77.7% 0.160 166.6)` · `#06D6A0`
  - `surface1` · `oklch(64.8% 0.204 11.1)` · `#EF476F`
  - `surface2` · `oklch(59.2% 0.112 228.0)` · `#118AB2`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 8.4:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 3.3:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** indie game / playful tech, sports / athletic; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication, quiet craft / atelier <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold, blue, black
  coolorsLikes: 36.3K
  pickedFor: indie-game, athletic
-->

## P23 — Pastel Rainbow

**Source.** TODO (Coolors-curated; original Coolors name: *"Pastel Rainbow"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(83.0% 0.111 226.7)` · `#70D6FF`
  - `ink     ` · `oklch(95.6% 0.168 117.0)` · `#E9FF70`
  - `accent  ` · `oklch(73.2% 0.181 358.9)` · `#FF70A6`
  - `surface1` · `oklch(77.7% 0.136 41.1)` · `#FF9770`
  - `surface2` · `oklch(89.1% 0.129 87.7)` · `#FFD670`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 1.5:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue <!-- inferred -->

**Fits.** indie game / playful tech; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, soft, pastel, neon, spring, beach, orange
  coolorsLikes: 17.6K
  pickedFor: indie-game
-->

## P24 — Vibrant Summer

**Source.** TODO (Coolors-curated; original Coolors name: *"Vibrant Summer"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(68.8% 0.201 22.5)` · `#FF595E`
  - `ink     ` · `oklch(58.3% 0.134 243.4)` · `#1982C4`
  - `accent  ` · `oklch(86.3% 0.161 87.1)` · `#FFCA3A`
  - `surface1` · `oklch(76.5% 0.193 129.5)` · `#8AC926`
  - `surface2` · `oklch(48.1% 0.114 301.8)` · `#6A4C93`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 1.4:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** indie game / playful tech; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold
  coolorsLikes: 17.4K
  pickedFor: indie-game
-->

## P25 — Bright Bold Colors

**Source.** TODO (Coolors-curated; original Coolors name: *"Bright Bold Colors"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(61.6% 0.215 21.8)` · `#EA3546`
  - `ink     ` · `oklch(43.5% 0.169 303.6)` · `#662E9B`
  - `accent  ` · `oklch(85.2% 0.172 90.6)` · `#F9C80E`
  - `surface1` · `oklch(68.6% 0.193 41.3)` · `#F86624`
  - `surface2` · `oklch(73.6% 0.107 208.4)` · `#43BCCD`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.1:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.8:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** indie game / playful tech; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, wine / spirits, editorial / publication <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold
  coolorsLikes: 6,907
  pickedFor: indie-game
-->

## P26 — Forest Hues

**Source.** TODO (Coolors-curated; original Coolors name: *"Forest Hues"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(90.8% 0.021 51.5)` · `#EDDDD4`
  - `ink     ` · `oklch(34.2% 0.027 188.5)` · `#283D3B`
  - `accent  ` · `oklch(50.6% 0.079 201.9)` · `#197278`
  - `surface1` · `oklch(56.5% 0.165 29.8)` · `#C44536`
  - `surface2` · `oklch(40.4% 0.105 29.5)` · `#772E25`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 8.7:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 2.3:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** documentary / journalism, restaurant / hospitality, sustainable / eco, boutique hotel; also fits material-led, foraged-palette anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, sports / athletic, vibrant consumer / playful, trust-led B2B / fintech, tech research / academic, healthcare / clinical, cinema / film, brutalist statement <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, bold, autumn, earth, natural, sea, black
  coolorsLikes: 15.3K
  pickedFor: documentary, hospitality, sustainable-eco, boutique-hotel
-->

## P27 — Mocha Latte

**Source.** TODO (Coolors-curated; original Coolors name: *"Mocha Latte"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(96.5% 0.002 none)` · `#F2F4F3`
  - `ink     ` · `oklch(14.1% 0.003 none)` · `#0A0908`
  - `accent  ` · `oklch(31.0% 0.027 228.8)` · `#22333B`
  - `surface1` · `oklch(67.5% 0.041 64.5)` · `#A9927D`
  - `surface2` · `oklch(44.0% 0.032 72.2)` · `#5E503F`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 18.0:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 6.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** documentary / journalism; also fits material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, sports / athletic, vibrant consumer / playful <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: earth, brown
  coolorsLikes: 5,915
  pickedFor: documentary
-->

## P28 — Deep Sea

**Source.** TODO (Coolors-curated; original Coolors name: *"Deep Sea"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(90.8% 0.005 117.9)` · `#E0E1DD`
  - `ink     ` · `oklch(21.8% 0.036 251.3)` · `#0D1B2A`
  - `accent  ` · `oklch(26.9% 0.042 262.7)` · `#1B263B`
  - `surface1` · `oklch(63.6% 0.049 254.6)` · `#778DA9`
  - `surface2` · `oklch(46.0% 0.056 252.7)` · `#415A77`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 13.2:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 5.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** architecture firm; also fits Swiss-grid, system-led anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** vibrant consumer / playful, indie game / playful tech, sports / athletic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: monochrome, gradient, sky, sea, black, white
  coolorsLikes: 27.7K
  pickedFor: architecture
-->

## P29 — Ocean Sunset

**Source.** TODO (Coolors-curated; original Coolors name: *"Ocean Sunset"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(79.5% 0.086 49.1)` · `#EAAC8B`
  - `ink     ` · `oklch(42.4% 0.063 253.4)` · `#355070`
  - `accent  ` · `oklch(67.5% 0.152 20.0)` · `#E56B6F`
  - `surface1` · `oklch(60.2% 0.104 7.1)` · `#B56576`
  - `surface2` · `oklch(49.6% 0.057 311.8)` · `#6D597A`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 4.3:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** restaurant / hospitality, tech research / academic; also fits cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, healthcare / clinical, vibrant consumer / playful, brutalist statement, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, gradient, autumn, sunset, sky
  coolorsLikes: 29K
  pickedFor: hospitality, tech-research
-->

## P30 — Dark Sunset

**Source.** TODO (Coolors-curated; original Coolors name: *"Dark Sunset"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.8% 0.086 99.2)` · `#FFF3B0`
  - `ink     ` · `oklch(29.1% 0.104 24.9)` · `#540B0E`
  - `accent  ` · `oklch(74.9% 0.134 73.5)` · `#E09F3E`
  - `surface1` · `oklch(46.8% 0.152 24.9)` · `#9E2A2B`
  - `surface2` · `oklch(44.9% 0.049 217.0)` · `#335C67`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 13.1:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 2.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** restaurant / hospitality; also fits material-led, foraged-palette anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, tech research / academic, healthcare / clinical <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, modern, autumn, earth, sunset, red, white
  coolorsLikes: 31.5K
  pickedFor: hospitality
-->

## P31 — Autumn Glow

**Source.** TODO (Coolors-curated; original Coolors name: *"Autumn Glow"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(94.7% 0.088 108.7)` · `#F2F3AE`
  - `ink     ` · `oklch(25.8% 0.062 17.8)` · `#3C1518`
  - `accent  ` · `oklch(50.5% 0.144 45.1)` · `#A44200`
  - `surface1` · `oklch(69.4% 0.133 64.3)` · `#D58936`
  - `surface2` · `oklch(34.2% 0.119 29.0)` · `#69140E`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 13.9:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 5.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** restaurant / hospitality; also fits material-led, foraged-palette anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, tech research / academic, healthcare / clinical <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: autumn, summer, earth, sunset
  coolorsLikes: 4,665
  pickedFor: hospitality
-->

## P32 — Spring Blooms

**Source.** TODO (Coolors-curated; original Coolors name: *"Spring Blooms"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(87.5% 0.135 128.1)` · `#BCE784`
  - `ink     ` · `oklch(38.7% 0.053 320.0)` · `#513B56`
  - `accent  ` · `oklch(78.5% 0.132 161.6)` · `#5DD39E`
  - `surface1` · `oklch(59.4% 0.092 224.1)` · `#348AA7`
  - `surface2` · `oklch(45.1% 0.057 285.2)` · `#525174`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 7.1:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 2.5:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** outdoor / adventure <!-- inferred from playground intent selection + tags -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: spring, winter, beach, sea, green, tropical
  coolorsLikes: 7,244
  pickedFor: outdoor-adventure
-->

## P33 — Refreshing Aqua Tones

**Source.** TODO (Coolors-curated; original Coolors name: *"Refreshing Aqua Tones"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(92.6% 0.117 159.3)` · `#9FFFCB`
  - `ink     ` · `oklch(39.4% 0.075 224.8)` · `#004E64`
  - `accent  ` · `oklch(67.1% 0.126 224.3)` · `#00A5CF`
  - `surface1` · `oklch(83.4% 0.168 145.4)` · `#7AE582`
  - `surface2` · `oklch(63.9% 0.108 179.7)` · `#25A18E`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 7.8:1 — passes AA at all sizes and AAA at large; ink↔surface1 sits at 5.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** outdoor / adventure <!-- inferred from playground intent selection + tags -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: winter, sea, blue, green
  coolorsLikes: 6,113
  pickedFor: outdoor-adventure
-->

## P34 — Cool Waters

**Source.** TODO (Coolors-curated; original Coolors name: *"Cool Waters"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(93.6% 0.079 147.6)` · `#C7F9CC`
  - `ink     ` · `oklch(43.8% 0.080 241.0)` · `#22577A`
  - `accent  ` · `oklch(86.0% 0.154 149.6)` · `#80ED99`
  - `surface1` · `oklch(76.4% 0.130 162.1)` · `#57CC99`
  - `surface2` · `oklch(65.7% 0.095 196.9)` · `#38A3A5`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 6.6:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 3.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** outdoor / adventure; also fits Swiss-grid, system-led anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: monochrome, gradient, winter, sea, green
  coolorsLikes: 17.7K
  pickedFor: outdoor-adventure
-->

## P35 — Bright Contrasts

**Source.** TODO (Coolors-curated; original Coolors name: *"Bright Contrasts"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(98.8% 0.035 119.3)` · `#F8FFE5`
  - `ink     ` · `oklch(63.0% 0.103 208.4)` · `#1B9AAA`
  - `accent  ` · `oklch(85.2% 0.157 83.6)` · `#FFC43D`
  - `surface1` · `oklch(64.8% 0.204 11.1)` · `#EF476F`
  - `surface2` · `oklch(77.7% 0.160 166.6)` · `#06D6A0`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 3.3:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.1:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** outdoor / adventure <!-- inferred from playground intent selection + tags -->

**Avoid for.** luxury fashion / fragrance, wine / spirits, cinema / film <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: sky, beach
  coolorsLikes: 6,988
  pickedFor: outdoor-adventure
-->

## P36 — Leafy Green Garden

**Source.** TODO (Coolors-curated; original Coolors name: *"Leafy Green Garden"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(94.0% 0.107 112.3)` · `#ECF39E`
  - `ink     ` · `oklch(25.9% 0.051 143.9)` · `#132A13`
  - `accent  ` · `oklch(52.2% 0.113 132.9)` · `#4F772D`
  - `surface1` · `oklch(69.7% 0.114 123.0)` · `#90A955`
  - `surface2` · `oklch(41.7% 0.081 141.5)` · `#31572C`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 13.1:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 5.8:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** sustainable / eco; also fits Swiss-grid, system-led anchor families, material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, cinema / film, sports / athletic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: monochrome, spring, earth, natural, green
  coolorsLikes: 17.2K
  pickedFor: sustainable-eco
-->

## P37 — Forest Green Tones

**Source.** TODO (Coolors-curated; original Coolors name: *"Forest Green Tones"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(89.2% 0.045 146.2)` · `#C9E4CA`
  - `ink     ` · `oklch(39.6% 0.035 242.5)` · `#364958`
  - `accent  ` · `oklch(74.8% 0.066 163.5)` · `#87BBA2`
  - `surface1` · `oklch(57.7% 0.051 211.5)` · `#55828B`
  - `surface2` · `oklch(46.3% 0.043 204.5)` · `#3B6064`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 6.9:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 2.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** tech research / academic; also fits Swiss-grid, system-led anchor families, material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** vibrant consumer / playful, brutalist statement, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, monochrome, winter, natural, sea
  coolorsLikes: 9,375
  pickedFor: tech-research
-->

## P38 — Soft Pastel

**Source.** TODO (Coolors-curated; original Coolors name: *"Soft Pastel"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(93.5% 0.016 328.8)` · `#F0E6EF`
  - `ink     ` · `oklch(66.4% 0.072 303.0)` · `#9C89B8`
  - `accent  ` · `oklch(80.7% 0.098 348.9)` · `#F0A6CA`
  - `surface1` · `oklch(86.6% 0.068 333.3)` · `#EFC3E6`
  - `surface2` · `oklch(80.7% 0.044 276.7)` · `#B8BEDD`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.6:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** tech research / academic <!-- inferred from playground intent selection + tags -->

**Avoid for.** vibrant consumer / playful, brutalist statement, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: muted, spring, winter
  coolorsLikes: 16.9K
  pickedFor: tech-research
-->

## P39 — Golden Glow

**Source.** TODO (Coolors-curated; original Coolors name: *"Golden Glow"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.9% 0.024 57.7)` · `#FFEEE2`
  - `ink     ` · `oklch(61.9% 0.051 54.0)` · `#9F7E69`
  - `accent  ` · `oklch(98.6% 0.041 118.9)` · `#F7FFE0`
  - `surface1` · `oklch(94.4% 0.052 103.8)` · `#F2EFC7`
  - `surface2` · `oklch(80.5% 0.045 71.6)` · `#D2BBA0`

**Neutral temperature.** mildly warm — warm hues outnumber cool <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 3.3:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 3.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** music / record label; also fits record-sleeve and editorial-revival anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, tech research / academic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vintage, retro, classic
  coolorsLikes: 4,576
  pickedFor: music-label
-->

## P40 — Soft Serenity

**Source.** TODO (Coolors-curated; original Coolors name: *"Soft Serenity"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(96.6% 0.023 96.0)` · `#F8F4E3`
  - `ink     ` · `oklch(68.0% 0.019 103.3)` · `#9A998C`
  - `accent  ` · `oklch(85.1% 0.016 77.1)` · `#D4CDC3`
  - `surface1` · `oklch(86.1% 0.007 53.4)` · `#D5D0CD`
  - `surface2` · `oklch(71.0% 0.024 109.7)` · `#A2A392`

**Neutral temperature.** true-gray-leaning — three or more colors sit close to chromatic zero <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.6:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** music / record label; also fits record-sleeve and editorial-revival anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, tech research / academic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vintage, retro, classic, sand
  coolorsLikes: 3,644
  pickedFor: music-label
-->

## P41 — Earthy Sunshine Bliss

**Source.** TODO (Coolors-curated; original Coolors name: *"Earthy Sunshine Bliss"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(98.3% 0.032 97.3)` · `#FFFAE2`
  - `ink     ` · `oklch(66.5% 0.036 116.6)` · `#92977E`
  - `accent  ` · `oklch(97.5% 0.099 106.9)` · `#FEFCAD`
  - `surface1` · `oklch(89.5% 0.073 96.4)` · `#EADDA6`
  - `surface2` · `oklch(89.5% 0.103 105.3)` · `#E6E18F`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.9:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.2:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** music / record label; also fits record-sleeve and editorial-revival anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** trust-led B2B / fintech, architecture firm, tech research / academic <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vintage, retro, classic
  coolorsLikes: 2,007
  pickedFor: music-label
-->

## P42 — Crimson Hues

**Source.** TODO (Coolors-curated; original Coolors name: *"Crimson Hues"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(49.4% 0.169 22.7)` · `#AD2831`
  - `ink     ` · `oklch(18.6% 0.051 39.8)` · `#250902`
  - `accent  ` · `oklch(22.3% 0.080 15.7)` · `#38040E`
  - `surface1` · `oklch(38.5% 0.146 26.1)` · `#800E13`
  - `surface2` · `oklch(32.7% 0.119 23.4)` · `#640D14`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.8:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 1.8:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** mild enough to use broadly — eyebrow chips, dividers, small graphic fills; still reserve the most saturated instances for primary actions <!-- inferred -->

**Fits.** wine / spirits; also fits Swiss-grid, system-led anchor families, cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, tech research / academic, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: monochrome, autumn, red, black, halloween
  coolorsLikes: 10.9K
  pickedFor: wine-spirits
-->

## P43 — Warm Earth Tones

**Source.** TODO (Coolors-curated; original Coolors name: *"Warm Earth Tones"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(88.6% 0.034 76.0)` · `#E7D7C1`
  - `ink     ` · `oklch(41.9% 0.149 29.5)` · `#8C1C13`
  - `accent  ` · `oklch(55.6% 0.160 24.3)` · `#BF4342`
  - `surface1` · `oklch(65.7% 0.039 41.8)` · `#A78A7F`
  - `surface2` · `oklch(48.4% 0.039 32.3)` · `#735751`

**Neutral temperature.** warm-leaning — three or more colors fall in the red/orange/yellow arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 6.5:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 2.9:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** wine / spirits; also fits cinematic golden-hour anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, tech research / academic, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, autumn, summer, red
  coolorsLikes: 7,911
  pickedFor: wine-spirits
-->

## P44 — Fiery Ocean

**Source.** TODO (Coolors-curated; original Coolors name: *"Fiery Ocean"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(95.8% 0.038 85.3)` · `#FDF0D5`
  - `ink     ` · `oklch(29.4% 0.066 238.5)` · `#003049`
  - `accent  ` · `oklch(36.0% 0.148 29.2)` · `#780000`
  - `surface1` · `oklch(66.5% 0.075 236.8)` · `#669BBC`
  - `surface2` · `oklch(51.6% 0.202 25.9)` · `#C1121F`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 12.2:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 4.6:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** wine / spirits <!-- inferred from playground intent selection + tags -->

**Avoid for.** healthcare / clinical, tech research / academic, indie game / playful tech <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, blue, red, white
  coolorsLikes: 35.3K
  pickedFor: wine-spirits
-->

## P45 — Deep Sea

**Source.** TODO (Coolors-curated; original Coolors name: *"Deep Sea"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(100.0% 0.000 none)` · `#FFFFFF`
  - `ink     ` · `oklch(19.0% 0.035 222.4)` · `#00171F`
  - `accent  ` · `oklch(69.0% 0.146 234.8)` · `#00A8E8`
  - `surface1` · `oklch(55.5% 0.111 230.0)` · `#007EA7`
  - `surface2` · `oklch(31.6% 0.083 246.8)` · `#003459`

**Neutral temperature.** cool-leaning — three or more colors fall in the blue/teal arc <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 18.4:1 — passes WCAG AAA easily; small text reads cleanly; ink↔surface1 sits at 4.0:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** sports / athletic; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** quiet craft / atelier, editorial / publication, architecture firm, wine / spirits <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, bold, modern, sea, blue, black
  coolorsLikes: 11.8K
  pickedFor: athletic
-->

## P46 — Bold Hues

**Source.** TODO (Coolors-curated; original Coolors name: *"Bold Hues"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(78.2% 0.121 222.5)` · `#4CC9F0`
  - `ink     ` · `oklch(36.2% 0.206 282.7)` · `#3A0CA3`
  - `accent  ` · `oklch(64.3% 0.244 0.7)` · `#F72585`
  - `surface1` · `oklch(55.6% 0.214 269.0)` · `#4361EE`
  - `surface2` · `oklch(44.7% 0.228 304.0)` · `#7209B7`

**Neutral temperature.** balanced — warm and cool hues in rough parity <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 6.2:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 2.4:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** reserve for CTAs and one-per-section emphasis; never run as body or extended surface — the chroma will fatigue <!-- inferred -->

**Fits.** sports / athletic; also fits pop-art and risograph anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** quiet craft / atelier, editorial / publication, architecture firm, wine / spirits <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: vibrant, neon, bold, gradient, modern, winter, blue, purple
  coolorsLikes: 23.3K
  pickedFor: athletic
-->

## P47 — Blush Harmony

**Source.** TODO (Coolors-curated; original Coolors name: *"Blush Harmony"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(93.3% 0.016 126.8)` · `#E6EBE0`
  - `ink     ` · `oklch(67.4% 0.073 201.4)` · `#5CA4A9`
  - `accent  ` · `oklch(68.1% 0.165 29.1)` · `#ED6A5A`
  - `surface1` · `oklch(94.7% 0.070 105.0)` · `#F4F1BB`
  - `surface2` · `oklch(78.2% 0.041 186.5)` · `#9BC1BC`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 2.4:1 — below AA; reserve ink for headings/large display, not body; ink↔surface1 sits at 2.5:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** boutique hotel; also fits material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, sports / athletic, brutalist statement <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: bold, spring, earth, sand, beach, sea
  coolorsLikes: 8,308
  pickedFor: boutique-hotel
-->

## P48 — Earthy Neutrals

**Source.** TODO (Coolors-curated; original Coolors name: *"Earthy Neutrals"*) — replace with a defensible real-world reference (specific magazine, film, building, pottery, etc.).

**Colors.**
  - `bg      ` · `oklch(93.7% 0.000 none)` · `#EAEAEA`
  - `ink     ` · `oklch(51.6% 0.040 226.6)` · `#4F6D7A`
  - `accent  ` · `oklch(66.1% 0.151 41.4)` · `#DD6E42`
  - `surface1` · `oklch(86.2% 0.027 224.3)` · `#C0D6DF`
  - `surface2` · `oklch(89.0% 0.055 91.0)` · `#E8DAB2`

**Neutral temperature.** mildly cool — cool hues outnumber warm <!-- inferred -->

**Contrast strategy.** body ink↔bg sits at 4.6:1 — passes AA at body sizes; verify on small text; ink↔surface1 sits at 3.7:1 (use surface1 for cards or quiet bands where contrast can soften) <!-- inferred -->

**Accent allowance.** fits CTAs, badges, hover states, and small graphic elements; can spot small areas of body without strain <!-- inferred -->

**Fits.** boutique hotel; also fits material-led, foraged-palette anchor families <!-- inferred from playground intent selection + tags -->

**Avoid for.** indie game / playful tech, sports / athletic, brutalist statement <!-- inferred -->

<!-- _provenance:
  writtenBy: scripts/build-palettes-md.mjs
  source: coolors.co/palettes/popular/<tag>
  coolorsTags: earth, sand, beach, sea
  coolorsLikes: 7,426
  pickedFor: boutique-hotel
-->

