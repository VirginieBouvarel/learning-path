# 🥋 KataSensei — Learning Path Specs

> **Document de travail** — Ce fichier contient l'intégralité des specs du learning path KataSensei.
> Il est conçu pour être itéré en mode plan avant de régénérer les pages Notion finales.
>
> Dernière extraction : 29 mars 2026

---

## 🎯 Objectif global

Devenir développeuse fullstack **Vue 3 / TypeScript strict / Java 21** avec une maîtrise de l'architecture hexagonale, du TDD, du typage fort et des design patterns — front et back.

---

## Le projet fil rouge

**KataSensei** est une plateforme d'entraînement aux katas de code pour les profils en reconversion (bootcamp, formation courte).

Fonctionnalités clés :
- Éditeur Monaco embarqué
- Supervision IA socratique (Claude API)
- Exécution sécurisée (Piston API)
- Compte utilisateur et suivi de progression

Principe : **tu construis KataSensei pendant que tu apprends à le construire.**

---

## Stack complète

| Côté | Technologies |
|------|-------------|
| Frontend | Vue 3, TypeScript strict, Pinia, Vue Router, Vitest, Playwright |
| Backend | Java 21, Spring Boot 3, Maven, JPA/Hibernate, Flyway, Spring Security |
| Archi | Hexagonale front + back, TDD, SOLID, DDD tactique |
| Infra | PostgreSQL, Redis, Docker, GitHub Actions, Fly.io |
| API externes | Claude API (IA sensei), Piston API (exécution code) |

---

## Légende des catégories

- 🟣 **Typage fort** — branded types, Result, discriminated unions, type guards
- 🟡 **TDD** — Red/Green/Refactor, tests unitaires, intégration, e2e
- 🟢 **Archi hexagonale** — ports & adapters, domaine pur, DDD tactique
- 🟠 **Design patterns** — Strategy, Factory, Builder, Observer, Decorator, Compound Component
- 🩷 **Refactoring guidé** — dette intentionnelle, refacto pas-à-pas
- ⚫ **CI/CD & ops** — Docker, GitHub Actions, Fly.io, secrets
- 🔴 **Gestion des erreurs** — centralisée, exhaustive, front et back

---

## Structure du parcours — vue d'ensemble

| Phase | Titre | Durée | Catégories |
|-------|-------|-------|------------|
| 0 | Setup — environnement, config, prod day 1 | 1 sem · ~6h | ⚫ |
| 1 | HTTP, REST, persistance naïve + gestion erreurs centralisée | 2 sem · ~10h | 🟡 🔴 |
| 2 | Typage fort TS + LogService + useAsync + archi hexa front | 2 sem · ~10h | 🟣 🟠 🟢 |
| 3 | Auth JWT, SOLID, Value Objects Java + erreurs exhaustives | 2 sem · ~10h | 🟣 🟠 🔴 🟡 🩷 |
| 4 | Architecture hexagonale complète + DDD tactique + patterns front | 3 sem · ~14h | 🟢 🟠 🩷 🟡 |
| 5 | Events, SSE streaming, cache Redis + Observer + ACL front | 2 sem · ~10h | 🟠 🟢 🩷 |
| 6 | Contrat OpenAPI, tests avancés, Decorator, docs finales | 2 sem · ~10h | ⚫ 🟣 🟡 🟠 |
| 7 | CI/CD complète, Docker multi-stage, mise en prod finale | 1 sem · ~6h | ⚫ |

**Total estimé : ~76h de code effectif · ~5 mois à raison d'une soirée + demi-weekend par semaine**

---

## Frustration identifiée (à résoudre)

Les guides pas-à-pas des phases 0–3 mentionnent le TDD conceptuellement mais ne guident pas l'écriture concrète des tests ni la configuration des outils de coverage et d'enforcement d'architecture. **Prochaine étape : définir précisément le contenu de toutes les phases avant de rédiger de nouveaux guides.**

---

---

# Phase 0 — Setup : environnement, config, prod day 1

> **Philosophie** : on installe chaque outil en comprenant *pourquoi* il est là. À la fin de cette phase, tu sais expliquer ton `pom.xml` et ton `package.json` ligne par ligne.

**Durée** : 1 semaine · ~6h
**Catégories** : ⚫ CI/CD & ops

### Concepts clés

#### ☕ SDKMAN + Java 21 + Maven
- `curl -s 'https://get.sdkman.io' | bash` puis `sdk install java 21-tem`
- SDKMAN = nvm pour Java, permet de switcher de version
- Spring Initializr : chaque dépendance cochée est comprise avant d'être ajoutée

#### 🧹 ESLint + Prettier + Husky + Conventional Commits
- Pre-commit hook : le commit ne passe pas si le lint échoue
- Commitizen guide le format
- CHANGELOG auto depuis les commits
- **Pourquoi pas plus tard ?** Activer le lint sur un projet existant = des centaines d'erreurs à corriger

#### 🐳 Docker Compose + profils Spring + .env
- `.env` ignoré par git, `.env.example` committé avec des valeurs fictives
- Profils dev / test / prod séparés
- PostgreSQL + Redis en un `docker-compose up`

#### 🚀 Prod day 1 — Fly.io + pipeline minimal
- `GET /health` en prod avant la première feature
- Pipeline GitHub Actions minimal (test → deploy) qui grandira à chaque phase
- **Pourquoi Fly.io ?** Gratuit, CLI simple, PostgreSQL managed inclus, détection auto du Dockerfile

#### 📝 ADR 001 — première décision documentée
- Fichier `docs/adr/001-choix-technologiques.md`
- Format : Contexte / Décision / Conséquences / Alternatives rejetées
- 20 lignes, écrit au moment de la décision

### Checkpoints

- [ ] Java 21 installé via SDKMAN
- [ ] Spring Boot démarre, `/actuator/health` répond 200
- [ ] Vue 3 + TypeScript strict (`strict: true`, `noUncheckedIndexedAccess: true`)
- [ ] Structure `domain/` `infrastructure/` `ui/` créée côté front
- [ ] Pre-commit hook actif (commit mal formaté refusé)
- [ ] `docker-compose up` lance PostgreSQL + Redis
- [ ] KataSensei a une URL publique sur Fly.io
- [ ] ADR 001 écrit et committé
- [ ] Pipeline GitHub Actions minimal vert

### Livrable technique

Java + Vue installés et configurés. Lint actif. Docker Compose opérationnel. URL publique `GET /health`. ADR 001 committé.

---

# Phase 1 — HTTP, REST, persistance naïve + gestion des erreurs

> **Philosophie** : on écrit du code simple et imparfait. On le sentira craquer. C'est voulu — la douleur de cette phase justifiera l'archi hexagonale en phase 4.

**Durée** : 2 semaines · ~10h
**Catégories** : 🟡 TDD · 🔴 Gestion des erreurs

### Concepts clés

#### 🔌 Spring Boot = event listener HTTP
- `@RestController` + `@GetMapping`
- En Vue tu écoutes des clics, en Java tu écoutes des requêtes HTTP
- Tu écris le test JUnit avant le handler — premier cycle Red/Green

#### 🖴 TDD Red/Green/Refactor — cycle de base
- Pour chaque endpoint : 1) test qui échoue (rouge) → 2) code minimal pour le faire passer (vert) → 3) refacto sans casser le test
- Le rythme du reste du parcours

#### 🗎 JPA naïf + Flyway migrations
- Intentionnellement naïve : logique dans le contrôleur, pas de use case
- Flyway versionne le schéma comme git versionne le code

#### 🚨 Gestion d'erreurs centralisée — @ControllerAdvice
- Un seul endroit pour toutes les erreurs
- Problem Details RFC 7807 : le front Vue reçoit toujours le même format JSON structuré
- Hiérarchie `DomainException` — dès la phase 1, jamais rattrapé après

```json
{
  "type": "https://katasensei.dev/errors/kata-not-found",
  "title": "Kata not found",
  "status": 404,
  "detail": "No kata with id 'abc123'"
}
```

### Refactoring guidé

Pas de refactoring dans cette phase — on laisse le code naïf. Le refactoring des phases 1 et 2 se fera en phase 3.

### KataSensei à cette étape

`GET /katas` et `POST /katas` persistant en PostgreSQL. Le frontend Vue affiche la liste des katas. Toutes les erreurs arrivent en JSON structuré (jamais un stack trace HTML).

### Checkpoints

- [ ] `GET /katas` écrit en TDD (test rouge avant le code)
- [ ] `POST /katas` avec validation Bean Validation
- [ ] `GET /katas/{id}` avec 404 structuré
- [ ] `@ControllerAdvice` global en place
- [ ] Hiérarchie `DomainException` créée
- [ ] Frontend Vue affiche la liste
- [ ] Migration Flyway V1 committée
- [ ] CI enrichie avec les nouveaux tests

### Livrable technique

CRUD Kata en TDD. `@ControllerAdvice` global. Problem Details RFC 7807. CI enrichie avec les nouveaux tests.

---

# Phase 2 — Typage fort TS + LogService + useAsync + archi hexa front

> Le TypeScript qui protège vraiment. Premiers patterns headless. Première archi hexagonale côté front.

**Durée** : 2 semaines · ~10h
**Catégories** : 🟣 Typage fort · 🟠 Design patterns · 🟢 Archi hexagonale

### Concepts clés

#### 🏷️ Branded types : KataId, UserId

```typescript
type KataId = string & { readonly _brand: 'KataId' }
type UserId = string & { readonly _brand: 'UserId' }

const id: KataId = 'abc' as KataId     // ✔ compile
const wrong: KataId = 'abc' as UserId  // ✖ erreur à la compilation
```

Impossible de mélanger les IDs. Le compilateur TS devient ton premier testeur.

#### 🔀 Discriminated unions — états de session

```typescript
type SessionState =
  | { status: 'idle' }
  | { status: 'running'; startedAt: Date }
  | { status: 'completed'; score: number; hintsUsed: number }

// Le compilateur interdit de lire score si status !== 'completed'
```

#### ✅ Result pattern + type guards

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }

const result = await kataRepo.findById(id)
if (!result.ok) {
  // traitement de l'erreur obligé
}
```

#### 🪵 LogService typé — adapter sortant front

- Interface `LogPort`, `ConsoleLogger` en dev, `SentryLogger` en prod
- Premier adapter sortant front — même principe que les ports de l'archi hexagonale

```typescript
logService.info('kata:submit', { kataId, userId, duration })
logService.error('kata:execution-failed', { kataId, error })
```

#### ⏳ useAsync — loader headless réutilisable

```typescript
const { data, status, error } = useAsync(() => kataRepo.findById(id))
// status : 'idle' | 'loading' | 'success' | 'error'
// Réutilisé sur toutes les pages de KataSensei
```

#### 🔷 Archi hexa front — domain/infra/ui

- `src/domain/` — types purs, use cases TS, zéro import framework
- `src/infrastructure/` — ApiKataRepository, LocalStorageCache
- `src/ui/` — composants Vue qui reçoivent les use cases via inject

### Refactoring guidé

Refactoring du frontend phase 1 : on remplace les `string` libres par des branded types, les états épars par des discriminated unions, les `try/catch` par le Result pattern. **Le diff montre exactement pourquoi ça compte.**

### KataSensei à cette étape

Front Vue typé à fond. Impossible de rendre un résultat d'exécution si la session n'est pas `running`. Impossible de mélanger un `KataId` et un `UserId`. `LogService` actif. `useAsync` utilisé sur toutes les pages.

### Checkpoints

- [ ] Branded types `KataId`, `UserId` créés
- [ ] `SessionState` en discriminated union
- [ ] `Result<T,E>` implémenté et utilisé sur les appels API
- [ ] Type guards avec exhaustivité (`never`)
- [ ] `LogService` avec `ConsoleLogger` en dev
- [ ] `useAsync` réutilisable créé et testé (Vitest)
- [ ] Structure `domain/infra/ui` respectée
- [ ] Refactoring front phase 1 terminé

### Livrable technique

Branded types + Result + useAsync. Refactoring front phase 1. Tests Vitest des type guards. Archi `domain/infra/ui` en place côté front.

---

# Phase 3 — Auth JWT, SOLID, Value Objects + erreurs exhaustives

> Spring Security + typage fort Java + 5 principes SOLID dans le vrai code de KataSensei.

**Durée** : 2 semaines · ~10h
**Catégories** : 🟣 Typage fort · 🟠 Design patterns · 🔴 Gestion des erreurs · 🟡 TDD · 🩷 Refactoring

### Concepts clés

#### 🛡️ Spring Security + JWT

- Spring intercepte chaque requête avant ton code
- Token invalide → 401 automatique, le use case ne voit rien passer
- **TDD : tu écris d'abord le test "accès refusé sans token" avant d'implémenter le filtre**

#### 🏷️ Value Objects Java — miroir des branded types

```java
record UserId(UUID value) {
  public static UserId of(String s) {
    return new UserId(UUID.fromString(s));
  }
}
// Le compilateur Java refuse KataId là où UserId est attendu
// Même garantie que les branded types TS
```

#### 🧱 SOLID dans KataSensei — pas dans un livre

| Principe | Exemple dans KataSensei |
|----------|------------------------|
| **S** — Single Responsibility | `KataService` ne gère pas les emails de progression |
| **O** — Open/Closed | Ajouter difficulty `EXPERT` sans modifier `KataScorer` |
| **L** — Liskov | `ClaudeAiSensei` et `MockAiSensei` sont substituables |
| **I** — Interface segregation | `AiSensei` séparée de `CodeReviewer` |
| **D** — Dependency inversion | Le domaine dépend d'interfaces, jamais de classes concrètes |

Chaque principe illustré par **mauvaise version → version corrigée**. Le diff est la leçon.

#### 🚨 AppError union front + hiérarchie back

```typescript
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

### Refactoring guidé

Refactoring du backend phase 1 : logique extraite du contrôleur vers des services, `String`/`UUID` libres → Value Objects, SOLID vérifié principe par principe. **Les tests TDD de phase 1 guident le refactoring — aucun test ne casse.**

### KataSensei à cette étape

Auth JWT end-to-end. Un utilisateur s'inscrit, se connecte, voit ses katas. Les Value Objects Java mirroient les branded types TS. Gestion d'erreurs exhaustive des deux côtés.

### Checkpoints

- [ ] Spring Security configuré, JWT implémenté
- [ ] Test "accès refusé sans token" (TDD)
- [ ] Value Objects `UserId`, `KataId`, `Email` créés
- [ ] SOLID documenté dans un ADR (ADR 002)
- [ ] `AppError` union côté front
- [ ] Hiérarchie `DomainException` côté back
- [ ] Refactoring back phase 1 terminé

### Livrable technique

Auth complète en TDD. `AppError` union. Refactoring back phase 1. ADR 002 écrit.

---

# Phase 4 — Architecture hexagonale complète + DDD + patterns front

> Hexa front + back, Aggregates, Domain Events, Strategy/Factory/Builder, Compound Component, Provider pattern. Grand refactoring phases 1–3.

**Durée** : 3 semaines · ~14h
**Catégories** : 🟢 Archi hexagonale · 🟠 Design patterns · 🩷 Refactoring · 🟡 TDD

### Concepts clés

#### 🔷 Hexagonale back — le domaine ne dépend de rien

```
katasensei-back/
├── domain/          ← zéro import Spring ici
│   ├── model/          (Kata, KataSession, KataId...)
│   ├── port/
│   │   ├── in/          (ports entrants : use cases)
│   │   └── out/         (ports sortants : repositories, AI...)
│   └── usecase/        (SolveKataUseCase, GetKataUseCase...)
├── infrastructure/   ← Spring, JPA, Claude API ici
│   ├── web/            (@RestController)
│   ├── persistence/    (JpaKataRepository)
│   └── ai/             (ClaudeAiSensei)
└── config/           (Spring beans, DI)
```

Tests unitaires domaine < 50ms. Pas de DB, pas de réseau, pas de Spring.

#### 🔸 Hexagonale front — miroir du back

- `src/domain/` — types purs, use cases TS. Zéro import Vue.
- `src/infrastructure/` — `ApiKataRepository`, `LocalStorageCache`
- `src/ui/` — composants Vue via `provide/inject`

Testable sans navigateur.

#### 📦 DDD tactique — Aggregates + Domain Events

- **Aggregate** : `KataSession` est un aggregate root. On ne modifie jamais ses entités internes directement — toujours via l'aggregate. Garantit les invariants métier.
- **Domain Events** : `KataCompleted`, `HintRequested`, `StreakBroken` — des faits métier nommés avec le vocabulaire du domaine.

#### 🎯 Strategy / Factory / Builder

- **Strategy** : `HintStrategy` swappable selon le niveau d'assistance choisi
- **Factory** : `AiSenseiFactory.create(config)` retourne `ClaudeAiSensei` en prod, `MockAiSensei` en test
- **Builder** : `KataSession.builder().withKata(kata).withUser(user).withHintStrategy(strategy).build()`

#### 🧩 Compound Component + Provider pattern

```vue
<!-- Compound Component -->
<KataCard>
  <KataCard.Header />
  <KataCard.Body />
  <KataCard.Footer />
</KataCard>
```

`provide/inject` pour injecter les repositories dans les composants — miroir exact du DI Java.

### Refactoring guidé

**Grand refactoring** : le code naïf des phases 1–3 est restructuré en hexagonal des deux côtés. On crée les ports, on déplace les adapters, on isole le domaine. **Les tests existants guident — aucun ne casse.** ADR 003.

### KataSensei à cette étape

L'IA entre en scène. L'utilisateur choisit un kata, écrit du code dans Monaco, l'exécute via Piston API, demande un hint au sensei IA. Le sensei répond de façon socratique selon le niveau choisi.

### Checkpoints

- [ ] Structure hexa back en place (`domain/port/usecase/infrastructure`)
- [ ] `SolveKataUseCase` sans import Spring
- [ ] Tests unitaires domaine back < 50ms
- [ ] Structure hexa front (`domain/infra/ui`)
- [ ] Tests Vitest domaine front sans navigateur
- [ ] `KataSession` aggregate implémenté
- [ ] Domain Events nommés métier
- [ ] Strategy / Factory / Builder dans le code
- [ ] Compound Component `KataCard`
- [ ] `POST /sessions/{id}/run` (Piston API)
- [ ] `POST /sessions/{id}/hint` (Claude API)
- [ ] Grand refactoring terminé, tous les tests verts
- [ ] ADR 003 écrit

### Livrable technique

Hexa front + back opérationnels. `POST /sessions/{id}/run` + `/hint`. Tests domaine < 50ms. Design patterns documentés.

---

# Phase 5 — Events, SSE streaming, cache Redis + ACL front

> Observer pattern, Domain Events, streaming IA token par token, cache Redis, Anti-Corruption Layer front.

**Durée** : 2 semaines · ~10h
**Catégories** : 🟠 Design patterns · 🟢 Archi hexagonale · 🩷 Refactoring

### Concepts clés

#### 👁️ Observer / Spring Events — Domain Events

```java
// Le use case publie un fait métier
eventPublisher.publish(new KataCompleted(session.userId(), session.kataId()))

// Les listeners réagissent indépendamment
@EventListener
void onKataCompleted(KataCompleted event) { /* maj streak */ }
```

`StreakListener`, `BadgeListener`, `ProgressionListener` écoutent indépendamment. Le domaine ne sait pas combien de listeners existent.

#### 🌊 SSE streaming — useHintStream headless

- Plutôt qu'attendre 4–5s la réponse de Claude complète, on streame token par token
- `SseEmitter` Java + `EventSource` Vue
- Composable headless `useHintStream` réutilisable

#### 🔄 Redis cache @Cacheable

- `@Cacheable('katas')` sur la méthode de liste : lue une fois en DB, servie depuis Redis ensuite
- `@CacheEvict` quand un kata est modifié
- Comme un `computed` Vue qui recalcule seulement quand les dépendances changent

#### 🛡️ Anti-Corruption Layer front

```typescript
// Dans infrastructure/ — jamais dans domain/
function toKata(apiResponse: ApiKataDto): Kata {
  return {
    id: apiResponse.id as KataId,
    title: apiResponse.name,           // champ renommé
    difficulty: mapDifficulty(apiResponse.level) // logique de mapping
  }
}
```

Le domaine front ne parle jamais le langage de l'API externe.

### Refactoring guidé

Refactoring des listeners : gros `ProgressionService` qui fait tout → listeners spécialisés Single Responsibility. **Le diff illustre O et S de SOLID en situation réelle.**

### KataSensei à cette étape

Dashboard de progression (katas complétés, streak, niveau préféré). Le hint IA s'affiche token par token en temps réel. Les badges se débloquent sans que le use case ne sache qu'ils existent.

### Checkpoints

- [ ] `KataCompleted` Domain Event créé
- [ ] `StreakListener` + `BadgeListener` indépendants
- [ ] SSE endpoint `/sessions/{id}/hint/stream` opérationnel
- [ ] `useHintStream` composable headless
- [ ] Cache Redis sur `GET /katas`
- [ ] Anti-Corruption Layer front en place
- [ ] `GET /users/me/progress` avec stats JPQL
- [ ] Refactoring listeners terminé

### Livrable technique

`GET /users/me/progress`. SSE `/hint/stream`. Events découplés. Cache Redis. ACL front. Tests des listeners.

---

# Phase 6 — Contrat OpenAPI, tests avancés, Decorator, docs

> Contract-first, Testcontainers, Playwright e2e, Decorator pattern, documentation complète.

**Durée** : 2 semaines · ~10h
**Catégories** : ⚫ CI/CD & ops · 🟣 Typage fort · 🟡 TDD · 🟠 Design patterns

### Concepts clés

#### 📜 OpenAPI contract-first + client TS généré

- Le YAML OpenAPI est la loi
- `openapi-generator` génère les types TS et les fonctions fetch pour Vue
- Si le back change un champ sans mettre à jour la spec, la CI casse
- **Une seule source de vérité**

```yaml
# openapi.yml
paths:
  /katas/{id}:
    get:
      parameters:
        - name: id
          schema: { type: string, format: uuid }
      responses:
        200:
          content:
            application/json:
              schema: { $ref: '#/components/schemas/KataResponse' }
```

#### 🧩 Decorator pattern — logging et métriques

```java
public class LoggedKataRepository implements KataRepository {
  private final KataRepository delegate;
  public Optional<Kata> findById(KataId id) {
    log.info("findById", id);
    return delegate.findById(id); // délègue
  }
}
// Le domaine ne sait rien. Composition > héritage.
```

#### 🧪 Testcontainers — vraie DB en CI

- Vrai PostgreSQL + Redis dans Docker pendant les tests d'intégration
- Fini les mocks de DB qui ne ressemblent pas à la prod
- Les migrations Flyway s'exécutent, les index aussi

#### 🎭 Playwright — tests e2e bout en bout

```typescript
test('utilisateur peut compléter un kata', async ({ page }) => {
  await page.goto('/katas/fizzbuzz')
  await page.fill('[data-testid=editor]', 'function fizzbuzz...')
  await page.click('[data-testid=run]')
  await expect(page.locator('[data-testid=result]')).toContainText('Succès')
})
```

#### 📚 Documentation finale — ADR archivés

- Tous les ADR en place
- README `deploy-in-2-commands`
- OpenAPI auto-généré
- Storybook léger si le temps le permet

### Refactoring guidé

Refactoring outillé : decorators ajoutés sans toucher au domaine. Coverage analysé, trous comblés. On lit le code comme si on était un nouveau dev sur le projet.

### KataSensei à cette étape

KataSensei a un contrat d'API vérifié en CI. Les tests d'intégration tournent contre une vraie DB. Les tests Playwright valident les parcours utilisateur clés. Sentry capture les erreurs en prod.

### Checkpoints

- [ ] OpenAPI YAML committé et validé en CI
- [ ] Client TS généré et consommé par Vue
- [ ] ACL : mapper `ApiKata` → `DomainKata`
- [ ] `LoggedKataRepository` Decorator
- [ ] `LoggedAiSensei` Decorator
- [ ] Testcontainers verts en CI
- [ ] 2–3 scénarios Playwright
- [ ] Sentry configuré en prod
- [ ] Tous les ADR archivés
- [ ] README final écrit

### Livrable technique

Client TS + ACL. Testcontainers verts. Playwright. Sentry. ADR archivés. README final.

---

# Phase 7 — CI/CD complète, Docker multi-stage, mise en prod

> Le pipeline minimal de la phase 0 devient complet. KataSensei tourne en prod pour de vrai, pour de vrais utilisateurs.

**Durée** : 1 semaine · ~6h
**Catégories** : ⚫ CI/CD & ops

### Concepts clés

#### 🐳 Docker multi-stage — JDK → JRE léger

```dockerfile
# Stage 1 : build (JDK complet)
FROM eclipse-temurin:21-jdk AS build
RUN mvn package -DskipTests

# Stage 2 : run (JRE léger, 80% plus petite)
FROM eclipse-temurin:21-jre
COPY --from=build app.jar .
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### ⚙️ Pipeline GitHub Actions complet — 5 étapes

```yaml
jobs:
  unit-tests:        # JUnit 5 + Vitest
  integration-tests: # Testcontainers
  e2e-tests:         # Playwright
  build-docker:      # Image multi-stage
  deploy:            # Fly.io (si tous les précédents sont verts)
```

Si une étape échoue, le déploiement ne part pas.

#### 🏥 Health checks + Actuator + graceful shutdown

- `/actuator/health` expose l'état de la DB, Redis, Claude API
- Le load balancer sait si l'app est vivante
- Graceful shutdown : les requêtes en cours finissent avant que le container s'arrête

#### 🔐 Secrets management prod

- Jamais de clé API dans le code
- GitHub Secrets injectés en CI
- Spring profiles : `application-prod.yml` avec des références aux variables d'environnement
- Le même artefact Docker tourne partout

### KataSensei à cette étape

KataSensei est en prod. Un push sur `main` déclenche le pipeline complet. En cas d'échec, le déploiement ne part pas. Les apprenants peuvent s'inscrire et commencer leurs katas.

### Checkpoints

- [ ] Dockerfile multi-stage (JDK build → JRE run)
- [ ] Dockerfile front (Vite build → Nginx)
- [ ] Pipeline 5 étapes complet et vert
- [ ] `docker-compose.prod.yml` opérationnel
- [ ] `/actuator/health` expose DB + Redis + Claude
- [ ] Graceful shutdown configuré
- [ ] Secrets dans GitHub Secrets (pas dans le code)
- [ ] CHANGELOG généré automatiquement
- [ ] README : démarrage en 2 commandes
- [ ] KataSensei accessible publiquement

### Livrable technique

Pipeline CI/CD complet vert. Docker multi-stage. KataSensei déployé. README 2 commandes.

---

---

# Annexes

## Ubiquitous Language — ADR 000

### Termes métiers — en français dans le code (sans accents)

| Terme | Signification | À éviter |
|-------|--------------|----------|
| **Kata** | Exercice de code à réaliser | Exercise, Challenge |
| **Tentative** | Une session de travail sur un kata — début, indices demandés, score final | Session, Run, Attempt |
| **Indice** | Aide fournie par l'IA Sensei | Hint, Help, Suggestion |
| **Niveau** | Degré de difficulté : FACILE, MOYEN, DIFFICILE | Difficulty, Level |
| **Progression** | Avancée globale de l'apprenant sur la plateforme | Progress, Advancement |
| **Apprenant** | Rôle métier de l'utilisateur sur la plateforme | Student, User (au sens domaine) |

> **Apprenant vs User** : `User` est l'entité technique (email, mot de passe, JWT). `Apprenant` est le rôle métier.

### Termes techniques — en anglais dans le code

| Terme anglais | Pourquoi en anglais |
|--------------|---------------------|
| `KataId`, `TentativeId`, `UserId` | Identifiants techniques, convention universelle |
| `Repository`, `Service`, `Controller` | Patterns techniques standards Spring/Java |
| `UseCase`, `Port`, `Adapter` | Vocabulaire archi hexagonale |
| `DomainException`, `ValueObject` | Vocabulaire DDD technique |

**Règle pratique** : le nom de la classe métier est en français. Le suffixe technique reste en anglais.

```java
// Correct
type Niveau = 'FACILE' | 'MOYEN' | 'DIFFICILE';
interface Indice { contenu: string; numero: number }
public class Tentative { private KataId kataId; private int indicesUtilises; }
public class RequestIndiceUseCase { ... }
public class Apprenant { private UserId userId; private Progression progression; }
```

---

## Arborescence cible (fin phase 7)

### katasensei-front/

```
src/
├── domain/                          ← Zéro import Vue, zéro Pinia
│   ├── types/
│   │   ├── branded.ts               [Branded types] KataId, UserId, SessionId
│   │   ├── result.ts                [Result pattern] Ok / Err
│   │   ├── async.ts                 [Discriminated union] AsyncState<T>
│   │   ├── session.ts               [Discriminated union] SessionState
│   │   ├── errors.ts                [AppError union] NetworkError | NotFoundError...
│   │   └── guards.ts                [Type guards] isNetworkError, isAppError...
│   ├── ports/                       ← Interfaces (ports sortants) [Archi hexagonale]
│   │   ├── KataRepository.ts
│   │   ├── SessionRepository.ts
│   │   └── LogPort.ts
│   └── usecases/                    ← Logique pure [TDD Vitest pur]
│       ├── GetKatasUseCase.ts
│       ├── StartSessionUseCase.ts
│       └── RequestHintUseCase.ts
├── infrastructure/                  ← Adapters [Archi hexagonale]
│   ├── api/
│   │   ├── ApiKataRepository.ts     [Adapter sortant]
│   │   ├── ApiSessionRepository.ts
│   │   └── mappers/                 ← Anti-Corruption Layer [ACL]
│   │       ├── KataMapper.ts
│   │       └── SessionMapper.ts
│   ├── logging/
│   │   ├── ConsoleLogger.ts
│   │   └── SilentLogger.ts          Pour les tests
│   └── composables/                 ← ref/watch ok — pas de onMounted ni router
│       ├── useAsync.ts              [Headless composable]
│       └── useHintStream.ts         [Headless composable] SSE streaming
├── stores/                          ← Pinia — appellent les use cases, jamais fetch
│   ├── useKataStore.ts
│   ├── useSessionStore.ts
│   └── useAuthStore.ts
└── ui/                              ← Composants Vue uniquement
    ├── composables/                 ← onMounted, useRouter, stores Pinia
    │   ├── useKataList.ts
    │   └── useSession.ts
    ├── components/
    │   ├── ui/                      [shadcn-vue]
    │   ├── KataCard.vue             [Compound Component] [style scoped + BEM]
    │   └── HintPanel.vue
    └── views/
        ├── KataListView.vue
        ├── KataSessionView.vue
        └── ProgressionView.vue

tests/                               [même arborescence que src/]
├── domain/
├── infrastructure/
├── stores/
└── ui/
```

### katasensei-back/

```
src/main/java/dev/katasensei/
├── kata/                            ← Bounded context [DDD]
│   ├── domain/                      ← Zéro import Spring
│   │   ├── Kata.java
│   │   ├── KataId.java              [Value Object]
│   │   ├── Difficulty.java          [Enum métier]
│   │   └── port/
│   │       ├── in/                  ← Ports entrants
│   │       │   └── GetKatasUseCase.java
│   │       └── out/                 ← Ports sortants
│   │           └── KataRepository.java
│   ├── application/                 ← Use cases [TDD JUnit pur]
│   │   └── GetKatasService.java
│   └── infrastructure/              ← Adapters
│       ├── KataController.java      [TDD @WebMvcTest]
│       └── JpaKataRepository.java
├── session/                         ← Bounded context
│   ├── domain/
│   │   ├── KataSession.java         [Aggregate Root]
│   │   ├── SessionId.java           [Value Object]
│   │   └── KataCompleted.java       [Domain Event]
│   ├── application/
│   │   └── SolveKataService.java
│   └── infrastructure/
│       └── SessionController.java
├── auth/
│   ├── domain/
│   │   ├── UserId.java              [Value Object]
│   │   └── Email.java               [Value Object + validation]
│   ├── application/
│   │   └── AuthService.java
│   └── infrastructure/
│       ├── AuthController.java
│       ├── JwtService.java
│       └── SecurityConfig.java
├── ai/
│   ├── domain/port/out/
│   │   ├── AiSensei.java            [Strategy port]
│   │   └── CodeExecutor.java
│   └── infrastructure/
│       ├── ClaudeAiSensei.java      [Adapter sortant]
│       └── PistonCodeExecutor.java
└── shared/
    ├── DomainException.java
    ├── GlobalExceptionHandler.java  [Problem Details RFC 7807]
    ├── CorsConfig.java
    └── RateLimitConfig.java
```

---

## Stratégie de tests

### Côté front

| Ce qu'on teste | Outil | Vitesse |
|----------------|-------|---------|
| Use cases | Vitest pur | < 10ms |
| Mappers | Vitest pur | < 10ms |
| Type guards | Vitest pur | < 10ms |
| Composables headless (`useAsync`) | Vitest + `@vue/test-utils` minimal | < 50ms |
| Stores Pinia | Vitest + `createPinia()` | < 50ms |
| Composables UI (`useKataList`) | Vitest + `@vue/test-utils` complet | < 100ms |
| Composants Vue | `@vue/test-utils` | < 200ms |
| Parcours utilisateur | Playwright e2e | quelques secondes |

### Côté back

| Ce qu'on teste | Outil | Vitesse |
|----------------|-------|---------|
| Domain (use cases, value objects) | JUnit 5 pur — FakeRepository | < 10ms |
| Contrôleurs | `@WebMvcTest` — use case mocké | < 200ms |
| Intégration (repository + DB) | `@SpringBootTest` + Testcontainers | quelques secondes |
| Parcours complets | Playwright e2e | quelques secondes |

**Pyramide de tests** : beaucoup de tests unitaires rapides, quelques tests d'intégration, peu de tests e2e. Les e2e valident les chemins critiques — pas tout le comportement.

### Règle de testabilité par couche (front)

| Couche | Dépendances | Comment tester |
|--------|-------------|----------------|
| `domain/usecases/` | Zéro import Vue, zéro Pinia | Vitest pur — le plus rapide |
| `domain/types/` · `mappers/` | Fonctions pures | Vitest pur |
| `infrastructure/composables/` | `ref`, `watch` — pas de cycle de vie | Vitest + `@vue/test-utils` minimal |
| `stores/` | Pinia — appelle les use cases | Vitest + `createPinia()` |
| `ui/composables/` | `onMounted`, `useRouter`, stores | Vitest + `@vue/test-utils` complet |
| `ui/components/` | Composants Vue | `@vue/test-utils` · Playwright |

**Règle générale** : pousser la logique le plus bas possible. Tout ce qui peut rester dans le domaine y reste.

---

## Pages annexes référencées (non détaillées ici)

- Guide pas-à-pas — Phase 0, 1, 2, 3 (sous-pages de chaque phase)
- IDE — IntelliJ IDEA configuration complète
- Structure de dossiers — à créer en phase 0
- WSL2 + ZSH + Terminal — environnement Windows
- Workflow GitLab
- Conventional Commits
- Checklist sécurité & performances — pré-prod
- Comment utiliser Claude pendant le parcours
- Utiliser DataGrip dans le projet
- Optional en Java
- ADR 003 — Conventions front (CSS, composants, structure)
- 🎯 Backlog KataSensei (base de données Notion)
- 📖 Documentations & Ressources (base de données Notion)
- 📈 Suivi de progression (bases de données Notion)