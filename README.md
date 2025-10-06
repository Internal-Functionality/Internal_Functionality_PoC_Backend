## Servineo Backend

A lightweight Node.js + Express + TypeScript backend for Servineo. It includes sane defaults for development, linting, formatting, and CI.

### Features

- TypeScript (strict) with ts-node-dev for fast reloads
- Express 5 with CORS and JSON body parsing
- Environment variables via dotenv
- ESLint (flat config) + Prettier, with VS Code format-on-save
- GitHub Actions workflow for linting and formatting on PRs/commits

## Requirements

- Node.js 20+
- npm 10+

## Getting Started

1. Install dependencies

```bash
npm ci
```

2. Configure environment variables
   Create a `.env` at the project root (optional — defaults are provided). You can start by copying the example file:

```bash
cp .env.example .env
```

```env
SERVER_PORT=3000
```

3. Start the dev server

```bash
npm run dev
```

You should see:

```text
Server running on http://localhost:3000
```

## API

Base URL: `http://localhost:<SERVER_PORT>/api`

- Health check
  - Method: GET
  - Path: `/healthy`
  - Response: 200
  - Example:
    ```json
    {
      "healt": "i'm alive",
      "status": 200,
      "message": "ok"
    }
    ```

Quick test:

```bash
curl -i http://localhost:3000/api/healthy
```

## Project Structure

```text
src/
	index.ts                     # App entrypoint
	config/
		env.config.ts              # Env var loading (dotenv) and defaults
		server.config.ts           # Express app setup (CORS, JSON, routes)
		server.routes.ts           # App router
	modules/
		health/
			health.controller.ts     # Health controller
			health.routes.ts         # Health routes
```

## Scripts

- `npm run dev` – Start the server with ts-node-dev (reload on changes)
- `npm run lint` – Run ESLint over the project
- `npm run lint:fix` – Fix autofixable ESLint issues
- `npm run format` – Run Prettier and write changes
- `npm run format:check` – Check Prettier formatting without writing

## Linting & Formatting

- ESLint uses flat config in `eslint.config.mjs` (no .eslintrc).
- Prettier is configured via `.prettierrc.json` and ignores with `.prettierignore`.
- VS Code users: `.vscode/settings.json` enables format-on-save using Prettier.

## Continuous Integration

GitHub Actions workflow: `.github/workflows/lint.yml`

- Triggers on push/PR to `dev` and `main`
- Node 20, `npm ci`
- Runs `npm run lint` and `npm run format:check`

## License

MIT © Servineo. See [LICENSE](./LICENSE).
