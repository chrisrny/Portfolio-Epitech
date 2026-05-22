/**
 * Configuration du portfolio — à personnaliser.
 * Assets : ajoute tes fichiers dans le dossier /public à la racine du projet.
 */
export const site = {
  /** Nom affiché (SEO + footer + hero) */
  fullName: 'Christophe Rajaonarivony',

  initials: 'CA',

  /** Ville ou région (section À propos) */
  city: 'Colmar',

  /**
   * Photo professionnelle : chemin depuis la racine du site (fichier dans /public).
   * Ex. '/profile.jpg' — laisse vide pour n'afficher que les initiales.
   */
  profileImage: '/profile.png',

  /** CV au format PDF dans /public */
  cvFile: '/cv.pdf',
  cvDownloadFileName: 'CV-Christophe-Rajaonarivony.pdf',

  /**
   * URL publique après déploiement (pour Open Graph dans index.html —
   * mets aussi la même valeur dans index.html méta og:url ou remplace après build).
   */
  siteUrl: 'https://christopherajaonarivony.github.io/portfolio/',

  /** Ex. https://www.linkedin.com/in/ton-profil — laisse vide pour masquer le bouton LinkedIn */
  linkedinUrl: '',
}
