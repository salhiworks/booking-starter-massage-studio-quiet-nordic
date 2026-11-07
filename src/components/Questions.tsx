import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';

/** First-visit questions as quiet disclosures (native <details>: keyboard and screen-reader ready). */
export function Questions({ values }: { values: SiteValues }) {
  const questions = values['firstVisit.questions'];
  if (questions.length === 0) return null;
  return (
    <section id="questions" className="section questions" aria-labelledby="questions-title">
      <div className="page questions__grid">
        <header className="section-head">
          <p className="eyebrow">Before you come</p>
          <h2 id="questions-title">
            <Emphasis text={values['firstVisit.questionsTitle']} />
          </h2>
        </header>
        <div className="faq">
          {questions.map((item, i) => (
            <details className="faq__item" key={`${i}-${item.question}`} open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              {item.answer && <p className="prewrap">{item.answer}</p>}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
