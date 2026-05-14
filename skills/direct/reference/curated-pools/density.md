# Curated pool — density schools

> **Status: rounds 1–3 authored 2026-05-14 (11 schools).**
>
> This pool lists named density schools the agent samples from in
> `nebula:direct` Phase 2 (axis A2). Each entry is a *named*
> whitespace-and-rhythm strategy — *"balanced"* is not a school name.

The agent reads this file when committing on the density axis. **Sample
from this list; do not pick a number out of thin air.**

Round 1 shipped a single school (then named "Default"). Round 2 added
5 more covering long-read editorial, quiet craft, gallery folio,
calm product, and utility / tools — and renamed the round-1 school
to **Confident Product** so it carries a name that does real work.

## Schema for each entry

```
## D<n> — <name>

**Character.** What this density school *feels like*. One paragraph,
not a number.
**Section padding.** Desktop / tablet / mobile values (px).
**Line-height for body / display.** Specific multipliers.
**Type scale.** Ratio + base body size.
**Inter-element spacing.** Rhythm value + character.
**Container & grid.** Max-width + grid gap.
**Information density per viewport.** Sections per scroll, text density.
**Fits.** Anchor families / brief signals this school fits.
**Avoid for.** Briefs / anchors this school should not be used for.
```

## Entries

## D1 — Confident Product

**Character.** Confident contemporary product with a strong heading voice. Section padding sits at 84px — comfortable but not luxurious; section transitions are felt without being announced. The type scale ratio of 1.5 is the school's most opinionated choice: at a 16px base, headings compound to ~54px display, which gives every section a real titular moment. Body line-height holds at a calm 1.55 for reading rhythm while display tightens to 1.10 so the big headings sit together, not loose. Grid gap of 14px is *deliberately tight* — the school reads as modern-product rather than editorial-airy. The page opens firmly, breathes evenly between bands, and still gives heading hierarchy real authority.

**Section padding.**
  - desktop: `84px`
  - tablet:  `59px` (84 × 0.7)
  - mobile:  `42px` (84 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.10`

**Type scale.**
  - ratio:        `1.5` (display-led)
  - base body:    `16px`
  - derived h3:   `24px`
  - derived h2:   `36px`
  - derived h1:   `54px`

**Inter-element spacing.** `20px` rhythm — regular. Stack gap between heading, body, and CTA in a section block.

**Container & grid.**
  - container max-width: `1296px` (standard wide product)
  - grid gap:            `14px` (tight; cards sit close)

**Information density per viewport.** ~1.0–1.2 sections per 1080-tall scroll on desktop; body bands run 50–70 characters per line at the container max-width; card grids show three columns at full width with minimal interstitial gutter.

**Fits.** Trust-led B2B / fintech, tech research / academic, civic, healthcare, indie game / playful tech, music label, sports / athletic, vibrant consumer / playful, contemporary product showcases; brands that want a confident heading voice without editorial slowness. <!-- inferred -->

**Avoid for.** Long-read editorial (the heading scale is too dominant for sustained reading); pure ops dashboards (sections too padded for data density); quiet craft / atelier / hospitality registers where the heading authority reads as too commercial. <!-- inferred -->

<!-- _provenance:
  writtenBy: playground (density-playground.html tuner) → user save
  originalName: Default (renamed to "Confident Product" in round 2)
  scope: was the universal default at round 1; now one of six named schools
-->

## D2 — Editorial Sparse

**Character.** Long-read magazine register, deliberately slow. Section padding at 120px makes the page transitions into events, not whispers — you *notice* the move between bands. Body line-height runs at a generous 1.70 and body type at 18px; sentences breathe, lines are easy to follow, the reader is invited to slow down. Type scale of 1.333 is editorial-classic — headings exist as scale-points, not as billboards. Container narrows to 1080px so reading width stays comfortable. Grid gap at 32px is genuinely loose — cards and sections feel curated, not packed. The school reads as a printed page with the speed turned all the way down.

**Section padding.**
  - desktop: `120px`
  - tablet:  `84px` (120 × 0.7)
  - mobile:  `60px` (120 × 0.5)

**Line-height for body / display.**
  - body:    `1.70`
  - display: `1.15`

**Type scale.**
  - ratio:        `1.333` (editorial-classic)
  - base body:    `18px`
  - derived h3:   `24px`
  - derived h2:   `32px`
  - derived h1:   `43px`

**Inter-element spacing.** `24px` rhythm — generous. Each element in a section block reads as its own breath.

**Container & grid.**
  - container max-width: `1080px` (narrow for reading width)
  - grid gap:            `32px` (genuinely loose; cards feel curated)

**Information density per viewport.** ~0.7–0.9 sections per 1080-tall scroll on desktop; body bands run 50–60 characters per line; the reader feels the page is paced for them, not for content density.

**Fits.** Editorial / publication, documentary / journalism, quiet craft / atelier, sustainable / eco, wine / spirits, luxury fashion / fragrance (literary variant); long-read pages; print-adjacent brands. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, sports / athletic, brutalist statement, ops / utility / dashboards; contemporary product pages where the 0.8-sections-per-viewport rate reads as wasteful. <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 2) → user pick
  pickedAt: 2026-05-14
-->

## D3 — Gentle Craft

**Character.** Ceramicist's studio. Herbalist's ledger. Quiet portfolio. Section padding at 96px is generous but not theatrical — the page is calm, not slow. Body line-height at 1.70 and body type at 17px gives the same reading rhythm as Editorial Sparse but at a slightly smaller, less authoritative scale. Type scale at 1.25 keeps headings modest — the school doesn't shout, it offers. Container narrows to 1080px; grid gap at 28px keeps cards visually separate, framed. Display line-height at 1.20 is the warmest in the pool — slightly looser than tight, suggesting headings have a hand-set quality. The page reads like a small folio prepared by someone who cares.

**Section padding.**
  - desktop: `96px`
  - tablet:  `67px` (96 × 0.7)
  - mobile:  `48px` (96 × 0.5)

**Line-height for body / display.**
  - body:    `1.70`
  - display: `1.20`

**Type scale.**
  - ratio:        `1.25` (modest)
  - base body:    `17px`
  - derived h3:   `21px`
  - derived h2:   `27px`
  - derived h1:   `33px`

**Inter-element spacing.** `28px` rhythm — the loosest in the pool. Elements in a section block sit clearly apart.

**Container & grid.**
  - container max-width: `1080px`
  - grid gap:            `28px` (framed cards)

**Information density per viewport.** ~0.9 sections per 1080-tall scroll on desktop; body bands run 55–65 characters per line; the page reads as unhurried, carefully placed.

**Fits.** Quiet craft / atelier, hospitality, boutique hotel, wine / spirits, sustainable / eco, documentary / journalism, editorial / publication (intimate variant); herbalist / artisan / small-studio brands. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, indie game / playful tech, sports / athletic, brutalist statement, contemporary product (energy mismatch); ops / utility (way too much padding for work). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 2) → user pick
  pickedAt: 2026-05-14
-->

## D4 — Atelier Folio

**Character.** Gallery folio register — the page is hung in a frame. Section padding at 104px is the second-most-airy in the pool, after Editorial Sparse; padding works as a mat-board around the content. Type scale at 1.30 is heading-forward but not display-led — headings carry, body sustains. Body type at 17px with 1.65 line-height; display line-height at 1.15 keeps the heading set tight, even though everything around it breathes. The signature value is the **36px grid gap** — the loosest grid in the pool, making items feel like framed works rather than aligned cards. Container at 1080px for reading width.

**Section padding.**
  - desktop: `104px`
  - tablet:  `73px` (104 × 0.7)
  - mobile:  `52px` (104 × 0.5)

**Line-height for body / display.**
  - body:    `1.65`
  - display: `1.15`

**Type scale.**
  - ratio:        `1.30` (heading-forward)
  - base body:    `17px`
  - derived h3:   `22px`
  - derived h2:   `29px`
  - derived h1:   `37px`

**Inter-element spacing.** `30px` rhythm — generous.

**Container & grid.**
  - container max-width: `1080px`
  - grid gap:            `36px` (the loosest in the pool — items as framed works)

**Information density per viewport.** ~0.8–0.9 sections per scroll; card grids read as galleries with deliberate separation between items.

**Fits.** Editorial / publication, music label, cinema / film, luxury fashion / fragrance, boutique hotel (cinematic variant), documentary / journalism, quiet craft / atelier (gallery variant); painters / sculptors / museum sites / design-studio capability showcases. <!-- inferred -->

**Avoid for.** Vibrant consumer / playful, sports / athletic, brutalist, indie game / playful tech, ops / utility; contemporary product where the 36px grid gap reads as wasteful. <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 2) → user pick
  pickedAt: 2026-05-14
-->

## D5 — Balanced Product

**Character.** The mid-point of contemporary product density — calm, readable, no opinion about display dominance. Section padding at 80px, base 16px, type scale at 1.25 — every value sits exactly where the eye expects. Body line-height at 1.55 reads as standard product; display at 1.15 keeps headings clean. Container at 1280px is generous-modern. Grid gap at 24px is open enough to read as breathing but not so open that it feels editorial. The school reads as the **competent default** — the school you reach for when no specific register is earned. Where Confident Product opinions heading hierarchy, Balanced Product is neutral on it.

**Section padding.**
  - desktop: `80px`
  - tablet:  `56px` (80 × 0.7)
  - mobile:  `40px` (80 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.15`

**Type scale.**
  - ratio:        `1.25` (modest)
  - base body:    `16px`
  - derived h3:   `20px`
  - derived h2:   `25px`
  - derived h1:   `31px`

**Inter-element spacing.** `20px` rhythm — regular.

**Container & grid.**
  - container max-width: `1280px`
  - grid gap:            `24px` (open, not editorial-loose)

**Information density per viewport.** ~1.0–1.2 sections per 1080-tall scroll; card grids show 3 columns comfortably with visible separation.

**Fits.** Trust-led B2B / fintech, tech research / academic, sustainable / eco, civic / institutional, healthcare clinical, documentation surfaces, contemporary product showcases; the school for briefs that don't earn a more specific register. <!-- inferred -->

**Avoid for.** Brutalist statement (too neutral); long-read editorial (needs more breath); pure ops / dashboards (still too padded for data density). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 2) → user pick
  pickedAt: 2026-05-14
-->

## D6 — Utilitarian Tight

**Character.** Tool-and-utility register. Dashboards, admin consoles, dev tools, internal apps. Section padding at 48px is genuinely tight — section transitions are barely felt; the page reads as a continuous workspace, not a marketing surface. Base body at 15px (denser than product) and line-height at 1.50 (faster reading) — utility over luxury. Type scale at 1.20 is the smallest in the pool — headings exist for navigation, not authority. Container at 1280px maximizes work surface; grid gap at 16px keeps panels close enough to scan. Display line-height at 1.10 keeps everything mechanical. The school says: there's work to do, the page is the tool, get on with it.

**Section padding.**
  - desktop: `48px`
  - tablet:  `34px` (48 × 0.7)
  - mobile:  `24px` (48 × 0.5)

**Line-height for body / display.**
  - body:    `1.50`
  - display: `1.10`

**Type scale.**
  - ratio:        `1.20` (the smallest in the pool)
  - base body:    `15px`
  - derived h3:   `18px`
  - derived h2:   `22px`
  - derived h1:   `26px`

**Inter-element spacing.** `14px` rhythm — tight.

**Container & grid.**
  - container max-width: `1280px`
  - grid gap:            `16px` (panels close enough to scan)

**Information density per viewport.** ~1.5–1.8 sections per scroll; data tables and panel grids comfortably show 4–6 columns at full width; the page is mostly working surface.

**Fits.** Tech research / academic, trust-led B2B / fintech (utility tier), internal tools, admin consoles, dev dashboards, data interfaces; ops-led pages where the page is a job, not a brand. <!-- inferred -->

**Avoid for.** Editorial / publication, quiet craft / atelier, hospitality, boutique hotel, luxury fashion, music label, brand-led marketing (everywhere mood matters more than function); contemporary product marketing (the school is for the app, not the landing page). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 2) → user pick
  pickedAt: 2026-05-14
-->

## D7 — Codex

**Character.** Beyond Editorial Sparse — the slowest school in the pool. Section padding at 144px makes section transitions glacial; the reader has to scroll to find the next band, and that is the point. Body line-height at 1.75 with 18px body is the slowest reading rhythm in the pool — sentences feel written with a fountain pen. The container narrows to 1020px (tied for narrowest), shaping reading width to manuscript-page proportions. Type scale at 1.35 still gives headings real authority despite the calm surroundings — bigger than Editorial Sparse's 1.333, just enough to declare each section. Grid gap at 36px (tied for loosest in the pool) reads as items-as-exhibits, not aligned cards. The school is for scholarly editions, deep-archive editions, monographs — pages where a reader settles in for an hour.

**Section padding.**
  - desktop: `144px`
  - tablet:  `101px` (144 × 0.7)
  - mobile:  `72px` (144 × 0.5)

**Line-height for body / display.**
  - body:    `1.75`
  - display: `1.18`

**Type scale.**
  - ratio:        `1.35`
  - base body:    `18px`
  - derived h3:   `24px`
  - derived h2:   `33px`
  - derived h1:   `44px`

**Inter-element spacing.** `28px` rhythm — among the loosest. Every element in a section block has visible breath around it.

**Container & grid.**
  - container max-width: `1020px` (narrowest in the pool — manuscript proportions)
  - grid gap:            `36px` (loose — items as exhibits)

**Information density per viewport.** ~0.6–0.8 sections per 1080-tall scroll (the sparsest school in the pool); body bands run 50–58 characters per line; the reader is paced for a meditative session, not a scan.

**Fits.** Editorial / publication (scholarly variant), documentary / journalism (long-form features), academic publishing, museum publication pages, monograph sites, archival projects; the atelier register in its most scholarly mode. <!-- inferred -->

**Avoid for.** Contemporary product, ops / data / dashboards, vibrant consumer / playful, sports / athletic, indie game; pages that have to convert in <60 seconds; commerce surfaces where shopping needs to be fast. The school is for slow reading; pages that need to act don't earn it. <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 3) → user pick
  pickedAt: 2026-05-14
-->

## D8 — Manifesto

**Character.** Declarative — bold display contrast meets editorial breath. The signature value is the **1.5 type scale at 18px base**, which gives h1 ~61px display while body sits at a calm 18px and line-height at standard 1.55. Section padding at 112px places this between Atelier Folio and Editorial Sparse — properly editorial, not slow. Display line-height at 1.05 is *tight* (the tightest in the pool) — the big headings sit close, like a poster. Inter-element rhythm at 26px is generous; headings dominate every band they appear in. Container at 1100px keeps reading manageable. Grid gap at 24px is moderate. The school is for hero-led campaigns, mission pages, brand statements — pages whose job is to *declare*.

**Section padding.**
  - desktop: `112px`
  - tablet:  `78px` (112 × 0.7)
  - mobile:  `56px` (112 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.05` (tightest in the pool — poster-like)

**Type scale.**
  - ratio:        `1.50` (display-led; tied with Confident Product for biggest)
  - base body:    `18px`
  - derived h3:   `27px`
  - derived h2:   `41px`
  - derived h1:   `61px`

**Inter-element spacing.** `26px` rhythm — generous, lets the headings breathe.

**Container & grid.**
  - container max-width: `1100px`
  - grid gap:            `24px` (moderate — cards visible but not curated)

**Information density per viewport.** ~0.8–1.0 sections per scroll; big headings consume vertical space; the page feels chest-out and declarative.

**Fits.** Brand statement pages, mission / vision / about pages, hero-led campaign pages, manifesto / declaration sites, founder letters, launch pages with single big claims; music label, cinema / film (festival variant), luxury fashion / fragrance (statement tier), indie game (announcement / launch). <!-- inferred -->

**Avoid for.** Quiet craft / atelier, hospitality, healthcare clinical, civic institutional (the headlining-everything energy is wrong for restrained registers), ops / utility / data, editorial / long-read (the heading dominance compromises sustained reading). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 3) → user pick
  pickedAt: 2026-05-14
-->

## D9 — Op-Ed

**Character.** Essay register — slow body + display authority + narrow column. Section padding at 96px is properly editorial. Body line-height at 1.72 is generous (slower than Editorial Sparse, almost as slow as Codex), inviting the reader to settle in. Type scale at 1.35 gives headings real weight against the calm body. Display line-height at 1.18 is loose — warmer than tight, suggesting the headings have personality. Container at 1020px is the narrowest in the pool (tied with Codex), shaping the reading column to a single thoughtful voice. Grid gap at 24px is moderate. The school reads as a long-form opinion piece, an essay, a manifesto where every paragraph matters.

**Section padding.**
  - desktop: `96px`
  - tablet:  `67px` (96 × 0.7)
  - mobile:  `48px` (96 × 0.5)

**Line-height for body / display.**
  - body:    `1.72`
  - display: `1.18`

**Type scale.**
  - ratio:        `1.35`
  - base body:    `17px`
  - derived h3:   `23px`
  - derived h2:   `31px`
  - derived h1:   `42px`

**Inter-element spacing.** `24px` rhythm — generous.

**Container & grid.**
  - container max-width: `1020px` (narrowest — single-voice reading column)
  - grid gap:            `24px`

**Information density per viewport.** ~0.8–1.0 sections per scroll; 50–58 characters per line at the narrow container; the reader is settled in for sustained reading, not scrolling for navigation.

**Fits.** Essays, op-eds, long-form opinion, paid newsletters, substack-modern, persuasion pages, founder letters (long-form variant); documentary / journalism (op-ed pages), editorial / publication (essay tier), academic essays, manifestos that read rather than declare. <!-- inferred -->

**Avoid for.** Contemporary product, ops / utility, vibrant consumer / playful, sports / athletic, music label, hospitality, e-commerce; anywhere the narrow column or slow body would frustrate the user's task. <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 3) → user pick
  pickedAt: 2026-05-14
-->

## D10 — Broadsheet

**Character.** Print-news register — denser than long-form, more editorial than Newsroom would be. Section padding at 72px is tight-but-readable (between Catalog and Balanced Product). Body line-height at 1.55 is standard product reading; body type at 17px gives slightly more authority than 16px without dropping to news-grade utility. Type scale at 1.30 gives modest heading hierarchy. Container at 1200px is wide-news — wider than editorial schools, narrower than commerce. Grid gap at 18px is tight, items pack closer (print-news layout feel). Display line-height at 1.10 keeps headings clipped. The school reads as weekly publication, regional newspaper, longform-mixed site — the digital cousin of a Sunday broadsheet.

**Section padding.**
  - desktop: `72px`
  - tablet:  `50px` (72 × 0.7)
  - mobile:  `36px` (72 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.10`

**Type scale.**
  - ratio:        `1.30`
  - base body:    `17px`
  - derived h3:   `22px`
  - derived h2:   `29px`
  - derived h1:   `37px`

**Inter-element spacing.** `20px` rhythm — regular.

**Container & grid.**
  - container max-width: `1200px` (wide-news)
  - grid gap:            `18px` (tight — items pack close)

**Information density per viewport.** ~1.2–1.4 sections per scroll; 60–72 characters per line; multi-column-feeling page even when single-column.

**Fits.** Weekly publications, regional news sites, longform-mixed brands, magazine sites with mixed content density, modern newspaper redesigns, daily-essay publications, news-led nonprofit sites; documentary / journalism (denser variant), civic / institutional (publication tier). <!-- inferred -->

**Avoid for.** Hospitality, boutique hotel, quiet craft / atelier (too dense), brutalist statement, ops / utility (still too padded for tool work); contemporary product marketing (the school is for content, not product showcases). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 3) → user pick
  pickedAt: 2026-05-14
-->

## D11 — Catalog

**Character.** Commerce / shop register — calm reading with the widest container in the pool for product display. Section padding at 64px is tight (between Utilitarian Tight and Newsroom would have been). Body line-height at 1.55 is standard. Type scale at 1.25 is modest — headings exist to navigate sections, not to dominate. The signature value is the **1320px container** — the widest in the pool, designed to show 4 product columns comfortably. Grid gap at 18px keeps cards close (commerce-density). Display line-height at 1.12 keeps headings clipped. Rhythm at 18px is regular. The school is for e-commerce, product catalogs, indie shops — pages that need to show inventory without slowing the shopper down.

**Section padding.**
  - desktop: `64px`
  - tablet:  `45px` (64 × 0.7)
  - mobile:  `32px` (64 × 0.5)

**Line-height for body / display.**
  - body:    `1.55`
  - display: `1.12`

**Type scale.**
  - ratio:        `1.25` (modest — headings for navigation, not dominance)
  - base body:    `16px`
  - derived h3:   `20px`
  - derived h2:   `25px`
  - derived h1:   `31px`

**Inter-element spacing.** `18px` rhythm — tight-regular.

**Container & grid.**
  - container max-width: `1320px` (widest in the pool — for 4-column product display)
  - grid gap:            `18px` (commerce-density)

**Information density per viewport.** ~1.3–1.5 sections per scroll; 70–80 characters per line at the wide container; card grids show 4 product columns comfortably with visible separation; the page is mostly catalog surface, with text playing a supporting role.

**Fits.** E-commerce, product catalogs, indie shops, marketplace sites, gallery shops, wine catalogs, design-object stores, food shops; anything where product cards are the subject and reading is secondary; hospitality (menu / catalog variant), vibrant consumer / playful (catalog variant). <!-- inferred -->

**Avoid for.** Editorial / long-read, op-ed / essay (the wide container destroys reading flow), contemporary product marketing (too dense for hero-led brand pages), brutalist statement, music label (mood mismatch); pure ops / utility (the brand-front polish reads as overhead for tool work). <!-- inferred -->

<!-- _provenance:
  writtenBy: density-playground.html (gallery round 3) → user pick
  pickedAt: 2026-05-14
-->
