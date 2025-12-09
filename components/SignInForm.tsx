"use client"

import { SupabaseClient } from "@/utils/supabaseClient"
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Routing to redirect the user if the succesfully logged in
  const router = useRouter()

  // Form hook from mantine to hold form state and validation
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    // Validate function from mantine
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Ugyldig email"),
      password: (val) =>
        val.length <= 6 ? "Kodeordet skal være over 6 karaktere langt" : null,
    },
  })


  // Sign in handler
  const handleSignIn = async (values: { email: string; password: string }) => {
    // TRYING TO SIGN IN HERE
    try {
      setIsLoading(true)

      // Get the supabase client
      const supabase = SupabaseClient()

      // Try to log the user in if there exist a user it succeds
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
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
    <Container size={420} style={{ width: "100%" }}>
      <form onSubmit={form.onSubmit((values) => handleSignIn(values))}>
        <Paper p={22} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            value={form.values.email}
            error={form.errors.email} // Error prop. The values displayed is in the validate function of the useForm mantine hook
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            value={form.values.password}
            error={form.errors.password}
          />
          <Group justify="space-between" mt="lg">
          <Anchor href="/glemtpassword" size="sm">
            Glemt password?
          </Anchor>
        </Group>
          <Button
            loading={isLoading}
            type="submit"
            fullWidth
            mt="xl"
            radius="md"
          >
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
