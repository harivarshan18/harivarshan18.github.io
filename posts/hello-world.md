*This is a sample note to show how posts work. Replace it with your own writing, or delete it and remove its entry from `assets/js/content.js`.*

Most of my projects look different on the surface: PET scans, thyroid CT, Fitbit heart rate, and driving sensors. The common thread is that a model trained on data from one scanner, device, or site often loses accuracy on data from another.

## What harmonization means here

Given data $x$ from a source domain and a target domain, the goal is a mapping $f$ such that $f(x)$ looks like it came from the target domain, while the information we care about (a lesion, a heart-rate pattern) is preserved:

$$
\min_f \; \mathcal{L}_{\text{domain}}(f(x)) + \lambda \, \mathcal{L}_{\text{content}}(f(x), x)
$$

## Writing a note

1. Add a Markdown file to `posts/`, for example `posts/my-new-note.md`.
2. Add an entry to `posts` in `assets/js/content.js` with the same slug.
3. Commit and push. The note appears on the home page.

Markdown supports headings, lists, links, images, code blocks, and math with `$...$` and `$$...$$`.
