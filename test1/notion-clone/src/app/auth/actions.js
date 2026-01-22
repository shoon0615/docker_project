'use server'

import { createClient } from '@/lib/supabase/server'

import { redirect } from 'next/navigation' // Import redirect

export async function getUserSession() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login') // Redirect to login page after sign out
}