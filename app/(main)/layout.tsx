export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Navbar */}
        <p>Navbar</p>
        {children}
      </body>
    </html>
  )
}
