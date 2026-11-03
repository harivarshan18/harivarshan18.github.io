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
  $("#tagline").textContent = SITE.tagline;
  if (SITE.photo) $("#portrait").src = SITE.photo; else $("#portrait").remove();
  SITE.status.forEach((s) => $("#status").append(el("li", { text: s })));

  const L = SITE.links;
  const linkDefs = [
    ["CV", L.cv],
    ["Email", L.email && "mailto:" + L.email],
    ["GitHub", L.github],
    ["Google Scholar", L.scholar],
    ["LinkedIn", L.linkedin],
    ["ORCID", L.orcid],
  ];
  linkDefs.filter(([, href]) => href).forEach(([label, href]) => {
    const ext = /^https?:/.test(href);
    $("#links").append(el("a", { href, text: label, target: ext ? "_blank" : null, rel: ext ? "noopener" : null }));
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
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : sysDark.matches;
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
  document.querySelectorAll("main section").forEach((s) => obs.observe(s));
})();
