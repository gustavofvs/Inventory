# Inventory

A full-stack inventory management system built as a **pnpm monorepo**, designed to demonstrate clean architecture patterns across frontend and backend.

> [!NOTE]
> This project was built to practice and showcase full-stack development concepts — layered backend architecture, feature-based frontend modules, and shared type safety across boundaries.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4 | App Router with server components |
| **UI** | Shadcn UI (New York), Radix, Lucide | Accessible component primitives |
| **Backend** | Express 5, Node.js | REST API with layered architecture |
| **Database** | SQLite 3 | Lightweight embedded database |
| **Tooling** | pnpm Workspaces, TypeScript 5, Nodemon | Monorepo management and DX |

## Architecture

The project follows a clear separation of concerns across two dimensions:

**Frontend** — Feature modules group UI, hooks, and logic by domain instead of by file type.

**Backend** — A layered architecture where each layer has a single responsibility:

```
Request → Routes → Controllers → Services → Database
                   (validation)   (queries)   (connection)
```

## Project Structure

```
inventory/
├── apps/
│   ├── web/                              # Next.js Frontend
│   │   ├── app/
│   │   │   ├── inventory/                # Feature module
│   │   │   │   ├── components/
│   │   │   │   │   ├── product-list-dialog.tsx
│   │   │   │   │   └── create-product-dialog.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── use-products.ts   # Data fetching & mutations
│   │   │   │   └── page.tsx              # Composes components
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                  # Redirects to /inventory
│   │   ├── components/ui/                # Shadcn primitives
│   │   └── lib/utils.ts
│   │
│   └── api/                              # Express Backend
│       ├── src/
│       │   ├── routes/                   # HTTP verb → controller mapping
│       │   ├── controllers/              # Request validation & response
│       │   ├── services/                 # SQL queries (Promise-based)
│       │   ├── database/
│       │   │   ├── connection.js         # SQLite connection
│       │   │   └── migrations.js         # Schema definitions
│       │   └── app.js                    # Express config & middleware
│       └── index.js                      # Entry point
│
├── packages/
│   └── types/                            # Shared TypeScript interfaces
│       └── index.ts                      # Product, CreateProductPayload
│
├── package.json
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 9

### Install

```bash
git clone https://github.com/<your-username>/inventory.git
cd inventory
pnpm install
```

### Run

```bash
# Terminal 1 — Start the API (port 3001)
pnpm dev:api

# Terminal 2 — Start the frontend (port 3000)
pnpm dev:web
```

Open [localhost:3000](http://localhost:3000) — you'll be redirected to `/inventory`.

## API Reference

Base URL: `http://localhost:3001`

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/` | Health check | — |
| `GET` | `/produtos` | List all products | — |
| `POST` | `/produtos` | Create a product | `{ nameProduct, qntdProduct, priceProduct }` |

### Validation Rules

| Field | Type | Rules |
|---|---|---|
| `nameProduct` | `string` | Required, trimmed, max 200 chars |
| `qntdProduct` | `integer` | Required, ≥ 0 |
| `priceProduct` | `number` | Required, ≥ 0 |

### Security

- **SQL Injection** — Protected via parameterized queries
- **Body Size** — Limited to 100kb
- **Malformed JSON** — Returns `400` without leaking stack traces
- **XSS** — Raw storage, safe rendering via React's auto-escaping

## Design Decisions

| Decision | Rationale |
|---|---|
| **Feature modules** over flat `components/` | Scales with new domains — add `modules/exam/` without touching inventory |
| **Layered backend** over monolithic `index.js` | Each layer is testable and replaceable independently |
| **Shared `@inventory/types`** | One source of truth — changing a field name triggers TS errors across apps |
| **pnpm workspaces** | Single `pnpm install` at root, shared dependencies, workspace scripts |
| **SQLite** | Zero-config database, ideal for prototyping and local development |

## Scripts

| Command | Description |
|---|---|
| `pnpm dev:web` | Start the Next.js dev server |
| `pnpm dev:api` | Start the Express dev server with hot reload |
| `pnpm build:web` | Build the frontend for production |
| `pnpm lint` | Run ESLint on the frontend |

