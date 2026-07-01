import { useState } from 'react'
import './About.css'
import { site } from '../config/site'

const META = [
  { key: 'nom', val: site.fullName },
  { key: 'école', val: 'EPITECH — MLH' },
  { key: 'ville', val: site.city },
  { key: 'statut', val: 'Disponible pour un stage', highlight: true },
]

export default function About() {
  const [photoError, setPhotoError] = useState(false)
  const showPlaceholder = !site.profileImage || photoError

  return (
    <section className="section" id="about">
      <span className="section__watermark" aria-hidden="true">01</span>

      <div className="container">
        <div className="section__header reveal">
          <span className="section__tag">À propos</span>
          <h2 className="section__title">Qui suis-je ?</h2>
        </div>

        <div className="about__grid">
          {/* Text */}
          <div className="about__body">
            <p className="about__bio reveal reveal--d2">
              Mon parcours a commencé par une première année en Licence Maths/Informatique à l'UHA. Si j'y ai développé une vraie rigueur logique, j'avais un besoin de concret. C'est ce déclic qui m'a mené à EPITECH, où ma méthode d'apprentissage prend tout son sens à travers la réalisation de projets réels et concrets.
            </p>
            <p className="about__bio reveal reveal--d3">
              Aujourd'hui, bien que j'aie pu découvrir et approfondir mes connaissances dans différents domaines de l'informatique tels que la cybersécurité, le full stack web, l'UI/UX, la data et l'IA, je compte à terme me spécialiser en data et IA. J'ai pu nottament acquérir de solides compétences en Web et des bases bien construites en data et IA. Pour moi, un bon code doit avant tout résoudre un problème précis et apporter une vraie valeur.
            </p>

            <div className="about__meta reveal reveal--d4">
              {META.map(({ key, val, highlight }) => (
                <div key={key} className="about__meta-row">
                  <span className="about__meta-key">{key}</span>
                  <span className={`about__meta-val${highlight ? ' about__meta-val--open' : ''}`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={site.cvFile}
              className="btn btn--primary reveal reveal--d5"
              download={site.cvDownloadFileName}
            >
              Télécharger mon CV →
            </a>
          </div>

          {/* Avatar */}
          <div className="about__avatar-wrap reveal reveal--d1">
            <div className="about__avatar">
              <div className="about__avatar-grid" aria-hidden="true" />
              {!showPlaceholder && (
                <img
                  src={site.profileImage}
                  alt={`Portrait professionnel — ${site.fullName}`}
                  className="about__avatar-photo"
                  width={400}
                  height={400}
                  onError={() => setPhotoError(true)}
                />
              )}
              {showPlaceholder && (
                <span className="about__avatar-initials">{site.initials}</span>
              )}
            </div>
            <div className="about__avatar-deco" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}