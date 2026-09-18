# sazidmahmud.bd

Personal website and portfolio of **Sazid Mahmud**.

🌐 **Website:** [sazidmahmud.bd](https://sazidmahmud.bd)

Built with [Hugo](https://gohugo.io/) and the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme, and deployed through Cloudflare.

## Stack

* **Hugo:** v0.154.2
* **Go:** v1.25.5
* **Theme:** PaperMod
* **Hosting:** Cloudflare
* **Domain:** sazidmahmud.bd

## Development

Clone the repository and start the local Hugo development server:

```bash
git clone https://github.com/schlafer/sazidmahmud.bd.git
cd sazidmahmud.bd

hugo server --disableFastRender
```

Hugo will start a local development server with live reload, allowing changes to the site to be previewed while editing.

## Deployment

This repository is connected directly to Cloudflare's Git integration.

The deployment workflow is intentionally simple:

```text
Edit website
     │
     ▼
Git commit
     │
     ▼
git push
     │
     ▼
GitHub
     │
     ▼
Cloudflare build
     │
     ▼
Hugo generates the site
     │
     ▼
Cloudflare deploys the new version
     │
     ▼
sazidmahmud.bd
```

Every push to the configured production branch triggers a new Cloudflare build and deployment. Cloudflare handles the build and deployment automatically, so there is no separate deployment command or manual upload step required.

For development branches, Cloudflare can also create preview deployments so changes can be tested before reaching production.

## Repository Structure

```text
.
├── archetypes/       # Hugo content templates
├── assets/            # CSS and other processed assets
├── content/           # Website content
├── layouts/           # Custom Hugo layouts
├── static/            # Static files
├── themes/
│   └── PaperMod/      # Hugo theme
├── hugo.yaml          # Hugo configuration
├── wrangler.toml      # Cloudflare configuration
└── README.md
```

## Content

Most of the website content lives under `content/`.

To create a new page:

```bash
hugo new content/<path>/index.md
```

Then run the local server:

```bash
hugo server --disableFastRender
```

Review the changes locally before committing them.

## Deployment Philosophy

There is deliberately no complicated CI/CD setup for this site.

**Git is the source of truth.**

If a change is ready to go live:

```bash
git add .
git commit -m "Update website"
git push
```

Cloudflare takes care of the rest.
