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

### One-time setup

1. Push to `main` once so the workflow creates the `gh-pages` branch (or re-run **Deploy GitHub Pages** in Actions).
2. Open [Settings → Pages](https://github.com/kyle-ip/build-your-own-board-game/settings/pages).
3. **Build and deployment → Source**: choose **Deploy from a branch**.
4. **Branch**: `gh-pages` · **Folder**: `/ (root)` · Save.

Do not pick **GitHub Actions** as the source. This repo publishes by pushing built files to the `gh-pages` branch.

### Automatic deploy

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml): build `site/`, then push `site/dist` to `gh-pages`.

Vite `base` is set from `GITHUB_REPOSITORY`, so asset paths work on `https://<user>.github.io/<repo>/`.

## Site map

- Home
- Tutorial (`/handbook`) - how to use the Skill, with expandable sample prompts
- Install

## License

MIT for this guide site.
