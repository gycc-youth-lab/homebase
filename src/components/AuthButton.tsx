'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    // Initial check
    supabase.auth.getUser().then(({ data: { user } }) => {
        setUser(user)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return user ? (
    <div className="flex items-center gap-3">
        <Link href={`/profile/${user.email?.split('@')[0]}`}>
            Profile
        </Link>
      <button onClick={handleSignOut} className="px-4 py-2 text-base font-semibold text-white bg-primary hover:bg-primary-variant rounded-lg transition-colors">
        Sign out
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-base font-semibold text-[#475467] hover:text-[#182230]"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 text-base font-semibold text-white bg-primary hover:bg-primary-variant rounded-lg transition-colors"
      >
        Sign up
      </Link>
    </div>
  )
}
