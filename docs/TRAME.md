# Trame de phase

Ce document fixe la trame éditoriale à réutiliser pour toutes les phases détaillées du learning path.

Références :

- la spec de rédaction reste `docs/STEP_BY_STEP_GUIDE_SPEC.md`
- la référence concrète de rendu est `site/phases/phase-0.html`

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
- une `Definition of Done` de phase
- une checklist manuelle de validation de phase
- une stratégie de déploiement de fin de phase
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
- une `Definition of Done` de l'étape
- une checklist manuelle
- si pertinent, un bloc `Commit` en fin d'étape

## Contenu attendu d'un bloc Commit

Quand une étape correspond à un bon point de commit, le bloc `Commit` doit contenir :

- pourquoi c'est le bon moment pour commit
- la liste précise des fichiers ou dossiers à commit
- si nécessaire, ce qu'il ne faut pas encore commit
- un message de commit suggéré

Le bloc `Commit` ne doit pas être regroupé en fin de phase. Il doit être placé au plus près de l'étape qu'il clôt.

## Niveau de détail attendu

- aucune commande ne doit apparaître sans son contexte d'exécution
- si nécessaire, préciser explicitement :
  - le terminal à ouvrir
  - le dossier de départ
  - si un repo existe déjà ou non
  - le résultat attendu
  - la correction en cas d'échec
- les étapes doivent suivre l'ordre réel de construction du produit
- une étape trop grosse, trop abstraite ou avec plusieurs objectifs pédagogiques différents doit être découpée

## Règle de continuité

- avant de concevoir une nouvelle phase, relire `docs/NEXT_PHASE.md`
- quand un point reporté doit être réintégré, il doit l'être explicitement dans la nouvelle phase
- après validation d'une phase, mettre à jour `docs/NEXT_PHASE.md`
