# Guide pas-à-pas — Phase 3 (format exercices)

# Guide pas-à-pas — Phase 3

> **Rappel du mode de travail** : tu lis l'objectif, tu essaies par toi-même. La solution est dans un toggle dépliable — ne l'ouvre qu'après 20 minutes d'effort sincère.
> 

**Durée estimée : ~10h réparties sur 2 semaines**

> 🎯 **Objectif de cette phase** : sécuriser KataSensei avec JWT, appliquer SOLID sur du vrai code, créer les Value Objects Java qui mirroient tes branded types TS, et mettre en place une gestion d'erreurs exhaustive des deux côtés. À la fin, tu refactoriseras tout le code naïf du back de la phase 1.
> 

---

## Étape 1 — Comprendre ce qu'on va construire

Avant de toucher au clavier, relis `KataService.java` de la phase 1 et réponds par écrit :

1. Qu'est-ce qui empêche de passer un `UUID` d'utilisateur là où un `UUID` de kata est attendu ?
2. Si `KataService` gérait aussi les emails de bienvenue, quel principe SOLID serait violé ?
3. Comment tester `KataService` sans Spring ni base de données ?
4. Si tu ajoutes un nouveau type d'erreur, combien de fichiers dois-tu modifier ?

> Ces quatre douleurs ont chacune une réponse dans cette phase. Garde tes réponses — elles te serviront de motivation pendant les exercices.
> 

```
commit suggestion → refactor(kata): analyse du code naïde de la phase 1
```

---

## Étape 2 — Value Objects Java : les branded types du back

### Contexte

En phase 1, tous les identifiants sont des `UUID` bruts. Rien n'empêche de passer un `userId` là où un `kataId` est attendu — le compilateur Java ne voit que deux `UUID`. C'est exactement le problème que les branded types TS ont résolu en phase 2. Les Value Objects Java sont la même solution.

### Exercice 2.1 — Crée KataId

**Objectif** : créer `src/main/java/dev/katasensei/kata/domain/KataId.java`.

**Contraintes :**

- C'est un **record Java** : `record KataId(UUID value)`
- Une méthode factory statique `of(String s)` qui parse un UUID depuis une string
- Une méthode factory statique `generate()` qui crée un nouveau KataId aléatoire
- La classe est dans le package `domain` — elle ne dépend de rien d'autre

**Question de réflexion** : pourquoi un record plutôt qu'une classe normale ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    package dev.katasensei.kata.domain;
    
    import java.util.UUID;
    
    public record KataId(UUID value) {
    
        public static KataId of(String s) {
            return new KataId(UUID.fromString(s));
        }
    
        public static KataId generate() {
            return new KataId(UUID.randomUUID());
        }
    
        @Override
        public String toString() {
            return value.toString();
        }
    }
    ```
    
    **Réponse** : un record Java est immutable par défaut, génère automatiquement `equals()`, `hashCode()` et `toString()`. C'est l'équivalent d'une interface TypeScript en lecture seule — précisément ce qu'on veut pour un Value Object qui ne doit jamais changer après création.
    

---

### Exercice 2.2 — Crée UserId et Email

**Objectif** : créer `UserId` et `Email` sur le même modèle, mais `Email` avec validation.

**Contraintes pour `Email` :**

- Le constructeur valide que la string contient bien `@` — sinon lève une `InvalidEmailException`
- `InvalidEmailException` étend `DomainException` (créée en phase 1)
- Une méthode `domain()` qui retourne la partie après le `@`

**Écris d'abord le test :**

```java
@Test
void should_throwException_when_emailIsInvalid() {
    assertThatThrownBy(() -> new Email("pasunemail"))
        .isInstanceOf(InvalidEmailException.class);
}

@Test
void should_returnDomain_when_emailIsValid() {
    var email = new Email("alice@katasensei.dev");
    assertThat(email.domain()).isEqualTo("katasensei.dev");
}
```

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public record UserId(UUID value) {
        public static UserId of(String s) { return new UserId(UUID.fromString(s)); }
        public static UserId generate()   { return new UserId(UUID.randomUUID()); }
    }
    ```
    
    ```java
    public class InvalidEmailException extends DomainException {
        public InvalidEmailException(String email) {
            super("Email invalide : " + email);
        }
    }
    ```
    
    ```java
    public record Email(String value) {
    
        public Email {
            if (!value.contains("@")) {
                throw new InvalidEmailException(value);
            }
        }
    
        public String domain() {
            return value.substring(value.indexOf('@') + 1);
        }
    }
    ```
    
    > **Note** : le bloc `public Email { }` sans parenthèses est le **compact constructor** des records Java 16+. Il s'exécute à la création et peut valider les paramètres avant qu'ils soient assignés.
    > 

---

### Exercice 2.3 — Mets à jour Kata et KataService

**Objectif** : remplacer les `UUID` bruts par les Value Objects dans `Kata.java` et `KataService.java`.

**Contraintes :**

- `Kata.getId()` retourne `KataId`, pas `UUID`
- `KataService.findById(KataId id)` prend un `KataId`, pas un `UUID`
- Le contrôleur extrait le `KataId` depuis le `@PathVariable` String
- `mvn test` doit rester vert — les tests existants guident le refactoring

**Lance `mvn compile`** après chaque changement — le compilateur te dit exactement où les types ne correspondent plus. C'est le compilateur qui guide le refactoring, exactement comme `tsc --noEmit` en TypeScript.

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    // Dans KataController
    @GetMapping("/{id}")
    public KataDto findById(@PathVariable String id) {
        return kataService.findById(KataId.of(id));
        // KataId.of() lève une exception si l'UUID est malformé
        // — GlobalExceptionHandler la catchera automatiquement
    }
    ```
    
    ```java
    // Dans KataService
    public KataDto findById(KataId id) {
        return kataRepository.findById(id.value())
            .map(this::toDto)
            .orElseThrow(() -> new KataNotFoundException(id));
    }
    ```
    

```
commit suggestion → refactor(kata): remplacement UUID bruts par Value Objects KataId UserId Email
```

---

## Étape 3 — SOLID dans KataSensei : pas dans un livre

### Contexte

SOLID c'est 5 principes. On va les voir sur du vrai code de KataSensei — mauvaise version d'abord, version corrigée ensuite. Le diff est la leçon.

### Exercice 3.1 — S : Single Responsibility

**Observe ce code :** Imagine que `KataService` gérait aussi l'envoi d'un email de confirmation à chaque nouveau kata créé.

**Question** : combien de raisons de changer aurait `KataService` ? Nomme-les.

**Exercice** : si tu devais ajouter "envoyer un email quand un kata est créé", comment l'organiserais-tu pour que `KataService` ne sache pas que les emails existent ?

**Indice** : pense aux Spring Events de la phase 5 — mais pour l'instant une simple interface `KataEventPublisher` suffit.

- Réponse et solution
    
    **Réponse** : `KataService` aurait deux raisons de changer : 1) la logique métier des katas change, 2) la façon d'envoyer les emails change. Deux raisons = violation de S.
    
    **Solution** : extraire la notification dans un port sortant.
    
    ```java
    // Port sortant — dans domain/
    public interface KataEventPublisher {
        void publishKataCreated(KataId kataId, String title);
    }
    ```
    
    ```java
    // KataService reçoit le publisher par injection
    // Il publie un événement — il ne sait pas ce qui se passe ensuite
    public KataDto create(CreateKataRequest request) {
        var kata = new Kata(request.title(), request.description(), request.difficulty());
        var saved = kataRepository.save(kata);
        eventPublisher.publishKataCreated(saved.getId(), saved.getTitle());
        return toDto(saved);
    }
    ```
    
    `KataService` a maintenant une seule raison de changer : la logique métier des katas.
    

---

### Exercice 3.2 — O : Open/Closed

**Scénario** : tu dois ajouter un niveau de difficulté `EXPERT` à KataSensei, avec un score bonus de x2.

**Observe ce code problématique :**

```java
public int calculateScore(Kata kata, int baseScore) {
    if (kata.getDifficulty() == Difficulty.EASY)   return baseScore;
    if (kata.getDifficulty() == Difficulty.MEDIUM) return baseScore * 2;
    if (kata.getDifficulty() == Difficulty.HARD)   return baseScore * 3;
    throw new IllegalArgumentException("Difficulty inconnue");
}
```

**Question** : que faut-il modifier pour ajouter `EXPERT` ? Combien de fichiers ?

**Exercice** : réécris ce calcul pour qu'ajouter `EXPERT` ne nécessite de modifier **aucune classe existante**.

**Indice** : l'enum `Difficulty` peut avoir des méthodes.

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    public enum Difficulty {
        EASY(1), MEDIUM(2), HARD(3), EXPERT(5);
    
        private final int multiplier;
    
        Difficulty(int multiplier) {
            this.multiplier = multiplier;
        }
    
        public int applyTo(int baseScore) {
            return baseScore * multiplier;
        }
    }
    ```
    
    ```java
    // KataScorer devient trivial — et n'a plus besoin de changer pour EXPERT
    public int calculateScore(Kata kata, int baseScore) {
        return kata.getDifficulty().applyTo(baseScore);
    }
    ```
    
    Ajouter `EXPERT(5)` dans l'enum n'ouvre aucun autre fichier. C'est le principe O.
    

---

### Exercice 3.3 — L, I, D en contexte KataSensei

**Liskov (L)** — Lis ce code :

```java
public interface AiSensei {
    Hint generateHint(KataId kataId, String code, int hintsAlreadyUsed);
}
```

**Question** : `ClaudeAiSensei` et `MockAiSensei` doivent tous les deux implémenter cette interface. Qu'est-ce que ça garantit pour le code qui appelle `AiSensei` ?

**Interface Segregation (I)** — Observe :

```java
// Mauvaise version
public interface AiService {
    Hint generateHint(KataId kataId, String code, int hintsUsed);
    CodeReview reviewCode(String code, String language);
    String translateKata(String description, String targetLanguage);
}
```

**Question** : qu'est-ce qui ne va pas ? Réécris en 3 interfaces séparées.

**Dependency Inversion (D)** — C'est le plus important.

**Exercice** : dessine sur papier (ou en texte) le graphe de dépendances entre `KataController`, `KataService`, `KataRepository` (interface), et `JpaKataRepository` (implémentation). Qui dépend de qui ? Quelle est la règle ?

- Réponses
    
    **Liskov** : `ClaudeAiSensei` et `MockAiSensei` sont **substituables** — le code qui appelle `AiSensei` n'a pas besoin de savoir lequel il utilise. En test on injecte `MockAiSensei`, en prod `ClaudeAiSensei`. Comportement identique du point de vue de l'appelant.
    
    **Interface Segregation** :
    
    ```java
    public interface AiSensei      { Hint generateHint(...); }
    public interface CodeReviewer  { CodeReview reviewCode(...); }
    public interface KataTranslator { String translateKata(...); }
    ```
    
    Un use case qui n'a besoin que de hints ne dépend pas de `translateKata`.
    
    **Dependency Inversion** :
    
    ```
    KataController → KataService → KataRepository (interface)
                                          ↑
                                  JpaKataRepository (implémentation)
    ```
    
    La règle : les modules de haut niveau (Service) ne dépendent pas des modules de bas niveau (JPA). Les deux dépendent d'une abstraction (l'interface). C'est le principe D — et c'est exactement la règle de dépendance de l'archi hexagonale.
    

```
commit suggestion → docs(kata): documentation principes SOLID appliqués au projet
```

---

## Étape 4 — Spring Security + JWT

### Contexte

Un token JWT c'est un objet JSON signé avec une clé secrète. Le front Vue l'obtient à la connexion et l'envoie dans chaque requête via `Authorization: Bearer <token>`. Spring intercepte chaque requête, vérifie la signature, et peuple le contexte de sécurité — tout ça avant que ton code métier ne soit appelé.

### Exercice 4.1 — Ajoute les dépendances JWT

**Objectif** : ajouter la librairie `jjwt` dans `pom.xml`.

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.6</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
```

Ajoute aussi dans `application.yml` :

```yaml
app:
  jwt:
    secret: ${JWT_SECRET}
    expiration-ms: 86400000  # 24 heures
```

---

### Exercice 4.2 — Crée JwtService (🔴 RED d'abord)

**Objectif** : écrire les tests avant d'implémenter.

**Tests à écrire :**

```java
@Test
void should_generateToken_and_extractUserId() {
    var userId = UserId.generate();
    var token = jwtService.generateToken(userId);
    assertThat(jwtService.extractUserId(token)).isEqualTo(userId);
}

@Test
void should_returnFalse_when_tokenIsExpired() {
    // Comment tester un token expiré sans attendre 24h ?
    // Indice : injecte un service avec une expiration de -1ms
}
```

**Question de réflexion** : comment tester qu'un token est expiré sans attendre 24 heures ?

**Puis implémente `JwtService`** avec :

- `generateToken(UserId userId): String`
- `extractUserId(String token): UserId`
- `isTokenValid(String token): boolean`
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @Service
    public class JwtService {
    
        private final SecretKey secretKey;
        private final long expirationMs;
    
        public JwtService(
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-ms}") long expirationMs
        ) {
            this.secretKey   = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            this.expirationMs = expirationMs;
        }
    
        public String generateToken(UserId userId) {
            return Jwts.builder()
                .subject(userId.value().toString())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(secretKey)
                .compact();
        }
    
        public UserId extractUserId(String token) {
            var subject = parseClaims(token).getSubject();
            return UserId.of(subject);
        }
    
        public boolean isTokenValid(String token) {
            try {
                parseClaims(token);
                return true;
            } catch (JwtException e) {
                return false;
            }
        }
    
        private Claims parseClaims(String token) {
            return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        }
    }
    ```
    
    **Réponse sur les tokens expirés** : passe `expirationMs = -1` au constructeur dans le test — le token sera créé déjà expiré. C'est pourquoi l'injection par constructeur est indispensable : ça permet de contrôler le comportement dans les tests.
    

---

### Exercice 4.3 — Filtre JWT + configuration Spring Security (🔴 RED)

**Tests à écrire d'abord :**

```java
@Test
void should_return401_when_noTokenProvided() throws Exception {
    mockMvc.perform(get("/katas"))
        .andExpect(status().isUnauthorized());
}

@Test
void should_return200_when_validTokenProvided() throws Exception {
    var token = jwtService.generateToken(UserId.generate());

    mockMvc.perform(get("/katas")
            .header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());
}
```

**Lance les tests** — ils échouent car Spring Security n'est pas configuré. 🔴

**Puis crée :**

1. `JwtAuthenticationFilter extends OncePerRequestFilter` — extrait le token du header, valide, peuple `SecurityContextHolder`
2. `SecurityConfig` — configure les routes publiques (`/auth/**`) et protégées (tout le reste)
- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    @Component
    public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
        private final JwtService jwtService;
    
        public JwtAuthenticationFilter(JwtService jwtService) {
            this.jwtService = jwtService;
        }
    
        @Override
        protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
        ) throws ServletException, IOException {
    
            var header = request.getHeader("Authorization");
    
            if (header == null || !header.startsWith("Bearer ")) {
                chain.doFilter(request, response);
                return;
            }
    
            var token = header.substring(7);
    
            if (jwtService.isTokenValid(token)) {
                var userId = jwtService.extractUserId(token);
                var auth = new UsernamePasswordAuthenticationToken(
                    userId, null, List.of()
                );
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
    
            chain.doFilter(request, response);
        }
    }
    ```
    
    ```java
    @Configuration
    @EnableWebSecurity
    public class SecurityConfig {
    
        private final JwtAuthenticationFilter jwtFilter;
    
        public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
            this.jwtFilter = jwtFilter;
        }
    
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            return http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/auth/**", "/actuator/health").permitAll()
                    .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
        }
    
        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }
    }
    ```
    

---

### Exercice 4.4 — Endpoints d'auth : POST /auth/register et POST /auth/login

**Crée en TDD :**

1. `UserEntity` (entité JPA) avec `id` (UserId), `email` (Email), `passwordHash` (String)
2. Migration Flyway `V2__create_user_table.sql`
3. `AuthController` avec `POST /auth/register` et `POST /auth/login`
4. `AuthService` avec `register(RegisterRequest)` et `login(LoginRequest): String` (retourne le JWT)

**Tests minimaux à écrire d'abord :**

```java
@Test
void should_return201_when_registrationIsValid()

@Test
void should_return400_when_emailAlreadyExists()

@Test
void should_returnToken_when_credentialsAreCorrect()

@Test
void should_return401_when_passwordIsWrong()
```

- Solution migration SQL — ouvre seulement si bloquée après 20 min
    
    ```sql
    CREATE TABLE app_user (
        id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
        email         VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at    TIMESTAMP    NOT NULL DEFAULT now()
    );
    ```
    
    > **Pourquoi `app_user` et pas `user` ?** `user` est un mot réservé en SQL. Ce genre de piège classique mérite d'être dans tes notes.
    > 
- Solution AuthService — ouvre seulement si bloquée après 20 min
    
    ```java
    @Service
    public class AuthService {
    
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;
    
        // injection par constructeur
    
        public void register(RegisterRequest request) {
            var email = new Email(request.email()); // validation via Value Object
            if (userRepository.existsByEmail(email.value())) {
                throw new EmailAlreadyExistsException(email);
            }
            var hash = passwordEncoder.encode(request.password());
            userRepository.save(new UserEntity(UserId.generate(), email.value(), hash));
        }
    
        public String login(LoginRequest request) {
            var user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new InvalidCredentialsException());
    
            if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
                throw new InvalidCredentialsException();
            }
    
            return jwtService.generateToken(UserId.of(user.getId().toString()));
        }
    }
    ```
    
    > **Sécurité** : `InvalidCredentialsException` est la même exception pour "email inconnu" et "mauvais mot de passe". On ne donne jamais à un attaquant l'information que l'email existe.
    > 

```
commit suggestion → feat(auth): ajout JwtService avec tests token génération et validation
```

```
commit suggestion → feat(secu): configuration Spring Security JWT stateless
```

```
commit suggestion → feat(auth): ajout endpoints POST /auth/register et POST /auth/login
```

---

## Étape 5 — Gestion d'erreurs exhaustive : AppError côté back

### Exercice 5.1 — Enrichis la hiérarchie d'exceptions

**Objectif** : créer toutes les exceptions domaine de KataSensei.

**Contraintes :**

- Toutes étendent `DomainException` (phase 1)
- `KataNotFoundException(KataId id)` — déjà créée
- `EmailAlreadyExistsException(Email email)`
- `InvalidCredentialsException()` — message générique volontairement vague
- `InvalidEmailException(String email)` — déjà créée
- `UnauthorizedException(String action)` — pour les actions non permises

**Puis** : mets à jour `GlobalExceptionHandler` pour gérer chacune.

**Question de réflexion** : combien de fichiers modifies-tu pour ajouter un nouveau type d'erreur ?

- Solution GlobalExceptionHandler enrichi — ouvre seulement si bloquée après 20 min
    
    ```java
    @ExceptionHandler(EmailAlreadyExistsException.class)
    ProblemDetail handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        var problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.CONFLICT, ex.getMessage()
        );
        problem.setTitle("Email already exists");
        problem.setType(URI.create("https://katasensei.dev/errors/email-conflict"));
        return problem;
    }
    
    @ExceptionHandler(InvalidCredentialsException.class)
    ProblemDetail handleInvalidCredentials(InvalidCredentialsException ex) {
        var problem = ProblemDetail.forStatus(HttpStatus.UNAUTHORIZED);
        problem.setTitle("Invalid credentials");
        problem.setType(URI.create("https://katasensei.dev/errors/invalid-credentials"));
        return problem;
    }
    
    @ExceptionHandler(InvalidEmailException.class)
    ProblemDetail handleInvalidEmail(InvalidEmailException ex) {
        var problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.BAD_REQUEST, ex.getMessage()
        );
        problem.setTitle("Invalid email format");
        problem.setType(URI.create("https://katasensei.dev/errors/invalid-email"));
        return problem;
    }
    ```
    
    **Réponse** : exactement **2 fichiers** — l'exception elle-même + un `@ExceptionHandler` dans `GlobalExceptionHandler`. Le front Vue ne change pas, il reçoit toujours du Problem Details RFC 7807.
    

---

### Exercice 5.2 — Mirror côté front : compléter AppError TS

**Objectif** : mettre à jour `src/domain/types/errors.ts` pour ajouter les erreurs liées à l'auth.

**Contraintes :**

- Ajouter `ConflictError : { kind: 'conflict'; resource: string }`
- Mettre à jour `toUserMessage` pour couvrir le nouveau cas
- Mettre à jour `isAppError` dans `guards.ts`
- Mettre à jour `ApiKataRepository` pour mapper les 401 vers `UnauthorizedError`

**Question de réflexion** : que se passe-t-il si tu oublies de gérer `ConflictError` dans `toUserMessage` ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```tsx
    export type ConflictError = { kind: 'conflict'; resource: string }
    
    export type AppError =
      | NetworkError | NotFoundError | ValidationError
      | UnauthorizedError | ConflictError | UnexpectedError
    
    export function toUserMessage(error: AppError): string {
      switch (error.kind) {
        case 'network':      return 'Problème de connexion.'
        case 'not-found':   return `${error.resource} introuvable.`
        case 'validation':  return 'Certains champs sont invalides.'
        case 'unauthorized': return 'Tu dois être connecté.'
        case 'conflict':    return `${error.resource} existe déjà.`
        case 'unexpected':  return 'Une erreur inattendue est survenue.'
        // Si tu oublies 'conflict', TypeScript affiche une erreur ici
        // car le type de retour ne couvre pas tous les cas
      }
    }
    ```
    
    **Réponse** : TypeScript détecte l'oubli ! La fonction déclare `string` comme type de retour. Si un cas du switch n'est pas couvert, TS signale que la fonction peut retourner `undefined` — incompatible avec `string`. Le compilateur est ton filet de sécurité.
    

```
commit suggestion → refactor(erreur): enrichissement GlobalExceptionHandler et AppError TS
```

---

## Étape 6 — Bean Validation avancée

### Exercice 6.1 — Crée RegisterRequest et LoginRequest

**Objectif** : créer les DTOs de requête avec validation Bean Validation.

**Contraintes pour `RegisterRequest` :**

- `email` : `@Email` (annotation Jakarta) + `@NotBlank`
- `password` : `@NotBlank` + `@Size(min = 8, message = "...")`
- `confirmPassword` : `@NotBlank`
- Une annotation custom `@PasswordsMatch` au niveau de la classe (voir indice)

**Indice pour `@PasswordsMatch`** : une contrainte de classe-level (`@Target(TYPE)`) qui vérifie que `password` et `confirmPassword` sont identiques.

**Question de réflexion** : pourquoi une annotation class-level plutôt qu'une vérification dans le service ?

- Solution — ouvre seulement si bloquée après 20 min
    
    ```java
    // L'annotation
    @Target({ElementType.TYPE})
    @Retention(RetentionPolicy.RUNTIME)
    @Constraint(validatedBy = PasswordsMatchValidator.class)
    public @interface PasswordsMatch {
        String message() default "Les mots de passe ne correspondent pas";
        Class<?>[] groups() default {};
        Class<? extends Payload>[] payload() default {};
    }
    ```
    
    ```java
    // Le validator
    public class PasswordsMatchValidator
        implements ConstraintValidator<PasswordsMatch, RegisterRequest> {
    
        @Override
        public boolean isValid(RegisterRequest req, ConstraintValidatorContext ctx) {
            if (req.password() == null || req.confirmPassword() == null) return true;
            return req.password().equals(req.confirmPassword());
        }
    }
    ```
    
    ```java
    @PasswordsMatch
    public record RegisterRequest(
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, message = "8 caractères minimum") String password,
        @NotBlank String confirmPassword
    ) {}
    ```
    
    **Réponse** : une annotation class-level est déclarative et réutilisable. Si tu mets la vérification dans le service, tu dois écrire le message d'erreur et le format de réponse à la main. Bean Validation le fait pour toi et l'intègre au Problem Details automatiquement.
    

```
commit suggestion → feat(auth): ajout annotation @PasswordsMatch et RegisterRequest
```

---

## Étape 7 — Grand refactoring du back phase 1

### Exercice 7.1 — Remplace tous les UUID bruts

**Objectif** : scanner tout le code du back et remplacer chaque `UUID` brut par le bon Value Object.

**Méthode :**

1. Dans IntelliJ : `Edit > Find > Find in Files` → cherche `UUID` dans `src/main/java`
2. Pour chaque occurrence : est-ce un id de kata ? → `KataId`. D'utilisateur ? → `UserId`
3. `mvn compile` après chaque remplacement — le compilateur guide
4. `mvn test` à la fin — aucun test ne doit casser

**C'est le refactoring guidé par les types.** Le compilateur Java se comporte exactement comme `tsc --noEmit` côté TypeScript.

### Exercice 7.2 — Vérifie SOLID dans chaque classe

**Objectif** : passer en revue chaque classe de service et répondre :

| Classe | S : une seule responsabilité ? | D : dépend d'interfaces ? |
| --- | --- | --- |
| `KataService` |  |  |
| `AuthService` |  |  |
| `JwtService` |  |  |
| `GlobalExceptionHandler` |  |  |

Si une réponse est non : refactorise et documente le changement dans un commentaire `// SOLID: S - extraction de X`.

```
commit suggestion → refactor(back): grand refactoring UUID vers Value Objects tests verts
```

---

## Étape 8 — ADR 004

### Exercice 8.1 — Documente les décisions d'auth et de Value Objects

**Objectif** : créer `docs/adr/004-auth-jwt-value-objects.md`.

**Format attendu :**

```
# ADR 004 — Auth JWT et Value Objects
## Date
## Statut
## Contexte
## Décisions
  ### JWT sans session serveur
  ### Value Objects plutôt qu'UUID bruts
  ### jjwt comme librairie JWT
## Conséquences
## Alternatives rejetées
```

C'est ton document — écris-le avec tes propres mots.

```
commit suggestion → docs(adr): ajout ADR 004 auth JWT et Value Objects
```

> Copie ce fichier dans `docs/adr/004-auth-jwt-value-objects.md` de ton projet GitLab avant de committer.
> 

---

## Checklist finale phase 3

- [ ]  `KataId`, `UserId`, `Email` créés avec tests
- [ ]  `Kata.java` et `KataService.java` utilisent les Value Objects
- [ ]  `mvn compile` passe après chaque remplacement de UUID
- [ ]  SOLID documenté avec exemples dans le code (commentaires ou ADR)
- [ ]  `JwtService` avec tests (dont token expiré)
- [ ]  `JwtAuthenticationFilter` + `SecurityConfig`
- [ ]  Test `should_return401_when_noTokenProvided` vert
- [ ]  Test `should_return200_when_validTokenProvided` vert
- [ ]  `POST /auth/register` en TDD
- [ ]  `POST /auth/login` en TDD
- [ ]  Migration `V2__create_user_table.sql`
- [ ]  `EmailAlreadyExistsException`, `InvalidCredentialsException` dans `GlobalExceptionHandler`
- [ ]  `AppError` TS mise à jour avec `ConflictError`
- [ ]  `toUserMessage` exhaustif (compilateur vérifie)
- [ ]  `@PasswordsMatch` annotation custom
- [ ]  Grand refactoring UUID → Value Objects, tous tests verts
- [ ]  SOLID checklist complète
- [ ]  ADR 004 commité
- [ ]  Frontend Vue envoie le token JWT dans les headers
- [ ]  CI verte

---

## Erreurs fréquentes et solutions

| Erreur | Cause probable | Solution |
| --- | --- | --- |
| `Cannot construct instance of 'KataId'` | Jackson ne sait pas désérialiser un record custom | Ajoute `@JsonCreator` sur le constructeur ou utilise un `@PathVariable String` converti manuellement |
| `401` sur toutes les routes même /auth | Routes publiques mal configurées | Vérifie `requestMatchers("/auth/**").permitAll()` AVANT `.anyRequest().authenticated()` |
| `403` au lieu de `401` | CSRF activé | Ajoute `.csrf(AbstractHttpConfigurer::disable)` — on est en stateless JWT |
| `SignatureException` | Clé JWT différente entre génération et validation | La clé vient de `${JWT_SECRET}` — vérifie que `.env` est chargé |
| Tests `@WebMvcTest` échouent avec Spring Security | Security non bypassée dans les tests | Ajoute `@WithMockUser` ou configure un `TestSecurityConfig` |
| `Table app_user doesn't exist` | Migration Flyway non exécutée | Vérifie que le nom du fichier respecte la convention `V2__` (double underscore) |

---

## Ce que tu sais faire après cette phase

- Créer des Value Objects Java (records) qui mirroient les branded types TS
- Appliquer les 5 principes SOLID sur du vrai code, avec exemples concrets
- Configurer Spring Security avec JWT en stateless
- Écrire un filtre HTTP personnalisé (`OncePerRequestFilter`)
- Créer des endpoints d'authentification sécurisés en TDD
- Créer des annotations Bean Validation custom (`@PasswordsMatch`)
- Enrichir `GlobalExceptionHandler` pour chaque nouveau type d'erreur
- Refactoriser du code guidée par le compilateur Java
- Maintenir l'exhaustivité des erreurs côté TS avec le pattern `never`

> **À retenir** : les Value Objects Java et les branded types TS sont le même concept dans deux langages. SOLID et l'archi hexagonale se renforcent mutuellement — D (Dependency Inversion) *est* la règle de dépendance de l'hexagonale. Tu arrives en phase 4 avec tous les concepts théoriques vécus dans du vrai code.
> 

```
commit suggestion → feat(auth): intégration JWT côté front Vue envoi header Authorization
```