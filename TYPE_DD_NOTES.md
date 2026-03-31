# Notes théoriques — TypeDD

Ce document ne traite que du concept de `TypeDD`, de ses frontières, et de ses différences avec d'autres notions proches.

## 1. Définition

Le `TypeDD` désigne une approche de conception où le système de types devient un outil central de modélisation.

L'idée n'est pas seulement de “bien typer” le code, mais de faire porter au compilateur une partie importante des garanties du design.

Dans une approche TypeDD, on cherche à :

- représenter précisément les états possibles
- rendre les transitions illégales impossibles à exprimer
- faire émerger la forme du code à partir des contrats de types
- réduire l'espace des erreurs possibles avant même l'exécution

Le type system ne sert donc plus seulement à documenter ou sécuriser marginalement. Il participe directement à la conception.

## 2. Ce que le TypeDD n'est pas

Le `TypeDD` n'est pas :

- simplement `TypeScript strict`
- simplement du `typage fort`
- simplement de la validation runtime
- simplement une habitude de “mettre des types partout”
- simplement du TDD appliqué à du code TypeScript

Le point distinctif est le rôle structurel des types dans les décisions de conception.

## 3. Différence avec TypeScript strict

`TypeScript strict` est une configuration du compilateur.

Exemples :

- `strict: true`
- `noImplicitAny`
- `strictNullChecks`
- `noUncheckedIndexedAccess`

Son rôle :

- signaler des ambiguïtés
- empêcher certaines erreurs courantes
- fournir un socle plus sûr

Mais `TypeScript strict` ne dit rien, à lui seul, sur la manière de concevoir le domaine.

On peut avoir un projet en strict mode sans aucune démarche TypeDD.

## 4. Différence avec le typage fort

Le `typage fort` est une pratique de modélisation pragmatique.

Il consiste souvent à :

- rendre les signatures plus claires
- éviter les `string` ou `any` génériques quand un type métier existe
- utiliser des unions utiles
- structurer les erreurs et les contrats

Le typage fort améliore la robustesse et la lisibilité.

Le `TypeDD` va plus loin :

- les types ne servent plus seulement à mieux décrire
- ils servent à piloter les choix de conception eux-mêmes

Autrement dit :

- `typage fort` : les types renforcent le design
- `TypeDD` : les types guident activement le design

## 5. Différence avec le TDD

Le `TDD` et le `TypeDD` sont deux approches distinctes.

### TDD

Le `TDD` part des comportements observables.

On écrit :

- un test qui échoue
- le code minimal
- un refactoring

Le design émerge par cycles de comportement.

### TypeDD

Le `TypeDD` part davantage des formes valides du système.

On cherche à exprimer :

- quelles données peuvent exister
- quels états sont légaux
- quelles transitions sont autorisées
- quelles erreurs sont représentables

Le design émerge par modélisation des possibilités et impossibilités.

### Relation entre les deux

Ils peuvent se compléter, mais ils ne se remplacent pas.

- le `TDD` vérifie le comportement
- le `TypeDD` réduit l'espace des comportements illégaux

Le compilateur ne remplace pas les tests. Les tests ne remplacent pas les garanties de modélisation.

## 6. Signes typiques d'une approche TypeDD

On commence à entrer dans une logique TypeDD quand :

- les états du domaine sont modélisés comme des unions bien fermées
- les transitions illégales deviennent non représentables
- certaines fonctions n'acceptent que des formes déjà validées
- le design évite les objets “partiellement valides”
- le compilateur devient un guide de navigation dans le refactoring

Exemples typiques :

- états de workflow
- modèles de formulaires à étapes
- erreurs métier structurées
- transitions d'une session ou d'un processus
- types de commandes / événements avec variantes fermées

## 7. Outils souvent présents dans une démarche TypeDD

Le `TypeDD` ne se réduit pas à une liste d'outils, mais certaines techniques apparaissent souvent :

- unions discriminées
- branded types ou nominal typing simulé
- types opaques
- generic constraints
- utilitaires de narrowing
- exhaustivité avec `never`
- séparation plus nette entre types bruts, types validés, types métier

Ces outils ne suffisent pas à faire du TypeDD, mais ils en sont souvent les briques.

## 8. Bénéfices

Quand il est bien utilisé, le `TypeDD` peut :

- rendre certaines erreurs impossibles
- clarifier les invariants du domaine
- aider à refactorer avec plus de confiance
- rendre certaines APIs internes plus difficiles à mal utiliser
- faire du compilateur un partenaire de design

Il est particulièrement utile quand le problème est riche en états, règles et transitions.

## 9. Risques et limites

Le `TypeDD` a aussi des coûts.

Risques fréquents :

- surcharge cognitive
- types trop sophistiqués pour le gain réel
- code plus difficile à lire pour les personnes moins expertes
- design piloté par l'élégance du type system plutôt que par le besoin métier
- confusion entre sécurité compile-time et validation métier réelle

Autrement dit :

un projet peut devenir “intellectuellement impressionnant” mais pédagogiquement ou opérationnellement moins clair.

## 10. Bon usage

Le `TypeDD` est le plus pertinent quand :

- le domaine a des états bien distincts
- certaines transitions doivent être interdites
- les erreurs de modélisation coûtent cher
- l'équipe sait lire et maintenir ce niveau de types

Il est moins pertinent quand :

- le domaine est encore flou
- l'équipe découvre déjà beaucoup d'autres concepts
- le code a surtout besoin de clarté simple
- les types commencent à masquer l'intention au lieu de l'éclairer

## 11. Formule courte

Résumé :

- `TypeScript strict` = socle de compilation
- `typage fort` = modélisation pragmatique
- `TDD` = conception par le comportement testé
- `TypeDD` = conception davantage guidée par les types et les états représentables
