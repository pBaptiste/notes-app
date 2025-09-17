import { getNotes, searchNotes } from '@/auth/actions'
import NotesHeader from '../components/NotesHeader'
import NotesList from '../components/NotesList'

interface HomeProps {
  searchParams: {
    q?: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const query = searchParams.q
  const notes = query ? await searchNotes(query, false) : await getNotes(false)

  return (
    <div className="flex flex-col h-full">
      <NotesHeader title="All Notes" />
      <div className="flex-1 flex overflow-hidden">
        <NotesList notes={notes} />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">Select a note to view</p>
            <p className="text-sm mt-2">or create a new one</p>
          </div>
        </div>
      </div>
    </div>
  );
}
