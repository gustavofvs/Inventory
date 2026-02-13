# Inventário

Sistema de controle de estoque. Backend com Express + SQLite, frontend com Next.js e Shadcn UI.

## Como rodar

```bash
pnpm install
```

```bash
# terminal 1 - api
pnpm dev:api

# terminal 2 - frontend
pnpm dev:web
```

Acessa http://localhost:3000 e vai redirecionar pra `/inventory`.

## API

- `GET /produtos` — lista todos os produtos
- `POST /produtos` — cria um produto (`nameProduct`, `qntdProduct`, `priceProduct`)
