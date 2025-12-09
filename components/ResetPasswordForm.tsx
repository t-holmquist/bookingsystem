"use client"

import { SupabaseClient } from "@/utils/supabaseClient"
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { ArrowLeft } from "lucide-react"
import { useEffect } from "react"

const ResetPasswordForm = () => {
  const supabase = SupabaseClient()

  // Form hook from mantine to hold form state and validation
  const form = useForm({
    initialValues: {
      email: "",
    },

    // Validate function from mantine
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Ugyldig email"),
    },
  })

  // Handle the password reset event
  const handleResetPassword = async (values: { email: string }) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        values.email,
        { redirectTo: "http://localhost:3000/signin" }
      )

      if (data) alert("Password reset link sendt til din email")
      if (error)
        alert("Der var en fejl med at sende password reset link. Prøv igen.")
    } catch (error) {
      console.log("Error sending password reset link")
    }
  }

  // Listen for password recovery event and update the password
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("Indtast dit nye password")
        if (newPassword) {
          const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
          })
          if (data) alert("Password er opdateret!")
          if (error)
            alert("Der var en fejl med at opdatere dit password. Prøv igen.")
        }
      }
    })
  }, [])

  return (
    <form onSubmit={form.onSubmit((values) => handleResetPassword(values))}>
      <Container size={460} my={30}>
        <Title ta="center">Glemt dit password?</Title>
        <Text c="dimmed" fz="sm" ta="center">
          Indtast din email og få et link til nulstilling
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            label="Din email"
            placeholder="eksempel@mail.dk"
            required
            radius="md"
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            value={form.values.email}
            error={form.errors.email}
          />
          <Group justify="space-between" mt="lg">
            <Anchor href="/signin" c="dimmed" size="sm">
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Tilbage til log in side</Box>
              </Center>
            </Anchor>
            <Button type="submit">Nulstil password</Button>
          </Group>
        </Paper>
      </Container>
    </form>
  )
}

export default ResetPasswordForm
