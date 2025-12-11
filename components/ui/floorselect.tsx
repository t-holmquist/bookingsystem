import { useProfile } from "@/providers/profile-provider"
import { Select } from "@mantine/core"
import { ChevronDown } from "lucide-react"
import { Dispatch, SetStateAction, useMemo } from "react"

export default function FloorSelect({
  selectedFloor,
  setSelectedFloor,
}: {
  selectedFloor: string | null
  setSelectedFloor: Dispatch<SetStateAction<string | null>>
}) {
  const { profileData } = useProfile()

  // Disables floorselect if user is student, since only Sal. 3 is allowed
  const disabled = useMemo(() => profileData?.role === "student", [profileData])

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
