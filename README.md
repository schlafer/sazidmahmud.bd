# sazidmahmud.bd

Personal blog and engineering portfolio of **Sazid Mahmud**.

🌐 **Live Site:** [sazidmahmud.bd](https://sazidmahmud.bd)

---

## Overview

A bespoke, calm, and minimalist website built from scratch with native Hugo layouts. Designed with an autumn-warm, paper-like aesthetic featuring tactile light and dark modes, refined typography, and instant page loads with zero third-party theme dependencies.

### Aesthetic & Features
* **Warm Pressed Paper (Light Mode):** Soft oat-linen background (`#FBF9F4`), deep warm charcoal typography (`#242220`), and subtle autumn russet accents (`#C4622D`).
* **Charcoal Night Paper (Dark Mode):** Deep lampblack graphite background (`#161615`), soft ivory text (`#E8E4DC`), and gentle amber accents (`#E27A42`).
* **Instant Theme Switching:** Early-head resolution script guarantees zero theme flicker (FOUT) on direct URL access or hard refresh.
* **Apple-Refined Micro-Typography:** Clean system sans-serif hierarchy paired with Iosevka/SF Mono for technical accents, code blocks, dates, and reading times.
* **Pure Native Pipeline:** Built directly with Hugo Pipes (`resources.Concat`, `resources.Minify`, `resources.Fingerprint`). No Node.js, npm, or heavy framework dependencies.

---

## Stack

* **SSG:** [Hugo](https://gohugo.io/) (v0.165+ Extended)
* **Styling:** Semantic CSS Custom Properties & Hugo Pipes
* **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) via `wrangler.toml`
* **Domain:** sazidmahmud.bd

---

## Repository Structure

```text
.
├── assets/
│   ├── css/
│   │   ├── base.css          # Design tokens, reset, typography
│   │   ├── components.css    # Header, footer, hero, cards, navigation
│   │   ├── content.css       # Article typography, blockquotes, tables
│   │   └── syntax.css        # Light & dark Chroma code highlighting
│   └── js/
│       └── main.js           # Theme toggle & code copy buttons
├── content/
│   ├── posts/               # Essays & blog articles
│   ├── projects/            # Selected software & tooling projects
│   ├── publications/        # Academic papers & conference citations
│   ├── about/               # Background & personal bio
│   └── resume/              # Resume page with PDF viewer
├── layouts/
│   ├── _default/            # Base skeleton (baseof, list, single, page)
│   ├── index.html           # Front page layout (hero, writing, work)
│   ├── posts/               # Chronological blog list & single post view
│   ├── projects/            # Project cards grid & detail pages
│   ├── publications/        # Citation list with DOI / IEEE / PDF badges
│   ├── partials/            # Header, footer, head, social icons
│   └── shortcodes/          # Embedded PDF viewer with fallback
├── static/
│   ├── images/              # Profile portraits & graphics
│   ├── sazidmahmud.pdf      # Resume download
│   └── favicon*             # Multi-size favicons with cache-busting
├── tests/                   # Automated validation suite (E2E, tokens, links)
├── hugo.yaml                # Site configuration & menus
└── wrangler.toml            # Cloudflare Pages deployment configuration
```

---

## Local Development

Start the local Hugo development server with live reload:

```bash
git clone https://github.com/schlafer/sazidmahmud.bd.git
cd sazidmahmud.bd

hugo server --disableFastRender
```

Navigate to `http://localhost:1313/` to preview changes in real time.

---

## Testing & Verification

The repository includes a self-contained Python test suite validating design tokens, client interactions, responsive layouts, and link integrity:

```bash
# Run full test suite and verify zero broken links
python3 tests/verify_tokens.py
python3 tests/verify_js.py
python3 tests/verify_templates.py
python3 tests/verify_home.py
python3 tests/verify_blog.py
python3 tests/verify_sections.py
python3 tests/verify_fixes.py
python3 tests/verify_e2e.py
```

---

## Deployment

Connected directly to Cloudflare Pages via Git integration. Every push to the production branch triggers an automatic build (`hugo --minify`):

```text
Edit site → git commit → git push → Cloudflare build → sazidmahmud.bd
```
