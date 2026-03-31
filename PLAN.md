# Plan — Site statique de formation KataSensei

## Contexte

Le repo `learning-path` contient un export Notion (markdown + CSV). L'objectif est de proposer un **vrai site statique de formation** multi-pages, servi via Live Server (VS Code) ou WAMP, qui guide Virginie pas-à-pas dans la construction de KataSensei.

Notion reste pour l'**interactif** (backlog, suivi de progression). Le HTML est pour la **lecture** (guide, concepts, exercices, références, ressources).

---

## Structure cible du site

```
learning-path/
├── index.html                        ← vue d'ensemble + timeline + accordéons + sidebar Notion
├── ressources.html                   ← 78 ressources filtrables (remplace le CSV)
│
├── phases/
│   ├── phase-0.html                  ← guide pas-à-pas Phase 0 (801 lignes md)
│   ├── phase-0-wsl2.html             ← sous-page : WSL2 + ZSH (134 lignes)
│   ├── phase-0-ide.html              ← sous-page : IntelliJ (222 lignes)
│   ├── phase-0-structure.html        ← sous-page : arborescence (65 lignes)
│   ├── phase-1.html                  ← guide Phase 1 (~980 lignes md, exercices TDD)
│   ├── phase-2.html                  ← guide Phase 2 (642 lignes, TypeScript)
│   ├── phase-3.html                  ← guide Phase 3 (~940 lignes, SOLID/JWT)
│   ├── phase-4.html                  ← overview + "guide à venir"
│   ├── phase-5.html                  ← overview + "guide à venir"
│   ├── phase-6.html                  ← overview + "guide à venir"
│   └── phase-7.html                  ← overview + "guide à venir"
│
├── references/
│   ├── ubiquitous-language.html      ← ADR 000 (91 lignes)
│   ├── conventions-front.html        ← ADR 003 (99 lignes)
│   ├── conventional-commits.html     ← format commits (73 lignes)
│   ├── arborescence.html             ← structure + tests (268 lignes + image)
│   ├── workflow-gitlab.html          ← branches, MR, CI (150 lignes)
│   ├── utiliser-claude.html          ← guide d'utilisation Claude (123 lignes)
│   ├── optional-java.html            ← cheat sheet Optional (43 lignes)
│   ├── datagrip.html                 ← setup DataGrip (60 lignes)
│   └── checklist-securite.html       ← checklist OWASP (82 lignes)
│
├── assets/
│   ├── css/
│   │   ├── main.css                  ← styles partagés (tokens, layout, nav, cards) ✅
│   │   ├── guide.css                 ← ToC sidebar, toggle solutions, exercices, code blocks
│   │   └── resources.css             ← filtres, grille de cards ressources
│   ├── js/
│   │   ├── navigation.js             ← nav dynamique, dropdown, scroll-spy ToC ✅
│   │   └── resources-filter.js       ← filtres par catégorie/phase
│   └── images/
│       └── arborescence.png
│
├── AGENTS.md
└── PLAN.md                           ← ce fichier
```

**~23 fichiers HTML** · Le dossier `KataSensei — Learning Path/` est conservé comme export Notion local.

---

## Décisions de conception

| Question | Décision | Pourquoi |
|----------|----------|----------|
| Guides longs : découper ou page unique ? | **Page unique + ToC sidebar** | Les guides font 640-980 lignes md. Une seule page préserve le flux narratif et le Ctrl+F. |
| Docs de référence | **Pages standalone dans `references/`** | Cross-cutting, utilisées depuis plusieurs phases. Évite la duplication. |
| Solutions des exercices | **`<details>/<summary>` natif** | Zéro JS, accessible, même UX que les toggles Notion. |
| Coloration syntaxique | **Prism.js** (2 fichiers, ~30KB, offline) | Les guides sont très code-heavy (Java, TS, bash). Sans coloration, la lisibilité chute. |
| Nav partagée | **Injectée via `navigation.js`** | Évite de dupliquer le HTML de la nav dans 23 fichiers. Un seul endroit à maintenir. |
| Ressources (78 entrées) | **Cards HTML hardcodées + data-attributes + filtres JS** | Petit dataset, pas besoin de JSON/fetch. Filtres par catégorie × phase. |
| CSS | **BEM + custom properties** | Cohérent avec ADR 003 du projet KataSensei. Tokens pour les couleurs des phases. |

---

## Layout des pages

### Index (vue d'ensemble)

```
┌─────────────────────────────────────────────────────────┐
│  Nav: KataSensei   Parcours   Phases ▾   Refs ▾   Docs │
├────────────────────────────────────────┬────────────────┤
│                                        │   NOTION       │
│  Carte projet + stack + tags           │                │
│                                        │  📋 Backlog    │
│  Timeline phases 0-7                   │  tickets &     │
│                                        │  exercices     │
│  Accordéon Phase 0  ▾                  │                │
│  Accordéon Phase 1  ▸                  │  📈 Suivi      │
│  Accordéon Phase 2  ▸                  │  progression   │
│  ...                                   │  & compétences │
│                                        │                │
│  Grille références                     │                │
│                                        │                │
│  Footer                                │                │
├────────────────────────────────────────┴────────────────┤
│  Sur mobile : sidebar Notion → barre horizontale en haut│
└─────────────────────────────────────────────────────────┘
```

### Page guide (phase-N.html)

```
┌─────────────────────────────────────────────────┐
│  Nav + Breadcrumb: Parcours > Phase 1           │
├──────────┬──────────────────────────────────────┤
│  ToC     │  Titre + durée + catégories          │
│  sticky  │                                      │
│          │  Docs utiles pour cette phase (liens) │
│  Étape 1 │                                      │
│  Étape 2 │  Étape 1 — Titre                     │
│  · Ex 1  │    Exercice 1                        │
│  · Ex 2  │    ▸ Solution (toggle)               │
│  Étape 3 │    Exercice 2                        │
│  ...     │    ▸ Solution (toggle)               │
│          │                                      │
│  ☑ Check │  Étape 2 — Titre                     │
│          │  ...                                  │
│          │                                      │
│          │  Checklist finale                     │
└──────────┴──────────────────────────────────────┘
```

---

## Avancement

### ✅ Sprint 1 — Fondations (terminé)
- [x] `assets/css/main.css` — design tokens, layout, nav, cards, callouts
- [x] `assets/js/navigation.js` — nav injectée, dropdowns, hamburger mobile
- [x] `index.html` — page d'accueil complète avec sidebar Notion
- [x] Vérifié via Live Server (VS Code)

### ✅ Sprint 2 — Template guide + Phase 0
- [x] `assets/css/guide.css` (ToC sidebar sticky, toggle solutions `<details>`, blocs de code, Prism.js)
- [x] `phases/phase-0.html` (801 lignes md → HTML, 12 étapes, ToC)
- [x] `phases/phase-0-wsl2.html` (134 lignes)
- [x] `phases/phase-0-ide.html` (222 lignes)
- [x] `phases/phase-0-structure.html` (65 lignes)

### ✅ Sprint 3 — Pages de référence (9 pages)
- [x] `references/ubiquitous-language.html`
- [x] `references/conventions-front.html`
- [x] `references/conventional-commits.html`
- [x] `references/arborescence.html` (+ déplacer image)
- [x] `references/workflow-gitlab.html`
- [x] `references/utiliser-claude.html`
- [x] `references/optional-java.html`
- [x] `references/datagrip.html`
- [x] `references/checklist-securite.html`

### ✅ Sprint 4 — Guides Phases 1-3
- [x] `phases/phase-1.html` (~980 lignes, exercices TDD Java)
- [x] `phases/phase-2.html` (642 lignes, TypeScript)
- [x] `phases/phase-3.html` (~940 lignes, SOLID/JWT/Value Objects)

### ✅ Sprint 5 — Phases 4-7 (overview only)
- [x] `phases/phase-4.html` à `phase-7.html` (overview + bannière "guide à venir")

### ✅ Sprint 6 — Page ressources
- [x] `assets/css/resources.css`
- [x] `assets/js/resources-filter.js`
- [x] `ressources.html` (78 cards filtrables par catégorie et phase)

### 🟡 Sprint 7 — Polish + nettoyage
- [x] Cross-linking (phases ↔ références ↔ ressources)
- [x] Responsive (test 768px)
- [x] Supprimer `overview.html` (remplacé par `index.html`)
- [x] Mettre à jour `AGENTS.md`
- [ ] Ajouter les vraies URLs Notion dans `index.html`

---

## Notes techniques

- **Live Server** (extension VS Code) pour tester en local — pas besoin de WAMP
- **Prism.js** à télécharger et mettre dans `assets/` pour la coloration syntaxique (Java, TypeScript, bash, SQL)
- **Liens Notion** dans `index.html` sidebar : remplacer `https://www.notion.so` par les vraies URLs des databases
- **Blocage actuel** : les vraies URLs Notion des databases ne sont pas présentes dans le repo, donc elles ne peuvent pas être injectées sans source supplémentaire
