const EPITECH_ORG = 'https://github.com/EpitechBachelorPromo2028'

export const PROJECTS = [
  {
    id: 'job-aggregator',
    num: '01',
    category: 'school',
    title: 'Job Aggregator',
    summary: "Plateforme d'agrégation d'offres tech avec API WeLoveDevs et stack dockerisée.",
    description:
      "Agrégateur d'offres d'emploi et de stages : ingestion WeLoveDevs (pagination, rate limit), API REST Node/Express, auth JWT, rôles user/admin, PostgreSQL, Docker Compose. Dashboard Next.js avec score de pertinence, analytics admin et classification légère par extraction de mots-clés.",
    highlights: [
      'Ingestion & normalisation des offres (HTML → champs structurés)',
      'Score de pertinence + détection offres « fantômes »',
      'CI GitHub Actions, tests API & accessibilité WCAG',
    ],
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Docker', 'CI/CD'],
    github: `https://github.com/chrisrny/Job-Aggregator-`,
    live: null,
  },
  {
    id: 'nextbuy',
    num: '02',
    category: 'school',
    title: 'NextBuy',
    summary: 'EDA e-commerce + 2 modèles ML et dashboard Streamlit de recommandations.',
    description:
      "Analyse e-commerce (Instacart) : 8 insights business en EDA, deux modèles ML — Random Forest pour prédire le réachat (~75–80 % d'accuracy) et XGBoost pour estimer les jours avant la prochaine commande (R² ≈ 0,96) — plus dashboard Streamlit de recommandations.",
    highlights: [
      '8 questions business traitées en visualisations',
      'Random Forest : prédiction de réachat par produit',
      'XGBoost : délai avant prochaine commande (R² ≈ 0,96)',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Streamlit', 'Jupyter'],
    github: 'https://github.com/chrisrny/Nextbuy',
    live: null,
  },
  {
    id: 'tardis',
    num: '03',
    category: 'school',
    title: 'TARDIS',
    summary: 'Prédiction des retards SNCF et dashboard Streamlit interactif.',
    description:
      "Prédiction des retards SNCF (TGV/Intercités) : nettoyage et feature engineering sur données open data, Random Forest Regressor avec validation croisée, dashboard Streamlit pour estimer un retard en minutes selon gare, route et mois.",
    highlights: [
      'Pipeline EDA → cleaned_dataset.csv',
      '11+ features (historique gares, taux annulation…)',
      'Interface : gare départ/arrivée + mois → retard estimé',
    ],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Streamlit', 'Jupyter'],
    github: 'https://github.com/chrisrny/Tardis',
    live: null,
  },
  {
    id: 'sneakr-eliza',
    num: '04',
    category: 'school',
    title: 'SneakR — Eliza',
    summary: 'Chatbot Discord d’estimation de prix sneakers avec LLM local.',
    description:
      "Chatbot métier pour revendeurs de sneakers : estimation de prix selon modèle, taille EU et état (1–6), API marché Kicks.dev + LLM local (Llama 3.1), bot Discord, landing page, cadrage business (KPI, ROI, analyse éthique GDPR).",
    highlights: [
      'Grille d’état 1–6 avec règles de décote automatiques',
      'Données marché live via API Kicks.dev',
      'Rapport business + analyse éthique (ELIZA effect, GDPR)',
    ],
    tech: ['Python', 'Discord', 'LLM', 'API REST', 'Product'],
    github: 'https://github.com/chrisrny/Eliza',
    live: null,
  },
  {
    id: 'bookworm',
    num: '05',
    category: 'school',
    title: 'Alice in Wonderland',
    summary: 'CLI NLP — book cards à partir de livres Project Gutenberg.',
    description:
      "Moteur NLP CLI (bookworm.py) sur livres Project Gutenberg : diversité lexicale, topics, NER personnages/lieux (NLTK), résumé, similarité cosinus sur 20 œuvres de référence et génération de book cards JSON avec cache des résultats.",
    highlights: [
      'Commandes : --lexdiv, --topics, --entities, --summarize, --similar, --card',
      'NER personnages & lieux (NLTK)',
      'Similarité cosinus sur corpus de 20 livres',
    ],
    tech: ['Python', 'NLTK', 'CLI', 'NLP'],
    github: 'https://github.com/chrisrny/Alice-in-Wonderland',
    live: null,
  },
  {
    id: 'yowl',
    num: '06',
    category: 'school',
    title: 'Yowl — Next Level',
    summary: 'Réseau social gaming : design Figma + MVP Next.js.',
    description:
      "Product design d'un réseau social gaming : recherche utilisateur, personas, parcours, wireframes/mockups Figma, tests peers, MVP Next.js (feed, posts image/vidéo, likes, recherche coéquipiers par jeu et rang, modération).",
    highlights: [
      'Personas & parcours utilisateur documentés',
      'Prototype Figma cliquable (parcours principal)',
      'MVP : feed, posts, likes, recherche mates par jeu/rang',
    ],
    tech: ['Next.js', 'MongoDB', 'Figma', 'UX/UI', 'Product'],
    github: 'https://github.com/chrisrny/YOWL',
    live:
      'https://www.figma.com/proto/lEGPJc2VSRsEQGROEieSMj/Twitter-UI-Screens--Community-?node-id=4-1224',
  },
]

export const REFLECTION_PARAGRAPHS = [
  "Je présente des projets complémentaires : data & ML (NextBuy, TARDIS), plateforme fullstack produit (Job Aggregator), NLP (Bookworm), IA conversationnelle orientée business (SneakR) et conception UX→MVP (Yowl).",
  "Chaque projet documente des choix (stack, modèle, périmètre MVP), des limites assumées et répond à des problématiques concrètes ; c'est cette rigueur technique et ce sens produit que j'aime mettre en avant.",
  "J'ai pu , nottament grâce à la methode d'enseignement EPITECH , m'éxercer sur ces projets à travers la pratique et l'apprentissage du travail d'équipe qui a été un élement crucial pour chacun de ces projets ."
]
