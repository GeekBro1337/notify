# Notification API

This project implements a very small REST API using [Elysia](https://elysiajs.com/) running on the [Bun](https://bun.sh) runtime. Data is stored in PostgreSQL and accessed via [Prisma](https://www.prisma.io/).

## Prerequisites
- **Bun** installed. If you do not have it, install it with:

  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```
  Afterwards restart your shell so the `bun` command is available.
- **Docker** (optional) if you want to run PostgreSQL via `docker-compose`.

## Getting Started
1. Install dependencies:
   ```bash
   bun install
   ```
2. (Optional) start PostgreSQL using Docker:
   ```bash
   docker-compose up -d
   ```
   This will start a database listening on `localhost:5432` with user `postgres` and password `password`.
3. Create a `.env` file and configure the `DATABASE_URL` used by Prisma. Example:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/elysiadb"
   ```
4. Run the initial migration and generate the Prisma client:
   ```bash
   bunx prisma migrate dev --name init
   bunx prisma generate
   ```

## Development
Start the development server with hot reload:
```bash
bun run dev
```
The API will be available at [http://localhost:3000](http://localhost:3000).

## API Endpoints
- `POST /api/notify` – create a notification
- `GET /api/notify` – list all notifications

### Example request
```bash
curl -X POST http://localhost:3000/api/notify \
  -H "Content-Type: application/json" \
  -d '{"title":"Собрание","description":"Команда в Zoom","datetime":"2025-07-12T17:00:00.000Z"}'
```

### Fetch all notifications
```bash
curl http://localhost:3000/api/notify
```

## Notes
- The Prisma schema lives in `prisma/schema.prisma`.
- If you change the schema, rerun `bunx prisma migrate dev` and `bunx prisma generate`.
- Running Prisma commands may require internet access to download Prisma engines.
