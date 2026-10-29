// Ordre = ordre d'affichage. Les 3 premiers sont mis en avant dans le Hero.
// `result` : uniquement un chiffre réellement mesuré dans le projet.
// `color` / `icon` : univers du projet (icône = tracé SVG 24×24).
export const PROJECTS = [
  {
    id: 'starttrek',
    color: '#B9A2FF',
    icon: 'M9 3h6l2 5H7z M8 8l-3 6 M16 8l3 6 M4 14h3 M17 14h3 M12 11v4 M10 18l2 3 2-3',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Poser un module lunaire sans casse, avec un score moyen d’au moins 200. Un agent qui joue au hasard fait -192.",
      "Un DQN codé de zéro (replay buffer, réseau cible) puis un PPO. Réglage d’un paramètre à la fois, sur 2 seeds.",
      "268 ± 7 de score moyen et 97 % d’atterrissages réussis avec la configuration retenue.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'Start Trek',
    summary: 'Deux agents d’apprentissage par renforcement qui apprennent à poser un module lunaire.',
    result: { value: '97 %', label: 'd’atterrissages réussis' },
    description:
      "Apprentissage par renforcement sur LunarLander (Gymnasium) : un agent DQN et un agent PPO codés en PyTorch, entraînés à poser le module sans casse. Objectif : un score moyen d'au moins 200. Un agent qui joue au hasard fait -192 et se crashe dans 92 % des cas.",
    highlights: [
      'DQN de zéro : replay buffer, réseau cible, exploration epsilon-greedy décroissante',
      'Réglage un paramètre à la fois, sur 2 seeds : la config retenue (batch 128, réseau 256×256) atteint 268 ± 7 de score moyen',
      'PPO avec environnements parallèles et GAE, jusqu’à 259 en évaluation ; comparaison des deux approches',
    ],
    tech: ['Python', 'PyTorch', 'Gymnasium', 'NumPy', 'Matplotlib', 'Jupyter'],
    github: null,
    live: null,
  },
  {
    id: 'cvrie',
    color: '#F28BA8',
    icon: 'M10 4a6 6 0 1 1 0 12a6 6 0 1 1 0-12z M14.5 14.5L20 20 M8 9h.01 M12 8.5h.01 M10.5 12h.01',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Reconnaître 7 diagnostics sur 10 015 images de peau, avec 58 fois plus de grains de beauté que de lésions rares.",
      "Repérage d’une fuite de données (split par lésion), PCA et SVC, puis comparaison de 5 variantes.",
      "Le modèle qui rate le moins de mélanomes : 0,64 de rappel, choisi plutôt que le meilleur score global.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'CVRIE',
    summary: 'Classification de lésions de la peau et clustering de témoignages de patients.',
    result: { value: '0,64', label: 'rappel sur les mélanomes' },
    description:
      "IA médicale en machine learning classique sur le dataset HAM10000 (10 015 images dermatoscopiques, 7 diagnostics, déséquilibre ×58 entre classes). Le modèle retenu n'est pas celui au meilleur score global : pour une IA médicale, rater un mélanome coûte plus cher qu'une fausse alerte.",
    highlights: [
      'Fuite de données repérée : 10 015 images pour seulement 7 470 lésions, donc split train/test par lésion. Le vrai niveau du modèle est autour de 0,40 de F1-macro, pas 0,47.',
      'Modèle retenu : StandardScaler, PCA (100 composantes) et SVC. La PCA divise le temps d’entraînement par ~20 sans perte de score.',
      'Clustering des témoignages : TF-IDF puis SVD (100 composantes), k = 17 choisi au coude et à la silhouette ; 13 à 14 clusters sur 17 sont cohérents.',
    ],
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'NLTK', 'Jupyter'],
    github: null,
    live: null,
  },
  {
    id: 'nextbuy',
    color: '#F2C27D',
    icon: 'M3 4h2l2.5 11h10L20 8H6.5 M9 19.5h.01 M17 19.5h.01',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Comprendre et anticiper les commandes des clients d’Instacart.",
      "8 questions business en visualisations, un Random Forest pour le réachat et un XGBoost pour le délai.",
      "Un R² de 0,96 sur le délai avant la prochaine commande, exposé dans un dashboard Streamlit.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'NextBuy',
    summary: 'Analyse e-commerce, deux modèles prédictifs et un dashboard de recommandations.',
    result: { value: 'R² 0,96', label: 'délai avant la prochaine commande' },
    description:
      "Analyse des commandes Instacart : 8 questions business traitées en visualisations, un Random Forest pour prédire le réachat d'un produit (75 à 80 % d'accuracy) et un XGBoost pour estimer le nombre de jours avant la prochaine commande, le tout exposé dans un dashboard Streamlit.",
    highlights: [
      '8 questions business traitées en visualisations',
      'Random Forest : prédiction du réachat par produit',
      'XGBoost : délai avant la prochaine commande (R² ≈ 0,96)',
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Streamlit', 'Jupyter'],
    github: 'https://github.com/chrisrny/Nextbuy',
    live: null,
  },
  {
    id: 'tardis',
    color: '#FFC83D',
    icon: 'M7 3h10a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z M5 10h14 M9 14h.01 M15 14h.01 M8 17l-2 4 M16 17l2 4',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Anticiper les retards des TGV et Intercités.",
      "Nettoyage des données open data SNCF, plus de 11 variables construites, Random Forest avec validation croisée.",
      "Un dashboard qui estime un retard selon la gare de départ, d’arrivée et le mois.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'TARDIS',
    summary: 'Prédiction des retards SNCF à partir des données open data.',
    result: null,
    description:
      "Prédiction des retards TGV et Intercités : nettoyage et feature engineering sur les données open data SNCF, Random Forest Regressor avec validation croisée, et un dashboard Streamlit qui estime un retard en minutes selon la gare, le trajet et le mois.",
    highlights: [
      'Pipeline de nettoyage reproductible, de l’EDA au dataset final',
      'Plus de 11 variables construites (historique des gares, taux d’annulation…)',
      'Interface : gare de départ, gare d’arrivée et mois, puis retard estimé',
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'Streamlit', 'Jupyter'],
    github: 'https://github.com/chrisrny/Tardis',
    live: null,
  },
  {
    id: 'codename',
    color: '#7EE787',
    icon: 'M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3 M12 15v2',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Empêcher un LLM local de révéler un mot de code sans le bon mot de passe.",
      "10 versions du prompt système, des paramètres déterministes pour comparer, 5 familles d’attaques.",
      "Un Modelfile testé contre l’autorité, l’encodage, l’injection indirecte, l’override et le changement de persona.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'Codename',
    summary: 'Durcir un LLM local pour qu’il garde un secret face aux injections de prompt.',
    result: null,
    description:
      "Un LLM local doit protéger un mot de code et ne le révéler qu'avec le bon mot de passe. Le prompt système a été réécrit en 10 versions, chacune testée contre cinq familles d'attaques par injection : autorité, encodage, injection indirecte, override et changement de persona.",
    highlights: [
      '5 familles d’attaques par injection de prompt',
      '10 versions du Modelfile, avec des paramètres déterministes pour comparer',
      'Modèle Granite 3.1 MoE servi en local avec Ollama',
    ],
    tech: ['LLM', 'Ollama', 'Prompt engineering', 'Sécurité', 'Python'],
    github: null,
    live: null,
  },
  {
    id: 'bookworm',
    color: '#E3C79B',
    icon: 'M3 5c3-1 6-1 9 1c3-2 6-2 9-1v14c-3-1-6-1-9 1c-3-2-6-2-9-1z M12 6v14',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Analyser automatiquement un livre entier du Project Gutenberg.",
      "NLTK pour la diversité lexicale, les thèmes, les personnages et les lieux, puis une similarité cosinus.",
      "Une commande qui génère une fiche de lecture et compare le livre à 20 œuvres de référence.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'Bookworm',
    summary: 'Outil NLP en ligne de commande qui analyse des livres du Project Gutenberg.',
    result: null,
    description:
      "Moteur NLP en ligne de commande sur des livres du Project Gutenberg : diversité lexicale, thèmes, reconnaissance des personnages et des lieux, résumé, similarité avec 20 œuvres de référence et génération de fiches de lecture en JSON.",
    highlights: [
      'Commandes : --lexdiv, --topics, --entities, --summarize, --similar, --card',
      'Reconnaissance d’entités (personnages, lieux) avec NLTK',
      'Similarité cosinus sur un corpus de 20 livres',
    ],
    tech: ['Python', 'NLTK', 'pandas', 'NLP', 'CLI'],
    github: 'https://github.com/chrisrny/Alice-in-Wonderland',
    live: null,
  },
  {
    id: 'sneakr',
    color: '#5865F2',
    icon: 'M3 15l2-7 4 2 3 3 6 1c2 0 3 1 3 3H3z M3 18h18',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Aider les revendeurs à estimer le prix d’une paire de sneakers.",
      "Prix du marché via l’API Kicks.dev, grille d’état de 1 à 6, LLM local Llama 3.1.",
      "Un bot Discord, avec un cadrage business (KPI, ROI) et une analyse éthique.",
    ],
    domain: 'Data & IA',
    context: 'EPITECH',
    title: 'SneakR',
    summary: 'Chatbot Discord qui estime le prix de revente d’une paire de sneakers.',
    result: null,
    description:
      "Chatbot métier pour revendeurs : estimation du prix selon le modèle, la taille et l'état de la paire, à partir des données de marché de l'API Kicks.dev et d'un LLM local (Llama 3.1). Livré avec un cadrage business (KPI, ROI) et une analyse éthique.",
    highlights: [
      'Grille d’état de 1 à 6 avec règles de décote automatiques',
      'Données de marché en direct via l’API Kicks.dev',
      'Rapport business et analyse éthique (effet ELIZA, RGPD)',
    ],
    tech: ['Python', 'LLM', 'Discord', 'API REST'],
    github: 'https://github.com/chrisrny/Eliza',
    live: null,
  },
  {
    id: 'stage-catalogue',
    color: '#D9C29C',
    icon: 'M12 6a2 2 0 1 1 2 2c-1 0-2 1-2 2 M12 10l-9 7h18z',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Un revendeur de luxe vend les mêmes pièces sur Vinted et sur Vestiaire Collective.",
      "Un catalogue Next.js, un back-office, l’API Vestiaire et des contraintes en base de données.",
      "Double vente impossible et factures conformes (numérotation, factures immuables, avoirs).",
    ],
    domain: 'Développement web',
    context: 'Stage',
    title: 'Catalogue et facturation',
    summary: 'Site vitrine et back-office pour un revendeur de luxe d’occasion.',
    result: null,
    description:
      "Réalisé en stage pour une micro-entreprise qui revend des vêtements de luxe sur Vinted et Vestiaire Collective : catalogue public qui redirige vers les annonces, back-office de saisie des articles, suivi des ventes et des marges, et génération de factures PDF.",
    highlights: [
      'Double vente impossible : contrainte unique en base et retrait automatique de l’annonce Vestiaire',
      'Facturation conforme : numérotation atomique, factures immuables, avoirs',
      'Intégration de l’API vendeur Vestiaire Collective, testée contre un faux serveur',
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind'],
    github: null,
    live: null,
  },
  {
    id: 'job-aggregator',
    color: '#7CC8C0',
    icon: 'M4 8h16v11H4z M9 8V5h6v3 M4 13h16',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Les offres tech sont éparpillées, et certaines ne sont plus vraiment ouvertes.",
      "Ingestion WeLoveDevs, API Express avec authentification, PostgreSQL et Docker, plus un service IA en Python qui calcule des embeddings.",
      "Un dashboard qui classe les offres par similarité avec le profil recherché, et détecte les offres « fantômes ».",
    ],
    domain: 'Développement web',
    context: 'EPITECH',
    title: 'Job Aggregator',
    summary: 'Plateforme qui agrège et classe des offres de stage et d’emploi tech.',
    result: null,
    description:
      "Agrégateur d'offres : ingestion depuis WeLoveDevs (pagination, limite de requêtes), API REST Node/Express avec authentification JWT et rôles, PostgreSQL, Docker Compose, et un dashboard Next.js. Le score de pertinence vient d'un service IA en Python : chaque offre est transformée en embedding, puis comparée au profil recherché par similarité cosinus.",
    highlights: [
      'Ingestion et normalisation des offres (HTML vers champs structurés)',
      'Service IA FastAPI : embeddings sentence-transformers (all-MiniLM-L6-v2) et similarité cosinus',
      'Score de pertinence et détection des offres « fantômes »',
      'CI GitHub Actions, tests d’API et d’accessibilité',
    ],
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Docker', 'Python', 'FastAPI', 'Sentence Transformers', 'Jest'],
    github: 'https://github.com/chrisrny/Job-Aggregator-',
    live: null,
  },
  {
    id: 'yowl',
    color: '#FF6B8B',
    icon: 'M4 5h16v11H9l-5 4z M12 13s-3-2-3-4a1.5 1.5 0 0 1 3-1a1.5 1.5 0 0 1 3 1c0 2-3 4-3 4z',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Les joueurs ont du mal à trouver des coéquipiers à leur niveau.",
      "Recherche utilisateur, personas, maquettes Figma testées entre pairs.",
      "Un MVP Next.js : fil, posts, likes et recherche de coéquipiers par jeu et par rang.",
    ],
    domain: 'Développement web',
    context: 'EPITECH',
    title: 'Yowl',
    summary: 'Réseau social pour joueurs, de la recherche utilisateur au MVP.',
    result: null,
    description:
      "Product design d'un réseau social gaming : recherche utilisateur, personas, parcours, maquettes Figma testées entre pairs, puis un MVP Next.js (fil d'actualité, posts image et vidéo, likes, recherche de coéquipiers par jeu et par rang, modération).",
    highlights: [
      'Personas et parcours utilisateur documentés',
      'Prototype Figma cliquable du parcours principal',
      'MVP : fil, posts, likes, recherche de coéquipiers',
    ],
    tech: ['Next.js', 'MongoDB', 'Figma'],
    github: 'https://github.com/chrisrny/YOWL',
    live:
      'https://www.figma.com/proto/lEGPJc2VSRsEQGROEieSMj/Twitter-UI-Screens--Community-?node-id=4-1224',
  },
  {
    id: '2dgame',
    color: '#8BE38B',
    icon: 'M6 9h12a3 3 0 0 1 3 3v2a3 3 0 0 1-5 2l-1-1H9l-1 1a3 3 0 0 1-5-2v-2a3 3 0 0 1 3-3z M8 11v3 M6.5 12.5h3 M15 12h.01 M17 14h.01',
    // Le problème, ce que j’ai fait, le résultat
    story: [
      "Créer un jeu d’action en binôme, avec un code qui reste maintenable.",
      "Les règles dans un module Java pur, séparé de libGDX, avec les patterns State, Strategy, Observer et Factory.",
      "Trois salles, des reliques et un boss en deux phases, testés avec JUnit 5.",
    ],
    domain: 'Autres',
    context: 'EPITECH',
    title: '2D Game',
    summary: 'Jeu d’action en vue de dessus en Java, en binôme (en cours).',
    result: null,
    description:
      "Trois salles d'ennemis, une relique à choisir après chaque salle, puis un boss en deux phases. Les règles du jeu vivent dans un module Java pur, séparé de l'affichage libGDX, ce qui permet de les tester sans ouvrir de fenêtre.",
    highlights: [
      'Séparation modèle et vue garantie par le build Gradle multi-modules',
      'Patterns State, Strategy, Observer et Factory',
      'Tests JUnit 5 et couverture JaCoCo, pull requests relues en binôme',
    ],
    tech: ['Java 21', 'libGDX', 'Gradle', 'JUnit'],
    github: null,
    live: null,
  },
]

export const REFLECTION_PARAGRAPHS = [
  "Mes projets suivent le chemin de la donnée : la nettoyer et l'explorer (NextBuy, TARDIS), entraîner et évaluer des modèles (CVRIE, Start Trek), travailler le texte et les LLM (Bookworm, SneakR, Codename), puis rendre le résultat utilisable dans une vraie application (Job Aggregator, mon stage).",
  "Ce que j'ai appris de plus utile, c'est de me méfier d'un bon score : sur CVRIE, une fuite de données gonflait les résultats, et le meilleur modèle sur le papier n'était pas le bon pour un usage médical. Chaque projet documente ses choix et ses limites.",
  "Grâce à la pédagogie EPITECH, j'ai appris par la pratique et en équipe, un élément essentiel de chacun de ces projets.",
]
