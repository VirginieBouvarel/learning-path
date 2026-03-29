# Créer le projet Spring Boot via Spring Initializr

ID: KS-4
Phase: Phase 0
Contexte: Back
Type: Setup
Concepts: CI/CD
Priorité: Haute
Statut: To Do

## Description

Générer le squelette du projet backend KataSensei.

## Sous-tâches

- [ ]  Aller sur [start.spring.io](http://start.spring.io)
- [ ]  Configurer : Java 21, Maven, Spring Boot 3.x, groupId `dev.katasensei`
- [ ]  Ajouter les dépendances : Web, JPA, PostgreSQL, Security, Validation, Actuator, Flyway
- [ ]  Ouvrir dans IntelliJ Ultimate
- [ ]  Lire et comprendre le `pom.xml` ligne par ligne
- [ ]  Vérifier que le projet compile : `mvn compile`

## Critère d'acceptation

`mvn spring-boot:run` démarre sans erreur. `/actuator/health` répond 200.