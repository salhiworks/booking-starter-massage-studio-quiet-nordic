import type { SiteValues } from '../lib/content';
import { Photo } from './Photo';

export function FirstVisit({ values }: { values: SiteValues }) {
  const photo = values['firstVisit.photo'];
  const steps = values['firstVisit.steps'];
  const questions = values['firstVisit.questions'];
  return (
    <section id="first-visit" className="section first-visit" aria-labelledby="first-visit-title">
      <div className={`first-visit__grid ${photo ? '' : 'first-visit__grid--text-only'}`}>
        {photo && <Photo image={photo} sizes="(min-width: 960px) 42vw, 100vw" className="first-visit__photo" />}
        <div className="first-visit__body">
          <header className="section-head">
            <h2 id="first-visit-title">{values['firstVisit.title']}</h2>
            {values['firstVisit.intro'] && <p className="section-intro">{values['firstVisit.intro']}</p>}
          </header>
          <ol className="steps">
            {steps.map((step, i) => (
              <li key={`${i}-${step.title}`}>
                <span className="steps__n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{step.title}</h3>
                {step.text && <p className="prewrap">{step.text}</p>}
              </li>
            ))}
          </ol>
        </div>
      </div>
      {questions.length > 0 && (
        <div className="page faq">
          <h3 className="faq__title">{values['firstVisit.questionsTitle']}</h3>
          <dl className="faq__list">
            {questions.map((item, i) => (
              <div className="faq__item" key={`${i}-${item.question}`}>
                <dt>{item.question}</dt>
                {item.answer && <dd className="prewrap">{item.answer}</dd>}
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
