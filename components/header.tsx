"use client"

import { useEffect, useState } from "react"
import ActiveIndicator from "./ui/activeIndicator"
import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"
import { Loader } from "@mantine/core"

const Header = ({ title }: { title: string }) => {
  // User data tracked by hook
  const [profileData, setProfileData] = useState<profileDataType | undefined>(
    undefined
  )

  // Get the user profile information on mount including the profile image
  useEffect(() => {
    const getUserData = async () => {
      // Get the profile data from supabase. Returns only one object from the authorized user
      const userData = await getProfileData()

      if (userData) {
        setProfileData(userData)
      }
    }

    getUserData()
  }, [])

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex gap-2 w-fit bg-[#ebfbee] border border-gray-200 items-center py-1 px-2 rounded-md">
        {profileData ? (
          <>
            <ActiveIndicator />
            <p className="text-xs">
              Logget ind som{" "}
              {profileData?.role === "teacher" ? "lærer" : "studerende"}
            </p>
          </>
        ) : (
          <Loader size="xs" />
        )}
      </div>
    </div>
  )
}

export default Header
