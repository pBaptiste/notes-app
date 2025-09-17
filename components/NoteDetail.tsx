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
    <div className="flex-1 p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Note Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {note.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Created: {new Date(note.createdAT).toLocaleDateString()}</span>
                <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                {note.archived && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Archived
                  </span>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleArchive}
                disabled={isArchiving}
                className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
              >
                {isArchiving ? 'Processing...' : note.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Note'}
              </button>
            </div>
          </div>
          
          {/* Tags */}
          {note.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Note Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {note.text}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
