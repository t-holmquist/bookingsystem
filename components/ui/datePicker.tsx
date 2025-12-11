"use client"

import { Dispatch, SetStateAction, useMemo } from "react"
import { DatePickerInput, DatesProvider } from "@mantine/dates"
import { Calendar } from "lucide-react"
// Import the danish locale using the dayjs library that Mantine uses under the hood
import "dayjs/locale/da"
import { useProfile } from "@/providers/profile-provider"

export default function DatePicker({
  setDate,
  date,
}: {
  setDate: Dispatch<SetStateAction<string | null>>
  date: string | null
}) {
  const { profileData } = useProfile()

  // Compute maximum date based on user role
  const maximumDate = useMemo(() => {
    if (!profileData) return null

    const maxDate = new Date()
    // If the user is a teacher, set the maxDate 180 days from now
    // If a student you can see 30 days into the future
    maxDate.setDate(
      maxDate.getDate() + (profileData.role === "teacher" ? 180 : 30)
    )
    return maxDate
  }, [profileData])

  return (
    // Provides the danish date strings
    <DatesProvider settings={{ locale: "da" }}>
      <DatePickerInput
        leftSection={<Calendar size={15} />}
        leftSectionPointerEvents="none"
        placeholder="Vælg dato"
        value={date}
        maxDate={maximumDate ?? undefined}
        // Mantine DatePickerInput onChange returns String | null
        onChange={(value) => setDate(value)}
      />
    </DatesProvider>
  )
}
