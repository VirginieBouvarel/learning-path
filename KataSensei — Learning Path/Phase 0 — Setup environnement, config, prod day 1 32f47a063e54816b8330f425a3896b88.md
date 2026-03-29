# Phase 0 — Setup : environnement, config, prod day 1

> **Philosophie** : on installe chaque outil en comprenant *pourquoi* il est là. À la fin de cette phase, tu sais expliquer ton `pom.xml` et ton `package.json` ligne par ligne.
> 

**Durée estimée** : 1 semaine · ~6 h

**Catégories** : ⚫ CI/CD & ops

---

## Statut

- [ ]  Phase terminée

---

## Concepts clés

### ☕ SDKMAN + Java 21 + Maven

*≈ nvm pour Java*

`curl -s 'https://get.sdkman.io' | bash` puis `sdk install java 21-tem`. SDKMAN permet de switcher de version Java comme nvm avec Node. Spring Initializr : chaque dépendance cochée est comprise avant d'être ajoutée.

### 🧹 ESLint + Prettier + Husky + Conventional Commits

*≈ réflexes de pro dès le jour 1*

Pre-commit hook : le commit ne passe pas si le lint échoue. Commitizen guide le format. CHANGELOG auto depuis les commits.

> **Pourquoi pas plus tard ?** Activer le lint sur un projet existant = des centaines d'erreurs à corriger. Partir avec le lint coûte rien et force les bons réflexes.
> 

### 🐳 Docker Compose + profils Spring + .env

*≈ vite.config pour l'infra*

`.env` ignoré par git. `.env.example` committé avec des valeurs fictives. Profils dev / test / prod séparés. PostgreSQL + Redis en un `docker-compose up`.

### 🚀 Prod day 1 — [Fly.io](http://Fly.io) + pipeline minimal

*≈ toujours quelque chose en ligne*

`GET /health` en prod avant la première feature. Pipeline GitHub Actions minimal (test → deploy) qui grandira à chaque phase.

> **Pourquoi [Fly.io](http://Fly.io) ?** Gratuit, CLI simple, PostgreSQL managed inclus, détection automatique du Dockerfile.
> 

### 📝 ADR 001 — première décision documentée

*Architecture Decision Record*

Fichier `docs/adr/001-choix-technologiques.md` : Contexte / Décision / Conséquences / Alternatives rejetées. 20 lignes, écrit au moment de la décision.

---

## Checkpoints

- [ ]  Java 21 installé via SDKMAN
- [ ]  Spring Boot démarre, `/actuator/health` répond 200
- [ ]  Vue 3 + TypeScript strict (`strict: true`, `noUncheckedIndexedAccess: true`)
- [ ]  Structure `domain/` `infrastructure/` `ui/` créée côté front
- [ ]  Pre-commit hook actif (commit mal formaté refusé)
- [ ]  `docker-compose up` lance PostgreSQL + Redis
- [ ]  KataSensei a une URL publique sur [Fly.io](http://Fly.io)
- [ ]  ADR 001 écrit et committé
- [ ]  Pipeline GitHub Actions minimal vert

---

## Livrable technique

Java + Vue installés et configurés. Lint actif. Docker Compose opérationnel. URL publique `GET /health`. ADR 001 committé.

---

## Mes notes

*(Ajoute ici tes blocages, questions, liens utiles, découvertes)*

---

## Ce que j'ai appris dans cette phase

*(Complète après avoir terminé la phase)*

[Guide pas-à-pas — Phase 0](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/Guide%20pas-%C3%A0-pas%20%E2%80%94%20Phase%200%2032f47a063e54813ba6c3f59b680a8e40.md)

[IDE — IntelliJ IDEA configuration complète](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/IDE%20%E2%80%94%20IntelliJ%20IDEA%20configuration%20compl%C3%A8te%2032f47a063e548137a76ae9310e38fdbd.md)

[Structure de dossiers — à créer en phase 0](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/Structure%20de%20dossiers%20%E2%80%94%20%C3%A0%20cr%C3%A9er%20en%20phase%200%2032f47a063e54819a840ed509986f03c3.md)

[WSL2 + ZSH + Terminal — environnement Windows](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/WSL2%20+%20ZSH%20+%20Terminal%20%E2%80%94%20environnement%20Windows%2032f47a063e54810f8205e72721974c84.md)

[⚠️ OBSOLETE — GitLab workflow (remplacé par la page Workflow GitLab)](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/%E2%9A%A0%EF%B8%8F%20OBSOLETE%20%E2%80%94%20GitLab%20workflow%20(remplac%C3%A9%20par%20la%20pag%2032f47a063e5481c1b200e464ef845c30.md)

[WSL2 + ZSH + terminal — configuration complète](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/WSL2%20+%20ZSH%20+%20terminal%20%E2%80%94%20configuration%20compl%C3%A8te%2032f47a063e5481f087f0dd821d111a83.md)

[GitLab — workflow et configuration](Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201/GitLab%20%E2%80%94%20workflow%20et%20configuration%2032f47a063e5481a7a905d8dacd2bfdab.md)