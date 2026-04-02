On reprend le chantier du learning path KataSensei dans `/home/vbouvarel/work/learning-path`.

Ce fichier est un guide générique réutilisable pour toute phase.

Quand je te dis `travaille sur la phase X`, tu dois d'abord lire les fichiers de référence ci-dessous dans cet ordre, puis seulement ensuite commencer l'analyse de la phase.

## Ordre de lecture obligatoire

1. `docs/STEP_BY_STEP_GUIDE_SPEC.md`
2. `docs/TRAME.md`
3. `docs/LEARNING_PATH_SPECS.md`
4. `docs/LEARNING_PATH_EDITORIAL_RULES.md`
5. `docs/NEXT_PHASE.md`
6. `docs/PHASE_X.md` correspondant à la phase demandée
7. `site/phases/phase-X.html`
8. dans `content/`, les deux sources héritées correspondant à la phase demandée :
   - le dossier dont le nom commence par `Phase X`
   - le fichier `.md` dont le nom commence par `Phase X`
9. le ou les autres fichiers de contenu déjà existants utiles au scope réel de la phase, seulement s'ils sont explicitement pointés par `docs/PHASE_X.md`
10. le dernier audit disponible de cette phase s'il existe déjà
    - format attendu : `docs/audits/PHASE_X_AUDIT.md`

## Références stables

- la spec de rédaction à respecter strictement est `docs/STEP_BY_STEP_GUIDE_SPEC.md`
- la trame de phase à respecter est `docs/TRAME.md`
- le backlog inter-phases à relire avant toute nouvelle phase est `docs/NEXT_PHASE.md`
- les règles internes transverses sont dans `docs/LEARNING_PATH_SPECS.md`
- les règles éditoriales sont dans `docs/LEARNING_PATH_EDITORIAL_RULES.md`
- la page `site/phases/phase-0.html` sert de référence concrète de trame validée tant qu'une autre trame n'a pas été explicitement validée

## Environnement cible global

- OS cible : `Windows 11`
- environnement de travail à utiliser : `WSL2` avec la dernière version d'Ubuntu
- terminal de travail du learning path : terminal Ubuntu / Unix uniquement
- si une étape nécessite un terminal Windows au tout début, cela doit être dit explicitement
- ne jamais supposer `PowerShell` si ce n'est pas explicitement compatible

## Travail attendu pour toute phase

Quand tu travailles sur une phase, tu dois :

1. auditer rapidement mais sérieusement la phase actuelle
2. identifier ce qui est déjà correct, ce qui est implicite, ce qui est hors ordre réel et ce qui manque
3. relire `docs/NEXT_PHASE.md` pour récupérer les éléments hérités de la phase précédente qui doivent être intégrés
4. relire systématiquement les deux sources `content/` correspondant à la phase pour ne pas perdre le travail de réflexion déjà mené
5. tenir compte du périmètre réel déjà présent dans les contenus de référence liés à cette phase
6. proposer une structure cible complète avant toute édition
7. expliciter les grandes étapes et le livrable de fin de phase
8. rédiger un audit complet de la phase dans `docs/audits/PHASE_X_AUDIT.md` avant toute édition
9. attendre validation avant d'éditer
10. réécrire la phase depuis zéro
11. après réécriture, mettre à jour `docs/NEXT_PHASE.md` avec :
   - les reports repris dans la phase courante
   - les nouveaux reports à transmettre à la phase suivante

## Première réponse obligatoire

Quand l'utilisateur dit `travaille sur la phase X` :

- ta première réponse de travail doit être l'audit de cette phase
- cet audit doit être écrit dans `docs/audits/PHASE_X_AUDIT.md`
- cette première réponse ne doit pas être une proposition de patch, de lot de changements ou d'ajustements partiels
- tu ne dois pas proposer d'édition tant que cet audit n'a pas été produit puis validé

## Exigence de méthode

- quand je te demande de travailler sur une phase, tu dois repartir de zéro pour sa réécriture ; tu ne fais pas une simple retouche de l'existant
- l'audit sert à cadrer cette réécriture, pas à décider entre "ajuster" ou "réécrire"
- si `docs/audits/PHASE_X_AUDIT.md` n'existe pas encore, tu dois le créer avant toute autre proposition
- ne jamais enrichir superficiellement un résumé en le faisant passer pour un guide pas-à-pas
- raisonner comme si la phase devait être exécutée seule, sans aide humaine
- si une étape reste trop implicite, trop grosse ou trop abstraite, elle est ratée
- privilégier la précision opératoire et la progression réelle à la densité de concepts

## Sorties attendues pendant le travail

Avant édition :

- un diagnostic clair et sévère de la phase actuelle
- une structure cible complète
- les grandes étapes
- le livrable de fin de phase
- un audit archivé dans `docs/audits/PHASE_X_AUDIT.md`

Après édition :

- la phase réécrite
- la mise à jour de `docs/NEXT_PHASE.md`
- si nécessaire, la mise à jour du fichier `docs/PHASE_X.md`
- la mise à jour de `docs/audits/PHASE_X_AUDIT.md` si le cadrage a évolué pendant le travail
