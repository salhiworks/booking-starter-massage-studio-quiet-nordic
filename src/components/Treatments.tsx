import type { Business, Service } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import type { Resource } from '../lib/resource';
import { durationLabel, groupTreatments, priceLabel } from '../lib/services';
import { Notice } from './Notice';

interface TreatmentsProps {
  values: SiteValues;
  services: Resource<Service[]>;
  business: Business | null;
  onRetry: () => void;
  onBook: (serviceId: string) => void;
}

export function Treatments({ values, services, business, onRetry, onBook }: TreatmentsProps) {
  return (
    <section id="treatments" className="section treatments" aria-labelledby="treatments-title">
      <div className="page">
        <header className="section-head">
          <h2 id="treatments-title">{values['treatments.title']}</h2>
          {values['treatments.intro'] && <p className="section-intro">{values['treatments.intro']}</p>}
        </header>
        <TreatmentList services={services} business={business} onRetry={onRetry} onBook={onBook} />
      </div>
    </section>
  );
}

function TreatmentList({ services, business, onRetry, onBook }: Omit<TreatmentsProps, 'values'>) {
  if (services.status === 'loading') {
    return (
      <div className="ledger ledger--loading" aria-busy="true">
        <p className="sr-only" role="status">
          Loading treatments…
        </p>
        {[0, 1, 2].map((i) => (
          <div className="ledger__group" key={i} aria-hidden="true">
            <span className="skeleton skeleton--title" />
            <div className="ledger__lengths">
              <span className="skeleton skeleton--row" />
              <span className="skeleton skeleton--row" />
            </div>
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

  const locale = business?.locale;
  const currency = services.data[0]?.currency;

  return (
    <>
      <ul className="ledger" role="list">
        {groups.map((group) => (
          <li className={`ledger__group ${group.images.length ? 'ledger__group--photo' : ''}`} key={group.key}>
            <div className="ledger__name">
              <h3>{group.title}</h3>
              {group.images.length > 0 && (
                <div className="ledger__prints">
                  {group.images.map((image) => (
                    <div className="frame frame--print" key={image.url}>
                      <img
                        src={image.url}
                        alt={image.alt}
                        width={image.width ?? 1200}
                        height={image.height ?? 800}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <ul className="ledger__lengths" role="list">
              {group.services.map((service) => (
                <li className="ledger__row" key={service.id}>
                  <span className="ledger__duration">{durationLabel(service.durationMinutes)}</span>
                  {service.description && <p className="ledger__desc">{service.description}</p>}
                  <span className="ledger__price">{priceLabel(service, locale ?? 'en-CA')}</span>
                  <button type="button" className="link-button ledger__book" onClick={() => onBook(service.id)}>
                    Book<span className="sr-only"> {service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {currency && <p className="ledger__note">Prices in {currency}. Each length is booked as its own session.</p>}
    </>
  );
}
