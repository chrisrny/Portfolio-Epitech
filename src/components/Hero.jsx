import { useState, useEffect } from 'react'
import './Hero.css'
import { site } from '../config/site'

const TAGLINE = "// De la rigueur logique à la prédiction concrète : j'apprends à développer des applications guidées par la donnée."

export default function Hero() {
  const [typed, setTyped] = useState('')
  const [given, ...familyParts] = (site.fullName || 'Christophe R').split(' ')
  const family = familyParts.join(' ')

  useEffect(() => {
    let intervalId
    const delayId = window.setTimeout(() => {
      let i = 0
      intervalId = window.setInterval(() => {
        i += 1
        setTyped(TAGLINE.slice(0, i))
        if (i >= TAGLINE.length && intervalId) {
          window.clearInterval(intervalId)
          intervalId = undefined
        }
      }, 38)
    }, 900)
    return () => {
      window.clearTimeout(delayId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [])

  const typingDone = typed.length >= TAGLINE.length

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__grid" />
        <div className="hero__glow" />
      </div>

      <div className="container">
        <div className="hero__content">
          <p className="hero__greeting">Bonjour, je m'appelle</p>

          <h1 className="hero__name">
            <span className="hero__name-given">{given}</span>
            <span className="hero__name-outline">{family}</span>
          </h1>

          <p className="hero__tagline" aria-label={TAGLINE}>
            {typed}
            {!typingDone && <span className="hero__cursor" aria-hidden="true" />}
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">Voir mes projets →</a>
            <a href="#contact"  className="btn btn--ghost">Me contacter</a>
          </div>
        </div>
      </div>
    </section>
  )
}