'use server'

import { createClient } from './server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@/app/generated/prisma'
import { revalidatePath } from 'next/cache'

export async function signInWithGoogle() {
  const supabase = await createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (data.url) {
    redirect(data.url)
  }
}

export async function signOut() {
  const supabase = await createClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    throw new Error(error.message)
  }
  
  redirect('/login')
}

// Helper function to parse and normalize tags
function parseTags(tagString: string): string[] {
  return tagString
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => tag.toLowerCase())
}

// Helper function to get or create tags for a user
async function getOrCreateTags(userId: string, tagNames: string[]) {
  const tags = []
  
  for (const tagName of tagNames) {
    const tag = await prisma.tag.upsert({
      where: {
        userId_name: {
          userId,
          name: tagName
        }
      },
      create: {
        name: tagName,
        userId
      },
      update: {}
    })
    tags.push(tag)
  }
  
  return tags
}

export async function createNote(title: string, text: string, tagsInput: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  // Ensure user exists in our database
  await prisma.user.upsert({
    where: { id: user.id },
    create: {
      id: user.id,
      email: user.email!
    },
    update: {
      email: user.email!
    }
  })
  
  // Parse and process tags
  const tagNames = parseTags(tagsInput)
  const tags = await getOrCreateTags(user.id, tagNames)
  
  // Create the note with tags
  const note = await prisma.note.create({
    data: {
      title,
      text,
      authorId: user.id,
      tags: {
        connect: tags.map(tag => ({ id: tag.id }))
      }
    },
    include: {
      tags: true
    }
  })
  
  revalidatePath('/')
  return note
}

export async function updateNote(noteId: string, title: string, text: string, tagsInput: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  // Verify the note belongs to the user
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      authorId: user.id
    }
  })
  
  if (!existingNote) {
    throw new Error('Note not found or access denied')
  }
  
  // Parse and process tags
  const tagNames = parseTags(tagsInput)
  const tags = await getOrCreateTags(user.id, tagNames)
  
  // Update the note with new tags
  const note = await prisma.note.update({
    where: { id: noteId },
    data: {
      title,
      text,
      tags: {
        set: tags.map(tag => ({ id: tag.id }))
      }
    },
    include: {
      tags: true
    }
  })
  
  revalidatePath('/')
  return note
}

export async function deleteNote(noteId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  // Verify the note belongs to the user
  const existingNote = await prisma.note.findFirst({
    where: {
      id: noteId,
      authorId: user.id
    }
  })
  
  if (!existingNote) {
    throw new Error('Note not found or access denied')
  }
  
  await prisma.note.delete({
    where: { id: noteId }
  })
  
  revalidatePath('/')
}

export async function getNotes(archived: boolean = false, tagName?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const where: Prisma.NoteWhereInput = {
    authorId: user.id,
    archived
  }
  
  if (tagName) {
    where.tags = {
      some: {
        name: tagName.toLowerCase()
      }
    }
  }
  
  const notes = await prisma.note.findMany({
    where,
    include: {
      tags: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
  
  return notes
}

export async function getNoteById(noteId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      authorId: user.id
    },
    include: {
      tags: true
    }
  })
  
  if (!note) {
    throw new Error('Note not found or access denied')
  }
  
  return note
}

export async function archiveNote(noteId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const note = await prisma.note.updateMany({
    where: {
      id: noteId,
      authorId: user.id
    },
    data: {
      archived: true
    }
  })
  
  if (note.count === 0) {
    throw new Error('Note not found or access denied')
  }
  
  revalidatePath('/')
  revalidatePath('/archived')
}

export async function unarchiveNote(noteId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const note = await prisma.note.updateMany({
    where: {
      id: noteId,
      authorId: user.id
    },
    data: {
      archived: false
    }
  })
  
  if (note.count === 0) {
    throw new Error('Note not found or access denied')
  }
  
  revalidatePath('/')
  revalidatePath('/archived')
}

export async function getUserTags() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  const tags = await prisma.tag.findMany({
    where: {
      userId: user.id
    },
    include: {
      _count: {
        select: {
          notes: {
            where: {
              archived: false
            }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
  
  return tags
}

export async function searchNotes(query: string, archived: boolean = false) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('User not authenticated')
  }
  
  if (!query.trim()) {
    return getNotes(archived)
  }
  
  const searchTerm = query.trim().toLowerCase()
  
  const notes = await prisma.note.findMany({
    where: {
      authorId: user.id,
      archived,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          text: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        },
        {
          tags: {
            some: {
              name: {
                contains: searchTerm,
                mode: 'insensitive'
              }
            }
          }
        }
      ]
    },
    include: {
      tags: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })
  
  return notes
}
