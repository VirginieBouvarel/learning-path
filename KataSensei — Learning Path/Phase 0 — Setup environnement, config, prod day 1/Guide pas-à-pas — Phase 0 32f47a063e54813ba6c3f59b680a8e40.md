# Guide pas-à-pas — Phase 0

# Guide pas-à-pas — Phase 0

> Ce guide te conduit de zéro à un projet qui tourne en prod. Chaque commande est expliquée. Lis avant de copier-coller.
> 

**Durée estimée : ~6h réparties sur 1 semaine**

---

## Étape 1 — Installer Java sans souffrir (SDKMAN)

**Pourquoi SDKMAN ?** Parce que les projets Java ont souvent des contraintes de version. SDKMAN te permet de switcher comme `nvm` avec Node. Tu ne touches jamais au Java système de ta machine.

### 1.1 — Installer SDKMAN

```bash
curl -s "https://get.sdkman.io" | bash
```

Ferme et rouvre ton terminal (ou `source ~/.zshrc`), puis vérifie :

```bash
sdk version
# SDKMAN 5.x.x
```

### 1.2 — Installer Java 21

```bash
sdk install java 21.0.3-tem
sdk default java 21.0.3-tem
```

Vérification :

```bash
java -version
# openjdk version "21.0.3" ...
```

> ⚠️ **Erreur fréquente** : si tu as déjà un Java installé via Homebrew, SDKMAN peut entrer en conflit. Désinstalle le Java Homebrew d'abord : `brew uninstall java`
> 

### 1.3 — Installer Maven

```bash
sdk install maven
mvn -version
# Apache Maven 3.x.x
```

**Maven c'est quoi ?** L'équivalent de `npm` pour Java. `pom.xml` = `package.json`. `mvn install` = `npm install`. `mvn test` = `npm test`.

```
commit suggestion → chore(infra): installation SDKMAN Java 21 Maven
```

---

## Étape 2 — Créer le projet Spring Boot

### 2.1 — Spring Initializr (le create-vue du Java)

Rends-toi sur [start.spring.io](http://start.spring.io) et configure :

| Option | Valeur |
| --- | --- |
| Project | Maven |
| Language | Java |
| Spring Boot | 3.3.x (dernière stable) |
| Group | `dev.katasensei` |
| Artifact | `katasensei-back` |
| Java | 21 |

**Dépendances à cocher** — lis chaque description avant de cocher :

| Dépendance | Rôle | Équivalent front |
| --- | --- | --- |
| Spring Web | Serveur HTTP + REST | Express.js |
| Spring Data JPA | ORM pour la DB | Prisma / TypeORM |
| PostgreSQL Driver | Connecteur PostgreSQL | pg (node-postgres) |
| Spring Security | Auth + protection des routes | middleware d'auth |
| Validation | Validation des DTOs | Zod / Valibot |
| Spring Actuator | Health check + métriques | /healthz endpoint |
| Flyway Migration | Migrations SQL versionnées | git pour la DB |

Clique **Generate**, dézippe dans ton dossier de projets.

### 2.2 — Ouvrir dans IntelliJ IDEA

Télécharge [IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/) (gratuit). Ouvre le dossier du projet — IntelliJ détecte Maven automatiquement et télécharge les dépendances.

> **Pourquoi IntelliJ et pas VS Code ?** Pour Java, IntelliJ a une compréhension du langage sans comparaison. Tu peux utiliser VS Code avec l'extension Java mais tu te bats contre l'outil. IntelliJ Community est gratuit.
> 

### 2.3 — Lire le pom.xml

Ouvre `pom.xml` et lis chaque balise. Tu dois pouvoir répondre à :

- Quel est le `groupId` et pourquoi ?
- À quoi sert chaque `<dependency>` ?
- Que fait le plugin `spring-boot-maven-plugin` ?

> ⚠️ **Erreur fréquente** : ignorer le `pom.xml`. Un dev qui ne comprend pas son `pom.xml` subira son projet.
> 

```
commit suggestion → chore(back): initialisation projet Spring Boot
```

---

## Étape 3 — Créer le projet Vue 3

### 3.1 — create-vue avec toutes les options

```bash
npm create vue@latest katasensei-front
```

Réponds exactement comme ceci :

```
✔ Add TypeScript? › Yes
✔ Add JSX Support? › No
✔ Add Vue Router? › Yes
✔ Add Pinia? › Yes
✔ Add Vitest? › Yes
✔ Add an End-to-End Testing Solution? › Playwright
✔ Add ESLint? › Yes
✔ Add Prettier? › Yes
✔ Add Vue DevTools? › Yes
```

> **Pourquoi tout maintenant ?** Installer Playwright sur un projet existant = refactoring douloureux. Partir avec tout configuré coûte rien.
> 

```bash
cd katasensei-front
npm install
npm run dev
# → http://localhost:5173
```

### 3.2 — Activer TypeScript strict

Ouvre `tsconfig.app.json` et ajoute ces options :

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Pourquoi ces options ?**

- `strict` : active 8 règles strictes d'un coup (noImplicitAny, strictNullChecks...)
- `noUncheckedIndexedAccess` : `array[0]` peut être `undefined` — le compilateur te force à le gérer
- `exactOptionalPropertyTypes` : différencie `{ a?: string }` de `{ a: string | undefined }`

> ⚠️ **Erreur fréquente** : activer strict sur un projet existant = des centaines d'erreurs. C'est pourquoi on le fait maintenant.
> 

### 3.3 — Créer la structure hexagonale front dès le début

```bash
mkdir -p src/domain src/infrastructure src/ui
touch src/domain/.gitkeep src/infrastructure/.gitkeep src/ui/.gitkeep
```

Dans `src/domain/` on mettra les types purs et les use cases. Dans `src/infrastructure/` les appels API. Dans `src/ui/` les composants Vue.

> Ce sont les fondations. Plus facile à poser avant de construire les murs.
> 

```
commit suggestion → chore(front): initialisation projet Vue 3 TypeScript strict
```

---

## Étape 4 — Configurer le lint, Prettier et les hooks

### 4.1 — Configurer ESLint

create-vue a déjà généré `.eslintrc.cjs`. Installe les plugins TypeScript stricts :

```bash
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Mets à jour `.eslintrc.cjs` :

```jsx
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'vue/component-api-style': ['error', ['script-setup']]
  }
}
```

### 4.2 — Configurer Prettier

Crée `.prettierrc` à la racine :

```json
{
  "singleQuote": true,
  "semi": false,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

### 4.3 — Husky + lint-staged (pre-commit hook)

```bash
npm install -D husky lint-staged
npx husky init
```

Écrase `.husky/pre-commit` avec :

```bash
npx lint-staged
```

Ajoute dans `package.json` :

```json
"lint-staged": {
  "*.{ts,vue}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

Test : essaie de committer du code avec une erreur TypeScript → le commit est refusé. ✅

### 4.4 — Conventional Commits + Commitizen

```bash
npm install -D commitizen cz-conventional-changelog
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

Ajoute dans `package.json` :

```json
"scripts": {
  "commit": "cz"
}
```

Désormais : `npm run commit` au lieu de `git commit` → interface guidée.

Format des commits :

```
feat(kata): add GET /katas endpoint
fix(auth): handle expired JWT gracefully
refactor(domain): extract KataId value object
docs(adr): add ADR 001 tech choices
```

```
commit suggestion → chore(front): configuration ESLint Prettier Husky Conventional Commits
```

---

## Étape 5 — Docker Compose + variables d'environnement

### 5.1 — Créer docker-compose.yml

À la racine du projet back, crée `docker-compose.yml` :

```yaml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: katasensei
      POSTGRES_USER: katasensei
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U katasensei"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

> **Le healthcheck est critique.** Sans lui, Spring Boot démarre avant que PostgreSQL soit prêt et plante avec une erreur cryptique.
> 

### 5.2 — Variables d'environnement

Crée `.env` (ignoré par git) :

```bash
DB_PASSWORD=localpassword123
DB_URL=jdbc:postgresql://localhost:5432/katasensei
DB_USERNAME=katasensei
JWT_SECRET=mon-secret-local-au-moins-256-bits-de-long
CLAUDE_API_KEY=sk-ant-...
PISTON_URL=https://emkc.org/api/v2/piston
```

Crée `.env.example` (commité dans git) :

```bash
DB_PASSWORD=CHANGE_ME
DB_URL=jdbc:postgresql://localhost:5432/katasensei
DB_USERNAME=katasensei
JWT_SECRET=CHANGE_ME_min_256_bits
CLAUDE_API_KEY=CHANGE_ME
PISTON_URL=https://emkc.org/api/v2/piston
```

Ajoute dans `.gitignore` :

```
.env
*.env.local
```

### 5.3 — Profils Spring Boot

Renomme `src/main/resources/application.properties` en `application.yml` :

```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
  flyway:
    enabled: true

management:
  endpoints:
    web:
      exposure:
        include: health,info
```

Crée `application-dev.yml` :

```yaml
spring:
  jpa:
    show-sql: true
logging:
  level:
    dev.katasensei: DEBUG
```

### 5.4 — Démarrer l'infra locale

```bash
docker-compose up -d
# ✅ postgres démarré
# ✅ redis démarré
```

Vérification :

```bash
docker-compose ps
# katasensei-postgres   running (healthy)
# katasensei-redis      running (healthy)
```

```
commit suggestion → chore(infra): ajout Docker Compose PostgreSQL Redis avec variables d'environnement
```

---

## Étape 6 — Checkstyle côté Java

### 6.1 — Ajouter Checkstyle dans pom.xml

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-checkstyle-plugin</artifactId>
  <version>3.3.1</version>
  <configuration>
    <configLocation>google_checks.xml</configLocation>
    <failsOnError>true</failsOnError>
  </configuration>
  <executions>
    <execution>
      <goals><goal>check</goal></goals>
    </execution>
  </executions>
</plugin>
```

```bash
mvn checkstyle:check
```

> **Equivalent Java d'ESLint.** Google Checks est un standard répandu — tu rencontreras ce style sur la plupart des projets Java sérieux.
> 

```
commit suggestion → chore(back): ajout Checkstyle Google Java style
```

---

## Étape 7 — Premier déploiement en prod ([Fly.io](http://Fly.io))

### 7.1 — Installer le CLI Fly

```bash
brew install flyctl
fly auth login
```

### 7.2 — Dockerfile minimal (imparfait, c'est voulu)

Crée `Dockerfile` à la racine du back :

```docker
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/katasensei-back-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

> **Dockerfile imparfait déployé > Dockerfile parfait non déployé.** Le multi-stage viendra en phase 7.
> 

### 7.3 — Déployer sur [Fly.io](http://Fly.io)

```bash
mvn package -DskipTests
fly launch
# Fly détecte le Dockerfile automatiquement
# Réponds aux questions : région = cdg (Paris), PostgreSQL = non (on gère le nôtre)
```

Ajoute les secrets :

```bash
fly secrets set DB_URL="jdbc:postgresql://..."
fly secrets set JWT_SECRET="..."
fly secrets set CLAUDE_API_KEY="..."
```

```bash
fly deploy
```

### 7.4 — Vérifier que ça tourne

```bash
curl https://katasensei-back.fly.dev/actuator/health
# {"status":"UP"}
```

🎉 **KataSensei a une URL publique.**

```
commit suggestion → chore(infra): premier déploiement Fly.io GET /actuator/health
```

---

## Étape 8 — Pipeline GitHub Actions minimal

Crée `.github/workflows/ci.yml` :

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-back:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: Run tests
        run: mvn test
        working-directory: katasensei-back

  test-front:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
        working-directory: katasensei-front
      - run: npm run type-check
        working-directory: katasensei-front
      - run: npm run lint
        working-directory: katasensei-front
      - run: npm run test:unit
        working-directory: katasensei-front

  deploy:
    needs: [test-back, test-front]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: fly deploy katasensei-back
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

> **Le job `deploy` ne tourne que si `test-back` et `test-front` sont verts.** C'est la règle d'or : les tests protègent la prod.
> 

```
commit suggestion → chore(ci): ajout pipeline GitHub Actions test + deploy
```

---

## Étape 9 — ADR 001 : tes premiers choix documentés

Crée `docs/adr/001-choix-technologiques.md` :

```markdown
# ADR 001 — Choix technologiques de KataSensei

## Date
2026-XX-XX

## Statut
Accepté

## Contexte
Premier projet fullstack personnel visant à apprendre
l'architecture hexagonale, le TDD et le typage fort.

## Décisions

### Backend : Java 21 + Spring Boot 3
Java 21 apporte les records, les sealed classes et les
pattern matching — le système de types le plus proche
de TypeScript côté Java. Spring Boot reste le standard
de l'industrie Java.

### Frontend : Vue 3 + TypeScript strict
Stack déjà maîtrisée. TypeScript strict avec
noUncheckedIndexedAccess dès le départ.

### Architecture : Hexagonale (Ports & Adapters)
Permets de tester le domaine sans infrastructure.
Le domaine ne dépend d'aucun framework.

### Déploiement : Fly.io
Gratuit pour les petits projets, CLI simple,
PostgreSQL managed disponible.

### Exécution de code : Piston API
Sandboxe externe gratuite et open source.
Évite de gérer la sécurité d'exécution de code
arbitraire — sujet complexe hors scope v1.

## Alternatives rejetées
- Gradle : plus puissant mais moins lisible que Maven
  pour débuter
- Quarkus : excellent mais Spring a une meilleure
  documentation pour l'apprentissage
- Railway : Fly.io a un meilleur free tier en 2026

## Conséquences
- Apprentissage de Maven obligatoire
- IntelliJ IDEA recommandé (gratuit Community)
- Dépendance à Piston API pour l'exécution de code
```

```
commit suggestion → docs(adr): ajout ADR 001 choix technologiques
```

> Copie ce fichier dans `docs/adr/001-choix-technologiques.md` de ton projet GitLab avant de committer.
> 

---

## Étape 10 — Stylelint

### 10.1 — Installer Stylelint

```bash
npm install -D stylelint stylelint-config-recommended-vue
```

Crée `.stylelintrc.json` à la racine du front :

```json
{
  "extends": ["stylelint-config-recommended-vue"]
}
```

Ajoute le script dans `package.json` :

```json
"scripts": {
  "lint:css": "stylelint \"src/**/*.vue\""
}
```

Ajoute dans `lint-staged` (dans `package.json`) :

```json
"lint-staged": {
  "*.vue": ["eslint --fix", "stylelint --fix", "prettier --write"]
}
```

### 10.2 — Configurer dans IntelliJ

Settings → Languages & Frameworks → Style Sheets → Stylelint :

- ✅ **Enable**
- Stylelint package : `katasensei-front/node_modules/stylelint`
- ✅ **Run on save**

```
commit suggestion → chore(front): ajout Stylelint avec config Vue
```

---

## Étape 11 — shadcn-vue

### 11.1 — Installer shadcn-vue

```bash
npx shadcn-vue@latest init
```

Réponds aux questions :

```
Which style would you like to use? → Default
Which color would you like to use as base color? → Zinc
Where is your global CSS file? → src/assets/main.css
Where is your tailwind.config? → tailwind.config.js
Configure the import alias for components? → @/ui/components
```

> shadcn-vue copie les composants directement dans ton projet — tu en es propriétaire. Ce ne sont pas des dépendances opaques, ce sont des fichiers que tu lis et modifies.
> 

### 11.2 — Ajouter le premier composant

```bash
npx shadcn-vue@latest add button card badge
```

Les composants sont générés dans `src/ui/components/ui/`. Ouvre-les et lis-les avant de les utiliser.

```
commit suggestion → chore(front): installation shadcn-vue avec composants button card badge
```

---

## Étape 12 — Structure tests/

Crée le dossier `tests/` à côté de `src/` reproduisant la même arborescence :

```bash
mkdir -p tests/domain/usecases
mkdir -p tests/domain/types
mkdir -p tests/infrastructure/api/mappers
mkdir -p tests/stores
mkdir -p tests/ui/components
mkdir -p tests/ui/views
mkdir -p tests/ui/composables
```

Configure Vitest pour trouver les tests dans ce dossier. Dans `vite.config.ts` :

```tsx
export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'happy-dom',
  },
})
```

> La convention : `tests/domain/usecases/GetKatasUseCase.test.ts` teste `src/domain/usecases/GetKatasUseCase.ts`. L'arborescence est identique, seul le dossier racine change.
> 

```
commit suggestion → chore(front): création structure dossier tests/
```

---

## Checklist finale phase 0

- [ ]  `java -version` → Java 21
- [ ]  `mvn -version` → Maven 3.x
- [ ]  IntelliJ ouvre le projet sans erreur
- [ ]  `npm run dev` → Vue tourne sur [localhost:5173](http://localhost:5173)
- [ ]  TypeScript strict activé (`strict: true` + les 4 autres options)
- [ ]  Structure `domain/infra/ui` créée côté front
- [ ]  ESLint + Prettier configurés
- [ ]  Pre-commit hook actif (teste avec un commit incorrect)
- [ ]  `docker-compose up -d` → postgres + redis healthy
- [ ]  `mvn spring-boot:run` → Spring démarre et se connecte à la DB
- [ ]  `curl localhost:8080/actuator/health` → `{"status":"UP"}`
- [ ]  `.env.example` commité, `.env` ignoré
- [ ]  `fly deploy` → KataSensei a une URL publique
- [ ]  Pipeline GitHub Actions vert sur le premier push
- [ ]  ADR 001 commité dans `docs/adr/`
- [ ]  Stylelint installé et configuré (on save dans IntelliJ)
- [ ]  shadcn-vue initialisé, composants button + card + badge ajoutés
- [ ]  Structure `tests/` créée et configurée dans Vitest
- [ ]  ADR 003 commité dans `docs/adr/`

---

## Erreurs fréquentes et solutions

| Erreur | Cause probable | Solution |
| --- | --- | --- |
| `SDKMAN command not found` | Shell non rechargé | `source ~/.zshrc` ou rouvre le terminal |
| `Connection refused` à la DB | Docker pas démarré | `docker-compose up -d` |
| `Could not connect to localhost:5432` | PostgreSQL pas encore healthy | Attendre 10s, retester |
| `Whitelabel Error Page` | Route introuvable | Normal sans contrôleur — `/actuator/health` fonctionne |
| Commit refusé par Husky | Lint ou type error | Lire le message d'erreur, corriger, recommitter |
| `FLY_API_TOKEN` manquant en CI | Secret GitHub non configuré | `fly tokens create deploy` puis `gh secret set FLY_API_TOKEN` |

---

## Ce que tu sais faire après cette phase

- Installer et gérer Java avec SDKMAN
- Lire et comprendre un `pom.xml`
- Créer un projet Spring Boot depuis Spring Initializr
- Configurer TypeScript strict sur Vue 3
- Mettre en place ESLint + Prettier + Husky
- Écrire des commits Conventional Commits
- Utiliser Docker Compose pour l'infra locale
- Gérer les variables d'environnement proprement
- Déployer sur [Fly.io](http://Fly.io)
- Écrire un pipeline GitHub Actions basique
- Documenter une décision technique (ADR)