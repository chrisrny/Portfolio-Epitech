import { useEffect, useState } from 'react'
import '../styles/global.scss'
import './components/Projects.css' // Ajuste le chemin si besoin

// ── Imports de tes composants ──
import Skills from './components/Skills'
import Contact from './components/Contact'
import Projects from './components/Projects' // (Vérifie que le chemin est bon)

const NAME = 'Christophe'.split('')

const NAV_LINKS = [
  { label: 'Qui suis-je', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
]

const SKILLS = [
  'Web Full-Stack',
  'Machine Learning',
  'SQL',
  'Cybersécurité',
  'UI/UX Design',
  'Python',
  'Jupyter Notebook',
  'Data Science',
]

const PROJECTS = [
  {
    id: 1,
    num: '01',
    category: 'school',
    title: 'Projet 1',
    description: "description",
    tech: ['javascript'],
    github: '#',
  },
  {
    id: 2,
    num: '02',
    category: 'school',
    title: 'Projet 2',
    description: "description",
    tech: ['python',],
    github: '#',
  },
  {
    id: 3,
    num: '03',
    category: 'personal',
    title: 'Projet 3',
    description: "description",
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: '#',
    live: '#',
  },
]

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.aos, .reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div>

      {/* ── Top bar ── */}
      <header className={`topbar${scrolled ? ' topbar--scrolled' : ''}`}>
        <a href="#" className="topbar-logo">
          <span className="logo-sep" />
          <span className="logo-name">Christophe Rajaonarivony</span>
        </a>
        <nav className="topbar-nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link">{label}</a>
          ))}
          <a href="#contact" className="nav-cta">Contact</a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />

        <div className="hero-layout">
          {/* Left — text */}
          <div className="hero-inner">
            <span className="hero-eyebrow">
              <span className="prompt-arrow">~/portfolio</span>
            </span>
            <h1 className="hero-name" aria-label="Christophe">
              {NAME.map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter"
                  style={{ animationDelay: `${0.32 + i * 0.055}s` }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <p className="hero-lastname">Rajaonarivony</p>
            <div className="hero-rule">
              <span className="rule-line" />
            </div>
            <p className="hero-tagline">
              Étudiant B1 à <em>EPITECH</em>&nbsp;·&nbsp;Développeur&nbsp;·&nbsp;Mulhouse
            </p>
          </div>

          {/* Right — photo */}
          <div className="hero-photo-wrap">
            <div className="photo-frame">
              {/* Corner brackets */}
              <span className="fc fc--tl" /><span className="fc fc--tr" />
              <span className="fc fc--bl" /><span className="fc fc--br" />
              <img src="/Christophe Rajaonarivony.jpg" alt="Christophe Rajaonarivony" className="photo-img" />
            </div>
          </div>
        </div>

      </section>

      {/* ── Qui suis-je ? ── */}
      <section className="about" id="about">
        <div className="about-container">

          {/* Silhouette illustration */}
          <div className="about-illustration aos">
            <svg className="silhouette-svg" viewBox="0 0 260 380" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* ... (SVG conservé tel quel) ... */}
              <circle cx="130" cy="190" r="120" stroke="rgba(110,189,184,0.12)" strokeWidth="1" strokeDasharray="5 9"/>
              <path d="M10 40 L10 10 L40 10" stroke="rgba(110,189,184,0.35)" strokeWidth="1.5" fill="none"/>
              <path d="M250 40 L250 10 L220 10" stroke="rgba(110,189,184,0.35)" strokeWidth="1.5" fill="none"/>
              <path d="M10 340 L10 370 L40 370" stroke="rgba(110,189,184,0.35)" strokeWidth="1.5" fill="none"/>
              <path d="M250 340 L250 370 L220 370" stroke="rgba(110,189,184,0.35)" strokeWidth="1.5" fill="none"/>
              <ellipse cx="130" cy="118" rx="50" ry="54" fill="#1E2D45" stroke="rgba(61,84,112,0.6)" strokeWidth="1"/>
              <path d="M18 380 C18 268 68 232 130 230 C192 232 242 268 242 380Z" fill="#1E2D45" stroke="rgba(61,84,112,0.6)" strokeWidth="1"/>
              <rect x="108" y="162" width="44" height="22" rx="4" fill="#1E2D45"/>
              <text x="130" y="165" textAnchor="middle" fontSize="108" fontWeight="800" fontFamily="Syne, sans-serif" fill="#6EBDB8" opacity="0.9">?</text>
              <line x1="18" y1="190" x2="242" y2="190" stroke="rgba(110,189,184,0.06)" strokeWidth="1"/>
              <circle cx="18"  cy="190" r="2.5" fill="rgba(110,189,184,0.4)"/>
              <circle cx="242" cy="190" r="2.5" fill="rgba(110,189,184,0.4)"/>
            </svg>
          </div>

          <div className="about-body">
            <span className="index-number">// section_01</span>
            <h2 className="about-heading aos" style={{ transitionDelay: '0.08s' }}>
              <span className="about-heading-underline">Qui suis-je&nbsp;?</span>
            </h2>
            <p className="about-para aos" style={{ transitionDelay: '0.24s' }}>
              Étudiant en première année de Bachelor à EPITECH Mulhouse, je suis passionné
              par l'informatique et les nouvelles technologies. Je développe chaque jour mes
              compétences en programmation à travers la pédagogie par projets, une approche
              qui m'a permis de confronter ma théorie à des cas concrets et exigeants.
            </p>
            <p className="about-para aos" style={{ transitionDelay: '0.32s' }}>
              Du développement web full-stack à la data science en passant par le machine
              learning et la cybersécurité, j'aime explorer des domaines variés avec la même
              rigueur.
            </p>
          </div>
        </div>
      </section>

      {/* ── Skills marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...SKILLS, ...SKILLS].map((skill, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* ── Composant Skills (Terminaux) ── */}
      <Skills />
      <Projects />
      

      {/* ── Composant Contact ── */}
      <Contact />

    </div>
  )
}