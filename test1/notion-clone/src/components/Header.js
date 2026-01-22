import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Header() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800">
      <Link href="/" className="text-xl font-bold">
        Notion Clone
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <p>{user.email}</p>
            <form action={handleSignOut}>
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <Link href="/login" className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Sign In
          </Link>
        )}
      </div>
    </header>
  )
}
