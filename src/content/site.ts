import { defineSiteContent } from '@profitstudio/booking-engine';

/**
 * What the owner may change in the dashboard (Website). The defaults are the
 * website's own copy and photos: until the owner publishes, the page shows
 * exactly these. Services, prices, hours, the address, phone and email are NOT
 * here — they come from the engine.
 *
 * Never rename or reuse a field id once the site is live: the owner's text is
 * stored under it. Add a new id instead.
 *
 * This file is also imported by vite.config.ts (Node), so it imports nothing
 * local. Default photo `src` values are keys of src/content/photoVariants.ts.
 */
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
          help: 'Optional. A wide logo on a transparent or light background; it replaces the name mark.',
          default: null,
          aspectRatio: 4,
        },
        {
          type: 'color',
          id: 'brand.accent',
          label: 'Accent colour',
          help: 'Buttons, links and the booking calendar. It must stay readable on the oat background.',
          default: '#4a5d4c',
          contrastWith: '#f1eadf',
          minContrast: 4.5,
        },
        {
          type: 'choice',
          id: 'brand.headings',
          label: 'Heading style',
          default: 'light',
          options: [
            { value: 'light', label: 'Light serif', description: 'Airy and quiet — the original design.' },
            { value: 'book', label: 'Book serif', description: 'A little firmer, still classic.' },
            { value: 'sans', label: 'Quiet sans', description: 'Clean and modern.' },
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
      description: 'The first screen visitors see.',
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
          default: 'An unhurried hour in a quiet room.',
          maxLength: 70,
          required: true,
        },
        {
          type: 'longText',
          id: 'hero.lede',
          label: 'Introduction',
          default:
            'Massage for the tension of everyday life — or simply for an hour to yourself. Warm linen, soft light, and a therapist who listens before they begin.',
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
          label: 'Photo',
          help: 'A calm, light photo of the work or the room. It is cropped to a tall frame.',
          default: {
            src: '/photos/hero-hands-1024.webp',
            alt: "A therapist's hands working slowly over a guest's leg, beneath a soft white towel.",
            width: 1024,
            height: 1280,
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
      id: 'firstVisit',
      label: 'First visit',
      description: 'What to expect, and the questions first-time guests ask.',
      fields: [
        { type: 'text', id: 'firstVisit.title', label: 'Title', default: 'Your first visit', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'firstVisit.intro',
          label: 'Introduction',
          default:
            "New to massage, or coming back after a while? Here is how an hour with us usually goes — and you can change anything along the way.",
          maxLength: 320,
          rows: 3,
        },
        {
          type: 'image',
          id: 'firstVisit.photo',
          label: 'Photo of the room',
          default: {
            src: '/photos/room-window-960.webp',
            alt: 'A treatment table made up with pale linen beside a tall window, a folded oat-coloured towel at its foot.',
            width: 960,
            height: 1280,
          },
          aspectRatio: 3 / 4,
        },
        {
          type: 'list',
          id: 'firstVisit.steps',
          label: 'What to expect',
          itemLabel: 'Point',
          minItems: 1,
          maxItems: 6,
          fields: [
            { type: 'text', id: 'title', label: 'Title', default: '', maxLength: 48, required: true },
            { type: 'longText', id: 'text', label: 'Text', default: '', maxLength: 400, rows: 3 },
          ],
          default: [
            {
              title: 'Arriving',
              text: "Come five to ten minutes early to settle in. We'll offer you water and ask which areas you'd like us to focus on — or leave alone.",
            },
            {
              title: 'The room',
              text: 'A warm, softly lit room with a padded table, fresh linen and quiet music you can turn down or off. You undress to your comfort level, in private.',
            },
            {
              title: 'Comfort and pressure',
              text: "You stay covered by a sheet or towel the whole time; only the area being worked on is uncovered. Ask for more or less pressure whenever you like — it's your hour.",
            },
            {
              title: 'Privacy',
              text: 'The door stays closed, and what you tell us stays between you and your therapist. You can pause or stop at any point, no explanation needed.',
            },
          ],
        },
        { type: 'text', id: 'firstVisit.questionsTitle', label: 'Questions title', default: 'Questions', maxLength: 48, required: true },
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
          help: 'Shown with a “Sample photo” label until you replace it. A photo of the work or the room suits it best.',
          default: {
            src: '/photos/team-hands-800.webp',
            alt: 'Two hands working gently along a forearm.',
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
      description: 'The words around the booking flow. Times and availability come from the engine.',
      fields: [
        { type: 'text', id: 'book.title', label: 'Title', default: 'Book a session', maxLength: 48, required: true },
        {
          type: 'longText',
          id: 'book.intro',
          label: 'Introduction',
          default:
            "Choose a treatment, then a day and time that suit you. We'll email you a short code to confirm it's you — no account needed.",
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
        { type: 'text', id: 'visit.title', label: 'Title', default: 'Visit the studio', maxLength: 48, required: true },
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
