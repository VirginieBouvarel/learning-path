# Créer le projet Vue 3 + TypeScript strict

ID: KS-5
Phase: Phase 0
Contexte: Front
Type: Setup
Concepts: Typage fort
Priorité: Haute
Statut: To Do

## Description

Générer le squelette du projet frontend KataSensei avec toutes les options.

## Sous-tâches

- [ ]  `npm create vue@latest katasensei-front`
- [ ]  Activer : TypeScript, Vue Router, Pinia, Vitest, Playwright, ESLint, Prettier
- [ ]  Configurer `tsconfig.app.json` : strict, noUncheckedIndexedAccess, exactOptionalPropertyTypes
- [ ]  Créer la structure de dossiers : domain/ infra/ stores/ ui/
- [ ]  Vérifier : `npm run type-check` passe

## Critère d'acceptation

`npm run dev` démarre sur [localhost:5173](http://localhost:5173). `npm run type-check` passe sans erreur.