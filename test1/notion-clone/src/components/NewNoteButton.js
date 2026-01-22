'use client';

import { useRouter } from 'next/navigation';
// import { createNote } from '@/app/notes/actions'; // No longer needed here

export default function NewNoteButton() {
  const router = useRouter();

  const handleCreateNote = () => { // Make it synchronous as it's just a redirect
    console.log('NewNoteButton: Redirecting to /notes/new');
    router.push('/notes/new'); // Redirect to the new note creation page
  };

  return (
    <button
      onClick={handleCreateNote}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-auto"
    >
      + 새 페이지
    </button>
  );
}