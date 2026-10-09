import './Footer.css'
import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} — {site.fullName}
        </p>

        <nav className="footer__links" aria-label="Liens footer">
          <a
            href={site.githubUrl}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={site.linkedinUrl}
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="#contact" className="footer__link">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
