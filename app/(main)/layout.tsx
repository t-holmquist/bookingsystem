import MobileSidebar from "@/components/mobileSidebar"
import Sidebar from "@/components/sidebar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex">
        {/* Mobile Sidebar */}
        <div className="block lg:hidden">
          <MobileSidebar />
        </div>
        {/* Desktop Sidebar */}
        <div className="lg:block hidden">
          <Sidebar />
        </div>
        {/* Main content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </section>
  )
}
