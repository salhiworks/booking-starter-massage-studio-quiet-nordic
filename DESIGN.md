# Quiet Room Massage — visual system

**Quiet Nordic · Linen & Daylight.** The page behaves like a calm Scandinavian
treatment room in the afternoon: soft ivory paper, warm stone, quiet sage, and
one deep forest green that appears only twice — the ritual and the footer.
Daylight photographs of linen, pale wood and hands at work carry the mood; the
type is editorial and light; nothing hurries. The one action, *Book a session*,
is always the calmest thing on the screen.

What keeps it its own (and far from Atelier's arched blush mirror or After
Hours' lamplit espresso): square-cut photographs with a single "print" laid
over a corner, a small sage leaf as the only ornament, Newsreader italics in the
accent colour, a forest band where the visit is told as four moments on one
thread, and booking in a linen sheet with a forest header.

All values live in **`src/styles/tokens.css`** (the only file with raw colours,
fonts, sizes and spacing). Every other stylesheet uses the tokens.

---

## 1. Type

| Role | Face | Setting |
|---|---|---|
| Display (h1–h3, prices, numerals, the wordmark) | **Newsreader** (variable: `opsz` 6–72, `wght` 200–800, with its italic) — Production Type, SIL OFL | weight 300, optical size follows the font size, tracking −0.018em; `*words*` in a headline become italics in the accent colour |
| Text (body, UI, forms) | **Albert Sans** (variable `wght`) — Scandinavian geometric sans, SIL OFL | 400 body, 560 labels and buttons; tabular numbers for times |

Both are self-hosted with `@fontsource-variable/*` (no font CDN), `font-display: swap`.

**Owner heading style** (`brand.headings`, on `<html data-headings>`):
`light` (default — Newsreader 300), `book` (Newsreader 430), `sans`
(Albert Sans 380; emphasis then stays upright, in the accent colour).

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 13 px | eyebrows (uppercase, +0.16em), captions |
| `--text-sm` | 15 px | hints, labels, summary rows |
| `--text-md` | 16 → 17 px | body |
| `--text-lg` | 18 → 21 px | ledes, FAQ questions, prices |
| `--text-xl` | 22 → 28 px | h3, treatment names, fact values |
| `--text-2xl` | 34 → 56 px | h2 section titles |
| `--text-3xl` | 44 → 88 px | the footer name mark |
| `--text-hero` | 44 → 84 px | h1 |
| `--text-numeral` | 40 → 60 px | ritual numerals (italic) |

---

## 2. Colour

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F7F3EC` | page (soft ivory), the booking sheet |
| `--raised` | `#FCFAF6` | inputs, choice rows, cards |
| `--oat` (warm stone) | `#ECE5D9` | the studio and visit bands, the session summary |
| `--oat-deep` | `#E1D8CA` | frames while loading, skeletons |
| `--sage-100` / `--sage-200` | `#E4E8DD` / `#D3DBCC` | the booking band / tags and counts |
| `--forest` / `--forest-2` | `#1F2B24` / `#2A382F` | the ritual band, the footer, the sheet header |
| `--on-forest` / `--on-forest-soft` | `#F3EEE4` / `#C9CFC3` | text on forest |
| `--forest-glow` | `#A9C2A8` | numerals, labels and beads on forest |
| `--rule` / `--line-soft` | `#D6CDBF` / `#C9BFB0` | hairlines / borders of self-labelled choices |
| `--line-input` | `#857C6F` | input and icon-button borders (≥ 3:1) |
| `--mark` | `#6A806C` | the leaf ornament, "open" dots (≥ 3:1) |
| `--ink` / `--ink-soft` / `--muted` | `#22241F` / `#45463F` / `#615D53` | headings / body / secondary |
| `--accent` | `#405846` | deep forest sage — buttons, links, focus, selection, italics (owner-editable) |
| `--clay` | `#9A442F` | errors only |

### Contrast (WCAG 2.x)

| Pair | Ratio |
|---|---|
| ink on paper / raised / stone / sage-100 | 14.2 / 15.0 / 12.5 / 12.6 |
| ink-soft on paper / stone / sage-200 | 8.6 / 7.6 / 6.7 |
| muted on paper / raised / stone / sage-100 | 5.9 / 6.3 / 5.2 / 5.3 |
| accent on paper / raised / stone / sage-100 | 7.0 / 7.5 / 6.2 / 6.3 |
| paper on accent (buttons) | 7.0 |
| on-forest / on-forest-soft / forest-glow on forest | 12.7 / 9.2 / 7.7 |
| clay on paper / raised / stone | 5.9 / 6.2 / 5.2 |
| line-input on paper / raised / stone (non-text, ≥ 3:1) | 3.7 / 3.9 / 3.3 |

Every text/background pair is 4.5:1 or better. The owner's accent is checked by
the dashboard against warm stone (`#ECE5D9`, the darkest light surface it sits
on as text) at 4.5:1.

**Dashboard accent** (`src/admin-theme.css`, the engine's only theming hook):
Light `#405846` with white text (7.5:1 on the dashboard, 7.8:1 text); Dark
`#A9C2A8` with `#121A14` text (10.3:1, 9.3:1).

---

## 3. Space, layout, shape

- **Spacing** `--space-1` … `--space-10`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 136 px.
  Sections breathe with `--section-pad` (72 px phones → 152 px wide).
- **Margins:** `--gutter` 20 px → 7vw → 112 px; content max `--page-max` 1280 px.
- **Compositions from 960 px:** hero words in ~41 % and a landscape (4:3) photo
  in ~54 % bleeding to the right edge, never taller than the first screen allows,
  with the linen print over its lower-left corner — the whole hero, facts
  included, fits a 1280 × 800 laptop; treatments 4/8
  with the heading and length filter sticky; the studio photo tall and sticky on
  the left, words, facts and two staggered detail photos on the right; the
  ritual as four columns under one thread; therapists beside a sticky photo;
  questions 4/8.
- **Phones:** words first, then the photo full-bleed at 4:3 (the print overlaps
  it), then the facts; the ritual's thread runs down the left.
- **Breakpoints:** 380, 600, 640, 720 (calendar grid), 840, 960 (compositions,
  nav, the sheet as a side panel).
- **Radius:** 0 for photos and bands; 2 px buttons and inputs; 6 px the sheet,
  choice rows, the summary, booking cards; pills only for chips, time choices
  and tags.
- **Elevation:** flat, except the hero print (`--shadow-print`), the sheet
  (`--shadow-sheet`) and the sticky booking bars.

---

## 4. Photography

Six Pexels photographs and one owner-supplied hero (see `PHOTOS.md`): linen,
pale wood, warm skin tones and soft light; the hero is the one darker,
lamplit scene, which the ivory page frames like a print. Only the hero shows
faces, and nobody is named. One shared grade (slightly warmer, a little less
saturated, a touch brighter) so they read as one set. Each is cropped for its
frame and shipped as AVIF + WebP at three widths in a `<picture>` with `sizes`
that match the layout, `width`/`height` on every `<img>`, a fixed
`aspect-ratio` and `object-fit: cover`. The hero is eager with
`fetchpriority="high"` and a `<link rel="preload">`; everything else is lazy.

**Service photos** are the owner's (dashboard → Services) and optional: they
appear as small prints under the treatment's name. Never a placeholder or stock
picture.

---

## 5. Motion

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 160 ms | hover, press, focus |
| `--dur-step` | 280 ms | booking steps, menu filter, FAQ sign |
| `--dur-enter` | 480 ms | hero words rise (40 ms stagger) |
| `--dur-photo` | 900 ms | the hero photo settles from 1.03, the print rises |
| `--dur-sheet` | 420 ms | the sheet rises (phones) or slides in (wide) |
| `--ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | arriving |
| `--ease-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | state changes |

Nothing delays reading or booking. Under `prefers-reduced-motion: reduce` every
duration is near zero and nothing moves or scrolls smoothly.

---

## 6. Components and states

- **Buttons:** primary = accent fill, ivory text, 52 px (≥ 44 px everywhere);
  on forest the button turns ivory with forest text. Quiet links underline on hover.
- **Book buttons** (header, hero, every treatment length, the booking band, the
  footer) open the sheet; while online booking is off they lead to `#book`,
  which then shows the studio's phone and email.
- **Length filter:** pill chips (`aria-pressed`) with a live count for screen readers.
- **FAQ:** native `<details>`, the first one open; a thin plus turns into a minus.
- **Booking sheet:** a modal `<dialog>` (focus trapped by the browser, Esc, ✕,
  Back and a click beside it close it; focus returns to the opener; the page
  behind is locked). Full screen on phones with the session strip pinned under
  the header; from 960 px a 1056 px panel from the right with the summary card
  beside the steps. Each step's heading takes focus and scrolls into view.
  **The primary action is always in reach:** the chosen-time bar (Continue) and
  the details step's submit row sit in the flow and pin themselves to the foot
  of the sheet whenever the content runs below it; the sheet's
  `scroll-padding-bottom` keeps a focused field or a just-chosen time above them.
  Spacing inside the sheet is denser than on the page (40 px calendar cells,
  tighter stepper, headings and fields) so the time step fits a 1440 × 900
  screen whole. Sticky offsets measure from the scroll container's padding, so
  the sheet body has no bottom padding — the space sits on its content.
- **Calendar:** month grid from 720 px, a day rail on phones; sage dot = open,
  "2 left" = few left, struck = full, pale = closed; the chosen day fills with
  the accent. Times are pill chips grouped Morning / Afternoon / Evening.
- **Notices:** a rule on the left (accent for information, clay for errors), one action.
- **Sample labels:** "Sample" on therapist profiles and the visit details in the
  demo/preview, "Sample photo" on the therapists' photo, until the owner replaces them.
