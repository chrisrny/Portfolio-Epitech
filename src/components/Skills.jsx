const GROUPS = [
  ['Data et machine learning', 'Python, pandas, NumPy, scikit-learn, XGBoost, Matplotlib, Jupyter, Streamlit'],
  ['NLP et LLM', 'NLTK, LLM locaux avec Ollama, prompt engineering, sécurité des LLM (injection de prompt)'],
  ['Bases de données', 'SQL, PostgreSQL, Prisma, MongoDB'],
  ['Développement', 'TypeScript, React, Next.js, Node.js et Express, API REST, Java'],
  ['Outils', 'Git et GitHub, Docker, CI/CD avec GitHub Actions, Linux et Bash'],
]

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title">Compétences</h2>
          <p className="section__note">Ce que j'ai réellement utilisé en projet.</p>
        </header>

        <dl className="section__body entries">
          {GROUPS.map(([label, items]) => (
            <div key={label} className="entry">
              <dt className="entry__label">{label}</dt>
              <dd className="entry__text">{items}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
