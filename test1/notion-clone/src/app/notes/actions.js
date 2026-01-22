'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function fetchNotes() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('notes')
    .select('id, title, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notes:', error);
    return [];
  }

  return data;
}

export async function createNote(title, content) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('notes')
    .insert({ user_id: user.id, title: title, content: content })
    .select('id')
    .single();

  if (error) {
    console.error('createNote: Error inserting note:', error);
    return null;
  }

  return data.id;
}

export async function fetchNoteById(noteId) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: note, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', noteId)
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error('Error fetching note by ID:', error);
    return null;
  }

  return note;
}

export async function updateNote(noteId, title, content) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase
    .from('notes')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', noteId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error updating note:', error);
    return { error: 'Failed to update note.' };
  }

  return { success: true };
}

export async function deleteNote(noteId) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting note:', error);
    return { error: 'Failed to delete note.' };
  }

  return { success: true };
}
