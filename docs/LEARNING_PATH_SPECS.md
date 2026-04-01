# Specs internes — construction du learning path

Ce fichier sert de mémo interne pour écrire les phases détaillées sans laisser ces consignes dans les pages publiques du site.

## Structure éditoriale du site

Le learning path n'a que 2 niveaux :

- `Parcours` : vue d'ensemble, timeline, objectifs, concepts, état du projet et livrables par phase, sans déroulé opératoire exhaustif
- `Phase` : guide détaillé pas à pas avec opérations, configs, commandes, tests, vérifications manuelles, questions théoriques et corrections

Il n'existe pas de niveau intermédiaire `overview de phase`.

### Règle de relecture

- si une opération est indispensable pour construire le projet final, elle doit apparaître dans la phase détaillée
- si elle n’est qu’un résumé de phase, elle doit rester dans le parcours
- si elle est une consigne interne de rédaction, elle doit aller dans les specs internes, jamais dans les pages publiques

## ADR — rôle pédagogique dans le learning path

- un ADR (`Architecture Decision Record`) est un document court qui capture une décision d'architecture ou de conception importante, son contexte, ses conséquences et les alternatives rejetées
- `ADR 001` correspond au guide `Ubiquitous Language` et doit être présenté dès la phase 0 comme premier ADR de référence
- à partir de la phase 1, les nouveaux ADR utiles peuvent être demandés comme exercices de phase
- chaque exercice ADR doit contenir un bloc `details` avec une proposition de correction complète
- si une décision structurante front est nécessaire dès la phase 0, elle doit être introduite comme exercice ADR avec le bon numéro réel ou, si la numérotation n'est pas encore stabilisée, un placeholder explicite `ADR XXX` à renuméroter avant publication
- la numérotation ADR doit être unique sur tout le parcours : un même numéro ne peut jamais désigner deux décisions différentes

## Cohérence avec les guides internes

- les phases doivent respecter `ADR 001` pour le vocabulaire métier et technique
- les phases qui introduisent des composants Vue doivent respecter les conventions front déjà décidées
- si une convention stable s'applique à plusieurs phases, elle doit être centralisée dans un guide interne unique et les phases doivent y renvoyer au lieu de la réécrire différemment
- le document de référence pour ces règles de rédaction et de cohérence est `docs/LEARNING_PATH_EDITORIAL_RULES.md`

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
