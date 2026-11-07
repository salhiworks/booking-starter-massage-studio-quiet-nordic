import { useState } from 'react';
import type { Business, Service } from '@profitstudio/booking-engine';
import type { StartBooking } from '../App';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, groupTreatments, priceLabel } from '../lib/services';
import { Emphasis } from './Emphasis';
import { Notice } from './Notice';

interface TreatmentsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: StartBooking;
}

export function Treatments({ values, services, business, onRetry, onBook }: TreatmentsProps) {
  const [length, setLength] = useState<number | null>(null);
  const ready = services.status === 'ready' ? services.data : [];
  const lengths = [...new Set(ready.map((s) => s.durationMinutes))].sort((a, b) => a - b);
  const filterable = lengths.length > 1 && ready.length > 2;
  const active = length !== null && lengths.includes(length) ? length : null;
  const shown = active === null ? ready.length : ready.filter((s) => s.durationMinutes === active).length;

  return (
    <section id="treatments" className="section treatments" aria-labelledby="treatments-title">
      <div className="page treatments__grid">
        <header className="section-head treatments__head">
          <p className="eyebrow">The menu</p>
          <h2 id="treatments-title">
            <Emphasis text={values['treatments.title']} />
          </h2>
          {values['treatments.intro'] && <p className="section-intro">{values['treatments.intro']}</p>}
          {filterable && (
            <div className="lengths-filter">
              <p className="lengths-filter__label" id="lengths-label">
                How long do you have?
              </p>
              <div className="lengths-filter__chips" role="group" aria-labelledby="lengths-label">
                <button type="button" className="chip" aria-pressed={active === null} onClick={() => setLength(null)}>
                  Any length
                </button>
                {lengths.map((minutes) => (
                  <button type="button" className="chip" key={minutes} aria-pressed={active === minutes} onClick={() => setLength(minutes)}>
                    {durationLabel(minutes)}
                  </button>
                ))}
              </div>
              <p className="sr-only" role="status">
                {active === null ? `All ${ready.length} sessions shown.` : `${shown} ${shown === 1 ? 'session' : 'sessions'} of ${durationLabel(active)} shown.`}
              </p>
            </div>
          )}
        </header>
        <TreatmentList services={services} business={business} onRetry={onRetry} onBook={onBook} length={active} />
      </div>
    </section>
  );
}

function TreatmentList({ services, business, onRetry, onBook, length }: Omit<TreatmentsProps, 'values'> & { length: number | null }) {
  if (services.status === 'loading') {
    return (
      <div className="menu menu--loading" aria-busy="true">
        <p className="sr-only" role="status">
          Loading treatments…
        </p>
        {[0, 1, 2].map((i) => (
          <div className="menu__group" key={i} aria-hidden="true">
            <span className="skeleton skeleton--title" />
            <span className="skeleton skeleton--row" />
            <span className="skeleton skeleton--row" />
          </div>
        ))}
      </div>
    );
  }

  if (services.status === 'error') {
    if (services.error.code === 'NOT_CONFIGURED') {
      return <p className="quiet-state">Our treatments and prices will be listed here soon.</p>;
    }
    return (
      <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
        <p>We couldn't load the treatments just now.</p>
      </Notice>
    );
  }

  const groups = groupTreatments(services.data);
  if (groups.length === 0) return <p className="quiet-state">Our treatments and prices will be listed here soon.</p>;

  const locale = business?.locale ?? 'en-CA';
  const currency = services.data[0]?.currency;

  return (
    <div className="menu">
      <ol className="menu__list" role="list">
        {groups.map((group, index) => {
          const rows = length === null ? group.services : group.services.filter((s) => s.durationMinutes === length);
          if (rows.length === 0) return null;
          return (
            <li className={`menu__group ${group.images.length ? 'menu__group--photo' : ''}`} key={group.key}>
              <div className="menu__name">
                <span className="menu__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{group.title}</h3>
                {group.services.length > 1 && (
                  <p className="menu__range">
                    {group.services.map((s) => durationLabel(s.durationMinutes)).join(' · ')}
                  </p>
                )}
                {group.images.length > 0 && (
                  <div className="menu__prints">
                    {group.images.map((image) => (
                      <div className="frame frame--print" key={image.url}>
                        <img src={image.url} alt={image.alt} width={image.width ?? 1200} height={image.height ?? 800} loading="lazy" decoding="async" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <ul className="menu__lengths" role="list">
                {rows.map((service) => (
                  <li className="menu__row" key={service.id}>
                    <span className="menu__duration">{durationLabel(service.durationMinutes)}</span>
                    {service.description && <p className="menu__desc">{service.description}</p>}
                    <span className="menu__price">{priceLabel(service, locale)}</span>
                    <button type="button" className="menu__book" onClick={() => onBook(service.id)}>
                      Book<span className="sr-only"> {service.name}</span>
                      <span className="menu__arrow" aria-hidden="true">
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>
      {currency && (
        <p className="menu__note">
          Prices in {currency}, per session. Each length is booked as its own session; the first few minutes are always a conversation.
        </p>
      )}
    </div>
  );
}
