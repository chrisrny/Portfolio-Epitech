// Ordre = ordre d'affichage. Les 3 premiers sont mis en avant dans le Hero.
// `result` : uniquement un chiffre réellement mesuré dans le projet.
export const PROJECTS = [
  {
    id: 'starttrek',
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
    tech: ['Python', 'PyTorch', 'Gymnasium', 'NumPy', 'Jupyter'],
    github: null,
    live: null,
  },
  {
    id: 'cvrie',
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
    tech: ['Python', 'scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    github: null,
    live: null,
  },
  {
    id: 'nextbuy',
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
    tech: ['LLM', 'Ollama', 'Prompt engineering', 'Sécurité'],
    github: null,
    live: null,
  },
  {
    id: 'bookworm',
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
    tech: ['Python', 'NLTK', 'NLP', 'CLI'],
    github: 'https://github.com/chrisrny/Alice-in-Wonderland',
    live: null,
  },
  {
    id: 'sneakr',
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
    domain: 'Développement web',
    context: 'EPITECH',
    title: 'Job Aggregator',
    summary: 'Plateforme qui agrège et classe des offres de stage et d’emploi tech.',
    result: null,
    description:
      "Agrégateur d'offres : ingestion depuis WeLoveDevs (pagination, limite de requêtes), API REST Node/Express avec authentification JWT et rôles, PostgreSQL, Docker Compose, et un dashboard Next.js avec score de pertinence et statistiques d'administration.",
    highlights: [
      'Ingestion et normalisation des offres (HTML vers champs structurés)',
      'Score de pertinence et détection des offres « fantômes »',
      'CI GitHub Actions, tests d’API et d’accessibilité',
    ],
    tech: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/chrisrny/Job-Aggregator-',
    live: null,
  },
  {
    id: 'yowl',
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
