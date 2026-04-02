# PHASE 0

Ce fichier décrit le cadrage spécifique de la phase 0.

## Rôle de la phase

La phase 0 doit partir d'un poste Windows 11 qui n'est pas encore prêt pour le projet, puis construire l'environnement de travail et un premier système fullstack minimal observable.

## Point de départ réel

- Windows 11 est installé
- WSL2, Ubuntu, `zsh` et Oh My Zsh ne sont pas encore installés
- aucun repo KataSensei n'existe encore sur la machine
- aucun projet backend ou frontend n'existe encore

## Livrable de fin de phase

À la fin de la phase 0, la lectrice doit pouvoir montrer :

- un environnement WSL2 Ubuntu fonctionnel avec `zsh`
- un repo Git initialisé dans le système de fichiers Linux
- un backend Spring Boot qui démarre localement
- un health check observable
- un endpoint simple observable
- un frontend Vue qui s'affiche localement
- une preuve de communication frontend/backend visible dans le navigateur

## Périmètre obligatoire

- installation de WSL2
- installation d'Ubuntu
- installation de `zsh` et Oh My Zsh
- création du workspace Linux
- initialisation du repo
- installation Java 21 et Maven via SDKMAN
- génération d'un backend Spring Boot minimal
- exposition d'un health check
- exposition d'un premier endpoint simple
- installation Node.js via NVM
- génération d'un frontend Vue 3 minimal
- affichage d'une réponse backend dans le frontend

## Hors scope volontaire

- pipeline GitLab CI/CD complet
- déploiement Fly.io complet
- PostgreSQL et Docker Compose
- conventions détaillées ESLint, Prettier, Husky
- Checkstyle et Stylelint détaillés
- structure miroir détaillée de `tests/`
- exercice ADR autonome

## Références utiles pour cette phase

- `site/phases/phase-0.html`
- `docs/audits/PHASE_0_AUDIT.md`
- `docs/NEXT_PHASE.md`
