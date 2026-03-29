# ⚠️ OBSOLETE — GitLab workflow (remplacé par la page Workflow GitLab)

# GitLab + workflow Merge Request

> Travailler avec des MR même seule — c'est le réflexe le plus important à prendre. En équipe, on ne pushe jamais directement sur `main`. Tu apprends ça maintenant, ça devient automatique.
> 

---

## Étape 1 — Créer le repository GitLab

1. Crée un compte sur [gitlab.com](http://gitlab.com) si tu n'en as pas
2. New Project → Create blank project
3. Nom : `katasensei`
4. Visibility : Private
5. Décoche « Initialize repository » — on va le faire depuis WSL2

```bash
# Dans WSL2
cd ~/projects
mkdir katasensei && cd katasensei
git init
git remote add origin git@gitlab.com:<ton-username>/katasensei.git
```

---

## Étape 2 — Structure du monorepo

```bash
mkdir katasensei-back katasensei-front docs/adr
touch README.md .gitignore
```

`.gitignore` racine :

```
# Secrets
.env
*.env.local

# Build outputs
target/
dist/
.vite/

# IDE
.idea/
*.iml
.vscode/

# OS
.DS_Store
Thumbs.db
```

---

## Étape 3 — Protéger la branche main

Dans GitLab : Settings → Repository → Protected branches :

- Branch : `main`
- Allowed to push : No one
- Allowed to merge : Maintainers (toi)

> **Pourquoi ?** Sans cette protection, le pre-commit hook est ta seule garde-fous. Avec la protection, même si tu essaies de pusher directement sur main, GitLab te bloquera.
> 

---

## Étape 4 — Workflow de travail

### Chaque fonctionnalité = une branche = une MR

```bash
# 1. Toujours partir d'un main à jour
git checkout main
git pull origin main

# 2. Créer une branche avec convention de nommage
git checkout -b feat/phase0-spring-boot-setup
# ou
git checkout -b feat/kata-get-endpoint
git checkout -b fix/cors-configuration
git checkout -b refacto/extract-kata-value-object
git checkout -b test/kata-controller-tests
git checkout -b docs/adr-002-error-handling

# 3. Travailler, committer avec Conventional Commits
git add .
npm run commit  # ou git commit -m "feat(kata): add GET /katas endpoint"

# 4. Pusher et créer la MR
git push origin feat/phase0-spring-boot-setup
# GitLab affiche un lien pour créer la MR directement
```

### Convention de nommage des branches

| Préfixe | Usage |
| --- | --- |
| `feat/` | Nouvelle fonctionnalité |
| `fix/` | Correction de bug |
| `refacto/` | Refactoring |
| `test/` | Ajout de tests |
| `docs/` | Documentation, ADR |
| `setup/` | Configuration, infra |
| `perf/` | Optimisation de performances |
| `secu/` | Correctif sécurité |

---

## Étape 5 — Template de MR

Dans GitLab : Settings → General → Merge request templates → Nouveau template `Default` :

```markdown
## Description

<!-- Que fait cette MR ? Pourquoi ? -->

## Checklist

- [ ] Les tests passent (`mvn test` ou `npm run test:unit`)
- [ ] Le lint est propre (`mvn checkstyle:check` ou `npm run lint`)
- [ ] `npm run type-check` passe sans erreur
- [ ] Si décision architecturale : ADR écrit et inclus
- [ ] Si nouvelle route API : OpenAPI mis à jour
- [ ] Pas de secret dans le code

## Tests ajoutés / modifiés

<!-- Liste les tests qui couvrent ce changement -->

## Points d'attention pour la review

<!-- Y a-t-il des choix discutables ? Des compromis ? -->
```

---

## Étape 6 — Claude comme reviewer

Puisque tu travailles seule, Claude Code joue le rôle du reviewer :

```bash
# Dans le terminal IntelliJ, depuis la racine du projet
claude
```

Demande une revue avant chaque merge :

- *"Relis mes changements dans le dossier kata/domain/ et dis-moi si SOLID est respecté"*
- *"Vérifie que mon use case ne dépend d'aucun framework"*
- *"Y a-t-il des problèmes de sécurité dans ce contrôleur ?"*

---

## Étape 7 — Pipeline GitLab CI (optionnel en phase 0)

Crée `.gitlab-ci.yml` à la racine :

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

> GitLab lance automatiquement ce pipeline à chaque MR. Tu ne peux pas merger si les tests échouent.
> 

---

## Checklist

- [ ]  Repository GitLab créé
- [ ]  Branche `main` protégée (pas de push direct)
- [ ]  Clé SSH configurée dans GitLab
- [ ]  Monorepo initialisé avec la bonne structure
- [ ]  `.gitignore` configuré (secrets ignorés)
- [ ]  Template de MR configuré
- [ ]  Convention de nommage des branches comprise
- [ ]  `.gitlab-ci.yml` créé (même minimal)
- [ ]  Première MR créée et mergée (setup initial)

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*