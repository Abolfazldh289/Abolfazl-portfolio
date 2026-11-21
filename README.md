# Abolfazl Portfolio

Bilingual (Persian/English) portfolio built with Next.js, TypeScript, React Three Fiber, Three.js and Motion.

## Deploy to GitHub Pages

This project is configured as a GitHub Pages **project site**. Create a public repository named exactly `abolfazl-portfolio`.

1. Upload the **contents** of this folder to the repository root (not the parent folder).
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Make sure the default branch is `main` and commit/push the files.
5. The workflow at `.github/workflows/deploy.yml` builds the static Next.js export and publishes it.
6. Your site URL will be `https://YOUR-GITHUB-USERNAME.github.io/abolfazl-portfolio/`.

If the repository has a different name, change `NEXT_PUBLIC_BASE_PATH` in the workflow to `/<repository-name>`.

## Run locally

```bash
npm install
npm run dev
```

## Notes

- GitHub Pages serves static files only. This build uses Next.js `output: 'export'`; server-only features and API routes are not supported.
- Next Image optimization is disabled for static hosting.
- Do not commit secrets or private environment files.

https://Abolfazldh289.github.io/Abolfazl-portfolio/
