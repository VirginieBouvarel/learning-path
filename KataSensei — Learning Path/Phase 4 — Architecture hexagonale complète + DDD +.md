# Phase 4 — Architecture hexagonale complète + DDD + patterns front

> Hexa front + back, Aggregates, Domain Events, Strategy/Factory/Builder, Compound Component, Provider pattern. Grand refactoring phases 1–3.
> 

**Durée estimée** : 3 semaines · ~14h

**Catégories** : 🟢 Archi hexagonale · 🟠 Design patterns · 🩷 Refactoring · 🟡 TDD

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 🔷 Hexagonale back — le domaine ne dépend de rien

*≈ composable pur sans import axios*

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

### 🔸 Hexagonale front — miroir du back

*≈ archi hexa côté Vue*

- `src/domain/` — types purs, use cases TS. Zéro import Vue.
- `src/infrastructure/` — `ApiKataRepository`, `LocalStorageCache`
- `src/ui/` — composants Vue via `provide/inject`

Testable sans navigateur.

### 📦 DDD tactique — Aggregates + Domain Events

**Aggregate** : `KataSession` est un aggregate root. On ne modifie jamais ses entités internes directement — toujours via l'aggregate. Garantit les invariants métier.

**Domain Events** : `KataCompleted`, `HintRequested`, `StreakBroken` — des faits métier nommés avec le vocabulaire du domaine.

### 🎯 Strategy / Factory / Builder

- **Strategy** : `HintStrategy` swappable selon le niveau d'assistance choisi
- **Factory** : `AiSenseiFactory.create(config)` retourne `ClaudeAiSensei` en prod, `MockAiSensei` en test
- **Builder** : `KataSession.builder().withKata(kata).withUser(user).withHintStrategy(strategy).build()`

### 🧩 Compound Component + Provider pattern

*≈ composition Vue avancée*

```
<!-- Compound Component -->
<KataCard>
  <KataCard.Header />
  <KataCard.Body />
  <KataCard.Footer />
</KataCard>
```

`provide/inject` pour injecter les repositories dans les composants — miroir exact du DI Java.

---

## Refactoring guidé

**Grand refactoring** : le code naïf des phases 1–3 est restructuré en hexagonal des deux côtés. On crée les ports, on déplace les adapters, on isole le domaine. **Les tests existants guident — aucun ne casse.** ADR 003.

---

## KataSensei à cette étape

L'IA entre en scène. L'utilisateur choisit un kata, écrit du code dans Monaco, l'exécute via Piston API, demande un hint au sensei IA. Le sensei répond de façon socratique selon le niveau choisi.

---

## Checkpoints

- [ ]  Structure hexa back en place (`domain/port/usecase/infrastructure`)
- [ ]  `SolveKataUseCase` sans import Spring
- [ ]  Tests unitaires domaine back < 50ms
- [ ]  Structure hexa front (`domain/infra/ui`)
- [ ]  Tests Vitest domaine front sans navigateur
- [ ]  `KataSession` aggregate implémenté
- [ ]  Domain Events nommés métier
- [ ]  Strategy / Factory / Builder dans le code
- [ ]  Compound Component `KataCard`
- [ ]  `POST /sessions/{id}/run` (Piston API)
- [ ]  `POST /sessions/{id}/hint` (Claude API)
- [ ]  Grand refactoring terminé, tous les tests verts
- [ ]  ADR 003 écrit

---

## Livrable technique

Hexa front + back opérationnels. `POST /sessions/{id}/run` + `/hint`. Tests domaine < 50ms. Design patterns documentés.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*