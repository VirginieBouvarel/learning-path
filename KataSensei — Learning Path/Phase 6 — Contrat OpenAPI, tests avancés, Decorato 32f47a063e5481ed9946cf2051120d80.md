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

### 🎭 Playwright — tests e2e bout en bout

```tsx
test('utilisateur peut compléter un kata', async ({ page }) => {
  await page.goto('/katas/fizzbuzz')
  await page.fill('[data-testid=editor]', 'function fizzbuzz...')
  await page.click('[data-testid=run]')
  await expect(page.locator('[data-testid=result]')).toContainText('Succès')
})
```

### 📚 Documentation finale — ADR archivés

Tous les ADR en place. README `deploy-in-2-commands`. OpenAPI auto-généré. Storybook léger si le temps le permet.

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
- [ ]  2–3 scénarios Playwright
- [ ]  Sentry configuré en prod
- [ ]  Tous les ADR archivés
- [ ]  README final écrit

---

## Livrable technique

Client TS + ACL. Testcontainers verts. Playwright. Sentry. ADR archivés. README final.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*