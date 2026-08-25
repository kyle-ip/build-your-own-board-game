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

Live site (after deploy): **https://kyle-ip.github.io/build-your-own-board-game/**

### One-time setup

1. Open [Settings → Pages](https://github.com/kyle-ip/build-your-own-board-game/settings/pages).
2. Under **Build and deployment → Source**, choose **GitHub Actions**.

### Automatic deploy

Every push to `main` runs [.github/workflows/pages.yml](.github/workflows/pages.yml):

1. `npm ci` + `npm run build` in `site/` (Node 22)
2. Upload `site/dist` as a Pages artifact
3. Deploy via `actions/deploy-pages@v4`

You can also re-run the workflow manually from the **Actions** tab.

Vite `base` is set from `GITHUB_REPOSITORY`, so asset paths work on `https://<user>.github.io/<repo>/`.

## Site map

- Home
- Tutorial (`/handbook`) - how to use the Skill, with expandable sample prompts
- Install

## License

MIT for this guide site.
