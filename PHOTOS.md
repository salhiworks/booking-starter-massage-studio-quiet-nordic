# Photographs

Seven photographs: six free photographs from Pexels and one hero photograph
that is the project owner's own work (see the hero row). All are downloaded into the project (never
hot-linked), cropped for their one use and exported as AVIF + WebP at three
widths by the Quiet Nordic photo pipeline. **This
starter ships only those processed frames** — the original downloads and the
pipeline script stay with the source project, so the repository never
redistributes an unaltered copy. No image-generation tool was used.

They are the website's **defaults** (`src/content/site.ts`): the owner can
replace each one in the dashboard (Website). **They are sample imagery, not
Quiet Room Massage** (a fictional studio): nobody in them works at the studio,
and nobody is named: the hero photo shows a practitioner's and a guest's faces,
but the practitioner's embroidered name and the uniform's brand label were
retouched out, and the hero never presents them as the studio's staff. Every
other photo keeps faces out of frame. The therapists' photo is labelled
"Sample photo" on the page until the owner replaces it, and the sample therapist
profiles have no portraits (initials only).

| Use (content field) | Files (`public/photos/`) | Source page | Photographer | Licence |
|---|---|---|---|---|
| Hero, main photo — a practitioner massaging a resting guest's face in a dark-panelled treatment room (`hero.photo`) | `hero-facial-{800,1200,1680}` | The project owner's own photograph (supplied 7 November 2026) | Youssef Es-salhi (project owner) | © the project owner; included in this starter with the owner's permission — not under the MIT licence and not a stock licence |
| Hero, small print — linen towels and body brushes on an oak peg rail (`hero.detail`) | `linen-hooks-{400,640,960}` | https://www.pexels.com/photo/wooden-hanger-with-towels-and-body-brushes-4210341/ | Karolina Grabowska / Kaboompics ([@karola-g](https://www.pexels.com/@karola-g/)) | Pexels License |
| The studio — a treatment table beside a tall loft window (`firstVisit.photo`, shown under "The studio") | `studio-window-{560,960,1440}` | https://www.pexels.com/photo/settee-by-the-window-6628520/ | KoolShooters ([@koolshooters](https://www.pexels.com/@koolshooters/)) | Pexels License |
| The studio, first detail — rolled towel and candle on the table (`studio.detailOne`) | `studio-table-{480,800,1200}` | https://www.pexels.com/photo/cozy-spa-massage-table-with-candle-and-decor-35884499/ | Marine Fougère | Pexels License |
| The studio, second detail — massage oils and a wooden hand tool (`studio.detailTwo`) | `studio-oils-{400,640,960}` | https://www.pexels.com/photo/brown-bottles-on-the-table-6628474/ | KoolShooters | Pexels License |
| Therapists — hands warming oil above a resting guest, labelled "Sample photo" (`team.photo`) | `sample-hands-{480,800,1200}` | https://www.pexels.com/photo/a-woman-having-a-massage-6628640/ | KoolShooters | Pexels License |

Licences of the six Pexels photos were checked on each photo's page on 7
November 2026 (each page reads "Free to use"; licence: Pexels). The hero photo is
the project owner's own; they hold its rights (and are responsible for the
consent of the people shown). The Pexels License does not require
attribution; it is recorded here anyway.

## Processing

| Photo | Crop (from the original) | Grade | Widths |
|---|---|---|---|
| hero-facial | 4:3 from the 1920 × 1280 supplied file, dropping a 150 px dark strip on the left; **retouched**: the embroidered name and the brand label on the uniform covered with neighbouring fabric | brightness 1.04, saturation 0.95 | 800, 1200, 1680 |
| linen-hooks | 4:5, 88 % of the width, from 10 % down (rail and towels) | saturation 0.92, a touch warmer | 400, 640, 960 |
| studio-window | 4:5, the full width, from 17 % down (window, table, floor) | warmth +3.5 %, saturation 0.88, brightness 1.03 — the cool loft light sits with the ivory palette | 560, 960, 1440 |
| studio-table | 4:5, the full height, from 20 % in from the left (keeps an office chair and a cabinet out of frame) | saturation 0.90, brightness 1.02 | 480, 800, 1200 |
| studio-oils | 4:5, the full width, from 12 % down | warmth +3.5 %, saturation 0.90, brightness 1.03 | 400, 640, 960 |
| sample-hands | 4:5, 74 % of the width, from 26 % in and 26 % down — **the therapist's face is out of frame**, the guest is seen from behind | warmth +3 %, saturation 0.88, brightness 1.03 | 480, 800, 1200 |

AVIF quality 50, WebP quality 74, camera metadata removed. All six weigh about
1.1 MB together across every width; a visitor downloads one width of each. The
frames on the page keep a fixed `aspect-ratio` with `object-fit: cover`, so an
owner's replacement never breaks the layout. `src/content/photoVariants.ts`
maps each default `src` to its variants.

## Service photos

Service photos are the owner's, added per service in the dashboard (Services).
The site ships none and adds no placeholder or stock picture for a service
without one.
