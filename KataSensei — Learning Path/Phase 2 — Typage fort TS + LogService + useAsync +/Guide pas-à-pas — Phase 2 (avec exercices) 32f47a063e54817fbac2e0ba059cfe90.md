# Guide pas-à-pas — Phase 2 (avec exercices)

> **Rappel** : tu lis l'objectif, tu essaies. La solution est dans un toggle — ne l'ouvre qu'après 20 minutes d'effort sincère.
> 

**Durée estimée : ~10h réparties sur 2 semaines**

> 🎯 **Objectif** : transformer le front Vue naïf de la phase 1 en une codebase typée à fond, avec une archi hexagonale propre : use cases purs dans le domaine, mappers comme Anti-Corruption Layer, stores Pinia comme état seul, composables répartis selon leur niveau de dépendance.
> 

---

---

## Étape 0 — Comprendre la structure cible avant de coder

Avant d'écrire une ligne, relis le code naïf de la phase 1 et réponds à ces questions :

1. Combien d'endroits font un `fetch` directement dans un composant ou un composable ?
2. Si l'API change le nom du champ `title` en `name`, combien de fichiers dois-tu modifier ?
3. Si tu veux tester `useKataList` sans navigateur, est-ce possible ? Pourquoi ?
4. Si `loading`, `error`, `data` sont trois `ref` indépendants, que se passe-t-il si on oublie de mettre `loading = false` dans le `catch` ?

> Ces quatre douleurs ont chacune une solution dans cette phase. Garde tes réponses — elles te serviront de motivation.
> 

### La structure cible

```
src/
├── domain/              ← Zéro import Vue, zéro Pinia — Vitest pur
│   ├── types/             (branded types, result, unions, guards)
│   ├── ports/             (interfaces — KataRepository, LogPort)
│   └── usecases/          (logique pure — GetKatasUseCase)
│
├── infrastructure/      ← Adapters + composables headless
│   ├── api/
│   │   ├── ApiKataRepository.ts
│   │   └── mappers/           (ApiKataDto → Kata — ACL)
│   ├── logging/
│   └── composables/       (useAsync — ref/watch ok, pas de onMounted)
│
├── stores/              ← Pinia — état seul, appelle les use cases
│
└── ui/
    ├── composables/       ← onMounted, useRouter, stores (cycle de vie Vue)
    ├── components/
    └── views/
```

```
commit suggestion → chore(front): mise en place structure domain/infra/stores/ui
```

---

## Étape 1 — Branded types

### Exercice 1.1 — Crée `src/domain/types/branded.ts`

**Contraintes :**

- `KataId`, `UserId`, `SessionId` en branded types
- Fonctions helpers `toKataId(s: string): KataId` — seuls endroits où `as` est autorisé
- Ces helpers sont les **uniques portes d'entrée** pour créer des branded types

**Question** : pourquoi centraliser les `as` dans des helpers plutôt que de les écrire partout ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    export type KataId    = string & { readonly _brand: 'KataId' }
    export type UserId    = string & { readonly _brand: 'UserId' }
    export type SessionId = string & { readonly _brand: 'SessionId' }
    
    export const toKataId    = (s: string): KataId    => s as KataId
    export const toUserId    = (s: string): UserId    => s as UserId
    export const toSessionId = (s: string): SessionId => s as SessionId
    ```
    
    **Réponse** : un seul endroit à auditer si on veut valider les IDs. Si demain on ajoute une validation UUID, on la met dans `toKataId` et tout le projet en bénéficie.
    

```
commit suggestion → feat(typage): ajout branded types KataId UserId SessionId
```

---

## Étape 2 — Discriminated unions

### Exercice 2.1 — `AsyncState<T>` dans `src/domain/types/async.ts`

**Contraintes :** 4 états : `idle`, `loading`, `success<T>`, `error`. Fonctions constructeurs pour chaque état.

### Exercice 2.2 — `SessionState` dans `src/domain/types/session.ts`

**Contraintes :** `idle` | `running` (avec `startedAt`, `hintsUsed`) | `completed` (avec `score`, `completedAt`). Écris `canRequestHint(session: SessionState): boolean` avec le pattern `never` pour l'exhaustivité.

**Question** : que se passe-t-il si tu ajoutes un état `paused` sans mettre à jour `canRequestHint` ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    export type AsyncState<T> =
      | { status: 'idle' }
      | { status: 'loading' }
      | { status: 'success'; data: T }
      | { status: 'error'; message: string }
    
    export const idle    = <T>(): AsyncState<T> => ({ status: 'idle' })
    export const loading = <T>(): AsyncState<T> => ({ status: 'loading' })
    export const success = <T>(data: T): AsyncState<T> => ({ status: 'success', data })
    export const error   = <T>(message: string): AsyncState<T> => ({ status: 'error', message })
    ```
    
    ```tsx
    export function canRequestHint(session: SessionState): boolean {
      switch (session.status) {
        case 'idle':      return false
        case 'running':   return session.hintsUsed < 3
        case 'completed': return false
        default: {
          const _exhaustive: never = session
          return _exhaustive
        }
      }
    }
    ```
    
    **Réponse** : TypeScript émet une erreur sur `const _exhaustive: never = session` — `paused` n'est pas assignable à `never`. Le compilateur te force à gérer chaque cas.
    

```
commit suggestion → feat(typage): ajout discriminated unions AsyncState et SessionState
```

---

## Étape 3 — Result pattern + AppError

### Exercice 3.1 — `Result<T,E>` dans `src/domain/types/result.ts`

**Contraintes :** union `ok: true / value: T` ou `ok: false / error: E`. Fonctions `ok()`, `err()`, `map()`, `mapError()`.

### Exercice 3.2 — `AppError` dans `src/domain/types/errors.ts`

**Contraintes :** `NetworkError | NotFoundError | ValidationError | UnauthorizedError | UnexpectedError`. Fonction `toUserMessage(error: AppError): string` exhaustive avec `never`.

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    export type Result<T, E> =
      | { ok: true;  value: T }
      | { ok: false; error: E }
    
    export const ok  = <T>(value: T): Result<T, never>  => ({ ok: true, value })
    export const err = <E>(error: E): Result<never, E>  => ({ ok: false, error })
    
    export function map<T, U, E>(result: Result<T, E>, fn: (v: T) => U): Result<U, E> {
      return result.ok ? ok(fn(result.value)) : result
    }
    ```
    

```
commit suggestion → feat(typage): ajout Result pattern et AppError union
```

---

## Étape 4 — Type guards + template literal types

### Exercice 4.1 — Type guards dans `src/domain/types/guards.ts`

**Contraintes :** `isNetworkError`, `isValidationError`, `isAppError` — chacun vérifie la forme à runtime. Écris des tests Vitest pour chacun.

**Question** : différence entre `as NetworkError` et un type guard ?

### Exercice 4.2 — Routes typées dans `src/infrastructure/api/routes.ts`

**Contraintes :** `type KataRoute = \`/katas/${KataId}``. Fonction` buildKataRoute(id: KataId): KataRoute`. Il doit être impossible d'appeler la fonction avec un` string` brut.

```
commit suggestion → feat(typage): ajout type guards et routes typées
```

---

## Étape 5 — LogService

### Exercice 5.1 — Port dans `src/domain/ports/LogPort.ts`

**Contraintes :** interface avec `debug`, `info`, `warn`, `error` — chacun prend `context: string` et `data?: Record<string, unknown>`. C'est une interface dans `domain/` — elle ne sait pas si les logs vont dans la console ou dans Sentry.

### Exercice 5.2 — Adapters dans `src/infrastructure/logging/`

**Contraintes :** `ConsoleLogger` (logs colorés en dev) et `SilentLogger` (ne fait rien, pour les tests). Export selon l'environnement dans `index.ts`.

**Question** : pourquoi `SilentLogger` plutôt que de mocker `console` dans les tests ?

```
commit suggestion → feat(infra): ajout LogPort ConsoleLogger SilentLogger
```

---

## Étape 6 — Mappers (Anti-Corruption Layer)

> C'est l'étape la plus importante pour l'archi hexa front. Les mappers traduisent entre le langage de l'API et le langage du domaine. Sans eux, les types de l'API contaminent le domaine.
> 

### Exercice 6.1 — Définis le type de réponse API

**Objectif** : créer `src/infrastructure/api/dto/ApiKataDto.ts` qui représente exactement ce que l'API renvoie — avec les noms de champs de l'API, pas du domaine.

**Contraintes :**

- `id: string` (pas encore `KataId` — c'est le rôle du mapper de convertir)
- `title: string`
- `description: string`
- `difficulty: string` (pas encore l'enum — pareil)

> Ce type représente la réalité de l'API. Si l'API change, seul ce fichier change.
> 

### Exercice 6.2 — Crée `KataMapper` dans `src/infrastructure/api/mappers/KataMapper.ts`

**Objectif** : créer le mapper qui traduit `ApiKataDto` en `Kata` (type domaine).

**Contraintes :**

- `KataMapper.toDomain(dto: ApiKataDto): Kata` — utilise `toKataId()` pour convertir l'id
- `KataMapper.toDto(kata: Kata): ApiKataDto` — l'inverse
- C'est une **fonction pure** — même entrée = même sortie, zéro effet de bord
- Testable avec Vitest pur — écris les tests avant l'implémentation (TDD)

**Question** : pourquoi le mapper est dans `infrastructure/` et pas dans `domain/` ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    // src/infrastructure/api/dto/ApiKataDto.ts
    export interface ApiKataDto {
      id: string
      title: string
      description: string
      difficulty: string
    }
    ```
    
    ```tsx
    // src/infrastructure/api/mappers/KataMapper.ts
    import { toKataId } from '@/domain/types/branded'
    import type { ApiKataDto } from '../dto/ApiKataDto'
    import type { Kata } from '@/domain/types/kata'
    
    export const KataMapper = {
      toDomain(dto: ApiKataDto): Kata {
        return {
          id:          toKataId(dto.id),
          title:       dto.title,
          description: dto.description,
          difficulty:  dto.difficulty as Kata['difficulty'],
        }
      },
    
      toDto(kata: Kata): ApiKataDto {
        return {
          id:          kata.id,
          title:       kata.title,
          description: kata.description,
          difficulty:  kata.difficulty,
        }
      }
    }
    ```
    
    ```tsx
    // KataMapper.test.ts — écrit en TDD AVANT l'implémentation
    describe('KataMapper', () => {
      it('toDomain — convertit l\'id en KataId brandé', () => {
        const dto: ApiKataDto = { id: 'abc-123', title: 'FizzBuzz', description: '...', difficulty: 'EASY' }
        const kata = KataMapper.toDomain(dto)
        expect(kata.id).toBe('abc-123')
        // Le type est vérifié à la compilation : kata.id est KataId, pas string
      })
    })
    ```
    
    **Réponse** : le mapper est dans `infrastructure/` parce qu'il connaît le format de l'API (un détail d'infrastructure). Le domaine ne devrait pas savoir que les données viennent d'une API HTTP. Si demain tu passes à GraphQL, seul le mapper change.
    

```
commit suggestion → feat(infra): ajout KataMapper SessionMapper comme Anti-Corruption Layer
```

---

## Étape 7 — Port KataRepository + adapter

### Exercice 7.1 — Interface dans `src/domain/ports/KataRepository.ts`

**Contraintes :** `findAll(): Promise<Result<Kata[], AppError>>` et `findById(id: KataId): Promise<Result<Kata, AppError>>`. Interface dans `domain/` — elle ne sait pas que fetch existe.

### Exercice 7.2 — `ApiKataRepository` dans `src/infrastructure/api/`

**Contraintes :**

- Implémente `KataRepository`
- Utilise `KataMapper.toDomain()` pour convertir les réponses
- Mappe les erreurs HTTP vers les `AppError` typées
- Ne retourne jamais de `throw` — toujours un `Result`
- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    export class ApiKataRepository implements KataRepository {
      async findAll(): Promise<Result<Kata[], AppError>> {
        try {
          const res = await fetch(`${API_BASE}/katas`)
          if (!res.ok) return err({ kind: 'network', message: `HTTP ${res.status}` })
          const dtos: ApiKataDto[] = await res.json()
          return ok(dtos.map(KataMapper.toDomain))
        } catch {
          return err({ kind: 'network', message: 'Serveur inaccessible' })
        }
      }
    }
    ```
    

```
commit suggestion → feat(archi): ajout port KataRepository et adapter ApiKataRepository
```

---

## Étape 8 — Use cases purs

> Les use cases sont la logique métier pure. Ils ne savent pas que Vue existe, que Pinia existe, que fetch existe. Ils reçoivent leurs dépendances via le constructeur et retournent des `Result`.
> 

### Exercice 8.1 — `GetKatasUseCase` dans `src/domain/usecases/`

**Contraintes :**

- Reçoit `KataRepository` via le constructeur
- Méthode `execute(): Promise<Result<Kata[], AppError>>`
- Zéro import Vue, zéro import Pinia
- Écris d'abord le test (TDD) avec un `FakeKataRepository` que tu crées en 5 lignes

**Question** : pourquoi injecter `KataRepository` (l'interface) et pas `ApiKataRepository` (la classe) ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    // FakeKataRepository pour les tests — 5 lignes
    class FakeKataRepository implements KataRepository {
      constructor(private readonly katas: Kata[] = []) {}
      async findAll() { return ok(this.katas) }
      async findById(id: KataId) {
        const k = this.katas.find(k => k.id === id)
        return k ? ok(k) : err({ kind: 'not-found', resource: 'Kata' })
      }
    }
    ```
    
    ```tsx
    // GetKatasUseCase.test.ts — TDD, écrit AVANT l'implémentation
    describe('GetKatasUseCase', () => {
      it('retourne les katas disponibles', async () => {
        const fakeKata: Kata = { id: toKataId('1'), title: 'FizzBuzz', difficulty: 'EASY', description: '' }
        const useCase = new GetKatasUseCase(new FakeKataRepository([fakeKata]))
        const result = await useCase.execute()
        expect(result.ok).toBe(true)
        if (result.ok) expect(result.value).toHaveLength(1)
      })
    
      it('propage l\'erreur du repository', async () => {
        const failingRepo: KataRepository = {
          findAll: async () => err({ kind: 'network', message: 'oops' }),
          findById: async () => err({ kind: 'network', message: 'oops' })
        }
        const result = await new GetKatasUseCase(failingRepo).execute()
        expect(result.ok).toBe(false)
      })
    })
    ```
    
    ```tsx
    // GetKatasUseCase.ts
    export class GetKatasUseCase {
      constructor(private readonly repo: KataRepository) {}
    
      async execute(): Promise<Result<Kata[], AppError>> {
        return this.repo.findAll()
      }
    }
    ```
    
    **Réponse** : injecter l'interface permet de passer `FakeKataRepository` en test et `ApiKataRepository` en prod. Le use case ne sait pas d'où viennent les données. C'est le principe D de SOLID — et la règle de dépendance de l'archi hexagonale.
    

```
commit suggestion → feat(archi): ajout use cases purs GetKatasUseCase StartSessionUseCase
```

---

## Étape 9 — Stores Pinia comme état seul

### Exercice 9.1 — `useKataStore` dans `src/stores/`

**Contraintes :**

- Le store appelle le use case — **jamais `fetch` directement**
- Il stocke le résultat dans un `ref<Kata[]>`
- Il expose un getter `katasByDifficulty(d: Difficulty)`
- L'action `loadKatas()` retourne `void` — le state est mis à jour, pas retourné
- L'action utilise le Result pattern : si erreur, elle met à jour un état d'erreur
- Test avec `createPinia()` — use case mocké avec un objet qui implémente l'interface

**Question** : pourquoi le store ne retourne pas le Result directement à l'appelant ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    // src/stores/useKataStore.ts
    import { defineStore } from 'pinia'
    import { ref, readonly, computed } from 'vue'
    import type { GetKatasUseCase } from '@/domain/usecases/GetKatasUseCase'
    
    export const useKataStore = defineStore('kata', () => {
      const katas     = ref<Kata[]>([])
      const loadError = ref<string | null>(null)
      const isLoading = ref(false)
    
      // injecté via provide/inject dans main.ts
      const getKatasUseCase = inject<GetKatasUseCase>('getKatasUseCase')!
    
      const katasByDifficulty = computed(() =>
        (d: Difficulty) => katas.value.filter(k => k.difficulty === d)
      )
    
      async function loadKatas() {
        isLoading.value = true
        loadError.value = null
        const result = await getKatasUseCase.execute()
        if (result.ok) {
          katas.value = result.value
        } else {
          loadError.value = toUserMessage(result.error)
        }
        isLoading.value = false
      }
    
      return {
        katas: readonly(katas),
        loadError: readonly(loadError),
        isLoading: readonly(isLoading),
        katasByDifficulty,
        loadKatas,
      }
    })
    ```
    
    **Réponse** : le store est une source de vérité partagée. Plusieurs composants peuvent lire `katas` sans qu'aucun ne re-déclenche le chargement. Si le store retournait le Result, chaque appelant devrait le gérer — on reproduit le problème qu'on essayait de résoudre.
    

```
commit suggestion → feat(store): ajout useKataStore useSessionStore état seul
```

---

## Étape 10 — useAsync dans infrastructure/composables

### Exercice 10.1 — `useAsync` dans `src/infrastructure/composables/useAsync.ts`

**Contraintes :**

- Signature : `useAsync<T>(fn: () => Promise<Result<T, AppError>>)`
- Utilise `ref` de Vue — pas `onMounted` ni `useRouter`
- Retourne `{ state: Ref<AsyncState<T>>, execute: () => Promise<void> }`
- Test avec `@vue/test-utils` minimal (pas besoin de monter un composant)

```
commit suggestion → feat(infra): ajout composable headless useAsync
```

---

## Étape 11 — useKataList dans ui/composables

### Exercice 11.1 — `useKataList` dans `src/ui/composables/useKataList.ts`

**Objectif** : orchestrer le store + le cycle de vie Vue.

**Contraintes :**

- Utilise `onMounted` pour déclencher le chargement
- Utilise `useKataStore()` pour lire l'état
- Expose `katas`, `isLoading`, `loadError`, `retry()`
- Test avec `@vue/test-utils` complet — monter un composant minimal qui utilise ce composable

**Question** : pourquoi `useKataList` est dans `ui/composables/` et pas dans `infrastructure/composables/` ?

- Réponse
    
    Parce qu'il utilise `onMounted` — un hook du cycle de vie Vue. `onMounted` n'a de sens que dans le contexte d'un composant monté. Tout composable qui utilise un lifecycle hook (`onMounted`, `onUnmounted`, `watch` sur des props...) ou `useRouter` appartient à `ui/composables/`.
    
    `useAsync` dans `infrastructure/composables/` utilise `ref` mais pas de lifecycle hook — il peut être créé et utilisé en dehors d'un composant.
    

```
commit suggestion → feat(ui): ajout composable useKataList avec cycle de vie Vue
```

---

## Étape 11 bis — Composants KataCard et HintPanel avec shadcn-vue

### Exercice 11 bis.1 — Crée KataCard.vue

**Objectif** : créer le composant qui affiche un kata dans la liste.

**Contraintes :**

- Utilise le composant `Card` de shadcn-vue comme base
- Props typées avec les branded types : `id: KataId`, `titre: string`, `niveau: Niveau`
- Badge de difficulté avec le composant `Badge` de shadcn-vue
- `<style scoped>` avec BEM pour les éléments spécifiques
- Test dans `tests/ui/components/KataCard.test.ts` : vérifie le rendu du titre et du niveau

```tsx
// Props typées
interface Props {
  id: KataId
  titre: string
  niveau: Niveau
  description: string
}
```

### Exercice 11 bis.2 — Crée HintPanel.vue

**Objectif** : le panneau qui affiche les indices de l'IA en streaming.

**Contraintes :**

- Utilise le composant `ScrollArea` de shadcn-vue pour la zone de texte
- Bouton d'affichage/masquage de l'indice
- `<style scoped>` avec BEM
- Test dans `tests/ui/components/HintPanel.test.ts`

```bash
# Si pas encore installé
npx shadcn-vue@latest add scroll-area
```

```
commit suggestion → feat(kata): ajout composants KataCard et HintPanel avec shadcn-vue
```

---

## Étape 12 — Refactoring de KataListView

### Exercice 12.1 — Réécris KataListView avec la nouvelle architecture

**Contraintes :**

- Utilise `useKataList()` — plus de `ref`, plus de `try/catch`, plus de `fetch`
- Le template switche sur `isLoading`, `loadError`, et `katas`
- Bouton "Réessayer" qui appelle `retry()`
- `role="status"` sur le loading, `role="alert"` sur l'erreur

```
commit suggestion → refactor(kata): refactoring KataListView vers useKataList
```

---

## Étape 13 — ADR 003

### Exercice 13.1 — `docs/adr/003-architecture-hexagonale-front.md`

Documente les décisions :

- Pourquoi 3 niveaux de composables (domain / infrastructure / ui)
- Pourquoi les stores Pinia n'appellent pas fetch directement
- Pourquoi les mappers dans infrastructure/ et pas dans domain/
- Alternatives rejetées (tout dans le composant, stores avec fetch, pas de mapper)

---

## Checklist finale phase 2

- [ ]  `domain/types/` : branded types, result, async, session, errors, guards
- [ ]  `domain/ports/` : KataRepository (interface), LogPort (interface)
- [ ]  `domain/usecases/` : GetKatasUseCase testé en TDD Vitest pur
- [ ]  `infrastructure/api/dto/` : ApiKataDto
- [ ]  `infrastructure/api/mappers/` : KataMapper testé en TDD Vitest pur
- [ ]  `infrastructure/api/` : ApiKataRepository qui utilise KataMapper
- [ ]  `infrastructure/logging/` : ConsoleLogger + SilentLogger
- [ ]  `infrastructure/composables/` : useAsync testé @vue/test-utils minimal
- [ ]  `stores/` : useKataStore testé avec createPinia()
- [ ]  `ui/composables/` : useKataList testé @vue/test-utils complet
- [ ]  `KataListView.vue` refactorisé — plus de fetch inline
- [ ]  `npm run type-check` passe
- [ ]  `npm run test:unit` passe (guards + use cases + mappers + useAsync + store)
- [ ]  ADR 003 committé

---

## Erreurs fréquentes

| Erreur | Cause | Solution |
| --- | --- | --- |
| `inject()` retourne `undefined` | Use case non fourni dans `main.ts` | Ajouter `app.provide('getKatasUseCase', new GetKatasUseCase(...))` |
| Store non réactif dans le template | `katas.value` déstructuré avant le `return` | Utiliser `storeToRefs(store)` ou retourner le `ref` directement |
| `useAsync` ne se met pas à jour | `ref` intérieur non exposé correctement | Vérifier que `state` est un `Ref<AsyncState<T>>`, pas une valeur brute |
| Use case importé directement dans le store | Couplage fort | Injecter via provide/inject ou passer en paramètre du store |

---

## Ce que tu sais faire après cette phase

- Modéliser un domaine front avec branded types, discriminated unions, Result pattern
- Créer des mappers comme Anti-Corruption Layer entre l'API et le domaine
- Écrire des use cases purs testables avec Vitest sans Vue ni Pinia
- Répartir les composables selon leur niveau de dépendance (domain / infra / ui)
- Utiliser Pinia comme état seul — jamais de fetch dans le store
- Distinguer `infrastructure/composables/` (pas de cycle de vie) de `ui/composables/` (cycle de vie Vue)
- Appliquer TDD sur toute la surface testable : use cases, mappers, guards, stores, composables

> **à retenir** : la règle n'est pas "composables sans Vue" — c'est "pousser la logique le plus bas possible". Un use case est pur. Un mapper est pur. Un composable headless n'a pas de cycle de vie. Un composable UI orchestre tout ça avec le cycle de vie Vue.
> 

```
commit suggestion → docs(adr): ajout ADR 003 architecture hexagonale front
```