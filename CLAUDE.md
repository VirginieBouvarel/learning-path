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
ressources.html           ← base documentaire filtrable par phase, catégorie, type
phases/                   ← guides détaillés phases 0-3 + overview phases 4-7
references/               ← conventions, ADR, aides transverses
assets/                   ← CSS partagé, JS de navigation et filtres, images
```

Le site est servi via Live Server (VS Code) ou WAMP.

**Total parcours : ~76h · ~5 mois**

## Contenu du site

- Vue d'ensemble du projet + stack + timeline
- Accordéons par phase : concepts (avec analogies Vue→Java), livrables, état de KataSensei
- Guides pas-à-pas détaillés pour chaque phase
- Pages de référence internes (workflow, conventions, sécurité, Optional, DataGrip)
- Ressources filtrables par phase, catégorie et type
- Liens vers les databases Notion (backlog, suivi, docs) quand les vraies URLs seront injectées
- À venir : maquettes UI (Stitch/Lovable/Uizard) intégrées dans les phases

## Fichiers markdown / CSV (héritage Notion)

Les `.md` et `.csv` dans `KataSensei — Learning Path/` sont l'export Notion d'origine. Le contenu a largement été migré vers le site HTML, mais les exports sont conservés comme source de secours et archive locale pour Notion.

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
- Les vraies URLs Notion des databases ne sont pas présentes dans le repo
- L’export Notion legacy est conservé volontairement comme archive locale
- Maquettes UI pas encore créées
