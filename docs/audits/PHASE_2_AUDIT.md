# PHASE 2 AUDIT

Document d'audit de cadrage avant réécriture complète de la phase 2.

## Références relues

Références obligatoires relues dans l'ordre demandé par `docs/PROMPT.md` :

- `docs/STEP_BY_STEP_GUIDE_SPEC.md`
- `docs/TRAME.md`
- `docs/LEARNING_PATH_SPECS.md`
- `docs/LEARNING_PATH_EDITORIAL_RULES.md`
- `docs/NEXT_PHASE.md`
- `docs/PHASE_2.md` : fichier absent à ce jour
- `public/phases/phase-2.html`
- `content/KataSensei — Learning Path/Phase 2 — Typage fort TS + LogService + useAsync +.md`
- `content/KataSensei — Learning Path/Phase 2 — Typage fort TS + LogService + useAsync +/Guide pas-à-pas — Phase 2 (avec exercices).md`
- dernier audit disponible pour cette phase : aucun

## Diagnostic sévère

La phase 2 actuelle contient de bonnes intuitions techniques, mais elle ne respecte pas la spec de rédaction attendue pour un vrai guide pas-à-pas exécutable. En l'état, elle ressemble davantage à un programme de refactoring ambitieux qu'à une phase faisable seule, dans le bon ordre, par la lectrice cible.

### Le cadrage de départ est insuffisant

La phase n'explicite pas assez la situation exacte au début de la phase :

- on ne sait pas clairement quel état du repo de phase 1 est supposé acquis
- on ne sait pas quels écrans existent déjà, quels endpoints backend sont disponibles, ni quelles branches fonctionnent réellement
- on ne sait pas quels outils doivent être installés ou déjà configurés avant de commencer
- on ne sait pas quels tests et commandes sont déjà disponibles ni depuis quel dossier les lancer

Le guide part trop vite dans les patterns TypeScript alors que la lectrice a besoin d'un point de départ concret et vérifiable.

### L'ordre pédagogique est trop dense et trop abstrait

La phase empile dans un même flux :

- branded types
- discriminated unions
- Result pattern
- AppError
- type guards
- routes typées
- port de logs
- adapters de logging
- mappers
- repository
- use cases
- stores
- composables headless
- composables UI
- composants UI
- refactoring de vue
- rappel ADR

Le fond est pertinent, mais la densité conceptuelle est trop forte pour une seule phase de 10h si chaque sujet doit être compris, codé, testé et relié au produit réel. Plusieurs étapes demandent en réalité un travail important tout en restant décrites comme des exercices courts.

### Les étapes ne sont pas des pas-à-pas exécutables

La plupart des étapes donnent une destination, mais pas le chemin opératoire complet. Il manque très souvent :

- le terminal à ouvrir
- le dossier exact
- l'ordre précis des micro-actions
- les commandes exactes à exécuter
- le résultat attendu après chaque bloc important
- les erreurs fréquentes réellement probables à ce moment précis
- la preuve observable de réussite à la fin de l'étape

On voit bien quoi construire, mais pas suffisamment comment le construire sans devinette.

### La structure obligatoire des étapes n'est pas respectée

La spec impose pour chaque étape :

- objectif
- pourquoi maintenant
- état de départ exact
- micro-étapes numérotées
- commandes exactes ou manipulations exactes
- résultat attendu
- erreurs fréquentes
- exercice concret
- solution en `details`
- au moins 3 questions théoriques avec réponses en `details`
- Definition of Done
- checklist manuelle
- bloc commit si pertinent

La phase actuelle n'atteint pas ce niveau de structure. Plusieurs étapes ont des exercices et des questions, mais sans vrai contexte d'exécution, sans DoD d'étape, sans checklist manuelle, et sans progression micro-découpée.

### La phase ne contient pas le cadrage global obligatoire

Il manque ou reste implicite :

- l'objectif de phase formulé comme transformation produit observable
- l'état de départ exact
- le résultat attendu en fin de phase
- la valeur livrée à l'utilisateur
- les prérequis
- la liste des outils mobilisés
- une Definition of Done de phase explicite
- une stratégie de déploiement de fin de phase
- une checklist avant déploiement
- une checklist après déploiement

La présence d'une checklist finale ne suffit pas à remplir cette trame.

### Le lien avec le produit réel reste trop faible

La phase parle beaucoup de structure de code et de pureté architecturale, mais pas assez du bénéfice utilisateur concret livré en fin de phase. Or la spec impose une incrémentation cohérente et testable du produit.

Le bon fil rouge n'est pas "introduire des patterns TS", mais plutôt :

- rendre le front KataSensei plus sûr face aux erreurs de données
- rendre le chargement de la liste de katas plus robuste
- préparer la suite du produit avec une base front testable et évolutive

Le guide actuel laisse parfois croire que l'architecture est une fin en soi.

### Les commandes et preuves de tests sont insuffisamment contextualisées

La phase mentionne `npm run type-check`, `npm run test:unit`, Vitest, `createPinia()` et parfois l'introduction future d'une bibliothèque de composants comme `PrimeVue`, mais sans préciser :

- depuis quel dossier lancer ces commandes
- ce qui doit déjà exister pour qu'elles passent
- quoi faire si elles échouent
- quels fichiers de tests créer exactement et dans quel ordre
- quels tests sont à écrire avant l'implémentation et lesquels sont seulement à lancer

Pour une lectrice autonome, c'est trop implicite.

### Le périmètre UI introduit un mélange pédagogique prématuré

L'étape 11 introduit déjà le sujet de la bibliothèque de composants alors que la phase 2 doit d'abord rester centrée sur le flux de données, les types, les mappers, les use cases, le store et la vue refactorisée. Même avec une décision `PrimeVue` déjà tranchée, cet ajout reste trop tôt à ce stade du parcours.

Le bon choix est donc de retirer ce sujet de la phase 2 et de le traiter explicitement dans la phase 3, là où le chantier UI devient enfin le coeur du livrable.

### Le report inter-phases n'est pas réintégré explicitement

`docs/NEXT_PHASE.md` contient pour la phase 2 le report suivant :

- configuration détaillée de Checkstyle
- configuration détaillée de Stylelint
- structuration miroir complète de `tests/`

La phase actuelle n'intègre ce report que très partiellement. Elle parle de tests, mais ne traite pas vraiment la structuration miroir de `tests/`, ni le cadrage précis de Checkstyle / Stylelint. Ce manque crée une rupture de continuité avec le backlog éditorial.

### La cohérence terminologique n'est pas totalement stabilisée

Les sources héritées et la page actuelle mélangent plusieurs vocabulaires :

- anglais dans l'archive Notion (`title`, `description`, `difficulty`, `SessionState`, `canRequestHint`)
- français dans la page HTML actuelle (`titre`, `consigne`, `niveau`, `TentativeState`, `canRequestIndice`)

La page actuelle est plus cohérente avec `ADR 001`, mais l'audit doit verrouiller ce choix : la phase réécrite doit rester strictement alignée sur le vocabulaire métier en français et ne pas réintroduire des termes anglais côté domaine.

### L'absence de `docs/PHASE_2.md` est un trou de cadrage

Le workflow demandé par `docs/PROMPT.md` suppose l'existence d'un `docs/PHASE_2.md`. Son absence n'empêche pas l'audit, mais elle prive la phase d'un document de cadrage amont potentiellement important. La réécriture devra soit s'appuyer sur un nouveau `docs/PHASE_2.md`, soit rendre totalement explicite le cadrage dans l'audit puis dans la page.

## Ce qui est déjà correct ou prometteur

Il faut garder plusieurs acquis de l'existant :

- la volonté de partir d'un refactoring réel du front de phase 1
- la séparation `domain / infrastructure / stores / ui`, pédagogique et cohérente
- l'introduction des mappers comme Anti-Corruption Layer
- l'idée de use cases purs testables sans Vue ni Pinia
- la distinction utile entre composables headless et composables UI
- l'usage d'un `Result` et d'erreurs typées au lieu de `throw` diffus
- la recherche d'exhaustivité avec unions discriminées et `never`
- la centralisation du chargement via store + composables UI
- l'accent mis sur TDD pour les éléments réellement purs

Le problème n'est donc pas le fond principal. Le problème est la forme pédagogique et l'ordre d'exécution.

## Conclusion

En l'état, la phase 2 ne doit pas être retouchée marginalement. Elle doit être réécrite depuis zéro.

La future version devra conserver le cap architectural, mais le transformer en guide opératoire beaucoup plus concret, plus progressif, plus centré sur un incrément produit observable, et plus rigoureusement aligné sur la trame obligatoire.

## Position pédagogique recommandée

La phase 2 doit être traitée comme la phase de solidification du front, pas comme une encyclopédie de patterns TypeScript.

La bonne promesse pédagogique est :

- partir d'un front phase 1 qui fonctionne mais reste fragile
- identifier précisément les douleurs réelles du code actuel
- sécuriser les données qui entrent dans le front
- structurer l'accès aux données avec port, adapter et mapper
- isoler la logique testable dans des use cases purs
- garder Pinia comme source de vérité UI
- finir avec une liste de katas réellement refactorisée, plus robuste, testée et toujours visible

Autrement dit : la phase doit apprendre à construire une architecture front utile parce qu'elle résout un problème concret, pas parce qu'elle coche des patterns.

## Livrable de fin de phase recommandé

À la fin de la phase 2, la lectrice doit pouvoir montrer :

- une page de liste de katas qui fonctionne toujours côté utilisateur
- un chargement de données branché via repository + mapper + use case + store
- des types métier explicites côté front pour les identifiants, états async et erreurs applicatives
- un composable UI qui orchestre la vue sans faire de `fetch` direct
- une ou plusieurs vues refactorisées sans logique réseau inline
- des tests ciblés qui passent sur les éléments réellement purs et sur le store
- un `type-check` vert
- une structure de code front plus stable pour les phases suivantes

La valeur livrée à l'utilisateur reste indirecte mais réelle : une interface existante plus fiable, plus maintenable et prête pour des fonctionnalités plus riches dans la suite du parcours.

## Structure cible proposée

Je recommande une phase reconstruite autour d'un seul fil rouge : refactoriser le chargement et l'affichage des katas du front de phase 1 jusqu'à obtenir une architecture front hexagonale minimale, testée et compréhensible.

### Bloc de cadrage de phase

La page doit ouvrir avec :

- objectif de phase
- état de départ exact
- résultat attendu en fin de phase
- valeur livrée à l'utilisateur
- prérequis
- outils mobilisés

### Étape 1 — Auditer le front hérité de la phase 1

Objectif :

- partir de l'existant réel et repérer les points fragiles dans le chargement de la liste de katas

Contenu attendu :

- où regarder dans le front
- quels symptômes relever
- quoi noter avant refactoring
- première preuve observable de la dette actuelle

### Étape 2 — Stabiliser le vocabulaire métier et la structure des dossiers front

Objectif :

- poser le cadre avant d'introduire des types avancés

Contenu attendu :

- structure cible des dossiers
- rappel explicite d'`ADR 001`
- noms des types et objets métier en francais
- choix de ce qui relève du domaine, de l'infrastructure, des stores et de l'UI

### Étape 3 — Introduire les types métier de base

Objectif :

- sécuriser les identifiants, l'état async et les erreurs applicatives

Contenu attendu :

- branded types
- unions discriminées
- `Result`
- `AppError`
- type guards seulement au point où ils résolvent un vrai besoin

Cette étape doit être découpée plus finement qu'aujourd'hui. Elle ne doit pas ressembler à une liste de patterns isolés.

### Étape 4 — Introduire l'Anti-Corruption Layer côté API

Objectif :

- arrêter la contamination du domaine par le contrat HTTP

Contenu attendu :

- DTO API
- mapper pur
- tests ciblés du mapper
- explication claire de ce qui change si l'API évolue

### Étape 5 — Introduire le port repository et l'adapter HTTP

Objectif :

- déplacer l'accès réseau hors des composants et hors des vues

Contenu attendu :

- interface repository dans le domaine
- adapter HTTP en infrastructure
- mapping d'erreurs réseau vers `AppError`
- commandes et vérifications locales

### Étape 6 — Introduire un use case pur piloté par tests

Objectif :

- faire passer la récupération des katas par une logique métier explicite et testable

Contenu attendu :

- fake repository simple
- test avant implémentation
- use case pur
- vérification que Vue et Pinia ne sont plus nécessaires pour tester ce comportement

### Étape 7 — Refactoriser le store comme source de vérité

Objectif :

- centraliser l'état partagé sans y remettre l'accès HTTP ou le mapping

Contenu attendu :

- action de chargement via use case
- état d'erreur et de chargement cohérent
- tests du store
- articulation avec le composable UI

### Étape 8 — Introduire le composable UI et réécrire la vue réelle

Objectif :

- terminer le refactoring visible pour l'utilisateur

Contenu attendu :

- composable UI basé sur le store
- vue refactorisée
- suppression du `fetch` inline
- vérifications manuelles d'accessibilité et de rendu

### Étape 9 — Compléter l'outillage de qualité reporté depuis la phase 1

Objectif :

- reprendre explicitement les reports de `docs/NEXT_PHASE.md`

Contenu attendu :

- cadrage de la structure miroir de `tests/`
- intégration ou renvoi clair pour Checkstyle côté back si réellement pertinent dans cette phase
- intégration ou renvoi clair pour Stylelint côté front

Cette étape peut être légère, mais elle ne doit plus rester implicite.

### Clôture de phase

La phase doit se terminer par :

- Definition of Done de phase
- checklist manuelle locale
- checklist avant déploiement
- stratégie de déploiement de fin de phase
- checklist après déploiement si déploiement retenu
- ressources externes utiles

## Grandes étapes recommandées

### 1. Vérifier l'état réel hérité de la phase 1

Livrable :

- le front existant tourne
- la liste de katas actuelle est observable
- les points de douleur du code actuel sont identifiés

### 2. Poser la structure cible minimale du front

Livrable :

- arborescence claire
- vocabulaire métier stabilisé
- zones de responsabilité explicites

### 3. Sécuriser les données avec des types métier utiles

Livrable :

- IDs brandés
- état async modélisé
- erreurs applicatives typées
- premiers tests purs

### 4. Isoler le contrat API via DTO + mapper

Livrable :

- traduction centralisée entre API et domaine
- tests du mapper

### 5. Sortir l'accès HTTP des composants

Livrable :

- repository en domaine
- adapter HTTP en infrastructure
- erreurs réseau traitées de façon homogène

### 6. Introduire la logique métier testable

Livrable :

- use case pur exécuté et testé sans Vue

### 7. Rebrancher l'UI sur la nouvelle architecture

Livrable :

- store propre
- composable UI
- vue refactorisée
- comportement utilisateur inchangé ou amélioré

### 8. Refermer la phase avec qualité et continuité

Livrable :

- tests organisés
- type-check vert
- reports de `NEXT_PHASE` traités ou re-reportés explicitement

## Éléments à retirer, déplacer ou recadrer

### `PrimeVue`

À retirer de la phase 2 et à réserver à la phase 3. Même si `PrimeVue` est cohérent avec les conventions CSS du projet, l'introduire ici brouille le fil rouge principal de la phase.

### `LogService`

À recadrer fortement. Le sujet est utile, mais il peut alourdir artificiellement la phase s'il est traité comme un axe majeur en parallèle du refactoring repository / mapper / use case / store / vue. Deux options cohérentes :

- soit le garder comme mini-étape courte de port sortant simple
- soit le reporter à une phase ultérieure plus centrée sur l'observabilité

En l'état, il ne doit pas voler de place au coeur de phase.

### Routes typées

À garder seulement si elles servent réellement la vue refactorisée de phase 2. Sinon, sujet secondaire à reporter.

### Rappel ADR final

À intégrer plus naturellement dans les étapes concernées au lieu d'en faire une étape quasi autonome en fin de phase. Si une convention front doit être appliquée, elle doit apparaître là où l'on code réellement les composants ou la vue.

## Reports inter-phases à intégrer explicitement

`docs/NEXT_PHASE.md` demande une reprise explicite de :

- la structure miroir détaillée de `tests/`
- Stylelint
- Checkstyle

Recommandation :

- traiter réellement la structure miroir de `tests/` dans la phase 2, car elle est directement utile au refactoring front et aux tests des couches
- traiter Stylelint si le front de cette phase produit ou refactorise réellement des composants et du CSS
- ne reprendre Checkstyle ici que si la phase touche réellement le back ou les conventions fullstack de tests ; sinon documenter explicitement un nouveau report motivé vers la phase la plus pertinente

Le pire choix serait de laisser ces sujets flotter encore une fois de manière implicite.

## Structure interne attendue des étapes réécrites

Chaque étape de la future phase 2 devra suivre strictement ce squelette :

- objectif
- pourquoi cette étape existe maintenant
- état de départ exact
- micro-étapes numérotées
- terminal à ouvrir si nécessaire
- dossier exact
- commandes exactes
- résultat attendu
- erreurs fréquentes
- au moins un exercice concret
- un bloc `details` intitulé `Solution - A consulter après 20 min`
- au moins 3 questions théoriques
- un bloc `details` de réponse attendue pour chaque question
- Definition of Done
- checklist manuelle
- bloc commit si c'est un bon point d'arrêt

## Recommandation finale

La réécriture de la phase 2 doit viser une phase plus resserrée, plus opératoire et plus ancrée dans un cas réel : refactoriser le flux de chargement et d'affichage des katas du front existant.

Si un sujet ne renforce pas directement ce fil rouge, il doit être :

- réduit
- déplacé
- ou reporté explicitement

Le résultat attendu n'est pas une collection de patterns TypeScript, mais une architecture front compréhensible, testable, visible dans l'UI et réellement utilisable comme base de la suite du projet.

## Décisions de cadrage actées avant réécriture

### La phase 2 actuelle est découpée en deux phases distinctes

Décision actée :

- l'actuelle phase 2 est trop dense pour rester une seule phase détaillée cohérente
- elle sera découpée en une nouvelle phase 2 puis une nouvelle phase 3

Pourquoi :

- elle mélange aujourd'hui un refactoring architectural profond du front et un vrai chantier UI composant par composant
- ces deux sujets ne produisent pas le même type de valeur pédagogique ni le même type de livrable
- la nouvelle phase 2 doit rester centrée sur le flux de données, le typage fort, l'Anti-Corruption Layer, les ports, les use cases, le store et la réécriture de la vue de liste
- la nouvelle phase 3 portera le chantier composants Vue avec `PrimeVue`, l'intégration UI métier et les sujets de finition front reportés

### `PrimeVue` est désormais une décision validée du parcours

Décision actée :

- `PrimeVue` est validé
- il doit être installé et utilisé pour fabriquer les composants Vue.js du projet

Conséquence pédagogique :

- `PrimeVue` ne doit plus être traité comme un doute ou un point à retirer
- en revanche, son introduction doit être placée dans la nouvelle phase 3, là où la fabrication des composants UI devient le coeur du livrable

### La nouvelle phase 2 inclut la structure miroir de `tests/`

Décision actée :

- la structure miroir de `tests/` est incluse dans la nouvelle phase 2

Pourquoi :

- elle soutient directement le refactoring architectural du front
- elle rend les tests des types, mappers, use cases, stores et composables immédiatement plus lisibles
- c'est un report déjà attendu depuis les phases précédentes et il devient enfin naturel à ce moment du parcours

### `Stylelint` est reporté à la nouvelle phase 3

Décision actée :

- `Stylelint` n'est pas intégré à la nouvelle phase 2
- il est reporté à la nouvelle phase 3

Pourquoi :

- la nouvelle phase 2 est d'abord une phase de refactoring de flux de données et d'architecture front
- la nouvelle phase 3 sera le vrai moment d'installation et d'usage de composants Vue basés sur `PrimeVue`
- c'est donc en nouvelle phase 3 que la dette et les conventions CSS deviennent suffisamment concrètes pour justifier une étape dédiée `Stylelint`

### `LogService` n'est pas requis pour que la nouvelle phase 2 soit architecturalement complète

Décision actée :

- `LogService` est reporté à la nouvelle phase 3

Pourquoi :

- la nouvelle phase 2 dispose déjà d'un vrai port sortant côté front via `KataRepository`
- l'architecture hexagonale front n'est donc pas incomplète sans `LogService`
- ajouter `LogService` en nouvelle phase 2 alourdirait le coeur du refactoring principal
- il sera plus pédagogique de l'introduire juste après, en nouvelle phase 3, comme refactorisation d'éventuels logs épars dans l'UI et comme second exemple de port sortant front

### `Checkstyle` ne doit pas être forcé dans la nouvelle phase 2

Décision actée :

- `Checkstyle` n'est pas intégré à la nouvelle phase 2

Pourquoi :

- la nouvelle phase 2 est recentrée sur le front
- `Checkstyle` relève d'un cadrage qualité Java qui ne soutient pas directement le fil rouge de cette réécriture
- son traitement doit être replanifié dans une phase ultérieure plus cohérente avec le travail backend ou fullstack concerné

### La renumérotation globale peut rester progressive

Décision actée :

- il n'est pas nécessaire de renuméroter immédiatement toute la suite du parcours avant de réécrire la nouvelle phase 2

Pourquoi :

- le plus important maintenant est de stabiliser le nouveau découpage entre phase 2 et phase 3
- après réécriture de la nouvelle phase 2 puis de la nouvelle phase 3, la renumérotation des phases suivantes pourra être recalée proprement à partir des specs, du contenu réellement écrit et de `docs/NEXT_PHASE.md`
