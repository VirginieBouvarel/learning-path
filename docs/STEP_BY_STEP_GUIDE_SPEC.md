# Step-by-Step Guide Spec

Document de cadrage pour écrire ou réécrire les guides pas-à-pas des phases du learning path.

## But

Écrire un guide pas-à-pas de phase qui permette à une développeuse frontend Vue.js de réaliser seule, dans le bon ordre, une incrémentation réelle de KataSensei jusqu'à une version déployée et utilisable.

La sortie publiée dans `public/` doit être pensée comme un document final pour l'apprenante. Elle ne doit contenir aucune trace des arbitrages internes ayant servi à produire cette version.

## Pré-travail obligatoire

Avant toute réécriture d'une phase :

- produire ou mettre à jour un audit complet dans `docs/audits/PHASE_X_AUDIT.md`
- utiliser `docs/audits/PHASE_0_AUDIT.md` comme référence de niveau de détail attendu
- remettre cet audit à l'utilisateur comme première réponse de travail
- attendre validation
- réécrire ensuite la phase depuis zéro

Cet audit n'est pas un livrable optionnel. Il fait partie du workflow normal de réécriture.

## Public cible

- développeuse frontend Vue.js confirmée
- débutante en Java, Spring Boot, backend, infra et déploiement
- ne doit jamais être supposée connaître un outil, une commande, un dossier, un terminal ou une convention si cela n'a pas déjà été expliqué plus tôt dans le parcours

## Environnement cible

- OS concerné : `Windows 11 + WSL2` avec la dernière version d'Ubuntu
- terminal à ouvrir : `WSL` ou un terminal Ubuntu / Unix compatible
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

## Règles anti-implicite

Avant toute commande, le guide doit préciser si nécessaire :

- terminal à ouvrir : `WSL` / terminal Ubuntu
- dossier de départ exact
- si un repo existe déjà ou non
- si on doit créer le repo, le dossier, puis cloner
- si la commande se lance à la racine du projet ou ailleurs
- résultat attendu
- erreurs fréquentes et correction

## Structure obligatoire d'une phase

Chaque phase doit contenir :

- objectif de phase
- état de départ exact
- résultat attendu en fin de phase
- valeur livrée à l'utilisateur
- prérequis
- liste des outils mobilisés
- découpage en étapes courtes
- Definition of Done de phase
- checklist manuelle de validation
- stratégie de déploiement de fin de phase
- ressources externes utiles
- suggestions de commits
- liens vers guides internes et ADR si nécessaire

## Structure obligatoire d'une étape

Chaque étape doit contenir :

- titre clair orienté action
- objectif de l'étape
- pourquoi cette étape existe maintenant
- état de départ exact
- micro-étapes numérotées
- commandes exactes ou manipulations exactes
- résultat attendu après chaque bloc important
- au moins 1 exercice concret
- un bloc `details` `Solution - A consulter après 20 min` pour chaque exercice
- au moins 3 questions théoriques
- un bloc `details` de réponse attendue pour chaque question
- Definition of Done de l'étape
- checklist manuelle
- suggestion de commit si pertinente

Chaque micro-étape doit être rédigée comme une recette exécutable, pas comme une simple injonction.

Cela signifie qu'une micro-étape ne doit pas se limiter à `fais X`, `crée Y` ou `refactorise Z`.
Elle doit préciser, selon le besoin réel :

- où ouvrir le fichier ou le terminal
- dans quel dossier exact se placer
- quel fichier créer ou modifier
- quel code écrire, avec un snippet minimal utile
- quoi observer juste après l'action
- comment vérifier que l'action est réussie
- quelle correction tenter en cas d'échec probable

## Format minimal d'une micro-étape

Pour chaque micro-étape, écrire si nécessaire :

1. ouvre `tel terminal`
2. place-toi dans `tel dossier`
3. lance `telle commande`
4. tu dois voir `tel résultat`
5. si tu vois `telle erreur`, fais `telle correction`

Quand la micro-étape demande d'écrire ou modifier du code, ajouter aussi si nécessaire :

6. ouvre `tel fichier`
7. colle ou adapte `tel snippet minimal`
8. vérifie que `tel import`, `tel type` ou `tel test` compile
9. relance `telle commande` pour confirmer le résultat

## Exigences de progression

- une étape = un objectif simple
- un exercice = une seule compétence principale
- une phase ne doit pas empiler plusieurs gros concepts non reliés sans fil conducteur
- les exercices doivent suivre la chronologie réelle de construction du produit
- on ne présente pas une abstraction avant d'avoir montré le problème concret qu'elle résout

## Definition of Done

Chaque étape doit avoir au moins une preuve observable parmi :

- affichage visuel
- log console
- réponse HTTP visible
- test qui passe
- page accessible
- ressource créée dans le projet
- comportement manuel vérifiable

Chaque phase doit avoir une Definition of Done plus globale avec :

- fonctionnalité visible ou preuve technique claire
- tests minimaux exécutés
- checklist manuelle validée
- déploiement effectué si possible
- incrément cohérent et utilisable

## Déploiement

- on déploie à la fin de chaque phase
- la preuve de fin de phase n'est pas seulement locale : elle doit aussi être visible sur un environnement déployé
- le niveau de déploiement attendu dépend de la maturité réelle de la phase, mais il doit rester concret et exécutable
- chaque livraison doit laisser le produit dans un état utilisable
- une phase de setup ne repousse pas le déploiement "à plus tard" par défaut : elle se termine par un premier déploiement minimal cohérent
- pour chaque phase, le guide doit expliciter :
  - ce qu'on déploie exactement
  - sur quel environnement
  - quelles commandes ou actions lancer
  - quoi vérifier avant déploiement
  - quoi vérifier après déploiement
  - quelle preuve visible confirme que le déploiement est réussi
- chaque phase qui introduit ou modifie un endpoint backend doit vérifier que la configuration CORS couvre l'URL publique du frontend déployé, et pas seulement `localhost`
- la stratégie de déploiement de fin de phase doit être proportionnée :
  - phase 0 : premier déploiement minimal du squelette
  - phase 1 : redéploiement du premier flux métier visible
  - phase 2 : redéploiement de l'application après refactoring pour prouver que la livraison n'est pas cassée
  - phases suivantes : déploiement de l'incrément fonctionnel ou technique réellement produit

## Tests

Chaque étape doit préciser :

- tests manuels à faire
- tests automatisés à écrire ou lancer
- ce qu'on vérifie avant commit
- ce qu'on vérifie avant mise en prod

Chaque phase doit contenir :

- checklist de validation locale
- checklist avant déploiement
- checklist après déploiement

## Commits

- ajouter des suggestions de commits quand c'est pertinent
- format obligatoire : `type(contexte): description courte en français`
- les commits doivent suivre la progression réelle du travail
- ne pas proposer un commit qui mélange plusieurs objectifs pédagogiques différents

## ADR

- un ADR est introduit seulement lorsqu'une vraie décision structurante apparaît
- le guide explique pourquoi l'ADR est nécessaire à ce moment précis
- si c'est un exercice, il doit avoir sa correction complète en `details`
- si c'est un ADR de référence déjà fourni, on renvoie vers le guide interne

## Ressources externes

Chaque phase doit proposer :

- quelques ressources officielles prioritaires
- éventuellement 1 ou 2 ressources pédagogiques complémentaires
- une phrase expliquant pourquoi cette ressource aide maintenant

Et côté base ressources :

- toute ressource mentionnée dans une phase doit être ajoutée dans la base des ressources avec les bonnes propriétés

## Frontend et UI

- si l'UI minimale fonctionnelle est définissable, on l'écrit
- si elle ne l'est pas, on marque explicitement : `En attente des specs et maquettes frontend`
- on évite au maximum de laisser des trous si une interface simple et fonctionnelle peut être proposée

## Critères de qualité d'un bon guide

Un bon guide permet à la lectrice de répondre `oui` à tout ceci :

- je sais où commencer
- je sais quel terminal ouvrir
- je sais dans quel dossier me mettre
- je comprends pourquoi je fais cette étape
- je sais quoi taper
- je sais quoi vérifier
- je sais quand c'est terminé
- je peux continuer sans deviner

## Critères d'échec d'un guide

Le guide est mauvais si :

- il dit seulement `crée X` sans détailler comment
- il donne des listes de tâches au format "fais-ci / fais-ca" sans explication opératoire
- il suppose l'existence d'un repo ou d'un dossier sans le dire
- il saute directement à une commande sans préciser le contexte
- il demande un gros bloc d'implémentation d'un coup
- il pose des questions sans avoir enseigné le concept juste avant
- il n'y a pas de preuve observable de réussite
- il n'y a pas de solution détaillée
- il n'y a pas de DoD

## Prompt court à réutiliser

`Réécris cette phase comme un vrai guide pas-à-pas exécutable pour une développeuse frontend Vue.js qui débute en backend Java. Supprime tout implicite. L'environnement cible est Windows 11 + WSL2 Ubuntu, avec terminal WSL / Unix uniquement. Pour chaque étape, précise le contexte de départ, le terminal à ouvrir si nécessaire, le dossier exact, les commandes exactes, les résultats attendus, les erreurs fréquentes, un exercice concret, sa solution en details, 3 questions théoriques minimum avec réponses en details, une Definition of Done, une checklist manuelle, et une suggestion de commit si pertinente. Suis l'ordre réel de construction d'un produit web qui va en prod.`

## Plan de travail recommandé

1. auditer rapidement les thèmes du parcours pour vérifier qu'ils sont cohérents avant réécriture
2. réécrire complètement la phase demandée
3. valider la phase demandée
4. vérifier la cohérence inter-phases, ADR, ressources, DoD, déploiements
5. mettre à jour la base ressources et les pages annexes concernées
