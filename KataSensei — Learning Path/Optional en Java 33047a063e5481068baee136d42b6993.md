# Optional en Java

> `Optional<T>` représente une valeur qui peut être présente ou absente — sans utiliser `null`. C'est l'équivalent de `T | undefined` en TypeScript, mais explicite dans le type de retour.
> 

---

## Dans KataSensei

Spring Data JPA retourne automatiquement `Optional<Kata>` sur `findById()`. Tu n'en crées pas manuellement — tu les consommes.

```java
// KataService.java — exemple concret KataSensei
public KataDto findById(KataId id) {
    return kataRepository.findById(id.value())
        .map(this::toDto)                               // transforme si présent
        .orElseThrow(() -> new KataNotFoundException(id)); // lève une exception si absent
}
```

---

## Méthodes utilisées dans le projet

| Méthode | Usage | Équivalent TS |
| --- | --- | --- |
| `.map(fn)` | Transforme la valeur si présente | `.map()` sur un tableau d'un élément |
| `.orElseThrow(supplier)` | Retourne la valeur ou lève une exception | `value ?? throw new Error()` |
| `.isPresent()` | Vrai si une valeur existe | `value !== undefined` |
| `.isEmpty()` | Vrai si aucune valeur | `value === undefined` |
| `.orElse(defaut)` | Retourne la valeur ou une valeur par défaut | `value ?? defaut` |

---

## Règle importante

Ne jamais appeler `.get()` sans avoir vérifié `.isPresent()` avant — ça plante si la valeur est absente. Utilise toujours `orElse` ou `orElseThrow`.

---

## Documentation complète

[docs.oracle.com](http://docs.oracle.com) [— Optional](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html)