import Link from 'next/link'

interface Note {
  id: string
  title: string
  text: string
  archived: boolean
  createdAT: Date
  updatedAt: Date
  tags: Array<{
    id: string
    name: string
  }>
}

interface NotesListProps {
  notes: Note[]
  searchQuery?: string
}

export default function NotesList({ notes, searchQuery }: NotesListProps) {
  return (
    <div className="w-[18.125rem] bg-white border-r border-gray-200 overflow-y-auto">
      <div className="py-5 pl-8 pr-4">
        
          {/* Action Button */}
          <div className="flex mb-4">
            <Link
              href="/notes/new"
              className="py-3 w-full bg-blue-500 text-white text-preset-4 text-center rounded-[.5rem] hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-white"
            >
              + Create New Note
            </Link>
          </div>
        
        {notes.length === 0 ? (
          <div className=" p-2 bg-neutral-100 border border-neutral-200 rounded-[.5rem]">
            <p className="text-neutral-950 text-preset-5">
              {searchQuery?.trim() 
                ? (
                  <>
                    No notes match your search. Try a different keyword or{' '}
                    <Link href="/notes/new" className="underline">
                      create a new note
                    </Link>
                  </>
                )
                : "You don't have any notes yet. Start a new note to capture your thoughts and ideas."
              }
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className="block p-2 rounded-[.5rem] rounded-t-none border-t first-of-type:border-none border-neutral-200 hover:bg-neutral-100 hover:rounded-t-[.5rem] hover:border-none transition-colors duration-300"
              >
                <h3 className="text-neutral-950 text-preset-3 mb-3 line-clamp-2">
                  {note.title}
                </h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag.id}
                        className="inline-block px-1.5 py-0.5 text-preset-6 bg-neutral-200 rounded-[.25rem] text-neutral-950"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  
                  <span className="text-preset-6 text-neutral-700">
                    {new Date(note.updatedAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
