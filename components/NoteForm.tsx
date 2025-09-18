"use client"

import { useState } from 'react'
import { createNote } from '@/auth/actions'
import { useRouter } from 'next/navigation'

export default function NoteForm() {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [tags, setTags] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !text.trim()) {
      alert('Please fill in both title and content')
      return
    }

    setIsSubmitting(true)
    try {
      const note = await createNote(title, text, tags)
      router.push(`/notes/${note.id}`)
    } catch (error) {
      console.error('Failed to create note:', error)
      alert('Failed to create note. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 h-full">
      <div className="h-full w-[36.75rem] border-r border-neutral-200">
        <div className="bg-white py-5 px-6 h-full">
          
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Title */}
            <div className='mb-4'>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-preset-1 text-neutral-950 focus:outline-none"
                placeholder="Enter a title..."
                required
              />
            </div>

            {/* Tags */}
            <div className='flex items-center gap-[4.313rem] mb-3'>
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" className='stroke-current'>
                      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3.016 5.966c.003-1.411 1.07-2.677 2.456-2.916.284-.05 3.616-.042 4.995-.041 1.364 0 2.527.491 3.49 1.452 2.045 2.042 4.088 4.085 6.128 6.13 1.208 1.21 1.224 3.066.022 4.28a805.496 805.496 0 0 1-5.229 5.228c-1.212 1.201-3.069 1.186-4.279-.022-2.064-2.058-4.127-4.115-6.182-6.182-.795-.8-1.264-1.766-1.368-2.895-.084-.903-.035-4.26-.033-5.034Z" clip-rule="evenodd"/>
                      <path  stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.907 8.315a1.607 1.607 0 0 1-1.61 1.583c-.872-.002-1.599-.73-1.594-1.596a1.604 1.604 0 0 1 1.633-1.607c.864.003 1.575.736 1.571 1.62Z" clip-rule="evenodd"/>
                </svg>
                <label htmlFor="tags" className="text-preset-5 text-neutral-700">
                  Tags
                </label>
              </div>
              
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full focus:outline-none text-preset-5 text-neutral-950"
                placeholder="Add tags separated by commas (e.g. Work, Planning)"
              />
            </div>
            {/* Last edited */}
            <div className="flex items-center gap-7 pb-4">
                <div className="flex items-center gap-1.5 text-preset-5 text-neutral-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2505 3.75C7.69378 3.75 4.00049 7.44329 4.00049 12C4.00049 16.5558 7.69384 20.25 12.2505 20.25C16.8072 20.25 20.5005 16.5558 20.5005 12C20.5005 7.44329 16.8072 3.75 12.2505 3.75ZM2.50049 12C2.50049 6.61487 6.86536 2.25 12.2505 2.25C17.6356 2.25 22.0005 6.61487 22.0005 12C22.0005 17.3841 17.6357 21.75 12.2505 21.75C6.8653 21.75 2.50049 17.3841 2.50049 12Z" fill="#2B303B"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9224 7.82666C12.3366 7.82666 12.6724 8.16245 12.6724 8.57666V12.2493L15.4819 13.9283C15.8375 14.1408 15.9535 14.6013 15.741 14.9569C15.5285 15.3124 15.068 15.4284 14.7124 15.2159L11.5376 13.3186C11.3111 13.1832 11.1724 12.9388 11.1724 12.6748V8.57666C11.1724 8.16245 11.5082 7.82666 11.9224 7.82666Z" fill="#2B303B"/>
                  </svg>
                  Last edited
                </div>

                <span className="text-preset-5 text-neutral-700">
                  {/* {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }) : 'Not yet saved'
                    } */}
                </span>
    
              </div>

            {/* Content */}
            <div className='border-t border-neutral-200 pt-4 h-full'>
              <label htmlFor="text" className="sr-only">
                Content
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={12}
                className="w-full focus:outline-none resize-none text-neutral-800 text-preset-5 whitespace-pre-wrap leading-relaxed"
                placeholder="Start typing your note here…..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-4 bg-blue-500 hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-white text-white text-preset-4 rounded-[.5rem] cursor-pointer"
              >
                {isSubmitting ? 'Saving...' : 'Save Note'}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="py-3 px-4 bg-neutral-100 text-neutral-600 text-preset-4 rounded-[.5rem] hover:bg-neutral-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
