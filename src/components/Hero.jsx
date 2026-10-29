import './Hero.css'
import { site } from '../config/site'
import { PROJECTS } from '../data/projects'

const FEATURED = PROJECTS.slice(0, 3)

export default function Hero() {
  const [given, ...familyParts] = site.fullName.split(' ')

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__intro">
          <h1 className="hero__name">
            {given}<br />{familyParts.join(' ')}
          </h1>

          <p className="hero__lead">
            Étudiant en 2e année à EPITECH Mulhouse, spécialisé en data et en IA.
            Je travaille sur tout le chemin de la donnée : la nettoyer, entraîner des
            modèles, et les rendre utiles dans de vraies applications.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__cta">Voir les projets</a>
            <a href="#contact" className="link">Me contacter</a>
          </div>

          <p className="hero__socials">
            <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={site.cvFile} download={site.cvDownloadFileName}>CV (PDF)</a>
          </p>
        </div>

        <div className="hero__featured">
          <h2 className="hero__featured-title">Projets à la une</h2>
          <ul>
            {FEATURED.map((p) => (
              <li key={p.id}>
                <a href="#data" className="hero__row">
                  <span className="hero__row-text">
                    <span className="hero__row-name">{p.title}</span>
                    <span className="hero__row-summary">{p.summary}</span>
                  </span>
                  {p.result && (
                    <span className="hero__row-result">
                      <strong>{p.result.value}</strong>
                      <span>{p.result.label}</span>
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
