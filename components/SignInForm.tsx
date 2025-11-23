"use client"

import { SupabaseClient } from "@/utils/supabaseClient"
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
  // State variables for email/password
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Routing to redirect the user if the succesfully logged in
  const router = useRouter()

  const handleSignIn = async (e: any) => {
    e.preventDefault()

    // TRYING TO SIGN IN HERE
    try {
      setIsLoading(true)

      // Get the supabase client
      const supabase = SupabaseClient()

      // Try to log the user in if there exist a user it succeds
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      // If we get a token then we succeded and we can redirect to teacher dashboard
      // Redirecting to the specific dynamic user id. We get the user id back from supabase.
      if (data && data?.session?.access_token) {
        router.push(`/`)
      }
    } catch (error) {
      console.log("Error logging in the user", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container size={420}>
      <form onSubmit={handleSignIn}>
        <Paper p={22} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button loading={isLoading} type="submit" color="#0339A7" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
