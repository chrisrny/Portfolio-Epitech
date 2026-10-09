import './Skills.css'

const CATEGORIES = [
  {
    filename: 'frontend.tsx',
    prompt: 'ls frontend/',
    skills: ['Next.js', 'TypeScript', 'React', 'HTML / CSS', 'Figma / UX'],
  },
  {
    filename: 'backend.ts',
    prompt: 'ls backend/',
    skills: ['Node.js / Express', 'Python', 'Java (POO)', 'PostgreSQL / Prisma', 'MongoDB', 'API REST / JWT'],
  },
  {
    filename: 'tools.sh',
    prompt: 'ls tools/',
    skills: ['Git / GitHub', 'Docker', 'CI/CD', 'Linux / Shell'],
  },
  {
    filename: 'data_ia.ipynb',
    prompt: 'ls data_ia/',
    skills: [
      'Pandas / Scikit-learn',
      'XGBoost / ML',
      'Streamlit / Jupyter',
      'NLP / NLTK',
      'LLM & chatbots',
      'Sécurité des LLM',
    ],
  },
]

function treeBranch(index, total) {
  return index === total - 1 ? '└──' : '├──'
}

export default function Skills() {
  return (
    <section className="section section--alt" id="skills">
      <span className="section__watermark" aria-hidden="true">02</span>

      <div className="container">
        <div className="section__header reveal">
          <span className="section__tag">Compétences</span>
          <h2 className="section__title">Ce avec quoi<br />je travaille</h2>
        </div>

        <div className="skills__grid">
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.filename}
              className={`skills__terminal reveal reveal--d${Math.min(i + 1, 6)}`}
            >
              <div className="skills__term-header">
                <div className="skills__term-dots">
                  <span className="skills__term-dot" />
                  <span className="skills__term-dot" />
                  <span className="skills__term-dot" />
                </div>
                <span className="skills__term-filename">{cat.filename}</span>
              </div>

              <div className="skills__term-body">
                <p className="skills__prompt">{cat.prompt}</p>
                <ul className="skills__tree">
                  {cat.skills.map((skill, j) => (
                    <li key={skill} className="skills__tree-item">
                      <span className="skills__tree-branch">
                        {treeBranch(j, cat.skills.length)}
                      </span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
