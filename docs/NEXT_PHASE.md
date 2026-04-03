# NEXT PHASE

Ce fichier sert de backlog éditorial entre deux phases.

Règles :

- tout sujet volontairement retiré, allégé ou reporté d'une phase doit être noté ici
- ce fichier doit être relu avant de concevoir la phase suivante
- quand un sujet est traité dans la phase suivante, il reste dans ce fichier mais son statut passe à `traité`
- le but n'est pas de lister des idées vagues, mais des reports pédagogiques concrets

## Reports en attente

### Report 1

- statut : `traité`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : configuration détaillée ESLint, Prettier, Husky et conventions de commit
- raison du report : ces sujets alourdissaient la phase avant même la première preuve observable front + back
- forme attendue : étape complète centrée sur l'outillage qualité minimal utile au premier vrai incrément métier
- reprise effective : phase 1, étape 8

### Report 2

- statut : `traité`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : Docker Compose, PostgreSQL et variables d'environnement backend
- raison du report : la preuve technique minimale de phase 0 fonctionne sans base de données et sans infrastructure locale supplémentaire
- forme attendue : étape complète introduisant la persistance quand un premier besoin métier concret apparaît
- reprise effective : phase 1, étapes 2 et 3

### Report 3

- statut : `traité`
- phase d'origine : phase 0
- phase cible : phase 2
- élément retiré ou allégé : Checkstyle, Stylelint et structure miroir détaillée de `tests/`
- raison du report : la phase 1 traite déjà la persistance, l'API métier, le branchement frontend et l'outillage minimal ; détailler ces conventions ici casserait le fil conducteur principal
- forme attendue : étape dédiée ou guide annexe au moment où l'architecture et la structure de tests seront plus stables
- reprise effective : nouvelle phase 2 pour la structure miroir de `tests/` ; reports dédiés conservés ensuite pour `Stylelint` et `Checkstyle`

### Report 4

- statut : `traité`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : pipeline GitLab CI/CD complet et premier déploiement Fly.io
- raison du report : la version initiale du parcours avait repoussé ce sujet ; le cadrage a ensuite été corrigé pour rendre le déploiement obligatoire dès la fin de phase 0
- forme attendue : premier déploiement minimal du squelette, puis redéploiements en fin de phases suivantes
- reprise effective : phase 0, section de stratégie de déploiement de fin de phase ; phases 1 et 2 en redéploiement

### Report 5

- statut : `traité`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : lecture ou exercice ADR en étape autonome
- raison du report : la phase 0 devait rester focalisée sur l'exécution réelle du setup, sans détour documentaire principal
- forme attendue : renvoi ciblé ou exercice ADR uniquement quand une vraie décision structurante apparaît
- reprise effective : phase 1, étape 8 avec cadrage explicite sur l'usage non décoratif des ADR

## Nouveaux reports en attente

### Report 6

- statut : `traité`
- phase d'origine : phase 1
- phase cible : phase 2
- élément retiré ou allégé : configuration détaillée de Checkstyle, Stylelint et structuration miroir complète de `tests/`
- raison du report : la phase 1 pose seulement les garde-fous minimaux avant commit pour rester centrée sur le premier incrément métier observable
- forme attendue : étape dédiée ou guide annexe relié à la structuration plus rigoureuse du code et des tests
- reprise effective : nouvelle phase 2 pour la structuration miroir de `tests/` ; `Stylelint` reporté en nouvelle phase 3 et `Checkstyle` reporté en nouvelle phase 4

### Report 7

- statut : `à traiter`
- phase d'origine : phase 2
- phase cible : phase 3
- élément retiré ou allégé : installation explicite de `shadcn-vue` et fabrication des premiers composants Vue métier sur cette base
- raison du report : le découpage de l'ancienne phase 2 sépare désormais le refactoring architectural du flux de données front et le chantier UI composant par composant
- forme attendue : étape complète centrée sur l'installation, le cadrage d'usage et l'intégration de composants métier réels dans l'UI

### Report 8

- statut : `à traiter`
- phase d'origine : phase 2
- phase cible : phase 3
- élément retiré ou allégé : configuration détaillée de `Stylelint`
- raison du report : la nouvelle phase 2 reste centrée sur l'architecture front, les types, les mappers, les use cases et la réécriture du flux de données ; la dette CSS devient vraiment structurante au moment de construire les composants UI avec `shadcn-vue`
- forme attendue : étape dédiée ou guide annexe lié aux conventions CSS du projet et aux composants Vue réellement créés dans la nouvelle phase 3

### Report 9

- statut : `à traiter`
- phase d'origine : phase 2
- phase cible : phase 3
- élément retiré ou allégé : `LogService` comme port sortant front et refactorisation des logs front épars
- raison du report : la nouvelle phase 2 est déjà architecturalement complète côté hexagone front grâce au port `KataRepository` ; ajouter `LogService` dans la même phase alourdirait inutilement le refactoring principal
- forme attendue : mini-étape de refactorisation ou étape dédiée introduisant un second port sortant front juste après la stabilisation du socle architectural

### Report 10

- statut : `à traiter`
- phase d'origine : phase 2
- phase cible : phase 4
- élément retiré ou allégé : configuration détaillée de `Checkstyle`
- raison du report : le nouveau découpage rend la phase 2 très front et la phase 3 centrée sur l'UI Vue ; `Checkstyle` relève d'un cadrage qualité Java à replacer dans une phase plus cohérente avec le travail backend ou fullstack concerné
- forme attendue : étape dédiée ou guide annexe au moment où les conventions qualité backend apportent une valeur immédiate au flux de travail
