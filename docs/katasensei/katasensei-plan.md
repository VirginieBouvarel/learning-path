# KataSensei — Plan de réalisation V1

> Fil conducteur de travail en binôme.
> En début de session : fournir ce fichier + le journal du jour précédent.
> Dernière mise à jour : avril 2026

---

## Phase 0 — Setup & infrastructure

**Apprentissages :** GitLab + GitLab CI, Installer WSL2, Installer Docker sans Docker Desktop, Installer Zsh et Oh My Zsh, ESLint + Prettier + StyleLint + Husky, CI/CD simple

---

### Étape 1 — Environnement local

- Installer WSL2
  - _Vérification : `wsl --version` affiche la version dans le terminal Windows_
- Installer Docker sans Docker Desktop
  - _Vérification : `docker run hello-world` affiche "Hello from Docker!"_
- Installer Zsh + Oh My Zsh
  - _Vérification : le prompt change et affiche le thème Oh My Zsh_
- Installer Node.js + pnpm
  - _Vérification : `node -v` et `pnpm -v` affichent les versions_
- Installer Java 21 + Maven
  - _Vérification : `java -version` affiche `21.x.x` et `mvn -v` répond_

**DoD étape 1 :** tous les outils répondent en ligne de commande, aucune erreur.

---

### Étape 2 — Repo GitLab

- Le repo `katasensei` a été crée sur GitLab en amont
  - _Vérification : l'[URL du projet](https://github.com/VirginieBouvarel/kataSensei) est accessible dans le navigateur_
- Configurer les branches protégées (`main`, `develop`)
  - _Vérification : une tentative de push direct sur `main` est refusée_
- Configurer les règles de merge request (approbation requise)
  - _Vérification : la règle apparaît dans Settings > Merge Requests_

**DoD étape 2 :** repo visible sur GitLab, `main` protégée, MR obligatoire.

---

### Étape 3 — Structure du monorepo

- Initialiser la structure `backend/` + `frontend/` à la racine
  - _Vérification : `ls` affiche les deux dossiers_
- Ajouter `.gitignore` (node_modules, target/, .env)
  - _Vérification : `git status` n'affiche pas node_modules_
- Ajouter `.editorconfig`
  - _Vérification : l'éditeur respecte l'indentation configurée_
- Premier commit + push sur `develop`
  - _Vérification : le commit apparaît sur GitLab_

**DoD étape 3 :** structure commitée et visible sur GitLab.

---

### Étape 4 — Outillage qualité

- Configurer ESLint + Prettier dans `frontend/`
  - _Vérification : `pnpm lint` tourne sans erreur sur un fichier vide_
- Configurer StyleLint dans `frontend/`
  - _Vérification : `pnpm stylelint` tourne sans erreur_
- Configurer Husky (pre-commit : lint)
  - _Vérification : un commit avec une erreur de lint est bloqué_
- Configurer SonarQube for use (local)
  - _Vérification : les suggestions SonarQube apparaissent dans l'éditeur_

**DoD étape 4 :** un commit mal formaté est bloqué par Husky.

---

### Étape 5 — CI/CD de base

- Écrire le fichier `.gitlab-ci.yml` (job lint + job tests)
  - _Vérification : le fichier est valide selon le linter GitLab CI_
- Ouvrir une MR de test et vérifier que le pipeline tourne
  - _Vérification : les jobs apparaissent en vert dans l'interface GitLab_

**DoD étape 5 :** pipeline vert sur une MR, jobs lint et tests exécutés.

---

## Phase 1 — Backend : domaine & données

**Apprentissages :** TypeScript strict, Typage fort en TypeScript, Type-Driven Design, Branded types en TypeScript, PostgreSQL, Architecture hexagonale backend, DDD simple (bases), Vitest (tests unitaires), TDD

---

### Étape 1 — Setup backend

- Initialiser le projet Spring Boot via Spring Initializr (Maven, Java 21)
  - _Vérification : `mvn spring-boot:run` démarre sans erreur_
- Écrire le `docker-compose.yml` avec PostgreSQL
  - _Vérification : `docker compose up` démarre le conteneur PostgreSQL_
- Configurer la connexion Spring Boot → PostgreSQL
  - _Vérification : le log au démarrage affiche `HikariPool... Started`_

**DoD étape 1 :** backend démarre, se connecte à PostgreSQL, pas d'erreur dans les logs.

---

### Étape 2 — Modèle de données : Kata + Tag

- Écrire la migration SQL (table `kata`)
  - _Vérification : `\d kata` dans psql affiche les colonnes attendues_
- Écrire la migration SQL (tables `tag`, `kata_tag`)
  - _Vérification : `\d tag` et `\d kata_tag` affichent les colonnes attendues_
- Écrire l'entité TypeScript `Kata` (branded types : `KataId`, `KataSlug`)
  - _Vérification : le compilateur TypeScript accepte `KataId` et refuse un `string` nu_
- Écrire l'entité TypeScript `Tag` et `KataTag`
  - _Vérification : les types compilent sans erreur_

**DoD étape 2 :** migrations jouées, entités TypeScript compilées, branded types en place.

---

### Étape 3 — Repository Kata (TDD)

- Écrire le test `KataRepository.listerTous()` → liste vide si seed absent
  - _Vérification : le test est rouge_
- Implémenter `KataRepository.listerTous()`
  - _Vérification : le test passe au vert_
- Écrire le test `KataRepository.trouverParSlug()` → retourne un kata ou null
  - _Vérification : le test est rouge_
- Implémenter `KataRepository.trouverParSlug()`
  - _Vérification : le test passe au vert_

**DoD étape 3 :** tous les tests du repository sont verts, coverage 100% sur ce fichier.

---

### Étape 4 — Use case : lister les katas (TDD)

- Écrire le test du use case `ListerKatas`
  - _Vérification : le test est rouge_
- Implémenter le use case `ListerKatas`
  - _Vérification : le test passe au vert_

**DoD étape 4 :** test vert, use case isolé du repository par une interface (archi hexagonale).

---

### Étape 5 — Use case : afficher un kata (TDD)

- Écrire le test du use case `AfficherKata`
  - _Vérification : le test est rouge_
- Implémenter le use case `AfficherKata`
  - _Vérification : le test passe au vert_

**DoD étape 5 :** test vert, cas "kata introuvable" géré (Result Pattern ou Optional).

---

### Étape 6 — Modèle de données : RegleMetier + ExampleMapping

- Écrire les migrations SQL (`regle_metier`, `example_mapping`)
  - _Vérification : tables visibles dans psql_
- Écrire les entités TypeScript associées
  - _Vérification : les types compilent sans erreur_
- Étendre `AfficherKata` pour inclure règles et exemples
  - _Vérification : le test du use case couvre les données imbriquées_

**DoD étape 6 :** migrations jouées, use case `AfficherKata` retourne règles + exemples, tests verts.

---

### Étape 7 — Modèle de données : Indice + FicheConcepte

- Écrire les migrations SQL (`indice`, `fiche_concepte`)
  - _Vérification : tables visibles dans psql_
- Écrire les entités TypeScript associées
  - _Vérification : les types compilent_
- Écrire et implémenter le use case `ObtenirIndice` (TDD)
  - _Vérification : test vert_
- Écrire et implémenter le use case `ObtenirFicheConcepte` (TDD)
  - _Vérification : test vert_

**DoD étape 7 :** migrations jouées, use cases testés et verts.

---

### Étape 8 — Modèle de données : Utilisateur + Tentative

- Écrire les migrations SQL (`utilisateur`, `tentative`)
  - _Vérification : tables visibles dans psql_
- Écrire les entités TypeScript associées
  - _Vérification : les types compilent_
- Écrire et implémenter le use case `EnregistrerTentative` (TDD)
  - _Vérification : test vert_
- Écrire et implémenter le use case `ListerTentativesParKata` (TDD)
  - _Vérification : test vert_

**DoD étape 8 :** migrations jouées, use cases testés et verts.

---

### Étape 9 — Seed SQL

- Écrire le seed complet : 2 katas (Fizz Buzz + Bowling) avec tags, règles métiers, example mapping, indices, fiches concepts
  - _Vérification : `SELECT * FROM kata` retourne 2 lignes après seed_
- Vérifier que le seed est idempotent (rejouable sans doublon)
  - _Vérification : jouer le seed deux fois ne crée pas de doublons_

**DoD étape 9 :** seed jouable, données cohérentes dans toutes les tables, pas de doublon.

---

## Phase 2 — Backend : API REST

**Apprentissages :** Java 21, Spring Boot, Maven, Architecture hexagonale backend, 20% des problématiques backend utilisées 80% du temps, Clean code, Principes SOLID / DRY / KISS / YAGNI

---

### Étape 1 — Contrat API : katas

- Implémenter `GET /katas` (liste tous les katas)
  - _Vérification : `curl http://localhost:8080/katas` retourne un tableau JSON avec les 2 katas du seed_
- Implémenter `GET /katas/:slug` (détail d'un kata)
  - _Vérification : `curl http://localhost:8080/katas/fizz-buzz` retourne le kata complet_
- Écrire les tests des controllers
  - _Vérification : tests verts_

**DoD étape 1 :** les deux routes répondent, tests verts, données du seed visibles en JSON.

---

### Étape 2 — Contrat API : filtrage par tags

- Implémenter `GET /katas?tag=...`
  - _Vérification : `curl http://localhost:8080/katas?tag=tdd` retourne uniquement les katas taggés TDD_
- Écrire les tests
  - _Vérification : tests verts_

**DoD étape 2 :** filtrage fonctionnel, testé.

---

### Étape 3 — Contrat API : indices et fiches concepts

- Implémenter `GET /katas/:slug/indices`
  - _Vérification : curl retourne la liste des indices du kata_
- Implémenter `GET /fiches/:slug`
  - _Vérification : curl retourne la fiche concept_
- Écrire les tests
  - _Vérification : tests verts_

**DoD étape 3 :** routes testées et fonctionnelles.

---

### Étape 4 — Contrat API : authentification JWT

- Implémenter `POST /auth/register`
  - _Vérification : un nouvel utilisateur est créé en base, mot de passe hashé_
- Implémenter `POST /auth/login`
  - _Vérification : curl retourne un token JWT valide_
- Sécuriser les routes protégées (middleware JWT)
  - _Vérification : `GET /utilisateurs/:id/tentatives` sans token retourne 401_
- Écrire les tests
  - _Vérification : tests verts_

**DoD étape 4 :** register + login fonctionnels, routes protégées refusent les requêtes sans token.

---

### Étape 5 — Contrat API : tentatives

- Implémenter `POST /tentatives`
  - _Vérification : curl avec token valide crée une tentative en base_
- Implémenter `GET /utilisateurs/:id/tentatives`
  - _Vérification : curl retourne la liste des tentatives de l'utilisateur_
- Écrire les tests
  - _Vérification : tests verts_

**DoD étape 5 :** routes testées, tentatives persistées en base.

---

### Étape 6 — Contrat API : préférences utilisateur

- Implémenter `GET /utilisateurs/:id/preferences`
  - _Vérification : curl retourne les préférences de l'utilisateur_
- Implémenter `PUT /utilisateurs/:id/preferences`
  - _Vérification : curl met à jour les préférences et les retourne_
- Écrire les tests
  - _Vérification : tests verts_

**DoD étape 6 :** lecture et mise à jour des préférences fonctionnelles, testées.

---

## Phase 3 — Frontend : structure & pages statiques

**Apprentissages :** Vue 3, API Composition + script setup, Architecture hexagonale frontend, SCSS + syntaxe BEM, PrimeVue, TypeScript strict

---

### Étape 1 — Setup frontend

- Initialiser le projet Vue 3 + TypeScript strict (Vite) dans `frontend/`
  - _Vérification : `pnpm dev` démarre et affiche la page par défaut Vite dans le navigateur_
- Configurer PrimeVue
  - _Vérification : un composant PrimeVue (`Button`) s'affiche sans erreur_
- Configurer SCSS + conventions BEM
  - _Vérification : un fichier `.scss` avec une classe BEM compile sans erreur_
- Configurer Vue Router
  - _Vérification : navigation entre deux routes vides fonctionne_

**DoD étape 1 :** `pnpm dev` affiche une page dans le navigateur, router opérationnel.

---

### Étape 2 — Layout & Navbar

- Créer le composant `Navbar` (liens : Accueil · Dashboard · Mes fiches)
  - _Vérification : la navbar s'affiche sur toutes les pages, les liens naviguent_
- Créer le layout principal (slot pour le contenu)
  - _Vérification : chaque page utilise le layout et affiche la navbar_

**DoD étape 2 :** navbar visible et navigable sur toutes les routes.

---

### Étape 3 — Page Accueil (statique)

- Créer le composant `KataCard` (titre, tags, niveau)
  - _Vérification : la card s'affiche avec des données en dur_
- Créer la page `Accueil` avec une liste de 2 cards en dur
  - _Vérification : la page affiche 2 cards au chargement_
- Ajouter l'input de recherche (filtre local sur le titre)
  - _Vérification : taper "fizz" masque les cards qui ne correspondent pas_

**DoD étape 3 :** page Accueil affiche 2 katas statiques, recherche locale fonctionne.

---

### Étape 4 — Page Kata (statique)

- Créer la page `Kata` avec consignes EN/FR en dur
  - _Vérification : la page s'affiche au clic sur une KataCard_
- Ajouter le toggle langue (EN / FR)
  - _Vérification : le toggle bascule l'affichage entre les deux langues_
- Ajouter les toggles règles métiers et example mapping
  - _Vérification : les sections s'affichent et se masquent au clic_
- Ajouter le bouton "Faire le kata" → route vers Page Dojo
  - _Vérification : le bouton navigue vers `/dojo`_

**DoD étape 4 :** page Kata navigable, toggles fonctionnels, bouton "Faire le kata" actif.

---

### Étape 5 — Page Dojo (statique)

- Créer la page `Dojo` avec les 3 panels (accordéon style VSCode)
  - _Vérification : les 3 panels s'ouvrent et se ferment_
- Intégrer Monaco Editor dans le panel code
  - _Vérification : Monaco s'affiche, la coloration syntaxique TypeScript fonctionne_
- Afficher un fichier de test TypeScript en dur dans le panel tests
  - _Vérification : le fichier de test est lisible dans le panel_

**DoD étape 5 :** page Dojo affiche les 3 panels, Monaco Editor fonctionnel.

---

### Étape 6 — Page Dashboard (statique)

- Créer la page `Dashboard` avec les préférences en dur (selects + toggles)
  - _Vérification : les contrôles s'affichent et réagissent au clic (sans persistance)_
- Afficher un historique fictif (2 tentatives en dur)
  - _Vérification : l'accordéon des tentatives s'ouvre et affiche les stats_

**DoD étape 6 :** page Dashboard affiche préférences et historique statiques.

---

## 🚀 Jalon Prod 1 — Liste et détail des katas en ligne

> Déployer dès que P3.3 + P3.4 + P4.1 + P4.3 sont terminées.
> Un utilisateur peut parcourir la liste des katas et lire le détail d'un kata.

- Dockeriser le backend + builder le frontend
- Déployer sur Fly.io (backend + PostgreSQL + frontend)
- _Vérification : l'URL publique affiche la liste des katas du seed_

---

## Phase 4 — Frontend : branchement API

**Apprentissages :** Architecture hexagonale frontend, Design patterns frontend, Authentification par token (JWT), Result Pattern en TypeScript, Pattern Optional

---

### Étape 1 — Couche API + page Accueil branchée

- Écrire le service `KataService.listerKatas()` (appel `GET /katas`)
  - _Vérification : la console affiche les données de l'API au chargement_
- Brancher la page Accueil sur `KataService`
  - _Vérification : les 2 katas du seed s'affichent dans le navigateur_

**DoD étape 1 :** page Accueil affiche les données réelles du backend.

---

### Étape 2 — Filtrage par tags branché

- Créer le composant `FiltreTags`
  - _Vérification : les tags disponibles s'affichent sous forme de chips_
- Brancher le filtrage sur `GET /katas?tag=...`
  - _Vérification : cliquer sur un tag filtre la liste de katas_

**DoD étape 2 :** filtrage par tags fonctionnel avec données réelles.

---

### Étape 3 — Page Kata branchée

- Écrire `KataService.afficherKata(slug)` (appel `GET /katas/:slug`)
  - _Vérification : les données du kata s'affichent en console_
- Brancher la page Kata sur `KataService`
  - _Vérification : consignes, règles métiers et example mapping s'affichent depuis l'API_

**DoD étape 3 :** page Kata affiche les données réelles du backend.

---

### Étape 4 — Authentification

- Créer les pages Login + Register
  - _Vérification : les formulaires s'affichent et soumettent sans erreur_
- Implémenter le store auth (JWT stocké, utilisateur courant exposé)
  - _Vérification : après login, le token est disponible dans le store_
- Protéger les routes Dashboard et Dojo (redirection si non connecté)
  - _Vérification : accéder à `/dashboard` sans être connecté redirige vers `/login`_

**DoD étape 4 :** register + login fonctionnels, routes protégées, token persisté.

---

## 🚀 Jalon Prod 2 — Authentification en ligne

> Déployer dès que P4.4 est terminée.
> Un utilisateur peut créer un compte et se connecter.

- Déployer la mise à jour sur Fly.io
- _Vérification : register + login fonctionnels sur l'URL publique_

---

### Étape 5 — Dojo branché (indices + fiches + Piston)

- Brancher les indices sur `GET /katas/:slug/indices`
  - _Vérification : cliquer "Demander un indice" affiche un indice depuis l'API_
- Brancher les fiches concepts sur `GET /fiches/:slug`
  - _Vérification : cliquer "Demander une explication" affiche la fiche_
- Brancher l'exécution des tests via Piston API
  - _Vérification : cliquer "Lancer les tests" affiche le résultat dans le terminal Dojo_

**DoD étape 5 :** indices, fiches et exécution des tests fonctionnels dans le Dojo.

---

### Étape 6 — Soumission du kata

- Implémenter la vérification (tests au vert, coverage, code mort)
  - _Vérification : soumettre avec des tests rouges affiche un message d'encouragement_
- Afficher les statistiques post-soumission
  - _Vérification : soumettre avec tout au vert affiche les stats et les félicitations_
- Appeler `POST /tentatives` pour sauvegarder
  - _Vérification : la tentative apparaît dans la base de données après soumission_

**DoD étape 6 :** soumission complète, stats affichées, tentative sauvegardée.

---

## 🚀 Jalon Prod 3 — Dojo fonctionnel en ligne

> Déployer dès que P4.5 + P4.6 sont terminées.
> Un utilisateur peut faire un kata complet dans le Dojo et soumettre.

- Déployer la mise à jour sur Fly.io
- _Vérification : parcours Dojo → soumission → stats fonctionnel sur l'URL publique_

---

### Étape 7 — Dashboard branché

- Brancher les préférences sur `GET/PUT /utilisateurs/:id/preferences`
  - _Vérification : modifier une préférence et recharger la page conserve le changement_
- Brancher l'historique sur `GET /utilisateurs/:id/tentatives`
  - _Vérification : les tentatives réelles de l'utilisateur apparaissent dans l'accordéon_

**DoD étape 7 :** Dashboard affiche les données réelles, préférences persistées.

---

## 🚀 Jalon Prod 4 — Dashboard en ligne

> Déployer dès que P4.7 est terminée.
> Un utilisateur peut voir son historique et gérer ses préférences.

- Déployer la mise à jour sur Fly.io
- _Vérification : historique et préférences fonctionnels sur l'URL publique_

---

## 🚀 Jalon Prod 5 — V1 sans IA complète et stabilisée

> Feature complète déployée : parcours Accueil → Kata → Dojo (sans IA) → Soumission → Dashboard.

**Apprentissages :** Fly.io (déploiement)

### Étape 1 — Préparation prod

- Configurer les variables d'environnement (`.env.prod`)
  - _Vérification : aucune valeur sensible dans le code versionné_
- Dockeriser le backend
  - _Vérification : `docker build` produit une image qui démarre sans erreur_
- Builder le frontend
  - _Vérification : `pnpm build` produit un dossier `dist/` sans erreur_

**DoD étape 1 :** images Docker buildées, frontend buildé, variables d'env séparées.

### Étape 2 — Déploiement Fly.io

- Déployer la base de données PostgreSQL sur Fly.io
  - _Vérification : connexion possible depuis le backend déployé_
- Déployer le backend sur Fly.io
  - _Vérification : `curl https://api.katasensei.fly.dev/katas` retourne les katas_
- Déployer le frontend sur Fly.io
  - _Vérification : l'URL publique affiche la page Accueil dans le navigateur_

**DoD étape 2 :** les 3 services sont en ligne, le parcours complet fonctionne en prod.

### Étape 3 — Validation prod

- Tester le parcours complet en prod (accueil → kata → dojo → soumission → dashboard)
  - _Vérification : parcours terminé sans erreur, tentative sauvegardée_

**DoD étape 3 :** V1 sans IA en ligne et utilisable.

---

## Phase 5 — IA : indices contextuels & chat

**Apprentissages :** Utilisation d'APIs externes (Claude API), Design patterns backend (Stratégie, Façade)

---

### Étape 1 — Intégration Claude API (backend)

- Configurer le client Claude API (clé API en variable d'env)
  - _Vérification : un appel de test à Claude API retourne une réponse dans les logs_
- Écrire et implémenter le use case `DemanderIndiceContextuel` (TDD)
  - _Vérification : test vert, l'IA lit le code soumis et choisit un indice_
- Écrire et implémenter le use case `ChatNiveau2` (TDD)
  - _Vérification : test vert, une question reçoit une réponse socratique_

**DoD étape 1 :** use cases testés, clé API non versionnée, réponses IA cohérentes.

---

### Étape 2 — Synthèse post-soumission

- Écrire et implémenter le use case `GenererSyntheseIA` (TDD)
  - _Vérification : test vert, la synthèse contient points forts / axes d'amélioration_
- Brancher sur `POST /tentatives` (synthèse incluse dans la sauvegarde)
  - _Vérification : la tentative en base contient le champ synthèse_

**DoD étape 2 :** synthèse générée et persistée avec chaque tentative.

---

### Étape 3 — Branchement frontend IA

- Brancher le bouton "Demander un indice" sur le use case contextuel
  - _Vérification : l'indice affiché correspond au code écrit par l'utilisateur_
- Implémenter le chat niveau 2 (input limité, output formaté, snippet non copiable)
  - _Vérification : le chat répond, le snippet est affiché mais non sélectionnable_
- Afficher la synthèse IA post-soumission
  - _Vérification : après soumission, la synthèse s'affiche dans la modale de résultat_

**DoD étape 3 :** fonctionnalités IA visibles et fonctionnelles dans le Dojo.

---

## 🚀 Jalon Prod 6 — V1 complète avec IA

> V1 complète déployée : indices contextuels, chat IA socratique, synthèse post-soumission.

### Étape 1 — Tests end-to-end

- Écrire les tests Cypress sur le parcours principal (accueil → soumission)
  - _Vérification : `pnpm cypress run` passe au vert_
- Corriger les bugs identifiés
  - _Vérification : aucun test Cypress rouge_

**DoD étape 1 :** suite Cypress verte sur le parcours principal.

### Étape 2 — Déploiement final

- Déployer la V1 complète sur Fly.io
  - _Vérification : l'URL publique répond, les fonctionnalités IA fonctionnent_
- Valider le parcours complet en prod
  - _Vérification : parcours terminé avec synthèse IA affichée_

**DoD étape 2 :** V1 complète en ligne, KataSensei est utilisable par un vrai utilisateur.
