const INTERNAL_GUIDES = [
  { id: "ubiquitous-language", title: "Ubiquitous Language — ADR 000", path: "guides/ubiquitous-language.html" },
  { id: "conventions-front", title: "Conventions front — ADR 003", path: "guides/conventions-front.html" },
  { id: "conventional-commits", title: "Conventional Commits", path: "guides/conventional-commits.html" },
  { id: "arborescence", title: "Arborescence et testabilité", path: "guides/arborescence.html" },
  { id: "workflow-gitlab", title: "Workflow GitLab", path: "guides/workflow-gitlab.html" },
  { id: "utiliser-claude", title: "Utiliser Claude", path: "guides/utiliser-claude.html" },
  { id: "optional-java", title: "Optional en Java", path: "guides/optional-java.html" },
  { id: "datagrip", title: "DataGrip", path: "guides/datagrip.html" },
  { id: "checklist-securite", title: "Checklist sécurité", path: "guides/checklist-securite.html" }
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
      ${guide.title}
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

async function loadGuide(selectedId) {
  const content = document.getElementById("guides-content");
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
    content.innerHTML = "";
    content.appendChild(fragment);
    buildToc(content);
    buildSidebar(guide.id);
    updateQueryString(guide.id);
    document.title = `${guide.title} — KataSensei`;
  } catch (error) {
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
