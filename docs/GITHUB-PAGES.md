# Publish the Utkal Events demo

Your screenshot shows the repository README rendered by GitHub Pages. Deploying the
source branch does not build a Next.js app. The workflow now builds the app and
publishes the generated `out/` directory instead.

## One-time setup

1. Commit and push these changes to `master` in `Lipunsatyajit/EventManagement`.
2. Open the repository's **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions** instead of
   **Deploy from a branch**. You do not need to select a branch or `/docs` folder.
4. Open **Actions > Deploy Next.js demo to GitHub Pages**.
5. If no run is active, click **Run workflow**, choose `master`, and run it.
6. Wait for both the `build` and `deploy` jobs to turn green.
7. Visit https://lipunsatyajit.github.io/EventManagement/ and refresh.

The workflow is `.github/workflows/deploy-pages.yml` at the repository root, alongside
`package.json`. It installs dependencies, runs lint, builds, uploads `out/`, and deploys.
Future pushes to `master` or `main` repeat deployment automatically.

## Local commands

```sh
npm install
npm run dev
```

Normal development uses http://localhost:3000/ without a repository prefix.

To check the exact GitHub Pages build:

```sh
npm run build:pages
npm run preview:pages
```

Open http://localhost:3100/EventManagement/. The preview serves static files only,
so it catches failures that a Next.js development server can hide.
`npm run test:pages` reuses this preview locally, or starts one if it is not running.

## What changed

- Pages builds use `output: "export"`, `trailingSlash: true`, and
  `basePath: "/EventManagement"` so nested routes can refresh correctly.
- Login, OTP, registration and search read URL query parameters in browser components
  wrapped in Suspense. There is no Next.js server on GitHub Pages.
- Legacy login URLs redirect in the browser and preserve the email query parameter.
- Images, favicon, native form submission and logout include the repository prefix.
- Next.js Links and router navigation already add `basePath`; do not prefix them twice.
- The build generates `out/.nojekyll` and publishes the complete export, including `_next`.
- Windows builds also normalize exported navigation-data filenames to the flat
  names requested by the browser. Linux builds already emit these names.

## Demo accounts

| Role | Email | OTP | Destination |
| --- | --- | --- | --- |
| Customer | customer@utkalevents.in | 123456 | /EventManagement/planners/ |
| Planner | dream@utkalevents.in | 123456 | /EventManagement/planner/dashboard/ |
| Super admin | admin@utkalevents.in | 123456 | /EventManagement/admin/dashboard/ |

Authentication and saved requests are browser-only demos. They are not server-side
authorization. Do not put private customer data or real admin credentials in this
public static build. Email OTP delivery, shared bookings, secure role access, and
file uploads require a separate backend. Dashboard routes remain available for UI previews.

## Troubleshooting

- **Still seeing the README:** check that Source is GitHub Actions and the latest
  workflow deployed successfully; a code push alone is not a completed deployment.
- **Build fails:** open the failed build step in Actions and read its first error.
- **404 for CSS or images:** use the exact case-sensitive `/EventManagement/` URL,
  and verify `build:pages` was used instead of `build`.
- **Repository renamed:** update the prefix in `next.config.ts`, the preview scripts,
  and `playwright.pages.config.ts`.
- **Custom domain:** a root-domain deployment needs an empty base path and a new build.

References:
- https://nextjs.org/docs/app/guides/static-exports
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
