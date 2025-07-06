# Auth Backend Test

Простой сервер на Nuxt 3 с примерами эндпоинтов для регистрации и авторизации пользователей.
Сервис использует PostgreSQL через Prisma и выдает JWT‑токены. Интерфейс оформлен с помощью Tailwind CSS и Nuxt UI.

## Быстрый старт

1. Установите зависимости

```bash
pnpm install
```

2. Скопируйте `.envExemple` в `.env` и при необходимости измените значения

```bash
cp .envExemple .env
```

3. Запустите базу данных (пример есть в `DB/docker-compose.yml`)

```bash
docker compose -f DB/docker-compose.yml up -d
```

4. Запустите приложение

```bash
pnpm dev
```

Tailwind CSS и Nuxt UI подключены через модули Nuxt и готовы к использованию в компонентах.

По умолчанию сервер будет доступен на `http://localhost:4001`.

## API

Все маршруты находятся под префиксом `/api`.

### POST `/api/register`

Создание нового пользователя.

**Тело запроса**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "username": "username"
}
```

**Ответ**

```json
{
  "user": { "id": 1, "username": "username", "email": "user@example.com" },
  "token": "<jwt>"
}
```

### POST `/api/login`

Авторизация существующего пользователя.

**Тело запроса**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ** – такой же, как у `register`.

### GET `/api/me`

Получение информации о текущем пользователе. Требуется заголовок

```
Authorization: Bearer <jwt>
```

**Ответ**

```json
{
  "user": { "id": 1, "username": "username", "email": "user@example.com" }
}
```

### POST `/api/notifications`

Создание уведомления. Требуется заголовок

```
Authorization: Bearer <jwt>
```

**Тело запроса**

```json
{
  "name": "username",
  "forUser": "username",
  "titel": "Title",
  "discription": "Text"
}
```

**Ответ**

```json
{ "notification": { "id": 1, "titel": "Title" } }
```

### GET `/api/notifications`

Получение уведомлений пользователя. Требуется заголовок

```
Authorization: Bearer <jwt>
```

Пример запроса:

```
GET /api/notifications?name=username
```

**Ответ**

```json
{ "notifications": [] }
```

## Миграции базы данных

Для применения схемы выполните:

```bash
pnpm exec prisma migrate deploy
```

## Разработка и сборка

Дополнительные команды находятся в `package.json`:

- `pnpm dev` – запуск в режиме разработки;
- `pnpm build` – сборка проекта;
- `pnpm preview` – предпросмотр собранного проекта.
