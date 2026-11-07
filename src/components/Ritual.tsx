import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

const NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/** How a visit unfolds, as a calm line of moments on deep green. */
export function Ritual({ values }: { values: SiteValues }) {
  const steps = values['firstVisit.steps'];
  return (
    <section id="ritual" className="section ritual" aria-labelledby="ritual-title">
      <div className="page">
        <header className="section-head ritual__head">
          <p className="eyebrow">Your visit</p>
          <h2 id="ritual-title">
            <Emphasis text={values['firstVisit.title']} />
          </h2>
          {values['firstVisit.intro'] && <p className="section-intro">{values['firstVisit.intro']}</p>}
        </header>
        <ol className={`ritual__steps ritual__steps--${Math.min(steps.length, 4)}`}>
          {steps.map((step, i) => (
            <li className="ritual__step" key={`${i}-${step.title}`}>
              <span className="ritual__numeral" aria-hidden="true">
                {NUMERALS[i] ?? i + 1}
              </span>
              <h3>{step.title}</h3>
              {step.when && <p className="ritual__when">{step.when}</p>}
              {step.text && <p className="ritual__text prewrap">{step.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
