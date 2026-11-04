import type { DemoConfig } from './engine';
import { sitePreset } from '../lib/preset';

/**
 * The public Live Demo's sample studio (`npm run dev:demo` / `npm run build:demo`).
 * Only demo builds read this file. Customizing the real website? Leave src/demo/ alone.
 */
export const demoConfig: DemoConfig = {
  id: 'massage-studio-quiet-nordic',
  preset: sitePreset,
  business: {
    name: 'Quiet Room Massage',
    timezone: 'America/Vancouver',
    email: 'hello@quietroom.example',
    phone: '+1 604-555-0148',
    address: '2207 Alder Mews, Vancouver, BC V6J 0B8',
  },
  ownerEmail: 'owner@quietroom.example',
  referencePrefix: 'QR',
  sampleNotes: ['Lower back has been tight since a long flight.', 'Prefer medium pressure, no work on the feet.', '24 weeks pregnant — please use the side-lying position.'],
  // The site caches published content under this key (createSiteContentStore's default).
  resetKeys: ['pbe-site-content'],
  customers: [
    { name: 'Claire Dubois', email: 'claire.dubois@example.com', phone: '+1 604 555 0112' },
    { name: 'Ethan Moore', email: 'ethan.moore@example.com', phone: '+1 604 555 0125' },
    { name: 'Mei Lin', email: 'mei.lin@example.com', phone: '+1 604 555 0134' },
    { name: 'Rosa Alvarez', email: 'rosa.alvarez@example.com', phone: '+1 604 555 0141' },
    { name: 'Noah Fraser', email: 'noah.fraser@example.com', phone: '+1 604 555 0157' },
    { name: 'Ingrid Solberg', email: 'ingrid.s@example.com', phone: '+1 604 555 0163' },
    { name: 'Daniel Kim', email: 'daniel.kim@example.com', phone: '+1 604 555 0178' },
    { name: 'Amara Okeke', email: 'amara.okeke@example.com', phone: '+1 604 555 0186' },
    { name: 'Lucas Martin', email: 'lucas.martin@example.com', phone: '+1 604 555 0194' },
    { name: 'Hana Sato', email: 'hana.sato@example.com', phone: '+1 604 555 0109' },
  ],
};
