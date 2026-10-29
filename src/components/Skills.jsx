import { useEffect, useRef, useState } from 'react'
import './Skills.css'
import { PROJECTS } from '../data/projects'
import { FILTER_EVENT } from './Projects'

// Combien de projets du portfolio utilisent chaque techno : calculé, pas déclaré
const USAGE = Object.entries(
  PROJECTS.reduce((acc, p) => {
    p.tech.forEach((t) => { (acc[t] ??= []).push(p.title) })
    return acc
  }, {}),
)
  .map(([tech, projects]) => ({ tech, projects }))
  .sort((a, b) => b.projects.length - a.projects.length || a.tech.localeCompare(b.tech))

const MAIN = USAGE.filter((u) => u.projects.length >= 2)
const ONCE = USAGE.filter((u) => u.projects.length === 1)
const MAX = MAIN[0]?.projects.length ?? 1

// Outils utilisés au quotidien mais qui n'apparaissent pas dans les fiches projets
const ALSO = 'Git et GitHub, Linux et Bash, SQL, CI/CD avec GitHub Actions'

export default function Skills() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect() }
    }, { threshold: 0.2 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const showProjects = (tech) => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: tech }))
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const detail = USAGE.find((u) => u.tech === hovered)

  return (
    <section className={`section skills${shown ? ' skills--shown' : ''}`} id="skills" ref={ref}>
      <div className="container">
        <header className="section__head">
          <h2 className="section__title">Compétences</h2>
          <p className="section__note">
            Calculé à partir de mes projets. Cliquez une techno pour voir les projets qui l’utilisent.
          </p>
        </header>

        <div className="section__body">
          <ul className="sbars" onMouseLeave={() => setHovered(null)}>
            {MAIN.map((u, i) => (
              <li key={u.tech} style={{ '--i': i, '--v': u.projects.length / MAX }}>
                <button
                  type="button"
                  className={`sbars__row${hovered && hovered !== u.tech ? ' sbars__row--dim' : ''}`}
                  onMouseEnter={() => setHovered(u.tech)}
                  onFocus={() => setHovered(u.tech)}
                  onBlur={() => setHovered(null)}
                  onClick={() => showProjects(u.tech)}
                  aria-label={`${u.tech} : ${u.projects.length} projets (${u.projects.join(', ')}). Voir ces projets`}
                >
                  <span className="sbars__name">{u.tech}</span>
                  <span className="sbars__track"><span className="sbars__fill" /></span>
                  <span className="sbars__count">{u.projects.length}</span>
                </button>
              </li>
            ))}
          </ul>

          <p className="sbars__detail" aria-hidden="true">
            {detail
              ? <>Utilisé dans <strong>{detail.projects.join(', ')}</strong></>
              : 'Survolez une techno pour voir les projets.'}
          </p>

          <div className="sonce">
            <h3 className="subhead">Utilisé dans un projet</h3>
            <ul className="sonce__list">
              {ONCE.map((u) => (
                <li key={u.tech}>
                  <button
                    type="button"
                    className="sonce__chip"
                    onMouseEnter={() => setHovered(u.tech)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => showProjects(u.tech)}
                  >
                    {u.tech}
                  </button>
                </li>
              ))}
            </ul>
            <p className="sonce__also">Au quotidien aussi : {ALSO}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
