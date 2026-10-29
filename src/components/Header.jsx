import { useState, useEffect } from 'react'
import './Header.css'

const NAV_LINKS = [
  { href: '#data',        label: 'Data & IA' },
  { href: '#about',       label: 'À propos' },
  { href: '#skills',      label: 'Compétences' },
  { href: '#projects',    label: 'Projets' },
  { href: '#parcours',    label: 'Parcours' },
  { href: '#contact',     label: 'Contact' },
]

export default function Header() {
  const [scrolled,    setScrolled]  = useState(false)
  const [menuOpen,    setMenuOpen]  = useState(false)
  const [activeLink,  setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <nav className="nav container">
        <a href="#home" className="nav__logo">Christophe Rajaonarivony</a>

        <ul className={`nav__list${menuOpen ? ' nav__list--open' : ''}`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href} className="nav__item">
              <a
                href={href}
                className={`nav__link${activeLink === href ? ' nav__link--active' : ''}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav__toggle${menuOpen ? ' nav__toggle--open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>
    </header>
  )
}
