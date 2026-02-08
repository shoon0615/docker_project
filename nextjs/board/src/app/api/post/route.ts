import { PrismaClient } from '@prisma/client'
// import { prisma } from '@/lib/prisma'

const prisma = new PrismaClient()

export async function GET() {
  const res = await prisma.post.create({
    data: {}
  })
  return Response.json('ok!')
}