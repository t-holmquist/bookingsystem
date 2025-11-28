"use client"

import { SupabaseClient } from "@/utils/supabaseClient"
import { User } from "@supabase/supabase-js"
import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<User | null | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // State triangulation. Undefined = loading, null = no session, User = user exist
    // Can be used to base loading states upon
  const [user, setUser] = useState<User | null | undefined>(undefined)

  useEffect(() => {
    const supabase = SupabaseClient()
    let mounted = true

    const fetchInitialUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (mounted) {
        setUser(user ?? null)
      }
    }

    fetchInitialUser()

    // Listen for auth state changes, so that we can update the user state when the user logs in or out
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}