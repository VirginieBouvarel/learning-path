# Configurer Docker Compose + variables d'environnement

ID: KS-6
Phase: Phase 0
Contexte: Infra
Type: Setup
Concepts: CI/CD, Sécurité
Priorité: Haute
Statut: To Do

## Description

Mettre en place l'infrastructure locale avec PostgreSQL et Redis.

## Sous-tâches

- [ ]  Créer `docker-compose.yml` avec PostgreSQL 16 + Redis 7
- [ ]  Ajouter les health checks sur les deux services
- [ ]  Créer `.env` avec les variables locales
- [ ]  Créer `.env.example` avec des valeurs fictives
- [ ]  Ajouter `.env` dans `.gitignore`
- [ ]  Configurer les profils Spring Boot (dev/test/prod)

## Critère d'acceptation

`docker-compose up -d` : les deux services passent en `healthy`. Spring se connecte à PostgreSQL.