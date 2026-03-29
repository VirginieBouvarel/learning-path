# KataSensei — Learning Path

## Ce repo

Site statique de formation personnalisé pour Virginie.
Guide pas-à-pas pour construire KataSensei, de zéro à la mise en prod.

Autrice : Virginie (développeuse frontend Vue.js depuis 5 ans, objectif devenir développeuse fullstack Vue 3 / TypeScript strict / Java 21).

## Les 3 couches du projet

| Couche | Outil | Rôle |
|--------|-------|------|
| **Formation** | Ce repo — site HTML statique | Guide de formation : phases, concepts, guides pas-à-pas, maquettes |
| **Pilotage** | Notion databases | Backlog, suivi de progression, docs — interactif (cocher, filtrer) |
| **Code** | Repo KataSensei (séparé) | Le projet fil rouge lui-même |

## Le projet fil rouge

KataSensei = plateforme d'entraînement aux katas de code. Éditeur Monaco, supervision IA socratique (Claude API), exécution sécurisée (Piston API), compte utilisateur, suivi de progression.

**Stack** : Vue 3 + TS strict + Pinia | Java 21 + Spring Boot 3 + Maven | Hexagonale front+back | TDD | PostgreSQL + Redis + Docker + GitHub Actions + Fly.io

## Structure du site

```
index.html                ← page d'accueil / vue d'ensemble du parcours
phases/                   ← une page par phase (guide pas-à-pas détaillé)
  phase-0.html
  phase-1.html
  ...
assets/                   ← CSS partagé, images, maquettes futures
```

Le site est servi via WAMP : `http://localhost/perso/learning-path/`

**Total parcours : ~76h · ~5 mois**

## Contenu du site

- Vue d'ensemble du projet + stack + timeline
- Accordéons par phase : concepts (avec analogies Vue→Java), livrables, état de KataSensei
- Guides pas-à-pas détaillés pour chaque phase
- Liens vers les databases Notion (backlog, suivi, docs)
- À venir : maquettes UI (Stitch/Lovable/Uizard) intégrées dans les phases

## Fichiers markdown (héritage Notion)

Les `.md` dans `KataSensei — Learning Path/` sont l'export Notion d'origine. Le contenu est progressivement migré vers le site HTML. Les fichiers .md seront supprimés une fois leur contenu intégré.

## Conventions clés

- **Langue** : contenu en français, identifiants de code sans accents
- **Ubiquitous Language (ADR 000)** : classe métier en français + suffixe technique en anglais (`RequestIndiceUseCase`)
- **Commits** : `type(contexte): description en français` (feat, fix, refactor, test, docs, chore)
- **CSS** : `<style scoped>` + BEM (pas Tailwind, pas CSS Modules)
- **Tests** : dossier `tests/` miroir de `src/`

## Règles de travail pour Claude

1. **Ne jamais explorer massivement.** Lire ce fichier + le(s) fichier(s) ciblé(s), c'est tout.
2. **Scope limité.** 1-2 fichiers par session maximum. Virginie donne le scope en début de session.
3. **Planifier avant d'éditer.** Proposer les changements, obtenir validation, puis éditer.
4. **Git diff = revue.** Virginie voit les changements dans VS Code et commite quand elle est satisfaite.

## Lacunes connues

- Phases 4-7 : overview seulement, pas de guide pas-à-pas
- Guides phases 0-3 : TDD mentionné conceptuellement mais pas d'exercices concrets d'écriture de tests
- Le site est encore un fichier unique (overview.html), pas encore découpé en pages
- Liens Notion databases pas encore ajoutés
- Maquettes UI pas encore créées
