# Learning Path Editorial Rules

Document interne de référence pour écrire et relire les pages du learning path.

## Public visé et frontière éditoriale

- les pages du dossier `public/` constituent la version publique du learning path
- cette version publique parle à une apprenante, pas à l'équipe qui rédige le parcours
- elle doit lui permettre d'apprendre les technologies nécessaires pour construire KataSensei de A à Z, de la création d'un repo GitHub dédié jusqu'à la mise en production du produit final
- le contenu public ne doit pas contenir de traces de fabrication du learning path lui-même
- le ton du contenu public doit être direct, affirmatif et opératoire
- le contenu public doit donner des instructions détaillées pour arriver jusqu'à l'objectif de l'étape ou de la phase
- le contenu public ne doit pas exprimer d'hésitation, de flou, de suppositions non traitées ou d'évocation d'éléments non vérifiés
- sont interdits dans `public/` :
  - les justifications sur nos choix éditoriaux
  - les références à nos discussions internes
  - les explications sur la manière dont nous avons restructuré, déplacé ou allégé le contenu
  - les phrases qui commentent la rédaction du parcours au lieu d'enseigner le projet
- les documents internes (`docs/`, audits, backlog inter-phases, notes, sources héritées) peuvent contenir ces réflexions, car ils servent justement à construire et corriger la version publique

## Structure du site

- le site ne comporte que 2 niveaux : `Parcours` puis `Phase`
- le parcours résume, cadre et montre l'état du projet
- chaque phase est le guide détaillé pas à pas
- il ne doit plus y avoir de formulation laissant croire à un niveau intermédiaire `overview de phase`

## ADR

- un ADR est introduit seulement lorsqu'une vraie décision structurante apparaît
- le guide explique pourquoi l'ADR est nécessaire à ce moment précis
- si c'est un exercice, il doit avoir sa correction complète en `details`
- si c'est un ADR de référence déjà fourni, on renvoie vers le guide interne

## Cohérence entre phases et guides internes

- les phases doivent respecter `ADR 001 - Ubiquitous Language`
- les phases doivent respecter les conventions front stabilisées quand elles manipulent du code Vue, du CSS ou des composants
- une phase ne doit pas contredire un guide interne déjà validé
- une convention stable doit être centralisée dans un seul guide interne de référence plutôt que répétée différemment dans plusieurs phases

## Vocabulaire et exemples de code

- contenu public en français
- identifiants de code sans accents
- termes métier en français selon `ADR 001`
- suffixes techniques en anglais selon `ADR 001`
- ne pas enseigner dans une phase un vocabulaire métier qui contredit le guide `Ubiquitous Language`

## Frontend et UI

- si une interface minimale fonctionnelle peut être définie, elle peut être proposée, y compris avec `PrimeVue` si cette décision est actée
- si la partie visuelle ne peut pas encore être définie de façon utile, créer une section ou un exercice repérable avec le texte rouge `En attente des specs et maquettes frontend`
- dans ce cas, ajouter aussi un `TODO` dans le code ou le markup pour faciliter la reprise plus tard

## Règles de relecture

Avant validation d'une phase, vérifier :

- que la phase ne suppose pas un faux niveau éditorial intermédiaire
- que toutes les opérations indispensables apparaissent bien dans la phase
- que les exercices, questions et corrections sont suffisamment nombreux et concrets
- que les ADR mentionnés sont cohérents, uniques et placés au bon moment pédagogique
- que les conventions globales ne sont pas contredites localement
- que les parties UI non spécifiées sont soit suffisamment définies pour être fonctionnelles, soit explicitement marquées comme en attente
- que la stratégie de déploiement de fin de phase décrit un vrai déploiement proportionné à l'incrément produit
- qu'une preuve post-déploiement observable est bien demandée
