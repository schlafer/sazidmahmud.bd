# sazidmahmud.bd

Personal website and portfolio of Sazid Mahmud.

Live site: [sazidmahmud.bd](https://sazidmahmud.bd)

## Overview

A fast, minimalist personal site built with native Hugo layouts. No third-party themes, UI frameworks, or npm dependencies.

### Features

- Custom Hugo layouts with Hugo Pipes for CSS and JS bundling
- Light, dark, and system auto theme switcher with zero flash on load
- Responsive layout with clean system typography
- Client-side search, archives, and tag filtering
- Syntax-highlighted code blocks with copy buttons

## Local Development

Prerequisite: [Hugo Extended](https://gohugo.io/installation/) (v0.120+).

```bash
git clone https://github.com/schlafer/sazidmahmud.bd.git
cd sazidmahmud.bd

hugo server
```

Open `http://localhost:1313` in your browser.

## Structure

```text
.
├── assets/          # CSS and JS processed by Hugo Pipes
├── content/         # Markdown content (posts, projects, publications, resume)
├── layouts/         # Hugo HTML templates and partials
├── static/          # Static files (images, favicons, resume PDF)
├── hugo.yaml        # Site settings and navigation
└── wrangler.toml    # Cloudflare Pages configuration
```

## Adding Content

To create a new post:

```bash
hugo new content/posts/my-new-post/index.md
```

You can place images directly in the post folder (e.g. `content/posts/my-new-post/images/photo.jpg`). Markdown image links are resolved automatically during build.

## Deployment

The site deploys automatically through Cloudflare Pages whenever changes are pushed to `main`:

```bash
git push origin main
```
