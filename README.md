# Board Game Design Guide

Introduction and usage tutorial for the [Board Game Design](https://github.com/kyle-ip/board-game-design) Agent Skill.

This repository is the **guide site only**. It does not vendor the skill itself.

## Local development

From the repo root:

```bash
cd site
npm install
npm run dev
```

Or from the repo root after `site/` dependencies are installed:

```bash
npm run dev
```

## Build

```bash
cd site
npm run build
npm run preview
```

## GitHub Pages

Live site: **https://kyle-ip.github.io/build-your-own-board-game/**

Push to `main` triggers the [Deploy GitHub Pages](.github/workflows/pages.yml) workflow. On first deploy, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** if it is not already selected.

The workflow builds `site/` and publishes `site/dist`. Vite `base` is set from `GITHUB_REPOSITORY` automatically.

## Site map

- Home
- Tutorial (`/handbook`) - how to use the Skill, with expandable sample prompts
- Install

## License

MIT for this guide site.
