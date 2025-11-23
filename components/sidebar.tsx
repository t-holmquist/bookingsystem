"use client"

import Image from "next/image"
import Link from "next/link"
import { navbarItems } from "@/data/data"
import { Button } from "@mantine/core"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"

const Sidebar = () => {
  // User data tracked by hook
  const [profileData, setProfileData] = useState<profileDataType | undefined>(
    undefined
  )

  // Pathname hook to check for current pathname and change styling on navitems
  const pathname = usePathname()

  // Get the user profile information
  useEffect(() => {
    const getUserData = async () => {
      // Get the profile data from supabase. Returns only one object from the authorised user
      const userData = await getProfileData()

      if (userData) {
        setProfileData(userData)
      }
    }

    getUserData()
  }, [])

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
      {profileData && (
        <div className="flex gap-3 items-center">
          <Image
            src={"/mock_user.jpg"}
            width={120}
            height={100}
            alt="mock user"
            className="border border-gray-300 rounded-md"
          />
          <div className="space-y-2">
            <p className="text-sm font-bold">
              {profileData.full_name}
            </p>
            <p className="text-ek-text-grey text-xs">{profileData.role === 'teacher' ? 'Lærer' : 'Studerende'}</p>
            <p className="text-ek-text-grey text-xs">
              {profileData.email}
            </p>
            <Button color="black" size="xs">
              Log ud
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Sidebar
