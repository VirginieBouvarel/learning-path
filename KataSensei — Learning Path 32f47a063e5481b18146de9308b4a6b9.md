# KataSensei — Learning Path

> 🎯 **Objectif** : devenir développeuse fullstack Vue 3/TypeScript strict/Java 21 avec une maîtrise de l'architecture hexagonale, du TDD, du typage fort et des design patterns — front et back.
> 

## Le projet fil rouge

**KataSensei** est une plateforme d'entraînement aux katas de code pour les profils en reconversion (bootcamp, formation courte). 
Éditeur Monaco embarqué, supervision IA socratique (Claude API), exécution sécurisée (Piston API), compte utilisateur et suivi de progression.

Tu construis KataSensei pendant que tu apprends à le construire.

---

## Stack complète

| Côté | Technologies |
| --- | --- |
| Frontend | Vue 3, TypeScript strict, Pinia, Vue Router, Vitest, Playwright |
| Backend | Java 21, Spring Boot 3, Maven, JPA/Hibernate, Flyway, Spring Security |
| Archi | Hexagonale front + back, TDD, SOLID, DDD tactique |
| Infra | PostgreSQL, Redis, Docker, GitHub Actions, [Fly.io](http://Fly.io) |
| API externes | Claude API (IA sensei), Piston API (exécution code) |

---

## Structure du parcours

| Phase | Titre | Durée |
| --- | --- | --- |
| 0 | Setup — environnement, config, prod day 1 | 1 sem · ~6h |
| 1 | HTTP, REST, persistance naïve + gestion erreurs centralisée | 2 sem · ~10h |
| 2 | Typage fort TS + LogService + useAsync + archi hexa front | 2 sem · ~10h |
| 3 | Auth JWT, SOLID, Value Objects Java + erreurs exhaustives | 2 sem · ~10h |
| 4 | Architecture hexagonale complète + DDD tactique + patterns front | 3 sem . ~14 h |
| 5 | Events, SSE streaming, cache Redis + Observer + ACL front | 2 sem · ~10h |
| 6 | Contrat OpenAPI, tests avancés, Decorator, docs finales | 2 sem · ~10h |
| 7 | CI/CD complète, Docker multi-stage, mise en prod finale | 1 sem · ~6h |

**Total estimé : ~76 h de code effectif · ~5 mois à raison d'une soirée + demi-weekend par semaine**

---

## Légende des catégories

- 🟣 **Typage fort** – branded types, Result, discriminated unions, type guards
- 🟡 **TDD** – Red/Green/Refactor, tests unitaires, intégration, e2e
- 🟢 **Archi hexagonale** — ports & adapters, domaine pur, DDD tactique
- 🟠 **Design patterns** : Strategy, Factory, Builder, Observer, Decorator, Compound Component
- 🩷 **Refactoring guidé** — dette intentionnelle, refacto pas-à-pas
- ⚫ **CI/CD & ops** – Docker, GitHub Actions, [Fly.io](http://Fly.io), secrets
- 🔴 **Gestion des erreurs** — centralisée, exhaustive, front et back

---

## Navigation

Chaque phase est une sous-page. Ouvre-les dans l'ordre.

[Phase 0 — Setup : environnement, config, prod day 1](KataSensei%20%E2%80%94%20Learning%20Path/Phase%200%20%E2%80%94%20Setup%20environnement,%20config,%20prod%20day%201%2032f47a063e54816b8330f425a3896b88.md)

[Phase 1 — HTTP, REST, persistance naïve + gestion des erreurs](KataSensei%20%E2%80%94%20Learning%20Path/Phase%201%20%E2%80%94%20HTTP,%20REST,%20persistance%20na%C3%AFve%20+%20gestion%20%2032f47a063e548147ac6afdcc0fa51182.md)

[Phase 2 — Typage fort TS + LogService + useAsync + archi hexa front](KataSensei%20%E2%80%94%20Learning%20Path/Phase%202%20%E2%80%94%20Typage%20fort%20TS%20+%20LogService%20+%20useAsync%20+%2032f47a063e5481298c6fc41835ad2785.md)

[Phase 3 — Auth JWT, SOLID, Value Objects + erreurs exhaustives](KataSensei%20%E2%80%94%20Learning%20Path/Phase%203%20%E2%80%94%20Auth%20JWT,%20SOLID,%20Value%20Objects%20+%20erreurs%2032f47a063e5481b3928ae604e7791e88.md)

[Phase 4 — Architecture hexagonale complète + DDD + patterns front](KataSensei%20%E2%80%94%20Learning%20Path/Phase%204%20%E2%80%94%20Architecture%20hexagonale%20compl%C3%A8te%20+%20DDD%20+%2032f47a063e548189a896c59f28be5dd3.md)

[Phase 5 – Events, SSE streaming, cache Redis + ACL front](KataSensei%20%E2%80%94%20Learning%20Path/Phase%205%20%E2%80%93%20Events,%20SSE%20streaming,%20cache%20Redis%20+%20ACL%2032f47a063e548178818deb8e0e09af36.md)

[Phase 6 — Contrat OpenAPI, tests avancés, Decorator, docs](KataSensei%20%E2%80%94%20Learning%20Path/Phase%206%20%E2%80%94%20Contrat%20OpenAPI,%20tests%20avanc%C3%A9s,%20Decorato%2032f47a063e5481ed9946cf2051120d80.md)

[Phase 7 — CI/CD complète, Docker multi-stage, mise en prod](KataSensei%20%E2%80%94%20Learning%20Path/Phase%207%20%E2%80%94%20CI%20CD%20compl%C3%A8te,%20Docker%20multi-stage,%20mise%2032f47a063e54815383dbe41b9079e82f.md)

[🎯 Backlog KataSensei](KataSensei%20%E2%80%94%20Learning%20Path/%F0%9F%8E%AF%20Backlog%20KataSensei%2067911f5769d6494db75c9c1fabf70b46.csv)

[Ubiquitous Language — ADR 000](KataSensei%20%E2%80%94%20Learning%20Path/Ubiquitous%20Language%20%E2%80%94%20ADR%20000%2033047a063e54818cb48cd11781cb34b5.md)

[Arborescence et testabilité](KataSensei%20%E2%80%94%20Learning%20Path/Arborescence%20et%20testabilit%C3%A9%2032f47a063e54810fb455c7c4103223d1.md)

[Workflow GitLab](KataSensei%20%E2%80%94%20Learning%20Path/Workflow%20GitLab%2033047a063e5481a7bef5ff5614d4ac60.md)

[Conventional Commits](KataSensei%20%E2%80%94%20Learning%20Path/Conventional%20Commits%2033047a063e5481239921ec4986ad78a7.md)

[Checklist sécurité & performances — pré-prod](KataSensei%20%E2%80%94%20Learning%20Path/Checklist%20s%C3%A9curit%C3%A9%20&%20performances%20%E2%80%94%20pr%C3%A9-prod%2032f47a063e5481218a55da93984a5213.md)

[📖 Documentations & Ressources](KataSensei%20%E2%80%94%20Learning%20Path/%F0%9F%93%96%20Documentations%20&%20Ressources%20e69668a49ca14527bf75f92a4bac1f4a.csv)

[Comment utiliser Claude pendant le parcours](KataSensei%20%E2%80%94%20Learning%20Path/Comment%20utiliser%20Claude%20pendant%20le%20parcours%2032f47a063e5481359e59c96b3f093d5a.md)

[Utiliser DataGrip dans le projet](KataSensei%20%E2%80%94%20Learning%20Path/Utiliser%20DataGrip%20dans%20le%20projet%2033047a063e54818db219f3177cded652.md)

[Optional en Java](KataSensei%20%E2%80%94%20Learning%20Path/Optional%20en%20Java%2033047a063e5481068baee136d42b6993.md)

[📈 Suivi de progression](KataSensei%20%E2%80%94%20Learning%20Path/%F0%9F%93%88%20Suivi%20de%20progression%20fb0fc51e67b8479a9661edb856e7124e.csv)

[📈 Suivi de progression](KataSensei%20%E2%80%94%20Learning%20Path/%F0%9F%93%88%20Suivi%20de%20progression%2080d2046f417f453591631b98a9fcd5de.csv)

[ADR 003 — Conventions front (CSS, composants, structure)](KataSensei%20%E2%80%94%20Learning%20Path/ADR%20003%20%E2%80%94%20Conventions%20front%20(CSS,%20composants,%20stru%2033047a063e5481398238f7a4c9763a3d.md)