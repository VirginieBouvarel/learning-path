# KataSensei — Specs & Décisions

> **Document vivant** — à commiter dans le repo `learning-path` et à fournir en contexte au début de chaque session de travail.
> Dernière mise à jour : avril 2026

---

## Vision produit

**KataSensei** est une plateforme d'entraînement aux katas de code orientée craft et bonnes pratiques, destinée aux profils en reconversion (bootcamp, formation courte) qui veulent apprendre à bien coder.

### Principe fondateur
Tu construis KataSensei pendant que tu apprends à le construire. Le learning path est le parcours de formation qui t'amène à construire KataSensei de A à Z.

### Cible
Développeurs en reconversion ou juniors qui veulent apprendre les bonnes pratiques (TDD, clean code, craft) à travers la pratique des katas.

### Valeur ajoutée
- Rassembler les katas connus au même endroit
- Traduction des consignes EN → FR
- Extraction des règles métiers
- Example mapping par kata
- Indices contextuels (IA)
- Chat IA socratique
- Évaluation du kata (validé ou non)
- Analyse du code produit (stats + synthèse IA)
- Orienté craft et bonnes pratiques

### Bénéfices pour Virginie
- Nécessite l'acquisition de toutes les compétences visées
- Elle en sera la première utilisatrice pour continuer d'apprendre
- Donne vie à une idée et conviction personnelle
- Répond à un besoin identifié dans la communauté
- Le parcours pourra être réutilisé comme template sur d'autres technos ou projets

---

## Périmètre V1 / V2

### V1 — Produit viable et publié
- **Langage unique : TypeScript** (pas de Java)
- **Type unique : Green-field** (pas de refactoring)
- **Alimentation des katas : seed SQL manuel** (2-3 katas pour démarrer)
- **Pas de back-office** d'ajout/édition de katas
- **Auth JWT simple** (pas Keycloak)
- Pas d'i18n (traductions en dur)
- Pas de scrapping automatisé

### V2 — Fonctionnalités secondaires
- Support Java (katas + configuration Piston + fichiers de test JUnit)
- Support katas de refactoring (nouveau type, nouvelles fonctionnalités)
- Back-office d'ajout et d'édition de katas
- Keycloak
- i18n
- Observabilité Sentry
- Approval testing / Golden Master
- Scrapping automatisé des sources (codingdojo.org, kata-log.rocks)

### Décisions YAGNI documentées
- `type` (GREEN_FIELD / REFACTORING) : pas en V1, migration triviale en V2
- `langagesDispo[]` : pas en V1, migration triviale en V2
- Les deux sont exclus car aucune fonctionnalité V1 ne les lit (un seul type, un seul langage)

---

## Sources de contenu

### Sources de katas
- https://codingdojo.org/kata/ — contenu riche mais non structuré (prose libre, cas de test suggérés)
- https://kata-log.rocks/ — tags structurés (TDD, Refactoring, SOLID, Starter/Experienced...)

### Références UX / éditeur de code
- https://www.codingame.com/
- https://www.codewars.com/

### Références parcours de formation
- https://vueschool.io/courses/the-vuejs-3-master-class
- https://www.udemy.com/course/bien-debuter-avec-spring-et-spring-boot/

### Note sur le contenu
Les règles métiers, l'example mapping et les indices n'existent pas sur les sources externes — c'est Virginie qui les produit pour chaque kata. C'est un travail éditorial manuel, excellent exercice et contribution à la communauté craft.

---

## Pages et fonctionnalités

### Navbar
Accueil · Dashboard · Mes fiches (fiches ouvertes pendant un kata)

---

### Page Accueil
- Menu de filtrage par tags + input de recherche par titre
- Liste de katas sous forme de cards
- Système de tags : niveau de difficulté, techniques craft travaillées, taille (nombre de règles métiers)
- Clic sur une card → Page Kata

---

### Page Kata
- Titre + consignes EN + consignes FR + liste des règles métiers + example mapping
- Au chargement : affichage des consignes uniquement
- Toggle langue (EN / FR)
- Toggle règles métiers (afficher / masquer)
- Toggle example mapping (afficher / masquer)
- Bouton "Faire le kata" → Page Dojo

---

### Page Dojo
**3 panels (style accordéon VSCode) :**
1. Consignes + règles + exemples + IA
2. Fichier de test + terminal intégré
3. Fichier de code + terminal intégré

Les configurations de tests et de code sont gérées en coulisse — l'utilisateur n'a pas à les gérer.

**Fonctionnalités :**

- **Demande d'indice** → pré-prompt configuré → l'IA lit le code et choisit l'indice adapté dans une liste prédéfinie → réponse avec snippet non copiable (l'apprenant doit écrire le code lui-même)
- **Demande d'explication niveau 1** → "Quel concept veux-tu explorer ?" + chips de suggestions contextuelles au kata → affichage d'une fiche concept prête
- **Demande d'explication niveau 2** → chat IA (limite de caractères input + limite et formatage output)
- **Soumission du kata** :
  - Vérifier si tous les tests sont au vert
  - Vérifier si toutes les règles métiers ont été implémentées
  - Vérifier si le coverage est à 100%
  - Vérifier s'il y a du code mort
  - Afficher les statistiques
  - Si tout ok → félicitations
  - Si manques → encouragements
  - Synthèse rédigée par l'IA : points forts, points faibles, axes d'amélioration, concepts à creuser, concepts maîtrisés
  - Sauvegarde des stats et de la synthèse dans un log (Tentative)
  - Bouton "Refaire le kata" → vide les panels tests et code
  - Bouton "Faire un autre kata" → retour à l'accueil

---

### Page Dashboard
1. **Préférences** :
   - Langue d'affichage du dojo (select)
   - Règles métiers affichées par défaut (toggle)
   - Example mapping affiché par défaut (toggle)
2. **Historique** : liste des katas réalisés + badge nombre de tentatives
   - Clic sur un kata → accordéon des tentatives (titre = Tentative n°X + date + heure + ✅/❌ + body = stats + synthèse)
3. Nombre total de katas réalisés
4. Kata le plus refait (nombre)
5. Kata le mieux réussi (meilleures stats)

---

## Incréments viables V1

### Niveau 1 — CRUD simple
1. Setup + preuve de communication front/back
   - **Inclut** : seed.sql avec 2 katas complets (ex: Fizz Buzz + Bowling)
2. Liste des katas + input search
3. Affichage d'un kata détail (consignes EN/FR — traduction en dur)
4. Filtrage des katas par tags (difficulté / techniques craft)
5. Fiches concepts
6. Règles métiers
7. Example mapping
8. Préférences utilisateur + compte utilisateur + authentification JWT simple

### Niveau 2 — Dojo simple sans IA
1. Page Dojo en statique avec les 3 panels
2. Éditeur de code intégré (Monaco)
3. Exécution des tests via Piston API
4. Affichage des indices au clic sur le bouton indice
5. Affichage des fiches concepts au clic sur "demander une explication"

### Niveau 3 — Dojo interactif avec IA
*(à détailler)*
1. Indice contextuel via Claude API (l'IA lit le code et choisit l'indice)
2. Chat IA niveau 2 (Claude API)
3. Soumission du kata + évaluation complète
4. Synthèse IA post-soumission
5. Sauvegarde des tentatives + Dashboard

---

## Modèle de données

> 🚧 En cours de construction — session du avril 2026

### Kata
```
Kata
├── id              UUID, PK
├── slug            VARCHAR, UNIQUE — ex: "fizz-buzz"
├── titre           VARCHAR
├── consignesOriginalEn  TEXT
├── consignesFr     TEXT
├── niveauDifficulte ENUM — DEBUTANT | INTERMEDIAIRE | AVANCE
└── taille          ENUM — PETIT | MOYEN | GRAND
```

> **Tags, règles métiers, indices, fiches concepts, utilisateur, tentative** — à modéliser (session en cours)

---

## Journal de bord

### Convention
- Un fichier par jour de travail dans `journal/`
- Nommé par date : `journal/2026-04-06.md`
- Versionné dans Git avec le reste du projet

### Format du commit du journal
```
Message : 2026-04-06 — mot-cle-1 mot-cle-2 mot-cle-3
Description : résumé court des avancées
```

Permet de retrouver une session via `git log --grep="mot-cle"`.

### Format du fichier journal
```markdown
## YYYY-MM-DD

### Avancées
- ...

### Appris aujourd'hui
- ...

### Fichiers modifiés
- [nom-fichier.md @ hash](lien GitHub vers le fichier au commit exact)

## Prochaine session
- ...
```

Le lien vers un fichier à un instant T :
`https://github.com/VirginieBouvarel/learning-path/blob/{hash}/{chemin/fichier}`

---

## APIs externes

### Piston API
Exécution de code dans un environnement sandboxé. Reçoit du code TypeScript (ou Java en V2), l'exécute, renvoie la sortie. Permet au Dojo de faire tourner les tests de l'apprenant sans gérer l'exécution côté backend.
- **Placement dans les incréments** : Niveau 2, étape 3
- **Apprentissage associé** : item 36 de la liste (Utilisation d'APIs externes)

### Claude API
Supervision IA socratique : indices contextuels, chat niveau 2, synthèse post-soumission.
- **Placement dans les incréments** : Niveau 3

### Monaco Editor
Éditeur de code embarqué dans le Dojo.
- **Placement dans les incréments** : Niveau 2, étape 2

---

## Liste des apprentissages V1

> À dispatcher dans les phases du learning path (ordre et phase à définir)

### Setup & environnement
1. Installer WSL2
2. Installer Docker sans Docker Desktop
3. Installer Zsh et Oh My Zsh
4. GitLab + GitLab CI
5. IntelliJ IDEA Ultimate

### Qualité & outillage
6. ESLint + Prettier + StyleLint + SonarQube for use + Husky
7. CI/CD simple
8. Gate Sonar en CI ← *V2*
9. Vitest (tests unitaires)
10. JUnit (tests unitaires)
11. Cypress (tests end-to-end)
12. TDD

### TypeScript & frontend
13. TypeScript strict
14. Typage fort en TypeScript
15. Type-Driven Design
16. Branded types en TypeScript
17. Result Pattern en TypeScript
18. Pattern Optional
19. Vue 3
20. API Composition + script setup
21. Architecture hexagonale frontend
22. Design patterns frontend (1 ou 2)
23. PrimeVue
24. SCSS + syntaxe BEM
25. Internationalisation (i18n) ← *V2*

### Java & backend
26. Java 21
27. Spring Boot
28. Maven
29. Architecture hexagonale backend
30. 20% des problématiques backend utilisées 80% du temps
31. Débogage backend
32. Design patterns backend (4 ou 5)
33. Injection / inversion de dépendance
34. DDD simple (bases)
35. POO

### Bonnes pratiques
36. Clean code
37. Principes SOLID, DRY, KISS, YAGNI
38. Refactoriser un backend standard en architecture hexagonale
39. Refactoriser un frontend standard en architecture hexagonale

### Intégrations & déploiement
40. Authentification par token (JWT)
41. PostgreSQL
42. Utilisation d'APIs externes (Monaco, Piston, Claude API)
43. Fly.io (déploiement)

### V2 uniquement
- Authentification Keycloak
- Approval testing + Golden Master
- Observabilité Sentry
- Scrapping automatisé
- Internationalisation (i18n)
- Gate Sonar en CI
