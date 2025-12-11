"use client"

import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"
import { SupabaseClient } from "@/utils/supabaseClient"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./auth-provider"

export const ProfileContext = createContext<{
  profileData: profileDataType | undefined
  userImageUrl: string
}>({
  profileData: undefined,
  userImageUrl: "",
})

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [profileData, setProfileData] = useState<profileDataType | undefined>(
    undefined
  )
  const [userImageUrl, setUserImageUrl] = useState("")
  const supabase = SupabaseClient()
  const user = useContext(AuthContext)

  useEffect(() => {
    // Clear profile data when user logs out
    if (!user) {
      setProfileData(undefined)
      setUserImageUrl("")
      return
    }

    let mounted = true

    const fetchProfileData = async () => {
      try {
        const userData = await getProfileData()

        if (mounted && userData) {
          setProfileData(userData)

          // Get the profile image from supabase storage
          const { data: userImage } = supabase.storage
            .from("avatars")
            .getPublicUrl(`/${userData.user_id}.jpg`)

          if (userImage) {
            setUserImageUrl(userImage.publicUrl)
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }

    fetchProfileData()

    return () => {
      mounted = false
    }
  }, [user?.id]) // Refetch when user changes

  return (
    <ProfileContext.Provider value={{ profileData, userImageUrl }}>
      {children}
    </ProfileContext.Provider>
  )
}

// Custom hook to access the profile data
export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
