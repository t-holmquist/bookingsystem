import { getProfileData } from "@/data/supabase"
import { profileDataType } from "@/lib/types"
import { Select } from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

export default function FloorSelect({
  selectedFloor,
  setSelectedFloor,
}: {
  selectedFloor: string | null
  setSelectedFloor: Dispatch<SetStateAction<string | null>>
}) {
  // Disables floorselect if user is student, since only Sal. 3 is allowed
  const [disabled, setDisabled] = useState(true)

  // Get the user profile information on mount
  useEffect(() => {
    const getUserData = async () => {
      // Get the profile data from supabase. Returns only one object from the authorized user
      const userData = await getProfileData()

      if (userData) {
        setDisabled(userData.role === "student")
      }
    }

    getUserData()
  }, [])

  return (
    <Select
      leftSection={<ChevronDown size={15} />}
      placeholder="Vælg sal"
      disabled={disabled}
      // Display no icon on the left
      rightSection={<></>}
      withCheckIcon={false}
      data={["Sal. 1", "Sal. 2", "Sal. 3", "Sal. 4"]}
      comboboxProps={{ transitionProps: { transition: "pop", duration: 200 } }}
      onChange={(value) => setSelectedFloor(value)}
      value={selectedFloor}
    />
  )
}
