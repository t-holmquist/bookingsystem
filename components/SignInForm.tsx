'use client'

import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
} from "@mantine/core"

export default function SignInForm() {


  // Sign in handler
  const handleSignIn = async (e: any) => {
    e.preventDefault()

    console.log("Signed in")
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
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
          />
          <Button type="submit" color="#0339A7" fullWidth mt="xl" radius="md">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  )
}
