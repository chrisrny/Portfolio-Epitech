import './Learning.css'

const TIMELINE = [
  {
    date: '2024 — 2025',
    title: 'Licence Maths / Info — UHA',
    text: 'Première année universitaire à la faculté des sciences (Mulhouse) : bases en programmation (C++, Bash), analyse et outils informatiques avant d’intégrer EPITECH.',
    skills: ['C++', 'Bash', 'Maths'],
    wip: false,
  },
  {
    date: '2025 — EPITECH',
    title: 'Bachelor Informatique',
    text: 'Modules web, cybersécurité, bases de données, UX/UI et data/IA. Projets transverses : agrégateur d’offres, analyse e-commerce, NLP, chatbot métier et product design.',
    skills: ['Python', 'React', 'Docker', 'ML'],
    wip: false,
  },
  {
    date: 'Juin — Août 2026',
    title: 'Stage en entreprise',
    text: 'Recherche d’un stage d’un mois pour appliquer mes compétences en développement et data en contexte professionnel.',
    skills: ['Stage', 'Fullstack', 'Data'],
    wip: true,
  },
]

export default function Learning() {
  return (
    <section className="section section--alt" id="learning">
      <span className="section__watermark" aria-hidden="true">04</span>

      <div className="container">
        <div className="section__header reveal">
          <span className="section__tag">Apprentissage</span>
          <h2 className="section__title">Progression<br />&amp; évolution</h2>
          <p className="section__subtitle">
            Ce que j'ai appris, comment j'ai progressé et où je vais.
          </p>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div
              key={item.date}
              className={`timeline__item${item.wip ? ' timeline__item--wip' : ''} reveal reveal--d${i + 1}`}
            >
              <div className={`timeline__dot${item.wip ? ' timeline__dot--wip' : ''}`} />
              <div className="timeline__content">
                <span className="timeline__date">{item.date}</span>
                <h3 className="timeline__title">{item.title}</h3>
                <p className="timeline__text">{item.text}</p>
                <ul className="timeline__skills">
                  {item.skills.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
