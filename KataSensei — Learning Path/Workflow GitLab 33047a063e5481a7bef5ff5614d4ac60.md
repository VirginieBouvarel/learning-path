# Workflow GitLab

> Toutes les conventions de travail avec GitLab pour le projet KataSensei.
> 

---

## Convention de nommage des branches

```markdown
phase1-KS001-titre-de-mon-ticket
```

---

## Cycle de vie d’un ticket

```
Backlog → À faire → En cours → En review (MR ouverte) → Terminé
```

| Statut | Signification |
| --- | --- |
| **Backlog** | Idée ou tâche future, pas encore planifiée |
| **À faire** | Planifiée pour la session en cours |
| **En cours** | Branche créée, travail actif |
| **En review** | MR ouverte, Claude fait la revue |
| **Terminé** | MR mergée sur `main`, ticket clos |

> **En review** = tu as ouvert une MR sur GitLab et tu demandes à Claude de relire le code avant de merger.
> 

---

## Workflow pas à pas

```bash
# 1. Toujours partir d'un main à jour
git checkout main
git pull origin main

# 2. Créer une branche
git switch -c feat/kata-get-endpoint

# 3. Travailler, committer au fur et à mesure
# (un commit = une intention, voir Conventional Commits)
git add .
git commit -m "feat(kata): ajout endpoint GET /katas"

# 4. Push et ouvrir la MR
git push origin feat/kata-get-endpoint
# GitLab affiche un lien direct pour créer la MR
```

---

## Template de Merge Request

Configurer dans GitLab : Settings → General → Merge request templates → template `Default` :

```markdown
## Description
<!-- Que fait cette MR ? Pourquoi ? -->

## Ticket
PHASE [N°]
KS-XXX — [Titre du ticket]

## Tests
- [ ] Testé manuellement
- [ ] Tests unitaires ajoutés / mis à jour

## Checklist
- [ ] Les tests passent (`mvn test` ou `npm run test:unit`)
- [ ] Le lint est propre
- [ ] `npm run type-check` passe sans erreur
- [ ] Si décision architecturale : ADR écrit et inclus dans `docs/adr/`
- [ ] Si nouvelle route API : OpenAPI mis à jour
- [ ] Pas de secret dans le code
- [ ] CI verte

## Points d’attention pour la review

```

---

## Claude comme reviewer

Dans le terminal IntelliJ à la racine du projet :

```bash
claude
```

Demandes utiles avant de merger :

- *« Relis mes changements dans `kata/domain/` et dis-moi si SOLID est respecté »*
- *« Vérifie que mon use case ne dépend d’aucun framework »*
- *« Y a-t-il des problèmes de sécurité dans ce contrôleur ? »*
- *« Est-ce que ce refactoring casse l’archi hexagonale ? »*

---

## Pipeline GitLab CI

Fichier `.gitlab-ci.yml` à la racine :

```yaml
stages:
  - test

test-back:
  stage: test
  image: maven:3.9-eclipse-temurin-21
  script:
    - cd katasensei-back && mvn test
  only:
    - merge_requests
    - main

test-front:
  stage: test
  image: node:20
  script:
    - cd katasensei-front
    - npm ci
    - npm run type-check
    - npm run lint
    - npm run test:unit
  only:
    - merge_requests
    - main
```

> La CI tourne automatiquement à chaque MR. On ne peut pas merger si les tests échouent.
> 

---

## Protéger la branche main

Settings → Repository → Protected branches :

- Branch : `main`
- Allowed to push : **No one**
- Allowed to merge : Maintainers (toi)

> Sans cette protection, le pre-commit hook est le seul garde-fou. Avec elle, même un push accidentel direct est bloqué par GitLab.
>