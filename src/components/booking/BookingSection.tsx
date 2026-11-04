import type { Business, Service } from '@profitstudio/booking-engine';
import { useEffect, useRef } from 'react';
import type { SiteValues } from '../../lib/content';
import type { Resource } from '../../lib/resource';
import { engine } from '../../lib/engine';
import { Notice } from '../Notice';
import { BookingFlow } from './BookingFlow';
import type { BookingIntent } from './BookingFlow';
import { ContactInstead } from './ContactInstead';

interface BookingSectionProps {
  values: SiteValues;
  business: Resource<Business>;
  services: Resource<Service[]>;
  intent: BookingIntent | null;
  onRetry: () => void;
  onServicesStale: () => void;
}

export function BookingSection({ values, business, services, intent, onRetry, onServicesStale }: BookingSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const flowShown =
    business.status === 'ready' &&
    business.data.policies.onlineBookingEnabled &&
    services.status === 'ready' &&
    services.data.length > 0;

  // A treatment's "Book" button: the flow brings itself into view; while it is
  // not shown (loading, paused, nothing to book, a problem), show this section
  // and its message instead of doing nothing.
  const handledNonce = useRef(intent?.nonce ?? 0);
  useEffect(() => {
    if (!intent || intent.nonce === handledNonce.current) return;
    handledNonce.current = intent.nonce;
    if (flowShown) return;
    const heading = sectionRef.current?.querySelector<HTMLElement>('#book-title');
    if (heading && !heading.hasAttribute('tabindex')) heading.tabIndex = -1;
    const target = heading ?? sectionRef.current;
    target?.focus({ preventScroll: true });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target?.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  }, [intent, flowShown]);

  return (
    <section id="book" className="section book" aria-labelledby="book-title" ref={sectionRef}>
      <div className="page">
        <header className="section-head">
          <h2 id="book-title">{values['book.title']}</h2>
          {values['book.intro'] && <p className="section-intro">{values['book.intro']}</p>}
        </header>
        <div className="desk">
          <BookingBody business={business} services={services} intent={intent} onRetry={onRetry} onServicesStale={onServicesStale} />
        </div>
      </div>
    </section>
  );
}

function BookingBody({ business, services, intent, onRetry, onServicesStale }: Omit<BookingSectionProps, 'values'>) {
  const notConfigured =
    engine.mode === 'unconfigured' ||
    (business.status === 'error' && business.error.code === 'NOT_CONFIGURED') ||
    (services.status === 'error' && services.error.code === 'NOT_CONFIGURED');
  if (notConfigured) {
    return (
      <ContactInstead
        business={business.status === 'ready' ? business.data : null}
        title="Online booking is not available yet"
        text="We're setting up online booking. In the meantime, please call or email the studio to book a session."
      />
    );
  }

  if (business.status === 'loading' || services.status === 'loading') {
    return (
      <div className="flow flow--loading" aria-busy="true">
        <p className="sr-only" role="status">
          Loading the booking calendar…
        </p>
        <span className="skeleton skeleton--steps" aria-hidden="true" />
        <span className="skeleton skeleton--block" aria-hidden="true" />
      </div>
    );
  }

  const failed = business.status === 'error' ? business.error : services.status === 'error' ? services.error : null;
  if (failed) {
    if (failed.code === 'SCHEMA_MISSING' || failed.code === 'SCHEMA_INCOMPATIBLE') {
      return (
        <ContactInstead
          business={business.status === 'ready' ? business.data : null}
          title="Online booking is temporarily unavailable"
          text="Please call or email the studio and we'll find you a time."
        />
      );
    }
    return (
      <Notice tone="error" action={{ label: 'Try again', onClick: onRetry }}>
        <p>{failed.code === 'NETWORK' ? "We couldn't reach the booking system. Please check your connection." : "We couldn't load the booking calendar just now."}</p>
      </Notice>
    );
  }

  if (business.status !== 'ready' || services.status !== 'ready') return null;

  if (!business.data.policies.onlineBookingEnabled) {
    return (
      <ContactInstead
        business={business.data}
        title="Book by phone or email for now"
        text="Online booking is switched off at the moment. Call or email the studio and we'll find you a time."
      />
    );
  }

  if (services.data.length === 0) {
    return (
      <ContactInstead
        business={business.data}
        title="Online booking opens soon"
        text="Our treatments aren't listed online yet. Call or email the studio and we'll find you a time."
      />
    );
  }

  return <BookingFlow business={business.data} services={services.data} intent={intent} onServicesStale={onServicesStale} />;
}
