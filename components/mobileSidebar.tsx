"use client"

import Image from "next/image"
import Link from "next/link"
import { navbarItems } from "@/data/data"
import { Button } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useProfile } from "@/providers/profile-provider"
import { SupabaseClient } from "@/utils/supabaseClient"
import { motion } from "motion/react"
import { useDisclosure } from "@mantine/hooks"
import { Drawer } from "@mantine/core"
import { Menu, X } from "lucide-react"

const MobileSidebar = () => {
  const { profileData, userImageUrl } = useProfile()
  const [isLoading, setIsLoading] = useState(false)
  const [opened, { open, close }] = useDisclosure(false) // Sidebar drawer effect state

  // The supabase client
  const supabase = SupabaseClient()

  // Pathname hook to check for current pathname and change styling on navitems
  const pathname = usePathname()
  const router = useRouter()

  // Signs the user out
  const handleSignOut = async () => {
    try {
      // Set loading state
      setIsLoading(true)

      // Try to sing out the user
      const { error } = await supabase.auth.signOut()

      // push to signin on success
      if (!error) {
        router.push("/signin")
      }

      // Log the error if failed to sing out
      if (error) {
        console.log("Error signing out")
        alert("Error signing out. Try again")
      }
    } catch (error) {
      console.log("Error signing out")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Burger menu button - always visible outside the drawer. Non mantine button to avoid style conflict making the button not be placed on the right */}
      <button
        onClick={open}
        className="fixed top-4 right-4 h-10 w-10 z-50 flex items-center justify-center bg-transparent hover:bg-gray-100 rounded-md transition-colors"
        type="button"
      >
        <Menu size={20} />
      </button>

      {/* Drawer containing the sidebar content is invisible unless triggered */}
      <Drawer
        padding={0}
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="md"
      >
        <section className="bg-ek-yellow justify-between border-r min-h-screen border-gray-300 w-full p-3 transition-all duration-300 h-full relative flex flex-col">
          {/* Logo and title */}
          <div className="space-y-8 mt-2">
            <div className="items-center flex justify-between">
              <Image src="/logo.png" width={300} height={100} alt="logo" />
              <Button size="xs" variant="transparent" onClick={close}>
                <X />
              </Button>
            </div>
            {/* Nav items */}
            <div className="flex flex-col items-start gap-2">
              {navbarItems.map(({ title, href, icon }, idx) => {
                // Capitalize the icon to make react understand it is a component from lucide
                const Icon = icon
                return (
                  <Link
                    key={idx}
                    href={href}
                    onClick={close}
                    className={`flex items-center hover:bg-slate-100 ${
                      pathname === href &&
                      "bg-slate-100 border border-slate-300"
                    } gap-2 py-1 px-2 rounded-md w-full`}
                  >
                    <div
                      className={`${
                        pathname === href ? "bg-ek-blue" : "bg-[#E7F5FF]"
                      } rounded-md p-1 border border-gray-300`}
                    >
                      <Icon
                        size={20}
                        color={pathname === href ? "white" : "black"}
                      />
                    </div>
                    <motion.span
                      // Create delay on text so that it doesnt jump
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: 0.2,
                      }}
                      className={`text-lg ${
                        pathname === href && "font-semibold"
                      }`}
                    >
                      {title}
                    </motion.span>
                  </Link>
                )
              })}
            </div>
          </div>
          {/* User information */}
          {profileData && userImageUrl ? (
            <div className="flex gap-3 items-center mt-auto">
              <Image
                src={userImageUrl}
                width={120}
                height={100}
                alt="mock user"
                className="border border-gray-300 rounded-md"
              />
              <div className="space-y-2">
                <p className="text-sm font-bold">{profileData.full_name}</p>
                <p className="text-ek-text-grey text-xs">
                  {profileData.role === "teacher" ? "Lærer" : "Studerende"}
                </p>
                <p className="text-ek-text-grey text-xs">{profileData.email}</p>
                <Button
                  loading={isLoading}
                  onClick={handleSignOut}
                  color="black"
                  size="xs"
                >
                  Log ud
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Skeleton loaders */}
              <section className="flex gap-2 mt-auto">
                <div className="bg-slate-300 animate-pulse w-1/2 h-30 rounded-md"></div>
                <div className="w-1/2 flex flex-col gap-2">
                  <div className="bg-slate-300 animate-pulse h-5 rounded-md"></div>
                  <div className="bg-slate-300 animate-pulse w-2/3 h-5 rounded-md"></div>
                  <div className="bg-slate-300 animate-pulse w-2/3 h-5 rounded-md"></div>
                </div>
              </section>
            </>
          )}
        </section>
      </Drawer>
    </>
  )
}

export default MobileSidebar
