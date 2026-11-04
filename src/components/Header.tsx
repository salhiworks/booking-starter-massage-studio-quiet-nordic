import type { SiteValues } from '../lib/content';
import { Wordmark } from './Wordmark';

export function Header({ values }: { values: SiteValues }) {
  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <a className="site-header__home" href="#top">
          <Wordmark values={values} />
        </a>
        <nav className="site-nav" aria-label="Sections">
          <a href="#treatments">Treatments</a>
          <a href="#first-visit">First visit</a>
          <a href="#therapists">Therapists</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="button button--small" href="#book">
          Book
        </a>
      </div>
    </header>
  );
}
