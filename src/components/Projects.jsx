import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import './Projects.css'
import { PROJECTS, REFLECTION_PARAGRAPHS } from '../data/projects'
import ProjectScene from './ProjectScene'

// Les compétences filtrent les projets par techno via cet événement
export const FILTER_EVENT = 'projects:filter'

const STEPS = ['Le problème', 'Ce que j’ai fait', 'Le résultat']
const LAUNCH_MS = 420
const CLOSE_MS = 320
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

// Clavier : 5 rangées de 14 touches, puis la rangée de la barre d'espace
const KEY_ROWS = 5
const KEYS_PER_ROW = 14

// Dock : des apps « génériques » du quotidien d'un étudiant data
const DOCK = [
  { id: 'finder', label: 'Finder' },
  { id: 'terminal', label: 'Terminal' },
  { id: 'code', label: 'Éditeur de code' },
  { id: 'notebook', label: 'Notebooks' },
  { id: 'browser', label: 'Navigateur' },
  { id: 'trash', label: 'Corbeille' },
]

function DockIcon({ id }) {
  switch (id) {
    case 'finder':
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#5AB0F7" /><path d="M20 0h11a9 9 0 0 1 9 9v22a9 9 0 0 1-9 9H20c3-7 4-13 0-20s-3-14 0-20z" fill="#E8F2FC" /><path d="M12 13v4M28 13v4" stroke="#0D1321" strokeWidth="2.4" strokeLinecap="round" /><path d="M11 26c5 4 13 4 18 0" stroke="#0D1321" strokeWidth="2.2" fill="none" strokeLinecap="round" /></svg>
      )
    case 'terminal':
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#1A1D23" /><rect x="0.5" y="0.5" width="39" height="39" rx="8.5" fill="none" stroke="#3A3F4A" /><path d="M9 14l6 5-6 5" stroke="#7EE787" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M18 26h10" stroke="#7EE787" strokeWidth="2.4" strokeLinecap="round" /></svg>
      )
    case 'code':
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#2F6FD8" /><path d="M15 13l-7 7 7 7M25 13l7 7-7 7" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )
    case 'notebook':
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#F4F1EA" /><path d="M9 15a13 7 0 0 1 22 0M9 25a13 7 0 0 0 22 0" stroke="#F37726" strokeWidth="2.6" fill="none" strokeLinecap="round" /><circle cx="29" cy="9" r="2" fill="#767677" /><circle cx="11" cy="32" r="2.4" fill="#767677" /></svg>
      )
    case 'browser':
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#E8EEF6" /><circle cx="20" cy="20" r="13" fill="#4CC9F0" /><path d="M20 20l7-7-4 11z" fill="#FF7A59" /><path d="M20 20l-7 7 4-11z" fill="#fff" /></svg>
      )
    default:
      return (
        <svg viewBox="0 0 40 40"><rect width="40" height="40" rx="9" fill="#2A2F3A" /><path d="M12 13h16M17 13v-2h6v2M14 13l1.5 16h9L26 13" stroke="#C3CDDB" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )
  }
}

function ProjectWindow({ project, index, total, origin, closing, onClose, onStep }) {
  const ref = useRef(null)
  useEffect(() => { ref.current?.focus() }, [project.id])

  return (
    <div className={`pwin-layer${closing ? ' pwin-layer--closing' : ''}`} style={{ transformOrigin: origin }}>
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
  const [closing, setClosing] = useState(false)
  const [landing, setLanding] = useState(null)
  const [origin, setOrigin] = useState('50% 50%')
  const [tech, setTech] = useState(null)
  const [interacted, setInteracted] = useState(false)
  const [cursor, setCursor] = useState(null)
  const [now, setNow] = useState(() => new Date())

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
      // Le zoom commence dès que le Mac entre dans l'écran (haut de la scène à 80 % de la hauteur)
      const lead = window.innerHeight * 0.8
      const p = reduced ? 1 : Math.min(1, Math.max(0, (lead - rect.top) / Math.max(range + lead, 1)))
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

  // Heure réelle dans la barre de menus
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])
  const clock = `${now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`

  // Position d'une icône dans l'écran, en %, pour ouvrir / refermer la fenêtre vers elle
  const originOf = (id) => {
    const screen = screenRef.current
    const icon = iconRefs.current[id]
    if (!screen || !icon) return '50% 50%'
    const box = screen.getBoundingClientRect()
    const r = icon.getBoundingClientRect()
    return `${((r.left + r.width / 2 - box.left) / box.width) * 100}% ${((r.top + r.height / 2 - box.top) / box.height) * 100}%`
  }

  // Fermeture : la fenêtre retourne dans son dossier, qui rebondit en la recevant
  const close = () => {
    if (!openId || closing) return
    const id = openId
    setOrigin(originOf(id))
    setClosing(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOpenId(null)
      setClosing(false)
      setLanding(id)
      iconRefs.current[id]?.focus({ preventScroll: true })
      timer.current = setTimeout(() => setLanding(null), 400)
    }, CLOSE_MS)
  }

  // Échap ferme la fenêtre
  useEffect(() => {
    if (!openId) return undefined
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId, closing])

  const launch = (p) => {
    setInteracted(true)
    setOrigin(originOf(p.id))
    setClosing(false)
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
                  <span className="mac__menus" aria-hidden="true">
                    <b>Finder</b><span>Fichier</span><span>Édition</span><span>Présentation</span><span>Aller</span><span>Fenêtre</span><span>Aide</span>
                  </span>
                  <span className="mac__status">
                    {tech && <button type="button" className="mac__filter" onClick={() => setTech(null)}>Filtre : {tech} ×</button>}
                    <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true"><path d="M1 4.5a10 10 0 0 1 14 0M3.5 7a6.5 6.5 0 0 1 9 0M6 9.4a3 3 0 0 1 4 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <svg width="24" height="12" viewBox="0 0 24 12" aria-hidden="true"><rect x="0.75" y="0.75" width="20" height="10.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" /><rect x="2.5" y="2.5" width="13" height="7" rx="1.5" fill="currentColor" /><path d="M22.5 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    <span>{clock}</span>
                  </span>
                </div>
                <span className="mac__notch" aria-hidden="true"><i /></span>

                <ul className="desk" onPointerEnter={() => setInteracted(true)}>
                  {PROJECTS.map((p) => {
                    const dim = tech && !p.tech.includes(tech)
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          ref={(el) => { iconRefs.current[p.id] = el }}
                          className={`app${p.id === launching ? ' app--launch' : ''}${p.id === landing ? ' app--land' : ''}${p.id === openId ? ' app--open' : ''}${dim ? ' app--dim' : ''}`}
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
                  {DOCK.map((d, i) => (
                    <span key={d.id} className={`dock-item${i === DOCK.length - 1 ? ' dock-item--sep' : ''}`} title={d.label}>
                      <DockIcon id={d.id} />
                      {d.id === 'finder' && <i className="dock-item__dot" />}
                    </span>
                  ))}
                </div>

                {project && (
                  <>
                    <div className={`pwin-backdrop${closing ? ' pwin-backdrop--closing' : ''}`} onClick={close} />
                    <ProjectWindow project={project} index={index} total={PROJECTS.length}
                      origin={origin} closing={closing} onClose={close} onStep={step} />
                  </>
                )}
              </div>
              {/* Plateau du Mac vu d'en haut : clavier, haut-parleurs et pavé tactile */}
              <div className="mac__deck" aria-hidden="true">
                <div className="mac__deck-top">
                  <span className="mac__speaker" />
                  <div className="mac__keys">
                    {Array.from({ length: KEY_ROWS * KEYS_PER_ROW }, (_, i) => <i key={i} />)}
                    <i /><i /><i /><i /><i className="mac__space" /><i /><i /><i /><i />
                  </div>
                  <span className="mac__speaker" />
                </div>
                <span className="mac__trackpad" />
              </div>
            </div>
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
