# Zustand Anecdotes CI/CD

This repository contains the Zustand anecdotes application from Part 6 of Full Stack Open, restructured with a CI/CD pipeline similar to Part 11.

## Live application

Link to application: https://msami936-part11-exercise21.fly.dev

## Repository structure

- `app.js` — Express backend (API + static file serving)
- `client/` — React frontend with Zustand state management
- `db.json` — Anecdotes data store
- `e2e-tests/` — Playwright end-to-end tests

## Commands

Start by running `npm install` inside the project folder.

- `npm start` — run the backend and Vite dev server concurrently
- `npm test` — run unit tests
- `npm run eslint` — run ESLint
- `npm run build` — create a production build
- `npm run start-prod` — run the production server
- `npm run test:e2e` — run Playwright end-to-end tests

## Deployment

The app exposes a health check at `/health` and is deployed automatically when the GitHub Actions pipeline passes.

From the project root:

```bash
flyctl auth login
flyctl launch
flyctl deploy
```

Fly.io polls `/health` to verify deployments. The pipeline also checks the endpoint after deploy.

The app configuration is in `fly.toml` and `Dockerfile`.

## GitHub secrets required

- `FLY_API_TOKEN` — Fly.io deployment token
- `DISCORD_WEBHOOK` — optional, for deployment notifications

## Skipping deployment

Add `#skip` to your commit message to skip deployment, tagging, and notifications.
