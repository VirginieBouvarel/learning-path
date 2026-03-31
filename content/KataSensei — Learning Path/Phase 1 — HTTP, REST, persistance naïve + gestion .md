# Phase 1 — HTTP, REST, persistance naïve + gestion des erreurs

> **Philosophie** : on écrit du code simple et imparfait. On le sentira craquer. C'est voulu — la douleur de cette phase justifiera l'archi hexagonale en phase 4.
> 

**Durée estimée** : 2 semaines · ~10 h

**Catégories** : 🟡 TDD · 🔴 Gestion des erreurs

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 🔌 Spring Boot = event listener HTTP

*≈ v-on côté serveur*

`@RestController` + `@GetMapping`. En Vue tu écoutes des clics. En Java, tu écoutes des requêtes HTTP. Tu écris le test JUnit avant le handler — ton premier cycle Red/Green.

### 🖴 TDD Red/Green/Refactor — cycle de base

*≈ écrire le type TS avant l'implémentation*

Pour chaque endpoint : 1) test qui échoue (rouge) → 2) code minimal pour le faire passer (vert) → 3) refacto sans casser le test. Le rythme du reste du parcours.

### 🗎 JPA naïf + Flyway migrations

*≈ Prisma mais sans architecture*

Intentionnellement naïve : logique dans le contrôleur, pas de use case. Flyway versionne le schéma comme git versionne le code.

### 🚨 Gestion d'erreurs centralisée — @ControllerAdvice

*≈ error boundary global*

Un seul endroit pour toutes les erreurs. Problem Details RFC 7807 : ton front Vue reçoit toujours le même format JSON structuré. Hiérarchie `DomainException` — dès la phase 1, jamais rattrapé après.

```java
// Le format que ton front recevra toujours
{
  "type": "https://katasensei.dev/errors/kata-not-found",
  "title": "Kata not found",
  "status": 404,
  "detail": "No kata with id 'abc123'"
}
```

---

## Refactoring guidé

Pas de refactoring dans cette phase – on laisse le code naïf. Le refactoring des phases 1 et 2 se fera en phase 3.

---

## KataSensei à cette étape

`GET /katas` et `POST /katas` persistant en PostgreSQL. Le frontend Vue affiche la liste des katas. Toutes les erreurs arrivent en JSON structuré (jamais un stack trace HTML).

---

## Checkpoints

- [ ]  `GET /katas` écrit en TDD (test rouge avant le code)
- [ ]  `POST /katas` avec validation Bean Validation
- [ ]  `GET /katas/{id}` avec 404 structuré
- [ ]  `@ControllerAdvice` global en place
- [ ]  Hiérarchie `DomainException` créée
- [ ]  Frontend Vue affiche la liste
- [ ]  Migration Flyway V1 committée
- [ ]  CI enrichie avec les nouveaux tests

---

## Livrable technique

CRUD Kata en TDD. `@ControllerAdvice` global. Problem Details RFC 7807. CI enrichie avec les nouveaux tests.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*

[Guide pas-à-pas — Phase 1 (format exercices)](Phase%201%20%E2%80%94%20HTTP,%20REST,%20persistance%20na%C3%AFve%20+%20gestion%20/Guide%20pas-%C3%A0-pas%20%E2%80%94%20Phase%201%20(format%20exercices)%2032f47a063e548153b254ee21e7ae3fdd.md)