/**
 * KataSensei Learning Path — Navigation
 * Injecte la nav dans toutes les pages, gère dropdowns, hamburger, page active.
 *
 * Les liens sont calculés relativement à la racine du site pour fonctionner
 * aussi bien avec Live Server qu'avec WAMP.
 */

/**
 * Retourne le préfixe racine selon la profondeur de la page courante.
 * - pages à la racine (index.html, ressources.html) → ""
 * - pages dans un sous-dossier (phases/, references/) → "../"
 */
function getRootPrefix() {
  const depth = window.location.pathname.split('/').filter(Boolean).length;
  // Sous Live Server : /index.html → depth 1, /phases/phase-0.html → depth 2
  // Sous WAMP /perso/learning-path/ : index.html → depth 3, phases/ → depth 4
  // On détecte le sous-dossier en regardant si le dernier segment non-fichier
  // est phases/ ou references/
  const path = window.location.pathname;
  if (path.includes('/phases/') || path.includes('/references/')) {
    return '../';
  }
  return '';
}

function buildNavHTML(r) {
  return `
<nav class="site-nav" id="site-nav">
  <a href="${r}index.html" class="site-nav__brand">KataSensei</a>
  <button class="site-nav__hamburger" id="hamburger" aria-label="Menu">☰</button>
  <ul class="site-nav__links" id="nav-links">
    <li><a href="${r}index.html" class="site-nav__link" data-page="index">Parcours</a></li>
    <li class="site-nav__dropdown" id="dropdown-phases">
      <a class="site-nav__link site-nav__dropdown-trigger" data-page="phases">Phases</a>
      <ul class="site-nav__dropdown-menu">
        <li><a href="${r}phases/phase-0.html">Phase 0 — Setup</a></li>
        <li><a href="${r}phases/phase-1.html">Phase 1 — HTTP + REST</a></li>
        <li><a href="${r}phases/phase-2.html">Phase 2 — Typage fort TS</a></li>
        <li><a href="${r}phases/phase-3.html">Phase 3 — Auth JWT + SOLID</a></li>
        <li><a href="${r}phases/phase-4.html">Phase 4 — Hexagonale complète</a></li>
        <li><a href="${r}phases/phase-5.html">Phase 5 — Events + SSE + Redis</a></li>
        <li><a href="${r}phases/phase-6.html">Phase 6 — OpenAPI + Tests avancés</a></li>
        <li><a href="${r}phases/phase-7.html">Phase 7 — CI/CD + Prod</a></li>
      </ul>
    </li>
    <li class="site-nav__dropdown" id="dropdown-refs">
      <a class="site-nav__link site-nav__dropdown-trigger" data-page="references">Références</a>
      <ul class="site-nav__dropdown-menu">
        <li><a href="${r}references/ubiquitous-language.html">Ubiquitous Language — ADR 000</a></li>
        <li><a href="${r}references/conventions-front.html">Conventions front — ADR 003</a></li>
        <li><a href="${r}references/conventional-commits.html">Conventional Commits</a></li>
        <li><a href="${r}references/arborescence.html">Arborescence et testabilité</a></li>
        <li><a href="${r}references/workflow-gitlab.html">Workflow GitLab</a></li>
        <li><a href="${r}references/utiliser-claude.html">Utiliser Claude</a></li>
        <li><a href="${r}references/optional-java.html">Optional en Java</a></li>
        <li><a href="${r}references/datagrip.html">DataGrip</a></li>
        <li><a href="${r}references/checklist-securite.html">Checklist sécurité</a></li>
      </ul>
    </li>
    <li><a href="${r}ressources.html" class="site-nav__link" data-page="ressources">Ressources</a></li>
  </ul>
</nav>
`;
}

/**
 * Injecte la nav en haut du body
 */
function injectNav() {
  const r = getRootPrefix();
  const nav = document.createElement('div');
  nav.innerHTML = buildNavHTML(r);
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
    if (page === 'index' && (path.endsWith('index.html') || path.endsWith('/') || path === '')) {
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
      document.querySelectorAll('.site-nav__dropdown.open').forEach(d => d.classList.remove('open'));
      if (!isOpen) dropdown.classList.add('open');
    });
  });

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
