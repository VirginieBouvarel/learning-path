# NEXT PHASE

Ce fichier sert de backlog éditorial entre deux phases.

Règles :

- tout sujet volontairement retiré, allégé ou reporté d'une phase doit être noté ici
- ce fichier doit être relu avant de concevoir la phase suivante
- quand un sujet est traité dans la phase suivante, il reste dans ce fichier mais son statut passe à `traité`
- le but n'est pas de lister des idées vagues, mais des reports pédagogiques concrets

## Reports en attente

### Report 1

- statut : `à traiter`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : configuration détaillée ESLint, Prettier, Husky et conventions de commit
- raison du report : ces sujets alourdissaient la phase avant même la première preuve observable front + back
- forme attendue : étape complète centrée sur l'outillage qualité minimal utile au premier vrai incrément métier

### Report 2

- statut : `à traiter`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : Docker Compose, PostgreSQL et variables d'environnement backend
- raison du report : la preuve technique minimale de phase 0 fonctionne sans base de données et sans infrastructure locale supplémentaire
- forme attendue : étape complète introduisant la persistance quand un premier besoin métier concret apparaît

### Report 3

- statut : `à traiter`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : Checkstyle, Stylelint et structure miroir détaillée de `tests/`
- raison du report : ces conventions sont plus utiles une fois le premier flux fonctionnel en place et risquaient de transformer la phase 0 en checklist d'outillage
- forme attendue : soit étape dédiée, soit renvoi vers guide annexe selon la densité de la phase 1

### Report 4

- statut : `à traiter`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : pipeline GitLab CI/CD complet et premier déploiement Fly.io
- raison du report : le déploiement était trop précoce par rapport à la maturité réelle du projet et brouillait le livrable local minimal
- forme attendue : section de préparation ou premier déploiement selon la cohérence du périmètre de phase 1

### Report 5

- statut : `à traiter`
- phase d'origine : phase 0
- phase cible : phase 1
- élément retiré ou allégé : lecture ou exercice ADR en étape autonome
- raison du report : la phase 0 devait rester focalisée sur l'exécution réelle du setup, sans détour documentaire principal
- forme attendue : renvoi ciblé ou exercice ADR uniquement quand une vraie décision structurante apparaît
