import { useRef, useState } from 'react'
import './Projects.css'
import { PROJECTS, REFLECTION_PARAGRAPHS } from '../data/projects'

const BADGES = { school: 'Scolaire', personal: 'Personnel', pro: 'Stage' }

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Projects() {
  const carouselRef = useRef(null)
  const [expandedId, setExpandedId] = useState(null)

  const toggleCard = (id, wrapEl) => {
    setExpandedId((current) => {
      const next = current === id ? null : id
      if (next && wrapEl) {
        window.requestAnimationFrame(() => {
          wrapEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
        })
      }
      return next
    })
  }

  const scroll = (direction) => {
    const el = carouselRef.current
    const card = el?.firstElementChild
    if (!card) return
    // largeur réelle d'une carte + gap → fonctionne aussi sur mobile
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0)
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' })
  }

  return (
    <section className="section" id="projects">
      <span className="section__watermark" aria-hidden="true">03</span>

      <div className="container">
        <div className="section__header reveal projects-header-wrapper">
          <div>
            <span className="section__tag">Projets</span>
            <h2 className="section__title">Mes réalisations</h2>
            <p className="section__subtitle">
              Stage et projets EPITECH — data, IA, fullstack, jeu vidéo et product design.
            </p>
          </div>

          <div className="carousel-controls">
            <button type="button" className="carousel-btn" onClick={() => scroll('left')} aria-label="Projets précédents">
              <ArrowLeft />
            </button>
            <button type="button" className="carousel-btn" onClick={() => scroll('right')} aria-label="Projets suivants">
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          className={`projects__carousel${expandedId ? ' projects__carousel--has-expanded' : ''}`}
          ref={carouselRef}
        >
          {PROJECTS.map((p, i) => {
            const isExpanded = expandedId === p.id
            return (
              <div
                key={p.id}
                className={`project-card-wrap reveal reveal--d${Math.min(i + 1, 6)}`}
              >
                <article
                  className={`project-card${isExpanded ? ' project-card--expanded' : ''}`}
                >
                  <button
                    type="button"
                    className="project-card__toggle"
                    aria-expanded={isExpanded}
                    onClick={(e) => toggleCard(p.id, e.currentTarget.closest('.project-card-wrap'))}
                  >
                    <span className="project-card__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

                    <div className="project-card__header">
                      <span className={`project-card__badge project-card__badge--${p.category}`}>
                        {BADGES[p.category]}
                      </span>
                    </div>

                    <h3 className="project-card__title">{p.title}</h3>
                    <p className="project-card__summary">{p.summary}</p>

                    <span className={`project-card__hint${isExpanded ? ' project-card__hint--close' : ''}`}>
                      {isExpanded ? 'Cliquer pour fermer' : 'Cliquer pour plus de détails'}
                    </span>

                    <div
                      className={`project-card__details${isExpanded ? ' project-card__details--open' : ''}`}
                      aria-hidden={!isExpanded}
                    >
                      <div className="project-card__details-inner">
                        <p className="project-card__description">{p.description}</p>
                        {p.highlights?.length > 0 && (
                          <ul className="project-card__highlights">
                            {p.highlights.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <ul className="project-card__tech">
                      {p.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </button>

                  {(p.github || p.live) && (
                    <div className="project-card__links">
                      {p.github && (
                        <a
                          href={p.github}
                          className="project-card__link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Code source — ${p.title}`}
                        >
                          <GithubIcon />
                        </a>
                      )}
                      {p.live && (
                        <a
                          href={p.live}
                          className="project-card__link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Démo — ${p.title}`}
                        >
                          <ExternalIcon />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </div>
            )
          })}
        </div>

        <aside
          className="projects__reflection reveal"
          aria-labelledby="projects-reflection-title"
        >
          <h3 id="projects-reflection-title" className="projects__reflection-title">
            Réflexion sur mes travaux
          </h3>
          <div className="projects__reflection-body">
            {REFLECTION_PARAGRAPHS.map((paragraph, idx) => (
              <p key={idx} className="projects__reflection-text">
                {paragraph}
              </p>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}