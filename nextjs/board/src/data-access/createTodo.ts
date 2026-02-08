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
import { prisma } from '@/lib/prisma';
import type { Todo } from '@/generated/prisma/client';

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
      // 연관관계 포함 생성
      /*
      data: {
        posts: {
          create: [{ title: 'This is my first post' }, { title: 'Here comes a second post' }],
        },
      },
      include: { posts: true },
      */
    });
    return newTodo;
  } catch (error) {
    // In a real application, you'd want to handle errors more gracefully
    console.error('Error creating todo:', error);
    throw new Error('Could not create todo.');
  }
}

export async function updateTodo(id: number, data: CreateTodoInput): Promise<Todo> {
  try {
    const setTodo = await prisma.todo.update({
      where: {
        id: id
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        authorId: data.authorId,
      },
    });
    return setTodo;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Could not update todo.');
  }
}