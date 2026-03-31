# Comment utiliser Claude pendant le parcours

> Trois outils différents, trois usages différents. Comprendre lequel utiliser selon la situation évite de se battre contre ses outils.
> 

---

## Les trois façons d'utiliser Claude

### 1 — [Claude.ai](http://Claude.ai) (l'interface web)

**Ce que c'est** : le site [claude.ai](http://claude.ai) ou l'app mobile. Une conversation avec Claude, comme un chat.

**Ce qu'il peut faire** : répondre à des questions, expliquer des concepts, écrire dans ton Notion, générer du contenu, analyser du code que tu lui colles.

**Ce qu'il ne peut pas faire** : lire tes fichiers directement, voir ton projet, lancer des commandes.

**Quand l'utiliser pendant KataSensei** :

- Clarifier un concept avant de coder (`"c'est quoi la différence entre @WebMvcTest et @SpringBootTest"`)
- Débloquer un raisonnement (`"mon test passe mais je ne comprends pas pourquoi"`)
- Revue de code — tu colles un extrait, on en parle
- Mettre à jour le Notion
- Questions d'architecture (`"est-ce que je devrais mettre ça dans le domaine ou dans l'infra"`)

---

### 2 — Claude Code CLI (dans le terminal)

**Ce que c'est** : un agent qui tourne dans ton terminal, dans ton projet. Il lit tes fichiers, modifie du code, voit tes erreurs de compilation en temps réel.

**Installation** :

```bash
npm install -g @anthropic-ai/claude-code
```

Lance-le depuis le terminal intégré d'IntelliJ, à la racine de ton projet :

```bash
claude
```

**Ce qu'il peut faire** :

- Lire tout ton projet (`"lis mon KataController et dis-moi si SOLID est respecté"`)
- Modifier des fichiers directement
- Voir les erreurs Maven ou Vitest en temps réel
- Lancer des commandes (`mvn test`, `npm run lint`)
- Refactoring guidé sur plusieurs fichiers

**Quand l'utiliser pendant KataSensei** :

- Sessions de refactoring (phases 2, 3, 4)
- Debugging d'erreurs complexes — il voit le stack trace ET le code
- Vérification que SOLID est respecté dans un fichier existant
- Génération de boilerplate (migrations Flyway, tests JUnit)

**Exemple de session** :

```
toi : regarde mon GlobalExceptionHandler, est-ce qu'il gère bien tous les cas ?
claude code : [lit le fichier] Il manque le cas UnauthorizedException — voilà ce que j'ajouterais...
```

---

### 3 — Extension Claude dans IntelliJ

**Ce que c'est** : un plugin JetBrains qui intègre Claude dans l'éditeur.

**Installation** :

Settings → Plugins → Marketplace → cherche **Claude** → installe → connecte ton compte Anthropic.

**Ce qu'il peut faire** :

- Sélectionner du code → clic droit → Claude → Ask / Explain / Refactor
- Inline suggestions pendant que tu codes
- Questions rapides sans sortir de l'éditeur

**Quand l'utiliser pendant KataSensei** :

- `"Explique-moi ce que fait cette annotation @Transactional"`
- `"Refactore cette méthode pour qu'elle soit plus lisible"`
- `"Qu'est-ce que ce stack trace veut dire"`

---

## Tableau récapitulatif

| Situation | Outil recommandé |
| --- | --- |
| Comprendre un concept avant de coder | [Claude.ai](http://Claude.ai) |
| Question d'architecture | [Claude.ai](http://Claude.ai) |
| Revue de code (tu colles un extrait) | [Claude.ai](http://Claude.ai) |
| Mettre à jour le Notion | [Claude.ai](http://Claude.ai) |
| Debugging d'une erreur complexe | Claude Code CLI |
| Refactoring sur plusieurs fichiers | Claude Code CLI |
| Vérifier SOLID sur un fichier | Claude Code CLI |
| Question rapide pendant que tu codes | Extension IntelliJ |
| Comprendre une annotation Java | Extension IntelliJ |

---

## La règle des 20 minutes

Quelle que soit la situation et l'outil :

> **Essaie pendant 20 minutes. Si tu es toujours bloquée, alors demande.**
> 

Le blocage fait partie de l'apprentissage. Les 20 minutes où tu cherches activement ancrent la solution bien mieux que de l'avoir tout de suite. Mais passé ce seuil, continuer à se battre seule n'a plus de valeur pédagogique — c'est de la frustration inutile.

---

## Ce qu'on ne fait pas

- On ne demande pas la solution avant d'avoir essayé
- On n'ouvre pas le toggle de solution avant 20 min d'effort sincère
- On ne copie-colle pas du code sans l'avoir lu et compris ligne par ligne

Si tu colles du code que tu ne comprends pas dans ton projet, tu construis sur du sable. Le compilateur Java et TypeScript te le feront payer plus tard.