const FORMATION = [
  {
    date: '2025 – aujourd’hui',
    title: 'Bachelor informatique',
    place: 'EPITECH Mulhouse',
    text: '2e année, spécialisation data et IA. Projets en machine learning, NLP, sécurité des LLM et développement web, réalisés en équipe.',
  },
  {
    date: '2024 – 2025',
    title: 'Licence Maths-Informatique, 1re année',
    place: 'Université de Haute-Alsace, Mulhouse',
    text: 'Bases en programmation (C++, Bash), en mathématiques et en outils informatiques.',
  },
]

const EXPERIENCES = [
  {
    date: 'Août – sept. 2026',
    title: 'Stage développeur web',
    place: 'Micro-entreprise de revente de luxe d’occasion',
    text: 'Création du site catalogue relié à Vinted et Vestiaire Collective, d’un back-office de suivi des ventes et de la facturation. Next.js, TypeScript, Prisma, PostgreSQL.',
  },
  {
    date: 'Mai 2026 – aujourd’hui',
    title: 'Équipier polyvalent',
    place: 'Burger King, job étudiant le week-end',
    text: 'Gestion des commandes à un rythme soutenu, travail en équipe et respect strict des procédures.',
  },
  {
    date: 'Mars – sept. 2025',
    title: 'Vendeur polyvalent',
    place: 'HEMA, CDD',
    text: 'Accueil et conseil client, encaissement, mise en rayon et gestion des priorités.',
  },
]

function Entries({ items }) {
  return (
    <ol className="entries">
      {items.map((e) => (
        <li key={e.title} className="entry">
          <span className="entry__date">{e.date}</span>
          <div>
            <h4 className="entry__title">{e.title}</h4>
            <p className="entry__place">{e.place}</p>
            <p className="entry__text">{e.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export default function Parcours() {
  return (
    <section className="section" id="parcours">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title">Parcours</h2>
        </header>

        <div className="section__body">
          <h3 className="subhead">Formation</h3>
          <Entries items={FORMATION} />
          <h3 className="subhead">Expériences</h3>
          <Entries items={EXPERIENCES} />
        </div>
      </div>
    </section>
  )
}
