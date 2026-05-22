import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand"></span>

        <p className="footer__copy">
          &copy; {new Date().getFullYear()} — Christophe Rajaonarivony
        </p>

        <nav className="footer__links" aria-label="Liens footer">
          <a
            href="https://github.com/chrisrny"
            className="footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a href="#contact" className="footer__link">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
