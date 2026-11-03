# harivarshan18.github.io

Personal research website. Plain HTML, CSS and JavaScript: no build step, GitHub Pages serves it as is.

## Editing content

Almost everything is in **`assets/js/content.js`**:

| To change | Edit |
|---|---|
| Name, photo, tagline, status lines | `name`, `photo`, `tagline`, `status` |
| Email, Scholar, LinkedIn, CV links | `links` (empty string hides a link) |
| About paragraphs | `about` |
| Research projects and filter themes | `projects`, `themes` |
| Papers, posters, abstracts, talks | `publications` |
| Experience, education, honors | `experience`, `education`, `honors` |

### Adding a publication

Add an object to `publications`. `type` is one of `paper`, `preprint`, `poster`, `abstract`, `talk`, `tutorial`. Filled-in `abstract` and `bibtex` fields get "Abstract" and "BibTeX" toggles automatically; `links.pdf`, `links.code`, `links.doi`, `links.slides`, `links.poster` become links. Put PDFs in `assets/papers/`.

### Writing a note

1. Create `posts/<slug>.md` (Markdown, with `$...$` / `$$...$$` math).
2. Add `{ slug, title, date: "YYYY-MM-DD", summary }` to `posts` in `content.js`.

### CV

Replace `assets/cv.pdf` with the new file (keep the same name).

## Preview locally

```
python3 -m http.server
```

then open http://localhost:8000.

## Publishing at https://harivarshan18.github.io/

GitHub serves a site at the root address only when the repository is named
`<username>.github.io`. Since the account is `harivarshan18`, the repo must be named
**`harivarshan18.github.io`**:

1. Repo → Settings → General → Repository name → `harivarshan18.github.io` → Rename.
2. Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Wait a minute or two, then open https://harivarshan18.github.io/.

All links in the site are relative, so nothing else needs to change.
