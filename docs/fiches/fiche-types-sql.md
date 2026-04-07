# Fiche — Choisir le type d'un champ en SQL

> Analogies TypeScript · Exemples tirés de KataSensei

---

## La question à se poser pour chaque champ

> *Quelle est la nature de cette donnée ?*

---

## Tableau de correspondance SQL ↔ TypeScript

| Nature de la donnée | Type SQL | Analogie TypeScript | Exemple KataSensei |
|---|---|---|---|
| Texte court | `VARCHAR(255)` | `string` | `titre`, `slug` |
| Texte long | `TEXT` | `string` (long) | `consignesOriginalEn`, `consignesFr` |
| Nombre entier | `INTEGER` | `number` | `nombreDeTentatives` |
| Vrai / Faux | `BOOLEAN` | `boolean` | `testsVerts`, `codeMort` |
| Date + heure | `TIMESTAMP` | `Date` | `dateTentative` |
| Identifiant unique | `UUID` | `string` (branded type) | `id` |
| Liste de valeurs fixes | `ENUM` | `union type` | `niveauDifficulte`, `taille` |
| Pourcentage / décimal | `DECIMAL` | `number` | `coverage` |

---

## Le cas ENUM — quand l'utiliser ?

Quand la donnée ne peut prendre que des valeurs **prédéfinies et fermées**.

C'est exactement l'équivalent d'un union type TypeScript :

```typescript
// TypeScript
type NiveauDifficulte = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE'
type Taille = 'PETIT' | 'MOYEN' | 'GRAND'
```

```sql
-- SQL — l'équivalent exact
niveauDifficulte ENUM('DEBUTANT', 'INTERMEDIAIRE', 'AVANCE')
taille           ENUM('PETIT', 'MOYEN', 'GRAND')
```

**Le test pour savoir si c'est un ENUM :**
Tu peux écrire la liste complète des valeurs possibles sans hésiter, et elle ne changera pas souvent ? → ENUM.

---

## TEXT vs VARCHAR — quelle différence ?

`VARCHAR(255)` = texte court avec limite de caractères. Un titre, un slug, un nom.

`TEXT` = texte long, pas de limite pratique. Des consignes, une synthèse IA, le contenu d'une fiche concept.

**Règle simple :** si tu imagines que l'utilisateur pourrait écrire plusieurs paragraphes → TEXT. Sinon → VARCHAR.

---

## UUID — pourquoi pas un simple INTEGER auto-incrémenté ?

Les deux fonctionnent. Mais UUID a des avantages importants :

- **Pas de séquence devinable** : un attaquant ne peut pas deviner `/kata/4` en ayant vu `/kata/3`
- **Fusion de bases possible** : si tu fusionnes deux bases un jour, pas de collision d'IDs
- **Standard dans les architectures distribuées**

En TypeScript c'est un `string` — et idéalement un branded type :

```typescript
type KataId = string & { readonly __brand: 'KataId' }
```

---

## Les 3 questions dans l'ordre

```
1. Est-ce un identifiant ?
   → UUID

2. Est-ce une liste de valeurs fixes et fermées ?
   → ENUM (ou table Tag avec liste fermée si many-to-many)

3. Est-ce du texte ?
   → Court (titre, slug, nom)  : VARCHAR(255)
   → Long (consignes, synthèse) : TEXT
```
