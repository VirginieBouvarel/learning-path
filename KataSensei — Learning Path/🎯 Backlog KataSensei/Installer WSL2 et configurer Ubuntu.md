# Installer WSL2 et configurer Ubuntu

ID: KS-1
Phase: Phase 0
Contexte: Infra
Type: Setup
Concepts: CI/CD
Priorité: Haute
Statut: To Do

## Description

Installer WSL2 sur Windows et configurer l'environnement Ubuntu pour le développement.

## Sous-tâches

- [ ]  Activer WSL2 dans Windows
- [ ]  Installer Ubuntu 22.04 LTS
- [ ]  Mettre à jour les paquets (`sudo apt update && sudo apt upgrade`)
- [ ]  Configurer le fichier `.wslconfig` pour les ressources mémoire

## Critère d'acceptation

`wsl --version` retourne WSL 2. Ubuntu démarre sans erreur.