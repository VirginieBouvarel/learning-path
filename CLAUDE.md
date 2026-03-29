# KataSensei — Learning Path

## Ce repo

Contenu pédagogique du learning path KataSensei, exporté depuis Notion en markdown.
**Git = source de vérité. Notion = affichage. On itère ici, on pousse vers Notion quand c'est validé.**

Autrice : Virginie (développeuse frontend vue.js depuis 5 ans, objectif devenir développeuse fullstack Vue 3 / TypeScript strict / Java 21).

## Le projet fil rouge

KataSensei = plateforme d'entraînement aux katas de code. Éditeur Monaco, supervision IA socratique (Claude API), exécution sécurisée (Piston API), compte utilisateur, suivi de progression.

**Stack** : Vue 3 + TS strict + Pinia | Java 21 + Spring Boot 3 + Maven | Hexagonale front+back | TDD | PostgreSQL + Redis + Docker + GitHub Actions + Fly.io

## Fichiers importants

### Phases (le cœur du learning path)

| Fichier | Contenu | Guide pas-à-pas |
|---------|---------|-----------------|
| `KataSensei — Learning Path/Phase 0 — Setup...md` | Setup, config, prod day 1 (~6h) | Oui (7 sous-pages) |
| `KataSensei — Learning Path/Phase 1 — HTTP...md` | REST, TDD, erreurs centralisées (~10h) | Oui (1 sous-page) |
| `KataSensei — Learning Path/Phase 2 — Typage...md` | Typage fort TS, useAsync, hexa front (~10h) | Oui (1 sous-page) |
| `KataSensei — Learning Path/Phase 3 — Auth...md` | JWT, SOLID, Value Objects (~10h) | Oui (1 sous-page) |
| `KataSensei — Learning Path/Phase 4 — Architecture...md` | Hexa complète + patterns (~14h) | NON |
| `KataSensei — Learning Path/Phase 5...md` | Events, SSE, Redis, ACL (~10h) | NON |
| `KataSensei — Learning Path/Phase 6...md` | OpenAPI, tests avancés, Decorator (~10h) | NON |
| `KataSensei — Learning Path/Phase 7...md` | CI/CD, Docker multi-stage, prod (~6h) | NON |

**Total : ~76h · ~5 mois**

### Références et conventions

| Fichier | Rôle |
|---------|------|
| `Ubiquitous Language — ADR 000...md` | Termes métier FR (Kata, Tentative, Indice) / techniques EN (Repository, UseCase) |
| `ADR 003 — Conventions front...md` | CSS scoped + BEM, shadcn-vue, SFC, tests/ miroir |
| `Conventional Commits...md` | `type(contexte): description en français` |
| `Arborescence et testabilité...md` | Structure cible front + back + matrice de testabilité |
| `Workflow GitLab...md` | Branches, MR, CI/CD |
| `Checklist sécurité & performances...md` | Checklist pré-prod OWASP |
| `Comment utiliser Claude...md` | Quand utiliser claude.ai vs Claude Code vs extension IDE |

### Données (CSV)

- Backlog KataSensei (tickets par phase)
- Suivi de progression (compétences à acquérir par phase)
- Documentations & Ressources (liens externes)

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
5. **Ne jamais modifier Notion directement.** On édite le markdown ici, on pousse vers Notion manuellement après validation.

## Lacunes connues

- Phases 4-7 : overview seulement, pas de guide pas-à-pas
- Guides phases 0-3 : TDD mentionné conceptuellement mais pas d'exercices concrets d'écriture de tests
- Fichiers Notion avec UUIDs dans les noms (cosmétique, pas bloquant)

## Sync Notion

Quand une version est prête :
1. `git tag notion-sync-YYYY-MM-DD`
2. Pousser le contenu vers Notion (copier-coller ou MCP Notion)
3. Pour voir les changements depuis le dernier sync : `git diff notion-sync-YYYY-MM-DD`
