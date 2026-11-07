# Massage & Wellness "Quiet Nordic" Starter — project rules

A one-page booking website for a massage & wellness studio, shipped as **Quiet
Room Massage** (a fictional studio in Vancouver, BC) for the owner to make their
own. Its identity lives in `src/site.config.ts`; `CUSTOMIZE.md` is the prompt that
personalizes it. Built around **@profitstudio/booking-engine** **2.0.0-beta.3**
(pinned; lock in `booking-engine.lock.json`). The engine owns booking; this
project owns the public design.

Read before changing anything:
- `BOOKING_ENGINE.md` — the engine's rules (engine-owned; `npx booking-engine sync` replaces it).
- `node_modules/@profitstudio/booking-engine/docs/INTEGRATION.md` — the full contract. It wins on technical points.
- `DESIGN.md` — the visual system. `PHOTOS.md` — photo sources and licences.

## The Live Demo layer — leave it alone

- `src/demo/` is the public Live Demo's in-browser engine and sample data. Only
  `npm run dev:demo` / `npm run build:demo` use it (`vite --mode demo` defines
  `__BOOKING_DEMO__`); in every other build it is compiled out. Never read, edit
  or "fix" it while customizing the website.
- Keep the `__BOOKING_DEMO__ ? … : …` branches as they are: the demo wording
  (no email is sent) must stay true in the demo, and the real wording in production.
- `src/demo/engine/` is vendored from the Niche Pack workspace — edit it there.
- `src/admin-main.tsx` passes `emailDelivery={__BOOKING_DEMO__ ? 'none' : undefined}`:
  only the demo's dashboard says no email is sent. Never set it on a real site.

## Engine boundaries (from BOOKING_ENGINE.md)

- All booking data goes through the ONE instance in `src/lib/engine.ts`. Never import
  `@supabase/supabase-js` for booking data, call `booking_*` RPCs or write SQL for booking tables.
- Never edit `supabase/migrations/*_booking_engine_*.sql`, `supabase/functions/booking-mailer/`,
  `booking-engine.lock.json` or `node_modules`.
- Only the publishable key may reach the website (`VITE_SUPABASE_URL` + `VITE_SUPABASE_PUBLISHABLE_KEY`,
  both or neither). Never a secret/`service_role` key, never an email provider key, in any file or `VITE_` variable.
- Show only the slots `getAvailability()` returns; send `slot.startsAt` back unchanged; show dates and
  times in `business.timezone`. Never compute availability in the browser — the calendar only reshapes
  engine data with the engine's helpers (`monthGrid`, `groupSlotsByPartOfDay`, `isFewLeft`, `nextAvailableDay`…).
- Label slot times with the server's business-local `slot.time` / `confirmation.time` via `formatClockTime`
  (never re-derive them from `startsAt` in the browser: browser and server time-zone data can disagree).
- Book in two steps: `requestBooking()` → code step → `verifyBooking()`. "Send a new code" =
  `resendVerificationCode()`; "Choose another time" = await `cancelBookingRequest()`, then reload availability.
- Handle `ok: false` on every call. Show success only after `verifyBooking()` returned `ok: true`
  (pending → "Request received — we'll confirm your session shortly.", confirmed → "Your session is booked.").
  Preview answers `PREVIEW_MODE`: say so honestly, never a success screen.
- `business.policies.onlineBookingEnabled === false` (or `BOOKING_DISABLED`) → contact details instead of the flow.
- The engine sends every booking email. Never add an email service to the website.
- Keep the packaged dashboard on `/admin/` (`admin/index.html` → `src/admin-main.tsx`). Never fork or restyle it:
  `src/admin-theme.css` sets only `--pbe-accent` / `--pbe-accent-text` per mode.
- **A new booking feature (payments, SMS, staff calendars, therapist choice…) needs a new engine
  version — never custom database code in this project.** One shared calendar per business: never offer
  "choose your therapist" or per-therapist availability.

## Where things live

| What | Where |
|---|---|
| Engine instance (preview: name, `America/Vancouver`, placeholder contact) | `src/lib/engine.ts` |
| This site's preset (sample services, hours, policies; "guests"/"sessions") — also the dashboard's starter set | `src/lib/preset.ts` (`sitePreset`) |
| What the owner can edit (texts, photos, logo, accent, heading style) | `src/content/site.ts` (`defineSiteContent`) |
| Content store + brand → CSS variables (`--accent`, `data-headings`) | `src/lib/content.ts` |
| Design tokens — the ONLY file with raw colours, fonts, sizes, spacing | `src/styles/tokens.css` |
| Base / page / booking styles (tokens only) | `src/styles/base.css`, `site.css`, `booking.css` |
| Sections | `src/components/*.tsx` (Header, Hero, Treatments, Studio, Ritual, Therapists, Questions, Visit, Footer; `Emphasis` renders the owner's `*italic*`) |
| Booking sheet (a modal `<dialog>` at `#book`; Back/Esc/✕ close it) + the `#book` band | `src/App.tsx` (open/close + history), `src/components/booking/BookingSheet.tsx`, `BookingSection.tsx`, `src/lib/dialog.ts` |
| Booking flow | `src/components/booking/` (BookingFlow = state + engine calls, root `#book-flow`; DayPicker, TimePicker, DetailsForm, CodeStep, Summary, Done) |
| "Open now" + hours changes (from `getOpeningTimes`, fallback to weekly hours) | `src/lib/useOpening.ts`, `src/lib/hours.ts` |
| Photo variant map | `public/photos/`, `src/content/photoVariants.ts` (generated) |
| Content baked into `index.html` at build | `vite.config.ts` (`publishedSiteContent`) |

## Rules for future changes

- **Content fields:** render values as text (never `dangerouslySetInnerHTML`), images from the resolved
  `src`/`alt`. Never rename or reuse a field id on a live site — add a new id. Services, prices, durations,
  hours, the address, phone and email are NOT content: they come from the engine.
- `src/content/site.ts` is also imported by `vite.config.ts` (Node): keep it free of local imports.
- **Every Book button** calls `startBooking()` (App): it opens the sheet, or — while online booking is off, unconfigured or failing — leads to the `#book` section and its contact details. Keep it that way for any new button.
- **Default photos:** add your own variants to `public/photos/` (the original downloads and their script are not part of this starter), keep the
  default `src` in `site.ts` equal to a key in `photoVariants.ts`, record the source in `PHOTOS.md`.
  If the hero default changes, update the `<link rel="preload">` in `index.html` (its `imagesizes` must
  match `HERO_SIZES` in `src/components/Hero.tsx`).
- **Service photos** are the owner's (`service.image`, dashboard → Services). Never add stock or
  placeholder pictures for services, and never make service photos site content fields.
- **Therapist samples:** the "Sample" / "Sample photo" labels disappear when the owner sets
  `team.members` / `team.photo` (`ownerFields`). Never present a photographed person as staff.
- **Copy:** calm, warm, practical; "guests" and "sessions"; no health claims, no countdowns or scarcity
  pressure, never ask for medical details in the form.
- **Style:** plain CSS with the tokens; no UI kit. Keep 44 px tap targets, visible focus, the
  `prefers-reduced-motion` path, and every text/background pair at 4.5:1 (see DESIGN.md).
- The public site stays one page (sections + in-page booking flow); no client-side path routes.

## Commands

```bash
npm run dev                              # http://localhost:5174 (preview mode without a backend)
npm run build                            # tsc -b && vite build (multi-page: / and /admin/)
npm run lint                             # oxlint (supabase/functions is ignored)
npm run dev:demo                         # the Live Demo: in-browser engine + dashboard, nothing sent
npm run build:demo                       # the public Live Demo build — never the production site
npx booking-engine doctor                # project check
npx booking-engine doctor --dist dist    # after a build: scans the output for secrets
```

Connecting a backend (Supabase, email) follows INTEGRATION.md §11 — only with the owner's go-ahead.
