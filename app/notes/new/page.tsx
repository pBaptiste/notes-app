import { getNotes } from '@/auth/actions'
import NotesHeader from '@/components/NotesHeader'
import NotesList from '@/components/NotesList'
import NoteForm from '@/components/NoteForm'

export default async function NewNotePage() {
  const notes = await getNotes(false) // Get all notes for the sidebar

  return (
    <div className="flex flex-col h-full">
      <NotesHeader title="Create New Note" />
      <div className="flex-1 flex overflow-hidden">
        <NotesList notes={notes} />
        <NoteForm />
      </div>
    </div>
  );
}
