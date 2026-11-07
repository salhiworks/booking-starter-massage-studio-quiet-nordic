import { formatMoney } from '@profitstudio/booking-engine';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import type { Resource } from '../lib/resource';
import { Emphasis } from './Emphasis';
import { bookLink } from '../lib/bookLink';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 56vw, 100vw';

interface HeroProps {
  values: SiteValues;
  status: OpenStatus | null;
  services: Resource<Service[]>;
  business: Business | null;
  onBook: StartBooking;
}

/** Plain facts from the engine: session lengths and the lowest price. Nothing is invented. */
function serviceFacts(services: Resource<Service[]>, business: Business | null) {
  if (services.status !== 'ready' || services.data.length === 0) return null;
  const lengths = services.data.map((s) => s.durationMinutes);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  const priced = services.data.filter((s) => s.priceCents !== null);
  const cheapest = priced.length ? priced.reduce((a, b) => ((a.priceCents ?? 0) <= (b.priceCents ?? 0) ? a : b)) : null;
  return {
    lengths: min === max ? `${min} min` : `${min}–${max} min`,
    from: cheapest ? formatMoney(cheapest.priceCents ?? 0, cheapest.currency, business?.locale ?? 'en-CA') : null,
  };
}

export function Hero({ values, status, services, business, onBook }: HeroProps) {
  const photo = values['hero.photo'];
  const detail = values['hero.detail'];
  const facts = serviceFacts(services, business);
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            <Emphasis text={values['hero.title']} />
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book" onClick={bookLink(onBook)}>
              {values['hero.cta']}
            </a>
            <a className="quiet-link" href="#treatments">
              Treatments &amp; prices
            </a>
          </div>
        </div>
        {photo && (
          <div className={`hero__media ${detail ? 'hero__media--pair' : ''}`}>
            <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />
            {detail && <Photo image={detail} sizes="(min-width: 960px) 12vw, 30vw" className="hero__detail" />}
          </div>
        )}
        {(facts || status) && (
          <dl className="hero__facts">
            {facts && (
              <div>
                <dt>Sessions</dt>
                <dd>{facts.lengths}</dd>
              </div>
            )}
            {facts?.from && (
              <div>
                <dt>From</dt>
                <dd>{facts.from}</dd>
              </div>
            )}
            {status && (
              <div className="hero__fact-status">
                <dt>Today</dt>
                <dd className="open-status" data-open={status.open}>
                  <span className="open-status__dot" aria-hidden="true" />
                  {status.text}
                </dd>
              </div>
            )}
          </dl>
        )}
      </div>
    </section>
  );
}
