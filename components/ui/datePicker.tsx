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
        // Mantine DatePickerInput onChange returns Date | null
        onChange={(value) => setDate(value)}
      />
    </DatesProvider>
  )
}
