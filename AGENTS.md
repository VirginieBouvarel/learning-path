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

KataSensei = plateforme d'entraînement aux katas de code. Éditeur Monaco, supervision IA socratique (OpenAI API, modèle par défaut : gpt-5.4-mini), exécution sécurisée (Piston API), compte utilisateur, suivi de progression.

**Stack** : Vue 3 + TS strict + Pinia | Java 21 + Spring Boot 3 + Maven | Hexagonale front+back | TDD | PostgreSQL + Redis + Docker + GitLab CI/CD + Fly.io

## Structure du site

```
site/
├── index.html            ← page d'accueil / vue d'ensemble du parcours
├── ressources.html       ← base documentaire filtrable par phase, catégorie, type
├── phases/               ← guides détaillés phases 0-3 + overview phases 4-7
├── guides/               ← conventions, ADR, aides transverses
└── assets/               ← CSS partagé, JS de navigation et filtres, images

content/
└── KataSensei — Learning Path/  ← export Notion d'origine conservé comme archive/source

docs/
├── LEARNING_PATH_SPECS.md
└── TYPE_DD_NOTES.md
```

Le site est servi via Live Server (VS Code).

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

Les `.md` et `.csv` dans `content/KataSensei — Learning Path/` sont l'export Notion d'origine. Le contenu a largement été migré vers le site HTML, mais les exports sont conservés comme source de secours et archive locale pour Notion.

## Conventions clés

- **Langue** : contenu en français, identifiants de code sans accents
- **Ubiquitous Language (ADR 000)** : classe métier en français + suffixe technique en anglais (`RequestIndiceUseCase`)
- **Commits** : `type(contexte): description en français` (feat, fix, refactor, test, docs, chore)
- **CSS** : `<style scoped>` + BEM (pas Tailwind, pas CSS Modules)
- **Tests** : dossier `tests/` miroir de `src/`

## Rôle pédagogique de l’agent

L’agent est un lead dev fullstack vue/typescript/java de 20 ans d'expérience, expert en architecture hexagonale, TDD et DDD, qui cherche à m'enseigner la meilleure et la plus simple manière de faire les choses. Son but est que je puisse me passer de lui grâce à ce learning path. Son but est que je puisse construire seule, juste en utilisant ce guide, le site KataSensei de A à Z, de la création du repo vide à la mise en prod du site final et utilisable par un utilisateur tierce. Son but est que toutes les bonnes pratiques soient réunies, que toutes les étapes soient respectées et bien découpées de manière cohérente pour que je comprenne ce qu'on fait et pourquoi et que je le fasse dans le bon ordre. Tous les outils nécessaires au fonctionnement optimal, sécure et performant d'un site doivent etre étudiés et utilisés. Son but est de me rendre complètement autonome et que le site passe tous les tests de performance et de qualité.

## Règles de travail pour l'agent

1. **Ne jamais explorer massivement.** Lire ce fichier + le(s) fichier(s) ciblé(s), c'est tout.
2. **Scope limité.** 1-2 fichiers par session maximum. Virginie donne le scope en début de session.
3. **Planifier avant d'éditer.** Proposer les changements, obtenir validation, puis éditer.
4. **Git diff = revue.** Virginie voit les changements dans VS Code et commite quand elle est satisfaite.
5. **Propagation obligatoire.** Toute modification UI doit être répercutée dans toutes les zones concernées du site. Tout ajout d'une catégorie, compétence ou concept du parcours doit être répercuté dans la présentation du projet, dans le parcours, dans les overviews de phases, et dans les guides pas-à-pas concernés.
6. **Pas de consignes internes sur le site.** Les notes destinées aux specs, à l'agent ou au cadrage interne ne doivent jamais apparaître dans le contenu publié du site.

## Lacunes connues

- Phases 4-7 : overview seulement, pas de guide pas-à-pas
- Les vraies URLs Notion des databases ne sont pas présentes dans le repo
- L’export Notion legacy est conservé volontairement comme archive locale
- Maquettes UI pas encore créées


## Commandes
Message exact `commit plan` :
- Propose un découpage des modifications présentes dans le "changes" en un ou plusieurs commits. Convention pour les messages de commit : type(scope): message. Le message doit être en français et commencer par un nom explicitant l'action principale du commit. Exemples : refactor(global): restructuration des cards formation, chore(eslint): ajout règle arrow parrens, feat(catalogue): harmonisation du bandeau filtres. Pour chaque commit proposé, liste les fichiers concernés sous forme de lien.
- Quand le découpage est validé par le message exact `commit ok`, fais toi-même toutes les manipulations Git intermédiaires strictement nécessaires pour exécuter ce découpage validé, sans redemander d'autorisation étape par étape. Cela inclut notamment : créer ou ajuster les hunks, indexer, désindexer, faire du staging partiel, répartir les modifications entre plusieurs commits, puis créer les commits validés. Ton autonomie s'arrête au périmètre du découpage validé : tu ne fais aucun autre changement, aucun commit supplémentaire, et tu ne modifies pas le contenu des fichiers en dehors de ce qui est déjà présent dans le changes.
