import { getNoteById } from '@/auth/actions'
import { notFound } from 'next/navigation'
import NoteDetail from '@/components/NoteDetail'

interface NotePageProps {
  params: {
    id: string
  }
}

export default async function NotePage({ params }: NotePageProps) {
  try {
    const note = await getNoteById(params.id)
    return <NoteDetail note={note} />
  } catch (error) {
    notFound()
  }
}
