# Quiet Room Massage — visual system

**Concept.** The page behaves like the room: warm white paper, oat and stone
surfaces, hairline rules and an airy serif — nothing competes for attention, so
the one clear action, *Book a session*, is always the calmest thing to do.

Style direction: *Quiet Nordic* — oat, stone and soft sage on warm white; a
light, elegant serif for display with a calm humanist sans; wide margins, thin
rules and slow, gentle motion.

What keeps it far from a barbershop or a hair salon: no dark grounds, no
condensed or heavy type, no badges, stripes or "menu board". The treatments read
like a quiet ledger (rules, not cards), photographs are pale and tactile, and
the booking flow sits on a soft sage desk like a form filled in at a calm front
desk.

All values below live in **`src/styles/tokens.css`** (the only file with raw
colours, fonts, sizes and spacing). Every other stylesheet uses the tokens.

---

## 1. Type

| Role | Face | Setting |
|---|---|---|
| Display (h1, h2, treatment names, the wordmark) | **Newsreader** (variable: `opsz` 6–72, `wght` 200–800) — Production Type, SIL OFL | weight 300, optical size follows the font size (large sizes get the fine display cut), tracking −0.012em |
| Text (body, UI, forms, numbers) | **Source Sans 3** (variable `wght`) — Adobe, SIL OFL | weight 400 body, 500 labels/buttons; tabular lining numbers for prices and times |

Both are self-hosted with `@fontsource-variable/*` (no font CDN), `font-display: swap`.

Why: Newsreader's light display cut has real character — calm, literary, a
little warm — without the wedding-spa cliché of a high-contrast Garamond.
Source Sans 3 is a humanist sans that stays very readable at 16–17 px on a
phone in the evening.

**Owner heading style** (`brand.headings`, set on `<html data-headings>`):
`light` (default — Newsreader 300), `book` (Newsreader 430), `sans`
(Source Sans 3 at 340, slightly tighter).

### Type scale (fluid, phone → wide)

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 0.8125rem (13 px) | eyebrows (uppercase, +0.14em), captions, calendar marks |
| `--text-sm` | 0.9375rem (15 px) | hints, labels, summary rows |
| `--text-md` | 1rem → 1.0625rem | body |
| `--text-lg` | 1.125rem → 1.3125rem | ledes, intros |
| `--text-xl` | 1.375rem → 1.75rem | h3, treatment names |
| `--text-2xl` | 2rem → 3rem | h2 section titles |
| `--text-3xl` | 2.625rem → 4.75rem | h1 |

Line height: display 1.06, headings 1.14, body 1.62. Measure: body copy at most
~62ch, ledes ~38ch.

---

## 2. Colour

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#FAF7F1` | page (warm white) |
| `--raised` | `#FFFDF9` | inputs, the booking panel |
| `--oat` | `#F1EADF` | the "First visit" band |
| `--oat-deep` | `#E7DED0` | footer, preview banner, skeletons |
| `--sage-100` | `#E6EBE1` | the booking desk band |
| `--sage-200` | `#D9E1D3` | quiet tints (sample tags, selected rows) |
| `--rule` | `#D8D0C3` | hairlines (decorative) |
| `--line-input` | `#857C6F` | text-input and icon-button borders (≥ 3:1 on every surface) |
| `--line-soft` | `#C4BAAB` | borders of choice buttons that are named by their own text (treatment lengths, days, times) |
| `--mark` | `#6E8470` | the "open" dot in the calendar (≥ 3:1) |
| `--ink` | `#2B2925` | headings, key text |
| `--ink-soft` | `#4A463F` | body text |
| `--muted` | `#655F55` | secondary text, eyebrows |
| `--accent` | `#4A5D4C` | deep sage — buttons, links, focus, selection (owner-editable) |
| `--accent-strong` | accent mixed 18% toward ink | hover / pressed |
| `--on-accent` | `#FAF7F1` | text on the accent |
| `--clay` | `#9C4630` | errors only |

### Contrast (WCAG 2.x, computed with the engine's `contrastRatio`)

| Pair | Ratio |
|---|---|
| ink on paper / oat / oat-deep / sage-100 | 13.6 / 12.2 / 10.9 / 10.8 |
| ink-soft on paper / oat / oat-deep / sage-200 | 8.8 / 7.9 / 7.0 / 7.0 |
| muted on paper / raised / oat / oat-deep / sage-100 | 5.9 / 6.2 / 5.3 / 4.7 / 5.2 |
| accent on paper / raised / oat / oat-deep / sage-100 | 6.6 / 7.0 / 5.9 / 5.3 / 5.9 |
| paper on accent (buttons) | 6.6 (white on accent 7.1) |
| clay on paper / raised / oat | 5.9 / 6.2 / 5.3 |
| line-input on every surface (input borders, non-text, ≥ 3:1) | 3.1–4.1 |
| mark dot on every surface (non-text, ≥ 3:1) | 3.0–4.0 |

Every text/background pair is 4.5:1 or better. The owner's accent is checked
by the dashboard against `--oat` (the darkest surface it sits on as text) at
4.5:1, which also guarantees light text on accent buttons.

**Dashboard accent** (`src/admin-theme.css`): Light `#4A5D4C` with white text
(6.9:1 on the dashboard's near-white, 7.1:1 text on it); Dark `#A9C2A8` with
`#151A15` text (9.6:1 on near-black, 9.2:1 text on it) — the same sage hue,
deep for light, light and softened for dark.

---

## 3. Space, layout, shape

- **Spacing scale** (`--space-1` … `--space-10`): 4, 8, 12, 16, 24, 32, 48,
  64, 96, 136 px. Sections breathe with `--section-pad`
  (72 px on phones → 168 px on wide screens).
- **Wide margins:** `--gutter` = 20 px on phones → 7vw → 112 px max. Content
  max width `--page-max` 1280 px.
- **Grid:** 12 columns from 960 px. Compositions are asymmetric: the hero text
  takes 6 columns and the photo bleeds off the right edge; the room photo
  bleeds off the left edge in "First visit"; therapists sit beside one tall
  photo; the treatments ledger keeps a 4/8 split.
- **Breakpoints** (media queries cannot read custom properties, so these are
  the only lengths written in the stylesheets): 380 (narrow phones), 600, 640,
  720 (calendar grid instead of the day rail), 840, 860 (header navigation),
  960 px (12-column compositions, the summary beside the flow).
- **Radius:** `--radius-0` 0 for photos and bands (crisp edges, like a print);
  `--radius-1` 2 px for buttons, inputs, chips; `--radius-pill` only for the
  small "Sample" tags.
- **Borders:** hairlines (`--hairline` 1 px, `--rule`) separate everything; no
  cards with shadows. Controls use `--line-input`.
- **Elevation:** flat. One exception: the sticky summary/continue bars in the
  booking flow get `--shadow-soft` so they read above scrolling content.

---

## 4. Photography

Diffused north light, pale wood, linen and skin; airy compositions with lots of
negative space; muted, slightly warm colour. Three photographs (see
`PHOTOS.md`): hands working over a white towel (hero), a treatment table by a
tall window (the room), hands at work on a forearm (the therapists' section,
labelled "Sample photo" — a sample never presents a person as a therapist).

Delivery: each photo is cropped for its one use, exported as **AVIF + WebP at
three widths** (`npm run photos`, `scripts/build-photos.mjs`), rendered in a
`<picture>` with `sizes` that match the layout, `width`/`height` on every
`<img>`, frames with a fixed `aspect-ratio` and `object-fit: cover` so an owner
replacement never breaks the layout. The hero is eager with
`fetchpriority="high"` and a `<link rel="preload">`; everything else is lazy.
The room photo gets a gentle warm grade so the set reads as one.

**Service photos** are the owner's (dashboard → Services) and optional. In the
treatments ledger a service group shows its photo in the name column as a
3:2 print with a hairline; a group without one simply has no frame (the name
column is complete on its own). Never a placeholder, never a stock picture.

---

## 5. Motion

Slow and physical, never in the way.

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 160 ms | hover, press, focus |
| `--dur-step` | 280 ms | booking step change, time unfold |
| `--dur-enter` | 480 ms | hero entrance (text), with a 40 ms stagger |
| `--dur-photo` | 600 ms | the hero photo settling in |
| `--ease-settle` | `cubic-bezier(0.22, 1, 0.36, 1)` | things arriving and settling |
| `--ease-soft` | `cubic-bezier(0.65, 0, 0.35, 1)` | state changes |

Moments: the hero text rises 10 px and fades in (staggered, 600 ms in total;
the button is usable at once); the hero photo settles from 1.03 scale; each booking
step fades up when it appears; the chosen time unfolds its Continue bar.
Nothing delays reading or booking. Under `prefers-reduced-motion: reduce` every
duration is near zero and nothing moves.

---

## 6. Components and states

- **Buttons:** primary = accent fill, `--on-accent` text, 52 px tall (≥ 44 px
  everywhere), 2 px radius, label weight 500. Quiet = text with an underline
  that thickens on hover. Busy buttons keep their size and say what is
  happening ("Sending your code…").
- **Focus:** 2 px accent outline, 3 px offset, on every interactive element.
- **Calendar:** month grid from 720 px (cells ≥ 46 px), a horizontal day rail on
  phones (64 × 84 px cards). One mark per day at most: a sage dot = open,
  "2 left" = few left (plain, never red), struck-through number = fully booked,
  pale number = closed, faded and unfocusable = outside the booking window.
  Today has a thin ring; the chosen day is filled with the accent.
- **Times:** Morning / Afternoon / Evening switch with counts, times as 48 px
  chips; the chosen time unfolds "Wed, Nov 4 · 10:30 a.m. — Continue".
- **Notices:** a hairline on the left (accent for information, clay for
  errors), plain text and one action. Errors are announced (`role="alert"`).
- **Sample labels:** a small sage pill "Sample" on therapist profiles and
  "Sample photo" on the therapists' photo until the owner replaces them.
