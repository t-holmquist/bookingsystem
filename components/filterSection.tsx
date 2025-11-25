"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import DatePicker from "./ui/datePicker"
import FloorSelect from "./ui/floorselect"
import StartTimeSelect from "./ui/startTimeSelector"
import EndTimeSelect from "./ui/endTimeSelector"
import { checkBookings } from "@/data/supabase"
import { roomType } from "@/lib/types"

const FilterSection = ({
  setUnavailableRooms,
}: {
  // Contains the roomtype or undefined
  setUnavailableRooms: Dispatch<SetStateAction<roomType | undefined>>
}) => {
  // Filter state variables
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)

  // Each time a filter changes then call supabase to check if there are any bookings on every room with the specific filters set
  useEffect(() => {
    const checkIfCanBook = async () => {
      // Only check bookings if all required filters are set
      if (!selectedDate || !startTime || !endTime) {
        setUnavailableRooms(undefined)
        return
      }

      // Format the date and time for Supabase in ISO 8601 format
      const dateObj = new Date(selectedDate)

      // Get date components
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, "0")
      const day = String(dateObj.getDate()).padStart(2, "0")

      // Parse time from "8:00" format and create ISO 8601 datetime strings
      const parseTime = (time: string) => {
        const [hours, minutes] = time.split(":")
        const paddedHours = hours.padStart(2, "0")
        const paddedMinutes = minutes.padStart(2, "0")
        // Create ISO format: YYYY-MM-DDTHH:MM:SS.sssZ
        return `${year}-${month}-${day}T${paddedHours}:${paddedMinutes}:00.000Z`
      }

      // Format as ISO for Supabase. Combining the starttime or endtime with the date object made from selecteddate
      const formattedStartTime = parseTime(startTime)
      const formattedEndTime = parseTime(endTime)

      // CALLS SUPABASE HERE
      // Check if the booking exist on each meetingroom (if not then we can book it)
      const data = await checkBookings({
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      })

      if (data) {
        setUnavailableRooms(data)
      }
    }

    checkIfCanBook()
  }, [selectedDate, selectedFloor, startTime, endTime])

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-400 py-5 px-8">
      <h2 className="text-xl font-semibold">Filter</h2>
      {/* Filter section */}
      <section className="mt-8 flex justify-between items-center">
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
          <EndTimeSelect endTime={endTime} setEndTime={setEndTime} />
        </div>
      </section>
    </div>
  )
}

export default FilterSection
