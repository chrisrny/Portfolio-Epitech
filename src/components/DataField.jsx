import { useEffect, useRef } from 'react'

// Fond animé du Hero : un vrai k-means (k = 3) calculé sur un nuage de points.
// Les points se posent, puis chaque itération réaffecte les couleurs et déplace
// les centroïdes jusqu'à convergence. Les points s'écartent au passage de la souris.
// Générateur pseudo-aléatoire à graine fixe : même dessin à chaque visite.
function random(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

const rand = random(42)
const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-9)) * Math.cos(2 * Math.PI * rand())

const W = 1000
const H = 600

const BLOBS = [
  { cx: 640, cy: 210, sx: 70, sy: 55, n: 70 },
  { cx: 840, cy: 400, sx: 55, sy: 60, n: 55 },
  { cx: 560, cy: 450, sx: 75, sy: 40, n: 45 },
]

const POINTS = [
  ...BLOBS.flatMap((b) =>
    Array.from({ length: b.n }, () => ({ x: b.cx + gauss() * b.sx, y: b.cy + gauss() * b.sy, r: 1.5 + rand() * 2 })),
  ),
  ...Array.from({ length: 30 }, () => ({ x: 380 + rand() * 600, y: 40 + rand() * 520, r: 1.6 })),
].map((p) => ({ ...p, sx: 380 + rand() * 620, sy: rand() * H })) // sx/sy : position de départ

// k-means précalculé : une étape = centroïdes + affectation de chaque point
function kmeans(points, init) {
  const steps = []
  let centroids = init
  for (let it = 0; it < 20; it++) {
    const labels = points.map((p) => {
      let best = 0
      let bestDist = Infinity
      centroids.forEach((c, j) => {
        const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2
        if (d < bestDist) { bestDist = d; best = j }
      })
      return best
    })
    steps.push({ centroids, labels })
    const next = centroids.map((c, j) => {
      const members = points.filter((_, i) => labels[i] === j)
      if (!members.length) return c
      return {
        x: members.reduce((s, p) => s + p.x, 0) / members.length,
        y: members.reduce((s, p) => s + p.y, 0) / members.length,
      }
    })
    if (next.every((c, j) => Math.hypot(c.x - centroids[j].x, c.y - centroids[j].y) < 0.5)) break
    centroids = next
  }
  return steps
}

// Initialisation volontairement éloignée pour que la convergence se voie
const STEPS = kmeans(POINTS, [{ x: 450, y: 110 }, { x: 960, y: 120 }, { x: 760, y: 570 }])

const ENTRANCE = 1200 // ms pour poser les points
const STEP_EVERY = 700 // ms entre deux itérations
const MOUSE_RADIUS = 90

export default function DataField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const css = getComputedStyle(document.documentElement)
    const colors = [css.getPropertyValue('--accent'), css.getPropertyValue('--highlight'), css.getPropertyValue('--tertiary')].map((c) => c.trim())
    const muted = css.getPropertyValue('--muted').trim()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let size = { w: 0, h: 0, scale: 1, ox: 0, oy: 0 }
    let mouse = null
    let visible = true
    let frame = 0
    const start = performance.now()
    const offsets = POINTS.map(() => ({ x: 0, y: 0 }))

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const scale = Math.max(width / W, height / H)
      size = { w: width, h: height, scale, ox: width - W * scale, oy: (height - H * scale) / 2 }
    }

    const draw = (now) => {
      const t = reduced ? Infinity : now - start
      const enter = Math.min(1, t / ENTRANCE)
      const ease = 1 - (1 - enter) ** 3
      const stepIndex = t < ENTRANCE ? -1 : Math.min(STEPS.length - 1, Math.floor((t - ENTRANCE) / STEP_EVERY))
      const step = STEPS[Math.max(0, stepIndex)]
      const { scale, ox, oy } = size

      ctx.clearRect(0, 0, size.w, size.h)

      POINTS.forEach((p, i) => {
        // Écart à la souris (en coordonnées des données)
        const o = offsets[i]
        let tx = 0
        let ty = 0
        if (mouse && !reduced) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d = Math.hypot(dx, dy)
          if (d < MOUSE_RADIUS && d > 0) {
            const push = (MOUSE_RADIUS - d) * 0.5
            tx = (dx / d) * push
            ty = (dy / d) * push
          }
        }
        o.x += (tx - o.x) * 0.15
        o.y += (ty - o.y) * 0.15

        const x = p.sx + (p.x - p.sx) * ease + o.x
        const y = p.sy + (p.y - p.sy) * ease + o.y
        ctx.globalAlpha = 0.25 + 0.6 * ease
        ctx.fillStyle = stepIndex < 0 ? muted : colors[step.labels[i]]
        ctx.beginPath()
        ctx.arc(ox + x * scale, oy + y * scale, p.r * scale * 0.9, 0, Math.PI * 2)
        ctx.fill()
      })

      if (stepIndex >= 0) {
        ctx.globalAlpha = 1
        ctx.lineWidth = 1.5
        // Glissement des centroïdes depuis l'étape précédente, en fonction du temps
        const prev = STEPS[Math.max(0, stepIndex - 1)].centroids
        const k = Math.min(1, (t - ENTRANCE - stepIndex * STEP_EVERY) / 500)
        const glide = stepIndex === 0 ? 1 : 1 - (1 - k) ** 3
        step.centroids.forEach((c, j) => {
          const cx = ox + (prev[j].x + (c.x - prev[j].x) * glide) * scale
          const cy = oy + (prev[j].y + (c.y - prev[j].y) * glide) * scale
          const arm = 10 * scale
          ctx.strokeStyle = colors[j]
          ctx.beginPath()
          ctx.moveTo(cx - arm, cy); ctx.lineTo(cx + arm, cy)
          ctx.moveTo(cx, cy - arm); ctx.lineTo(cx, cy + arm)
          ctx.stroke()
        })
      }
    }

    const loop = (now) => {
      draw(now)
      if (visible && !reduced) frame = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom
      mouse = inside
        ? { x: (e.clientX - rect.left - size.ox) / size.scale, y: (e.clientY - rect.top - size.oy) / size.scale }
        : null
    }

    const resizeObserver = new ResizeObserver(() => { resize(); if (reduced) draw(performance.now()) })
    resizeObserver.observe(canvas)

    // ponytail: boucle continue tant que le Hero est visible (200 points, coût négligeable)
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (visible && !reduced) frame = requestAnimationFrame(loop)
    })
    visibility.observe(canvas)

    window.addEventListener('pointermove', onMove, { passive: true })
    resize()
    if (reduced) draw(performance.now())

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibility.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="datafield" aria-hidden="true" />
}
