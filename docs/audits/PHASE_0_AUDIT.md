# PHASE 0 AUDIT

Document de diagnostic conservé comme référence de niveau d'analyse attendu avant réécriture.

Source conservée aussi dans `docs/REPONSE-PHASE-0.md`.

## Diagnostic sévère

La phase 0 actuelle, dans `site/phases/phase-0.html`, ne respecte pas la spec de rédaction sur les points structurants.

### Elle ne part pas de l’état réel de départ

Le guide suppose déjà beaucoup de choses implicites : dossier de travail, existence ou non d’un repo, installation préalable de Git, Node, Docker, IntelliJ, compte Fly.io, compte GitLab, choix du terminal. Pour une lectrice seule, le point de départ est flou.

### L’ordre de construction est incohérent pour une vraie exécution

On mélange setup local, structure front, qualité, base de données, stylelint, ADR, CI/CD, déploiement Fly.io et conventions de tests dans une seule séquence trop large. Certaines décisions arrivent avant la preuve minimale que le système tourne.

### Les étapes ne sont pas des vrais pas-à-pas

Beaucoup de sections sont des résumés ou des prescriptions, pas des guides exécutables. Exemple : “Créer le projet Spring Boot”, “Configurer ESLint”, “Déployer sur Fly.io”. Il manque presque partout :

- le terminal à ouvrir
- le dossier exact
- le résultat attendu après chaque sous-bloc
- les corrections en cas d’échec
- la preuve observable

### La phase est surchargée pour une phase 0

Checkstyle, Stylelint, GitLab CI/CD, Fly.io, ADR de lecture, structure de tests miroir : ce sont des sujets réels, mais empilés ici ils diluent l’objectif principal. La phase 0 doit d’abord prouver que l’environnement permet de faire tourner un front et un back minimaux, puis éventuellement préparer le terrain pour la suite.

### La fin de phase n’est pas construite autour d’un livrable observable unique

La checklist cite beaucoup de choses, mais le guide n’oriente pas clairement vers un “minimum running system” simple et vérifiable. Il faut un fil rouge plus net : créer l’espace de travail, initialiser le repo, lancer le front, lancer le back, exposer un health check, afficher un appel front vers back, puis éventuellement préparer le déploiement.

### La compatibilité environnement cible est parfois mauvaise

Il y a des commandes et hypothèses non alignées avec `Windows 11 + WSL2 Ubuntu + terminal Unix uniquement`. Exemple : référence à `brew install flyctl`, conflit Homebrew, ce qui n’a rien à faire dans ce cadre principal.

### La structure obligatoire des étapes n’est pas respectée

Les sections actuelles n’ont pas systématiquement :

- objectif
- pourquoi maintenant
- état de départ exact
- exercice
- solution en `details`
- 3 questions théoriques minimum avec réponses en `details`
- DoD d’étape
- checklist manuelle

## Conclusion

En l’état, ce n’est pas une base à “améliorer”. Il faut repartir de zéro sur la logique d’exécution de la phase.

## Structure cible proposée

Je propose une phase 0 reconstruite autour d’un objectif unique : partir d’un poste Windows 11 + WSL2 Ubuntu sans repo projet prêt, et finir avec un monorepo initial où :

- le front minimal s’affiche en local
- le back minimal répond
- un health check est observable
- le front récupère une valeur du back
- la base de travail est prête pour la phase 1
- la préparation au déploiement existe déjà, sans surcharger la phase
