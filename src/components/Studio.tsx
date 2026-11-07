import type { SiteValues } from '../lib/content';
import { Emphasis } from './Emphasis';
import { Photo } from './Photo';

/** The room: one tall photo, two small details with captions and a few plain facts. */
export function Studio({ values }: { values: SiteValues }) {
  const room = values['firstVisit.photo'];
  const details = [
    { image: values['studio.detailOne'], caption: values['studio.detailOneCaption'] },
    { image: values['studio.detailTwo'], caption: values['studio.detailTwoCaption'] },
  ].filter((d) => d.image !== null);
  const points = values['studio.points'];
  return (
    <section id="studio" className="section studio" aria-labelledby="studio-title">
      <div className={`page studio__grid ${room ? '' : 'studio__grid--text-only'}`}>
        {room && <Photo image={room} sizes="(min-width: 960px) 40vw, 100vw" className="studio__room" />}
        <div className="studio__body">
          <header className="section-head">
            <p className="eyebrow">The studio</p>
            <h2 id="studio-title">
              <Emphasis text={values['studio.title']} />
            </h2>
            {values['studio.text'] && <p className="section-intro prewrap">{values['studio.text']}</p>}
          </header>
          {points.length > 0 && (
            <ul className="studio__points" role="list">
              {points.map((point, i) => (
                <li key={`${i}-${point.text}`}>{point.text}</li>
              ))}
            </ul>
          )}
          {details.length > 0 && (
            <div className={`studio__details studio__details--${details.length}`}>
              {details.map((d, i) => (
                <figure className="studio__detail" key={i}>
                  {d.image && <Photo image={d.image} sizes="(min-width: 960px) 20vw, 50vw" className="studio__detail-photo" />}
                  {d.caption && <figcaption>{d.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
