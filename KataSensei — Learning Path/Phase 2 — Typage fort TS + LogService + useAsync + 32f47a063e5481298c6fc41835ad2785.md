# Phase 2 — Typage fort TS + LogService + useAsync + archi hexa front

> Le TypeScript qui protège vraiment. Premiers patterns headless. Première archi hexagonale côté front.
> 

**Durée estimée** : 2 semaines · ~10 h

**Catégories** : 🟣 Typage fort · 🟠 Design patterns · 🟢 Archi hexagonale

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 🏷️ Branded types : KataId, UserId

*≈ newtype en Haskell/Rust*

```tsx
type KataId = string & { readonly _brand: 'KataId' }
type UserId = string & { readonly _brand: 'UserId' }

// ✔ compile
const id: KataId = 'abc' as KataId
// ✖ erreur à la compilation
const wrong: KataId = 'abc' as UserId
```

Impossible de mélanger les IDs. Le compilateur TS devient ton premier testeur.

### 🔀 Discriminated unions – états de session

*≈ sealed classes Java*

```tsx
type SessionState =
  | { status: 'idle' }
  | { status: 'running'; startedAt: Date }
  | { status: 'completed'; score: number; hintsUsed: number }

// Le compilateur interdit de lire score si status !== 'completed'
```

### ✅ Result pattern + type guards

*≈ Either en FP*

```tsx
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

// L'appelant est forcé de gérer les deux cas
const result = await kataRepo.findById(id)
if (!result.ok) {
  // traitement de l'erreur obligé
}
```

### 🪵 LogService typé — adapter sortant front

*≈ AiSensei côté front*

Interface `LogPort`. `ConsoleLogger` en dev, `SentryLogger` en prod. Ton premier adapter sortant front — même principe que les ports de l'archi hexagonale.

```tsx
// Utilisation
logService.info('kata:submit', { kataId, userId, duration })
logService.error('kata:execution-failed', { kataId, error })
```

### ⏳ useAsync — loader headless réutilisable

*≈ renderless component, pattern seed4J*

```tsx
const { data, status, error } = useAsync(() => kataRepo.findById(id))
// status : 'idle' | 'loading' | 'success' | 'error'
// Réutilisé sur toutes les pages de KataSensei
```

### 🔷 Archi hexa front — domain/infra/ui

*≈ separation of concerns Vue avancée*

- `src/domain/` — types purs, use cases TS, zéro import framework
- `src/infrastructure/` — ApiKataRepository, LocalStorageCache
- `src/ui/` — composants Vue qui reçoivent les use cases via inject

---

## Refactoring guidé

Refactoring du frontend phase 1 : on remplace les `string` libres par des branded types, les états épars par des discriminated unions, les `try/catch` par le Result pattern. **Le diff montre exactement pourquoi ça compte.**

---

## KataSensei à cette étape

Front Vue typé à fond. Impossible de rendre un résultat d'exécution si la session n'est pas `running`. Impossible de mélanger un `KataId` et un `UserId`. `LogService` actif. `useAsync` utilisé sur toutes les pages.

---

## Checkpoints

- [ ]  Branded types `KataId`, `UserId` créés
- [ ]  `SessionState` en discriminated union
- [ ]  `Result<T,E>` implémenté et utilisé sur les appels API
- [ ]  Type guards avec exhaustivité (`never`)
- [ ]  `LogService` avec `ConsoleLogger` en dev
- [ ]  `useAsync` réutilisable créé et testé (Vitest)
- [ ]  Structure `domain/infra/ui` respectée
- [ ]  Refactoring front phase 1 terminé

---

## Livrable technique

Branded types + Result + useAsync. Refactoring front phase 1. Tests Vitest des type guards. Archi `domain/infra/ui` en place côté front.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*

[Guide pas-à-pas — Phase 2 (avec exercices)](Phase%202%20%E2%80%94%20Typage%20fort%20TS%20+%20LogService%20+%20useAsync%20+/Guide%20pas-%C3%A0-pas%20%E2%80%94%20Phase%202%20(avec%20exercices)%2032f47a063e54817fbac2e0ba059cfe90.md)