# Phase 5 – Events, SSE streaming, cache Redis + ACL front

> Observer pattern, Domain Events, streaming IA token par token, cache Redis, Anti-Corruption Layer front.
> 

**Durée estimée** : 2 semaines · ~10 h

**Catégories** : 🟠 Design patterns · 🟢 Archi hexagonale · 🩷 Refactoring

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 👁️ Observer / Spring Events – Domain Events

*≈ EventBus mitt en Vue*

`KataCompleted` publié par le use case. `StreakListener`, `BadgeListener`, `ProgressionListener` écoutent indépendamment. Le domaine ne sait pas combien de listeners existent. Même pattern que `mitt` dans une app Vue modulaire.

```java
// Le use case publie un fait métier
eventPublisher.publish(new KataCompleted(session.userId(), session.kataId()))

// Les listeners réagissent indépendamment
@EventListener
void onKataCompleted(KataCompleted event) { /* maj streak */ }
```

### 🌊 SSE streaming — useHintStream headless

*≈ EventSource côté Vue*

Plutôt qu'attendre 4–5 s la réponse de Claude complète, tu streames token par token. `SseEmitter` Java + `EventSource` Vue. Composable headless `useHintStream` réutilisable.

### 🔄 Redis cache @Cacheable

*≈ computed Vue*

`@Cacheable('katas')` sur ta méthode de liste : lue une fois en DB, servie depuis Redis ensuite. `@CacheEvict` quand un kata est modifié. Comme un `computed` qui recalcule seulement quand les dépendances changent.

### 🛡️ Anti-Corruption Layer front

*≈ mapper domaine / API*

```tsx
// Dans infrastructure/ — jamais dans domain/
function toKata(apiResponse: ApiKataDto): Kata {
  return {
    id: apiResponse.id as KataId,
    title: apiResponse.name, // champ renommé
    difficulty: mapDifficulty(apiResponse.level) // logique de mapping
  }
}
```

Le domaine front ne parle jamais le langage de l'API externe.

### 🧵 Correlation ID — suivre un flux de bout en bout

*≈ un identifiant de trace partagé entre front, back et streaming*

Une même demande de hint doit pouvoir être suivie depuis la requête HTTP initiale, jusqu'aux listeners déclenchés et au flux SSE retourné. Le `correlationId` devient la couture visible entre les morceaux asynchrones du système.

---

## Refactoring guidé

Refactoring des listeners : gros `ProgressionService` qui fait tout → listeners spécialisés Single Responsibility. **Le diff illustre O et S de SOLID en situation réelle.**

---

## KataSensei à cette étape

Dashboard de progression (katas complétés, streak, niveau préféré). Le hint IA s'affiche token par token en temps réel. Les badges se débloquent sans que le use case ne sache qu'ils existent.

---

## Checkpoints

- [ ]  `KataCompleted` Domain Event créé
- [ ]  `StreakListener` + `BadgeListener` indépendants
- [ ]  SSE endpoint `/sessions/{id}/hint/stream` opérationnel
- [ ]  `useHintStream` composable headless
- [ ]  Cache Redis sur `GET /katas`
- [ ]  Anti-Corruption Layer front en place
- [ ]  `GET /users/me/progress` avec stats JPQL
- [ ]  `correlationId` propagé entre HTTP, listeners et SSE
- [ ]  Refactoring listeners terminé

---

## Livrable technique

`GET /users/me/progress`. SSE `/hint/stream`. Events découplés. Cache Redis. ACL front. Correlation ID sur les flux temps réel. Tests des listeners.
