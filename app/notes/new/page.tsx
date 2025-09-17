import NotesHeader from '@/components/NotesHeader'
import NoteForm from '@/components/NoteForm'

export default function NewNotePage() {
  return (
    <div className="flex flex-col h-full">
      <NotesHeader title="Create New Note" />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 bg-white border-r border-gray-200 p-4">
          <div className="text-center text-gray-500 mt-20">
            <p className="text-lg">Creating new note</p>
            <p className="text-sm mt-2">Fill out the form to the right</p>
          </div>
        </div>
        <NoteForm />
      </div>
    </div>
  );
}
