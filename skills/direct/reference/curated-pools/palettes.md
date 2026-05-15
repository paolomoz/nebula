# Curated pool — palettes

> **Status: v2 rebuild authored 2026-05-15. Round 1's 48-entry pool is
> superseded by this 24-entry dual-anchor pool. Schema is incompatible
> with v1 — entries do not declare `bg` / `ink` directly; substrate is
> a separate axis with two fixed values.**

The agent reads this file when committing on the color palette axis.
**Palette resolution is two independent picks**:

1. **Substrate mode** — `light` | `dark`. Selected from brief signals;
   default `dark` (override only on signals: *"paper"*, *"cream"*,
   *"editorial-print"*, *"almost-white"*, *"clinical"*).
2. **Accent set** — picked from this pool by `fits` / `avoid` /
   `intensity`. Pool defaults to `anchorMode: dual` (3 accents) unless
   the brief signals *"festival-loud"*, *"five-accent identity"*, or
   *"section-distribution palette"* — then pick from `anchorMode: free`
   (5 accents).

## The two fixed substrates

The substrate is **not per-palette**. It comes from the brief's
substrate-mode pick and is one of these two values, always:

| Mode | Hex | OKLCH |
|---|---|---|
| **light** | `#F4F1E6` | `oklch(95% 0.022 95)` — warm almost-white (not cream) |
| **dark**  | `#0F1216` | `oklch(14% 0.015 240)` — almost-black with a faint blue lean |

`render` emits the picked substrate as `--bg` and the opposite anchor
as `--ink`:

| Substrate | `--bg` | `--ink` |
|---|---|---|
| light | `#F4F1E6` | `#0F1216` |
| dark  | `#0F1216` | `#F4F1E6` |

## Accent roles

Each accent in a palette entry declares a **`role`**. Roles control
*where* the accent appears in the rendered page (see § Accent territory
rules in `render/SKILL.md` for the validation contract).

**Dual-anchor entries (3 accents):**
- `primary` — page-wide loud accent. Hero kicker, primary CTA, masthead
  serif mark, top-of-page rule, hero hover.
- `divider` — section dividers, hairline rules between bands,
  separators within stat rows.
- `inverted-band` — substrate of the inverted manifesto / declaration
  band.

**Free-mode entries (5 accents):**
- `primary` · `divider` · `inverted-band` — as above.
- `section-accent-a` — distributes across one named section family
  (odd-indexed cards, one half of a pair).
- `section-accent-b` — distributes across the alternate family.

`render` emits the picked accents as CSS custom properties:
`--acc-primary`, `--acc-divider`, `--acc-inverted-band`,
`--acc-section-a`, `--acc-section-b`. Section CSS rules consume the
property matching their declared role.

## Schema for each entry

```
## <id> — <name>

**Anchor mode.** dual (3 accents) | free (5 accents)

**Intensity.** bold | quiet | neon

**Accents.**
- `<role>` · `<hex>` — optional short character note
- ...

**Fits.** Anchor families / brief signals this set fits.
**Avoid for.** Anchor families this set should not be used for.
```

## Pool — Dual-anchor (12 entries · 3 accents each)

Role order in each entry: `primary · divider · inverted-band`.

---

## pd-01a — Teal & Coral

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#048090` — confident teal
- `divider`        · `#456990` — slate
- `inverted-band`  · `#F35C69` — coral spotlight

**Fits.** Editorial / publication, hospitality, documentary / journalism, civic / institutional.

**Avoid for.** Brutalist statement, vibrant consumer / playful (the teal-coral pairing reads too literary for that register).

---

## pd-01b — Tropic

**Anchor mode.** dual

**Intensity.** neon

**Accents.**
- `primary`        · `#FF66B3` — hot pink
- `divider`        · `#03916E` — jungle
- `inverted-band`  · `#EE6122` — sunset orange

**Fits.** Vibrant consumer / playful, music label, indie game / playful tech, festival / promo.

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, civic, editorial-literary.

---

## pd-01c — Stoplight

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#FF7F12` — signal orange
- `divider`        · `#FF1B1C` — siren red
- `inverted-band`  · `#7C7C7C` — concrete grey

**Fits.** Sports / athletic, civic / institutional, indie game / playful tech, vibrant consumer.

**Avoid for.** Quiet craft / atelier, hospitality (formal tier), wine / spirits, luxury fashion.

---

## pd-01d — Stone & Spark

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#817F75` — warm stone
- `divider`        · `#EC0943` — siren magenta
- `inverted-band`  · `#0CCDFF` — electric cyan

**Fits.** Music label, vibrant consumer / playful, indie game (premium tier), cinema / film (poster register).

**Avoid for.** Healthcare clinical, civic institutional, editorial-quiet.

---

## pd-02a — Magenta Mute

**Anchor mode.** dual

**Intensity.** quiet

**Accents.**
- `primary`        · `#706F6F` — graphite
- `divider`        · `#EF27A6` — magenta sliver
- `inverted-band`  · `#FF289C` — magenta heavy

**Fits.** Editorial / publication, music label (subtle tier), documentary, luxury fashion (statement tier).

**Avoid for.** Healthcare clinical, civic, athletic (the magenta is too declarative for restrained registers).

---

## pd-02b — Sangria

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#285DAD` — navy
- `divider`        · `#2F7351` — forest
- `inverted-band`  · `#B3011B` — wine red

**Fits.** Editorial / publication, documentary / journalism, civic / institutional, hospitality (formal tier), wine / spirits.

**Avoid for.** Vibrant consumer / playful, indie game, sports / athletic.

---

## pd-02c — Coral & Pine

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#F05D5E` — coral
- `divider`        · `#0D7273` — pine green
- `inverted-band`  · `#788585` — stone

**Fits.** Hospitality, sustainable / eco, quiet craft / atelier (modern tier), boutique hotel, outdoor / adventure.

**Avoid for.** Brutalist statement, trust-led B2B (too warm), tech research.

---

## pd-02d — Spice Market

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#1382A2` — turquoise
- `divider`        · `#E06D04` — saffron
- `inverted-band`  · `#B26700` — terracotta

**Fits.** Hospitality, music label, vibrant consumer / playful, sustainable / eco (warm tier).

**Avoid for.** Trust-led B2B, healthcare clinical, civic.

---

## pd-03a — Signal

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#F93A43` — alarm red
- `divider`        · `#048090` — teal
- `inverted-band`  · `#456990` — slate

**Fits.** Civic / institutional, sports / athletic, editorial (poster register), documentary (modern variant).

**Avoid for.** Quiet craft, hospitality (formal), wine / spirits, luxury fashion.

---

## pd-03b — Studio Mauve

**Anchor mode.** dual

**Intensity.** quiet

**Accents.**
- `primary`        · `#93748A` — dusty mauve
- `divider`        · `#647153` — sage
- `inverted-band`  · `#FF230D` — siren red

**Fits.** Quiet craft / atelier, editorial / publication, hospitality (formal tier), luxury fashion (literary tier), documentary.

**Avoid for.** Vibrant consumer / playful, sports / athletic, indie game (energy mismatch).

---

## pd-03c — Berry Teal

**Anchor mode.** dual

**Intensity.** bold

**Accents.**
- `primary`        · `#D8115A` — berry
- `divider`        · `#8F2D56` — plum
- `inverted-band`  · `#218380` — teal

**Fits.** Vibrant consumer / playful, music label, hospitality (modern tier), indie game.

**Avoid for.** Trust-led B2B / fintech, healthcare clinical, civic.

---

## pd-03d — Ember

**Anchor mode.** dual

**Intensity.** neon

**Accents.**
- `primary`        · `#E55935` — ember orange
- `divider`        · `#FA7920` — flame
- `inverted-band`  · `#0CCDFF` — cyan flash

**Fits.** Music label, vibrant consumer / playful, indie game, festival / promo, cinema (poster register).

**Avoid for.** Editorial-literary, civic institutional, quiet craft, healthcare clinical.

---

## Pool — Free-mode (12 entries · 5 accents each)

Role order in each entry: `primary · divider · inverted-band · section-accent-a · section-accent-b`.

---

## fm-vibrant-summer — Vibrant Summer

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#2364AA` — confident blue
- `divider`           · `#3CA5D9` — sky
- `inverted-band`     · `#73BFB8` — sea-green
- `section-accent-a`  · `#FFC600` — sunshine
- `section-accent-b`  · `#EA7317` — sunset

**Fits.** Vibrant consumer / playful, music label, indie game, festival / promo, hospitality (modern).

**Avoid for.** Trust-led B2B (too playful), editorial-literary, civic.

---

## fm-daybreak — Colorful Daybreak

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#3D358B` — indigo
- `divider`           · `#7778ED` — periwinkle
- `inverted-band`     · `#F7B801` — gold
- `section-accent-a`  · `#F18602` — orange
- `section-accent-b`  · `#F45A04` — vermilion

**Fits.** Vibrant consumer / playful, music label, festival / promo, cinema (festival register), indie game.

**Avoid for.** Trust-led B2B, healthcare clinical, civic, editorial-literary.

---

## fm-bold-hues — Bold Hues

**Anchor mode.** free

**Intensity.** neon

**Accents.**
- `primary`           · `#F72685` — magenta pop
- `divider`           · `#7209B7` — violet
- `inverted-band`     · `#3A0CA3` — deep indigo
- `section-accent-a`  · `#4461EE` — cobalt
- `section-accent-b`  · `#4CC9F0` — cyan

**Fits.** Music label, indie game / playful tech, vibrant consumer / playful, festival / promo.

**Avoid for.** Editorial / publication, trust-led B2B / fintech, civic institutional, healthcare clinical.

---

## fm-vibrant-nature — Vibrant Nature

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#DA2C38` — poppy red
- `divider`           · `#236F54` — pine
- `inverted-band`     · `#87C38F` — meadow
- `section-accent-a`  · `#F5F0BB` — wheat
- `section-accent-b`  · `#43291F` — bark

**Fits.** Sustainable / eco, hospitality, outdoor / adventure, vibrant consumer (nature-led), wine / spirits.

**Avoid for.** Trust-led B2B, tech research, indie game (too earth-bound for digital register).

---

## fm-watermelon — Watermelon Sorbet

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#EF476F` — watermelon
- `divider`           · `#FFD166` — sorbet yellow
- `inverted-band`     · `#08D6A0` — mint
- `section-accent-a`  · `#108AB2` — pool blue
- `section-accent-b`  · `#083B4D` — deep ocean

**Fits.** Vibrant consumer / playful, hospitality, indie game, music label (summer tier), boutique hotel (modern).

**Avoid for.** Trust-led B2B, civic, editorial-literary, brutalist.

---

## fm-golden-twilight — Golden Twilight

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#000814` — abyss
- `divider`           · `#001D3D` — midnight
- `inverted-band`     · `#003566` — twilight blue
- `section-accent-a`  · `#FFC300` — gold
- `section-accent-b`  · `#FFD608` — bright gold

**Fits.** Luxury fashion (statement tier), music label, cinema / film, athletic (premium tier), brutalist (premium variant).

**Avoid for.** Healthcare clinical, vibrant consumer / playful (too cinematic), quiet craft, sustainable.

---

## fm-coral-summer — Coral Summer

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#FF595E` — coral
- `divider`           · `#FFCA3B` — saffron
- `inverted-band`     · `#8ACA26` — lime
- `section-accent-a`  · `#1A82C4` — sky
- `section-accent-b`  · `#6A4C93` — plum

**Fits.** Vibrant consumer / playful, hospitality, indie game, music label, festival (summer register).

**Avoid for.** Trust-led B2B, civic, editorial-literary, brutalist.

---

## fm-summer-glow — Golden Summer Glow

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#0D3B66` — deep navy
- `divider`           · `#FBF0CA` — cream
- `inverted-band`     · `#F4D35E` — honey
- `section-accent-a`  · `#EE964C` — apricot
- `section-accent-b`  · `#F95738` — tomato

**Fits.** Hospitality, vibrant consumer / playful (warm tier), sustainable / eco, wine / spirits, boutique hotel (Mediterranean).

**Avoid for.** Trust-led B2B, healthcare clinical, civic, tech research.

---

## fm-purple-sunset — Purple Sunset

**Anchor mode.** free

**Intensity.** neon

**Accents.**
- `primary`           · `#390099` — royal purple
- `divider`           · `#9E0159` — wine
- `inverted-band`     · `#FF0054` — magenta pop
- `section-accent-a`  · `#FF5400` — orange flash
- `section-accent-b`  · `#FFBD01` — amber

**Fits.** Music label, cinema / film (festival), indie game, festival / promo, vibrant consumer (campaign tier).

**Avoid for.** Editorial-literary, civic, trust-led B2B, healthcare clinical, quiet craft.

---

## fm-fiesta — Vibrant Color Fiesta

**Anchor mode.** free

**Intensity.** neon

**Accents.**
- `primary`           · `#FFBE0B` — citron
- `divider`           · `#FB5607` — vermilion
- `inverted-band`     · `#FF006E` — magenta
- `section-accent-a`  · `#8338EB` — purple pop
- `section-accent-b`  · `#3A87FF` — electric blue

**Fits.** Vibrant consumer / playful, music label, indie game, festival / promo, cinema (festival).

**Avoid for.** Editorial-literary, civic, trust-led B2B, healthcare clinical, quiet craft, brutalist, wine / spirits.

---

## fm-sorbet-navy — Sorbet Navy

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#ED474F` — coral red
- `divider`           · `#FFD166` — sorbet
- `inverted-band`     · `#08D6A0` — mint
- `section-accent-a`  · `#108AB2` — pool
- `section-accent-b`  · `#0B335C` — deep navy

**Fits.** Vibrant consumer / playful, hospitality, indie game, music label (summer), boutique hotel.

**Avoid for.** Trust-led B2B, civic, editorial-literary, brutalist.

---

## fm-picnic — Picnic

**Anchor mode.** free

**Intensity.** bold

**Accents.**
- `primary`           · `#EF476F` — strawberry
- `divider`           · `#85CB34` — lawn
- `inverted-band`     · `#FEE74C` — lemon
- `section-accent-a`  · `#49E5C2` — mint
- `section-accent-b`  · `#FF595E` — watermelon

**Fits.** Vibrant consumer / playful, hospitality, indie game, music label, festival / promo, sustainable (summer).

**Avoid for.** Trust-led B2B, civic, editorial-literary, brutalist, wine / spirits.
