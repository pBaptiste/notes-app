import { getNotes, searchNotes } from '@/auth/actions'
import NotesHeader from '@/components/NotesHeader'
import NotesList from '@/components/NotesList'

interface ArchivedPageProps {
  searchParams: {
    q?: string
  }
}

export default async function ArchivedPage({ searchParams }: ArchivedPageProps) {
  const query = searchParams.q
  const notes = query ? await searchNotes(query, true) : await getNotes(true) // true = archived

  return (
    <div className="flex flex-col h-full">
      <NotesHeader title="Archived Notes" />
      <div className="flex-1 flex overflow-hidden">
        <NotesList notes={notes} />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">Select an archived note to view</p>
            <p className="text-sm mt-2">or restore it</p>
          </div>
        </div>
      </div>
    </div>
  );
}
