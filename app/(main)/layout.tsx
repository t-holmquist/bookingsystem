import Sidebar from "@/components/sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Main content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </section>
  )
}
