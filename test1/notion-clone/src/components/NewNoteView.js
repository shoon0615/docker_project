'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createNote } from '@/app/notes/actions';

const BlockNoteEditor = dynamic(() => import('@/components/BlockNoteEditor'), { ssr: false });

export default function NewNoteView() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [editor, setEditor] = useState(null);
  const [useManualTitle, setUseManualTitle] = useState(false); // Default to unchecked
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!editor || isSaving) {
      return;
    }

    setIsSaving(true);

    let titleToSave = title;
    let contentToSave = editor.document;

    if (!useManualTitle) {
      if (contentToSave.length > 0 && contentToSave[0].content) {
        const firstBlockContent = contentToSave[0].content;
        titleToSave = Array.isArray(firstBlockContent)
          ? firstBlockContent.map(inline => inline.text || '').join('')
          : (typeof firstBlockContent === 'string' ? firstBlockContent : 'Untitled');
      } else {
        titleToSave = 'Untitled';
      }
    }

    if (!titleToSave.trim()) {
      titleToSave = 'Untitled';
    }

    const noteId = await createNote(titleToSave, JSON.stringify(contentToSave));

    if (noteId) {
      router.push('/');
    } else {
      alert('저장에 실패했습니다.');
      setIsSaving(false);
    }
  }, [editor, isSaving, router, title, useManualTitle]);

  return (
    <div className="p-4 flex flex-col flex-1">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="manual-title-checkbox"
            checked={useManualTitle}
            onChange={(e) => setUseManualTitle(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="manual-title-checkbox" className="ml-2 block text-sm text-gray-900">
            제목 직접 입력
          </label>
        </div>
        <input
          type="text"
          className="w-full text-4xl font-bold bg-transparent border-none outline-none focus:ring-0"
          placeholder="Untitled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!useManualTitle}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-md p-2">
        <BlockNoteEditor
          initialContent={undefined}
          editable={true}
          onContentChange={setEditor}
        />
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{isSaving ? 'Saving...' : ''}</span>
        <div className="flex space-x-2">
          <button onClick={handleSave} disabled={isSaving} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400">
            {isSaving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
