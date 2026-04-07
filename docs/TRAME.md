# Trame de phase

Ce document fixe la trame éditoriale à réutiliser pour toutes les phases détaillées du learning path.

## Structure obligatoire d'une page de phase

La page doit contenir au minimum :

- un en-tête de phase avec titre, durée, introduction et tags
- un bloc de cadrage de phase avec :
  - objectif de phase
  - état de départ exact
  - résultat attendu en fin de phase
  - valeur livrée à l'utilisateur
  - prérequis
  - outils mobilisés
- une succession d'étapes courtes orientées action
- une checklist manuelle de validation de phase
- une stratégie de déploiement de fin de phase avec preuve déployée explicite
- des ressources externes utiles
- si pertinent, des blocs `Commit` placés directement à la fin des étapes concernées

## Structure obligatoire d'une étape

Chaque étape doit contenir :

- un titre clair orienté action
- un objectif
- pourquoi cette étape existe maintenant
- un état de départ exact
- des micro-étapes numérotées
- les commandes exactes ou manipulations exactes
- un résultat attendu
- des erreurs fréquentes
- au moins un exercice concret
- un bloc `details` avec `Solution - A consulter après 20 min`
- au moins 3 questions théoriques
- un bloc `details` de réponse attendue pour chaque question
- une checklist manuelle
- si pertinent, un bloc `Commit` en fin d'étape

Les micro-étapes doivent être écrites sous forme de recette opératoire :

- pas de simple liste d'ordres du type `crée X`, `fais Y`, `refactorise Z`
- chaque micro-étape doit expliquer comment faire concrètement
- dès qu'un fichier est à créer ou modifier, montrer au moins un snippet minimal utile
- dès qu'une commande est attendue, préciser le dossier de départ et le résultat attendu

## Contenu attendu d'un bloc Commit

Quand une étape correspond à un bon point de commit, le bloc `Commit` doit contenir :

- pourquoi c'est le bon moment pour commit
- la liste précise des fichiers ou dossiers à commit
- si nécessaire, ce qu'il ne faut pas encore commit
- un message de commit suggéré

Le bloc `Commit` ne doit pas être regroupé en fin de phase. Il doit être placé au plus près de l'étape qu'il clôt.

## Niveau de détail attendu

- aucune commande ne doit apparaître sans son contexte d'exécution
- le ton de la phase doit rester direct, affirmatif et opératoire
- une consigne ne doit pas suggérer une hésitation ou une vérification laissée à la charge de l'apprenante si le parcours doit déjà fournir la réponse
- si nécessaire, préciser explicitement :
  - le terminal à ouvrir
  - le dossier de départ
  - si un repo existe déjà ou non
  - le résultat attendu
  - la correction en cas d'échec
- les étapes doivent suivre l'ordre réel de construction du produit
- une étape trop grosse, trop abstraite ou avec plusieurs objectifs pédagogiques différents doit être découpée
- une micro-étape qui reste une consigne vague sans mode d'emploi doit être réécrite
- la section de déploiement ne doit jamais se contenter d'un report flou du type `on déploiera plus tard` si la phase produit déjà un incrément cohérent
- toute phase détaillée doit se terminer par :
  - des vérifications locales
  - un déploiement adapté au niveau de la phase
  - une preuve post-déploiement observable
