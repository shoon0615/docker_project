import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/app/notes/actions';
import EditableNoteView from '@/components/EditableNoteView';

export const dynamic = 'force-dynamic';

export default async function NoteDetailPage({ params }) {
  const { id } = params;

  const note = await fetchNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <EditableNoteView
      noteId={id}
      initialTitle={note.title}
      initialContent={typeof note.content === 'string' ? JSON.parse(note.content) : note.content}
    />
  );
}