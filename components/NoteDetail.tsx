"use client"

import { useState } from 'react'
import { deleteNote, archiveNote, unarchiveNote } from '@/auth/actions'
import { useRouter } from 'next/navigation'



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

interface NoteDetailProps {
  note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isArchiving, setIsArchiving] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteNote(note.id)
      router.push('/')
    } catch (error) {
      console.error('Failed to delete note:', error)
      alert('Failed to delete note. Please try again.')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleArchive = async () => {
    setIsArchiving(true)
    try {
      if (note.archived) {
        await unarchiveNote(note.id)
      } else {
        await archiveNote(note.id)
      }
      router.push('/')
    } catch (error) {
      console.error('Failed to archive note:', error)
      alert('Failed to archive note. Please try again.')
    } finally {
      setIsArchiving(false)
    }
  }

  return (
    <div className="flex-1">
      <div className="h-full">
        {/* Single Note Block */}
        <div className="py-5 pl-6 pr-8 h-full">
          <div className="flex items-start gap-6 h-full">
            {/* Left side - Note content */}
            <div className="flex flex-col flex-1 h-full">

              {/* Title */}
              <h1 className="text-preset-1 text-neutral-950 mb-5">
                {note.title}
              </h1>

                {/* Tags */}
                {note.tags.length > 0 && (
                <div className="flex items-center gap-[4.313rem] mb-3">
                  <div className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className='stroke-current'>
                      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z" clip-rule="evenodd"/>
                      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z" clip-rule="evenodd"/>
                    </svg>
                    <h3 className="text-preset-5 text-neutral-700">Tags</h3>
                  </div>
                  
                  <div className="flex flex-wrap">
                    {note.tags.map((tag, index) => (
                      <span
                        key={tag.id}
                        className="text-preset-5 text-neutral-950"
                      >
                        {index < note.tags.length - 1 ? `${tag.name}, ` : tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Archived status */}
              {note.archived && (
                <div className="flex items-center gap-1.5 text-preset-5 text-neutral-700">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Archived
                  </span>
                </div>
              )}
              
              {/* Created date and archived status */}
              <div className="flex items-center gap-7 pb-4">
                <div className="flex items-center gap-1.5 text-preset-5 text-neutral-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z" fill="#2B303B"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z" fill="#2B303B"/>
                  </svg>
                  Last edited
                </div>

                <span className="text-preset-5 text-neutral-700">
                  {new Date(note.updatedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                </span>
    
              </div>
              
              {/* Content */}
              <div className='border-t border-neutral-200 pt-4 overflow-y-scroll h-full'>
                <div className="prose max-w-none">
                  <p className="text-neutral-800 text-preset-5 whitespace-pre-wrap leading-relaxed">
                    {note.text}
                  </p>
                </div>
              </div>
                
                {/* Save or Cancel Buttons */}
                <div className='mt-auto flex items-center gap-4 pt-4 border-t border-neutral-200'>
                  <button className='py-3 px-4 bg-blue-500 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-white text-white text-preset-4 rounded-[.5rem] cursor-pointer'>Save Note</button>
                  <button className='py-3 px-4 bg-neutral-100 text-neutral-600 text-preset-4 rounded-[.5rem] hover:bg-neutral-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-white cursor-pointer'>Cancel</button>
              </div>
            </div>

            
            
            {/* Right side - Action Buttons */}
            <div className="flex flex-col items-end space-y-2 px-4 py-5 border-l border-neutral-200 w-[16.125rem] h-full">
              <button
                onClick={handleArchive}
                disabled={isArchiving}
                className="flex w-full items-center gap-2 px-4 py-3 text-neutral-950 text-preset-4 rounded-[.5rem] border border-neutral-300 hover:bg-neutral-50 focus:outline-none focuse:border-neutral-950 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" className='stroke-current group-hover:stroke-blue-500 transition-colors'>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 7.782v8.435C21 19.165 18.919 21 15.974 21H8.026C5.081 21 3 19.165 3 16.216V7.782C3 4.834 5.081 3 8.026 3h7.948C18.919 3 21 4.843 21 7.782Z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 14-3.002 3L9 14M11.998 17v-7M20.934 7H3.059"/>
                </svg>
                {isArchiving ? 'Processing...' : note.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex w-full items-center gap-2 px-4 py-3 text-neutral-950 text-preset-4 rounded-[.5rem] border border-neutral-300 hover:bg-neutral-50 focus:outline-none focuse:border-neutral-950 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-white cursor-pointer group transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 25" className='stroke-current group-hover:stroke-blue-500 transition-colors'>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m14.852 3.879.818 1.785h2.64c.811 0 1.47.658 1.47 1.47V8.22c0 .555-.45 1.005-1.006 1.005H5.005C4.45 9.226 4 8.776 4 8.221V7.133c0-.811.658-1.47 1.47-1.47h2.639l.818-1.784c.246-.536.78-.879 1.37-.879h3.185c.59 0 1.125.343 1.37.879ZM18.24 9.3v8.686c0 1.665-1.333 3.014-2.977 3.014H8.517c-1.644 0-2.977-1.349-2.977-3.014V9.301M10.2 12.816v4.509m3.38-4.509v4.509"/>
                  </svg>
                {isDeleting ? 'Deleting...' : 'Delete Note'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
