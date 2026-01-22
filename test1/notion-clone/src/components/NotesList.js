'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchNotes } from '@/app/notes/actions';

export default function NotesList({ user }) { // Accept user as a prop
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getNotes() {
      if (!user) { // If no user is logged in, stop loading and clear notes
        setLoading(false);
        setNotes([]);
        return;
      }
      try {
        setLoading(true);
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError('Failed to fetch notes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getNotes();
  }, [user]); // Re-run effect when user changes

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        Please sign in to view your notes.
      </div>
    );
  }

  if (loading) {
    return <div className="p-4 text-center">Loading notes...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  if (notes.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notes found.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto"> {/* Added flex-1 and overflow for better layout */}
      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <Link href={`/notes/${note.id}`} className="block">
              <p className="text-lg font-medium">{note.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created: {new Date(note.created_at).toLocaleDateString()}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
