import './Experiences.css'

const EXPERIENCES = [
  {
    num: '01',
    icon: '🍔',
    title: 'Burger King — Équipier polyvalent',
    date: 'Mai 2026 — Présent',
    desc: "Job étudiant le week-end : gestion du flux des commandes sous forte cadence, travail en équipe synchronisé, respect strict des standards opérationnels et adaptabilité face au stress du rush.",
    wip: false,
  },
  {
    num: '02',
    icon: '🛍️',
    title: 'HEMA — Vendeur polyvalent',
    date: 'Mars — Sept. 2025',
    desc: "CDD en retail à fort trafic : accueil et conseil client, encaissement, gestion des priorités pour la mise en rayon, autonomie opérationnelle et développement d'un excellent sens du relationnel.",
    wip: false,
  },
]

export default function Experiences() {
  return (
    <section className="section" id="experiences">
      <span className="section__watermark" aria-hidden="true">05</span>

      <div className="container">
        <div className="section__header reveal">
          <span className="section__tag">Expériences</span>
          <h2 className="section__title">Au-delà<br />de l'école</h2>
          <p className="section__subtitle">
            Activités, événements et implications en dehors des cours.
          </p>
        </div>

        <div className="experiences__grid">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.title}
              className={`exp-card${exp.wip ? ' exp-card--wip' : ''} reveal reveal--d${i + 1}`}
            >
              <span className="exp-card__num" aria-hidden="true">{exp.num}</span>
              <span className="exp-card__icon" aria-hidden="true">{exp.icon}</span>
              <h3 className="exp-card__title">{exp.title}</h3>
              <span className="exp-card__date">{exp.date}</span>
              <p className="exp-card__desc">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}