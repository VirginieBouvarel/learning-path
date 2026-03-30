/**
 * KataSensei Learning Path — Navigation
 * Injecte la nav dans toutes les pages, gère dropdowns, hamburger, page active.
 */

const NAV_HTML = `
<nav class="site-nav" id="site-nav">
  <a href="/perso/learning-path/index.html" class="site-nav__brand">KataSensei</a>
  <button class="site-nav__hamburger" id="hamburger" aria-label="Menu">☰</button>
  <ul class="site-nav__links" id="nav-links">
    <li><a href="/perso/learning-path/index.html" class="site-nav__link" data-page="index">Parcours</a></li>
    <li class="site-nav__dropdown" id="dropdown-phases">
      <a class="site-nav__link site-nav__dropdown-trigger" data-page="phases">Phases</a>
      <ul class="site-nav__dropdown-menu">
        <li><a href="/perso/learning-path/phases/phase-0.html">Phase 0 — Setup</a></li>
        <li><a href="/perso/learning-path/phases/phase-1.html">Phase 1 — HTTP + REST</a></li>
        <li><a href="/perso/learning-path/phases/phase-2.html">Phase 2 — Typage fort TS</a></li>
        <li><a href="/perso/learning-path/phases/phase-3.html">Phase 3 — Auth JWT + SOLID</a></li>
        <li><a href="/perso/learning-path/phases/phase-4.html">Phase 4 — Hexagonale complète</a></li>
        <li><a href="/perso/learning-path/phases/phase-5.html">Phase 5 — Events + SSE + Redis</a></li>
        <li><a href="/perso/learning-path/phases/phase-6.html">Phase 6 — OpenAPI + Tests avancés</a></li>
        <li><a href="/perso/learning-path/phases/phase-7.html">Phase 7 — CI/CD + Prod</a></li>
      </ul>
    </li>
    <li class="site-nav__dropdown" id="dropdown-refs">
      <a class="site-nav__link site-nav__dropdown-trigger" data-page="references">Références</a>
      <ul class="site-nav__dropdown-menu">
        <li><a href="/perso/learning-path/references/ubiquitous-language.html">Ubiquitous Language — ADR 000</a></li>
        <li><a href="/perso/learning-path/references/conventions-front.html">Conventions front — ADR 003</a></li>
        <li><a href="/perso/learning-path/references/conventional-commits.html">Conventional Commits</a></li>
        <li><a href="/perso/learning-path/references/arborescence.html">Arborescence et testabilité</a></li>
        <li><a href="/perso/learning-path/references/workflow-gitlab.html">Workflow GitLab</a></li>
        <li><a href="/perso/learning-path/references/utiliser-claude.html">Utiliser Claude</a></li>
        <li><a href="/perso/learning-path/references/optional-java.html">Optional en Java</a></li>
        <li><a href="/perso/learning-path/references/datagrip.html">DataGrip</a></li>
        <li><a href="/perso/learning-path/references/checklist-securite.html">Checklist sécurité</a></li>
      </ul>
    </li>
    <li><a href="/perso/learning-path/ressources.html" class="site-nav__link" data-page="ressources">Ressources</a></li>
  </ul>
</nav>
`;

/**
 * Injecte la nav en haut du body
 */
function injectNav() {
  const nav = document.createElement('div');
  nav.innerHTML = NAV_HTML;
  document.body.insertBefore(nav.firstElementChild, document.body.firstChild);
}

/**
 * Détermine la page active depuis l'URL et applique la classe --active
 */
function highlightActivePage() {
  const path = window.location.pathname;
  document.querySelectorAll('.site-nav__link[data-page]').forEach(link => {
    const page = link.dataset.page;
    let isActive = false;
    if (page === 'index' && (path.endsWith('index.html') || path.endsWith('learning-path/') || path.endsWith('learning-path'))) {
      isActive = true;
    } else if (page === 'phases' && path.includes('/phases/')) {
      isActive = true;
    } else if (page === 'references' && path.includes('/references/')) {
      isActive = true;
    } else if (page === 'ressources' && path.includes('ressources.html')) {
      isActive = true;
    }
    if (isActive) link.classList.add('site-nav__link--active');
  });
}

/**
 * Dropdowns : toggle au clic
 */
function initDropdowns() {
  document.querySelectorAll('.site-nav__dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.site-nav__dropdown-trigger');
    trigger.addEventListener('click', e => {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('open');
      // Fermer tous les autres
      document.querySelectorAll('.site-nav__dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

  // Fermer en cliquant ailleurs
  document.addEventListener('click', e => {
    if (!e.target.closest('.site-nav__dropdown')) {
      document.querySelectorAll('.site-nav__dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
}

/**
 * Hamburger mobile
 */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

/**
 * Init tout
 */
document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  highlightActivePage();
  initDropdowns();
  initHamburger();
});
