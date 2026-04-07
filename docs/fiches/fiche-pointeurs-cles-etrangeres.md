# Fiche — Pointeurs et clés étrangères

> Analogies TypeScript · Exemples de la vie réelle · Exemples tirés de KataSensei

---

## C'est quoi un pointeur ?

Un pointeur c'est une **référence vers autre chose**. Il ne contient pas l'objet — il sait juste où le trouver.

En TypeScript tu en crées tout le temps sans le nommer ainsi :

```typescript
const utilisateurId = "user-1"
// utilisateurId est un pointeur
// il ne contient pas l'utilisateur, il pointe vers lui
```

**L'analogie :** un post-it avec une adresse écrite dessus. Le post-it n'est pas la maison — mais il te permet de la trouver.

---

## C'est quoi une clé étrangère ?

C'est **le nom SQL d'un pointeur**.

"Étrangère" parce que la valeur référence une clé qui appartient à une **autre table** (une table étrangère).

```sql
-- Dans la table Tentative :
utilisateurId UUID  -- clé étrangère = pointeur vers la table Utilisateur
```

**Pointeur = concept général. Clé étrangère = son implémentation en SQL.**

Comme `fonction` vs `méthode` — même idée, nom différent selon le contexte.

---

## Pourquoi le pointeur est sur l'enfant, pas sur le parent ?

**Ton instinct TypeScript :** stocker un tableau dans le parent.

```typescript
// Ce qui semble naturel
type Utilisateur = {
  id: string
  tentatives: Tentative[]  // ← tableau dans le parent
}
```

**Le problème en SQL :** une cellule = une valeur. Pas un tableau.

Et surtout : si l'utilisateur ajoute une tentative, tu devrais modifier la ligne Utilisateur. Mais l'utilisateur lui-même n'a pas changé — seules ses tentatives s'accumulent.

**La solution SQL :** chaque enfant porte l'adresse de son parent.

```
Utilisateur          Tentative
───────────          ─────────────────────────
id: "user-1"  ←──── utilisateurId: "user-1"  (tentative 1)
              ←──── utilisateurId: "user-1"  (tentative 2)
              ←──── utilisateurId: "user-1"  (tentative 3)
```

L'Utilisateur ne change jamais. Les Tentatives s'accumulent en pointant vers lui.

**L'analogie du classeur :** tu ne colles pas une liste de feuilles sur la couverture du classeur. Tu écris le numéro du classeur sur chaque feuille. Pour retrouver toutes les feuilles du classeur 3 :

```sql
SELECT * FROM tentative WHERE utilisateurId = 'user-1'
```

---

## Bonne nouvelle côté front

L'API te restitue exactement ce que tu imagines naturellement :

```typescript
// Ce que l'API te retourne — ton instinct frontend était bon !
{
  id: "user-1",
  tentatives: [
    { id: "t1", date: "2026-01-15" },
    { id: "t2", date: "2026-02-03" },
  ]
}
```

Le backend fait la jointure SQL et reconstruit l'objet imbriqué. **La représentation mentale frontend est correcte — c'est juste le stockage en base qui fonctionne à l'envers.**
