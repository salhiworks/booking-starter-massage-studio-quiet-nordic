import type { Business } from '@profitstudio/booking-engine';
import type { SiteValues } from '../lib/content';
import { Wordmark } from './Wordmark';

const YEAR = new Date().getFullYear();

export function Footer({ values, business }: { values: SiteValues; business: Business | null }) {
  return (
    <footer className="site-footer">
      <div className="page site-footer__inner">
        <div className="site-footer__brand">
          <Wordmark values={values} className="wordmark--footer" />
          {values['footer.tagline'] && <p>{values['footer.tagline']}</p>}
        </div>
        <div className="site-footer__meta">
          <p className="site-footer__legal">
            © {YEAR} {business?.name ?? values['brand.wordmark']}
          </p>
          <a className="site-footer__staff" href="/admin/">
            Staff login
          </a>
        </div>
      </div>
    </footer>
  );
}
