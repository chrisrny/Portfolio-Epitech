import { useEffect, useRef, useState } from 'react'
import './DataShowcase.css'
import { PROJECTS } from '../data/projects'
import { STARTTREK, CVRIE } from '../data/charts'

const byId = (id) => PROJECTS.find((p) => p.id === id)

// Courbe d'apprentissage de Start Trek : moyenne glissante + évaluations
function LearningCurve() {
  const w = 600
  const h = 260
  const pad = { l: 44, r: 12, t: 12, b: 28 }
  const xMax = 300000
  const yMin = -220
  const yMax = 300
  const x = (s) => pad.l + (s / xMax) * (w - pad.l - pad.r)
  const y = (v) => pad.t + (1 - (v - yMin) / (yMax - yMin)) * (h - pad.t - pad.b)
  const path = STARTTREK.curve.map(([s, v], i) => `${i ? 'L' : 'M'}${x(s).toFixed(1)},${y(v).toFixed(1)}`).join('')

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart" role="img"
      aria-label="Score moyen de l'agent DQN pendant l'entraînement : de -140 au départ à environ 245 après 300 000 steps, au-dessus de l'objectif de 200.">
      {[-200, 0, 200].map((v) => (
        <g key={v}>
          <line x1={pad.l} x2={w - pad.r} y1={y(v)} y2={y(v)} className="chart__grid" />
          <text x={pad.l - 8} y={y(v) + 4} className="chart__tick" textAnchor="end">{v}</text>
        </g>
      ))}
      {[0, 100000, 200000, 300000].map((s) => (
        <text key={s} x={x(s)} y={h - 8} className="chart__tick" textAnchor="middle">{s ? `${s / 1000}k` : '0'}</text>
      ))}

      <line x1={pad.l} x2={w - pad.r} y1={y(STARTTREK.goal)} y2={y(STARTTREK.goal)} className="chart__goal" />
      <text x={pad.l + 6} y={y(STARTTREK.goal) - 6} className="chart__label chart__label--goal">objectif 200</text>

      <line x1={pad.l} x2={w - pad.r} y1={y(STARTTREK.random)} y2={y(STARTTREK.random)} className="chart__baseline" />
      <text x={w - pad.r} y={y(STARTTREK.random) - 6} className="chart__label" textAnchor="end">agent au hasard −192</text>

      <path d={path} pathLength="1" className="chart__line" />
      {STARTTREK.evals.map(([s, v]) => (
        <circle key={s} cx={x(s)} cy={y(Math.max(yMin, v))} r="3" className="chart__dot" />
      ))}
    </svg>
  )
}

// CVRIE : F1-macro et rappel mélanome des 4 variantes évaluées proprement
function TrialBars() {
  return (
    <div className="bars" role="table" aria-label="Comparaison des modèles CVRIE">
      <div className="bars__legend" aria-hidden="true">
        <span className="bars__key bars__key--recall">Rappel mélanome</span>
        <span className="bars__key bars__key--f1">F1-macro</span>
      </div>
      {CVRIE.map((t) => (
        <div key={t.label} className={`bars__row${t.chosen ? ' bars__row--chosen' : ''}`} role="row">
          <span className="bars__label" role="rowheader">
            {t.label}{t.chosen && <em> retenu</em>}
          </span>
          <span className="bars__pair" role="cell">
            <span className="bars__bar bars__bar--recall" style={{ '--v': t.recall }}><b>{t.recall.toFixed(2).replace('.', ',')}</b></span>
            <span className="bars__bar bars__bar--f1" style={{ '--v': t.f1 }}><b>{t.f1.toFixed(2).replace('.', ',')}</b></span>
          </span>
        </div>
      ))}
    </div>
  )
}

function Tile({ project, className, children }) {
  return (
    <article className={`tile ${className}`}>
      <header className="tile__head">
        <h3 className="tile__title">{project.title}</h3>
        {project.result && (
          <p className="tile__result"><strong>{project.result.value}</strong> {project.result.label}</p>
        )}
      </header>
      <p className="tile__summary">{project.summary}</p>
      {children}
    </article>
  )
}

export default function DataShowcase() {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  // Les graphiques se dessinent une fois, quand la section arrive à l'écran
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect() }
    }, { threshold: 0.25 })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const nextbuy = byId('nextbuy')

  return (
    <section className={`section showcase${shown ? ' showcase--shown' : ''}`} id="data" ref={ref}>
      <div className="container showcase__head">
        <h2 className="section__title">Data &amp; IA</h2>
        <p className="section__note">Trois projets et leurs vrais résultats, tirés de mes notebooks.</p>
      </div>

      <div className="container showcase__grid">
        <Tile project={byId('starttrek')} className="tile--main">
          <LearningCurve />
          <p className="tile__caption">Score moyen de l'agent DQN pendant ses 300 000 steps d'entraînement. Les points sont les évaluations sans exploration.</p>
        </Tile>

        <Tile project={byId('cvrie')} className="tile--side">
          <TrialBars />
          <p className="tile__caption">Le meilleur F1 rate un mélanome sur deux : j'ai retenu le modèle qui en rate le moins.</p>
        </Tile>

        <article className="tile tile--number">
          <p className="tile__big">R² 0,96</p>
          <h3 className="tile__title">{nextbuy.title}</h3>
          <p className="tile__summary">XGBoost qui estime le délai avant la prochaine commande d'un client Instacart.</p>
        </article>
      </div>
    </section>
  )
}
