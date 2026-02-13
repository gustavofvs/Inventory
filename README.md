# Inventário (Order3D)

Projeto desenvolvido em poucas horas de tédio, principalmente para desenferrujar no JavaScript/TypeScript, já que tenho focado mais em **Rust**, **Java** e **C#** ultimamente.
Apesar de ser um "treino rápido", aproveitei para implementar uma arquitetura limpa e escalável, aplicando padrões robustos como MVC, validação com Zod e Hooks customizados.

Stack principal:
- **Frontend**: Next.js 16, Tailwind CSS, Shadcn UI
- **Backend**: Express 5, SQLite, Zod
 
## Estrutura
 
 O projeto é um monorepo gerenciado via `pnpm workspaces`:
- `apps/api`: Backend REST com SQLite.
- `apps/web`: Frontend Next.js + Tailwind + Shadcn/ui.

## Como rodar

Instale as dependências na raiz:

```bash
pnpm install
```

Inicie os serviços (em terminais separados ou via ferramentas como `concurrently` se preferir):

```bash
# API (porta 3001)
pnpm dev:api

# Frontend (porta 3000)
pnpm dev:web
```

## API Endpoints

Base: `http://localhost:3001/api`

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/products` | Lista todos os produtos |
| `POST` | `/products` | Cria um novo produto |
| `DELETE` | `/products/:id` | Remove um produto |

### Exemplo de Payload (POST)

```json
{
  "name": "Suporte GPU Vertical",
  "quantity": 5,
  "price": 89.90
}
```
