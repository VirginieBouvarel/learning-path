# PHASE 0 AUDIT

Document d'audit de référence conservé avant réécriture de la phase.

## Diagnostic sévère

La phase 0 actuelle, dans `public/phases/phase-0.html`, ne respecte pas la spec de rédaction sur les points structurants.

### Elle ne part pas de l'état réel de départ

Le guide suppose déjà beaucoup de choses implicites : dossier de travail, existence ou non d'un repo, installation préalable de Git, Node, Docker, IntelliJ, compte Fly.io, compte GitLab, choix du terminal. Pour une lectrice seule, le point de départ est flou.

### L'ordre de construction est incohérent pour une vraie exécution

On mélange setup local, structure front, qualité, base de données, stylelint, ADR, CI/CD, déploiement Fly.io et conventions de tests dans une seule séquence trop large. Certaines décisions arrivent avant la preuve minimale que le système tourne.

### Les étapes ne sont pas des vrais pas-à-pas

Beaucoup de sections sont des résumés ou des prescriptions, pas des guides exécutables. Exemple : "Créer le projet Spring Boot", "Configurer ESLint", "Déployer sur Fly.io". Il manque presque partout :

- le terminal à ouvrir
- le dossier exact
- le résultat attendu après chaque sous-bloc
- les corrections en cas d'échec
- la preuve observable

### La phase est surchargée pour une phase 0

Checkstyle, Stylelint, GitLab CI/CD, Fly.io, ADR de lecture, structure de tests miroir : ce sont des sujets réels, mais empilés ici ils diluent l'objectif principal. La phase 0 doit d'abord prouver que l'environnement permet de faire tourner un front et un back minimaux, puis éventuellement préparer le terrain pour la suite.

### La fin de phase n'est pas construite autour d'un livrable observable unique

La checklist cite beaucoup de choses, mais le guide n'oriente pas clairement vers un "minimum running system" simple et vérifiable. Il faut un fil rouge plus net : créer l'espace de travail, initialiser le repo, lancer le front, lancer le back, exposer un health check, afficher un appel front vers back, puis éventuellement préparer le déploiement.

### La compatibilité environnement cible est parfois mauvaise

Il y a des commandes et hypothèses non alignées avec `Windows 11 + WSL2 Ubuntu + terminal Unix uniquement`. Exemple : référence à `brew install flyctl`, conflit Homebrew, ce qui n'a rien à faire dans ce cadre principal.

### La structure obligatoire des étapes n'est pas respectée

Les sections actuelles n'ont pas systématiquement :

- objectif
- pourquoi maintenant
- état de départ exact
- exercice
- solution en `details`
- 3 questions théoriques minimum avec réponses en `details`
- DoD d'étape
- checklist manuelle

## Conclusion

En l'état, ce n'est pas une base à "améliorer". Il faut repartir de zéro sur la logique d'exécution de la phase.

## Structure cible proposée

Je propose une phase 0 reconstruite autour d'un objectif unique : partir d'un poste Windows 11 (WSL2 non installé, aucun outil de développement présent), et finir avec un monorepo initial où :

- le front minimal s'affiche en local
- le back minimal répond
- un health check est observable
- le front récupère une valeur du back
- la base de travail est prête pour la phase 1
- la préparation au déploiement existe déjà, sans surcharger la phase

## Livrable de fin de phase

À la fin de la phase 0, la lectrice doit pouvoir montrer :

- une page front locale accessible dans le navigateur
- un backend Spring Boot lancé localement
- `GET /actuator/health` qui répond `UP`
- un endpoint simple type `/api/ping` ou `/api/configuration`
- un affichage côté front du message renvoyé par le back
- un repo Git initialisé proprement avec un premier historique cohérent
- une préparation de déploiement minimale, mais pas forcément toute la CI/CD complète si cela alourdit artificiellement la phase

## Grandes étapes proposées

### Clarifier le point de départ et préparer l'espace de travail

Situation réelle : Windows 11, WSL2 non installé, aucun outil de développement présent, aucun repo KataSensei encore créé.

Objectif : vérifier les outils minimums réellement nécessaires pour démarrer.

Livrable : dossier de travail prêt, commandes de vérification exécutées, écarts corrigés.

### Créer le dossier projet et initialiser Git

Objectif : ne plus laisser d'ambiguïté sur "où vit le projet" et "est-ce qu'un repo existe déjà".

Livrable : racine du projet créée, `git init`, branche principale claire, `.gitignore` de base.

### Créer le backend Spring Boot minimal

Objectif : obtenir une application Java qui démarre vraiment localement.

Livrable : projet Spring Boot généré, application lancée, logs observables.

### Exposer une preuve backend observable

Objectif : ne pas s'arrêter à "ça compile".

Livrable : `GET /actuator/health` et un endpoint métier minimal type `/api/ping`.

### Créer le frontend Vue minimal

Objectif : obtenir une interface visible très simple.

Livrable : projet Vue lancé, page accessible en local.

### Faire communiquer le front et le back

Objectif : prouver que le système complet fonctionne déjà.

Livrable : le front appelle le backend et affiche une réponse visible.

### Stabiliser le lancement local

Objectif : rendre l'usage quotidien praticable.

Livrable : ports explicités, commandes de démarrage documentées, erreurs fréquentes couvertes.

### Préparer la suite sans surcharger la phase

Objectif : poser seulement les bases indispensables pour la phase 1.

Livrable : conventions minimales, structure de repo claire, éventuellement préparation de déploiement ou note "prête à être branchée" si la mise en prod complète ici devient artificielle.

## Ce que je retirerais de la phase 0 ou déplacerais

- Checkstyle détaillé : plutôt phase 1 ou guide annexe si pas indispensable à la preuve minimale.
- Stylelint détaillé : idem.
- Pipeline GitLab CI/CD complet : trop tôt si le système local minimal n'est pas encore solidement établi.
- ADR en tant qu'étape autonome : mieux en ressources ou renvoi, pas comme bloc principal de phase 0.
- Docker PostgreSQL dès la phase 0 : seulement si la phase 0 en a vraiment besoin. Si le backend minimal peut tourner sans base, je recommande de ne pas introduire PostgreSQL ici.
- Fly.io détaillé : à garder seulement si on peut faire un premier déploiement très simple sans casser la lisibilité. Sinon "préparation exploitable immédiate" en fin de phase.

## Position pédagogique recommandée

Pour réussir la phase 0, je recommande un périmètre strict :

- Git
- Java 21 + Maven
- Spring Boot minimal
- Vue 3 + TypeScript
- appel HTTP front vers back
- health check
- premier commit propre

Et seulement ensuite, en fin de phase, une courte section "préparation du prochain incrément" au lieu d'un empilement d'outillage.

## Structure interne de chaque étape

Chaque étape sera reconstruite avec ce squelette strict :

- objectif
- pourquoi maintenant
- état de départ exact
- micro-étapes numérotées
- commandes exactes
- résultat attendu
- erreurs fréquentes
- exercice concret
- `details` "Solution - A consulter après 20 min"
- 3 questions théoriques minimum
- un `details` de réponse attendue pour chaque question
- Definition of Done
- checklist manuelle
- suggestion de commit si pertinente

---

## Mise à jour — Corrections appliquées (2026-04-03)

La page `public/phases/phase-0.html` existante a été évaluée comme structurellement conforme à la spec (7 étapes, trame complète, exercices, questions, DoD, checklist, déploiement, ressources). Une réécriture complète n'était pas nécessaire. Les corrections chirurgicales suivantes ont été appliquées.

### Corrections appliquées

**1. Sidebar — contenu interne supprimé**
Les mentions "Database Notion à créer après stabilisation des guides" et "Database Notion à créer pour compétences, phases et validations" ont été remplacées par des descriptions neutres et publiques.

**2. `.gitignore` enrichi**
Le snippet de l'étape 3 couvrait seulement `.DS_Store`, `node_modules`, `dist`, `.idea`, `.vscode`, `target` et `*.log`. Il a été enrichi avec `.env`, `*.class` et `*.jar` pour éviter que des fichiers sensibles ou compilés soient commités accidentellement.

**3. Section déploiement réécrite**
La section déploiement supposait `flyctl` installé et utilisateur connecté, sans documenter ces prérequis. Elle a été réécrite pour couvrir dans l'ordre :
- installation de `flyctl` dans WSL et configuration du PATH
- connexion au compte Fly.io
- création du `Dockerfile` backend (jar Java 21)
- compilation du jar avec `./mvnw package -DskipTests`
- `fly launch` et `fly deploy` côté backend
- création du `nginx.conf` pour servir les fichiers statiques Vite
- création du `Dockerfile` frontend (build multi-étapes Node + nginx)
- remplacement de l'URL codée en dur dans `App.vue` par `import.meta.env.VITE_API_URL`
- création de `.env` local (ignoré) et `.env.example` (committé)
- `fly launch`, `fly secrets set` et `fly deploy` côté frontend
- vérifications après déploiement

**4. Configuration CORS corrigée**
La phase 0 enseignait encore `@CrossOrigin(origins = "http://localhost:5173")` directement sur `PingController`, ce qui figeait une URL locale dans le code et cassait la logique de déploiement Fly.io. La page a été corrigée pour :
- introduire une configuration CORS globale via `WebMvcConfigurer`
- lire l'origine autorisée depuis `CORS_ALLOWED_ORIGIN`
- expliquer l'export local `CORS_ALLOWED_ORIGIN=http://localhost:5173`
- compléter le déploiement backend avec `fly secrets set CORS_ALLOWED_ORIGIN=https://katasensei-front.fly.dev`

**5. Scripts Prism complétés**
Les composants `prism-docker.min.js` et `prism-nginx.min.js` ont été ajoutés pour la coloration des snippets Dockerfile et nginx ajoutés par la correction 3.

### Bugs restants non traités

- Les sous-pages `phase-0-wsl2.html`, `phase-0-ide.html` et `phase-0-structure.html` n'ont pas été auditées dans cette session.
