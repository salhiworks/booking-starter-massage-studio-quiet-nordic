import type { SiteValues } from '../lib/content';
import type { OpenStatus } from '../lib/hours';
import { Photo } from './Photo';

/** Keep in sync with the hero preload in index.html. */
export const HERO_SIZES = '(min-width: 960px) 45vw, 100vw';

export function Hero({ values, status }: { values: SiteValues; status: OpenStatus | null }) {
  const photo = values['hero.photo'];
  return (
    <section className={`hero ${photo ? '' : 'hero--text-only'}`} id="top" aria-labelledby="hero-title">
      <div className="hero__inner">
        <div className="hero__text">
          {values['hero.eyebrow'] && <p className="eyebrow hero__enter">{values['hero.eyebrow']}</p>}
          <h1 id="hero-title" className="hero__title hero__enter">
            {values['hero.title']}
          </h1>
          {values['hero.lede'] && <p className="hero__lede hero__enter">{values['hero.lede']}</p>}
          <div className="hero__actions hero__enter">
            <a className="button button--large" href="#book">
              {values['hero.cta']}
            </a>
            {status && (
              <p className="open-status" data-open={status.open}>
                <span className="open-status__dot" aria-hidden="true" />
                {status.text}
              </p>
            )}
          </div>
        </div>
        {photo && <Photo image={photo} sizes={HERO_SIZES} priority className="hero__photo" />}
      </div>
    </section>
  );
}
