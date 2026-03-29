# Premier déploiement Fly.io + pipeline CI minimal

ID: KS-8
Phase: Phase 0
Contexte: Infra
Type: Setup
Concepts: CI/CD, Sécurité
Priorité: Haute
Statut: To Do

## Description

Déployer KataSensei en prod dès la phase 0 — même si c'est juste GET /health.

## Sous-tâches

- [ ]  Installer flyctl dans WSL2
- [ ]  `fly auth login`
- [ ]  Créer un Dockerfile minimal (non optimisé — viendra en phase 7)
- [ ]  `fly launch` et configurer l'app
- [ ]  Ajouter les secrets [Fly.io](http://Fly.io) : JWT_SECRET, DB_URL, etc.
- [ ]  Créer le pipeline GitHub Actions minimal : test → deploy
- [ ]  Vérifier : `curl https://katasensei-back.fly.dev/actuator/health` retourne 200

## Critère d'acceptation

KataSensei a une URL publique en HTTPS. Le pipeline CI est vert sur main.