// Fond du site : courbes de niveau autour de 3 « pics » de densité,
// comme un graphique de densité (KDE) ou une carte topographique.
const W = 1440
const H = 900

const PEAKS = [
  { x: 1100, y: 260, rings: 9, step: 36, color: 'var(--accent)' },
  { x: 250, y: 780, rings: 8, step: 40, color: 'var(--tertiary)' },
  { x: 860, y: 860, rings: 6, step: 32, color: 'var(--accent)' },
]

// Chaque anneau est un cercle étiré et déformé par deux sinus
const CONTOURS = PEAKS.flatMap((peak, pi) =>
  Array.from({ length: peak.rings }, (_, i) => {
    const r = (i + 1) * peak.step
    const points = Array.from({ length: 73 }, (_, a) => {
      const t = (a / 72) * Math.PI * 2
      const wobble = 1 + 0.16 * Math.sin(3 * t + pi + (i + 1) * 0.35) + 0.08 * Math.sin(5 * t - (i + 1) * 0.5)
      return `${(peak.x + Math.cos(t) * r * 1.35 * wobble).toFixed(1)},${(peak.y + Math.sin(t) * r * wobble).toFixed(1)}`
    })
    return { d: `M${points.join('L')}Z`, color: peak.color, opacity: 0.2 - i * 0.014 }
  }),
)

export default function Contours() {
  return (
    <svg className="contours" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {CONTOURS.map((c, i) => (
        <path key={i} d={c.d} fill="none" strokeWidth="1" style={{ stroke: c.color }} opacity={c.opacity} />
      ))}
    </svg>
  )
}
