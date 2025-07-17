import { Elysia } from 'elysia'
import { prisma } from './db'

const app = new Elysia()

app.post('/api/notify', async ({ body }) => {
  const { title, description, datetime } = body as Record<string, string>

  if (!title || !description || !datetime) {
    return { error: 'Все поля обязательны' }
  }

  const notification = await prisma.notification.create({
    data: {
      title,
      description,
      datetime: new Date(datetime)
    }
  })

  return notification
})

app.get('/api/notify', async () => {
  return await prisma.notification.findMany({
    orderBy: { datetime: 'asc' }
  })
})

app.listen(3000)
console.log('🚀 Сервер работает на http://localhost:3000')
