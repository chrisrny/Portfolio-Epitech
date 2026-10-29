import './ProjectScene.css'

// Une mini-scène illustrée par projet, dans l'univers du projet.
// Uniquement des faits réels du projet (pas de chiffres inventés).

// Répartition des diagnostics du dataset HAM10000 (données publiques du dataset)
const HAM = [['nv', 6705], ['mel', 1113], ['bkl', 1099], ['bcc', 514], ['akiec', 327], ['vasc', 142], ['df', 115]]

const ATTACKS = ['Autorité', 'Encodage', 'Injection indirecte', 'Override', 'Changement de persona']

function StartTrek() {
  return (
    <div className="scene scene--space">
      <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={i} cx={(i * 97) % 400} cy={(i * 53) % 110} r={i % 5 ? 0.8 : 1.4} className="space__star" />
        ))}
        <polygon points="0,160 0,128 60,120 110,134 150,126 180,138 250,138 280,118 340,130 400,112 400,160" className="space__ground" />
        <line x1="180" y1="138" x2="250" y2="138" className="space__pad" />
        <line x1="180" y1="138" x2="180" y2="124" className="space__flag" />
        <line x1="250" y1="138" x2="250" y2="124" className="space__flag" />
        <g className="space__lander">
          <polygon points="207,0 223,0 228,12 202,12" />
          <line x1="204" y1="12" x2="198" y2="22" />
          <line x1="226" y1="12" x2="232" y2="22" />
          <polygon points="210,13 220,13 215,24" className="space__flame" />
        </g>
      </svg>
      <p className="scene__hud">LunarLander-v3 · agent PPO</p>
    </div>
  )
}

function Cvrie() {
  const max = HAM[0][1]
  return (
    <div className="scene scene--clinic">
      <p className="scene__label">HAM10000 : images par diagnostic</p>
      <ul className="clinic__bars">
        {HAM.map(([dx, n]) => (
          <li key={dx} className={dx === 'mel' ? 'is-mel' : ''}>
            <span>{dx}</span>
            <i style={{ '--v': Math.max(n / max, 0.02) }} />
            <b>{n.toLocaleString('fr-FR')}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

function NextBuy() {
  return (
    <div className="scene scene--receipt">
      <div className="receipt">
        <p className="receipt__head">NEXTBUY · Instacart</p>
        <p><span>Questions business</span><span>8</span></p>
        <p><span>Random Forest · réachat</span><span>✓</span></p>
        <p><span>XGBoost · délai commande</span><span>✓</span></p>
        <p><span>Dashboard Streamlit</span><span>✓</span></p>
        <p className="receipt__total"><span>R²</span><span>0,96</span></p>
      </div>
    </div>
  )
}

function Tardis() {
  return (
    <div className="scene scene--board">
      <div className="board">
        <p className="board__title">Retard estimé</p>
        <div className="board__row board__row--head"><span>Départ</span><span>Arrivée</span><span>Mois</span><span>Retard</span></div>
        <div className="board__row"><span>Gare A</span><span>Gare B</span><span>…</span><span className="board__blink">? min</span></div>
        <p className="board__note">TGV · Intercités · open data SNCF</p>
      </div>
    </div>
  )
}

function Codename() {
  return (
    <div className="scene scene--term">
      <p className="term__line">$ ollama run codename <span className="term__dim"># v10</span></p>
      {ATTACKS.map((a, i) => (
        <p key={a} className="term__line" style={{ '--i': i }}>
          <span className="term__dim">attaque</span> {a} <span className="term__ok">bloquée</span>
        </p>
      ))}
    </div>
  )
}

function Bookworm() {
  return (
    <div className="scene scene--book">
      <div className="book">
        <div className="book__page">
          <p>Alice was beginning to get very tired of sitting by her sister on the bank…</p>
        </div>
        <div className="book__page book__page--cmds">
          {['--lexdiv', '--topics', '--entities', '--summarize', '--similar', '--card'].map((c) => <code key={c}>{c}</code>)}
        </div>
      </div>
    </div>
  )
}

function SneakR() {
  return (
    <div className="scene scene--chat">
      <p className="chat__msg chat__msg--user"><b>vous</b> Une paire taille 43, état 5 sur 6 : je la revends combien ?</p>
      <p className="chat__msg chat__msg--bot"><b>SneakR</b> Je regarde les prix du marché et j’applique la décote d’état…<span className="chat__typing"><i /><i /><i /></span></p>
    </div>
  )
}

function Catalogue() {
  return (
    <div className="scene scene--shop">
      {['Vinted', 'Vestiaire', 'Vinted'].map((p, i) => (
        <div key={i} className={`shop__item${i === 1 ? ' is-sold' : ''}`}>
          <span className="shop__img" />
          <span className="shop__tag">{p}</span>
          {i === 1 && <span className="shop__stamp">Vendu</span>}
        </div>
      ))}
    </div>
  )
}

function JobAggregator() {
  return (
    <div className="scene scene--jobs">
      {[0.9, 0.65, 0.2].map((v, i) => (
        <div key={i} className={`job${i === 2 ? ' is-ghost' : ''}`}>
          <span className="job__title" />
          <span className="job__score"><i style={{ '--v': v }} /></span>
          {i === 2 && <em>offre fantôme</em>}
        </div>
      ))}
      <p className="scene__label">Score de pertinence par offre</p>
    </div>
  )
}

function Yowl() {
  return (
    <div className="scene scene--feed">
      <div className="phone">
        {[0, 1].map((i) => (
          <div key={i} className="post">
            <span className="post__avatar" />
            <span className="post__lines"><i /><i /></span>
            <span className="post__like">♥</span>
          </div>
        ))}
        <p className="post__find">Chercher un coéquipier · par jeu et par rang</p>
      </div>
    </div>
  )
}

function Game2D() {
  return (
    <div className="scene scene--pixel">
      <div className="pixel__hud">
        <span className="pixel__hearts">♥♥♥</span>
        <span>SALLE 1/3</span>
      </div>
      <div className="pixel__map">
        {['', '', '', 'BOSS'].map((label, i) => (
          <span key={i} className={`pixel__room${label ? ' pixel__room--boss' : ''}`}>{label}</span>
        ))}
        <span className="pixel__hero" />
      </div>
      <p className="pixel__start">CHOISIS TA RELIQUE</p>
    </div>
  )
}

const SCENES = {
  starttrek: StartTrek,
  cvrie: Cvrie,
  nextbuy: NextBuy,
  tardis: Tardis,
  codename: Codename,
  bookworm: Bookworm,
  sneakr: SneakR,
  'stage-catalogue': Catalogue,
  'job-aggregator': JobAggregator,
  yowl: Yowl,
  '2dgame': Game2D,
}

export default function ProjectScene({ id }) {
  const Scene = SCENES[id]
  return Scene ? <Scene /> : null
}
