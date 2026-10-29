import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Projects.css'
import { PROJECTS, REFLECTION_PARAGRAPHS } from '../data/projects'
import ProjectScene from './ProjectScene'

// Les compétences filtrent les projets par techno via cet événement
export const FILTER_EVENT = 'projects:filter'

const STEPS = ['Le problème', 'Ce que j’ai fait', 'Le résultat']
const LAUNCH_MS = 420
// Taille de dessin du MacBook (écran + bordures), mise à l'échelle de la fenêtre
const MAC_W = 1060
const MAC_H = 700

// Dossier macOS aux couleurs du projet, avec son symbole gravé sur la face avant
function Folder({ project, size = 76 }) {
  return (
    <svg className="folder" width={size} height={size * 0.8} viewBox="0 0 80 64" aria-hidden="true"
      style={{ '--theme': project.color }}>
      <path className="folder__back" d="M6 8a4 4 0 0 1 4-4h19.5a4 4 0 0 1 2.8 1.2L37 10h33a4 4 0 0 1 4 4v40a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4z" />
      <rect className="folder__front" x="3" y="17" width="74" height="45" rx="5" />
      <rect className="folder__shine" x="3" y="17" width="74" height="3" rx="1.5" />
      <path className="folder__glyph" d={project.icon} transform="translate(28 28)" />
    </svg>
  )
}

function ProjectWindow({ project, index, total, origin, onClose, onStep }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [project.id])

  return (
    <div className="pwin-layer" style={{ transformOrigin: origin }}>
      <div className="pwin" ref={ref} role="dialog" aria-modal="true" aria-label={project.title} tabIndex={-1}
        style={{ '--theme': project.color }}>
        <div className="pwin__bar">
          <button type="button" className="pwin__dot pwin__dot--close" onClick={onClose} aria-label="Fermer la fenêtre" />
          <span className="pwin__dot pwin__dot--min" aria-hidden="true" />
          <span className="pwin__dot pwin__dot--max" aria-hidden="true" />
          <span className="pwin__name">{project.title} · {index + 1} sur {total}</span>
          <button type="button" className="pwin__nav" onClick={() => onStep(-1)} aria-label="Projet précédent">‹</button>
          <button type="button" className="pwin__nav" onClick={() => onStep(1)} aria-label="Projet suivant">›</button>
        </div>

        <div className="pwin__scroll" key={project.id}>
          <header className="pwin__banner">
            <Folder project={project} size={86} />
            <div className="pwin__heading">
              <h3 className="pwin__title">{project.title}</h3>
              <p className="pwin__meta">
                <span className="pwin__badge">{project.domain}</span>
                {project.context === 'EPITECH' ? 'Projet EPITECH' : project.context}
              </p>
            </div>
            {project.result && (
              <p className="pwin__metric">
                <strong>{project.result.value}</strong>
                <span>{project.result.label}</span>
              </p>
            )}
          </header>

          <div className="pwin__body">
            <div className="pwin__side">
              <ProjectScene id={project.id} />
              <ul className="pwin__tech">
                {project.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
              {(project.github || project.live) && (
                <p className="pwin__links">
                  {project.github && <a href={project.github} className="pwin__cta" target="_blank" rel="noopener noreferrer">Voir le code</a>}
                  {project.live && <a href={project.live} className="link" target="_blank" rel="noopener noreferrer">Prototype</a>}
                </p>
              )}
            </div>

            <ol className="pwin__story">
              {project.story.map((text, i) => (
                <li key={STEPS[i]} style={{ '--i': i }}>
                  <span className="pwin__step"><b>{i + 1}</b>{STEPS[i]}</span>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const stageRef = useRef(null)
  const screenRef = useRef(null)
  const iconRefs = useRef({})
  const timer = useRef(0)
  const [openId, setOpenId] = useState(null)
  const [launching, setLaunching] = useState(null)
  const [origin, setOrigin] = useState('50% 50%')
  const [tech, setTech] = useState(null)
  const [interacted, setInteracted] = useState(false)
  const [cursor, setCursor] = useState(null)

  const index = PROJECTS.findIndex((p) => p.id === openId)
  const project = PROJECTS[index]

  // Zoom dans l'écran piloté par le défilement : --p de 0 (Mac de trois quarts) à 1 (face à l'écran)
  useEffect(() => {
    const stage = stageRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    const update = () => {
      frame = 0
      const rect = stage.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const p = reduced ? 1 : Math.min(1, Math.max(0, -rect.top / Math.max(range, 1)))
      // La barre de navigation fixe (72 px) est retirée de la hauteur disponible
      const fit = Math.min((window.innerWidth * 0.94) / MAC_W, ((window.innerHeight - 72) * 0.92) / MAC_H)
      stage.style.setProperty('--p', p.toFixed(3))
      stage.style.setProperty('--fit', fit.toFixed(3))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Le curseur de démonstration vise les deux premières icônes (coordonnées de l'écran)
  useLayoutEffect(() => {
    const pos = PROJECTS.slice(0, 2).map((p) => {
      const el = iconRefs.current[p.id]
      return el && { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + 34 }
    })
    if (pos.every(Boolean)) {
      setCursor({ '--c1x': `${pos[0].x}px`, '--c1y': `${pos[0].y}px`, '--c2x': `${pos[1].x}px`, '--c2y': `${pos[1].y}px` })
    }
  }, [])

  // Filtre envoyé par la section Compétences : les autres icônes s'estompent
  useEffect(() => {
    const onFilter = (e) => { setTech(e.detail); setInteracted(true) }
    window.addEventListener(FILTER_EVENT, onFilter)
    return () => window.removeEventListener(FILTER_EVENT, onFilter)
  }, [])

  useEffect(() => () => clearTimeout(timer.current), [])

  const close = () => {
    const id = openId
    setOpenId(null)
    iconRefs.current[id]?.focus()
  }

  // Échap ferme la fenêtre
  useEffect(() => {
    if (!openId) return undefined
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId])

  const launch = (p) => {
    setInteracted(true)
    const screen = screenRef.current
    const icon = iconRefs.current[p.id]
    if (screen && icon) {
      const box = screen.getBoundingClientRect()
      const r = icon.getBoundingClientRect()
      setOrigin(`${((r.left + r.width / 2 - box.left) / box.width) * 100}% ${((r.top + r.height / 2 - box.top) / box.height) * 100}%`)
    }
    // On termine le zoom si le Mac n'est pas encore face au visiteur
    const stage = stageRef.current
    if (window.innerWidth > 900 && Number(stage.style.getPropertyValue('--p')) < 1) {
      window.scrollTo({ top: stage.offsetTop + stage.offsetHeight - window.innerHeight, behavior: 'smooth' })
    }
    clearTimeout(timer.current)
    setOpenId(null)
    setLaunching(p.id)
    timer.current = setTimeout(() => { setOpenId(p.id); setLaunching(null) }, LAUNCH_MS)
  }

  const step = (d) => setOpenId(PROJECTS[(index + d + PROJECTS.length) % PROJECTS.length].id)

  return (
    <section className="section projects" id="projects">
      <div className="container projects__head">
        <div>
          <h2 className="section__title">Projets</h2>
          <p className="section__note">Cliquez sur une icône pour ouvrir un projet.</p>
        </div>
      </div>

      <div className="mac-stage" ref={stageRef}>
        <div className="mac-sticky">
          <div className="mac">
            <div className="mac__lid">
              <div className="mac__screen" ref={screenRef}>
                <div className="mac__menubar">
                  <span className="mac__user">Christophe</span>
                  {tech
                    ? <button type="button" className="mac__filter" onClick={() => setTech(null)}>Filtre : {tech} ×</button>
                    : <span>{PROJECTS.length} projets</span>}
                </div>

                <ul className="desk" onPointerEnter={() => setInteracted(true)}>
                  {PROJECTS.map((p) => {
                    const dim = tech && !p.tech.includes(tech)
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          ref={(el) => { iconRefs.current[p.id] = el }}
                          className={`app${p.id === launching ? ' app--launch' : ''}${p.id === openId ? ' app--open' : ''}${dim ? ' app--dim' : ''}`}
                          style={{ '--theme': p.color }}
                          onClick={() => launch(p)}
                          aria-label={`Ouvrir ${p.title}`}
                        >
                          <span className="app__icon"><Folder project={p} /></span>
                          <span className="app__name">{p.title}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                {!interacted && cursor && (
                  <span className="demo-cursor" style={cursor} aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24"><path d="M4 2l15 11-6.5 1.2L16 21l-3 1.4-3.4-6.8L4 20z" fill="#fff" stroke="#0D1321" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                    <span className="demo-cursor__ring" />
                  </span>
                )}

                <div className="mac__dock" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>

                {project && (
                  <>
                    <div className="pwin-backdrop" onClick={close} />
                    <ProjectWindow project={project} index={index} total={PROJECTS.length}
                      origin={origin} onClose={close} onStep={step} />
                  </>
                )}
              </div>
            </div>
            <div className="mac__base"><span /></div>
          </div>
        </div>
      </div>

      <div className="container projects__reflection">
        <h3 className="subhead">Réflexion sur mes travaux</h3>
        {REFLECTION_PARAGRAPHS.map((text) => <p key={text}>{text}</p>)}
      </div>
    </section>
  )
}
