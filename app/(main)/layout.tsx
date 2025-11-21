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
        <div className="w-1/5">
          <Sidebar/>
        </div>
        {/* Main content */}
        <div className="flex-1">
            {children}
        </div>
      </div>
    </section>
  )
}
