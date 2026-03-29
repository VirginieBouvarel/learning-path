# Guide pas-à-pas — Phase 1 (format exercices)

# Guide pas-à-pas — Phase 1

## Docs utiles pour cette phase

| Ressource | Lien |
| --- | --- |
| Spring Boot docs | [docs.spring.io](http://docs.spring.io) |
| JUnit 5 | [junit.org/junit5](http://junit.org/junit5) |
| AssertJ | [assertj.github.io](http://assertj.github.io) |
| Spring Data JPA | [docs.spring.io/spring-data](http://docs.spring.io/spring-data) |
| Flyway | [flywaydb.org](http://flywaydb.org) |
| Problem Details RFC 7807 | [rfc-editor.org/rfc/rfc7807](http://rfc-editor.org/rfc/rfc7807) |
| Baeldung Spring | [baeldung.com](http://baeldung.com) |

---

> **Mode de travail** : chaque étape est un exercice. Tu lis l’objectif, tu essaies par toi-même. La solution est dans un toggle dépliable — ne l’ouvre qu’après 20 minutes d’effort sincere ou si tu es vraiment bloquée. Le blocage fait partie de l’apprentissage.
> 

**Durée estimée : ~10h réparties sur 2 semaines**

> ⚠️ **Règle d’or** : tu n’écris pas une ligne de code métier sans avoir d’abord écrit le test qui échoue. Si tu es tentée de coder avant de tester, relis cette règle.
> 

---

## Étape 1 — Comprendre TDD avant d’écrire quoi que ce soit

Avant de toucher au clavier, lis ces trois phrases jusqu’à les avoir en tête :

```
🔴 RED     — Tu écris un test qui décrit ce que tu veux. Il échoue. C’est normal.
🟢 GREEN   — Tu écris le MINIMUM de code pour que le test passe. Rien de plus.
🔵 REFACTOR — Tu nettoies le code sans casser le test.
```

Pourquoi ce cycle ? Parce qu’il force à penser à l’interface avant l’implémentation. Exactement comme écrire un type TypeScript avant de coder la fonction.

**Anatomie d’un test JUnit 5 — le pattern Given / When / Then :**

```java
@Test
void should_[résultat]_when_[condition]() {
    // GIVEN — prépare le contexte
    // WHEN  — exécute l’action
    // THEN  — vérifie le résultat
}
```

> **Note** : on utilisera **AssertJ** plutôt que les assertions JUnit natives. `assertThat(result).isEqualTo(expected)` est beaucoup plus lisible que `assertEquals(expected, result)` — et les messages d’erreur sont 10x plus clairs. AssertJ est inclus dans `spring-boot-starter-test`, pas besoin de l’ajouter.
> 

---

```
commit suggestion → docs(kata): compréhension TDD Red/Green/Refactor
```

---

## Étape 2 — Structure du projet et premier test

### Exercice 2.1 — Crée la structure de dossiers

**Objectif** : créer l’arborescence suivante dans `src/main/java/dev/katasensei/` :

```
kata/
├── Kata.java
├── KataRepository.java
├── KataService.java
├── KataController.java
└── KataDto.java
```

Et dans `src/main/java/dev/katasensei/error/` :

```
error/
├── DomainException.java
├── KataNotFoundException.java
└── GlobalExceptionHandler.java
```

Laisse les fichiers vides pour l’instant. La structure suffit.

> Pourquoi `error/` dès le début ? Parce que la gestion des erreurs n’est pas une réflexion après-coup — c’est une décision d’architecture prise dès le premier endpoint.
> 

---

### Exercice 2.2 — Écris ton premier test (🔴 RED)

**Objectif** : écrire un test `@WebMvcTest` qui vérifie que `GET /katas` retourne un tableau JSON vide quand il n’y a pas de katas.

**Indications :**

- Annotation de classe : `@WebMvcTest(KataController.class)`
- Tu auras besoin de `MockMvc` injecté avec `@Autowired`
- Le `KataService` n’existe pas encore — tu dois le **mocker** avec `@MockBean`
- Pour configurer le mock : `given(kataService.findAll()).willReturn(List.of())`
- Pour faire la requête : `mockMvc.perform(get("/katas"))`
- Pour vérifier : `.andExpect(status().isOk()).andExpect(content().json("[]"))`

**Lance `mvn test`** — le test doit échouer parce que `KataController` n’existe pas. 🔴

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @WebMvcTest(KataController.class)
    class KataControllerTest {
    
        @Autowired
        private MockMvc mockMvc;
    
        @MockBean
        private KataService kataService;
    
        @Test
        void should_returnEmptyList_when_noKatasExist() throws Exception {
            given(kataService.findAll()).willReturn(List.of());
    
            mockMvc.perform(get("/katas"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
        }
    }
    ```
    

---

### Exercice 2.3 — Passe au vert (🟢 GREEN)

**Objectif** : créer le minimum de code pour que le test passe.

**Contraintes :**

- `KataDto` est un **record Java** (l’équivalent d’une interface TS immutable) avec `id`, `title`, `description`, `difficulty`
- `KataService` a une méthode `findAll()` qui retourne une liste vide pour l’instant
- `KataController` est annoté `@RestController` + `@RequestMapping("/katas")` et injecte le service via le **constructeur** (jamais `@Autowired` sur le champ)

**Lance `mvn test`** — le test doit passer. 🟢

> **Question de réflexion** : pourquoi injecter via le constructeur plutôt que `@Autowired` sur le champ ? Que se passe-t-il pour les tests ?
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public record KataDto(UUID id, String title, String description, String difficulty) {}
    ```
    
    ```java
    @Service
    public class KataService {
        public List<KataDto> findAll() {
            return List.of();
        }
    }
    ```
    
    ```java
    @RestController
    @RequestMapping("/katas")
    public class KataController {
    
        private final KataService kataService;
    
        public KataController(KataService kataService) {
            this.kataService = kataService;
        }
    
        @GetMapping
        public List<KataDto> findAll() {
            return kataService.findAll();
        }
    }
    ```
    
    **Réponse à la question** : l’injection par constructeur permet de créer l’objet dans les tests sans Spring, en passant un mock directement. `@Autowired` sur un champ oblige Spring à démarrer pour injecter — plus lent et moins testable.
    

```
commit suggestion → feat(kata): ajout endpoint GET /katas en TDD
```

---

## Étape 3 — Persister les katas (JPA + Flyway)

### Exercice 3.1 — Crée la migration Flyway

**Objectif** : créer le fichier `src/main/resources/db/migration/V1__create_kata_table.sql`.

**Contraintes :**

- Table `kata` avec les colonnes : `id` (UUID, primary key), `title` (varchar 255, not null), `description` (text, not null), `difficulty` (varchar 20, not null, check EASY/MEDIUM/HARD), `language` (varchar 50, default `fr`), `created_at` (timestamp, default now)
- Insère 3 katas de seed : FizzBuzz (EASY), Palindrome (EASY), Anagramme (MEDIUM)

**Convention Flyway à respecter** : `V` + numéro + `__` (double underscore) + description + `.sql`

> Flyway exécute les migrations dans l’ordre et ne rejoue **jamais** une migration déjà exécutée. C’est git pour la base de données.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```sql
    CREATE TABLE kata (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title       VARCHAR(255) NOT NULL,
        description TEXT         NOT NULL,
        difficulty  VARCHAR(20)  NOT NULL CHECK (difficulty IN ('EASY', 'MEDIUM', 'HARD')),
        language    VARCHAR(50)  NOT NULL DEFAULT 'fr',
        created_at  TIMESTAMP    NOT NULL DEFAULT now()
    );
    
    INSERT INTO kata (id, title, description, difficulty) VALUES
        (gen_random_uuid(), 'FizzBuzz',   'Affiche Fizz si divisible par 3, Buzz si par 5', 'EASY'),
        (gen_random_uuid(), 'Palindrome', 'Vérifie si un mot se lit dans les deux sens',    'EASY'),
        (gen_random_uuid(), 'Anagramme',  'Vérifie si deux mots sont des anagrammes',       'MEDIUM');
    ```
    

---

### Exercice 3.2 — Crée l’entité JPA

**Objectif** : créer `Kata.java` annotée pour JPA.

**Indications :**

- `@Entity` + `@Table(name = "kata")`
- `@Id` + `@GeneratedValue(strategy = GenerationType.UUID)`
- `difficulty` est un **enum** `Difficulty { EASY, MEDIUM, HARD }` — annoté `@Enumerated(EnumType.STRING)`
- Pas de setters — seulement des getters
- Un constructeur vide **protégé** requis par JPA (`protected Kata() {}`)
- Un constructeur public pour créer un kata avec titre, description, difficulté

> **Question de réflexion** : pourquoi pas de setters ? Qu’est-ce que ça dit sur la philosophie de mutation des entités ?
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public enum Difficulty { EASY, MEDIUM, HARD }
    ```
    
    ```java
    @Entity
    @Table(name = "kata")
    public class Kata {
    
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;
    
        @Column(nullable = false)
        private String title;
    
        @Column(nullable = false, columnDefinition = "TEXT")
        private String description;
    
        @Enumerated(EnumType.STRING)
        @Column(nullable = false)
        private Difficulty difficulty;
    
        @Column(nullable = false)
        private String language = "fr";
    
        protected Kata() {}
    
        public Kata(String title, String description, Difficulty difficulty) {
            this.title = title;
            this.description = description;
            this.difficulty = difficulty;
        }
    
        public UUID getId() { return id; }
        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public Difficulty getDifficulty() { return difficulty; }
    }
    ```
    
    **Réponse** : sans setters, l’entité ne peut évoluer que via des méthodes métier explicites. `kata.archive()` dit ce qui se passe. `kata.setStatus("archived")` ne dit rien sur le métier.
    

---

### Exercice 3.3 — Crée le Repository Spring Data

**Objectif** : créer `KataRepository` qui étend `JpaRepository<Kata, UUID>` et déclare deux méthodes de recherche.

**Contraintes :**

- Méthode pour trouver par difficulté
- Méthode pour trouver par langue
- C’est tout. Spring Data génère le SQL automatiquement.

> **Question de réflexion** : comment Spring sait-il écrire le SQL depuis le nom de la méthode ?
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public interface KataRepository extends JpaRepository<Kata, UUID> {
        List<Kata> findByDifficulty(Difficulty difficulty);
        List<Kata> findByLanguage(String language);
    }
    ```
    
    **Réponse** : Spring Data parse le nom de la méthode. `findBy` + `Difficulty` → `SELECT * FROM kata WHERE difficulty = ?`. C’est de la convention sur configuration — le même principe que les computed properties en Vue.
    

---

### Exercice 3.4 — Écris le test d’intégration puis branche le Service sur la DB

**Objectif** : TDD complet — test d’intégration d’abord, implémentation ensuite.

**Le test à écrire** :

- Classe annotée `@SpringBootTest` + `@Transactional`
- Vérifie que `kataService.findAll()` retourne les 3 katas de la migration Flyway
- Utilise `assertThat(katas).extracting(KataDto::title).contains("FizzBuzz", "Palindrome", "Anagramme")`

**Lance les tests** — ils échouent (`findAll()` retourne toujours `List.of()`). 🔴

**Puis** mets à jour `KataService` pour utiliser `KataRepository` et un méthode privée `toDto(Kata kata)`.

**Lance les tests** — tout doit être vert. 🟢

> **Différence `@WebMvcTest` vs `@SpringBootTest`** : WebMvcTest charge seulement la couche web (rapide, mock le reste). SpringBootTest charge toute l’appli + la DB (lent, réaliste). Utilise le bon niveau selon ce que tu testes.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @SpringBootTest
    @Transactional
    class KataServiceIntegrationTest {
    
        @Autowired private KataService kataService;
    
        @Test
        void should_returnAllKatas_when_called() {
            var katas = kataService.findAll();
            assertThat(katas).hasSize(3);
            assertThat(katas).extracting(KataDto::title)
                .contains("FizzBuzz", "Palindrome", "Anagramme");
        }
    }
    ```
    
    ```java
    @Service
    public class KataService {
    
        private final KataRepository kataRepository;
    
        public KataService(KataRepository kataRepository) {
            this.kataRepository = kataRepository;
        }
    
        public List<KataDto> findAll() {
            return kataRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        }
    
        private KataDto toDto(Kata kata) {
            return new KataDto(
                kata.getId(),
                kata.getTitle(),
                kata.getDescription(),
                kata.getDifficulty().name()
            );
        }
    }
    ```
    

```
commit suggestion → feat(kata): ajout persistance JPA + migration Flyway V1
```

---

## Étape 4 — POST /katas avec validation

### Exercice 4.1 — Test du cas nominal et du cas invalide (🔴 RED)

**Objectif** : avant d’implémenter `POST /katas`, écris deux tests dans `KataControllerTest` :

1. `should_createKata_when_requestIsValid` — envoie un JSON valide, vérifie `status().isCreated()` et que `$.id` existe
2. `should_return400_when_titleIsBlank` — envoie un JSON avec title vide, vérifie `status().isBadRequest()`

**Indications :**

- `mockMvc.perform(post("/katas").contentType(APPLICATION_JSON).content("..."))`
- Pour le test nominal : configure le mock `given(kataService.create(any())).willReturn(kata)`
- Le test du 400 ne nécessite pas de mock — pourquoi ?
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @Test
    void should_createKata_when_requestIsValid() throws Exception {
        var kata = new KataDto(UUID.randomUUID(), "FizzBuzz", "Desc", "EASY");
        given(kataService.create(any())).willReturn(kata);
    
        mockMvc.perform(post("/katas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"title":"FizzBuzz","description":"Desc","difficulty":"EASY"}
                    """))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.title").value("FizzBuzz"));
    }
    
    @Test
    void should_return400_when_titleIsBlank() throws Exception {
        mockMvc.perform(post("/katas")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"title":"","description":"Desc","difficulty":"EASY"}
                    """))
            .andExpect(status().isBadRequest());
    }
    ```
    
    **Réponse** : le test 400 ne nécessite pas de mock parce que la validation s’arrête avant d’appeler le service — `@Valid` intercepte le JSON invalide et lance une exception que `@ControllerAdvice` transforme en 400.
    

---

### Exercice 4.2 — Implémente CreateKataRequest + endpoint (🟢 GREEN)

**Objectif** : faire passer les deux tests.

**Indications :**

- `CreateKataRequest` est un record avec annotations Bean Validation : `@NotBlank` sur title et description, `@NotNull` sur difficulty
- Dans le contrôleur : `@PostMapping` + `@ResponseStatus(HttpStatus.CREATED)` + `@RequestBody @Valid`
- Dans le service : `KataService.create(CreateKataRequest request)` qui crée et sauvegarde un `Kata`

> **`@Valid` est le déclencheur.** Sans lui, Spring ignore les annotations de validation. Avec lui, échec → `MethodArgumentNotValidException` → interceptée par `@ControllerAdvice`.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public record CreateKataRequest(
        @NotBlank(message = "Le titre est obligatoire")
        @Size(min = 3, max = 100)
        String title,
    
        @NotBlank(message = "La description est obligatoire")
        String description,
    
        @NotNull(message = "La difficulté est obligatoire")
        Difficulty difficulty
    ) {}
    ```
    
    ```java
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public KataDto create(@RequestBody @Valid CreateKataRequest request) {
        return kataService.create(request);
    }
    ```
    
    ```java
    public KataDto create(CreateKataRequest request) {
        var kata = new Kata(request.title(), request.description(), request.difficulty());
        return toDto(kataRepository.save(kata));
    }
    ```
    

```
commit suggestion → feat(kata): ajout endpoint POST /katas avec validation Bean Validation
```

---

## Étape 5 — GET /katas/{id} + hiérarchie d’exceptions

### Exercice 5.1 — Crée la hiérarchie d’exceptions

**Objectif** : créer `DomainException` (classe abstraite) et `KataNotFoundException` qui en hérite.

**Contraintes :**

- `DomainException extends RuntimeException` — pourquoi `RuntimeException` et pas `Exception` ?
- `KataNotFoundException` prend un `UUID id` dans son constructeur et génère le message

> **Question de réflexion** : `RuntimeException` vs `Exception` — quelle est la différence pratique en Java ?
> 
- Solution + explication
    
    ```java
    public abstract class DomainException extends RuntimeException {
        protected DomainException(String message) {
            super(message);
        }
    }
    
    public class KataNotFoundException extends DomainException {
        public KataNotFoundException(UUID id) {
            super("Kata introuvable : " + id);
        }
    }
    ```
    
    **Réponse** : `RuntimeException` est **unchecked** — tu n’as pas besoin de déclarer `throws` partout ni de mettre des `try/catch` dans chaque appelant. `Exception` est **checked** — Java t’oblige à la déclarer ou l’attraper à chaque niveau. Pour des exceptions métier attrapées au niveau global par `@ControllerAdvice`, `RuntimeException` est la bonne pratique.
    

---

### Exercice 5.2 — TDD complet sur GET /katas/{id}

**Objectif** : en TDD, implémenter `GET /katas/{id}` avec deux comportements :

1. Kata trouvé → 200 + le DTO
2. Kata non trouvé → lancer `KataNotFoundException`

**Écris les tests d’abord**, puis l’implémentation dans le service et le contrôleur.

**Indice pour le service** : `kataRepository.findById(id)` retourne un `Optional<Kata>` — utilise `.orElseThrow()`.

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @Test
    void should_returnKata_when_idExists() throws Exception {
        var id = UUID.randomUUID();
        var kata = new KataDto(id, "FizzBuzz", "Desc", "EASY");
        given(kataService.findById(id)).willReturn(kata);
    
        mockMvc.perform(get("/katas/" + id))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.title").value("FizzBuzz"));
    }
    
    @Test
    void should_return404_when_kataDoesNotExist() throws Exception {
        var id = UUID.randomUUID();
        given(kataService.findById(id)).willThrow(new KataNotFoundException(id));
    
        mockMvc.perform(get("/katas/" + id))
            .andExpect(status().isNotFound());
    }
    ```
    
    ```java
    // Dans KataController
    @GetMapping("/{id}")
    public KataDto findById(@PathVariable UUID id) {
        return kataService.findById(id);
    }
    
    // Dans KataService
    public KataDto findById(UUID id) {
        return kataRepository.findById(id)
            .map(this::toDto)
            .orElseThrow(() -> new KataNotFoundException(id));
    }
    ```
    

```
commit suggestion → feat(kata): ajout endpoint GET /katas/{id} avec 404 typé
```

---

## Étape 6 — Gestion d'erreurs centralisée (@ControllerAdvice)

> C’est l’étape la plus importante de la phase. Une seule classe gère toutes les erreurs. Ton front Vue reçoit toujours le même format JSON — jamais un stack trace HTML.
> 

### Exercice 6.1 — Écris le test du handler global (🔴 RED)

**Objectif** : ajouter dans `KataControllerTest` un test qui vérifie que quand une `KataNotFoundException` est levée, la réponse suit le format Problem Details RFC 7807 :

```json
{
  "type": "https://katasensei.dev/errors/kata-not-found",
  "title": "Kata not found",
  "status": 404,
  "detail": "..."
}
```

**Lance les tests** — le test échoue car le handler n’existe pas encore. 🔴

- Solution test — ouvre seulement si bloquée après 20 min
    
    ```java
    @Test
    void should_returnProblemDetails_when_kataNotFound() throws Exception {
        var id = UUID.randomUUID();
        given(kataService.findById(id)).willThrow(new KataNotFoundException(id));
    
        mockMvc.perform(get("/katas/" + id))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.type").exists())
            .andExpect(jsonPath("$.title").value("Kata not found"))
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.detail").exists());
    }
    ```
    

---

### Exercice 6.2 — Implémente le GlobalExceptionHandler (🟢 GREEN)

**Objectif** : créer `GlobalExceptionHandler` qui :

- Annoté `@RestControllerAdvice` et étend `ResponseEntityExceptionHandler`
- Gère `KataNotFoundException` → 404 Problem Details
- Gère `MethodArgumentNotValidException` → 400 avec les champs en erreur
- Gère `Exception` → 500 générique (filet de sécurité)

**Indications :**

- `ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage())`
- `problem.setTitle("Kata not found")`
- `problem.setType(URI.create("https://katasensei.dev/errors/kata-not-found"))`

> **Pourquoi étendre `ResponseEntityExceptionHandler`** ? Cette classe Spring gère déjà 15+ exceptions Spring internes. En l’héritant, tu en bénéficies gratuitement et tu override seulement ce que tu veux personnaliser.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @RestControllerAdvice
    public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    
        @ExceptionHandler(KataNotFoundException.class)
        ProblemDetail handleKataNotFound(KataNotFoundException ex) {
            var problem = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
            problem.setTitle("Kata not found");
            problem.setType(URI.create("https://katasensei.dev/errors/kata-not-found"));
            return problem;
        }
    
        @Override
        protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatusCode status, WebRequest request
        ) {
            var problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
            problem.setTitle("Validation failed");
            problem.setType(URI.create("https://katasensei.dev/errors/validation"));
            var errors = ex.getBindingResult().getFieldErrors().stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
            problem.setProperty("errors", errors);
            return ResponseEntity.badRequest().body(problem);
        }
    
        @ExceptionHandler(Exception.class)
        ProblemDetail handleUnexpected(Exception ex) {
            var problem = ProblemDetail.forStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            problem.setTitle("Unexpected error");
            problem.setType(URI.create("https://katasensei.dev/errors/internal"));
            return problem;
        }
    }
    ```
    

```
commit suggestion → feat(erreur): ajout GlobalExceptionHandler Problem Details RFC 7807
```

---

## Étape 7 — Afficher les katas dans Vue

### Exercice 7.1 — Crée l’appel API dans la couche infrastructure

**Objectif** : créer `src/infrastructure/api/kataApi.ts` avec une interface `KataDto` et une fonction `fetchKatas()`.

**Contraintes :**

- L’URL de base vient de `import.meta.env.VITE_API_URL` avec fallback sur `http://localhost:8080`
- `difficulty` est une union littérale : `'EASY' | 'MEDIUM' | 'HARD'` (pas un simple `string`)
- La fonction retourne `Promise<KataDto[]>` et lance une erreur si `res.ok === false`

> **Pourquoi dans `infrastructure/` et pas dans le composant Vue ?** Parce que le composant ne devrait pas savoir comment les données arrivent. Premier réflexe d’archi hexagonale front.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'
    
    export interface KataDto {
      id: string
      title: string
      description: string
      difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    }
    
    export async function fetchKatas(): Promise<KataDto[]> {
      const res = await fetch(`${API_BASE}/katas`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json() as Promise<KataDto[]>
    }
    ```
    

---

### Exercice 7.2 — Crée la vue KataList

**Objectif** : créer `src/ui/views/KataListView.vue` qui affiche la liste des katas.

**Contraintes :**

- Utilise `onMounted` + `ref` (pas encore `useAsync` — ça viendra en phase 2)
- Gère trois états : loading, error, liste
- Affiche pour chaque kata : titre + difficulté

> **Ce code sera naïf** : loading state répété, try/catch manuel. Tu le ressentiras. C’est voulu — le refactoring phase 2 avec `useAsync` aura tout son sens.
> 
- Solution — ouvre seulement si bloquée après 20 min
    
    ```
    <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { fetchKatas, type KataDto } from '@/infrastructure/api/kataApi'
    
    const katas = ref<KataDto[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    
    onMounted(async () => {
      loading.value = true
      try {
        katas.value = await fetchKatas()
      } catch {
        error.value = 'Impossible de charger les katas'
      } finally {
        loading.value = false
      }
    })
    </script>
    
    <template>
      <div>
        <p v-if="loading">Chargement...</p>
        <p v-else-if="error" role="alert">{{ error }}</p>
        <ul v-else>
          <li v-for="kata in katas" :key="kata.id">
            {{ kata.title }} — {{ kata.difficulty }}
          </li>
        </ul>
      </div>
    </template>
    ```
    

---

### Exercice 7.3 — Résoudre CORS

**Objectif** : comprendre pourquoi le navigateur bloque les requêtes de `:5173` vers `:8080`, puis choisir et implémenter une solution.

**Question** : CORS est une protection du navigateur. Qui décide d’autoriser ou non une origine ? Le serveur ou le client ?

**Deux solutions possibles** — choisis-en une :

1. Proxy Vite : configurer `vite.config.ts` pour que le front proxy les requêtes `/api` vers `:8080`
2. Configuration CORS Spring : une classe `@Configuration` qui autorise l’origine `:5173`
- Solution — ouvre seulement si bloquée après 20 min
    
    **Réponse** : c’est le **serveur** qui décide. Le navigateur envoie l’origine dans les headers, le serveur répond avec `Access-Control-Allow-Origin`. Si absent ou ne correspondant pas, le navigateur bloque.
    
    **Option 1 — Proxy Vite** (recommandé en dev) :
    
    ```tsx
    // vite.config.ts
    export default defineConfig({
      plugins: [vue()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:8080',
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    })
    ```
    
    **Option 2 — Config Spring** :
    
    ```java
    @Configuration
    public class CorsConfig {
        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
                }
            };
        }
    }
    ```
    

```
commit suggestion → feat(kata): affichage liste katas dans KataListView
```

---

## Étape 7 bis — CSS avec scoped et BEM

### Exercice 7 bis.1 — Ajoute des styles à KataListView

Maintenant que la vue affiche des données, elle doit être utilisable. Ajoute un bloc `<style scoped>` avec BEM.

**Convention BEM rappel :**

- Block : `.kata-list`
- Element : `.kata-list__titre`, `.kata-list__item`
- Modifier : `.kata-list__item--selectionne`

**Contraintes :**

- Utilise les composants shadcn-vue `Card` et `Badge` pour les katas
- Le niveau de difficulté est un badge coloré (FACILE = vert, MOYEN = orange, DIFFICILE = rouge)
- `<style scoped>` uniquement — pas de styles globaux
- Classes en français sans accents (BEM) sur les éléments spécifiques à KataSensei
- Les classes shadcn-vue restent en anglais (ce sont des composants tiers)

**Test à écrire dans `tests/ui/views/KataListView.test.ts` :**

- Vérifie que le badge de difficulté a la bonne classe selon le niveau

```
commit suggestion → feat(kata): ajout styles scoped BEM sur KataListView avec shadcn
```

---

## Étape 8 — ADR 002 et CI

### Exercice 8.1 — Écris l’ADR 002

**Objectif** : documenter la décision de gestion des erreurs dans `docs/adr/002-gestion-erreurs-centralisee.md`.

**Format à respecter :**

```
# ADR 002 — [Titre]
## Date
## Statut (Accepté / Déprécié / Proposé)
## Contexte — pourquoi cette décision était nécessaire
## Décision — ce qu’on a choisi
## Conséquences — ce que ça change
## Alternatives rejetées — et pourquoi
```

C'est ton document, écris-le avec tes propres mots.

```
commit suggestion → docs(adr): ajout ADR 002 gestion erreurs centralisée
```

> N'oublie pas de copier l'ADR dans `docs/adr/` de ton projet GitLab avant de committer.
> 

### Exercice 8.2 — Ajouter JaCoCo à la CI

**Objectif** : ajouter le plugin JaCoCo dans `pom.xml` avec un seuil minimum de coverage à 70%, et mettre à jour le pipeline CI pour vérifier ce seuil.

> Pourquoi 70% et pas 100% ? 100% pousse à tester des getters et des constructeurs. 70% oblige à tester les chemins importants sans tomber dans ce piège.
> 
- Solution JaCoCo — ouvre seulement si bloquée après 20 min
    
    ```xml
    <plugin>
        <groupId>org.jacoco</groupId>
        <artifactId>jacoco-maven-plugin</artifactId>
        <executions>
            <execution>
                <goals><goal>prepare-agent</goal></goals>
            </execution>
            <execution>
                <id>report</id>
                <phase>test</phase>
                <goals><goal>report</goal></goals>
            </execution>
            <execution>
                <id>check</id>
                <goals><goal>check</goal></goals>
                <configuration>
                    <rules>
                        <rule>
                            <element>BUNDLE</element>
                            <limits>
                                <limit>
                                    <counter>LINE</counter>
                                    <value>COVEREDRATIO</value>
                                    <minimum>0.70</minimum>
                                </limit>
                            </limits>
                        </rule>
                    </rules>
                </configuration>
            </execution>
        </executions>
    </plugin>
    ```
    
    ```yaml
    # Dans ci.yml
    - name: Run tests with coverage check
      run: mvn test jacoco:check
    ```
    

---

## Checklist finale phase 1

- [ ]  `GET /katas` écrit en TDD (test rouge avant le code)
- [ ]  `POST /katas` avec Bean Validation, test du cas valide et du cas invalide
- [ ]  `GET /katas/{id}` avec test du 404
- [ ]  Migration Flyway `V1__create_kata_table.sql` avec 3 katas de seed
- [ ]  `DomainException` + `KataNotFoundException`
- [ ]  `GlobalExceptionHandler` avec Problem Details RFC 7807
- [ ]  Test du handler global
- [ ]  CORS résolu (proxy Vite ou config Spring)
- [ ]  Front Vue affiche la liste des katas
- [ ]  JaCoCo configuré, coverage ≥ 70%, CI vérifie le seuil
- [ ]  ADR 002 committé

---

## Erreurs fréquentes et solutions

| Erreur | Cause probable | Solution |
| --- | --- | --- |
| `Table kata doesn't exist` | Flyway n’a pas tourné | Vérifier `spring.flyway.enabled=true` et le double underscore dans le nom du fichier |
| `@Valid` ignoré | Annotation manquante sur le paramètre | `@RequestBody @Valid CreateKataRequest` — les deux sont requis |
| `NoSuchBeanDefinitionException` dans `@WebMvcTest` | Service non mocké | Ajouter `@MockBean private KataService kataService` |
| CORS error dans le navigateur | CORS non configuré | Proxy Vite ou `CorsConfig` Spring |
| `LazyInitializationException` | JPA lazy loading hors transaction | Annoter le test `@Transactional` |
| Coverage check échoue | Tests insuffisants | Lire le rapport JaCoCo dans `target/site/jacoco/index.html` |

---

## Optional en Java

Dans cet exercice tu as utilisé `Optional<Kata>` retourné par `kataRepository.findById()`. Consulte la page [Optional en Java](../Optional%20en%20Java%2033047a063e5481068baee136d42b6993.md) dans Documentations & Ressources pour les méthodes disponibles.

---

## Ce que tu sais faire après cette phase

- Écrire des tests JUnit 5 + AssertJ **avant** le code (TDD)
- Distinguer `@WebMvcTest` (rapide, couche web) de `@SpringBootTest` (lent, toute l’appli)
- Créer et utiliser des migrations Flyway
- Modéliser une entité JPA et l’exposer via Spring Data
- Valider des données entrantes avec Bean Validation
- Centraliser la gestion des erreurs avec `@ControllerAdvice` et Problem Details RFC 7807
- Créer une hiérarchie d’exceptions domaine
- Connecter un front Vue à un back Spring en gérant CORS
- Mesurer et contrôler la couverture avec JaCoCo
- Documenter une décision technique (ADR)

> **À retenir** : le code de cette phase est intentionnellement naïf. Tout dans le contrôleur, pas de séparation domaine/infra, types non brandés côté front. La phase 2 refactorisera le front, la phase 3 refactorisera le back. Sentir la douleur avant de voir la solution, c’est ce qui fait qu’elle reste.
>