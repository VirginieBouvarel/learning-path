const resources = [
  {"title": "@vue/test-utils", "category": "Frontend", "description": "Utilitaires de tests pour composants Vue", "href": "https://test-utils.vuejs.org/", "phase": "Phase 2", "type": "Documentation"},
  {"title": "A Philosophy of Software Design — John Ousterhout", "category": "Architecture", "description": "Alternative moderne a Clean Code", "href": "", "phase": "Toutes", "type": "Livre"},
  {"title": "AssertJ", "category": "Backend", "description": "Assertions fluides pour Java", "href": "https://assertj.github.io/doc/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Baeldung", "category": "Backend", "description": "Tutoriels Java et Spring de qualite", "href": "https://www.baeldung.com/", "phase": "Toutes", "type": "Documentation"},
  {"title": "Bruno", "category": "Outils", "description": "Client HTTP open source", "href": "https://docs.usebruno.com/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Bucket4j", "category": "Backend", "description": "Rate limiting Java", "href": "https://bucket4j.com/", "phase": "Phase 3", "type": "Documentation"},
  {"title": "Claude API (Anthropic)", "category": "API externe", "description": "API IA pour les indices socratiques", "href": "https://docs.anthropic.com/", "phase": "Phase 4", "type": "Documentation"},
  {"title": "Clean Code — Robert C. Martin", "category": "Architecture", "description": "SOLID et bonnes pratiques de code", "href": "", "phase": "Toutes", "type": "Livre"},
  {"title": "Coding Dojo", "category": "Katas", "description": "Catalogue de katas classiques", "href": "https://codingdojo.org/kata/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Dave Farley’s Weblog", "category": "Infrastructure", "description": "Articles et retours d experience sur continuous delivery et software engineering", "href": "https://www.davefarley.net/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Conventional Commits", "category": "Outils", "description": "Specification des messages de commit", "href": "https://www.conventionalcommits.org/fr/v1.0.0/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Conventional Commits KataSensei", "category": "Guide interne", "description": "Guide KataSensei — exemples de commits en francais", "href": "guides/conventional-commits.html", "phase": "Toutes", "type": "Guide KS"},
  {"title": "Cyber-Dojo", "category": "Katas", "description": "Katas en TDD directement dans le navigateur", "href": "https://cyber-dojo.org/", "phase": "Toutes", "type": "Ressource"},
  {"title": "DataGrip", "category": "Outils", "description": "Client base de donnees integre IntelliJ", "href": "https://www.jetbrains.com/help/datagrip/getting-started.html", "phase": "Phase 1", "type": "Documentation"},
  {"title": "DDD & Clean Architecture (Khalil)", "category": "Architecture", "description": "DDD applique en TypeScript et Java", "href": "https://khalilstemmler.com/", "phase": "Phase 2", "type": "Ressource"},
  {"title": "Designing Data-Intensive Applications — Martin Kleppmann", "category": "Architecture", "description": "Pour la v2 — architecture distribuee", "href": "", "phase": "Toutes", "type": "Livre"},
  {"title": "Docker", "category": "Infrastructure", "description": "Documentation officielle Docker", "href": "https://docs.docker.com/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Docker multi-stage builds", "category": "Infrastructure", "description": "Optimisation images Docker avec le multi-stage", "href": "https://docs.docker.com/build/building/multi-stage/", "phase": "Phase 7", "type": "Documentation"},
  {"title": "Exercism", "category": "Katas", "description": "Katas avec mentoring", "href": "https://exercism.org/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Fireship", "category": "Frontend", "description": "Explications rapides Vue et TypeScript", "href": "https://www.youtube.com/@Fireship", "phase": "Toutes", "type": "Youtube"},
  {"title": "Fly.io", "category": "Infrastructure", "description": "Hebergement et deploiement", "href": "https://fly.io/docs/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Flyway", "category": "Backend", "description": "Migrations SQL versionnees", "href": "https://flywaydb.org/documentation/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Galileo AI", "category": "Outils", "description": "Générateur de maquettes Figma depuis un prompt", "href": "https://www.usegalileo.ai/", "phase": "Toutes", "type": "Ressource"},
  {"title": "GitHub Actions docs", "category": "Infrastructure", "description": "Documentation officielle GitHub Actions", "href": "https://docs.github.com/fr/actions", "phase": "Phase 7", "type": "Documentation"},
  {"title": "GitLab", "category": "Infrastructure", "description": "Documentation GitLab", "href": "https://docs.gitlab.com/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Hexagonal Architecture (Cockburn)", "category": "Architecture", "description": "Article fondateur de l architecture hexagonale", "href": "https://alistair.cockburn.us/hexagonal-architecture/", "phase": "Phase 4", "type": "Ressource"},
  {"title": "IntelliJ IDEA", "category": "Outils", "description": "Documentation IDE", "href": "https://www.jetbrains.com/help/idea/getting-started.html", "phase": "Phase 0", "type": "Documentation"},
  {"title": "jjwt", "category": "Backend", "description": "Librairie JWT pour Java", "href": "https://github.com/jwtk/jjwt", "phase": "Phase 3", "type": "Documentation"},
  {"title": "JUnit 5", "category": "Backend", "description": "Framework de tests Java", "href": "https://junit.org/junit5/docs/current/user-guide/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Kata.log", "category": "Katas", "description": "Catalogue de katas de code", "href": "https://kata-log.rocks/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Lydia Hallie — JavaScript Visualized", "category": "Frontend", "description": "Articles visuels sur JavaScript et TypeScript", "href": "https://dev.to/lydiahallie", "phase": "Phase 2", "type": "Ressource"},
  {"title": "Maven docs", "category": "Backend", "description": "Documentation officielle Maven", "href": "https://maven.apache.org/guides/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Mockito", "category": "Backend", "description": "Mocks et stubs pour Java", "href": "https://javadoc.io/doc/org.mockito/mockito-core/latest/index.html", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Oh My ZsH", "category": "Outils", "description": "Framework ZSH", "href": "https://ohmyz.sh/", "phase": "Toutes", "type": "Documentation"},
  {"title": "OpenAPI 3", "category": "Backend", "description": "Specification contrat API", "href": "https://spec.openapis.org/oas/v3.0.3", "phase": "Phase 6", "type": "Documentation"},
  {"title": "openapi-generator (TypeScript Axios)", "category": "Frontend", "description": "Generateur de client TypeScript depuis spec OpenAPI", "href": "https://openapi-generator.tech/docs/generators/typescript-axios", "phase": "Phase 6", "type": "Documentation"},
  {"title": "Optional en Java — guide interne", "category": "Guide interne", "description": "Guide KataSensei — methodes utilisees dans le projet", "href": "guides/optional-java.html", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Optional Java", "category": "Backend", "description": "Javadoc officielle Optional Java 21", "href": "https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html", "phase": "Phase 1", "type": "Guide KS"},
  {"title": "OWASP Top 10", "category": "Securite", "description": "Les 10 vulnerabilites web les plus critiques", "href": "https://owasp.org/www-project-top-ten/", "phase": "Phase 3", "type": "Documentation"},
  {"title": "Patterns.dev (Addy Osmani)", "category": "Frontend", "description": "Design patterns modernes JavaScript et Vue", "href": "https://www.patterns.dev/", "phase": "Phase 2", "type": "Ressource"},
  {"title": "Pinia", "category": "Frontend", "description": "Store officiel Vue 3", "href": "https://pinia.vuejs.org/", "phase": "Phase 2", "type": "Documentation"},
  {"title": "Piston API", "category": "API externe", "description": "Execution de code en sandbox", "href": "https://github.com/engineer-man/piston", "phase": "Phase 4", "type": "Documentation"},
  {"title": "Playwright", "category": "Frontend", "description": "Tests end-to-end", "href": "https://playwright.dev/", "phase": "Phase 6", "type": "Documentation"},
  {"title": "Powerlevel10k", "category": "Infrastructure", "description": "Theme ZSH recommande pour le terminal", "href": "https://github.com/romkatv/powerlevel10k", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Problem Details RFC 7807", "category": "Backend", "description": "Standard HTTP pour les erreurs API", "href": "https://www.rfc-editor.org/rfc/rfc7807", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Redis docs", "category": "Infrastructure", "description": "Documentation officielle Redis", "href": "https://redis.io/docs/", "phase": "Phase 5", "type": "Documentation"},
  {"title": "Refactoring Guru", "category": "Architecture", "description": "Catalogue des design patterns avec exemples", "href": "https://refactoring.guru/fr/design-patterns", "phase": "Phase 4", "type": "Ressource"},
  {"title": "SDKMAN", "category": "Infrastructure", "description": "Gestionnaire de versions Java", "href": "https://sdkman.io/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Sentry (Spring Boot)", "category": "Backend", "description": "Monitoring et suivi d erreurs en production", "href": "https://docs.sentry.io/platforms/java/guides/spring-boot/", "phase": "Phase 6", "type": "Documentation"},
  {"title": "Server-Sent Events (MDN)", "category": "Backend", "description": "Reference MDN sur les SSE", "href": "https://developer.mozilla.org/fr/docs/Web/API/Server-sent_events", "phase": "Phase 5", "type": "Documentation"},
  {"title": "shadcn-vue", "category": "Frontend", "description": "Composants Vue non-opinionnaires copiables dans le projet", "href": "https://www.shadcn-vue.com/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Software Crafters Lyon", "category": "Guide interne", "description": "Communaute Software Crafters Lyon", "href": "https://www.softwarecrafters.org/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Spring Actuator docs", "category": "Backend", "description": "Metriques et health checks Spring Boot", "href": "https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html", "phase": "Phase 7", "type": "Documentation"},
  {"title": "Spring Boot 3", "category": "Backend", "description": "Documentation officielle Spring Boot", "href": "https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Spring Cache docs", "category": "Backend", "description": "Documentation Spring Cache (@Cacheable, @CacheEvict)", "href": "https://docs.spring.io/spring-framework/reference/integration/cache.html", "phase": "Phase 5", "type": "Documentation"},
  {"title": "Spring Data JPA", "category": "Backend", "description": "ORM et repositories Spring", "href": "https://docs.spring.io/spring-data/jpa/docs/current/reference/html/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Spring Events docs", "category": "Backend", "description": "Documentation Spring Events (Observer pattern)", "href": "https://docs.spring.io/spring-framework/reference/core/beans/context-introduction.html", "phase": "Phase 5", "type": "Documentation"},
  {"title": "Spring Initializr", "category": "Backend", "description": "Generateur de projet Spring Boot", "href": "https://start.spring.io/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Spring Security", "category": "Backend", "description": "Documentation Spring Security", "href": "https://docs.spring.io/spring-security/reference/", "phase": "Phase 3", "type": "Documentation"},
  {"title": "Stylelint", "category": "Frontend", "description": "Linter CSS — détecte les erreurs de style dans les SFC Vue", "href": "https://stylelint.io/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "stylelint-config-recommended-vue", "category": "Frontend", "description": "Config Stylelint pour les fichiers .vue", "href": "https://github.com/ota-meshi/stylelint-config-recommended-vue", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Test-Driven Development: By Example — Kent Beck", "category": "Architecture", "description": "La bible du TDD", "href": "", "phase": "Toutes", "type": "Livre"},
  {"title": "Testcontainers", "category": "Backend", "description": "Vraie DB dans les tests d integration", "href": "https://testcontainers.com/guides/getting-started-with-testcontainers-for-java/", "phase": "Phase 6", "type": "Documentation"},
  {"title": "Theo — t3.gg", "category": "Frontend", "description": "TypeScript avance et ecosystem moderne", "href": "https://www.youtube.com/@t3dotgg", "phase": "Toutes", "type": "Youtube"},
  {"title": "Total TypeScript (Matt Pocock)", "category": "Frontend", "description": "Masterclass TypeScript avance", "href": "https://www.totaltypescript.com/", "phase": "Phase 2", "type": "Ressource"},
  {"title": "Trivy — scan Docker", "category": "Securite", "description": "Scan de vulnerabilites sur les images Docker", "href": "https://aquasecurity.github.io/trivy/", "phase": "Phase 7", "type": "Documentation"},
  {"title": "TypeScript", "category": "Frontend", "description": "Documentation officielle TypeScript", "href": "https://www.typescriptlang.org/docs/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "TypeScript Deep Dive (Basarat)", "category": "Frontend", "description": "Reference approfondie TypeScript — gratuite en ligne", "href": "https://basarat.gitbook.io/typescript/", "phase": "Phase 2", "type": "Ressource"},
  {"title": "Uizard", "category": "Outils", "description": "Générateur de maquettes Figma depuis un prompt — plan gratuit disponible", "href": "https://uizard.io/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Utiliser DataGrip dans KataSensei", "category": "Guide interne", "description": "Guide KataSensei — connexion et requetes", "href": "guides/datagrip.html", "phase": "Phase 1", "type": "Guide KS"},
  {"title": "v0.dev (Vercel)", "category": "Outils", "description": "Générateur de composants shadcn depuis un prompt — référence visuelle pour les composants Vue", "href": "https://v0.dev/", "phase": "Toutes", "type": "Ressource"},
  {"title": "Vaughn Vernon — Implementing DDD", "category": "Architecture", "description": "Le livre de reference DDD", "href": "https://www.pearson.com/store/p/implementing-domain-driven-design/P200000009616", "phase": "Phase 4", "type": "Livre"},
  {"title": "Vite", "category": "Frontend", "description": "Build tool et dev server", "href": "https://vitejs.dev/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Vitest", "category": "Frontend", "description": "Framework de tests unitaires Vue", "href": "https://vitest.dev/", "phase": "Phase 1", "type": "Documentation"},
  {"title": "Vue 3", "category": "Frontend", "description": "Documentation officielle Vue 3", "href": "https://vuejs.org/guide/introduction.html", "phase": "Phase 0", "type": "Documentation"},
  {"title": "Vue Router", "category": "Frontend", "description": "Routeur officiel Vue 3", "href": "https://router.vuejs.org/", "phase": "Phase 0", "type": "Documentation"},
  {"title": "WSL2", "category": "Infrastructure", "description": "Linux sous Windows", "href": "https://docs.microsoft.com/fr-fr/windows/wsl/install", "phase": "Phase 0", "type": "Documentation"}
];

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function slugify(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapeHTML(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getLearningCategory(resource) {
  const title = normalize(resource.title);
  const description = normalize(resource.description);
  const sourceCategory = normalize(resource.category);
  const text = `${title} ${description} ${sourceCategory} ${normalize(resource.type)}`;

  if (
    text.includes("problem details")
    || text.includes("erreur")
    || text.includes("sentry")
    || text.includes("owasp")
    || text.includes("trivy")
    || text.includes("vulnerabil")
    || sourceCategory === "securite"
  ) {
    return "Erreurs";
  }

  if (
    text.includes("tdd")
    || sourceCategory === "katas"
    || ["assertj", "junit 5", "mockito", "vitest", "@vue/test-utils", "playwright", "testcontainers"].some(keyword => title.includes(keyword))
  ) {
    return "TDD";
  }

  if (
    text.includes("hexagonal")
    || text.includes("clean architecture")
    || text.includes("ports & adapters")
  ) {
    return "Archi hexagonale";
  }

  if (
    text.includes("ddd")
    || text.includes("ubiquitous")
    || text.includes("aggregate")
    || text.includes("domain-driven")
  ) {
    return "Domaine / DDD";
  }

  if (
    text.includes("pattern")
    || text.includes("observer")
    || text.includes("decorator")
    || text.includes("strategy")
    || text.includes("factory")
    || text.includes("builder")
  ) {
    return "Design patterns";
  }

  if (
    title.includes("clean code")
    || title.includes("refactoring guru")
    || title.includes("philosophy of software design")
  ) {
    return "Refactoring";
  }

  if (
    title.includes("typescript")
    || title.includes("optional")
    || title.includes("lydia hallie")
    || title.includes("theo")
    || title.includes("total typescript")
  ) {
    return "Typage fort";
  }

  if (
    sourceCategory === "infrastructure"
    || sourceCategory === "outils"
    || title.includes("docker")
    || title.includes("github actions")
    || title.includes("gitlab")
    || title.includes("fly.io")
    || title.includes("sdkman")
    || title.includes("wsl2")
    || title.includes("powerlevel10k")
    || title.includes("datagrip")
    || title.includes("intellij")
    || title.includes("conventional commits")
  ) {
    return "CI/CD & Ops";
  }

  if (
    sourceCategory === "frontend"
    || text.includes("vue")
    || text.includes("pinia")
    || text.includes("vite")
    || text.includes("router")
    || text.includes("shadcn")
    || text.includes("stylelint")
  ) {
    return "Front / UI";
  }

  if (sourceCategory === "architecture") {
    return "Archi hexagonale";
  }

  if (sourceCategory === "backend" || sourceCategory === "api externe") {
    return "Archi hexagonale";
  }

  return "CI/CD & Ops";
}

function buildResourceCard(resource) {
  const isExternal = resource.href.startsWith("http");
  const phaseClass = `resource-badge--phase-${slugify(resource.phase)}`;
  const learningCategory = getLearningCategory(resource);
  const action = resource.href
    ? `<a class="resource-card__link" href="${escapeHTML(resource.href)}"${isExternal ? ' target="_blank" rel="noopener"' : ""}>${isExternal ? "Ouvrir la ressource" : "Ouvrir la page du site"}</a>`
    : '<span class="resource-card__link resource-card__link--disabled">Lien à ajouter</span>';

  return `
    <article class="resource-card" data-resource-card data-category="${slugify(learningCategory)}" data-phase="${slugify(resource.phase)}" data-type="${slugify(resource.type)}" data-search="${escapeHTML(normalize(resource.title))}">
      <div class="resource-card__meta">
        <span class="resource-badge resource-badge--category">${escapeHTML(learningCategory)}</span>
        <span class="resource-badge resource-badge--phase ${phaseClass}">${escapeHTML(resource.phase)}</span>
        <span class="resource-badge resource-badge--type">${escapeHTML(resource.type)}</span>
      </div>
      <h2 class="resource-card__title">${escapeHTML(resource.title)}</h2>
      <p class="resource-card__description">${escapeHTML(resource.description)}</p>
      ${action}
    </article>
  `;
}

function updateQueryString(filters) {
  const params = new URLSearchParams();
  if (filters.search) params.set("q", filters.search);
  if (filters.kind === "category") params.set("category", filters.value);
  if (filters.kind === "phase") params.set("phase", filters.value);
  if (filters.kind === "type") params.set("type", filters.value);
  const next = params.toString();
  const target = next ? `?${next}` : window.location.pathname.split("/").pop();
  window.history.replaceState({}, "", target);
}

function matchesFilter(card, filter) {
  if (filter.kind === "all") return true;
  if (filter.kind === "category") return card.dataset.category === slugify(filter.value);
  if (filter.kind === "phase") return card.dataset.phase === slugify(filter.value);
  if (filter.kind === "type") return card.dataset.type === slugify(filter.value);
  return true;
}

function labelFromParams(params) {
  if (params.get("phase")) return { kind: "phase", value: params.get("phase"), label: `Ressources — ${params.get("phase")}` };
  if (params.get("category")) {
    const raw = params.get("category");
    return { kind: "category", value: raw, label: `Ressources — ${raw === "Securite" ? "Sécurité" : raw}` };
  }
  if (params.get("type")) {
    const raw = params.get("type");
    return { kind: "type", value: raw, label: raw === "Guide KS" ? "Ressources — Guides internes" : `Ressources — ${raw}` };
  }
  return { kind: "all", value: "all", label: "Toutes les ressources" };
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("resources-search");
  const filterButtons = Array.from(document.querySelectorAll("[data-filter-kind]"));
  const grid = document.getElementById("resources-grid");
  const count = document.getElementById("resources-count");
  const catalogTitle = document.getElementById("resources-catalog-title");
  const empty = document.getElementById("resources-empty");

  if (!grid) return;

  grid.innerHTML = resources.map(buildResourceCard).join("");

  const cards = Array.from(grid.querySelectorAll("[data-resource-card]"));
  const params = new URLSearchParams(window.location.search);
  const initialSearch = params.get("q");

  if (searchInput && initialSearch) searchInput.value = initialSearch;

  let activeFilter = labelFromParams(params);

  function syncActiveButton() {
    filterButtons.forEach(button => {
      const isActive = button.dataset.filterKind === activeFilter.kind && button.dataset.filterValue === activeFilter.value;
      button.classList.toggle("is-active", isActive);
    });
  }

  function applyFilters() {
    const searchValue = searchInput ? searchInput.value.trim() : "";
    const search = normalize(searchValue);

    let visibleCount = 0;

    cards.forEach(card => {
      const filterMatch = matchesFilter(card, activeFilter);
      const searchMatch = !search || card.dataset.search.includes(search);
      const isVisible = filterMatch && searchMatch;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    catalogTitle.textContent = activeFilter.label;
    count.textContent = `${visibleCount} ressource${visibleCount > 1 ? "s" : ""}`;
    empty.classList.toggle("visible", visibleCount === 0);
    updateQueryString({
      search: searchValue,
      kind: activeFilter.kind,
      value: activeFilter.value
    });
    syncActiveButton();
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = {
        kind: button.dataset.filterKind,
        value: button.dataset.filterValue,
        label: button.dataset.filterLabel
      };
      applyFilters();
    });
  });

  const selectedButton = filterButtons.find(button =>
    button.dataset.filterKind === activeFilter.kind && button.dataset.filterValue === activeFilter.value
  );
  if (selectedButton) {
    activeFilter.label = selectedButton.dataset.filterLabel;
  } else {
    activeFilter = { kind: "all", value: "all", label: "Toutes les ressources" };
  }

  applyFilters();
});
