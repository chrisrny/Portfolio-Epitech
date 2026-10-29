import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Projects.css'
import { PROJECTS, REFLECTION_PARAGRAPHS } from '../data/projects'

const DOMAINS = ['Data & IA', 'Développement web', 'Autres']
const DOMAIN_CLASS = { 'Data & IA': 'data', 'Développement web': 'web', Autres: 'other' }

// Les compétences filtrent les projets par techno via cet événement
export const FILTER_EVENT = 'projects:filter'

function Preview({ project }) {
  return (
    <div className="ppreview" key={project.id}>
      <div className="ppreview__top">
        <span className={`pbadge pbadge--${DOMAIN_CLASS[project.domain]}`}>{project.domain}</span>
        {project.context !== 'EPITECH' && <span className="ppreview__context">{project.context}</span>}
      </div>
      <h3 className="ppreview__title">{project.title}</h3>
      {project.result && (
        <p className="ppreview__result">
          <strong>{project.result.value}</strong>
          <span>{project.result.label}</span>
        </p>
      )}
      <p className="ppreview__summary">{project.summary}</p>
      <ul className="ppreview__tech">
        {project.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>
      {(project.github || project.live) && (
        <p className="ppreview__links">
          {project.github && (
            <a href={project.github} className="link" target="_blank" rel="noopener noreferrer">Code source</a>
          )}
          {project.live && (
            <a href={project.live} className="link" target="_blank" rel="noopener noreferrer">Prototype</a>
          )}
        </p>
      )}
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState({ type: 'all' })
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const filtersRef = useRef(null)
  const [pill, setPill] = useState({ left: 0, width: 0 })

  const items = PROJECTS.filter((p) =>
    filter.type === 'domain' ? p.domain === filter.value
      : filter.type === 'tech' ? p.tech.includes(filter.value)
        : true,
  )
  const active = items.find((p) => p.id === activeId) ?? items[0]
  const filterKey = filter.type === 'all' ? 'all' : `${filter.type}:${filter.value}`

  const applyFilter = (next) => {
    setFilter(next)
    const first = PROJECTS.find((p) =>
      next.type === 'domain' ? p.domain === next.value
        : next.type === 'tech' ? p.tech.includes(next.value)
          : true,
    )
    if (first) setActiveId(first.id)
  }

  // Filtre envoyé par la section Compétences
  useEffect(() => {
    const onFilter = (e) => applyFilter({ type: 'tech', value: e.detail })
    window.addEventListener(FILTER_EVENT, onFilter)
    return () => window.removeEventListener(FILTER_EVENT, onFilter)
  }, [])

  // Pastille qui glisse sous le filtre actif
  useLayoutEffect(() => {
    const btn = filtersRef.current?.querySelector('[aria-pressed="true"]')
    if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth })
  }, [filterKey])

  const chips = [
    { key: 'all', label: 'Tous', value: { type: 'all' } },
    ...DOMAINS.map((d) => ({ key: `domain:${d}`, label: d, value: { type: 'domain', value: d } })),
    ...(filter.type === 'tech' ? [{ key: filterKey, label: `${filter.value} ×`, value: { type: 'all' }, tech: true }] : []),
  ]

  return (
    <section className="section projects" id="projects">
      <div className="container projects__head">
        <div>
          <h2 className="section__title">Projets</h2>
          <p className="section__note">Choisissez un projet pour l’aperçu.</p>
        </div>

        <div className="pfilters" ref={filtersRef} role="group" aria-label="Filtrer les projets">
          <span className="pfilters__pill" style={{ transform: `translateX(${pill.left}px)`, width: pill.width }} aria-hidden="true" />
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              className={`pfilters__btn${c.tech ? ' pfilters__btn--tech' : ''}`}
              aria-pressed={c.tech ? true : filterKey === c.key}
              onClick={() => applyFilter(c.value)}
              aria-label={c.tech ? `Retirer le filtre ${filter.value}` : undefined}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="container projects__body">
        <ul className="plist" key={filterKey}>
          {items.map((p, i) => {
            const isActive = p.id === active?.id
            return (
              <li key={p.id} className={`plist__item${isActive ? ' plist__item--active' : ''}`} style={{ '--i': i }}>
                <button
                  type="button"
                  className="plist__btn"
                  aria-expanded={isActive}
                  onMouseEnter={() => setActiveId(p.id)}
                  onFocus={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                >
                  <span className={`plist__dot plist__dot--${DOMAIN_CLASS[p.domain]}`} aria-hidden="true" />
                  <span className="plist__title">{p.title}</span>
                  {p.result && <span className="plist__metric">{p.result.value}</span>}
                </button>
                {/* Sur mobile, l'aperçu s'ouvre sous le titre */}
                {isActive && <div className="plist__inline"><Preview project={p} /></div>}
              </li>
            )
          })}
        </ul>

        <aside className="projects__preview" aria-live="polite">
          {active && <Preview project={active} />}
        </aside>
      </div>

      <div className="container projects__reflection">
        <h3 className="subhead">Réflexion sur mes travaux</h3>
        {REFLECTION_PARAGRAPHS.map((text) => <p key={text}>{text}</p>)}
      </div>
    </section>
  )
}
