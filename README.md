# Thematic Online Magazine

A web application for a thematic online magazine (sports, fashion, travel, technology,
psychology, etc.). Readers browse rubrics, read articles with photos and videos, take
polls and quizzes, comment on and share articles on social media, and save favorite
articles into their own collections. Part of the content is free (ad-supported), part
is premium-only (ad-free, with exclusive photos/videos and branded partner content).

## Features

- **Content** — rubrics, articles with media, special themed issues ("Issue of the Month")
- **Interactivity** — polls, scored quizzes, comments, social media sharing
- **Reader profile** — saved articles, personal collections, interest-based recommendations
- **Subscriptions** — free ad-supported access / premium ad-free with exclusives,
  simulated checkout
- **Partnerships** — branded ad integrations within articles
- **Notifications** — new issue releases, exclusive content, partner promotions
- **Admin panel** — manage rubrics, articles, issues, polls, partners, ad campaigns; reports

## Stack

- **Backend:** `apps/api` — NestJS 12, TypeORM, PostgreSQL. REST API + Swagger.
  All business logic lives here.
- **Frontend:** `apps/web` — Next.js (App Router) + TypeScript. No API routes with
  logic — UI and REST API calls only.
- **Database:** PostgreSQL in Docker (`docker-compose.yml`).
- npm workspaces monorepo.

The architecture and the design patterns applied (Factory Method, Builder, Composite,
State, Strategy, Proxy, Decorator, Observer, Chain of Responsibility, Adapter,
Template Method, Singleton) are documented in [`docs/patterns.md`](docs/patterns.md).

## Structure

```
apps/
  api/   — NestJS application (controllers → services → repositories)
  web/   — Next.js application
docs/
  patterns.md — design pattern map and where each one is applied
docker-compose.yml
.env.example
```

## Running locally

Prerequisites: Node.js 22+, Docker Desktop.

```bash
# 1. Install dependencies (root install pulls in both workspaces)
npm install

# 2. Environment variables
cp .env.example .env

# 3. Start PostgreSQL
docker compose up -d

# 4. Build the API once, then apply migrations and load demo data
npm run build:api
npm run migration:run --workspace api
npm run seed --workspace api

# 5. Backend (http://localhost:3000, Swagger at /api/docs)
npm run dev:api

# 6. Frontend (defaults to http://localhost:3000 too — mind the port)
npm run dev:web
```

> If ports 3000 clash between api and web, set `PORT` for Nest in `.env`
> (e.g. 4000) and/or pass `-p` to `next dev`.
>
> If port 5432 is already taken by another PostgreSQL instance on your
> machine, change `POSTGRES_PORT`/`DB_PORT` in `.env` (e.g. 5433).

Demo accounts created by the seed script (password for all: `password123`):
`admin@magazine.test`, `author@magazine.test`, `reader@magazine.test`.

## Useful scripts (from the root)

| Command | What it does |
|---|---|
| `npm run dev:api` | Run the Nest API in watch mode |
| `npm run dev:web` | Run the Next.js dev server |
| `npm run build:api` / `build:web` | Production build |
| `npm run lint` | Lint both apps (`oxlint` for api, `eslint` for web) |
| `npm run test:api` | API unit tests (vitest) |
| `npm run migration:generate --workspace api -- <path>` | Generate a migration from entity changes (requires a build first) |
| `npm run migration:run --workspace api` | Apply pending migrations |
| `npm run seed --workspace api` | Reset and load demo data (requires a build first) |

## Development status

The project is under active development. Current stage: database schema is in
place — all core entities (users, categories, articles, media, issues, comments,
polls/quizzes, collections, subscriptions, payments, partners, ad campaigns) are
modeled, migrated, and seeded with demo data. No business logic, auth, or design
patterns wired up yet. Progress by step and pattern is tracked in
`docs/patterns.md` and the commit history.
