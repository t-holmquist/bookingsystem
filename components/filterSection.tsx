"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import DatePicker from "./ui/datePicker"
import FloorSelect from "./ui/floorselect"
import StartTimeSelect from "./ui/startTimeSelector"
import EndTimeSelect from "./ui/endTimeSelector"
import { checkBookings } from "@/data/supabase"
import { doubleBookingType, isoTimeRange } from "@/lib/types"

const FilterSection = ({
  setDoubleBookings,
  setSelectedIsoRange,
  setSelectedFloor,
  selectedFloor,
  setStartTime,
  setEndTime,
  startTime,
  endTime,
}: {
  // Contains the roomtype or undefined
  setDoubleBookings: Dispatch<SetStateAction<doubleBookingType | undefined>>
  setSelectedIsoRange?: Dispatch<SetStateAction<isoTimeRange | undefined>>
  setSelectedFloor: Dispatch<SetStateAction<string | null>>
  selectedFloor: string | null
  setStartTime: Dispatch<SetStateAction<string | null>>
  setEndTime: Dispatch<SetStateAction<string | null>>
  startTime: string | null
  endTime: string | null
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    new Date().toISOString()
  )

  const buildIsoRange = () => {
    if (!selectedDate || !startTime || !endTime) {
      return undefined
    }

    // Create a date object from the selected date (this will be in local timezone)
    // Selected date format: YYYY-MM-DD. Example: 2025-12-12
    const dateObj = new Date(selectedDate)
    const year = dateObj.getFullYear()
    const month = dateObj.getMonth()
    const day = dateObj.getDate()

    // Input: 08:00
    // Output: 2025-12-12T08:00:00.000Z
    const parseTime = (time: string) => {
      const [hours, minutes] = time.split(":")
      // Create a Date object in the user's local timezone
      // Combines the year, month & day from selectedDate (datePicker) with the hours, minutes & seconds from startTime and endTime (startTimeSelector and endTimeSelector)
      const localDate = new Date(
        year,
        month,
        day,
        parseInt(hours, 10),
        parseInt(minutes, 10),
        0,
        0
      )
      // Convert to ISO string (which will be in UTC)
      return localDate.toISOString()
    }

    return {
      start: parseTime(startTime),
      end: parseTime(endTime),
    }
  }

  // Each time a filter changes then call supabase to check if there are any bookings on every room with the specific filters set
  useEffect(() => {
    const checkIfCanBook = async () => {
      // Build the iso range (start and end time amd date). ISO format: YYYY-MM-DDTHH:MM:SS.SSSZ. Example: 2025-12-12T08:00:00.000Z
      const isoRange = buildIsoRange()

      if (!isoRange) {
        setDoubleBookings(undefined)
        setSelectedIsoRange?.(undefined)
        return
      }

      setSelectedIsoRange?.(isoRange)

      // CALLS SUPABASE HERE
      // Check if the booking exist on each meetingroom (if not then we can book it)
      const data = await checkBookings({
        startTime: isoRange.start,
        endTime: isoRange.end,
      })

      if (data) {
        setDoubleBookings(data)
      }
    }

    checkIfCanBook()
  }, [selectedDate, selectedFloor, startTime, endTime])

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-300 p-3 lg:py-5 lg:px-8">
      <h2 className="text-xl font-semibold">Filter</h2>
      {/* Filter section */}
      <section className="mt-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        {/* Floor */}
        <div className="space-y-2">
          <h3>Etage</h3>
          <p className="text-ek-text-grey text-sm">Vælg den ønskede etage</p>
          <FloorSelect
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
          />
        </div>
        {/* Date */}
        <div className="space-y-2">
          <h3>Dato</h3>
          <p className="text-ek-text-grey text-sm">Vælg den ønskede dato</p>
          <DatePicker date={selectedDate} setDate={setSelectedDate} />
        </div>
        {/* Start time */}
        <div className="space-y-2">
          <h3>Tidspunkt fra</h3>
          <p className="text-ek-text-grey text-sm">
            Vælg det ønskede tidspunkt
          </p>
          <StartTimeSelect startTime={startTime} setStartTime={setStartTime} />
        </div>
        {/* End time */}
        <div className="space-y-2">
          <h3>Tidspunkt til</h3>
          <p className="text-ek-text-grey text-sm">
            Vælg det ønskede tidspunkt
          </p>
          <EndTimeSelect
            startTime={startTime}
            endTime={endTime}
            setEndTime={setEndTime}
          />
        </div>
      </section>
    </div>
  )
}

export default FilterSection
