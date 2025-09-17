import { getNotes } from '@/auth/actions'
import NotesHeader from '@/components/NotesHeader'
import NotesList from '@/components/NotesList'
import { notFound } from 'next/navigation'

interface TagPageProps {
  params: {
    tag: string
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tagName = decodeURIComponent(params.tag)
  const notes = await getNotes(false, tagName)

  if (notes.length === 0) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      <NotesHeader title="Tagged Notes" tagName={tagName} />
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
