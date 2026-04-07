# Fiche — Les relations en SQL

> Analogies TypeScript · Exemples de la vie réelle · Exemples tirés de KataSensei

---

## Les 3 types de relations

### One-to-many — un parent, plusieurs enfants

> Un Utilisateur a plusieurs Tentatives.
> Une Tentative appartient à un seul Utilisateur.

```
Utilisateur (1) ──────→ (N) Tentative
```

**L'analogie :** une mère a plusieurs enfants. Chaque enfant a une seule mère. Sur l'acte de naissance de chaque enfant (l'enfant = la table Tentative), on écrit le nom de la mère — pas l'inverse.

**En pratique :** clé étrangère sur l'enfant (Tentative).

```typescript
type Tentative = {
  id: string
  utilisateurId: string  // ← clé étrangère sur l'enfant
  date: Date
}
```

---

### Many-to-many — plusieurs des deux côtés

> Un Kata a plusieurs Tags.
> Un Tag appartient à plusieurs Katas.

```
Kata (N) ──────→ (N) Tag
```

**L'analogie :** des acteurs jouent dans plusieurs films, et chaque film a plusieurs acteurs. Ni la fiche acteur ni la fiche film ne peut contenir la liste de l'autre — on crée un registre de tournages qui liste toutes les associations.

**En pratique :** impossible sans table intermédiaire. On crée une table de jointure.

```typescript
// Analogie TypeScript — c'est littéralement ça en mémoire
const kataTag: { kataId: string; tagId: string }[] = [
  { kataId: "bowling",   tagId: "tdd"   },
  { kataId: "bowling",   tagId: "solid" },
  { kataId: "fizz-buzz", tagId: "tdd"   },
]
```

```
KataTag (table de jointure)
├── kataId   FK → Kata.id
└── tagId    FK → Tag.id
```

---

### One-to-one — un seul des deux côtés

> Un Utilisateur a un seul Profil. Un Profil appartient à un seul Utilisateur.

**L'analogie :** un passeport par personne, une personne par passeport.

**En pratique :** rare. On fusionne souvent les deux tables en une seule :

```
// Au lieu de deux tables séparées avec une clé étrangère inutile
Utilisateur + Profil  →  Utilisateur
───────────────────────────────────
id
email
motDePasse
avatar
bio
preferences
```

Zéro jointure, zéro complexité.

**La seule raison de les séparer** : si une partie des données est optionnelle ou chargée rarement. Par exemple les préférences utilisateur, inutiles à chaque requête — on les isole pour des raisons de performance. Mais c'est une optimisation tardive, pas un réflexe de départ.

---

## Le raisonnement opérationnel — 3 questions dans l'ordre

```
1. Est-ce qu'une entité A peut avoir plusieurs B ?
   → Non : c'est un champ direct sur A
           (ex: niveauDifficulte sur Kata — un seul niveau possible)

2. Est-ce qu'un B peut appartenir à plusieurs A ?
   → Non : one-to-many → clé étrangère sur B
   → Oui : many-to-many → table de jointure

3. Les valeurs sont-elles fixes et fermées ?
   → Oui : ENUM ou table Tag avec liste fermée
   → Non : VARCHAR / TEXT
```

---

## Appliqué à KataSensei

```
niveauDifficulte → un kata a UN seul niveau       → champ ENUM direct
taille           → un kata a UNE seule taille      → champ ENUM direct
techniquesCraft  → un kata a PLUSIEURS techniques
                   un tag → PLUSIEURS katas         → many-to-many → KataTag
tentatives       → un utilisateur → PLUSIEURS
                   une tentative → UN utilisateur   → one-to-many → FK sur Tentative
```
