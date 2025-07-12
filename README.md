# Elysia with Bun runtime

## Getting Started
To install dependencies run:
```bash
bun install
```

## Development
Start the development server:
```bash
bun run dev
```

The API will be available at `http://localhost:3000`.

### Endpoints
- `POST /api/notify` - create a notification
- `GET /api/notify` - list all notifications

Example POST request:
```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"title":"Собрание","description":"Команда в Zoom","datetime":"2025-07-12T17:00:00.000Z"}'
```
