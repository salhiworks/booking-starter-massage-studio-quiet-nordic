/**
 * This website's identity — the ONE place for its name, time zone and the
 * placeholder contact details shown in preview mode (`npm run dev` without
 * Supabase). Everything the owner manages (services, prices, hours, real
 * contact details, text and photos) lives in the dashboard at /admin/.
 */
export const SITE = {
  /** The business name. The dashboard's Business page overrides it once connected. */
  name: 'Quiet Room Massage',
  /** IANA time zone of the business. */
  timezone: 'America/Vancouver',
  /** Fictional contact details for preview mode only. */
  previewContact: {
    email: 'hello@quietroom.example',
    phone: '+1 604-555-0148',
    address: '2207 Alder Mews, Vancouver, BC V6J 0B8',
  },
};
