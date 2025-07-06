import { defineEventHandler, readBody, getHeader, createError } from 'h3'
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

  const body = await readBody(event)
  const { name, forUser, titel, discription, regular, regularData, data } = body

  if (!name || !forUser || !titel || !discription) {
    throw createError({ statusCode: 400, statusMessage: 'name, forUser, titel и discription обязательны' })
  }

  const user = await prisma.users.findUnique({
    where: { id: payload.userId },
    select: { name: true }
  })

  if (!user || user.name !== name) {
    throw createError({ statusCode: 401, statusMessage: 'Недействительные данные' })
  }

  const notification = await prisma.notification.create({
    data: {
      forUser,
      titel,
      discription,
      regular: Boolean(regular),
      regularData: regularData ? new Date(regularData) : new Date(),
      createAt: new Date(),
      data: data ? new Date(data) : new Date()
    }
  })

  return { notification }
})
