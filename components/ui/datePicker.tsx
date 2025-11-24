"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { DatePickerInput, DatesProvider } from "@mantine/dates"
import { Calendar } from "lucide-react"
// Import the danish locale using the dayjs library that Mantine uses under the hood
import "dayjs/locale/da"

export default function DatePicker({
  setDate,
  date,
}: {
  setDate: Dispatch<SetStateAction<string | null>>
  date: string | null
}) {
  return (
    // Provides the danish date strings
    <DatesProvider settings={{ locale: "da" }}>
      <DatePickerInput
        leftSection={<Calendar size={15} />}
        leftSectionPointerEvents="none"
        placeholder="Vælg dato"
        value={date}
        // The onchange returns a string under the hood through Mantine, instead of the event directly
        onChange={(value) => setDate(value)}
      />
    </DatesProvider>
  )
}
