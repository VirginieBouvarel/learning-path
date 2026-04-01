# Specs internes — construction du learning path

Ce fichier sert de mémo interne pour écrire les guides détaillés sans laisser ces consignes dans les pages publiques du site.

## Règles transversales — tests et niveaux de détail

- `Parcours` : nomme les familles de tests et leur rôle par phase, sans opérations ni commandes
- `Overview de phase` : explique ce qu’on teste à cette phase, pourquoi, et ce que la CI exécute désormais
- `Guide détaillé` : liste toutes les opérations, configs, commandes, tests à écrire, tests à lancer, vérifications manuelles et points de contrôle

### Règle de relecture

- si une opération est indispensable pour construire le projet final, elle doit apparaître dans le guide détaillé
- si elle n’est qu’un résumé de phase, elle doit rester dans l’overview ou le parcours
- si elle est une consigne interne de rédaction, elle doit aller dans les specs internes, jamais dans les pages publiques

## Phase 4

- Faire écrire au moins 3 règles `ArchUnit` :
  - le domaine n'importe ni Spring, ni JPA, ni infrastructure
  - les adapters n'appellent les use cases que via les bons ports
  - le sens des dépendances respecte l'hexagone
- Faire écrire au moins 3 règles `dependency-cruiser` :
  - `src/domain` n'importe ni Vue ni `src/ui`
  - `src/ui` ne contient pas de logique métier ou d'appels API directs
  - les imports entre couches suivent `domain -> infrastructure -> ui` uniquement dans le sens attendu

## Phase 5

- Faire propager un `correlationId` depuis l'entrée HTTP jusqu'au flux SSE de hints
- Montrer explicitement le passage par les listeners intermédiaires
- Prévoir au moins une vérification concrète :
  - test ciblé
  - ou vérification manuelle montrant qu'un même identifiant traverse tout le flux

## Phase 6

- Faire produire des logs JSON lisibles sur au moins un use case métier clé
- Montrer la propagation du `correlationId` déjà introduit en phase 5
- Convertir explicitement les routes principales Vue Router en lazy loading via `() => import(...)`
- Vérifier qu'un scénario Playwright couvre un flux où logs structurés, contrat API et route lazy-loaded coexistent

## Phase 7

- Configurer `Renovate` sur :
  - npm
  - Maven
  - GitLab CI/CD
- Garder une stratégie simple de regroupement des PRs auto
- Poser une règle claire dans le guide :
  - aucune PR automatique n'est mergée si la chaîne complète n'est pas verte

## À prévoir

- Créer une skill `/review-sensei` fullstack adaptée au projet KataSensei, sur le modèle de `/review`, pour relire le projet Vue + TypeScript + Java
