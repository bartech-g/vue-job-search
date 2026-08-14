# Vue Job Search App

A simple job search application built with **Vue 3** (frontend) and **Node.js / Express** (backend), powered by the [Jooble API](https://jooble.org/api).

The backend acts as a proxy to keep the Jooble API key secret. The frontend never exposes the key directly.

## Project Structure

```
vue-data/
├── server/          # Express backend (proxies Jooble API)
│   ├── index.ts     # API server + Zod validation
│   └── .env         # Stores JOOBLE_API_KEY (not committed)
└── vue-data/        # Vue 3 frontend
    └── src/
        ├── components/   # Vue components
        ├── services/     # API service layer (axios)
        ├── stores/       # Pinia state management
        └── types/        # TypeScript interfaces
```

## Prerequisites

- Node.js `^22.18.0` or `>=24.12.0`
- npm

## Setup

1. Clone the repo and install dependencies for both packages:

```bash
cd server && npm install
cd ../vue-data && npm install
```

2. Add your Jooble API key to the server environment file:

```bash
# In server/.env
JOOBLE_API_KEY="your-jooble-api-key-here"
```

You can get a key at [jooble.org/api](https://jooble.org/api).

## Running the App

Start the backend server (from `server/`):

```bash
npm run dev
```

Start the frontend dev server (from `vue-data/`):

```bash
npm run dev
```

The Vite dev server proxies `/api/*` requests to the Express backend at `http://localhost:3000`.

## Key Technologies

| Layer | Tech |
|-------|------|
| Frontend | Vue 3, Pinia, Axios, Tailwind CSS, TypeScript |
| Backend | Express, Zod, Helmet, CORS, dotenv, Morgan |
| API | Jooble Job Search API |

## Security Note

The Jooble API key is stored exclusively in `server/.env` and is never sent to the client. All search requests go through the backend proxy at `/api/jobs/search`.
