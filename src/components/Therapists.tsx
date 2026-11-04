import type { SiteValues } from '../lib/content';
import { Photo } from './Photo';

interface TherapistsProps {
  values: SiteValues;
  /** Fields the owner has set — the sample labels disappear once they replace them. */
  ownerFields: string[];
}

export function Therapists({ values, ownerFields }: TherapistsProps) {
  const photo = values['team.photo'];
  const members = values['team.members'];
  const sampleProfiles = !ownerFields.includes('team.members');
  const samplePhoto = !ownerFields.includes('team.photo');
  return (
    <section id="therapists" className="section team" aria-labelledby="team-title">
      <div className={`page team__grid ${photo ? '' : 'team__grid--text-only'}`}>
        <header className="section-head team__head">
          <h2 id="team-title">{values['team.title']}</h2>
          {values['team.intro'] && <p className="section-intro">{values['team.intro']}</p>}
          {sampleProfiles && (
            <p className="sample-note">
              <span className="tag">Sample</span>
              These are sample profiles — the studio will introduce its own therapists here.
            </p>
          )}
        </header>
        {photo && (
          <figure className="team__figure">
            <Photo image={photo} sizes="(min-width: 960px) 34vw, calc(100vw - 40px)" className="team__photo" />
            {samplePhoto && <figcaption className="tag tag--on-photo">Sample photo</figcaption>}
          </figure>
        )}
        {members.length > 0 && (
          <ul className="team__list" role="list">
            {members.map((member, i) => (
              <li className={`member ${member.photo ? 'member--portrait' : ''}`} key={`${i}-${member.name}`}>
                {member.photo && <Photo image={member.photo} sizes="96px" className="member__portrait" />}
                <div className="member__text">
                  <h3>
                    {member.name}
                    {sampleProfiles && <span className="tag">Sample</span>}
                  </h3>
                  {member.focus && <p className="member__focus">{member.focus}</p>}
                  {member.bio && <p className="member__bio prewrap">{member.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
