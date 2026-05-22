import { useState } from 'react'
import './Contact.css'

// ─── ICONES SVG ───
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
)

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.18 2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.07 6.07l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const CHANNELS = [
  {
    label: 'email',
    val: 'christophe.rajaonarivony@epitech.eu',
    href: 'mailto:christophe.rajaonarivony@epitech.eu',
    external: false,
    icon: <MailIcon />,
  },
  {
    label: 'téléphone',
    val: '06 28 90 88 36',
    href: 'tel:+33628908836',
    external: false,
    icon: <PhoneIcon />,
  },
  {
    label: 'github',
    val: 'github.com/chrisrny',
    href: 'https://github.com/chrisrny',
    external: true,
    icon: <GithubIcon />,
  },
  {
    label: 'linkedin',
    val: 'linkedin.com/in/christophe-rajaonarivony',
    href: 'https://www.linkedin.com/in/christophe-rajaonarivony',
    external: true,
    icon: <LinkedinIcon />,
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('Envoi en cours...')

    // Récupération sécurisée de la clé depuis le fichier .env via Vite
    const formData = new FormData()
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('message', form.message)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setStatus('Message reçu ! Je vous réponds dès que possible.')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus("Une erreur est survenue. Veuillez réessayer.")
      }
    } catch (error) {
      setStatus("Impossible d'envoyer le message pour le moment.")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 6000)
    }
  }

  return (
    <section className="section section--alt" id="contact">
      <span className="section__watermark" aria-hidden="true">06</span>

      <div className="container">
        <div className="section__header reveal">
          <span className="section__tag">Contact</span>
          <h2 className="section__title">Parlons-en</h2>
          <p className="section__subtitle">
            Un projet en tête ou envie de me contacter ? Envoyez-moi un message.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info - Gros boutons avec icônes */}
          <div className="contact__info reveal reveal--d1">
            {CHANNELS.map(({ label, val, href, external, icon }) => (
              <a
                key={label}
                href={href}
                className="contact__big-btn"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <div className="contact__big-btn-content">
                  <span className="contact__big-btn-title">{label}</span>
                  <span className="contact__big-btn-desc">{val}</span>
                </div>
                <div className="contact__big-btn-icon">
                  {icon}
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <form
            className="contact__form reveal reveal--d2"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-field">
              <label htmlFor="name" className="form-label">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-field">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="votre@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-field">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-input form-input--textarea"
                placeholder="Votre message..."
                value={form.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <button type="submit" className="btn btn--primary btn--full" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : 'Envoyer le message →'}
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}