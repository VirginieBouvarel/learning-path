# Phase 7 — CI/CD complète, Docker multi-stage, mise en prod

# Phase 7 — CI/CD complète, mise en prod finale

> Le pipeline minimal de la phase 0 devient complet. KataSensei tourne en prod pour de vrai, pour de vrais utilisateurs.
> 

**Durée estimée** : 1 semaine · ~6 h

**Catégories** : ⚫ CI/CD & ops

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### 🐳 Docker multi-stage — JDK → JRE léger

*≈ npm build optimisé*

```docker
# Stage 1 : build (JDK complet)
FROM eclipse-temurin:21-jdk AS build
RUN mvn package -DskipTests

# Stage 2 : run (JRE léger, 80% plus petite)
FROM eclipse-temurin:21-jre
COPY --from=build app.jar .
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### ⚙️ Pipeline GitHub Actions complet — 5 étapes

```yaml
jobs:
  unit-tests:       # JUnit 5 + Vitest
  integration-tests: # Testcontainers
  e2e-tests:        # Playwright
  build-docker:     # Image multi-stage
  deploy:           # Fly.io (si tous les précédents sont verts)
```

Si une étape échoue, le déploiement ne part pas.

### 🏥 Health checks + Actuator + graceful shutdown

*≈ DevTools Vue en prod*

`/actuator/health` expose l'état de la DB, Redis, Claude API. Le load balancer sait si l'app est vivante. Graceful shutdown : les requêtes en cours finissent avant que le container s'arrête.

### 🔐 Secrets management prod

Jamais de clé API dans le code. GitHub Secrets injectés en CI. Spring profiles : `application-prod.yml` avec des références aux variables d'environnement. Le même artefact Docker tourne partout.

---

## KataSensei à cette étape

KataSensei est en prod. Un push sur `main` déclenche le pipeline complet. En cas d'échec, le déploiement ne part pas. Les reconversions peuvent s'inscrire et commencer leurs katas.

---

## Checkpoints

- [ ]  Dockerfile multi-stage (JDK build → JRE run)
- [ ]  Dockerfile front (Vite build → Nginx)
- [ ]  Pipeline 5 étapes complet et vert
- [ ]  `docker-compose.prod.yml` opérationnel
- [ ]  `/actuator/health` expose DB + Redis + Claude
- [ ]  Graceful shutdown configuré
- [ ]  Secrets dans GitHub Secrets (pas dans le code)
- [ ]  CHANGELOG généré automatiquement
- [ ]  README : démarrage en 2 commandes
- [ ]  KataSensei accessible publiquement

---

## Livrable technique

Pipeline CI/CD complet vert. Docker multi-stage. KataSensei déployé. README 2 commandes.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*