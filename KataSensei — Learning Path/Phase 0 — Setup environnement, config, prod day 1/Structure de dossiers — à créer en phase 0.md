# Structure de dossiers — à créer en phase 0

# Structure de dossiers à créer en phase 0

> Créer les dossiers vides dès le setup. Comme les fondations d'une maison — plus facile à poser avant de construire les murs.
> 

---

## Commandes

```bash
cd katasensei-front/src

# Domaine (zéro import Vue, zéro Pinia)
mkdir -p domain/types domain/ports domain/usecases

# Infrastructure (adapters, mappers, composables headless)
mkdir -p infrastructure/api/dto infrastructure/api/mappers
mkdir -p infrastructure/logging infrastructure/composables

# Stores Pinia (état seul)
mkdir -p stores

# UI (composants Vue + composables avec cycle de vie)
mkdir -p ui/components ui/views ui/composables

# Fichiers .gitkeep pour committer les dossiers vides
find . -type d -empty -exec touch {}/.gitkeep \;
```

---

## Résultat attendu

```
src/
├── domain/
│   ├── types/         .gitkeep
│   ├── ports/         .gitkeep
│   └── usecases/      .gitkeep
├── infrastructure/
│   ├── api/
│   │   ├── dto/       .gitkeep
│   │   └── mappers/   .gitkeep
│   ├── logging/       .gitkeep
│   └── composables/   .gitkeep
├── stores/            .gitkeep
└── ui/
    ├── components/    .gitkeep
    ├── views/         .gitkeep
    └── composables/   .gitkeep
```

---

## Règle des 3 niveaux de composables

| Où | Dépendances | Testable comment |
| --- | --- | --- |
| `domain/usecases/` | Zéro | Vitest pur |
| `infrastructure/composables/` | `ref`, `watch` — pas de `onMounted` | Vitest + `@vue/test-utils` minimal |
| `ui/composables/` | `onMounted`, `useRouter`, stores Pinia | Vitest + `@vue/test-utils` complet |

**La règle** : pousser la logique le plus bas possible. Si un composable n'a pas besoin du cycle de vie Vue, il va dans `infrastructure/composables/`. S'il a besoin d'être dans un contexte de composant monté, il va dans `ui/composables/`.