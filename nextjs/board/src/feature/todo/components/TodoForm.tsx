'use client';

import { useRef } from 'react';
import { createTodoAction } from '@/feature/todo/actions/createTodo.action';

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createTodoAction(formData);
    if (result.error) {
      alert(result.error);
    } else {
      alert('Todo created successfully!');
      formRef.current?.reset(); // Clear the form after successful submission
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="p-4 border rounded-lg shadow-md max-w-md mx-auto my-8">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content (Optional)
        </label>
        <textarea
          id="content"
          name="content"
          rows={3}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Todo
      </button>
    </form>
  );
}
