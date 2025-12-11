"use client"

import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"
import { SupabaseClient } from "@/utils/supabaseClient"
import { User } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"

export const ProfileContext = createContext<{
  profileData: profileDataType | undefined
  userImageUrl: string
  user: User | null | undefined
}>({
  profileData: undefined,
  userImageUrl: "",
  user: undefined,
})

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // State triangulation. Undefined = loading, null = no session, User = user exist
  // Can be used to base loading states upon
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [profileData, setProfileData] = useState<profileDataType | undefined>(
    undefined
  )
  const [userImageUrl, setUserImageUrl] = useState("")
  const supabase = SupabaseClient()

  // Manage auth state
  useEffect(() => {
    let mounted = true

    const fetchInitialUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (mounted) {
        setUser(user ?? null)
      }
    }

    fetchInitialUser()

    // Listen for auth state changes, so that we can update the user state when the user logs in or out
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Fetch profile data when user changes
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
    <ProfileContext.Provider value={{ profileData, userImageUrl, user }}>
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
