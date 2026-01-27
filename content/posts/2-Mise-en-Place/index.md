---
layout: page
title: "Mise-en-place"
date: 2025-10-28
showAuthor: true
showDate: true
showReadingTime: true
showSummary: true
showComments: false
---

### Mise-en-place (MEEZ ahn plahs) - `mise`

The idea behind using it is to standardize development environment for everyone working in the team. Furthermore, we need different versions of tools with different projects. Mise takes care of that. 

Mise is a unified tool and task management solution that simplifies the process of installing and managing tools for different projects. It supports various backends for tool installation and allows users to define tasks with custom scripts.

It can be used in both local development environments and CI/CD pipelines, serving as a single source of truth for tool versions and task flows.

It serves as an excellent alternative to `make`, `tfenv`, `direnv`, and whatever-else-env.

Tired of writing boilerplate code to install necessary tools for pipelines? With `.mise.toml`, why not use `mise install` in pipelines too? Install mise in advance or use the Docker image `jdxcode/mise`.

There’s no need to track tool versions separately for development environments and CI anymore. You no longer need to remember to update tool versions in different places to prevent any issues. Mise serves as a single source of truth.

If you use a similar task flow in CI as you do locally, you can run the same mise tasks there too. If not, you can use [mise profiles](https://mise.jdx.dev/profiles.html) to define CI tasks. Bonus: you can easily use it locally to debug pipeline issues.

See the [docs](https://mise.jdx.dev/tips-and-tricks.html#ci-cd) for a GitHub Actions example.
###### Some tips

1. Place `.mise.toml` in the root of your Git repository to define tools and tasks for the entire repository.
2. If a repository contains several different projects (like a monorepo), keep common items (like pre-commit tools) in the root config and project-specific items in the project directories.
3. Use your own `~/.config/mise/config.toml` for personal automation tasks.

[Try it!](https://mise.jdx.dev/)
