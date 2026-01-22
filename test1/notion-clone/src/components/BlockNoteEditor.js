'use client';

import { useEffect } from 'react';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine'; // Import BlockNoteView from @blocknote/mantine
import '@blocknote/react/style.css';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/mantine/style.css'; // Import Mantine styles

export default function BlockNoteEditor({ initialContent, editable, onContentChange }) {
  const editor = useCreateBlockNote({
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      if (onContentChange) {
        onContentChange(editor);
      }
    },
  });

  useEffect(() => {
    if (editor && onContentChange) {
      onContentChange(editor);
    }
  }, [editor, onContentChange]);

  useEffect(() => {
    if (editor) {
      editor.isEditable = editable;
    }
  }, [editor, editable]);

  return (
    <div className="w-full">
      <BlockNoteView editor={editor} />
    </div>
  );
}
