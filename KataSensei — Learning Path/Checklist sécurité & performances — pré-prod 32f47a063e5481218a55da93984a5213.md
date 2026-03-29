# Checklist sécurité & performances — pré-prod

> À valider avant chaque déploiement en production. Les explications sont dans les guides de phase correspondants — cette page est uniquement la checklist finale.
> 

---

## Sécurité

### Authentification & secrets

- [ ]  JWT secret ≥ 256 bits, injecté depuis variable d'env uniquement
- [ ]  BCrypt pour tous les mots de passe — jamais stocké en clair
- [ ]  `.env` ignoré par git — `.env.example` commité
- [ ]  Aucun secret dans les logs (mot de passe, token, clé API)
- [ ]  GitHub Secrets configurés pour la CI

### Réseau & API

- [ ]  CORS configuré avec liste blanche d'origines (jamais `*`)
- [ ]  HTTPS uniquement en prod
- [ ]  Rate limiting actif sur `POST /auth/login` — 5 tentatives/min par IP (Bucket4j)
- [ ]  Toutes les routes protégées sauf `/auth/**` et `/actuator/health`

### Headers HTTP (phase 6)

- [ ]  `Content-Security-Policy` dans Spring Security
- [ ]  `X-Frame-Options: DENY` actif
- [ ]  `Strict-Transport-Security` actif

### Code & données

- [ ]  Zéro concaténation de String dans les requêtes SQL — JPA uniquement
- [ ]  Stack trace jamais exposé en prod — `@ControllerAdvice` retourne un message générique
- [ ]  `InvalidCredentialsException` générique (même message pour email inconnu et mauvais mdp)
- [ ]  Type guards côté front — toute donnée externe validée avant utilisation
- [ ]  Données sensibles jamais loggées (token JWT, mot de passe)

### Infrastructure (phase 7)

- [ ]  Container Docker lancé en utilisateur non-root (`USER 1001`)
- [ ]  Scan Trivy sur l'image Docker — zéro CVE critique
- [ ]  Procédure de rotation des secrets documentée

### OWASP Top 10

- [ ]  A01 Broken Access Control → JWT + routes protégées ✓
- [ ]  A02 Cryptographic Failures → BCrypt + secrets en env ✓
- [ ]  A03 Injection → JPA + requêtes préparées ✓
- [ ]  A05 Security Misconfiguration → headers HTTP + CORS strict ✓
- [ ]  A07 Authentication Failures → rate limiting + credentials génériques ✓

---

## Performances

### Base de données

- [ ]  Index SQL sur toutes les colonnes filtrées (`difficulty`, `language`, `user_id`, `email`)
- [ ]  Zéro N+1 query détecté avec `show-sql: true`
- [ ]  Toutes les listes paginées — zéro endpoint sans `Pageable`
- [ ]  Projections DTO là où les entités complètes ne sont pas nécessaires

### Cache & timeouts

- [ ]  Cache Redis actif sur les données stables (`@Cacheable`)
- [ ]  `@CacheEvict` configuré quand les données changent
- [ ]  Timeout 30s sur Claude API et Piston API

### Frontend

- [ ]  Bundle analysé avec `rollup-plugin-visualizer` — objectif < 200KB
- [ ]  `defineAsyncComponent` sur les routes non critiques
- [ ]  `shallowRef` là où la réactivité profonde n'est pas nécessaire

### Infrastructure

- [ ]  JVM tuning : `-Xmx512m` adapté au plan [Fly.io](http://Fly.io)
- [ ]  Docker image < 200MB (multi-stage JDK → JRE)
- [ ]  Graceful shutdown configuré
- [ ]  `/actuator/metrics` — identifier les endpoints P95 > 200ms
- [ ]  Sentry configuré en prod