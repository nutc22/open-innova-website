# daniele.nucciarelli.it

Personal portfolio and CV of **Daniele Nucciarelli** — physicist, cloud & ML engineer.

Built with [Hugo](https://gohugo.io), deployed to AWS S3 + CloudFront. Bilingual
(Italian / English), minimal vanilla JavaScript, no cookies, no trackers, no external
CDN, no npm.

Forked from [ulivs-app/open-innova-website](https://github.com/ulivs-app/open-innova-website)
(MIT-licensed Hugo template) to keep receiving upstream template improvements.

## Quick start

Prerequisites: **Hugo extended** v0.100+ (single binary, no Node.js required).

```bash
hugo server
# http://localhost:1313/    (IT)
# http://localhost:1313/en/ (EN)
```

Production build:

```bash
hugo --minify
# output in public/
```

## Structure

- `data/profile.yaml` — language-neutral identity (name, email, links)
- `data/cv/it.yaml`, `data/cv/en.yaml` — all site/CV content, single source of truth
- `layouts/` — templates: single-page home, `/cv` (A4 printable → PDF), `/trasparenza`
- `layouts/_default/cv.europass.xml` — Europass XML export, rendered from the same data
- `assets/css/style.css` — hand-written CSS, design tokens, light/dark via OS preference
- `scripts/deploy.sh` — build + S3 sync + CloudFront invalidation

## CV

The `/cv` page is an A4 sheet with print CSS: the "Stampa / Salva PDF" button uses the
browser's print dialog. A Europass-compatible XML export is available at
`/cv/cv-europass.xml` (and `/en/cv/cv-europass.xml`).

## Updating from upstream

```bash
git fetch upstream
git merge upstream/main   # review carefully: layouts and content are heavily customized
```

## License

Code is MIT (see LICENSE). Content (texts, CV data, images) © Daniele Nucciarelli,
all rights reserved.
