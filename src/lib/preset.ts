import type { Preset } from '@profitstudio/booking-engine';

/**
 * Quiet Room Massage's own preset (INTEGRATION.md §5): the sample services,
 * hours and policies preview mode shows, and the starter set the dashboard
 * offers an owner who has no services yet (<BookingAdmin presets>).
 * Prices are in Canadian dollars, in cents.
 */
export const sitePreset = {
  id: 'massage-studio',
  label: 'Massage & Wellness Studio',
  terminology: { customer: 'guest', customers: 'guests', booking: 'session', bookings: 'sessions' },
  previewBusiness: {
    name: 'Sample Massage Studio',
    currency: 'CAD',
    locale: 'en-CA',
    contact: {
      email: 'hello@example.com',
      phone: '+1 604-555-0100',
      address: '100 Example Street, Vancouver, BC',
    },
  },
  policies: {
    slotIntervalMinutes: 15,
    minNoticeMinutes: 240,
    maxAdvanceDays: 60,
    autoConfirm: false,
    requirePhone: true,
    pendingHoldMinutes: 1440,
    verificationWindowMinutes: 15,
  },
  workingHours: [
    { weekday: 1, start: '10:00', end: '20:00' },
    { weekday: 2, start: '10:00', end: '20:00' },
    { weekday: 3, start: '10:00', end: '20:00' },
    { weekday: 4, start: '10:00', end: '20:00' },
    { weekday: 5, start: '10:00', end: '20:00' },
    { weekday: 6, start: '09:00', end: '17:00' },
    { weekday: 7, start: '10:00', end: '16:00' },
  ],
  services: [
    {
      name: 'Swedish Massage — 60 min',
      description: 'Long, flowing strokes to ease tension and settle the mind.',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 12500,
    },
    {
      name: 'Swedish Massage — 90 min',
      description: 'The full-body Swedish session with time for slower, deeper work.',
      durationMinutes: 90,
      bufferAfterMinutes: 15,
      priceCents: 17500,
    },
    {
      name: 'Deep Tissue — 60 min',
      description: 'Firm, focused pressure for tight shoulders, back and legs.',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 14000,
    },
    {
      name: 'Deep Tissue — 90 min',
      description: 'Unhurried deep work on the areas you choose.',
      durationMinutes: 90,
      bufferAfterMinutes: 15,
      priceCents: 19500,
    },
    {
      name: 'Hot Stone — 75 min',
      description: 'Warm basalt stones and long strokes to release and soften.',
      durationMinutes: 75,
      bufferAfterMinutes: 20,
      priceCents: 16500,
    },
    {
      name: 'Pregnancy Massage — 60 min',
      description: 'Side-lying comfort and gentle pressure, from the second trimester.',
      durationMinutes: 60,
      bufferAfterMinutes: 15,
      priceCents: 13000,
    },
    {
      name: 'Reflexology — 45 min',
      description: 'Pressure-point work on the feet in a reclined chair.',
      durationMinutes: 45,
      bufferAfterMinutes: 15,
      priceCents: 9500,
    },
  ],
} satisfies Preset;
