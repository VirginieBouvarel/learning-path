# GitLab — workflow et configuration

# GitLab — workflow et configuration

> Travailler avec des Merge Requests même en solo. Les réflexes acquis seront automatiques en équipe.
> 

**Durée estimée : ~30 min**

---

## Étape 1 — Créer le dépôt GitLab

1. Va sur [gitlab.com](http://gitlab.com) — compte gratuit
2. New Project → Create blank project
3. Nom : `katasensei`
4. Visibility : Private
5. Initialize with README : Oui

> **Pourquoi GitLab et pas GitHub ?** GitLab a un CI/CD intégré plus puissant en free tier, et c'est l'outil le plus utilisé en entreprise en France. GitHub Actions est également couvert dans le parcours — les deux coexistent.
> 

---

## Étape 2 — Configurer SSH

```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "ton@email.com"
# Appuie sur Entrée pour accepter les valeurs par défaut

# Copier la clé publique
cat ~/.ssh/id_ed25519.pub
```

Dans GitLab : Settings → SSH Keys → colle la clé.

```bash
# Vérification
ssh -T git@gitlab.com
# Welcome to GitLab, @ton-pseudo!
```

---

## Étape 3 — Configuration du dépôt

```bash
git clone git@gitlab.com:ton-pseudo/katasensei.git
cd katasensei
```

Crée le fichier `.gitlab-ci.yml` minimal (enrichi à chaque phase) :

```yaml
stages:
  - test
  - build
  - deploy

variables:
  MAVEN_OPTS: "-Dmaven.repo.local=$CI_PROJECT_DIR/.m2"

test-back:
  stage: test
  image: eclipse-temurin:21
  script:
    - cd katasensei-back
    - mvn test
  cache:
    paths:
      - .m2/

test-front:
  stage: test
  image: node:20
  script:
    - cd katasensei-front
    - npm ci
    - npm run type-check
    - npm run lint
    - npm run test:unit
```

---

## Étape 4 — Workflow Merge Request

### Règles de base

- `main` est protégé — jamais de push direct
- Chaque ticket = une branche = une MR
- La CI doit être verte avant de merger
- Tu lis ton propre code avant de merger (ou tu demandes à Claude)

### Convention de nommage des branches

```bash
# Feature
git checkout -b feature/KS-001-get-katas-endpoint

# Bug
git checkout -b fix/KS-042-jwt-expiry-not-handled

# Refacto
git checkout -b refactor/KS-015-extract-kata-use-case

# Docs / ADR
git checkout -b docs/KS-008-adr-002-error-handling

# Setup
git checkout -b setup/KS-001-wsl2-zsh-intellij
```

### Convention des commits (Conventional Commits)

```bash
git commit -m "feat(kata): add GET /katas endpoint"
git commit -m "fix(auth): handle expired JWT gracefully"
git commit -m "refactor(domain): extract KataId value object"
git commit -m "test(kata): add TDD tests for GetKatasService"
git commit -m "docs(adr): add ADR 002 error handling decision"
git commit -m "chore(setup): configure Docker Compose"
```

### Cycle complet d'un ticket

```bash
# 1. Prendre le ticket (passer en In Progress dans Notion)
git checkout main && git pull
git checkout -b feature/KS-010-deploy-health-endpoint

# 2. Coder en TDD
# ... red → green → refacto ...

# 3. Committer avec Commitizen
npm run commit

# 4. Pousser
git push -u origin feature/KS-010-deploy-health-endpoint

# 5. Ouvrir la MR dans GitLab
# GitLab affiche le lien directement dans le terminal

# 6. Relire son code dans la MR (ou demander à Claude)
# 7. CI verte → merger
# 8. Passer le ticket à Done dans Notion
```

---

## Configurer la protection de main

Dans GitLab : Settings → Repository → Protected branches :

- Branch : `main`
- Allowed to merge : Maintainers
- Allowed to push : No one

Ainsi même toi tu ne peux pas pousser directement sur `main` — tu dois passer par une MR.

---

## Template de description de MR

Dans GitLab : Settings → General → Merge Request → Default description template :

```markdown
## Ce que fait cette MR
[Description courte en 1-2 phrases]

## Ticket
KS-XXX — [Titre du ticket Notion]

## Changements
- 
- 

## Tests
- [ ] Tests unitaires ajoutés / mis à jour
- [ ] CI GitLab verte
- [ ] Testé manuellement sur le back ou le front

## Checklist archi
- [ ] Archi hexagonale respectée (pas d'import Spring dans le domaine)
- [ ] Pas de fetch direct dans les stores Pinia
- [ ] Pas de logique métier dans les contrôleurs
- [ ] ADR mis à jour si décision d'architecture
```

---

## Checkpoint

- [ ]  Dépôt GitLab créé et clôné
- [ ]  SSH configuré — `ssh -T git@gitlab.com` répond
- [ ]  `.gitlab-ci.yml` minimal committé
- [ ]  `main` protégé — push direct impossible
- [ ]  Template de MR configuré
- [ ]  Première MR ouverte (même pour un README) et mergée