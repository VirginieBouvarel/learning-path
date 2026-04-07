# Specs internes — construction du learning path

Ce fichier sert de mémo interne pour écrire les phases détaillées sans laisser ces consignes dans les pages publiques du site.

## Reports vers la phase suivante

- si, pendant la réécriture d'une phase, un sujet utile est volontairement retiré, réduit ou reporté pour garder une progression pédagogique cohérente, ce report doit être consigné dans `docs/NEXT_PHASE.md`
- chaque point reporté doit préciser au minimum :
  - la phase d'origine concernée
  - l'élément retiré ou allégé
  - la raison du report
  - la phase cible où il devra être repris
  - la forme attendue du traitement futur (`étape complète`, `exercice`, `ressource`, `ADR`, `guide annexe`)
  - un statut `à traiter` ou `traité`
- `docs/NEXT_PHASE.md` doit être relu avant toute proposition de structure cible pour la phase suivante
- quand un point est repris dans la phase suivante, il ne doit pas être supprimé de `docs/NEXT_PHASE.md` : son statut doit passer à `traité`
- avant de concevoir une nouvelle phase, relire `docs/NEXT_PHASE.md`
- quand un point reporté doit être réintégré, il doit l'être explicitement dans la nouvelle phase
- après validation d'une phase, mettre à jour `docs/NEXT_PHASE.md`

## Audit de phase avant réécriture

- avant toute réécriture d'une phase, il faut produire ou mettre à jour un audit riche dans `docs/audits/PHASE_X_AUDIT.md`
- cet audit est le document maître de diagnostic et de cadrage avant édition
- le niveau de détail attendu pour cet audit est celui de `docs/audits/PHASE_0_AUDIT.md`
- cet audit doit être un document riche, argumenté et structuré, pas une synthèse courte
- il doit contenir au minimum :
  - un diagnostic sévère de l'existant
  - une conclusion explicite sur la nécessité de réécrire la phase depuis zéro
  - une structure cible proposée
  - le livrable de fin de phase
  - les grandes étapes proposées
  - les éléments à retirer, déplacer ou reporter
  - une position pédagogique recommandée
  - la structure interne attendue des étapes de la phase réécrite
- s'il existe déjà un audit pour la phase, il doit être relu avant de commencer et mis à jour au lieu de créer un doublon
- le dossier de référence pour ces audits est uniquement `docs/audits/`

## Règle de décision avant édition

- quand on travaille sur une phase, on la réécrit depuis zéro ; on ne se contente pas d'ajuster marginalement l'existant
- l'audit sert à cadrer cette réécriture, à fixer le niveau d'exigence et à définir la structure cible

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
