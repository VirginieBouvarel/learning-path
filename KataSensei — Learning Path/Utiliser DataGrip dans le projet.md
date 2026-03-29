# Utiliser DataGrip dans le projet

> DataGrip est intégré directement dans IntelliJ Ultimate via le panneau **Database** (à droite). Pas besoin d'installer une application séparée.
> 

---

## Ouvrir le panneau Database

Dans IntelliJ : `View → Tool Windows → Database` ou icône cylindre à droite.

---

## Connecter PostgreSQL local

1. Clic `+` → `Data Source` → `PostgreSQL`
2. Remplis les champs depuis ton `.env` :
    - Host : `localhost`
    - Port : `5432`
    - Database : `katasensei`
    - User : `katasensei`
    - Password : valeur de `DB_PASSWORD`
3. Clique **Test Connection** — doit afficher ✅
4. Clique **OK**

> **Prérequis** : `docker-compose up -d` doit être lancé avant.
> 

---

## Ce qu'on fait avec DataGrip dans KataSensei

### Vérifier les tables créées par Flyway

Après chaque migration, ouvre la connexion → `katasensei` → `public` → `Tables`. Tu dois voir les tables que tu as écrites dans tes fichiers `V1__...sql`, `V2__...sql`, etc.

### Lancer une requête SQL manuelle

Clic droit sur la connexion → `New → Query Console` :

```sql
-- Vérifier les katas insérés par la migration
SELECT * FROM kata;

-- Vérifier les migrations Flyway exécutées
SELECT * FROM flyway_schema_history ORDER BY installed_rank;

-- Vérifier un utilisateur créé via l'API
SELECT id, email, created_at FROM app_user;
```

### Inspecter les données de test

Double-clic sur une table → affiche toutes les lignes. Tu peux filtrer, trier, et modifier directement (utile pour les tests manuels).

---

## Documentation officielle

[jetbrains.com/help/datagrip](http://jetbrains.com/help/datagrip)