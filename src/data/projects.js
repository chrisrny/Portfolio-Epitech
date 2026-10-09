export const PROJECTS = [
  {
    id: 'stage-catalogue',
    category: 'pro',
    title: 'Catalogue & facturation',
    summary: 'Site vitrine + back-office pour un revendeur de luxe d’occasion (stage).',
    description:
      "Réalisé en stage pour une micro-entreprise qui revend des vêtements de luxe sur Vinted et Vestiaire Collective : catalogue public qui redirige vers les annonces, back-office de saisie des articles, suivi des ventes et des marges, et génération de factures PDF.",
    highlights: [
      'Double vente impossible : contrainte unique en base + retrait auto de l’annonce Vestiaire',
      'Facturation conforme : numérotation atomique, factures immuables, avoirs',
      'Intégration API vendeur Vestiaire Collective, testée contre un faux serveur',
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind', 'Cloudinary'],
    github: null,
    live: null,
  },
  {
    id: 'cvrie',
    category: 'school',
    title: 'CVRIE — IA médicale',
    summary: 'Classification de lésions de la peau et clustering de témoignages patients.',
    description:
      "IA médicale en machine learning classique : classification d'images dermatoscopiques du dataset HAM10000 (10 015 images, 7 diagnostics, fort déséquilibre de classes) et clustering non supervisé de témoignages de patients.",
    highlights: [
      'Split train/test par lésion pour éviter les fuites de données',
      'Gestion d’un déséquilibre ×58 entre classes, choix de métriques adaptées',
      'Partie non supervisée : regroupement de témoignages patients',
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    github: null,
    live: null,
  },
  {
    id: 'codename',
    category: 'school',
    title: 'Codename — sécurité LLM',
    summary: 'Durcir un LLM local pour qu’il garde un secret face aux injections de prompt.',
    description:
      "Un LLM local (Ollama) doit protéger un mot de code et ne le révéler qu'avec le bon mot de passe. Itérations successives du prompt système (10 versions) testées contre des attaques par injection : autorité, encodage, injection indirecte, override et changement de persona.",
    highlights: [
      '5 familles d’attaques par injection de prompt',
      '10 versions du Modelfile, paramètres déterministes pour comparer',
      'Modèle Granite 3.1 MoE servi en local avec Ollama',
    ],
    tech: ['LLM', 'Ollama', 'Prompt engineering', 'Cybersécurité'],
    github: null,
    live: null,
  },
  {
    id: '2dgame',
    category: 'school',
    title: '2D Game — roguelite',
    summary: 'Action-roguelite en vue de dessus en Java avec libGDX (en cours).',
    description:
      "Jeu en binôme : trois salles d'ennemis, une relique à choisir après chaque salle, puis un boss en deux phases. Les règles du jeu vivent dans un module Java pur, séparé de l'affichage libGDX, ce qui permet de les tester sans ouvrir de fenêtre.",
    highlights: [
      'Séparation modèle / vue garantie par le build Gradle multi-modules',
      'Design patterns : State, Strategy, Observer, Factory',
      'Tests JUnit 5 + couverture JaCoCo, PR relues en binôme',
    ],
    tech: ['Java 21', 'libGDX', 'Gradle', 'JUnit', 'POO'],
    github: null,
    live: null,
  },
  {
    id: 'job-aggregator',
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
    github: 'https://github.com/chrisrny/Job-Aggregator-',
    live: null,
  },
  {
    id: 'nextbuy',
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
  "Je présente des projets complémentaires : un projet réel en stage (catalogue & facturation), data & ML (CVRIE, NextBuy, TARDIS), sécurité des LLM (Codename), jeu vidéo en Java (2D Game), plateforme fullstack (Job Aggregator), NLP (Bookworm), IA conversationnelle orientée business (SneakR) et conception UX→MVP (Yowl).",
  "Chaque projet documente des choix (stack, modèle, périmètre MVP), des limites assumées et répond à des problématiques concrètes ; c'est cette rigueur technique et ce sens produit que j'aime mettre en avant.",
  "Grâce notamment à la pédagogie EPITECH, j'ai pu m'exercer sur ces projets par la pratique et apprendre à travailler en équipe, un élément crucial pour chacun d'entre eux.",
]
