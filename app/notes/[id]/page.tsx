import { getNoteById, getNotes, searchNotes } from '@/auth/actions'
import { notFound } from 'next/navigation'
import NotesHeader from '@/components/NotesHeader'
import NotesList from '@/components/NotesList'
import NoteDetail from '@/components/NoteDetail'

interface NotePageProps {
  params: {
    id: string
  }
  searchParams: {
    q?: string
  }
}

export default async function NotePage({ params, searchParams }: NotePageProps) {
  try {
    const note = await getNoteById(params.id)
    const query = searchParams.q
    const notes = query ? await searchNotes(query, false) : await getNotes(false) // Get all notes for the sidebar
    
    return (
      <div className="flex flex-col h-full">
        <NotesHeader title="All Notes" />
        <div className="flex-1 flex overflow-hidden">
          <NotesList notes={notes} searchQuery={query} />
          <NoteDetail note={note} />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
