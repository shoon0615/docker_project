/*
import { prisma } from '@/lib/prisma';

export async function getTodo(id: number) {
  return prisma.todo.findUnique({
    where: { id },
  });
}
*/

import { PrismaClient, Todo } from '@/generated/prisma/client';

const prisma = new PrismaClient();

export async function getTodo(id: number): Promise<Todo | null> {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return todo;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw new Error('Could not fetch todo.');
  } finally {
    await prisma.$disconnect();
  }
}
