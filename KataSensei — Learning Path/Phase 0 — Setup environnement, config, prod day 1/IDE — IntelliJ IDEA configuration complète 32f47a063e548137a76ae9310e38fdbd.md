# IDE — IntelliJ IDEA configuration complète

> On travaille exclusivement avec **IntelliJ IDEA Ultimate**. Il gère Java et Vue/TypeScript nativement dans un seul IDE — pas de switch entre éditeurs, pas de contexte à perdre.
> 

---

## Installation

### Option A — JetBrains Toolbox (recommandé)

```bash
# Dans WSL2
wget -qO - https://raw.githubusercontent.com/nagygergo/jetbrains-toolbox-install/master/jetbrains-toolbox.sh | bash
```

Ou télécharge [JetBrains Toolbox](https://www.jetbrains.com/toolbox-app/) pour Windows, installe-le, puis installe IntelliJ IDEA Ultimate depuis l'interface. Toolbox gère les mises à jour automatiquement.

### Option B — Early Access Program (gratuit)

Si tu n'as pas de licence, la version EAP est gratuite et complète : [jetbrains.com/idea/nextversion](http://jetbrains.com/idea/nextversion)

### Option C — Licence étudiante (gratuit sur justificatif)

[jetbrains.com/community/education](http://jetbrains.com/community/education)

---

## Configuration Java (back)

### 1. Configurer le JDK

File → Project Structure → Project :

- Project SDK : `Add SDK → JDK` → navigue vers `~/.sdkman/candidates/java/current`
- Language level : 21

### 2. Activer l'assistance de code Java

Settings → Editor → General → Auto Import :

- ✅ **Add unambiguous imports on the fly**
- ✅ **Optimize imports on the fly**

Settings → Tools → Actions on Save :

- ✅ **Reformat code**
- ✅ **Optimize imports**
- ✅ **Run code cleanup**

Settings → Editor → Inspections :

- Cherche "Java" → active le profil **Default** ou **Strict**
- Les erreurs et warnings apparaissent en temps réel dans l'éditeur

> **Astuce** : si tu vois une ligne soulignée, `Alt+Enter` affiche les corrections suggérées.
> 

### 3. Configurer le style de code Google Java

Télécharge [intellij-java-google-style.xml](https://github.com/google/styleguide/blob/gh-pages/intellij-java-google-style.xml).

Settings → Editor → Code Style → Java → Import Scheme → sélectionne le fichier XML.

### 4. Plugins Java

Settings → Plugins → Marketplace :

| Plugin | Rôle |
| --- | --- |
| **SonarQube for IDE** | Détecte les bugs et vulnérabilités en temps réel (anciennement SonarLint) |
| **CheckStyle-IDEA** | Intègre Checkstyle dans l'IDE |
| **Maven Helper** | Analyse les dépendances, détecte les conflits |

### 5. Raccourcis Java indispensables

| Action | Raccourci Mac | Raccourci Win/Linux |
| --- | --- | --- |
| Lancer les tests | `Ctrl+Shift+F10` | `Ctrl+Shift+F10` |
| Refactoring → Rename | `Shift+F6` | `Shift+F6` |
| Extraire une méthode | `Ctrl+Alt+M` | `Ctrl+Alt+M` |
| Voir les implémentations | `Ctrl+Alt+B` | `Ctrl+Alt+B` |
| Générer (constructeur...) | `Cmd+N` | `Alt+Insert` |
| Reformater le code | `Cmd+Alt+L` | `Ctrl+Alt+L` |
| Chercher partout | `Shift+Shift` | `Shift+Shift` |
| Aller à la déclaration | `Cmd+Click` | `Ctrl+Click` |
| Afficher les erreurs | `F2` (next) | `F2` |

---

## Configuration Vue/TypeScript (front)

> Disponible uniquement en IntelliJ Ultimate — c'est pourquoi on ne fait pas de compromis sur la version.
> 

### 1. Activer l'assistance de code TypeScript

Settings → Languages & Frameworks → TypeScript :

- ✅ **TypeScript Language Service** activé
- TypeScript version : `katasensei-front/node_modules/typescript` (version du projet, pas celle de l'IDE)
- ✅ **Show project errors**

> **C'est la case la plus importante.** Sans ça, IntelliJ utilise sa propre version de TypeScript et ne voit pas les erreurs de ton projet. Avec ça, les erreurs apparaissent en temps réel dans l'éditeur — exactement comme `tsc --watch` mais inline.
> 

### 2. Configurer Prettier

Settings → Languages & Frameworks → JavaScript → Prettier :

- Prettier package : `katasensei-front/node_modules/prettier`
- ✅ **On save**
- ✅ **On 'Reformat Code' action**

### 3. Configurer ESLint

Settings → Languages & Frameworks → JavaScript → ESLint :

- ✅ **Automatic ESLint configuration**
- ✅ **Run eslint --fix on save**

> ESLint et Prettier s'activent à la sauvegarde. `Cmd+S` / `Ctrl+S` formate le code et corrige les erreurs lint automatiquement.
> 

### 4. Plugins Vue/TS

| Plugin | Rôle |
| --- | --- |
| **Vue.js** | Support Vue 3, `<script setup>`, Composition API |
| **Prettier** | Formatage inline dans l'IDE |
| **ESLint** | Lint en temps réel |

### 5. Plugins visuels et confort

| Plugin | Rôle |
| --- | --- |
| **Atom Material Icons** | Icônes dans l'arborescence — bien plus lisible |
| **Material Theme UI** | Thème visuel — sélectionne Light With Light Header après installation |

> Installation : Settings → Plugins → Marketplace → cherche le nom exact → Install → Redémarre IntelliJ.
> 

> Pour Material Theme UI : Settings → Appearance → Theme → **Material Light With Light Header**.
> 

### 6. Raccourcis Vue/TS indispensables

| Action | Raccourci Mac | Raccourci Win/Linux |
| --- | --- | --- |
| Aller au type/interface | `Cmd+Click` | `Ctrl+Click` |
| Voir toutes les erreurs TS | `F2` (next error) | `F2` |
| Refactoring → Rename | `Shift+F6` | `Shift+F6` |
| Extraire une variable | `Cmd+Alt+V` | `Ctrl+Alt+V` |
| Reformater + Prettier | `Cmd+Alt+L` | `Ctrl+Alt+L` |
| Terminal intégré | `Ctrl+\`` | `Ctrl+\`` |
| Panneau Problems | `Cmd+6` | `Alt+6` |

---

## Ouvrir les deux projets dans IntelliJ

File → Open → sélectionne le dossier racine `katasensei/`.

IntelliJ détecte automatiquement :

- Le `pom.xml` → importe le projet Maven (back)
- Le `package.json` → importe le projet npm (front)

---

## DataGrip — panneau Database intégré

DataGrip est inclus dans IntelliJ Ultimate via le panneau **Database** — pas besoin d'installer une application séparée.

Ouvre-le : `View → Tool Windows → Database` (ou icône cylindre à droite).

Consulte la page [Utiliser DataGrip dans KataSensei](../Utiliser%20DataGrip%20dans%20le%20projet%2033047a063e54818db219f3177cded652.md) pour la configuration complète.

> **Bruno** s'installe en phase 1 quand on crée les premiers endpoints — pas maintenant.
> 

---

## Claude dans IntelliJ

### Extension Claude (questions rapides inline)

Settings → Plugins → Marketplace → cherche **Claude** → Installe → connecte ton compte Anthropic.

Utilisation : sélectionne du code → clic droit → Claude → Ask / Explain / Refactor.

### Claude Code CLI (sessions de travail intensif)

Dans le terminal intégré d'IntelliJ à la racine du projet :

```bash
npm install -g @anthropic-ai/claude-code
claude
```

---

## Vérification finale

- [ ]  IntelliJ Ultimate installé (EAP ou licence)
- [ ]  JDK 21 configuré (pointe vers SDKMAN)
- [ ]  Auto-import Java activé
- [ ]  Actions on Save : reformat + optimize imports
- [ ]  SonarQube for IDE installé
- [ ]  CheckStyle-IDEA installé
- [ ]  Maven Helper installé
- [ ]  TypeScript Language Service activé avec la version du projet (`node_modules/typescript`)
- [ ]  ESLint configuré (run on save)
- [ ]  Prettier configuré (on save)
- [ ]  Plugin Vue.js installé
- [ ]  Atom Material Icons installé
- [ ]  Material Theme UI installé — thème Light With Light Header sélectionné
- [ ]  Les erreurs TypeScript apparaissent en rouge dans l'éditeur
- [ ]  Les erreurs Java apparaissent en rouge dans l'éditeur
- [ ]  Terminal intégré ouvre dans WSL2
- [ ]  Panneau Database ouvert et fonctionnel
- [ ]  Extension Claude installée