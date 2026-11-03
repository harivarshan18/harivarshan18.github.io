# harivarshan.github.io

Personal research website. Plain HTML, CSS and JavaScript: no build step, GitHub Pages serves it as is.

## Editing content

Almost everything is in **`assets/js/content.js`**:

| To change | Edit |
|---|---|
| Name, tagline, status lines | `name`, `tagline`, `status` |
| Email, Scholar, LinkedIn, CV links | `links` (empty string hides a link) |
| About paragraphs | `about` |
| Research projects and filter themes | `projects`, `themes` |
| Papers, posters, abstracts, talks | `publications` |
| Experience list | `experience` |

Lines marked `TODO` are placeholders to check.

### Adding a publication

Add an object to `publications`. `type` is one of `paper`, `preprint`, `poster`, `abstract`, `talk`, `tutorial`. Filled-in `abstract` and `bibtex` fields get "Abstract" and "BibTeX" toggles automatically; `links.pdf`, `links.code`, `links.doi`, `links.slides`, `links.poster` become links. Put PDFs in `assets/papers/`.

### Writing a note

1. Create `posts/<slug>.md` (Markdown, with `$...$` / `$$...$$` math).
2. Add `{ slug, title, date: "YYYY-MM-DD", summary }` to `posts` in `content.js`.

### CV

Save it as `assets/cv.pdf`.

## Preview locally

```
python3 -m http.server
```

then open http://localhost:8000.

## Publishing

Push to `main`. In the repo's Settings → Pages, set the source to "Deploy from a branch", branch `main`, folder `/ (root)`. The site is live at https://harivarshan18.github.io a minute or two later.
