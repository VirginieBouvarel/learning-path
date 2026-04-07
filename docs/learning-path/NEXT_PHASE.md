# NEXT PHASE

Ce fichier sert de backlog éditorial entre deux phases.

Règles :

- tout sujet volontairement retiré, allégé ou reporté d'une phase doit être noté ici
- ce fichier doit être relu avant de concevoir la phase suivante
- quand un sujet est traité dans une phase, il est supprimé de ce fichier
- le but n'est pas de lister des idées vagues, mais des reports pédagogiques concrets

## Reports en attente

### Report 10

- statut : `à traiter`
- phase d'origine : phase 2
- phase cible : phase 4
- élément retiré ou allégé : configuration détaillée de `Checkstyle`
- raison du report : le nouveau découpage rend la phase 2 très front et la phase 3 centrée sur l'UI Vue ; `Checkstyle` relève d'un cadrage qualité Java à replacer dans une phase plus cohérente avec le travail backend ou fullstack concerné
- forme attendue : étape dédiée ou guide annexe au moment où les conventions qualité backend apportent une valeur immédiate au flux de travail

### Report 11

- statut : `à traiter`
- phase d'origine : ancienne phase 3
- phase cible : phase 5
- élément retiré ou allégé : Spring Security, JWT et premiers endpoints d'authentification
- raison du report : le nouveau découpage fait de la phase 3 une phase strictement centrée sur l'UI métier du catalogue, la journalisation front et la qualité CSS ; l'authentification doit être reprise plus tard dans une phase dédiée à un vrai flux utilisateur sécurisé
- forme attendue : étape complète ou sous-ensemble cohérent de phase orienté compte utilisateur, accès protégé et contrat d'authentification

### Report 12

- statut : `à traiter`
- phase d'origine : ancienne phase 3
- phase cible : phase 4
- élément retiré ou allégé : rappel détaillé des principes SOLID appliqués au backend
- raison du report : le nouveau découpage de la phase 3 n'a plus de chantier backend ; ce contenu doit être repris à un moment cohérent avec le cadrage qualité et architecture backend/fullstack
- forme attendue : exercice ciblé, ADR ou étape intégrée à une phase de qualité architecturale

### Report 13

- statut : `à traiter`
- phase d'origine : ancienne phase 3
- phase cible : phase 5
- élément retiré ou allégé : Value Objects Java et hiérarchie d'erreurs backend associée
- raison du report : ces sujets restent utiles, mais ne relèvent plus du chantier UI/front désormais attribué à la phase 3
- forme attendue : étape complète ou séquence pédagogique cohérente dans une future phase backend ou fullstack

### Report 14

- statut : `à traiter`
- phase d'origine : ancienne phase 3
- phase cible : phase 5
- élément retiré ou allégé : Bean Validation avancée côté backend
- raison du report : la validation backend n'apporte pas de valeur pédagogique immédiate dans la phase 3 réécrite, qui reste volontairement centrée sur le frontend
- forme attendue : étape complète lors de la reprise d'un flux backend ou fullstack nécessitant une validation plus riche
