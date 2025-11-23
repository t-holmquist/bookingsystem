"use client"

import Image from "next/image"
import Link from "next/link"
import { navbarItems } from "@/data/data"
import { Button } from "@mantine/core"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"
import { SupabaseClient } from "@/utils/supabaseClient"

const Sidebar = () => {
  // User data tracked by hook
  const [profileData, setProfileData] = useState<profileDataType | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(false)
  const [userImageUrl, setUserImageUrl] = useState("")

  // The supabase client
  const supabase = SupabaseClient()

  // Pathname hook to check for current pathname and change styling on navitems
  const pathname = usePathname()
  const router = useRouter()

  // Get the user profile information on mount including the profile image
  useEffect(() => {
    const getUserData = async () => {
      // Get the profile data from supabase. Returns only one object from the authorized user
      const userData = await getProfileData()

      if (userData) {
        setProfileData(userData)

        // Get the profile image from the supabase storage. Send in the user id, since the files are named that way.
        // Gets a url from the file in supabase that i can use as the user image
        const { data: userImage } = supabase.storage
          .from("avatars")
          .getPublicUrl(`/${userData.user_id}.jpg`)

        if (userImage) {
          setUserImageUrl(userImage.publicUrl)
        }
      }
    }

    getUserData()
  }, [])

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
    <section className="bg-ek-desert justify-between w-1/5 h-screen p-3 flex flex-col">
      {/* Logo and title */}
      <div className="space-y-4">
        <div className="items-center flex flex-col">
          <Image src="/ek_logo.png" width={300} height={100} alt="logo" />
          <h2 className="text-2xl font-semibold">Booking Lyngby</h2>
        </div>
        {/* Nav items */}
        <div className="flex flex-col gap-2">
          {navbarItems.map(({ title, href, icon }, idx) => {
            // Capitalize the icon to make react understand it is a component from lucide
            const Icon = icon
            return (
              <Link
                key={idx}
                href={href}
                className={`flex ${
                  pathname === href && "bg-ek-hover"
                } items-center gap-2 p-2 rounded-md`}
              >
                <div className="bg-[#E7F5FF] rounded-md p-2 border border-gray-300">
                  <Icon size={20} className="text-ek-blue" />
                </div>
                <span className="text-lg">{title}</span>
              </Link>
            )
          })}
        </div>
      </div>
      {/* User information */}
      {profileData && userImageUrl && (
        <div className="flex gap-3 items-center">
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
      )}
    </section>
  )
}

export default Sidebar
