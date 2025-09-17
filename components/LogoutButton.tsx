"use client"

import { useState } from 'react'
import { signOut } from '@/auth/actions'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error('Logout error:', error)
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  )
}
