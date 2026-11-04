import { formatMoney } from '@profitstudio/booking-engine';
import type { Service, ServiceImage } from '@profitstudio/booking-engine';

/** A treatment and its lengths. Each length is its own engine service. */
export interface TreatmentGroup {
  key: string;
  title: string;
  services: Service[];
  /** The distinct photos the owner added to this treatment's services (often none). */
  images: ServiceImage[];
}

// "Swedish Massage — 60 min" → "Swedish Massage". Only used to put lengths of the
// same treatment together; a name without the suffix simply stands on its own.
const LENGTH_SUFFIX = /\s+[—–-]\s+\d{1,3}\s*(?:min|mins|minutes)\.?$/i;

export function treatmentTitle(service: Service): string {
  return service.name.replace(LENGTH_SUFFIX, '').trim() || service.name;
}

/** Groups services by treatment, keeping the owner's display order. */
export function groupTreatments(services: readonly Service[]): TreatmentGroup[] {
  const groups = new Map<string, TreatmentGroup>();
  for (const service of services) {
    const title = treatmentTitle(service);
    const key = title.toLocaleLowerCase();
    let group = groups.get(key);
    if (!group) {
      group = { key, title, services: [], images: [] };
      groups.set(key, group);
    }
    group.services.push(service);
    const image = service.image;
    if (image && !group.images.some((known) => known.url === image.url)) group.images.push(image);
  }
  return [...groups.values()];
}

export function durationLabel(minutes: number): string {
  return `${minutes} min`;
}

export function priceLabel(service: Pick<Service, 'priceCents' | 'priceFrom' | 'currency'>, locale: string): string {
  if (service.priceCents === null) return 'Price on request';
  const amount = formatMoney(service.priceCents, service.currency, locale);
  return service.priceFrom ? `from ${amount}` : amount;
}
