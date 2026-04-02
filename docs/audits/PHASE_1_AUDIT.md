# PHASE 1 AUDIT

Document d'audit de cadrage avant réécriture de la phase 1.

## Diagnostic sévère

La phase 1 actuelle, dans `site/phases/phase-1.html`, contient déjà des intentions pédagogiques utiles, mais elle ne respecte pas encore le contrat d'une vraie phase détaillée exécutable seule.

### Elle a une bonne intuition de fond, mais pas un vrai point de départ opératoire

Le thème de phase est cohérent : passer du squelette fullstack minimal à un premier incrément métier avec HTTP, persistance, validation et erreurs structurées. En revanche, la page ne recadre pas assez explicitement la situation exacte au début de phase :

- dans quel repo on se trouve
- quels services issus de la phase 0 doivent déjà fonctionner
- quelle base locale existe ou n'existe pas encore
- quels ports sont utilisés
- quels outils doivent déjà être installés et testés
- ce qui a déjà été validé avant d'attaquer la phase

Pour une lectrice seule, cela crée encore de la devinette.

### La structure n'est pas celle d'une phase détaillée conforme à la spec

La page actuelle ressemble à un guide d'exercices enrichi, mais pas encore à une phase complète selon `docs/STEP_BY_STEP_GUIDE_SPEC.md` et `docs/TRAME.md`.

Il manque ou reste trop implicite :

- un bloc clair d'objectif de phase
- un état de départ exact
- un résultat attendu de fin de phase formulé concrètement
- la valeur utilisateur visible livrée en fin de phase
- les prérequis
- la liste explicite des outils mobilisés
- une Definition of Done de phase complète
- une checklist manuelle de validation de phase
- une stratégie de déploiement de fin de phase
- des ressources externes intégrées à la phase réécrite

### Les étapes ne sont pas suffisamment opératoires

Les étapes existantes donnent souvent les bons concepts et parfois des exemples de code utiles, mais elles ne détaillent pas assez l'exécution réelle.

Il manque fréquemment :

- le terminal exact à ouvrir
- le dossier exact de départ
- les commandes complètes à lancer
- le résultat attendu après chaque bloc significatif
- les erreurs fréquentes et leurs corrections
- la distinction entre test unitaire, test web, test d'intégration et vérification manuelle

Exemple typique : "écris un test", "crée la migration", "branche le service sur la DB", "affiche les katas côté Vue". Ce sont de bonnes intentions, mais encore trop grosses pour une lectrice backend débutante.

### La phase mélange trop vite plusieurs sujets lourds

La progression actuelle empile dans un même flux :

- TDD JUnit et MockMvc
- persistance PostgreSQL / JPA / Flyway
- validation Bean Validation
- hiérarchie d'exceptions métier
- Problem Details RFC 7807
- frontend Vue consommant l'API
- CSS scoped BEM
- ADR
- JaCoCo et CI

Ce contenu est pertinent pour la phase 1, mais le séquencement actuel reste trop dense. Il faut reconstruire un fil rouge plus net, centré sur un premier incrément métier observable, puis seulement ajouter l'outillage qualité et les décisions structurantes au bon moment.

### L'intention "naïve maintenant, architecture plus tard" est utile mais mal cadrée

Le positionnement pédagogique hérité des sources Notion est bon : accepter une implémentation volontairement simple pour ressentir la limite avant la phase d'architecture plus poussée. En revanche, la formulation actuelle est trompeuse ou contradictoire à plusieurs endroits :

- `docs/PHASE_1.md` parle d'un "premier incrément métier structuré"
- les sources legacy parlent parfois d'une logique très naïve, presque "tout dans le contrôleur"
- les reports hérités de la phase 0 imposent pourtant déjà des choix de qualité minimaux

La réécriture devra clarifier une ligne pédagogique simple :

- phase 1 = premier flux métier réel, encore simple
- pas d'hexagone complet ni de sur-architecture
- mais pas de code brouillon ou incohérent non plus
- on introduit seulement les abstractions que le besoin justifie réellement

### Les reports obligatoires de la phase 0 ne sont pas intégrés de façon satisfaisante

`docs/NEXT_PHASE.md` impose de reprendre explicitement plusieurs reports. Dans l'existant, ils sont présents de façon partielle ou mal placée.

#### Report 1 — ESLint, Prettier, Husky, conventions de commit

Le sujet n'est pas réellement traité comme une étape cohérente du premier incrément. Or la phase 1 est précisément le bon moment pour poser un outillage qualité minimal après la première preuve front/back.

#### Report 2 — Docker Compose, PostgreSQL, variables d'environnement backend

La persistance apparaît via JPA + Flyway, mais le cadrage environnemental manque. Le guide doit expliquer clairement comment démarrer PostgreSQL localement, où définir les variables, quoi vérifier et comment diagnostiquer un échec de connexion.

#### Report 3 — Checkstyle, Stylelint et structure miroir de `tests/`

Ce sujet n'est ni correctement intégré ni clairement reporté. Il faudra décider explicitement :

- soit l'introduire ici sous une forme minimale cohérente
- soit le repousser à une phase ultérieure avec justification écrite

#### Report 4 — pipeline GitLab CI/CD complet et premier déploiement Fly.io

L'étape actuelle sur JaCoCo CI ne suffit pas à traiter ce report. Il faut décider si la phase 1 inclut un premier déploiement cohérent du nouvel incrément, ou seulement une préparation au déploiement. L'ambiguïté doit disparaître.

#### Report 5 — ADR quand une vraie décision structurante apparaît

L'idée d'un ADR dans cette phase est bonne, mais elle doit partir d'une décision réelle. Il faut donc choisir précisément quelle décision mérite un ADR ici, et éviter l'ADR "décoratif".

### Le frontend est présent, mais son rôle reste sous-spécifié

La phase actuelle parle d'afficher les katas côté Vue, mais sans recadrer assez clairement :

- la page exacte concernée
- l'état initial du front issu de phase 0
- le contrat HTTP consommé
- les cas d'erreur à afficher
- les tests front attendus
- la valeur utilisateur visible obtenue

Le frontend doit être un vrai aboutissement de phase, pas une simple étape terminale de consommation d'API.

### La fin de phase n'est pas assez resserrée autour d'un livrable visible unique

Le bon livrable pressenti est : un premier catalogue de katas consultable, persisté en base, exposé via API et affiché côté front avec erreurs HTTP propres. Mais cette promesse n'est pas formulée assez clairement comme destination unique de la phase.

Sans ce recentrage, la phase dérive vers une accumulation de notions techniques.

## Conclusion

La phase 1 actuelle n'est pas à retoucher marginalement. Elle doit être réécrite depuis zéro.

Le fond utile existe déjà :

- le choix d'un premier flux métier autour des katas
- l'introduction de TDD
- la persistance locale
- la validation
- les erreurs structurées
- la première consommation front

Mais la forme actuelle ne satisfait pas la spec pas-à-pas ni le niveau de guidage attendu pour une développeuse frontend encore débutante en backend Java.

## Livrable de fin de phase recommandé

À la fin de la phase 1, la lectrice doit pouvoir montrer un premier incrément métier complet et observable :

- une base PostgreSQL locale démarrée proprement
- des variables d'environnement backend configurées
- une migration Flyway appliquée
- des katas persistés en base
- une API capable de :
  - lister les katas
  - créer un kata avec validation
  - consulter un kata par identifiant
- des erreurs HTTP renvoyées dans un format JSON homogène
- une page Vue qui affiche les katas et gère au moins un état de chargement ou d'erreur simple
- des tests ciblés backend et frontend qui couvrent l'incrément
- un outillage qualité minimal lancé avant commit

Valeur utilisateur visible : l'application cesse d'être une simple preuve technique front/back et devient un premier catalogue de katas consultable et enrichissable.

## Structure cible proposée

Je recommande une phase 1 reconstruite autour d'un fil rouge unique : "faire exister un premier catalogue de katas persisté, testable et visible côté front".

### Bloc de cadrage de phase

La phase réécrite devra ouvrir avec :

- objectif de phase
- état de départ exact hérité de la phase 0
- résultat attendu en fin de phase
- valeur livrée à l'utilisateur
- prérequis
- outils mobilisés

### Étape 1 — Repartir de la phase 0 et cadrer le premier flux métier

Objectif :

- vérifier l'état réel du repo
- relancer front et back
- confirmer le point de départ
- définir le premier besoin métier traité : "catalogue de katas"

### Étape 2 — Installer la persistance locale utile au besoin métier

Objectif :

- démarrer PostgreSQL localement
- configurer les variables d'environnement backend
- vérifier la connexion
- expliquer pourquoi la base arrive maintenant et pas en phase 0

Cette étape doit absorber explicitement le report 2.

### Étape 3 — Poser le schéma initial avec Flyway

Objectif :

- créer la première migration
- expliquer convention de versionnement
- lancer l'application
- vérifier que la table et les seeds existent

### Étape 4 — Écrire puis faire passer le premier flux de lecture `GET /katas`

Objectif :

- introduire TDD sur un cas simple
- distinguer clairement test web et test d'intégration
- exposer une liste de katas persistés

### Étape 5 — Ajouter la création `POST /katas` avec validation

Objectif :

- introduire Bean Validation au moment où un input utilisateur existe vraiment
- faire sentir l'intérêt de refuser une entrée invalide tôt

### Étape 6 — Ajouter `GET /katas/{id}` et la gestion d'erreurs homogène

Objectif :

- introduire `Optional`
- créer l'exception métier utile
- centraliser le mapping HTTP avec `@RestControllerAdvice`
- rendre le contrat d'erreur stable pour le front

### Étape 7 — Brancher le frontend Vue sur l'API des katas

Objectif :

- appeler l'API réelle
- afficher la liste
- montrer un état vide, chargement ou erreur minimal
- vérifier le contrat HTTP côté front

### Étape 8 — Ajouter l'outillage qualité minimal de phase 1

Objectif :

- traiter explicitement ESLint / Prettier / Husky / conventions de commit
- décider ce qui est réellement requis maintenant
- ne pas noyer la phase dans une suite d'outils déconnectés du flux métier

Cette étape doit absorber explicitement le report 1.

### Étape 9 — Formaliser la décision structurante utile et préparer la suite

Objectif :

- écrire un ADR seulement si une vraie décision le justifie
- fixer la posture "simple maintenant, architecture plus rigoureuse ensuite"
- préparer proprement la phase suivante

Cette étape doit absorber explicitement le report 5.

### Fin de phase

La phase réécrite devra se terminer par :

- Definition of Done de phase
- checklist manuelle de validation locale
- checklist avant déploiement
- stratégie de déploiement de fin de phase
- ressources externes utiles

## Grandes étapes pédagogiques recommandées

Le chemin pédagogique recommandé est le suivant :

1. repartir d'un état de départ observable et relançable
2. introduire la base seulement quand le premier besoin métier l'exige
3. exposer d'abord la lecture la plus simple
4. ajouter ensuite l'écriture et sa validation
5. traiter enfin les cas d'erreur et le contrat d'échec
6. brancher le frontend une fois le backend suffisamment stable
7. seulement après cela, poser l'outillage qualité minimal et la décision d'architecture réellement justifiée

Cet ordre respecte mieux la chronologie d'un vrai produit.

## Ce que je retirerais, déplacerais ou recadrerais

### À retirer de la structure principale actuelle

- l'étape autonome "comprendre TDD" si elle reste purement théorique
- l'étape "CSS BEM scoped" si elle n'est pas indispensable au livrable de phase
- la présence prématurée ou mal reliée de JaCoCo CI comme quasi-fin de phase

TDD doit être enseigné dans l'action, pas comme prologue presque indépendant du flux métier.

### À déplacer ou alléger

- JaCoCo peut rester en fin de phase seulement si rattaché à une vraie vérification de qualité avant commit ou CI
- Checkstyle, Stylelint et structure miroir détaillée de `tests/` doivent être soit intégrés sous forme minimale, soit reportés explicitement avec justification
- le premier déploiement ou la préparation CI/CD doit être recadré pour ne pas entrer en concurrence avec le livrable métier principal

### À renforcer

- cadrage PostgreSQL local
- variables d'environnement backend
- explication des ports, dossiers et terminaux
- critères de réussite après chaque bloc important
- frontend comme preuve visible de fin de phase

## Position pédagogique recommandée

Je recommande la position suivante :

- backend encore simple, sans hexagone complet
- qualité minimale réelle, pas cosmétique
- persistance introduite parce qu'elle résout un besoin concret
- erreurs structurées introduites parce que le front en dépend
- frontend utilisé comme preuve produit, pas comme simple consommateur de démo

La phrase directrice devrait être :

"En phase 1, on construit le premier vrai flux métier de KataSensei. On garde le design assez simple pour rester compréhensible, mais on introduit déjà les bases qui évitent le chaos : tests ciblés, persistance locale, validation des entrées, erreurs HTTP cohérentes et outillage qualité minimal."

## Décisions à trancher avant la réécriture

- le livrable exact côté front : simple liste seule, ou liste + création depuis l'UI
- le niveau exact d'introduction de Docker Compose en phase 1
- le statut de Checkstyle / Stylelint : introduits ici ou reportés
- la portée CI/CD : préparation, pipeline localement décrite, ou premier déploiement effectif
- le sujet précis d'ADR à écrire dans cette phase

## Structure interne attendue pour chaque étape

Chaque étape de la phase réécrite devra respecter strictement ce squelette :

- titre orienté action
- objectif
- pourquoi cette étape existe maintenant
- état de départ exact
- micro-étapes numérotées
- terminal à ouvrir si nécessaire
- dossier exact
- commandes exactes
- résultat attendu
- erreurs fréquentes et correction
- au moins un exercice concret
- un bloc `details` intitulé `Solution - A consulter après 20 min`
- au moins 3 questions théoriques
- un bloc `details` de réponse attendue pour chaque question
- Definition of Done de l'étape
- checklist manuelle
- bloc `Commit` si l'étape correspond à un vrai point de commit

## Recommandation finale

La phase 1 doit être réécrite comme la vraie naissance du premier usage de KataSensei, pas comme une suite de notions backend.

Le bon centre de gravité est :

- "un catalogue de katas persisté et visible"

et non :

- "une introduction large à Spring, JPA, erreurs, tests, CSS et CI en une seule phase"

C'est ce recentrage qui rendra la phase exécutable, cohérente et formatrice.

## Décisions de cadrage actées avant réécriture

### Décision 1 — Livrable front de la phase 1

Le livrable frontend retenu pour la phase 1 est une page Vue qui consomme l'API réelle des katas et affiche :

- la liste des katas
- un état de chargement simple
- un état vide simple
- un état d'erreur simple

La création de kata depuis l'interface utilisateur n'est pas retenue pour cette phase.
Elle resterait faisable techniquement, mais alourdirait trop la phase 1 par rapport à son objectif principal.

### Décision 2 — Portée Docker Compose et PostgreSQL

La phase 1 introduit PostgreSQL via `docker compose` dans un périmètre strictement local et minimal.

Le but est :

- démarrer une base locale utile au premier besoin métier réel
- configurer les variables d'environnement backend
- vérifier la connexion entre Spring Boot et PostgreSQL
- poser Flyway sur une base réellement utilisée

La phase 1 n'ouvre pas un chantier infra plus large que ce besoin précis.

### Décision 3 — Outillage qualité et conventions reportés à la phase 2

La décision retenue est de traiter en phase 1 uniquement l'outillage qualité minimal immédiatement utile au quotidien :

- ESLint
- Prettier
- Husky
- conventions de commit

Les éléments suivants sont explicitement reportés à la phase 2 :

- Checkstyle
- Stylelint
- structure miroir détaillée de `tests/`

Raison pédagogique :
ces éléments sont utiles, mais leur valeur sera plus lisible une fois que le projet aura davantage de code backend, de UI et de tests réels. Les introduire dès la phase 1 risquerait de diluer le premier incrément métier.

### Décision 4 — Portée CI/CD et déploiement

La phase 1 ne porte pas un premier déploiement complet.

La décision retenue est :

- préparation CI minimale cohérente avec le nouvel incrément
- exécution locale claire des checks et tests attendus avant commit
- éventuelle préparation du terrain pour la suite
- pas de déploiement complet si cela détourne la phase de son objectif principal

La priorité de la phase reste la construction d'un premier flux métier local complet et stable.

### Décision 5 — Sujet d'ADR de la phase 1

L'ADR retenu pour la phase 1 porte sur la standardisation des erreurs HTTP entre backend et frontend.

Cette décision est justifiée par le besoin réel introduit dans la phase :

- exposer des erreurs cohérentes côté API
- fournir au frontend un contrat d'erreur stable
- éviter des réponses hétérogènes ou implicites selon les cas d'échec

Cet ADR est donc considéré comme une vraie décision structurante, utile immédiatement, et non comme un exercice documentaire artificiel.
