import './Hero.css'
import { site } from '../config/site'
import { PROJECTS } from '../data/projects'

const RECENT = PROJECTS.slice(0, 3)

export default function Hero() {
  const [given, ...familyParts] = site.fullName.split(' ')

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__intro">
          <p className="hero__kicker">Étudiant développeur — EPITECH Mulhouse, Bachelor 2</p>

          <h1 className="hero__name">
            {given}<br />{familyParts.join(' ')}
          </h1>

          <p className="hero__lead">
            Je conçois des applications web et des projets data &amp; IA. En 2e année à EPITECH,
            après un stage de développement web en 2026.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="hero__link hero__link--primary">Voir les projets →</a>
            <a href="#contact" className="hero__link">Me contacter</a>
            <span className="hero__socials">
              <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.cvFile} download={site.cvDownloadFileName}>CV</a>
            </span>
          </div>
        </div>

        <div className="hero__recent">
          <p className="hero__recent-title">Récemment</p>
          <ul>
            {RECENT.map((p, i) => (
              <li key={p.id}>
                <a href="#projects" className="hero__recent-row">
                  <span className="hero__recent-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="hero__recent-name">{p.title}</span>
                  <span className="hero__recent-tech">{p.tech.slice(0, 3).join(', ')}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
