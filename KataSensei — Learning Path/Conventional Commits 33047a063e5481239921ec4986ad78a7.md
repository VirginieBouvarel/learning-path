# Conventional Commits

> Les messages de commit sont toujours en français. Les noms de fichiers, classes ou commandes techniques restent en anglais si nécessaire.
> 

---

## Format

```
type(contexte): description courte en français
```

**Règles :**

- Description en minuscules
- Pas de point final
- Contexte = le bounded context ou la fonctionnalité concernée
- 72 caractères max sur la première ligne

---

## Conventions de nommage

| Type | Usage |
| --- | --- |
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement de comportement |
| `test` | Ajout ou modification de tests |
| `docs` | Documentation, ADR |
| `chore` | Configuration, outillage, dépendances |
| `perf` | Amélioration de performances |
| `secu` | Correctif de sécurité |

---

## Exemples

```
chore: initialisation du monorepo katasensei
chore(back): création du projet Spring Boot via Spring Initializr
chore(front): création du projet Vue 3 TypeScript strict
chore(infra): ajout du Docker Compose avec PostgreSQL et Redis
chore(infra): configuration du pipeline GitLab CI minimal
feat(Kata): ajout endpoint GET /katas

feat(Kata): création du port KataRepository et de l'adapter API
feat(Kata): création du mapper KataMapper avec tests Vitest

test(Kata): tests TDD du KataController
feat(typage): ajout des branded types KataId, UserId, SessionId
refactor(Kata): migration KataListView vers useKataList

secu(sql): vérification que toutes les requêtes passent par JPA

feat(auth): ajout Spring Security avec JWT stateless
secu(auth): CORS strict avec liste blanche d'origines

docs: ajout de l'ADR 001 choix technologiques
```

---

## Quand committer ?

- Après chaque exercice complété et ses tests verts
- Après un refactoring qui ne casse aucun test
- Avant de passer à une nouvelle étape — ne jamais garder plusieurs exercices dans le même commit
- Avant d'ouvrir une MR

> **Règle simple** : si tu dois écrire "et" dans ton message de commit, c'est qu'il faut deux commits.
>