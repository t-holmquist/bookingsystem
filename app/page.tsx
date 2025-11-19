"use client"

import { SignUpForm } from "@/components/SignUpForm"
import { AuthContext } from "@/providers/auth-provider"
import { getUserRole } from "@/utils/supabase"
import { Button } from "@mantine/core"
import { DateTimePicker } from "@mantine/dates"
import { useContext, useEffect, useState } from "react"

export default function Home() {
  const [role, setRole] = useState("")

  const user = useContext(AuthContext)

  useEffect(() => {
    // Gets the role of the currently authorised user
    // Should run everytime the user auth state changes
    const getAuthRole = async () => {
      // Gets a single object with the role string
      const data = await getUserRole()

      if (data) {
        setRole(data.role)
      }
    }

    getAuthRole()
  }, [user])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-400 font-sans">
      <SignUpForm />
      {user && (
        <>
          <p>{role === 'teacher' ? 'Showing teacher UI' : role === 'student' ? 'Showing student UI' : 'No student or teacher' }</p>
        </>
      )}
    </div>
  )
}
