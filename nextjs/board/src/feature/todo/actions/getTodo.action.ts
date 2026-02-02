'use server';

import { getTodo } from '@/data-access/getTodo';
import { Todo } from '@/generated/prisma/client';

export async function getTodoAction(id: number): Promise<{ todo?: Todo | null; error?: string }> {
  if (isNaN(id)) {
    return { error: 'Invalid todo ID.' };
  }

  try {
    const todo = await getTodo(id);
    return { todo };
  } catch (error) {
    console.error(`Failed to fetch todo with ID ${id}:`, error);
    return { error: 'Failed to fetch todo.' };
  }
}
