import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)

    if (!sessionError) {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        return NextResponse.redirect(new URL(`/login-status?status=success&next=${next}`, request.url))
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/login-status?status=error', request.url))
}
