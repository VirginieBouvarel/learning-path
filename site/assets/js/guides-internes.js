const INTERNAL_GUIDES = [
  { id: "ubiquitous-language", title: "Ubiquitous Language", menuTitle: "ADR 001 - Ubiquitous Language", path: "guides/ubiquitous-language.html", badge: { text: "Domaine / DDD", style: "background: var(--cat-ddd-bg); color: var(--cat-ddd);" }, adrCode: "ADR 001" },
  { id: "choix-technologiques", title: "Choix technologiques", menuTitle: "ADR 002 - Choix technologiques", path: "guides/choix-technologiques.html", badge: { text: "Phase 0", style: "background: var(--phase-0-bg); color: var(--phase-0);" }, adrCode: "ADR 002" },
  { id: "conventions-front", title: "Conventions front", menuTitle: "ADR 003 - Conventions front", path: "guides/conventions-front.html", badge: { text: "Front / UI", style: "background: var(--cat-front-bg); color: var(--cat-front);" }, adrCode: "ADR 003" },
  { id: "conventional-commits", title: "Conventional Commits", menuTitle: "Conventional Commits", path: "guides/conventional-commits.html", badge: { text: "Phase 0", style: "background: var(--phase-0-bg); color: var(--phase-0);" } },
  { id: "arborescence", title: "Arborescence et testabilité", menuTitle: "Arborescence et testabilité", path: "guides/arborescence.html", badge: { text: "Phase 4-7", style: "background: var(--phase-4-bg); color: var(--phase-4);" } },
  { id: "workflow-gitlab", title: "Workflow GitLab", menuTitle: "Workflow GitLab", path: "guides/workflow-gitlab.html", badge: { text: "Phase 0", style: "background: var(--phase-0-bg); color: var(--phase-0);" } },
  { id: "optional-java", title: "Optional en Java", menuTitle: "Optional en Java", path: "guides/optional-java.html", badge: { text: "Phase 1", style: "background: var(--phase-1-bg); color: var(--phase-1);" } },
  { id: "datagrip", title: "DataGrip", menuTitle: "DataGrip", path: "guides/datagrip.html", badge: { text: "Phase 1", style: "background: var(--phase-1-bg); color: var(--phase-1);" } },
  { id: "checklist-securite", title: "Checklist sécurité", menuTitle: "Checklist sécurité", path: "guides/checklist-securite.html", badge: { text: "Pré-prod", style: "background: var(--cat-errors-bg); color: var(--cat-errors);" } }
];

function getSelectedGuideId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || INTERNAL_GUIDES[0].id;
}

function updateQueryString(id) {
  const params = new URLSearchParams(window.location.search);
  params.set("page", id);
  const query = params.toString();
  window.history.replaceState({}, "", `guides-internes.html?${query}`);
}

function rewriteReferenceUrl(url) {
  if (!url || url.startsWith("http") || url.startsWith("mailto:") || url.startsWith("#")) return url;
  if (url.startsWith("../guides/")) {
    const page = url.split("/").pop().replace(".html", "");
    return `guides-internes.html?page=${page}`;
  }
  if (url.startsWith("../assets/")) return url.slice(3);
  if (url.startsWith("../phases/")) return url.slice(3);
  if (url.startsWith("../")) return url.slice(3);
  return url;
}

function buildSidebar(selectedId) {
  const nav = document.getElementById("guides-nav");
  if (!nav) return;
  nav.innerHTML = INTERNAL_GUIDES.map(guide => `
    <a href="guides-internes.html?page=${guide.id}" class="guides-nav__link${guide.id === selectedId ? " guides-nav__link--active" : ""}" data-guide-id="${guide.id}">
      ${guide.menuTitle || guide.title}
    </a>
  `).join("");
}

function rewriteLinks(container) {
  container.querySelectorAll("[href]").forEach(link => {
    link.setAttribute("href", rewriteReferenceUrl(link.getAttribute("href")));
  });
  container.querySelectorAll("[src]").forEach(node => {
    node.setAttribute("src", rewriteReferenceUrl(node.getAttribute("src")));
  });
}

function buildToc(container) {
  const tocList = document.getElementById("guides-toc-list");
  if (!tocList) return;

  const headings = Array.from(container.querySelectorAll("section[id]"))
    .map(section => {
      const heading = section.querySelector("h2, h3");
      if (!heading) return null;
      if (!heading.id) heading.id = section.id;
      return heading;
    })
    .filter(Boolean);

  tocList.innerHTML = headings.map(heading => `
    <li class="${heading.tagName === "H3" ? "toc__item--sub" : ""}">
      <a href="#${heading.id}">${heading.textContent.trim()}</a>
    </li>
  `).join("");
}

function applyGuideMetadata(container, guide) {
  const badge = container.querySelector(".guide-header__phase-badge");
  const title = container.querySelector(".guide-header__title");

  if (badge && guide.badge) {
    badge.textContent = guide.badge.text;
    if (guide.badge.style) badge.setAttribute("style", guide.badge.style);
  }

  if (title && guide.adrCode) {
    title.textContent = `${guide.adrCode} - ${guide.title}`;
  }
}

async function loadGuide(selectedId) {
  const content = document.getElementById("guides-content");
  const headerSlot = document.getElementById("guides-header-slot");
  if (!content) return;

  const guide = INTERNAL_GUIDES.find(item => item.id === selectedId) || INTERNAL_GUIDES[0];

  try {
    const response = await fetch(guide.path);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const main = doc.querySelector(".layout__main");
    if (!main) throw new Error("layout__main introuvable");

    const fragment = document.createElement("div");
    fragment.innerHTML = main.innerHTML;
    rewriteLinks(fragment);
    applyGuideMetadata(fragment, guide);
    const header = fragment.querySelector(".guide-header");
    if (header) header.remove();
    content.innerHTML = "";
    if (headerSlot) {
      headerSlot.innerHTML = "";
      if (header) headerSlot.appendChild(header);
    }
    while (fragment.firstChild) {
      content.appendChild(fragment.firstChild);
    }
    buildToc(content);
    buildSidebar(guide.id);
    updateQueryString(guide.id);
    document.title = `${guide.title} — KataSensei`;
  } catch (error) {
    if (headerSlot) headerSlot.innerHTML = "";
    content.innerHTML = `<div class="guides-content__empty">Impossible de charger ce guide interne.</div>`;
    const tocList = document.getElementById("guides-toc-list");
    if (tocList) tocList.innerHTML = "";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedId = getSelectedGuideId();
  buildSidebar(selectedId);
  loadGuide(selectedId);

  document.addEventListener("click", event => {
    const link = event.target.closest("[data-guide-id]");
    if (!link) return;
    event.preventDefault();
    loadGuide(link.dataset.guideId);
  });
});
