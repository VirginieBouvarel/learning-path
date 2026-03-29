# Configurer GitLab + workflow MR

ID: KS-7
Phase: Phase 0
Contexte: Infra
Type: Setup
Concepts: CI/CD
Priorité: Moyenne
Statut: To Do

## Description

Initialiser le repository GitLab et mettre en place le workflow de merge requests.

## Sous-tâches

- [ ]  Créer le repository GitLab `katasensei`
- [ ]  Initialiser le monorepo (back + front dans le même repo)
- [ ]  Configurer les branch protection rules : main protégée, MR obligatoire
- [ ]  Créer le template de MR : description, checklist (tests verts, lint propre, ADR si décision)
- [ ]  Configurer Conventional Commits + Commitizen
- [ ]  Créer la première MR : setup du projet

## Critère d'acceptation

On ne peut pas pusher directement sur main. Toute modification passe par une MR.