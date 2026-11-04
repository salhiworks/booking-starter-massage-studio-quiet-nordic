import { useCallback, useState } from 'react';
import { Banners } from './components/BannerStack';
import { FirstVisit } from './components/FirstVisit';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Therapists } from './components/Therapists';
import { Treatments } from './components/Treatments';
import { Visit } from './components/Visit';
import { BookingSection } from './components/booking/BookingSection';
import type { BookingIntent } from './components/booking/BookingFlow';
import { useSiteContent } from './lib/content';
import { engine } from './lib/engine';
import { useEngineResource } from './lib/resource';
import { useOpening } from './lib/useOpening';

// Module-level so the resource hooks get stable loaders.
const loadBusiness = () => engine.getBusiness();
const loadServices = () => engine.listServices();

export function App() {
  const content = useSiteContent();
  const values = content.values;
  const [business, reloadBusiness] = useEngineResource(loadBusiness);
  const [services, reloadServices] = useEngineResource(loadServices);
  const opening = useOpening(business.status === 'ready' ? business.data : null);
  const [intent, setIntent] = useState<BookingIntent | null>(null);

  const book = useCallback((serviceId: string) => setIntent({ serviceId, nonce: Date.now() }), []);
  const retryBooking = useCallback(() => {
    reloadBusiness();
    reloadServices();
  }, [reloadBusiness, reloadServices]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Banners content={content} preview={engine.mode === 'preview'} />
      <Header values={values} />
      <main id="main" tabIndex={-1}>
        <Hero values={values} status={opening.status} />
        <Treatments
          values={values}
          services={services}
          business={business.status === 'ready' ? business.data : null}
          onRetry={reloadServices}
          onBook={book}
        />
        <FirstVisit values={values} />
        <Therapists values={values} ownerFields={content.ownerFields} />
        <BookingSection
          values={values}
          business={business}
          services={services}
          intent={intent}
          onRetry={retryBooking}
          onServicesStale={reloadServices}
        />
        <Visit values={values} business={business} opening={opening} onRetry={reloadBusiness} />
      </main>
      <Footer values={values} business={business.status === 'ready' ? business.data : null} />
    </>
  );
}
