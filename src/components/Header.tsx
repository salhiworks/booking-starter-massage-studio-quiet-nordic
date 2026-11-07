import type { StartBooking } from '../App';
import { bookLink } from '../lib/bookLink';
import type { SiteValues } from '../lib/content';
import { Wordmark } from './Wordmark';

export function Header({ values, onBook }: { values: SiteValues; onBook: StartBooking }) {
  return (
    <header className="site-header">
      <div className="page site-header__inner">
        <a className="site-header__home" href="#top">
          <Wordmark values={values} />
        </a>
        <nav className="site-nav" aria-label="Sections">
          <a href="#treatments">Treatments</a>
          <a href="#studio">The studio</a>
          <a href="#ritual">The ritual</a>
          <a href="#therapists">Therapists</a>
          <a href="#visit">Visit</a>
        </nav>
        <a className="button button--small" href="#book" onClick={bookLink(onBook)}>
          <span>
            Book<span className="site-header__wide"> a session</span>
          </span>
        </a>
      </div>
    </header>
  );
}
