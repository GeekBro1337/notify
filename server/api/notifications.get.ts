import { defineEventHandler, getQuery, getHeader, createError } from 'h3'
import jwt from 'jsonwebtoken'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Нет токена' })
  }

  const token = auth.slice(7)
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw createError({ statusCode: 500, statusMessage: 'JWT_SECRET не задан' })
  }

  let payload
  try {
    payload = jwt.verify(token, secret) as { userId: number }
  } catch (err) {
    throw createError({ statusCode: 401, statusMessage: 'Недействительный токен' })
  }

  const { name } = getQuery(event)
  if (typeof name !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'name обязателен' })
  }

  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
    select: { name: true }
  })

  if (!user || user.name !== name) {
    throw createError({ statusCode: 401, statusMessage: 'Недействительные данные' })
  }

  const notifications = await prisma.notification.findMany({
    where: { forUser: name }
  })

  return { notifications }
})
