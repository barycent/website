# barycent.dev

The Barycent website and blog. A static site generator with **zero npm
dependencies** — Markdown parsing, frontmatter, and templating are all in
`scripts/`, in plain Node.

## Run it locally

```bash
npm run dev     # builds, serves on http://localhost:4000, rebuilds on save
# or
npm run build   # builds once into dist/
```

No `npm install` needed — there are no dependencies to install.

## Add a blog post

Create a file in `content/blog/`, named `YYYY-MM-DD-your-slug.md`:

```markdown
---
title: "Your post title"
date: 2026-11-20
author: "Your Name"
summary: "One sentence that shows up in the blog index and in link previews."
tags: [announcement]
---

Your post body in Markdown. Headings, **bold**, *italic*, `code`, fenced
code blocks, lists, blockquotes, tables, links, and images are all supported.
```

The URL slug comes from the filename (after the date prefix) unless you set
`slug:` explicitly in the frontmatter. Run `npm run dev` and it appears at
`/blog/your-slug/`, in the blog index, and in `/blog/rss.xml` automatically.

## Structure

```
content/blog/*.md     posts (frontmatter + Markdown)
scripts/
  markdown.mjs         Markdown → HTML
  frontmatter.mjs       --- key: value --- parser
  layout.mjs            shared <head>/header/footer shell
  pages/*.mjs            content for each static page (home, bary, …)
  build.mjs              ties it together: writes dist/, serves + watches
public/                  static assets (css, logos, favicons) copied as-is
dist/                    generated output (gitignored) — do not edit by hand
```

To add a new static page (not a blog post): create `scripts/pages/foo.mjs`
exporting a `fooContent()` function returning an HTML string, then call
`renderPage(...)` for it in `build.mjs` the same way the existing pages do.

## Deploying

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on
every push to `main`. `public/CNAME` points it at `barycent.dev` — update that
file (and the DNS record) if the domain changes.

To deploy elsewhere (Cloudflare Pages, Netlify, etc.) instead: point the host
at this folder with build command `node scripts/build.mjs` and output
directory `dist`.
