# Photographs

Three free photographs, downloaded into the project (never hot-linked), cropped
for their one use and exported as AVIF + WebP at three widths by
a processing script. **This starter ships only those processed frames** — the
stored sources (the downloads scaled to a 2400 px long edge, camera metadata
removed) and the script stay with the source project, so the repository never
redistributes an unaltered copy. No image-generation tool was used.

They are the website's **defaults** (`src/content/site.ts`): the owner can
replace each one in the dashboard (Website). None of them shows a member of the
studio's staff — the therapists' photo shows hands at work and is labelled
"Sample photo" on the page until the owner replaces it.

| Use (content field) | Files | Source page | Photographer | Licence |
|---|---|---|---|---|
| Hero — hands working over a white towel (`hero.photo`) | `public/photos/hero-hands-{640,1024,1600}.{avif,webp}` · source `photos/source/kilkeary-hands-towel.jpg` | https://unsplash.com/photos/massage-on-leg-with-white-towel-yBLLzNcA6GU | Mat Kilkeary ([@matkilkeary](https://unsplash.com/@matkilkeary)) | [Unsplash License](https://unsplash.com/license) (free; not Unsplash+) |
| First visit — a treatment table by a tall window (`firstVisit.photo`) | `public/photos/room-window-{560,960,1440}.{avif,webp}` · source `photos/source/koolshooters-room-window.jpg` | https://www.pexels.com/photo/settee-by-the-window-6628520/ | KoolShooters ([@koolshooters](https://www.pexels.com/@koolshooters/)) | [Pexels License](https://www.pexels.com/license/) (free) |
| Therapists — hands at work on a forearm, labelled "Sample photo" (`team.photo`) | `public/photos/team-hands-{480,800,1200}.{avif,webp}` · source `photos/source/olmo-hands-forearm.jpg` | https://unsplash.com/photos/hands-massaging-a-persons-forearm-with-gentle-pressure-YBfzGCJjLuI | Stephen Olmo ([@seaolivestudios](https://unsplash.com/@seaolivestudios)) | [Unsplash License](https://unsplash.com/license) (free; not Unsplash+) |

Licences were checked on each photo's page on 2 November 2026 ("Free to use
under the Unsplash License"; Pexels: "Free"). Neither licence requires
attribution; it is recorded here anyway.

## Processing (`scripts/build-photos.mjs`)

| Photo | Crop | Grade | Widths |
|---|---|---|---|
| hero-hands | 4:5, centred | none | 640, 1024, 1600 |
| room-window | 3:4, centred low (table and floor) | slight warmth (red +3.5 %, blue −7 %), saturation 0.90, brightness 1.03 — so the cool loft light sits with the oat palette | 560, 960, 1440 |
| team-hands | 4:5, centred on the hands | saturation 0.88, brightness 1.04 | 480, 800, 1200 |

AVIF quality 50, WebP quality 74. The frames on the page keep a fixed
`aspect-ratio` with `object-fit: cover`, so the CSS may crop further per screen
size (for example 3:2 on tablets).

## Service photos

Service photos are the owner's, added per service in the dashboard (Services).
The site ships none and adds no placeholder or stock picture for a service
without one.
