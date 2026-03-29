# ADR 003 — Conventions front (CSS, composants, structure)

> Décisions techniques structurantes pour le front KataSensei. Écrit une fois, stable.
> 

---

## Contexte

Le front Vue 3 de KataSensei nécessite des choix explicites sur le CSS, les composants, et la structure des fichiers de test. Ces choix affectent chaque composant du projet — ils doivent être décidés avant d'écrire le premier composant.

---

## Décisions

### 1. CSS — `<style scoped>` + BEM

Chaque SFC utilise `<style scoped>` pour l'isolation des styles. La convention de nommage des classes suit BEM (Block Element Modifier).

```css
/* Block */
.kata-card { ... }

/* Element */
.kata-card__titre { ... }
.kata-card__niveau { ... }

/* Modifier */
.kata-card--selectionne { ... }
.kata-card__niveau--difficile { ... }
```

**Pourquoi `scoped` et pas CSS Modules ?** CSS Modules nécessite `class="$style.titre"` dans les templates — plus verbeux sans gain réel en SFC. `scoped` est transparent et c'est la convention Vue standard.

**Pourquoi BEM et pas Tailwind ?** Tailwind surcharge les templates avec 10-15 classes par élément — lisibilité réduite et friction avec l'archi hexagonale front. BEM garde le template propre et le CSS explicite.

### 2. Composants — shadcn-vue

On utilise [shadcn-vue](https://www.shadcn-vue.com/) comme source de composants. Les composants sont copiés dans le projet (pas une dépendance externe) — on en est propriétaire, on les lit, on les comprend.

**Pourquoi pas Vuetify ?** Vuetify impose un design system opinionnaire difficile à personnaliser. shadcn-vue est non-opinionnaire — tu amènes le CSS, tu gardes le contrôle.

**Pourquoi pas Tailwind seul ?** Voir ci-dessus.

### 3. SFC entiers — pas de découpage

Chaque composant Vue est un fichier `.vue` unique contenant `<template>`, `<script setup>`, et `<style scoped>`. Pas de découpage en fichiers `.html` + `.css` + `.ts` séparés.

**Pourquoi ?** Vite, Volar et Vitest sont optimisés pour les SFC monofichiers. Le découpage à la Angular ajoute de la complexité de navigation sans bénéfice dans l'écosystème Vue.

### 4. Structure des tests — dossier `tests/` séparé

Les tests sont dans un dossier `tests/` à côté de `src/`, reproduisant la même arborescence.

```
katasensei-front/
  src/
    domain/
      usecases/
        GetKatasUseCase.ts
    ui/
      components/
        KataCard.vue
  tests/
    domain/
      usecases/
        GetKatasUseCase.test.ts
    ui/
      components/
        KataCard.test.ts
```

**Pourquoi pas de dossier par composant ?** Un dossier `KataCard/` contenant `KataCard.vue` + `KataCard.test.ts` crée une navigation plus lourde pour seulement 2 fichiers. Le dossier `tests/` séparé donne une vue claire de ce qui est testé.

### 5. Linter CSS — Stylelint

Stylelint avec `stylelint-config-recommended-vue` lint les styles dans les SFC. Configuré pour s'exécuter on save dans IntelliJ, et dans le pre-commit hook Husky.

---

## Alternatives rejetées

| Alternative | Raison du rejet |
| --- | --- |
| Tailwind CSS | Templates illisibles, friction avec l'archi hexagonale |
| Vuetify 3 | Design system opinionnaire, lock-in fort |
| CSS Modules | Plus verbeux que `scoped` sans gain réel en SFC |
| Dossier par composant | Navigation lourde pour 2 fichiers par composant |
| Colocalization tests | Mélange code source et tests dans le même dossier |

---

## Conséquences

- Tous les SFC utilisent `<style scoped>` avec BEM
- shadcn-vue est installé en phase 0, utilisé dès la phase 1
- Stylelint est configuré en phase 0 avec ESLint et Prettier
- Les tests vivent dans `tests/` avec la même arborescence que `src/`
- La convention BEM est documentée ici — pas répétée dans chaque guide de phase