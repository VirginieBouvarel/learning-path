# Ubiquitous Language — ADR 000

> Vocabulaire métier de KataSensei.
> 

---

## Termes métiers — en français dans le code

**Règle** : les noms de fichiers, variables et classes n'ont pas d'accents — le français s'écrit sans accents dans le code.

| Terme (sans accent) | Signification | À éviter |
| --- | --- | --- |
| **Kata** | Exercice de code à réaliser | Exercise, Challenge |
| **Tentative** | Une session de travail sur un kata — début, indices demandés, score final | Session, Run, Attempt |
| **Indice** | Aide fournie par l'IA Sensei | Hint, Help, Suggestion |
| **Niveau** | Degré de difficulté d'un kata : FACILE, MOYEN, DIFFICILE | Difficulty, Level |
| **Progression** | Avancée globale de l'apprenant sur la plateforme | Progress, Advancement |
| **Apprenant** | Rôle métier de l'utilisateur sur la plateforme | Student, User (au sens domaine) |

> **Apprenant vs User** : `User` est l'entité technique (email, mot de passe, JWT). `Apprenant` est le rôle métier — la même personne peut être `User` côté auth et `Apprenant` côté domaine.
> 

---

## Termes techniques — en anglais dans le code

| Terme anglais | Pourquoi en anglais |
| --- | --- |
| `KataId`, `TentativeId`, `UserId` | Identifiants techniques, convention universelle |
| `Repository`, `Service`, `Controller` | Patterns techniques standards Spring/Java |
| `UseCase`, `Port`, `Adapter` | Vocabulaire archi hexagonale |
| `DomainException`, `ValueObject` | Vocabulaire DDD technique |

---

**Règle pratique** : le nom de la classe métier est en français. Le suffixe technique (Repository, UseCase, Service, Controller, Id, Event) reste en anglais.

## Dans le code

```java
// Correct — termes métiers en français sans accents
type Niveau = 'FACILE' | 'MOYEN' | 'DIFFICILE';
interface Indice { contenu: string; numero: number }
public class Tentative { private KataId kataId; private int indicesUtilises; }
public class RequestIndiceUseCase { ... }
public class Apprenant { private UserId userId; private Progression progression; }
```

```java
// NON — terme métier traduit en anglais — trahit le domaine
public class Difficulty { EASY, MEDIUM, HARD }
// utiliser Niveau { FACILE, MOYEN, DIFFICILE }

// NON — terme métier anglais pour un concept utilisateur
public class Hint { private String content; }
// utiliser Indice { private String contenu; }

// NON — Session est ambigu (session HTTP ? session de kata ?)
public class Session { ... }
// utiliser Tentative pour une session de travail sur un kata

// NON — Difficulty au lieu de Niveau
type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'
// type Niveau = 'FACILE' | 'MOYEN' | 'DIFFICILE'

// NON — Student au lieu d'Apprenant
interface Student { userId: string }
// interface Apprenant { userId: UserId; progression: Progression }
```

---

## Dans les commits

```
feat(Kata): ajout de l'endpoint GET /katas
feat(Séance): création du use case StartSéance
feat(Indice): streaming SSE de l'indice IA
refactor(Niveau): extraction en Value Object
```

---

## Dans les messages utilisateur (UI)

Les messages affichés à l'utilisateur utilisent le vocabulaire métier :

- “Commencer un kata” et pas “Start session”
- “Demander un indice” et pas “Get a hint”
- “Voir ma progression” et pas “View my stats”