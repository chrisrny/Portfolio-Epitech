import './Footer.css'
import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>&copy; {new Date().getFullYear()} {site.fullName}</p>
        <nav className="footer__links" aria-label="Liens externes">
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </nav>
      </div>
    </footer>
  )
}
