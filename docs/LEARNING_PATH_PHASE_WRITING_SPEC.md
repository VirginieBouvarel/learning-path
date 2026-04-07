# Step-by-Step Guide Spec

Document de cadrage pour écrire ou réécrire les guides pas-à-pas des phases du learning path.

## But

Écrire un guide pas-à-pas de phase qui permette à une développeuse frontend Vue.js de réaliser seule, dans le bon ordre, une incrémentation réelle de KataSensei jusqu'à une version déployée et utilisable.

La sortie publiée dans `public/` doit être pensée comme un document final pour l'apprenante. Elle ne doit contenir aucune trace des arbitrages internes ayant servi à produire cette version.

## Public cible

- développeuse frontend Vue.js confirmée
- débutante en Java, Spring Boot, backend, infra et déploiement
- ne doit jamais être supposée connaître un outil, une commande, un dossier, un terminal ou une convention si cela n'a pas déjà été expliqué plus tôt dans le parcours

## Environnement cible

- OS concerné : `Windows 11 + WSL2` avec la dernière version d'Ubuntu
- terminal à ouvrir : `WSL` ou un terminal Ubuntu / Unix compatible
- si une étape nécessite un terminal Windows au tout début, cela doit être dit explicitement
- ne jamais supposer `PowerShell` si ce n'est pas explicitement compatible

## Principes pédagogiques obligatoires

- le guide doit partir de la situation réelle au début de la phase, pas d'une situation implicite
- chaque action doit être exécutable sans devinette
- chaque étape doit être petite, simple, progressive, et avoir un objectif clair
- le ton du guide publié doit être affirmatif et orienté exécution
- le guide publié doit donner des instructions détaillées pour atteindre l'objectif de chaque étape puis de la phase
- on suit l'ordre réel de construction d'un vrai produit web qui va en production
- on ne demande jamais en une seule étape un gros bloc flou du type `crée X, Y, Z`
- on explique toujours :
  - ce qu'on va faire
  - pourquoi on le fait maintenant
  - où on le fait
  - avec quel outil
  - quoi taper ou cliquer
  - quoi observer
  - comment savoir si c'est réussi
- toute phase doit produire une incrémentation cohérente, testable, et déployée en fin de phase selon un niveau de déploiement adapté à sa maturité
- toute phase doit viser une valeur utilisateur visible, sauf phase 0 où une valeur technique minimale observable est acceptable
- le guide publié ne doit jamais commenter sa propre fabrication, ses reports éditoriaux ou les décisions internes de cadrage
- le guide publié ne doit pas contenir d'hésitations, d'évocations de choses non vérifiées ou de formulations qui laissent la lectrice arbitrer seule un point qui devrait être déjà tranché
- ne jamais enrichir superficiellement un résumé en le faisant passer pour un vrai guide pas-à-pas
- raisonner comme si la phase devait pouvoir être exécutée seule, sans aide humaine

## Règles anti-implicite

Avant toute commande, le guide doit préciser si nécessaire :

- terminal à ouvrir : `WSL` / terminal Ubuntu
- dossier de départ exact
- si un repo existe déjà ou non
- si on doit créer le repo, le dossier, puis cloner
- si la commande se lance à la racine du projet ou ailleurs
- résultat attendu
- erreurs fréquentes et correction

## Prompt court à réutiliser

`Réécris cette phase comme un vrai guide pas-à-pas exécutable pour une développeuse frontend Vue.js qui débute en backend Java. Supprime tout implicite. L'environnement cible est Windows 11 + WSL2 Ubuntu, avec terminal WSL / Unix uniquement. Pour chaque étape, précise le contexte de départ, le terminal à ouvrir si nécessaire, le dossier exact, les commandes exactes, les résultats attendus, les erreurs fréquentes, un exercice concret, sa solution en details, 3 questions théoriques minimum avec réponses en details, une checklist manuelle, et une suggestion de commit si pertinente. Suis l'ordre réel de construction d'un produit web qui va en prod.`

## Plan de travail recommandé

1. auditer rapidement les thèmes du parcours pour vérifier qu'ils sont cohérents avant réécriture
2. réécrire complètement la phase demandée
3. valider la phase demandée
4. vérifier la cohérence inter-phases, ADR, ressources, DoD, déploiements
5. mettre à jour la base ressources et les pages annexes concernées


## Trame d'une phase

### Exigences de progression

- une phase ne doit pas empiler plusieurs gros concepts non reliés sans fil conducteur
- une étape = un objectif simple
- un exercice = une seule compétence principale
- les exercices doivent suivre la chronologie réelle de construction du produit
- on ne présente pas une abstraction avant d'avoir montré le problème concret qu'elle résout

### Structure obligatoire d'une phase

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

### Structure obligatoire d'une étape

Chaque étape doit contenir :

- un titre clair orienté action
- un objectif
- pourquoi cette étape existe maintenant
- un état de départ exact
- des sous-étapes numérotées
- les commandes exactes ou manipulations exactes
- un résultat attendu
- des erreurs fréquentes
- au moins un exercice concret
- un bloc `details` avec `Solution - A consulter après 20 min`
- au moins 3 questions théoriques
- un bloc `details` de réponse attendue pour chaque question
- une checklist manuelle
- si pertinent, un bloc `Commit` en fin d'étape

Les sous-étapes doivent être écrites sous forme de recette opératoire :

- pas de simple liste d'ordres du type `crée X`, `fais Y`, `refactorise Z`
- chaque sous-étape doit expliquer comment faire concrètement
- dès qu'un fichier est à créer ou modifier, montrer au moins un snippet minimal utile
- dès qu'une commande est attendue, préciser le dossier de départ et le résultat attendu

### Structure obligatoire d'une sous-étape

Pour chaque sous-étape, écrire si nécessaire :

1. ouvre `tel terminal`
2. place-toi dans `tel dossier`
3. lance `telle commande`
4. tu dois voir `tel résultat`
5. si tu vois `telle erreur`, fais `telle correction`

Quand la sous-étape demande d'écrire ou modifier du code, ajouter aussi si nécessaire :

6. ouvre `tel fichier`
7. colle ou adapte `tel snippet minimal`
8. vérifie que `tel import`, `tel type` ou `tel test` compile
9. relance `telle commande` pour confirmer le résultat

### Contenu attendu d'un bloc Commit

Quand une étape correspond à un bon point de commit, le bloc `Commit` doit contenir :

- pourquoi c'est le bon moment pour commit
- la liste précise des fichiers ou dossiers à commit
- si nécessaire, ce qu'il ne faut pas encore commit
- un message de commit suggéré

Le bloc `Commit` ne doit pas être regroupé en fin de phase. Il doit être placé au plus près de l'étape qu'il clôt.

### Tests

Chaque étape doit préciser :

- tests manuels à faire
- tests automatisés à écrire ou lancer
- ce qu'on vérifie avant commit
- ce qu'on vérifie avant mise en prod

Chaque phase doit contenir :

- checklist de validation locale
- checklist avant déploiement
- checklist après déploiement

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
- une sous-étape qui reste une consigne vague sans mode d'emploi doit être réécrite
- la section de déploiement ne doit jamais se contenter d'un report flou du type `on déploiera plus tard` si la phase produit déjà un incrément cohérent
- toute phase détaillée doit se terminer par :
  - des vérifications locales
  - un déploiement adapté au niveau de la phase
  - une preuve post-déploiement observable

## Commits

- ajouter des suggestions de commits quand c'est pertinent
- format obligatoire : `type(contexte): description courte en français`
- les commits doivent suivre la progression réelle du travail
- ne pas proposer un commit qui mélange plusieurs objectifs pédagogiques différents

## Ressources externes

Chaque phase doit proposer :

- quelques ressources officielles prioritaires
- éventuellement 1 ou 2 ressources pédagogiques complémentaires
- une phrase expliquant pourquoi cette ressource aide maintenant

Et côté base ressources :

- toute ressource mentionnée dans une phase doit être ajoutée dans la base des ressources avec les bonnes propriétés

## Critères de qualité d'une bonne étape ou sous-étape

Un bon guide permet à la lectrice de répondre `oui` à tout ceci :

- je sais où commencer
- je sais quel terminal ouvrir
- je sais dans quel dossier me mettre
- je comprends pourquoi je fais cette étape
- je sais quoi taper
- je sais quoi vérifier
- je sais quand c'est terminé
- je peux continuer sans deviner

## Critères d'échec d'une étape ou sous-étape

Le guide est mauvais si :

- il dit seulement `crée X` sans détailler comment
- il donne des listes de tâches au format "fais-ci / fais-ca" sans explication opératoire
- il suppose l'existence d'un repo ou d'un dossier sans le dire
- il saute directement à une commande sans préciser le contexte
- il demande un gros bloc d'implémentation d'un coup
- une étape reste trop implicite, trop grosse ou trop abstraite
- une sous-étape ressemble à une simple liste d'ordres sans mode d'emploi concret
- il pose des questions sans avoir enseigné le concept juste avant
- il n'y a pas de preuve observable de réussite
- il n'y a pas de solution détaillée
- il n'y a pas de DoD

