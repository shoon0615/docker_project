'use server';

import { revalidatePath } from 'next/cache';
import { createTodo } from '@/data-access/createTodo';

/*
import { prisma } from '@/lib/prisma';

type CreateTodoInput = {
  title: string;
  content?: string | null;
};

export async function createTodoAction(input: CreateTodoInput) {
  const title = input.title?.trim();
  if (!title) {
    return { error: 'Title is required.' };
  }
  return createTodo({
    title,
    content: input.content ?? null,
  });
}
*/

export async function createTodoAction(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string | undefined;

  if (!title) {
    return { error: 'Title is required.' };
  }

  try {
    const newTodo = await createTodo({ title, content });
    revalidatePath('/'); // Revalidate the home page to show the new todo
    return { success: true, todo: newTodo };
  } catch (error) {
    console.error('Failed to create todo:', error);
    return { error: 'Failed to create todo.' };
  }
}
