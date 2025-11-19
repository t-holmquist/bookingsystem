"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SupabaseClient } from "@/utils/supabaseClient"
import { Button } from "@mantine/core"
import { addNewUser } from "@/utils/supabase"

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // Navigation library from next.js
  const router = useRouter()

  const handleSignUp = async (e: any) => {
    e.preventDefault()

    const supabase = SupabaseClient()

    try {
      // Try to sign up the user with supabase
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      })

      // Add new user to table in db
      if(!error && data.user) {
        await addNewUser('teacher', 'Benjamin Dobble')
      }

      // Check if data is valid/exists and then push the user to new route
      if (data && data.session?.access_token) {
        router.push(`/`)
      }
    } catch (error) {
      console.log("Error creating user", error)
    }
  }

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col border rounded-md p-8 gap-3"
    >
      <label htmlFor="email">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="bg-white rounded-sm p-1"
        id="email"
        type="email"
        placeholder="m@example.com"
        required
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="bg-white rounded-sm p-1"
        id="password"
        type="password"
        required
      />
      <Button type="submit">Create Account</Button>
    </form>
  )
}
