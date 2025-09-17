import { createClient } from '@/auth/server'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Create user in our database if they don't exist
      await prisma.user.upsert({
        where: { id: data.user.id },
        create: {
          id: data.user.id,
          email: data.user.email!
        },
        update: {
          email: data.user.email!
        }
      })
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${requestUrl.origin}/`)
}