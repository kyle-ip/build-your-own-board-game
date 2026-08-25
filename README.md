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

The workflow builds `site/` and pushes `site/dist` to the **`gh-pages`** branch. GitHub will not serve the site until you enable Pages once in the repo settings (the API currently reports Pages as **not configured**, which is why the URL returns 404).

### One-time setup (required)

1. Open **[Settings → Pages](https://github.com/kyle-ip/build-your-own-board-game/settings/pages)** for this repo.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
   - Do **not** choose **GitHub Actions** (that mode needs a different workflow).
3. **Branch**: `gh-pages` · **Folder**: `/ (root)` · click **Save**.
4. Wait 1–3 minutes. GitHub should show: *Your site is live at https://kyle-ip.github.io/build-your-own-board-game/*
5. Re-run **Deploy GitHub Pages** in the Actions tab if the banner does not appear.

### Automatic deploy

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml). If Pages is not enabled or points at the wrong branch, the workflow fails with an explicit error in the log.

Vite `base` is set from `GITHUB_REPOSITORY`, so asset paths work on `https://<user>.github.io/<repo>/`.

## Site map

- Home
- Tutorial (`/handbook`) - how to use the Skill, with expandable sample prompts
- Install

## License

MIT for this guide site.
