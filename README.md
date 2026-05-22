# Portfolio EPITECH

Site vitrine React (Vite), responsive, prévu pour être publié (ex. GitHub Pages).

## Pile technique (recommandations sujet)

- **Préprocesseur CSS** : [Sass](https://sass-lang.com/) (`src/styles/global.scss`)
- **Post-traitement** : [PostCSS](https://postcss.org/) + [Autoprefixer](https://github.com/postcss/autoprefixer) (`postcss.config.js`)
- **Convention** : nomenclature type **BEM** sur les composants (`hero__`, `nav__`, etc.)

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## À personnaliser

Voir `src/config/site.js`, `public/README-ASSETS.md`, et les tableaux fictifs dans `Projects.jsx`, `Experiences.jsx` (remplacer par tes vrais projets / expériences).

Pour **GitHub Pages** avec une URL du type `/repo/`, ajoute dans `vite.config.js` :  
`base: '/nom-du-repo/'` puis déploie le contenu du dossier `dist/`.
