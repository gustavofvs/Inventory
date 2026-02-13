# Inventário

Sistema de controle de estoque com Express + SQLite no backend e Next.js no frontend, organizado como monorepo com pnpm workspaces.

## Stack

- **Frontend:** Next.js 16, React 19, Tailwind CSS v4, Shadcn UI
- **Backend:** Express 5, SQLite 3
- **Tooling:** pnpm workspaces, TypeScript, Nodemon

## Como rodar

```bash
pnpm install
```

```bash
# terminal 1 - api na porta 3001
pnpm dev:api

# terminal 2 - frontend na porta 3000
pnpm dev:web
```

## API

Base URL: `http://localhost:3001`

- `GET /produtos` — retorna lista de produtos
- `POST /produtos` — cria produto novo
- `DELETE /produtos/:id` — remove um produto

```json
{
  "nameProduct": "Suporte GPU",
  "qntdProduct": 10,
  "priceProduct": 49.90
}
```

Validação: nome obrigatório (max 200 chars), quantidade inteira >= 0, preço >= 0. Queries parametrizadas contra SQL injection.
