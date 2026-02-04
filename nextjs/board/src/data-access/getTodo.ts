/*
import { prisma } from '@/lib/prisma';

export async function getTodo(id: number) {
  return prisma.todo.findUnique({
    where: { id },
  });
}
*/

import { prisma } from '@/lib/prisma';
import type { Todo } from '@/generated/prisma/client';

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
  }
}

export async function getTodos(): Promise<Todo[]> {
  try {
    const todos = await prisma.todo.findMany();
    return todos;
  } catch (error) {
    console.error('Error fetching all todos:', error);
    throw new Error('Could not fetch todos.');
  }
}

