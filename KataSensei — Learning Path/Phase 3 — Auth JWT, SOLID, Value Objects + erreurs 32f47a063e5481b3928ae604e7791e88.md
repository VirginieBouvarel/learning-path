# Phase 3 — Auth JWT, SOLID, Value Objects + erreurs exhaustives

> Spring Security + typage fort Java + 5 principes SOLID dans le vrai code de KataSensei.
> 

**Durée estimée** : 2 semaines · ~10 h

**Catégories** : 🟣 Typage fort · 🟠 Design patterns · 🔴 Gestion des erreurs · 🟡 TDD · 🩷 Refactoring

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 🛡️ Spring Security + JWT

*≈ axios interceptor*

Spring intercepte chaque requête avant ton code. Token invalide → 401 automatique, ton use case ne voit rien passer. **TDD : tu écris d'abord le test “accès refusé sans token” avant d'implémenter le filtre.**

### 🏷️ Value Objects Java — miroir des branded types

*≈ branded types TS*

```java
record UserId(UUID value) {
  public static UserId of(String s) {
    return new UserId(UUID.fromString(s));
  }
}
// Le compilateur Java refuse KataId là où UserId est attendu
// Même garantie que les branded types TS
```

### 🧱 SOLID dans KataSensei — pas dans un livre

| Principe | Exemple dans KataSensei |
| --- | --- |
| **S** — Single Responsibility | `KataService` ne gère pas les emails de progression |
| **O** — Open/Closed | Ajouter difficulty `EXPERT` sans modifier `KataScorer` |
| **L** — Liskov | `ClaudeAiSensei` et `MockAiSensei` sont substituables |
| **I** — Interface segregation | `AiSensei` séparée de `CodeReviewer` |
| **D** — Dependency inversion | Le domaine dépend d'interfaces, jamais de classes concrètes |

Chaque principe illustré par **mauvaise version → version corrigée**. Le diff est la leçon.

### 🚨 AppError union front + hiérarchie back

*≈ discriminated union d'erreurs exhaustive*

```tsx
// Front : le compilateur force le traitement de chaque cas
type AppError =
  | { kind: 'network'; message: string }
  | { kind: 'validation'; fields: Record<string, string> }
  | { kind: 'not-found'; resource: string }
  | { kind: 'unauthorized' }
```

```java
// Back : hiérarchie domain
sealed class DomainException extends RuntimeException permits
  KataNotFoundException, UnauthorizedException, ValidationException {}
```

---

## Refactoring guidé

Refactoring du backend phase 1 : logique extraite du contrôleur vers des services, `String`/`UUID` libres → Value Objects, SOLID vérifié principe par principe. **Les tests TDD de phase 1 guident le refactoring — aucun test ne casse.**

---

## KataSensei à cette étape

Auth JWT end-to-end. Un utilisateur s'inscrit, se connecte, voit ses katas. Les Value Objects Java mirroient les branded types TS. Gestion d'erreurs exhaustive des deux côtés.

---

## Checkpoints

- [ ]  Spring Security configuré, JWT implémenté
- [ ]  Test "accès refusé sans token" (TDD)
- [ ]  Value Objects `UserId`, `KataId`, `Email` créés
- [ ]  SOLID documenté dans un ADR (ADR 002)
- [ ]  `AppError` union côté front
- [ ]  Hiérarchie `DomainException` côté back
- [ ]  Refactoring back phase 1 terminé

---

## Livrable technique

Auth complète en TDD. `AppError` union. Refactoring back phase 1. ADR 002 écrit.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*

[Guide pas-à-pas — Phase 3 (format exercices)](Phase%203%20%E2%80%94%20Auth%20JWT,%20SOLID,%20Value%20Objects%20+%20erreurs/Guide%20pas-%C3%A0-pas%20%E2%80%94%20Phase%203%20(format%20exercices)%2032f47a063e548127b7c3d9ebc6a2fb6a.md)