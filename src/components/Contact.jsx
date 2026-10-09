import { useState } from 'react'
import './Contact.css'
import { site } from '../config/site'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState(null) // { text, error }
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ text: 'Envoi en cours…', error: false })

    const formData = new FormData()
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY)
    Object.entries(form).forEach(([key, value]) => formData.append(key, value))

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await response.json()
      if (!data.success) throw new Error(data.message)
      setStatus({ text: 'Message envoyé. Je vous réponds rapidement.', error: false })
      setForm(EMPTY)
    } catch {
      setStatus({ text: `L'envoi a échoué. Écrivez-moi directement à ${site.email}.`, error: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <header className="section__head">
          <h2 className="section__title">Contact</h2>
          <p className="section__note">Pour un stage, un projet ou une question.</p>
        </header>

        <div className="section__body contact">
          <div>
            <a href={`mailto:${site.email}`} className="contact__email link">{site.email}</a>
            <dl className="contact__list">
              <div>
                <dt>Téléphone</dt>
                <dd><a href={site.phoneHref}>{site.phone}</a></dd>
              </div>
              <div>
                <dt>LinkedIn</dt>
                <dd><a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer">christophe-rajaonarivony</a></dd>
              </div>
              <div>
                <dt>GitHub</dt>
                <dd><a href={site.githubUrl} target="_blank" rel="noopener noreferrer">chrisrny</a></dd>
              </div>
            </dl>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <label className="field">
                <span>Nom</span>
                <input type="text" name="name" autoComplete="name" value={form.name} onChange={handleChange} required disabled={isSubmitting} />
              </label>
              <label className="field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} required disabled={isSubmitting} />
              </label>
            </div>
            <label className="field">
              <span>Message</span>
              <textarea name="message" rows={6} value={form.message} onChange={handleChange} required disabled={isSubmitting} />
            </label>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi…' : 'Envoyer le message'}
            </button>

            {status && (
              <p className={`contact__status${status.error ? ' contact__status--error' : ''}`} role="status">
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
