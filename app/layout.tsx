import "./globals.css"

// Css styles for the Mantine library
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core"
import { AuthProvider } from "@/providers/auth-provider"
import { ProfileProvider } from "@/providers/profile-provider"

export const metadata = {
  title: "Bookingsystem",
  description: "Bookingsystem for meetingrooms",
}

// Override Mantine theme. Apparently there is a need for shades, But here I have set them to the same color.
const theme = createTheme({
  primaryColor: "ek-blue",
  colors: {
    "ek-blue": [
      "#0339A7", // 0
      "#0339A7", // 1
      "#0339A7", // 2
      "#0339A7", // 3
      "#0339A7", // 4
      "#0339A7", // 5
      "#0339A7", // 6
      "#0339A7", // 7
      "#0339A7", // 8
      "#0339A7", // 9
    ],
  },
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <AuthProvider>
        <ProfileProvider>
          <body>
            <MantineProvider theme={theme}>{children}</MantineProvider>
          </body>
        </ProfileProvider>
      </AuthProvider>
    </html>
  )
}
