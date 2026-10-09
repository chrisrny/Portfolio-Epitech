import './About.css'
import { site } from '../config/site'

const FACTS = [
  ['École', 'EPITECH Mulhouse, Bachelor 2'],
  ['Spécialité', 'Data et IA'],
  ['Ville', site.city],
  ['Recherche', 'Un stage en data ou en IA'],
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title">À propos</h2>
        </header>

        <div className="section__body about">
          <div className="about__text">
            <p>
              Mon parcours a commencé par une première année de licence Maths-Informatique
              à l'UHA. J'y ai gagné de la rigueur, mais il me manquait le concret. C'est ce
              qui m'a amené à EPITECH, où l'on apprend en réalisant de vrais projets.
            </p>
            <p>
              J'ai exploré plusieurs domaines, du développement web à la cybersécurité, et
              c'est la data et l'IA qui m'ont le plus accroché : je m'y suis spécialisé. Mes
              compétences en développement web restent un atout, car elles me permettent de
              transformer un modèle en outil que les gens peuvent vraiment utiliser.
            </p>
            <p>
              Pour moi, un bon modèle commence par une bonne question et se juge sur ce qu'il
              change concrètement.
            </p>

            <dl className="about__facts">
              {FACTS.map(([key, val]) => (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd>{val}</dd>
                </div>
              ))}
            </dl>

            <a href={site.cvFile} download={site.cvDownloadFileName} className="link">
              Télécharger mon CV (PDF)
            </a>
          </div>

          <img
            src={site.profileImage}
            alt={`Portrait de ${site.fullName}`}
            className="about__photo"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  )
}
