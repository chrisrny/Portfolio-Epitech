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

const BY_TECH = Object.fromEntries(USAGE.map((u) => [u.tech, u.projects]))
const MAIN = USAGE.filter((u) => u.projects.length >= 2)
const ONCE = USAGE.filter((u) => u.projects.length === 1)
const MAX = MAIN[0]?.projects.length ?? 1

// Outils utilisés au quotidien mais qui n'apparaissent pas dans les fiches projets
const ALSO = 'Git et GitHub, Linux et Bash, SQL, CI/CD avec GitHub Actions, Notion, Trello'

// ── Graphe : grappes de technos, placées en ellipse autour d'une techno centrale ──
const W = 1180
const H = 540

const CLUSTERS = [
  { id: 'ml', label: 'Data et ML', color: 'var(--accent)', hub: 'Python', cx: 300, cy: 290, rx: 205, ry: 150,
    members: ['Jupyter', 'pandas', 'scikit-learn', 'NumPy', 'Streamlit', 'Matplotlib', 'XGBoost', 'PyTorch', 'Gymnasium'] },
  { id: 'nlp', label: 'NLP et LLM', color: 'var(--tertiary)', hub: 'LLM', cx: 700, cy: 150, rx: 175, ry: 95,
    members: ['Ollama', 'Prompt engineering', 'Sécurité', 'NLTK', 'NLP', 'Sentence Transformers', 'CLI', 'Discord', 'API REST'] },
  { id: 'web', label: 'Web', color: 'var(--highlight)', hub: 'Next.js', cx: 920, cy: 390, rx: 165, ry: 105,
    members: ['TypeScript', 'PostgreSQL', 'Express', 'FastAPI', 'Docker', 'Prisma', 'Tailwind', 'Jest', 'MongoDB', 'Figma'] },
  { id: 'game', label: 'Jeu', color: '#8BE38B', hub: 'Java 21', cx: 610, cy: 450, rx: 85, ry: 45,
    members: ['libGDX', 'Gradle', 'JUnit'] },
]

// Une techno pas encore rangée rejoint la grappe de son domaine principal
const DOMAIN_CLUSTER = { 'Data & IA': 'ml', 'Développement web': 'web', Autres: 'game' }
const placed = new Set(CLUSTERS.flatMap((c) => [c.hub, ...c.members]))
USAGE.filter((u) => !placed.has(u.tech)).forEach(({ tech }) => {
  const domains = PROJECTS.filter((p) => p.tech.includes(tech)).map((p) => p.domain)
  const main = domains.sort((a, b) => domains.filter((d) => d === b).length - domains.filter((d) => d === a).length)[0]
  CLUSTERS.find((c) => c.id === DOMAIN_CLUSTER[main]).members.push(tech)
})

const NODES = CLUSTERS.flatMap((c) => {
  const ring = c.members.filter((t) => BY_TECH[t])
  return [
    { id: c.hub, x: c.cx, y: c.cy, cluster: c },
    ...ring.map((t, i) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / ring.length
      return { id: t, x: c.cx + c.rx * Math.cos(a), y: c.cy + c.ry * Math.sin(a), cluster: c }
    }),
  ].filter((n) => BY_TECH[n.id])
})
const POS = Object.fromEntries(NODES.map((n) => [n.id, n]))

// Deux technos sont reliées quand elles servent dans un même projet (poids = nombre de projets)
const EDGES = Object.values(
  PROJECTS.reduce((acc, p) => {
    p.tech.forEach((a, i) => p.tech.slice(i + 1).forEach((b) => {
      const key = [a, b].sort().join('|')
      acc[key] = acc[key] ? { ...acc[key], w: acc[key].w + 1 } : { a, b, w: 1 }
    }))
    return acc
  }, {}),
)

const NEIGHBOURS = EDGES.reduce((acc, { a, b }) => {
  (acc[a] ??= new Set()).add(b);
  (acc[b] ??= new Set()).add(a)
  return acc
}, {})

// Répulsion douce : rien dans la zone calme autour d'un nœud (on peut viser),
// effet maximal à mi-distance, rien au-delà du rayon
const REPEL_RADIUS = 110 // en unités du graphe
const CALM_RADIUS = 45
const REPEL_FORCE = 12

export default function Skills() {
  const ref = useRef(null)
  const graphRef = useRef(null)
  const nodeRefs = useRef({})
  const lineRefs = useRef([])
  const [shown, setShown] = useState(false)
  const [hovered, setHovered] = useState(null)

  // Les nœuds s'écartent doucement du curseur, et leurs liens les suivent
  useEffect(() => {
    const graph = graphRef.current
    if (!graph || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const offsets = Object.fromEntries(NODES.map((n) => [n.id, { x: 0, y: 0 }]))
    let mouse = null
    let frozen = false // curseur sur une techno : plus rien ne bouge
    let frame = 0

    const tick = () => {
      let moving = false
      NODES.forEach((n) => {
        const o = offsets[n.id]
        let tx = frozen ? o.x : 0
        let ty = frozen ? o.y : 0
        if (mouse && !frozen) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d > CALM_RADIUS && d < REPEL_RADIUS) {
            const push = Math.sin((Math.PI * (d - CALM_RADIUS)) / (REPEL_RADIUS - CALM_RADIUS)) * REPEL_FORCE
            tx = (dx / d) * push
            ty = (dy / d) * push
          }
        }
        o.x += (tx - o.x) * 0.14
        o.y += (ty - o.y) * 0.14
        if (Math.abs(tx - o.x) > 0.05 || Math.abs(ty - o.y) > 0.05) moving = true
        const el = nodeRefs.current[n.id]
        if (el) {
          el.style.left = `${((n.x + o.x) / W) * 100}%`
          el.style.top = `${((n.y + o.y) / H) * 100}%`
        }
      })
      EDGES.forEach(({ a, b }, i) => {
        const line = lineRefs.current[i]
        if (!line) return
        line.setAttribute('x1', POS[a].x + offsets[a].x)
        line.setAttribute('y1', POS[a].y + offsets[a].y)
        line.setAttribute('x2', POS[b].x + offsets[b].x)
        line.setAttribute('y2', POS[b].y + offsets[b].y)
      })
      frame = moving || mouse ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      frozen = !!e.target.closest('.snode')
      const r = graph.getBoundingClientRect()
      mouse = { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H }
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => {
      mouse = null
      frozen = false
      if (!frame) frame = requestAnimationFrame(tick)
    }
    graph.addEventListener('pointermove', onMove)
    graph.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      graph.removeEventListener('pointermove', onMove)
      graph.removeEventListener('pointerleave', onLeave)
    }
  }, [])

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

  const near = hovered ? new Set([hovered, ...(NEIGHBOURS[hovered] ?? [])]) : null
  const projects = hovered ? BY_TECH[hovered] ?? [] : []

  return (
    <section className={`section skills${shown ? ' skills--shown' : ''}`} id="skills" ref={ref}>
      <div className="container skills__head">
        <div>
          <h2 className="section__title">Compétences</h2>
          <p className="section__note">
            Calculé à partir de mes projets : deux technos sont reliées quand je les ai utilisées ensemble.
          </p>
        </div>
        <ul className="skills__legend" aria-hidden="true">
          {CLUSTERS.map((c) => <li key={c.id} style={{ '--c': c.color }}>{c.label}</li>)}
        </ul>
      </div>

      {/* Ordinateur : le graphe de la stack */}
      <div className="container skills__desktop">
        <div className={`sgraph${hovered ? ' sgraph--focus' : ''}`} ref={graphRef} onMouseLeave={() => setHovered(null)}>
          <svg className="sgraph__edges" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
            {EDGES.map(({ a, b, w }, i) => {
              const on = hovered && (a === hovered || b === hovered)
              return (
                <line key={`${a}|${b}`} ref={(el) => { lineRefs.current[i] = el }} x1={POS[a].x} y1={POS[a].y} x2={POS[b].x} y2={POS[b].y}
                  className={on ? 'is-on' : ''}
                  style={{ '--w': w, stroke: on ? POS[hovered].cluster.color : undefined }}
                  vectorEffect="non-scaling-stroke" />
              )
            })}
          </svg>

          {NODES.map((n, i) => {
            const count = BY_TECH[n.id].length
            return (
              <button
                key={n.id}
                ref={(el) => { nodeRefs.current[n.id] = el }}
                type="button"
                className={`snode${near?.has(n.id) ? ' snode--lit' : ''}${n.id === hovered ? ' snode--current' : ''}${count >= 3 ? ' snode--major' : ''}`}
                style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, '--c': n.cluster.color, '--s': `${10 + count * 7}px`, '--i': i }}
                onMouseEnter={() => setHovered(n.id)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                onClick={() => showProjects(n.id)}
                aria-label={`${n.id} : ${count} projet${count > 1 ? 's' : ''} (${BY_TECH[n.id].join(', ')}). Voir ces projets`}
              >
                <span className="snode__dot" />
                <span className="snode__label">{n.id}</span>
              </button>
            )
          })}
        </div>

        <p className="sgraph__info" aria-live="polite">
          {hovered ? (
            <>
              <strong>{hovered}</strong> : {projects.length} projet{projects.length > 1 ? 's' : ''} ({projects.join(', ')}),
              reliée à {near.size - 1} technos. Cliquez pour filtrer les projets.
            </>
          ) : 'Survolez une techno : ses voisines s’allument, avec les projets où elle sert.'}
        </p>
        <p className="sonce__also">Au quotidien aussi : {ALSO}.</p>
      </div>

      {/* Mobile : la liste en barres, plus lisible sur petit écran */}
      <div className="container skills__mobile">
        <ul className="sbars">
          {MAIN.map((u, i) => (
            <li key={u.tech} style={{ '--i': i, '--v': u.projects.length / MAX }}>
              <button type="button" className="sbars__row" onClick={() => showProjects(u.tech)}
                aria-label={`${u.tech} : ${u.projects.length} projets (${u.projects.join(', ')}). Voir ces projets`}>
                <span className="sbars__name">{u.tech}</span>
                <span className="sbars__track"><span className="sbars__fill" /></span>
                <span className="sbars__count">{u.projects.length}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="sonce">
          <h3 className="subhead">Utilisé dans un projet</h3>
          <ul className="sonce__list">
            {ONCE.map((u) => (
              <li key={u.tech}>
                <button type="button" className="sonce__chip" onClick={() => showProjects(u.tech)}>{u.tech}</button>
              </li>
            ))}
          </ul>
          <p className="sonce__also">Au quotidien aussi : {ALSO}.</p>
        </div>
      </div>
    </section>
  )
}
