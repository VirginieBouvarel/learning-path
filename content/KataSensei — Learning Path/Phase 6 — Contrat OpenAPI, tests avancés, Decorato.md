# Phase 6 — Contrat OpenAPI, tests avancés, Decorator, docs

# Phase 6 — Contrat OpenAPI, tests avancés, Decorator

> Contract-first, Testcontainers, Playwright e2e, Decorator pattern, documentation complète.
> 

**Durée estimée** : 2 semaines · ~10h

**Catégories** : ⚫ CI/CD & ops · 🟣 Typage fort · 🟡 TDD · 🟠 Design patterns

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 📜 OpenAPI contract-first + client TS généré

*≈ tRPC sans lock-in*

Le YAML OpenAPI est la loi. `openapi-generator` génère les types TS et les fonctions fetch pour Vue. Si le back change un champ sans mettre à jour la spec, la CI casse. **Une seule source de vérité.**

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

### 🧩 Decorator pattern — logging et métriques

*≈ higher-order function TS*

```java
// LoggedKataRepository wrape sans modifier le comportement
public class LoggedKataRepository implements KataRepository {
  private final KataRepository delegate;
  public Optional<Kata> findById(KataId id) {
    log.info("findById", id);
    return delegate.findById(id); // délègue
  }
}
// Le domaine ne sait rien. Composition > héritage.
```

### 🧪 Testcontainers — vraie DB en CI

*≈ tests avec vraie infra*

Vrai PostgreSQL + Redis dans Docker pendant les tests d'intégration. Fini les mocks de DB qui ne ressemblent pas à la prod. Les migrations Flyway s'exécutent, les index aussi.

### 🪵 Structured logging — logs lisibles par machine et par humain

*≈ console.log structuré mais exploitable en prod*

Les logs importants ne sont plus des phrases bricolées. Ils portent des champs stables comme `context`, `correlationId`, `userId`, `operation` ou `durationMs`. Le but est de pouvoir relier un incident à un flux réel sans parser du texte à la main.

### 🎭 Playwright — tests e2e bout en bout

```tsx
test('utilisateur peut compléter un kata', async ({ page }) => {
  await page.goto('/katas/fizzbuzz')
  await page.fill('[data-testid=editor]', 'function fizzbuzz...')
  await page.click('[data-testid=run]')
  await expect(page.locator('[data-testid=result]')).toContainText('Succès')
})
```

### ⚡ Lazy loading Vue Router — charger l'UI au bon moment

*≈ code splitting par page*

Les routes importantes passent en `() => import(...)`. Le bundle initial reste léger et l'application finale se rapproche d'un vrai front de prod au lieu d'un prototype qui charge tout dès le départ.

### 📚 Documentation finale — ADR archivés

Tous les ADR en place. README `deploy-in-2-commands`. OpenAPI auto-généré.

---

## Refactoring guidé

Refactoring outillé : decorators ajoutés sans toucher au domaine. Coverage analysé, trous comblés. On lit le code comme si on était un nouveau dev sur le projet.

---

## KataSensei à cette étape

KataSensei a un contrat d'API vérifié en CI. Les tests d'intégration tournent contre une vraie DB. Les tests Playwright valident les parcours utilisateur clés. Sentry capture les erreurs en prod.

---

## Checkpoints

- [ ]  OpenAPI YAML committé et validé en CI
- [ ]  Client TS généré et consommé par Vue
- [ ]  ACL : mapper `ApiKata` → `DomainKata`
- [ ]  `LoggedKataRepository` Decorator
- [ ]  `LoggedAiSensei` Decorator
- [ ]  Testcontainers verts en CI
- [ ]  Logs structurés avec `correlationId` visible sur un flux métier clé
- [ ]  Routes Vue principales en lazy loading
- [ ]  2–3 scénarios Playwright
- [ ]  Sentry configuré en prod
- [ ]  Tous les ADR archivés
- [ ]  README final écrit

---

## Livrable technique

Client TS + ACL. Testcontainers verts. Logs structurés. Lazy loading des routes. Playwright. Sentry. ADR archivés. README final.
