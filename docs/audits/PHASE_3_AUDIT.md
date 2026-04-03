# PHASE 3 AUDIT

Document d'audit de cadrage avant réécriture complète de la phase 3.

## Diagnostic sévère

La phase 3 actuelle dans [phase-3.html](/home/vbouvarel/work/learning-path/public/phases/phase-3.html) ne correspond plus au périmètre validé du learning path.

Elle a été écrite pour un ancien découpage où la phase 3 portait sur l'auth JWT, SOLID, les Value Objects Java, la gestion d'erreurs et un grand refactoring backend. Ce périmètre n'est plus le bon. Le découpage validé est désormais :

- phase 2 = architecture front typée + flux de données + tests miroir
- phase 3 = `PrimeVue` + composants UI métier + `Stylelint` + `LogService`

En l'état, cette phase n'est pas "à améliorer". Elle doit être réécrite depuis zéro.

### La phase actuelle est hors sujet par rapport au découpage acté

Le contenu public traite massivement :

- Spring Security
- JWT
- SOLID côté backend
- Value Objects Java
- Bean Validation avancée
- refactoring backend de phase 1
- ADR sur les décisions d'auth

Ce socle est incompatible avec le périmètre désormais fixé pour la phase 3. La page actuelle enseigne donc la mauvaise phase.

### La continuité pédagogique avec la nouvelle phase 2 est cassée

La nouvelle phase 2 a été réécrite autour du socle hexagonal front typé, du flux de données et de la structure miroir des tests. La phase 3 devrait logiquement repartir de cet état de départ et prolonger ce travail côté UI et qualité front.

Or la page actuelle repart vers un chantier backend lourd, sans lien direct avec :

- l'installation de `PrimeVue`
- la fabrication des premiers composants UI métier
- l'encadrement CSS avec `Stylelint`
- l'introduction de `LogService` comme port sortant front

Le fil conducteur réel du parcours est donc rompu.

### La structure globale ne respecte pas la trame validée de phase

Par comparaison avec [phase-1.html](/home/vbouvarel/work/learning-path/public/phases/phase-1.html), la phase 3 actuelle ne présente pas proprement :

- l'état de départ exact
- le résultat attendu en fin de phase
- la valeur livrée à l'utilisateur
- les prérequis
- les outils mobilisés
- une Definition of Done de phase structurée
- une vraie stratégie de déploiement de fin de phase
- une liste de ressources externes utiles intégrée au bon endroit

La page ressemble à un guide d'exercices ancien format, pas à une phase réécrite selon la trame désormais validée.

### Les étapes sont encore trop proches d'un ancien format "exercices" et pas assez d'un vrai pas-à-pas opératoire

Certaines portions contiennent des exercices et des solutions, mais elles ne remplissent pas le niveau d'explicitation demandé par la spec actuelle :

- le terminal à ouvrir n'est presque jamais précisé
- le dossier exact de départ n'est pas cadré
- les résultats attendus ne sont pas donnés de façon systématique après chaque bloc important
- les erreurs fréquentes sont absentes de nombreuses sections
- les Definition of Done d'étape ne sont pas uniformes
- les checklists manuelles ne sont pas systématiques étape par étape

Le ton général reste pédagogique, mais pas assez exécutable pour une lectrice seule.

### La phase actuelle ne se termine pas par la bonne preuve de fin de phase

La règle globale du parcours est claire : chaque phase se termine par validation locale puis déploiement réel adapté.

La phase 3 actuelle ne cadre pas une fin de phase cohérente avec un incrément UI/front. Elle ne montre pas :

- ce qui est déployé exactement
- sur quel environnement
- quelles vérifications locales lancer avant déploiement
- quelle preuve visible côté interface confirme que le déploiement est réussi

Même indépendamment du mauvais périmètre, la fin de phase est donc incomplète.

### Le contenu public expose encore des traces d'une ancienne organisation conceptuelle

Le sommaire, le titre, les exercices et le livrable technique reflètent une ancienne conception du parcours. Ce n'est pas une simple question de wording : toute la promesse pédagogique de la page est obsolète.

Le risque est élevé de créer une incohérence majeure pour l'apprenante :

- la phase 2 l'amène vers un refactoring front typé
- la phase 3 actuelle la bascule soudain vers un gros chantier backend sécurité
- les reports validés dans [NEXT_PHASE.md](/home/vbouvarel/work/learning-path/docs/NEXT_PHASE.md) ne sont pas repris

## Conclusion

La phase 3 actuelle doit être entièrement réécrite depuis zéro.

Il ne faut pas :

- retoucher quelques titres
- remplacer seulement certains exercices
- tenter de "recycler" le contenu JWT/SOLID actuel

Le bon travail consiste à reconstruire une vraie phase 3 cohérente avec le nouveau découpage du parcours et la trame validée par [phase-1.html](/home/vbouvarel/work/learning-path/public/phases/phase-1.html).

## État de départ réel recommandé pour la future phase 3

La phase 3 réécrite doit partir d'un état explicite et stable :

- la phase 2 est terminée
- l'architecture front typée existe déjà
- le flux de données est branché
- la structure miroir des tests front est déjà posée
- l'application fonctionne déjà localement et sur son environnement déployé précédent
- l'UI reste encore rudimentaire ou hétérogène
- les logs front sont encore épars ou couplés à l'implémentation
- la qualité CSS n'est pas encore cadrée par un outil dédié

Cet état de départ doit être écrit noir sur blanc dans la page publique.

## Structure cible proposée

Je recommande une phase 3 reconstruite autour d'un seul fil conducteur : transformer le socle front typé de la phase 2 en une interface métier plus fiable, plus homogène et plus maintenable, sans casser l'architecture posée.

### Bloc de cadrage de phase

La page doit ouvrir avec :

- objectif de phase
- état de départ exact
- résultat attendu en fin de phase
- valeur livrée à l'utilisateur
- prérequis
- outils mobilisés

### Étape 1 — Repartir de la phase 2 et vérifier le point de départ UI

Objectif :

- redémarrer proprement le projet
- vérifier que le flux front issu de la phase 2 fonctionne toujours
- identifier les zones d'interface à remplacer ou consolider

Cette étape doit servir de sas de reprise et de contrôle avant toute nouvelle brique UI.

### Étape 2 — Installer `PrimeVue` proprement dans le projet

Objectif :

- poser la dépendance
- comprendre ce que l'outil génère réellement
- configurer proprement son intégration dans le frontend existant

Cette étape doit montrer :

- où lancer les commandes
- quoi générer
- quoi relire
- quels fichiers ne pas modifier au hasard

### Étape 3 — Poser les conventions d'usage de `PrimeVue` dans KataSensei

Objectif :

- éviter un usage "catalogue de composants" sans règle
- cadrer la frontière entre composant généré, composant de base et composant métier

La phase doit enseigner explicitement :

- quand utiliser directement un composant `PrimeVue`
- quand créer un wrapper local
- quand créer un vrai composant métier KataSensei

### Étape 4 — Construire les premiers composants UI métier réels

Objectif :

- remplacer l'UI rudimentaire de la phase 2 par des composants visibles et utiles
- brancher ces composants sur les types et flux déjà en place

Cette étape devrait introduire des composants concrets du domaine, par exemple selon l'état réel de l'application :

- carte de kata
- état de chargement
- état vide
- bannière ou bloc d'erreur métier
- zone de filtre ou d'action simple si le flux le justifie

Le choix exact devra rester cohérent avec l'UI réellement existante à la fin de la phase 2, mais la logique de phase doit rester claire : composants métier réels, pas galerie abstraite.

### Étape 5 — Introduire `LogService` comme port sortant front

Objectif :

- arrêter les `console.log` dispersés
- introduire un second port sortant front après `KataRepository`
- conserver la lisibilité de l'architecture hexagonale côté frontend

La phase doit montrer :

- où définir le port
- où fournir son implémentation
- quels appels le consomment
- comment le tester ou le doubler

### Étape 6 — Encadrer le CSS avec `Stylelint`

Objectif :

- fiabiliser la couche de style au moment où les composants UI se multiplient
- faire respecter les conventions du projet sans déplacer ces règles dans une future phase

Cette étape doit inclure :

- installation
- configuration minimale utile
- scripts de vérification
- exemples d'erreurs détectées
- place de l'outil dans la routine locale avant commit

### Étape 7 — Vérifier l'intégration complète et préparer le redéploiement

Objectif :

- valider l'incrément UI en local
- prouver que le redéploiement ne casse pas le flux existant
- obtenir une preuve visible sur environnement public

Cette étape doit se conclure par :

- validation locale
- redéploiement réel adapté
- preuve visuelle de l'UI mise à jour

## Livrable de fin de phase

À la fin de la phase 3, l'apprenante doit pouvoir montrer :

- une interface frontend plus propre et plus cohérente visuellement
- des composants UI métier réutilisables basés sur `PrimeVue`
- une gestion des logs front passée par `LogService`
- une vérification `Stylelint` intégrée au flux local
- des tests front ciblés toujours verts
- un redéploiement réussi de l'application avec preuve visuelle du nouvel incrément UI

## Grandes étapes proposées

### 1. Vérifier l'état réel hérité de la phase 2

Livrable :

- application relancée localement
- comportement UI existant vérifié
- point de départ compris

### 2. Installer et initialiser `PrimeVue`

Livrable :

- dépendances installées
- configuration générée
- premier composant de base fonctionnel

### 3. Définir la stratégie locale de composition UI

Livrable :

- règles claires entre primitives, wrappers et composants métier
- architecture de dossiers UI compréhensible

### 4. Réécrire les premières zones d'interface avec des composants métier

Livrable :

- écran réellement amélioré
- composants réutilisables branchés sur les types existants
- états de chargement, vide et erreur traités proprement

### 5. Introduire `LogService`

Livrable :

- port sortant front explicite
- implémentation concrète reliée au runtime
- appels dispersés remplacés

### 6. Installer `Stylelint` et l'intégrer au flux local

Livrable :

- configuration opérationnelle
- commandes de vérification connues
- premier passage vert

### 7. Valider localement puis redéployer

Livrable :

- checklists locales passées
- application redéployée
- preuve publique observable

## Éléments à retirer, déplacer ou reporter

### À retirer complètement de la phase 3 publique

- tout le contenu sur JWT
- tout le contenu sur Spring Security
- tout le contenu sur SOLID appliqué au backend
- tout le contenu sur les Value Objects Java
- tout le contenu sur Bean Validation avancée
- tout le grand refactoring backend hérité de la phase 1
- l'ADR sur les décisions d'auth et de Value Objects

Ces sujets ne sont pas des "à réduire". Ils doivent sortir entièrement de cette phase.

### À réintégrer explicitement depuis `NEXT_PHASE.md`

- installation de `PrimeVue`
- cadrage d'usage de `PrimeVue`
- premiers composants Vue métier
- configuration détaillée de `Stylelint`
- introduction de `LogService` comme port sortant front

### À décider avec soin avant la réécriture

- quels composants métier précis servent de support pédagogique principal
- quel niveau de détail donner à l'organisation des dossiers UI
- quelle preuve déployée est la plus observable en fin de phase

## Position pédagogique recommandée

La future phase 3 doit être clairement une phase d'industrialisation UI du frontend déjà architecturé.

Le bon angle pédagogique n'est pas :

- "découvrir une librairie de composants"
- "faire un peu de design system abstrait"
- "ajouter du lint CSS pour la forme"

Le bon angle est :

- partir d'un frontend déjà structuré mais encore brut
- rendre cette interface réellement plus exploitable pour l'utilisateur
- montrer comment préserver l'architecture front tout en ajoutant des briques UI concrètes
- introduire l'outillage qualité exactement au moment où il devient utile

La valeur perçue par l'apprenante doit être immédiate : elle voit l'interface progresser sans perdre la rigueur posée à la phase précédente.

## Structure interne attendue des étapes de la phase réécrite

Chaque étape devra reprendre strictement le squelette validé :

- titre orienté action
- objectif
- pourquoi cette étape existe maintenant
- état de départ exact
- micro-étapes numérotées
- terminal à ouvrir si nécessaire
- dossier exact
- commandes ou manipulations exactes
- snippets minimaux utiles
- résultat attendu
- erreurs fréquentes
- au moins un exercice concret
- un bloc `details` `Solution - A consulter après 20 min`
- au moins 3 questions théoriques
- un bloc `details` de réponse pour chaque question
- Definition of Done de l'étape
- checklist manuelle
- bloc `Commit` si pertinent

## Recommandation complémentaire côté interne

Après validation de cet audit puis réécriture de la phase publique, il faudra aussi :

- mettre à jour [NEXT_PHASE.md](/home/vbouvarel/work/learning-path/docs/NEXT_PHASE.md) pour marquer les reports 7, 8 et 9 comme `traité` s'ils sont bien repris et ajouter tout le contenu de la phase 3 ancienne version qui sera finalement reporté sous formes de reports ciblés
- supprimer des specs internes toute dépendance aux fichiers `docs/PHASE_X.md`, puisqu'ils ne font plus partie du workflow retenu
