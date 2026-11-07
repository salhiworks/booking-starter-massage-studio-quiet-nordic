import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, hours, the address, phone and email are NOT
 * here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead. (A field may move to another section
 * of the editor — `firstVisit.photo` now sits under "The studio" — because the
 * id, not the section, is what is stored.)
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
const ITALIC_HELP = 'Wrap a few words in *asterisks* to set them in italic.';

export const siteContent = defineSiteContent({
  sections: [
    {
      id: 'brand',
      label: 'Brand',
      description: 'Your name mark or logo, the accent colour and the heading style.',
      fields: [
        {
          type: 'text',
          id: 'brand.wordmark',
          label: 'Name mark',
          help: 'The short name at the top and bottom of the page when no logo is set.',
          default: 'Quiet Room',
          maxLength: 32,
          required: true,
        },
        {
          type: 'image',
          id: 'brand.logo',
          label: 'Logo',
          help: 'Optional. A wide logo on a transparent or light background; it replaces the name mark in the header. The footer, on deep green, keeps the name mark.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'Buttons, links, the treatment filter and the booking calendar. A deep, quiet colour suits the design best; it must stay readable on the warm stone background.',
          default: '#405846',
          contrastWith: '#ece5d9',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'light',
          options: [
            { value: 'light', label: 'Light serif', description: 'Newsreader, airy and editorial — the original design.' },
            { value: 'book', label: 'Book serif', description: 'Newsreader, a little firmer.' },
            { value: 'sans', label: 'Nordic sans', description: 'Albert Sans, clean and modern.' },
          ],
        },
      ],
    },
    {
      id: 'seo',
      label: 'Search & sharing',
      description: 'Search engines and link previews show new text after the website is next deployed.',
      fields: [
        {
          type: 'text',
          id: 'seo.title',
          label: 'Page title',
          help: 'Search engines and link previews show new text after the website is next deployed.',
          default: 'Quiet Room Massage — massage & wellness in Vancouver',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'seo.description',
          label: 'Page description',
          help: 'One or two sentences for search results. Updated after the next deploy.',
          default:
            'Unhurried massage in a calm, softly lit room in Vancouver, BC. See treatments and prices, and book your session online in a few calm steps.',
          maxLength: 180,
          rows: 3,
          required: true,
        },
      ],
    },
    {
      id: 'hero',
      label: 'Welcome',
      description: 'The first screen visitors see: the headline, the button and two photos.',
      fields: [
        {
          type: 'text',
          id: 'hero.eyebrow',
          label: 'Small line above the headline',
          default: 'Massage & wellness studio · Vancouver',
          maxLength: 60,
        },
        {
          type: 'text',
          id: 'hero.title',
          label: 'Headline',
          help: ITALIC_HELP,
          default: 'An unhurried hour in a *quiet room.*',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Massage for the tension of everyday life — or simply for an hour to yourself. Warm linen, soft light and a therapist who listens before they begin.',
          maxLength: 280,
          rows: 3,
        },
        {
          type: 'text',
          id: 'hero.cta',
          label: 'Button',
          default: 'Book a session',
          maxLength: 28,
          required: true,
        },
        {
          type: 'image',
          id: 'hero.photo',
          label: 'Main photo',
          help: 'A calm, light photo of the work or the room, in landscape. Shown wide (about 4:3), so keep the subject near the centre.',
          default: {
            src: '/photos/hero-facial-1200.webp',
            alt: 'A therapist gently massaging the face of a guest who rests under a white sheet, in a softly lit treatment room.',
            width: 1200,
            height: 900,
          },
          aspectRatio: 4 / 3,
        },
        {
          type: 'image',
          id: 'hero.detail',
          label: 'Small photo',
          help: 'Optional. A quiet detail — linen, wood, a cup of tea — laid over the corner of the main photo. Remove it for a single photo.',
          default: {
            src: '/photos/linen-hooks-640.webp',
            alt: 'Two linen hand towels and wooden body brushes hanging from a pale oak peg rail.',
            width: 640,
            height: 800,
          },
          aspectRatio: 4 / 5,
        },
      ],
    },
    {
      id: 'treatments',
      label: 'Treatments',
      description: 'Treatments, lengths, prices and service photos come from Services in this dashboard.',
      fields: [
        { type: 'text', id: 'treatments.title', label: 'Title', default: 'Treatments', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'treatments.intro',
          label: 'Introduction',
          default:
            "Every session begins with a short conversation about pressure and the areas you'd like us to focus on. Choose the length that suits your day — each one is unhurried.",
          maxLength: 320,
          rows: 3,
        },
      ],
    },
    {
      id: 'studio',
      label: 'The studio',
      description: 'The room and what it feels like to be there: one large photo, two small ones and a few plain facts.',
      fields: [
        { type: 'text', id: 'studio.title', label: 'Title', help: ITALIC_HELP, default: 'A room made for *slowing down.*', maxLength: 60, required: true },
        {
          type: 'longText',
          id: 'studio.text',
          label: 'Text',
          default:
            'A small studio on the second floor of an old brick building, with tall windows and soft north light. Tables are warmed before you arrive, linen is fresh for every guest, and the music stays low enough to forget.',
          maxLength: 480,
          rows: 4,
        },
        {
          type: 'image',
          id: 'firstVisit.photo',
          label: 'Photo of the room',
          help: 'A wide view of the room, ideally in daylight. Cropped to a tall frame.',
          default: {
            src: '/photos/studio-window-960.webp',
            alt: 'A treatment table made up with pale linen beside a tall loft window, a folded oat-coloured blanket at its foot.',
            width: 960,
            height: 1200,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'image',
          id: 'studio.detailOne',
          label: 'First detail photo',
          help: 'Optional. A close-up: the table, a towel, a candle.',
          default: {
            src: '/photos/studio-table-800.webp',
            alt: 'A rolled white towel and a small candle on a wooden tray, on a treatment table made up with soft fleece.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'studio.detailOneCaption',
          label: 'First detail caption',
          default: 'Warm tables and fresh linen for every guest.',
          maxLength: 90,
        },
        {
          type: 'image',
          id: 'studio.detailTwo',
          label: 'Second detail photo',
          help: 'Optional. Another close-up: oils, tools, tea.',
          default: {
            src: '/photos/studio-oils-640.webp',
            alt: 'Two amber bottles of massage oil and a pale wooden hand tool resting on white cotton.',
            width: 640,
            height: 800,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'text',
          id: 'studio.detailTwoCaption',
          label: 'Second detail caption',
          default: 'Unscented oil as standard — ask for lavender or eucalyptus.',
          maxLength: 90,
        },
        {
          type: 'list',
          id: 'studio.points',
          label: 'Plain facts',
          itemLabel: 'Fact',
          maxItems: 6,
          fields: [{ type: 'text', id: 'text', label: 'Fact', default: '', maxLength: 60, required: true }],
          default: [
            { text: 'Heated tables, all year' },
            { text: 'Fresh linen for every guest' },
            { text: 'Light you can dim' },
            { text: 'Music optional — or none at all' },
          ],
        },
      ],
    },
    {
      id: 'firstVisit',
      label: 'The ritual & questions',
      description: 'How a visit unfolds, from arriving to resting afterwards — and the questions first-time guests ask.',
      fields: [
        { type: 'text', id: 'firstVisit.title', label: 'Title', help: ITALIC_HELP, default: 'The *ritual*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'firstVisit.intro',
          label: 'Introduction',
          default:
            'From the moment you arrive to the cup of tea afterwards, an hour with us follows the same calm rhythm — and you can change anything along the way.',
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'list',
          id: 'firstVisit.steps',
          label: 'Moments of a visit',
          itemLabel: 'Moment',
          minItems: 1,
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 48, required: true },
            { type: 'text', id: 'when', label: 'When or how long (optional)', default: '', maxLength: 40 },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 400, rows: 3 },
          ],
          default: [
            {
              title: 'Arrive',
              when: 'Ten minutes before',
              text: "Leave your shoes and the day at the door. We'll bring you water or tea and a quiet place to sit.",
            },
            {
              title: 'Talk',
              when: 'A few minutes',
              text: "Tell us how you'd like to feel afterwards, which areas to focus on and which to leave alone. Pressure is always yours to change.",
            },
            {
              title: 'Treatment',
              when: '45 to 90 minutes',
              text: 'A warm table, fresh linen and soft light. You stay covered throughout; only the area being worked on is uncovered.',
            },
            {
              title: 'Rest',
              when: 'As long as you need',
              text: 'No rush to get up. Sit with a cup of tea before you step back outside.',
            },
          ],
        },
        { type: 'text', id: 'firstVisit.questionsTitle', label: 'Questions title', default: 'Questions, answered', maxLength: 48, required: true },
        {
          type: 'list',
          id: 'firstVisit.questions',
          label: 'Questions',
          itemLabel: 'Question',
          maxItems: 10,
          fields: [
            { type: 'text', id: 'question', label: 'Question', default: '', maxLength: 120, required: true },
            { type: 'longText', id: 'answer', label: 'Answer', default: '', maxLength: 600, rows: 4 },
          ],
          default: [
            {
              question: 'What should I wear?',
              answer:
                "Whatever is comfortable to arrive in. For most treatments you undress to your comfort level — many guests keep their underwear on — and you're covered by a sheet throughout. For reflexology you only take off your shoes and socks.",
            },
            {
              question: 'How early should I arrive?',
              answer:
                "Five to ten minutes before your session is perfect. If you're running late we'll still look after you, but the session ends at the booked time so the next guest isn't kept waiting.",
            },
            {
              question: 'Is it private?',
              answer:
                'The door stays closed, and what you tell us stays between you and your therapist. You can pause or stop at any point, no explanation needed.',
            },
            {
              question: 'What if I need to cancel?',
              answer:
                'Plans change. Please let us know at least 24 hours ahead by phone or email, so we can offer the time to another guest.',
            },
          ],
        },
      ],
    },
    {
      id: 'team',
      label: 'Therapists',
      description: 'The people guests will meet. The sample profiles are placeholders — replace them with your own.',
      fields: [
        { type: 'text', id: 'team.title', label: 'Title', default: 'The therapists', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'team.intro',
          label: 'Introduction',
          default: 'A small team who take time to listen first, and who work at your pace.',
          maxLength: 280,
          rows: 2,
        },
        {
          type: 'image',
          id: 'team.photo',
          label: 'Section photo',
          help: 'Shown with a “Sample photo” label until you replace it. A photo of your own hands at work, or of the room, suits it best — never someone who does not work with you.',
          default: {
            src: '/photos/sample-hands-800.webp',
            alt: 'Hands warming massage oil above a guest resting on a treatment table, beside a tall window.',
            width: 800,
            height: 1000,
          },
          aspectRatio: 4 / 5,
        },
        {
          type: 'list',
          id: 'team.members',
          label: 'Therapists',
          itemLabel: 'Therapist',
          maxItems: 8,
          fields: [
            { type: 'text', id: 'name', label: 'Name', default: '', maxLength: 60, required: true },
            { type: 'text', id: 'focus', label: 'Focus', default: '', maxLength: 80 },
            { type: 'longText', id: 'bio', label: 'Short bio', default: '', maxLength: 400, rows: 3 },
            { type: 'image', id: 'photo', label: 'Portrait (optional)', default: null, aspectRatio: 1 },
          ],
          default: [
            {
              name: 'Maren H.',
              focus: 'Swedish & hot stone',
              bio: "Maren likes a slow start: a few minutes to talk about how you'd like to feel afterwards, then long, steady strokes.",
            },
            {
              name: 'Jonah W.',
              focus: 'Deep tissue',
              bio: 'Firm but never rushed. Jonah checks in on pressure without breaking the quiet, and remembers what you told him last time.',
            },
            {
              name: 'Priya S.',
              focus: 'Pregnancy massage & reflexology',
              bio: 'Gentle and practical, with plenty of pillows for side-lying comfort. Guests often drift off in her reflexology sessions.',
            },
          ],
        },
      ],
    },
    {
      id: 'book',
      label: 'Booking',
      description: 'The words around the booking. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', help: ITALIC_HELP, default: 'Book a *session*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default: 'Choose a treatment, then a day and time that suit you. No account needed — it takes about a minute.',
          maxLength: 280,
          rows: 2,
        },
      ],
    },
    {
      id: 'visit',
      label: 'Visit',
      description: 'Opening hours, the address, phone and email come from your business settings and opening hours.',
      fields: [
        { type: 'text', id: 'visit.title', label: 'Title', help: ITALIC_HELP, default: 'Visit the *studio*', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'visit.note',
          label: 'Getting here',
          default:
            "Ring the bell at the street door and we'll come down to meet you. Street parking nearby is metered, and there's a bike rack just outside. If you need step-free access, tell us when you book and we'll have everything ready.",
          maxLength: 500,
          rows: 4,
        },
      ],
    },
    {
      id: 'footer',
      label: 'Footer',
      fields: [
        {
          type: 'text',
          id: 'footer.tagline',
          label: 'Footer line',
          default: 'Massage & wellness in Vancouver, British Columbia.',
          maxLength: 100,
        },
      ],
    },
  ],
});
