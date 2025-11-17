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
    // Gets the user if there is an existing session. Calls the auth server in supabase.
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null)
    })
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}