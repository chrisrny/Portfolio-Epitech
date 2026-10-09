import { useRef, useState } from 'react'
import './Projects.css'
import { PROJECTS, REFLECTION_PARAGRAPHS } from '../data/projects'

const DOMAIN_CLASS = { 'Data & IA': 'data', 'Développement web': 'web', Autres: 'other' }

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

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
  </svg>
)

export default function Projects() {
  const trackRef = useRef(null)
  const [openId, setOpenId] = useState(null)

  const scroll = (dir) => {
    const el = trackRef.current
    const card = el?.firstElementChild
    if (!card) return
    // largeur réelle d'une carte + gap → fonctionne aussi sur mobile
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || 0)
    el.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="section projects" id="projects">
      <div className="container projects__head">
        <div>
          <h2 className="section__title">Projets</h2>
          <p className="section__note">Data et IA d’abord, puis le développement web.</p>
        </div>
        <div className="projects__controls">
          <button type="button" className="projects__btn" onClick={() => scroll(-1)} aria-label="Projets précédents">
            <Chevron dir="left" />
          </button>
          <button type="button" className="projects__btn" onClick={() => scroll(1)} aria-label="Projets suivants">
            <Chevron dir="right" />
          </button>
        </div>
      </div>

      <ul className="projects__track" ref={trackRef}>
        {PROJECTS.map((p) => {
          const open = openId === p.id
          return (
            <li key={p.id} className={`pcard${open ? ' pcard--open' : ''}`}>
              <div className="pcard__top">
                <span className={`pcard__badge pcard__badge--${DOMAIN_CLASS[p.domain]}`}>{p.domain}</span>
                {p.context !== 'EPITECH' && <span className="pcard__context">{p.context}</span>}
                <span className="pcard__links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`Code source de ${p.title} sur GitHub`}>
                      <GithubIcon />
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noopener noreferrer" aria-label={`Prototype de ${p.title}`}>
                      <ExternalIcon />
                    </a>
                  )}
                </span>
              </div>

              <div className="pcard__body">
                <h3 className="pcard__title">{p.title}</h3>
                <p className="pcard__summary">{p.summary}</p>
              </div>

              {p.result && (
                <p className="pcard__result">
                  <strong>{p.result.value}</strong>
                  <span>{p.result.label}</span>
                </p>
              )}

              <div className="pcard__details" id={`pcard-${p.id}`} aria-hidden={!open}>
                <div>
                  <p>{p.description}</p>
                  <ul className="pcard__highlights">
                    {p.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                </div>
              </div>

              <ul className="pcard__tech">
                {p.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>

              <button
                type="button"
                className="pcard__toggle"
                aria-expanded={open}
                aria-controls={`pcard-${p.id}`}
                onClick={() => setOpenId(open ? null : p.id)}
              >
                {open ? 'Masquer le détail' : 'Voir le détail'}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="container projects__reflection">
        <h3 className="subhead">Réflexion sur mes travaux</h3>
        {REFLECTION_PARAGRAPHS.map((text) => <p key={text}>{text}</p>)}
      </div>
    </section>
  )
}
