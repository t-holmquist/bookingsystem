import "./globals.css"

import "@mantine/core/styles.css"
import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  mantineHtmlProps,
} from "@mantine/core"
import { AuthProvider } from "@/providers/auth-provider"

export const metadata = {
  title: "Bookingsystem",
  description: "Bookingsystem for meetingrooms",
}

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
        <body>
          <MantineProvider>{children}</MantineProvider>
        </body>
      </AuthProvider>
    </html>
  )
}
