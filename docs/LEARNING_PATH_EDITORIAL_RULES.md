# Learning Path Editorial Rules

Document interne de référence pour écrire et relire les pages du learning path.

## Structure du site

- le site ne comporte que 2 niveaux : `Parcours` puis `Phase`
- le parcours résume, cadre et montre l'état du projet
- chaque phase est le guide détaillé pas à pas
- il ne doit plus y avoir de formulation laissant croire à un niveau intermédiaire `overview de phase`

## Contrat éditorial d'une phase détaillée

Chaque phase détaillée doit être suffisamment complète pour permettre de construire la phase sans dépendre d'une explication externe implicite.

Chaque étape doit, quand c'est pertinent :

- annoncer l'objectif de l'étape et son lien avec l'objectif global de phase
- donner les prérequis utiles
- détailler les opérations, commandes, fichiers, configurations et vérifications à réaliser
- découper le travail en exercices simples, progressifs et exécutables
- proposer au moins 3 questions théoriques pour faire réfléchir sur le pourquoi, le comment ou le concept en jeu
- suivre chaque question d'un bloc `details` contenant la réponse attendue
- suivre chaque exercice d'un bloc `details` de correction intitulé `Solution - A consulter après 20 min`
- citer les documentations officielles quand elles apportent une aide utile ou une source de vérité
- expliciter les erreurs fréquentes, pièges ou points de vigilance quand ils sont probables

## ADR — usage pédagogique

- un ADR (`Architecture Decision Record`) est un document court qui consigne une décision d'architecture ou de conception importante, avec son contexte, ses conséquences et les alternatives rejetées
- la phase 0 doit expliquer ce qu'est un ADR, pourquoi on en écrit, où on le place dans le projet et quand il faut en créer un nouveau
- `ADR 001` doit être fourni comme exemple déjà rédigé pour servir de modèle
- chaque ADR suivant doit être introduit par un exercice de rédaction dans la phase où la décision devient nécessaire
- chaque exercice ADR doit contenir une correction complète dans un bloc `details`
- la numérotation ADR doit être unique et cohérente sur l'ensemble du learning path
- si une décision est utile mais que son numéro n'est pas encore stabilisé, utiliser temporairement `ADR XXX` dans les règles internes puis renuméroter avant publication

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

- si une interface minimale fonctionnelle peut être définie, elle peut être proposée, y compris avec `shadcn-vue` si cette décision est actée
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
