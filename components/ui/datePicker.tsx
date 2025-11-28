"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { DatePickerInput, DatesProvider } from "@mantine/dates"
import { Calendar } from "lucide-react"
// Import the danish locale using the dayjs library that Mantine uses under the hood
import "dayjs/locale/da"
import { getProfileData } from "@/data/supabase"

export default function DatePicker({
  setDate,
  date,
}: {
  setDate: Dispatch<SetStateAction<string | null>>
  date: string | null
}) {
  const [maximumDate, setMaximumDate] = useState<Date | null>(null)

  // Get the profileData to check if the user is a teacher or student to set the max date that they can choose
  useEffect(() => {
    const getUserData = async () => {
      // Gets the user role
      const profileData = await getProfileData()

      if (profileData) {
        // If the user is a teacher, set the maxDate 180 days from now
        if (profileData?.role === "teacher") {
          const maxDate = new Date()
          // Mutate the date in place to + 180 days as a Date Object. Ignore the numeric return value from setDate
          maxDate.setDate(maxDate.getDate() + 180)
          setMaximumDate(maxDate)
        } else {
          const maxDate = new Date()
          // If a student you can see 30 days into the future
          maxDate.setDate(maxDate.getDate() + 30)
          setMaximumDate(maxDate)
        }
      }
    }
    getUserData()
  }, [])

  return (
    // Provides the danish date strings
    <DatesProvider settings={{ locale: "da" }}>
      <DatePickerInput
        leftSection={<Calendar size={15} />}
        leftSectionPointerEvents="none"
        placeholder="Vælg dato"
        value={date}
        maxDate={maximumDate ? maximumDate : undefined} // If maximum date exists set to that or else undefined
        // Mantine DatePickerInput onChange returns String | null
        onChange={(value) => setDate(value)}
      />
    </DatesProvider>
  )
}
