# Installer SDKMAN + Java 21 + Maven

ID: KS-3
Phase: Phase 0
Contexte: Back
Type: Setup
Concepts: CI/CD
Priorité: Haute
Statut: To Do

## Description

Installer Java 21 via SDKMAN pour pouvoir switcher de version facilement.

## Sous-tâches

- [ ]  Installer SDKMAN dans WSL2
- [ ]  `sdk install java 21.0.3-tem`
- [ ]  `sdk default java 21.0.3-tem`
- [ ]  Installer Maven : `sdk install maven`
- [ ]  Vérifier : `java -version` et `mvn -version`

## Critère d'acceptation

`java -version` retourne openjdk 21. `mvn -version` retourne Maven 3.x.