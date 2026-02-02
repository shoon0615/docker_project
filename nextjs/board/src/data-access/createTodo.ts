/*
import { prisma } from '@/lib/prisma';

type CreateTodoInput = {
  title: string;
  content?: string | null;
};

export async function createTodo(data: CreateTodoInput): Promise<Todo> {
  const { title, content } = data;
  return prisma.todo.create({
    data: {
      title,
      content: content ?? null
    },
  });
}
*/

import { PrismaClient, Todo } from '@/generated/prisma/client';

const prisma = new PrismaClient();

type CreateTodoInput = {
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;
};

export async function createTodo(data: CreateTodoInput): Promise<Todo> {
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published || false,
        authorId: data.authorId,
      },
    });
    return newTodo;
  } catch (error) {
    // In a real application, you'd want to handle errors more gracefully
    console.error('Error creating todo:', error);
    throw new Error('Could not create todo.');
  } finally {
    // It's important to disconnect from the database when the process exits.
    // In a real server application, you'd manage the Prisma Client instance differently (e.g., as a singleton).
    await prisma.$disconnect();
  }
}
