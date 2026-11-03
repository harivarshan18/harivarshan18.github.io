(function () {
  const $ = (s) => document.querySelector(s);
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;
      else if (v !== undefined && v !== null && v !== false) n.setAttribute(k, v === true ? "" : v);
    }
    for (const k of kids.flat()) if (k) n.append(k);
    return n;
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Header ---------- */
  document.title = SITE.name;
  $("#name").textContent = SITE.name;
  if (SITE.photo) $("#portrait").src = SITE.photo; else $("#portrait").remove();
  SITE.status.forEach((s) => $("#status").append(el("li", { text: s })));

  const L = SITE.links;
  const svg = (d, vb = "0 0 24 24", fill = false) =>
    `<svg viewBox="${vb}" aria-hidden="true" ${fill ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
  const ICONS = {
    email: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>'),
    cv: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
    github: svg('<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>', "0 0 16 16", true),
    linkedin: svg('<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16"/>'),
    scholar: svg('<path d="M2 9.5 12 4l10 5.5L12 15z"/><path d="M6 11.7V16c0 1.3 2.7 3 6 3s6-1.7 6-3v-4.3"/>'),
    orcid: svg('<circle cx="12" cy="12" r="9"/><path d="M9 10.5V16M9 8v.1M12.5 16V8h1.8a4 4 0 0 1 0 8z"/>'),
  };
  const linkDefs = [
    ["email", L.email, L.email && "mailto:" + L.email],
    ["linkedin", "LinkedIn", L.linkedin],
    ["github", "GitHub", L.github],
    ["scholar", "Google Scholar", L.scholar],
    ["orcid", "ORCID", L.orcid],
    ["cv", "Curriculum vitae", L.cv],
  ];
  linkDefs.filter(([, , href]) => href).forEach(([key, label, href]) => {
    const ext = /^https?:/.test(href);
    const a = el("a", { href, target: ext ? "_blank" : null, rel: ext ? "noopener" : null, html: ICONS[key] });
    a.append(el("span", { text: label }));
    $("#links").append(el("li", {}, a));
  });

  /* ---------- About ---------- */
  SITE.about.forEach((p) => $("#about-body").append(el("p", { text: p })));

  /* ---------- Filter buttons (shared) ---------- */
  function makeFilters(container, options, onChange) {
    let current = "all";
    const buttons = [["all", "All"], ...options].map(([key, label]) => {
      const b = el("button", { type: "button", "aria-pressed": key === "all" ? "true" : "false", text: label });
      b.addEventListener("click", () => {
        current = key;
        buttons.forEach((x) => x.setAttribute("aria-pressed", x === b ? "true" : "false"));
        onChange(current);
      });
      container.append(b);
      return b;
    });
    return () => current;
  }

  /* ---------- Research ---------- */
  const projItems = SITE.projects.map((p, i) => {
    const id = "proj-more-" + i;
    const hasMore = p.details || (p.links && p.links.length);
    const head = el("button", { class: "project-head", type: "button", "aria-expanded": "false", "aria-controls": hasMore ? id : null },
      el("h3", { text: p.title }),
      el("span", { class: "meta", text: p.status || "" }),
      el("p", { text: p.summary }),
      p.result ? el("p", { class: "result", text: p.result }) : null,
    );
    const more = el("div", { class: "project-more", id, hidden: true });
    if (p.details) more.append(el("p", { text: p.details }));
    if (p.links && p.links.length) {
      more.append(el("p", {}, ...p.links.flatMap((l, j) => [j ? ", " : "",el("a", { href: l.url, text: l.label })])));
    }
    const li = el("li", { "data-themes": p.themes.join(" ") }, head);
    if (hasMore) {
      li.append(more);
      head.addEventListener("click", () => {
        const open = head.getAttribute("aria-expanded") === "true";
        head.setAttribute("aria-expanded", String(!open));
        more.hidden = open;
      });
    } else {
      head.style.cursor = "default";
      head.removeAttribute("aria-expanded");
    }
    $("#projects").append(li);
    return li;
  });

  const usedThemes = Object.entries(SITE.themes).filter(([k]) => SITE.projects.some((p) => p.themes.includes(k)));
  makeFilters($("#theme-filters"), usedThemes, (key) => {
    projItems.forEach((li) => { li.hidden = key !== "all" && !li.dataset.themes.split(" ").includes(key); });
  });

  /* ---------- Publications ---------- */
  const TYPE_LABELS = { paper: "Papers", preprint: "Preprints", poster: "Posters", abstract: "Abstracts", talk: "Talks", tutorial: "Tutorials" };
  const pubs = [...SITE.publications].sort((a, b) => b.year - a.year);
  const usedTypes = Object.entries(TYPE_LABELS).filter(([k]) => pubs.some((p) => p.type === k));
  let typeFilter = "all";
  let query = "";

  function boldMe(authors) {
    const safe = esc(authors);
    return SITE.meName ? safe.split(esc(SITE.meName)).join("<strong>" + esc(SITE.meName) + "</strong>") : safe;
  }

  function pubNode(p, i) {
    const actions = el("div", { class: "pub-actions" });
    if (p.status) actions.append(el("span", { class: "tag", text: p.status }));
    const links = p.links || {};
    [["PDF", links.pdf], ["Code", links.code], ["DOI", links.doi && (links.doi.startsWith("http") ? links.doi : "https://doi.org/" + links.doi)], ["Slides", links.slides], ["Poster", links.poster]]
      .filter(([, h]) => h)
      .forEach(([label, href]) => actions.append(el("a", { href, text: label, target: "_blank", rel: "noopener" })));

    const panels = [];
    function toggle(label, buildPanel) {
      const id = `pub-${i}-${label.toLowerCase()}`;
      const btn = el("button", { type: "button", "aria-expanded": "false", "aria-controls": id, text: label });
      const panel = buildPanel(id);
      btn.addEventListener("click", () => {
        const open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!open));
        panel.hidden = open;
      });
      actions.append(btn);
      panels.push(panel);
    }
    if (p.abstract) toggle("Abstract", (id) => el("div", { class: "pub-panel", id, hidden: true }, el("p", { text: p.abstract })));
    if (p.bibtex) toggle("BibTeX", (id) => {
      const copy = el("button", { type: "button", text: "Copy BibTeX" });
      copy.addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(p.bibtex); copy.textContent = "Copied"; }
        catch { copy.textContent = "Select and copy the text above"; }
        setTimeout(() => (copy.textContent = "Copy BibTeX"), 2000);
      });
      return el("div", { class: "pub-panel pub-actions", id, hidden: true }, el("pre", { text: p.bibtex }), copy);
    });

    return el("li", { class: "pub", "data-type": p.type },
      el("p", { class: "pub-title", text: p.title }),
      el("p", { class: "pub-authors", html: boldMe(p.authors) }),
      el("p", { class: "pub-venue", text: p.venue }),
      actions.childNodes.length ? actions : null,
      ...panels,
    );
  }

  function renderPubs() {
    const box = $("#pubs");
    box.textContent = "";
    const q = query.trim().toLowerCase();
    const shown = pubs.filter((p) =>
      (typeFilter === "all" || p.type === typeFilter) &&
      (!q || [p.title, p.authors, p.venue, p.year].join(" ").toLowerCase().includes(q)));
    if (!shown.length) {
      box.append(el("p", { class: "empty", text: q ? `No publications match "${query.trim()}". Try a different word or clear the search.` : "No publications of this type yet." }));
      return;
    }
    let year = null, list = null;
    shown.forEach((p) => {
      if (p.year !== year) {
        year = p.year;
        box.append(el("h3", { class: "pub-year", text: String(year) }));
        list = el("ul", { class: "pub-list" });
        box.append(list);
      }
      list.append(pubNode(p, pubs.indexOf(p)));
    });
  }

  if (!pubs.length) {
    $(".pub-controls").remove();
    $("#pubs").append(el("p", { class: "in-prep", text: SITE.inPreparation || "No publications yet." }));
  }
  if (pubs.length && usedTypes.length > 1) makeFilters($("#type-filters"), usedTypes, (k) => { typeFilter = k; renderPubs(); });
  if (pubs.length) {
    $("#pub-search").addEventListener("input", (e) => { query = e.target.value; renderPubs(); });
    renderPubs();
  }

  /* ---------- Notes ---------- */
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const posts = [...SITE.posts].sort((a, b) => b.date.localeCompare(a.date));
  if (!posts.length) $("#posts").append(el("li", { class: "empty", text: "No notes yet." }));
  posts.forEach((p) => $("#posts").append(el("li", {},
    el("a", { href: "post.html?p=" + encodeURIComponent(p.slug), text: p.title }),
    el("p", { class: "meta", text: fmtDate(p.date) }),
    p.summary ? el("p", { text: p.summary }) : null,
  )));

  /* ---------- Experience ---------- */
  const timeline = (sel, items) => (items || []).forEach((x) => $(sel).append(
    el("dt", { text: x.when }),
    el("dd", {}, el("span", { class: "exp-what", text: x.what }), x.detail ? el("span", { class: "exp-detail", text: x.detail }) : null),
  ));
  timeline("#exp", SITE.experience);
  timeline("#edu", SITE.education);
  timeline("#honors", SITE.honors);

  /* ---------- Footer ---------- */
  $("#updated").textContent = new Date(document.lastModified).toLocaleDateString("en-US", { year: "numeric", month: "long" });

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const sysDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => root.dataset.theme !== "light";
  const btn = $("#theme-toggle");
  const label = () => (btn.textContent = isDark() ? "Light mode" : "Dark mode");
  btn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    label();
    document.dispatchEvent(new Event("themechange"));
  });
  sysDark.addEventListener("change", label);
  label();

  /* ---------- Section highlight in the side nav ---------- */
  const navLinks = [...document.querySelectorAll(".toc a")];
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.forEach((a) => a.setAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id ? "true" : "false"));
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  document.querySelectorAll("#top, main section").forEach((s) => obs.observe(s));
})();
