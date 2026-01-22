import NotesList from '@/components/NotesList'
import NewNoteButton from '@/components/NewNoteButton' // Import NewNoteButton
import { getUserSession } from '@/app/auth/actions' // Import getUserSession

export const dynamic = 'force-dynamic'

export default async function Home() {
  const user = await getUserSession(); // Fetch user session

  return (
    <div className="flex flex-col flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Notes</h1>
        {user && <NewNoteButton />} {/* Conditionally render NewNoteButton */}
      </div>
      <NotesList user={user} /> {/* Pass user to NotesList */}
    </div>
  )
}