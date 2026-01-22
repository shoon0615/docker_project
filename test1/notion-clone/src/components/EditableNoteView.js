'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { updateNote, deleteNote } from '@/app/notes/actions';

const BlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), { ssr: false });

export default function EditableNoteView({ noteId, initialTitle, initialContent }) {
  const router = useRouter();
  const [editor, setEditor] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSave = useCallback(async () => {
    if (!editor || isSaving) {
      return;
    }

    setIsSaving(true);

    const contentToSave = editor.document;
    const result = await updateNote(noteId, initialTitle, JSON.stringify(contentToSave));

    if (result && result.error) {
      alert('업데이트에 실패했습니다.');
      setIsSaving(false);
    } else {
      router.push('/');
    }
  }, [editor, isSaving, noteId, initialTitle, router]);

  const handleDelete = useCallback(async () => {
    if (isDeleting) return;

    if (window.confirm('정말로 이 노트를 삭제하시겠습니까?')) {
      setIsDeleting(true);
      const result = await deleteNote(noteId);
      if (result && result.error) {
        alert('삭제에 실패했습니다.');
        setIsDeleting(false);
      } else {
        router.push('/');
      }
    }
  }, [noteId, router, isDeleting]);

  return (
    <div className="p-4 flex flex-col flex-1">
      <h1 className="w-full text-4xl font-bold mb-4 bg-transparent border-none outline-none">
        {initialTitle}
      </h1>

      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-2">
        <BlockNoteEditor
          initialContent={initialContent}
          editable={true}
          onContentChange={setEditor}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{isSaving ? '저장 중...' : (isDeleting ? '삭제 중...' : '')}</span>
        <div className="flex space-x-2">
          <button onClick={handleSave} disabled={isSaving || isDeleting} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400">
            {isSaving ? '저장 중...' : '저장 후 닫기'}
          </button>
          <button onClick={handleDelete} disabled={isSaving || isDeleting} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400">
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  );
}
